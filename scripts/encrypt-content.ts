import path from "node:path";
import { $ } from "bun";

import { EMAIL_ADDRESS, GPG_ENCRYPTION_SUBKEY } from "lib/consts";

try {
    const result = await $`gpg --list-keys ${EMAIL_ADDRESS}`.quiet();
    if (result.stdout.includes(EMAIL_ADDRESS)) {
        console.log(`Found GPG key for ${EMAIL_ADDRESS}`);
    } else {
        console.error(`Could not find GPG key for ${EMAIL_ADDRESS}`);
        process.exit(1);
    }
} catch (error: any) {
    console.error(
        `Could not find GPG key for ${EMAIL_ADDRESS}`,
        error.stderr || error.message,
    );
    process.exit(1);
}

const CONTENT_DIR = "src/content/blog";
const OUTPUT_DIR = path.resolve(process.cwd(), "./src/content/blog/artifacts");

await $`mkdir -p ${OUTPUT_DIR}`.quiet();

const files = process.argv.slice(2);

console.log(`Found ${files.length} files to encrypt.`);

for (const file of files) {
    console.log(file, CONTENT_DIR, OUTPUT_DIR);
    const output = `${file.replace(CONTENT_DIR, OUTPUT_DIR)}.gpg`;

    console.log(
        `Encrypting ${file.replace(process.cwd(), "")} to ${output.replace(process.cwd(), "")}`,
    );
    await $`gpg --encrypt --armor --recipient ${GPG_ENCRYPTION_SUBKEY} --output ${output} ${file}`.quiet();
}
