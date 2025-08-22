#!/bin/bash

# Fix all pre_headline fields to allow null values
files=(
  "web/themes/custom/adesso_cms_theme/components/block-reference/block-reference.component.yml"
  "web/themes/custom/adesso_cms_theme/components/embed/embed.component.yml"
  "web/themes/custom/adesso_cms_theme/components/gallery/gallery.component.yml"
  "web/themes/custom/adesso_cms_theme/components/hero/hero.component.yml"
  "web/themes/custom/adesso_cms_theme/components/newsletter-form/newsletter-form.component.yml"
  "web/themes/custom/adesso_cms_theme/components/pricing/pricing-card.component.yml"
  "web/themes/custom/adesso_cms_theme/components/pricing/pricing.component.yml"
  "web/themes/custom/adesso_cms_theme/components/section-header/section-header.component.yml"
  "web/themes/custom/adesso_cms_theme/components/sidebyside/sidebyside.component.yml"
  "web/themes/custom/adesso_cms_theme/components/text/text.component.yml"
)

for file in "${files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "Fixing: $file"
    # Replace type: string with type: [string, 'null'] for pre_headline
    sed -i.bak '/pre_headline:/,/^    [a-z]/ {
      s/type: string/type:\n        - string\n        - '\''null'\''/
    }' "$file"
  fi
done

echo "✅ All pre_headline fields updated to allow null values"