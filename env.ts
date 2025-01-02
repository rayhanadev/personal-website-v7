import { envField as e } from "astro/config";

export const schema = {
    PUBLIC_UMAMI_WEBSITE_ID: e.string({
        context: "client",
        access: "public",
        optional: true,
    }),
};
