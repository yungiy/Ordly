import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),

  {
    ignores: ['src/generated/prisma/**'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // 기본 no-unused-vars는 끔
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];

export default eslintConfig;
