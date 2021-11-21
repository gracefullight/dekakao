import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { EOL } from "os";

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

(async () => {
  const data = (await readYaml("dekakao.yml")) as Service;
  const alternativeBody = Object.keys(data)
    .map((kakaoService) => {
      const service = data[kakaoService];
      return `
### ${service.title ?? kakaoService}
${service.description ? `${EOL}${service.description}${EOL}` : ""}
| Name | Description |
| ---- | ----------- |
${service.children
  .map(
    (alternative) =>
      `|[${alternative.name}](${alternative.url})|${
        alternative.description ?? ""
      }|`
  )
  .join(EOL)}
`;
    })
    .join(EOL);

  const headerContent = (await readMarkdown("_header.md")).replace(
    "{{DATE}}",
    DateTime.local({ zone: "Asia/Seoul" }).toISO()
  );
  const contributeContent = await readMarkdown("contributing.md");
  const personalInformationContent = await readMarkdown(
    "personal-information.md"
  );
  const alternativeContent = `
## Replacements/alternatives

${BACK_TO_TOP}
${alternativeBody}
`;

  const content = `${headerContent}
${contributeContent}
${personalInformationContent}
${alternativeContent}
${BACK_TO_TOP}
`;

  await writeFile(join(__dirname, "./README.md"), content, "utf8");
})();
