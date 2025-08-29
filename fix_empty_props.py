#!/usr/bin/env python3

import os
import re

def fix_empty_properties(components_dir):
    """Find and fix empty properties sections that cause NULL value errors."""
    fixes_made = 0
    
    # Walk through all component directories
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith('.component.yml'):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # Fix empty properties sections (properties: followed immediately by non-indented line)
                    # Pattern 1: properties: followed directly by slots: or other sections
                    content = re.sub(r'properties:\s*\n(\s*)(slots:|variants:|required:|libraryOverrides:)', r'properties: {}\n\1\2', content)
                    
                    # Pattern 2: properties: followed by end of props section
                    content = re.sub(r'properties:\s*\n(required:|slots:|variants:|libraryOverrides:|$)', r'properties: {}\n\1', content)
                    
                    # Write back if changed
                    if content != original_content:
                        with open(file_path, 'w') as f:
                            f.write(content)
                        print(f"Fixed empty properties in: {file_path}")
                        fixes_made += 1
                        
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    return fixes_made

if __name__ == "__main__":
    components_path = "/Users/marc.philipps/Sites/zh-demo/web/themes/custom/adesso_cms_theme/components"
    if os.path.exists(components_path):
        total_fixed = fix_empty_properties(components_path)
        print(f"Total empty properties sections fixed: {total_fixed}")
    else:
        print(f"Components directory not found: {components_path}")