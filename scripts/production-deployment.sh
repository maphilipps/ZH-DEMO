#!/bin/bash
# GPZH Production Deployment Script
# Issue #17: Deploy to zh.adessocms.de
# Total Duration: 8 hours across 6 phases

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PRODUCTION_SERVER="91.99.18.69"
PRODUCTION_USER="claude"
PRODUCTION_DOMAIN="zh.adessocms.de"
PROJECT_PATH="/home/claude/dev/zh-demo-1"

echo -e "${GREEN}================================================================================${NC}"
echo -e "${GREEN}       GPZH PRODUCTION DEPLOYMENT - zh.adessocms.de${NC}"
echo -e "${GREEN}================================================================================${NC}"

# Function to display phase header
phase_header() {
    echo -e "\n${YELLOW}================================================================================${NC}"
    echo -e "${YELLOW}  PHASE $1: $2${NC}"
    echo -e "${YELLOW}  Duration: $3${NC}"
    echo -e "${YELLOW}================================================================================${NC}"
}

# Function to confirm before proceeding
confirm_step() {
    read -p "Continue with $1? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Deployment cancelled by user${NC}"
        exit 1
    fi
}

# PHASE 1: Server Preparation (2 hours)
phase_header "1" "Server Preparation" "2 hours"
echo "Tasks:"
echo "  - Ubuntu 22.04 server provisioning"
echo "  - Firewall configuration (ufw)"
echo "  - SSH key-based authentication"
echo ""
echo "Run on production server:"
echo ""
cat << 'EOF'
# Update system
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create user claude with sudo
sudo adduser claude --gecos "Claude DDEV User" --disabled-password
sudo usermod -aG sudo claude
echo "claude ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/claude

# Setup SSH key (add your public key)
sudo -u claude mkdir -p /home/claude/.ssh
sudo -u claude touch /home/claude/.ssh/authorized_keys
sudo chmod 700 /home/claude/.ssh
sudo chmod 600 /home/claude/.ssh/authorized_keys

# Harden SSH
sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
EOF
confirm_step "Phase 1 completion"

# PHASE 2: Docker & DDEV Installation (1 hour)
phase_header "2" "Docker & DDEV Installation" "1 hour"
echo "Run on production server as claude user:"
echo ""
cat << 'EOF'
# Install Docker
sudo apt update
sudo apt install -y build-essential apt-transport-https ca-certificates jq curl software-properties-common file
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker claude
sudo chmod 666 /var/run/docker.sock

# Install DDEV
curl -fsSL https://ddev.com/install.sh | bash

# Verify installations
docker --version
ddev version
EOF
confirm_step "Phase 2 completion"

# PHASE 3: DDEV Global Production Configuration (30 minutes)
phase_header "3" "DDEV Global Production Configuration" "30 minutes"
echo "Configure DDEV for production hosting:"
echo ""
cat << 'EOF'
# Configure DDEV for production
ddev config global \
  --router-bind-all-interfaces \
  --omit-containers=ddev-ssh-agent \
  --use-hardened-images \
  --performance-mode=none \
  --use-letsencrypt \
  --letsencrypt-email=admin@adessocms.de \
  --auto-restart-containers

# Verify configuration
ddev config global --json
EOF
confirm_step "Phase 3 completion"

# PHASE 4: Project Setup & Configuration (1.5 hours)
phase_header "4" "Project Setup & Configuration" "1.5 hours"
echo "Deploy project to production:"
echo ""
cat << 'EOF'
# Create project directory
mkdir -p /home/claude/dev
cd /home/claude/dev

# Clone repository (or rsync from local)
# Option 1: Git clone
git clone https://github.com/maphilipps/zh-demo-1.git
cd zh-demo-1

# Option 2: Rsync from local (run from local machine)
# rsync -avz --exclude='.ddev/db_snapshots' --exclude='web/sites/default/files' \
#   ./ claude@91.99.18.69:/home/claude/dev/zh-demo-1/

# Copy production config
cp .ddev/config.prod.yaml .ddev/config.yaml

# Update config for production domains
ddev config --additional-hostnames=zh.adessocms.de,www.zh.adessocms.de,bruchtal.zh.adessocms.de,thalwil.zh.adessocms.de,thalheim.zh.adessocms.de,erlenbach.zh.adessocms.de

# Install dependencies
ddev composer install --no-dev --optimize-autoloader

# Build theme assets
ddev theme build
EOF
confirm_step "Phase 4 completion"

# PHASE 5: Data Import & Snapshot (1 hour)
phase_header "5" "Data Import & Snapshot" "1 hour"
echo "Import data and create snapshots:"
echo ""
cat << 'EOF'
# Import database (from local export)
# First, export from local:
# ddev export-db --file=zh-demo-production.sql.gz

# Then import on production:
ddev import-db --file=zh-demo-production.sql.gz

# Import files (if needed)
# rsync -avz web/sites/default/files/ claude@91.99.18.69:/home/claude/dev/zh-demo-1/web/sites/default/files/

# Create pre-production snapshot
ddev snapshot create pre-production-backup

# List snapshots to verify
ddev snapshot list
EOF
confirm_step "Phase 5 completion"

# PHASE 6: Production Start & Validation (30 minutes + 2 hours testing)
phase_header "6" "Production Start & Validation" "2.5 hours"
echo "Start production and validate:"
echo ""
cat << 'EOF'
# Start DDEV in production mode
ddev start

# Verify Let's Encrypt certificate
ddev describe
curl -I https://zh.adessocms.de

# Configure external SMTP (in settings.php)
cat >> web/sites/default/settings.php << 'SMTP'
// External SMTP configuration
$config['smtp.settings']['smtp_on'] = TRUE;
$config['smtp.settings']['smtp_host'] = 'smtp.sendgrid.net';
$config['smtp.settings']['smtp_port'] = 587;
$config['smtp.settings']['smtp_protocol'] = 'tls';
$config['smtp.settings']['smtp_username'] = getenv('SMTP_USERNAME');
$config['smtp.settings']['smtp_password'] = getenv('SMTP_PASSWORD');
SMTP

# Clear caches
ddev drush cr

# Run Drupal status check
ddev drush core:status

# Test all multi-site domains
for domain in zh.adessocms.de bruchtal.zh.adessocms.de thalwil.zh.adessocms.de thalheim.zh.adessocms.de erlenbach.zh.adessocms.de; do
    echo "Testing: https://$domain"
    curl -I -s https://$domain | head -n 1
done

# Performance test
ddev exec npm run test:performance

# Accessibility test
ddev exec npm run test:accessibility

# Swiss compliance validation
ddev drush config:get system.site

# Check logs for errors
ddev logs web --tail=50
ddev logs db --tail=50
EOF
confirm_step "Phase 6 completion"

echo -e "\n${GREEN}================================================================================${NC}"
echo -e "${GREEN}              PRODUCTION DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}================================================================================${NC}"
echo ""
echo "Production URLs:"
echo "  - Main: https://zh.adessocms.de"
echo "  - Bruchtal: https://bruchtal.zh.adessocms.de"
echo "  - Thalwil: https://thalwil.zh.adessocms.de"
echo "  - Thalheim: https://thalheim.zh.adessocms.de"
echo "  - Erlenbach: https://erlenbach.zh.adessocms.de"
echo ""
echo "Next steps:"
echo "  1. Monitor logs: ddev logs --follow"
echo "  2. Setup monitoring: Configure uptime monitoring"
echo "  3. Backup schedule: Setup daily snapshots"
echo "  4. SSL verification: Check SSL Labs rating"
echo ""
echo -e "${YELLOW}Remember: You are responsible for server maintenance and security!${NC}"