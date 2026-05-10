#!/usr/bin/env python3
"""
fetch_scholar.py
Fetches publication data from Google Scholar using scholarly library.
Outputs: assets/data/scholar.json

Usage:
  pip install scholarly
  python _scripts/fetch_scholar.py

Called automatically by: .github/workflows/fetch_scholar.yml
"""

import json
import os
import sys
import time
from datetime import datetime, timezone

SCHOLAR_ID = "GIJ3h4AAAAAJ"
OUTPUT_PATH = "assets/data/scholar.json"
MAX_PUBS    = 100   # max publications to fetch


def fetch_scholar_data():
    try:
        from scholarly import scholarly, ProxyGenerator
    except ImportError:
        print("ERROR: scholarly not installed. Run: pip install scholarly", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching Google Scholar profile for ID: {SCHOLAR_ID}")

    # Use free proxies if available (avoids rate limiting in CI)
    pg = ProxyGenerator()
    try:
        pg.FreeProxies()
        scholarly.use_proxy(pg)
        print("Using proxy generator")
    except Exception as e:
        print(f"Proxy setup skipped: {e}")

    # Fetch author profile
    author = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])

    # Extract metrics
    name        = author.get("name", "")
    affiliation = author.get("affiliation", "")
    interests   = [i for i in author.get("interests", [])]
    h_index     = author.get("hindex", 0)
    i10_index   = author.get("i10index", 0)
    citedby     = author.get("citedby", 0)

    print(f"Name: {name}, h-index: {h_index}, citations: {citedby}")
    print(f"Interests: {interests}")

    publications = []
    raw_pubs = author.get("publications", [])
    print(f"Found {len(raw_pubs)} publications. Fetching details...")

    for i, pub in enumerate(raw_pubs[:MAX_PUBS]):
        try:
            # Fill publication details
            filled = scholarly.fill(pub)
            bib    = filled.get("bib", {})
            title   = bib.get("title", "")
            authors = bib.get("author", "")
            venue   = bib.get("venue", bib.get("journal", bib.get("booktitle", "")))
            year    = bib.get("pub_year", "")
            cited   = filled.get("num_citations", 0)
            url     = filled.get("pub_url", "")

            publications.append({
                "title":   title,
                "authors": authors,
                "venue":   venue,
                "year":    int(year) if year else 0,
                "citedBy": cited,
                "url":     url or f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
            })

            if (i + 1) % 5 == 0:
                print(f"  Fetched {i+1}/{min(MAX_PUBS, len(raw_pubs))}")
                time.sleep(1.5)  # respect rate limiting

        except Exception as e:
            print(f"  Warning: could not fetch pub #{i}: {e}")
            # Keep partial data from bib
            bib = pub.get("bib", {})
            publications.append({
                "title":   bib.get("title", ""),
                "authors": bib.get("author", ""),
                "venue":   bib.get("venue", ""),
                "year":    int(bib.get("pub_year", 0) or 0),
                "citedBy": pub.get("num_citations", 0),
                "url":     f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
            })

    # Sort by year descending
    publications.sort(key=lambda p: p["year"], reverse=True)

    output = {
        "name":            name,
        "affiliation":     affiliation,
        "interests":       interests,
        "h_index":         h_index,
        "i10_index":       i10_index,
        "total_citations": citedby,
        "last_updated":    datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "publications":    publications
    }

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Saved {len(publications)} publications to {OUTPUT_PATH}")
    print(f"  Total citations: {citedby}, h-index: {h_index}")


if __name__ == "__main__":
    fetch_scholar_data()
