<template>
    <!--<div class="file-wrap">-->
        <!--&lt;!&ndash;查询条件&ndash;&gt;-->
        <!--<div class="project-search">-->
            <!--&lt;!&ndash;检索内容&ndash;&gt;-->
            <!--<el-form :inline="true" :model="searchForm2" :rules="searchRules2" ref="searchForm2">-->
                <!--<el-form-item label=" 查询条件：" prop="searchVal">-->
                    <!--<el-input v-model="searchForm2.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="search">查询</el-button>-->
                    <!--<el-button @click="resetForm('searchForm')">重置</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->

                <!--</el-form-item>-->
            <!--</el-form>-->

        <!--</div>-->
        <!--&lt;!&ndash;新建任务&ndash;&gt;-->
        <!--<el-button type="primary" class="add-task" @click=""><i class="el-icon-plus"></i> 新建文件夹</el-button>-->
        <!--<el-button type="primary" class="add-task" @click=""><i class="el-icon-plus"></i> 上传文件</el-button>-->
        <!--&lt;!&ndash;表格&ndash;&gt;-->
        <!--<el-table-->
                <!--:data="tableData2"-->
                <!--style="width: 100%;text-align: center;"-->
                <!--:header-cell-style="{'text-align':'center'}">-->
            <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="名称"-->
                    <!--width="500"-->
                    <!--style="text-align: left;">-->
                <!--<template slot-scope="scope">-->
                    <!--<div style="text-align: left;padding-left: 30px">-->
                        <!--<i class="el-icon-message"></i> {{scope.row.name}}-->
                    <!--</div>-->

                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="updateTime"-->
                    <!--label="更新时间"-->
                    <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="filesNumber"-->
                    <!--label="文件数量">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="useSpace"-->
                    <!--label="使用空间">-->
            <!--</el-table-column>-->
        <!--</el-table>-->
    <!--</div>-->

    <div>
        <!--{{projectPermission}}&#45;&#45;&#45;&#45;&#45;&#45;-->
        <net-disk v-if="projectPermission!==null" @PAGE_TOTAL="handlePageTotal" :projectPermission="projectPermission" :project-id="$store.state.route.params.id"></net-disk>

    </div>

</template>
<script>

    import netDisk from '@Main/netDisk/netDisk.vue'

    export default {
        mounted(){

          console.log('project detail--:',this.projectDetail)
        },
        components: {
            netDisk
        },
        updated(){


        },
        data() {
            return {
                //文档
                searchForm2:{
                    searchVal:''
                },
                searchRules2:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                tableData2: [{
                    name: '合同文档',
                    updateTime: '2016-05-04 15:23:34',
                    filesNumber:'6',
                    useSpace: '3.6M'
                }, {
                    name: '采购管理办法',
                    updateTime: '2016-05-04 15:23:34',
                    filesNumber:'6',
                    useSpace: '3.6M'
                }, {
                    name: '合同文档',
                    updateTime: '2016-05-04 15:23:34',
                    filesNumber:'6',
                    useSpace: '3.6M'
                }, {
                    name: '合同文档',
                    updateTime: '2016-05-04 15:23:34',
                    filesNumber:'6',
                    useSpace: '3.6M'
                }],
            }
        },
        props: {
            projectPermission:{
                type:[String,Number],
                default:null
            }
            // projectDetail:Object
        },
        computed: {
            hasUploadPermission(){
               return this.projectPermission =='4'

            }

        },
        filters:{
        },
        methods: {
            handlePageTotal(total){
                this.$emit('PAGE_TOTAL',total)
            },
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

</style>
