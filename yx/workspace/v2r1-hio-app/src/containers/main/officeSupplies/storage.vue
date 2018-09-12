<template>
    <div class="wrap">
        <h3>{{l('{officeLocale.menu.storage}')}}</h3>
        <el-button class="new-storage" @click="showStorageDialog" size = "small" type="primary"><span class="el-icon-plus"></span>{{l('{officeLocale.storage.otherButtons.newStorage}')}}</el-button>
        <div>
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm"  ref="searchForm" style="padding-left: 22px">
                <el-form-item label="入库主题" prop="theme" >
                    <el-input size="small" clearable  v-model="searchForm.theme" placeholder="请输入入库主题"></el-input>
                </el-form-item>
                <el-form-item prop="timeRange" label="入库时间">
                    <el-date-picker
                            size="small"
                            clearable
                            v-model="searchForm.timeRange"
                            type="daterange"
                            :picker-options="searchForm.timeRange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="float: right;margin-right: 24px">
                    <el-button size="small" type="primary" @click="search">查 询</el-button>
                    <el-button size="small" @click="resetForm('searchForm')">重 置</el-button>
                </el-form-item>
            </el-form>
            <!--检索结果-->
            <div class="result" v-loading="loading">
                <!--表格-->
                <storage-table
                        ref="sortTable"
                        :data ="tableData"
                        :pageNum="pageNum"
                        :pageCount="pageCount"
                        @sortList = "sortStorageList"
                        @refleshTable = "refleshTable"
                ></storage-table>
            </div>
        </div>

        <!--新建入库弹窗-->
        <dialog-storage :choose-goods-data="chooseGoodsData" :dialog-visible="storageDialogVisible" @refreshData="refreshData" @showGoodsModal="showGoodsDialog" @closeCreateModal="closeStorageDialog"></dialog-storage>
        <!--选择物品的弹窗-->
        <dialog-choose-goods class="goods" title="选择入库物品" :dialog-visible="goodsDialogVisible"  @chooseGoodsHandle="chooseDataDia" @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
    </div>
</template>

<script>
    JZY.locale.add('officeLocale',require('./office.locale'))
    import dialogStorage from '@Main/officeSupplies/components/storage/dialog.storage.vue'
    import dialogChooseGoods from '@Main/officeSupplies/components/dialog.chooseGoods.vue'
    import storageTable from '@Main/officeSupplies/components/storage/storage.table.vue'
    import {postGoodsQueryList} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
            dialogStorage,
            dialogChooseGoods,
            storageTable
        },
        methods:{
            //新建入库弹窗
            showStorageDialog (){
                this.storageDialogVisible = true;
            },
            closeStorageDialog (){
                this.storageDialogVisible = false;
            },

            //选择物品的弹窗
            showGoodsDialog(){
                this.goodsDialogVisible = true;
            },
            closeGoodsDialog(){
                this.goodsDialogVisible = false;
            },
            //获取从弹窗选择的物品
            chooseDataDia (val){
//                console.log(val,"val");
                this.chooseGoodsData = [...val];
            },

            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
//                let theme = this.searchForm.theme;
//                let timeRange = this.searchForm.timeRange;
                this.$refs.sortTable.resetSort();
                this.orderBy = 'createDate desc';
                let obj = {
                    theme:'',
                    timeRange:''
                };
                this.searchForm.timeRange = '';
                this.searchForm.theme = '';
                this.searchValue={...obj};
                this.loading=true;
                this.rqGoodsQueryList();
            },
            //查找
            search (){
                let theme = this.searchForm.theme;
                let timeRange = this.searchForm.timeRange;
                let obj = {
                    theme:theme,
                    timeRange:timeRange
                }
                this.searchValue={...obj};
//                console.log(this.searchValue,"this.searchValuethis.searchValue")
                this.pageNum = 1;
                this.loading=true;
                this.rqGoodsQueryList();
            },
            refreshData(){
                this.loading=true;
                this.rqGoodsQueryList({'orderBy':this.orderBy });
            },

            //刷新table
            refleshTable( { pageNum = '1' ,pageCount='10' } = {} ){
                this.pageNum= pageNum;
                this.pageCount = pageCount;
                this.loading=true;
                this.rqGoodsQueryList( {'orderBy':this.orderBy } )
            },

            //项目列表排序
            sortStorageList(orderBy){
                this.orderBy = orderBy;
                this.loading=true;
                this.rqGoodsQueryList({'orderBy':this.orderBy });
            },

            async rqGoodsQueryList( {theme = this.searchValue.theme ,createDate = this.searchValue.timeRange,orderBy = this.orderBy,pageNum=this.pageNum,pageCount=this.pageCount } = {} ){
//                console.log(theme,createDate,"createDatecreateDate")
                let res = await postGoodsQueryList(theme,createDate,orderBy,pageNum,pageCount);
                if (res[0].list.length != 0) {
                    this.tableData = JZY.u.deepExtend({},res[0])
                }else{
                    this.tableData = {}
                }
                this.loading = false;
            },

//            //请求数据，获取入库列表
//            async rqGoodsQueryList(){
//                let theme = this.searchForm.theme;
////                let beginDate = this.searchForm.timeRange[0];
////                let endDate = this.searchForm.timeRange[1];
//                let res = await postGoodsQueryList(theme,createDate,1,30);
//                let resData = res[0];
//                this.resultData = {...resData};
//            },
        },
        data(){
            return {
                loading:true,
                storageDialogVisible:false, //新建入库弹窗
                goodsDialogVisible:false,  //选择物品弹窗
                showDetailId:'',   //显示详情的id

                searchForm:{
                    theme:'',
                    timeRange:'',
                },//搜索
                searchValue:{
                    theme:'',
                    timeRange:'',
                },
                chooseGoodsData:[], //选择的物品列表
                tableData:{}, //列表数据
                pageNum:"1",
                pageCount:"10",
                orderBy:'createDate desc',
            }
        },
        mounted (){
            this.rqGoodsQueryList();//初始化入库列表
        }
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
}
</style>
<style rel="stylesheet/scss" lang="scss" >
    .goods{
        /*z-index: 99999!important;*/
    }
    .el-dialog__wrapper .goods{
        /*z-index: 99999!important;*/
    }
    .wrap{
        padding-bottom: 60px;
    }
</style>