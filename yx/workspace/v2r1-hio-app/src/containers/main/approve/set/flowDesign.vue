<template>
    <div class="approve_wrap flow_design">
        <!--页头-->
        <el-row class="row-bg title" justify="space-between">
            <el-col :span="12" class="text_left">
              {{l('{approveLocale.menu.flowDesign}')}}
              <!-- <el-checkbox v-model="editable">开启拖拽</el-checkbox> -->
            </el-col>
            <el-col :span="12" class="text_right">
              <el-button type="primary" size="small" @click="createApprove">
                <i class="el-icon-arrow-right el-icon-plus"></i>
                {{l('{approveLocale.set.flowDesign.buttonName}')[0]}}
              </el-button>
              <el-button type="primary" size="small" @click="createFlowType">
                <i class="el-icon-arrow-right el-icon-plus"></i>
                {{l('{approveLocale.set.flowDesign.buttonName}')[1]}}
              </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="bottom_border"></el-col>
        </el-row>
<!--流程类型列表 可拖拽-->
<draggable class="" v-model="approveTypeData" :options="dragOptions1" :move="onMove" @start="isDragging1=true" @end="onEnd1" @update="datadragEnd1">
    <transition-group type="transition" :name="'flip-list1'">
      <el-row v-for="(approveType, index) in approveTypeData" :key="approveType.sid" class="approve_type_list" :id="approveType.sid">
        <el-col :span="24">
            <div class="module_title">
                {{approveType.name}} ( {{approveType.hasOwnProperty("childList") && approveType.childList.length}} )
                <i class="el-icon-edit" @click="eidtApproveType(approveType.sid)"></i>
                <i class="el-icon-delete" @click="deleteApproveType(approveType.sid)"></i>
            </div>
            <div class="module_content">
                <draggable class="" element="ul" v-model="approveType.childList" :options="dragOptions2" :move="onMove" @start="isDragging2=true" @end="onEnd2" @update="datadragEnd2">
                    <transition-group type="transition" :name="'flip-list2'">
                        <li v-for="(subItem,index1) in approveType.childList" :key="index1"  :id="subItem.sid">
                            <div class="show_title">
                                <el-tooltip effect="dark" :content="subItem.name" :hide-after="0" placement="top-start">
                                  <em>{{subItem.name}}</em>
                                </el-tooltip>
                                <span>
                                    <el-switch
                                      v-model="subItem.state"
                                      :width="36"
                                      :active-value="1"
                                      :inactive-value="2"
                                      @change="setFlowDisable(subItem.code,subItem.sid)">
                                    </el-switch>
                                   <!-- <el-button type="text" @click.stop="setFlowDisable(subItem.code,subItem.sid)">{{ subItem.state | flowState }}</el-button> -->
                                </span>
                            </div>
                            <div class="show_list">
                                <div class="list_wrap">
                                     <div class="list">
                                        <el-dropdown @command="showMoreCommand" trigger="hover">
                                          <span class="el-dropdown-link">
                                            {{l('{approveLocale.set.flowDesign.listInfo.moreName}')}}
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                          </span>
                                          <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(item,index) in l('{approveLocale.set.flowDesign.listInfo.more}')" :key="index" :command="{type:index,code:subItem.code,sid:subItem.sid}">
                                                {{item.name}}
                                            </el-dropdown-item>
                                          </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="list" :class="{disabled:subItem.freeOrTemplate == 'F'}" :disabled="subItem.freeOrTemplate == 'F'" @click.stop="flowDesign(subItem.code)">
                                        {{l('{approveLocale.set.flowDesign.listInfo.flowDesignName}')}}
                                    </div>
                                    <div class="list" @click.stop="formDesign(subItem.code)">
                                        {{l('{approveLocale.set.flowDesign.listInfo.formDesignName}')}}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </transition-group>
                </draggable>
            </div>
        </el-col>
      </el-row>

    </transition-group>
</draggable>
        <!--右侧弹窗，创建审批分类-->
        <right-slide-modal :title="categoryDialogType==='category' ? l('{approveLocale.set.flowDesign.createFlowType.title}') : l('{approveLocale.set.flowDesign.createFlowType.showTitle}')" :visible.sync="categoryDialogVisible" class="approve_right_model">
            <div slot="operateButtons" class="operate_buttons">
              <ul>
                  <li v-if="categoryDialogType==='category'" v-for="(item,index) in l('{approveLocale.set.flowDesign.createFlowType.buttons}')" :key="index">
                    <el-button @click="operateFun(index)">{{item}}</el-button>
                  </li>
                  <li v-if="categoryDialogType==='showApprove'">
                    <el-button @click="categoryDialogVisible = false ">{{l('{approveLocale.set.flowDesign.createFlowType.buttons}')[1]}}</el-button>
                   </li>
              </ul>
            </div>
            <!--创建流程分类-->
            <create-category
                ref="category"
                v-if="categoryDialogType==='category'"
                :categoryInfo="categoryInfoData"
                @closeDialog = "closeDialog">
            </create-category>
            <!--预览模板-->
            <show-approve
                ref="showApprove"
                v-if="categoryDialogType==='showApprove'"
                :data="flowTemplateInfo"
                @closeDialog = "closeDialog">
            </show-approve>
        </right-slide-modal>
        <!--选择人员-->
          <user-tree
            :selectUserDialogVisible="selectUserDialogVisible"
            :selectedUsers = "selectedUsers"
            @closeCreateModal ="selectUserDialogVisible = !selectUserDialogVisible"
            @getUserTree = "getUserTree">
          </user-tree>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../approve.locale'))
    import config from '@/config/index.js'
    import createCategory from '@Main/approve/set/createCategory.vue'
    import showApprove from '@Main/approve/set/showApprove.vue'
    import draggable from 'vuedraggable'//拖拽
    import Sortable  from 'sortablejs'//拖拽、排序
    import {getFlowCategoryChildList,getFlowInfoById,setFlowDisable,deleteApproveType,deleteFlowTemplate,flowDragSort,approveDragSort} from '@Main/approve/getData'

    export default{
        components: {
            draggable,//拖拽
            Sortable,//拖拽、排序
            createCategory,
            showApprove,
        },
        data(){
            return {
                xx:true,
                editable:true,
                isDragging1: false,
                isDragging2: false,
                delayedDragging1:false,
                delayedDragging2:false,
                approveTypeData:[],
                // approveTypeData:[{
                //     sid:'1001',
                //     name: '请假考勤',
                //     childList:[{
                //         sid:'11001',
                //         state:true,
                //         name:'请假申请'
                //     },{
                //         sid:'11002',
                //         state:true,
                //         name:'未打卡申请'
                //     },{
                //         sid:'11003',
                //         state:false,
                //         name:'出差申请'
                //     },{
                //         sid:'11004',
                //         state:false,
                //         name:'公出申请'
                //     }]
                //   },{
                //     sid:'1002',
                //     name: '费用管理',
                //     childList:[{
                //         sid:'12001',
                //         state:false,
                //         name:'日常报销请假申请请假申请请假申请请假申请请假申请'
                //     },{
                //         sid:'12002',
                //         state:false,
                //         name:'出差报销'
                //     },{
                //         sid:'12003',
                //         state:false,
                //         name:'项目报销'
                //     },{
                //         sid:'12004',
                //         state:false,
                //         name:'借款申请'
                //     }]
                //   },{
                //     sid:'1003',
                //     name: '营销管理',
                //     childList:[{
                //         sid:'13001',
                //         state:true,
                //         name:'合同申请'
                //     },{
                //         sid:'13002',
                //         state:false,
                //         name:'付款申请'
                //     },{
                //         sid:'13003',
                //         state:false,
                //         name:'发票申请'
                //     }]
                //   },{
                //     sid:'1004',
                //     name: '人事管理',
                //     childList:[{
                //         sid:'14001',
                //         state:false,
                //         name:'入职审批'
                //     },{
                //         sid:'14002',
                //         state:false,
                //         name:'转账申请'
                //     },{
                //         sid:'14003',
                //         state:false,
                //         name:'调岗申请'
                //     },{
                //         sid:'14004',
                //         state:false,
                //         name:'离职申请'
                //     },{
                //         sid:'14005',
                //         state:false,
                //         name:'调薪申请'
                //     }]
                //   },{
                //     sid:'1005',
                //     name: '行政办公',
                //     childList:[{
                //         sid:'15001',
                //         state:false,
                //         name:'办公用品领用'
                //     },{
                //         sid:'15002',
                //         state:false,
                //         name:'会议申请'
                //     },{
                //         sid:'15003',
                //         state:false,
                //         name:'公章申请'
                //     },{
                //         sid:'15004',
                //         state:false,
                //         name:'办公用品采购'
                //     }]
                //   },{
                //     sid:'1006',
                //     name: '自由流程',
                //     childList:[{
                //         sid:'16003',
                //         state:false,
                //         name:'创建自由流程'
                //     },{
                //         sid:'16003',
                //         state:false,
                //         name:'特殊采购1'
                //     },{
                //         sid:'16003',
                //         state:false,
                //         name:'自由流程2'
                //     }]
                //   },
                // ],
                selectUserDialogVisible:false,
                selectedUsers:[],//已选择流程模板的使用范围，临时变量
                // selectedUsers:[{//已选择流程模板的使用范围，临时变量
                //     sid:'1000',
                //     name:'创建者'
                // }],
                categoryDialogVisible:false,//分类右侧弹窗
                categoryDialogType:'',//右侧弹出的内容
                categoryInfoData:{//分类编辑
                  id:'',
                  name: '',
                  description: ''
                },
                flowTemplateInfo:{//流程模板的信息
                    sid:'',
                    code:''
                },
            }
        },
        filters:{
            //模板状态：state 1是启用,2是禁用
            flowState (value){
                // switch (value) {
                //     case 1:
                //         return '启用';
                //     case 2:
                //         return '禁用';
                //     default:
                //         return '--';
                // }
                switch (value) {
                    case 1:
                        return true;
                    case 2:
                        return false;
                    default:
                        return '--';
                }
            },
        },
        computed: {
            dragOptions1 () {
                return  {
                    animation: 0,
                    group: 'description1',
                    disabled: !this.editable,
                    ghostClass: 'ghost1',
                };
            },
            dragOptions2 (){
                return  {
                    animation: 0,
                    group: 'description2',
                    disabled: !this.editable,
                    ghostClass: 'ghost2'
                };
            },
        },
        methods:{
            //获取流程分类列表
            async getFlowCategoryChildList(){
                let res = await getFlowCategoryChildList()
                console.info(res)
                this.approveTypeData = [...res]
            },
            //模板配置，打开新窗口
            openNewWindow:function(code = 0, stage = 0){
                // let routeData = this.$router.resolve({
                //     name: 'setFlowClient',
                //     params:{id:code},
                //     query: {stage: stage}
                // });
                // window.open(routeData.href, '_self');
                this.$router.push({
                    name: 'setFlowClient',
                    params:{id:code},
                    query: {stage: stage}
                })
            },
            //创建审批，打开新页面
            createApprove:function() {
                // this.$message("打开新页面，设计审批流")
                this.openNewWindow()
                // this.$router.push({path:'/approve/set/createApprove/0', query:{stage: 0}});// 带查询参数，变成/approve?stage=stage
            },
            //创建分类，打开右侧弹出窗
            createFlowType:function(){
                this.categoryInfoData = {
                  id:'',
                  name: '',
                  description: ''
                }
                this.categoryDialogVisible = true
                this.categoryDialogType = 'category'  //创建、编辑分类
            },
            //编辑审批分类
            async eidtApproveType( id ){
                let res = await getFlowInfoById(id)
                this.categoryInfoData = JZY.u.deepExtend({},res)
                this.categoryDialogVisible = true
                this.categoryDialogType = 'category'  //创建、编辑分类
            },
            //删除审批分类
            async deleteApproveType( sid = '' ){
                let res = await deleteApproveType(sid)
                console.info(res)
                if (res[0]==1) {
                    this.$message({
                        type: 'success',
                        message: '成功删除审批分类'
                    });
                    this.getFlowCategoryChildList()
                }else{
                    this.$message({
                        type: 'warning',
                        message: '删除审批分类失败'
                    });
                }
            },
            // 拖拽事件
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                // console.info(relatedElement)
                // console.info(draggedElement)
                console.info(this.approveTypeData)
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            },
            datadragEnd1 (evt) {
                console.log('1拖动前的索引 :' + evt.oldIndex)
                console.log('1拖动后的索引 :' + evt.newIndex)
                console.log(this.tags)
            },
            datadragEnd2 (evt) {
                console.log('2拖动前的索引 :' + evt.oldIndex)
                console.log('2拖动后的索引 :' + evt.newIndex)
                console.log(this.tags)
            },
            // 流程分类的拖拽排序
            async onEnd1 (evt) {
                this.isDragging1 = false

                let firstSort = '',
                    afterSort = '',
                    flowCategoryId = evt.clone.id ;

                console.info(evt)
                console.info(flowCategoryId)

                console.info(this.approveTypeData)
                if (evt.newIndex == 0) {
                    afterSort = this.approveTypeData[evt.newIndex+ 1 ].sort
                }else if(evt.newIndex == this.approveTypeData.length - 1 ){
                    firstSort = this.approveTypeData[evt.newIndex - 1].sort
                }else{
                    firstSort = this.approveTypeData[evt.newIndex - 1 ].sort
                    afterSort = this.approveTypeData[evt.newIndex + 1 ].sort
                }
                console.info(firstSort)
                console.info(afterSort)
                let res = await flowDragSort(String(firstSort),String(afterSort),flowCategoryId)//审批模板的拖拽排序
                console.info(res[0])
                if (res[0] == 1) {//排序成功
                    this.$message({
                        type: 'success',
                        message: '排序成功'
                    });
                }else{
                    this.$message({
                        type: 'warning',
                        message: '排序失败'
                    });

                }
                this.getFlowCategoryChildList()

            },
            // 审批模板的拖拽排序
            async onEnd2 (evt) {
                this.isDragging2 = false

                let firstSort = '',
                    afterSort = '',
                    flowTemplateId = evt.clone.id,
                    flowCategoryId = evt.to.offsetParent.id ;

                console.info(evt)
                console.info(flowTemplateId)
                console.info(flowCategoryId)
                let obj = this.approveTypeData.filter(function(item,index) {
                    return item.sid == flowCategoryId;
                });

                console.info(obj[0].childList)
                if (evt.newIndex == 0) {
                    afterSort = obj[0].childList[evt.newIndex + 1].sort
                }else if(evt.newIndex == obj[0].childList.length -1 ){
                    firstSort = obj[0].childList[evt.newIndex - 1].sort
                }else{
                    firstSort = obj[0].childList[evt.newIndex - 1].sort
                    afterSort = obj[0].childList[evt.newIndex + 1].sort
                }
                console.info(firstSort)
                console.info(afterSort)
                let res = await approveDragSort(String(firstSort),String(afterSort),flowTemplateId,flowCategoryId)//审批模板的拖拽排序
                console.info(res[0])
                if (res[0] == 1) {//排序成功
                    this.$message({
                        type: 'success',
                        message: '排序成功'
                    });
                }else{
                    this.$message({
                        type: 'warning',
                        message: '排序失败'
                    });
                }

                this.getFlowCategoryChildList()

            },

            //创建分类，右侧弹出页面顶部的功能按钮事件
            operateFun(index){
              switch(index){
                  case 0:
                    this.saveDialog ();
                    break;
                  case 1:
                    this.closeDialog ();
                    break;
                  default:
                    this.$message('错误');
              }

            },
            //创建分类，保存
            saveDialog (){
                this.$refs.category.saveCategoryForm();//调用保存流程分类接口
            },
            //创建分类，关闭
            closeDialog (from = ''){
                this.categoryDialogVisible = false
                this.categoryDialogType = ''  //创建、编辑分类
                from === 'reflashData' && this.getFlowCategoryChildList()
                // this.$message({
                //     type: 'success',
                //     message: '关闭成功'
                // });
            },

            //显示审批分类板块的功能按钮，作废
            overShow(e){
                let target = e.target;
                target.children[1].style.display = "block";
            },
            //隐藏审批分类板块的功能按钮，作废
            outHide(e){
                let target = e.target;
                target.children[1].style.display = "none";
            },
            //打开表单设计器页面
            formDesign:function(code){
                this.openNewWindow(code,1)
                // this.$message('设计id为'+code+'的表单');
            },
            //打开流程设计器页面
            flowDesign:function(code){
                this.openNewWindow(code,2)
                // this.$message('设计id为'+code+'的流程');
            },
            //设置模板的启用\禁用
            async setFlowDisable( code = '' ,sid = '' ){
                let res = await setFlowDisable(code,sid)
                // if (res[0] === 'disable') {//开启/关闭失败

                // }
                console.info(res[0])
                // this.$message('模板编码为：'+code+'的流程启用成功');
                // this.$message({
                //     type: 'success',
                //     message: '操作成功'
                // });

                this.getFlowCategoryChildList()
            },
            //显示审批分类板块的更多功能按钮
            showMoreCommand(obj){
                console.info(obj)
                switch(obj.type){//预览模板
                  case 0:
                    // this.$message('预览id为'+obj.code+'的流程');
                    this.flowTemplateInfo = {
                        sid:obj.sid,
                        code:obj.code
                    }
                    this.categoryDialogVisible = true
                    this.categoryDialogType = 'showApprove'  

                    break;
                  case 1:
                    // this.$message('删除id为'+obj.code+'的流程');
                    this.deleteApproveById(obj.code)
                    break;
                  case 2:
                    // this.$message('编辑id为'+obj.code+'的流程');
                    this.openNewWindow(obj.code,0)
                    // this.$router.push({path:'/approve/set/createApprove/' + obj.code, query:{stage: 0}});// 带查询参数，变成/approve?stage=stage
                    break;
                  case 3:
                    // this.selectUserDialogVisible = true

                    this.openNewWindow(obj.code,3)
                    break;
                  default:
                    this.$message('错误');
                }
            },
            //删除审批模板
            async deleteApproveById(code){
                let res = await deleteFlowTemplate(code)
                // if (true) {}
                console.info(res[0])
                if (res[0] == 1) {//排序成功
                    this.$message({
                        type: 'success',
                        message: '审批模板删除成功'
                    });
                    this.getFlowCategoryChildList()

                }else{
                    this.$message({
                        type: 'warning',
                        message: '审批模板删除失败'
                    });
                }
            },
            //接收用户树返回的数据
            getUserTree:function(arr){
              console.info(arr)
              this.selectedUsers = [...arr]
            },
        },
        mounted(){
            this.getFlowCategoryChildList();
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        watch: {
            isDragging1 (newValue) {
                if (newValue){
                    this.delayedDragging1= true
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging1 =false
                })
            },
            isDragging2 (newValue) {
                if (newValue){
                    this.delayedDragging2= true
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging2 =false
                })
            }
        }
    }
</script>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.flow_design.approve_wrap{
    .title{
        padding-bottom:8px;
    }
  .approve_type_list{
    padding-top:15px;
    .module_title{
        @include sc(14px,$theme-black-title)
        margin-left:16px;
        i{
            margin-left:8px;
            &:hover{
                cursor:pointer;
            }
        }
    }
    .module_content{
        padding:18px 0px;
        ul{
            padding:0;
            margin: 0;
            & > span{
                min-height:30px;
                display:block;
            }
            li{
                list-style: none;
                height: 100px;
                width: calc(23% - 2px - 17px);
                line-height: 22px;
                padding-top: 10px;
                margin-left: 1%;
                margin-right: 1%;
                margin-bottom: 13px;
                // text-indent: 17px;
                padding-left: 17px;
                float: left;
                font-size: 15px;
                display: inline-block;
                background-color:rgba(255, 255, 255, 1);
                border: 1px solid #CEE8FF;
                overflow: hidden;
                &:hover{
                    cursor: pointer;
                    background-color:#EAF5FF;
                    // box-shadow:5px 5px 5px rgba(0, 0, 0, 0.5);
                    .show_list{
                        display:block;
                    }
                }
                .show_title{
                    // width: 75%;
                    width: 100%;
                    height: 60%;
                    position: relative;
                    em{
                        width:calc(100% - 60px);
                        height: 22px;
                        display:block;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    span .el-switch{
                        position:absolute;
                        top:1px;
                        right: 10px;
                    }
                    span button{
                        position:absolute;
                        padding:5px 10px;
                        border-radius: 3px;
                        text-align: center;
                        right: -30%;
                        top: -1px;
                        z-index: 1;
                        &:hover{
                            background-color: rgba(70, 167, 255, 1);
                            color:#fff;
                        }
                    }
                }
                .show_list{
                    width: 100%;
                    text-align: right;
                    display:none;
                    .list_wrap{
                        // display: flex;
                        // justify-content: flex-end;
                        .list{
                            width: auto;
                            float:right;
                            margin-right:8px;
                            text-indent: 0;
                            color: $theme-black;
                            font-size: 12px;
                            padding:4px 6px;
                            border-radius: 3px;
                            background: none;
                            border:none;
                            .el-dropdown{
                                font-size:12px;
                                span{
                                    color: $theme-black;
                                }
                            }
                            &:hover{
                                border:none;
                                cursor:pointer;
                                background-color: $theme-blue-active;
                                color:#fff;
                                .el-dropdown{
                                    span{
                                        color: #fff
                                    }
                                }
                            }
                            &.disabled{
                                color:$theme-black-other;
                                background-color:$theme-grey-header-background;

                                &:hover{
                                    border:none;
                                    color:$theme-black-other;
                                }
                            }
                        }
                        &:last-child{
                            margin-right:10px;
                        }
                    }
                }
                
            }
        }
    }
  }
}
</style>