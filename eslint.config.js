import config from "@propulsionworks/eslint-config";

export default [
  config.configs["base"],
  config.configs["ts"],
  // TODO remove
  config.configs["ts-relaxed-any"],
  {
    rules: {
      "unicorn/number-literal-case": "off", // fights with prettier
      "unicorn/numeric-separators-style": "off", // annoying
      "unicorn/expiring-todo-comments": "off", // rule is broken
    },
  },
  {
    files: ["src/**/*.test.*"],

    rules: {
      ...config.configs["ts-relaxed-any"].rules,
      "@typescript-eslint/no-unsafe-call": "off",

      // `describe` and `it` return promises
      "@typescript-eslint/no-floating-promises": [
        "warn",
        {
          allowForKnownSafeCalls: [
            { from: "package", name: ["describe", "it"], package: "node:test" },
          ],
        },
      ],

      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // easier for testing
      "@typescript-eslint/no-non-null-assertion": "off", // easier for testing
      "@typescript-eslint/no-unused-vars": "off", // easier for testing
      "@typescript-eslint/require-await": "off", // easier for testing
      "n/no-unsupported-features/node-builtins": "off", // so we can use node:test
      "unicorn/no-abusive-eslint-disable": "off",
    },
  },
];
