import awboost from "@awboost/eslint-config";

export default [
  awboost.configs.base,
  awboost.configs.ts,
  awboost.configs["ts-relaxed-any"],

  {
    rules: {
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            // standard abbreviations
            args: false,
            ctx: false,
            ext: false,
            i: false,
            opts: false,
            param: false,
            props: false,

            def: false, // backward-compatibility
            ref: false, // backward-compatibility
            fn: false, // this matches the AWS naming
          },
        },
      ],
    },
  },

  {
    ignores: ["**/*.test.ts"],
  },
];
