<template>
    <div class="settings-wrap">
        <!--页头-->
        <div class="content-title">
            <h3>产品设置</h3>
        </div>
        <div class="settings-content">
            <div class="settings-left">
                <!-- <el-button type="primary" class="creatBtn" @click="showCategoryDialog"><i class="el-icon-plus"></i>创建分类</el-button> -->
                <smarter-tree
                        :row-class-name="customRowClassName"
                        checked-key="selected"
                        ref="treeGrid"
                        @mounted="$refs.treeGrid.refreshTreeTable(treeData)"
                        :expand-on-click-node="false"
                        :enable-check="false"
                        @labelClick="chooseHanlder"
                        tree-key="sid"
                        child-key="cateList"
                        prop="name"
                >
                    <template slot-scope="scope">
                        <span style="text-align: right;position: absolute;right: 20px;">
                            <span style="float: right;" v-if="!scope.row.$extra.parentId">
                                <el-button type="text"
                                           size="mini"
                                           @click= "editCategory(scope.row)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <el-button type="text"
                                           size="mini"
                                           @click= "modifyCategory(scope.row)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <el-button type="text"
                                           size="mini"
                                           @click= "delCategory(scope.row)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                            </span>

                             <span style="float: right;" v-else>
                                <el-button type="text"
                                           size="mini"
                                           @click= "editProduct(scope.row,'new')">
                                    <i class="el-icon-edit"></i>
                                </el-button>

                                <el-button type="text"
                                           size="mini"
                                           @click= "modifyCategory(scope.row)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <el-button type="text"
                                           size="mini"
                                           @click= "delCategory(scope.row)"
                                >
                                    <i class="el-icon-delete"></i>
                                </el-button>
                            </span>

                            </span>
                    </template>
                </smarter-tree>

            </div>
            <div class="settings-right">
                <el-button type="primary" @click="showProductDialog">创建产品</el-button>
                <el-button type="primary" @click="showProductClassDialog">创建一级分类</el-button>
                <el-button-group>
                    <el-button plain>导入产品</el-button>
                    <el-button plain>导出产品</el-button>
                </el-button-group>
                <my-table :tableTitle="tableTitle" :tableData="tableData">
                    <el-table-column slot="otherscolumn"
                            prop="des"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editProduct(scope.row,'modify')">编辑</el-button>
                            <el-button @click="delProduct(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </my-table>
                <el-row class="row-bg page" justify="center">
                    <el-col :span="12">
                        <el-pagination
                                :current-page="pageNum"
                                :page-size="pageCount"
                                :page-sizes="[10, 20, 30, 40]"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="dataTotal"
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
        :dialog-visible="productDialogVisible" 
        @closeCreateModal="closeProductDialog" 
        @reloadTable="reloadTable"
        :productNode="productNode"
        :productClass="productClass"
        ></dialog-add-product>
        
        <dialog-add-product-class  
        :dialog-visible="productclassDialogVisible" 
        @closeCreateModal="showProductClassDialog" 
        :createNode="createNode"
        :productClass="productClass"
        @reloadTree="reloadTree"
        ></dialog-add-product-class>

    </div>
</template>

<script>
    let tableData = [{
        "name":"台式机1",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
        },{
            "name":"台式机2",
            "unit":"台",
            "price":"18000.00",
            "des":"i5 4G内存 1T硬盘",
        },{
            "name":"台式机3",
            "unit":"台",
            "price":"18000.00",
            "des":"i5 4G内存 1T硬盘",
        },{
            "name":"台式机4",
            "unit":"台",
            "price":"18000.00",
            "des":"i5 4G内存 1T硬盘",
        },{
            "name":"台式机5",
            "unit":"台",
            "price":"18000.00",
            "des":"i5 4G内存 1T硬盘",
    }];
    // import dialogAddCategory from '@Main/crm/components/dialog.addCategory.vue'
    import dialogAddProduct from '@Main/crm/components/dialog.addProduct.vue'
    import dialogAddProductClass from '@Main/crm/components/dialog.addProductClass.vue'
    import myTable from '@Main/crm/components/table.vue'

    import cService from '@Main/crm/crm_service.js'

    
    export default{
        components: {
            // dialogAddCategory,
            dialogAddProduct,
            dialogAddProductClass,
            myTable
        },
        data(){
            
            return {
                customRowClassName({row,rowIndex}){
                    // console.log('class arg:',row.state)
                    return row.state==0?'gray':''
                },
                productClass:[],
                createNode:{}, //创建产品类父类
                productNode:{},  //创建产品 修改 新增
                dialogVisible:false,//右侧弹出窗开关
                id:'',//根据分类id获取产品列表
                treeData:[],
                tableTitle:[{
                      type:"name",
                      name:"产品名称"
                    },
                    {
                      type:"unit",
                      name:"单位"
                    },
                    {
                      type:"price",
                      name:"单价"
                    },
                    {
                      type:"comment",
                      name:"描述"
                    }
                ],
                tableData:[],
                pageNum: 1,      //当前页数
                pageCount:  10, //分页大小,每页多少条
                dataTotal:  200,   //数据总条数
                categoryDialogVisible:false,
                productDialogVisible:false,
                productclassDialogVisible:false
                
            }
        },
        methods:{
            reloadTree (){ //初始化树 
                let my = this;
                cService.getProductCategory({}).then(function(data){
                    my.productClass = data[0];
                    my.$refs.treeGrid.refreshTreeTable(data[0]);
                });
            },
            reloadTableById (Id){ //按分类加载表格
                let my = this;
                cService.getProductByType(Id).then((data) =>{

                })
            },
            reloadTable(){
                this.reloadTableById();
            },
            //子组件回调，关闭父组件弹出窗
            changeDialogVisible:function(from = ''){
              this.dialogVisible = false
              // from === 'reflashData' && this.getOrderTableData()
            },
            //右侧表格的数据
            chooseHanlder(value,type){
                //
                if(value.parentId == "0"){
                    return
                }
                //加载右侧表格
                // this.reloadTable(value.sid);
            },
            showProductDialog (){
                this.productNode.actType = "";
                this.productNode.node = null;
                this.productDialogVisible = !this.productDialogVisible;
            },
            //打开关闭 一级分类 表单
            showProductClassDialog(){
                this.createNode.currentNode = {};
                this.createNode.actType = "create";
                this.productclassDialogVisible = !this.productclassDialogVisible;
            },
            closeProductDialog (){
                this.productDialogVisible = false;
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //编辑产品
            editProduct (row,type){
                this.productNode.actType = type;
                this.productNode.node = row;
                this.productDialogVisible = !this.productDialogVisible;
            },
            //删除产品
            delProduct (row,index){
                this.$message('删除'+index);
                cService.operateProduct(row.sid,"p").then((data) =>{
                    this.reloadTable();
                })
            },
            
            //编辑分类
            editCategory (row){
                this.createNode.currentNode = row;
                this.createNode.actType = "new";
                this.productclassDialogVisible = !this.productclassDialogVisible;
            },
            //删除分类
            delCategory(row){
                cService.operateProduct(row.sid).then((data) =>{
                    this.reloadTree();
                })
            },
            //修改分类
            modifyCategory(row){
                this.createNode.currentNode = row;
                this.createNode.actType = "modify";
                this.productclassDialogVisible = !this.productclassDialogVisible;
            }

        },
        computed:{

        },
        mounted(){
            this.reloadTree();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.settings-wrap{
    .content-title{
        position: relative;
        margin: 12px 0px;
        line-height: 32px;
        height: 48px;
        border-bottom: 1px solid #eeeeee;
        h3{
            padding-left: 18px;
        }
    }
    .settings-content{
        position: relative;
        .settings-left{
            position: absolute;
            left: 0;
            /*top:20px;*/
            width: 300px;
            padding: 0 20px;
            border-right: 1px solid #eeeeee;
            .creatBtn{
                width: 100%;
                margin-bottom: 20px;
            }
        }
        .settings-right{
            padding-left: 370px;
            .page{
                float: right;
                margin-top: 30px;
                margin-right: 30px;
            }
        }
    }

}
</style>
