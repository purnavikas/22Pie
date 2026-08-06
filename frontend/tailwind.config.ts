import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#101114',
        ink: '#18191f',
        paper: '#fbfaf6',
        violet: '#6d5dfc',
        aqua: '#0aa6a6',
        coral: '#e96f5f'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        soft: '0 24px 80px rgba(16, 17, 20, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
