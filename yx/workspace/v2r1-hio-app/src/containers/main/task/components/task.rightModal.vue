<template>
    <div class="task right_modal">
        <right-slide-modal :title="l('{taskLocale.createTask}')[doTaskType]" :showClose="false" :visible.sync="propsData" class="task_right_modal">
            <div slot="operateButtons" class="operate_buttons">
              <ul>
                  <li v-for="(item,index) in l('{taskLocale.createTask.buttons}')" :key="index">
                    <el-button @click="operateFun(index)">{{item}}</el-button>
                  </li>
              </ul>
            </div>
            <task-create-page ref="createTask" :random="Math.random()" :projectId="projectId" :projectName ="projectName" :taskInfo = "taskInfo" @closeCreateModal = "goback"></task-create-page>
        </right-slide-modal>
    </div>
</template>
<script>
  JZY.locale.add('taskLocale',require('../task.locale'))
  import taskCreatePage from '@Main/task/components/task.createPage.vue'

  export default {
    components: {
        taskCreatePage
    },
    data() {
      return {
        doTaskType:'',//编辑edit，新建create
      }
    },
    props: {
      dialogVisible: {
        type: Boolean,
        required: true
      },
      taskInfo:{
        type:Object,
        default:function(){
          return {}
        }
      },
      //自于项目，项目id
      projectId: {
        type: String,
        default:''
      },
      //自于项目，项目名称
      projectName: {
        type: String,
        default:''
      },
    },
    computed: {
      propsData:{
        get: function(){
          console.info(this.dialogVisible)
          return this.dialogVisible
        },
        set: function(){
          this.$emit('closeCreateModal',false)
        }
      }
    },
    created(){
      if (Object.keys(this.taskInfo).length > 0 && this.taskInfo.taskId) {//编辑任务
        this.doTaskType = 'edit'
      }else{
        this.doTaskType = 'create'
      }
    },
    methods: {
      //右侧弹出页面顶部的功能按钮事件
      operateFun(index){
        console.info(index)
        switch(index){
        case 0:
          this.saveDialog ();
          break;
        case 1:
          this.goback ();
          break;
        default:
          this.$message('错误');
        }
      },
      //保存任务
      saveDialog (){
        this.$refs.createTask.submitTaskCreateForm()//调用表单保存的事件
      },
      //返回
      goback ( type =''){
        if (type == 'saveSuccess') {//保存成功，刷新list
          this.$emit('closeCreateModal','refleshTable')
        }else{
          this.$emit('closeCreateModal',false)
        }
      },
    },
    watch: {
    }
  }
</script>
<style lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.right_modal{
    
}
</style>