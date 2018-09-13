<!--普通审签，组件-->
<template>
  <div class="approve detail_add_user">
    <div v-if="position == 'after'">
      <div class="vertical_line">
        <div><i class="el-icon-download"></i></div>
        <div><i class="el-icon-download"></i></div>
      </div>
    </div>
    <div class="approve_content">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm" label-width="0px">
        <el-form-item class="title" label="" prop="title">
          <el-row :gutter="0">
            <el-col :span="22">
              <el-input v-model="addUserForm.title" :maxlength="51" placeholder="请输入审批节点主题"></el-input>
            </el-col>
            <el-col :span="2" style="text-align:center;">
              <i class="el-icon-close icon" @click="closeAddUser"></i>            
            </el-col>
          </el-row>
        </el-form-item>
        <div class="info">
          <span class="name">审批人员：</span>
          <!--全局组件的使用-->
          <blend-tree
              ref= "userTree"
              :tagButtons="tagButtons"
              :activeTab = "activeTab"
              :enable-checked-multiple="false"
              :selectedDataToTree = "selectedDataToTree"
              @getDataFromTree = "getDataFromTree">
              <!--添加按钮图标的插槽-->
              <div slot="add_button">
                <i class="icon el-icon-plus" @click.stop = "$refs.userTree.blendTreeDialogShow()"></i>
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
          <i class="icon el-icon-plus" @click="addUser"></i> -->
        </div>
      </el-form>
    </div>
    <div v-if="position == 'before'">
      <div class="vertical_line">
        <div><i class="el-icon-download"></i></div>
        <div><i class="el-icon-download"></i></div>
      </div>
    </div>
    <!--1棵树-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly"
        :enable-checked-multiple="enableCheckedMultipleUser"
        :show-inside-outside-tabs = "false"
        :selectedUsers = "showUserOnly"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
        @getUserTree = "getUserTreeOnly">
    </user-tree>
  </div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  export default {
    data() {
      return {
        /*1棵树*/
        showUserTreeOnly:false,//弹出窗显示否
        enableCheckedMultipleUser:false,//单选
        showUserOnly:[],//已选用户，传入tree的数据

        addUserForm:{
          title:'',//审批节点的主题
          approveUserId:'',//审批人员id
        },
        addUserRules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { max: 50, message: '请输入不超过 50 个字符', trigger: 'blur' },
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
          ],
        },

        //会签人员选择组件2.0
        selectedDataToTree:{//已选树节点
          userList:[]
        },
        tagButtons:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTab:'user',//初始化激活的tab标签


      }
    },
    props:['position'],
    methods: {
      //加载组织结构树页面-作废
      addUser:function(){
        this.showUserTreeOnly = true
      },
      //用户树-开始
      /*1棵树*/
      //接收用户树组件的返回值-作废
      getUserTreeOnly:function(obj){
          this.showUserOnly = [...obj]
          //表单中的审批人id
          this.addUserForm.approveUserId = this.showUserOnly.length > 0 ? this.showUserOnly[0].sid : ''
      },
      //删除用户tag的事件-作废
      deleteUserOnly(sid) {
          this.showUserOnly = this.showUserOnly.filter(function(item) {
            return item.sid != sid;
          });
          //表单中的审批人id
          this.addUserForm.approveUserId = this.showUserOnly.length > 0 ? this.showUserOnly[0].sid : ''
      },
      //关闭此组件
      closeAddUser:function(){
        this.$emit('changeVisible',false)
      },

      //接收混合树组件的返回值-会签人选择
      getDataFromTree( obj = {} ){
        console.info(obj)
        console.info(JSON.stringify(obj))
        //表单中的审批人id
        this.addUserForm.approveUserId = obj.userList.length > 0 ? obj.userList[0].sid : ''
      },

      
    },
    mounted(){
      
                this.$refs.addUserForm.validate(async (valid) => {
                    if (valid) {

                        

                    }else{
                      return false;
                    }
                });
    },
    watch:{
        "addUserForm":{
            handler:function(newVal,oldVal){
                // console.info(newVal)
                // console.info(oldVal)
                this.$emit('addUserForm',newVal)
                
            },
            deep:true
        },

    },
  }
</script>
<style scoped lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail_add_user{
  .approve_content{
    border:1px solid $borderColor;
    line-height:40px;
    .title{
      background-color:$backgroundColor;
      border-bottom:1px solid $borderColor;
      font-weight:bolder;
      &.el-form-item{
        margin-bottom:10px;
      }
    }
    .info{
      .name{
        margin-left:20px;
      }
    }
    .icon{
      cursor:pointer;
    }
    .blend_tree_wrap{
      display: inline-block;
    }
  }
  .vertical_line{
    margin-left:40px;
    div{
      width: 20px;
      &:first-child{
        margin-top: 10px;
      }
      &:last-child{
        margin-bottom: 10px;
      }
    }
  }
    
}
</style>