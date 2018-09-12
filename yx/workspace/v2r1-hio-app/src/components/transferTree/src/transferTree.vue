<template>
    <el-row class="transfer-tree">
        <el-col :span="10">

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
                :enable-checked-multiple="true"
                :auto-expand-checked-nodes="autoExpandCheckedNodes"
                :enable-check="true"
            >

            </smarter-tree>
        </el-col>
        <el-col :span="4">
            <div class="el-transfer__buttons">
                <button @click="updateFromTreeGrid()" type="button" class="el-button el-button--primary el-button--small"><!----><!----><span><i
                    class="el-icon-arrow-left"></i><span></span></span></button>

                <button @click="updateToTreeGrid()" type="button" class="el-button el-button--primary el-button--small">
                    <!----><!----><span><span></span><i
                    class="el-icon-arrow-right"></i></span></button>
            </div>
        </el-col>
        <el-col :span="10">
            <smarter-tree
                :enable-filter="enableTargetTreeFilter"
                :enable-path="false"
                ref="toTreeGrid"
                :custom-prop="customProp"
                :expand-all="expandAll"
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
                :enable-checked-multiple="true"
                :auto-expand-checked-nodes="autoExpandCheckedNodes"
                :enable-check="true"
            >

            </smarter-tree>
        </el-col>
    </el-row>
</template>
<style lang="scss">
.transfer-tree{

    .el-transfer__buttons{
        display:block;
        margin-top:100px;
    }
}
</style>
<script>
    import treeProp from '../../treeGrid/src/treeProps'

    import util from '../../util'
    // import xhrManager from '../../xhrWrapper'
    // import xhrSetting from '../../xhrSetting'
    //
    // import Vue from 'vue'
    //
    //
    // let getUrl = (url) => {
    //     return xhrSetting.HOST.SITE_CHOOSER + url
    // }



    export default {
        computed: {},
        // components: {smarterInputSelect},
        name: 'transfer-tree',
        methods: {
            tryUpdateVirtualTreeMethod(){
                try{
                    this.updateVirtualTreeMethod()
                }catch(e){
                    util.warningMsg('亲爱的请不要惊慌出现这个错误原因在于你配置的updateVirtualTreeMethod方法（此方法用于调试虚拟树，与你无关）调用报错，删除它即可。错误信息为:'+e.message)
                }
            },
            updateFromTreeGrid(){
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


                util.clog('shouldSyncParentStatusNodes--:',shouldSyncParentStatusNodes)



                util.clog('allCheckedNodesIds---:',allCheckedNodesIds)

                toTreeGridRealData.forEach((item)=>{
                    item.$extra.indeterminate=false
                })

                if(allCheckedNodesIds.length==0){
                    return false
                }
                this.$refs.toTreeGrid.deleteRowsByIds(allCheckedNodesIds)
                this.$refs.toTreeGrid.getRealData().forEach((item)=>{
                    item.$extra.indeterminate=false
                    item[this.checkedKey]=false
                })

                this.$refs.fromTreeGrid.memoryTree.forEach((item)=>{
                    if(allCheckedNodesIds.includes(item[this.treeKey])){
                        item[this.checkedKey]=false
                        item.$extra.disabled=false

                    }
                })
                let fromRealData=this.$refs.fromTreeGrid.getRealData()
                fromRealData.forEach((item)=>{
                    if(allCheckedNodesIds.includes(item[this.treeKey])){
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
//            handleLabelClick(row) {
//                this.$emit('labelClick', row)
//            }
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

            // advancedRelevanceStrategy:{
            //     default:function(){
            //         return {
            //             onChecked:{
            //                 syncParents:true,
            //                 syncChilds:true,
            //             },
            //             onCancelChecked:{
            //                 syncParents:true,
            //                 syncChilds:true,
            //             }
            //         }
            //     },
            //     type:Object
            // },
            // autoExpandCheckedNodes:{
            //   default:true,
            //   type:Boolean
            // },
            // customProp:{
            //     default:function(){
            //         return {}
            //     },
            //     type:Object
            // },
            // expandAll:{
            //     type:Boolean,
            //     default:false
            // },
            // checkedAllChildsWhenParentChecked:{
            //     type:Boolean,
            //     default:true
            // },
            //
            // prop: {
            //     type: String
            // },
            // label: {
            //     type: String,
            //     default: 'label'
            // },
            // updateVirtualTreeMethod: {
            //     type: Function,
            //     default: function () {
            //
            //     }
            // },
            // isVirtualTree: {
            //     type: Boolean,
            //     default: false
            // },
            // treeKey: {
            //     type: String,
            //     default: 'id'
            // },
            //
            // childKey: {
            //     type: String,
            //     default: 'children'
            // },
            //
            // checkedKey: {
            //     type: String,
            //     default: 'checked'
            // },



        },
        beforeCreate() {

        },
        data() {

            return {
                util: util,
            }
        },

        mounted() {

            this.$emit('mounted')


        },

    }
</script>
