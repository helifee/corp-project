<template>
    <div class="select_dep">
        <!--选择部门-->
        <el-dialog :visible.sync="selectDepDialogVisible" append-to-body
                   style="overflow-y: hidden"  width="40%" :before-close="selectDepClose" :close-on-click-modal="false">
            <el-tree style="height: 270px;overflow: auto;"  ref="selectDepTree"
                     show-checkbox @check="handleTreeCheck"  :check-strictly="true"
                     :data="orgTree"  node-key="nodeId" :expand-on-click-node="false"
                     :props="treeProps" :default-expanded-keys="treeExpandedKeys">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="medium" @click="selectDepSure">确 定</el-button>
                        <el-button  size="medium" @click="selectDepClose">取 消</el-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "select-dep",
        data(){
            return{
                // selectDepDialogVisible:
                orgTree:[],
                treeProps:{
                    label:"name",
                    children:"children"
                },
                treeExpandedKeys:[],
                curNodeData:""
            }
        },
        props:{
            selectDepDialogVisible:{
                required:true,
                type:Boolean
            }
        },
        mounted(){
            this.getOrgTreeListData();
        },
        methods:{
            selectDepClose(){
                this.$emit('update:selectDepDialogVisible', false);
            },
            handleTreeCheck(data,node){
                this.curNodeData=data;
                this.$refs.selectDepTree.setCheckedKeys([]);
                this.$refs.selectDepTree.setCheckedKeys([data.nodeId]);
            },
            selectDepSure(){
                this.$emit('getSelectDep',this.curNodeData);
                this.$emit('update:selectDepDialogVisible', false);
            },
            async getOrgTreeListData(){
                let url=JZY.xhr.transformUrl('/sys/organization/queryTree','GLOBAL',true);
                await JZY.xhr.post(url,{},{alertSuccess:false}).then((resultData)=>{
                    // console.log("queryTree:"+JSON.stringify(resultData))
                    try{
                        this.orgTree=resultData;
                        this.treeExpandedKeys=[];
                        resultData.forEach(item=>{
                            this.treeExpandedKeys.push(item.nodeId)
                        })
                    }catch (e){
                        this.$message("selectDep.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
        }
    }
</script>

<style scoped>

</style>