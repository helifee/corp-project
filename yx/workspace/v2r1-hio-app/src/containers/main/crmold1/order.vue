<template>
    <div class="crm order_wrap">
        <!--页头-->
        <order-top-search
            :tabButtons="tabButtons"
            moduleName="order"
            @openCreateModal="createOrder"
            @changeOrderType="updataTableListByState"
            @changeSearch="updataTableListBySearch"
            ></order-top-search>
        <!--table表格-->
        <el-row :gutter="20" class="table">
            <order-table
                :data ="tableData"
                :loading = "tableLoading"
                @refleshTable = "getRefleshTableData"
                fromPage="order">
            </order-table>
        </el-row>
        <!--tabs对应的content内容-->
        <el-row :gutter="20" class="text_panel">
          <el-col :span="24">
            <div class="cc" v-if="orderType == null">null</div>
            <div v-if="orderType == 0">0</div>
            <div v-if="orderType == 1">1</div>
          </el-col>
        </el-row>
        <!--右侧弹窗-->
        <order-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible"></order-right-modal>
    </div>
</template>


<!-- <template>
    <div class="wrap">
        <div class="content-title">
            <h3>销售订单</h3>
            <ul class="operation">
                <li><el-checkbox>显示共享给我的</el-checkbox></li>
                <li><el-button @click="showAssignDialog">分配</el-button></li>
                <li>
                    <el-dropdown split-button type="primary" @click="">
                        <i class="el-icon-plus"></i> 创建订单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>

        </div>
    </div>
</template> -->

<script>
    import orderTopSearch from '@Main/crm/components/order.topSearch.vue'
    import orderRightModal from '@Main/crm/components/order.rightModal.vue'
    import orderTable from '@Main/crm/components/order.table.vue'


    import {approveListData} from '@Main/approve/getData'

    export default{
        components: {
            orderTopSearch,
            orderRightModal,
            orderTable
        },        
        data(){
            return {
                tabButtons:['all','signed','draft'],//页头显示的状态过滤标签
                orderType:null,//审批的状态，null全部
                tableLoading:false,//dataList加载动画开关
                tableData:{},//我发起的审批list
                dialogVisible:false,//右侧弹出窗开关
            }
        },
        methods:{
            //创建审批，打开右侧弹出窗
            createOrder(state) {
                this.dialogVisible = state
            },
            //根据审批类型state，过滤审批list
            updataTableListByState:function(obj) {
                let state = null;
                switch(obj.name){
                    case 'all':
                      state = null
                      break;
                    case 'signed':
                      state = 0
                      break;
                    case 'draft':
                      state = 1
                      break;
                    default:
                      state = null
                }
                this.orderType = state
                this.$message('筛选table表格中的数据')
                // this.getOrderTableData("",state)
            },
            //根据搜索框的值，过滤审批list
            updataTableListBySearch:function(obj) {
                let flowCategoryId = obj.flowCategory[obj.flowCategory.length -1]
                // this.getorderTableData(obj.topicName,this.orderType)
            },
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(from = ''){
              this.dialogVisible = false
              // from === 'reflashData' && this.getOrderTableData()
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //获取我发起的审批
            async getApproveTableData(topicName= "" ,state=null ,pageNum=1 ,pageCount=10){
                this.tableLoading=true;
                let res = await approveListData(topicName,state,pageNum,pageCount)
                console.info(res[0])
                this.tableData = res.length === 0 ? {} : JZY.u.deepExtend({},res[0])
                this.tableLoading=false;
            },
            //获取table数据list
            getRefleshTableData:function(){
                this.getApproveTableData(topicName= "" ,state=null ,pageNum=1 ,pageCount=10)
            }


        },
        computed:{

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.crm.order_wrap{
    padding: 10px;
    background-color: #fff;
    .table{
      background:whitesmoke;
      .el-table{
        margin-top:10px;
      }
    }
    .text_panel {
        height:100px;
        background-color: #cc0;
    }
}
</style>
