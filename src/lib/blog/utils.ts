export function isDraft(slug: string) {
    const file = slug.split("/")[4]!;

    return file.startsWith("_");
}

export function parseDateFromFilePath(slug: string) {
    const [y, m, d] = slug.split("/")[4]!.split("-") as [
        string,
        string,
        string,
    ];

    return new Date(Number(y.replace("_", "")), Number(m) - 1, Number(d));
}
