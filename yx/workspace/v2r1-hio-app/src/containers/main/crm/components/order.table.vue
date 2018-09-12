<template>
  <div class="order_wrap table_list">
      <el-table
        ref="multipleTable"
        :data="dataList"
        :default-sort = "{prop: 'updateDate', order: 'descending'}"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%"
        highlight-current-row>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" :label="l('{orderLocale.tableData.name}')" show-overflow-tooltip min-width="200">
            <template slot-scope="scope">
                <router-link class="apprave-detail-panel" :to="'/crm/order/detail/' + scope.row.id +'?type='+scope.row.orderState">{{ scope.row.name}}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="orderId" :label="l('{orderLocale.tableData.orderId}')" width="150"></el-table-column>
        <el-table-column prop="customer" :label="l('{orderLocale.tableData.customer}')" width="100"></el-table-column>
        <el-table-column prop="contactName" :label="l('{orderLocale.tableData.contactName}')" width="100"></el-table-column>
        <el-table-column prop="telephone" :label="l('{orderLocale.tableData.telephone}')" width="100"></el-table-column>
        <el-table-column prop="orderMoney" :label="l('{orderLocale.tableData.orderMoney}')" width="100"></el-table-column>
        <el-table-column prop="signDate" :label="l('{orderLocale.tableData.signDate}')" width="100"></el-table-column>
        <el-table-column prop="orderState" :label="l('{orderLocale.tableData.orderState}')" width="100"></el-table-column>
      </el-table>
    <!--分页-->
    <el-row class="row-bg page" justify="center">
        <el-col :span="12">
            <el-pagination
                :current-page="pageNum"
                :page-size="pageCount"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-col>
    </el-row>
  </div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  JZY.locale.add('orderLocale',require('@Main/crm/crm.locale'))
  import {concernApprove} from '@Main/approve/getData'

  let now = new Date;//获取当前时间

  let taskTableData = [{
      id:'001',
      name: '测试项222目名称',
      orderId:'B7777777',
      concerned:true,
      completed:true,
      shared:true,
      customer: '王小虎',
      orderMoney: 0,
      orderState:'3',
      telephone:'1',
      signDate:'2016-1-03 21:00:22',
      lastDate:'2018-07-03'
    }, {
      id:'002',
      name: '测试项目名称',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎2',
      orderMoney: 56,
      orderState:'2',
      telephone:'2',
      signDate:'2017-11-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'003',
      name: '上海市普陀区金沙江路 1518 弄',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎3',
      orderMoney: 100,
      orderState:'4',
      telephone:'1',
      signDate:'2018-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'004',
      name: '普陀区金沙江',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎4',
      orderMoney: 50,
      orderState:'3',
      telephone:'3',
      signDate:'2018-06-03 21:00:22',
      lastDate:'2018-09-03'
    }, {
      id:'005',
      name: '金沙江路',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎5',
      orderMoney: 40,
      orderState:'1',
      telephone:'1',
      signDate:'2017-06-03 21:00:22',
      lastDate:'2018-09-03'
    }, {
      id:'006',
      name: '普陀区',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎6',
      orderMoney: 70,
      orderState:'2',
      telephone:'1',
      signDate:'2016-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'007',
      name: '普陀区金沙',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎7',
      orderMoney: 2,
      orderState:'1',
      telephone:'1',
      signDate:'2016-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'008',
      name: '普陀区8金沙',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎7',
      orderMoney: 2,
      orderState:'1',
      telephone:'1',
      signDate:'2016-12-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'009',
      name: '9普陀区金沙',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎7',
      orderMoney: 2,
      orderState:'1',
      telephone:'1',
      signDate:'2016-06-13 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'010',
      name: '10普陀区金沙',
      orderId:'B7777777',
      concerned:false,
      completed:false,
      shared:false,
      customer: '王小虎7',
      orderMoney: 2,
      orderState:'1',
      telephone:'1',
      signDate:'2016-06-23 21:00:22',
      lastDate:'2016-09-03'
    }];

  export default {
    data() {
      return {
        dataList:taskTableData,
        pageTotal: this.data.pageTotal || 1,   //总页数
        pageNum: this.data.pageNum || 1,      //当前页数
        pageCount: this.data.pageCount || 10, //分页大小,每页多少条
        dataTotal: this.data.total || 1,   //数据总条数
        multipleSelection: []
      }
    },
    props:{
      data: {
        type: Object,
        required: function(){
            return {}
        }
      },
      fromPage: {
        type:String,
        default: 'approve',
        required: true
      },
      loading: {//加载动画
        type:Boolean,
        default: true
      }
    },
    computed: {
        
    },
    filters:{
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //处理table中已过期的时间，加红
        formateupdateDate: function (date) {
            let updateDate = new Date(date);//格式化到期时间
            if (now > updateDate) {
                return "color:red"
            } else{
                return ""
            }
        },
        //获取我发起的审批
        async setConcernApprove(index,row){
            let stateCode = 1
            if(row.isFollow === 1 || row.isFollow === true){
                row.isFollow = false
                stateCode = 2
            }else{
                row.isFollow = true
                stateCode = 1
            }
            let res = await concernApprove(row.id,stateCode)
            if (res[0] === 1) {//成功
                this.$message('修改成功')
            }else{
                this.$message('操作失败')
                row.isFollow = stateCode === 1 ? false : true
            }
            // console.info(res[0])
        },
        
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
    mounted(){

    },
  }
</script>

<style lang="scss">
.order_wrap.table_list{
    margin-top:20px;
    .el-table{
        thead{
            line-height: 30px;
            th{
                background-color: #fafaf9;
                font-size: 14px;
                color: #333;
                font-weight: bold;
            }
        }
        tbody{
            td{
                a{
                    color: #606266;
                    &:hover{
                        color:#45a7fe;
                    }
                }

            }
        }
    }
    .page {//页码
        height:30px;
        margin-top: 30px;
        margin-bottom: 30px;
        .el-col{
            float: right;
        }
    }
}
</style>