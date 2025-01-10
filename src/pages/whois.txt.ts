import { promisify } from "node:util";
import type { APIRoute } from "astro";
// @ts-ignore: no types for this package
import whois from "whois";

const lookup = promisify(whois.lookup);

const sld = import.meta.env.DEV
    ? "example.com"
    : new URL(import.meta.env.SITE).hostname.split(".").slice(-2).join(".");

const whoisTxt = await lookup(sld);

export const GET: APIRoute = () => {
    return new Response(whoisTxt, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
