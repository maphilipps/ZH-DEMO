FROM debian:bookworm-slim

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

ENV php_version="8.3"

# Add Ondrej Sury's apt repo and requirements.
RUN apt-get update \
    && apt-get install -y apt-transport-https lsb-release ca-certificates curl wget git \
    && wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    && echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list \
    && rm -rf /var/lib/apt/lists/*

# Install Apache and PHP.
RUN apt-get update \
    && apt-get install -y \
       apache2 libapache2-mod-php${php_version} libpcre3-dev unzip \
       php${php_version}-common php${php_version}-dev php${php_version}-gd php${php_version}-curl php${php_version}-imap php${php_version}-opcache php${php_version}-xml php${php_version}-mbstring php${php_version}-mysql php${php_version}-zip php${php_version}-apcu \
       mariadb-client --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Force specific version of PHP.
RUN update-alternatives --set php /usr/bin/php${php_version} \
    && update-alternatives --set phar /usr/bin/phar${php_version} \
    && update-alternatives --set phar.phar /usr/bin/phar.phar${php_version} \
    && update-alternatives --set phpize /usr/bin/phpize${php_version} \
    && update-alternatives --set php-config /usr/bin/php-config${php_version}

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN a2enmod rewrite

RUN rm -f /etc/apache2/sites-enabled/000-default.conf
COPY vhosts.conf /etc/apache2/sites-enabled/vhosts.conf

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/docker-entrypoint.sh / # For backwards compatibility.

# PHP Dependency install via Composer.
# FROM composer as vendor

COPY composer.json composer.json
COPY composer.lock composer.lock
COPY assets/ assets/
COPY recipes/ recipes/
COPY scripts/ scripts/
COPY web/ web/

RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-dev \
    --prefer-dist

ENV DRUPAL_MD5 aedc6598b71c5393d30242b8e14385e5

# Copy precompiled codebase into the container.
# COPY --from=vendor /app/ /var/www/html/

# Copy other required configuration into the container.
COPY load.environment.php /var/www/html/load.environment.php
COPY assets/settings.php /var/www/html/web/sites/default/settings.php

# Make sure file ownership is correct on the document root.
RUN chown -R www-data:www-data /var/www/html/web

# Add Drush Launcher.
RUN curl -OL https://github.com/drush-ops/drush-launcher/releases/download/0.6.0/drush.phar \
 && chmod +x drush.phar \
 && mv drush.phar /usr/local/bin/drush

# Adjust the Apache docroot.
ENV APACHE_DOCUMENT_ROOT=/var/www/html/web

EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]

WORKDIR "/var/www/html"
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]