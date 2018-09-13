<template>
    <div class="add-customer-box detail">
        <div class="add-cus-list">
            <group label-width="5em" label-margin-right="2em" label-align="left">
                <x-input title="变更主题" :show-clear="false" v-model="formData.title" :required="true" placeholder="请输入" ></x-input>
                <x-input title="合同主题" v-on:click.native="showTheme()"  :show-clear="false" v-model="contractInfo.contractTitle" :readonly="true" :required="true" placeholder="请选择" ></x-input>
                <x-input title="合同编号" :show-clear="false" v-model="contractInfo.code" placeholder="请输入"></x-input>
                <x-input title="签订时间" :show-clear="false" v-model="contractInfo.signingDate" placeholder="请选择合同" :readonly="true"></x-input>
                <x-input title="合同总金额" :show-clear="false" v-model="contractInfo.money" placeholder="请选择合同" :readonly="true"></x-input>
                <x-input title="变更金额" :show-clear="false" type="number" v-model="formData.changeMoney" placeholder="请输入" ></x-input>
                <x-input title="变更后合同金额" :show-clear="false" type="number"  v-model="formData.newMoney" placeholder="请输入" ></x-input>
                <x-input title="合同类型" v-model="contractInfo.contractTypeName"  :show-clear="false" :readonly="true" placeholder="请选择合同"></x-input>
                <selector title="变更类型" :options="typeList" placeholder="请选择"></selector>
                <!--<x-input title="单据状态" :show-clear="false" v-model="statusList[formData.status]" contractTypeId placeholder="请输入" ></x-input>-->

            </group>
            <div class="base penal-box blue">
                <h3><span>合同双方</span></h3>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <x-input title="甲方" :show-clear="false" v-model="contractInfo.firstParty" placeholder="请输入" ></x-input>
                    <x-input title="乙方" :show-clear="false" v-model="contractInfo.secondParty" placeholder="请输入" ></x-input>
                    <x-input title="收款单位" :show-clear="false" v-model="contractInfo.payee" placeholder="请输入" ></x-input>
                </group>
            </div>
            <div class="base penal-box blue">
                <h3><span>合同范围</span></h3>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <datetime class="mydate" format="YYYY-MM-DD HH:mm"  v-model="contractInfo.signingDateBegin" title="开始时间"  clear-text="clear" @on-clear="clearValue"></datetime>
                    <datetime  class="mydate" format="YYYY-MM-DD HH:mm"  v-model="contractInfo.signingDateEnd" title="结束时间"  clear-text="clear" @on-clear="clearValue"></datetime>
                    <x-input title="合同摘要" :show-clear="false" placeholder="请输入"  v-model="contractInfo.summary"></x-input>
                    <x-input title="付款约定" :show-clear="false" placeholder="请输入" v-model="contractInfo.paymentAgreement"></x-input>
                    <x-input title="其他" :show-clear="false" v-model="contractInfo.remark" placeholder="请输入" ></x-input>
                </group>
            </div>
            <div class="base penal-box blue">
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
            <!--<mContractType ref = "conType" v-show="isShowType"></mContractType>-->
            <mContractTheme ref = "conThemeInfo" v-show="isShowTheme" v-on:selectThemeAfter="selectThemeAfter"></mContractTheme>

    </div>
</template>
<script>
    import mContractTheme from '../../components/m_contract/m_contract_theme.vue'
    import service from '../../pages/m_contract/m_contract_service'
    import { Group, XInput, Selector, PopupPicker, XTextarea,XButton,Datetime } from 'vux'
    export default {
        name:"m_changeContract_add",
        props:[],
        components: {
            mContractTheme,
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
                list:{

                },
                isShowTheme:false,
                dateValue:"",
                statusList:{
                    "0":"未生效",
                    "2":"已生效",
                    "9":"作废"
                },
                contractInfo:{},
                typeList:[],
                formData:{
                    sid:"",
                    contractId:"",
                    title:"",
                    contractTypeId:"",
                    changeTypeId:"",
                    approveStatus:"4",
                    changeMoney:0,
                    newMoney:0
                }
            }
        },
        watch:{
            'formData.changeMoney'(val){
                this.formData.changeMoney = val;
                this.formData.newMoney = this.contractInfo.money - val;
            },
            'formData.newMoney'(val){
                this.formData.newMoney = val;
                this.formData.changeMoney = this.contractInfo.money - val;
            }
        },
        mounted(){
            //查询变更类型
            this.getContractChangeType();
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
//            showType(){
//                this.isShowType = true;
//
//                //获取合同类型
//               // this.$refs.conType.getContractType();
//            },
            //获取变更类型列表
            getContractChangeType(){
                service.getContractChangeTypeList().then((data)=>{
                    if(data[0] && data[0].length>0){
                        data[0].forEach((n)=>{
                            this.typeList.push({"key": n.sid,"value": n.contractChangeType});
                        });
                    }
            });
            },
            save(){
                const param = Object.assign({}, this.formData,this.contractInfo);
                delete param.contractTypeName;
                delete param.contractTitle;
                service.saveContractChange(param).then((data)=>{
                    if(data[0]=="1"){
                        this.$emit("saveBackFun","success");
                    console.log(data);
                    console.log("创建合同变更");
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