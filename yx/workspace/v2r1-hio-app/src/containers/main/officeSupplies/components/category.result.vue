<template>
    <div class="category-result">
        <span>{{l('{officeLocale.goods.otherButtons.currentCategory}')+':'}}</span>
        <el-breadcrumb separator-class="el-icon-arrow-right"class="nav" >
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.sid">{{item.typeName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<el-autocomplete-->
                <!--class="search-val"-->
                <!--v-model="searchVal"-->
                <!--:fetch-suggestions="getRestaurantsList"-->
                <!--:placeholder="l('{officeLocale.goods.otherButtons.placeholder}')"-->
                <!--@select="handleSelect"-->
        <!--&gt;-->
        <!--</el-autocomplete>-->
            <el-input placeholder="请输入物品名称" clearable  v-model="searchVal" size="small" @change="search" class="input-with-select">
                <el-button slot="append" @click="search" size="small" icon="el-icon-search"></el-button>
            </el-input>
            <!--<el-button slot="append" @click="search" icon="el-icon-search"></el-button>-->
        <div class="category-auto" style="overflow-y: auto">
            <el-table
                    :data="tableData"
                    :row-class-name="tableRowClassName"
                    style="width: 100%">
                <el-table-column
                        prop="stockNum"
                        :label="l('{officeLocale.goods.detail.number}')"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="cursor: pointer" @click="showDetailCategory(scope.row.sid)">{{scope.row.stockNum}}</span>
                    </template>
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
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <div>
                            <i style="cursor: pointer" class="el-icon-edit" @click="editDetailCategory(scope.row.sid,scope.row.parentId)"></i>&nbsp;&nbsp;
                            <span style="cursor: pointer" @click="disableGood(scope.row.sid,scope.$index,scope.row.stockCount)" v-if="+scope.row.state"><icon class="disable-icon" name="disable-icon" scale = "1.7"  ></icon></span>
                            <span style="cursor: pointer" @click="enableGood(scope.row.sid,scope.$index)"  v-else><icon class="enable-icon" name="enable-icon" scale = "1.7"  ></icon></span>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="pagination-wrap">
                <el-pagination
                        v-show="dataTotal"
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
        </div>

    </div>
</template>

<script>
    import {postOfficeHouseQueryList,putOfficeInfoEnableOrNot} from '@Main/officeSupplies/getData.js'
    export default{
        components:{

        },
        props:["id","breadcrumb","randomNum"],
        computed:{
            breadcrumbList: {
                get:function(){
                    return this.breadcrumb;
                },
                set:function (newValue) {
                    return  newValue;
                }
            }
        },
        methods:{
            tableRowClassName({row, rowIndex}){
                if (+row.state) {
                    return '';
                }else{
                    return 'disable-goods';
                }

            },
            showDetailCategory(id){
                this.$emit("showCreateModal",id);
                console.log(id)
            },
            editDetailCategory(id){
                this.$emit("showEditModal",id);
            },
            handleSelect(item) {
                console.log(item.stockName,item.sid,"更新tableData");
                this.stockName = item.stockName;
                this.pageNum = 1;
                this.rqHouseQueryList({houseId:this.houseId,stockName:this.stockName,pageNum:this.pageNum,pageCount:this.pageCount});
            },
            search(){
                console.log("this.searchVal",this.searchVal)
                this.stockName = this.searchVal;
//                this.searchVal = '';
                this.pageNum = 1;
                this.loading = true;
                this.rqHouseQueryList({'houseId':this.houseId,'stockName':this.stockName,'pageNum':this.pageNum,'pageCount':this.pageCount})
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageCount = val;
                this.loading = true;
                this.rqHouseQueryList({houseId:this.houseId,stockName:this.stockName,pageNum:this.pageNum,pageCount:this.pageCount});
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                const page = {
                    pageNum:this.pageNum.toString(),
                    pageCount:this.pageCount
                };
                this.loading = true;
                this.rqHouseQueryList({'houseId':this.houseId,'stockName':this.stockName,'pageNum':this.pageNum,'pageCount':this.pageCount});
            },
            //搜索物品
            async getRestaurantsList(queryString, cb){
                let stockName =this.searchVal.trim();
                this.stockName = stockName;
                let res = await postOfficeHouseQueryList ('stockName',this.houseId,stockName,"","1","500",'1');
                let resData = res[0].list;
                if(resData.length){
                    for(let i of resData){
                        i.value = i.stockName;  //将stockName作为value
                    }
                }
                this.restaurants = [...resData];
                let restaurants = this.restaurants;
                cb(restaurants);
            },
            //获取用品列表数据
            async rqHouseQueryList({fuzzy='',houseId='',stockName='',state='',pageNum='',pageCount=''}={}){
                let res = await postOfficeHouseQueryList (fuzzy,houseId,stockName,state,pageNum,pageCount,'1');
                this.tableData = res[0].list;
                this.pageTotal=res[0].pageTotal;
                this.pageNum=res[0].pageNum;
                this.pageCount=res[0].pageCount;
                this.dataTotal=res[0].total;
                console.log(res[0],'列表的数据');
                this.loading = false;
                return res;

            },

            disableGood(id,index,stockCount){
                if(stockCount>0){
//                    该物品库存不为0，不能禁用
                    this.$message({
                        type: 'warning',
                        message: '该物品库存不为0，不能禁用'
                    });
                }else{
                    const h = this.$createElement;
                    this.$confirm('物品禁用后将不能入库和出库', {
                        title: '物品禁用',
                        message: h('p', null, [
                            h('span', { style: 'color: red' }, '物品禁用后将不能入库和出库')
                        ]),
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        this.disableHanlder(id,index);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }




            },

            enableGood(id,index){
                const h = this.$createElement;
                this.$confirm('物品启用后将恢复物品的使用', {
                    title: '物品启用',
                    message: h('p', null, [
                        h('span', { style: 'color: red' }, '物品启用后将恢复物品的使用')
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading=true;
                    this.enableHanlder(id,index);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },

            //  启用禁用
            async disableHanlder(id,index){
              let res = await  putOfficeInfoEnableOrNot(id,{"state":"0"});
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.tableData[index].state = "0";
                    this.rqHouseQueryList({'houseId':this.houseId,'stockName':'','pageNum':this.pageNum,'pageCount':this.pageCount});
            },
            async enableHanlder(id,index){
                let res = await putOfficeInfoEnableOrNot(id,{"state":"1"});
                if(res){
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.tableData[index].state = "1";
                    this.rqHouseQueryList({'houseId':this.houseId,'stockName':'','pageNum':this.pageNum,'pageCount':this.pageCount});
                }
            },

        },
        data(){
            return {
                loading:false,
                tableData:[],
                searchVal:'',
                restaurants:'',
                houseId:'',
                stockName:'',
                pageTotal:0,   //总页数
                pageNum:1,      //当前页数
                pageCount: 10, //分页大小,每页多少条
                dataTotal:  0,   //数据总条数
            }
        },
        watch:{
            breadcrumbList:{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler(curVal,oldVal){
                    let len = curVal.length;
                    let houseId = curVal[len-1].sid;
                    this.houseId=houseId;
                    this.stockName = '';
                    this.searchVal = '';
                    this.pageNum = 1;
                    this.rqHouseQueryList({'houseId':houseId,'stockName':'','pageNum':this.pageNum,'pageCount':this.pageCount});
                },
                deep:true
            },
            id:{
                handler(curVal,oldVal){
                    this.houseId=curVal;
                    this.stockName = '';
                    this.searchVal = '';
                    this.pageNum = 1;
                    this.rqHouseQueryList({'houseId':curVal,'stockName':'','pageNum':this.pageNum,'pageCount':this.pageCount})
                },
            },
            randomNum:{
                handler(randomNum,oldVal){
                    this.stockName = '';
                    this.searchVal = '';
                    this.pageNum = 1;
                    this.rqHouseQueryList({'houseId':this.houseId,'stockName':'','pageNum':this.pageNum,'pageCount':this.pageCount})
                },
            }
        },
        mounted (){
            let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
//            console.log(clientHeight);
            $(".category-auto").css({height:clientHeight-210+"px"});
            let $$ = $;
            $(window).resize(function() {
                //clientHeight是网页在浏览器中的可视高度，
                let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                $$(".category-auto").css({height:clientHeight-210+"px"});
            });
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .category-result{
        min-height: 450px;
        margin-left: 366px;
        padding-top: 16px;
        padding-right: 24px;
        &>span{
            line-height: 32px;
            vertical-align: middle;
        }
        .search-val{
            display: block;
        }
        .nav{
            display: inline-block;
            line-height: 32px;
            vertical-align: middle;
        }
        .input-with-select{
            margin-bottom: 16px;
        }
        .pagination-wrap{
            height: 40px;
            margin-top: 22px;
            .pagination{
                float: right;
            }
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .category-result{
        .disable-goods {
            td{
                color:rgb(188, 188, 188);
            }
        }
        .el-icon-edit{
              cursor: pointer;
              font-size: 14px;
              color: $theme-blue;
          }
        .disable-icon,.enable-icon{
            cursor: pointer;
            color:$theme-blue;
            margin-bottom: -4px
        }
        .el-icon-edit:hover.disable-icon:hover,.enable-icon:hover{
            color: $theme-blue-active;
        }
    }

</style>
