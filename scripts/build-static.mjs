import { existsSync } from "node:fs";
import { spawn } from "node:child_process";

const child = spawn(
  process.execPath,
  ["node_modules/vinext/dist/cli.js", "build"],
  {
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  },
);

let output = "";

child.stdout.on("data", (chunk) => {
  output += chunk;
  process.stdout.write(chunk);
});

child.stderr.on("data", (chunk) => {
  output += chunk;
  process.stderr.write(chunk);
});

child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

child.on("close", (code) => {
  if (code === 0) return;

  const hasStaticEntry = existsSync("dist/client/index.html");
  const knownWindowsShutdownBug =
    process.platform === "win32" &&
    /UV_HANDLE_CLOSING/.test(output) &&
    /Build complete/.test(output);

  if (knownWindowsShutdownBug && hasStaticEntry) {
    console.warn(
      "Static export completed; ignored a known vinext/libuv shutdown assertion on Windows.",
    );
    return;
  }

  process.exitCode = code ?? 1;
});
