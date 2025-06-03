import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { load } from "js-yaml";
import { DateTime } from "luxon";

import type { Service } from "./types";

const BACK_TO_TOP =
  "[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#cutting-kakao-out-of-your-life)";

const readYaml = async (path: string): Promise<unknown> => {
  const rawData = await readFile(join(__dirname, "yaml", path), "utf8");
  return load(rawData);
};

const readMarkdown = async (path: string): Promise<string> => {
  return await readFile(join(__dirname, "md", path), "utf8");
};

const run = async () => {
  const data = (await readYaml("dekakao.yml")) as Service;
  const alternativeBody = Object.keys(data)
    .map((kakaoService) => {
      const service = data[kakaoService];
      return `
### ${service.title ?? kakaoService}
${service.description ? `\n${service.description}\n` : ""}
| Name | Apps |Description |
| ---- | ---- | ----------- |
${service.children
  .map(({ name, url, description, android, ios }) => {
    const alternativeName = url ? `[${name}](${url})` : name;
    const androidBadge =
      android &&
      `[![android](https://img.shields.io/badge/android-black?logo=android)](${android})`;
    const iosBadge =
      ios &&
      `[![android](https://img.shields.io/badge/ios-black?logo=apple)](${ios})`;

    const appBadges = [androidBadge, iosBadge].join("<br/>");
    return `|${alternativeName}|${appBadges}|${description ?? ""}|`;
  })
  .join("\n")}
`;
    })
    .join("\n");

  const [
    headerContent,
    contributeContent,
    eventContent,
    personalInformationContent,
  ] = await Promise.all([
    readMarkdown("_header.md"),
    readMarkdown("contributing.md"),
    readMarkdown("events.md"),
    readMarkdown("personal-information.md"),
  ]);

  const alternativeContent = `
## Replacements/alternatives

${BACK_TO_TOP}
${alternativeBody}
`;

  const now = DateTime.local({ zone: "Asia/Seoul" }).toISO();
  const content = `${headerContent.replace("{{DATE}}", now)}
${contributeContent}
${eventContent}
${personalInformationContent}
${alternativeContent}
${BACK_TO_TOP}
`;

  await writeFile(join(__dirname, "../README.md"), content, "utf8");
  console.log("File generation completed successfully!");
};

run().catch((e) => console.error(e));
