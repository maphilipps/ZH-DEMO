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
                    50: 'oklch(94.97% 0.026 242.74)',
                    100: 'oklch(90.1% 0.052 243.98)',
                    200: 'oklch(80.87% 0.104 244.34)',
                    300: 'oklch(71.66% 0.156 247.11)',
                    400: 'oklch(64.74% 0.194 252.25)',
                    500: 'oklch(53.62% 0.161 252.2)',
                    600: 'oklch(45.4% 0.135 251.79)',
                    700: 'oklch(37.04% 0.106 250.43)',
                    800: 'oklch(29.18% 0.081 249.39)',
                    900: 'oklch(19.37% 0.049 245.37)',
                    950: 'oklch(14.13% 0.03 235.42)',
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
