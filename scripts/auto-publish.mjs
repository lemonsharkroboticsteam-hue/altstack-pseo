import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function run(cmd, args) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  execFileSync(cmd, args, { stdio: "inherit" });
}

function capture(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8" }).trim();
}

function verifyStaticOutDir() {
  const outDir = path.join(ROOT, "out");
  const required = ["index.html", "sitemap.xml", "robots.txt"];
  for (const rel of required) {
    if (!fs.existsSync(path.join(outDir, rel))) {
      throw new Error(`Missing expected static export artifact: out/${rel}`);
    }
  }
}

function main() {
  run("npm", ["run", "validate:data"]);
  run("npm", ["run", "build"]);
  verifyStaticOutDir();

  const status = capture("git", ["status", "--porcelain"]);
  if (!status) {
    console.log("No repository changes to commit.");
    return;
  }

  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  run("git", ["add", "."]);
  run("git", [
    "commit",
    "-m",
    `chore(content): auto-update pSEO pages (${stamp})`,
  ]);

  try {
    const remoteUrl = capture("git", ["remote", "get-url", "origin"]);
    if (remoteUrl) {
      run("git", ["push", "origin", "main"]);
      console.log(
        "✓ Pushed updated pSEO pages to GitHub origin/main (triggers Cloudflare auto-build)."
      );
    }
  } catch {
    console.log(
      "Local commit succeeded. No GitHub 'origin' remote is configured yet—attach a remote to auto-push to Cloudflare."
    );
  }
}

main();
