<template>
  <div class="approve detail_add_user">
    <div v-if="position == 'after'">
      <div class="vertical_line">
        <div><i class="el-icon-download"></i></div>
        <div><i class="el-icon-download"></i></div>
      </div>
    </div>
    <div class="approve_content">
      <el-form :model="form" :rules="formRules" ref="form" label-width="0px">
        <el-form-item class="title" label="" prop="title">
          <el-row :gutter="0">
            <el-col :span="22">
              <el-input v-model="form.title" placeholder="请输入审批节点主题" :maxlength = "51"></el-input>
            </el-col>
            <el-col :span="2" style="text-align:center;">
              <i class="el-icon-close icon" @click="close"></i>            
            </el-col>
          </el-row>
        </el-form-item>
        <div class="info">
          <span class="name">审批人员：</span>
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
  </div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  export default {
    data() {
      return {
        form:{
          title:'',
        },
        formRules:{
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
        // this.$message("添加人员")
        this.$emit('addUserSelect',true)
      },
      close:function(){
        this.$emit('changeVisible',false)
      }
    },
  }
</script>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
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