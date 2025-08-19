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
                // Thalwil - Modern Blue Theme
                primary: {
                    50: '#eff6ff',   // Lightest blue
                    100: '#dbeafe',  
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',  // Main brand blue
                    600: '#1e3a8a',  // Primary dark blue
                    700: '#1e40af',
                    800: '#1e3a8a',
                    900: '#1e293b',
                    950: '#0f172a',
                },
                secondary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe', 
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                // Modern accent colors
                accent: {
                    DEFAULT: '#60a5fa',
                    light: '#93c5fd',
                    dark: '#1e40af',
                },
                // Municipality-specific grays for modern look
                municipal: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'municipal-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'municipal-lg': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
            },
            backgroundImage: {
                'thalwil-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                'thalwil-hero': 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(59, 130, 246, 0.8) 100%)',
            },
            boxShadow: {
                'thalwil': '0 10px 40px -10px rgba(30, 58, 138, 0.3)',
                'thalwil-lg': '0 20px 60px -10px rgba(30, 58, 138, 0.4)',
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        function({ addUtilities, theme }) {
            // Thalwil-specific utilities
            addUtilities({
                '.thalwil-button': {
                    '@apply bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-thalwil hover:shadow-thalwil-lg transform hover:-translate-y-0.5': {},
                },
                '.thalwil-card': {
                    '@apply bg-white border border-municipal-200 rounded-xl shadow-lg hover:shadow-thalwil transition-all duration-300': {},
                },
                '.thalwil-hero': {
                    '@apply bg-thalwil-hero': {},
                },
                '.municipality-thalwil': {
                    '--color-primary': theme('colors.primary.600'),
                    '--color-secondary': theme('colors.secondary.500'),
                    '--color-accent': theme('colors.accent.DEFAULT'),
                },
            });
        },
    ],
};