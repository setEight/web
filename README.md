# 1.npm安装所需要的包

使用webpack打包

# 2.创建入口文件

创建入口js文件和html文件

# 3.创建主界面

创建app.vue 文件做为承载公共部分的组件，中间部分用router-view双标签占位

完成公共头尾的内容和样式，头部使用的mint-ui，尾部用的mui（由于mui有自己默认的背景）

在入口文件要导入相关的包，mui的扩展图标需要引入扩展图标的css文件

# 4.创建tabbar的四个组件

- home

- member

- shopcar

- search

  

其中member和search没有内容

# 5.导入组件，配置路由

导入四个页面的组件，引入vue-router

实现模板引擎效果，改造tabbar中的a标签为router-link，href改为to

完成tabbar的选中高亮，linkActiveClass

# 6.完成首页内容

在home.vue组件中完成首页的轮播图和六宫格，参考mint-ui和mui

六宫格改造，需要link新闻资讯、图片分享、商品购买三个板块

# 7.axios

本项目全部后台数据通告axios来渲染

# 8.新闻资讯

新闻资讯分为新闻列表和新闻详情两部分，通过数据的id连接

## 新闻列表

使用mui的图文列表布局，加上发表时间和点击次数即可

这里因为时间需要格式化，且多处用到，使用moment.js ,创建全局过滤器

要使用router，改造不再多说

根据后台数据，要进入详情页面需要提供新闻的id，使用‘/:id’方式传，用$router.params.id获取,再传给后台进行查询

## 新闻详情

包含文章和评论两块，文章后台给的数据是html格式，v-html设置

# 9.评论子组件

多处用到评论，考虑可以作为子组件创建，哪里需要那里调用，创建comment.vue组件，承载评论部分

使用子组件，先引入，components里边注册，再调用组件名，通过v-bind：xx=‘id’来传递评论所必须的id

子组件props：[‘xx’]接受，这里xx可当作data中的属性使用,

## 渲染对应的评论

## 发表评论

输入框v-model绑定data中数据，非空校验，根据后台地址进行传值，成功，友好提示，并更新页面，失败，返回，提示错误信息

## 点击加载下一页

后台提供数据key为 pageIndex ，在data中定义，pageIndex=1，渲染对应评论的方法中，pageIndex=1换为

pageIndex++，data中储存评论的数组不能用 = 赋值，要使用arr.concat(newArr)来合并，不然就会覆盖第一页，而不是多加载一页

# 10.图文列表

新建组件photoList.vue

头部的滑动使用mui的tabbar 和scroll 由于冲突需要更改类名

通过axios渲染图文内容，用route-link包裹，to到photoInfo

页面，传过去id值，和之前方法一样

分类渲染后台分类好的数据，默认传值0获取全部，然后给tabbar选项绑定事件，传值为index

# 11.图文详情

photoInfo.vue

通过地址栏的id获取对应数据，要加一个缩略图，使用vue-preview，先npm下载，在index.js导入

```
<vue-preview :slides="imgList" @close="handleClose"></vue-preview>
```

根据文档设置相应的参数

一样导入公共的评论插件

# 12.商品列表

shopList.vue

axios获取后台数据，导入数据，渲染页面，和加载评论一样的加载更多功能，不过这里多了一步判断，获取数据后，获取下一页数据，如果不存在，也就是没数据，没商品了，就用v-if隐藏掉加载更多按钮

# 13.商品详情

shopInfo.vue

axios获取两个数据，一个当前商品购物车参数（数量，卖价），一个和商品列表一样接口，遍历找出当前id所对应的对象，要用到上架时间，market_price以及库存

套用mui的卡片视图结果和样式，轮播图还是mint-ui的轮播，数量加减上绑定函数，加判断，不能小于1不能大于库存

最下方两个route-link连接另外两个页面，地址传过去id

# 14.图文介绍和评论

desPic.vue  desMsg.vue

接收地址的id，获取后台数据，其余就是改样式

评论页面只要引入之前写的公共评论组件就ok

# continue
hahahah