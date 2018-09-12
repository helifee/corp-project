<template>
    <div class="detail">
        <div>
            <div class="link-box">
                <p class="mt0"><label>客户名称</label><span>{{list.customerName}}</span></p>
                <p><label>联系人</label><span>{{list.contactName}}</span></p>
                <p><label>联系方式</label><span>{{contactWayList[list.contactWay]}}</span></p>
                <p><label>商机</label><span>{{list.opportunityName}}</span></p>
                <p><label>计划跟进时间</label><span>{{handleTime(list.contactTime)}}</span></p>
                <div>
                    <p><label>跟进目标</label></p>
                    <p class="contact-text" style="line-height: 40px">{{list.target}}</p>
                </div>
            </div>
        </div>
        <div class="btnGroups" v-if="id">
            <button @click="deletePlan">删除</button>
            <span ></span>
            <button  @click="rightClick">编辑</button>
        </div>
    </div>
</template>
<script>
    import mCrmHeader from '../../components/m_crm_header.vue'
    import c_service from '../m_crm/m_crm_search/m_crm_bservice.js'
    import u from '@mobile/m_util.js'
    export default {
        components: {
            mCrmHeader
        },
        data () {
            return {
                isShowPlus:true,
                list:{},
                id:"",
                fromWhere:"",
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
            document.title = '跟进计划详情';
        },
        mounted(){
            this.id = this.$route.query.id;
            this.fromWhere = this.$route.query.id;
            if(this.id){
                this.getDetail();
            }
        },
        methods: {
            handleTime(date){
                return u.handleTimeNoSecondFn(date);
            },
            rightClick(){
                this.$router.push({name: "m_follow_plan", query: {planId: this.id,fromWhere:this.fromWhere,customerId:this.list.customerId,customerName:this.list.customerName,contactId:this.list.contactId}});
            },
            //删除跟进计划
            deletePlan(){
                if(this.id){
                    this.$confirm("确认删除该跟进计划吗，删除后无法恢复？").then(()=>{
                        c_service.deletePlan(this.id).then((data)=>{
                            console.log(data);
                            this.$alert("删除成功");
                            this.$router.go(-1);
                        });
                    }).catch(function(){

                    });
                }

            },
            getDetail(){
                c_service.getFollowPlanById(this.id).then(data=>{
                    console.log(data[0]);
                    this.list = data[0];
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../static/css/m_crm_detail.scss";

    .link-box{
        .mt0{
            margin-top: 0!important;
        }
    }
    .target-box{
        height: 40px;
        padding:0 15px;
        .red{
            line-height: 40px;
            font-size: 12px;
            color: #F24848;
            text-align: center;
            display: block;
        }
        .next{
            line-height: 46px;
            font-size: 14px;
            color: #999999;
            text-align: left;
            display: block;
        }
    }
</style>