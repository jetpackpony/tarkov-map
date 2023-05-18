/**
 * This relies on a webp package being installed.
 * Place all the images in tmpImages/in directory and run
 * npm run compress-images
 * Results will be placed into tmpImages/out directory
 */

import { exec } from "child_process";
import { readdir } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_IMG_DIR = path.join(rootDir, "tmpImages", "in");
const OUTPUT_IMG_DIR = path.join(rootDir, "tmpImages", "out");

readdir(SOURCE_IMG_DIR, (err, files) => {
  if (err) {
    console.error(`Error reading '${SOURCE_IMG_DIR}': ${err}`);
    return;
  }
  files.forEach((fileName) => {
    const input = path.join(SOURCE_IMG_DIR, fileName);
    const output = path.join(
      OUTPUT_IMG_DIR,
      `${path.parse(fileName).name}.webp`
    );

    exec(
      `
        cwebp \
          -size 500000\
          -resize 3500 0\
          -q 100\
          -af -m 6 -mt\
          ${input}\
          -o ${output}\
      `,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      }
    );
  });
});
