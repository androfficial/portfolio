import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', '.astro/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  { ...tseslint.configs.eslintRecommended, files: ['**/*.astro'] },
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs['jsx-a11y-recommended'],
  { files: ['**/*.mjs'], languageOptions: { globals: globals.node } },
  { rules: { 'no-empty': ['error', { allowEmptyCatch: true }] } },
]);
