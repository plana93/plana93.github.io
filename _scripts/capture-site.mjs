import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);

function option(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const baseUrl = option('url', process.env.VISUAL_BASE_URL || 'https://plana93.github.io/');
const outputDir = path.resolve(option('output', process.env.VISUAL_OUTPUT || 'visual-report'));
const viewportFilter = option('viewport', 'all');

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small-mobile', width: 320, height: 700 }
];
const selectedViewports = viewportFilter === 'all'
  ? viewports
  : viewports.filter(viewport => viewport.name === viewportFilter);

if (!selectedViewports.length) {
  throw new Error(`Unknown viewport "${viewportFilter}". Expected: ${viewports.map(item => item.name).join(', ')}`);
}

const sectionIds = ['home', 'research', 'publications', 'mode-shift', 'projects', 'visual-break', 'talks', 'contact'];
const minimumSectionScreenshotBytes = 12_000;

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

let executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!executablePath) {
  try {
    await fs.access(macChrome);
    executablePath = macChrome;
  } catch {
    // CI uses the Chromium binary installed by Playwright.
  }
}

const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {})
});
const report = {
  generatedAt: new Date().toISOString(),
  url: baseUrl,
  viewports: []
};

async function revealPage(page) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const step = Math.max(320, Math.floor(window.innerHeight * 0.72));
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    window.scrollTo(0, root.scrollHeight);
    root.style.scrollBehavior = previousScrollBehavior;
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
  });
  await page.waitForTimeout(500);
}

async function inspectLayout(page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const overflow = [];

    for (const element of document.querySelectorAll('body *')) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        Number(style.opacity) === 0 ||
        rect.width === 0 ||
        rect.height === 0
      ) continue;

      if (element.closest('.p-hero__waves')) continue;

      if (rect.left < -2 || rect.right > viewportWidth + 2) {
        overflow.push({
          tag: element.tagName.toLowerCase(),
          id: element.id || null,
          classes: [...element.classList].slice(0, 5),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        });
      }
    }

    return {
      viewportWidth,
      documentWidth: document.documentElement.scrollWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > viewportWidth + 1,
      overflow: overflow.slice(0, 50)
    };
  });
}

async function settlePaint(page) {
  await page.bringToFront();
  await page.evaluate(() => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
}

async function captureSection(page, outputPath, sectionId) {
  const attempts = [];
  let screenshot;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await settlePaint(page);
    screenshot = await page.screenshot();
    attempts.push(screenshot.byteLength);

    if (screenshot.byteLength >= minimumSectionScreenshotBytes) break;

    // A nearly uniform PNG is usually a stale compositor frame after a long scroll.
    // Nudge the viewport and wait for Chrome to paint before trying again.
    await page.evaluate(() => {
      const currentY = window.scrollY;
      window.scrollTo(0, Math.max(0, currentY - 2));
      window.scrollTo(0, currentY);
    });
    await page.waitForTimeout(500 * attempt);
  }

  await fs.writeFile(outputPath, screenshot);

  const visibleContent = await page.locator(`#${sectionId}`).evaluate(section => {
    const viewportHeight = window.innerHeight;
    return [...section.querySelectorAll('h1, h2, h3, p, a, span, img, canvas')].filter(element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return (
        rect.bottom > 0 &&
        rect.top < viewportHeight &&
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) > 0
      );
    }).length;
  });

  return {
    section: sectionId,
    bytes: screenshot.byteLength,
    attempts,
    visibleContent,
    passed: screenshot.byteLength >= minimumSectionScreenshotBytes && visibleContent > 0
  };
}

try {
  for (const viewport of selectedViewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      colorScheme: 'dark',
      reducedMotion: 'no-preference'
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    const sectionChecks = [];

    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('requestfailed', request => {
      failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' });
    });
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push({ url: response.url(), error: `HTTP ${response.status()}` });
      }
    });

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1800);
    await revealPage(page);

    for (const sectionId of sectionIds) {
      const section = page.locator(`#${sectionId}`);
      if (await section.count()) {
        await page.evaluate(id => {
          document.getElementById(id)?.scrollIntoView({ block: 'start' });
        }, sectionId);
        await page.waitForTimeout(1800);
        await section.locator('img').evaluateAll(images => Promise.all(images.map(image => {
          if (image.complete) return Promise.resolve();
          return new Promise(resolve => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 3000);
          });
        }))).catch(() => {});
        sectionChecks.push(await captureSection(
          page,
          path.join(outputDir, `${viewport.name}-${sectionId}.png`),
          sectionId
        ));
      }
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-full.png`),
      fullPage: true
    });

    const layout = await inspectLayout(page);
    report.viewports.push({ ...viewport, layout, sectionChecks, consoleErrors, failedRequests });
    await context.close();
    await fs.writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);

const overflowFailures = report.viewports.filter(item => item.layout.hasHorizontalOverflow);
const captureFailures = report.viewports.flatMap(item => item.sectionChecks
  .filter(check => !check.passed)
  .map(check => `${item.name}/${check.section}`));

if (overflowFailures.length || captureFailures.length) {
  if (overflowFailures.length) {
    console.error(`Horizontal overflow detected at: ${overflowFailures.map(item => item.name).join(', ')}`);
  }
  if (captureFailures.length) {
    console.error(`Blank or incomplete section captures detected at: ${captureFailures.join(', ')}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Visual report generated in ${outputDir}`);
}
