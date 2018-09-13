<template>
    <el-dialog
            :title="title"
               @open="initPage"
               :visible.sync.stop="propsDialogVisible"
               class="office-goods-data"
            width="70%"
            min-width="660px"
    >
        <!--检索内容-->
        <el-form :inline="true" :model="searchForm"  ref="searchForm" style="padding-left: 22px">
            <el-form-item label="">

                <!--<cascader-tree v-model="searchForm.houseId" :sid="searchForm.houseId" style="width: 200px" @chooseValue="chooseVal" ></cascader-tree>-->
                <el-cascader
                        size="small"
                        style="width: 200px"
                        expand-trigger="hover"
                        placeholder="搜索类别名称"
                        v-model="cateArr"
                        :options="treeData"
                        :props="propsOption"
                        @change="changeHander"
                        filterable
                        change-on-select
                ></el-cascader>

            </el-form-item>
            <el-form-item>
                <el-input size="small" v-model="searchForm.stockName" placeholder="请输入物品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  size="small" type="primary" @click="search('searchForm')">查询</el-button>
                <el-button  size="small" @click="resetForm('searchForm')">重置</el-button>

            </el-form-item>
        </el-form>
        <el-table
                ref="multipleTable"
                :data="goodsData"
                @selection-change="handleSelectionChange"
                :row-key="getRowKeys"
        >
            <el-table-column
                prop="id"
                type="selection"
                :reserve-selection="true"
                width="55">
            </el-table-column>
            <el-table-column
                    prop="stockName"
                    :label="l('{officeLocale.goods.detail.name}')"
                    width=""
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="typeName"
                    label="类别"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="stockSpecifications"
                    :label="l('{officeLocale.goods.detail.specification}')"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="stockBrand"
                    :label="l('{officeLocale.goods.detail.brand}')"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="meteringUnit"
                    :label="l('{officeLocale.goods.detail.unit}')"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="stockCount"
                    :label="l('{officeLocale.goods.detail.inventory}')"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination
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
        <ul class="operation">
            <li><el-button  type="primary"  @click="confirm">确定</el-button></li>
            <li><el-button @click="operateClose">取消</el-button></li>
        </ul>
    </el-dialog>
</template>

<script>
    import ElButton from "../../../../plugins/element-ui/packages/button/src/button";
    import cascaderTree from '@Main/officeSupplies/components/cascader.tree.vue'
    import {postOfficeHouseQueryList,postOfficeHouseSelectTree} from  '@Main/officeSupplies/getData.js'
    export default{
        components:{
            ElButton,
            cascaderTree
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            title:{

                required:true
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            },
        },
        methods:{
            changeHander(item){
                console.log(item,"Qsqw")
                console.log(item[item.length-1]);
                this.searchForm.houseId = item[item.length-1];

//                this.selectCurrentId = item[0];
            },
            initPage(){
                try{
                    this.$refs.multipleTable.clearSelection();
                }catch(e){}
                this.multipleSelection = [];
                this.selectId = [];
                this.cateArr = [];
                this.searchValue.houseId = '';
                this.searchValue.stockName = '';
                this.pageNum=1;
                this.pageCount=10;
                this.rqGoodsData({houseId:this.searchValue.houseId,stockName:this.searchValue.stockName,pageNum:this.pageNum,pageCount:this.pageCount})
            },
            //取消
            operateClose(){
                this.$refs.multipleTable.clearSelection();
                this.$emit("closeCreateModal");
            },

            //选中
            handleSelectionChange(rows) {

                this.multipleSelection = rows;

                this.selectId = [];
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.selectId.push(row.id);
                        }
                    });
                }
            },

            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageCount = val;
                this.rqGoodsData({houseId:this.houseId,stockName:this.stockName,pageNum:this.pageNum,pageCount:this.pageCount})
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                const page = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount
                };
                this.rqGoodsData({houseId:this.searchValue.houseId,stockName:this.searchValue.stockName,pageNum:this.pageNum,pageCount:this.pageCount})
            },

            toggleSelection() {
//                if (rows) {
//                    rows.forEach(row => {
//                        this.$refs.multipleTable.toggleRowSelection(row);
//                    });
//                } else {
//                    this.$refs.multipleTable.clearSelection();
//                }
            },

            //确定
            confirm (){
//                let that = this
//                this.multipleSelection.forEach(function(item){
//                    that.ids.push({id: item.id})
//                });
                console.log(this.multipleSelection,"this.multipleSelection");
//                console.log(this.ids,"this.ids");
                if(this.multipleSelection.length){
                    this.$emit("chooseGoodsHandle",this.multipleSelection);
                    this.$emit("closeCreateModal");
                }else{
                    this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }

            },
            chooseVal(val){
                this.searchForm.houseId = val.sid;
                console.log(val.typeName,val.sid)
//                this.$set(this.form,"houseId",typeName)
            },
            //
            async rqGoodsData ({fuzzy='',houseId='',stockName='',state='',pageNum='',pageCount=''}={}){
                houseId = this.searchValue.houseId;
                stockName = this.searchValue.stockName;
                let res = await postOfficeHouseQueryList (fuzzy,houseId,stockName,"1",pageNum,pageCount);
                let resData = res[0];
                this.goodsData = [...resData.list];
                this.pageTotal=res[0].pageTotal;
                this.pageNum=res[0].pageNum;
                this.pageCount=res[0].pageCount;
                this.dataTotal=res[0].total;

            },
            //加载
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc",
                    "state":'1'
                };
                let res = await postOfficeHouseSelectTree(queryData);
                this.treeData = res[0];

            },

            //禁用
//            checkboxInit(row,index){
//                let result = 1;
//                if(this.ids.length){
//                   this.ids.map(function (item1) {
//                        if (item1.id == row.id){
//                            console.log(item1.id,"item1.id不可勾选啊啊")
//                            result =  0;
//                            return;
//                        }
//                        if(!result){
//                            return;
//                        }
//                    })
//                }
//                console.log(result,"result")
//                return result;
//
//
//            },
            search (){
                let houseId = this.searchForm.houseId;
                let stockName = this.searchForm.stockName;
                let obj = {
                    houseId:houseId,
                    stockName:stockName
                }
                this.searchValue={...obj};
                this.pageNum = 1;
                this.rqGoodsData({houseId:this.searchValue.houseId,stockName:this.searchValue.stockName,pageNum:this.pageNum,pageCount:this.pageCount})
            },
            //重置表单
            resetForm(formName) {
                this.cateArr = [];
                this.$refs[formName].resetFields();
                this.searchForm.houseId = '';
                this.searchForm.stockName = '';
                this.searchValue.houseId = '';
                this.searchValue.stockName = '';
                this.pageNum = 1;
                console.log(this.houseId);
                this.rqGoodsData({houseId:this.searchValue.houseId,stockName:this.searchValue.stockName,pageNum:this.pageNum,pageCount:this.pageCount})
            },
        },
        data(){
            return {
                propsOption:{
                    children: 'officeHouseList',
                    label: 'typeName',
                    value:'sid',
                },
                cateArr:[],
                treeData:[],


                // 获取row的key值
                getRowKeys(row) {
                    return row.sid;
                },
                goodsData:[],//列表数据
                multipleSelection:[],
                selectId:[],
                searchForm:{
                    houseId:'',
                    stockName:'',
                },
                searchValue:{
                    houseId:'',
                    stockName:'',
                },
                pageTotal:1,   //总页数
                pageNum:1,      //当前页数
                pageCount: 10, //分页大小,每页多少条
                dataTotal:  1,   //数据总条数
            }
        },
        watch:{
        },
        mounted (){
            this.rquireOfficeTree();

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .office-goods-data{
        /*z-index: 99999!important;*/
    }
    .operate_buttons {
        float: right;
    }
    .operation{
        width: 180px;
        height: 60px;
        margin: 30px auto 0;
        li{
            float: left;
            margin-right: 10px;
        }
    }
    .pagination-wrap{
        height: 40px;
        margin-top: 22px;
        .pagination{
            float: right;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    /*.el-select-dropdown .el-popper,.el-cascader-menus*/
    .el-popper{
        z-index:100000!important;
    }
    .el-popper .el-select-dropdown__list, .el-popper .el-cascader-menu{
        width: 195px;
    }
</style>