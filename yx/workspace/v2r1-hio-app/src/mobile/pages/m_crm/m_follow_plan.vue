<template>
    <div class="history-box add-customer-box">
        <div>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <x-input title="客户名称" class="no-event" :show-clear="false" :disabled="true" :required="true" :readonly="true" v-model="formData.customerName"></x-input>
                <x-input class="require" title="联系人" :class="!isSelect ? 'no-event' : ''" :show-clear="false"  :required="true"  placeholder="必选..." :disabled="true" :readonly="true" v-model="formData.contactName" v-on:click.native="selectLinker"></x-input>
                <selector  class="require" title="联系方式" :options="contactWayList" v-model="planData.contactWay"></selector >
                <x-input title="商机" :show-clear="false"  :class="!isSelectOppr ? 'no-event' : ''" :disabled="!isSelectOppr" v-model="formData.opportunitName" placeholder="选择..." v-on:click.native="selectOppor"></x-input>
                <datetime  class="require" format="YYYY-MM-DD HH:mm" @on-change="change" placeholder="必选..."  title="跟进时间" v-model="planData.contactTime"  @on-clear="clearValue"></datetime>
                <x-textarea class="require" title="跟进目标" :max="200"
                    :required="true" :show-clear="false" placeholder="必填..." v-model="planData.target" :rows="3"></x-textarea>
                 </group>
            <x-button class="bottomBtn"  action-type="submit" @click.native="saveLog">提交</x-button>
        </div>
        <mLinkerList
                @closeDialogVisible='closeDialogVisibleLinker'
                @setLinker="setLinker"
                :isSelect="true"
                :customerId = planData.customerId
                v-if="dialogVisibleLinker"
                myClass="_customerBox">
        </mLinkerList>
        <mBussinessList
                @close='closeDialogVisible'
                @opportunity="setBussiness"
                :customer="{'sid':planData.customerId,'name':formData.customerName}"
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
                readonly: true,
                isSelect:false,
                isSelectOppr:false,
                fromWhere:"",
                dateValue:"",
                id:"",
                planId:"",
                detailInfo:{},
                formData:{
                    customerName:"",
                    contactName:"",
                    opportunitName:"",
                },
                planData:{
                    sid:"",
                    contactId:"",
                    customerId:"",
                    opportunityId:"",
                    target:"",
                    contactTime:"",
                    contactWay:"0"
                },
                contactWayList:[
                    {key:1,value:"邮件"},
                    {key:0,value:"电话"},
                    {key:2,value:"短信"},
                    {key:3,value:"上门拜访"},
                    {key:4,value:"会务"}
                ],
                decisionList:[
                    {key:1,value:"采购决策人"},
                    {key:0,value:"普通员工"},
                    {key:2,value:"项目决策人"},
                    {key:3,value:"人事决策人"}
                ]
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.planId = this.planData.sid = this.$route.query.planId;
            document.title = this.planId ? '编辑跟进计划':'新增跟进计划';
            this.fromWhere = this.$route.query.fromWhere;//
            this.formData.customerName = this.$route.query.customerName;//
            this.planData.customerId = this.$route.query.customerId;//
            this.planData.contactId = this.$route.query.contactId;
            this.formData.contactName  = this.$route.query.contcatName;
            this.planData.opportunityId = this.$route.query.opportunityId;
            this.formData.opportunitName  = this.$route.query.opportunityName;
            if(this.fromWhere!="link"){
                this.isSelect = true;
            }
            if(this.fromWhere!="bussiness"){
                this.isSelectOppr = true;
            }
           if(this.planId){
                this.getPlanDetail();
            }
        },
        methods: {
            selectLinker(){
                if(this.isSelect)
                this.dialogVisibleLinker=!this.dialogVisibleLinker;
            },
            selectOppor(){
                if(this.isSelectOppr)
                this.dialogVisible=!this.dialogVisible;
            },
            closeDialogVisible(){
                this.dialogVisible = false;
            },
            closeDialogVisibleLinker(){
                this.dialogVisibleLinker = false;
            },
            change (value) {
                console.log('change', value)
            },
            clearValue (value) {
                this.dateValue = ''
            },
            //跟进计划编辑初始化数据
            getPlanDetail(){
                mService.getFollowPlanById(this.planId).then((data)=>{
                    console.log(data);
                    if(data[0]){
                        this.planData = data[0];
                        this.formData.contactName = data[0].contactName;
                        this.formData.opportunitName = data[0].opportunityName;
                        delete this.planData.lastContactTime;
                        delete this.planData.updateDate;
                    }
            });
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
                if(!this.planData.contactTime){
                    AlertModule.show({
                        content: '请选择跟进时间!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }
                if(!this.planData.target){
                    AlertModule.show({
                        content: '请填写跟进目标!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }

                const param = {
                    plan:this.planData
                };
                param.plan.contactTime = this.planData.contactTime+":00";
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
                this.planData.contactId = o ? o.contcatId :"";
                this.formData.contactName = o ? o.contcatName :"";
            },
            setBussiness(o){
                this.planData.opportunityId = o ? o.opportunityId :"";
                this.formData.opportunitName = o ? o.opportunitName :"";
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