import { execSync } from "child_process";
import type { APIRoute } from "astro";

const versionTxt = execSync("git log -1 --pretty=reference", {
    encoding: "utf-8",
});

export const GET: APIRoute = () => {
    return new Response(versionTxt, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
