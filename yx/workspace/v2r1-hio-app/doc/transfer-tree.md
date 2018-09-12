---
title:  vue组件文档-穿梭树
---
# vue组件文档-穿梭树

标签（空格分隔）： 未分类

---

# 事件

| name          | description              | params|
| ------------- |:------------------------|:---------------:|
|mounted|组件挂载完毕事件，可在此回调中渲染数据|无|

# 方法

| name          | description              | params|
| ------------- |:------------------------|:---------------:|
|getCheckedNodes|获取右侧筛选出的所有的节点|无|
|render|根据传入的数据渲染左右侧树组件|数据数组，仅接受嵌套结构数据，和treeTrid,smarterTree等组件一致|



# props

```javascript

enableCheckedFolder:{//是否允许勾选有孩子的节点
                type:Boolean,
                default:true
            },
customProp:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据，对象类型，结构为key:value，value可以是function也可以是任意类型；若为function，内部this已被指向您的VM，仅有一个参数--节点数据；自定义的数据将放在节点数据对象里（比如你想根据某个条件设置节点disabled，可以设定这个然后指定disabledKey）
                default:function(){
                    return {}
                },
                type:Object
            },
expandAll:{//是否渲染时展开所有节点
                type:Boolean,
                default:false
            },
checkedAllChildsWhenParentChecked:{//若为false，勾选自己不会同步父子节点；若为true会同步父子节点状态
                type:Boolean,
                default:true
            },
filterMethod:{//如果启用过滤器，此方法可重写过滤规则
            type:Function,
            default:function(item,string){
                return item[this.prop].toLowerCase().trim().includes(string.toLowerCase().trim())
            }
        },
enableSourceTreeFilter: {//是否允许source tree的过滤器显示，注意仅仅enableSourceTreeFilter和enableTargetTreeFilter允许分别为source tree和target tree单独定义
                type: Boolean,
                default: true
            },
            enableTargetTreeFilter: {//是否允许target tree的过滤器显示，注意仅仅enableSourceTreeFilter和enableTargetTreeFilter允许分别为source tree和target tree单独定义
                type: Boolean,
                default: false
            },
            prop: {//树中显示的标签的使用的属性
                type: String
            },
            label: {//树的头部的标题，因tree内部使用el-table-column，故此处相当于只有一列的表格的表头文字
                type: String,
                default: 'label'
            },
            
            treeKey: {//树种每个节点的唯一标示
                type: String,
                default: 'id'
            },

            childKey: {//节点中标示孩子属性的key名
                type: String,
                default: 'children'
            },

            checkedKey: {//节点中标示节点是否选中的属性key名
                type: String,
                default: 'checked'
            },

```





