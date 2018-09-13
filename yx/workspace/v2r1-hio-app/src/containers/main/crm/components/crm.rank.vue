<template>
    <div id="rankDiv">
        <p class="title"><i class="icon" style="width:16px; height:14px; margin-left:14px;"><img style="width:16px; height:14px; vertical-align:middle;" src="../images/jiangbei@2x.png"></i>销售排行榜</p>
        <el-table
            :data="tableData3"
            style="width: 100%;text-align:center;font-size: 12px;"
            :row-style="{'padding-left':'16px','padding-right':'16px'}"
            :cell-style="{'text-align':'center','border-bottom':'1px solid rgba(240,90,90,0.05)', 'font-family': 'MicrosoftYaHei','font-size': '12px','color': '#505050','letter-spacing': 0}"
            :header-cell-style="{'text-align':'center', 'border-bottom':'1px solid rgba(240,90,90,0.05)','height':'40px','background':'#fff','padding':'0px','font-family': 'MicrosoftYaHei','font-size': '12px','color': '#F35959','letter-spacing': 0}">
            <el-table-column
                fixed
                prop="salesmanName"
                label="销售员"
                width="120">
            </el-table-column>
            <!-- <el-table-column
                prop="newCustomerCount"
                label="本月新客户"
                width="90">
            </el-table-column> -->
            <el-table-column
                prop="newOrderCount"
                label="本月新单"
                >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {salesList} from '@Main/crm/getData'
  export default {
    data() {
      return {
          tableData3: []
      };
    },
    methods: {
        //销售榜单
        async salesListData(){
            let res = await salesList()
            console.info('销售榜单数据',res[0])
            this.tableData3=res[0];
        },
    },
    created (){
        this.salesListData();
    },

  }
</script>
<style lang="scss" >
    #rankDiv{
        height: calc(100% - 82px);
        margin-bottom: 70px;
       .el-table--scrollable-x .el-table__body-wrapper{overflow-x: hidden;}
    }
</style>
<style lang="scss" scoped>
    .title{
        height: 40px;
        text-align:center;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #F05A5A;
        letter-spacing: 0;
        line-height: 40px;
        margin-top:0px;
        margin-bottom:0px;
        background: rgba(240,90,90,0.05);
        i{
            color: #409EFF;
            margin-right: 12px;
            font-size: 18px;
        }
    }
</style>
