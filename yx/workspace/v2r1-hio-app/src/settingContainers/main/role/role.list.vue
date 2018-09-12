<template>
    <div @scroll="getSrcollFn()">
        <div class="rolelist">
            <el-row class="search">
                 <el-col :span="10">
                     <el-input size="medium" placeholder="输入角色名称"  v-model="searchName" @keyup.enter.native="refreshRoleList">
                         <i slot="suffix" class="el-input__icon el-icon-search" @click="refreshRoleList" style="cursor: pointer"></i>
                     </el-input>
                 </el-col>
                 <el-col :span="14" class="add-news">
                     <el-button 　type="primary"  size="small" @click="handlerCreateRole">
                         <i class="el-icon-plus"></i> 创建角色
                     </el-button>
                 </el-col>
             </el-row>
            <div class="roletable">
                <el-table v-loading="loading" :data="roleData" :header-cell-class-name="tableHeaderCell"
                          @sort-change="handleSortChange" :default-sort = "{prop: 'createTime', order: 'ascending'}">
                    <el-table-column label="角色名称" prop="roleName" min-width="100" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="角色人数" prop="roleUserCount" min-width="80"> </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="150" sortable="custom"> </el-table-column>
                    <el-table-column label="描述" prop="roleRemark" min-width="300" show-overflow-tooltip> </el-table-column>
                    <el-table-column width="160">
                        <template slot-scope="scope">
                            <i class="operation el-icon-edit-outline" @click="handleRoleEdit(scope.$index,scope.row)"></i>
                            <i class="operation user" @click="handleRoleUsersEdit(scope.$index,scope.row)"></i>
                            <i class="operation permission" v-if="scope.row.roleId!='1001'" @click="handleRolePermission(scope.$index,scope.row)"></i>
                            <i class="operation el-icon-delete" v-if="scope.row.roleId!='1001'" @click="handleRoleDel(scope.$index,scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="page">
                    <div class="loading" v-if="loadMore=='loading'"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                    <div class="loading" v-else-if="loadMore=='noMore'"><span>没有更多了</span></div>
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
            <!--右侧弹窗编辑角色-->
            <roleEdit :editRoleId="editRoleId" :title="roleEditTitle"  v-if="roleEditDiaVisible"
                      :dialogVisible="roleEditDiaVisible" :editType="editType"
                      @closeCreateModal="closeRoleEditDialog" @refreshRoleList="refreshRoleList"></roleEdit>
            <createRole  :dialogVisible="roleCreateDiaVisible" v-if="roleCreateDiaVisible"
                      @closeCreateModal="closeRoleCreateDialog" @refreshRoleList="refreshRoleList"></createRole>
        </div>
    </div>
</template>

<script>
    import roleEdit from './components/roleEdit.vue'
    import createRole from './components/createRole'
    export default {
        name: "rolelist",
        components:{
            roleEdit,
            createRole
        },
        data(){
            return{
                roleData:[],
                roleEditDiaVisible:false,
                loading:true,
                pageTotal:0,   //总页数
                pageNum:1,      //当前页数
                pageCount:10, //分页大小,每页多少条
                dataTotal:0,   //数据总条数
                searchName:"",
                roleEditTitle:"",
                editRoleId:"",     //用于传右边弹出窗口
                tableSort:"",
                editType:"",
                roleCreateDiaVisible:false,
                loadMore:"",
            }
        },
         mounted(){
             this.setHeight();
        },
        // watch:{
        //     searchName(){
        //         this.getRoleListData();
        //     }
        // },
        methods:{
            getSrcollFn(e){
                let scrollBd = $(".router-wrapper");
                let scrollTop = $(".router-wrapper").scrollTop();
                let scrollHeight = scrollBd[0].scrollHeight;
                let clientHeight = scrollBd[0].clientHeight;
                if(scrollHeight - scrollTop  == clientHeight && scrollTop!=0){
                    if(this.pageNum<=this.pageTotal){
                        this.loadMore="loading";
                        this.getRoleListData();
                    }else{
                        this.loadMore="noMore";
                    }
                }
            },
            setHeight(){
                let screenHeight = document.body.clientHeight;
                let $bd = $(".router-wrapper");
                if($bd.length){
                    let tempHeight = $bd.height()-40;
                    // $bd.css("height",tempHeight);
                    let tableDateHeight=tempHeight-90;
                    let tempNum = Math.ceil(tableDateHeight/41);
                    tempNum=tempNum<10?10:tempNum;
                    this.pageCount = tempNum;
                    // this.getRoleListData();
                }
                // alert("this.pageCount:"+this.pageCount )
            },
            handlerCreateRole(){
                // this.roleEditTitle="创建角色";
                // this.editRoleId="add";
                this.roleCreateDiaVisible=true;
            },
            closeRoleCreateDialog(){
                this.roleCreateDiaVisible=false;
            },
            closeRoleEditDialog(){
                this.roleEditDiaVisible=false;
            },
            tableHeaderCell(){
                return "tableHeaderCell"
            },
            handleRoleDel(index,row){
                this.$confirm('此操作将删除当前角色信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRoleData(row.roleId);
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
                // this.delRoleData(row.roleId);
            },
            handleRoleEdit(index,row){
                this.roleEditTitle="编辑角色";
                this.editRoleId=row.roleId;
                this.editType="role";
                this.roleEditDiaVisible=true;
                // console.log(row.roleName)
            },
            handleRoleUsersEdit(index,row){
                this.roleEditTitle=row.roleName;
                this.editRoleId=row.roleId;
                this.editType="users";
                this.roleEditDiaVisible=true;
            },
            handleRolePermission(index,row){
                this.roleEditTitle=row.roleName;
                this.editRoleId=row.roleId;
                this.editType="roleTree";
                this.roleEditDiaVisible=true;
            },
            // handlePageSizeChange(size){
            //     this.pageCount=size;
            //     this.getRoleListData();
            // },
            // handlePageCurrentChange(currentPage){
            //     this.pageNum=currentPage;
            //     this.getRoleListData();
            // },
            // handleSearchKeyChange(value){
            //     this.searchName=value;
            //     this.getRoleListData();
            // },
            handleSortChange(sortInfo){
                if(sortInfo.column==null){
                    this.tableSort="asc";
                }else{
                    if(sortInfo.order.startsWith("desc")){
                        this.tableSort="desc";
                    }else{
                        this.tableSort="asc";
                    }
                }
                this.refreshRoleList();
            },
            // handleQueryRoleListData(){
            //     this.pageNum=1;
            //     this.roleData=[];
            //     this.getRoleListData();
            // },
            async getRoleListData(){
                this.loading=true;
                let pas={pageNum:this.pageNum,pageCount:this.pageCount,name:this.searchName,orderBy:"createDate "+this.tableSort,};
                await JZY.xhr.post('/sys/role/queryRoles',pas,{alertSuccess:false}).then((resultData)=>{
                    try{
                        let newList=resultData[0].list || [];
                        this.roleData=this.roleData.concat(newList);
                        this.loading=false;
                        this.pageTotal=resultData[0].pageTotal;
                        this.pageNum=resultData[0].pageNum;
                        this.dataTotal=resultData[0].total;
                        if(this.pageNum<=this.pageTotal){
                            this.loadMore="noMore";
                        }else{
                            this.loadMore="no";
                        }
                        this.pageNum++;
                    }catch (e){
                        this.loading=false;
                        this.$message("role.list.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            async delRoleData(roleId){
                this.loading=true;
                await JZY.xhr.drop('/sys/role/delete/'+roleId,{},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.roleData.forEach((item,index)=>{
                            if(item.roleId==roleId){
                                 this.roleData.splice(index,1)
                            }
                        })
                    }catch (e){
                        this.$message("role.list.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            refreshRoleList(){
                this.pageNum=1;
                this.roleData=[];
                this.getRoleListData();
            }
        }
    }
</script>

<style  lang="scss">
.rolelist{
    background-color: #fff;
   .search{
       padding: 10px 10px 10px 20px;
       .add-news{
           text-align: right;
           padding: 5px 10px 0 0;
       }
   }
    .roletable{
        padding: 10px 10px 0 20px;
        .el-table::before{height:auto;}
        .el-table{
            .tableHeaderCell{
                color:#333333;
                background-color: rgba(242, 242, 242, 1);
            }
            .operation{
                color: #409EFF;
                cursor:pointer;
                margin-right: 5px;
                width: 20px;
                height: 20px;
            }
            .user{
                background: url("./u53181.png");
                display: inline-block;
                background-size: 100%;
                transform: translateY(4px);
            }
            .permission{
                background: url("./u53183.png");
                display: inline-block;
                background-size: 100%;
                transform: translateY(2px);
                width: 14px;
                height: 14px;
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