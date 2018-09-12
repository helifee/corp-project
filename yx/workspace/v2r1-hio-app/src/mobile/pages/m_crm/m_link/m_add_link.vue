<template>
    <div class="add-customer-box">
        <div class="add-cus-list">
            <div>
                <group label-width="6em" label-margin-right="2em" label-align="left">
                    <x-input class="require" title="客户名称"  v-on:click.native="selectCustomer" :class="isSelect ? '': 'no-event'" :show-clear="false"  v-model="customerName" :disabled="true" :readonly="true" :required="true" placeholder="必选..."></x-input>
                    <x-input class="require" title="联系人姓名" :max="100" :show-clear="false" v-model="formData.name" :required="true"  placeholder="必填..." ></x-input>
                    <selector title="性别" :options="gendarList" v-model="formData.gendar" placeholder="请选择"></selector >
                    <!--<x-input title="部门"  :show-clear="false" placeholder="请输入部门" v-model="formData.title"  ></x-input>-->
                    <x-input title="职务" :max="100" :show-clear="false" placeholder="输入..." v-model="formData.title"></x-input>
                    <selector class="require" title="决策关系" :options="decisionList" v-model="formData.decisionRole" placeholder="请选择"></selector >
                    <x-input class="require" title="手机号码" :show-clear="false" placeholder="必填..." :max="11" type="tel" is-type="china-mobile" :required="true" v-model="formData.phoneNumber"></x-input>
                    <x-input title="电子邮箱" :show-clear="false" placeholder="输入..." type="email" is-type="email" v-model="formData.email" :max='70'></x-input>
                    <!--<x-input title="联系地址" :show-clear="false" placeholder="请输入联系地址" v-model="formData.address"></x-input>-->
                    <x-textarea title="备注" v-model="formData.comment" 
                        :max="2500" placeholder="输入..." :rows="3"></x-textarea>
                </group>
                <x-button class="bottomBtn"  action-type="submit" @click.native="saveLinker">提交</x-button>
            </div>

        </div>
        <mCustomerList
                @closeDialogVisible='closeDialogVisible'
                @setCustom="setCustom"
                :isSelect=true
                v-if="dialogVisible"
                myClass="_customerBox">
        </mCustomerList>
    </div>

</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import mCrmService from '../m_crm_search/m_crm_bservice.js'
    import { Group, XInput, Selector, PopupPicker, XTextarea,XButton,AlertModule,Alert } from 'vux'
    import mCustomerList from '../m_cus/m_customer.vue'
    export default {
        name:"m_add_customer",
        components: {
            mCrmHeader,
            Group,
            XInput,
            Selector,
            PopupPicker,
            XTextarea,
            XButton,
            AlertModule,
            Alert,
            mCustomerList
        },
        data () {
            return {
                isShowPlus:false,
                isSelect:true,
                dialogVisible:false,
                customerName:"",
                formData:{
                    gendar:"0",
                    phoneNumber:"",
                    email:"",
                    customerId:"",
                    decisionRole:0,
                    name:"",
                    comment:"",
                    title:""
                },
                id:"",
                decisionList: [
                    {key:0,value:"普通员工"},
                    {key:1,value:"采购决策人"},
                    {key:2,value:"项目决策人"},
                    {key:3,value:"人事决策人"},
                ],
                gendarList: [
                    {key:0,value:"男"},
                    {key:1,value:"女"}
                ],
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            document.title = this.id ? '编辑联系人':'新增联系人';
            this.formData.customerId = this.$route.query.customerId ? this.$route.query.customerId : "";
            if(this.formData.customerId){
                this.customerName = this.$route.query.customerName ? this.$route.query.customerName : "";
            }
//            if(!this.id && !this.formData.customerId){
//                this.isSelect = true;
//            }
            if(this.id){
                mCrmService.getLinkerInfoById(this.id).then((data)=>{
                    this.formData = data[0];
                    console.log(data);
                });
            }
        },
        methods: {
            selectCustomer(){
                if(this.isSelect)
                this.dialogVisible=!this.dialogVisible
            },
            saveLinker(){
                if(!this.customerName){
                    AlertModule.show({
                        content: '客户不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }
                if(!this.formData.name){
                    AlertModule.show({
                        content: '联系人姓名不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }
                if(!this.formData.phoneNumber){
                    AlertModule.show({
                        content: '手机号码不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }
                if($(".weui-cell.weui-cell_warn").length){
                    AlertModule.show({
                        content: '存在不合法输入!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }
                const param = {
                        ...this.formData
                }
                mCrmService.saveLinkerFn(param).then((data)=>{
                    console.log(data);
                    let that = this;
                    AlertModule.show({
                        content: '保存成功!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                        that.$router.go(-1);
                    }, 2000)
                    })
            },
            closeDialogVisible(){
              this.dialogVisible = false;
            },
            setCustom(o){
                this.formData.customerId = o ? o.customerId :"";
                this.customerName = o ? o.customerName : "";
            },
            }

    }
</script>
<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    @import '../../../static/css/m_crm_add.scss';

</style>