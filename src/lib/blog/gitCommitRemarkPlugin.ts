import { execSync } from "node:child_process";

import type { Root } from "mdast";
import type { Plugin } from "unified";

import { isDraft } from "./utils";

type RemarkPlugin<PluginParameters extends any[] = any[]> = Plugin<
    PluginParameters,
    Root
>;

export function gitCommitRemarkPlugin(): RemarkPlugin {
    return (_tree, file) => {
        const filepath = file.history[0].replace(process.cwd(), "").slice(1);
        const draft = isDraft(filepath);

        if (draft) {
            file.data.astro.frontmatter.commit = "<draft>";
            return;
        }

        const commit = execSync(
            `git log -n 1 --pretty=format:%h -- ${filepath}`,
        )
            .toString()
            .trim();

        file.data.astro.frontmatter.commit = commit;
    };
}
