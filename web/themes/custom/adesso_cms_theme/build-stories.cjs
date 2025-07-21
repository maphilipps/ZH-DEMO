const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { convertStoryToYml } = require('./story-to-yml.cjs');

async function buildAllStories() {
  try {
    // Find all story files in the components directory
    const storyFiles = glob.sync('components/**/*.stories.js');

    console.log(`Found ${storyFiles.length} story files to process...`);

    // Components to skip (manually maintained schemas)
    const skipComponents = ['main-menu', 'site-header'];

    // Process each story file
    for (const storyPath of storyFiles) {
      try {
        // Check if this component should be skipped
        const componentName = path.basename(path.dirname(storyPath));
        if (skipComponents.includes(componentName)) {
          console.log(`⚠ Skipped ${path.basename(storyPath)} (manually maintained schema)`);
          continue;
        }

        // Generate output path by replacing .stories.js with .component.yml
        const outputPath = storyPath.replace('.stories.js', '.component.yml');

        // Convert the story
        await convertStoryToYml(storyPath, outputPath);
        console.log(`✓ Converted ${path.basename(storyPath)}`);
      } catch (error) {
        console.error(`✗ Failed to convert ${storyPath}:`, error.message);
      }
    }

    console.log('\nStory conversion complete!');
  } catch (error) {
    console.error('Error building stories:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildAllStories();
}

module.exports = { buildAllStories };
