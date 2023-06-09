import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

// Multi-theme strategy
import colorThemes from './src/themes.json'
import multiThemePlugin from './src/plugins/multi-theme'

// Animated background stripes
import bgStripesPlugin from './src/plugins/bg-stripes'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Tailwind config
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const config = {
  content: ['./src/{app,components}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      width: {
        100: '25rem',
        'square-diagonal': (Math.sqrt(2) * 100).toFixed(2) + '%',
      },
      // Theme-based custom grid for the `BackgroundSplit` component
      gridTemplateColumns: ({ theme }) => ({
        'background-split': `1fr 
            ${theme('width.100')} 
            calc(
              ${theme('maxWidth.7xl')} - ${theme('width.100')} - ${theme('padding.8')}
            ) 
            1fr`,
      }),
    },
  },
  plugins: [bgStripesPlugin, multiThemePlugin({ colorThemes })],
} satisfies Config

export default config
