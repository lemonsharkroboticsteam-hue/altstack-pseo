# AltStack — 全自动 AI 与效率软件 pSEO 网站

零数据库、零服务器维护成本的程序化 SEO（pSEO）网站，基于 **Next.js (App Router) + Tailwind CSS + 本地 JSON 静态生成 (SSG)** 构建。

---

## 1. 核心目录说明（产品经理只需关心 `data/`）

- `data/tools.json`：所有软件的定价方案、核心功能、优缺点、评分与官网地址。
- `data/alternatives.json`：`/best-[软件名]-alternatives`（最佳平替清单）页面数据。
- `data/comparisons.json`：`/[软件A]-vs-[软件B]`（深度对比评测）页面数据。
- **`data/affiliates.json`（变现核心配置文件）**：全站所有外链按钮统一读取此文件。
- `data/pipeline-log.json`：自动采集与生成任务的运行日志。

---

## 2. 如何一键替换联盟推广（Affiliate）链接

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

## 3. 如何开启 Google AdSense 广告变现

页面侧边栏和文章中部已预留好标准的 `AdSenseSlot` 组件（开发/未配置状态会显示虚线占位预览框）。

当你拿到 Google AdSense 审核通过后的 Publisher ID（形如 `ca-pub-1234567890123456`），只需在 **Vercel 控制台 -> Settings -> Environment Variables** 中添加：

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-你的ID`
- `NEXT_PUBLIC_SITE_URL` = `https://你的正式域名.com`

然后重新部署（Redeploy）即可自动生效。

---

## 4. 常用本地命令

- `npm run validate:data`：校验所有 JSON 数据完整性与链接引用，并安全同步 `affiliates.json`
- `npm run ingest:data`：读取 `data/inbox/latest-scrape.json` 自动清洗并生成新的平替与 VS 页面
- `npm run build`：执行 Next.js 静态站点生成（SSG），自动生成 `sitemap.xml` 和 `robots.txt`
- `npm run publish:auto`：校验数据 + 验证构建 + 自动提交并推送到 GitHub 触发 Vercel 上线
