<template>
    <div class="stageDetail"  v-show="isStageDetail">
        <div class="stage-title">
            <h3>招商阶段这里可以显示完整标题标题再长也应该不会有这么这么这么这么这么这么这么这么这么这么这么这么多个字的吧</h3>
            <span>2017-03-32至2019-06-31</span>
            <span><icon name="members" scale = "1.2" style="color:#505050" ></icon>&nbsp;9</span>
            <div class="operation">
                <el-button type="primary" size="small"><span class="el-icon-plus"></span>添加分组</el-button>
                <el-button size="small" @click="gobackStage">返回</el-button>
            </div>
        </div>


        <!--<el-row  type="flex" justify="space-around" style="">-->
        <div class="stage-content">
            <div class="stage-wrap">

                <draggable class="stage-step" element="div" v-model="dragList" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <div class="stage-step-item" v-for="(item,index) in dragList"  :key="item.id" style="">
                            <div class="title"  v-if="item.id!=stageNameIseditId">
                                <h4 @click="editStage(item.id,item.name)">{{item.name}}</h4>
                                <!--<el-input class="stage-input" size="small" v-model="item.name" placeholder="请输入标题"></el-input>-->
                                <el-dropdown @command="handleCommand" class="dropdown">
                                            <span class="el-dropdown-link">
                                                <icon name="more-list" scale = "2.5" style="color:#505050" ></icon>
                                            </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="a">编辑分组</el-dropdown-item>
                                        <el-dropdown-item command="b">删除分组</el-dropdown-item>
                                        <el-dropdown-item command="c">第一行插入</el-dropdown-item>
                                        <el-dropdown-item command="d">复制到左边</el-dropdown-item>
                                        <el-dropdown-item command="e">复制到右边</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="title-edit" v-else>
                                <el-form :inline="true" :model="item"  ref="searchForm">
                                    <el-form-item  prop="name">
                                        <el-input v-model="item.name" style="width: 212px"></el-input>
                                    </el-form-item>
                                    <el-form-item class="operation">
                                        <el-button type="primary" size="small" @click="saveStageName(index)">保存</el-button>
                                        <el-button size="small" @click="cancelStageName(index)">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <draggable class="" element="ul" v-model="item.taskList" :options="dragOptions2" :move="onMove" @start="isDragging2=true" @end="isDragging2=false">
                                <transition-group type="transition" :name="'flip-list'">
                                    <li class="list-group-item clearfix" v-for="itemChild in item.taskList" :key="itemChild.id">
                                        <div class="dec">
                                            <h5>{{itemChild.title}}</h5>
                                            <span class="time"><i class="el-icon-time"></i> {{itemChild.time}}</span>
                                            <span class="state">未启动</span>
                                            <span class="author">
                                                {{itemChild.author}}
                                            </span>
                                        </div>
                                    </li>
                                </transition-group>
                            </draggable>

                            <p class="add"><span class="el-icon-plus"></span>添加任务</p>
                        </div>
                    </transition-group>
                </draggable>
            </div>
        </div>
        <!--</el-row>-->
    </div>
</template>
<script>
    //拖拽
    import draggable from 'vuedraggable'
    import Sortable  from 'sortablejs'
    import Divider from "../../../../../../node_modules/vux/src/components/divider/index";
    export default {
        components: {//拖拽
            Divider,
            draggable,
            Sortable,
        },
        props: {
            isStageDetail:{
                type:Boolean,
                required:true
            }
        },
        data() {
            return {
                dragList:[
                    {
                        name:'计划中',
                        id:'1',
                        taskList:[
                            {
                                title:'任务1&1任务1&1任务1&1我确定确定确定确定确定确定确定确定确定',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1001'
                            },{
                                title:'任务1&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1002'
                            },{
                                title:'任务1&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1003'
                            },{
                                title:'任务1&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1004'
                            },{
                                title:'任务1&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1005'
                            },{
                                title:'任务1&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'1006'
                            }
                        ]
                    },{
                        name:'准备中',
                        id:'2',
                        taskList:[
                            {
                                title:'任务2&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2001'
                            },{
                                title:'任务2&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2002'
                            },{
                                title:'任务2&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2003'
                            },{
                                title:'任务2&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2004'
                            },{
                                title:'任务2&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2005'
                            },{
                                title:'任务2&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'2006'
                            }
                        ]
                    },{
                        name:'执行中',
                        id:'3',
                        taskList:[
                            {
                                title:'任务3&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3001'
                            },{
                                title:'任务3&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3002'
                            },{
                                title:'任务3&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3003'
                            },{
                                title:'任务3&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3004'
                            },{
                                title:'任务3&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3005'
                            },{
                                title:'任务3&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'3006'
                            }
                        ]
                    },{
                        name:'已完成',
                        id:'4',
                        taskList:[
                            {
                                title:'任务4&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4001'
                            },{
                                title:'任务4&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4002'
                            },{
                                title:'任务4&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4003'
                            },{
                                title:'任务4&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4004'
                            },{
                                title:'任务4&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4005'
                            },{
                                title:'任务4&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'4006'
                            }
                        ]
                    },{
                        name:'未开始',
                        id:'5',
                        taskList:[
                            {
                                title:'任务4&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5001'
                            },{
                                title:'任务4&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5002'
                            },{
                                title:'任务4&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5003'
                            },{
                                title:'任务4&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5004'
                            },{
                                title:'任务4&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5005'
                            },{
                                title:'任务4&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'5006'
                            }
                        ]
                    },{
                        name:'未开始',
                        id:'6',
                        taskList:[
                            {
                                title:'任务6&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6001'
                            },{
                                title:'任务6&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6002'
                            },{
                                title:'任务6&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6003'
                            },{
                                title:'任务6&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6004'
                            },{
                                title:'任务6&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6005'
                            },{
                                title:'任务6&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'6006'
                            }
                        ]
                    },{
                        name:'未开始',
                        id:'7',
                        taskList:[
                            {
                                title:'任务7&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7001'
                            },{
                                title:'任务7&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7002'
                            },{
                                title:'任务7&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7003'
                            },{
                                title:'任务7&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7004'
                            },{
                                title:'任务7&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7005'
                            },{
                                title:'任务7&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'7006'
                            }
                        ]
                    },{
                        name:'未开始',
                        id:'8',
                        taskList:[
                            {
                                title:'任务8&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8001'
                            },{
                                title:'任务8&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8002'
                            },{
                                title:'任务8&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8003'
                            },{
                                title:'任务8&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8004'
                            },{
                                title:'任务8&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8005'
                            },{
                                title:'任务8&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'8006'
                            }
                        ]
                    },{
                        name:'未开始',
                        id:'9',
                        taskList:[
                            {
                                title:'任务9&1',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9001'
                            },{
                                title:'任务9&2',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9002'
                            },{
                                title:'任务9&3',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9003'
                            },{
                                title:'任务9&4',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9004'
                            },{
                                title:'任务9&5',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9005'
                            },{
                                title:'任务9&6',
                                time:'2018-02-30',
                                author:'赵廷广',
                                id:'9006'
                            }
                        ]
                    }
                ],
                isDragging: false,
                isDragging2: false,
                delayedDragging:false,
                list2:[],
                editable:true,
                stageNameIseditId:null,
            }
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    disabled: !this.editable,
                    ghostClass: 'ghost',
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
            dragListString(){
                return JSON.stringify(this.dragList, null, 2);
            }
        },
        filters:{
        },
        methods: {
            gobackStage(){
                this.$emit("gobackStage");
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
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            //编辑项目阶段
            editStage(id,name){
                this.stageNameIseditId = id;
            },
            //取消操作
            cancelStageName(){
                this.stageNameIseditId = null;
            },
            //保存操作
            saveStageName(){
                this.stageNameIseditId = null;
            }
        },
        watch: {
            isDragging (newValue) {
                if (newValue){
                    this.delayedDragging= true
                    return
                }
                this.$nextTick( () =>{
                    this.delayedDragging =false
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .stageDetail{
        padding-top: 24px;
        position: relative;
        .stage-title{
            h3{
                color: $theme-black-title;
                font-size: 12px;
                display: inline-block;
                margin-right: 16px;
            }
            .time,.members{
                color:$theme-black;
            }
            .operation{
                position: absolute;
                right: 16px;
                top:16px;
            }
        }
        .stage-content{
            width: 100%;
            overflow-x: auto;
            .stage-wrap{
                width: 999999999999999em;
            }
            .stage-step{
                width: auto;
            }
            .stage-step-item{
                background: $theme-grey-body-background;
                border-radius: 3px;
                margin-right: 16px;
                margin-bottom: 40px;
                padding: 40px 8px 0;
                position: relative;
                width: 264px;
                float: left;
                position: relative;
                .title{
                    position: absolute;
                    top:0;
                    left:0;
                    z-index: 1;
                    width: 100%;
                    height: 40px;
                    overflow: hidden;
                    margin-bottom: 20px;
                    h4{
                        font-size: 12px;
                        color: $theme-black;
                        font-weight: normal;
                        line-height: 40px;
                        padding-left: 8px;
                        margin: 0;
                    }
                    .dropdown{
                        position: absolute;
                        right: 16px;
                        top: 8px;

                        .el-icon-more{
                            margin-right: 22px;
                            line-height: 48px;
                        }
                    }
                }
                .title-edit{
                    position: absolute;
                    top:0;
                    left:0;
                    z-index: 1;
                    height: 80px;
                    box-shadow: -1px 2px 4px 0  rgba(204,204,204,0.80);border-radius: 3px;
                    background: $theme-grey-body-background;
                    padding: 8px;
                    .operation{
                        float: right;
                        margin-top: -16px;
                        margin-right: 0px;
                    }
                    
                }
                .add{
                    text-align: left;
                    height: 24px;
                    line-height: 24px;
                    font-size: 12px;
                    color: $theme-black;
                    cursor: pointer;
                }
                .add:hover{
                    color: $theme-blue;
                }

                ul{
                    min-height: 12px;
                    &>span{
                        display: block;
                        min-height: 12px;
                    }
                    li{
                        background: #ffffff;
                        border-radius: 3px;
                        margin-bottom: 8px;
                        line-height: 24px;
                        padding: 8px 8px 0;
                        position: relative;
                        .num{
                            width: 30px;
                            text-align: center;
                            float: left;
                            color: #888888;
                        }
                        .dec{
                            position: relative;
                            h5{
                                padding-top: 3px;
                                margin: 0;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                font: 12px normal;
                                color: $theme-black;
                                width: 180px;
                                margin-bottom: 4px;
                            }
                            .state{
                                position: absolute;
                                right: 8px;
                                top: 0px;
                                color: $theme-blue;
                            }
                            .time{
                                color: $theme-black-other;
                                font-size: 12px;
                                line-height: 36px;
                            }
                            .author{
                                padding: 2px 6px;
                                line-height: 16px;
                                border-radius: 2px;
                                font-size: 12px;
                                color: $theme-black-other;
                            }
                        }
                    }
                }
            }
            .stage-input{
                width: 150px;
                margin: 12px 0 0px 12px;
            }
        }

    }
</style>
