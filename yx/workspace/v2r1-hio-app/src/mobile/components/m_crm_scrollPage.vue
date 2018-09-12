<template>
    <div>
        <div v-if="page=='home_oppor'">
            <div class="item home_oppor_item can-click-style" @click="gotoDetail(item)" v-for="(item,index) in list" :key="index" v-show="index<3">
                <p><span class="fl">{{item.name}}</span><span class="fr mr20">{{item.lastContactTime}}</span></p>
                <p class="address"><label class="fl">{{item.customerName}}</label><label class="fr mr20">{{item.estimateAmount}}</label></p>
                <a class="btn">{{item.stage | filterStage}}</a>
            </div>
        </div>
        <div v-if="page=='cus_today'">
            <div class="item" v-for="(item,index) in list" :key="index"  v-show="index<3"  @click="gotoDetail(item)">
                <h3><span class="tit">{{item.customerName}}</span><a class="crm_a" @click.stop="$router.push({name:'m_follow_log',query:{planId:item.sid,decisionRole:item.decisionRole}});">跟进<i class="right-arrow"></i></a></h3>
                <p><span>{{item.contactName}}</span>
                    <span>{{decision[item.decisionRole]}}</span>
                    <span>{{item.phoneNumber}}</span></p>
            </div>
        </div>
        <!-- @click="gotoDetail" -->
        <div v-if="page=='link_list'" class="item">
            <div class="p_con" v-for="(o,i) in list" :key="i"  :sid="o.sid" @click="gotoDetail(o)">
                <div :class="o.gendar==1?'p_box female':'p_box male'" >
                    <p><span>{{o.contcatName}}</span><label>{{o.customerName}}</label></p>
                </div>
            </div>
        </div>
        <div v-if="page=='customer'">
            <div class="item" v-for="(item,index) in list" :key="index" @click="gotoDetail(item)">
                <p class="tit" :cid="item.customerId">{{item.customerName}}</p>
                <p class="address">{{item.address}}</p>
            </div>
        </div>
        <div v-if="page=='contract' || page=='pay'">
            <contractList :list="list"  :pageType="page"></contractList>
        </div>

        <div v-if="page=='cus_his'">
            <router-link :to="{name:'m_cus_his_detail',params:{id:item.sid}}" v-for="(item,index) in list" :key="index">
                <div class="item">
                    <p class="l25"><span class="fl">{{item.contactName}}-{{decision[item.decisionRole]}}</span><span class="fr mr12">跟进时间</span></p>
                    <p><label class="fl">{{item.opportunityName}}</label><label class="fr mr12">{{item.createTime}}</label></p>
                </div>
            </router-link>
        </div>
        <div v-if="page=='cus_plan'">
            <router-link :to="{name:'m_cus_plan_detail',query:{id:item.sid}}" v-for="(item,index) in list" :key="index">
                <div class="item">
                    <p class="l25"><span class="fl">{{item.customerName}}</span><span class="fr mr12">跟进时间</span></p>
                    <p><label class="fl">{{item.contactName}}</label><label class="fr mr12">{{handleTime(item.contactTime)}}</label></p>
                </div>
            </router-link>
        </div>
        <div v-if="page=='dyanmicList'">
            <div class="item no-event" v-for="(item,index) in list" :key="index">
                <p><span class="fl dyanmic-fl">{{item.changeContent}}</span><span class="fr dyanmic-fr">{{item.createDate}}</span></p>
            </div>
        </div>
        <div v-if="page=='approveList'">
            <div class="list">
                <div class="item" @click="gotoDetail(item)" v-for="(item,index) in list" :key="index">
                    <p><span class="tit">{{item.templateName}}</span></p>
                    <p class="stopTime" style=""><i class="my-stop-icon"></i><span>发起时间 ：{{item.startDate}}</span></p>
                </div>
            </div>
        </div>
        <div v-if="page=='approveListPanel1'">
            <div class="list">
                <div class="item" @click="gotoDetail(item)" v-for="(item,index) in list" :key="index">
                    <p><span class="tit">{{item.templateName}}</span></p>
                    <p class="stopTime" style=""><i class="my-stop-icon"></i><span>已停留 ：{{item.datePoor}}</span></p>
                </div>
            </div>
        </div>

        <div v-if="page=='draftList'">
            <div class="item" @click="gotoDetail(item)" v-for="(item,index) in list">
                <i class="text-icon"></i>
                <div class="text"><span class="title">{{item.templateName}}</span>
                    <p>录入时间：{{item.updateDate}}</p></div>
                <i class="right-icon arrow" aria-hidden="true" style="top: 1rem;"></i>
            </div>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import contractList from '../pages/m_contract/m_contractList.vue'
    import u from '@mobile/m_util.js'
    export default {
        name:"scrollerPage",
        components: {
            contractList
        },
        props:["page","list","decision"],
        data () {
            return {

            }
        },
        mounted(){

        },
        methods: {
            handleTime(date){
                return u.handleTimeNoSecondFn(date);
            },
            gotoDetail(sid){
                this.$emit("gotoDetail",sid);
            }
        },
        filters:{
            filterStage (val){
                let str = "";
                switch(val){
                    case 0:
                        str = "立项";
                        break;
                    case 1:
                        str = "初步沟通";
                        break;
                    case 2:
                        str = "需求商定";
                        break;
                    case 3:
                        str = "方案报价";
                        break;
                    case 4:
                        str = "赢单";
                        break;
                    case 5:
                        str = "输单";
                        break;
                }
                return str;
            }
        },
    }
</script>

<style lang="scss">
    .ph-box{
        overflow: hidden;
    }
    .dyanmic-fl{
        width: 65%;
    }
    .dyanmic-fr{
        width: 26%;text-align: right
    }
</style>