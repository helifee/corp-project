<template>
    <div class="select_dept dept_tree approve">
        <dept-tree
            ref="transferTree"
            tree-key="permissionId"
            :enable-checked-folder="true"
            :advancedRelevanceStrategy="advancedRelevanceStrategy"
            child-key="childFuncs"
            @mounted="$refs.transferTree.render(deptData);"
            @selectedDept="selectedDept"
            checked-key="state"
            :expand-all="true"
            :auto-expand-checked-nodes="true"
            :checked-all-childs-when-parent-checked="false"
            prop="resourceName"
            leftHeight="300px"
            rightHeight="300px"
            :customProp = "customProp"
            label="">
        </dept-tree>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import deptData from './deptData.js'//tree原始数据
    import mockData from '@MockData'

    export default{
        components: {
        },
        data(){
            let _self = this;
            console.info("this.selectedDeptsToTree")
            console.info(this.selectedDeptsToTree)
            return {
                advancedRelevanceStrategy:{//高级关联策略色设置
                    onChecked:{
                        syncParents:false,//选中时同步父
                        syncChilds:false,//选中时同步子
                    },
                    onCancelChecked:{
                        syncParents:true,//取消选中时同步父
                        syncChilds:true,//取消选中时同步子
                    }
                },
                customProp:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    isCheckedNode(node){//根据调用组件时，已选择的人员，渲染tree
                        console.log('custom prop thwis:',node.id,this,node)
                        console.info("存在已选择的人员")

                        if (_self.selectedDeptsToTree.find((item, index, arr) =>{
                                return item.id === node.id
                            }
                        )) {
                            return node.state=true
                        }else{
                            return node.state=false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        // return node.$extra.hasChildren === true
                    }
                      
                },
                deptData:deptData.result.PC,//初始化原始数据
            }
        },
        props:['selectedDeptsToTree'],
        methods:{
            selectedDept:function(obj){
                this.selectedDepts = JSON.stringify(obj)
                this.$emit('deptFromTreeFunc',this.selectedDepts)
            },
            
        },
        mounted(){
        },
        watch:{
            "selectedDeptsToTree":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.$refs.transferTree.render(this.deptData);
                },
                deep:true
            }
        }
    }
</script>