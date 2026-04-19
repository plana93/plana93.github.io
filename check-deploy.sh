#!/bin/bash

# Script per verificare lo stato del deployment su GitHub Pages

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  GitHub Pages Deployment Check${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Ultimo commit locale
echo -e "${YELLOW}📝 Ultimo commit locale:${NC}"
git log -1 --format="  Commit: %h%n  Data:   %ci%n  Msg:    %s" | head -4
echo ""

# Verifica ultimo commit remoto
echo -e "${YELLOW}🌐 Ultimo commit su GitHub:${NC}"
git fetch origin master 2>/dev/null
git log origin/master -1 --format="  Commit: %h%n  Data:   %ci%n  Msg:    %s" | head -4
echo ""

# Verifica se locale e remoto sono sincronizzati
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/master)

if [ "$LOCAL_COMMIT" == "$REMOTE_COMMIT" ]; then
    echo -e "${GREEN}✓ Repository sincronizzato${NC}"
else
    echo -e "${RED}✗ Repository NON sincronizzato - esegui git push${NC}"
fi
echo ""

# Verifica CSS su GitHub Pages
echo -e "${YELLOW}📦 CSS su GitHub Pages:${NC}"
CSS_HEADERS=$(curl -sI https://plana93.github.io/assets/css/main.css)
CSS_MODIFIED=$(echo "$CSS_HEADERS" | grep -i "last-modified:" | cut -d: -f2-)
CSS_ETAG=$(echo "$CSS_HEADERS" | grep -i "etag:" | cut -d: -f2-)

if [ ! -z "$CSS_MODIFIED" ]; then
    echo -e "  Last-Modified: ${CSS_MODIFIED}"
    echo -e "  ETag:         ${CSS_ETAG}"
else
    echo -e "${RED}  ✗ Impossibile recuperare informazioni CSS${NC}"
fi
echo ""

# Verifica HTML principale
echo -e "${YELLOW}🏠 Homepage su GitHub Pages:${NC}"
HTML_HEADERS=$(curl -sI https://plana93.github.io/)
HTML_MODIFIED=$(echo "$HTML_HEADERS" | grep -i "last-modified:" | cut -d: -f2-)

if [ ! -z "$HTML_MODIFIED" ]; then
    echo -e "  Last-Modified:${HTML_MODIFIED}"
else
    echo -e "${RED}  ✗ Impossibile recuperare informazioni homepage${NC}"
fi
echo ""

# Tempo trascorso dall'ultimo push
echo -e "${YELLOW}⏱️  Tempo dall'ultimo push:${NC}"
PUSH_TIME=$(git log -1 --format="%ct")
NOW=$(date +%s)
DIFF=$((NOW - PUSH_TIME))
MINUTES=$((DIFF / 60))

if [ $MINUTES -lt 2 ]; then
    echo -e "  ${YELLOW}${MINUTES} minuti fa - GitHub Pages potrebbe essere ancora in deploy${NC}"
elif [ $MINUTES -lt 5 ]; then
    echo -e "  ${GREEN}${MINUTES} minuti fa - Deploy dovrebbe essere quasi completo${NC}"
else
    echo -e "  ${GREEN}${MINUTES} minuti fa - Deploy completato${NC}"
fi
echo ""

# Consigli
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}💡 Consigli per vedere le modifiche:${NC}"
echo ""
echo -e "  1. ${GREEN}Hard Refresh${NC} del browser:"
echo -e "     • Chrome/Firefox/Safari: ${BLUE}Cmd + Shift + R${NC}"
echo -e "     • Oppure apri in modalità ${BLUE}Incognito${NC}"
echo ""
echo -e "  2. ${GREEN}Svuota cache browser:${NC}"
echo -e "     • Chrome: Developer Tools > Network > Disable cache"
echo ""
echo -e "  3. ${GREEN}Aspetta 2-5 minuti${NC} per il deploy GitHub Pages"
echo ""
echo -e "  4. ${GREEN}Forza rebuild:${NC}"
echo -e "     git commit --allow-empty -m 'Rebuild' && git push"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Link utili
echo -e "${YELLOW}🔗 Link utili:${NC}"
echo -e "  • Sito:     ${BLUE}https://plana93.github.io/${NC}"
echo -e "  • GitHub:   ${BLUE}https://github.com/plana93/plana93.github.io${NC}"
echo -e "  • Actions:  ${BLUE}https://github.com/plana93/plana93.github.io/actions${NC}"
echo ""
