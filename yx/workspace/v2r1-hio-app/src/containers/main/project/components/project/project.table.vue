<template>
    <div class="project">
        <el-table
                ref="sorttable"
                class="project-table"
                :data="data.list"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="secondColumnCenter"
                :cell-style="secondColumnCenter"
                :row-class-name="hoverShowStar"
                @sort-change = "sortTableList">
            <el-table-column
                    prop="projectName"
                    label="项目名称"
                    min-width="200"
                    show-overflow-tooltip
            >
                <template slot-scope="scope" style="text-align: left">
                    <router-link class="" :to="'/project/' + moduleName +'/details/'+ scope.row.sid+ '?fromPage='+moduleName  ">
                        {{scope.row.projectName}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectProgressBar"
                    label="进度"
                    width="160"
                    sortable>
                <template slot-scope="scope">
                    <el-progress :percentage="scope.row.projectProgressBar"></el-progress>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectStart"
                    label="开始时间"
                    sortable="custom"
                    min-width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="projectEnd"
                    label="计划完成时间"
                    min-width="120"
                    sortable="custom">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="updateDate"-->
                    <!--label="更新时间"-->
                    <!--sortable="custom">-->
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.updateDate |time}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="projectLevel"
                    label="紧急程度"
                    min-width="100"
                    sortable="custom">
                <template slot-scope="scope">
                    {{scope.row.projectLevel |level}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectStatus"
                    label="状态"
                    min-width="70"
                    sortable="custom">
                <template slot-scope="scope">
                    {{scope.row.projectStatus | state}}
                </template>
            </el-table-column>
            <el-table-column
                    width="60"
                    v-if="showConcern"
            >
                <template slot-scope="scope">
                    <span class="concerned" @click="setProjectFollow(scope.$index, scope.row)">
                    <i class="el-icon-star-on orange" v-if="!!+scope.row.concern"></i>
                    <i class="el-icon-star-off orange" v-else="!!+scope.row.concern"></i>
                </span>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
                <el-pagination
                        v-if="+dataTotal"
                        class="pagination"
                        :current-page="pageNum"
                        :page-size="pageCount"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="dataTotal"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                </el-pagination>
    </div>
</template>
<script>

    //数据接口文件
    import { getProjectFollow } from '@Main/project/getData'
    import moment from 'moment'
    export default {
        components: {

        },
        data() {
           return {
               pageTotal: this.data.pageTotal || 1,   //总页数
               pageNum: this.data.pageNum || 1,      //当前页数
               pageCount: this.data.pageCount || 10, //分页大小,每页多少条
               dataTotal: this.data.total || 1,   //数据总条数
           }
        },
        props: {
            //来自于哪个栏目
            moduleName: {
                type: String,
                default:''
            },
            showConcern:{
                type: Boolean,
                default:true
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
        methods: {
            resetSort(){
                this.$refs.sorttable.clearSort();
            },
            secondColumnCenter(obj){
//                console.log(obj,"objobjobjobjobj")
                if(obj.columnIndex!=1){
//                    console.log("'text-align':'left'")
                    return {'text-align':'left'}
                }else{
//                    console.log("'text-align':'center'")
                    return {'text-align':'center'}
                }
            },
            //渲染table中已关注的项目，星一直显示
            hoverShowStar:function(obj){
//                 console.info(!!+obj.row.concern)
                if (!!+obj.row.concern) {
                    return 'concernedStar'
                }else{
                    return 'noConcern'
                }
            },
            //关注项目
            async setProjectFollow(index,row){
                let page = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount
                }
//                console.log("关注啊啊")
                if (!+row.concern) {//关注
                    let res = await getProjectFollow(row.sid)
//                    console.info(res)
                        row.concern = "1"
                        this.$message('关注成功')
                        if (this.moduleName == 'follow') {//关注模块需要刷新table
                            this.$emit('refleshTable',page)
                        }

                }else{//取消关注
                    let res = await getProjectFollow(row.sid)
//                    console.info([0])
                        row.concern = "0"
                        this.$message('取消关注成功')
                        if (this.moduleName == 'follow') {//关注模块需要刷新table
                            this.$emit('refleshTable',page)
                        }

                }
//                console.info(row.isfollow)
            },
            //后端排序   列名 ASC/DESC,列名 ASC/DESC
            sortTableList(obj){
                console.log(obj.prop);
                let orderby = ''
                if(obj.prop){
                     orderby = obj.prop + ' ' + (obj.order == 'ascending' ? 'asc':'desc')
                }

                this.$emit('sortProjectList',orderby)
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
//
               this.pageCount = val
                const page = {
                    pageNum:this.pageNum.toString(),
                    pageCount:this.pageCount
                }
                this.$emit('refleshTable',page)
            },
            //分页
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.pageNum = val
                const page = {
                    pageNum:this.pageNum.toString(),
                    pageCount:this.pageCount
                }
//                console.info(page)
                this.$emit('refleshTable',page)
            },
        },
        watch:{
            data:{
                handler(newValue, oldValue) {
                    this.pageTotal = newValue.pageTotal //总页数
                    this.pageNum = newValue.pageNum //当前页数
                    this.pageCount = newValue.pageCount  //分页大小,每页多少条
                    this.dataTotal = newValue.total //数据总条数
                },
                deep: true
            }
        },
        filters:{
            level (value){
                //项目等级：0正常、1紧急、2非常紧急
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
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
            time (value){
                return moment(value).format('YYYY-MM-DD')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .project{
        .project-table {
            .concerned{
                text-align:center;
                /*visibility: hidden;*/
                i{
                    font-size:18px;
                    &:hover{
                        cursor:pointer;
                    }
                }
            }
            .noConcern{
                .concerned{
                    visibility: hidden;
                }
            }
            .noConcern:hover{
                .concerned{
                    visibility: visible;
                }
            }
            /*.noConcern{*/
                /*.concerned{*/
                    /*text-align:center;*/
                    /*i{*/
                        /*!*visibility: hidden;*!*/
                        /*font-size:18px;*/
                        /*&:hover{*/
                            /*!*visibility: visible;*!*/
                            /*cursor:pointer;*/
                        /*}*/
                    /*}*/
                /*}*/
            /*}*/
            /*.el-table--enable-row-hover .el-table__body tr.noConcern{*/

                /*.concerned{*/
                    /*visibility: hidden;*/
                /*}*/
                /*&:hover>td .concerned{*/
                    /*visibility: visible;*/
                /*}*/
            /*}*/
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
                        .icon_yuan{
                            width: 22px;
                            height: 22px;
                            line-height: 22px;
                            /*text-align: center;*/
                            border-radius: 50%;
                            display: inline-block;
                            color:#fff;
                            &.bg_0{
                                background-color:#f00;
                            }
                            &.bg_1{
                                background-color:#fc0;
                            }
                            &.bg_2{
                                background-color:#45a7fe;
                            }
                            &.bg_3{
                                background-color:#7ed321;
                            }
                            &.bg_4{
                                background-color:pink;
                            }
                            &.bg_5{
                                background-color:#ff5800;
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
        .pagination{
            float: right;
            height: 40px;
            padding: 20PX;
        }
    }


</style>
