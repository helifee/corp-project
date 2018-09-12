<template>
    <div class="m_details_task">
        <!-- <scroller lock-x scrollbar-y  height="-10px"> -->
            <!-- <scroller lock-x height="667px"> -->
        <div class="task_detail_content">
            <group label-width="4.5em" label-margin-right="2em" label-align="left" >
                <cell title="任务名称"   align-items="flex-start" >
                    <div class="rightBd text_l_r"  slot>{{taskName}}</div></cell>
                <cell class="" title="关联项目" align-items="flex-start">
                    <slot name="value">
                        <span class="text_l_r">{{projectName}}</span>
                    </slot>
                </cell>
                <!-- <cell class="" title="关联阶段" align-items="flex-start" :value="projectStage"></cell> -->
                <cell class="spacing" title="负责人" align-items="flex-start" :value="chargePerson"></cell>
                <cell class="" title="参与人" align-items="flex-start">
                    <slot name="value">
                        <span class="text_l_r">{{tshares}}</span>
                    </slot>
                </cell>
                <cell class="" title="共享人" align-items="flex-start">
                    <slot name="value">
                        <span class="text_l_r">{{shaPerson}}</span>
                    </slot>
                </cell>

                <cell class="spacing" title="创建人" :value="createPersonName"></cell>
                <cell class="" title="创建时间" :value="createDate">
                </cell>

                <cell class="spacing" title="任务进度" :value="progress"></cell>
                <cell class="" title="任务状态" :value="state"></cell>
                <cell class="" title="紧急程度" :value="degree"></cell>
                <cell class="spacing" title="开始时间">
                    <slot name="value">
                        {{ startTime | formatEendDateByMoment }}
                    </slot>
                </cell>
                <cell class="" title="结束时间">
                    <slot name="value">
                        {{ endTime | formatEendDateByMoment }}
                    </slot>
                </cell>
                <attachItem class="spacing" v-if="attachInfoParam.businessId" :param="attachInfoParam"></attachItem>
                <cell class="spacing" title="提醒" :value="remainedShowName"></cell>
                <cell class="" title="被提醒人" :value="remindPeople"></cell>
                <cell class="spacing" title="任务描述" align-items="flex-start">

                    <div class="rightBd text_l_r"  style="white-space:pre-line" slot>{{textValue}}</div>
                    <!--<slot name="value">-->
                        <!--<span class="text_l_r">{{textValue}}</span>-->
                    <!--</slot>-->
                </cell>
                <!-- <x-textarea class="spacing" :readonly="true" title="任务描述" :value="textValue" :rows="3"></x-textarea> -->
                <!-- <flexbox>
                    <flexbox-item>
                    <x-button>评论</x-button>
                    </flexbox-item>
                    <flexbox-item style="margin-left:0px;">
                    <x-button>编辑</x-button>
                    </flexbox-item>
                </flexbox> -->
            </group>
        </div>
            <!-- </scroller> -->
        <!--评论组件调用-->
        <!-- 参数说明如下：
            ref：固定样式，不用改
            businessId：业务id，具体的文章id
            commentUserId：//被评论人id，即业务组件的创建人id
            businessType：//业务分类，具体模块问后端开发人员，例如“0”是任务模块
            startCommentSwitch：是否开启评论的开关（或者直接去底部导航栏里footerList中的评论标签即可）
            dialogVisible：//默认是否显示评论输入框

            smartComment：显示评论输入框的事件，固定样式，不用改
            changeCommentVisible：关闭评论输入框的事件，固定样式，不用改
        -->
        <smart-comment-view
            ref="smartCommentView"
            :businessId="taskId"
            :commentUserId = '$store.state.session.sid'
            businessType="0"
            :startCommentSwitch = " fromPage !== 'set' "
            :dialogVisible="dialogVisible"
            @smartComment="smartComment"
            @changeCommentVisible="changeCommentVisible">
        </smart-comment-view>

        <!--底部导航栏组件调用-->
        <footer-view
            :footerList = "footerList"
            @moreOperate = "moreOperate"
            @smartComment="smartComment">
        </footer-view>
        <!--任务更多操作弹出窗-->
        <actionsheet
            v-model="showMoreOperate"
            :menus="moreOperateList"
            @on-click-menu="clickMoreOperate"
            @on-click-menu-delete="onDeleteMoreOperate"
            show-cancel>
            <div slot="header"><p style="color: #999;font-size: 15px">更多</p></div>
        </actionsheet>

        <!--任务删除弹出窗-->
        <div v-transfer-dom>
          <confirm v-model="showDeleteDialog"
              title="确认删除"
              @on-confirm="deleteTask">
                <p style="text-align:center;">
                    <p style="color:red">该任务数据都会被删除</p>
                    <p>你还要继续吗？</p>
                </p>
          </confirm>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import { Group, Cell, Flexbox, FlexboxItem, Panel, XButton,Scroller,XTextarea,  Actionsheet, TransferDomDirective as TransferDom, Confirm  } from 'vux'
/*底部导航栏（操作）组件-局部引入*/
import footerView from '@mobile/components/m_public/m_footer.vue'

/*评论组件-局部引入*/
import smartCommentView from '@mobile/components/m_smartComment/m_smartView.vue'
import attachItem from '../../../components/attachItem.vue'
import { getTaskInfoById, getTaskAuth, deleteTask, updateTaskStatus, setFollow, setCancelFollow, } from '@mobile/pages/m_task/getData'


//任务状态
let goBackButtonsName = {
    initName:'操作',
    update:'编辑',
    follow:'关注',
    unfollow:'取消关注',
    taskFinish:'任务完成',
    taskClose:'任务关闭',
    taskReturn:'返回',
    taskNotFinish:'任务未完成',
    taskActivation:'任务激活',
    taskDelete:'任务删除'
    // initName:'操作',
    // edit:'编辑',
    // concern:['取消关注','关注'],
    // complete:['已完成','任务完成'],
    // close:'任务关闭',
    // goback:'返回'
}
export default {
    directives: {
        TransferDom
    },
    components: {
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        Panel,
        XButton,
        Scroller,
        XTextarea,
        Confirm,
        Actionsheet,
        attachItem,
        footerView,
        smartCommentView,
    },
    methods:{
        //初始化获取数据
        initData(){
            //从地址栏里获取
            this.taskId = this.$route.params.id
            this.fromPage = this.$route.query.fromPage
        },
        //获取任务详情
        async getTaskInfoByIdData({taskId=''} = {} ){
            let res = await getTaskInfoById(taskId)
            console.info('任务详情',res[0])
            this.taskName=res[0].taskName;//项目名称
            this.projectName=res[0].projectName;//项目名称
            this.projectId=res[0].projectId;//项目id
            this.projectStage=res[0].projectstageName;//项目阶段
            this.chargePerson=res[0].taskLiableName;//负责人
            this.participants=res[0].taskParticipantsSharedListDto;//参与人
            //参与人处理
            if(this.participants){
                let personList = this.participants.personList;
                if(personList){
                    if(personList.length>0){
                        this.tsharePerson=[];
                        personList.forEach((n,i)=>{
                            this.tsharePerson.push(n.sharedshowName);
                        })
                        this.tshares = this.tsharePerson.join(" ");
                    }
                }
            }

            this.shaPerList=[];
            this.sharedPerson='';
            console.log('共享人共享人共享人共享人',res[0].taskSharedListDto);
            this.sharedPerson=res[0].taskSharedListDto;//共享人

            //共享人处理---部门
            if(this.sharedPerson){
                let departmentList = this.sharedPerson.departmentList;
                if(departmentList){
                    if(departmentList.length>0){
                        departmentList.forEach((n,i)=>{
                            this.shaPerList.push(n.sharedshowName);
                        })
                    }
                }
            }

            //共享人处理---角色
            if(this.sharedPerson){
                let roleList = this.sharedPerson.roleList;
                if(roleList){
                    if(roleList.length>0){
                        roleList.forEach((n,i)=>{
                            this.shaPerList.push(n.sharedshowName);
                        })
                    }
                }
            }
            
            //共享人处理---姓名
            if(this.sharedPerson){
                let sharePersonList = this.sharedPerson.personList;
                if(sharePersonList){
                    if(sharePersonList.length>0){
                        sharePersonList.forEach((n,i)=>{
                            this.shaPerList.push(n.sharedshowName);
                        })
                       
                    }
                }
            }
            console.log('gongxiangren ',this.shaPerList);
            this.shaPerson = this.shaPerList.join(" ");//共享人数据
            this.createPersonName=res[0]['createPersonName']
            this.createDate=res[0]['createDate']

            if(res[0].taskProgress===null || res[0].taskProgress===""){
                this.progress="";
            }else{
                this.progress=res[0].taskProgress+'%';//进度
            }
            // this.progress=res[0].taskProgress;//任务进度
            // this.state=res[0].taskStatus;//任务状态
            if(res[0].taskStatus=="0"){
                this.state="未完成"
            }else if(res[0].taskStatus=="1"){
                this.state="已完成"
            }else if(res[0].taskStatus=="2"){
                this.state="已关闭"
            }else if(res[0].taskStatus=="3"){
                this.state="超期"
            }
            // this.degree=res[0].taskUrgentFlag;//紧急程度
            if(res[0].taskUrgentFlag=="0"){
                this.degree="正常";
            }else if(res[0].taskUrgentFlag=="1"){
                this.degree="紧急";
            }else if(res[0].taskUrgentFlag=="2"){
                this.degree="非常紧急";
            }
            this.startTime=res[0].beginDate;//开始时间
            this.endTime=res[0].endDate;//结束时间

            this.advanceTime=res[0].advanceTime;
            this.remained=[];
            if(this.advanceTime !==-1){
                this.remained.push('到期日前')
                if(this.advanceTime=="0"){
                    this.remained.push('当'+'天')
                }else{
                    this.remained.push(this.advanceTime+'天')
                }
            }else{
                this.remained.push('不提醒')
            }

            this.remindTime=res[0].remindTime//提醒
            console.log('tiixng',this.remindTime);
            if(this.advanceTime !==-1){
                if(this.remindTime.length<5){
                    this.remindTime="0"+this.remindTime;
                    this.remained.push(this.remindTime.substring(1,2)+'点')
                    this.remained.push(this.remindTime.substring(this.remindTime.length-2)+'分')
                }else if(this.remindTime.length>=5){
                    this.remained.push(this.remindTime.substring(0,2)+'点')
                    this.remained.push(this.remindTime.substring(this.remindTime.length-2)+'分')
                }
            }

            console.log('提醒日',this.remained);
            this.remainedShowName=this.remained.join(" ");

            this.remindPeoList=[];
            this.isremindCreateperson=res[0].isremindCreateperson;//创建人
            if(this.isremindCreateperson){
                this.remindPeoList.push('创建人')
            }
            this.isremindLiable=res[0].isremindLiable;//负责人
            if(this.isremindLiable){
                this.remindPeoList.push('负责人')
            }
            this.isremindAffiliated=res[0].isremindAffiliated;//参与人
            if(this.isremindAffiliated){
                 this.remindPeoList.push('参与人')
            }
            console.log('提醒人',this.remindPeople);
            this.remindPeople=this.remindPeoList.join(" ");//被提醒人
            this.textValue=res[0].describe;//任务描述

            this.getTaskAuth()//获取此任务的按钮权限
        },
        //查询任务对应操作权限
        async getTaskAuth(){
            let res = await getTaskAuth(this.taskId)
            // console.info(res[0])
            if (Object.keys(res[0]).length > 0) {

                this.goBackButtons = [] //清空
                Object.keys(res[0]).forEach((item)=>{
                    item !== 'taskReturn' && res[0][item] && this.goBackButtons.push(item)
                })
                if (this.fromPage === 'set') {//任务管理，不显示关注和取消关注的按钮
                    // if (this.goBackButtons.indexOf('unfollow') !== -1) {//未关注
                    //     this.goBackButtons.splice(this.goBackButtons.indexOf('unfollow'),1)//删除未关注
                    // }else if(this.goBackButtons.indexOf('follow') !== -1){
                    //     this.goBackButtons.splice(this.goBackButtons.indexOf('follow'),1)//删除关注
                    // }
                    if ( this.projectId !== '' ) {//项目下的任务，不可管理
                        this.showOperateButton=false
                        this.goBackButtons = []

                        this.footerList = []
                    }else{
                        this.footerList = [{
                          name:'更多',
                          value:'moreOperate',
                        }]
                    }
                    
                }else{
                    // console.info(this.goBackButtons)
                    if (this.goBackButtons.indexOf('follow') === -1) {//未关注
                        this.goBackButtons.splice(1, 0, 'follow')//插入取消关注
                    }else{
                        this.goBackButtons.splice(this.goBackButtons.indexOf('follow'),1)//删除关注
                        this.goBackButtons.splice(1, 0, 'unfollow')//插入取消关注
                    }
                }
            }
            // console.log(this.goBackButtons)
        },
        //更多操作事件
        moreOperate(){
            if (this.showOperateButton) {

                this.moreOperateList = {
//                    'title.noop': '更多'
                }
                // debugger
                this.goBackButtons.forEach((item)=>{
                    this.$set(this.moreOperateList,item, goBackButtonsName[item])
                })
                this.showMoreOperate = true
            }else{//项目下的任务不可以管理
                this.$alert('项目下的任务不可以管理')
            }
            console.info(this.goBackButtons)
            // debugger
        },
        //更多操作选项点击事件,对任务，执行相应的操作
        clickMoreOperate (key) {
            switch(key){
                case 'update': //编辑
                    this.editTask()
                    break;
                case 'follow': //关注
                    this.setTaskFollow(true)
                    break;
                case 'unfollow': //取消关注
                    this.setTaskFollow(false)
                    break;
                case 'taskFinish': //任务完成
                    this.updateTaskStatus('1')
                    break;
                case 'taskClose': //任务关闭
                    this.updateTaskStatus('2')
                    break;
                case 'taskActivation': //任务激活
                    this.updateTaskStatus('4')
                    break;
                case 'taskNotFinish': //任务未完成
                    this.updateTaskStatus('5')
                    break;
                case 'taskDelete': //任务删除
                    // this.deleteTask()
                    this.showDeleteDialog = true
                    break;
                default:
                    // alert(key)
            }
        },
        //编辑任务
        editTask(){
            // this.$alert('编辑任务')
            this.$router.push({
                path:'/m_task/m_edit_task?taskId='+this.taskId
            })
        },
        //关注任务
        async setTaskFollow( bool = true){
            // console.log(bool ? '关注操作':"取消关注")
            if (bool === true) {//关注
                let res = await setFollow(this.taskId)
                if (res[0] == 1 ) {
                    this.$alert('关注成功');
                    this.getTaskAuth()
                }
            }else{//取消关注
                let res = await setCancelFollow(this.taskId)
                if (res[0] == 1 ) {
                    this.$alert('取消关注成功');
                    this.getTaskAuth()
                }
            }
        },
        //改变任务状态
        async updateTaskStatus(type = ''){
            let res = await updateTaskStatus(this.taskId , type)
            if (res[0] == 1) {
                this.$alert('此任务状态修改成功')
                this.getTaskInfoByIdData({ 'taskId':this.taskId })//获取任务详情
                this.getTaskAuth()//获取操作权限按钮
            }else{
                this.$alert('修改失败')
            }     
        },
        //删除任务
        async deleteTask(){
            let res = await deleteTask( this.taskId )
            if (res[0] == 1) {
                this.$alert('删除成功!');
                setTimeout(() => {
                    this.goback ()
                }, 1000);
                // this.$router.push({path:'/task'})
            }else{
                this.$alert('删除任务失败');
            }
        },
        //关闭更多操作弹出窗事件
        onDeleteMoreOperate () {
          this.showMoreOperate = false
        },
        //返回上一级
        goback (){
            this.$router.go(-1);
        },
        //显示评论输入框，userId被评论人id（评论组件回调用的，直接拷贝粘贴即可）
        smartComment( userId = '' ){
            this.dialogVisible = true
            this.$nextTick(function(){
                this.$refs.smartCommentView.focusAuto( userId )
                this.dialogVisible = true
            })
        },
        //子组件回调，评论输入框的事件（评论组件回调用的，直接拷贝粘贴即可）
        changeCommentVisible:function(type = ''){
            this.dialogVisible = false
            // if (type == 'reflesh') {
            //     location.reload()
            // }
        },

    },
    mounted(){
        document.title = '任务详情'
        this.attachInfoParam = {
            'appId':1,
            'businessId':this.taskId,
            'categoryId':1,
        }
        this.getTaskInfoByIdData({ 'taskId':this.taskId })
    },
    created(){
        this.initData();
    },
    filters:{
        formatEendDateByMoment (value){
            return moment(value).format("YYYY-MM-DD")
        },
    },
    data(){
        return{
            taskId:'',//任务id
            // taskId:'350a4d2908934d17b95052c6abc2834d',
            taskName:'',
            projectName:'',//项目名称
            projectId:'',//项目id
            projectStage:'',//项目阶段
            chargePerson:'',//负责人
            participants:'',//参与人
            tsharePerson:[],
            tshares:"",
            sharedPerson:'',//共享人
            shaPerList:[],
            shaPerson:'',

            createPersonName:'',
            createDate:'',

            progress:'',//任务进度
            state:'',//任务状态
            degree:'',//紧急程度
            startTime:'',//开始时间
            endTime:'',//结束时间
            attachInfoParam:{},//附件
            remind:'',//提醒
            remindPeople:'',//提醒人
            remindPeoList:[],
            textValue:'',//任务描述

            isremindCreateperson:false,//创建人
            isremindLiable:false,//负责人
            isremindAffiliated:false,//参与人

            fromPage:'',//从哪个页面打开的详情页
            showOperateButton:true,//项目下的任务，不可管理

            footerList:[{
              name:'评论',
              value:'smartComment',
            },{
              name:'更多',
              value:'moreOperate',
            },],//底部固定导航栏

            dialogVisible:false,//是否显示评论输入框
            taskLiableId:'100207',

            advanceTime:'',
            remindTime:'',
            remained:[],
            remainedShowName:'',


            goBackButtons:[],//任务的操作按钮
            showMoreOperate:false,//弹出更多操作
            moreOperateList: {
                // 'title.noop': '更多',
                // delete: '<span style="color:red">Delete</span>',
                // delete1: '<span style="color:red">Delete1</span>'
            },

            showDeleteDialog:false,//任务删除弹出窗
        }
    },
    
}
</script>
<style scoped lang="scss">
.m_details_task{
    // overflow-y:auto;
}
.weui-cell{
    // height: 30px;
    // line-height: 30px;
}
</style>
<style  lang="scss">
.m_details_task{
    .smart_list .vux-no-group-title{margin-bottom: 50px;}
    .weui-cells{
        margin-top: 0px;
        background:#F0F2F3;
    }
    .spacing{
        margin-top:10px;
    }
    .weui-cell{
        background: #fff;
        .vux-label{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #191919;
            letter-spacing: 0;
            // line-height: 14px;
        }
        .weui-cell__ft{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
        }
    }
    .weui-panel .weui-panel_access{
        .weui-media-box_appmsg .weui-media-box__hd{width:34px; height: 34px;}
    }
    .vux-x-textarea{
        background: #fff;
        height: 100px;
        margin-bottom:10px;
        .weui-textarea{
            font-family: PingFangSC-Regular !important;
            font-size: 16px !important;
            color: #666666 !important;
            letter-spacing: 0 !important;
        }
    }
    .vux-flexbox{
        .vux-flexbox-item{
            background: #FFFFFF;
            box-shadow: inset 0 0 0 0 #CCCCCC;
            .weui-btn_default{
                background: #FFFFFF;
                box-shadow: inset 0 0 0 0 #CCCCCC;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #009EFF;
                letter-spacing: 0;
                text-align: center;
                height: 50px;
                line-height: 50px;
            }
        }
    }

    //取消按钮
    .weui-actionsheet__action{
        .weui-actionsheet__cell{
            color: #999999;
        }
    }
}
</style>

