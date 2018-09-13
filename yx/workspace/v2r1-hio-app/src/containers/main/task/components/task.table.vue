<template>
  <div class="task task_table">
      <el-table ref="multipleTable"
        :data="data.list"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="secondColumnCenter"
        :cell-style="secondColumnCenter"
        :row-class-name="hoverShowStar"
        highlight-current-row
        @sort-change = "sortTableList">
        <!-- <el-table-column type="index" width="50"></el-table-column> -->
        <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip min-width="320">
            <template slot-scope="scope">
                <span class="icon_yuan" v-if="scope.row.isUpdate === false" style="background-color:#46A7FF">项</span>
                <router-link class="task_detail_panel" :to="'/task/detail/' + scope.row.taskId +'?fromPage='+moduleName ">{{ scope.row.taskName}}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="taskProgress" label="进度" width="200" sortable="custom">
            <template slot-scope="scope">
                <el-progress :percentage="scope.row.taskProgress"></el-progress>
            </template>
        </el-table-column>
        <el-table-column prop="endDate" label="到期日" width="170"  sortable="custom">
            <template slot-scope="scope">
                <!-- <span :style="formatEendDate(scope.row.endDate)">{{ scope.row.endDate | formatEendDateByMoment }} -->
                {{ scope.row.endDate | formatEendDateByMoment }}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="taskUrgentFlag" label="紧急程度" width="120"  sortable="custom">
            <template slot-scope="scope">
                {{scope.row.taskUrgentFlag | level}}
            </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" width="120"  sortable="custom">
            <template slot-scope="scope">
                {{scope.row.taskStatus | state}}
            </template>
        </el-table-column>
        <el-table-column prop="taskLiableName" label="负责人" width="100">
            <template slot-scope="scope">
                <span :title="scope.row.taskLiableName">{{ scope.row.taskLiableName }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="isfollow" label="" width="50" v-if="moduleName!=='set'">
            <template slot-scope="scope">
                <span class="concerned" @click="setTaskFollow(scope.$index, scope.row)">
                    <i class="el-icon-star-on orange" v-if="scope.row.isfollow"></i>
                    <i class="el-icon-star-off orange" v-else="scope.row.isfollow"></i>
                </span>
            </template>
        </el-table-column>
      </el-table>
      <!--分页-->
        <el-row class="row-bg page" justify="center">
            <el-col :span="12">
                <el-pagination
                    v-if="dataTotal"
                    :current-page="pageNum"
                    :page-size="pageCount"
                    :page-sizes="[10, 20, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataTotal"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
                <div >
                <!-- <h1>pageTotal  {{pageTotal}}</h1>

                <h1>current-page  {{pageNum}}</h1>

                <h1>page-size   {{pageCount}}</h1>

                <h1>total   {{dataTotal}}</h1> -->
                </div>
            </el-col>
        </el-row>
  </div>
</template>
<script>

import moment from 'moment'
//数据接口文件
import { setFollow,setCancelFollow } from '@Main/task/getData'

  let now = new Date;//获取当前时间
  export default {
    data() {
      return {
        pageTotal: 1,   //总页数
        pageNum:  1,      //当前页数
        pageCount: 10, //分页大小,每页多少条
        dataTotal: 0,   //数据总条数
      }
    },
    props:{
        //来自于哪个栏目
        moduleName: {
            type: String,
            default:'task'
        },
        data:{
            type:Object,
            default:function(){
                return {
                    total:0,
                    pageTotal:0,
                    pageNum:1,
                    pageCount:10,
                    list:[]
                }
            }
        }
    },
    computed: {
        
    },
    filters:{
        level (value){
            //任务等级：0正常、1紧急、2非常紧急
            switch (value) {
                case '0':
                    return '正常';
                case '1':
                    return '紧急';
                case '2':
                    return '非常紧急';
                default:
                    return '--';
            }
        },
        state (value){
            //任务状态 ：0未完成、1已完成、2已关闭、3超期
            switch (value) {
                case '0':
                    return '未完成';
                case '1':
                    return '已完成';
                case '2':
                    return '已关闭';
                case '3':
                    return '超期';
                default:
                    return '--';
            }
        },
        formatEendDateByMoment (value){
            return moment(value).format("YYYY-MM-DD")
        },
    },
    methods: {
        //处理table中已过期的时间，加红
        formatEendDate: function (date) {
            let endDate = new Date(date);//格式化到期时间
            if (now > endDate) {
                return "color:red"
            } else{
                return ""
            }
        },
        //渲染table中已关注的任务，星一直显示
        hoverShowStar:function(obj){
            // console.info(obj)
            if (obj.row.isfollow == true) {
                return 'concernedStar'
            }else{
                return 'noConcern'
            }
        },
        //
        secondColumnCenter(obj){
            if(obj.columnIndex==0){
                return {'text-align':'left'}
            }else{
                return {'text-align':'center'}
            }
        },
        //关注任务
        async setTaskFollow(index,row){
            const page = {
                pageNum:this.pageNum,
                pageCount:this.pageCount
            }
            if (row.isfollow == false) {//关注
                let res = await setFollow(row.taskId)
                console.info(res[0])
                if (res[0] == 1 ) {
                    row.isfollow = true
                    this.$message('关注成功')
                    if (this.moduleName == 'concern') {//关注模块需要刷新table
                        this.$emit('refleshTable',page)
                    }
                }
            }else{//取消关注
                let res = await setCancelFollow(row.taskId)
                console.info(res[0])
                if (res[0] == 1 ) {
                    row.isfollow = false
                    this.$message('取消关注成功')
                    if (this.moduleName == 'concern') {//关注模块需要刷新table
                        this.$emit('refleshTable',page)
                    }
                }
            }
            console.info(row.isfollow)
        },
        //后端排序
        sortTableList(obj){
            // console.info("obj.prop",obj.prop)
            if (obj.prop && this.moduleName == 'taskForProject') {//项目中的任务，排序规则非空
                let orderby = 'c.'+obj.prop + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                this.$emit('sortTaskList',orderby)
            }else{
                // debugger
                let orderProp = 'create_date'

                if(obj.prop){
                    orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                }

                let prefix = ''
                if( this.moduleName == 'task' || this.moduleName =='own'){
                    prefix = ''
                }else if( this.moduleName == 'join' || this.moduleName == 'concern' ){
                    prefix = 'a.'
                }else if( this.moduleName == 'share' ){
                    prefix = 'c.'
                }


                let orderby = prefix+orderProp + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                this.$emit('sortTaskList',orderby)
            }
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            console.info(typeof val)
            this.pageCount = val
            const page = {
                pageNum:this.pageNum.toString(),
                pageCount:this.pageCount
            }
            this.$emit('refleshTable',page)
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            console.info(typeof val)
            this.pageNum = val
            const page = {
                pageNum:this.pageNum.toString(),
                pageCount:this.pageCount
            }
            console.info(page)
            this.$emit('refleshTable',page)
        },
    },
    mounted(){
        console.info(this.data)
    },
    watch:{
        data:{
    　　　　handler(newValue, oldValue) {
                // console.info(oldValue)
                console.info("newValue",newValue)
                // if (Object.keys(newValue).length > 0) {
                    this.pageTotal = newValue.pageTotal //总页数
                    this.pageNum = newValue.pageNum //当前页数
                    this.pageCount = newValue.pageCount  //分页大小,每页多少条
                    this.dataTotal = newValue.total //数据总条数
                // }
                
    　　　　},
    　　　　deep: true
        }
    }
  }
</script>
<style lang="scss">
.task.task_table{
    .el-table{
        tbody{
            td{
                .cell{
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.task.task_table{
    .concerned{
        text-align:center;
        // visibility: hidden;
        i{
            font-size:18px;
            &:hover{
                cursor:pointer;
            }
        }
    }
    .noConcern{
        .concerned{
            text-align:center;
            i{
                font-size:18px;
                &:hover{
                    visibility: visible;
                    cursor:pointer;
                }
            }
        }
    }
    .icon_yuan{
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        display: inline-block;
        color:#fff;
    }
    .el-table--enable-row-hover .el-table__body tr.noConcern{
        .concerned{
            visibility: hidden;
        }
        &:hover>td .concerned{
        visibility: visible;
        }
    }
    
}
</style>