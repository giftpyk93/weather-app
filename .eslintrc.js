module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
      "airbnb",
      "plugin:react/recommended",
      "plugin:jsx-a11y/strict",
      "plugin:prettier/recommended",
      "prettier/react",
      "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
    rules: {
      "import/no-unresolved": 0,
      "import/prefer-default-export": 0,
      "react/jsx-props-no-spreading": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: true,
          peerDependencies: true,
        },
      ],
  
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", "ts", "tsx"],
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": 2,
      "react/prop-types": 0,
      "prettier/prettier": ["error"],
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        modules: true,
        experimentalObjectRestSpread: true,
      },
    },
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true,
      node: true,
    },
    settings: {
      react: {
        version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
    globals: {
      window: true,
      document: true,
      localStorage: true,
      FormData: true,
      FileReader: true,
      Blob: true,
      navigator: true,
      process: true,
    },
  };
  