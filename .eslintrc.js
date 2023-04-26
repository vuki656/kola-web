/** @type { import('@types/eslint').ESLint.ConfigData } */
module.exports = {
    ignorePatterns: ["*generated*"],
    extends: [require.resolve('@rimac-technology/style-guide/eslint/core')],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    overrides: [
        {
            files: ['**/*.{tsx,jsx}'],
            extends: [
                require.resolve('@rimac-technology/style-guide/eslint/react'),
                require.resolve('@rimac-technology/style-guide/eslint/next'),
            ],
        },
    ],
}
