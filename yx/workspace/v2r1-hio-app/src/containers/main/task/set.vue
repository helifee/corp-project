<template>
    <div class="set task_wrap">
        <!--页头-->
        <el-row class="row-bg title" justify="space-between">
            <el-col :span="12" class="text_left">
              {{l('{taskLocale.menu.set}')}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="bottom_border"></el-col>
        </el-row>
        <!--查询-->
        <el-row class="search">
          <el-col :span="16" id = "inputList-0" style="font-size: 12px">
            {{l('{taskLocale.serchInputLabels}')[0].name}}
            <el-input
                    size="small"
                    :placeholder="l('{taskLocale.serchInputLabels}')[0].placeholder"
                     v-model="inputSearch"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="8">
              <div class="buttons">
                  <el-button type="primary" size="small" @click="search">
                    {{l('{taskLocale.serchInputButtons.search}')}}
                  </el-button>
                  <el-button @click="reset"  size="small">
                    {{l('{taskLocale.serchInputButtons.reset}')}}
                  </el-button>
              </div>
          </el-col>
        </el-row>
        <!--table表格-->
        <el-row  class="table">
          <task-list-table
            :data ="tableData"
            moduleName="set"
            @refleshTable = "refleshTable"
            @sortTaskList = "sortTaskList">
          </task-list-table>
        </el-row>
    </div>
</template>

<script>
    JZY.locale.add("taskLocale", require("./task.locale"));
    import config from "@/config/index.js";
    import taskListTable from '@Main/task/components/task.table.vue'
    import {getAdminTaskList} from '@Main/task/getData'

    export default {
        components: {
            taskListTable,
        },
        data() {
            return {
                inputSearch:'',
                dialogVisible:false,
                tableData:{},
                orderbyTemp:'',//缓存当前的排序规则
            };
        },
        methods: {
            //搜索
            search(){
              this.inputSearch = this.inputSearch.trim()
              this.getAdminTaskListData( {'taskName':this.inputSearch } )
            },
            //重置
            reset(){
              console.info(this.$data)
              console.info(this.$options)
              Object.assign(this.$data, this.$options.data())
              this.refleshTable()
            },
            //获取我创建的任务列表
            async getAdminTaskListData( { taskName = '' ,taskStatus = '' ,pageNum = '1' ,pageCount=10 ,orderby = [] } = {} ){
                let res = await getAdminTaskList( taskName ,taskStatus ,pageNum ,pageCount ,orderby )
                console.info(res[0])
                // this.tableData = [...res[0].list]
                if (res[0].list.length != 0) {
                  this.tableData = JZY.u.deepExtend({},res[0])
                }else{
                  this.tableData = {}
                }
            },
            //任务列表排序
            sortTaskList(orderby){
              // console.log(orderby)
              this.getAdminTaskListData( {'taskName':this.inputSearch,'orderby':[orderby]} )


              this.orderbyTemp = orderby
            },
            //刷新table，刷新右侧导航栏里的条数
            refleshTable( { pageNum = '1' , pageCount=10 } = {} ){
              let orderbyStr = this.orderbyTemp === '' ? []:[this.orderbyTemp]
              this.getAdminTaskListData( { 'taskName':this.inputSearch, 'pageNum':pageNum, 'pageCount':pageCount ,'orderby':orderbyStr } )

            },
        },
        mounted(){
            this.getAdminTaskListData()
        },
    };
</script>

<style scoped lang="scss">
.set.task_wrap {
}
</style>