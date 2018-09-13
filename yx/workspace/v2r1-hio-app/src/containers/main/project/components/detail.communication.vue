<template>
    <div class="communication-wrap">
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
        <!--表格-->
        <el-table
                :data="tableData"
                style="width: 100%;text-align: center"
                :header-cell-style="{'text-align':'center'}">
            <el-table-column
                    prop="sender"
                    label="发送人"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sendContent"
                    label="发送内容"
                    width="600">

                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p style="width: 300px">姓名: {{ scope.row.sendContent }}</p>
                        <div slot="reference" class="name-wrapper">
                           {{ scope.row.sendContent }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sendTime"
                    label="发送时间">
            </el-table-column>
            <el-table-column
                    prop="enclosure"
                    label="">
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

                tableData: [{
                    sender: '张三111',
                    sendContent: '发送内容啊啊啊阿斯顿撒点开始你失败客户就是把你举高科技环保苦丁茶',
                    sendTime: '2016-05-04 15:23:34',
                    enclosure: '📎'
                },{
                    sender: '张三111',
                    sendContent: '发送内容啊啊啊阿斯顿撒点开始你失败客户就是把你举高科技环保苦丁茶',
                    sendTime: '2016-05-04 15:23:34',
                    enclosure: '📎'
                },{
                    sender: '张三111',
                    sendContent: '发送内容啊啊啊阿斯顿撒点开始你失败客户就是把你举高科技环保苦丁茶',
                    sendTime: '2016-05-04 15:23:34',
                    enclosure: '📎'
                },{
                    sender: '张三111',
                    sendContent: '发送内容啊啊啊阿斯顿撒点开始你失败客户就是把你举高科技环保苦丁茶',
                    sendTime: '2016-05-04 15:23:34',
                    enclosure: '📎'
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
    /*任务*/
    .communication-wrap{
        .name-wrapper{
            width: 500px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }

</style>
