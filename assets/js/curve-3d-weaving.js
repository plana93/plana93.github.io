/**
 * 3D Curve Weaving System — Advanced Negative Space Detection
 * 
 * Questo script analizza le lettere e gli elementi DOM per applicare
 * dinamicamente maschere di clipping precise, nascondendo i segmenti
 * della curva che passano attraverso zone "piene" (no negative space).
 * 
 * @version 2.0
 * @author MP Design System
 */

(function() {
  'use strict';

  // ============================================================
  // CONFIGURATION
  // ============================================================
  const CONFIG = {
    // Selettori target
    heroSelector: '.mp-cinema-hero',
    curveLayerSelector: '.mp-hero-curve',
    textTargets: [
      '.mp-cinema-hero__word--vision span',
      '.mp-cinema-hero__intelligence',
      '.mp-cinema-hero__sep-into'
    ],
    
    // Parametri di analisi
    analysisResolution: 20,  // Punti di campionamento lungo la curva
    negativeSpaceThreshold: 0.3,  // 30% overlap = nascondere
    
    // Opzioni rendering
    enableDynamicOcclusion: true,
    enableHoverEnhancement: true,
    debugMode: false  // mostra aree di clipping
  };

  // ============================================================
  // NEGATIVE SPACE ANALYZER
  // ============================================================
  class NegativeSpaceAnalyzer {
    constructor(curveElement, textElements) {
      this.curve = curveElement;
      this.texts = textElements;
      this.occlusionMap = new Map();
    }

    /**
     * Analizza intersezioni tra curva e testo
     * @returns {Array} Array di range occlusi [start%, end%]
     */
    analyze() {
      const curvePath = this.curve.querySelector('path');
      if (!curvePath) return [];

      const pathLength = curvePath.getTotalLength();
      const samplePoints = CONFIG.analysisResolution;
      const occludedRanges = [];

      // Campiona punti lungo la curva
      for (let i = 0; i < samplePoints; i++) {
        const t = (i / samplePoints) * pathLength;
        const point = curvePath.getPointAtLength(t);
        
        // Controlla se il punto interseca testo
        if (this.isPointInsideText(point)) {
          const percentage = (i / samplePoints) * 100;
          occludedRanges.push(percentage);
        }
      }

      // Raggruppa range consecutivi
      return this.groupConsecutiveRanges(occludedRanges);
    }

    /**
     * Verifica se un punto cade dentro un elemento di testo
     */
    isPointInsideText(point) {
      for (const textEl of this.texts) {
        const rect = textEl.getBoundingClientRect();
        
        // Espandi leggermente il rect per catturare edge cases
        const padding = 5;
        if (
          point.x >= rect.left - padding &&
          point.x <= rect.right + padding &&
          point.y >= rect.top - padding &&
          point.y <= rect.bottom + padding
        ) {
          // Controllo fine: usa canvas per pixel-perfect detection
          if (this.isPixelOccluded(point, textEl)) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * Pixel-perfect occlusion detection usando canvas
     */
    isPixelOccluded(point, textEl) {
      // Crea canvas temporaneo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const rect = textEl.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Disegna il testo
      ctx.font = window.getComputedStyle(textEl).font;
      ctx.fillText(textEl.textContent, 0, rect.height / 2);
      
      // Verifica pixel al punto
      const x = Math.floor(point.x - rect.left);
      const y = Math.floor(point.y - rect.top);
      
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return false;
      }
      
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      return pixel[3] > 0;  // Alpha > 0 = occluded
    }

    /**
     * Raggruppa percentuali consecutive in range
     */
    groupConsecutiveRanges(percentages) {
      if (percentages.length === 0) return [];
      
      percentages.sort((a, b) => a - b);
      const ranges = [];
      let start = percentages[0];
      let end = percentages[0];
      
      for (let i = 1; i < percentages.length; i++) {
        if (percentages[i] - end < (100 / CONFIG.analysisResolution) * 1.5) {
          end = percentages[i];
        } else {
          ranges.push({ start, end });
          start = end = percentages[i];
        }
      }
      ranges.push({ start, end });
      
      return ranges;
    }
  }

  // ============================================================
  // OCCLUSION RENDERER
  // ============================================================
  class OcclusionRenderer {
    constructor(curveLayer, occlusionRanges) {
      this.layer = curveLayer;
      this.ranges = occlusionRanges;
    }

    /**
     * Applica maschere di clipping dinamiche
     */
    render() {
      const pathBody = this.layer.querySelector('.mp-hero-curve__body');
      if (!pathBody) return;

      if (this.ranges.length === 0) {
        // Nessuna occlusione, mostra tutto
        pathBody.style.strokeDasharray = 'none';
        return;
      }

      // Calcola dash array per nascondere range occlusi
      const dashArray = this.calculateDashArray();
      pathBody.style.strokeDasharray = dashArray;
      pathBody.classList.add('mp-hero-curve--occluded');

      if (CONFIG.debugMode) {
        this.renderDebugOverlay();
      }
    }

    /**
     * Calcola stroke-dasharray per occlusione
     */
    calculateDashArray() {
      const totalLength = 100;  // percentuale
      const dashes = [];
      let lastEnd = 0;

      for (const range of this.ranges) {
        // Segmento visibile
        const visible = range.start - lastEnd;
        if (visible > 0) dashes.push(visible);
        
        // Segmento occluso (gap)
        const hidden = range.end - range.start;
        dashes.push(hidden);
        
        lastEnd = range.end;
      }

      // Segmento finale
      if (lastEnd < totalLength) {
        dashes.push(totalLength - lastEnd);
      }

      return dashes.join(' ') + '%';
    }

    /**
     * Debug: mostra aree occluse
     */
    renderDebugOverlay() {
      const overlay = document.createElement('div');
      overlay.className = 'mp-debug-overlay';
      overlay.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9999;
      `;

      for (const range of this.ranges) {
        const marker = document.createElement('div');
        marker.style.cssText = `
          position: absolute;
          left: ${range.start}%;
          width: ${range.end - range.start}%;
          height: 100%;
          background: rgba(255, 0, 0, 0.2);
          border: 1px dashed red;
        `;
        overlay.appendChild(marker);
      }

      this.layer.appendChild(overlay);
    }
  }

  // ============================================================
  // HOVER ENHANCEMENT
  // ============================================================
  class HoverEnhancer {
    constructor(heroElement) {
      this.hero = heroElement;
      this.layers = Array.from(heroElement.querySelectorAll('.mp-hero-curve'));
      this.init();
    }

    init() {
      this.hero.addEventListener('mouseenter', () => this.onEnter());
      this.hero.addEventListener('mouseleave', () => this.onLeave());
      
      // Parallax leggero al movimento del mouse
      this.hero.addEventListener('mousemove', (e) => this.onMove(e));
    }

    onEnter() {
      this.layers.forEach((layer, i) => {
        const depth = this.getLayerDepth(layer);
        const body = layer.querySelector('.mp-hero-curve__body');
        
        if (body) {
          // Accentua differenze di profondità
          if (depth > 4) {
            // Layer frontali: espandi
            body.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            body.style.strokeWidth = '24px';
            body.style.opacity = '1';
          } else {
            // Layer posteriori: riduci
            body.style.strokeWidth = '14px';
            body.style.opacity = '0.6';
          }
        }
      });
    }

    onLeave() {
      this.layers.forEach(layer => {
        const body = layer.querySelector('.mp-hero-curve__body');
        if (body) {
          body.style.transition = 'all 0.4s ease';
          body.style.strokeWidth = '';  // reset to CSS
          body.style.opacity = '';
        }
      });
    }

    onMove(e) {
      const rect = this.hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      this.layers.forEach(layer => {
        const depth = this.getLayerDepth(layer);
        const parallaxStrength = depth * 0.5;  // layer più vicini si muovono di più
        
        const dx = (x - 0.5) * parallaxStrength;
        const dy = (y - 0.5) * parallaxStrength;
        
        layer.style.transform = `translate(${dx}px, ${dy}px)`;
        layer.style.transition = 'transform 0.15s ease-out';
      });
    }

    getLayerDepth(layer) {
      // Estrae z-index dal layer (l0=0, l1=2, l2=4, l3=6)
      const className = layer.className;
      if (className.includes('l3')) return 6;
      if (className.includes('l2')) return 4;
      if (className.includes('l1')) return 2;
      return 0;
    }
  }

  // ============================================================
  // MAIN INITIALIZATION
  // ============================================================
  function init() {
    const hero = document.querySelector(CONFIG.heroSelector);
    if (!hero) {
      console.warn('[3D Curve] Hero element not found');
      return;
    }

    // Raccogli elementi di testo
    const textElements = [];
    CONFIG.textTargets.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) textElements.push(el);
    });

    if (textElements.length === 0) {
      console.warn('[3D Curve] No text targets found');
    }

    // Processa ogni layer della curva
    const curveLayers = hero.querySelectorAll(CONFIG.curveLayerSelector);
    
    curveLayers.forEach(layer => {
      if (CONFIG.enableDynamicOcclusion) {
        // Analizza negative space
        const analyzer = new NegativeSpaceAnalyzer(layer, textElements);
        const occlusionRanges = analyzer.analyze();
        
        // Applica rendering
        const renderer = new OcclusionRenderer(layer, occlusionRanges);
        renderer.render();
      }
    });

    // Hover enhancement
    if (CONFIG.enableHoverEnhancement) {
      new HoverEnhancer(hero);
    }

    console.log('[3D Curve] System initialized ✓');
  }

  // Auto-init quando DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-analyze on window resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 300);
  });

})();
