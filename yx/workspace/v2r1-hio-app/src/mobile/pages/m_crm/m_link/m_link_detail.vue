<template>
    <div class="detail pb_60">
        <div>
            <div class="base">
                <p><label>联系人姓名</label><span>{{baseInfo.name}}</span></p>
                <p class="can-click-style" @click.stop="linkClick(baseInfo.name,'',baseInfo.phoneNumber)"><label>手机</label><span>{{baseInfo.phoneNumber}}</span><i class="phone"></i></p>
                <p><label>邮箱</label><span>{{baseInfo.email}}</span></p>
                <p class="can-click-style"><label>客户名称</label><router-link :to="{name:'m_cus_detail',query:{id:baseInfo.customerId}}"><span>{{baseInfo.customerName}}</span></router-link></p>
                <p><label>创建人</label><span>{{baseInfo.createPersonName}}</span></p>
                <p><label>创建时间</label><span>{{baseInfo.createDate}}</span></p>
            </div>
            <div class="base penal-box blue">
                <h3><span>基本信息</span></h3>
                <p><label>职务</label><span>{{baseInfo.title}}</span></p>
                <p><label>决策关系</label><span>{{decisionList[baseInfo.decisionRole]}}</span></p>
                <p><label>性别</label><span>{{gendar}}</span></p>
            </div>
            <div class="base">
                <p><label>备注</label></p>
                <p class="dsc-text" id="comment">{{comment}}</p>
            </div>
            <!--<div class="base penal-box purpple">-->
                <!--<h3><span>商机</span><router-link v-on:click.native="putFromUrl" :to="{path:'/m_business/m_addBusiness/new',query:{'customerId':baseInfo.customerId,'customerName':baseInfo.customerName,'contcatName':baseInfo.name,'contcatId':baseInfo.sid}}"><i></i></router-link></h3>-->
                <!--<div v-for="(item,index) in opporList" :key="index" v-show="index<2">-->
                    <!--<div class="item" @click="toOpporDetail(item)">-->
                        <!--<p><label style="line-height: 36px">{{item.opportunitName}}</label><span style="margin: 0">{{item.lastFollowTime}}</span></p>-->
                        <!--<p class="address"><label>{{item.customerName}}</label><span style="margin: 0">10,000元</span></p>-->
                        <!--<a class="btn">{{stageMap[item.stage]}}</a>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<p class="can-click-style"><router-link class="detail" :to="{name:'m_business',query:{contactId:id}}">查看全部商机&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{opporTotal}}</i></router-link></p>-->
            <!--</div>-->
            <div class="base penal-box yellow">
                <h3><span>跟进计划</span><router-link v-on:click.native="putFromUrl" :to="{name:'m_follow_plan',query:{'cId':id,fromWhere:'link','customerName':baseInfo.customerName,'customerId':baseInfo.customerId,'contcatName':baseInfo.name,'contactId':baseInfo.sid}}"><i></i></router-link></h3>
                <router-link :to="{name:'m_cus_plan_detail',query:{id:item.sid,fromWhere:'link'}}" v-for="(item,index) in planList" :key="index" v-show="index<2">
                    <div class="item">
                        <p><label style="max-width: 100%">{{item.target}}</label></p>
                        <p><label>跟进时间：</label><label>{{handleTime(item.contactTime)}}</label></p>
                        <p><label>跟进人：</label><label>{{item.createPersonName}}</label></p>
                        <!--<span class="status"><i class="circle green-circle"></i>已跟进</span>-->
                    </div>
                </router-link>
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_cus_plan',query:{contactId:id}}">查看全部计划&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{planTotal}}</i></router-link></p>

            </div>
            <div class="base penal-box red">
                <h3><span>跟进记录</span><router-link v-on:click.native="putFromUrl" :to="{name:'m_follow_log',query:{cId:id,'customerName':baseInfo.customerName,'customerId':baseInfo.customerId,'contcatName':baseInfo.name,'contactId':baseInfo.sid,'decisionRole':baseInfo.decisionRole}}"><i></i></router-link></h3>
                <router-link :to="{name:'m_cus_his_detail',params:{id:item.sid}}" v-for="(item,index) in logList" :key="index" v-show="index<2">
                    <div class="item">
                        <p><label>联系人：</label><label>{{item.contactName}}-{{decisionList[item.decisionRole]}}</label></p>
                        <p><label>商机：</label><label>{{item.opportunityName}}</label></p>
                        <p><label>跟进时间：</label><label>{{item.createTime}}</label></p>
                        <p><label>联系方式：</label><label>{{contactWayList[item.contactWay]}}</label></p>
                    </div>
                </router-link>
                <p class="can-click-style">
                    <router-link class="detail" :to="{name:'m_cus_followLog',query:{contactId:id}}">查看全部跟进记录&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{logTotal}}</i></router-link></p>

            </div>
            <div>
                <callPhone  ref="childCallPhone"></callPhone>
            </div>
        </div>
        <div class="btnGroups" v-if="id">
            <button @click="deleteLinker">删除</button>
            <span ></span>
            <button  @click="rightClick">编辑</button>
        </div>
    </div>

</template>
<script>
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import callPhone from '../../../components/m_crm_callPhone.vue'
    import mService from '../../m_crm/m_crm_search/m_crm_bservice.js'
    import u from '@mobile/m_util.js'
    import s from '@mobile/m_service.js'
    export default {
        components: {
            mCrmHeader,
            callPhone
        },
        data () {
            return {
                isShowPlus: false,
                comment:"",
                customerId:"",
                id: "",
                addUrl: "#/m_add_link",
                list: [],
                baseInfo: {},
                planList: [],
                planTotal: "",
                logList: [],
                logTotal: "",
                opporList: [],
                opporTotal: "",
                pageNum: 1,
                pageCount: 3,
                contactWayList:{
                    "1":"邮件",
                    "0":"电话",
                    "2":"短信",
                    "3":"上门拜访",
                    "4":"会务",

                },
                decisionList:{
                     "0":"普通员工",
                     "1":"采购决策人",
                     "2":"项目决策人",
                     "3":"人事决策人"
                 },
                stageMap:{
                    "0":"立项",
                    "1":"初步沟通",
                    "2":"需求商定",
                    "3":"方案报价",
                    "4":"赢单",
                    "5":"输单"
                },
            }
        },
        computed:{
            gendar(){
                if(this.baseInfo.gendar==1){
                    return "女";
                }else if(this.baseInfo.gendar==0){
                    return "男";
                }else{
                    return "";
                }
            }
        },
        created(){
            document.title = '联系人详情';
        },
        mounted(){
            this.id = this.$route.query.id;
            //获取基本信息
             this.getBaseInfo();
        },
        methods: {
            toOpporDetail(item){
                this.$router.push("/m_b_details/" + item.opportunityId)
            },
            commentHandle(comment){
                comment =  comment.replace(/\n/g, '<br/>');
                let cObj = document.getElementById("comment");
                return u.handleHtmlText(comment,cObj);
            },
            getOpporInfo(){
                const paramOppor = {
                    customerId: this.customerId
                }
                mService.getCusDetailInfo(paramOppor, "/crm/opportunities/page").then((data) => {
                    console.log("商机")
                    this.opporList = data[0].list;
                    this.opporTotal = data[0].total;
                });
            },
            commentHandle(comment){
                comment =  comment.replace(/\n/g, '<br/>');
                let cObj = document.getElementById("comment");
                return u.handleHtmlText(comment,cObj);
            },
            handleTime(date){
                return u.handleTimeNoSecondFn(date);
            },
            linkClick(name,gendar,number){
                this.$refs.childCallPhone.callMethod(name,gendar,number);
            },
            putFromUrl(){
                let fromUrl = {
                    name:this.$route.name,
                    query:this.$route.query
                }
                s.putData("fromUrl",fromUrl);
            },
            rightClick(){
                this.$router.push({name: "m_add_link", query: {id: this.id,customerId:this.baseInfo.customerId,customerName:this.baseInfo.customerName}});
            },
            deleteLinker(){
                if(this.id){
                    this.$confirm("确认删除该联系人吗，删除后无法恢复？").then(()=>{
                        mService.deleteLinkerById(this.id).then((data)=>{
                            console.log(data);
                            this.$alert("删除成功");
                            let that = this;
                            setTimeout(function(){
                                that.$router.go(-1);
                            },2000);
                        });
                    }).catch(function(){

                    });
                }
            },
             getBaseInfo(){
                mService.getLinkerInfoById(this.id).then((data) => {
                    console.log(data)
                    this.baseInfo = data[0];
                    this.comment = this.commentHandle(data[0].comment);
                    this.customerId = data[0].customerId;
                    //this.getOpporInfo();  //屏蔽联系人的商机列表
                    const param = {
                        contactId: this.id,
                        customerId:this.customerId
                    }
                    mService.getCusDetailInfo(param, "/crm/followPlan/queryPlanList").then((data) => {
                        console.log("计划")
                        this.planList = data[0].list;
                        this.planTotal = data[0].total;
                    });
                    mService.getCusDetailInfo(param, "/crm/followHis/queryHisList").then((data) => {
                        console.log("记录")
                        this.logList = data[0].list;
                        this.logTotal = data[0].total;
                    });
                 })
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    @import '../../../static/css/m_crm_detail.scss';

</style>