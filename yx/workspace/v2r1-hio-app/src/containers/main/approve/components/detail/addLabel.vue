<!--前后加签、会签等-->
<template>
  <div class="approve detail add_label">
    <el-dialog :title="addUserDialog.title+'处理'" :visible.sync="addUserDialog.visible" class="add_user_before_dialog">
      <el-form :rules="addUserDialogRules" :model="addUserDialog" ref="addUserDialog" label-width="100px">
        <el-alert
          :title="addUserDialog.detailDesc"
          type="warning"
          show-icon style="width:100%;margin-bottom:10px;">
        </el-alert>
        <el-form-item label="审批类型：" prop="approvalType">
          <el-radio-group v-model="addUserDialog.approvalType">
            <el-radio :label="1">普通审批</el-radio>
            <el-radio :label="2">会签</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--普通审批页面-->
        <div v-show="addUserDialog.approvalType == 1">
          <!--前加签页面-->
          <add-user-detail
            v-if="addUserDialog.position == 'before'"
            :position="addUserDialog.position"
            @changeVisible="changeVisible"
            @addUserForm = "addUserForm">
          </add-user-detail>
          <!--当前审批节点页面-->
          <div class="approve_content">
            <div class="title">当前审批节点</div>
            <div class="info">
              <span class="name">审批人员：</span>
              <span class="user_name">{{approvalUser.name}}</span>
              <span class="user_name">{{approvalUser.dept=='null'?'':approvalUser.dept}}</span>
            </div>
          </div>
          <!--后加签页面-->
          <add-user-detail
            v-if="addUserDialog.position == 'after'"
            :position="addUserDialog.position"
            @changeVisible="changeVisible"
            @addUserForm = "addUserForm">
          </add-user-detail>
          <!--加签按钮-->
          <el-button type="primary" class="insert_user_button"  @click="openAddUserDialog(addUserDialog.signType)">
            <i class="el-icon-arrow-right el-icon-plus"></i>
            加签
          </el-button>
        </div>

        <!--会签页面-->
        <div v-show="addUserDialog.approvalType == 2">
          <el-form-item label="选择会签人员：" label-width="120px">
            <!--全局组件的使用-->
            <blend-tree
                ref= "signUserTree"
                :tagButtons="tagButtonsForSignUser"
                :activeTab = "activeTabForSignUser"
                :selectedDataToTree = "selectedDataToTreeForSignUser"
                @getDataFromTree = "getDataFromTreeForSignUser">
                <!--添加按钮图标的插槽-->
                <div slot="add_button">
                  <i class="icon el-icon-plus" @click.stop = "$refs.signUserTree.blendTreeDialogShow()"></i>
                </div>
            </blend-tree>
            <!-- <el-tag
              v-for="(item,index) in showUserOnly"
              :key="index"
              closable
              :disable-transitions="false"
              @close="deleteUserOnly(item.sid)">
              {{item.name}}
            </el-tag>
            <i class="icon el-icon-plus" @click="addCounterSignUser"></i> -->
          </el-form-item>
          <el-form-item label="意见说明：">
            <el-input v-model="addUserDialog.counterSign.desc" v-textarea-limiter type="textarea" :maxlength="101" :rows="5" :placeholder="l('{approveLocale.approve.detail.dialog.textareaPlaceholder}')"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>


    <!--1棵树-作废-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly"
        :selectedUsers = "showUserOnly"
        :show-inside-outside-tabs = "false"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
        @getUserTree = "getUserTreeOnly">
    </user-tree>


  </div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  import addUserDetail from '@Main/approve/components/detail/approve.detail.addUser.vue'
  //数据接口文件
  import { setInstanceFrontAddLabel, setInstanceAfterAddLabel,  } from '@Main/approve/getData'

  export default {
    components:{
      addUserDetail,
    },
    data() {
      return {
        addUserDialog:{
          visible: false,
          title:'',//页面标题
          detailDesc:'',//页面提醒
          approvalType:1,//审批方式，1普通审批、2会签
          signType:'',//加签方式，前加签before、后加签after

          position:'',//组件show开关
          addSign:{//加签
            title:'',//环节名称
            approveUserId:''//被加签人id
          },

          counterSign:{//会签
            desc:'',//会签意见
            userIds:[] //会签人员id
          },

          // desc:'',//审批意见，会签有，加签没有此表单
          // signArray:['人员一', '人员二', '人员三'],//加签、会签人员
          // addSign:'',//加签人员id
          // counterSign:'',//会签人员
        },
        addUserDialogRules:{
          type: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
          desc: [
            { required: true, message: '请输入审批意见说明', trigger: 'blur' },
            { max: 100, message: '请输入不超过 100 个字符', trigger: 'blur' },
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
          ],
        },
        /*1棵树*/
        showUserTreeOnly:false,
        showUserOnly:[],//已选用户，传入tree的数据


        //会签人员选择组件2.0
        selectedDataToTreeForSignUser:{//已选树节点
          userList:[]
        },
        tagButtonsForSignUser:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForSignUser:'user',//初始化激活的tab标签



      }
    },
    props:{
      infoData:{
        type:Object,
        default:function(){
          return {}
        }
      },
      instanceId:{//流程id
        type:String,
        default:''
      },
      instanceAcId:{//当前环节id
        type:String,
        default:''
      },
      approvalUser:{//当前环节审批人
        type:Object,
        default:function(){
          return {
            name:'',
            dept:''
          }
        }
      },

    },
    methods: {
        //前后加签组件弹窗
        openAddUserDialog:function(position){//前、后
          this.addUserDialog.position = position;
          console.info(position)
        },
        //接收前后加签组件返回的数据
        addUserForm:function( obj = {} ){
          this.addUserDialog.addSign = JZY.u.deepExtend( {} , obj )
          // this.$message("添加人员2")
          // this.$emit('addUserSelect',true)
        },
        //关闭前后加签审批组件弹窗
        changeVisible:function(){
          this.addUserDialog.position =''
          this.addUserDialog.addSign = {//加签
              title:'',//环节名称
              approveUserId:''//被加签人id
          }
        },
        //用户树-开始
        /*1棵树*/
        //显示会签人选择组件-作废
        addCounterSignUser:function(){
          this.showUserTreeOnly = true
        },
        //接收用户树组件的返回值-作废
        getUserTreeOnly:function(arr){
          this.showUserOnly = [...arr]
          arr.forEach((item)=>{
            this.addUserDialog.counterSign.userIds.push(item.sid)
          })
          debugger
        },
        //删除用户tag的事件-作废
        deleteUserOnly(sid) {
            this.showUserOnly = this.showUserOnly.filter(function(item) {
              return item.sid != sid;
            });
            //会签
            this.addUserDialog.counterSign.userIds.splice(this.addUserDialog.counterSign.userIds.indexOf(sid), 1);
        },
        //接收混合树组件的返回值-会签人选择
        getDataFromTreeForSignUser( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          this.addUserDialog.counterSign.userIds = []

          obj.userList && obj.userList.forEach((item)=>{
            this.addUserDialog.counterSign.userIds.push(item.sid)
          })
          // debugger
        },

        //加签表单提交事件，暂未添加表单验证
        async submitForm(){
          let res = []
          let name = ''
          let userIds = []
          if (this.addUserDialog.approvalType == 1) {//普通加签
            name = this.addUserDialog.addSign.title
            this.addUserDialog.addSign.approveUserId && userIds.push(this.addUserDialog.addSign.approveUserId)
          }else{ //会签
            name = this.addUserDialog.counterSign.desc
            userIds = [ ...this.addUserDialog.counterSign.userIds ]
          }
          // debugger
          if (userIds.length > 0 && userIds[0] && name !== '') {
              if (this.addUserDialog.signType === 'before') {//前加签
                res = await setInstanceFrontAddLabel( this.instanceId , this.instanceAcId , name , this.addUserDialog.approvalType , userIds )
                this.$emit('goback',true)//退出审批详情页
              }else{//后加签
                res = await setInstanceAfterAddLabel( this.instanceId , this.instanceAcId , name , this.addUserDialog.approvalType , userIds )
                this.$emit('reflashInstanceInfo',true)//重新加载审批详情信息
              }
              //已选会签审批人置空
              this.selectedDataToTreeForSignUser = {//已选树节点
                userList:[]
              }
              //已填会签意见清空
              this.addUserDialog.counterSign.desc = ''


              this.addUserDialog.visible = false
              this.$message({
                showClose: true,
                message: '加签成功',
                type: 'success'
              })
              
              
          }else{
            if (userIds.length == 0) {
              this.$message({
                showClose: true,
                message: '请选择审批人',
                type: 'warning'
              })

            }else{
              this.$message({
                showClose: true,
                message: this.addUserDialog.approvalType == 1 ?'请输入标题':'请填写意见说明',
                type: 'warning'
              })

            }
              
              return;
          }

        },

      

    },
    mounted(){
      this.addUserDialog = JZY.u.deepExtend( {}, this.addUserDialog, this.infoData )
    },
    watch:{
        "infoData":{
            handler:function(newVal,oldVal){
                // console.info(newVal)
                // console.info(oldVal)

                if ( this.addUserDialog.signType !== newVal.signType ) {//前后加签的切换

                    this.addUserDialog = {
                        visible: false,
                        title:'',//页面标题
                        detailDesc:'',//页面提醒
                        approvalType:1,//审批方式，1普通审批、2会签
                        signType:'',//加签方式，前加签before、后加签after

                        position:'',//组件show开关
                        addSign:{//加签
                          title:'',//环节名称
                          approveUserId:''//被加签人id
                        },

                        counterSign:{//会签
                          desc:'',//会签意见
                          userIds:[] //会签人员id
                        },
                    }
                    // this.showUserOnly = []
                    this.selectedDataToTreeForSignUser = {//已选树节点
                      userList:[]
                    }
                }
                //窗口关闭再打开
                this.addUserDialog = JZY.u.deepExtend( {}, this.addUserDialog , newVal )
                console.info(this.addUserDialog)

            },
            deep:true
        },
    },
  }
</script>
<style lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail.add_label{
  .el-dialog__header{
    border-bottom: 1px solid $borderColor;
  }
  // .add_user_before_dialog{
  //   .el-dialog__body{
  //     padding:20px;
  //   }
  //   .el-tag{
  //     margin-right: 10px;
  //   }
  // }
                
}
</style>
<style scoped lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail.add_label{

  .add_user_before_dialog{
    .approve_content{
      border:1px solid $borderColor;
      line-height:40px;
      .title{
        background-color:$backgroundColor;
        border-bottom:1px solid $borderColor;
        text-indent:20px;
        font-weight:bolder;
      }
      .info{
        text-indent:20px;
        .name{
          margin-right:50px;
        }
        .user_name{
          font-size:12px;
          color: #999;
          margin-right:10px;
        }
      }
    }
    .insert_user_button{
      margin-top:20px;
    }
  }
}
</style>