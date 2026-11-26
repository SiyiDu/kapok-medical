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
| `baseCity` / `region` / `regionProse` | 团队所在城市和服务范围。`region` 用在标签和标题里（Shenzhen & Guangzhou），`regionProse` 用在句子中间（Shenzhen and Guangzhou），两个要一起改 |
| `feeLabel` | 协调费的展示文案，现在是 "under US$100" |
| `replyTime` | 承诺的回复时间，做不到就改 |
| `formEndpoint` | 表单后端地址，见下 |
| `legalEntity` | 注册主体名称，用于法律页面 |

另外两处要补：

- `src/app/terms/page.tsx` 里退款条款和适用法律是方括号占位。
- 三个法律页面是通用模板，上线前请找懂行的人看一遍。

## 设计

整体是安静的高端杂志式版面：通栏的实景照片、超大衬线标题（强调处用斜体）、细线代替边框、大量留白，不用圆角和投影。

- 配色和主题在 `src/app/globals.css`：象牙色纸张底 `#f3eee4`、近黑的墨色 `#0f1513`、一点青铜色 `#b08d57`，红色只出现在 logo 的花上。HeroUI 的主题变量也在这里覆盖（直角、细线代替阴影）。
  调色板用 `@theme inline` 声明，所以 `text-ink`、`bg-ivory` 这类工具类可以用，但运行时没有 `var(--color-ink)`：手写 CSS 时直接写色值，或用 `:root` 上的变量。
- 标题用 Cormorant Garamond，正文和界面用 Geist，在 `src/app/layout.tsx` 里加载。Cormorant 字形偏小，只用在 26px 以上；各字号的行距和字距规则写在 `globals.css` 的 `.display` 上方。
- 全站没有全大写的文字。标题用 Title Case，小标签（`.eyebrow`）用句首大写。
- 顶栏在 `src/components/Header.tsx`：盖在首屏照片上时是透明的浅色字，页面滚动后或在其他页面变成纸色底加细线；往下读时收起，往上滚时回来。手机上的菜单是一整张纸色的抽屉。
- 首页在 `src/app/page.tsx` 和 `src/components/sections.tsx`：首屏（一张照片，右上角竖排的“深圳、广州、就医礼宾”）、一句话说明加三个要点、服务（四张照片错落排开：竖、横、横、竖）、流程（深色底，三步加一个三日行程示例）、费用（排版式表格）、结尾行动区。
- 页脚在 `src/components/Footer.tsx`：一句关于木棉的题记和很大很淡的品牌名。品牌名换了，题记要重写或删掉，那个字号也要按注释重新调。
- 页面骨架（内页页头、分栏区块、按钮和链接）在 `src/components/ui.tsx`，内页共用的小区块（清单、条目、紧急提示）在 `src/components/blocks.tsx`。
- 询盘表单、常见问题的折叠面板、手机菜单的抽屉用的是 HeroUI v3 的开源组件，没有依赖 Pro 包，所以任何机器都能构建。
- 动效只用 CSS：首屏照片缓慢落定并随滚动轻微位移，标题逐行升起，图片进入视口时从上往下展开，细线自己画出来，文字淡入，链接下划线划入。系统开启“减少动态效果”时全部关闭。

## 照片

所有照片都登记在 `src/content/photos.ts`，换图只改这一个文件。

现在用的 9 张都来自 Unsplash，按 Unsplash License 可免费商用、不要求署名。
它们只是示意图：没有一张是某家具体医院、团队成员或客户，文案里也没有这样说，免责声明页（Photographs 一节）写明了这一点。有了自己拍的照片（医院门口、接机、诊所）就尽快换掉，真实感会好很多。

| 用在哪里 | 内容 | 摄影师（Unsplash 用户名） |
| --- | --- | --- |
| 首屏、分享图 | 黄昏的深圳湾天际线 | darmau |
| 医院页 | 蓝调时分的深圳湾（有图注） | darmau |
| 预约服务 | 带一棵小树的白色接待空间 | rawkkim |
| 接机与行程 | 深圳宝安机场的蜂巢天花板（有图注） | juniperphoton |
| 陪诊 | 弧形的采光走廊（用 `focus` 调了裁切） | arturoeg_foto |
| 口腔与体检 | 安静的私人候诊室（竖图，用 `focus` 调了裁切） | ___atmos |
| 流程区块、流程页 | 航站楼里逆光的旅客剪影 | arturtumasjan |
| 关于页 | 木棉花枝上的两只八哥（有图注） | zeonjat |
| 结尾行动区 | 日落时的广州天际线和广州塔 | ideasboom |

每张照片除了 `id` 还有几个字段，换图时一起改：

- `alt`：给读屏软件的描述，照实写画面里有什么。
- `caption`（可选）：显示在内页页头照片下面的一行小字。只给拍的是真实、叫得出名字的东西的照片写（现在是木棉、深圳湾、宝安机场）；示意性的室内图不写，免得被当成某家医院。
- `focus`（可选）：照片被裁成别的比例时要保住的位置，`x`、`y` 从左上角算，0 到 1。同一张图在手机页头是竖的，在桌面页头是很宽的横条，主体不在正中时用它。换图后删掉或重新调，并在 1440 和 390 两个宽度下各看一眼。

图片目前由 Unsplash 的图片服务器直接提供，会按屏幕宽度自动出合适的尺寸和裁切。
想自己托管：把图片存到 `public/photos/`，再把 `photos.ts` 里的 `photoUrl` 改成返回本地路径（`focus` 的裁切是图片服务器做的，自己托管时要先把图裁好）。

## 改文案

- 服务内容：`src/content/services.ts`
- 流程、费用、常见问题、医院类型和示例：`src/content/site-content.ts`
- 首页各区块：`src/app/page.tsx`
- 每个页面的浏览器标题和分享描述：各自 `page.tsx` 顶部的 `metadata`；全站默认的标题和描述在 `src/app/layout.tsx`

写英文文案时：

- 撇号和引号用排版符号 `’` `“` `”`，不要用键盘上的直引号 `'` `"`，放大到标题字号时差别很明显。
- 不写全大写，标题用 Title Case，句子尽量短。
- 只写真实的内容：没有的客户评价、数据、合作关系、奖项不要写。

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
- 分享图是 `public/og.jpg`（1200×630），用的是首屏那张照片，上面有品牌名和标语，改了之后需要重新出一张。
