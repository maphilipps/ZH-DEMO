/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx,twig}',
        './templates/**/*.{js,ts,jsx,tsx,mdx,twig}',
        './node_modules/flowbite/**/*.js',
        './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Issue #36: Dynamic color palette using CSS custom properties
                primary: {
                    50: 'var(--color-primary-50, #f0f9ff)',
                    100: 'var(--color-primary-100, #e0f2fe)',
                    200: 'var(--color-primary-200, #bae6fd)',
                    300: 'var(--color-primary-300, #7dd3fc)',
                    400: 'var(--color-primary-400, #38bdf8)',
                    500: 'var(--color-primary-500, #3b82f6)',
                    600: 'var(--color-primary-600, #2563eb)',
                    700: 'var(--color-primary-700, #1d4ed8)',
                    800: 'var(--color-primary-800, #1e40af)',
                    900: 'var(--color-primary-900, #1e3a8a)',
                    950: 'var(--color-primary-950, #172554)',
                },
                // Municipality-specific color aliases
                thalwil: {
                    50: 'var(--color-primary-50, #f0f9ff)',
                    100: 'var(--color-primary-100, #e0f2fe)',
                    200: 'var(--color-primary-200, #bae6fd)',
                    300: 'var(--color-primary-300, #7dd3fc)',
                    400: 'var(--color-primary-400, #38bdf8)',
                    500: 'var(--color-primary-500, #1e3a8a)',
                    600: 'var(--color-primary-600, #2563eb)',
                    700: 'var(--color-primary-700, #1d4ed8)',
                    800: 'var(--color-primary-800, #1e40af)',
                    900: 'var(--color-primary-900, #1e3a8a)',
                    950: 'var(--color-primary-950, #172554)',
                },
                thalheim: {
                    50: 'var(--color-primary-50, #f0fdf4)',
                    100: 'var(--color-primary-100, #dcfce7)',
                    200: 'var(--color-primary-200, #bbf7d0)',
                    300: 'var(--color-primary-300, #86efac)',
                    400: 'var(--color-primary-400, #4ade80)',
                    500: 'var(--color-primary-500, #15803d)',
                    600: 'var(--color-primary-600, #16a34a)',
                    700: 'var(--color-primary-700, #15803d)',
                    800: 'var(--color-primary-800, #166534)',
                    900: 'var(--color-primary-900, #14532d)',
                    950: 'var(--color-primary-950, #052e16)',
                },
                erlenbach: {
                    50: 'var(--color-primary-50, #f0fdfa)',
                    100: 'var(--color-primary-100, #ccfbf1)',
                    200: 'var(--color-primary-200, #99f6e4)',
                    300: 'var(--color-primary-300, #5eead4)',
                    400: 'var(--color-primary-400, #2dd4bf)',
                    500: 'var(--color-primary-500, #0891b2)',
                    600: 'var(--color-primary-600, #0891b2)',
                    700: 'var(--color-primary-700, #0e7490)',
                    800: 'var(--color-primary-800, #155e75)',
                    900: 'var(--color-primary-900, #164e63)',
                    950: 'var(--color-primary-950, #083344)',
                },
            },
            fontFamily: {
                // Issue #36: Dynamic font families using CSS custom properties
                'primary': 'var(--font-primary, "Inter", sans-serif)',
                'inter': ['Inter', 'sans-serif'],
                'crimson': ['Crimson Text', 'serif'],
                'playfair': ['Playfair Display', 'serif'],
                'open-sans': ['Open Sans', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-down': 'slideDown 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindplus/elements'),
        function({ addUtilities, theme }) {
            const screens = theme('screens');
            const utilities = {
                '.drupal-safe-hidden': {
                    display: 'none',
                },
            };
            // Für alle Breakpoints wie bei Tailwind .hidden
            Object.entries(screens).forEach(([key, value]) => {
                utilities[`.${key}\\:drupal-safe-block`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'block',
                    },
                };
                utilities[`.${key}\\:drupal-safe-inline-block`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'inline-block',
                    },
                };
                utilities[`.${key}\\:drupal-safe-inline`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'inline',
                    },
                };
                utilities[`.${key}\\:drupal-safe-flex`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'flex',
                    },
                };
                utilities[`.${key}\\:drupal-safe-grid`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'grid',
                    },
                };
                utilities[`.${key}\\:drupal-safe-table`] = {
                    [`@media (min-width: ${value})`]: {
                        display: 'table',
                    },
                };
            });
            addUtilities(utilities);
        },
    ],
};
