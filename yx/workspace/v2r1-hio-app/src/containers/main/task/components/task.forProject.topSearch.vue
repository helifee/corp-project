<template>
  <div class="task top_search">
    <!--查询-->
    <el-row class="search">
      <el-col :span="12" id = "inputList-0" style="font-size: 12px">
        {{l('{taskLocale.serchInputLabels}')[0].name}}
        <el-input
                size="small"
          :placeholder="l('{taskLocale.serchInputLabels}')[0].placeholder"
          v-model="inputSearch.taskName"
          clearable>
        </el-input>
      </el-col>
      <!-- <el-col :span="8" id = "inputList-1">
        {{l('{taskLocale.serchInputLabels}')[1].name}}
        <el-select v-model="inputSearch.taskStatus" :placeholder="l('{taskLocale.serchInputLabels}')[1].placeholder"
          >
          <el-option
            v-for="(item,index) in l('{taskLocale.serchInputLabels}')[1].options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col> -->
      <el-col :span="2">
          <el-button  size="small" type="primary" @click="search">
            {{l('{taskLocale.serchInputButtons.search}')}}
          </el-button>
      </el-col>
      <el-col :span="2">
          <el-button  size="small" @click="reset">
            {{l('{taskLocale.serchInputButtons.reset}')}}
          </el-button>
      </el-col>
      <el-col :span="8" v-if="projectPermissionValue">
          <div class="buttons" style="position: absolute;right: 16px;top: -3px;">
              <!--项目调用任务模块时候的插槽-->
              <slot></slot>
              <el-button type="primary" style="margin-left: 8px"  size="small"  @click="createTask" v-if="JZY.s.hasMenuPermisson('task_view','modify')">
                <i class="el-icon-arrow-right el-icon-plus"></i>
                {{l('{taskLocale.createTask.buttonName}')}}
              </el-button>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
    JZY.locale.add('taskLocale',require('../task.locale'))
  export default {
    components: {
    },
    data() {
      return {
        inputSearch:{
          taskName:'',//任务名称
          taskStatus:''//任务状态
        },
      }
    },
    props:{
        moduleName: {
            type: String,
            default:''
        },
        projectPermissionValue:{//是否显示创建按钮
            type: Boolean,
            default:true
        },
    },
    computed: {

    },
    methods: {
        //创建任务
        createTask() {
            this.$emit('openCreateModal', true)
        },
        //搜索
        search(){
          console.info(this.inputSearch)
          this.inputSearch.taskName = this.inputSearch.taskName.trim()
          this.$emit('searchTask', this.inputSearch)
        },
        //重置
        reset(){
          // this.$message("重置成功");
          console.info(this.$data)
          console.info(this.$options)
          Object.assign(this.$data, this.$options.data())
          this.$emit('searchTask', this.inputSearch)
        },
    },
    mounted(){
      // console.info(this.moduleName)
    },
    watch: {
    },
  }
</script>
<style scoped lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.top_search{
  .search .el-input{ width:80% }
}

</style>