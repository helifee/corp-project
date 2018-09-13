<template>
    <div class="contractType">
        <div class="contractTitle">
            <div class="content-title">
                <span>合同类型</span>
                <el-button 　type="primary" class="add-news" size="small" @click="handlerCreateContractType">
                    <i class="el-icon-plus"></i> 创建类型
                </el-button>
            </div>
            <div class="searchForm">
                <el-form :inline="true"  ref="searchForm" size="small">
                    <el-form-item label="类型名称：">
                        <el-input v-model="searchName" placeholder="请输入类型名称" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="backSearchInfo">查询</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="bx_space"></div>
        <div class="tableContain" v-loading="loading">
            <el-table v-if="treeData.length>0" :data="treeData" border   ref="refContracTable"
                      :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)'}">

                <tree-grid

                            @mounted="$refs.refContractTree.refreshTreeTable(treeData)"
                            :advancedRelevanceStrategy="advancedRelevanceStrategyTest"
                            ref="refContractTree"
                            prop="contractType"
                            label="类型名称"
                            :expand-all="true"
                            tree-key="sid"
                            :checked-all-childs-when-parent-checked="true"
                            child-key="children"
                            :showOverflowTooltip="true"
                            treeLableCursor="default"
                    >
                    </tree-grid>





                <!--<el-table-column prop="menuRemark" label="编码"   min-width="50"></el-table-column>-->
                <!--<el-table-column prop="menuRemark" label="启用合同审批"   min-width="100"></el-table-column>-->
                <!--<el-table-column prop="menuRemark" label="启用合同审批"   min-width="50"></el-table-column>-->
                <!--<el-table-column prop="menuRemark" label="启用付款审批"   min-width="100"></el-table-column>-->
                <!--<el-table-column prop="menuRemark" label="启用付款审批"   min-width="50"></el-table-column>-->
                <el-table-column prop="remark" label="备注"  min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope" >
                        <i class="operation el-icon-edit-outline" @click="handleContractTypeEdit(scope.$index,scope.row)"></i>
                        <i v-if="scope.$index!=0" class="operation el-icon-delete" @click="handleContractTypeDel(scope.$index,scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--右侧弹窗创建/编辑合同类型-->
        <contractTypeEdit :dialogVisible="contractTypeDialogVisible" v-if="contractTypeDialogVisible" :treeNodeData="treeNodeData"
                       :contractType="contractType"  @refushTableFun="refushTableFun" @closeCreateModal="closeContractTypeDialog"></contractTypeEdit>
    </div>
</template>

<script>
    import testData from './localTestData'
    import contractTypeEdit from './contractTypeEdit'
    export default {
        name: "contract-type",
        components:{
            contractTypeEdit
        },
        data(){
            return{
                advancedRelevanceStrategyTest:{
                    onChecked:{
                        syncParents:true,
                        syncChilds:true,
                    },
                    onCancelChecked:{
                        syncParents:true,
                        syncChilds:true,
                    }
                },
                treeData:[],
                searchName:"",
                loading:false,
                contractTypeDialogVisible:false,
                contractType:"",
                treeNodeData:"",
            }
        },
        mounted(){
            // console.log(JSON.stringify(this.treeData))
            // this.$refs.refContractTree.refreshTreeTable(testData.roleData.roleTree);

            // this.$refs.refContractTree.refreshTreeTable(this.treeData);
            this.getContractTypeListData();
        },
        updated(){
            //会造成多次执行问题，但单独执行会造成树结点无法展开问题，有空时查原因解决树bug
            // console.log(JSON.stringify(this.treeData))
            // this.$refs.refContractTree.refreshTreeTable(this.treeData);
        },
        methods:{
            handlerCreateContractType(){
                this.contractType="";
                this.contractTypeDialogVisible=true;
            },
            handleContractTypeEdit(index,row){
                this.contractType=row.sid;
                // console.log(JSON.stringify(row))
                this.treeNodeData=row;
                this.contractTypeDialogVisible=true;
            },
            handleContractTypeDel(index,row){
                this.$confirm('此操作将删除当前合同类型信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delContractTypeData(row.sid);
                }).catch(() => {
                });
            },
            closeContractTypeDialog(){
              this.contractTypeDialogVisible=false;
            },
            backSearchInfo(){
                this.$refs.refContractTree.filterRows(this.searchName)
                // this.getContractTypeListData();
            },
            handleReset(){
                this.searchName="";
                this.backSearchInfo()
            },
            refushTableFun(){
                this.getContractTypeListData(()=>{

                    this.$refs.refContractTree.refreshTreeTable(this.treeData);
                });

            },
            async getContractTypeListData(cb){
                this.loading=true;
                let pas={contractType:this.searchName};
                await JZY.xhr.post('/contract/contractType/getContractTypeList',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getContractTypeListData:"+JSON.stringify(resultData[0]))
                    try{
                        this.treeData=[]

                        this.$nextTick(()=>{
                            this.treeData=resultData[0];
                        })

                        cb && cb()



                        // this.$refs.refContractTree.refreshTreeTable(this.treeData);

                        this.loading=false;
                    }catch (e){
                        this.loading=false;
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            // updateTreeNodeData(treeData,sid){
            //
            //     try{
            //         treeData.forEach((againItme,index)=>{
            //             if(againItme.sid==sid){
            //                 againItme.splice(index,1);
            //             }
            //             if(againItme.children){
            //                 this.updateTreeNodeData(againItme.children,sid);
            //             }
            //         })
            //     }catch (e){}
            // },
            async delContractTypeData(contractTypeId){
                this.loading=true;
                // await JZY.xhr.drop('/contract/contractType/delete/'+contractTypeId,{},{alertSuccess:true}).then((resultData)=>{
                await JZY.xhr.post('/contract/contractType/delete',{sid:contractTypeId},{alertSuccess:false}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.$refs.refContractTree.deleteRowsByIds([contractTypeId])
                        // this.getContractTypeListData();
                        // this.updateTreeNodeData(this.treeData,contractTypeId)
                        // this.treeData.forEach((item,index)=>{
                        //     if(item.sid==contractTypeId){
                        //         this.treeData.splice(index,1)
                        //     }
                        // })
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
.contractType{
    /*height: calc(100% - 12px);*/
    /*background:whitesmoke;*/
    .tableContain{
        .operation{
            color: #409EFF;
            cursor:pointer;
            margin-right: 5px;
            width: 20px;
            height: 20px;
        }
    }
    .bx_space{
        height: 20px;
        background: whitesmoke;
    }
    /*min-height: 500px;*/
    .contractTitle{
        background:#fff;
        padding-left: 18px;
        .content-title{
            position: relative;
            margin: 12px 0px;
            line-height: 32px;
            height: 48px;
            border-bottom: 1px solid #eeeeee;
            .add-news{
                position: absolute;
                right: 20px;
            }
        }
    }
}
</style>