<template>
    <div class="participants-wrap">
        <!--查询条件-->
        <!--<div class="project-search">-->
            <!--&lt;!&ndash;检索内容&ndash;&gt;-->
            <!--<el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">-->
                <!--<el-form-item label=" 查询条件：" prop="searchVal">-->
                    <!--<el-input v-model="searchForm.teamPersonName" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="search">查询</el-button>-->
                    <!--<el-button @click="resetForm('searchForm')">重置</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm"  ref="searchForm">
                <el-form-item label=" 姓名：" prop="searchVal">
                    <el-input  size="small" v-model="searchForm.teamPersonName" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="search">查询</el-button>
                    <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--表格-->
        <participants-table
                :data ="tableData"
                :pageNum="pageNum"
                :pageCount="pageCount"
                @sortParticipantsList = "sortParticipantsList"
                @refleshTable = "refleshTable"
        ></participants-table>

    </div>
</template>
<script>
    import {postProjectTeamPerson} from '@Main/project/getData.js'
    import participantsTable from '@Main/project/components/details/participants/participants.table.vue'

    export default {
        components: {
            participantsTable
        },
        props: {
            id:{
                required:true
            },
            randomNum:{
                required:false
            }
        },
        data() {
            return {
                searchForm:{
                    teamPersonName:''
                },
                searchRules:{
                    teamPersonName: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                tableData:{},
                pageNum:"1",
                pageCount:"10",
                orderby:'',
                searchValue:{
                    teamPersonName:''
                }
            }
        },
        computed: {

        },
        filters:{
        },
        methods: {
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
                this.searchForm.teamPersonName = '';
                let teamPersonName = this.searchForm.teamPersonName;
                this.searchValue.teamPersonName=teamPersonName;
                this.rqProjectTeamPerson({"teamPersonName":teamPersonName});
            },
            search (formName){
                let teamPersonName = this.searchForm.teamPersonName;
                this.searchValue.teamPersonName=teamPersonName;
                this.rqProjectTeamPerson({"teamPersonName":teamPersonName});

            },
            //查询团队成员
//            async rqProjectTeamPerson(queryData){
//                let res = await postProjectTeamPerson(queryData);
//                this.participantsTableData = res[0].list
//                console.log(res,"查询团队成员");
//            },
            async rquireProjectList( {projectName = this.searchValue.name ,projectStatus = this.searchValue.state,orderby = '' } = {} ){
                let res = await postProjectConcernList(projectName,projectStatus,orderby,this.pageNum,this.pageCount);
                if (res[0].list.length != 0) {
                    this.tableData = JZY.u.deepExtend({},res[0])
                }else{
                    this.tableData = {}
                }
            },


            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' ,pageCount='10' } = {} ){
                this.pageNum= pageNum;
                this.pageCount = pageCount;
                this.rqProjectTeamPerson( {'orderby':this.orderby,'pageNum':pageNum, 'pageCount':pageCount } )
            },

            //项目列表排序
            sortParticipantsList(orderby){
                this.pageNum = "1";
                this.pageCount = "10";
                this.rqProjectTeamPerson({'orderby':orderby });
            },
            async rqProjectTeamPerson( {teamPersonName = this.searchValue.teamPersonName,orderby = '' } = {} ){
                let res = await postProjectTeamPerson(this.id,teamPersonName,orderby,this.pageNum,this.pageCount);
                if (res[0].list.length != 0) {
                    this.tableData = JZY.u.deepExtend({},res[0])
                    this.$emit("participantsNum",this.tableData.total);
                }else{
                    this.tableData = {}
                }
            },
        },
        watch: {
            id(curVal,oldVal){
                this.rqProjectTeamPerson();
            },
            randomNum(){
                this.rqProjectTeamPerson()
            }
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
