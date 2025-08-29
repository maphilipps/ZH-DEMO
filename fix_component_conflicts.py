#!/usr/bin/env python3

import os
import re
from pathlib import Path

def find_and_fix_conflicts(components_dir):
    """Find and fix all prop/slot conflicts in component files."""
    conflicts_fixed = 0
    
    # Walk through all component directories
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith('.component.yml'):
                file_path = os.path.join(root, file)
                print(f"Checking {file_path}...")
                
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    # Find props section
                    props_match = re.search(r'props:\s*\n\s*type:\s*object\s*\n\s*properties:\s*\n(.*?)(?=^\w|\Z)', content, re.MULTILINE | re.DOTALL)
                    props = []
                    if props_match:
                        props_section = props_match.group(1)
                        # Extract property names (4 spaces indentation)
                        props = re.findall(r'^\s{4}([a-zA-Z_][a-zA-Z0-9_]*):', props_section, re.MULTILINE)
                    
                    # Find slots section  
                    slots_match = re.search(r'slots:\s*\n(.*?)(?=^\w|\Z)', content, re.MULTILINE | re.DOTALL)
                    slots = []
                    if slots_match:
                        slots_section = slots_match.group(1)
                        # Extract slot names (2 spaces indentation)
                        slots = re.findall(r'^\s{2}([a-zA-Z_][a-zA-Z0-9_]*):', slots_section, re.MULTILINE)
                    
                    # Find conflicts
                    conflicts = list(set(props) & set(slots))
                    
                    if conflicts:
                        print(f"Found conflicts in {file_path}: {conflicts}")
                        original_content = content
                        
                        # Remove conflicting props (keep slots, remove from props)
                        for conflict in conflicts:
                            # Pattern to match the entire prop block
                            prop_pattern = rf'^\s{{4}}{re.escape(conflict)}:.*?(?=^\s{{4}}[a-zA-Z_]|\nslots:|\n[a-zA-Z]|\Z)'
                            content = re.sub(prop_pattern, '', content, flags=re.MULTILINE | re.DOTALL)
                            print(f"  Removed prop: {conflict}")
                            conflicts_fixed += 1
                        
                        # Write back if changed
                        if content != original_content:
                            with open(file_path, 'w') as f:
                                f.write(content)
                            print(f"  Fixed {file_path}")
                        
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    return conflicts_fixed

if __name__ == "__main__":
    components_path = "/Users/marc.philipps/Sites/zh-demo/web/themes/custom/adesso_cms_theme/components"
    if os.path.exists(components_path):
        total_fixed = find_and_fix_conflicts(components_path)
        print(f"Total conflicts fixed: {total_fixed}")
    else:
        print(f"Components directory not found: {components_path}")