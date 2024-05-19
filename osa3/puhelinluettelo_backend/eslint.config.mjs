import globals from 'globals'
import pluginJs from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended,
  baseDirectory: __dirname,
})

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    ignores: ['dist/*'],
  },
  { languageOptions: { globals: globals.browser } },

  ...compat.extends('.eslintrc.js'),
]
