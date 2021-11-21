import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { EOL } from "os";

import { load } from "js-yaml";

import type { Service } from "./types";

const BACK_TO_TOP =
  "[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#cutting-kakao-out-of-your-life)";

const readYaml = async (path: string) => {
  const rawData = await readFile(join(__dirname, path), "utf8");
  return load(rawData);
};

(async () => {
  const data = (await readYaml("./yaml/dekakao.yml")) as Service;
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

  const alternativeContent = `
## Replacements/alternatives

${BACK_TO_TOP}
${alternativeBody}
`;

  const contributeContent = `
## Contributing

- If you want to help out with the project, here are some ideas (submit Issues & Pull Requests on the GitHub page).
- When contributing, please follow the rules outlined in [CONTRIBUTING.md.](./CONTRIBUTING.md)
`;

  const content = `# Cutting Kakao out of your life

![status](https://img.shields.io/badge/status-draft-yellow)
![license](https://img.shields.io/badge/license-unlicensed-green)

> wanna keep loose coupling for privacy. heavily inspired by [degoogle](https://github.com/tycrek/degoogle).

${contributeContent}
${alternativeContent}
`;

  await writeFile(join(__dirname, "./README.md"), content, "utf8");
})();
