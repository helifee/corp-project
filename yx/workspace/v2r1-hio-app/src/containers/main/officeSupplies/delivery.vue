<template>
    <div class="wrap">
        <h3>物品出库</h3>
        <el-button class="new-storage" @click="showDeliveryDialog" size = "small" type="primary"><span class="el-icon-plus"></span>新建出库</el-button>
        <div>
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm"  ref="searchForm" style="padding-left: 22px">
                <el-form-item label="出库主题" prop="theme" >
                    <el-input size="small" clearable  v-model="searchForm.theme" placeholder="请输入出库主题"></el-input>
                </el-form-item>
                <el-form-item label="领用人" prop="theme" >
                    <el-input size="small" clearable  v-model="searchForm.getUserPersonName" placeholder="请输入领用人"></el-input>
                </el-form-item>
                <el-form-item prop="timeRange" label="出库时间">
                    <el-date-picker
                            size="small"
                            v-model="searchForm.timeRange"
                            type="daterange"
                            :picker-options="searchForm.timeRange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            clearable
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="float: right;margin-right: 24px">
                    <el-button type="primary" size="small" @click="search">查 询</el-button>
                    <el-button size="small" @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
            <!--检索结果-->
            <div class="result" v-loading="loading">
                <el-table
                        ref="sorttable"
                        :data="resultData"
                        @sort-change = "sortTableList"
                        style="width: 100%">
                    <el-table-column
                            prop="theme"
                            label="出库主题"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <router-link class="" :to="'/office/delivery/detail/' + scope.row.sid +'?fromPage=delivery'">
                            {{scope.row.theme}}
                        </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="出库单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="getUserPersonName"
                            label="领用人">
                        <template slot-scope="scope">
                            {{scope.row.getUserPersonName || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="outPersonName"
                            label="出库人">
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            sortable="custom"
                            label="出库时间">
                    </el-table-column>
                </el-table>
                <el-row class="row-bg page" justify="center" v-if="+dataTotal">
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
        </div>

        <!--新建入库弹窗-->
        <dialog-delivery :choose-goods-data="chooseGoodsData" :dialog-visible="deliveryDialogVisible" @refreshData="refreshData" @showGoodsModal="showGoodsDialog" @closeCreateModal="closeDeliveryDialog"></dialog-delivery>

        <!--选择物品的弹窗-->
        <dialog-choose-goods  class="goods" title="选择出库物品" :dialog-visible="goodsDialogVisible"  @chooseGoodsHandle="chooseDataDia" @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
    </div>
</template>

<script>
    JZY.locale.add('officeLocale',require('./office.locale'))
    import dialogDelivery from '@Main/officeSupplies/components/delivery/dialog.delivery.vue'
    import dialogChooseGoods from '@Main/officeSupplies/components/dialog.chooseGoods.vue'
    import {postGoodsOutList} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
            dialogDelivery,
            dialogChooseGoods,
        },
        methods:{
            //新建出库弹窗
            showDeliveryDialog (){
                this.deliveryDialogVisible = true;
            },
            closeDeliveryDialog (){
                this.deliveryDialogVisible = false;
            },

            //选择物品的弹窗
            showGoodsDialog(){
                this.goodsDialogVisible = true;
            },
            closeGoodsDialog(){
                this.goodsDialogVisible = false;
            },



            refreshData(){
                this.loading=true;
                this.rqGoodsQueryList();
            },


            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$refs.sorttable.clearSort();
                this.orderby = 'createDate desc';
                this.searchForm.theme = '';
                this.searchForm.getUserPersonName = '';
                this.searchForm.timeRange = '';
                this.searchValue.theme = '';
                this.searchValue.getUserPersonName = '';
                this.searchValue.timeRange = '';
                this.loading=true;
                this.rqGoodsQueryList();
            },
            search (){
                this.searchValue.theme = this.searchForm.theme;
                this.searchValue.getUserPersonName = this.searchForm.getUserPersonName;
                this.searchValue.timeRange = this.searchForm.timeRange;
                this.loading=true;
                this.rqGoodsQueryList();
            },
            sortTableList(obj){
                let orderby = obj.prop + ' ' + (obj.order == 'ascending' ? 'asc':'desc')
                this.orderby = orderby;
                this.loading=true;
                this.rqGoodsQueryList();
            },
            //分页
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
                this.pageCount = val;
                this.loading=true;
                this.rqGoodsQueryList()
            },
            //分页
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.pageNum = val;
                const page = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount
                };
                this.loading=true;
                this.rqGoodsQueryList()
            },


            //获取从弹窗选择的物品
            chooseDataDia (val){
//                console.log(val,"val");
                this.chooseGoodsData = [...val];
            },

            async rqGoodsQueryList( {theme = this.searchValue.theme ,getUserPersonName=this.searchValue.getUserPersonName,createDate = this.searchValue.timeRange,orderBy = this.orderby,pageNum=this.pageNum,pageCount=this.pageCount } = {}){
                let res = await postGoodsOutList(theme,getUserPersonName,createDate,orderBy,pageNum,pageCount);
                let resData = res[0];
                this.resultData = [...resData.list];
                this.pageTotal=resData.pageTotal;
                this.pageNum=resData.pageNum;
                this.pageCount=resData.pageCount;
                this.dataTotal=resData.total;
                this.loading=false;
            },

        },
        data(){
            return {
                loading:true,
                searchForm:{
                    theme:'',
                    getUserPersonName:'',
                    timeRange:'',
                },
                searchValue:{
                    theme:'',
                    getUserPersonName:'',
                    timeRange:'',
                },
                resultData:[],
                deliveryDialogVisible:false,
                goodsDialogVisible:false,
                showDetailId:'',
                chooseGoodsData:[], //选择的物品列表
                pageTotal:1,   //总页数
                pageNum:1,      //当前页数
                pageCount: 10, //分页大小,每页多少条
                dataTotal:  1,   //数据总条数
                orderby:'createDate desc',
            }
        },
        mounted (){
            //出库列表
            this.loading=true;
            this.rqGoodsQueryList();
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        height: 100%;
        overflow-y: auto;
        position: relative;
        .new-storage{
            position: absolute;
            right: 24px;
            top:16px;
        }
        h3{
            line-height: 64px;
            font-size: 14px;
            font-weight: normal;
            color: #191919;
            padding: 0 0 0 24px;
            margin: 0 0 8px 0;
        }
        .result{
            min-height: 450px;
            padding: 0 24px 16px 24px;
        }
        .information{
            background-color: #666666;
            position: relative;
            .add{
                position: absolute;
                right: 24px;
                top:10px;
                color: #409EFF;
                font-size: 30px;
                z-index: 5;
                cursor: pointer;
            }
        }
        .row-bg{
            height: 100px;
            margin-top: 30px;
            margin-bottom: 30px;
            float: right;
        }
    }
</style>

