#!/bin/bash

# Infrastructure Damage Report Form Setup Script
# GPZH Demo System - Swiss Municipal Portal
# Implementation according to eCH-0010 standards

set -e

# Input validation - script takes no parameters
if [ $# -gt 0 ]; then
    echo "Usage: $0 (no parameters required)"
    echo "This script sets up the Infrastructure Damage Report Form for GPZH Demo"
    exit 1
fi

echo "🏗️  Setting up Infrastructure Damage Report Form for GPZH Demo"
echo "================================================================"

# Color definitions for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f ".ddev/config.yaml" ]; then
    print_error "This script must be run from the project root directory"
    exit 1
fi

# Step 1: Start DDEV and restore database
print_status "Starting DDEV environment..."
ddev start

print_status "Restoring latest database snapshot..."
if [ -f ".ddev/db_snapshots/zh-demo_20250820144737-mariadb_10.11.gz" ]; then
    ddev snapshot restore zh-demo_20250820144737
    print_success "Database snapshot restored"
else
    print_warning "Latest snapshot not found, using existing database"
fi

# Step 2: Enable required modules
print_status "Enabling required Webform modules..."
ddev drush en webform webform_ui webform_views file image -y
print_success "Webform modules enabled"

# Step 3: Clear caches
print_status "Clearing all caches..."
ddev drush cr
print_success "Caches cleared"

# Step 4: Create directory for damage report uploads
print_status "Creating upload directories..."
ddev exec mkdir -p web/sites/default/files/damage_reports
ddev exec chmod 775 web/sites/default/files/damage_reports
print_success "Upload directories created"

# Step 5: Import webform configuration
print_status "Importing Infrastructure Damage Report webform configuration..."

# Check if the webform configuration file exists
WEBFORM_CONFIG="config/install/webform.webform.infrastructure_damage_report.yml"
if [ -f "$WEBFORM_CONFIG" ]; then
    print_status "Webform configuration found, installing..."
    
    # Create temporary config directory and copy the webform config
    TEMP_CONFIG_DIR="/tmp/webform_import_$(date +%s)"
    mkdir -p "$TEMP_CONFIG_DIR"
    cp "$WEBFORM_CONFIG" "$TEMP_CONFIG_DIR/"
    
    # Import using Drush config import from directory
    print_status "Importing webform configuration via Drush..."
    ddev drush config:import --partial --source="$TEMP_CONFIG_DIR" -y
    
    # Clean up temporary directory
    rm -rf "$TEMP_CONFIG_DIR"
    
    print_success "Infrastructure Damage Report webform created"
else
    print_error "Webform configuration file not found at $WEBFORM_CONFIG"
    exit 1
fi

# Step 6: Create necessary roles
print_status "Setting up user roles and permissions..."

# Create infrastructure_manager role if it doesn't exist
ddev drush role:create infrastructure_manager "Infrastruktur-Verantwortlicher" || print_warning "Role may already exist"

# Set permissions for infrastructure_manager role
ddev drush role:perm:add infrastructure_manager "view any webform submission,edit any webform submission,delete any webform submission,view webform submission log,access webform overview,export webform submissions"

# Set permissions for editor role
ddev drush role:perm:add editor "view any webform submission,edit any webform submission,view webform submission log"

print_success "User roles and permissions configured"

# Step 7: Create test user accounts
print_status "Creating test user accounts..."

# Create infrastructure manager test user
ddev drush user:create inframanager --mail="inframanager@bruchtal.ch" --password="demo123" || print_warning "User may already exist"
ddev drush user:role:add infrastructure_manager inframanager

# Create editor test user
ddev drush user:create editor_test --mail="editor@bruchtal.ch" --password="demo123" || print_warning "User may already exist"
ddev drush user:role:add editor editor_test

print_success "Test user accounts created"

# Step 8: Configure email settings for demo
print_status "Configuring email settings for demo environment..."
ddev drush config:set system.mail interface.default devel_mail_log
print_success "Email logging configured for demo"

# Step 9: Create Views for admin dashboard
print_status "Setting up Views dashboard for damage reports..."

# Import Views configuration (this would normally be in config/sync)
cat << 'EOF' | ddev drush config:set --input-format=yaml views.view.infrastructure_damage_reports -
uuid: null
langcode: de
status: true
dependencies:
  module:
    - user
    - webform
id: infrastructure_damage_reports
label: 'Infrastrukturschäden-Übersicht'
module: views
description: 'Tabellarische Übersicht aller gemeldeten Infrastrukturschäden'
tag: ''
base_table: webform_submission
base_field: sid
display:
  default:
    id: default
    display_title: Standard
    display_plugin: default
    position: 0
    display_options:
      title: 'Infrastrukturschäden-Meldungen'
      fields:
        sid:
          id: sid
          table: webform_submission
          field: sid
          relationship: none
          group_type: group
          admin_label: ''
          plugin_id: field
          label: 'Nr.'
          exclude: false
          alter:
            alter_text: false
            text: ''
            make_link: false
            path: ''
            absolute: false
            external: false
            replace_spaces: false
            path_case: none
            trim_whitespace: false
            alt: ''
            rel: ''
            link_class: ''
            prefix: ''
            suffix: ''
            target: ''
            nl2br: false
            max_length: 0
            word_boundary: true
            ellipsis: true
            more_link: false
            more_link_text: ''
            more_link_path: ''
            strip_tags: false
            trim: false
            preserve_tags: ''
            html: false
          element_type: ''
          element_class: ''
          element_label_type: ''
          element_label_class: ''
          element_label_colon: true
          element_wrapper_type: ''
          element_wrapper_class: ''
          element_default_classes: true
          empty: ''
          hide_empty: false
          empty_zero: false
          hide_alter_empty: true
        created:
          id: created
          table: webform_submission
          field: created
          relationship: none
          group_type: group
          admin_label: ''
          plugin_id: date
          label: 'Eingegangen am'
          exclude: false
          alter:
            alter_text: false
            text: ''
            make_link: false
            path: ''
            absolute: false
            external: false
            replace_spaces: false
            path_case: none
            trim_whitespace: false
            alt: ''
            rel: ''
            link_class: ''
            prefix: ''
            suffix: ''
            target: ''
            nl2br: false
            max_length: 0
            word_boundary: true
            ellipsis: true
            more_link: false
            more_link_text: ''
            more_link_path: ''
            strip_tags: false
            trim: false
            preserve_tags: ''
            html: false
          element_type: ''
          element_class: ''
          element_label_type: ''
          element_label_class: ''
          element_label_colon: true
          element_wrapper_type: ''
          element_wrapper_class: ''
          element_default_classes: true
          empty: ''
          hide_empty: false
          empty_zero: false
          hide_alter_empty: true
          date_format: custom
          custom_date_format: 'd.m.Y H:i'
          timezone: ''
      pager:
        type: full
        options:
          offset: 0
          items_per_page: 50
          total_pages: null
          id: 0
          tags:
            next: ››
            previous: ‹‹
            first: '« Erste'
            last: 'Letzte »'
          expose:
            items_per_page: false
            items_per_page_label: 'Elemente pro Seite'
            items_per_page_options: '5, 10, 25, 50'
            items_per_page_options_all: false
            items_per_page_options_all_label: '- Alle -'
            offset: false
            offset_label: 'Versatz'
          quantity: 9
      exposed_form:
        type: basic
        options:
          submit_button: Anwenden
          reset_button: false
          reset_button_label: Zurücksetzen
          exposed_sorts_label: 'Sortieren nach'
          expose_sort_order: true
          sort_asc_label: Aufsteigend
          sort_desc_label: Absteigend
      access:
        type: role
        options:
          role:
            administrator: administrator
            editor: editor
            infrastructure_manager: infrastructure_manager
      cache:
        type: tag
        options: {  }
      empty: {  }
      sorts:
        created:
          id: created
          table: webform_submission
          field: created
          relationship: none
          group_type: group
          admin_label: ''
          plugin_id: date
          order: DESC
          expose:
            label: ''
            field_identifier: ''
          exposed: false
      arguments: {  }
      filters:
        webform_id:
          id: webform_id
          table: webform_submission
          field: webform_id
          relationship: none
          group_type: group
          admin_label: ''
          plugin_id: string
          operator: '='
          value: infrastructure_damage_report
          group: 1
          exposed: false
          expose:
            operator_id: ''
            label: ''
            description: ''
            use_operator: false
            operator: ''
            operator_limit_selection: false
            operator_list: {  }
            identifier: ''
            required: false
            remember: false
            multiple: false
            remember_roles:
              authenticated: authenticated
              anonymous: '0'
              administrator: '0'
              editor: '0'
            placeholder: ''
          is_grouped: false
          group_info:
            label: ''
            description: ''
            identifier: ''
            optional: true
            widget: select
            multiple: false
            remember: false
            default_group: All
            default_group_multiple: {  }
            group_items: {  }
      style:
        type: table
        options:
          grouping: {  }
          row_class: ''
          default_row_class: true
          columns:
            sid: sid
            created: created
          default: created
          info:
            sid:
              sortable: true
              default_sort_order: asc
              align: ''
              separator: ''
              empty_column: false
              responsive: ''
            created:
              sortable: true
              default_sort_order: desc
              align: ''
              separator: ''
              empty_column: false
              responsive: ''
          override: true
          sticky: true
          summary: ''
          empty_table: true
          caption: ''
      row:
        type: fields
        options:
          default_field_elements: true
          inline: {  }
          separator: ''
          hide_empty: false
      query:
        type: views_query
        options:
          query_comment: ''
          disable_sql_rewrite: false
          distinct: false
          replica: false
          query_tags: {  }
      relationships: {  }
      header: {  }
      footer: {  }
      display_extenders: {  }
    cache_metadata:
      max-age: -1
      contexts:
        - 'languages:language_content'
        - 'languages:language_interface'
        - url.query_args
        - 'user.permissions'
      tags: {  }
  page_admin:
    id: page_admin
    display_title: 'Admin Dashboard'
    display_plugin: page
    position: 1
    display_options:
      display_extenders: {  }
      path: admin/infrastructure/damage-reports
      menu:
        type: normal
        title: Schadensmeldungen
        description: 'Verwaltung der Infrastrukturschäden-Meldungen'
        expanded: false
        parent: system.admin_structure
        weight: 0
        context: '0'
        menu_name: admin
EOF

print_success "Views dashboard created"

# Step 10: Generate test data
print_status "Generating test data..."

# Create a simple test data generation script
cat << 'EOF' > /tmp/generate_test_data.php
<?php

use Drupal\webform\Entity\Webform;
use Drupal\webform\Entity\WebformSubmission;

// Load the webform
$webform = Webform::load('infrastructure_damage_report');

if (!$webform) {
  echo "Webform not found!\n";
  return;
}

// Test data arrays
$damage_types = ['strasse', 'gehweg', 'beleuchtung', 'signalisation', 'kanalisation', 'spielplatz', 'parkanlage', 'bruecke', 'gebaeude', 'andere'];
$severities = ['niedrig', 'mittel', 'hoch', 'notfall'];
$statuses = ['new', 'in_progress', 'completed', 'rejected'];

// Lord of the Rings themed names
$names = [
  'Frodo Beutlin', 'Samweis Gamdschie', 'Gandalf der Graue',
  'Aragorn Streicher', 'Legolas Grünblatt', 'Gimli Glóins Sohn',
  'Boromir von Gondor', 'Faramir von Ithilien', 'Éowyn von Rohan',
  'Théoden König', 'Éomer Marschall', 'Arwen Abendstern',
  'Elrond Halbelb', 'Galadriel von Lothlórien', 'Pippin Tuk',
  'Merry Brandybock', 'Bilbo Beutlin', 'Tom Bombadil'
];

$streets = [
  'Beutelsend', 'Hobbingen-Weg', 'Grüner Drache Gasse',
  'Bruchtal-Strasse', 'Isengart-Allee', 'Minas Tirith Platz',
  'Rohan-Weg', 'Gondor-Strasse', 'Lothlórien-Park',
  'Düsterwald-Pfad', 'Erebor-Strasse', 'Auenland-Weg'
];

$descriptions = [
  'Ein grosses Schlagloch hat sich gebildet, das die Durchfahrt erschwert.',
  'Die Strassenbeleuchtung ist ausgefallen und muss dringend repariert werden.',
  'Der Gehweg ist durch Wurzeln angehoben und stellt eine Stolpergefahr dar.',
  'Das Verkehrsschild ist umgeknickt und muss neu befestigt werden.',
  'Der Kanaldeckel ist locker und macht laute Geräusche bei Überfahrt.',
  'Die Parkbank ist beschädigt und nicht mehr sicher benutzbar.',
  'Der Spielplatz-Zaun hat eine gefährliche Lücke.',
  'Die Brückengeländer sind verrostet und instabil.',
  'Graffiti an der Wand des Gemeindehauses.',
  'Der Abfalleimer ist überfüllt und muss geleert werden.'
];

// Generate 25 test submissions
for ($i = 1; $i <= 25; $i++) {
  $name = $names[array_rand($names)];
  $street = $streets[array_rand($streets)];
  $damage_type = $damage_types[array_rand($damage_types)];
  $severity = $severities[array_rand($severities)];
  $status = $statuses[array_rand($statuses)];
  $description = $descriptions[array_rand($descriptions)];
  
  $submission_data = [
    'name' => $name,
    'email' => 'test' . $i . '@bruchtal.ch',
    'phone' => '079 ' . rand(100, 999) . ' ' . rand(10, 99) . ' ' . rand(10, 99),
    'damage_type' => $damage_type,
    'damage_severity' => $severity,
    'damage_description' => $description,
    'damage_date' => date('Y-m-d', strtotime('-' . rand(0, 30) . ' days')),
    'location_description' => 'Bei ' . $street . ' ' . rand(1, 100),
    'street' => $street,
    'house_number' => (string) rand(1, 150),
    'postal_code' => '8' . str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT),
    'locality' => 'Bruchtal',
    'status' => $status,
    'priority' => $severity
  ];
  
  // Create submission
  $submission = WebformSubmission::create([
    'webform_id' => 'infrastructure_damage_report',
    'data' => $submission_data,
    'remote_addr' => '127.0.0.1',
  ]);
  
  $submission->save();
  
  if ($i % 5 == 0) {
    echo "Generated $i submissions...\n";
  }
}

echo "Successfully generated 25 damage report test submissions!\n";
EOF

ddev drush scr /tmp/generate_test_data.php
rm /tmp/generate_test_data.php
print_success "Test data generated (25 submissions)"

# Step 11: Clear caches and set up proper permissions
print_status "Final cache clear and permission setup..."
ddev drush cr

# Set proper file permissions for uploads
ddev exec chmod -R 775 web/sites/default/files/damage_reports

print_success "Infrastructure Damage Report Form setup completed!"

# Step 12: Display access information
echo ""
echo "📋 Infrastructure Damage Report Form - Access Information"
echo "========================================================"
echo ""
echo "🌐 Form Access:"
echo "   Public Form: https://bruchtal.zh-demo.ddev.site/form/infrastructure-damage-report"
echo "   Admin Dashboard: https://bruchtal.zh-demo.ddev.site/admin/infrastructure/damage-reports"
echo ""
echo "👥 Test Accounts:"
echo "   Infrastructure Manager: inframanager / demo123"
echo "   Editor: editor_test / demo123"
echo "   Admin: admin / admin (existing)"
echo ""
echo "📊 Features Implemented:"
echo "   ✅ Swiss eCH-0010 compliant address fields"
echo "   ✅ Phone number validation (Swiss format)"
echo "   ✅ File upload (max 3 photos, 5MB each)"
echo "   ✅ 3-stage workflow (Neu → In Bearbeitung → Erledigt)"
echo "   ✅ Email confirmations and notifications"
echo "   ✅ Views dashboard with filtering"
echo "   ✅ 25 test submissions with LoTR names"
echo "   ✅ Responsive design with Tailwind CSS"
echo ""
echo "🎯 Next Steps:"
echo "   1. Test form submission: Visit the public form URL"
echo "   2. Review admin dashboard: Visit the admin dashboard URL"
echo "   3. Test workflow: Change status of submissions"
echo "   4. Validate email notifications in mail log"
echo ""
echo "🔧 Troubleshooting:"
echo "   - Check mail log: ddev drush maillog"
echo "   - Clear caches: ddev drush cr"
echo "   - Check permissions: ddev drush user:information [username]"
echo ""

print_success "Setup completed successfully! Infrastructure Damage Report Form is ready for demo."