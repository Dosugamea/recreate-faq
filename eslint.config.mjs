import eslintConfigPrettier from 'eslint-config-prettier'
// eslint-disable-next-line no-restricted-imports
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: 'Relative imports are not allowed. Please use "@/" alias.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier
)
