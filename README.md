# TrashVPN 官网

TrashVPN（垃圾VPN）的静态官网，实现“免费、不设限、每日更新节点”的产品形象介绍。站点采用纯前端技术，适配桌面与移动端，具备滚动动画与可访问性优化，可直接部署于 GitHub Pages，并可由 Cloudflare 托管自定义域名。

## 目录结构

- `index.html`：主界面（功能亮点、视觉动画、测速仪组件、风险提醒）
- `download.html`：客户端下载页（四大平台按钮，悬浮动效）
- `about.html`：关于页，实时拉取并渲染 `about.md`
- `css/styles.css`：全局样式、响应式、动画与组件样式
- `js/common.js`：导航、页脚注入与滚动动画逻辑
- `js/main.js`：首页测速仪、卡片动画
- `js/download.js`：下载页入口（复用全局脚本）
- `js/about.js`：关于页 Markdown 加载逻辑
- `assests/`：项目图像资源（请注意目录拼写）
- `about.md`：关于页面内容（占位，可自行填写）
- `CNAME`：Cloudflare 自定义域名占位

## 本地预览

> 纯静态站点，可使用任意静态服务器或 VS Code Live Server 预览。以下以 `npx serve` 为例：

```bash
npm install -g serve
serve .
```

在浏览器打开终端输出的本地地址，即可查看动画与响应式效果。

## 部署到 GitHub Pages

1. 将代码推送至 GitHub 仓库 `FuckGFWall/website`。
2. 在仓库设置（Settings）→ Pages 中，Source 选择 `Deploy from a branch`。
3. Branch 选择 `main`（或默认分支），目录选 `/ (root)`。
4. 保存后等待 GitHub Pages 构建完成，访问 `https://fuckgfwall.github.io/website/` 验证。

### 使用 Cloudflare 绑定自定义域名

1. 在 Cloudflare 控制台添加目标域名并开启代理。
2. DNS 中新增 CNAME 记录指向 `fuckgfwall.github.io`。
3. 将本项目根目录 `CNAME` 文件改为实际域名（单行），提交并推送。
4. 待 DNS 生效后，通过 Cloudflare Page Rules/SSL 设置完成 HTTPS。

## 自定义说明

- `about.md` 现为占位内容，请直接编辑该文件即可更新关于页面。
- 下载页按钮指向占位链接，可替换为真实下载地址。
- 页脚社交链接为占位，可在 `js/common.js` 中更新为正式渠道。
- 若需调整动画、配色或断点，可统一修改 `css/styles.css`。

## 许可

项目采用公共许可证（可自行替换），欢迎在保留“TrashVPN”定位的前提下二次开发。
