<template>
    <div class="start-box detail">
        <div class="base penal-box blue">
            <h3 :class="{'exepnd':!isShow2}" @click="isShow2=!isShow2"><span>流程信息</span></h3>
            <div v-show="isShow2">
                <p><label>申请流程</label><span>{{templateName}}</span></p>
                <p><label>流程说明</label><span>{{description}}</span></p>
            </div>
        </div>
        <div class="split"></div>
        <div class="base penal-box blue">
            <h3 :class="{'exepnd':!isShow3}" @click="isShow3=!isShow3"><span>业务信息</span></h3>
            <!--调用表单-->
            <div class="form-fill-box" style="padding: 10px;padding-left: 0;"  v-show="isShow3">
                <flow-form
                        v-if="formData.templateId"
                        :formMode="formMode"
                        ref="instance"
                        @cb-flow-form-instance-saved="cbInstanceSaved"
                        :flowTemplateCode = "templateCode"
                        :businessId = "businessId"
                        :instanceId = "formData.instanceId"
                        :customFormId = "customFormId"
                >
                </flow-form>
            </div>
        </div>
        <div class="split"></div>
        <attachUpload :param="attachParam" v-if="attachParam" ref="uploadCompoment" maxUploadNum="1"></attachUpload>
        <div class="split"></div>
        <div class="base penal-box blue free-box">
            <h3 class="no-event"><span>关联项目</span><a class="crm_a fr" v-show="isSelectShow" style="font-weight: normal;" @click="showMenus = true">选择</a></h3>
            <div v-show="!isProjectEmpty">
                <div v-show="isProjectShow" style="padding: 15px"><span>{{formData.projectName}}</span></div>
                <div class="">
                    <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="clickMenus" show-cancel></actionsheet>
                </div>
            </div>
            <div v-show="isProjectEmpty">
                <div style="padding: 15px"><span>暂无关联项目</span></div>
            </div>
        </div>
        <div class="split"></div>
        <div class="base penal-box blue free-box">
            <h3 :class="{'exepnd':!isShow1}" @click="isShow1=!isShow1"><span>抄送</span><a class="crm_a fr" style="font-weight: normal;margin-right: 20px;" @click.stop="open">添加抄送人</a></h3>
            <div class="person-box cs-box" v-show="isShow1">
                <span v-for="(n,i) in c_approves"  @click="nameClick($event)">{{n.name}}<i class="del" @click="delCsPerson(i)"></i></span>
            </div>
        </div>
        <div class="split"></div>
        <div class="btn-box clearfix">
            <div class="btn">
                <a @click="saveFn" class="tmpsave">
                    <img src="../../static/images/applist_save@2x.png"/>
                    <span>暂存草稿</span>
                </a>
            </div>
            <div class="btn" >
                <a @click="submitFn" class="approve">
                    <img src="../../static/images/applist_okay@2x.png"/>
                    <span>发起流程</span>
                </a>
            </div>
        </div>
        <selectUser
                v-if="showSelect"
                :selectedList='demoList'
                :showType='showType'
                :active='active'
                @closeSelect="open()"
                @setResult="getResult">
        </selectUser>
        <loadingComp ref="loadCompment"></loadingComp>
    </div>

</template>
<script>
    import { Actionsheet } from 'vux'
    import  flowForm from "@/containers/main/flowForm/client"
    import attachUpload from '@mobile/components/attachUpload.vue'
    import loadingComp from '@mobile/components/loadingComp.vue'
    import {getProjectDetailForProject} from '@mobile/pages/m_project/detailService.js'
    import service from '../../pages/m_approve/m_approve_service'
    import selectUser from '@mobile/components/select/m_select.vue'
    export default {
        name:"m_approve_start",
        components: {
            Actionsheet,
            attachUpload,
            loadingComp,
            flowForm,
            selectUser
        },
        data () {
            return {
                showType:[{"code":"person","multi" : true},{"code":"external","multi" : true}],
                active : "person",
                description:"",
                templateName:"",
                showSelect:false,
                selectList : [],
                demoList : [],
                isProjectEmpty:true,
                isProjectShow:false,
                isSelectShow:true,
                showMenus:false,
                isShow1:true,
                isShow2:true,
                isShow3:true,
                c_approves:[],
                attachParam:"",
                saveMode:"",
                state:"",
                operateType:"1",
                formMode:"instance",
                businessId:"",
                customFormId:"",
                projectList:[],
                fromWhere:"",
                formData:{
                    templateId:"",
                    instanceId:"",
                    attachmentId:"",
                    freeOrTemplate:"T",
                    projectId: "",
                    projectName: ""
                },
                menus: [],
            }
        },
        mounted(){
            document.title = '流程发起';
            this.formData.templateId = this.$route.query.id;
            this.formData.projectId = this.$route.query.projectId;
            this.formData.fromWhere = this.$route.query.fromWhere;
            this.templateCode = this.$route.query.code;
            this.formData.instanceId = this.$route.query.instanceId;
            if(this.formData.instanceId){
                this.getFormInfo();
            }
            if(this.formData.templateId){
                this.getQueryAttachId();
            }
            if(this.formData.projectId){
                this.isProjectShow = true;
                this.isSelectShow = false;
                this.isProjectEmpty=false;
                this.getProjectDetailForProject();
            }else{
                this.getProjectInfo()
            }
            this.state = this.$route.query.state;
            if(this.state){
                if(this.state!="3" && this.state!="6" && this.state!="7" && this.state!="8"){
                    this.operateType = "2";
                }
                if(this.state=="3" || this.state=="6" || this.state=="7" || this.state=="8"){
                    this.formMode = "reInstance";
                }
            }
        },
        methods: {
            async getProjectDetailForProject(){
                let resInfo = await getProjectDetailForProject(this.formData.projectId);
                this.formData.projectName = resInfo[0].projectName;
            },
            open(){
                this.isShow1=!this.isShow1;
                this.showSelect = !this.showSelect;
                this.demoList = [];
                this.c_approves.forEach( element =>{
                    this.demoList.push({
                        type : "user",
                        newname:element.name,
                        sid : element.id,
                        key : 'sid'
                    })
                })
            },
            getResult(item){
                this.selectList = item;
                this.c_approves = [];
                this.selectList.forEach( element =>{
                    let o = {};
                    o.id = element.sid;
                    o.name= element.newname;
                    o.imUserId = element.imUserId;
                    this.c_approves.push(o)
                })
                console.log(this.selectList);
            },
            getProjectInfo(){
                let userId = this.$store.state.session.sid;
                service.getProjectInfo(userId).then(data=>{
                    this.projectList = data[0];
                    if(this.projectList.length>0){
                       this.isProjectEmpty = false;
                    }
                    this.projectList.forEach((n,i)=>{
                        let o = {
                            label:n.projectName,
                            sid:n.sid
                        }
                        this.menus.push(o);
                    });
                    console.log(this.menus);
                });
            },
            clickMenus(key,menuItem){
                this.formData.projectId = menuItem.sid;
                this.formData.projectName=  menuItem.label;
                this.isProjectShow = true;
            },
            //删除抄送人
            delCsPerson(index){
                this.c_approves.splice(index,1);
                this.selectList.splice(index,1);
            },
            //点击名字
            nameClick(e){
                $(e.currentTarget).toggleClass("bg");
                $(e.currentTarget).find("i").toggle();
            },
            //取消
            cancelFn(){
                //返回
                let that = this;
                setTimeout(function () {
                    that.fromWhere=="project" ? that.$router.push({name:"m_approve_list_project",query:{id:that.formData.projectId}}): that.$router.push({name:"m_start_list"});
                },1000);

            },
            getQueryAttachId(){
                const param = {
                    templateCode:this.templateCode
                }
                service.getQueryAttachId(param).then((data)=>{
                    console.log("上传附件所需id");
                    console.log(data[0]);
                    this.formData.attachmentId = this.formData.attachmentId ? this.formData.attachmentId : data[0].businessId;
                    this.description = data[0].description;
                    this.templateName = data[0].templateName;
                    this.attachParam = {
                        "appId":data[0].appId,
                        "businessId":this.formData.attachmentId,
                        "categoryId":data[0].categoryId
                    }
                 });
            },
            getFormInfo(){
                const params = {
                    instanceId:this.formData.instanceId,
                    readOnly:'0',
                    terminalType:'ios'
                }
                service.getApproveDetail(params).then((data)=>{
                    if(data[0]){
                        this.approveInfo = data[0];
                        this.description = data[0].description;
                        this.templateName = data[0].templateName;
                        if(data[0].businessId){
                            this.businessId = data[0].businessId;
                        }
                        if(data[0].projectId){ //有关联的项目
                            this.formData.projectId = data[0].projectId;
                            this.isProjectShow = true;
                            this.isProjectEmpty=false;
                            if(!this.formData.projectName){
                                this.getProjectDetailForProject();
                            }
                        }
                        if(data[0].copyUserIds && data[0].copyUserIds.length){
                            this.demoList = data[0].copyUserIds;
                            this.c_approves = data[0].copyUserInfoList;
                        }
                        if(data[0].templateId){
                            this.formData.templateId = data[0].templateId;
                        }
                        if(data[0].customFormId){
                            this.customFormId = data[0].customFormId;
                        }
                        if(data[0].attachmentId){
                            this.formData.attachmentId = data[0].attachmentId;
                            this.attachParam = {
                                "appId":data[0].appId,
                                "businessId":this.formData.attachmentId,
                                "categoryId":data[0].attachmentCategoryId
                            };
                        }
                    }
            });
            },
            loadShow(){
                this.$refs.loadCompment.loadingShowStyle();
            },
            loadHide(){
                this.$refs.loadCompment.loadingHideStyle();
            },
            //暂存
            async saveFn(){
                this.saveMode = "save";
                let res = await this.$refs.instance.saveInstanceForm();
            },
            //发起
            async submitFn(){
                this.saveMode = "submit";
                let res = await this.$refs.instance.submitInstanceForm();
            },
            async draftSaveFn(params){
                let res = await service.draftSaveFn(params).then(data=>{
                    try{
                        return data;
                    }catch (e){
                        this.loadHide();
                    }
                }).catch(e=>{
                    this.loadHide();
                });
                if(res[0]){
                    let attachDataInfo = this.$refs.uploadCompoment.saveAttachFn();//保存附件
                    this.$alert("已暂存");
                    this.cancelFn();
                }
                this.loadHide();
            },
            async startFn(params){
                let res = await service.addFreeFlow(params).then(data=>{
                    try{
                        return data;
                    }catch (e){
                        this.loadHide();
                    }
                }).catch(e=>{
                    this.loadHide();
                });
                if(res[0]){
                    let attachDataInfo = await this.$refs.uploadCompoment.saveAttachFn();//保存附件
                    this.$alert("发起成功");
                    this.$router.push({name:"m_approve_approve",query:{instanceId:res[0],isFormStart:true}});
                }
                this.loadHide();
            },

    async cbInstanceSaved(data){
                console.log(data);
                if (data.validation == false) {
                    this.$alert("自定义表单校验失败！");
                    return;
                }
                this.loadShow();
                let copyUserIds = [];
                this.c_approves.forEach((n,i)=>{
                    copyUserIds.push(n.id);
                });

                let params = {
                    valueData: JSON.stringify(data.valueData),
                    businessId:data.businessId,
                    businessData: data.businessData,
                    customFormId: data.customFormId,
                    operateType:this.operateType,
                    attachmentId:this.formData.attachmentId,
                    copyUserIds:copyUserIds

                };
                params = Object.assign({},params,this.formData);
                if(this.saveMode == "save"){
                    this.draftSaveFn(params);
                }else{
                    this.startFn(params);
                }

            }
        }
    }
</script>
<style lang="scss">
    @import '../../static/css/m_crm.scss';
    p.weui-toast__content{
        line-height: 1!important;
        border-bottom: none!important;
    }
    .container-wrapper p{
        border-bottom: none!important;
    }
</style>
<style lang="scss" scoped>
    @import '../../static/css/m_crm_detail.scss';
    @import 'm_approve.scss';
</style>