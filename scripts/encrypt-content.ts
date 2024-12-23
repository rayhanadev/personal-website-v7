import path from "node:path";
import { $ } from "bun";

import { EMAIL_ADDRESS } from "lib/consts";

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

const CONTENT_DIR = path.resolve(process.cwd(), "./src/content/blog");
const OUTPUT_DIR = path.resolve(process.cwd(), "./src/content/blog_encrypted");

await $`rm -rf ${OUTPUT_DIR}`.quiet();
await $`mkdir -p ${OUTPUT_DIR}`.quiet();

const GPG_ENCRYPTION_SUBKEY =
    "01B8 8479 18BA 65A0 D4C6  18CB 0479 18E3 6D57 A322";

const files = process.argv.slice(2);

console.log(`Found ${files.length} files to encrypt.`);

for (const file of files) {
    const output = `${file.replace(CONTENT_DIR, OUTPUT_DIR)}.gpg`;

    console.log(`Encrypting ${file} to ${output}`);
    await $`gpg --encrypt --armor --recipient ${GPG_ENCRYPTION_SUBKEY} --output ${output} ${file}`.quiet();
}
