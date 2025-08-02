#!/bin/bash

# Adesso CMS Deployment Snapshot Creator
# Creates a complete snapshot of the current DDEV instance for deployment

set -e

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SNAPSHOT_DIR="deployment-snapshot-$TIMESTAMP"
CURRENT_DIR=$(pwd)

echo "🚀 Creating deployment snapshot..."

# Check if DDEV is running
if ! ddev describe > /dev/null 2>&1; then
    echo "❌ DDEV is not running. Please start with 'ddev start'"
    exit 1
fi

# Create snapshot directory
mkdir -p "$SNAPSHOT_DIR"
cd "$SNAPSHOT_DIR"

echo "📦 Exporting database..."
ddev export-db --file=database.sql.gz

echo "📁 Exporting files..."
ddev ssh -c "tar -czf /tmp/drupal-files.tar.gz -C /var/www/html/web/sites/default files" || true
ddev exec cp /tmp/drupal-files.tar.gz . 2>/dev/null || echo "⚠️  No files directory found, skipping..."

echo "📋 Copying essential files..."
cd "$CURRENT_DIR"

# Copy core application files
cp -r web "$SNAPSHOT_DIR/"
cp -r config "$SNAPSHOT_DIR/"
cp composer.json "$SNAPSHOT_DIR/"
cp composer.lock "$SNAPSHOT_DIR/"

# Copy DDEV config for reference
mkdir -p "$SNAPSHOT_DIR/.ddev"
cp -r .ddev/config.yaml "$SNAPSHOT_DIR/.ddev/" 2>/dev/null || true

echo "🐳 Creating Dockerfile..."
cat > "$SNAPSHOT_DIR/Dockerfile" << 'EOF'
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    mariadb-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite headers

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Create and set permissions for files directory
RUN mkdir -p web/sites/default/files \
    && chown -R www-data:www-data web/sites/default/files \
    && chmod -R 755 web/sites/default/files \
    && chown -R www-data:www-data web/sites/default \
    && chmod 644 web/sites/default/settings.php

# Extract files if they exist
RUN if [ -f drupal-files.tar.gz ]; then \
        tar -xzf drupal-files.tar.gz -C web/sites/default/ && \
        chown -R www-data:www-data web/sites/default/files && \
        rm drupal-files.tar.gz; \
    fi

# Apache configuration
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/web\n\
    <Directory /var/www/html/web>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80

# Startup script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
EOF

echo "🔧 Creating Docker entrypoint..."
cat > "$SNAPSHOT_DIR/docker-entrypoint.sh" << 'EOF'
#!/bin/bash
set -e

# Import database on first run
if [ ! -f /var/www/html/.db-imported ]; then
    echo "Importing database..."
    
    # Wait for database to be ready
    while ! mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" --silent; do
        echo "Waiting for database..."
        sleep 2
    done
    
    # Import database
    if [ -f /var/www/html/database.sql.gz ]; then
        gunzip -c /var/www/html/database.sql.gz | mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME"
        echo "Database imported successfully"
        touch /var/www/html/.db-imported
        rm /var/www/html/database.sql.gz
    fi
fi

# Execute the original command
exec "$@"
EOF

echo "🐙 Creating docker-compose.yml..."
cat > "$SNAPSHOT_DIR/docker-compose.yml" << EOF
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=drupal
      - DB_USER=drupal
      - DB_PASSWORD=drupal
    depends_on:
      - db
    volumes:
      - files_data:/var/www/html/web/sites/default/files

  db:
    image: mariadb:10.6
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=drupal
      - MYSQL_USER=drupal
      - MYSQL_PASSWORD=drupal
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
  files_data:
EOF

echo "📝 Creating deployment README..."
cat > "$SNAPSHOT_DIR/README.md" << EOF
# Adesso CMS Deployment Snapshot

Generated on: $(date)
Source: $(pwd)

## Quick Deployment

### Using Docker Compose (Recommended)
\`\`\`bash
docker-compose up -d
\`\`\`

### Using Docker Build
\`\`\`bash
docker build -t adesso-cms .
docker run -p 80:80 adesso-cms
\`\`\`

### For Coolify/GitHub Deployment
1. Push this directory to a GitHub repository
2. Connect the repository to Coolify
3. Coolify will automatically detect the Dockerfile
4. Set environment variables if needed:
   - DB_HOST
   - DB_NAME
   - DB_USER
   - DB_PASSWORD

## Files Included
- Complete Drupal codebase
- Database snapshot (database.sql.gz)
- Uploaded files (drupal-files.tar.gz)
- Production-ready Dockerfile
- Docker Compose configuration

## Notes
- Database will be automatically imported on first container start
- Files are extracted during Docker build
- Apache is configured for Drupal
- Health checks included
EOF

echo "🎯 Creating .dockerignore..."
cat > "$SNAPSHOT_DIR/.dockerignore" << 'EOF'
.git
.ddev
*.md
.gitignore
node_modules
.DS_Store
Thumbs.db
*.log
.env
.env.local
EOF

cd "$CURRENT_DIR"

echo ""
echo "✅ Deployment snapshot created successfully!"
echo "📁 Location: $SNAPSHOT_DIR"
echo ""
echo "🚀 Next steps:"
echo "1. cd $SNAPSHOT_DIR"
echo "2. git init && git add . && git commit -m 'Initial deployment snapshot'"
echo "3. Push to GitHub repository"
echo "4. Deploy via Coolify using the GitHub repository"
echo ""
echo "🧪 Test locally:"
echo "cd $SNAPSHOT_DIR && docker-compose up"