/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        // Include parent theme components
        '../adesso_cms_theme/components/**/*.{js,ts,jsx,tsx,mdx,twig}',
        '../adesso_cms_theme/templates/**/*.{js,ts,jsx,tsx,mdx,twig}',
        // Include own components if any
        './components/**/*.{js,ts,jsx,tsx,mdx,twig}',
        './templates/**/*.{js,ts,jsx,tsx,mdx,twig}',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // Erlenbach - Lake Turquoise/Gold Elegant Theme
                primary: {
                    50: '#ecfeff',   // Lightest cyan
                    100: '#cffafe',  
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',  // Main brand cyan (lake)
                    600: '#0891b2',  // Primary dark turquoise
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                    950: '#083344',
                },
                secondary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1', 
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',  // Elegant teal
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                // Gold accent colors for Goldküste prestige
                gold: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',  // Main gold accent
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                // Elegant neutrals
                pearl: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',  // Elegant gray
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
                // Lake-inspired blues
                lake: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',  // Deep lake blue
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
            },
            fontFamily: {
                'display': ['Playfair Display', 'Georgia', 'serif'],
                'sans': ['Source Sans Pro', 'system-ui', 'sans-serif'],
                'serif': ['Playfair Display', 'Georgia', 'serif'],
            },
            fontSize: {
                'municipal-xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
                'municipal-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
            },
            backgroundImage: {
                'erlenbach-gradient': 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
                'erlenbach-hero': 'linear-gradient(135deg, rgba(8, 145, 178, 0.95) 0%, rgba(6, 182, 212, 0.9) 50%, rgba(34, 211, 238, 0.85) 100%)',
                'erlenbach-gold': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                'erlenbach-elegant': 'linear-gradient(145deg, rgba(250, 250, 250, 0.9) 0%, rgba(245, 245, 245, 1) 100%)',
            },
            boxShadow: {
                'erlenbach': '0 12px 48px -12px rgba(8, 145, 178, 0.25)',
                'erlenbach-lg': '0 24px 72px -12px rgba(8, 145, 178, 0.35)',
                'gold': '0 8px 32px -8px rgba(245, 158, 11, 0.3)',
                'elegant': '0 4px 20px -4px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
                'lake': '0 20px 80px -20px rgba(6, 182, 212, 0.4)',
            },
            borderRadius: {
                'elegant': '8px',
                'premium': '12px',
            },
            backdropBlur: {
                'elegant': '16px',
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        function({ addUtilities, theme }) {
            // Erlenbach-specific utilities
            addUtilities({
                '.erlenbach-button': {
                    '@apply bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-elegant transition-all duration-300 shadow-erlenbach hover:shadow-erlenbach-lg transform hover:-translate-y-0.5': {},
                },
                '.erlenbach-button-gold': {
                    '@apply bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-4 rounded-elegant transition-all duration-300 shadow-gold hover:shadow-gold transform hover:-translate-y-0.5': {},
                },
                '.erlenbach-card': {
                    '@apply bg-white/90 backdrop-blur-elegant border border-pearl-200 rounded-premium shadow-elegant hover:shadow-erlenbach transition-all duration-500': {},
                },
                '.erlenbach-hero': {
                    '@apply bg-erlenbach-hero backdrop-blur-sm': {},
                },
                '.erlenbach-elegant': {
                    '@apply font-sans text-pearl-800 leading-relaxed': {},
                },
                '.erlenbach-display': {
                    '@apply font-display text-pearl-900 font-normal': {},
                },
                '.municipality-erlenbach': {
                    '--color-primary': theme('colors.primary.600'),
                    '--color-secondary': theme('colors.secondary.500'),
                    '--color-accent': theme('colors.gold.500'),
                    '--font-family-display': '"Playfair Display", Georgia, serif',
                    '--shadow-elegant': theme('boxShadow.elegant'),
                },
            });
        },
    ],
};