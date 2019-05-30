## QQMusicAPI

!> QQ音乐API koa2 版本, 通过Web网页版请求QQ音乐接口数据, 有问题请提 [issue](https://github.com/Rain120/q-music/issues), 或者你有其他想法欢迎`PR`.

## API结构图

![qq-music](https://raw.githubusercontent.com/Rain120/q-music/master/screenshot/qq-music.png)

## API接口

!> koa接口说明(参数, 地址, 效果图)

### 获取QQ音乐产品的下载地址

接口说明: 调用此接口, 可获取QQ音乐标准产品下载链接

接口地址: `/downloadQQMusic`

![获取QQ音乐产品的下载地址](https://raw.githubusercontent.com/Rain120/q-music/master/screenshot/downloadQQMusic.png)

### 获取热词

接口说明: 调用此接口, 可获取搜索热词

接口地址: `/getHotkey`

![获取搜索热词](https://raw.githubusercontent.com/Rain120/q-music/master/screenshot/gethotkey.png)

### 获取歌单分类

接口说明: 调用此接口, 可获取歌单分类, 包含`category`信息

接口地址: `/getSongListCategories`

```
sortId: 1, sortName: 默认
sortId: 2, sortName: 最新
sortId: 3, sortName: 最热
sortId: 4, sortName: 评分
sortId: 5, sortName: none

1. 热门
    categoryId: 10000000
    categoryName: 全部

2. 语种
  2.1
    "categoryId": 167,
    "categoryName": "英语",
  2.2
    "categoryId": 168,
    "categoryName": "韩语",
  2.3
    "categoryId": 166,
    "categoryName": "粤语",
  2.4
    "categoryId": 169,
    "categoryName": "日语",
  2.5
    "categoryId": 170,
    "categoryName": "小语种",
  2.6
    "categoryId": 203,
    "categoryName": "闽南语",
  2.7
    "categoryId": 204,
    "categoryName": "法语",
  2.8
    "categoryId": 205,
    "categoryName": "拉丁语",

3. 流派
  3.1
    "categoryId": 6,
    "categoryName": "流行",
  3.2
    "categoryId": 15,
    "categoryName": "轻音乐",
  3.3
    "categoryId": 11,
    "categoryName": "摇滚",
  3.4
    "categoryId": 28,
    "categoryName": "民谣",
  3.5
    "categoryId": 8,
    "categoryName": "R&B",
  3.6
    "categoryId": 153,
    "categoryName": "嘻哈",
  3.7
    "categoryId": 24,
    "categoryName": "电子",
  3.8
    "categoryId": 27,
    "categoryName": "古典",
  3.9
    "categoryId": 18,
    "categoryName": "乡村",
  3.10
    "categoryId": 22,
    "categoryName": "蓝调",
  3.11
    "categoryId": 21,
    "categoryName": "爵士",
  3.12
    "categoryId": 164,
    "categoryName": "新世纪",
  3.13
    "categoryId": 25,
    "categoryName": "拉丁",
  3.14
    "categoryId": 218,
    "categoryName": "后摇",
  3.15
    "categoryId": 219,
    "categoryName": "中国传统",
  3.16
    "categoryId": 220,
    "categoryName": "世界音乐",
```

![获取歌单分类](https://raw.githubusercontent.com/Rain120/q-music/master/screenshot/getSongListCategories.png)

### 获取歌单详情

接口说明: 调用此接口, 可获取歌单详情

参数列表:
- 必选参数
歌单`id`: `disstid`

接口地址: `/getSongListDetail`

调用例子: `/getSongListDetail?disstid=7011264340`

![获取歌单详情](https://raw.githubusercontent.com/Rain120/q-music/master/screenshot/getSongListDetail.png)
