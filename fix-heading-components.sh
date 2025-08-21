#!/bin/bash

# Script to fix all heading component references in Twig templates
# Replaces @components/h*.html.twig with proper heading component

THEME_PATH="/Users/marc.philipps/Sites/zh-demo/web/themes/custom/adesso_cms_theme"

echo "Starting to fix heading component references..."

# Function to convert h1-h6 references to heading component
fix_heading_references() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Create a backup
    cp "$file" "${file}.bak"
    
    # Process the file with sed to replace all variations
    sed -E '
        # Replace @components/h1.html.twig includes
        s/@components\/h1\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/h2.html.twig includes
        s/@components\/h2\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/h3.html.twig includes
        s/@components\/h3\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/h4.html.twig includes
        s/@components\/h4\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/h5.html.twig includes
        s/@components\/h5\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/h6.html.twig includes
        s/@components\/h6\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h1.html.twig includes
        s/@components\/headline\/h1\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h2.html.twig includes
        s/@components\/headline\/h2\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h3.html.twig includes
        s/@components\/headline\/h3\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h4.html.twig includes
        s/@components\/headline\/h4\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h5.html.twig includes
        s/@components\/headline\/h5\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
        
        # Replace @components/headline/h6.html.twig includes
        s/@components\/headline\/h6\.html\.twig/@adesso_cms_theme\/heading\/heading.twig/g
    ' "$file" > "$temp_file"
    
    # Now fix the parameter structure
    # This is more complex as we need to wrap content in a heading object
    perl -i -pe '
        # For simple content parameter - wrap in heading object
        if (/include.*heading\.twig.*,\s*\{/) {
            my $line = $_;
            if ($line =~ /content:\s*[^}]+/) {
                # Extract the content value and other parameters
                if ($line =~ /content:\s*([^,}]+)(?:,)?(.*)/) {
                    my $content_value = $1;
                    my $rest = $2 || "";
                    
                    # Check if there is an "as" parameter for h1-h6
                    my $as_value = "h2";  # default
                    if ($line =~ /\@adesso_cms_theme\/heading\/heading\.twig.*h(\d)/) {
                        $as_value = "h$1";
                    }
                    
                    # Check for level parameter
                    my $level = "";
                    if ($rest =~ /level:\s*(\d+)/) {
                        $level = ", visual_level: '\''$1'\''";
                    }
                    
                    # Check for color parameter
                    my $additional_classes = "";
                    if ($rest =~ /color:\s*'\''([^'\'']+)'\''/) {
                        $additional_classes = ", additional_classes: '\''$1'\''";
                    }
                    
                    # Build the new structure
                    $line =~ s/\{\s*content:.*?\}(?:\s*\))?/\{
      heading: \{
        title: $content_value,
        as: '\''$as_value'\''$level$additional_classes
      \}
    \}\)/;
                }
            }
            $_ = $line;
        }
    ' "$temp_file"
    
    # Move the temp file back
    mv "$temp_file" "$file"
    
    echo "Fixed: $file"
}

# Find all Twig files with heading component references
find "$THEME_PATH" -name "*.twig" -type f | while read -r file; do
    if grep -qE "@components/(headline/)?h[0-9]\.html\.twig" "$file"; then
        fix_heading_references "$file"
    fi
done

echo "Heading component references fixed!"
echo "Backup files created with .bak extension"