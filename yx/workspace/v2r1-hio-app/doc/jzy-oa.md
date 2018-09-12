---
title: 巨洲云OA项目脚手架文档
---
# 巨洲云OA项目脚手架文档



---

# 关于webAPP的配置文件说明
1 index.js只是入口；env.js由npm shell生成，目的是为了动态产出配置以便应用于不同开发环境。前者不用管不用动，后者在开发过程中可随意更改以满足自己需要，重启项目后将会被重写覆盖

2 base.env.js里配置适用于任意环境下的配置，包括一些全局配置，公共路径设置等

3 因为项目环境分为dev,test,prod，所以对应有三个继承自base.env.js的配置文件，他们分别是dev.env.js,test.env.js,prod.env.js;在继承base.env.js的基础上有各自对应环境下不同的配置，比如本地模式可以设定mock数据，加载调试面板等，test环境可以添加给测试人员看的说明信息等，正式环境则可以压缩js文件等。其中不同环境请求的后端host必然不一样，这是重中之重。且也可能请求多个host。


# 关于样式，图标,图片链接等等静态资源

1 样式分为全局和局部，全局参考2中划分，局部就是每个人负责的功能模块各自的样式，每个人负责的功能模块样式在不影响其他任何模块的情况下随意自由发挥即可。

2 全局样式暂时划分到三个文件中：**reset.scss**(全局重置样式),**global.css**(全局设定样式，比如主色调，对页面主要容器参数设定等)以及**element.scss**(如果我们的系统用了element-ui的a组件，a组件的皮肤不合我司规范，可在此修改)

3 图标能用矢量的就用矢量的（svg或者字体图标），如果用了字体图标要保证字体图标文件中不能因为有很多系统未使用到的导致字体文件过大；如果使用svn图标可以从阿里妈妈图标库中先找，其中svn代码中不能出现style标签，否则打包回报错。推荐优先使用字体图标。

4 图片如果使用了项目文件夹里的图片，路径不能写死。推荐写法：
```html
<img :src="JZY.c.imgPath+'/header-logo.png'">
```
imgPath目前设定为'/static/images'，请不要更改，图片一律扔这里就行，否则可能导致production环境下图片加载出错

5 全局颜色处理策略：
我已经在global.scss里写入以下代码
```css
$global-color:#45A7FE;
.theme-font{
    color:$global-color;
}

.theme-border{
    border-color:$global-color;
}
.theme-bg{
    background:$global-color;
}
```


分别针对字体，边框，背景色等应用全局颜色。将来拾色器上线需要更改颜色，只需要执行几行js代码即可。将来如果可能有其他的东西应用主色调，再加新声明即可。
然后比如弹框的大标题用的是主色调，则：
```html
<h4 class="theme-font" style="display:inline-block;">全部应用</h4>
```

# static目录里放什么文件呢

1 字体，样式，图片文件等
2 其他项目运行时动态加载的资源，比如plupload组件对ie9环境采用flash模式加载，那索性极直接把整个plupload组件直接放static里，在index.html中引入
3 有一些从远古时代过来的组件，要么不支持es6 module，要么就是import进来之后各种问题（虽然可以通过合理配置webpack，但是麻烦；我个人能力也比较有限懒得折腾），比如ueditor,长痛不如短痛，直接扔static里，然后index.html引入



# 关于JZY这个全局变量

该变量（function）有几个静态属性，locale,store,router,Vue,以及s,u,c(三者分别是项目的service，util，config)，以及其他一些东西（详见main.js），且已挂在再Vue.prototype上，目的是在任何vue文件模板以及script中对其挂在的一些玩意儿进行便捷的访问（不用一个一个import然后定义vm了），以及方便加入一些调试手段，欢迎使用。

# 关于国际化的说明
1 src/locale/locale.js存放一些公共的local配置
2 每个模块请在模块文件夹中创建一个【模块名称】.locale.js,按照如下格式配置（注意是module.exports）：
```javascript
//demo.locale.js
module.exports= {
    'zh-CN':{
        foo:'demo bar',
        test:'demo test'
    },
    'en':{
        foo:'demo english bar',
        test:'demo english test'
    }
}


```
3 在每个模块入口vue文件中动态添加locale(将模块文件夹命名作为add方法中第一个参数，比如首页模块中有一个文件src/containers/main/home/home.locale.js)

```javascript
//已将JZY设定为window全局变量可直接使用，简单暴力方便快捷
JZY.locale.add('demo',require('./demo.locale'))

```

4 html中使用

```html
<!--定界符为{},调用l方法并只需要传递一个string型参数-->
        {{l('{demo.foo}和{demo.test}至少选择一项')}}--------
```
5 当前国际化方案支持将配置同步到服务器，更换电脑从服务器加载已设定的语言
6 国际化管理文件locale.js中的方法





| name          | description              | params|返回值|
| ------------- |:------------------------|:---------------:|:---------------:|
|getCurrentLanguage|获取当前设定的语言|-|promise(resolve=当前语言)|
|switchLanguage|切换语言|参数1：string:en zh-CN等国际iso标示|-|
|add|在异步模块中动态添加语言文件|参数1：string：模块名称，参数2：object：模块语言配置|-|
|$t|根据输入字符串返回对应语言配置字符|格式类似：**l('{demo.foo}和{demo.test}至少选择一项')**|string|
|getAll|返回所有已加载语言配置|-|object|
|addEnglishLocale|在一个key-value格式的中文配置结构对象中，抽取英文的key作为英文国际化的默认值|object类型|返回参数1本身|

7 javascript中使用

```javascript
//在全局变量JZY定义之前
import l from '@/locale/locale.js'
l.$t('{headerMenu.home}是header中首页')

//在全局变量JZY定义之后
JZY.locale.$t('{headerMenu.home}是header中首页')
```

8 $t方法参数支持简写

```javascript
//例如，如下参数
this.l('{netDiskLocale.breadMenu.alwaysUsedFiles}')
//可以简写为：
this.l('breadMenu.alwaysUsedFiles')


```

9 使用简写$t参数注意事项

1) 使用** JZY.locale.add('netDiskLocale',require('./netDisk.locale')) ** 语句动态添加国际化语言包时
    第一个参数明明必须遵从 **（模块pathname+'Locale'）**的形式
2) 非当前模块独有的统统视为全局的，统一放在locale.js文件中global命名空间下,采用** l.$t('{global.headerMenu.home}') ** 的方式调用
3) 参数字符串中不包含任何{也不包含任何}
4) 每个模块的路由url开头必须是** /模块名 **


10 所有的语言包map结构中第一级key为语言缩写，命名参考（同element-ui2.0）：

简体中文（zh-CN）
英语（en）

德语（de）
葡萄牙语（pt）
西班牙语（es）
丹麦语（da）
法语（fr）
挪威语（nb-NO）
繁体中文（zh-TW）
意大利语（it）
韩语（ko）
日语（ja）
荷兰语（nl）
越南语（vi）
俄语（ru-RU）
土耳其语（tr-TR）
巴西葡萄牙语（pt-br）
波斯语（fa）
泰语（th）
印尼语（id）
保加利亚语（bg）
波兰语（pl）
芬兰语（fi）
瑞典语（sv-SE）
希腊语（el）
斯洛伐克语（sk）
加泰罗尼亚语（ca）
捷克语（cs-CZ）
乌克兰语（ua）
土库曼语（tk）
泰米尔语（ta）
拉脱维亚语（lv）
南非荷兰语（af-ZA）
爱沙尼亚语（ee）
斯洛文尼亚语（sl）
阿拉伯语（ar）
希伯来语（he）
立陶宛语（lt）
蒙古语（mn）
哈萨克斯坦语（kz）
匈牙利语（hu）
罗马尼亚语（ro）



# 系统环境
* 统一使用Node V8.x.x

# 技术栈
vue2 + vuex + element-ui 2



# 环境划分（暂定,（process.env.NODE_ENV））
1 本地(dev)
2 测试(test)
3 正式(prod)

# 本地启动
1 克隆项目
2 npm install或cnpm install或yarn install(没安装对应包管理器请先自定安装)
3 npm run dev或yarn run dev

# 脚手架说明
1 支持绝大部分es6/es7特性，常见的全部支持，包括async await在内
2 目前不限定eslint，后续可根据领导要求修改

# 兼容性
为现代浏览器和ie9+提供支持


# src文件夹下各目录功能说明
**assert**  存放所有和业务无关静态资源（字体，图片，样式表等）
**components** 存放基于vue开发的公共组件，一般是.vue后缀的文件（例如表格树等）
**config**  所有配置文件，包括各个环境下配置文件
**containers**  将来这可能发展成为一个大项目，这里面存放项目各个部分的页面文件
**containers/Header**   项目各大模块公共部分header（footer根据将来的系统需要再考虑）
**containers/Iframe**   vue提倡纯粹的web app,但为了兼容老项目，或者需要加载老系统中页面，可能使用iframe引入
**containers/main** 存放该OA项目主要的业务文件，将来该项目有可能加载其他vue技术开发的模块，到那时将另建文件夹存放
**directives**  存放项目使用到的指令
**filters** 存放项目使用到的filters
**mixins**  存放各业务模块使用到的组件mixin
**plugins** 各种插件存放（vue的具有install方法的组件插件，具备访问store能力的vuex plugins，其他各种第三方插件等）
**router**  项目路由部分相关配置
**service** 项目业务部分公共服务
**utils**   和业务无关的util存放地
**vuex**    vue数据仓库相关处理
**locale**  国际化支持

# 其他重要文件或目录说明
**/src/main.js** 项目入口文件，项目开发初期阶段可能比较频繁的改动该文件
**/src/containers/AppContainer.vue**    项目入口vue文件
**build目录**   dev-server啊，production模式打包方案等





