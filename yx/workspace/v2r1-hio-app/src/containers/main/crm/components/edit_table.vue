<template>
  <!--表格-->
        <el-table ref="myTable"
                :data="tableData"
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                style="width: 100%">
                    <el-table-column 
                            prop="opportunitName"
                            label="商机名称">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/business/details/' + scope.row.opportunityId ">{{ scope.row.opportunitName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column 
                            prop="personInChargeName"
                            label="负责人">
                    </el-table-column>
                    <el-table-column 
                            prop="customerName"
                            label="客户名称">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/customer/detail/' + scope.row.customerId +'?type='+scope.row.orderState">{{ scope.row.customerName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column 
                            prop="contcatName"
                            label="联系人">
                            <template slot-scope="scope">
                                <router-link class="apprave-detail-panel" :to="'/crm/business/detail/' + scope.row.contcatId +'?type='+scope.row.orderState">{{ scope.row.contcatName}}</router-link>
                            </template>
                    </el-table-column>
                    <el-table-column 
                            prop="phoneNumber"
                            label="手机号码">
                    </el-table-column>
                    <el-table-column 
                            prop="estimateAmount"
                            label="预计成交金额">
                    </el-table-column>
                    <el-table-column 
                            prop="lastFollowTime"
                            label="最后跟进">
                    </el-table-column>
                    <el-table-column 
                            prop="stage"
                            label="商机阶段" :formatter="formatterStage">
                    </el-table-column>
                    <el-table-column
                            prop="des"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="flowUpfn(scope.row,'modify')">跟进</el-button>
                            <el-button type="text" size="small" @click="editBusinessFn(scope.row,'modify')">编辑</el-button>
                            <el-button @click="delBusinessFn(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
</template>
<script>
    export default{
        components:{
        },
     
            
        computed:{
            
        },
        methods:{
            show(item){
                this.$emit("row-click",item)
            },
            handleSelectionChange(item){
                this.$emit("selection-change",item)
            }

        },
        data(){
            return {
                tableData:[]
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   
</style>