<template>
    <div class="wrap">
        <div class="content-title">
            <h3>项目管理</h3>
            <el-button type="primary" class="add-news"  size="small" @click="showProjectDialog"><i class="el-icon-plus"></i> 创建项目</el-button>
        </div>
        <!--项目列表-->
        <div class="project-wrap">
            <!--查询条件-->
            <div class="project-search">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm"  ref="searchForm">
                    <el-form-item label=" 项目名称" prop="name">
                        <el-input  size="small"  clearable v-model="searchForm.name" placeholder="项目名称" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 项目状态" prop="state">
                        <el-select  size="small" v-model="searchForm.state" placeholder="请选择项目状态" >
                            <el-option label="全部" :value="66"></el-option>
                            <el-option label="未开启" :value="2"></el-option>
                            <el-option label="进行中" :value="0"></el-option>
                            <el-option label="已延期" :value="1"></el-option>
                            <el-option label="已撤销" :value="4"></el-option>
                            <el-option label="已完成" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right;margin-right: 0px">
                        <el-button type="primary" size="small" @click="search">查 询</el-button>
                        <el-button size="small" @click="resetForm('searchForm')">重 置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--表格-->
            <project-table
                    ref="projectSortTable"
                    :showConcern="false"
                    moduleName="set"
                    v-loading = "loading"
                    :data ="tableData"
                    :pageNum="pageNum"
                    :pageCount="pageCount"
                    @sortProjectList = "sortProjectList"
                    @refleshTable = "refleshTable"
            ></project-table>
        </div>
        <!--创建项目-->
        <dialog-create-project :dialog-visible="projectDialogVisible" @showGoodsModal="showProjectDialog" @closeCreateModal="closeProjectDialog" @reloadData="reloadData"></dialog-create-project>
    </div>
</template>

<script>
    JZY.locale.add('projectLocale',require('./project.locale'))
    import {postProjectInfoList} from '@Main/project/getData.js'
    import dialogCreateProject from '@Main/project/components/project/dialog.createProject.vue'
    import projectTable from '@Main/project/components/project/project.table.vue'
    export default{
        components: {
            dialogCreateProject,
            projectTable
        },
        methods:{
            //新建项目
            showProjectDialog (){
                this.projectDialogVisible = true;
            },
            reloadData(){
                this.loading = true;
                this.rquireProjectList();
            },
            //关闭新建项目弹窗
            closeProjectDialog(){
                this.projectDialogVisible = false;
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.searchForm.name = '';
                this.searchForm.state = 66;
                this.searchValue.name = '';
                this.searchValue.state = '';
                this.pageNum = 1;
                this.orderby = '';
                this.$refs.projectSortTable.resetSort();
                let projectName = this.searchForm.name;
                let projectStatus = this.searchForm.state==66?"":this.searchForm.state;
                this.loading = true;
                this.rquireProjectList({"projectName":projectName,"projectStatus":projectStatus});
            },
            //查找
            search (){
                let projectName = this.searchForm.name;
                let projectStatus = this.searchForm.state==66?"":this.searchForm.state;
                let obj = {
                    name:projectName,
                    state:projectStatus
                }
                this.pageNum = 1
                this.searchValue={...obj}
                this.loading = true;
                this.rquireProjectList({"projectName":projectName,"projectStatus":projectStatus});
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount='10' } = {} ){
                this.pageNum= pageNum;
                this.pageCount = pageCount;
                this.loading = true;
                this.rquireProjectList( {'orderby':this.orderby,'pageNum':pageNum, 'pageCount':pageCount, } )
            },
            //项目列表排序
            sortProjectList(orderby){
                this.orderby = orderby;
                this.loading = true;
                this.rquireProjectList({'orderby':orderby });
            },
            async rquireProjectList( {projectName = this.searchValue.name ,projectStatus = this.searchValue.state,orderby = this.orderby } = {} ){
              let res = await postProjectInfoList(projectName,projectStatus,orderby,this.pageNum,this.pageCount);
                if (res[0].list.length != 0) {
                    this.tableData = JZY.u.deepExtend({},res[0])
                }else{
                    this.tableData = {}
                }
                this.loading = false;
            },
        },
        data(){
            return {
                loading:true,
                projectDialogVisible:false,//创建项目
                searchForm:{
                    name:'',
                    state:66,
                },                  //查找关键字
                tableData:{}, //列表数据
                pageNum:"1",
                pageCount:"10",
                orderby:'',
                searchValue:{
                    name:'',
                    state:'',
                }
            }
        },
        watch:{

        },
        mounted(){
            this.rquireProjectList();
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        height: 100%;
        overflow-y: auto;
        /*overflow: hidden;*/
        /*height: 100%;*/
        /*overflow-y: auto;*/
        background: #ffffff;
        .content-title{
            position: relative;
            padding: 0px;
            line-height: 32px;
            height: 64px;
            margin-left: 24px;
            margin-right: 24px;
            border-bottom: 1px solid $theme-grey-table-border;
            h3{
                height: 64px;
                line-height: 64px;
                text-align: left;
                font-size: 14px;
                font-weight: normal;
                color: $theme-black-title;
                margin: 0px;
                padding: 0px;
            }
            .add-news{
                position: absolute;
                right: 0px;
                top:16px;
            }
        }
        .project-wrap{
            padding: 16px 24px;
            .concerned{
                text-align:center;
                // visibility: hidden;
                i{
                    font-size:18px;
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
        }
        .el-pagination{
            float: right;
            margin: 20px 12px;
        }
    }
    /*项目进度滑块位置调整*/
    .el-slider .el-slider__button-wrapper{
        top:-18px;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td .heart{
        /*visibility: visible;*/
    }
</style>
