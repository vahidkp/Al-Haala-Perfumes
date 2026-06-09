import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark grey brand palette (was forest green)
        forest: {
          DEFAULT: '#2E2E2E',
          deep: '#1A1A1A',
          light: '#3D3D3D',
          line: '#474747',
        },
        cream: {
          DEFAULT: '#F1ECE2',
          warm: '#E8DDC9',
          deep: '#DDD0B9',
          paper: '#F7F3EB',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#3A3A3A',
          mute: '#7A7A7A',
        },
        // Kept for legacy components / accents
        obsidian: '#0D0D0D',
        charcoal: '#1A1A1A',
        'slate-dark': '#2A2A2A',
        slate: { dark: '#2A2A2A' },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#A8873A',
        },
        muted: '#888888',
        sale: '#C04A3A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
        mega: '0.55em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer':
          'linear-gradient(90deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
