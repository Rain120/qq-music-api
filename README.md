<h1 align="center">QQ Music API</h1>

<div align="center">

<img src='music.png' />

![GitHub watchers](https\://img.shields.io/github/watchers/rain120/qq-music-api?style=social) ![GitHub stars](https\://img.shields.io/github/stars/rain120/qq-music-api?style=social) ![GitHub forks](https\://img.shields.io/github/forks/rain120/qq-music-api?style=social)

![node](https\://img.shields.io/node/v/koa?style=flat-square) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Rain120/qq-music-api) 

![GitHub repo size](https\://img.shields.io/github/repo-size/rain120/qq-music-api?style=flat-square) ![GitHub package.json version](https\://img.shields.io/github/package-json/v/rain120/qq-music-api?style=flat-square) ![GitHub](https\://img.shields.io/github/license/rain120/qq-music-api?style=flat-square) ![GitHub open issues](https\://img.shields.io/github/issues/rain120/qq-music-api?style=flat-square) ![GitHub closed issues](https\://img.shields.io/github/issues-closed/rain120/qq-music-api) ![GitHub last commit](https\://img.shields.io/github/last-commit/rain120/qq-music-api?style=flat-square) ![GitHub top language](https\://img.shields.io/github/languages/top/rain120/qq-music-api?style=flat-square)

</div>

> QQ 音乐 API，基于 `Koa2 + TypeScript` 构建，通过 Web 端请求 QQ 音乐接口数据。本项目集成了自动化数据处理代理，提供高效、易用的接口服务。
> 有问题请提 [issue](https://github.com/Rain120/qq-music-api/issues)。欢迎阅读 [参与贡献指南](./CONTRIBUTING.md) 参与项目开发，并查阅 [AI 代理指南](./AGENTS.md) 了解自动化机制。
> 当前主干分支已完成 TypeScript 化改造，核心源码、测试与构建链路均已切换到 TypeScript 体系。
> TypeScript 版本请使用 `next` 分支，JavaScript 版本请使用 `main` 分支。

> ⚠️ 当前代码仅供学习，不可做商业用途。

### API结构图

> 目前暂时没有时间做登录模块的接口，欢迎各位大佬给我`PR`, 阿里嘎多

![qq-music](./screenshot/qq-music.png)

### 环境要求

> 本项目采用 `Koa2 + TypeScript` 技术栈，建议使用较新的 Node.js LTS 版本进行开发与运行。

```
node -v
```

### 🚀 快速入门 (Quick Start)

#### 📦 安装

请确保您的本地 Node.js 版本满足 [环境要求](#环境要求)。

```sh
git clone git@github.com:Rain120/qq-music-api.git
cd qq-music-api
npm install
```

#### 🔨 项目启动

```sh
# 开发环境（支持热重载）
npm run dev

# 类型检查
npm run build

# 代码检查
npm run lint

# 单元测试
npm run test

# 本地启动
npm start
```

项目默认监听端口是 `3200`，启动成功后可在浏览器访问 `http://localhost:3200` 体验接口服务。

### 🏗️ 项目架构

- 应用入口：`src/app.ts` 负责启动 `Koa`、注册中间件、挂载路由，并暴露 `/explorer`、`/explorer/index.html`、`/explorer/metadata`。
- 控制器层：`src/controllers/*` 负责处理 HTTP 入参、调用服务层并整理返回结果。
- 服务层：`src/services/*` 负责访问 QQ 音乐相关能力，是歌曲、歌手、歌单、排行榜等数据获取逻辑的核心承载层。
- Explorer 元数据层：`src/config/apiExplorer.ts` 维护接口清单、请求方法、分类、参数与 `POST` 请求体示例，驱动调试表单动态渲染。
- Explorer 逻辑层：`src/explorer/contracts`、`src/explorer/domain`、`src/explorer/application` 负责状态模型、树构建、搜索筛选和 Store/Command 逻辑。
- Explorer 视图层：`public/explorer/*` 提供静态页面、交互脚本和样式，组成完整的本地调试工作台。
- 测试与文档：`tests/*` 覆盖控制器、服务和 Explorer，`docs/*` 用于 Docsify 文档与界面截图展示。

#### 🔎 API Explorer

- `API Explorer` 是项目内置的本地接口调试工作台，用于快速选择接口、填写参数、发送请求并查看结果。
- 默认入口地址是 `http://localhost:3200/explorer`，访问 `/explorer` 时会自动重定向到 `/explorer/index.html`。
- Explorer 元数据接口为 `http://localhost:3200/explorer/metadata`，页面会基于该接口动态生成可调试的接口列表与表单。

#### Explorer 启动方式

```sh
# 开发模式：默认自动打开 Explorer
npm run dev

# 本地启动服务后手动打开 Explorer
npm start

# 启动时显式开启自动打开
AUTO_OPEN_EXPLORER=true npm start

# 禁用自动打开（dev 脚本默认会开启）
AUTO_OPEN_EXPLORER=false npm run dev
```

- `npm run dev` 默认会设置 `AUTO_OPEN_EXPLORER=true`，因此服务启动后会自动拉起浏览器。
- `npm start` 默认只启动服务，不会自动打开页面，可手动访问 `http://localhost:3200/explorer`。
- 在 `CI` 或测试环境下不会自动打开浏览器。

#### Explorer 操作步骤

1. 启动服务并打开 `http://localhost:3200/explorer`。
2. 在顶部选择请求方法：`ALL`、`GET` 或 `POST`。
3. 在搜索框中输入接口名、路由关键字或分类关键字，选择目标接口。
4. 根据表单提示填写路径参数、查询参数，或为 `POST` 接口编辑 JSON Body。
5. 点击 `发送请求`，在右侧查看最新响应结果。
6. 在 `Logs` 区域检索当前会话中的历史请求、失败记录和最近一次请求。

#### Explorer 界面能力

- **接口筛选**：支持按请求方法过滤，并通过搜索框快速定位接口。
- **动态表单**：根据接口元数据自动生成路径参数、查询参数和请求体输入区域。
- **响应预览**：展示最近一次请求的状态、耗时和格式化后的返回内容。
- **会话日志**：保存当前页面会话内的请求记录，支持按关键字搜索以及按 `全部`、`仅失败`、`仅进行中`、`仅成功` 过滤。
- **快速跳转**：内置 `最近请求` 和 `最近失败` 快捷按钮，便于定位调试问题。

#### Explorer 功能截图

**整体预览**

![Explorer 整体预览](./docs/explorer-overview.png)

#### Explorer 使用示例

以搜索歌曲接口为例：

1. 启动项目后进入 `http://localhost:3200/explorer`。
2. 选择或搜索 `getSearchByKey`。
3. 在参数区填写 `key=周杰伦`，可按需补充 `limit`、`page` 等参数。
4. 点击 `发送请求`。
5. 在 `Response` 面板查看接口返回，在 `Logs` 面板查看本次请求的 URL、状态和结果摘要。

> 提示：部分 `POST` 接口会提供默认 JSON Body 示例，可直接修改后发起请求，适合调试批量查询类接口。

### 🧱 当前技术栈与状态

- 服务框架：`Koa2`
- 语言体系：`TypeScript`
- 请求能力：`Axios`
- 代码检查：`Biome`
- 测试方案：`Jest + Supertest`
- 构建与容器：支持本地运行与 Docker 镜像构建

### ⏭️ Next 更新计划

- 持续补齐接口层、服务层与工具层测试用例，进一步提升覆盖率与回归稳定性。
- 完善 TypeScript 类型建模，收敛控制器、服务返回结构与公共工具的类型边界。
- 优化 Docker 与生产部署链路，确保构建产物、运行方式和发布流程保持一致。
- 持续更新接口文档、贡献指南和 AI 代理说明，减少文档与实现之间的偏差。
- 逐步推进登录态、个性化数据等高复杂度接口能力的调研与实现。

### 🐳 Docker

```sh
# local local build
npm run build:local-images

# local remote build
npm run build:remote-images

# build images
npm run build:images

# local run
npm run run:images

# remote run
docker pull qq-music-api
```

### 功能特性

- [x] 获取歌曲播放链接 **2021-01-24**
- [x] 支持自定义设置 `cookie` **2021-01-23**
- [x] 获取歌曲 + 专辑图片 **2020-05-24**
- [x] 获取歌手热门歌曲 **2020-07-04**
- [x] 获取QQ音乐产品的下载地址
- [x] 获取歌单分类
- [x] 获取歌单列表
- [x] 获取歌单详情
- [x] 获取MV标签
- [x] 获取MV播放信息
- [x] 获取歌手MV
- [x] 获取相似歌手
- [x] 获取歌手信息
- [x] 获取歌手被关注数量信息
- [x] 获取电台列表
- [x] 获取专辑
- [x] 获取数字专辑
- [x] 获取歌曲歌词
- [x] 获取MV
- [x] 获取新碟信息
- [x] 获取歌手专辑
- [x] ~~获取歌曲VKey~~ **2021-01-24**
- [x] 获取搜索热词
- [x] 获取关键字搜索提示
- [x] 获取搜索结果
- [x] 获取首页推荐
- [x] 获取排行榜单列表
- [x] 获取排行榜单详情
- [x] 获取评论信息(cmd代表的意思没太弄明白)
- [x] 获取票务信息
- [x] 获取歌单详情
- [x] 获取歌手列表

### 使用文档

使用`apis`详见[文档](https://rain120.github.io/qq-music-api/#/)

### Star History

<a href="https://star-history.dera.page/#rain120/qq-music-api&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://star-history.dera.page/svg?repos=rain120/qq-music-api&type=date&theme=dark&logscale&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://star-history.dera.page/svg?repos=rain120/qq-music-api&type=date&logscale&legend=top-left" />
    <img alt="Star History Chart" src="https://star-history.dera.page/svg?repos=rain120/qq-music-api&type=date&logscale&legend=top-left" />
  </picture>
</a>

### 关于项目

**灵感来自**

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

[Vue2.0开发企业级移动端音乐Web App](https://coding.imooc.com/class/107.html)

**参考内容**

[Koa 2](https://koa.bootcss.com/)

[Axios](https://github.com/axios/axios)

[阮一峰老师 - HTTP Referer 教程](http://www.ruanyifeng.com/blog/2019/06/http-referer.html)

### 项目不足

1. 当前已补充基础 `unit test` 与接口测试，但整体覆盖率和复杂场景用例仍有继续提升空间。
2. 登录、获取个人信息等依赖登录态的接口能力仍未完善。

### 🤖 AI 代理 (Agents)

本项目引入了智能化代理架构以优化数据获取和解析链路。详细了解各 AI 代理的角色、功能以及调用规范，请查阅我们的 **[AI 代理指南 (AGENTS.md)](./AGENTS.md)**。

#### 🤝 参与贡献 ![PR](https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square&logo=appveyor)

我们非常欢迎并感激所有的贡献！无论是提交 Bug、改进文档还是新增功能，您的支持对项目发展至关重要。

详细的贡献流程、代码提交规范以及本地开发配置，请仔细阅读我们的 **[参与贡献指南 (CONTRIBUTING.md)](./CONTRIBUTING.md)**。您可以通过提交 [Pull Requests](https://github.com/Rain120/qq-music-api/pulls) 或发布 [Issue](https://github.com/Rain120/qq-music-api/issues) 来参与共建。

#### 👨‍🏭 作者

> Front-End development engineer, technology stack: React + Typescript + Mobx, also used Vue + Vuex for a while

- [Github](https://github.com/Rain120)
- [知乎](https://www.zhihu.com/people/yan-yang-nian-hua-120/activities)
- [掘金](https://juejin.im/user/57c616496be3ff00584f54db)

#### 📝 License

[MIT](https://github.com/Rain120/qq-music-api/blob/master/LICENSE)

Copyright © 2019-present [Rain120](https://github.com/Rain120).
