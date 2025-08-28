/**
 * @file
 * Theme customization functionality for Issue #36.
 *
 * Provides live preview of color palettes and Google Fonts
 * in the theme settings admin interface.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Theme customization behavior.
   */
  Drupal.behaviors.themeCustomization = {
    attach: function (context, settings) {
      once('theme-customization', 'form', context).forEach(function (form) {
        initializeThemeCustomization(form);
      });
    },
  };

  /**
   * Initialize theme customization functionality.
   */
  function initializeThemeCustomization(form) {
    const colorPicker = form.querySelector('.theme-color-picker');
    const fontSelector = form.querySelector('.theme-font-selector');
    const municipalityPresets = form.querySelectorAll(
      '.municipality-preset-selector input[type="radio"]'
    );
    const exportButton = form.querySelector('.export-theme-settings');

    // Initialize color palette preview
    if (colorPicker) {
      updateColorPalette(colorPicker.value);
      colorPicker.addEventListener('input', function (e) {
        updateColorPalette(e.target.value);
        updateLivePreview();
      });
    }

    // Initialize font preview
    if (fontSelector) {
      updateFontPreview(fontSelector.value);
      fontSelector.addEventListener('change', function (e) {
        updateFontPreview(e.target.value);
        updateLivePreview();
      });
    }

    // Initialize municipality presets
    municipalityPresets.forEach(function (preset) {
      preset.addEventListener('change', function (e) {
        if (e.target.checked) {
          applyMunicipalityPreset(e.target.value);
        }
      });
    });

    // Initialize export functionality
    if (exportButton) {
      exportButton.addEventListener('click', function (e) {
        e.preventDefault();
        exportThemeSettings();
      });
    }

    // Initialize live preview
    updateLivePreview();
  }

  /**
   * Update color palette preview.
   */
  function updateColorPalette(primaryColor) {
    const previewContainer = document.getElementById('color-palette-preview');
    if (!previewContainer) return;

    // Generate palette using HSL algorithm (simplified client-side version)
    const palette = generateTailwindPalette(primaryColor);

    let html =
      '<div class="color-palette-swatches" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">';

    Object.entries(palette).forEach(([shade, color]) => {
      const textColor = shade < 500 ? '#000000' : '#ffffff';
      html += `
        <div class="color-swatch" style="
          background-color: ${color};
          color: ${textColor};
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          min-width: 60px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        ">
          <div>${shade}</div>
          <div style="font-size: 10px; opacity: 0.8;">${color}</div>
        </div>
      `;
    });

    html += '</div>';
    previewContainer.innerHTML = html;
  }

  /**
   * Update font preview.
   */
  function updateFontPreview(fontKey) {
    const previewElement = document.getElementById('font-preview');
    if (!previewElement) return;

    const fontConfigs = {
      inter: {
        family: 'Inter',
        fallback: 'sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
      'crimson-text': {
        family: 'Crimson Text',
        fallback: 'serif',
        url: 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap',
      },
      'playfair-display': {
        family: 'Playfair Display',
        fallback: 'serif',
        url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
      },
      'open-sans': {
        family: 'Open Sans',
        fallback: 'sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap',
      },
      montserrat: {
        family: 'Montserrat',
        fallback: 'sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap',
      },
    };

    const config = fontConfigs[fontKey] || fontConfigs['inter'];

    // Load font dynamically
    loadGoogleFont(config.url);

    // Update preview text style
    previewElement.style.fontFamily = `'${config.family}', ${config.fallback}`;

    // Update preview text content
    previewElement.innerHTML = `
      <div style="margin-bottom: 8px;">
        <strong>Font:</strong> ${config.family}
      </div>
      <div style="font-size: 18px; line-height: 1.4;">
        The quick brown fox jumps over the lazy dog.<br>
        <span style="font-size: 14px;">Gemeinde Bruchtal - Leben am See</span>
      </div>
    `;
  }

  /**
   * Apply municipality preset.
   */
  function applyMunicipalityPreset(municipality) {
    const presets = {
      thalwil: { color: '#1e3a8a', font: 'inter' },
      thalheim: { color: '#15803d', font: 'crimson-text' },
      erlenbach: { color: '#0891b2', font: 'playfair-display' },
      default: { color: '#3b82f6', font: 'open-sans' },
    };

    const preset = presets[municipality] || presets['default'];

    // Update form fields
    const colorPicker = document.querySelector('.theme-color-picker');
    const fontSelector = document.querySelector('.theme-font-selector');

    if (colorPicker && preset.color) {
      colorPicker.value = preset.color;
      updateColorPalette(preset.color);
    }

    if (fontSelector && preset.font) {
      fontSelector.value = preset.font;
      updateFontPreview(preset.font);
    }

    updateLivePreview();
  }

  /**
   * Update live preview area.
   */
  function updateLivePreview() {
    const previewArea = document.getElementById('theme-live-preview');
    if (!previewArea) return;

    const colorPicker = document.querySelector('.theme-color-picker');
    const fontSelector = document.querySelector('.theme-font-selector');

    if (!colorPicker || !fontSelector) return;

    const primaryColor = colorPicker.value;
    const fontKey = fontSelector.value;
    const palette = generateTailwindPalette(primaryColor);

    // Update CSS custom properties for live preview
    const root = document.documentElement;
    Object.entries(palette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-primary-${shade}`, color);
    });

    // Update font family
    const fontConfigs = {
      inter: 'Inter, sans-serif',
      'crimson-text': 'Crimson Text, serif',
      'playfair-display': 'Playfair Display, serif',
      'open-sans': 'Open Sans, sans-serif',
      montserrat: 'Montserrat, sans-serif',
    };

    const fontFamily = fontConfigs[fontKey] || fontConfigs['inter'];
    root.style.setProperty('--font-primary', fontFamily);

    // Update preview area styling
    previewArea.style.setProperty('--color-primary-500', palette[500]);
    previewArea.style.setProperty('--color-primary-600', palette[600]);
    previewArea.style.setProperty('--color-primary-800', palette[800]);
    previewArea.style.fontFamily = fontFamily;
  }

  /**
   * Export theme settings.
   */
  function exportThemeSettings() {
    const colorPicker = document.querySelector('.theme-color-picker');
    const fontSelector = document.querySelector('.theme-font-selector');
    const fontWeights = document.querySelectorAll(
      'input[name*="custom_font_weights"]:checked'
    );

    const settings = {
      branding: {
        primary_color: colorPicker ? colorPicker.value : '#3b82f6',
      },
      typography: {
        google_font: fontSelector ? fontSelector.value : 'inter',
        custom_font_weights: Array.from(fontWeights).map(el => el.value),
      },
      timestamp: Date.now(),
      version: '1.0',
    };

    const exportString = btoa(JSON.stringify(settings));

    // Create temporary textarea to copy to clipboard
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = exportString;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    try {
      document.execCommand('copy');
      alert('Theme settings copied to clipboard!');
    } catch (err) {
      // Fallback: show in alert
      alert('Export string: ' + exportString);
    }

    document.body.removeChild(tempTextarea);
  }

  /**
   * Generate Tailwind palette (simplified client-side version).
   */
  function generateTailwindPalette(hexColor) {
    const hsl = hexToHsl(hexColor);

    const shadeConfigs = {
      50: { s: hsl.s * 0.1, l: 0.95 },
      100: { s: hsl.s * 0.2, l: 0.9 },
      200: { s: hsl.s * 0.3, l: 0.8 },
      300: { s: hsl.s * 0.4, l: 0.7 },
      400: { s: hsl.s * 0.6, l: 0.6 },
      500: { s: hsl.s, l: hsl.l }, // Base color
      600: { s: hsl.s, l: Math.max(0.1, hsl.l * 0.9) },
      700: { s: hsl.s, l: Math.max(0.1, hsl.l * 0.8) },
      800: { s: hsl.s, l: Math.max(0.1, hsl.l * 0.7) },
      900: { s: hsl.s, l: Math.max(0.05, hsl.l * 0.6) },
      950: { s: hsl.s, l: Math.max(0.05, hsl.l * 0.5) },
    };

    const palette = {};
    Object.entries(shadeConfigs).forEach(([shade, config]) => {
      const saturation = Math.min(1, Math.max(0, config.s));
      const lightness = Math.min(1, Math.max(0, config.l));
      palette[shade] = hslToHex(hsl.h, saturation, lightness);
    });

    return palette;
  }

  /**
   * Convert hex to HSL.
   */
  function hexToHsl(hex) {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    const l = (max + min) / 2;

    let s, h;
    if (diff === 0) {
      s = h = 0; // achromatic
    } else {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s, l: l };
  }

  /**
   * Convert HSL to hex.
   */
  function hslToHex(h, s, l) {
    h /= 360;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = c => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  /**
   * Load Google Font dynamically.
   */
  function loadGoogleFont(fontUrl) {
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) return;

    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  }
})(Drupal, once);
