import plugin from 'tailwindcss/plugin'
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        h1: {
                            'font-size': theme('fontSize.4xl'),
                            'font-weight': theme('fontWeight.bold'),
                            'line-height': theme('lineHeight.tight'),
                            'margin-top': theme('spacing.4'),
                            'margin-bottom': theme('spacing.4'),
                            color: theme('colors.gray.800'),
                        },
                        h2: {
                            'font-size': theme('fontSize.3xl'),
                            'font-weight': theme('fontWeight.semibold'),
                            'line-height': theme('lineHeight.tight'),
                            'margin-top': theme('spacing.3'),
                            'margin-bottom': theme('spacing.3'),
                            color: theme('colors.gray.800'),
                        },
                        h3: {
                            'font-size': theme('fontSize.2xl'),
                            'font-weight': theme('fontWeight.medium'),
                            'line-height': theme('lineHeight.tight'),
                            'margin-top': theme('spacing.2'),
                            'margin-bottom': theme('spacing.2'),
                            color: theme('colors.gray.800'),
                        },
                        h4: {
                            'font-size': theme('fontSize.xl'),
                            'font-weight': theme('fontWeight.medium'),
                            'margin-top': theme('spacing.2'),
                            'margin-bottom': theme('spacing.2'),
                            color: theme('colors.gray.800'),
                        },
                        h5: {
                            'font-size': theme('fontSize.lg'),
                            'font-weight': theme('fontWeight.normal'),
                            'margin-top': theme('spacing.1'),
                            'margin-bottom': theme('spacing.1'),
                            color: theme('colors.gray.800'),
                        },
                        h6: {
                            'font-size': theme('fontSize.base'),
                            'font-weight': theme('fontWeight.normal'),
                            'margin-top': theme('spacing.1'),
                            'margin-bottom': theme('spacing.1'),
                            color: theme('colors.gray.800'),
                        },
                    },
                },
            }),
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    '2xl': '1600px'
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
            spacing: {
                ...defaultTheme.spacing,
                '13': '3.25rem',
                '14': '3.5rem',
                '15': '3.75rem',
                '16': '4rem',
                '17': '4.25rem',
                '18': '4.5rem',
                '19': '4.75rem',
                '20': '5rem',
                '21': '5.25rem',
                '22': '5.5rem',
                '23': '5.75rem',
                '24': '6rem',
                '25': '6.25rem',
            },
        }
    },
  plugins: [
    plugin(function ({ matchUtilities, addBase, theme }) {
      matchUtilities(
          {
            stack: (value) => ({
              '> *': {
                '--stack-space': value,
              },
              '> *:not(.no-space-y, .no-space-b) + *:not(.no-space-y, .no-space-t)': {
                'margin-block-start': `var(--stack-item-space, var(--stack-space, ${theme(
                    'spacing.16'
                )}))`,
              },
            }),
            'stack-space': (value) => ({
              '--stack-item-space': value,
              '&:is([class*="stack-"][class*="stack-space-"] > *)': {
                '--stack-item-space': value,
              },
            }),
          },
          { values: theme('spacing') }
      ),
          // Render screen names in the breakpoint display.
          addBase(Object.entries(theme('screens'))
              .filter((value) => typeof value[1] == 'string')
              .sort((a, b) => {
                return (
                    a[1].replace(/\D/g, "") -
                    b[1].replace(/\D/g, "")
                )
              })
              .map((value) => {
                return {
                  [`@media (min-width: ${value[1]})`]: {
                    '.breakpoint::before': {
                      content: `"${value[0]}"`,
                    },
                  },
                }
              })
          )
    }),
  ]
}
