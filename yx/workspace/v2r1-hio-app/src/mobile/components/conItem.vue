<template>
    <div class="contractcon-box">
<!-- {{item.totalMoney | discount}} -->
        <div v-if="pageType=='contract'" class="item" v-for="(item,index) in list" :key='index' @click="clickItem('#/m_contract_detail',item.sid)">
            <h3>{{item.title}}<span class="dep">{{item.dep}}</span></h3>
            <conItemRow label="合同总金额" :value="item.money+'元'"></conItemRow>
            <conItemRow label="累计变更金额" :value="item.sumChangeMoney+'元'"></conItemRow>
            <conItemRow label="累计付款金额" :value="item.sumPaymentMoney+'元'"></conItemRow>
            <conItemRow label="合同签订时间" :value="item.signingDate"></conItemRow>
        </div>
        <div v-if="pageType=='pay'" class="item" v-for="(item,index) in list" :key='index' @click="clickItem('#/m_pay_detail',item.sid)">
            <h3>{{item.title}}</h3><span class="dep">{{item.dep}}</span>
            <conItemRow label="合同总金额" :value="item.money+'元'"></conItemRow>
            <conItemRow label="本次付款金额" :value="item.paymentMoney+'元'"></conItemRow>
            <conItemRow label="累计付款金额" :value="item.sumPaymentMoney+'元'"></conItemRow>
            <conItemRow label="付款时间" :value="item.paymentDate"></conItemRow>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import myFilter from '../../filters/filters'
    import conItemRow from '../components/conItem_row.vue'
    export default {
        name:"conItem",
        components: {
            conItemRow
        },
        props: ['list',"pageType"],
        data () {
            return {
//                isShowPlus:false
            }
        },
        mounted(){

        },
        methods: {
            clickItem(url,sid){
                window.location.href=url+"?id="+sid;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contractcon-box .item{
        background: #fff;
        overflow: hidden;
        position: relative;
        margin-top: 10px;
        padding: 20px 15px;
        h3{
            font-size: 15px;
            color: #191919;
            position: relative;
            margin-bottom: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .dep{
            float: right;
            font-size: 15px;
            color: #191919;
            font-weight: normal;
            margin-right: 15px;
        }
        h3:after{
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -4px;
        }
    }


</style>