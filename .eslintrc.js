module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
            tsx: true,
            ts: true,
            modules: true,
            experimentalObjectRestSpread: true,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    plugins: ["eslint-plugin", "@typescript-eslint", "prettier"],

    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },

    ignorePatterns: [".eslintrc.js"],

    rules: {
        "no-param-reassign": [2, { props: false }],
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/no-unsafe-member-access": 0,
        "@typescript-eslint/no-floating": 0,
        "@typescript-eslint/require-await": 0,
        "@typescript-eslint/no-shadow": 1,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/await-thenable": 0,
        "@typescript-eslint/no-unsafe-return": 1,

        "react/react-in-jsx-scope": 0,
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 0,
        "react/no-unescaped-entities": 0,
        "no-unused-vars": 0,
        "no-shadow": 0,
    },

    overrides: [
        {
            files: ["*.ts", "*.tsx"], // Your TypeScript files extension
            parserOptions: {
                project: ["./tsconfig.json"], // Specify it only for TypeScript files
            },
        },
    ],
};
