<template>
    <div class="project">
        <el-table
                ref="sorttable"
                class="project-table"
                :data="data.list"
                tooltip-effect="dark"
                style="width: 100%"
                highlight-current-row
                @sort-change = "sortTableList">
            <el-table-column
                    prop="theme"
                    :label="l('{officeLocale.storage.search.theme}')"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link class="" :to="'/office/storage/detail/' + scope.row.sid+'?fromPage=storage' ">
                        {{scope.row.theme}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                    prop="code"
                    :label="l('{officeLocale.goods.detail.code}')"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="inPersonName"
                    :label="l('{officeLocale.goods.detail.member}')">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    sortable="custom"
                    :label="l('{officeLocale.goods.detail.time}')">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class="row-bg page" justify="center"  v-if="+dataTotal">
            <el-col :span="12">
                <el-pagination
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
            moduleName: {
                type: String,
                default:''
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
//            secondColumnCenter(obj){
//                if(obj.columnIndex==1){
//                    return {'text-align':'left'}
//                }else{
//                    return {'text-align':'center'}
//                }
//            },

            //后端排序   列名 ASC/DESC,列名 ASC/DESC
            sortTableList(obj){
                let orderby = obj.prop + ' ' + (obj.order == 'ascending' ? 'asc':'desc')
                this.$emit('sortList',orderby)
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
                console.log(`当前页: ${val}`);
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
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .project .project-table{
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
        .concernedStar{
            .concerned{

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

    }
    .row-bg{
        height: 100px;
        margin-top: 30px;
        margin-bottom: 30px;
        float: right;
    }

</style>
