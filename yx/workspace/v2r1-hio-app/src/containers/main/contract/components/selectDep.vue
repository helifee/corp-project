<template>
    <div class="select_dep">
        <!--选择部门-->
        <el-dialog :visible.sync="selectDepDialogVisible" append-to-body
                   custom-class="select_dep-dialog"  title="选择部门"
                   style="overflow-y: hidden"  width="40%" :before-close="selectDepClose" :close-on-click-modal="false">
            <el-tree style="height: 270px;overflow: auto;"  ref="selectDepTree"
                     show-checkbox @check="handleTreeCheck"  :check-strictly="true"
                     :data="orgTree"  node-key="nodeId" :expand-on-click-node="false"
                     :props="treeProps" :default-expanded-keys="treeExpandedKeys">
                 <span class="custom-tree-node" slot-scope="{ node, data }"  :title="data.name">
                    <span>{{ data.name}}</span>
                  </span>
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
            },
            displayAllDep:{        //显示公司的全部部门还是只显示当前人所在的部门
                type:Boolean,
                default:true
            },
            userId:{                //displayAllDep为false时根据userId去过滤
                default:""
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
            arrangeDepTreeData(data){
                data.forEach(item=>{
                    item.disabled=!item.canSelected;
                    if(item.children){
                        this.arrangeDepTreeData(item.children);
                    }
                })
            },
            async getOrgTreeListData(){
                let url=JZY.xhr.transformUrl('/sys/organization/queryTree','GLOBAL',true);
                let pas={};
                if(!this.displayAllDep){
                    url=JZY.xhr.transformUrl('/sys/organization/queryOrganizationTreeBySelf ','GLOBAL',true);
                    if(this.userId!=""){
                        pas.sid=this.userId;
                    }
                }
                await JZY.xhr.post(url,pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("queryTree:"+JSON.stringify(resultData))
                    try{
                        this.orgTree=resultData;
                        if(!this.displayAllDep){
                            this.arrangeDepTreeData(this.orgTree);
                        }
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

<style lang="scss">
    .select_dep-dialog{
        .custom-tree-node{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>