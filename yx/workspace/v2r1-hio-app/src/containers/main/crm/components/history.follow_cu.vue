<template>
    <div class="item">
        <div class="title">
            <h3>商机</h3>
            <span class="all">全部记录</span>
            <router-link to="/crm/allrecord"><span class="all">全部记录</span></router-link>
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
                        <span @click="showRecord(scope.$index)" style="color: #409EFF">查看记录</span>
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
                customer: 'XXXXXXX股份有限公司',
                contacts: '王小虎',
                relation: '采购决策人',
                telephone: '13711118888',
                lastContactTime: '2017-12-23 12:30:59'
            }, {
                customer: 'XXXXXXX股份有限公司',
                contacts: '王小虎',
                relation: '采购决策人',
                telephone: '13711118888',
                lastContactTime: '2017-12-23 12:30:59'
            }, {
                customer: 'XXXXXXX股份有限公司',
                contacts: '王小虎',
                relation: '采购决策人',
                telephone: '13711118888',
                lastContactTime: '2017-12-23 12:30:59'
            }, {
                customer: 'XXXXXXX股份有限公司',
                contacts: '王小虎',
                relation: '采购决策人',
                telephone: '13711118888',
                lastContactTime: '2017-12-23 12:30:59'
            },{
                customer: 'XXXXXXX股份有限公司',
                contacts: '王小虎',
                relation: '采购决策人',
                telephone: '13711118888',
                lastContactTime: '2017-12-23 12:30:59'
            }]

        };
    },
    methods: {
        showRecord (id){
            this.$emit("showRecordDia",id);
            console.log(id)
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
