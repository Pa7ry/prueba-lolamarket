module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            impliedString: true,
            jsx: true,
        },
    },
    extends: ['react-app', 'plugin:prettier/recommended', 'prettier/react'],
    plugins: ['react'],
    rules: {
        'no-plusplus': 'error',
        'no-param-reassign': 'off',
        'max-len': 'off',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.tsx'],
            },
        ],
        'prettier/prettier': [
            'error',
            {
                printWidth: 80,
                tabWidth: 4,
                singleQuote: true,
                arrowParens: 'avoid',
                endOfLine: 'auto',
            },
        ],
    },
    overrides: [
        {
            files: ['*.tsx'],
            extends: [
                'eslint:recommended',
                'react-app',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:prettier/recommended',
                'prettier/@typescript-eslint',
            ],
            plugins: ['react'],
            rules: {
                'no-plusplus': 'error',
                'no-param-reassign': 'off',
                'max-len': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'error',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        accessibility: 'no-public',
                    },
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        ignoreRestSiblings: true,
                    },
                ],
                'react/prop-types': 'off',
                'react/jsx-filename-extension': [
                    'error',
                    {
                        extensions: ['.js', '.tsx'],
                    },
                ],
                'prettier/prettier': [
                    'error',
                    {
                        printWidth: 80,
                        tabWidth: 4,
                        singleQuote: true,
                        arrowParens: 'avoid',
                        endOfLine: 'auto',
                    },
                ],
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'spaced-comment': 'off',
            },
        },
    ],
};
