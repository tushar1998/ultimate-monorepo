module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
};
