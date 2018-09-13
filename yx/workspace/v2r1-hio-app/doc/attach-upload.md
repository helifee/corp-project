---
title: 附件上传
---

标签（空格分隔）： 未分类

---

## 说明：如果发现控制台有什么什么.infoMsg undefined 刷新页面重试下（此问题可能是uploader的一个bug，极少复现；以后复现了再处理） (此为调试信息，仅开发模式显示)

# 配置说明
| name          | description              |
| ------------- |:------------------------|
|readonly|是否是只读模式，如果是则只展示上传过的文件列表，不能上传|
|required|表示是否必须上传至少一个文件，或者业务id下本身就有至少一个文件，用于计算allowSubmit属性（即require为true且列表中没有任何文件则不允许提交）|
|appId，businessId和categoryId|管各自的后端要|
|multiple|是否允许同时选择多个文件上传|

# 各种配置默认值
```javascript
        multiple:{
                type:Boolean,
                default:true
            },
            readonly:{
                type:Boolean,
                default:false
            },
            required:{
                type:Boolean,
                default:true
            },
            appId:{
                type:[String,Number],
                default:'0'
            },
            businessId:{
                type:[String,Number],
                default:'0'
            },
            categoryId:{
                type:[String,Number],
                default:'0'
            },
```





# 组件中关键data属性说明（可通过$refs.xxx.属性名访问）
| name          | description              |
| ------------- |:------------------------|
|allowSubmit|是否允许提交表单（如果非readonly模式，有文件正在上传，则不允许提交）|
|uploader|使用到的百度webuploader初始化之后的instance|

# 事件
| name          | description              |params|
| ------------- |:------------------------|:------------------------|
|uploadError|上传过程中出错|无|
|uploadFinished|所有文件提交完成之后成功|成功的ajax请求返回信息||



