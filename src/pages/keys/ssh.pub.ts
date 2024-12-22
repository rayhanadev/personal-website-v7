import type { APIRoute } from "astro";

const sshPublicKey = `
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDGYYY38Nsh4RcaOYpOY+Oqhb1VWWmfdWZnSFTeDY78CtlAxut7YQU3xfmTKTSpU8DN1vEVzZBw2REUH0Erzmhs/vbovNzzo2thTqKNsMAdeYlfHajeNioonJ3JfgQseuqTzSVcIccsk5LT0lF/DoKfjSfIYM0IQO4CgHf0/d/+unh6y1kEgf7ogZNDqajT1yNWKG1V7rEMLgrR2VxErUn0vvd0dgp6e97yJ2KVTcyxzDEOYxqd+zU53GhW8rW7DDSdiP1WDIu6EDD+eqN5yZ6DqrV2PHm7rstAoGHCDvWZRRXcooXSRCbyeyio9UuHYM0foSoSRrtR8RnywVuyft86Ag+HOAG8myinJN5zVix4/wH2WXSkbi/9CJXY9UEghXrbXfkcxq4NrUn8pCG+h+/VJArxmrz7z1xlAucE5gg1RAmxlydS+yV27Xwq4No2XaaBwW2Yiq6ZQyI/i0r86dSGCvWJgqI1EyLl+vDj/iHAhwABv4EGc+jslJWlp6vl11/g1ZoZsM8akV6ajGFioizJeRHl1qeOiS7laccb/K9e/UOT9rtxEMpxlMzz1fym1+V+F9ph6tbOyMriL4WX3ZwrE9AwJeYdbpXCxIW6EhibrrB3NNgqVft/33QdOMmieg8HoAAXIBuVGY+C3v7XpAQFnlfBowpOrG1Fw7axzpo8uQ== cardno:27_158_348
`.trim();

export const GET: APIRoute = () => {
    return new Response(sshPublicKey, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
