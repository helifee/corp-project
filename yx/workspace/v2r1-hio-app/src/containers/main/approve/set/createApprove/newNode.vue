<template>
    <div class="new_node approve_warp">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="rule_form">
        <el-row :gutter="0">
          <el-col :span="20">
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.name}')" prop="name">
              <el-input v-model="ruleForm.name" :maxlength="51" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.namePlaceholder}')"></el-input>
            </el-form-item>
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approveType}')" prop="approveType" v-if='showType'>
             <el-select v-model="ruleForm.approveType" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approveTypePlaceholder}')"
               @change="approveTypeSelected">
                <el-option v-for="(item,key,index) in l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approveTypeSelects}')" 
                :key="index" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" v-if='showType'>
          <el-col :span="24">
            <div class="line"></div>
          </el-col>
        </el-row>
        <el-row :gutter="0" v-if='showType'>
          <el-col :span="24">
            <div class="title">{{l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.setApprover}')}}</div>
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approver}')" prop="approver">
              <!--1直属上级、5发起人-->
              <span v-for="(items, key) in ruleForm.approverUser">
                <el-tag
                  v-for="(item,index) in items"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="deleteApproverUser(key,index,ruleForm.approverUser)">
                  <span>
                    {{item.name}}
                  </span>
                </el-tag>
              </span>
              <!-- 用户  -->
              <blend-tree ref= "refSelectUserDialogVisibleMultiple" 
                :selectedDataToTree = "selectedUsersToTree" 
                :resultDataListShow ="false"
                :enable-checked-multiple = "userTreeEnableCheckedMultipleUser" 
                :tagButtons="['user','userOutside']" 
                activeTab = "user"
                @getDataFromTree = "userFromTreeFunc">
              </blend-tree>

              <el-select v-model="ruleForm.approver" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approverSelects}')[0].name" @change="approverSelected">
                <el-option v-for="item in l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.approverSelects}')"
                 :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
              <span class="el-icon-circle-plus add_approver" v-if="approverAddButton === 3" @click="showUserTreeDailog('addApprover')">添加用户</span>
              <span class="el-icon-circle-plus add_approver" v-if="approverAddButton === 4" @click="addRoleDept">添加角色+部门</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="line"></div>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="24">
            <div class="title">{{l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.setUserShared}')}}</div>
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.newNode.form.userShared}')">
              <!--全局组件的使用-添加抄送人-->
              <blend-tree
                  ref= "userCcTree"
                  :tagButtons="tagButtonsForUserCc"
                  :activeTab = "activeTabForUserCc"
                  :selectedDataToTree = "selectedDataToTreeForUserCc"
                  @getDataFromTree = "getDataFromTreeForUserCc">
                  <!--添加按钮图标的插槽-->
                  <div slot="add_button">
                    <i class="el-icon-circle-plus" @click.stop = "$refs.userCcTree.blendTreeDialogShow()"></i>
                  </div>
              </blend-tree>

              <!-- <el-tag
                v-for="(item,index) in ruleForm.userShared"
                :key="index"
                closable
                :disable-transitions="false"
                @close="deleteUser($event,index,ruleForm.userShared)">
                {{item.name}}
              </el-tag>
              <span class="el-icon-circle-plus" @click="showUserTreeDailog('addUserShared')">添加抄送人</span> -->
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
     
      <!--选择角色+部门-->
      <role-dept-tree
        :selectRoleDeptDialogVisible="showRoleDeptTree"
        :selectedRoleDepts="ruleForm.approverRoleDept"
        @closeCreateModal ="showRoleDeptTree = !showRoleDeptTree"
        @getRoleDepts="getRoleDepts">
      </role-dept-tree>
      
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../../approve.locale'))
    import config from '@/config/index.js'
    import mockData from '@MockData'
import { localeData } from '../../../../../../static/moment/src/lib/moment/locale';

  //  1 直属上级，2 部门+角色，3 用户，4 角色+本部门，5 发起人
    export default{
        components: {
        },
        props:["newnodeData","dialogVisible"],
        
        data(){
            let my = this;
            let approverValidator = (rule, value, callback) =>{
                let ruleForm = my.ruleForm;
                let tempIndex = 0;
                  for(let key in my.ruleForm.approverUser){
                    let temp = my.ruleForm.approverUser[key];
                    if(temp && temp.length){
                      tempIndex += temp.length;
                    }
                  }
                  if(my.ruleForm.approveType == "1"){  //审批
                    if(tempIndex == 1){
                        callback();
                      }else if(tempIndex == 0){
                        return callback(new Error("审批人为空，请选择审批人"));
                      }
                      else{
                        return callback(new Error("审批人只能选一个"));
                      }
                  }else{  //会签
                      if(tempIndex == 0){
                        return callback(new Error("审批人为空，请选择审批人"))
                      }else{
                        callback();
                      }
                  }
                  
            }
            let extra = this.newnodeData.extra ? (JSON.parse(this.newnodeData.extra)):{};

            return {
              selectedUsersToTree:{
                userList:[],
                userOutsideList:[]
              },
              selectedDeptToTree:{
                deptList:[],
                roleList:[]
              },
              showType:'',
              deleStatu : 0,  //当前状态
              showUserTree:false,//用户树组件弹出窗开关
              userTreeData :[],//用户树组件，传入已选择用户
              showUserTreeType:'',//用户树类型，审批人、抄送人等
              userTreeEnableCheckedMultipleUser:false,//用户树：false单选，true多选（默认是多选，此种模式可不传递此参数）
              userTreeShowInsideOutsideTabs:true,//用户树：显示内、外部，false:只显示‘人员’，其他逻辑无差异
              showRoleDeptTree: false,//角色+部门树组件弹出窗开关


              approverAddButton:1,//添加审批人按钮类型 1 直属上级，2 部门+角色，3 用户，4 角色+部门，5 发起人

              selectUserType:'',//用户树，当前操作的树的标识
              selectedUsersFromTree:[],//已选择的用户，返回
              selectUserDialogVisible:false,//选择用户弹出窗

              selectedRoleDeptsFromTree:{},//已选择的角色+部门，返回
              selectRoleDeptDialogVisible:false,//选择角色+部门弹出窗

              ruleForm: {
                  name: this.newnodeData.value || this.newnodeData.label,//审批环节名称
                  approveType:  String(extra.approvalType) || "1",//审核类型，审核、会签
                  approver: "",
                  // approverUser:[ //审批人：用户tree
                  //   // {
                  //   // sid:'1000',
                  //   // name:'审批人'
                  //   // }
                  // ],
                  approverUser:{
                    1:[],
                    2:[],
                    3:[],
                    4:[],
                    5:[]
                  },
                  approverRoleDept:{//审批人：角色+部门tree
                    role:{
                      // roleId:'1005',roleName:'角色'
                      },
                    dept:{
                      // sid:'1003',name:'部门'
                      },
                    
                    resultNames:[]
                  },
                  userShared:[//抄送人：用户tree
                  //   {//抄送人：用户tree
                  //   sid:'1000',
                  //   name:'抄送人'
                  // }
                  ],
                  approverList:[],
                  //直属上级等特殊审批人，返回父组件的值
                  othersApprover:[],
                  // othersApprover:[{
                  //   value:'1',//直属上级
                  //   name:'直属上级'
                  // },{
                  //   value:'5',//发起人
                  //   name:'发起人'
                  // }],
              },
              rules: {
                  name: [
                    { required: true, message: '请输入审批环节名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                    { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                  ],
                  approveType: [
                    { required: true, message: '请选择审批类型', trigger: 'change' }
                  ],
                  approver: [
                    // { required: true, message: '请选择审批人', trigger: 'change' },
                    // { required: true, message: '请选择审批人', trigger: 'change' },
                    { validator:approverValidator, trigger: 'blur' }
                  ],
              },
              //抄送人
              selectedDataToTreeForUserCc:{//已选树节点
                userList:[],
                userOutsideList:[]
              },
              selectedDataToTreeForUserCcCopy:{//已选树节点-备份
                userList:[],
                userOutsideList:[]
              },
              tagButtonsForUserCc:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTabForUserCc:'user',//初始化激活的tab标签


            }
        },
        watch:{
            dialogVisible(nVal,oVal){
              //初始化数据
                if(nVal){
                  this.initData()
                }
            }
        },
        methods:{
            //初始化
            initData(){
              this.deleStatu = 0;
              let formData = this.newnodeData;
              if(formData.nodeType == "end"){
                this.showType = false;
              }else{
                this.showType = true;
              }
              this.approverAddButton = 1;
              let extra = formData.extra ? (JSON.parse(formData.extra)):{};
              this.ruleForm.name = formData.value || formData.label;
              this.ruleForm.approver = "";
              this.ruleForm.approveType = extra.approvalType ? String(extra.approvalType) : "1";//审核类型，审核、会签
              // this.ruleForm.approver = extra.approver || "";
              // this.ruleForm.approverUser = {
              // };
              // this.ruleForm.userShared = [];

              // //抄送人-清空
              // this.selectedDataToTreeForUserCc ={//已选树节点
              //   userList:[],
              //   userOutsideList:[]
              // }
              // this.selectedDataToTreeForUserCcCopy = {//已选树节点-备份
              //   userList:[],
              //   userOutsideList:[]
              // }

              this.ruleForm.approverRoleDept = {
                role:{},
                dept:{},
                resultNames:[]
              }
              let ccPerson = formData.ccPerson;
              if(ccPerson) {
                let persons = JSON.parse(ccPerson);
                // debugger
                if(persons && persons.length){
                  for(let i = 0; i< persons.length ; i++){
                    this.ruleForm.userShared[i] = {};
                    this.ruleForm.userShared[i].sid = persons[i].userId;
                    this.ruleForm.userShared[i].name = persons[i].name;
                    this.ruleForm.userShared[i].userType = persons[i].userType;
                    this.ruleForm.userShared[i].imUserId = persons[i].imUserId || "";

                    //已选树节点
                    if ( persons[i].userType == 0 || persons[i].userType == 'user' ) {//0内部
                      this.selectedDataToTreeForUserCc.userList.push( this.ruleForm.userShared[i] )
                    }else if (persons[i].userType == 1 || persons[i].userType == 'external' ){//外部
                      this.selectedDataToTreeForUserCc.userOutsideList.push( this.ruleForm.userShared[i] );
                    }

                  }
                  this.selectedDataToTreeForUserCcCopy = JZY.u.deepExtend( {} , this.selectedDataToTreeForUserCc )


                }
              }
              let participant = formData.participant;
              participant = participant ? JSON.parse(participant) : "";
              if(participant && participant.length){
                for(let i=0;i<participant.length;i++){
                  if( participant[i].approvalType == "4" || participant[i].approvalType == "2"){  //类型
                    let strN = participant[i].approvalTypeName.split(","),
                        roleN = strN[0], deptN = strN[1];
                    let strId = participant[i].approverId.split(","),
                        roleId = strId[0], deptId = strId[1];
                    this.ruleForm.approverRoleDept.role = { roleId : roleId,roleName : roleN };
                    this.ruleForm.approverRoleDept.dept = { sid : deptId,name : deptN };
                    this.ruleForm.approverUser[participant[i].approvalType] = [{
                      sid: participant[i].approverId,
                      name : participant[i].approvalTypeName,
                      type: participant[i].approvalType,
                      userType : participant[i].userType,
                      imUserId: participant[i].imUserId || ""
                    }]
                    
                    
                  }else if(participant[i].approvalType == "3"){
                    this.ruleForm.approverUser[participant[i].approvalType] = 
                      this.ruleForm.approverUser[participant[i].approvalType] ? this.ruleForm.approverUser[participant[i].approvalType] : [];
                    let approverTempUser = {
                      sid : participant[i].approverId,
                      name : participant[i].approvalTypeName,
                      type: participant[i].approvalType,
                      userType : participant[i].userType,
                      imUserId: participant[i].imUserId || ""
                    }
                    this.ruleForm.approverUser[participant[i].approvalType].push(approverTempUser) ;

                    if ( approverTempUser.userType == 0 || approverTempUser.userType == 'user' ) {//0内部
                      this.selectedUsersToTree.userList.push( approverTempUser)
                    }else if (approverTempUser.userType == 1 || approverTempUser.userType == 'external' ){//外部
                      this.selectedUsersToTree.userOutsideList.push( approverTempUser );
                    }
                     
                  }
                  else  if(participant[i].approvalType == "1" || participant[i].approvalType == "5"){//其它
                    this.ruleForm.approverUser[participant[i].approvalType] = [{
                      name : participant[i].approvalType == 1 ? '直接上级':'发起人',
                      type : participant[i].approvalType,
                      userType : participant[i].userType,
                      imUserId: participant[i].imUserId || ""
                    }]
                    // this.ruleForm.approver = String(participant[i].approvalType);
                  }
                  
                }
              }
             
            },
            //接收混合树组件的返回值-抄送人
            getDataFromTreeForUserCc( obj = {} ){
                // console.info(obj)
                // console.info(JSON.stringify(obj))
                // console.info(this.ruleForm.userShared)

                this.ruleForm.userShared = []
                // debugger
                obj.userList && obj.userList.forEach((item)=>{
                    item.userType = 0;
                    this.ruleForm.userShared.push(item)
                })
                obj.userOutsideList && obj.userOutsideList.forEach((item)=>{
                    item.userType = 1;
                    this.ruleForm.userShared.push(item)
                })
            },
            //显示用户树组件弹出窗
            showUserTreeDailog:function(type){
              // this.selectedUsersToTree.userList = [];
              // this.selectedUsersToTree.userOutsideList = [];
              let arr1 = [],arr2 = [];
              this.ruleForm.approverUser[3].forEach(item=>{
                if(item.userType == 0){
                  arr1.push(item);
                }else{
                  arr2.push(item);
                }
              })
              this.selectedUsersToTree.userList = arr1;
              this.selectedUsersToTree.userOutsideList = arr2;
              if (type === 'addApprover') {//设置审批人
                if (this.ruleForm.approveType == 2) {//会签  多选
                  this.userTreeEnableCheckedMultipleUser = true;  
                }else{   //单选
                  this.userTreeEnableCheckedMultipleUser = false;
                }
                this.$refs.refSelectUserDialogVisibleMultiple.blendTreeDialogShow();
              }

              this.showUserTreeType = type//addApprover添加审批人，addUserShared抄送人
            },
            //接收用户树返回的数据
            // getUserTree:function(arr){
            //   if(this.showUserTreeType === 'addApprover'){
            //     // this.ruleForm.approverUser = [...arr];
            //     arr.forEach(element => {
            //       element.type = 3;
            //     });
            //     this.ruleForm.approverUser[3] = [...arr];
            //   }else if(this.showUserTreeType === 'addUserShared'){
            //     this.ruleForm.userShared = [...arr]
            //   }
            // },
            //用户
            userFromTreeFunc(obj){
              obj.userList.forEach(element => {
                  element.type = 3;
                  element.userType = 0;
              });
              obj.userOutsideList.forEach(element => {
                element.type = 3;
                element.userType = 1;
              });
                let arr = [];
              arr = obj.userList.concat(obj.userOutsideList);
              this.ruleForm.approverUser[3] = [...arr];
     
            },
            
            //删除用户tag的事件
            deleteUser(event,index,arr) {
              arr.splice(index, 1);
              return;
            },
            //删除审批
            deleteApproverUser(key,index,data){
                key = Number(key);
                data[key].splice(index,1);
                if(!data[key].length){
                  delete data[key]
                }
                this.$set(this.ruleForm.approverUser,key,data[key]);
                return;
            },
            //显示角色+部门树组件弹出窗
            addRoleDept:function(){
              this.showRoleDeptTree = true
            },
            //接收角色+部门树中返回数据，已选择角色+部门对象
            getRoleDepts:function(obj){
              
              let temp = JZY.u.deepExtend({}, obj);
              let type ;
              if(temp.dept.sid == "-1"){//本部门
                  type = 4
              }else{
                type = 2;
              }
              let tempSid = (temp.dept.sid == "-1") ? "" : temp.dept.sid;
              let idStr = temp.role.roleId + ( tempSid ? ("," + tempSid) : "") ;
              let nameStr = temp.role.roleName + (temp.dept.name ? ( "," + temp.dept.name) : "");
              
              let tempObj = {
                sid : idStr,
                name : nameStr,
                type: type
              }

              delete this.ruleForm.approverUser[2];
              delete this.ruleForm.approverUser[4];

              this.ruleForm.approverUser[tempObj.type] = [tempObj];
              
            },
            //审核类型选择事件,1:审核、2:会签
            approveTypeSelected:function(value){
              
              if(value == 1){
                this.userTreeEnableCheckedMultipleUser = false
              }else{
                this.userTreeEnableCheckedMultipleUser = true
              }

            },
            //审批人选择事件,1,3,4,5
            approverSelected:function(value){
              this.approverAddButton = value;
              this.ruleForm.approverUser[value] = this.ruleForm.approverUser[value] || [];
              if (value == 1 || value == 5) {//特殊审批人
                let obj = {
                  type: value,
                  name : value === 1 ? '直接上级':'发起人',
                  sid : value
                };
                this.ruleForm.approverUser[value] = [obj];
                // this.ruleForm.approverUser.push(obj);
              }
            }
            

        },
        mounted(){
          this.selectedRoleDeptsFromTree = JZY.u.deepExtend({}, this.ruleForm.approverRoleDept);

          this.initData() //初始化数据
        }
        
    }
</script>

<style lang="scss">
.new_node.approve_warp{
}
</style>
<style scoped lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.new_node.approve_warp{
    margin-top: 20px;
    .line{
      border-bottom:1px solid $borderColor;
      margin-bottom:30px;
      margin-top:30px;
    }
    .title{
      font-size:18px;
      margin-bottom:30px;
      text-indent:20px;
    }
    .add_approver{
      padding-left:16px;
    }
    .el-tag{
      margin-right: 10px;
      // white-space: nowrap;text-overflow: ellipsis;
      span{
        max-width: 90px;
        display:inline-block;
        overflow:hidden;
        vertical-align: bottom;
        white-space: nowrap;text-overflow: ellipsis;
      }
      
    }
}
</style>