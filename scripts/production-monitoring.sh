#!/bin/bash
# GPZH Production Monitoring Script
# Continuous monitoring for zh.adessocms.de

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
DOMAINS=(
    "zh.adessocms.de"
    "bruchtal.zh.adessocms.de"
    "thalwil.zh.adessocms.de"
    "thalheim.zh.adessocms.de"
    "erlenbach.zh.adessocms.de"
)

echo -e "${GREEN}================================================================================${NC}"
echo -e "${GREEN}       PRODUCTION MONITORING - zh.adessocms.de${NC}"
echo -e "${GREEN}================================================================================${NC}"

# Function to check domain status
check_domain() {
    local domain=$1
    local response=$(curl -s -o /dev/null -w "%{http_code}" https://$domain)
    
    if [ "$response" == "200" ] || [ "$response" == "301" ] || [ "$response" == "302" ]; then
        echo -e "  ✓ ${GREEN}$domain${NC} - HTTP $response"
        return 0
    else
        echo -e "  ✗ ${RED}$domain${NC} - HTTP $response"
        return 1
    fi
}

# Function to check SSL certificate
check_ssl() {
    local domain=$1
    local days_remaining=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2 | xargs -I {} date -d {} +%s | awk -v now=$(date +%s) '{print int(($1-now)/86400)}')
    
    if [ -z "$days_remaining" ]; then
        echo -e "  ✗ ${RED}SSL check failed for $domain${NC}"
        return 1
    elif [ "$days_remaining" -lt 30 ]; then
        echo -e "  ⚠ ${YELLOW}SSL expires in $days_remaining days for $domain${NC}"
        return 2
    else
        echo -e "  ✓ ${GREEN}SSL valid for $days_remaining days${NC}"
        return 0
    fi
}

# Function to check DDEV status
check_ddev_status() {
    echo -e "\n${YELLOW}DDEV Container Status:${NC}"
    ddev describe | grep -E "STATUS|web|db|router" || echo -e "${RED}DDEV not running${NC}"
}

# Function to check disk usage
check_disk_usage() {
    echo -e "\n${YELLOW}Disk Usage:${NC}"
    df -h | grep -E "Filesystem|/$" | awk '{print "  "$0}'
    
    # Check Docker disk usage
    echo -e "\n${YELLOW}Docker Disk Usage:${NC}"
    docker system df | head -4 | awk '{print "  "$0}'
}

# Function to check memory usage
check_memory() {
    echo -e "\n${YELLOW}Memory Usage:${NC}"
    free -h | grep -E "Mem:|Swap:" | awk '{print "  "$0}'
}

# Function to check recent errors
check_logs() {
    echo -e "\n${YELLOW}Recent Errors (last 10 lines):${NC}"
    echo "  Web container:"
    ddev logs web --tail=10 2>/dev/null | grep -i error | tail -5 | awk '{print "    "$0}' || echo "    No recent errors"
    
    echo "  DB container:"
    ddev logs db --tail=10 2>/dev/null | grep -i error | tail -5 | awk '{print "    "$0}' || echo "    No recent errors"
}

# Function to run performance check
check_performance() {
    echo -e "\n${YELLOW}Performance Metrics:${NC}"
    for domain in "${DOMAINS[@]}"; do
        local ttfb=$(curl -s -o /dev/null -w "%{time_starttransfer}" https://$domain)
        local total_time=$(curl -s -o /dev/null -w "%{time_total}" https://$domain)
        
        echo -e "  $domain:"
        echo -e "    TTFB: ${ttfb}s"
        echo -e "    Total: ${total_time}s"
        
        # Warning if slow
        if (( $(echo "$ttfb > 1.0" | bc -l) )); then
            echo -e "    ${YELLOW}⚠ TTFB exceeds 1 second${NC}"
        fi
    done
}

# Main monitoring loop
main() {
    local mode=${1:-"once"}
    
    while true; do
        clear
        echo -e "${GREEN}================================================================================${NC}"
        echo -e "${GREEN}       PRODUCTION MONITORING - $(date)${NC}"
        echo -e "${GREEN}================================================================================${NC}"
        
        echo -e "\n${YELLOW}Domain Status:${NC}"
        local errors=0
        for domain in "${DOMAINS[@]}"; do
            if ! check_domain "$domain"; then
                ((errors++))
            fi
        done
        
        echo -e "\n${YELLOW}SSL Certificate Status:${NC}"
        check_ssl "zh.adessocms.de"
        
        check_ddev_status
        check_disk_usage
        check_memory
        check_logs
        check_performance
        
        echo -e "\n${GREEN}================================================================================${NC}"
        if [ $errors -gt 0 ]; then
            echo -e "${RED}⚠ ATTENTION: $errors domain(s) are not responding correctly${NC}"
        else
            echo -e "${GREEN}✓ All systems operational${NC}"
        fi
        echo -e "${GREEN}================================================================================${NC}"
        
        if [ "$mode" == "once" ]; then
            break
        else
            echo -e "\nPress Ctrl+C to exit. Refreshing in 60 seconds..."
            sleep 60
        fi
    done
}

# Parse arguments
case "${1:-}" in
    continuous)
        echo "Starting continuous monitoring (refresh every 60s)..."
        main "continuous"
        ;;
    *)
        main "once"
        ;;
esac