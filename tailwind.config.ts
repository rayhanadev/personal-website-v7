import type { Config } from "tailwindcss";
import { fontFamily as fonts } from "tailwindcss/defaultTheme";
import type { PluginUtils } from "tailwindcss/types/config";

// src: https://github.com/tailwindlabs/tailwindcss-typography/blob/383bee7004349a4877c619dafa9aff1854dac601/src/styles.js#L3-L17
const round = (num: number) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, "$1")
        .replace(/\.0$/, "");
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

const BASE_FONT_SIZE = 24;

const config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx,astro,mdx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["SplineSansMono", ...fonts.mono],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            typography: (theme: PluginUtils["theme"]) => ({
                DEFAULT: {
                    css: {
                        fontSize: rem(BASE_FONT_SIZE),
                        lineHeight: round(42 / BASE_FONT_SIZE),
                        h1: {
                            marginTop: rem(48),
                            marginBottom: rem(8),
                        },
                        h2: {
                            marginTop: rem(24),
                            marginBottom: rem(8),
                        },
                        h3: {
                            marginTop: rem(48),
                            marginBottom: rem(8),
                        },
                        h4: {
                            marginTop: rem(48),
                            marginBottom: rem(8),
                        },
                        p: {
                            marginTop: rem(20),
                            marginBottom: rem(20),
                        },
                        a: {
                            color: "inherit",
                            fontWeight: "inherit",
                            textDecoration: "underline",
                            textDecorationColor: theme("colors.zinc.400"),
                            "&:hover": {
                                textDecorationColor: theme("colors.foreground"),
                            },
                        },
                        ul: {
                            marginTop: rem(8),
                            marginBottom: rem(8),
                        },
                        ol: {
                            marginTop: rem(8),
                            marginBottom: rem(8),
                        },
                        li: {
                            marginTop: rem(4),
                            marginBottom: rem(4),
                        },
                        "ol > li": {
                            paddingInlineStart: em(6, BASE_FONT_SIZE),
                        },
                        "ul > li": {
                            paddingInlineStart: em(6, BASE_FONT_SIZE),
                        },
                        "> ul > li p": {
                            marginTop: em(8, BASE_FONT_SIZE),
                            marginBottom: em(8, BASE_FONT_SIZE),
                        },
                        "> ul > li > p:first-child": {
                            marginTop: em(8, BASE_FONT_SIZE),
                        },
                        "> ul > li > p:last-child": {
                            marginBottom: em(8, BASE_FONT_SIZE),
                        },
                        "> ol > li > p:first-child": {
                            marginTop: em(8, BASE_FONT_SIZE),
                        },
                        "> ol > li > p:last-child": {
                            marginBottom: em(8, BASE_FONT_SIZE),
                        },
                        "ul ul, ul ol, ol ul, ol ol": {
                            marginTop: em(8, BASE_FONT_SIZE),
                            marginBottom: em(8, BASE_FONT_SIZE),
                        },
                        blockquote: {
                            fontWeight: "inherit",
                            fontStyle: "normal",
                        },
                        "blockquote p:first-of-type::before": {
                            content: "none",
                        },
                        "blockquote p:last-of-type::after": {
                            content: "none",
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
} satisfies Config;

export default config;
