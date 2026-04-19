#!/bin/bash

# Script per gestire il server di sviluppo Jekyll
# Uso: ./dev-server.sh [start|stop|restart|status]

PORT=4001
PROJECT_DIR="/Users/mirco/plana93.github.io"

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Funzione per verificare se il server è in esecuzione
check_server() {
    lsof -i :$PORT -t > /dev/null 2>&1
    return $?
}

# Funzione per fermare il server
stop_server() {
    print_status "Verifico server sulla porta $PORT..."
    
    if check_server; then
        print_status "Fermo il server Jekyll..."
        lsof -ti :$PORT | xargs kill -9 2>/dev/null
        sleep 2
        
        if check_server; then
            print_error "Impossibile fermare il server"
            return 1
        else
            print_success "Server fermato con successo"
            return 0
        fi
    else
        print_warning "Nessun server in esecuzione sulla porta $PORT"
        return 0
    fi
}

# Funzione per pulire la cache
clean_cache() {
    print_status "Pulisco la cache Jekyll..."
    cd "$PROJECT_DIR"
    
    # Rimuovi _site
    if [ -d "_site" ]; then
        rm -rf _site
        print_success "Cartella _site rimossa"
    fi
    
    # Rimuovi .jekyll-cache
    if [ -d ".jekyll-cache" ]; then
        rm -rf .jekyll-cache
        print_success "Cache Jekyll rimossa"
    fi
    
    # Rimuovi cache Sass
    if [ -d ".sass-cache" ]; then
        rm -rf .sass-cache
        print_success "Cache Sass rimossa"
    fi
    
    # Rimuovi file CSS compilati (verranno rigenerati)
    if [ -f "_site/assets/css/main.css" ]; then
        rm -f _site/assets/css/main.css
        print_success "CSS compilati rimossi"
    fi
}

# Funzione per avviare il server
start_server() {
    print_status "Avvio server Jekyll sulla porta $PORT..."
    cd "$PROJECT_DIR"
    
    if check_server; then
        print_warning "Server già in esecuzione sulla porta $PORT"
        echo ""
        print_status "URL: ${GREEN}http://localhost:$PORT${NC}"
        return 0
    fi
    
    # Avvia Jekyll in background con LiveReload
    bundle exec jekyll serve --port $PORT --livereload --incremental &
    JEKYLL_PID=$!
    
    # Attendi che il server sia pronto
    print_status "Attendo che il server sia pronto..."
    sleep 5
    
    if check_server; then
        print_success "Server avviato con successo!"
        echo ""
        echo -e "  ${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "  ${BLUE}🌐 Server URL:${NC}      http://localhost:$PORT"
        echo -e "  ${BLUE}🔄 LiveReload:${NC}      Attivo"
        echo -e "  ${BLUE}📁 Directory:${NC}       $PROJECT_DIR"
        echo -e "  ${BLUE}🆔 PID:${NC}             $JEKYLL_PID"
        echo -e "  ${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        print_status "Premi CTRL+C per fermare il server, oppure usa: ${YELLOW}./dev-server.sh stop${NC}"
    else
        print_error "Errore durante l'avvio del server"
        return 1
    fi
}

# Funzione per mostrare lo stato
show_status() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  Status Server Jekyll${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    if check_server; then
        PID=$(lsof -ti :$PORT)
        print_success "Server ATTIVO"
        echo -e "  ${BLUE}🌐 URL:${NC}        http://localhost:$PORT"
        echo -e "  ${BLUE}🆔 PID:${NC}        $PID"
        echo -e "  ${BLUE}📊 Porta:${NC}      $PORT"
    else
        print_warning "Server NON ATTIVO"
    fi
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Funzione per restart completo (con pulizia cache)
restart_clean() {
    print_status "Restart completo con pulizia cache..."
    echo ""
    
    stop_server
    echo ""
    
    clean_cache
    echo ""
    
    start_server
}

# Funzione per restart veloce (senza pulizia cache)
restart_fast() {
    print_status "Restart veloce..."
    echo ""
    
    stop_server
    echo ""
    
    start_server
}

# Mostra help
show_help() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  Jekyll Dev Server Manager${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}Uso:${NC} ./dev-server.sh [comando]"
    echo ""
    echo -e "${YELLOW}Comandi disponibili:${NC}"
    echo ""
    echo -e "  ${GREEN}start${NC}          Avvia il server Jekyll"
    echo -e "  ${GREEN}stop${NC}           Ferma il server Jekyll"
    echo -e "  ${GREEN}restart${NC}        Riavvia il server (veloce)"
    echo -e "  ${GREEN}reset${NC}          Riavvia con pulizia cache completa"
    echo -e "  ${GREEN}clean${NC}          Pulisci solo la cache (senza restart)"
    echo -e "  ${GREEN}status${NC}         Mostra lo stato del server"
    echo -e "  ${GREEN}help${NC}           Mostra questo messaggio"
    echo ""
    echo -e "${YELLOW}Esempi:${NC}"
    echo -e "  ./dev-server.sh start      # Avvia il server"
    echo -e "  ./dev-server.sh reset      # Reset completo con cache pulita"
    echo -e "  ./dev-server.sh stop       # Ferma il server"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Main script
case "${1:-help}" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        restart_fast
        ;;
    reset)
        restart_clean
        ;;
    clean)
        clean_cache
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Comando non riconosciuto: $1"
        show_help
        exit 1
        ;;
esac
