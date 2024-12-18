/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    // breaks on the following files:
    // - src/layouts/Layout.astro
    // - src/layouts/PostLayout.astro
    //
    // see: https://github.com/withastro/prettier-plugin-astro/issues/337
    //
    // plugins: ["prettier-plugin-astro"],
    // overrides: [
    //     {
    //         files: "*.astro",
    //         options: {
    //             parser: "astro",
    //         },
    //     },
    // ],
};
