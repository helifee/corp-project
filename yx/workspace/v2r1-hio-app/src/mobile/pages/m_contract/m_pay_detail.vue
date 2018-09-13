<template>
    <div class="detail">
        <div class="base penal-box yellow">
            <p style="font-size: 16px;font-weight: bold;">{{list.title}}</p>
            <h3 class="no-event"><span>合同基本内容</span></h3>
            <p><label>合同编号</label><span>{{list.code}}</span></p>
            <p><label>合同主题</label><span>{{list.contractTitle}}</span></p>
            <p><label>签订日期</label><span>{{list.paymentDate}}</span></p>
            <p><label>合同总金额</label><span>{{list.money}}</span></p>
            <p><label>合同类型</label><span>{{list.contractTypeName}}</span></p>
            <!--<p><label>累计变更</label><span>{{list.sumChangeMoney}}</span></p>-->
            <p><label style="width: 70%">累计付款(含再审)</label><span style="width: 30%">{{list.sumPaymentMoney}}</span></p>
            <!--<p><label>结算状态</label><span>{{list.balanceStatus==2 ? '已结算':'未结算'}}</span></p>-->
            <!--<p><label>单据状态</label><span>{{statusList[list.status]}}</span></p>-->
            </div>
        <div class="base penal-box yellow">
            <h3 class="no-event"><span>付款内容</span></h3>
            <p><label>甲方</label><span>{{list.firstParty}}</span></p>
            <p><label>乙方</label><span>{{list.secondParty}}</span></p>
            <p><label>开户行</label><span>{{list.openingBank}}</span></p>
            <p><label>银行账号</label><span>{{list.bankAccount}}</span></p>
            <p><label>付款单位</label><span>{{list.payer}}</span></p>
            <p><label>收款单位</label><span>{{list.payee}}</span></p>
            <p><label>本次付款金额</label><span>{{list.sumPaymentMoney}}</span></p>
            <p><label>付款日期</label><span>{{list.paymentDate}}</span></p>
            <p><label>经办人</label><span>{{list.operatorName}}</span></p>
            <p><label>经办部门</label><span>{{list.operatorDeptName}}</span></p>
            <p><label>付款说明</label><span>{{list.payee}}</span></p>

        </div>

        <attachItem v-if="AttachmentInfo" :param="AttachmentInfo" h3Title="合同附件"></attachItem>
        </div>
</template>
<script>
    import attachItem from '../../components/attachItem.vue'
    import detailItem from '../../components/detailItem.vue'
    import service from '../../pages/m_contract/m_contract_service'
    export default {
        name:"payDetail",
        props:["contractPayId"],
        components: {
            attachItem,
            detailItem
        },
        data () {
            return {
                id:"",
                AttachmentInfo:"",
                list:{},
                statusList:{
                    "0":"未生效",
                    "2":"已生效",
                    "9":"作废"
                }
            }
        },
        created(){
            if(!this.contractPayId) document.title = "付款详情";
            document.body.scrollTop="0px";
        },
        mounted(){
            this.id = this.contractPayId ? this.contractPayId : this.$route.query.id;
            if(this.id) this.getPayInfo();
        },
        methods: {
            getPayInfo(){
                service.getPayInfo(this.id).then((data)=>{
                    this.list = data[0];
                    this.AttachmentInfo = this.list.fileIdDto;
                 console.log(data);
                })
            },
            getSearchResult(){

            },
            getMySelected(){

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
    .detail .base p span{
        text-align: right;
    }
</style>