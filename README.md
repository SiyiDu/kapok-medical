# 涉外就医服务网站

面向外国患者的英文营销网站：预约医院国际部、接机与行程、陪诊、口腔和体检报价。
Next.js 16 + Tailwind CSS 4 + HeroUI v3（`@heroui/react`），构建结果是纯静态文件，可以放在任何静态托管上。

## 运行

```bash
npm install
npm run dev      # 本地预览 http://localhost:3000
npm run build    # 生成静态站点到 ./out
```

## 上线前必须改的内容

品牌和业务信息都在 `src/site.config.ts`，标了 `PLACEHOLDER` 的都是占位：

| 字段 | 说明 |
| --- | --- |
| `name` / `fullName` | 品牌名。"Kapok"（木棉）只是占位，用之前先查商标和域名 |
| `url` | 正式域名，影响 canonical、sitemap、分享图链接 |
| `email` | 收询盘的邮箱 |
| `whatsapp` / `tiktok` | 填了才会显示对应按钮 |
| `baseCity` / `region` | 团队所在城市和服务范围 |
| `feeLabel` | 协调费的展示文案，现在是 "under US$100" |
| `replyTime` | 承诺的回复时间，做不到就改 |
| `formEndpoint` | 表单后端地址，见下 |
| `legalEntity` | 注册主体名称，用于法律页面 |

另外两处要补：

- `src/app/terms/page.tsx` 里退款条款和适用法律是方括号占位。
- 三个法律页面是通用模板，上线前请找懂行的人看一遍。

## 设计

界面用 HeroUI v3 的开源组件（Button、Card、Accordion、Drawer、表单组件等）搭建，没有依赖 Pro 包，所以任何机器都能构建。
插画全部是手写的 SVG，没有用任何图片素材，不存在版权问题，放大也不会糊。

- 配色和主题在 `src/app/globals.css`：暖色纸张底、深松绿文字、木棉红按钮，外加纸纹、票据和动效的样式。
- 标题用 Instrument Serif，正文和界面用 Geist，在 `src/app/layout.tsx` 里加载。
- 插画在 `src/components/art/`：
  - `Landscape.tsx`：首屏的深圳湾日出全景，以及内页页头和页脚用的山脊。
  - `Kapok.tsx`：木棉花和花枝。
  - `Spots.tsx`：四张服务卡的小插画。
  - `gen.ts`：色板和生成山脊的函数。山形由固定种子生成，每次构建结果一致。
- 带插画的区块（登机牌样式的行程、服务卡、流程面板、收据样式的费用、行动区）在 `src/components/sections.tsx`。
- 页面骨架在 `src/components/ui.tsx`，用到 HeroUI 复合组件的区块在 `src/components/blocks.tsx`。
- 动效只用 CSS，系统开启"减少动态效果"时全部关闭。

## 改文案

- 服务内容：`src/content/services.ts`
- 流程、费用、常见问题、医院类型和示例：`src/content/site-content.ts`
- 首页各区块：`src/app/page.tsx`

## 询盘表单

没有配置 `formEndpoint` 时，提交会打开访客的邮件客户端，内容已经填好。
要让表单直接提交，在 Formspree、Web3Forms 之类的服务注册后把地址填进 `formEndpoint`，
表单会以 JSON 形式 POST 过去。

## 部署

仓库里有 `.github/workflows/deploy.yml`：每次推送到 `main`，GitHub Actions 会自动构建并发布到 GitHub Pages。
站点地址和子路径由流程在构建时填入（`NEXT_PUBLIC_SITE_URL` 和 `NEXT_PUBLIC_BASE_PATH`），不用手改。

换到别的托管也可以：`npm run build` 之后把 `out/` 目录上传到 Vercel、Cloudflare Pages、Netlify 或任何静态空间。
这时把 `site.config.ts` 里 `url` 的备用值改成正式域名再构建。

- `site.config.ts` 里的 `indexable` 现在是 `false`，每个页面都会告诉搜索引擎不要收录。占位信息换完、准备正式上线时改成 `true`。
- 分享图是 `public/og.jpg`（1200×630），上面有品牌名和标语，改了之后需要重新出一张。
