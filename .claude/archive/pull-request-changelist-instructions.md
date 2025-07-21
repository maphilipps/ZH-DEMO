---
description: Guidelines for creating consistent pull request changelists in markdown format with proper code block formatting
globs: 
alwaysApply: false
---
---
description: Updated guidelines for creating consistent pull request changelists in markdown format, ensuring strict raw markdown code block formatting and proper structure.
globs: "*.md"
alwaysApply: false
---
# Pull Request Changelist Format

This document outlines strict standards for creating and formatting pull request changelists in markdown. Following these guidelines ensures that the output remains as raw markdown (unrendered) and prevents any issues with Cursor’s markdown rendering.

<rule>
name: pull_request_changelist_format
description: Updated guidelines for creating consistent pull request changelists in markdown with strict code block handling and structured formatting.
filters:
  - type: file_extension
    pattern: "\\.md$"
  - type: content
    pattern: "(?i)(pull request|pr|changelist|changelog)"

actions:
  - type: suggest
    message: |
      ## Updated Pull Request Changelist Guidelines

      To guarantee clarity and consistency, please adhere to the following time-tested, unambiguous guidelines when requesting a PR changelist from Cursor:

      ### 1. Request Format
      **Always explicitly request raw markdown output in a code block** using one of these exact phrases:
      - "Return markdown as code"
      - "Return as code inside markdown as code (one block)"
      - "Provide the markdown in a code block"
      - "Return the content as a markdown code block, not as formatted text"
      - "Generate the PR changelist in a markdown code block"

      Avoid ambiguous wording that could lead to a rendered (formatted) output.

      ### 2. Expected Response Format
      Cursor should always respond with a raw markdown code block that looks like:
      ```
      ```markdown
      # Summary of Changes

      ## Category Name
      - Change item
      ```
      ```

      ### 3. Handling Incorrect Format
      If the response is rendered markdown rather than a raw code block, prompt with one of the following:
      - "Please provide the exact markdown in a code block using triple backticks, not as formatted text."
      - "I require the raw markdown syntax; reformat your response with triple backticks."
      - "Reformat your output as a code block enclosed in triple backticks."

      ### 4. Changelist Structure
      - **Main Heading:** Must begin with `# Summary of Changes`
      - **Categories:** Use `##` headings to group related changes.
      - **Changes:** List each change with a bullet (`-`), starting with a past tense verb (e.g., Added, Updated, Removed).
      - **Code/Variables:** Enclose module names or configuration settings in backticks (e.g., `module_name`).

      ### 5. Content Requirements
      - Be specific about what changed and why.
      - Group similar changes under the appropriate category headings.
      - For configuration changes, include both the setting name and its new value.
      - Keep each entry concise but descriptive.

      ### 6. Example Command
      To request a changelist from Cursor, try:
      ```
      Prepare a PR changelist based on these changes. Return the markdown in a code block with triple backticks.
      ```

      Adhering to these traditional, time-tested formatting guidelines not only prevents ambiguity but also paves the way for future improvements in automated changelist generation.
      
  - type: validate
    conditions:
      - pattern: "^```\\s*markdown\\s*\\n#\\s+Summary\\s+of\\s+Changes"
        message: "The changelist must be a raw markdown code block starting with '# Summary of Changes'. Ensure the use of triple backticks and correct heading structure."
      - pattern: "-\\s+(Added|Updated|Removed)\\b"
        message: "Each bullet point must begin with a past tense verb: 'Added', 'Updated', or 'Removed'."
      
examples:
  - input: |
      Request: "Create a PR changelist for my changes. Return markdown code as code."
      
      Good Response from Cursor:
      ```markdown
      # Summary of Changes

      ## Environment Configuration
      - Updated `STAGE_FILE_PROXY_URL` to data.safeworkaustralia.gov.au
      - Updated `LOCALDEV_URL` to dataswa.docker.amazee.io

      ## Module Changes
      - Removed `page_cache` module
      - Added `stage_file_proxy` module
      ```
    output: |
      This is the correct format for Cursor to return a changelist – as a raw markdown code block enclosed in triple backticks.
      
  - input: |
      Request: "Create a PR changelist for my changes."
      
      Bad Response from Cursor (rendered markdown instead of a code block):
      # Summary of Changes

      ## Environment Configuration
      - Updated `STAGE_FILE_PROXY_URL` to data.safeworkaustralia.gov.au
      - Updated `LOCALDEV_URL` to dataswa.docker.amazee.io
    output: |
      This response is incorrectly formatted as rendered markdown. Please ask Cursor to provide the output as a raw markdown code block with triple backticks.

metadata:
  priority: medium
  version: 1.2
</rule>