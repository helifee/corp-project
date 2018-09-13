<template>
    <div></div>
</template>
<script>
    export default  {
        props:{
            rowClassName:{
              type:Function,
                default:function(){
                    return ''
                }
            },
            //是否允许动态改变 父节点勾选时是否够选子节点（包含关系）
//            enableChangeCheckedAllChildsWhenParentChecked:{
//                default:false,
//                type:Boolean
//            },
            //初始化渲染时（调用refreshTreeTable方法）如果父节点为true，是否将所有子节点都变为true
//            checkedChildIfParentCheckedWhenInit:{
//              default:true,
//              type:Boolean
//            },
            //初始化渲染时需要计算父节点的半选中状态时，如果子节点是true，父节点全部都未选中，父节点选中状态是否保留

//            strategy
            advancedRelevanceStrategy:{
                default:function(){
                    return {
                        onChecked:{
                            syncParents:true,
                            syncChilds:true,
                        },
                        onCancelChecked:{
                            syncParents:true,
                            syncChilds:true,
                        }
                    }
                },
                type:Object
            },

            showArraw:{
                default:true,
                type:Boolean
            },
            customProp:{
                default:function(){
                    return {
                        // state:true
                    }
                },
                type:Object
            },
            disabledKey:{
                type:String,
                default:'disabled'
            },
            disabledDeepth:{
                type:Array,
                default:function(){
                    return []
                }
            },
            // autoRender:{
            //     type:Boolean,
            //     default:false
            // },
            expandAll:{
                type:Boolean,
                default:false
            },
            filterMethod:{
                type:Function,
                default:function(item,string){
                    return item[this.prop].toLowerCase().trim().includes(string.toLowerCase().trim())
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

            //true表示所有父子节点全同步，false表示全不同步
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
                default:''
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
            remote:{
                type:Function,
                default:null
            },
            isInside:{//内部，外部
                type:String,
                default:'inside'
            },
            showInsideOutsideTabs:{//显示内、外部，false:只显示‘人员’，其他逻辑无差异
                type:Boolean,
                default:true

            },
            showOverflowTooltip:{   //内容过多时是否显示...鼠标放上去显示全部
                type:Boolean,
                default:false
            },
            treeLableCursor:{       //鼠标在结点上鼠标的cursor控制
                type:String,
                default:'pointer'
            }
        }
    }
</script>