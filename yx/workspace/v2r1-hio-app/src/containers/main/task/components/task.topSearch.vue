<template>
  <div class="task top_search">
    <!--title-->
    <el-row class="row-bg title" justify="space-between">
        <el-col :span="12" class="text_left">
          {{l('{taskLocale.menu.'+moduleName+'}')}}
        </el-col>
        <el-col :span="12" class="text_right">
          <!--项目调用任务模块时候的插槽-->
          <slot></slot>
          <el-button type="primary" size = "small" @click="createTask">
            <i class="el-icon-arrow-right el-icon-plus"></i>
            {{l('{taskLocale.createTask.buttonName}')}}
          </el-button>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!--查询-->
    <el-row class="search">
      <el-col :span="8" id = "inputList-0" style="font-size: 12px">
        {{l('{taskLocale.serchInputLabels}')[0].name}}
        <el-input
          :placeholder="l('{taskLocale.serchInputLabels}')[0].placeholder"
          v-model="inputSearch.taskName"
          size = "small"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="8" id = "inputList-1" style="font-size: 12px">
        {{l('{taskLocale.serchInputLabels}')[1].name}}
        <el-select v-model="inputSearch.taskStatus" :placeholder="l('{taskLocale.serchInputLabels}')[1].placeholder" 
          size = "small"
          clearable
          >
          <el-option
            v-for="(item,index) in l('{taskLocale.serchInputLabels}')[1].options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
          <div class="buttons">
              <el-button type="primary" size = "small" @click="search">
                {{l('{taskLocale.serchInputButtons.search}')}}
              </el-button>
              <el-button size = "small" @click="reset">
                {{l('{taskLocale.serchInputButtons.reset}')}}
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
        }
    },
    computed: {

    },
    mounted(){
      // console.info(this.moduleName)
    },
    filters:{
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //初始化获取数据
        createTask() {
            // this.$emit('openCreateModal', 'saveSuccess')
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
    watch: {
    }
  }
</script>
<style scoped lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.top_search{

}
</style>