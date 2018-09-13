<template>
  <div class="approve table">
      <el-table
        ref="multipleTable"
        :data="data.list"
        :row-class-name="hoverShowStar"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%"
        @sort-change = "sortTableList"
        highlight-current-row>
        <!-- <el-table-column type="index" width="50"></el-table-column> -->
        <!-- <el-table-column prop="templateName" :label="l('{approveLocale.tableData.templateName}')" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="templateName" :label="l('{approveLocale.tableData.templateName}')" min-width="350">
            <template slot-scope="scope">
                <!-- {{scope.row.state}}- -->
                <div class="icon_yuan" :class="'bg_'+scope.row.state">{{ scope.row.state < 9 ? l('{approveLocale.tableData.approveState}')[scope.row.state]['name'] : '' }}</div>
                <div class="apprave-detail-panel" >
                <!--我的审批页面的-->
                <router-link v-if="fromPage=='my'" :to="'/approve/detail/' + scope.row.id +'?type='+scope.row.state + '&fromPage='+fromPage + '&tab='+activeTabSession.index " :title="scope.row.templateName">
                    <span class="elbadge_no_dot">{{ scope.row.templateName }}</span>
                </router-link>
                <router-link v-else :to="'/approve/detail/' + scope.row.id +'?type='+scope.row.state + '&fromPage='+fromPage " :title="scope.row.templateName">
                    <span v-if="fromPage === 'shared'" :class="{elbadge : scope.row.isRead == 0 , elbadge_no_dot : scope.row.isRead != 0}">{{ scope.row.templateName }}</span>

                    <span v-else class="elbadge_no_dot">{{ scope.row.templateName }}</span>
                </router-link>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="approvalPersonName" :label="l('{approveLocale.tableData.approvalPerson}')" width="150">
            <template slot-scope="scope">
                <span :title="scope.row.approvalPersonName">{{ scope.row.approvalPersonName || "--- / ---" }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createPersonName" :label="l('{approveLocale.tableData.createPerson}')" width="150">
            <template slot-scope="scope">
                <span :title="scope.row.createPersonName">{{ scope.row.createPersonName }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="startDate" :label="l('{approveLocale.tableData.startDate}')" sortable width="200">
            <template slot-scope="scope">{{ scope.row.startDate }}</template>
        </el-table-column>
        <el-table-column prop="updateDate" :label="l('{approveLocale.tableData.updateDate}')" sortable width="200">
            <!-- <template slot-scope="scope">
                <span :style="formateupdateDate(scope.row.updateDate)">{{ scope.row.updateDate }}</span>
            </template> -->
        </el-table-column>
        <el-table-column prop="isFollow" label="" width="60">
            <template slot-scope="scope">
                <span class="concerned" @click="setFollow(scope.$index, scope.row)">
                    <i class="el-icon-star-on orange" v-if="scope.row.isFollow === 1 || scope.row.isFollow === true"></i>
                    <i class="el-icon-star-off orange" v-else="scope.row.isFollow"></i>
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
            </el-col>
        </el-row>
  </div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  JZY.locale.add('approveLocale',require('../approve.locale'))
  import { setInstanceFollow, } from '@Main/approve/getData'

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
        },
        fromPage: {
            type:String,
            default: 'approve',
            required: true
        },
        loading: {//加载动画
            type:Boolean,
            default: true
        },
        activeTabSession: {//缓存我的审批页面的tab标签
            type:Object,
            default: function(){
                return {
                    name:'all',
                    index:0
                }
            }
        },
    },
    computed: {
        
    },
    filters:{
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //处理table中已过期的时间，加红
        formateupdateDate: function (date) {
            let updateDate = new Date(date);//格式化到期时间
            if (now > updateDate) {
                return "color:red"
            } else{
                return ""
            }
        },
        //渲染table中已关注的任务，星一直显示
        hoverShowStar:function(obj){
            // console.info(obj)
            if (obj.row.isFollow == true) {
                return 'concernedStar'
            }else{
                return 'noConcern'
            }
        },
        //设置关注，isFollow:1关注，0/2取消关注
        async setFollow(index,row){
            const page = {
                pageNum:this.pageNum,
                pageCount:this.pageCount
            }
            let stateCode = 1
            let message = ''
            if(row.isFollow === 1 || row.isFollow === true){
                row.isFollow = false
                message = '成功取消关注'
                stateCode = 2
            }else{
                row.isFollow = true
                stateCode = 1
                message = '关注成功'
            }
            let res = await setInstanceFollow(row.id,stateCode)
            // console.info(res[0])
            this.$message({
                type: 'success',
                message: message
            });

            if (this.fromPage == 'concern') {//关注模块需要刷新table
                this.$emit('refleshTable',page)
            }
        },
        //后端排序
        sortTableList(obj){
            console.info(obj)
            if (obj.prop) {//排序规则非空
                // let orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                let orderby = obj.prop + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                console.info(orderby)
                this.$emit('sortTaskList',orderby)
            }
        },

        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            console.info(typeof val)
            this.pageCount = val
            const page = {
                pageNum:this.pageNum,
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
                pageNum:this.pageNum,
                pageCount:this.pageCount
            }
            console.info(page)
            this.$emit('refleshTable',page)
        },
    },
    updated(){
        // console.info(this.data.list)
        this.$nextTick(function () {
            // alert(89)
        })
    },
    watch:{
        data:{
    　　　　handler(newValue, oldValue) {
                // console.info(oldValue)
                // console.info(newValue)
                console.info(newValue.list)
                this.pageTotal = newValue.pageTotal //总页数
                this.pageNum = newValue.pageNum //当前页数
                this.pageCount = newValue.pageCount  //分页大小,每页多少条
                this.dataTotal = newValue.total //数据总条数
    　　　　},
    　　　　deep: true
        }
    }
  }
</script>

<style lang="scss">
.approve.table{
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
    .el-table--enable-row-hover .el-table__body tr.noConcern{
        .concerned{
            visibility: hidden;
        }
        &:hover>td .concerned{
        visibility: visible;
        }
    }
    .el-table{
        thead{
            line-height: 30px;
            th{
                background-color: #fafaf9;
                font-size: 14px;
                color: #333;
                font-weight: bold;
            }
        }
        tbody{
            td{
                .cell{
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow: ellipsis;
                }
                .apprave-detail-panel{
                    width:calc( 100% - 26px);
                    height:40px;
                    float:left;
                    padding-left:8px;
                    .elbadge_no_dot{
                        width:100%;
                        height:110%;
                        padding-right:10px;
                        display:inline-block;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                        position:relative;
                    }
                    .elbadge{
                        max-width:100%;
                        height:110%;
                        padding-right:10px;
                        display:inline-block;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                        position:relative;
                        &::after{
                            width:6px;
                            height:6px;
                            content:" ";
                            border-radius:50%;
                            background-color:red;
                            position: absolute;
                            right:8px;
                            top:13px;
                        }
                    }
                }
                .icon_yuan{
                    width: 18px;
                    height: 18px;
                    float:left;
                    line-height: 18px;
                    margin-top:11px;
                    text-align: center;
                    border-radius: 50%;
                    display: inline-block;
                    color:#fff;
                    &.bg_0{
                        background-color:#FFECEC;
                    }
                    &.bg_1{
                        background-color:#F9A82E;
                    }
                    &.bg_2{
                        // background-color:#CEE8FF;
                        background-color:#42C891;
                    }
                    &.bg_3{
                        background-color:#F35959;
                    }
                    &.bg_4{
                        background-color:#46A7FF;
                    }
                    &.bg_5{
                        background-color:#BE96F9;
                    }
                    &.bg_6{
                        background-color:#46A7FF;
                    }
                    &.bg_7{
                        background-color:#F35959;
                    }
                    &.bg_8{
                        background-color:#46A7FF;
                    }
                }
                a{
                    color: #606266;
                    &:hover{
                        color:#45a7fe;
                    }
                }

            }
        }
    }
}
</style>