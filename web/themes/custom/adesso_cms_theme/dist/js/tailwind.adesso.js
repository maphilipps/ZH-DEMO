import plugin from 'tailwindcss/plugin'
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        h1: {
                            fontSize: theme('fontSize.4xl'),
                            fontWeight: theme('fontWeight.bold'),
                            lineHeight: theme('lineHeight.tight'),
                            marginTop: theme('spacing.4'),
                            marginBottom: theme('spacing.4'),
                            color: theme('colors.gray.800'),
                        },
                        h2: {
                            fontSize: theme('fontSize.3xl'),
                            fontWeight: theme('fontWeight.semibold'),
                            lineHeight: theme('lineHeight.tight'),
                            marginTop: theme('spacing.3'),
                            marginBottom: theme('spacing.3'),
                            color: theme('colors.gray.800'),
                        },
                        h3: {
                            fontSize: theme('fontSize.2xl'),
                            fontWeight: theme('fontWeight.medium'),
                            lineHeight: theme('lineHeight.tight'),
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.2'),
                            color: theme('colors.gray.800'),
                        },
                        h4: {
                            fontSize: theme('fontSize.xl'),
                            fontWeight: theme('fontWeight.medium'),
                            marginTop: theme('spacing.2'),
                            marginBottom: theme('spacing.2'),
                            color: theme('colors.gray.800'),
                        },
                        h5: {
                            fontSize: theme('fontSize.lg'),
                            fontWeight: theme('fontWeight.normal'),
                            marginTop: theme('spacing.1'),
                            marginBottom: theme('spacing.1'),
                            color: theme('colors.gray.800'),
                        },
                        h6: {
                            fontSize: theme('fontSize.base'),
                            fontWeight: theme('fontWeight.normal'),
                            marginTop: theme('spacing.1'),
                            marginBottom: theme('spacing.1'),
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
