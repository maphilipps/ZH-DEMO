module.exports = async (page, scenario, vp) => {
  await require('./clickAndHoverHelper')(page, scenario);

  // Add any custom setup here
  console.log('SCENARIO > ' + scenario.label);
  
  // Disable animations to ensure consistent screenshots
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

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
};