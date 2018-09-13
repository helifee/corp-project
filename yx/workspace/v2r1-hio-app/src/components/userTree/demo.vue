<template>
    <!-- <div class="task task_wrap"> -->
    <div class="approve approve_wrap">

      <approve-for-project
        @getPageTotal = "getPageTotal1">
        
      </approve-for-project>
      <!-- <task-detail>
        
      </task-detail> -->

      <!--页头-->
      <project-top-search
          moduleName='task'
          @searchTask = "searchTaskList"
          @openCreateModal = "createTask">

          <!--项目调用任务模块时候的插槽-->
          <template slot-scope="scope">
            <div class="project_select">
              <el-select v-model="value" placeholder="请选择" @change = "changeUrl">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>

      </project-top-search>
      <task-list
          v-if=" value%2 != 1 "
          ref="taskList"
          :projectId = "projectId"
          @getPageTotal = "getPageTotal">
      </task-list>
      <task-detail
          v-else
          :taskId = "taskId"
      >
      </task-detail>


      


      <!-- <flow-form
        formMode="design"
        uniqueId="100010"
      >
      </flow-form>

      <flow-form
        formMode="preview"
        uniqueId="100010"
      >
      </flow-form>



      <flow-form
        formMode="instance"
        uniqueId="100010"
      >
      </flow-form> -->

      <!-- <el-tag
        v-for="(item,index) in showUserOnly"
        :key="index"
        closable
        :disable-transitions="false"
        @close="deleteUserOnly(item.sid)">
        {{item.name}}
      </el-tag>

      <el-button @click="showUserTreeOnly = !showUserTreeOnly">显示唯一的用户树</el-button>


      <el-input v-model = "filterDataUrl.host">过滤数据源的host</el-input>
      <el-input v-model = "filterDataUrl.type">过滤数据源的type</el-input>
      <el-input v-model = "filterDataUrl.url">过滤数据源的url</el-input>
      <br />

      <user-tree
        :selectedUsers = "showUserOnly"
        :filterDataUrl = "filterDataUrl"
        :show-inside-outside-tabs="showInsideOutsideTabs"
        :selectUserDialogVisible="showUserTreeOnly"
        :enable-checked-multiple="enableCheckedMultipleUser"
        @getUserTree = "getUserTreeOnly"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly">
      </user-tree> -->
    </div>
</template>

<script>
import approveForProject from '@Main/approve/approveForProject.vue'
import taskDetail from '@Main/task/components/task.detail.vue'
import projectTopSearch from '@Main/task/components/task.forProject.topSearch.vue'
import taskList from '@Main/task/task.forProject.vue'
import taskRightModal from '@Main/task/components/task.rightModal.vue'



import flowForm from "@/containers/main/flowForm/client"



import { getTaskList } from '@Main/task/getData'


    export default{
      components:{
        approveForProject,
        taskDetail,
        projectTopSearch,
        taskList,
        taskRightModal,


        flowForm,

      },
        data(){
            return {
            
                //调用任务模块的首页，给项目模块用
                taskId:'eab34970c149403a9d1d466516bec619',
                // projectId:'10098',//项目id，例子
                projectId:'100052',//项目id，例子
                options: [{
                  value: '1',
                  label: '黄金糕'
                }, {
                  value: '2',
                  label: '双皮奶'
                }, {
                  value: '3',
                  label: '蚵仔煎'
                }, {
                  value: '4',
                  label: '龙须面'
                }, {
                  value: '5',
                  label: '北京烤鸭'
                }],
                value: '',



                //用户树-开始
                filterDataUrl:{
                  host:'GLOBAL.YANG_NING',
                  type:'get',
                  url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectId/10098'
                },//过滤数据源，获取data的接口
                
                //单选还是多选设置
                enableCheckedMultipleUser:true,//false单选，true多选（默认是多选，此种模式可不传递此参数）
                showInsideOutsideTabs:true,//显示内、外部，false:只显示‘人员’，其他逻辑无差异

                /*1棵树*/
                showUserTreeOnly:false,
                showUserOnly:[{//审批人：用户tree
                    // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
                    sid:'1000',
                    name:'创建者'

                }],

            }
        },
        methods:{
          //用户树-开始
          /*1棵树*/

          //接收用户树组件的返回值
          getUserTreeOnly:function(obj){
            this.showUserOnly = [...obj]
          },
          //删除用户tag的事件
          deleteUserOnly(sid) {
              this.showUserOnly = this.showUserOnly.filter(function(item) {
                return item.sid != sid;
              });
          },


          




          //调用任务模块的首页，给项目模块用

            //模式切换
            changeUrl( val ){
              console.info(val)
            },
            //创建任务，打开右侧弹出窗
            createTask(type) {
              this.$refs.taskList.createTask(type)
            },
            //查询任务
            searchTaskList(obj){
              this.$refs.taskList.searchTaskList(obj)
            },
            //接收任务模块返回的任务list总数
            getPageTotal1:function(num){ 
              console.log(num)
              this.num = num
            },


        },
        mounted(){
        },
    }
</script>
<style lang="scss">
    @import "src/containers/main/task/task.scss"; //加载整个任务项目的公共样式
    @import "src/containers/main/approve/approve.scss"; //加载整个审批的公共样式
</style>
<style scoped lang="scss">
.task_wrap{
  .project_select{
    display:inline-block;
  }
}
</style>