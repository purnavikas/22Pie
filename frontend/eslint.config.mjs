import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  { rules: { 'import/no-anonymous-default-export': 'off' } },
  {
    files: ['components/rubiks/**/*.tsx'],
    rules: { 'react-hooks/refs': 'off' },
  },
  globalIgnores(['.next/**', 'next-env.d.ts']),
]);
