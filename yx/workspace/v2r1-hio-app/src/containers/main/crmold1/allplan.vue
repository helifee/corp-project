<template>
    <div class="wrap">
        <div class="content-title">
            <h3>全部跟进计划</h3>
            <el-button type="primary" class="goback" @click="goback">返回</el-button>
        </div>
        <div class="content">
            <!--搜索-->
            <div class="search">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm"  ref="searchForm">
                    <el-form-item label="客户名称：" prop="name">
                        <el-input v-model="searchForm.name" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <el-input v-model="searchForm.contacts" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label="计划跟进时间：" prop="daterange">
                        <el-date-picker
                                v-model="searchForm.daterange"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--结果-->
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%;text-align: center;"
                        :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}">
                    <el-table-column
                            prop="customer"
                            label="客户名称"
                    >
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
                            prop="planContactTime"
                            label="计划跟进时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="lastContactTime"
                            label="上次跟进时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <span @click="handleEdit(scope.$index, scope.row)" style="color: #409EFF">查看记录</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>

<script>
    import crmRank from '@Main/crm/components/crm.rank.vue'
    import historyFollow from '@Main/crm/components/history.follow.vue'
    import todayPlan from '@Main/crm/components/today.plan.vue'
    export default{
        components:{
        },
        methods:{
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goback(){
                this.$router.back(-1);
            }
        },
        data(){
            return {
                searchForm:{
                    name:'',
                    contacts:'',
                    daterange:''
                },
                tableData: [{
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    planContactTime: '2017-12-23 12:30:59',
                    lastContactTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    planContactTime: '2017-12-23 12:30:59',
                    lastContactTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    planContactTime: '2017-12-23 12:30:59',
                    lastContactTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    planContactTime: '2017-12-23 12:30:59',
                    lastContactTime: '2017-12-23 12:30:59'
                },{
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    planContactTime: '2017-12-23 12:30:59',
                    lastContactTime: '2017-12-23 12:30:59'
                }]
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .content-title{
            position: relative;
            margin: 12px 0px;
            line-height: 32px;
            height: 48px;
            border-bottom: 1px solid #eeeeee;
            h3{
                padding-left: 18px;
            }
            .goback{
                position: absolute;
                right: 20px;
                top:0px;
                padding: 8px 12px;
                border-radius: 0px;
            }
        }
        .content{
            padding: 12px;
        }
    }

</style>
