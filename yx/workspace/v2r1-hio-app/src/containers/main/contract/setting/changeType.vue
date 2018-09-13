<template>
    <div class="changeType">
        <div class="contractTitle">
            <div class="content-title">
                <span>变更类型</span>
                <el-button 　type="primary" class="add-news" size="small" @click="handlerCreateChangeType">
                    <i class="el-icon-plus"></i> 创建类型
                </el-button>
            </div>
            <!--查询条件-->
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
        <div class="tableContain">
            <el-table v-loading="loading" :data="typeData"  min-height="260"
                      :header-cell-style="{'color':'#333333','background-color': 'rgba(250, 250, 250, 1)'}" >
                <el-table-column label="类型名称" prop="contractChangeType" min-width="100" show-overflow-tooltip> </el-table-column>
                <el-table-column label="备注" prop="remark" min-width="150" show-overflow-tooltip> </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <i class="operation el-icon-edit-outline" @click="handleChangeTypeEdit(scope.$index,scope.row)"></i>
                        <i class="operation el-icon-delete" @click="handleChangeTypeDel(scope.$index,scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--右侧弹窗创建/编辑合同变更类型-->
        <changeTypeEdit :dialogVisible="changeTypeDialogVisible" v-if="changeTypeDialogVisible" @refushTableFun="refushTableFun"
                          :changeTypeData="tableRowData"  @closeCreateModal="closeChangeTypeDialog"></changeTypeEdit>
    </div>
</template>

<script>
    import changeTypeEdit from './changeTypeEdit'
    export default {
        name: "change-type",
        components:{
            changeTypeEdit
        },
        data(){
            return{
                loading:false,
                searchName:"",
                typeData:[],
                // typeData:[{
                //     contractChangeType:"合同价款变更",
                //     remark:"备注信息，邀请500个字"
                // },{
                //     contractChangeType:"合同价款变更",
                //     remark:"备注信息，邀请500个字"
                // }],
                changeTypeDialogVisible:false,
                tableRowData:"",
            }
        },
        mounted(){
            this.getChangeTypeListData();
        },
        methods:{
            closeChangeTypeDialog(){
                this.changeTypeDialogVisible=false;
            },
            handlerCreateChangeType(){
                this.tableRowData="";
                this.changeTypeDialogVisible=true;
            },
            handleChangeTypeEdit(index,row){
                this.tableRowData=row;
                this.changeTypeDialogVisible=true;
            },
            backSearchInfo(){
                this.getChangeTypeListData();
            },
            handleReset(){
                this.searchName="";
            },
            handleChangeTypeDel(index,row){
                this.$confirm('此操作将删除当前合同变更类型信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delChangeTypeData(row.sid);
                }).catch(() => {
                });
            },
            refushTableFun(){
                this.getChangeTypeListData();
            },
            async getChangeTypeListData(){
                this.loading=true;
                let pas={contractChangeType:this.searchName};
                await JZY.xhr.post('/contract/contractChangeType/getContractChangeTypeList',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getContractTypeListData:"+JSON.stringify(resultData[0]))
                    try{
                        // this.treeData=resultData[0];
                        this.typeData=resultData[0];
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
            async delChangeTypeData(changeTypeId){
                this.loading=true;
                // await JZY.xhr.drop('/contract/contractType/delete/'+contractTypeId,{},{alertSuccess:true}).then((resultData)=>{
                await JZY.xhr.post('/contract/contractChangeType/delete',{sid:changeTypeId},{alertSuccess:false}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.typeData.forEach((item,index)=>{
                            if(item.sid==changeTypeId){
                                this.typeData.splice(index,1)
                            }
                        })
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
.changeType{
    /*border:1px solid rgba(121, 121, 121, 1);*/
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