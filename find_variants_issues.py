#!/usr/bin/env python3

import os
import re

def find_variants_issues(components_dir):
    """Find all components with variants configurations and check for array/object issues."""
    issues_found = []
    
    # Walk through all component directories
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith('.component.yml'):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    # Check if file has variants section
                    if 'variants:' in content:
                        print(f"\n=== VARIANTS FOUND IN: {file_path} ===")
                        
                        # Extract the variants section using regex
                        variants_match = re.search(r'variants:\s*\n((?:[ \t]+.*\n)*)', content, re.MULTILINE)
                        if variants_match:
                            variants_section = variants_match.group(0)
                            print("Raw variants section:")
                            print(variants_section)
                            
                            # Check for problematic patterns
                            if 'default: []' in variants_section:
                                issues_found.append({
                                    'file': file_path,
                                    'issue': 'variants.default is empty array [], should be {}',
                                    'pattern': 'default: []'
                                })
                            elif 'default:\n' in variants_section and not 'default: {}' in variants_section:
                                # Check if default has array-like content (starts with -)
                                default_content_match = re.search(r'default:\s*\n((?:[ \t]+.*\n)*)', variants_section)
                                if default_content_match:
                                    default_content = default_content_match.group(1)
                                    if '-' in default_content.strip()[:5]:  # Check if starts with array syntax
                                        issues_found.append({
                                            'file': file_path,
                                            'issue': 'variants.default contains array syntax (starts with -), should be object',
                                            'content': default_content.strip()[:100] + '...' if len(default_content.strip()) > 100 else default_content.strip()
                                        })
                        else:
                            # Look for variants: followed by different patterns
                            variants_line_match = re.search(r'variants:\s*(.*)$', content, re.MULTILINE)
                            if variants_line_match:
                                variants_value = variants_line_match.group(1).strip()
                                print(f"Variants line value: '{variants_value}'")
                                if variants_value == '[]':
                                    issues_found.append({
                                        'file': file_path,
                                        'issue': 'variants is empty array [], should be object',
                                        'pattern': 'variants: []'
                                    })
                        
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    return issues_found

if __name__ == "__main__":
    components_path = "/Users/marc.philipps/Sites/zh-demo/web/themes/custom/adesso_cms_theme/components"
    if os.path.exists(components_path):
        print("Scanning for variants configuration issues...")
        issues = find_variants_issues(components_path)
        
        print(f"\n\n=== SUMMARY ===")
        print(f"Total issues found: {len(issues)}")
        for issue in issues:
            print(f"- {issue['file']}: {issue['issue']}")
            if 'current_value' in issue:
                print(f"  Current value: {issue['current_value']}")
    else:
        print(f"Components directory not found: {components_path}")