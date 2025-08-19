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
                // Thalheim - Wine Region Green/Brown Theme
                primary: {
                    50: '#f0fdf4',   // Lightest green
                    100: '#dcfce7',  
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',  // Main brand green
                    600: '#15803d',  // Primary dark green (wine region)
                    700: '#166534',
                    800: '#14532d',
                    900: '#052e16',
                    950: '#021f0f',
                },
                secondary: {
                    50: '#fefce8',
                    100: '#fef9c3', 
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',  // Warm yellow-green
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                // Earth tones for traditional feel
                earth: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',  // Warm brown
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                },
                // Wine-inspired accent colors
                wine: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',  // Traditional wine red
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
            },
            fontFamily: {
                'serif': ['Crimson Text', 'Georgia', 'serif'],
                'sans': ['Source Serif Pro', 'Georgia', 'serif'],
                'display': ['Crimson Text', 'Georgia', 'serif'],
            },
            fontSize: {
                'municipal-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
                'municipal-lg': ['2.25rem', { lineHeight: '1.3', letterSpacing: 'normal' }],
            },
            backgroundImage: {
                'thalheim-gradient': 'linear-gradient(135deg, #15803d 0%, #22c55e 50%, #16a34a 100%)',
                'thalheim-hero': 'linear-gradient(135deg, rgba(21, 128, 61, 0.9) 0%, rgba(34, 197, 94, 0.8) 100%)',
                'thalheim-earth': 'linear-gradient(135deg, rgba(120, 113, 108, 0.1) 0%, rgba(87, 83, 78, 0.2) 100%)',
            },
            boxShadow: {
                'thalheim': '0 10px 40px -10px rgba(21, 128, 61, 0.3)',
                'thalheim-lg': '0 20px 60px -10px rgba(21, 128, 61, 0.4)',
                'earth': '0 8px 32px -8px rgba(120, 113, 108, 0.2)',
            },
            borderRadius: {
                'organic': '12px 8px 16px 6px', // Organic, less perfect borders
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        function({ addUtilities, theme }) {
            // Thalheim-specific utilities
            addUtilities({
                '.thalheim-button': {
                    '@apply bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-organic transition-all duration-300 shadow-thalheim hover:shadow-thalheim-lg transform hover:-translate-y-0.5': {},
                },
                '.thalheim-card': {
                    '@apply bg-white border border-earth-200 rounded-organic shadow-earth hover:shadow-thalheim transition-all duration-300': {},
                },
                '.thalheim-hero': {
                    '@apply bg-thalheim-hero': {},
                },
                '.thalheim-traditional': {
                    '@apply font-serif text-earth-800 leading-relaxed': {},
                },
                '.municipality-thalheim': {
                    '--color-primary': theme('colors.primary.600'),
                    '--color-secondary': theme('colors.secondary.500'),
                    '--color-accent': theme('colors.wine.600'),
                    '--font-family-serif': '"Crimson Text", Georgia, serif',
                },
            });
        },
    ],
};