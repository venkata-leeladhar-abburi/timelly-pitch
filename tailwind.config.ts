import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1C1F1A',
        'bg-secondary': '#141610',
        'bg-card': '#242720',
        green: '#3CB55A',
        'green-dim': 'rgba(60,181,90,0.15)',
        'text-warm': '#F0EDE6',
        'text-dim': 'rgba(240,237,230,0.55)',
        'text-muted': 'rgba(240,237,230,0.30)',
        gold: '#C8A96E',
      },
      fontFamily: {
        body: ['var(--font-mona)', 'sans-serif'],
        display: ['var(--font-brier)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        massive: 'clamp(80px, 14vw, 200px)',
        hero: 'clamp(40px, 6vw, 88px)',
        xl2: 'clamp(36px, 5vw, 64px)',
        lg2: 'clamp(22px, 3vw, 36px)',
      },
    },
  },
  plugins: [],
}

export default config
