---
title:  tree table和smarter-tree
---
# tree table和smarter-tree文档




# 重要声明:如果出现tree那一列宽度不足的情况请手动配置组件的width属性为一个比较大的值；后期支持自动计算最大值

# ！！！本组件基于el-table和el-table-column组件开发，tree grid组件需要在外层套上el-table；smarter-tree不需要

# 在阅读本文档之前

为了快速迭代，该组件时在element-ui的el-table组件基础上开发的，所以引用时组件需要嵌套在el-table下并声明好:data属性在el-table标签上(注意你的data数据必须是嵌套结构的，比如下面酱紫的：)

```js
export default [
    {
        id:1,
        label:'components',

        children:[{
            label:'tree table组件',
            url:'/treeGrid',
            id:11
        },
            {
                label:'更聪明的tree-尽量满足你所有幻想',
                url:'/smarterTree',
                id:12
            }
        ]
    },
    {
        id:2,
        label:'directive',

        children:[{
            label:'光标路径',
            url:'/keyboardControl',
            id:21
        },
            {
                label:'文本域字数限制',
                url:'/textareaLimiter',
                id:22
            }
        ]
    },
    {
        id:3,
        label:'其他技术杂项',

        children:[{
            label:'蜂网基础util',
            url:'/util',
            id:31
        }]
    },
    {
        id:4,
        label:'各种非技术文档',

        children:[{
            label:'紧急组件估期',
            url:'/componentsOfferDate',
            id:41
        },{
            url:'/howToUseComponent',
            id:42,
            label:'如何使用组件'
        }]
    },
    {
        id:5,
        label:'开发者效率提升工具/插件',

        children:[{
            label:'view model数据查看器',
            url:'/vmDataViewer',
            id:51
        }]
    }
]

```


# 属性含义描述（模板中属性要以中划线隔开你们懂的）

| name      | description          | 
| ------------- |:------------------------|
|advancedRelevanceStrategy|高级同步策略，若启用此项目请取消配置checkedAllChildsWhenParentChecked或者配置checkedAllChildsWhenParentChecked为true，若为false则此项目失效|
|customProp|在树组件递归的过程中可以动态添加一些自定义属性,详见默认参数说明|
|重要说明|你可能很奇怪实例化组件没有在标签上写数据啊，对的就是酱紫，传递数据并渲染使用的是refreshTreeTable方法|
|showArraw|是否显示节点前面的展开/合拢的箭头|
|disabled-deepth|数组类型，例如[1]表示所有节点深度为1的禁止勾选|
|enable-filter|是否开启过滤（仅smarter-tree有，tree-grid没有；默认true）|
|enable-path|开启过滤的情况下是否在过滤input框下方显示路径并高亮显示路径包含字符（仅smarter-tree有，tree-grid没有；默认true）|
|filterMethod|自定义过滤方法，一般不需要配置；参数1：tree中每条数据，参数2：搜索的字符串|
| prop      | 树中显示的文字  | 
| checked-key      | 表示当前节点是否被选中  | 
| enable-checked-folder      | 是否允许勾选有孩子的节点  | 
    | width      | tree列的宽度  |  
| label     | 表头显示文字(如果tree和table结合着用可配置此项)  |     
| tree-key   | 树节点唯一标识|  
| child-key  | 嵌套结构中标识子节点的key  |  
| checked-all-childs-when-parent-checked | 勾选某一个节点是否同步父节点，子节点勾选状态 
| auto-expand-checked-nodes  | 加载时是否自动展开选中节点  |
| enable-check | 是否允许使用checkbox或者radio控制节点选中与否  |
|enable-checked-multiple|是否允许选中多条，false则展示单选框，true多选框|
|filter-method|过滤方法，用于对表格数据过滤，需开启enable-filter；参数1：item;参数2：搜索的字符串|
|enable-filter|是否开启过滤，默认false|
|expand-all|是否展开全部节点,默认false|


    
    
# 属性默认值和类型

    ```javascript
    {
    //高级关联策略,
    advancedRelevanceStrategy:{
                default:function(){
                    return {
                        onChecked:{
                        //节点被选中时是否同步父亲们
                            syncParents:true,
                            //节点被选中时是否同步子孙
                            syncChilds:true,
                        },
                        onCancelChecked:{
                        //节点被取消选中时是否同步父亲
                            syncParents:true,
                            //节点被取消选中时是否同步子孙们
                            syncChilds:true,
                        }
                    }
                },
                type:Object
            },
    //是否显示箭头
    showArraw:{
                default:true,
                type:Boolean
            },
            /*
            customProp:{
                  iDisabled(node){
                      console.log('custom prop this:',this,node)
                      return node.$extra.deepth>1
                  }
                },
            */
            
            
    customProp:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据，对象类型，结构为key:value，value可以是function也可以是任意类型；若为function，内部this已被指向您的VM，仅有一个参数--节点数据；自定义的数据将放在节点数据对象里（比如你想根据某个条件设置节点disabled，可以设定这个然后指定disabledKey）
                default:function(){
                    return {}
                },
                type:Object
            },
    disabledDeepth:{
              type:Array,
              default:function(){
                  return []
              }
            },
            enableCheckedFolder:{
              type:Boolean,
              default:true
            },
            updateVirtualTreeMethod:{
              type:Function,
              default:function(){

              }
            },
            isVirtualTree:{
                type:Boolean,
                default:false
            },

            autoExpandCheckedNodes:{
              type:Boolean,
              default:true
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            },
            enableCheck:{
              type:Boolean,
              default:false
            },

            checkedAllChildsWhenParentChecked:{
              type:Boolean,
              default:true
            },
            checkedKey:{
              type:String,
              default:'checked'
            },
            prop:{
                type:String
            },
            label:{
                type:String,
                default:'label'
            },
            width:{
                type:String,
                default:'200'
            },
            treeKey:{
                type:String,
                default:'id'
            },

            childKey:{
                type:String,
                default:'children'
            },
            fileIcon:{
                type:String,
                default:'el-icon-file'
            },
            folderIcon:{
                type:String,
                default:'el-icon-folder'
            },
            // remote:{
            //     type:Function,
            //     default:null
            // }
        }
    ```
    
    

# 事件

| name      | description          | 参数      |
| ------------- |:------------------------|:---------------:|
|radioClick|单选模式单选框点击事件（注意是点击不是change）|参数1：row对象|
|checkboxClick|多选模式多选框点击事件（注意是点击不是change）|参数1：row对象|
| labelClick      | 点击标签时触发（仅标签）  |      type:`String`, <br>value:`表格中scope.row`       |
| mounted      | tree组件挂载完毕触发(酱紫写更高效：@mounted="$refs.menuTree.refreshTreeTable(menus)")  |      type:`String`, <br>value:`表格中scope.row`       |
    
# 有用的方法

| name      | description          | values      |
| ------------- |:------------------------|:---------------:|
|clearCheckedNodes|清空当前选中的节点|木有参数|
|deleteRowsByIds|根据id数据集合删除对应的数据|参数1：数组：ids|
|changeSelectedRadio|在单选模式下传入一个id，更改选中节点为该id所对应的数据|参数1：id|
| getCheckedNodes      | 获取所有选中的节点  |    参数1：布尔类型：表示是否包含父节点,true为包含;每个节点内拥有$extra对象;参数2：function类型，参数为每一个选中节点对象，可在此方法内返回对象的某些信息，将作为getCheckedNodes方法返回的数组的元素    |
| expandAllNodes      | 展开所有节点  |    no    |
| getAllNodes      | 获取所有节点(包括未选中)  |        |
|updateRows|更新行数据|参数1：数组：所有需要更新行数据；参数2：数组，每条待更新数据要更新的属性|
|getParentNode|根据子节点获取父节点|参数：子节点数据|
|refreshTreeTable|传入数据刷新整个tree；直接改表格中数据请调用updateRows方法|参数1：数据，可以是嵌套结构也可以是平行结构；参数2：布尔值，true表示平行结构，false表示嵌套结构|
|getFirstSiblingNode|根据当前节点索引获取它的第一个兄弟节点|当前节点索引|
|getChildsByParentId|根据节点id获取下属所有亲儿子（注意不包括孙子）|pid|
|getNodesByTreeKeys|获取唯一id在参数中指定的节点|参数1：数组：id集合|
|toggleExpandChildsByIndex|根据行索引展开/合拢当前节点|参数1：当前行索引|
    |filterRows|传入一个function(参数为row)返回true则该row连同它的所有子孙row都会出现在table中;默认获取的是节点实体数据，可通过传入第2个参数GET_TYPE='INDEX'获取到数据索引|参数1：function类型|
|getAllParentNodes|根据当前row和index获取所有祖先节点;默认获取的是节点实体数据，可通过传入第三个参数GET_TYPE='INDEX'获取到数据索引|row,index,GET_TYPE|
|insertChildRows|插入儿子节点:注意插入孩子节点始终会插入到孩子的最前面；如果想插入某个孩子的后面请使用insertSiblingRows|index：索引：比如第四行就传3,rows|
|insertSiblingRows|插入兄弟节点：始终插入到这个兄弟的后面|index,rows|


# 插槽
```javascript
//插槽位置位于树节点label右侧位置,scope中row属性为当前行节点
```

```html
 <template slot-scope="scope">
                                {{scope.row.id}}
                            </template>
```
    
    
    
# $extra对象属性列表

| name      | description          | 类型（n=Number,b=Boolean,s=String）      |
| ------------- |:------------------------|:---------------:|
| childsNum      | 有几个孩子  |   n   |
    | parentId      | 它爸的id(treeKey)  |  |
        | hasChildren      | 有木有小孩儿  |  b|
            | expanded      | 是否展开  |    b  |
                | deepth      | 节点深度  |  n(1是顶级节点，越是孩子n越大)|
                | indeterminate      | 如果一个爹下面所有亲儿子既不是都选中也不是一个都没选中那么就是true;否则是false  |  b|
| childTreeKeys      | 所有儿子的id（数组类型）  |  |
| path      | 路径  | 类似爷爷->父亲->儿子的字符串 |