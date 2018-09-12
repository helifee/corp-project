<template>
    <div class="office" v-loading="loadTree">
        <el-button @click="showCategoryDialog" size = "small" type="primary" style="float: right;margin: 16px"><span class="el-icon-plus"></span>{{l('{officeLocale.goods.otherButtons.newClassification}')}}</el-button>
        <div class="category">
            <h3>{{l('{officeLocale.goods.otherButtons.goodsCategory}')}}</h3>
            <div class="category-left">
                <div>

                    <el-input placeholder="分类搜索"
                              size="small"
                              clearable
                              style="margin-bottom: 8px"
                              v-model.trim="classfilterText" >
                    </el-input>
                </div>
                <el-tree
                        :class="{'officeTreeWrap':true,'treeWrapInit':treeWrapInit}"
                        :data="officeTreeData"
                        default-expand-all
                        :expand-on-click-node="false"
                        node-key="sid"
                        empty-text="暂无分类"
                        ref="productTree"
                        highlight-current
                        @node-click="treeClick"
                        :filter-node-method="filterTreeNode"
                        :props="categoryProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span class="treeNodeContent" v-if="data.sid == checkedId[0]"   :class="{'gray':!+data.state}" :title="data.typeName">{{data.typeName}}</span>
                    <span class="treeNodeContent" v-else :class="{'gray':!+data.state}" :title="data.typeName">{{data.typeName}}</span>

                    <span class="editTreeWrap">
                        <span v-if="!data.parentId">
                            <el-button
                                    type="text"
                                    @click="showAddOfficeDialog(data.sid,0)"
                                    class="addBtn"
                                    v-if="+data.state"
                            >
                                        <i class="el-icon-plus"></i>
                                    </el-button>
                            <el-button
                                    type="text"
                                    class="addBtn"
                                    v-else
                            >
                                        <i class="el-icon-plus" style="visibility: hidden"></i>
                                    </el-button>
                             <el-button type="text"
                                        style="margin-left: 5px;margin-right: 5px"
                                        @click= "showEditCategoryDialog(data.sid,data.parentId)"
                             >
                                        <i class="el-icon-edit"></i>
                                    </el-button>
                        </span>
                        <span v-else>
                            <el-button type="text"
                                       @click= "showEditOfficeDialog(data.sid)"
                                       style="margin-left: 5px;margin-right: 5px"
                            >
                                        <i class="el-icon-edit"></i>
                            </el-button>
                        </span>
                        <span @click="disableCategory(data.sid)" style="cursor: pointer" v-if="+data.state"><icon class="disable-icon" name="disable-icon" scale = "1.7"  ></icon></span>
                        <span @click="enableCategory(data.sid)" style="cursor: pointer" class="gray" v-else><icon class="enable-icon" name="enable-icon" scale = "1.7"  ></icon></span>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>
        <!--分类搜索结果-->
        <category-result :id="id" :breadcrumb="breadcrumb" :randomNum="randomNum" @showCreateModal="showDetailOfficeDialog" @showEditModal="showEditGoodsDialog" @refreshData="refreshData"></category-result>
        <!--添加一级分类-->
        <dialog-add-category  :dialog-visible="categoryDialogVisible" @refreshData="refreshData" @closeCreateModal="closeCategoryDialog"></dialog-add-category>
        <!--编辑一级分类-->
        <dialog-edit-category :id="editCategoryId" @refreshData="refreshData" :dialog-visible="editCategoryDialogVisible" @closeCreateModal="closeEditCategoryDialog"></dialog-edit-category>
        <!--添加二级分类-->
        <dialog-add-office :id="addOfficeId" @refreshData="refreshData"  :dialog-visible="addOfficeDialogVisible" @closeCreateModal="closeAddOfficeDialog"></dialog-add-office>
        <!--编辑二级分类-->
        <dialog-edit-office :id="editOfficeId" @refreshData="refreshData" :parent-id="editOfficeParentId"  :dialog-visible="editOfficeDialogVisible" @closeCreateModal="closeEditOfficeDialog"></dialog-edit-office>
        <!--编辑物品-->
        <dialog-edit-goods  :id="editGoodsId"   :dialog-visible="editGoodsDialogVisible"  @refreshCategory="refreshCategory" @closeCreateModal="closeEditGoodsDialog"></dialog-edit-goods>
        <!--类别详情-->
        <dialog-detail-office :id="detailOfficeId" :dialog-visible="detailOfficeDialogVisible" @showCreateModal="showEditGoodsDialog" @closeCreateModal="closeDetailOfficeDialog"></dialog-detail-office>
    </div>
</template>

<script>
    JZY.locale.add('officeLocale',require('./office.locale'))
    import {postOfficeHouseSelectTree,putOfficeHouseEnableOrNot} from '@Main/officeSupplies/getData.js'
    import categoryResult from '@Main/officeSupplies/components/category.result.vue'
    import dialogAddCategory from '@Main/officeSupplies/components/add/dialog.addCategory.vue'
    import dialogEditCategory from '@Main/officeSupplies/components/edit/dialog.editCategory.vue'
    import dialogDetailOffice from '@Main/officeSupplies/components/dialog.detailOffice.vue'
    import dialogAddOffice from '@Main/officeSupplies/components/add/dialog.addOffice.vue'
    import dialogEditOffice from '@Main/officeSupplies/components/edit/dialog.editOffice.vue'
    import dialogEditGoods from '@Main/officeSupplies/components/edit/dialog.editGoods.vue'
    export default{
        components:{
            categoryResult,
            dialogAddCategory,
            dialogEditCategory,
            dialogDetailOffice,
            dialogEditOffice,
            dialogAddOffice,
            dialogEditGoods
        },
        methods:{
//            clearClass(){
////                清除分类
////                console.log("");
////                this.rquireOfficeTree();
////                this.treeWrapInit = true;
//////                $(".officeTreeWrap").addClass('treeWrapInit');
////                $(".treeWrapInit>.el-tree-node.is-expanded.is-focusable:first-child>.el-tree-node__content:first-child").css({"background":"#f0f7ff"})
//
//            },

            filterTreeNode(value, data){
                if (!value) return true;
                return data.typeName.indexOf(value) !== -1;
            },

            treeClick(value,node,vu){
//                console.log(value,node);
                this.id = value.sid;
                this.breadcrumb = [];
                this.treeWrapInit = false;
                if(!value.parentId){//一级
                    let obj = {
                        typeName:value.typeName,
                        sid:value.sid
                    }
                    this.breadcrumb.push(obj)
                }else{//二级
                    let obj1 = {
                        typeName:node.parent.data.typeName,
                        sid:node.parent.data.sid
                    };
                    this.breadcrumb.push(obj1);
                    let obj2 = {
                        typeName:value.typeName,
                        sid:value.sid
                    };
                    this.breadcrumb.push(obj2)

                }
            },


            changeHander(item){
//                console.log(item);
                this.houseId = item[0];
            },
            //添加一级分类弹窗
            showCategoryDialog (){
                this.categoryDialogVisible = true;
            },
            closeCategoryDialog (){
                this.categoryDialogVisible = false;
            },

            //编辑二级分类弹窗
            showEditOfficeDialog (id,parentId){
                this.editOfficeId = id;
                this.editOfficeParentId = parentId;
                this.editOfficeDialogVisible = true;
            },
            closeEditOfficeDialog (){
                this.editOfficeDialogVisible = false;
            },

            //添加二级分类
            showAddOfficeDialog (id){
                this.addOfficeId = id;
                this.addOfficeDialogVisible = true;
            },
            closeAddOfficeDialog (){
                this.addOfficeDialogVisible = false;
            },


            showDetailOfficeDialog (id){
                this.detailOfficeId = id;
                this.detailOfficeDialogVisible = true;
            },
            closeDetailOfficeDialog (){
                this.detailOfficeDialogVisible = false;
            },

            //编辑一级分类
            showEditCategoryDialog (id){
                this.editCategoryId = id;
                this.editCategoryDialogVisible = true;
            },
            closeEditCategoryDialog (){
                this.editCategoryDialogVisible = false;
            },

            showEditGoodsDialog (id){
                this.editGoodsId = id;
                this.editGoodsDialogVisible = true;
            },
            closeEditGoodsDialog (){
                this.editGoodsDialogVisible = false;
            },
            disableCategory(id){
                const h = this.$createElement;
                this.$confirm('类别禁用后该类别下物品将不能使用', {
                    title: '类别禁用',
                    message: h('p', null, [
                        h('span', { style: 'color: red' }, '类别禁用后该类别下物品将不能使用')
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disableHanlder(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            enableCategory(id){
                const h = this.$createElement;
                this.$confirm('类别启用后该类别下物品能够正常使用', {
                    title: '类别启用',
                    message: h('p', null, [
                        h('span', { style: 'color: red' }, '类别启用后该类别下物品能够正常使用')
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.enableHanlder(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            async disableHanlder(id){
                let res = await putOfficeHouseEnableOrNot(id,{"state":"0"});
                if(res){
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.loadTree = true;
                    this.rquireOfficeTreeRefresh();
                }
            },
            async enableHanlder(id){
                let res = await putOfficeHouseEnableOrNot(id,{"state":"1"});
                if(res){
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.rquireOfficeTreeRefresh();
                }
            },
            //refreshData刷新数据
            refreshData (){
                this.loadTree = true;
                this.rquireOfficeTreeRefresh();

            },

            refreshCategory(randomNum){
                this.randomNum = randomNum;
            },
            //刷新
            async rquireOfficeTreeRefresh(){
                let queryData = {
                    "orderBy":"state desc"
                };
                let res = await postOfficeHouseSelectTree(queryData);
//                this.$refs.treeGrid.refreshTreeTable(res[0])
                this.officeTreeData = res[0]
                this.loadTree=false;
            },
            //加载
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc"
                };
                let res = await postOfficeHouseSelectTree(queryData);
//                console.log(res[0])
                let init = res[0][0];
                if(res[0].length){
                    let initObj = {
                        typeName:init.typeName,
                        sid:init.sid,
                    };
                    this.breadcrumb = [...[]];
                    this.breadcrumb.push(initObj);
                    this.officeTreeData = res[0];

//                    this.$refs.treeGrid.refreshTreeTable(res[0])
                    this.checkedId = [init.sid];
                }

                this.loadTree = false;

            },
            //分类检索
            filterClass(val){
                this.$refs.productTree.filter(val);
            }

        },
        data(){
            return {
                treeWrapInit:true,
                checkedId:[],
                categoryProps:{
                    children: 'officeHouseList',
                    label: 'typeName',
                    disabled(data, node){
                        if(data.state == 1){
                            return false
                        }else{
                            return true
                        }
                    }
                },


                loadTree:true,
                houseId:'',
                randomNum:'',
                //左侧tree的数据
                officeTreeData:  [],
                //面包屑导航
                breadcrumb:[],
                //新增一级分类弹窗
                categoryDialogVisible:false,
                editOfficeDialogVisible:false,
                addOfficeDialogVisible:false,
                detailOfficeDialogVisible:false,
                editCategoryDialogVisible:false,
                editGoodsDialogVisible:false,

                // 搜索的id
                id:'',
                // 编辑分类的id
                editCategoryId:'',
                // 编辑二级分类的id  父id
                addOfficeId:'',
                editOfficeId:'',
                editOfficeParentId:'',
                // 编辑物品的id  父id
                editGoodsId:'',
                // flag  0 创建  1 编辑
                flag:'',
                //物品详情 物品的 ID
                detailOfficeId:'',
                dialogVisible:false,
                dialogEdit:false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                classfilterText:'',

            }
        },
        computed:{
        },
        mounted (){

            this.rquireOfficeTree();
            let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
//            console.log(clientHeight);
            $(".category-left").css({height:clientHeight-200+"px"});
            let $$ = $;
            $(window).resize(function() {
                //clientHeight是网页在浏览器中的可视高度，
                let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                $$(".category-left").css({height:clientHeight-200+"px"});
            });
        },
        watch: {
            classfilterText(val) {
                this.filterClass(val);
            }
        },

        }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .abc .tree-label{
        color:red;
    }
    .office{
        /*height: 100%;*/
        /*overflow-y: auto;*/
        min-height: 100%;
        overflow-y: hidden;
        position: relative;
        .category{
            width: 300px;
            height: 100%;
            position: absolute;
            left: 24px;
            top: 0px;
            padding-right: 24px;
            border-right: 1px solid $theme-grey-table-border;
            h3{
                line-height: 64px;
                font-size: 14px;
                font-weight: normal;
                color: #191919;
                padding: 0;
                margin: 0;
            }
        }
    }

    .gray .tree-label{
        color: #dfdfdf ;
    }




</style>
<style rel="stylesheet/scss" lang="scss">
    .office{
        .custom-tree-node{
            cursor: pointer;
            width: 100%;
        }
        .gray,.gray .tree-label{
            color: #dfdfdf !important;
        }
        .el-table__row:hover{
            .tree-node-operation{
                display: inline-block;
            }
        }
        .tree-node-operation{
            display: none;
        }


        .officeTreeWrap{
            height: 100%;
            overflow-y: auto;
            .el-tree-node__content{
                line-height: 40px;
                height:40px;
            }
            .treeNodeContent{
                width: 140px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                float: left;
                display: inline-block;
            }
            .editTreeWrap{
                display: none;
                text-align: right;
                padding-right: 12px;
                float: right;
                width: 80px;
                .el-button{
                    padding: 0px;
                }
            }
            .custom-tree-node:hover{
                .editTreeWrap{
                    display: block;
                }
            }

        }
        .treeWrapInit>.el-tree-node.is-expanded.is-focusable:first-child>.el-tree-node__content:first-child{
            background-color:#f0f7ff;
        }
        .officeTreeWrap.el-tree--highlight-current {
            .el-tree-node[aria-disabled='true']{
                .el-tree-node__content{
                    background: #fdfdfd;
                }
            }
        }
        .category{
            .el-icon-plus,.el-icon-edit{
                cursor: pointer;
                font-size: 14px;
                color: $theme-blue;
            }
            .disable-icon,.enable-icon{
                cursor: pointer;
                color:$theme-blue;
                margin-bottom: -3px
            }
            .el-icon-plus:hover,.el-icon-edit:hover,.disable-icon:hover,.enable-icon:hover{
                color: $theme-blue-active;
            }
        }
    }

    .office-dialog-wrap{
        .el-dialog__body{
            padding: 24px;
        }
    }

</style>


