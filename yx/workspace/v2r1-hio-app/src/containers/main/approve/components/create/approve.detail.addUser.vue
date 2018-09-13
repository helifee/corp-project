<!--普通签，组件-->
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

          <el-tag
          v-for="(item,index) in showUserOnly"
          :key="index"
          closable
          :disable-transitions="false"
          @close="deleteUserOnly(item.sid)">
            {{item.name}}
          </el-tag>
          <i class="icon el-icon-plus" @click="addUser"></i>
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

      }
    },
    props:['position'],
    methods: {
      //加载组织结构树页面
      addUser:function(){
        this.showUserTreeOnly = true
      },
      //用户树-开始
      /*1棵树*/
      //接收用户树组件的返回值
      getUserTreeOnly:function(obj){
          this.showUserOnly = [...obj]
          //表单中的审批人id
          this.addUserForm.approveUserId = this.showUserOnly.length > 0 ? this.showUserOnly[0].sid : ''
      },
      //删除用户tag的事件
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


      
    },
    mounted(){
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
      text-indent:20px;
    }
    .icon{
      cursor:pointer;
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