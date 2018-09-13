<template>
    <div class="add-customer-box detail">
        <div class="add-cus-list">
            <group label-width="5em" label-margin-right="2em" label-align="left">
                <x-input title="付款主题" :show-clear="false" v-model="formData.title" :required="true" placeholder="请输入" ></x-input>
                <x-input title="合同主题" v-on:click.native="showTheme"  :show-clear="false" v-model="contractInfo.contractTitle" :readonly="true" :required="true" placeholder="请选择" ></x-input>
                <x-input title="合同编号" :show-clear="false" v-model="contractInfo.code" :readonly="true" placeholder="请选择合同"></x-input>
                <x-input title="签订时间" :show-clear="false" v-model="contractInfo.signingDate" placeholder="请选择合同" :readonly="true"></x-input>
                <x-input title="合同总金额" :show-clear="false" v-model="contractInfo.money" placeholder="请选择合同" :readonly="true"></x-input>
                <x-input title="合同类型" v-model="contractInfo.contractTypeName"  :show-clear="false" :readonly="true" placeholder="请选择合同"></x-input>

                <x-input title="累计变更" :show-clear="false" type="number" v-model="contractInfo.sumChangeMoney" placeholder="请输入" ></x-input>
                <x-input title="累计付款" :show-clear="false" type="number" v-model="contractInfo.sumPayMoney" :readonly="true" placeholder="请选择合同"></x-input>
                <x-input title="结算状态" :show-clear="false" v-model="balanceStatusList[contractInfo.balanceStatus]" :readonly="true" placeholder="请选择合同"></x-input>
                <x-input title="单据状态" :show-clear="false" v-model="statusList[contractInfo.status]"  :readonly="true" placeholder="请选择合同"></x-input>

            </group>
            <div class="base penal-box yellow">
                <h3><span>付款内容</span></h3>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <x-input title="甲方" :show-clear="false" v-model="contractInfo.firstParty" placeholder="请输入" ></x-input>
                    <x-input title="乙方" :show-clear="false" v-model="contractInfo.secondParty" placeholder="请输入" ></x-input>
                    <x-input title="付款单位" :show-clear="false" v-model="formData.payer" placeholder="请输入" ></x-input>
                    <x-input title="收款单位" :show-clear="false" v-model="contractInfo.payee" placeholder="请输入" ></x-input>
                    <x-input title="本次付款金额" :show-clear="false" type="number"  v-model="formData.paymentMoney" placeholder="请输入" ></x-input>
                    <datetime class="mydate" format="YYYY-MM-DD HH:mm"  v-model="formData.paymentDate" title="付款时间"  clear-text="clear" @on-clear="clearValue"></datetime>
                    <x-input title="经办人" v-model="contractInfo.operatorName"  :show-clear="false" :readonly="true"></x-input>
                    <x-input title="经办部门" v-model="contractInfo.operatorDeptName"  :show-clear="false" :readonly="true"></x-input>
                    <x-textarea title="付款说明" v-model="formData.paymentExplain" placeholder="请输入"></x-textarea>
                </group>
            </div>

            <div class="base penal-box yellow">
                <h3><span>付款附件</span><a class="crm_a fr" style="font-weight: normal">上传</a></h3>
                <div class="attach-item">
                    <span class="title"><img/><label>某某附件xxx</label></span>
                    <span class="btn-box"><a href="javascript;void(0);">预览</a><a href="javascript;void(0);">下载</a></span>
                </div>
            </div>
            <div class="sub-box">
                <x-button mini type="primary" action-type="submit" class="sub-btn blue" v-on:click.native="save">提交</x-button>
            </div>
            </div>
            <!--<mContractType ref = "conType" v-show="isShowType"></mContractType>-->
            <mContractTheme ref = "conThemeInfo" type="pay" v-show="isShowTheme" v-on:selectThemeAfter="selectThemeAfter"></mContractTheme>

    </div>
</template>
<script>
    import mContractType from '../../components/m_contract/m_contract_type.vue'
    import mContractTheme from '../../components/m_contract/m_contract_theme.vue'
    import service from '../../pages/m_contract/m_contract_service'
    import { Group, XInput, Selector, PopupPicker, XTextarea,XButton,Datetime } from 'vux'
    export default {
        name:"m_payment_add",
        props:[],
        components: {
            mContractTheme,
            mContractType,
            Group,
            XInput,
            Selector,
            PopupPicker,
            XTextarea,
            XButton,
            Datetime
        },
        data () {
            return {
                id:"",
                isShowTheme:false,
                isShowType:false,
                dateValue:"",
                operator:"",
                operatorDep:"",
                balanceStatusList:{
                    "0":"未结算",
                    "2":"已结算"
                },
                statusList:{
                    "0":"未生效",
                    "2":"已生效",
                    "9":"作废"
                },
                contractInfo:{},
                formData:{
                    sid:"",
                    contractId:"",
                    title:"",
                    contractTypeId:"",
                    changeTypeId:"",
                    approveStatus:"4",
                    paymentExplain:"",
                    paymentMoney:"",
                    paymentDate:"",
                    payer:""
                }
            }
        },
        watch:{
        },
        mounted(){

        },
        methods: {
            clearValue (value) {
                this.dateValue = ''
            },
            showTheme(){
                this.isShowTheme = true;
            },
            selectThemeAfter(obj){
                this.isShowTheme = false;
                this.contractInfo = obj;
            },
            showType(){
                this.isShowType = true;

                //获取合同类型
                this.$refs.conType.getContractType();
            },
            delKey(obj,...args){
                args.forEach(v => {
                    delete obj[v];
                });
                return obj;
            },
            save(){
                const param = Object.assign({}, this.formData,this.contractInfo);
                this.delKey(param,'contractTypeName','contractTitle','sumChangeMoney','sumPayMoney','balanceStatus','status','operatorName','operatorDeptName');
                service.savePaymentInfo(param).then((data)=>{
                    if(data[0]=="1"){
                        //this.$emit("saveBackFun","success");
                        console.log(data);
                        console.log("创建付款");
                    }else{
                        this.$emit("saveBackFun","fail");
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    @import '../../static/css/m_crm_detail.scss';
    @import '../../static/css/m_crm_add.scss';
    .body{
        background: #f5f5f5;
    }
    .detail {
        .weui-cell{
            margin-top: 0;
            border-bottom: 1px solid #ededed;
        }
        .base .mydate p{
            line-height:26px;
            height: auto;
            border-bottom: none;

        }
    }
</style>