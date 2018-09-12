<template>
    <div class="history-box add-customer-box">
        <div>
            <div class="target-box" v-if="formData.target">
                <span class="red">{{formData.target}}</span>
            </div>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <x-input title="客户名称" class="no-event mt0" :show-clear="false" :disabled="true" :readonly="true" :required="true" v-model="formData.customerName"></x-input>
                <x-input class="require" title="联系人"  ref="linkinput" :class="!isSelect ? 'no-event' : ''"  :required="true" :show-clear="false" :disabled="true" :readonly="true"  :placeholder="!isSelect ? '' : '必选...'"  v-model="formData.contactName" v-on:click.native="selectLinker"></x-input>
                <selector class="require" title="联系方式" :options="contactWayList" v-model="formData.contactWay"></selector >
                <x-input title="决策关系"  class="no-event" :show-clear="false" :readonly="true" :disabled="true" v-model="decisionList[formData.decisionRole]" :placeholder="!isSelect ? '' : '带入...'"></x-input>
                <x-input title="商机" :show-clear="false" :class="!isSelectOppr ? 'no-event' : ''" :disabled="true" v-model="formData.opportunityName" :placeholder="!isSelectOppr ? '' : '选择...'" v-on:click.native="selectOppor"></x-input>
                <x-textarea class="require" title="跟进内容" :max="2500"
                    :show-clear="false" :required="true" placeholder="必填..." v-model="formData.contactContent" :rows="3"></x-textarea>

            </group>
            <x-button class="bottomBtn" action-type="submit"  @click.native="saveLog">提交</x-button>
        </div>
        <mLinkerList
                @closeDialogVisible='closeDialogVisibleLinker'
                @setLinker="setLinker"
                :isSelect="true"
                :customerId = formData.customerId
                v-if="dialogVisibleLinker"
                myClass="_customerBox">
        </mLinkerList>
        <mBussinessList
                @close='closeDialogVisible'
                @opportunity="setBussiness"
                :customer="{'sid':formData.customerId,'name':formData.customerName}"
                v-if="dialogVisible">
        </mBussinessList>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { Datetime,Group,XInput,PopupPicker,XTextarea,XButton,Selector,AlertModule,Alert } from 'vux'
    import mCrmHeader from '../../components/m_crm_header.vue'
    import mLinkerList from './m_link/m_linker.vue'
    import mBussinessList from './m_business/m_business.vue'
    import mService from '../m_crm/m_crm_search/m_crm_bservice.js'
    import s from '@mobile/m_service.js'
    export default {
        components: {
            Datetime,
            Group,
            XInput,
            mCrmHeader,
            PopupPicker,
            XTextarea,
            XButton,
            Selector,
            mLinkerList,
            mBussinessList,
            AlertModule,
            Alert
        },
        data () {
            return {
                isShowPlus:false,
                dialogVisible:false,
                dialogVisibleLinker:false,
                isSelect:false,
                isSelectOppr:false,
                readonly: true,
                dateValue:"",
                id:"",
                planId:"",
                attachParam:{},
                formData:{
                    sid:"",
                    contactId:"",
                    customerName:"",
                    customerId:"",
                    contactName:"",//contcatName
                    opportunityId:"",
                    opportunityName:"",
                    contactWay:"0",
                    decisionRole:"",
                    contactContent:""
                },
                contactWayList:[
                    {key:1,value:"邮件"},
                    {key:0,value:"电话"},
                    {key:2,value:"短信"},
                    {key:3,value:"上门拜访"},
                    {key:4,value:"会务"}
                ],
                decisionList:{
                    "0":"普通员工",
                    "1":"采购决策人",
                    "2":"项目决策人",
                    "3":"人事决策人"
                }
            }
        },
        created(){
            document.title = '创建跟进记录';
        },
        mounted(){
            this.id = this.$route.query.id;
            this.planId = this.$route.query.planId;
            if(!this.id){
                this.getAttachParam();
            }
            //从跟进计划过来的 查询数据 填上
            if(this.planId){
                this.getPlanDetail();

            }else{
                this.formData.customerName = this.$route.query.customerName;
                this.formData.customerId  = this.$route.query.customerId;
                this.formData.decisionRole = this.$route.query.decisionRole;
                this.formData.contactId = this.$route.query.contactId;
                this.formData.contactName  = this.$route.query.contcatName;
                this.formData.opportunityId = this.$route.query.opportunityId;
                this.formData.opportunityName  = this.$route.query.opportunityName;
                if(!this.$route.query.contactId){
                    this.isSelect = true;
                }
                if(!this.$route.query.opportunityId){
                    this.isSelectOppr = true;
                }
            }
        },
        methods: {
            selectLinker(){
                if(this.isSelect){
                    this.dialogVisibleLinker=!this.dialogVisibleLinker
                }

            },
            selectOppor(){
                if(this.isSelectOppr)
                this.dialogVisible=!this.dialogVisible
            },
            closeDialogVisible(){
                this.dialogVisible = false;
            },
            closeDialogVisibleLinker(){
                this.dialogVisibleLinker = false;
            },
            getAttachParam(){
                mService.getFollowAttachParam().then((data)=>{
                    console.log(data);
                    if(data[0]){
                        this.attachParam = data[0];
                        this.formData.sid = this.attachParam.businessId;
                    }
            });
            },
            //获取此跟进计划的详情
            getPlanDetail(){
                mService.getFollowPlanById(this.planId).then((data)=>{
                    console.log(data);
                    if(data[0]){
                        this.formData = data[0];
                        this.formData.sid = this.attachParam.businessId;
                        this.formData.decisionRole = this.$route.query.decisionRole;
                    }
                });
            },
            change (value) {
                console.log('change', value)
            },
            clearValue (value) {
                this.dateValue = ''
            },
            //提交保存
            saveLog(){
                if(!this.formData.contactName){
                    AlertModule.show({
                        content: '请选择联系人!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }
                if(!this.formData.contactContent){
                    AlertModule.show({
                        content: '跟进内容不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }
                const param = {
                    his:this.formData
                };
                mService.saveFollow(param).then((data)=>{
                    console.log(data);

                    AlertModule.show({
                        content: '操作成功!'
                    })
                    setTimeout(() => {
                        AlertModule.hide();
                        this.$router.go(-1);
                    }, 1000)
                    return ;
                });
            },
            setLinker(o){
                this.formData.contactId  = o ? o.contcatId :"";
                this.formData.contactName =  o ? o.contcatName : "";
                this.formData.decisionRole = o ? o.decisionRole : "";
            },
            setBussiness(o){
                this.formData.opportunityId = o ? o.opportunityId :"";
                this.formData.opportunityName = o ? o.opportunitName :"";
            }
        }
    }
</script>

<style lang="scss">
    @import "../../static/css/m_crm_add.scss";
    .dp-header .dp-item,.dp-header .dp-item.dp-right{
        color: #00a0e9!important;
    }
    .vux-cell-value{
        color:#191919!important;
    }
    .customer-box{
        position: fixed;
        width:100%;
        height:100%;
        overflow-x:hidden;
        overflow-y:scroll;
        left:0;bottom:0;top:0;right:0;
        z-index: 20;
        background:#fff;
    }
</style>