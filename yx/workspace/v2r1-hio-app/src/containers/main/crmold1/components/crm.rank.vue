<template>
    <div>
        <p class="title"><i class="icon el-icon-menu"></i>销售排行榜</p>
        <el-table
            :data="tableData3"
            style="width: 100%;text-align: center;font-size: 12px"
            :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'8px 0px'}">
            <el-table-column
                fixed
                prop="salePerson"
                label="销售员"
                width="85">
            </el-table-column>
            <el-table-column
                prop="newCustomer"
                label="本月新客户"
                width="90">
            </el-table-column>
            <el-table-column
                prop="newBill"
                label="本月新单"
                width="80">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          tableData3: [{
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }, {
              salePerson: '王小虎',
              newCustomer: '12',
              newBill: '4'
          }]
      };
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss" scoped>
    .title{
        line-height: 48px;
        padding-left: 22px;
        font-size: 16px;
        i{
            color: #409EFF;
            margin-right: 12px;
            font-size: 18px;
        }
    }
</style>
