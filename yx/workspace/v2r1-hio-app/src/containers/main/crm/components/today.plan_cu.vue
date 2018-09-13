<template>
    <div class="item">
        <div class="title">
            <h3>本日跟进计划</h3>
            <router-link to="/crm/allplan"><span class="all">全部计划</span></router-link>
            <el-table
                    :data="tableData"
                    style="width: 100%;text-align: center;"
                    :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'0px'}">
                <el-table-column
                        prop="customer"
                        label="客户名称"
                        width="260">
                </el-table-column>
                <el-table-column
                        prop="contacts"
                        label="联系人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="relation"
                        label="决策关系"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="telephone"
                        label="联系电话"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="lastContactTime"
                        label="上次联系时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="85">
                    <template slot-scope="scope">
                        <span @click="showRecord(scope.$index,scope.row.customer)" style="color: #409EFF; cursor: pointer;">跟进记录</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          tableData: [{
          customer: 'XXXXXXX股份有限公司111',
          contacts: '王小虎',
          relation: '采购决策人',
          telephone: '13711118888',
          lastContactTime: '2017-12-23 12:30:59'
      }, {
          customer: 'XXXXXXX股份有限公222',
          contacts: '王小虎',
          relation: '采购决策人',
          telephone: '13711118888',
          lastContactTime: '2017-12-23 12:30:59'
      }, {
          customer: 'XXXXXXX股份有限公司333',
          contacts: '王小虎',
          relation: '采购决策人',
          telephone: '13711118888',
          lastContactTime: '2017-12-23 12:30:59'
      }, {
          customer: 'XXXXXXX股份有限公司444',
          contacts: '王小虎',
          relation: '采购决策人',
          telephone: '13711118888',
          lastContactTime: '2017-12-23 12:30:59'
      },{
          customer: 'XXXXXXX股份有限公司555',
          contacts: '王小虎',
          relation: '采购决策人',
          telephone: '13711118888',
          lastContactTime: '2017-12-23 12:30:59'
      }]

      };
    },
    methods: {
        showRecord (id,title){
            this.$emit("showRecordDia",id,title);
        }
    }
  }
</script>

<style scoped lang="scss" scoped>
    .item{
        background: #ffffff;
        .title{
            position: relative;
            line-height: 48px;
            text-align: center;
            margin-bottom: 22px;
            h3{
                float: left;
                padding-left: 23px;
                font: 16px normal;
                line-height: 48px;
            }
            p{
                font-size: 14px;
                color: #888888;
            }
            span.all{
                position: absolute;
                right: 22px;
                top:0px;
                color: #409EFF;
            }
        }
    }
</style>
