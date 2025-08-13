module.exports = async (page, scenario, vp) => {
  await require('./clickAndHoverHelper')(page, scenario);

  console.log('SCENARIO > ' + scenario.label);
  
  // Disable animations for consistent screenshots
  await page.evaluateOnNewDocument(() => {
    const css = `
      *, *::before, *::after {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        background-attachment: initial !important;
        scroll-behavior: auto !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  });

  // Set viewport for full page screenshots when capturing document
  if (scenario.selectors && scenario.selectors.includes('document')) {
    await page.setViewportSize({
      width: vp.width,
      height: vp.height
    });
  }
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
};