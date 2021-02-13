"use strict";

import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import ProgressBar from "progress";

async function main() {
  const folders = fs
    .readdirSync("./", { withFileTypes: true })
    .filter((i) => i.isDirectory())
    .map((i) => i.name)
    .filter((i) => fs.readdirSync(i).includes("node_modules"));

  const { data: result } = await inquirer.prompt([
    {
      type: "checkbox",
      message: "node_modules를 삭제할 프로젝트를 선택해주세요.",
      name: "data",
      choices: [...folders],
      validate: (answer) => {
        if (answer.length < 1) {
          return "최소 한 개 이상의 프로젝트를 선택해주세요.";
        }

        return true;
      },
    },
  ]);

  console.log(
    `${chalk.green(">>")} 총 ${
      result.length
    }개 node_modules 폴더를 삭제합니다...`
  );

  const bar = new ProgressBar(
    chalk.green("[:bar] :current/:total (:percent)"),
    {
      total: result.length,
      width: 80,
    }
  );

  bar.tick(0);
  result.forEach((i) => {
    try {
      fs.rmdirSync(`${i}/node_modules`, { recursive: true });
    } catch (e) {
      console.log(
        `${chalk.red(">>")} ${i} 프로젝트 삭제 중 오류가 발생하였습니다.`
      );
    } finally {
      bar.tick();
    }
  });

  console.log(`${chalk.green(">>")} 삭제 완료!`);
}

main();
