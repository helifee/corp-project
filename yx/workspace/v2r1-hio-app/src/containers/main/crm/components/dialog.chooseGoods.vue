<template>
    <el-dialog title="选择产品" 
    :visible.sync.stop="propsDialogVisible"
    @open="openGoods"
    >
        <!--检索内容-->
        <el-form :inline="true" :model="searchForm" :rules="rules">
            <el-form-item prop="createNodeArr" >
                    <el-cascader style="width:100%;"
                        v-model="searchForm.createNodeArr"
                        :options="classList"
                        :show-all-levels="false"
                        change-on-select
                        placeholder="请选择产品类别"
                        @change="changeHander"
                        :props="propsSelect"
                        >
                    </el-cascader>
                </el-form-item>
            <el-form-item >
                <el-input v-model="searchForm.stockName" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search('searchForm')">查询</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <my-table :tableTitle="tableTitle" 
        :tableData="tableData"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
         :isSelection="true"></my-table>

         <el-row class="row-bg page" justify="center">
                    <el-col :span="12">
                        <el-pagination
                                :current-page="pageNum"
                                :page-size="pageCount"
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-sizes="pageSizes"
                                :total="dataTotal"
                                v-if='dataTotal!=0'
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </el-col>
                </el-row>
        <div style="text-align:center; padding;10px;">
            <el-button @click="confirm">确定</el-button>
            <el-button @click="operateClose">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    

    import ElButton from "../../../../plugins/element-ui/packages/button/src/button";
    import myTable from '@Main/crm/components/table.vue'
    import cService from '@Main/crm/crm_service.js'
//    import cascaderTree from '@Main/officeSupplies/components/cascader.tree.vue'
//    import {postOfficeHouseQueryList} from  '@Main/officeSupplies/getData.js'
    export default{
        components:{
            ElButton,
            myTable
//            cascaderTree
        },
        props:{
            dialogVisible:{
                type:Boolean,
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
                if(item.length == 1){
                    this.currentTreePath.parentId = "";
                    this.currentTreePath.sid = item[0];
                }else if(item.length == 2){
                    this.currentTreePath.parentId = item[0];
                    this.currentTreePath.sid = item[1];
                }
                // this.pageNum = 1;
                // this.reloadTableById({});
            },
            handleSizeChange(val){
                this.pageCount = val;
                this.reloadTableById({}); 
            },
            handleCurrentChange(val){
                this.pageNum = val;
                this.reloadTableById({}); 
            },
            //分类列表
            getClassList(){
                cService.getProductCategory(1).then((data)=>{
                    this.classList = [
                        {
                            name : '请选择产品类别',
                            sid : ""
                        }
                    ];
                    //默认当前选择
                    if(data[0] && data[0].length){
                        this.classList = this.classList.concat(data[0]);
                        let current = this.classList;
                        this.pageNum = 1;
                        this.currentTreePath.parentId = "";
                        this.currentTreePath.sid = "";
                        this.searchForm.createNodeArr = [];
                        this.reloadTableById({});
                        // if(current && current.length){
                        //     let temp = current[0];
                        //     this.currentTreePath.parentId = "";
                        //     this.currentTreePath.sid =  temp.sid;
                        //     this.pageNum = 1;
                        //     this.searchForm.createNodeArr = [this.currentTreePath.sid];
                        //     if(this.currentTreePath.sid){
                        //         this.reloadTableById({});
                        //     }
                        // }
                    }
                    
                    
                });
            },
            openGoods(){
                //初始化数据
                //所有产品
                this.getClassList();
                //选中的
            },
            //取消
            operateClose(){
                this.$emit("closeCreateModal");
                cService.setGoodsList([]);
            },

            //选中
            handleSelectionChange(rows) {
                this.multipleSelection = rows;
                // this.$refs.multipleTable = this.multipleSelection;
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
            reloadTableById (p){ //按分类加载表格
                let param = {
                    pageNum : this.pageNum,
                    pageCount : this.pageCount,
                    productName : this.searchForm.stockName,
                    // cateleveOneId : this.currentTreePath.parentId,
                    // cateLeveTwoId : this.currentTreePath.sid,
                    cateleveOneId : (this.currentTreePath.parentId == "0" || this.currentTreePath.parentId == "") ? this.currentTreePath.sid : this.currentTreePath.parentId,
                    cateLeveTwoId : (this.currentTreePath.parentId == "0" || this.currentTreePath.parentId == "") ? "" : this.currentTreePath.sid
                }
                jQuery.extend(param,p);
                if(this.pageNum == 1){
                    this.tableData = [];
                }
                this.dataTotal = 0;
                cService.getProductByType(param,"other").then((data) =>{
                    if(data[0] && data[0].list && data[0].list.length){
                        let r = data[0];
                        this.tableData = r.list;
                        if(this.tableData && this.tableData.length){
                            for(let i = 0; i<this.tableData.length; i++){
                                this.tableData[i].productId = this.tableData[i].sid;
                                this.tableData[i].categoryname = 
                                    this.tableData[i].categoryBaseName +  (this.tableData[i].categoryName ? ("_" + this.tableData[i].categoryName) : "");
                                
                                
                            }
                        }
                        this.dataTotal = r.total;
                    }
                    
                    
                })
            },
            //确定
            confirm (){
                if(this.multipleSelection.length){
                    // this.$emit("chooseGoodsHandle",this.multipleSelection);
                    this.$emit("closeCreateModal");
                    cService.setGoodsList(this.multipleSelection);
                }else{
                    this.$emit("closeCreateModal");
                    // this.$message({
                    //     message: '请选择至少一条数据',
                    //     type: 'warning'
                    // });
                }

            },
            search (formName){
                // this.$refs[formName].validate((valid) => {
                    // if (valid) {
                        this.pageNum = 1;
                        this.currentTreePath.parentId = this.searchForm.createNodeArr[0];
                        this.currentTreePath.sid =  this.searchForm.createNodeArr[1];
                        this.reloadTableById({});
                    // }
                // })
            },
            //重置表单
            resetForm(formName) {
                this.searchForm.stockName = "";
                this.pageNum = 1;
                this.currentTreePath.parentId = "";
                this.currentTreePath.sid = "";
                this.searchForm.createNodeArr = [];
                this.reloadTableById({});
            },
        },
        data(){
            // let createProductorValidator = (rule, value, callback) => {
            //     if(value.length == 1){
            //         callback(new Error("请选择产品所属类别"));
            //     }
            //     callback();
            // }
            return {
                selectObj:{}, //选中的产品
                currentTreePath:{}, //当前分类
                classList:[{
                    name : '请选择产品类别',
                    sid : ""
                }],
                propsSelect: {
                    label:'name',
                    value:'sid',
                    children: 'cateList'
                },
                tableTitle:[{
                      type:"name",
                      name:"产品名称",
                      showoverflowtooltip:true,
                      align:'left'
                    },
                    {
                      type:"categoryname",
                      name:"产品类别",
                      showoverflowtooltip:true,
                      align:'left',
                    },
                    {
                      type:"unit",
                      name:"单位",
                      showoverflowtooltip:true
                    },
                    {
                      type:"price",
                      name:"单价",
                      showoverflowtooltip:true
                    },
                    {
                      type:"comment",
                      name:"描述",
                      showoverflowtooltip:true,
                      align:'left',
                    }
                ],
                // 获取row的key值
                getRowKeys(row) {
                    return row.sid;
                },
                tableData:[],
                goodsData:{},//列表数据
                pageNum: 1,      //当前页数
                pageCount:  10, //分页大小,每页多少条
                dataTotal:  0,   //数据总条数
                pageSizes : [10,20,50,100],
                multipleSelection:[],
                selectId:[],
                searchForm:{
                    stockName:'',
                    createNodeArr:[]
                },
                 rules:{
                     createNodeArr:[
                        //  { required: true, message: '请选择所属类别', trigger: 'change' }
                        // {validator:createProductorValidator,trigger: 'change' }
                     ]
                 }
            }
        },
        watch:{
            propsDialogVisible(curVal,oldVal){
                if(curVal){
//                    this.rqGoodsData();
                    console.log(this.$refs)
//                    this.$refs.multipleTable.clearSelection();
                }
            }
        },
        mounted (){
            //初始化数据
                //所有产品
                this.getClassList();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
<style rel="stylesheet/scss" lang="scss" >
    .el-cascader-menus{
        z-index: 10000111111111 !important;
    }
    .goods {
        thead .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                background: #fff;
        }
    } 
    
</style>
