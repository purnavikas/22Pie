import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#17212B',
        ink: '#33404B',
        paper: '#EEE9DF',
        violet: '#6F83A6',
        aqua: '#C6D9D8',
        coral: '#C58B57',
        midnight: '#0B0F14',
        glass: 'rgba(255, 255, 255, 0.06)',
        neon: {
          blue: '#3157D5',
          green: '#23864B',
          violet: '#8F7CFF',
          lime: '#B7F06E',
          amber: '#FFD52C',
          red: '#C82634'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(0, 0, 0, 0.12)',
        glow: '0 0 40px var(--glow-color, rgba(49, 87, 213, 0.35))'
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
