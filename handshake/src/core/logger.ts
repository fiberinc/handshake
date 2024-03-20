/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import chalk from "chalk";

export function debug(...args: any[]) {
  console.log(chalk.dim("[🤝]"), ...args);
}

export function info(...args: any[]) {
  console.log("[🤝]", ...args);
}

export function error(...args: any[]) {
  console.error(chalk.red("[🤝]"), ...args);
}
