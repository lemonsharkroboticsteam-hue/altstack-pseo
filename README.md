# AltStack — 全自动 AI 与效率软件 pSEO 网站（Cloudflare Workers 静态托管 / Pages 版）

零数据库、零服务器费用的程序化 SEO（pSEO）网站，基于 **Next.js (App Router `output: "export"`) + Tailwind CSS + 本地 JSON 静态生成** 构建，通过 `wrangler.jsonc` 将导出的纯静态 `out/` 文件夹部署到 **Cloudflare Workers Static Assets**（或 Cloudflare Pages）。

---

## 1. 核心目录说明（产品经理只需关心 `data/`）

- `data/tools.json`：所有软件的定价方案、核心功能、优缺点、评分与官网地址。
- `data/alternatives.json`：`/best-[软件名]-alternatives`（最佳平替清单）页面数据。
- `data/comparisons.json`：`/[软件A]-vs-[软件B]`（深度对比评测）页面数据。
- **`data/affiliates.json`（变现核心配置文件）**：全站所有外链按钮统一读取此文件。
- `data/pipeline-log.json`：自动采集与生成任务的运行日志。

---

## 2. Cloudflare Workers 静态托管配置参数（`wrangler.jsonc`）

项目根目录已配置 `wrangler.jsonc`（指向 `./out` 静态目录）。绑定 GitHub 仓库后，在 Cloudflare **Workers & Pages -> Settings -> Build** 填写：

- **Build command（构建命令）**：`npm run build`
- **Deploy command（部署命令）**：`npx wrangler deploy`
- **Environment variables / Variables and Secrets（环境变量）**：
  - `NODE_VERSION` = `22`（项目已内置 `.nvmrc` 为 `22`）
  - `NEXT_PUBLIC_SITE_URL` = `https://你的域名.workers.dev`（或自定义域名）
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-你的AdSenseID`（拿到审核 ID 后填写）

*(注：若改用 Cloudflare Pages，Build command 填 `npm run build`，Build output directory 填 `out` 即可。)*

---

## 3. 如何一键替换联盟推广（Affiliate）链接

打开 `data/affiliates.json`，找到对应软件（如 `"notion"`），把 `affiliateUrl` 替换为你自己的联盟推广链接，并可顺便把 `isAffiliateActive` 改成 `true`：

```json
{
  "notion": {
    "affiliateUrl": "https://affiliate.notion.so/你的专属推广ID",
    "ctaText": "Try Notion Free",
    "dealBadge": "Free Plan Available",
    "promoNote": "Unlimited pages for individuals",
    "isAffiliateActive": true
  }
}
```

> 自动化采集脚本在添加新软件时**绝不会覆盖**你已经填好的推广链接。

---

## 4. 常用本地命令

- `npm run validate:data`：校验所有 JSON 数据完整性与链接引用，并安全同步 `affiliates.json`
- `npm run ingest:data`：读取 `data/inbox/latest-scrape.json` 自动清洗并生成新的平替与 VS 页面
- `npm run build`：生成纯静态站点到 `out/` 目录（自动产出 `sitemap.xml`、`robots.txt` 和所有 `.html`）
- `npm run publish:auto`：校验数据 + 验证静态导出 + 自动 `git add .`、`git commit` 并推送到 GitHub 触发 Cloudflare Pages 自动上线
