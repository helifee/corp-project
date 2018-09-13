<template>
    <div class="detail start-box" style="margin-bottom: 30px">
        <div class="base penal-box blue">
            <h3 :class="{'exepnd':!isShow}" @click="isShow=!isShow"><span>流程信息</span></h3>
            <div v-show="isShow">
                <p><label>申请流程</label><span>{{approveInfo.templateName}}</span></p>
                <p><label>流程说明</label><span>{{approveInfo.description}}</span></p>
            </div>
        </div>
        <div class="base penal-box blue">
            <h3 :class="{'exepnd':!isShow1}" @click="isShow1=!isShow1"><span>业务信息</span></h3>
            <div v-show="isShow1">
                <p><label>审批结果</label><span><i class="result-i">{{approveInfo.state | state}}</i></span></p>
                <p><label>申请人</label><span>{{approveInfo.createPersonName}}</span></p>
                <p><label>部门</label><span>{{approveInfo.dept}}</span></p>
                <p><label>申请时间</label><span>{{approveInfo.createDate}}</span></p>
            </div>
        </div>
        <div class="form-preview-box">
            <flow-form
                    v-if="businessId && customFormId"
                    v-show="isShow1"
                    formMode="preview"
                    ref="preview"
                    :flowTemplateCode = "templateId"
                    :businessId = "businessId"
                    :customFormId = "customFormId"
                    :instanceId = "instanceId"
            >
            </flow-form>
        </div>
        <div class="split"></div>
        <div class="base penal-box blue free-box">
            <h3 :class="{'exepnd':!isShow4}" @click="isShow4=!isShow4"><span>关联项目</span></h3>
            <div v-show="isShow4">
                <div v-show="!isProjectEmpty" style="padding: 15px"><span>{{projectName}}</span></div>
                <div style="padding: 15px" v-show="isProjectEmpty"><span>暂无关联项目</span></div>
            </div>
        </div>
        <div class="split"></div>
        <div class="base penal-box blue free-box">
            <h3 :class="{'exepnd':!isShow3}" @click="isShow3=!isShow3"><span>抄送人</span></h3>
            <div v-show="isShow3" class="person-box cs-box">
                <span v-for="(n,i) in c_approves" >{{n.name}}</span>
            </div>
        </div>
        <attachItem v-if="attachParam" :param="attachParam"></attachItem>
        <div class="base penal-box blue">
            <h3 :class="{'exepnd':!isShow2}" @click="isShow2=!isShow2"><span>审批流程</span><a class="crm_a fr" id="groupChart" style="font-weight: normal;margin-right: 18px;"  @click.stop="originalFn()">发起群聊</a></h3>
            <div v-show="isShow2" class="approve-list">
                <ul class="event_list">

                        <li class="dian_pass">
                            <div class="list_detail_approve">
                                <div class="top_list_content" style="position: relative">
                                    <table class="table_detail_approve">
                                        <tbody><tr><td class="td_w1 pass_name">{{approveInfo.createPersonName}}</td>
                                            <td class="td_w2 info_s">{{approveInfo.userPosition}}</td></tr>
                                        <tr><td class="td_w1 pass_acname"></td><td class="td_w2 info_s">{{approveInfo.startDate}}</td></tr>
                                        <tr><td class="td_w1 pass_acname">发起</td><td class="td_w2 info_text">请领导审批</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li :class="dian_pass_style(item)" v-if="item.state!=0" v-for="(item,index) in newApproverList" :key="index">
                            <div class="list_detail_approve">
                                <div class="top_list_content" style="position: relative">
                                    <table class="table_detail_approve">
                                        <tbody><tr><td class="td_w1 pass_name">{{item.approvalUserName || ''}}</td>
                                            <td class="td_w2 info_s">{{item.postName && item.postName!='null' ? item.postName : ''}}</td></tr>
                                        <tr><td class="td_w1 pass_acname"></td><td class="td_w2 info_s">{{item.updateDate}}</td></tr>
                                        <tr><td class="td_w1 pass_acname">{{item.state | huanjieState}}</td><td class="td_w2 info_text">{{item.approvalDescription}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li :class="dian_pass_style(item)" v-if="item.state==0" v-for="(item,index) in newApproverList" :key="index">
                            <div class="list_detail_approve">
                                <div class="top_list_content" style="position: relative">
                                    <table class="table_detail_approve">
                                        <tbody><tr><td class="td_w1 pass_name">{{item.approvalUserName || ''}}</td>
                                            <td class="td_w2 info_s">{{item.postName && item.postName!='null' ? item.postName : ''}}</td></tr>
                                        <tr><td class="td_w1 pass_acname"></td><td class="td_w2 info_s">{{item.updateDate}}</td></tr>
                                        <tr><td class="td_w1 pass_acname">{{item.state | huanjieState}}</td><td class="td_w2 info_text">{{item.approvalDescription}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>

                </ul>
            </div>

        </div>
        <div v-if="isHasAgree && isHasReject && !isFormProject">
            <div class="base penal-box">
                <div class="btn-box clearfix">
                    <div class="btn w50">
                        <a @click="clickFn(1,'同意')" class="agree-btn" v-if="isHasAgree">
                            <img src="../../static/images/sl_pass@2x.png"/>
                            <span :class="isClickFlag==1 ? 'current' : ''">同意</span>
                        </a>
                    </div>
                    <div class="btn w50">
                        <a @click="clickFn(2,'驳回')" class="not-agree-btn" v-if="isHasReject">
                            <img src="../../static/images/sl_reject@2x.png"/>
                            <span :class="isClickFlag==2 ? 'current' : ''">驳回</span>
                        </a>
                    </div>
                </div>
                <!--<p v-if="isHasAgree"><label>审批意见</label><span><i class="result-i" v-bind:class="isClickFlag==2 ? 'bohui' : 'agree'">{{oText}}</i></span></p>-->
                <p style="height: 84px" v-if="isClickFlag==2 && isHasReject"><label>回退到</label><span style="line-height: 40px">申请人&nbsp;&nbsp;{{approveInfo.createPersonName}}&nbsp;&nbsp;
                    <input type="radio" name="toback" checked @click="selectToBack(2)"><br>上一级&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="toback" @click="selectToBack(1)"></span></p>
                <p style="height: 90px;"><label style="width: auto">审批意见</label><textarea class="mynote" v-model="desc" id="noteDes" placeholder="请输入"></textarea></p>
            </div>
            <!--<div class="approve-text" v-if="approve_text_show">-->
                <!--<div class="tit">-->
                    <!--审批意见<button>提交</button>-->
                <!--</div>-->
                <!--<div class="con">-->
                    <!--<label>通过</label><textarea></textarea>-->
                <!--</div>-->
            <!--</div>-->
            <div class="submit-box" v-if="isHasAgree && isHasReject && !isFormProject">
                <button class="submit-btn" @click="submitFn" id="approveSubmitBtn">提交</button>
            </div>
        </div>
        <loadingComp ref="loadCompment"></loadingComp>
        <div class="cover" v-if="approve_text_show"></div>
    </div>
</template>
<script>
    import attachItem from '../../components/attachItem.vue'
    import loadingComp from '@mobile/components/loadingComp.vue'
    import flowForm from "@/containers/main/flowForm/client"
    import service from '../../pages/m_approve/m_approve_service'
    import u from '../../m_util'
    export default {
        name:"m_approve_approve",
        components: {
            attachItem,
            loadingComp,
            flowForm
        },
        data () {
            return {
                isProjectEmpty:true,
                c_approves:"",
                projectName:"",
                isShow:false,
                isShow1:true,
                isShow2:true,
                isShow3:true,
                isShow4:true,
                approve_text_show:false,
                num:"",
                id:"",
                tendId:"",
                external:"",
                isFormList:false,
                isFormStart:false,
                isFormProject:false,
                desc:"",
                attachParam:"",
                appId:"",
                attachmentId:"",
                categoryId:"",
                attachInfoList:[],
                toBackFlag:"2",
                isHasAgree:false,
                isHasReject:false,
                userList:[],
                approvalRecordList:[],
                newApproverList:[],
                approverList:[],
                instanceAcId:"",
                approveInfo:{},
                isClickFlag:"1",
                isButton:false,
                oText:"同意",
                buttonList:[],
                businessId:"",
                customFormId:"",
                templateId:"",
                instanceId:"",
                adminFlowInstanceAcId:""
            }
        },
        mounted(){
            document.title = '审批详情';
            this.id = this.$route.query.instanceId;
            this.tendId = this.$route.query.tendId;
            this.isFormList = this.$route.query.isFormList;
            this.isFormProject = this.$route.query.isFormProject;
            this.isFormStart = this.$route.query.isFormStart;
            this.external = this.$route.query.external;
            this.num = this.$route.query.num;//标记列表页 tab
            if(this.id) {
                this.getApproveDetail();
            }
        },
        methods: {
            dian_pass_style(item){
                if(item.state==0) return "dian_waiting";
                if(item.state==1 || item.state==4) return "dian_pass";
                if(item.state==3 || item.state==5) return "dian_reject";
            },
            selectToBack(num){
                this.toBackFlag = num;
            },
            clickFn(num,text){
                this.isClickFlag = num;
                this.oText = text;
                document.body.style.overflow = "hidden";
                this.approve_text_show = true;
            },
            checkDescFn(){
                let val = this.desc;
                if(!val.trim()){
                    this.$alert("请填写意见");
                    return false;
                }
                val = val.trim().replace(/<br\/?>/g, '\n');
                if (val && /[\\]+/.test(val)) {
                    this.$alert("必须输入除\\外的字符数字");
                    return false;
                }
                var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                //不能输入表情符
                if (val && regStr.test(val)) {
                    this.$alert("必须输入除表情符外的字符数字");
                    return false;
                }
                return true;
            },
        submitFn(){
                if(!this.checkDescFn()) return;
                this.$refs.loadCompment.loadingShowStyle();
                if(this.isClickFlag=="1"){
                    this.submitApproveFn();
                }else{
                    this.rejectApproveFn();
                }
            },
            //获取附件
            getAttachList(){
                this.attachParam = {
                    appId : this.appId,
                    businessId : this.attachmentId,
                    categoryId : this.categoryId
                };
            },
            //调用原生方法
            originalFn(){
                let that = this;
                //处理群聊用户数组
                this.handleGroupUserFn();
                console.log(this.userList);
                setupWebViewJavascriptBridge(function(bridge){
                    console.log("setupWebViewJavascriptBridge====");
                    //请求后台
                    bridge.callHandler(
                        'jzyJsHandlers', {'method':3,'params':{'title': '关于流程【'+that.approveInfo.templateName+'】的会话','tenantId':sessionStorage.getItem('tendId'),'flowUserList':that.userList}},
                        function(response){
                            console.log(response);
                        }
                    );
                });
            },
            //返回上一页
            checkGoBack(){
                let that = this;
                setTimeout(function(){
                    if(that.isFormStart){
                        that.$router.push({name: "m_start_list"});
                    }else if(that.isFormProject){
                        that.$router.push({name: "m_approve_list_project"});
                    }else{
                        that.$router.push({name: "m_approve_list",query:{num:this.num}});
                    }
                },2000);
            },
            //从消息过来的审批
            approveFromMessage(params){
                let that = this;
                setupWebViewJavascriptBridge(function(bridge){
                    console.log("setupWebViewJavascriptBridge====");
                    //请求后台
                    service.submitApproveFn(params).then((data)=>{
                        console.log("提交审批");
                        console.log(data);
                        if(data[0]){
                            that.$refs.loadCompment.loadingHideStyle();
                            that.$alert("审批成功");
                            //关闭
                            setTimeout(function(){
                                bridge.callHandler(
                                        'jzyJsHandlers', {'method':15},
                                        function(response){
                                        }
                                );
                            },1000);
                        }
                    }).catch(e=>{
                        that.$refs.loadCompment.loadingHideStyle();
                    });
                });
            },
            //从列表过来的审批
            approveFromList(params){
                //请求后台
                service.submitApproveFn(params).then((data)=>{
                    console.log("提交审批");
                    if(data[0]){
                        this.$refs.loadCompment.loadingHideStyle();
                        this.$alert("审批成功");
                        this.checkGoBack();
                    }
                }).catch(e=>{
                    this.$refs.loadCompment.loadingHideStyle();
                });
            },
            //提交审批
            submitApproveFn(){
                const params = {
                    instanceId:this.id,
                    desc:this.desc,
                    external:this.external
                };
                if(this.isFormList || this.isFormStart){
                    this.approveFromList(params);
                }else{
                    this.approveFromMessage(params);
                }
            },
            findAcId(){
                let userId = this.$store.state.session.sid ? this.$store.state.session.sid :"";
                let userIdIM = this.$store.state.session.userIdIM ? this.$store.state.session.userIdIM :"";
                let acIdArr = [];
                if(this.approvalRecordList.length>0){
                    this.approvalRecordList.forEach((n,i)=>{
                        if(n.acState ==1 && n.delflag==0 && n.approverList.length>0){
                            if(this.approveInfo.admin && i==0){
                                this.adminFlowInstanceAcId = n.flowInstanceAcId;
                            }
                            n.approverList.forEach((item,index)=>{
                                if(item.approvalUserType=="1"){ //外部联系人
                                    if(item.approvalUser == userIdIM){
                                        acIdArr.push(item.flowInstanceAcId);
                                    }
                                }else{
                                    if(item.approvalUser == userId){
                                        acIdArr.push(item.flowInstanceAcId);
                                    }
                                }

                            });
                         }
                })
                }
                return acIdArr;

            },
            //从列表进来的驳回
            rejectFromList(params){
                service.rejectApproveFn(params).then((data)=>{
                    console.log("驳回审批");
                    console.log(data);
                    if(data[0]){
                        this.$refs.loadCompment.loadingHideStyle();
                        this.$alert("已驳回");
                        this.checkGoBack();
                    }
                }).catch(e=>{
                    this.$refs.loadCompment.loadingHideStyle();
                });
            },
            //从消息进来的驳回
            rejectFromMessage(params){
                let that = this;
                setupWebViewJavascriptBridge(function(bridge){
                    console.log("setupWebViewJavascriptBridge====驳回");
                    //请求后台
                    service.rejectApproveFn(params).then((data)=>{
                        console.log("驳回审批");
                        console.log(data);
                        if(data[0]){
                            that.$refs.loadCompment.loadingHideStyle();
                            that.$alert("已驳回");
                            //关闭
                            setTimeout(function(){
                                bridge.callHandler(
                                        'jzyJsHandlers', {'method':15},
                                        function(response){
                                        }
                                );
                            },2000);
                        }
                }).catch(e=>{
                        that.$refs.loadCompment.loadingHideStyle();
                    });
                });
            },
            //驳回审批
            rejectApproveFn(){
                if(!this.instanceAcId) this.instanceAcId = this.adminFlowInstanceAcId;
                const params = {
                    instanceId:this.id,
                    instanceAcId:this.instanceAcId,
                    state:this.toBackFlag,
                    desc:this.desc,
                    rejectType:"0", //驳回0  退回1
                    external:this.external
                };
                if(this.isFormList || this.isFormStart){
                    this.rejectFromList(params);
                }else{
                    this.rejectFromMessage(params);
                }
            },
            //兼容iso 时间转换
            formatTimeStamp(date){
                if(date){
                    if(u.checkAndroidOrIos()){
                        return Date.parse(new Date(`${date.replace(/-/g,'/')}`));
                    }else{
                        return Date.parse(new Date(`${date}`));
                    }
                }
            },
            handleGroupUserFn(){
                let selfUser = {
                    "imid":this.approveInfo.createPersonImId,
                    "gender":this.approveInfo.createPersonSex,
                    "portraitRemoteUrl":this.approveInfo.userPhoto ? this.approveInfo.userPhoto : "",
                    "postName":this.approveInfo.userPosition,
                    "name":this.approveInfo.createPersonName
                }
                this.userList.push(selfUser);
                if(this.newApproverList.length>0) {
                    let adminList = [];
                    let approveUsers = [];
                    this.approveInfo.admin ? adminList.push(selfUser) : approveUsers.push(selfUser);
                    this.newApproverList.forEach((item,index)=>{
                        if(item.imUserId && !item.userExist){ //userExist  这个字段 如果是true 就是离职的
                            let o = {
                                "imid":item.imUserId,
                                "gender":item.sex,
                                "portraitRemoteUrl":item.approvalUserPhoto,
                                "postName":(item.postName && item.postName!='null') ? item.postName : '',
                                "name":item.approvalUserName
                            }
                            // if(item.adminId){
                            //     adminList.push(o);
                            // }else{
                            //     approveUsers.push(o);
                            // }
                            this.userList.push(o);
                        }
                    });
                    this.userList = this.uniqueArrayFn(this.userList);
                }
            },
            //数组去重
            uniqueArrayFn(arr){
                let resultUsers = [];
                let obj = {};
                for(var i =0; i<arr.length; i++){
                    if(!obj[arr[i].imid]){
                        resultUsers.push(arr[i]);
                        obj[arr[i].imid] = true;
                    }
                }
                return resultUsers;
            },
            getApproveDetail(){
                const params = {
                    instanceId:this.id,
                    readOnly:"0",
                    terminalType:"ios"
                };
                //if(this.tendId) params.tendId = this.tendId;
                if(this.external) params.external = this.external;
                service.getApproveDetail(params).then((data)=>{
                    console.log("审批详情");
                    console.log(data);
                    if(data[0]){
                        this.approveInfo = data[0];
                        if(data[0].buttonList){
                            this.buttonList = data[0].buttonList;
                            this.isHasAgree =  this.buttonList.find((n) => n =='pass');
                            this.isHasReject =  this.buttonList.find((n) => n =='reject');
                        }
                        if(data[0].businessId){
                            this.businessId = data[0].businessId;
                        }
                        if(data[0].customFormId){
                            this.customFormId = data[0].customFormId;
                        }
                        if(data[0].instanceId){
                            this.instanceId = data[0].instanceId;
                        }
                        if(data[0].templateId){
                            this.templateId = data[0].templateId;
                        }
                        if(data[0].copyUserInfoList){
                            this.c_approves = data[0].copyUserInfoList;
                        }
                        if(data[0].approvalRecordList){
                            this.approvalRecordList = data[0].approvalRecordList;
                            this.approvalRecordList.forEach((n,i)=>{
                                //if(!n.approverList.length) n.approverList.push({approvalUserName:"--",state:0,updateDate:"",approvalDescription:"",postName:""});
                                this.newApproverList = [...this.newApproverList,...n.approverList];
                            });
                            //按时间排序
                            this.newApproverList.sort((a,b)=>{
                                return this.formatTimeStamp(a['updateDate']) - this.formatTimeStamp(b['updateDate']);
                            });
                        }
                        this.instanceAcId = this.findAcId()[0];
                        this.appId = data[0].appId;
                        this.attachmentId = data[0].attachmentId;
                        this.categoryId = data[0].attachmentCategoryId;
                        if(data[0].projectId){
                            this.getProjectInfoById(data[0].projectId);
                        }
                        this.getAttachList();
                    }
                });
            },
            getProjectInfoById(id){
                service.getProjectInfoById(id).then((data)=>{
                    this.projectName = data[0].projectName;
                    this.isProjectEmpty = false;
                });
            },
        },
        filters:{
            //审批状态:0未审批、1已审批、2后端用的、3驳回、4跳过
            approveState (value){
                switch (value) {
                    case 0:
                        return '未审批';
                    case 1:
                        return '已审批';
                    case 2:
                        return '';
                    case 3:
                        return '驳回';
                    case 4:
                        return '跳过';
                    default:
                        return '--';
                }
            },
            huanjieState (value){
                switch (value) {
                    case 0:
                        return '待审';
                    case 1:
                        return '通过';
                    case 3:
                        return '驳回';
                    case 4:
                        return '跳过';
                    case 5:
                        return '退回';
                    default:
                        return '';
                }
            },
            //审批状态:0未审批、1已审批、2后端用的、3驳回、4跳过
            state (value){
                switch (value) {
                    case 0:
                        return 'xxxx';
                    case 1:
                        return '审批中';
                    case 2:
                        return '已审批';
                    case 3:
                        return '驳回';
                    case 4:
                        return '草稿';
                    case 5:
                        return '跳过';
                    case 6:
                        return '退回';
                    // return '退回';
                    default:
                        return '--';
                }
            }
        },
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    @import '../../static/css/m_crm_detail.scss';
    @import 'm_approve.scss';
    .detail .base p{
        font-size: 16px;
    }
    /*自定义表单样式修改*/
    .start-box .weui-cell__ft{
        color: #191919;
        font-size: 16px;
    }
    .start-box .weui-cells{
        margin-top: 0;
        line-height: 1;
        padding-bottom: 10px;
        margin-left:15px;
        .weui-cells{
            margin-left:0;
            .weui-cell{
                padding-left: 0;
                padding-top:5px;
                padding-bottom:5px;
                .weui-cell__bd{
                    overflow-x: scroll;
                    pointer-events: unset;
                    -webkit-overflow-scrolling: touch;
                    &::-webkit-scrollbar {
                        display:none
                    };
                    p{
                        line-height: 25px;
                    }
                }
            }
        }
    }
    .start-box .weui-cells:before{
        border-top: none!important;
    }

</style>