<template>
    <div class="detail">
        <div>
            <div class="target-box" v-if="list.target">
                <span class="red">{{list.target}}</span>
            </div>
            <div class="link-box">
                <p class="mt0"><label>客户名称</label><span>{{customerName}}</span></p>
                <p><label>联系人</label><span>{{list.contactName}}</span></p>
                <p><label>决策关系</label><span>{{decisionList[list.decisionRole]}}</span></p>
                <p><label>联系方式</label><span>{{contactWayList[list.contactWay]}}</span></p>
                <p><label>商机</label><span>{{list.opportunityName}}</span></p>
                <p><label>跟进人</label><span>{{list.createPersonName}}</span></p>
                <p><label>跟进时间</label><span>{{list.createDate}}</span></p>
                <div>
                    <p><label>跟进内容</label></p>
                    <p class="contact-text">{{list.contactContent}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import mCrmHeader from '../../components/m_crm_header.vue'
    import c_service from '../m_crm/m_crm_search/m_crm_bservice.js'
    export default {
        components: {
            mCrmHeader
        },
        data () {
            return {
                isShowPlus:false,
                list:{},
                id:"",
                customerName:"",
                customerId:"",
                decisionList:{
                    "0":"普通员工",
                    "1":"采购决策人",
                    "2":"项目决策人",
                    "3":"人事决策人"
                },
                contactWayList:{
                    "1":"邮件",
                    "0":"电话",
                    "2":"短信",
                    "3":"上门拜访",
                    "4":"会务",

                }
            }
        },
        created(){
            document.title = '跟进记录详情';
        },
        mounted(){
            this.id = this.$route.params.id;
            this.customerName = this.$route.params.customerName;
            this.customerId = this.$route.params.customerId;
            if(this.id){
                this.getDetail();
            }
        },
        methods: {
            getDetail(){
                c_service.getFollowLogsById(this.id).then(data=>{
                    console.log(data[0]);
                    this.list = data[0];
                    this.customerName = data[0].customerName;
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../static/css/m_crm_detail.scss";
    .link-box{

    }

</style>