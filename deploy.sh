#!/bin/bash

# 🚀 Quick Deploy Script per PhD Portfolio
# Esegui con: bash deploy.sh

echo "🎨 PhD Portfolio Design - Deploy Script"
echo "========================================"
echo ""

# Check se siamo nella directory corretta
if [ ! -f "_config.yml" ]; then
    echo "❌ Errore: Esegui questo script dalla root del progetto"
    exit 1
fi

echo "📋 File modificati:"
echo "   ✅ _sass/_phd-design.scss (nuovo)"
echo "   ✅ _pages/about.md (ridisegnato)"
echo "   ✅ _layouts/about.html (aggiornato)"
echo "   ✅ assets/css/main.scss (import aggiunto)"
echo "   ✅ _sass/_custom.scss (responsive migliorato)"
echo ""

echo "📦 Preparazione commit..."
git add _sass/_phd-design.scss
git add _pages/about.md
git add _layouts/about.html
git add assets/css/main.scss
git add _sass/_custom.scss
git add DESIGN_SYSTEM.md
git add README_DESIGN.md
git add SUMMARY.md
git add deploy.sh

echo ""
echo "💾 Creazione commit..."
git commit -m "feat: implement PhD-oriented design system

Major design overhaul following tech-humanist aesthetic:

Typography:
- Inter + JetBrains Mono font pairing
- Gigantic titles (up to 8rem) with animated gradients
- Typography as visual structure

Layout:
- Broken grid system (12-column asymmetric)
- Strategic white space (3-8rem spacing)
- Layering and overlays for depth

Design Elements:
- 3-color neon accent system (#00ff88, #00d4ff, #ff006e)
- Controlled glitch effects
- Neural network patterns
- Data visualization aesthetics

Components:
- Research cards with color-coded borders
- Scientific callouts for impact statements
- Coordinate-style links [Text]
- Terminal-themed footer

Performance:
- Full responsive (mobile-first)
- GPU-accelerated animations
- Zero JS dependencies
- Optimized font loading

Files:
- NEW: _sass/_phd-design.scss (600+ lines design system)
- NEW: DESIGN_SYSTEM.md (complete documentation)
- NEW: README_DESIGN.md (user guide)
- NEW: SUMMARY.md (changes summary)
- MODIFIED: _pages/about.md (complete redesign)
- MODIFIED: _layouts/about.html (PhD-oriented template)
- BACKUP: _pages/about_old.md (original preserved)"

echo ""
echo "🚀 Push to GitHub..."
git push origin master

echo ""
echo "✅ Deploy completato!"
echo ""
echo "📊 Il sito verrà aggiornato in ~2-3 minuti su:"
echo "   🌐 https://plana93.github.io"
echo ""
echo "📖 Documentazione:"
echo "   - SUMMARY.md        : Riepilogo modifiche"
echo "   - README_DESIGN.md  : Guida utente"
echo "   - DESIGN_SYSTEM.md  : Documentazione tecnica"
echo ""
echo "💡 Per testare localmente:"
echo "   docker-compose up"
echo "   Poi apri http://localhost:4000"
echo ""
echo "🎨 Buon lancio del nuovo design PhD-oriented!"
