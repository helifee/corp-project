<template>
    <div class="office">
        <el-button @click="showCategoryDialog" type="primary" style="float: right"><span class="el-icon-plus">&nbsp;&nbsp;</span>{{l('{officeLocale.goods.otherButtons.newClassification}')}}</el-button>
        <div class="category">
            <h3>{{l('{officeLocale.goods.otherButtons.goodsCategory}')}}</h3>
            <smarter-tree
                    :row-class-name="customRowClassName"
                    checked-key="selected"
                    :data="officeTreeData"
                    ref="treeGrid"
                    :expand-all="true"
                    @mounted="$refs.treeGrid.refreshTreeTable(officeTreeData)"
                    :expand-on-click-node="false"
                    :enable-check="false"
                    @labelClick="chooseHanlder"
                    tree-key="sid"
                    child-key="officeHouseList"
                    prop="typeName"
            >
                <template slot-scope="scope">
                    <span class="custom-tree-node">
                            <span style="text-align: right;position: absolute;right: 20px;">
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click.stop="showAddOfficeDialog(scope.row.sid,0)"
                                    class="addBtn"
                                    v-if="!scope.row.$extra.parentId&&+scope.row.state"
                                >
                                    <i class="el-icon-circle-plus-outline"></i>
                                </el-button>
                                <el-button type="text"
                                           size="mini"
                                           @click.stop= "showEditCategoryDialog(scope.row.sid)"
                                           v-if="!scope.row.$extra.parentId"
                                >
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <el-button type="text"
                                           size="mini"
                                           @click= "showEditOfficeDialog(scope.row.sid,scope.row.parentId)"
                                           v-else
                                >
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <span @click="disableHanlder(scope.row.sid)" v-if="+scope.row.state">禁用</span>
                                <span @click="enableHanlder(scope.row.sid)" class="gray" v-else>启用</span>
                            </span>
                        </span>
                </template>
            </smarter-tree>
        </div>


        <!--{{officeTreeData}}-->
        <el-cascader
                placeholder="搜索类别名称"
                v-model="cateArr"
                :options="officeTreeData"
                :props="propsOption"
                @change="changeHander"
                filterable
                change-on-select
        ></el-cascader>

        <!--分类搜索结果-->
        <category-result :id="id" :breadcrumb="breadcrumb" @showCreateModal="showDetailOfficeDialog" @showEditModal="showEditGoodsDialog" @refreshData="refreshData"></category-result>



        <!--<el-tree-->
                <!--empty-text="啦啦啦啦"-->
                <!--node-key="sid"-->
                <!--:data="officeTreeData"-->
                <!--:expand-on-click-node="false"-->
                <!--:props="defaultProps"-->
                <!--:default-expand-all="true"-->
                <!--:highlight-current="true"-->
                <!--@node-click="chooseHanlder"-->
                <!--class="orgaTree">-->
          <!--<span class="custom-tree-node" slot-scope="{ node, data }" >-->
            <!--<span>{{ data}}1213213</span>-->
            <!--<span class="opera">-->
               <!--&lt;!&ndash;<i class="el-icon-circle-plus-outline" @click.stop="appendDep(data)"></i>&ndash;&gt;-->
                <!--&lt;!&ndash;<i class="el-icon-edit-outline" @click.stop="editDep(data)"></i>&ndash;&gt;-->
                <!--&lt;!&ndash;<i class="el-icon-close" v-if="data.parentId"  @click.stop="delDep(data)"></i>&ndash;&gt;-->
            <!--</span>-->
          <!--</span>-->
        <!--</el-tree>-->








        <!--添加一级分类-->
        <dialog-add-category  :dialog-visible="categoryDialogVisible" @closeCreateModal="closeCategoryDialog"></dialog-add-category>
        <!--编辑一级分类-->
        <dialog-edit-category :id="editCategoryId" :dialog-visible="editCategoryDialogVisible" @closeCreateModal="closeEditCategoryDialog"></dialog-edit-category>
        <!--添加二级分类-->
        <dialog-add-office :id="addOfficeId"  :dialog-visible="addOfficeDialogVisible" @closeCreateModal="closeAddOfficeDialog"></dialog-add-office>
        <!--编辑二级分类-->
        <dialog-edit-office :id="editOfficeId" :parent-id="editOfficeParentId"  :dialog-visible="editOfficeDialogVisible" @closeCreateModal="closeEditOfficeDialog"></dialog-edit-office>
        <!--编辑物品-->
        <dialog-edit-goods  :id="editGoodsId"   :dialog-visible="editGoodsDialogVisible" @closeCreateModal="closeEditGoodsDialog"></dialog-edit-goods>
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

            changeHander(item){
                console.log(item,"Qsqw")
                console.log(item[item.length-1]);
//                this.selectCurrentId = item[0];
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

            async disableHanlder(id){
                let res = await putOfficeHouseEnableOrNot(id,{"state":"0"});
                if(res){
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
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
//            loadData (id){
//                this.id = id;
//                console.log(id);
//            },
            chooseHanlder(value,type){
                this.id = value.sid;
//                console.log(value)
                let path = value.$extra.path;
                let id = value.$extra.idPath;
                let typeName = path.split("->");
                let sid = id.split("->");
                this.breadcrumb = [];
                typeName.map((item,index)=>{
                    let obj = {};
                    obj.typeName = item;
                    obj.sid = sid[index];
                    this.breadcrumb.push(obj);
                });
//                console.log(this.breadcrumb)
            },
            creatChild(id){
//                console.log(id)
                this.dialogVisible = true;
            },
            editChild(){
                this.dialogEdit=true
            },
            //refreshData刷新数据
            refreshData (){
                this.rquireOfficeTreeRefresh();

            },
            //刷新
            async rquireOfficeTreeRefresh(){
                let queryData = {
                    "orderBy":"state desc"
                };
                let res = await postOfficeHouseSelectTree(queryData);
                this.$refs.treeGrid.refreshTreeTable(res[0])

            },
            //加载
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc",
                };
                let res = await postOfficeHouseSelectTree(queryData);
//                console.log(res[0])
                let init = res[0][0];
                let initObj = {
                    typeName:init.typeName,
                    sid:init.sid,
                };
                this.breadcrumb = [...[]];
                this.breadcrumb.push(initObj);
                this.officeTreeData = res[0];
                this.$refs.treeGrid.refreshTreeTable(res[0])

            },

        },
        data(){
            return {
                cateArr:[],
                defaultProps: {
                    children: 'officeHouseList',
                    label: 'sid'
                },
                treeProps:{
//                    label:"typeName",
                    children:"officeHouseList"
                },
                customRowClassName({row,rowIndex}){
//                    console.log('class arg:',row.state)
                    return row.state==0?'gray':''
                },
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
                id:'11',
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


                propsOption:{
                    children: 'officeHouseList',
                    label: 'typeName',
                    value:'sid',
                }

            }
        },
        mounted (){
            JZY.call(this,'setCurrentVM')

            this.rquireOfficeTree();
        },
        watch: {
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .abc .tree-label{
        color:red;
    }
    .office{
        position: relative;
        padding: 12px;
        .category{
            width: 300px;
            position: absolute;
            left: 12px;
            top: 12px;
            padding-right: 10px;
            border-right: 1px solid #e5e5e5;
            h3{
                line-height: 48px;
            }
        }
    }
    .custom-tree-node{
        cursor: pointer;
    }
    .gray,.gray .tree-label{
        color: #dfdfdf !important;
    }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .gray .tree-label{
        color: #dfdfdf ;
    }
    /*.tree-label{*/
        /*cursor: pointer;*/
    /*}*/
</style>

