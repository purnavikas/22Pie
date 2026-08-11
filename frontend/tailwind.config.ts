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
        coral: '#C58B57'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
