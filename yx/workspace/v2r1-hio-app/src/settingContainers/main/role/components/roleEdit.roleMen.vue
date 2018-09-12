<template>
    <div class="roleEditRoleMen">
        <el-row class="search">
            <el-col :span="10">
                <el-input size="medium" placeholder="输入姓名或电话" v-model="searchStr" >
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
            <el-col :span="14" class="add-news">
                <el-button 　type="primary"  size="small" @click="handlerCreateUser">
                    <i class="el-icon-plus"></i> 添加用户
                </el-button>
            </el-col>
        </el-row>
        <el-table :data="roleMenDataSelf"
                  :header-cell-style="{color:'#333333','background-color': 'rgba(242, 242, 242, 1)'}">
            <el-table-column label="姓名" prop="userName" show-overflow-tooltip>  </el-table-column>
            <el-table-column label="性别" prop="userSex">  </el-table-column>
            <el-table-column label="手机号" prop="userPhone">  </el-table-column>
            <el-table-column label="电子邮件" prop="userEmail">  </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <i class="operation el-icon-delete" v-if="editRoleId=='1001' && roleMenDataSelf.length==1" style="color: #a1a1a1">移除</i>
                    <i class="operation el-icon-delete" v-else @click="removeRoleMan(scope.row.userId)"></i>
                </template>
            </el-table-column>
        </el-table>
        <!--<seleUser :selectUserDialogVisible.sync="selectUserDialogVisible" :userData="userData"-->
                  <!--:selectedUsersToTree="selectedUsersToTree"-->
                  <!--@userFromTreeFunc="userFromTreeFunc"></seleUser>-->
        <!--<seleUser :selectUserDialogVisible="selectUserDialogVisible" v-if="selectUserDialogVisible"-->
                  <!--@closeCreateModal ="selectUserDialogVisible = !selectUserDialogVisible"-->
                        <!--:show-inside-outside-tabs="false"-->
                        <!--:selectedUsers= "selectedUsersToTree" @getUserTree = "userFromTreeFunc"-->
        <!--&gt;</seleUser>-->
        <blend-tree ref= "refSelectUserDialogVisible"  :resultDataListShow ="false" :selectedDataToTree = "selectedUsersToTree"
                    :enable-checked-multiple = "true" :tagButtons="['user']" activeTab = "user"
                    @getDataFromTree = "userFromTreeFunc">
        </blend-tree>
    </div>
</template>

<script>
    // import userData from './userData.js'//tree原始数据
    // import seleUser from './selectUser.vue'
    // import seleUser from '@/components/userTree/userTree.vue'
    export default {
        name: "role-edit-role-men",
        components:{
            // seleUser
        },
        data(){
          return{
              selectUserDialogVisible:false,
              // selectedUsersToTree:[{sid:"1000",name:"创建者"}],//{sid:XXX,name:XXXX}
              searchStr:""
          }
        },
        props:{
            roleMenData:{
                type:Array,
                defualt:[]
            },
            editRoleId:{}
        },
        computed:{
            selectedUsersToTree(){
                let usrs=[];
                this.$props.roleMenData.forEach(item=>{
                    let objuser={};
                    objuser.sid=item.userId;
                    objuser.name=item.userName;
                    objuser.mobile=item.userPhone;
                    objuser.sex=item.userSex;
                    objuser.email=item.userEmail;
                    objuser.pinyinFirst=item.pinyinFirst;
                    objuser.pinyinFull=item.pinyinFull;
                    usrs.push(objuser)
                })
                return {userList:usrs};
            },
            roleMenDataSelf(){
                if(this.searchStr.trim()==""){
                    return this.roleMenData;
                }else {
                    return this.roleMenData.filter((item) => {
                        // return item.includes(this.searchStr)
                        return item.userName.indexOf(this.searchStr)!=-1 || item.userPhone.indexOf(this.searchStr)!=-1
                            || item.pinyinFirst.indexOf(this.searchStr)!=-1 || item.pinyinFull.indexOf(this.searchStr)!=-1
                    })
                }
            }
        },
        methods:{
            async handlerCreateUser(){
                // this.selectUserDialogVisible=true;
                this.$refs.refSelectUserDialogVisible.blendTreeDialogShow();
            },
            removeRoleMan(userId){
                this.$confirm('<span style="font-weight: 600;">这是进行一项操作时必须了解的重要信息</span></p>\n' +
                    '            <p style="color:red">该用户会被从角色中移除！</p>\n' +
                    '            <p style="color: #999999;">你还要继续吗？</p>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then(() => {
                    // console.log("del userid:"+userId)
                    this.$emit("delRoleMan",userId);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            userFromTreeFunc(selectedUsers){
                // console.log("selectedUsers:"+JSON.stringify(selectedUsers.userList))
                this.$emit('handleEditRoleMen',selectedUsers.userList);
            }
        }
    }
</script>

<style scoped lang="scss">
.roleEditRoleMen{
    .search{
        padding: 10px 10px 10px 20px;
        .add-news{
            text-align: right;
            padding: 5px 10px 0 0;
        }
    }
    .el-table{
        .operation{
            color: #409EFF;
            cursor:pointer;
        }
    }
}
</style>