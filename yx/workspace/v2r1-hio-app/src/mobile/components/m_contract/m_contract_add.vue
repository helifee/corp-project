<template>
    <div class="add-customer-box detail">
        <div class="add-cus-list">
            <group label-width="5em" label-margin-right="2em" label-align="left">
                <x-input title="合同主题"  :show-clear="false" v-model="formData.title" :required="true" placeholder="请选择" ></x-input>
                <x-input title="合同编号" :show-clear="false" v-model="formData.code"  placeholder="请输入"></x-input>
                <datetime class="mydate" format="YYYY-MM-DD HH:mm"  v-model="formData.signingDate" title="签订时间"  placeholder="请选择" clear-text="clear" @on-clear="clearValue"></datetime>
                <x-input title="合同总金额" :show-clear="false" v-model="formData.money" placeholder="请输入"></x-input>
                <x-input title="合同类型" v-on:click.native="showType" v-model="contractInfo.contractType"  :show-clear="false" :readonly="true" placeholder="请选择"></x-input>
            </group>
            <div class="base penal-box yellow">
                <h3><span>合同双方</span></h3>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <x-input title="甲方" :show-clear="false" v-model="formData.firstParty" placeholder="请输入" ></x-input>
                    <x-input title="乙方" :show-clear="false" v-model="formData.secondParty" placeholder="请输入" ></x-input>
                    <x-input title="收款单位" :show-clear="false" v-model="formData.payee" placeholder="请输入" ></x-input>
                </group>
            </div>
            <div class="base penal-box blue">
                <h3><span>合同范围</span></h3>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <datetime class="mydate" format="YYYY-MM-DD HH:mm"  v-model="formData.startDate" title="开始时间"  clear-text="clear" @on-clear="clearValue"></datetime>
                    <datetime  class="mydate" format="YYYY-MM-DD HH:mm"  v-model="formData.endDate" title="结束时间"  clear-text="clear" @on-clear="clearValue"></datetime>
                    <x-input title="合同摘要" :show-clear="false" placeholder="请输入"  v-model="formData.summary"></x-input>
                    <x-input title="付款约定" :show-clear="false" placeholder="请输入" v-model="formData.paymentAgreement"></x-input>
                    <x-input title="其他" :show-clear="false" v-model="formData.remark" placeholder="请输入" ></x-input>
                </group>
            </div>
            <div class="base penal-box yellow">
                <h3><span>合同附件</span><a class="crm_a fr" style="font-weight: normal">上传</a></h3>
                <div class="attach-item">
                    <span class="title"><img/><label>某某附件xxx</label></span>
                    <span class="btn-box"><a href="javascript;void(0);">预览</a><a href="javascript;void(0);">下载</a></span>
                </div>
            </div>
            <div class="sub-box">
                <x-button mini type="primary" action-type="submit" class="sub-btn blue" v-on:click.native="save">提交</x-button>
            </div>
            </div>
            <mContractType ref = "conType" v-show="isShowType" v-on:selectThemeAfter="selectThemeAfter"></mContractType>
    </div>
</template>
<script>
    import mContractType from '../../components/m_contract/m_contract_type.vue'
    import service from '../../pages/m_contract/m_contract_service'
    import { Group, XInput, Selector, PopupPicker, XTextarea,XButton,Datetime } from 'vux'
    export default {
        name:"m_contract_add",
        props:[],
        components: {
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
                isShowType:false,
                dateValue:"",
                contractInfo:{},
                formData:{
                    sid:"",
                    title:"",
                    contractTypeId:"",
                    code:"",
                    money:"",
                    signingDate:"",
                    approveStatus:"4",
                    firstParty:"",
                    secondParty:"",
                    payee:"",
                    startDate:"",
                    endDate:"",
                    summary:"",
                    paymentAgreement:"",
                    remark:""

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
            selectThemeAfter(obj){
                this.isShowType = false;
                this.contractInfo = obj;
                this.formData.contractTypeId = obj.sid;
            },
            showType(){
                this.isShowType = true;
                //获取合同类型
                this.$refs.conType.getContractType();
            },
            save(){
                const param = Object.assign({}, this.formData);
               service.saveContractInfo(param).then((data)=>{
                    if(data[0]=="1"){
                        //this.$emit("saveBackFun","success");
                        console.log(data);
                        console.log("创建合同");
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
            font-size: 16px;
        }
    .vux-cell-placeholder{
        margin-right: 10px;
    }
        .base .mydate p{
            line-height:26px;
            height: auto;
            border-bottom: none;

        }
    }
</style>