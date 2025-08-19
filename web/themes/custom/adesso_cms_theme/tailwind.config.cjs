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
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                    950: '#450a0a',
                },
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
