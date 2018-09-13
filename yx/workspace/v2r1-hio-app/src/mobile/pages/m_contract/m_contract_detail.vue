<template>
    <div class="detail">
        <div class="base penal-box blue">
            <p style="font-size: 16px;font-weight: bold;">{{list.title}}</p>
            <h3 class="no-event"><span>合同基本内容</span></h3>
            <p><label>合同编号</label><span>{{list.code}}</span></p>
            <p><label>签订日期</label><span>{{list.signingDate}}</span></p>
            <p><label>合同总金额</label><span>{{list.money}}</span></p>
            <p><label>合同类型</label><span>{{list.contractTypeName}}</span></p>
            <!--<p><label>累计变更</label><span>{{list.sumChangeMoney}}</span></p>-->
            <!--<p><label>累计付款(含在审)</label><span>{{list.sumPaymentMoney}}</span></p>-->
            <!--<p><label>结算状态</label><span>{{list.balanceStatus==2 ? '已结算':'未结算'}}</span></p>-->
            <p><label>单据状态</label><span>{{statusList[list.status]}}</span></p>
            <p><label>经办人</label><span>{{list.operatorName}}</span></p>
            <p><label>经办部门</label><span>{{list.operatorDeptName}}</span></p>
        </div>
        <div class="base penal-box blue">
            <h3 class="no-event"><span>合同双方</span></h3>
            <p><label>甲方</label><span>{{list.firstParty}}</span></p>
            <p><label>乙方</label><span>{{list.secondParty}}</span></p>
            <p><label>收款单位</label><span>{{list.payee}}</span></p>

        </div>
        <div class="base penal-box blue">
            <h3 class="no-event"><span>合同范围</span></h3>
            <p><label>开始时间</label><span>{{list.startDate}}</span></p>
            <p><label>结束时间</label><span>{{list.endDate}}</span></p>
            <p style="border-bottom: none"><label>合同摘要</label></p>
            <div class="remark-style" ref="summary">{{htmlText(list.summary,'summary')}}</div>
            <p style="border-top: 1px solid #ededed"><label>付款约定</label><span>{{list.paymentAgreement}}</span></p>
            <p><label>其他</label><span>{{list.remark}}</span></p>

        </div>
        <attachItem v-if="AttachmentInfo" :param="AttachmentInfo" h3Title="合同附件"></attachItem>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import attachItem from '../../components/attachItem.vue'
    import detailItem from '../../components/detailItem.vue'
    import service from '../../pages/m_contract/m_contract_service'
    import u from '@mobile/m_util.js'
    export default {
        name:"contractDetail",
        props:["contractId"],
        components: {
            attachItem,
            detailItem
        },
        data () {
            return {
                id:"",
                isApproveQuery:"0",
                AttachmentInfo:"",
                list:{

                },
                statusList:{
                    "0":"未生效",
                    "2":"已生效",
                    "9":"作废"
                }
            }
        },
        created(){
            if(!this.contractId) document.title = "合同详情";
            document.body.scrollTop="0px";
           // document.set
        },
        mounted(){
            this.id = this.contractId ? this.contractId :this.$route.query.id;
            this.isApproveQuery = this.contractId ? "1" : "0";
            if(this.id) this.getContractInfo();

        },
        methods: {
            getContractInfo(){
                const param = {
                    sid:this.id,
                    isApproveQuery:this.isApproveQuery
                };
                service.getContractInfo(param).then((data)=>{
                    this.list = data[0];
                    this.AttachmentInfo = data[0].fileIdDto;
                    console.log(data);
                })
            },
            htmlText(val,ref){
                return u.handleHtmlText(val,this.$refs[ref]);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    @import '../../static/css/m_crm_detail.scss';

</style>
<style lang="scss" scoped>
    .base.penal-box h3{
        height: auto;
        span{
            line-height: 30px;
            display: inline-block;
        }
    }
</style>