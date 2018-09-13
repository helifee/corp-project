<template>
    <div class="wrap">
        <div class="content-title">
            <h3>栏目设置</h3>
            <el-button  type="primary" size = "small" class="add-news" @click="showColumnDialog"><i class="el-icon-plus"></i> 新建栏目</el-button>
        </div>
        <div class="content" v-loading="loading">
            <div class="list-group-item">
                <div class="dec" style="background-color: #F6F7F8;line-height: 50px;margin: 0px">
                    <span>栏目名称</span>
                    <span class="">更新时间</span>
                    <span class="">文章数量</span>
                    <span>操作</span>
                </div>
            </div>
            <div v-if="!columnData" style="text-align: center;height: 50px;line-height: 50px;    color: #909399;border-bottom: 1px solid #ebeef5">暂无数据</div>
            <draggable v-else class="" element="ul" v-model="columnData" :options="dragOptions" :move="onMove" @start="isDragging2=true" @end="dragEnd" @update="dragUpdate">
                <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item clearfix" v-for="(item,index) in columnData" :key="item.sid" :id="item.sid">
                        <div class="dec">
                            <span>{{item.name}}</span>
                            <span class="time">{{item.updateDate}}</span>
                            <span class="author">{{item.newsCount}}</span>
                            <span>
                        <el-button
                                size="mini"
                                @click="handleEdit(index,item)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delColumnClick(item.sid,item.newsCount)">删除</el-button>
                            </span>
                        </div>
                    </li>
                </transition-group>
            </draggable>
            <p style="line-height: 60px">提示：拖动对栏目进行排序</p>
        </div>
        <dialog-column  :editData="editData" :dialogVisible="columnDialogVisible" @refreshList="refreshList" @closeCreateModal="closeColumnDialog"></dialog-column>
    </div>
</template>

<script>
    JZY.locale.add('newsLocale',require('./news.locale'))
    //拖拽
    import draggable from 'vuedraggable'
    import Sortable  from 'sortablejs'
    import dialogColumn from '@Main/news/components/dialog.addColumn.vue'
    import {mapMutations,mapGetters,mapState,mapActions} from 'vuex'
    import {getNewsTypeList,dropNewsTypeList,putNewsTypeUpdateOrder} from '@Main/news/getData.js'
    export default{
        components: {
            //拖拽
            draggable,
            Sortable,
            dialogColumn
        },
        methods:{
            showColumnDialog (){
                this.columnDialogVisible = true;
                this.editData = '';
            },
            closeColumnDialog (){
                this.columnDialogVisible = false;
            },

//            ...mapActions([
//                'delColumn'
//            ]),
            ...mapMutations({
                updateColumn:'UPDATE_COLUMN'
            }),
            delColumnClick (id,num){
                if(num>0){
                    this.$message({
                        message: '该栏目中有文章，不允许删除！',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('此操作将删除该栏目, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.rqNewsTypeDel(id);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
//                console.log(index);
//                this.delColumn(index);
            },
            handleEdit(index, row) {
                this.columnDialogVisible = true;
                let initData = {
                    "name":row.name,
                    "remark":row.remark,
                    "sid":row.sid,
                };
                this.editData = initData;
            },
            handleDelete(index, row) {
//                console.log(index, row);
                this.$confirm('此操作将删除该栏目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            closeDialog (formName){
                this.dialogVisible = false
//                this.$refs[formName].resetFields();
            },

            // 拖拽事件
            orderList () {
                this.list = this.list.sort((one,two) =>{return one.order-two.order; })
            },
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            dragEnd(event){
                this.isDragging2=false;
                let originId = event.clone.id;
                this.originId = originId;
                console.log(event,"dragEnddragEnd")

                console.log(this.originId,this.targetId,"this.originId,this.targetId");
//
//                let len = this.columnData.length;
                if(this.originId&&this.targetId){
                    this.loading = true;
                    this.rqUpdateOrder(this.originId,this.targetId);
                }
//
            },
            dragUpdate(evt){
//                console.log(event,"dragEnddragEnd")
                console.log('2拖动前的索引 :' + evt.oldIndex)
                console.log('2拖动后的索引 :' + evt.newIndex);

                let len = this.columnData.length;
                if(evt.newIndex+1>=len){
                    this.targetId = -1;
                }else{
                    this.targetId = this.columnData[evt.newIndex+1].sid;
                }
//                console.log(this.tags)
            },
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            refreshList(){
                this.rqNewsTypeList();
            },
            async rqNewsTypeList(){
                let res = await getNewsTypeList();
                this.columnData = [...res];
                this.updateColumn(this.columnData);
                console.log(res,"resres")
            },
//            删除栏目
            async rqNewsTypeDel(id){
                let res = await dropNewsTypeList(id);
                this.$message({
                    message: '删除栏目成功！',
                    type: 'success'
                });
                this.refreshList();
            },
            //排序putNewsTypeUpdateOrder
            async rqUpdateOrder(originId,targetId){
                let res = await putNewsTypeUpdateOrder(originId,targetId);
                this.originId = '';
                this.targetId = '';
                this.loading = false;
                this.updateColumn(this.columnData);
            },
        },
        data(){
            return {
                loading:false,
                columnData:[],
                originId:'',
                targetId:'',
                tableData: [{
                    id:"1",
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    number:'12'
                }, {
                    id:"2",
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    number:'12'
                }, {
                    id:"3",
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    number:'12'
                }, {
                    id:"4",
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    number:'12'
                }],
                editData:'',
                isEdit:'',
                isDragging2: false,
                delayedDragging:false,
                columnDialogVisible:false,
                currentPage4: 4
            }
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    disabled: !this.tableData,
                    ghostClass: 'ghost',
                };
            },
            columnsList:{
                get() {
                    return this.$store.state.columnsList
                },
                set(value) {
                    console.log("value",value)
                    this.$store.dispatch('sortColumn', value)
                }
            }
        },
        mounted(){
            this.rqNewsTypeList();
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .content-title{
            position: relative;
            margin-bottom: 12px;
            background: #ffffff;
            line-height: 64px;
            height: 64px;
            margin-left: 24px;
            margin-right: 24px;
            border-bottom: 1px solid $theme-grey-table-border;
            h3{
                height: 64px;
                text-align: left;
                font-size: 14px;
                font-weight: normal;
                color: $theme-black-title;
                margin: 0px;
                padding: 0px;
                /*float: left;*/
            }
            .add-news{
                position: absolute;
                right: 0px;
                top:16px;
            }
        }
        .content{
            padding: 22px;
            margin-bottom: 20px;
            background: #ffffff;
            ul{
                margin: 0;
                padding: 0;
            }
        }
        .list-group-item{
            border-bottom: 1px solid #ebeef5;
            min-width: 0;
            font-size: 0;
            margin: 0px;
            span{
                font-size: 13px;
                color: #454545;
                display: inline-block;
                width: 25%;
                text-align: center;
            }
        }
        li.list-group-item{
            padding: 8px 0;
        }
        li.list-group-item:hover{
            cursor: move;
            background: #EAF5FF;
        }

    }
</style>
