import { execFileSync } from "node:child_process";

function run(cmd, args) {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  execFileSync(cmd, args, { stdio: "inherit" });
}

function capture(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8" }).trim();
}

function main() {
  run("npm", ["run", "validate:data"]);
  run("npm", ["run", "build"]);

  const status = capture("git", ["status", "--porcelain", "data/"]);
  if (!status) {
    console.log("No changes in data/ to commit.");
    return;
  }

  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  run("git", ["add", "data/"]);
  run("git", [
    "commit",
    "-m",
    `chore(content): auto-update pSEO pages (${stamp})`,
  ]);

  try {
    const remoteUrl = capture("git", ["remote", "get-url", "origin"]);
    if (remoteUrl) {
      run("git", ["push", "origin", "main"]);
      console.log("✓ Pushed updated pSEO pages to GitHub origin/main.");
    }
  } catch {
    console.log(
      "Local commit succeeded. No GitHub 'origin' remote is configured yet—attach a remote to auto-push to Vercel."
    );
  }
}

main();
