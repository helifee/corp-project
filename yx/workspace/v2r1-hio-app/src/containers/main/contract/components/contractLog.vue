<template>
    <div>
        <!--右侧弹窗合同日志-->
        <right-slide-modal title="合同日志" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div>
                <div style="margin-bottom: 20px;">
                    <el-row>
                        <el-col :span="9">
                            <span>操作内容关键字:</span>
                            <el-input size="medium" v-model="logText" style="width: 150px;margin: 0 10px"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <span>操作人:</span>
                            <el-input size="medium" v-model="createPersonName" style="width: 100px;margin: 0 10px"></el-input>
                        </el-col>
                        <el-col :span="7">
                            <span>操作:</span>
                            <el-input size="medium" v-model="logTypeName" style="width:120px;margin: 0 10px"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="operateQuery()" size="medium ">查询</el-button>
                        </el-col>
                    </el-row>
                </div >
                <el-table :data="tableData"   size="medium" v-loading="loading">
                    <el-table-column prop="createPersonName" label="操作人" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="logTypeName" label="操作" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="logText" label="操作内容" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createDate" label="操作时间" width="160"></el-table-column>
                </el-table>
                <el-pagination v-if="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[10,20, 50,100]"
                        :page-size="pageCount"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="dataTotal"
                        style="margin-top: 40px;float: right">
                </el-pagination>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    export default {
        name: "contract-log",
        data(){
           return{
               logText:"",
               logTypeName:"",
               createPersonName:"",
               pageTotal:0,   //总页数
               pageNum:1,      //当前页数
               pageCount:10, //分页大小,每页多少条
               dataTotal:0,   //数据总条数
               loading:false,
               tableData:[],
               pagination:false,
           }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            contractId:{
                required:true
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        mounted(){
            this.getContractLogData();
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            operateQuery(){
                this.getContractLogData();
            },
            handleSizeChange(val) {
                this.pageCount=val;
                this.getContractLogData();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.getContractLogData();
            },
            async getContractLogData(){
                let pas={
                    contractId:this.contractId,
                    pageNum:this.pageNum,
                    pageCount:this.pageCount,
                    logTypeName:this.logTypeName,
                    createPersonName:this.createPersonName,
                    logText:this.logText,
                }
                await JZY.xhr.post('/contract/contractLog/page',pas,{alertSuccess:false}).then((resultData)=>{
                    try{
                        this.tableData=resultData[0].list;
                        this.pageTotal=resultData[0].pageTotal;
                        this.pageNum=resultData[0].pageNum;
                        this.dataTotal=resultData[0].total;
                        this.pagination=this.dataTotal==0?false:true;
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
        }
    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>