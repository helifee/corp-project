<template>
    <div class="approval-wrap">
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 查询条件：" prop="searchVal">
                    <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
                <el-form-item>

                </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <el-button type="primary" class="add-approval" @click=""><i class="el-icon-plus"></i> 发起审批</el-button>
        <!--表格-->
        <el-table
                :data="approvalTableData"
                style="width: 100%;text-align: center"
                :header-cell-style="{'text-align':'center'}">
            <el-table-column
                    prop="theme"
                    label="审批主题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="documentType"
                    label="单据类型"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="currentApprover"
                    label="当前审批人">
            </el-table-column>
            <el-table-column
                    prop="launchTime"
                    label="发起时间">
            </el-table-column>
            <el-table-column
                    prop="lastTime"
                    label="最后时间">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

    export default {
        components: {

        },
        data() {
            return {

//审批
                approvalTableData:[{
                    theme:'办公用品领用申请',
                    documentType:'办公用品领用',
                    currentApprover:'王二',
                    launchTime:'2016-05-04 15:23:34',
                    lastTime:'2016-05-04 15:23:34'
                },{
                    theme:'办公用品领用申请',
                    documentType:'办公用品领用',
                    currentApprover:'王二',
                    launchTime:'2016-05-04 15:23:34',
                    lastTime:'2016-05-04 15:23:34'
                },{
                    theme:'办公用品领用申请',
                    documentType:'办公用品领用',
                    currentApprover:'王二',
                    launchTime:'2016-05-04 15:23:34',
                    lastTime:'2016-05-04 15:23:34'
                },{
                    theme:'办公用品领用申请',
                    documentType:'办公用品领用',
                    currentApprover:'王二',
                    launchTime:'2016-05-04 15:23:34',
                    lastTime:'2016-05-04 15:23:34'
                },],

                searchForm:{
                    searchVal:''
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        props: [],
        computed: {

        },
        filters:{
        },
        methods: {

            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },

        },
        watch: {
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    /*审批*/
    .approval-wrap{
        position: relative;
        .add-approval {
            position: absolute;
            right: 20px;
            top:0px;
            padding: 8px 12px;
            border-radius: 0px;
        }
    }
</style>
