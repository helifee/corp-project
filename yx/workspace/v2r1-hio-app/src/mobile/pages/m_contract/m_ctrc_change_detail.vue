<template>
    <div class="detail">
        <div class="base penal-box yellow">
            <p style="font-size: 16px;font-weight: bold;">{{list.title}}</p>
            <h3 class="no-event"><span>合同变更内容</span></h3>
            <p><label>合同编号</label><span>{{list.code}}</span></p>
            <p><label>合同主题</label><span>{{list.contractTitle}}</span></p>
            <p><label>签订日期</label><span>{{list.signingDate}}</span></p>
            <p><label>合同总金额</label><span>{{list.money}}</span></p>
            <p><label>变更金额</label><span>{{list.changeMoney}}</span></p>
            <p><label>变更后合同金额</label><span>{{list.newMoney}}</span></p>
            <p><label>合同类型</label><span>{{list.contractType}}</span></p>
            <p><label>变更类型</label><span>{{list.changeType}}</span></p>
            <!--<p><label>单据状态</label><span>{{statusList[list.status]}}</span></p>-->
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
    import attachItem from '../../components/attachItem.vue'
    import detailItem from '../../components/detailItem.vue'
    import service from '../../pages/m_contract/m_contract_service'
    import u from '@mobile/m_util.js'
    export default {
        name:"payDetail",
        props:["contractChangeId"],
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
            if(!this.contractChangeId) document.title = "变更详情";
        },
        mounted(){
            this.id = this.contractChangeId ? this.contractChangeId : this.$route.query.id;
            if(this.id) this.getChangeInfo();
        },
        methods: {
            htmlText(val,ref){
                return u.handleHtmlText(val,this.$refs[ref]);
            },
            getChangeInfo(){
                service.getChangeInfo(this.id).then((data)=>{
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