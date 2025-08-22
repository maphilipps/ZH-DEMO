#!/bin/bash
# GPZH Production Rollback Script
# Emergency rollback procedure for zh.adessocms.de

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}================================================================================${NC}"
echo -e "${RED}       EMERGENCY ROLLBACK PROCEDURE - zh.adessocms.de${NC}"
echo -e "${RED}================================================================================${NC}"

echo -e "${YELLOW}Rollback Triggers:${NC}"
echo "  - DDEV Container failures"
echo "  - Let's Encrypt SSL issues"
echo "  - Performance degradation"
echo "  - Security incident"
echo ""

read -p "Confirm rollback initiation? (type 'ROLLBACK' to confirm): " confirm
if [ "$confirm" != "ROLLBACK" ]; then
    echo -e "${GREEN}Rollback cancelled${NC}"
    exit 0
fi

echo -e "\n${YELLOW}Step 1: Stopping all containers${NC}"
ddev poweroff

echo -e "\n${YELLOW}Step 2: Listing available snapshots${NC}"
ddev snapshot list

echo -e "\n${YELLOW}Step 3: Restoring latest snapshot${NC}"
read -p "Restore latest snapshot? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ddev snapshot restore
    echo -e "${GREEN}Snapshot restored${NC}"
else
    echo "Manual snapshot selection:"
    read -p "Enter snapshot name to restore: " snapshot_name
    ddev snapshot restore --name="$snapshot_name"
fi

echo -e "\n${YELLOW}Step 4: Restarting containers${NC}"
ddev start

echo -e "\n${YELLOW}Step 5: Validation${NC}"
ddev drush core:status
curl -I https://zh.adessocms.de

echo -e "\n${YELLOW}Step 6: Checking logs for errors${NC}"
ddev logs web --tail=20
ddev logs db --tail=20

echo -e "\n${GREEN}================================================================================${NC}"
echo -e "${GREEN}       ROLLBACK COMPLETE${NC}"
echo -e "${GREEN}================================================================================${NC}"
echo ""
echo "Post-rollback checklist:"
echo "  [ ] Verify site accessibility"
echo "  [ ] Check all multi-site domains"
echo "  [ ] Test critical user journeys"
echo "  [ ] Monitor performance metrics"
echo "  [ ] Document incident for review"
echo ""
echo "Recovery metrics:"
echo "  - RTO achieved: $(date)"
echo "  - RPO: Last snapshot timestamp"