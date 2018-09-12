<template>
    <div class="wrap">
        <div class="content-title">
            <h3>全部跟进记录</h3>
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
                    <el-form-item>
                        <el-button type="primary" @click="">查询</el-button>
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
                            width="80">
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
                            prop="content"
                            label="跟进内容"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <span @click="showRecordDialog(scope.$index, scope.row)" style="color: #409EFF">查看记录</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <dialog-follow-record  :dialogVisible="recordDialogVisible" :recordId="recordId" @closeCreateModal="closeRecordDialog"></dialog-follow-record>
    </div>

</template>

<script>
    import dialogFollowRecord from '@Main/crm/components/dialog.follow.record.vue'
    export default{
        components:{
            dialogFollowRecord
        },
        methods:{
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goback(){
                this.$router.back(-1);
            },
            showRecordDialog (id){
                this.recordId = id;
                this.recordDialogVisible = true;
            },
            closeRecordDialog (id){
                this.recordDialogVisible = false;
            },
        },
        data(){
            return {
                searchForm:{
                    name:'',
                    contacts:''
                },
                tableData: [{
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    content: '预计在本月30号进行采购工作，需要提前准备产品说明',
                    updateTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    content: '预计在本月30号进行采购工作，需要提前准备产品说明',
                    updateTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    content: '预计在本月30号进行采购工作，需要提前准备产品说明',
                    updateTime: '2017-12-23 12:30:59'
                }, {
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    content: '预计在本月30号进行采购工作，需要提前准备产品说明',
                    updateTime: '2017-12-23 12:30:59'
                },{
                    customer: 'XXXXXXX股份有限公司',
                    contacts: '王小虎',
                    relation: '采购决策人',
                    telephone: '13711118888',
                    content: '预计在本月30号进行采购工作，需要提前准备产品说明',
                    updateTime: '2017-12-23 12:30:59'
                }],

                recordId:'',
                recordDialogVisible:false
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
