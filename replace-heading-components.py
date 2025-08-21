#!/usr/bin/env python3
"""
Script to replace all @components/h*.html.twig references with the proper heading component
"""

import os
import re
import glob
from pathlib import Path

THEME_PATH = "/Users/marc.philipps/Sites/zh-demo/web/themes/custom/adesso_cms_theme"

def fix_heading_reference(content):
    """Fix heading component references in a file content"""
    
    # Pattern to match include statements with @components heading references
    pattern = r"{{ include\(['\"']@components/(headline/)?h(\d)\.html\.twig['\"'],\s*\{([^}]+)\}\s*\) }}"
    
    def replace_match(match):
        level = match.group(2)  # The heading level (1-6)
        params = match.group(3)  # The parameters inside the braces
        
        # Parse the parameters
        content_match = re.search(r"['\"]?content['\"]?\s*:\s*([^,}]+)", params)
        as_match = re.search(r"['\"]?as['\"]?\s*:\s*['\"]([^'\"]+)['\"]", params)
        level_match = re.search(r"['\"]?level['\"]?\s*:\s*(\d+)", params)
        color_match = re.search(r"['\"]?color['\"]?\s*:\s*['\"]([^'\"]+)['\"]", params)
        attributes_match = re.search(r"['\"]?attributes['\"]?\s*:\s*([^,}]+)", params)
        
        # Get values
        content_val = content_match.group(1).strip() if content_match else "''"
        as_val = as_match.group(1) if as_match else f"h{level}"
        visual_level = level_match.group(1) if level_match else level
        
        # Build the new include
        new_include = "{{ include('@adesso_cms_theme/heading/heading.twig', {\n"
        new_include += "        heading: {\n"
        new_include += f"          title: {content_val}"
        
        if as_val:
            new_include += f",\n          as: '{as_val}'"
            
        if visual_level:
            new_include += f",\n          visual_level: '{visual_level}'"
            
        if color_match:
            new_include += f",\n          additional_classes: '{color_match.group(1)}'"
            
        if attributes_match and 'setAttribute' in attributes_match.group(1):
            # Extract ID if it's being set
            id_match = re.search(r"setAttribute\(['\"]id['\"],\s*([^)]+)\)", attributes_match.group(1))
            if id_match:
                new_include += f",\n          id: {id_match.group(1)}"
        
        new_include += "\n        }\n      }) }}"
        
        return new_include
    
    # Replace all occurrences
    content = re.sub(pattern, replace_match, content)
    
    # Also handle {% include syntax (different from {{ include)
    pattern2 = r"{% include ['\"']@components/(headline/)?h(\d)\.html\.twig['\"']\s+with\s+\{([^}]+)\}\s*%}"
    
    def replace_match2(match):
        level = match.group(2)
        params = match.group(3)
        
        content_match = re.search(r"['\"]?content['\"]?\s*:\s*([^,}]+)", params)
        content_val = content_match.group(1).strip() if content_match else "''"
        
        new_include = "{{ include('@adesso_cms_theme/heading/heading.twig', {\n"
        new_include += "        heading: {\n"
        new_include += f"          title: {content_val},\n"
        new_include += f"          as: 'h{level}',\n"
        new_include += f"          visual_level: '{level}'\n"
        new_include += "        }\n    }) }}"
        
        return new_include
    
    content = re.sub(pattern2, replace_match2, content)
    
    return content

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file needs processing
        if '@components/h' not in content and '@components/headline/h' not in content:
            return False
        
        # Create backup
        backup_path = filepath + '.bak2'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Fix the content
        new_content = fix_heading_reference(content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Fixed: {filepath}")
        return True
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Main function"""
    print("Starting to fix heading component references...")
    
    # Find all Twig files
    twig_files = glob.glob(os.path.join(THEME_PATH, "**/*.twig"), recursive=True)
    
    fixed_count = 0
    for filepath in twig_files:
        if process_file(filepath):
            fixed_count += 1
    
    print(f"\nFixed {fixed_count} files")
    print("Backup files created with .bak2 extension")

if __name__ == "__main__":
    main()