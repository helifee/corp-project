<template>
    <div class="roleEdit">
        <!--右侧弹窗编辑角色-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li v-if="editType!='users'"><el-button :disabled="btnDisabled" @click="operateSave()" >保存</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div class="roleEdit">
                <el-form label-position="right"  :model="role" :rules="rules" ref="roleForm" v-if="editType=='role'">
                    <el-form-item label="角色名称:" prop="name" label-width="110px">
                        <el-input placeholder="输入角色名称" v-model="role.name" maxlength="100" style="width: 450px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述:" label-width="110px">
                        <el-input type="textarea" :rows="3" v-model="role.remark" v-textarea-limiter maxlength="250" style="width: 650px"></el-input>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<el-tabs v-model="tabActiveName">-->
                            <!--<el-tab-pane label="角色人员" name="roleMan">-->
                                <!--<roleMen :roleMenData="users" @delRoleMan="handleDelRoleMan" @handleEditRoleMen="handleEditRoleMen"></roleMen>-->
                            <!--</el-tab-pane>-->
                            <!--<el-tab-pane label="功能设置" name="setting">-->
                                <!--<div class="setHint">-->
                                    <!--注：编辑权限包含添加，编辑（修改状态等），删除-->
                                <!--</div>-->
                                <!--<div class="setTableTree" >-->
                                    <!--<roleSetTree :treeData="roleTree" @updataRoleTreeData="updataRoleTreeData"></roleSetTree>-->
                                <!--</div>-->
                            <!--</el-tab-pane>-->
                        <!--</el-tabs>-->
                    <!--</el-form-item>-->
                </el-form>
                <roleMen v-else-if="editType=='users'" :roleMenData="users" @delRoleMan="handleDelRoleMan" :editRoleId="editRoleId"
                         @handleEditRoleMen="handleEditRoleMen"></roleMen>
                <div v-else-if="editType=='roleTree'">
                    <div class="setHint">
                         注：编辑权限包含添加，编辑（修改状态等），删除
                    </div>
                    <roleSetTree ref="refRoleTree" :treeData="roleTree" @updataRoleTreeData="updataRoleTreeData"
                                 @updataRoleTreeDataBySingleCheck="updataRoleTreeDataBySingleCheck"></roleSetTree>
                </div>

            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    import roleSetTree from './roleSetTree.vue'
    import roleMen from './roleEdit.roleMen.vue'
    // import testData from './localTestData'
    export default {
        name: "roleEdit",
        components:{
            roleSetTree,
            roleMen
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            title:{
                type:String,
                default:""
            },
            editRoleId:{
                required:true,
                default:""     //add| roleId值
            },
            editType:{
                required:true,
                default:"role"     //role ,users,roleTree
            }
        },
        data(){
          return{
              // role:testData.roleData.role,
              // roleTree:testData.roleData.roleTree,
              // users:testData.roleData.users,
              role:{
                  name:"",
                  remark:""
              },
              roleTree:[],
              users:[],
              rules:{
                  name:{required:true,message: '角色名称不能为空', trigger: 'blur'}
              },
              // tabActiveName:"roleMan",
              btnDisabled:false
          }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        mounted(){
            this.getDataByRoleId(this.editRoleId);
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
                // this.tabActiveName="roleMan";
            },
            operateSave(){
                // this.$emit("closeCreateModal");
                this.btnDisabled=true
                if(this.editType=="role") {
                    this.$refs['roleForm'].validate((valid) => {
                        if (valid) {
                            try {
                                let pas = {};
                                pas.role = this.role;
                                //修改
                                pas.role.sid = this.editRoleId;
                                this.commitAllData(pas, "/sys/role/updateAll", "update");
                            } catch (e) {
                                this.btnDisabled = false;
                                this.$message("保存数据异常:" + e);
                            }
                        } else {
                            this.btnDisabled = false
                            return false;
                        }
                    })
                }else if(this.editType=="users"){
                    let pas = {};
                    pas.users=[];
                    if(this.users.length>0){
                        this.users.forEach(item=>{
                            let objUser={};
                            objUser.userId=item.userId;
                            pas.users.push(objUser)
                        })
                    }
                    //修改
                    pas.role={};
                    pas.role.sid = this.editRoleId;
                    this.commitAllData(pas, "/sys/role/updateAll", "update");
                }else  if(this.editType=="roleTree"){
                    let pas = {};
                    pas.permissions=[];
                    pas.role={};
                    pas.role.sid = this.editRoleId;
                    this.getDataToInterface(this.roleTree,pas.permissions);
                    this.commitAllData(pas, "/sys/role/updateAll", "update");
                }
            },
            handleDelRoleMan(userId){
                //删除角色中的人员
                JZY.xhr.post("/sys/roleUser/delete",{userId:userId,roleId:this.editRoleId},{alertSuccess:true}).then((resultData)=>{
                    this.users.forEach((item,index)=>{
                        if(item.userId==userId){
                            this.users.splice(index,1);
                        }
                    })
                    this.$emit("refreshRoleList");//刷新role.list
                })
            },
            getDataToInterface(treeData,interfaceData){
                //从this.roleTree提取后台接口需要的数据
                treeData.forEach(item=>{
                    if(('appId' in item) && ('menuId' in item) && (item.parentId!=null)){
                        let objTree={};
                        objTree.appId=item.appId;
                        objTree.menuId=item.menuId;
                        //premissionLook值为1，permissionEdit为2，permissionFile为4
                        let permissionEdit=item.permissionEdit===true?2:0;
                        let premissionLook=item.premissionLook===true?1:0;
                        let permissionFile=item.permissionFile===true?4:0;
                        objTree.permissionValue=permissionEdit+premissionLook+permissionFile;
                        if(objTree.permissionValue>0){
                            // console.log("treeData:"+JSON.stringify(item))
                            objTree.permissionValue=permissionEdit+premissionLook+permissionFile +"";
                            interfaceData.push(objTree)
                        }
                    }
                    if(item.children){
                        this.getDataToInterface(item.children,interfaceData);
                    }
                })
            },
            updataRoleTreeDataBySingleCheck(newData,type){
                this.updataTreeDataBySingleCheck(this.roleTree,newData,type);
                this.$refs.refRoleTree.refreshRoleTree();
            },
            updataTreeDataBySingleCheck(treeData,newData,type){
                //处理树后面，查看，编辑的checkbox事件
                try{
                    treeData.forEach(item=> {
                        if (item.nodeId == newData.nodeId){
                            if(type=="view"){
                                if(newData.premissionLook){
                                    item.premissionLook=true;
                                    item.nodeChecked=true;
                                }else{
                                    item.premissionLook=false;
                                    item.permissionEdit=newData.permissionEdit==null?null:false;
                                    item.permissionFile=newData.permissionFile==null?null:false;
                                    item.nodeChecked=false;
                                }
                            }else  if(type=="edit"){
                                if(newData.permissionEdit){
                                    item.premissionLook=true;
                                    item.permissionEdit=true;
                                    item.permissionFile=newData.permissionFile;
                                    item.nodeChecked=true;
                                }else{
                                    item.permissionEdit=false;
                                    item.premissionLook=newData.premissionLook;
                                    item.permissionFile=newData.permissionFile;
                                }
                            }else  if(type="file"){
                                if(newData.permissionFile){
                                    item.premissionLook=true;
                                    item.permissionEdit=newData.permissionEdit==null?null:true;
                                    item.permissionFile=true;
                                    item.nodeChecked=true;
                                }else{
                                    item.permissionEdit=newData.permissionEdit;
                                    item.premissionLook=newData.premissionLook;
                                    item.permissionFile=newData.permissionFile;
                                }
                            }

                            foreach.break=new Error("StopIteration");
                        }
                        if(item.children){
                            this.updataTreeDataBySingleCheck(item.children,newData,type);
                        }
                    })
                }catch (e){

                }
            },
            updataRoleTreeData(newData){
                //更新功能设置树数据this.roleTree
                this.updataTreeData(this.roleTree,newData);
                // console.log("newdata:"+JSON.stringify(this.roleTree));
                this.$refs.refRoleTree.refreshRoleTree();
            },
            updataTreeData(treeData,newData){
                //处理树前的checkbox事件
                try{
                    treeData.forEach(item=>{
                        if(item.nodeId==newData.nodeId){
                            if(newData.isLeafNode){
                                //是叶子结点
                                if(newData.nodeChecked){
                                    //选中本身，并选中父结点,并选中此结点前的所有兄弟结点
                                    this.selectTreeNode(this.roleTree,newData.nodeId,newData.parentId);
                                }else{
                                    //取消自身选择状态，并把此结点后的兄弟结点取消选择，如果此结点是第一个子结点，取消父结点选择
                                    this.cancelTreeNode(this.roleTree,newData.nodeId,newData.parentId)
                                }
                            }else{
                                //是父结点
                                if(newData.nodeChecked){
                                    if(item.name=="EHR") {
                                        item.nodeChecked = true;
                                        item.children.forEach(childItem => {
                                            childItem.permissionEdit = childItem.permissionEdit == null ? null : true;
                                            childItem.premissionLook = childItem.premissionLook == null ? null : true;
                                            childItem.permissionFile = childItem.permissionFile == null ? null : true;
                                            childItem.nodeChecked = true;
                                        })
                                    }else if(item.name=="CRM"){
                                        item.nodeChecked = true;
                                        item.children.forEach(childItem => {
                                            if(childItem.name!="CRM管理"){
                                                childItem.permissionEdit = childItem.permissionEdit == null ? null : true;
                                                childItem.premissionLook = childItem.premissionLook == null ? null : true;
                                                childItem.permissionFile = childItem.permissionFile == null ? null : true;
                                                childItem.nodeChecked = true;
                                            }
                                        })
                                    }else{
                                        //只选中第一个孩子
                                        item.children[0].permissionEdit=item.children[0].permissionEdit==null?null:true;
                                        item.children[0].premissionLook=item.children[0].premissionLook==null?null:true;
                                        item.children[0].permissionFile=item.children[0].permissionFile==null?null:true;
                                        item.children[0].nodeChecked=true;
                                        item.nodeChecked=true;
                                        if(item.name=="新闻"){
                                            item.children[0].permissionEditDisabled=false;
                                        }
                                    }

                                }else{
                                    //取消所以孩子的选中
                                    item.nodeChecked=false;
                                    item.children.forEach(childItem=>{
                                        childItem.permissionEdit=childItem.permissionEdit==null?null:false;
                                        childItem.premissionLook=childItem.premissionLook==null?null:false;
                                        childItem.permissionFile=childItem.permissionFile==null?null:false;
                                        childItem.nodeChecked=false;
                                    })
                                    if(item.name=="新闻"){
                                        item.children[0].permissionEditDisabled=true;
                                    }
                                }
                            }
                            foreach.break=new Error("StopIteration");
                        }
                        if(item.children){
                            this.updataTreeData(item.children,newData);
                        }
                    })
                }catch (e){}

            },
            cancelTreeNode(treeData,leafNodeNodeId,leafNodeParentSid){
                //取消自身选择状态，并把此结点后的兄弟结点取消选择，如果此结点是第一个子结点，取消父结点选择  erh只取消本身
                try{
                    treeData.forEach(againItme=>{
                        if(againItme.sid==leafNodeParentSid){
                            againItme.nodeChecked=true;
                            let isChange=false;
                            let isAllCancelSel=true;
                            for(let i=0;i<againItme.children.length;i++){
                                if(againItme.children[i].parentName=="EHR") {
                                    if (againItme.children[i].nodeId == leafNodeNodeId) {
                                        againItme.children[i].premissionLook = againItme.children[i].premissionLook == null ? null : false;
                                        againItme.children[i].permissionEdit = againItme.children[i].permissionEdit == null ? null : false;
                                        againItme.children[i].permissionFile = againItme.children[i].permissionFile == null ? null : false;
                                        againItme.children[i].nodeChecked = false;
                                    }
                                    if (againItme.children[i].nodeChecked) {
                                        isAllCancelSel = false;
                                    }
                                }else if(againItme.children[i].parentName=="CRM"){
                                    againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:false;
                                    againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:false;
                                    againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:false;
                                    againItme.children[i].nodeChecked=false;
                                    againItme.nodeChecked=false;
                                }else{
                                    if(againItme.children[i].nodeId==leafNodeNodeId){
                                        isChange=true;
                                        if(i==0){
                                            againItme.nodeChecked=false;
                                        }
                                    }
                                    if(isChange){
                                        againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:false;
                                        againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:false;
                                        againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:false;
                                        againItme.children[i].nodeChecked=false;
                                        if(againItme.children[i].name=="新闻管理"){
                                            againItme.children[i-1].permissionEditDisabled=false;
                                        }
                                    }
                                }
                            }
                            if(againItme.children[0].parentName=="EHR"){
                                if(isAllCancelSel){
                                    againItme.nodeChecked=false;
                                }else{
                                    againItme.nodeChecked=true;
                                }
                            }
                            foreach.break=new Error("StopIteration");
                        }
                        if(againItme.children){
                            this.selectTreeNode(againItme.children,leafNodeNodeId,leafNodeParentSid);
                        }
                    })
                }catch (e){}
            },
            selectTreeNode(treeData,leafNodeNodeId,leafNodeParentSid){
                //选中本身，并选中父结点,并选中此结点前的所有兄弟结点   erh只选中本身 crm前五个是一体
                try{
                    treeData.forEach(againItme=>{
                        if(againItme.sid==leafNodeParentSid){
                            againItme.nodeChecked=true;
                            for(let i=0;i<againItme.children.length;i++){
                                if(againItme.children[i].parentName=="EHR"){
                                    if(againItme.children[i].nodeId==leafNodeNodeId){
                                        againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:true;
                                        againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:true;
                                        againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:true;
                                        againItme.children[i].nodeChecked=true;
                                        foreach.break=new Error("StopIteration");
                                    }
                                }else if(againItme.children[i].parentName=="CRM"){
                                    if(againItme.children[i].name!="CRM管理"){
                                        againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:true;
                                        againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:true;
                                        againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:true;
                                        againItme.children[i].nodeChecked=true;
                                    }
                                    if(againItme.children[i].nodeId==leafNodeNodeId && againItme.children[i].name=="CRM管理"){
                                        againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:true;
                                        againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:true;
                                        againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:true;
                                        againItme.children[i].nodeChecked=true;
                                    }
                                }else{
                                    againItme.children[i].premissionLook=againItme.children[i].premissionLook==null?null:true;
                                    againItme.children[i].permissionEdit=againItme.children[i].permissionEdit==null?null:true;
                                    againItme.children[i].permissionFile=againItme.children[i].permissionFile==null?null:true;
                                    againItme.children[i].nodeChecked=true;
                                    if(againItme.children[i].name=="新闻使用"){
                                        againItme.children[i].permissionEditDisabled=false;
                                    }else if(againItme.children[i].name=="新闻管理"){
                                        againItme.children[i-1].permissionEditDisabled=true;
                                    }
                                    if(againItme.children[i].nodeId==leafNodeNodeId){
                                        foreach.break=new Error("StopIteration");
                                    }
                                }
                            }
                        }
                        if(againItme.children){
                            this.selectTreeNode(againItme.children,leafNodeNodeId,leafNodeParentSid);
                        }
                    })
                }catch (e){}
            },
            handleEditRoleMen(usersData){
                // console.log("selectedUsers:"+JSON.stringify(usersData))
                usersData.forEach(item=>{
                    let selUserid=item.sid;
                    this.users.forEach((userItem,index)=>{
                        if(selUserid==userItem.userId){
                            this.users.splice(index,1);
                            return;
                        }
                     })
                    let newRoleMan={};
                    newRoleMan.userId=selUserid;
                    newRoleMan.userName=item.name;
                    newRoleMan.userSex=item.sex;
                    newRoleMan.userPhone=item.mobile;
                    newRoleMan.userEmail=item.email;
                    newRoleMan.pinyinFirst=item.pinyinFirst;
                    newRoleMan.pinyinFull=item.pinyinFull;
                    this.users.push(newRoleMan)
                })
                this.operateSave();
            },
            async commitAllData(pas,url,type){
                let alertSuccess=this.editType=="users"?false:true;
                await JZY.xhr.post(url,pas,{alertSuccess:alertSuccess}).then((resultData)=>{
                    try{
                        this.loading=false;
                        this.btnDisabled=false;
                        //如果想刷新role.list不调用接口，需要在新增成功后后台返回roleid
                        if(this.editType=="users"){
                            this.$emit("refreshRoleList");//刷新role.list
                            return;
                        }
                        this.$emit("closeCreateModal");
                        if(this.editType!="roleTree"){
                            this.$emit("refreshRoleList");//刷新role.list
                        }
                    }catch (e){
                        this.btnDisabled=false;
                        this.$message("role.list.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
            async getDataByRoleId(roleId){
                // console.log("getDataByRoleId")
                await JZY.xhr.post('/sys/role/queryRoleDetail',{roleId:roleId},{alertSuccess:false}).then((resultData)=>{
                    // console.log(JSON.stringify(resultData))
                    try{
                        this.role.name=resultData[0].role.roleName;
                        this.role.remark=resultData[0].role.roleRemark;
                        // this.role=resultData[0].role ||{};
                        this.users=resultData[0].users ||[];
                        // this.roleTree=resultData[0].permissions;
                        this.arrangeRoleTreeData(resultData[0].permissions);
                        this.roleTree=resultData[0].permissions;
                        // this.$refs.refRoleTree.refreshRoleTree(this.roleTree);
                        // console.log("1333:"+JSON.stringify(this.roleTree))
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            arrangeRoleTreeData(data){
                data.forEach(item=>{
                    if(item.children){
                        if(item.children.length>0){
                            //父结点看第一个子结点是否选中
                            item.isLeafNode=false;
                            item.nodeChecked=false;
                            if(item.children[0].premissionLook==true){
                                item.nodeChecked=true;
                            }
                            if(item.name=="新闻" && item.children[0].premissionLook==true && item.children[1].premissionLook==false){
                                item.children[0].permissionEditDisabled=false
                            }
                            if(item.name=="EHR" || item.name=="CRM"){
                                item.children.forEach(ehrItem=>{
                                    ehrItem.parentName=item.name;
                                })
                            }
                        }
                        else{
                            item.isLeafNode=true;
                            item.nodeChecked=false;
                            if(item.premissionLook==true){
                                item.nodeChecked=true;
                            }
                            item.premissionLookDisabled=true;
                            item.permissionFileDisabled=true;
                            if(item.name=="新闻使用"&& item.permissionEditDisabled==false){
                                item.permissionEditDisabled=false;
                            }else{
                                item.permissionEditDisabled=true;
                            }
                            if(item.name=="首页"){
                                item.nodeChecked=true;
                            }else if(item.parentName=="EHR"){
                                item.premissionLookDisabled=false;
                                item.permissionEditDisabled=false;
                                item.permissionFileDisabled=false;
                            }
                        }
                        this.arrangeRoleTreeData(item.children);
                    }else{
                        item.isLeafNode=true;
                        item.nodeChecked=false;
                        if(item.premissionLook==true){
                            item.nodeChecked=true;
                        }
                        item.premissionLookDisabled=true;
                        item.permissionEditDisabled=true;
                        item.permissionFileDisabled=true;
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .operate_buttons {
        float: right;
    }
    .roleEdit{
        .setHint{
            text-align: right;
            color: red;
        }
    }
</style>