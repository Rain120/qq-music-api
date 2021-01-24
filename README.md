<h1 align="center">QQ Music API</h1>

<div align="center">

<img src='music.png' />

![GitHub watchers](https://img.shields.io/github/watchers/rain120/qq-music-api?style=social) ![GitHub stars](https://img.shields.io/github/stars/rain120/qq-music-api?style=social) ![GitHub forks](https://img.shields.io/github/forks/rain120/qq-music-api?style=social)
<br />
![node](https://img.shields.io/node/v/koa?style=flat-square)
<br />
![GitHub repo size](https://img.shields.io/github/repo-size/rain120/qq-music-api?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/rain120/qq-music-api?style=flat-square) ![GitHub](https://img.shields.io/github/license/rain120/qq-music-api?style=flat-square) ![GitHub open issues](https://img.shields.io/github/issues/rain120/qq-music-api?style=flat-square) ![GitHub closed issues](https://img.shields.io/github/issues-closed/rain120/qq-music-api) ![GitHub last commit](https://img.shields.io/github/last-commit/rain120/qq-music-api?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/rain120/qq-music-api?style=flat-square)

</div>

> QQ音乐API koa2 版本, 通过Web网页版请求QQ音乐接口数据, 有问题请提 [issue](https://github.com/Rain120/qq-music-api/issues)

> 当前代码仅共学习，不可做商业用途

### API结构图

> 目前暂时没有时间做登录模块的接口，欢迎各位大佬给我`PR`, 阿里嘎多

![qq-music](./screenshot/qq-music.png)

### 环境要求

> 因为本项目采用的是`koa2`, 所以请确保你的`node`版本是7.6.0+

```
node -v
```
### 📦 安装

```
git@github.com:Rain120/qq-music-api.git
npm install
```

### 🔨项目启动
```
// npm i -g nodemon
npm run start

// or don't install nodemon
node app.js
```
项目监听端口是`3200`

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

### 关于项目

**灵感来自**

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

[Vue2.0开发企业级移动端音乐Web App](https://coding.imooc.com/class/107.html)

**参考内容**

[Koa 2](https://koa.bootcss.com/)

[Axios](https://github.com/axios/axios)

[阮一峰老师 - HTTP Referer 教程](http://www.ruanyifeng.com/blog/2019/06/http-referer.html)

### 项目不足

1. 因为本人没写过`unit test`, 所以本项目尚未添加`unit test`, 等有时间再添加;

2. 登录获取个人信息等接口都没做

#### 🤝 贡献 ![PR](https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square&logo=appveyor)

We welcome all contributions. You can submit any ideas as [pull requests](https://github.com/Rain120/qq-music-api/pulls) or as a GitHub [issue](https://github.com/Rain120/qq-music-api/issues). 

#### 👨‍🏭 作者

> Front-End development engineer, technology stack: React + Typescript + Mobx, also used Vue + Vuex for a while

- [Github](https://github.com/Rain120)
- [知乎](https://www.zhihu.com/people/yan-yang-nian-hua-120/activities)
- [掘金](https://juejin.im/user/57c616496be3ff00584f54db)

#### 📝 License

[MIT](https://github.com/Rain120/qq-music-api/blob/master/LICENSE)

Copyright © 2019-present [Rain120](https://github.com/Rain120).
