import path from "node:path";
import fs from "node:fs/promises";
import { $ } from "bun";
import { fdir } from "fdir";

import { EMAIL_ADDRESS } from "lib/consts";

const OUTPUT_DIR = path.resolve(process.cwd(), "./src/content/blog/artifacts");
const CONTENT_DIR = path.resolve(process.cwd(), "./src/content/blog");

try {
    const result = await $`gpg --list-keys ${EMAIL_ADDRESS}`.quiet();
    if (result.stdout.includes(EMAIL_ADDRESS)) {
        console.log(`Found GPG key for ${EMAIL_ADDRESS}`);
    } else {
        const GPG_PRIVATE_KEY = Bun.env.GPG_PRIVATE_KEY;

        if (!GPG_PRIVATE_KEY) {
            console.error("GPG_PRIVATE_KEY is not set.");
            process.exit(1);
        }

        await fs.writeFile("private-key.asc", GPG_PRIVATE_KEY);
        await $`gpg --import private-key.asc`;
        await $`rm -f private-key.asc`.quiet();
    }
} catch (error: any) {
    console.error(
        `Could not find GPG key for ${EMAIL_ADDRESS}`,
        error.stderr || error.message,
    );
    process.exit(1);
}

await $`mkdir -p ${OUTPUT_DIR}`.quiet().nothrow();

const api = new fdir().withFullPaths().glob("**/*.gpg");
const files = await api.crawl(OUTPUT_DIR).withPromise();

for (const file of files) {
    const output = file.replace(OUTPUT_DIR, CONTENT_DIR).replace(/\.gpg$/, ""); // Remove .gpg extension

    console.log(
        `Decrypting ${file.replace(process.cwd(), "")} to ${output.replace(process.cwd(), "")}`,
    );
    await $`gpg --decrypt --output ${output} ${file}`.quiet();
}
