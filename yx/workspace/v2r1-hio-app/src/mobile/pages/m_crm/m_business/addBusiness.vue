<template>
    <div class="add-customer-box">

        <!-- <mCrmHeader :titleName="types =='modify' ? '编辑商机' : '新建商机'" :isShowPlus="!isShowPlus"></mCrmHeader> -->

        <div class="add-cus-list bd_pad60">
            <div>
                
                <group label-width="6em" label-margin-right="2em">
                    <x-input title="客户名称" text-align="right" 
                        v-if="!form.iscustomeroption"
                        v-on:click.native="selectCustomerFn()"
                        required 
                        v-model="form.customerName" 
                        :disabled="true" 
                        :readonly="true"  placeholder="必选...">
                            <span slot="label">
                                客户名称
                                <span class="red">*</span>
                            </span>
                        </x-input>
                    <cell title="客户名称" v-if="form.iscustomeroption" :value="form.customerName">
                        <span slot="label">
                            客户名称
                            <span class="red">*</span>
                        </span>
                    </cell>

                    <x-input title="商机名称" v-model="form.name" :max="100" required text-align="right" placeholder="必填...">
                        <span slot="label">
                            商机名称
                            <span class="red">*</span>
                        </span>
                    </x-input>
                    <cell title="预计成交金额" is-link>
                        <span slot="title">
                            预计成交金额
                            <span class="red">*</span>
                        </span>
                        <div slot="value">
                            
                            <numberInput required placeholder="必填..." v-model="form.estimateAmount"></numberInput>
                        </div>
                    </cell>

                    <!-- <x-input title="预计成交金额" required v-model="form.estimateAmount" type="number" text-align="right" placeholder="请输入..."></x-input> -->
                    <datetime format="YYYY-MM-DD" v-model="form.estimateDealTime" placeholder="必选..." title="预计成交日期"></datetime>
                    <!-- <selector title="联系人" ref="contactsSelect" required :options="contacts" 
                        @on-change="getPhone"
                        v-on:click.native="getContactsFn"
                        :value-map="['sid', 'name']" placeholder="必选..." text-align="right" v-model="form.contactId"></selector> -->
                    <x-input class="require" 
                        title="联系人" 
                         :required="true" 
                         placeholder="必选..."
                          :disabled="true" 
                         :readonly="true" 
                          v-model="form.contactName" 
                          v-on:click.native="selectLinker">
                        </x-input>    
                    <cell title="手机号码" :value="form.phone">
                        <span slot="title">
                            手机号码
                            <span class="red">*</span>
                        </span>
                    </cell>
                    <!-- <x-input title="手机号码" v-model="form.phone" disabled text-align="right" placeholder="手机号码"></x-input> -->
                    <span v-show="false">
                        <x-input title="负责人" ref="personInChargeSid" required readonly v-model="form.personInChargeSid"  text-align="right">
                            <span slot="label">
                                负责人
                                <span class="red">*</span>
                            </span>
                        </x-input>
                    </span>
                    <cell title="负责人" :value="form.personInChargeName">
                        <span slot="title">
                            负责人
                            <span class="red">*</span>
                        </span>
                    </cell>
                    <!-- <x-input title="负责人" ref="personInChargeName" required readonly :disabled="true" v-model="form.personInChargeName"  text-align="right"></x-input> -->
                    <selector placeholder="商机阶段" v-model="form.stage" required text-align="right" 
                     title="商机阶段" name="district" :value-map="['value', 'name']" :options="businessstage">
                        <span slot="title">
                            负责人
                            <span class="red">*</span>
                        </span>
                     </selector>
                    <attachUpload :param="attachInfoParam" :maxUploadNum="10" ref="uploadCompoment"></attachUpload>
                </group>
                <!-- <group>
                    <x-input title="备注" v-model="form.customerName" text-align="right" placeholder="请输入..."></x-input>
                </group> -->
                <!-- <div class="sub-box">
                    <x-button mini type="primary" action-type="submit" class="sub-btn blue" v-on:click.native="saveCustomer">提交</x-button>
                    <x-button mini type="warn" class="sub-btn" v-on:click.native="deleteCustomer">取消</x-button>
                </div> -->

            </div>
        </div>
        <div class="common-btn">
            <button @click="saveCustomer">提交</button>
        </div>
        <!-- <toast v-model="showPositionValue" type="text" :time="800" is-show-mask position="top" class="_crm_toast_business">{{message}}</toast> -->
        <div  class="_customerBox" v-if="dialogVisible">
            <!-- <div class="c_btn_back" @click="selectCustomerFn"><button>取消</button></div> -->
            <mCustomerList
                    @closeDialogVisible='selectCustomerFn'
                    @setCustom="getCustom"
                    :isSelect="true"
                    v-if="dialogVisible">
            </mCustomerList>
        </div>
        <mLinkerList
                @closeDialogVisible='selectLinker'
                @setLinker="setLinker"
                :isSelect="true"
                :customerId='form.customerId'
                v-if="dialogVisibleLinker"
                myClass="_customerBox">
        </mLinkerList>
    </div>

</template>
<script>
import mCrmHeader from '../../../components/m_crm_header.vue'
import mCustomerList from '../m_cus/m_customer.vue'
import { Group, XInput, Selector, PopupPicker, XTextarea,XButton,AlertModule,Datetime,Toast,Cell    } from 'vux'
import bService from '@mobile/pages/m_crm/m_business/b_service.js'
import commonService from '@mobile/m_service.js'
import attachUpload from '@mobile/components/attachUpload.vue'
import numberInput from '@mobile/components/numberInput.vue'
import mLinkerList from '@mobile/pages/m_crm/m_link/m_linker.vue'

export default {
    components: {
            mCrmHeader,
            Group,
            XInput,
            Selector,
            PopupPicker,
            XTextarea,
            XButton,
            AlertModule,
            Datetime,
            Toast,
            Cell,
            mCustomerList,
            attachUpload,
            numberInput,
            mLinkerList
        },
    props:{
        
    },   
    created(){
        document.title = this.types =='modify' ? '编辑商机' : '新建商机';
    }, 
    data () {
       
        return {
            dialogVisibleLinker:false,
            attachInfoParam:{
                "businessId" : null,
                "categoryId" : null,
                "appId" : null
            },
            iscustomeroption:false,  //客户名称是否可点击
            types : this.$route.params.type,
            dialogVisible:false,
            message:"",
            showPositionValue:false,
            businessInfo:{},
            isSelect:false,
            isShowPlus:true,
            form : {
                phone:'',
                personInChargeName: this.$store.state.session.tenantInfo ? this.$store.state.session.tenantInfo.userName : "",
                personInChargeSid : this.$store.state.session.sid ? this.$store.state.session.sid : "",
                stage:"0",
                estimateAmount:''
            },
            contacts:[],
            businessstage:[ 
				{
					value:"0",name:'立项'
				},
				{
					value:"1",name:'初步沟通'
				},
				{
					value:"2",name:'需求商定'
				},
				{
					value:"3",name:'方案报价'
				},
				{
					value:"4",name:'赢单'
				},
				{
					value:"5",name:'输单'
				}
			]
        } 
    },
    mounted(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.getCustomer();
            this.getUUid();
        },
    methods: {
        selectLinker(){
                // if(this.isSelect)
                if(this.form.customerId){
                    this.dialogVisibleLinker=!this.dialogVisibleLinker;
                    return;
                }
                this.$alert("请先选择客户")
                
        },
        setLinker(item){
            this.form.contactName = item.contcatName;
            this.form.contactId = item.contcatId;
            this.form.phone = item.phoneNumber;
        },
        getContactsFn(){
            let selects = this.$refs["contactsSelect"];
            let options = selects.options;
            if(!options.length && !this.form.customerId){
                this.$alert("请先选择客户")
            }
        },
        getCustom(item){
            this.form.customerName = item.customerName;
            this.form.customerId = item.customerId;
            this.form.contactId = "";
            this.form.contactName = "";
            this.form.phone = "";
            // if(this.form.customerId){
            //     let param = {
            //         customerId : item.customerId
            //     }
            //     param = JSON.stringify(param);
            //     this.getContactsList(param);
            // }
            
        },
        async getUUid(){
            let types = this.$route.params.type;
            
            if(types == "new"){
                let result = await bService.getUuid();
                if(result.status == "200"){
                    this.businessInfo = result.result;
                    this.attachInfoParam = {
                        businessId : this.businessInfo.businessId,
                        categoryId : this.businessInfo.category,
                        appId : this.businessInfo.app
                    }
                }
                
            }else{
                this.businessInfo.businessId = this.$route.query.detail;
                if(this.businessInfo.businessId){
                    //查询商机详情
                    let data = await bService.getOpportunities(this.businessInfo.businessId);
                        if(data.status == "200"){
                            let d = data.result;
                            $.extend(this.form,d);
                            this.form.estimateAmount = String(d.estimateAmount);
                            this.form.phone = d.phoneNumber;
                            this.form.estimateDealTime = d.estimateDealTime ? d.estimateDealTime.split(" ")[0] : '';
                            this.form.personInChargeSid = d.personInCharge;
                            this.form.personInChargeName = d.personInChargeName;
                            let attachmentParam = d.attachmentParam;
                            this.attachInfoParam = {
                                businessId : attachmentParam.businessId,
                                categoryId : attachmentParam.category,
                                appId : attachmentParam.app
                            }
                        }
                        

                    
                }else{
                    // this.message = "没有订单编号";
                    // this.showPositionValue = true;
                    this.$alert("没有订单编号")
                }
            }
            if(!this.$route.params.customerId){
                this.iscustomeroption = true;
            }
        },
        getCustomer(){
            let types = this.$route.params.type;
            let item = {
                customerName : this.$route.query.customerName,
                customerId : this.$route.query.customerId,
            }
            if(item.customerId){
                this.selectCustomerDiable = true;
            }
            this.getCustom(item);
        },
        getPhone(value){
            let selects = this.$refs["contactsSelect"];
            let options = selects.options;
            options.forEach((element,index)=>{
                if(element.sid == value){
                    this.form.phone = element.phoneNumber || '';
                    
                }
            })
            
        },
        // 联系人
        async getContactsList(param){
            let contactsList = await bService.getContactsList(param);
            if(contactsList.status == "200"){
                this.contacts = contactsList.result;
            }   
        },
        //选择客户
        selectCustomerFn(){
            if(this.selectCustomerDiable){
                return;
            }
            this.dialogVisible= !this.dialogVisible;
        },
        //验证同客户商机名称
        valitionNameFn(value,cb){
             if(value && this.form.customerId){
                let param = {
                    sid : this.businessInfo.businessId,
                    customerId : this.form.customerId,
                    name : value,
                }
                param = JSON.stringify(param);
                
               return new Promise((resolve,reject)=>{
                    bService.valNamevalite(param,{isHiddenError:true}).then((data)=>{
                            resolve(data);      
                        },(data)=>{
                            resolve(data); 
                        })
               }) 

                
            } 
        },
        async saveCustomer(){
            let forms = this.form;
            let error;
            
            error || forms.customerId || (error = "请选择客户");
            error || forms.name || (error = "请输入商机名称");
            let errorName = await this.valitionNameFn(forms.name);
            error || errorName.result || (error = "商机名称" + errorName.message);
            error || (forms.estimateAmount || forms.estimateAmount===0)  || (error = "请输入预计成交金额");
            error || (/(0)$|(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/.test(forms.estimateAmount)) || (error = "请输入13位正整数或带两位小数的15位的正数字");
            error || forms.estimateDealTime || (error = "请选择预计成交时间");
            error || forms.contactId || (error = "请选择联系人");
            error || (forms.stage || forms.stage===0) || (error = "请选择商机阶段");
            if(error){
                this.$alert(error);
                return;
            }
            let param = {
                            sid : this.businessInfo.businessId,
                            name:this.form.name,
                            customerId:this.form.customerId,
                            estimateAmount:this.form.estimateAmount,
                            estimateDealTime:this.form.estimateDealTime+" 00:00:00",
                            personInCharge:this.form.personInChargeSid,
                            stage:this.form.stage,
                            contactId:this.form.contactId,
                            attachmentArr:[],
                            opportunityProducts:this.form.opportunityProducts || []
                        }
            let params = { data : JSON.stringify(param)};
            let my = this;
            this.$refs.uploadCompoment.saveAttachFn();
            let saveSign = await bService.saveOpportunities(params);
                if(saveSign.status == "200"){
                    // this.$message(saveSign.message);
                    this.message = saveSign.message;
                    this.showPositionValue = true;
                    this.$router.go(-1);
                }
            
        },
        async deleteCustomer(){
            this.$router.go(-1);
            return;
            let param = { id : this.businessInfo.businessId} ;
            let result = await bService.delBusiness(param);
            if(result.status == "200"){
                this.$router.push("/m_business");
            }
        }
    },
    watch:{
        
    }    
}

</script>
<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    @import '../../../static/css/m_crm_add.scss';

</style>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../static/css/n_myCss.scss';
</style>
