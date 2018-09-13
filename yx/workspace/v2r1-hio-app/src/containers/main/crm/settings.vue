<template>
    <div class="settings-wrap">
        <!--页头-->
        <!-- <div class="content-title">
            <h3>产品设置</h3>
        </div> -->
        <div class="settings-content">
            <div class="settings-left">
                <h3>产品类别
                    <!-- <el-button @click="showProductClassDialog">创建一级分类</el-button> -->
                    <span @click="showProductClassDialog" class="addBtn_crm">+ 创建一级类别</span>
                </h3>
                <!-- <el-button type="primary" class="creatBtn" @click="showCategoryDialog"><i class="el-icon-plus"></i>创建分类</el-button> -->
                <!-- <crmTree :treeData.sync="crmTreeData" :seting="treeSet" @clickItem="clickCrmItem"></crmTree> -->
                <div class="mb10">
                    
                    <el-input placeholder="产品分类搜索"
                    v-model.trim="productClassfilterText" >
                    </el-input>
                </div>
                <el-tree
                class="productTreeWrap"
                :data="treeData"
                default-expand-all
                :expand-on-click-node="false"
                node-key="sid"
                empty-text="暂无分类"
                ref="productTree"
                :default-checked-keys="[1]"
                highlight-current
                @node-click="treeClick"
                :filter-node-method="filterTreeNode"
                :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <el-tooltip :content="data.name" placement="top" >
                        <span class="treeNodeContent">{{data.name}}</span>
                    </el-tooltip>
                    <span v-if="data.parentId == '0'" class="editTreeWrap">
                    
                        <el-button type="text"  v-if="data.categoryStatus != '0'"
                                    size="mini"
                                    @click= "editCategory(data,true)">
                            <i class="el-icon-plus"></i>
                            
                        </el-button>
                        <el-button type="text"
                                    size="mini"
                                    @click= "modifyCategory(data)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </span>
                    <span v-else  class="editTreeWrap">
                        <el-button type="text"
                                    size="mini"
                                    @click= "modifyCategory(data)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </span>
                </span>
                </el-tree>

                
            </div>
            <div class="settings-right">
                <div style="margin-bottom:10px;padding:10px; padding-left:0;border-bottom:1px solid #dfdfdf; overflow:hidden;">
                    <span class="nav_crm">当前类别：
                        <span class="nav_crm_tit">{{currentTreePath.pName}} </span> 
                        <span>{{currentTreePath.cName ? " > "  : ""}}</span>
                        <span class="nav_crm_tit" :title="currentTreePath.cName">{{currentTreePath.cName ? currentTreePath.cName  : ""}}</span>
                    </span>
                    <div style="float:right" class="crm_settings-b-btn">
                        <!-- <el-button type="primary" @click="showProductClassDialog">创建一级分类</el-button> -->
                        <!-- <el-button-group> -->
                            
                            <!-- <el-button plain @click="exportProFn">导出产品</el-button> -->
                        <!-- </el-button-group> -->
                        <el-button  @click="openImportModal" class="crm-b-noBorder-btn">导入产品</el-button>
                        <el-button type="primary" @click="showProductDialog">
                            <i class="el-icon-plus"></i>
                            创建产品
                        </el-button>
                    </div>
                </div>
                
                <div style="margin-bottom:10px; float:right; ">
                    <el-input v-model.trim="searchProducts" placeholder="搜索产品" style="width:160px;" >
                        
                    </el-input>
                    <span @click="searchProductsFn" class="crm-seting-search"><i class="el-icon-search"></i></span>
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                </div>
                <div class="tableSettingProductList" style="overflow: hidden;overflow-y: scroll;width: 100%;">
                   <my-table :tableTitle="tableTitle" :tableData="tableData" :rowClassNameFn='rowClassNameFn'>
                        <el-table-column slot="otherscolumn"
                                prop="des"
                                align="center"
                                width="100px"
                                label="操作">
                            <template slot-scope="scope">
                                <span @click="editProduct(scope.row,'modify',scope.$index)" class="crm-el-btn">
                                    <i class="el-icon-edit"></i>
                                </span>
                                <span @click="delProduct(scope.row,scope.$index)" class="crm-el-btn">
                                    <i class="el-icon-delete"></i>
                                </span>
                                <!-- <el-button type="text" size="small" @click="editProduct(scope.row,'modify',scope.$index)"><i class="el-icon-edit"></i></el-button>
                                <el-button @click="delProduct(scope.row,scope.$index)" type="text" size="small"><i class="el-icon-delete"></i></el-button> -->
                            </template>
                        </el-table-column>
                    </my-table> 
                    
                </div>
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
                
            </div>
        </div>
        <!--创建分类-->
        <!-- <dialog-add-category  :dialog-visible="categoryDialogVisible" @closeCreateModal="closeCategoryDialog"></dialog-add-category> -->
        <!--创建产品-->

        <dialog-add-product  
        :dialog-visible.sync="productDialogVisible" 
        @closeCreateModal="closeProductDialog" 
        @reloadTable="reloadTable"
        :productNode="productNode"
        v-if="productDialogVisible"
        ></dialog-add-product>
        
        <dialog-add-product-class  
        :dialog-visible="productclassDialogVisible" 
        @closeCreateModal="showProductClassDialog" 
        :createNode="createNode"
        @reloadTree="reloadTree"
        v-if="productclassDialogVisible"
        :title="productTitle"
        ></dialog-add-product-class>
        <inportProducts :dialogVisible.sync="importProductVisible" 
        @closeModal="openImportModal"
        @reloadTable="importReloadTable"
        @reloadTree="reloadTree"
        v-if="importProductVisible"
        ></inportProducts>

    </div>
</template>

<script>
    // import dialogAddCategory from '@Main/crm/components/dialog.addCategory.vue'
    import dialogAddProduct from '@Main/crm/components/dialog.addProduct.vue'
    import dialogAddProductClass from '@Main/crm/components/dialog.addProductClass.vue'
    import inportProducts from '@Main/crm/components/inportProducts.vue'
    import myTable from '@Main/crm/components/table.vue'
    // import crmTree from '@Main/crm/components/crmTree.vue'


    import cService from '@Main/crm/crm_service.js'

    
    export default{
        components: {
            // dialogAddCategory,
            dialogAddProduct,
            dialogAddProductClass,
            inportProducts,
            myTable
            // crmTree
        },
        data(){
            let my = this;
            return {
                
                productClassfilterText:'',
                defaultProps:{
                    children: 'cateList',
                    label: 'name',
                    disabled(data, node){
                        if(data.categoryStatus == 1){
                            return false
                        }else{
                            return true
                        }
                    }
                },
                addProductShow:false,
                productTitle:{
                    title:'创建分类',
                    text:'一级分类：'
                },
                importProductVisible:false,
                currentTreePath:{
                    parentId:"",
                    sid:""
                },
                searchProducts:"",
                customRowClassName({row,rowIndex}){
                    // console.log('class arg:',row.state)
                    return row.state==0?'gray':''
                },
                createNode:{}, //创建产品类父类
                productNode:{},  //创建产品 修改 新增
                dialogVisible:false,//右侧弹出窗开关
                id:'',//根据分类id获取产品列表
                treeData:[],
                treeSet:{
                    key : 'sid',
                    childrenKey : 'cateList'
                },
                tableTitle:[{
                      type:"name",
                      name:"产品名称",
                      showoverflowtooltip:true,
                      align:'left',
                      solt:{
                          label:'name',
                          clickFn(item){
                              my.productNode.actType = "view";
                              my.productNode.node = item;
                              my.productDialogVisible = !my.productDialogVisible;
                          }
                      }
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
                      type:"productStatus",
                      name:"状态",
                      formatter:function(val){
                          
                          if(val.productStatus == 1){
                              return "销售"
                          }
                          return "停售"
                      }
                    },
                    {
                      type:"comment",
                      name:"描述",
                      align:'left',
                      overflowClass:true
                    //   showoverflowtooltip:true
                    }
                ],
                tableData:[],
                pageNum: 1,      //当前页数
                pageCount:  10, //分页大小,每页多少条
                dataTotal:  0,   //数据总条数
                pageSizes : [10,20,50,100],
                categoryDialogVisible:false,
                productDialogVisible:false,
                productclassDialogVisible:false,
                productTreeWrapHeight:"100px"
                
            }
        },
        methods:{
            rowClassNameFn({row, rowIndex}){
                    return row.productStatus == 2 ? "gray" : '';
                },
            filterTreeNode(value, data){
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            openImportModal(){
                this.importProductVisible = !this.importProductVisible;
            },
            searchProductsFn(){
                this.pageNum = 1;
                this.reloadTableById({});
            },
            
            reloadTree (){ //初始化树 
                let my = this;
                cService.getProductCategory("").then((data) => {
                    if(data[0] && data[0].length){
                        this.treeData = data[0] || [];
                        //获取当前默认节点
                        let arr = this.treeData;
                        
                        // if(this.currentTreePath.sid){
                            if(arr && arr.length){
                                let cateList = arr[0];  
                                                      
                                this.currentTreePath.parentId = cateList.parentId;
                                this.currentTreePath.sid =  cateList.sid;
                                this.currentTreePath.pName = cateList.name ;
                                this.currentTreePath.cName = "" ;

                                this.pageNum = 1;
                                //获取默认节点的产品列表
                                if(cateList){
                                    this.searchProducts = "";
                                    this.reloadTableById({
                                        cateleveOneId : cateList.sid,
                                        cateLeveTwoId : ""
                                    });
                                }
                            }
                        // }
                    }
                    
                    
                });
            },
            reloadTableById (p){ //按分类加载表格
                let param = {
                    pageNum : this.pageNum,
                    pageCount : this.pageCount,
                    productName : this.searchProducts,
                    cateleveOneId : (this.currentTreePath.parentId == "0") ? this.currentTreePath.sid : this.currentTreePath.parentId,
                    cateLeveTwoId : (this.currentTreePath.parentId == "0") ? "" : this.currentTreePath.sid
                }
                jQuery.extend(param,p);
                if(this.pageNum == 1){
                    this.tableData = [];
                }
                cService.getProductByType(param).then((data) =>{
                    this.dataTotal = 0;
                    if(data[0] && data[0].list && data[0].list.length){
                        let r = data[0];
                        this.tableData = r.list;
                        this.dataTotal = r.total;
                    }
                })
            },
            reloadTable(p,s){
                // this.pageNum = 1;
                // this.searchProducts = "";
                
                // if( (s == this.currentTreePath.sid) || (!s && p == this.currentTreePath.sid && (this.currentTreePath.parentId == "0" || this.currentTreePath.parentId == "")) ){
                    this.reloadTableById({});
                // }
            },
            importReloadTable(){
                this.pageNum = 1;
                this.reloadTableById({});
            },
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(from = ''){
              this.dialogVisible = false
              // from === 'reflashData' && this.getOrderTableData()
            },
            treeClick(value,node,vu){

                this.currentTreePath.parentId = value.parentId;
                this.currentTreePath.sid =  value.sid;

                if(value.parentId == "0"){
                    this.currentTreePath.pName =  value.name;
                    this.currentTreePath.cName = "";
                }else{         
                    this.currentTreePath.pName =  node.parent.data.name;
                    this.currentTreePath.cName = value.name;
                }
                this.pageNum = 1;
                 //加载右侧表格
                this.reloadTableById({});
            },
            showProductDialog (){
                if(this.treeData && this.treeData.length){
                    this.productNode.actType = "";
                    this.productNode.node = null;
                    this.productDialogVisible = !this.productDialogVisible;
                }else{
                    this.$message("请先创建产品分类");
                }
                
            },
            //打开关闭 一级分类 表单
            showProductClassDialog(){
                this.createNode.currentNode = {};
                this.createNode.actType = "create";
                this.createNode.showPut = false;
                this.productclassDialogVisible = !this.productclassDialogVisible;
            },
            closeProductDialog (){
                this.productDialogVisible = false;
            },
            //分页
            handleSizeChange(val) {
               this.pageCount = val;
               this.pageNum = 1;
               this.reloadTableById({});
            },
            //分页
            handleCurrentChange(val) {
                this.pageNum = val;
                this.reloadTableById({})
            },
            //编辑产品
            editProduct (row,type){
                this.productNode.actType = type;
                this.productNode.node = row;
                this.productDialogVisible = !this.productDialogVisible;
            },
            //删除产品
            delProduct (row,cb){
                this.$confirm('您确认删除此产品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    cService.operateProduct(row.sid,"p").then((data) =>{
                        // this.reloadTable();
                        // this.tableData.splice(index,1);
                        this.reloadTableById({});
                        cb && cb(data);
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
                
            },
            
            //编辑分类
            editCategory (row,type){
                this.createNode = {};
                this.createNode.currentNode = row;
                this.createNode.actType = "new";
                this.createNode.showPut = true;
                if(row.categoryStatus == "1"){
                    this.productclassDialogVisible = !this.productclassDialogVisible;
                }else{
                    this.$message("该分类已禁用");
                }
                
            },
            //删除分类
            delCategory(row){
                cService.operateProduct(row.sid).then((data) =>{
                    this.reloadTree();
                })
            },
            //修改分类
            modifyCategory(row){
                this.createNode = {};
                this.createNode.currentNode = row;
                this.createNode.actType = "modify";
                this.productTitle = {
                    title:'修改分类',
                    text:'所属分类：'
                }
                this.productclassDialogVisible = !this.productclassDialogVisible;
            },
            //导出产品
            exportProFn(){

            },
            //分类检索
            filterProductClass(val){
                this.$refs.productTree.filter(val);
            },
            initTreeBoxHeight(bd){

                let $offsetTop = bd.offset().top;
                let _height ;
                _height = `${document.documentElement.clientHeight}` - $offsetTop -30;
                if(_height < 0 ){
                    _height = 0;
                }
                bd.height(_height);
            },
            initTableBoxHeight(bd){
                let $offsetTop = bd.offset().top;
                let _height ;
                _height = `${document.documentElement.clientHeight}` - $offsetTop -100;
                if(_height < 0 ){
                    _height = 0;
                }
                bd.height(_height);
            }


        },
        computed:{

        },
        watch: {
            productClassfilterText(val) {
                this.filterProductClass(val);
            }
        },
        mounted(){
            let $productTreeWrap = jQuery('.productTreeWrap');
            this.initTreeBoxHeight($productTreeWrap);
            let $tableSettingProductList = jQuery('.tableSettingProductList');
            this.initTableBoxHeight($tableSettingProductList);
            let that = this;
            window.onresize = function temp() {
                that.initTreeBoxHeight($productTreeWrap);
                that.initTableBoxHeight($tableSettingProductList);
            };
            this.reloadTree();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">

    .productTreeWrap{
        // height: 500px;
        overflow: hidden;
        overflow-y: scroll;

            .el-tree-node__content{
                margin-right: 10px;
                padding-right:10px;
                line-height: 40px;
                height:40px;
                .el-tree-node__expand-icon{
                    color:#46A7FF;
                    font-size: 14px;

                }
                .el-tree-node__expand-icon.is-leaf {
                    color: transparent;
                    cursor: default;
                }
            }
            .el-tree-node__content:hover{
                background:#EAF5FF;
            }
            
            
    }
    .productTreeWrap.el-tree--highlight-current {
                .el-tree-node[aria-disabled='true']{
                    .el-tree-node__content{
                        background:transparent;
                        color:#C8C8C8
                    }
                }
            }
    .settings-wrap{
        .settings-right{
            .el-input .el-input__inner{
                height:32px;line-height: 32px;
            }
            .el-table tr.gray{ background:#F6F7F8;
                .cell{
                    color: #A0A0A0;
                    .el-icon-edit{
                        color:#A0A0A0
                    }
                }
            } 
        }
        
    }
     
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import './crmcss/css.scss'
</style>
