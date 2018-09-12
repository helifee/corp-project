<template>
    <div class="select_user approve">
        <el-row :gutter="24" class="user-tree">
            <el-col :span="11">
                <div class="grid-content bg-purple">
                    <div class="left_content">
                        <div class="head_title">
                            <ul v-if="showInsideOutsideTabs">
                                <li :class="{active:isShowInsideData === 'inside'}" @click="isShowInsideData ='inside'">内部</li>
                                <li :class="{active:isShowInsideData === 'outside'}" @click="isShowInsideData ='outside'">外部</li>
                            </ul>
                            <ul v-else>
                                <li>人员</li>
                            </ul>
                        </div>
                        <div class="content">
                            <smarter-tree
                                :enable-filter="enableSourceTreeFilter"
                                :enable-path="false"
                                :expand-all="expandAll"
                                ref="fromTreeGrid"
                                :filter-method="filterMethod"
                                :custom-prop="customProp"
                                :advancedRelevanceStrategy="advancedRelevanceStrategy"

                                :tree-key="treeKey"
                                :child-key="childKey"
                                :checked-key="checkedKey"
                                :is-virtual-tree="isVirtualTree"
                                :prop="prop"
                                :label="label"
                                :update-virtual-tree-method="updateVirtualTreeMethod"

                                :enable-checked-folder="enableCheckedFolder"
                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-checked-multiple="enableCheckedMultiple"
                                :auto-expand-checked-nodes="autoExpandCheckedNodes"
                                :enable-check="true"

                                :isInside="isShowInsideData"
                                absoluteTop="-102px"
                                :maxHight="leftHeight"
                            >

                            </smarter-tree>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="transfer_buttons">
                    <el-button @click="updateFromTreeGrid()" type="primary">
                        <i class="el-icon-arrow-left"></i>
                    </el-button>

                    <el-button @click="updateToTreeGrid()" type="primary">
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="grid-content bg-purple-light">
                    <div class="right_content">
                        <div class="selected_title">
                            已选：(<span>{{selectedNode.length}}</span>)
                            <span class="clear_button" @click="clearSelectedUser">清空</span>
                        </div>
                        <div class="content">
                            <smarter-tree
                                :enable-filter="enableTargetTreeFilter"
                                :enable-path="false"
                                ref="toTreeGrid"
                                :custom-prop="customProp"
                                :expand-all="true"
                                :filter-method="filterMethod"
                                :advancedRelevanceStrategy="advancedRelevanceStrategy"

                                :tree-key="treeKey"
                                :child-key="childKey"
                                :checked-key="checkedKey"
                                :is-virtual-tree="isVirtualTree"
                                :prop="prop"
                                :label="label"

                                :enable-checked-folder="enableCheckedFolder"

                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-checked-multiple="enableCheckedMultiple"
                                :auto-expand-checked-nodes="autoExpandCheckedNodes"
                                :enable-check="true"
                                :isInside="isShowInsideData"
                                :maxHight="rightHeight"
                            >

                                <template slot-scope="scope">
                                    <slot :row="scope.row">

                                    </slot>
                                </template>
                            </smarter-tree>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- <el-button @click="getAllSelectedNodes">ww</el-button> -->
    </div>
</template>
<style scoped lang="scss">
$color:#303133;
$borderColor:#dcdfe6;
$backgroundColor:#e4e4e4;
$labelColor:#606266;
$blueColor:#45A7FE;

.select_user.approve{
  .left_content{
    margin-top: 49px;
    // overflow:scroll;
    .head_title{
        height: 35px;
        line-height:35px;
        border:1px solid $borderColor;
        ul{
            margin: 0;
            padding: 0;
            li{
                width:100px;
                float:left;
                text-align:center;
                border-right:1px solid $borderColor;
                background-color:#fff;
                color:$color;
                list-style: none;
                &.active{
                    background-color:$blueColor;
                    color: #fff;
                }
                &:hover{
                    cursor:pointer;
                }
            }
        }
        
    }
  }
    .content{
        padding:15px 0;
        border:1px solid $borderColor;
        border-top:none;
    }
  .right_content{
    .selected_title{
        height:38px;
        line-height:38px;
        border:1px solid $borderColor;
        background:#f6f5f4;
        text-indent:18px;
        .clear_button{
            float:right;
            cursor:pointer;
            margin-right:10px;
        }
    }
  }
  .transfer_buttons{
    width:22px;
    margin:100px auto;
    .el-button+.el-button{
        margin-left:0;
    }
    .el-button{
        padding:2px 3px;
        margin-bottom: 20px;
        
    }
  }
}
</style>
<script>
    import treeProp from '../../treeGrid/src/treeProps'

    import util from '../../util'
    export default {
        data() {

            return {
                util: util,
                isShowInsideData:this.isInside,
                selectedNode:[],
            }
        },
        props: {

            ...treeProp.props,

            filterMethod:{
                type:Function,
                default:function(item,string){
                    return item[this.prop].toLowerCase().trim().includes(string.toLowerCase().trim())
                }
            },
            enableSourceTreeFilter: {
                type: Boolean,
                default: true
            },
            enableTargetTreeFilter: {
                type: Boolean,
                default: false
            },
            leftHeight:{
                type: String,
                default: '350px'
            },
            rightHeight:{
                type: String,
                default: '400px'
            },
            enableCheckedMultiple:{
                type: Boolean,
                default: true
            },
            expandAll:{//是否加载后自动展开所有级
                type:Boolean,
                default:true
            }
        },
        computed: {},
        // components: {smarterInputSelect},
        name: 'user-tree',
        methods: {
            clearSelectedUser(){
                // this.$refs.deptUser.resetChecked();
                // this.$refs.toTreeGrid.resetChecked();//父组件调用子组件中的属性
                console.info("清空")
                this.updateFromTreeGrid('clearAll')
            },
            tryUpdateVirtualTreeMethod(){
                try{
                    this.updateVirtualTreeMethod()
                }catch(e){
                    util.warningMsg('亲爱的请不要惊慌出现这个错误原因在于你配置的updateVirtualTreeMethod方法（此方法用于调试虚拟树，与你无关）调用报错，删除它即可。错误信息为:'+e.message)
                }
            },
            updateFromTreeGrid(type = ''){
                let allCheckedNodesIds=[],
                    toTreeGridRealData=this.$refs.toTreeGrid.getRealData(),
                    toTreeGridMemoryCheckedNodes=this.$refs.toTreeGrid.getCheckedNodes(true,(item)=>{

                        if(!item.$extra.indeterminate){
                            allCheckedNodesIds.push(item[this.treeKey])
                        }
                        item.$extra.indeterminate=false
                        item[this.checkedKey]=false

                        return item
                    }),
                    shouldSyncParentStatusNodes=this.$refs.toTreeGrid.getShouldSyncParentStatusNodes(toTreeGridMemoryCheckedNodes)
//清空右侧树的全部节点
if (type === 'clearAll') {
    let res=[]
    toTreeGridRealData.forEach((item)=>{
        if(!item.$extra.indeterminate){
            allCheckedNodesIds.push(item[this.treeKey])
        }
        item.$extra.indeterminate=false
        item[this.checkedKey]=false

        res.push(item)
    })
    toTreeGridMemoryCheckedNodes = res

    
    this.selectedNode = []
}




                util.clog('shouldSyncParentStatusNodes--:',shouldSyncParentStatusNodes)



                util.clog('allCheckedNodesIds---:',allCheckedNodesIds)

                toTreeGridRealData.forEach((item)=>{
                    item.$extra.indeterminate=false
                })

                if(allCheckedNodesIds.length==0){
                    return false
                }
                // console.info("allCheckedNodesIds")
                // console.info(allCheckedNodesIds)
                this.$refs.toTreeGrid.deleteRowsByIds(allCheckedNodesIds)
                this.$refs.toTreeGrid.getRealData().forEach((item)=>{
                    item.$extra.indeterminate=false
                    item[this.checkedKey]=false
                })

                this.$refs.fromTreeGrid.memoryTree.forEach((item)=>{
                    if(allCheckedNodesIds.includes(item[this.treeKey])){
                        // console.info(this.$refs.fromTreeGrid)
                        //兼容radio模式
                        if (this.$refs.fromTreeGrid.hasOwnProperty('radioTreeKeyModel')) {
                            this.$refs.fromTreeGrid.changeSelectedRadio('');
                        }
                        item[this.checkedKey]=false
                        item.$extra.disabled=false

                    }
                })
                let fromRealData=this.$refs.fromTreeGrid.getRealData()
                fromRealData.forEach((item)=>{
                    if(allCheckedNodesIds.includes(item[this.treeKey])){
                        // console.info(this.$refs.fromTreeGrid)
                        // console.info("取消选择")
                        item[this.checkedKey]=false
                        item.$extra.disabled=false

                    }
                })


                shouldSyncParentStatusNodes.forEach((item)=>{
                    let rowIndex=fromRealData.findIndex((node)=>{
                        return node[this.treeKey]==item.row[this.treeKey]
                    })
                    util.clog('row index:',rowIndex)
                    if(rowIndex!=-1){
                        this.$refs.fromTreeGrid.handleTreeCheckboxClick(fromRealData[rowIndex],rowIndex)
                    }
                })

                this.getAllSelectedNodes();

                this.tryUpdateVirtualTreeMethod()
                util.clog('kcuf_u allCheckedNodes--:',allCheckedNodesIds)

            },
            updateToTreeGrid(){

                let allCheckedNodesIds=[],
                    copiedNodes=[],
                    allCheckedNodes=this.$refs.fromTreeGrid.getCheckedNodes(true,(row)=>{
                        copiedNodes.push(util.copyDataAndDeleteSomeProps(row,[this.childKey]))
                        allCheckedNodesIds.push(row[this.treeKey])
                        return row
                    })



                copiedNodes.forEach((item)=>{
                    item.$extra.disabled=false
                })
                this.$refs.toTreeGrid.refreshTreeTable(copiedNodes,false)

                allCheckedNodes.forEach((item)=>{
//                    if(allCheckedNodesIds.includes(item[this.treeKey])){
                        item.$extra.disabled=true
//                    }
                })

                this.$refs.fromTreeGrid.getRealData().forEach((item)=>{
                    if(allCheckedNodesIds.includes(item[this.treeKey])){
                        item.$extra.disabled=true
                    }

                })
                this.getAllSelectedNodes();

                this.$refs.toTreeGrid.clearCheckedNodes()

                this.tryUpdateVirtualTreeMethod()

            },
            getCheckedNodes(){

                let obj=this.$refs.toTreeGrid

                return obj.getAllNodes()
            },
            render() {
                util.clog('render args:', arguments)
                this.$refs.fromTreeGrid.refreshTreeTable.apply(this.$refs.fromTreeGrid, arguments)
               this.updateToTreeGrid()
//                try{
//
//                }catch(e){
//                    console.warn('updateToTreeGrid error:',e)
//                }

            },
            
            filterObjByKey:function(arr,key){
                // console.info()
                // let returnArr = []
                // for (var i = arr.length - 1; i >= 0; i--) {
                //     returnArr = arr.filter(function(item) {
                //         return arr[i][key] != item[key]

                //     });
                // }
            },
            //获取右侧已选择的部门对象
            getAllSelectedNodes:function(){
                // console.info(this.customProp)
                // console.info(this.rightHeight)
                let selectedNodes = this.getCheckedNodes()
                // console.log(util.uniqObjectInArray(selectedNodes,'sid'));
                //过滤对象数组中某一字段的值相同的对象
                this.selectedNode = [...util.uniqObjectInArray(selectedNodes,'sid')]
            }
//            handleLabelClick(row) {
//                this.$emit('labelClick', row)
//            }
        },
        beforeCreate() {

        },

        mounted() {
            this.$emit('mounted')

        },
        watch:{
            selectedNode:{
        　　　　handler(newValue, oldValue) {
                    // console.info(this.selectedNode)
                    //兼容radio模式
                    if (this.$refs.fromTreeGrid.hasOwnProperty('radioTreeKeyModel')) {
                        this.$refs.fromTreeGrid.changeSelectedRadio('');
                    }
                    this.$emit('selectedUser',this.selectedNode)
        　　　　},
        　　　　deep: true
        　　}
        }

    }
</script>
