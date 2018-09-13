<template>
    <!--<div @scroll="getSrcollFn()">-->
    <settingScroll @scoll="handleLoadMore" :status.sync="scrollStatus">
        <!--<div slot="content">-->
        <div class="organization"  slot="content">
            <el-row class="search">
                <el-col :span="13">
                    <span class="title" :title="orgTitle">{{orgTitle}}</span>
                    <div style="margin: -20px 0 10px 0;">
                        <el-input size="medium" placeholder="输入姓名或电话" v-model="objSearch.searchName" @keyup.enter.native="refreshTable">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="refreshTable" style="cursor: pointer"></i>
                        </el-input>
                    </div>
                </el-col>
                <!--<el-col :span="10" class="add-news">-->
                    <!--<el-input size="medium" placeholder="输入姓名或电话" v-model="objSearch.searchName">-->
                        <!--<i slot="suffix" class="el-input__icon el-icon-search"></i>-->
                    <!--</el-input>-->
                <!--</el-col>-->
                <el-col :span="6" class="add-news">
                    <el-checkbox v-model="objSearch.dimission" @change="handleChangeBox">含离职</el-checkbox>
                    <el-checkbox v-model="objSearch.partTime" @change="handleChangeBox">含兼职</el-checkbox>
                </el-col>
                <el-col :span="5" class="add-news">
                    <el-dropdown split-button type="primary" size="small" @click="handleInviteUser" @command="handleImportUser">
                        <i class="el-icon-plus" ></i> 邀请用户
                        <el-dropdown-menu slot="dropdown" :visible-arrow="false"  style="margin-top:1px">
                            <el-dropdown-item :visible-arrow="false"
                                              style="width: 90px;text-align: center;">导入</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
            <div class="orgTable">
                <el-table v-loading="loading" :data="orgUserData" :row-class-name="tableRowClassName"
                          :header-cell-style="{'color':'#333333','background-color': 'rgba(242, 242, 242, 1)'}" >
                    <el-table-column label="姓名" prop="name" min-width="130" show-overflow-tooltip>
                      <template slot-scope="scope">
                          <span class="itemTitle"> {{ scope.row.name}}</span>
                          <span class="icon_yuan bg_1" v-if="scope.row.isLeader=='1'">负</span>
                          <span class="icon_yuan bg_0" v-else-if="scope.row.isDefault=='0'">兼 </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="性别" prop="sex" min-width="40"> </el-table-column>
                    <el-table-column label="手机号码" prop="mobile" min-width="100"> </el-table-column>
                    <el-table-column label="状态" prop="workStatus" min-width="80" >
                        <template slot-scope="scope">
                            <span v-text="workStatusName(scope.row.workStatus)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="电子邮件" prop="email" min-width="130">
                        <template slot-scope="scope">
                            {{scope.row.email||"--"}}
                        </template>
                    </el-table-column>
                    <el-table-column label="所属部门" prop="organizationName"
                                     show-overflow-tooltip min-width="100"> </el-table-column>
                    <el-table-column label="职务" prop="position" min-width="100" show-overflow-tooltip >
                        <template slot-scope="scope">
                            {{scope.row.position||"--"}}
                        </template>
                    </el-table-column>
                    <el-table-column width="160">
                        <template slot-scope="scope">
                            <span class="operation" v-if="scope.row.workStatus=='no_confirmed'"
                                  @click="handleInviteUserAgain(scope.$index,scope.row)">再次邀请</span>
                            <span class="operation" v-if="scope.row.workStatus!='no_confirmed'"
                                  @click="handleUserEdit(scope.$index,scope.row)">编辑</span>
                            <span class="operation" v-if="scope.row.workStatus!='job'" @click="handleUserDel(scope.$index,scope.row)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="page">
                    <div class="loading" v-if="loadMore=='loading'"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                    <div class="loading" v-else-if="loadMore=='noMore'"><span>没有更多了</span></div>
                    <div class="loading" v-else-if="loadMore=='haveMore'"><span>滚动加载更多</span></div>
                    <!--<el-row justify="right">-->
                        <!--<el-col :span="24">-->
                            <!--<el-pagination  @size-change="handlePageSizeChange"  @current-change="handlePageCurrentChange"-->
                                            <!--:current-page="pageNum"  :page-sizes="[10, 20, 50, 100]" :page-size="pageCount"-->
                                            <!--layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">-->
                            <!--</el-pagination>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                </div>
            </div>
            <!--右侧弹窗邀请用户-->
            <inviteUserDialog :dialogVisible="inviteDialogVisible"  v-if="inviteDialogVisible" :depData="depData"
                              @closeCreateModal="closeInviteDialog" @refreshUserTable="refreshTable"></inviteUserDialog>
            <!--右侧弹窗导入用户-->
            <importUserDialog :dialogVisible="importUserDialogVisible" v-if="importUserDialogVisible" :depData="depData"
                              @closeCreateModal="closeImportUserDialog" @refreshUserTable="refreshTable"></importUserDialog>
            <!--右侧弹窗编辑用户-->
            <editUserDialog :dialogVisible="editUserDialogVisible" v-if="editUserDialogVisible" :userId="userId"
                              @closeCreateModal="closeEditUserDialog" @refreshUserTable="refreshTable"></editUserDialog>
        </div>
        <!--</div>-->
    </settingScroll>
</template>

<script>
    // import departmentEdit from './components/departmentEdit.vue'
    import inviteUserDialog from './components/inviteUserDialog.vue'
    import importUserDialog from './components/importUsers.vue'
    import editUserDialog from './components/userEdit.vue'
    import {sysOrgEventBus} from './orgEventBus'
    // import testData from './localTestData'
    import settingScroll  from  '../components/setingScroll'
    export default {
        name: "organization",
        components:{
            inviteUserDialog,
            importUserDialog,
            editUserDialog,
            settingScroll
        },
        data(){
           return{
               orgTitle:"",
               orgSid:"",
               orgPrefixId:"",
               objSearch:{
                   dimission:false,
                   partTime:false,
                   searchName:""
               },
               orgUserData:[],
               loading:false,
               pageTotal:0,   //总页数
               pageNum:1,      //当前页数
               pageCount:10, //分页大小,每页多少条
               dataTotal:0,   //数据总条数
               inviteDialogVisible:false,
               importUserDialogVisible:false,
               editUserDialogVisible:false,
               userId:"",
               depData:{
                   depName:"",
                   depId:""
               },
               loadMore:"",
               scrollStatus:true
           }
        },
        mounted(){
            sysOrgEventBus.$on('sysOrg_emit_orgId',busData=>{
                // console.log("busData:"+JSON.stringify(busData))
                this.orgTitle=busData.orgName;
                this.orgSid=busData.orgSid;
                this.orgPrefixId=busData.prefixId;
                this.depData.depName=this.orgTitle;
                this.depData.depId=this.orgSid;
                this.pageNum=1;
                this.orgUserData=[];
                this.getOrgUserListData();
            })
            this.setHeight();
            // this.handleLoadMore();
        },
        // watch:{
        //     //只要objSearch对象数据改变就查后台
        //     objSearch: {
        //         handler(newValue, oldValue) {
        //             // console.log("watch objSearch");
        //             this.getOrgUserListData();
        //         },
        //         deep: true
        //     }
        // },
        methods:{
            handleLoadMore(){
                    if(this.pageNum<=this.pageTotal &&　!this.loading){
                        // alert("this.pageNum:"+this.pageNum+";this.pageTotal:"+this.pageTotal)
                        this.loadMore="loading";
                        this.getOrgUserListData();
                    }else if(!this.loading){
                        this.loadMore="noMore";
                    }

            },
            // getSrcollFn(e){
            //     // let scrollBd = $(".router-wrapper");
            //     // let scrollTop = $(".router-wrapper").scrollTop();
            //     // let scrollHeight = scrollBd[0].scrollHeight;
            //     // let clientHeight = scrollBd[0].clientHeight;
            //     // // debugger
            //     // if(scrollHeight - scrollTop  == clientHeight && scrollTop!=0){
            //     //     if(this.pageNum<=this.pageTotal &&　!this.loading){
            //     //         // alert("this.pageNum:"+this.pageNum+";this.pageTotal:"+this.pageTotal)
            //     //         this.loadMore="loading";
            //     //         this.getOrgUserListData();
            //     //     }else if(!this.loading){
            //     //         this.loadMore="noMore";
            //     //     }
            //     // }
            // },
            setHeight(){
                let screenHeight = document.body.clientHeight;
                let $bd = $(".router-wrapper");
                if($bd.length){
                    let tempHeight = $bd.height();
                    // $bd.css("height",tempHeight);
                    let tableDateHeight=tempHeight-105;
                    let tempNum = Math.ceil(tableDateHeight/41);
                    tempNum=tempNum<10?10:tempNum;
                    this.pageCount = tempNum;
                }
            },
            handleUserEdit(index,row){
                // console.log("useredit:"+JSON.stringify(row))
               this.userId=row.sid;
               this.editUserDialogVisible=true;
            },
            async handleInviteUserAgain(index,row){
                await JZY.xhr.request({type:'get',url:'/sys/user/reInviteUser/'+row.sid}).then((resultData)=>{
                    JZY.u.successMsg('操作成功')
                }).catch((e)=>{
                })
            },
            handleUserDel(index,row){
                this.$confirm('此操作将删除当前用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.delUser(row.sid)
                }).catch(() => {
                });

            },
            handleChangeBox(){
                this.pageNum=1;
                this.orgUserData=[];
                this.getOrgUserListData();
            },
            // handlePageSizeChange(size){
            //     this.pageCount=size;
            //     this.getOrgUserListData();
            // },
            // handlePageCurrentChange(currentPage){
            //     this.pageNum=currentPage;
            //     this.getOrgUserListData();
            // },

            tableRowClassName({row, rowIndex}){
                if (row.workStatus==='no_confirmed') {
                    return 'no_confirmed_css';
                }
                return '';
            },
            workStatusName(job){
                if(job=='job'){
                    return "在职"
                }else if(job=='no_confirmed'){
                    return "未确认"
                }else if(job=='leave'){
                    return "离职"
                }else {
                    return ""
                }
            },
            handleInviteUser(){
                this.inviteDialogVisible=true
            },
            closeInviteDialog(){
                this.inviteDialogVisible=false
            },
            handleImportUser(){
                this.importUserDialogVisible=true;
            },
            closeImportUserDialog(){
                this.importUserDialogVisible=false;
            },
            closeEditUserDialog(){
               this.editUserDialogVisible=false;
            },
            refreshTable(){
                this.pageNum=1;
                this.orgUserData=[];
                this.getOrgUserListData();
            },
            async delUser(userId){
                await JZY.xhr.drop('/sys/user/delete/'+userId,{},{alertSuccess:true}).then((resultData)=>{
                    this.refreshTable();
                }).catch((e)=>{
                    //接口失败
                })
            },
            async getOrgUserListData(){
                let jobStatus=1;  //1表示不包含离职、兼职；2表示包含离职；3表示包含兼职；4表示两者都包含
                if(this.objSearch.dimission){
                    jobStatus=jobStatus+1;
                }
                if(this.objSearch.partTime){
                    jobStatus=jobStatus+2;
                }
                this.loading=true;
                let pas={organizationId:this.orgSid,
                          prefixId:this.orgPrefixId,
                          queryCondition:this.objSearch.searchName,
                          status:jobStatus,
                          pageNum:this.pageNum,
                          pageCount:this.pageCount};
                // console.log(JSON.stringify(pas))
                await JZY.xhr.post('/sys/user/getUserList',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getUserListMain:"+JSON.stringify(resultData))
                    try{
                        let newList=resultData[0].list || [];
                        this.orgUserData=this.orgUserData.concat(newList);
                        this.pageTotal=resultData[0].pageTotal;
                        this.dataTotal=resultData[0].total;
                        this.loading=false;
                        if(this.pageNum<=this.pageTotal){
                            this.loadMore="haveMore";
                        }else{
                            this.loadMore="noMore";
                        }
                        this.pageNum++;
                    }catch (e){
                        this.loading=false;
                        this.$message("organization.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
        }

    }
</script>

<style  lang="scss">
.organization{
    background-color: #fff;
    .search{
        padding: 10px 10px 10px 20px;
        line-height: 45px;
        height: 45px;
        .el-dropdown-item{
            width: 100px;
        }
        .title{
            font-size: 14px;
            overflow: hidden;
            display: inline-block;
            margin-top: 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100%;
        }
        .add-news{
            text-align: right;
            padding: 5px 10px 0 0;
        }
    }
    .orgTable{
        padding: 20px 10px 0 20px;
        .el-table::before{height:auto;}
        .el-table{
            .operation{
                color: #409EFF;
                cursor:pointer;
                margin-right: 5px;
            }
            .icon_yuan {
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                border-radius: 50%;
                display: inline-block;
                color: #fff;
                margin: 0 10px;
                &.bg_0 {
                    background-color: #f00; //红
                }
                &.bg_1 {
                    background-color: #46a7ff; //蓝
                }
            }
            .no_confirmed_css {
                td{
                    color:rgb(188, 188, 188);
                }
            }
        }
        /*.page{*/
            /*padding:10px 0;*/
            /*text-align: right;*/
        /*}*/
        .loading{
            margin-top: 10px;
            color: $theme-black-other;
            text-align: center;
        }
    }
}
</style>