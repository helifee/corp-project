<template>
    <div class="participants-wrap">
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
        <el-button type="primary" class="add-part" @click=""><i class="el-icon-plus"></i> 添加人员</el-button>
        <!--表格-->
        <el-table
                :data="participantsTableData"
                style="width: 100%;text-align: center"
                :header-cell-style="{'text-align':'center'}">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="company"
                    label="所属公司"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签">
            </el-table-column>
            <el-table-column
                    prop="joinTime"
                    label="加入时间">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型">
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
                searchForm:{
                    searchVal:''
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },



                //参与人员
                participantsTableData:[{
                    name:'张三',
                    company:'XXXXXX公司',
                    tag:'供应商',
                    joinTime:'2016-05-04 15:23:34',
                    type:'负责人'
                },{
                    name:'李四',
                    company:'XXXXXX公司',
                    tag:'合作伙伴',
                    joinTime:'2016-05-04 15:23:34',
                    type:'参与人'
                },{
                    name:'王五',
                    company:'XXXXXX公司',
                    tag:'渠道商',
                    joinTime:'2016-05-04 15:23:34',
                    type:'参与人'
                },{
                    name:'赵六',
                    company:'XXXXXX公司',
                    tag:'其他',
                    joinTime:'2016-05-04 15:23:34',
                    type:'参与人'
                },],



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
    /*参与人员*/
    .participants-wrap{
        position: relative;
        .add-part {
            position: absolute;
            right: 20px;
            top:0px;
            padding: 8px 12px;
            border-radius: 0px;
        }
    }
</style>
