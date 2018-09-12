<template>
    <div class="detail pb_60">
        <div>
            <div class="base">
                <p><label>客户</label><span>{{baseInfo.name}}</span></p>
                <p><label>最后跟进时间</label><span>{{baseInfo.lastContactTime}}</span></p>
                <!--<p><label>联系人</label><span>{{baseInfo.ownerPersonName}}</span></p>-->
                <p><label>商机总额</label><span>{{baseInfo.opportunityAmountSum}}</span></p>
                <p><label>订单总额</label><span>{{baseInfo.orderAmountSum}}</span></p>
                <p><label>客户来源</label><span>{{baseInfo.source | sourceHandle}}</span></p>
                <p><label>客户类型</label><span>{{baseInfo.type | typeHandle}}</span></p>
            </div>
            <div class="base">
                <p><label>备注</label></p>
                <p class="dsc-text" id="comment">{{comment}}</p>
            </div>
            <div class="base penal-box blue">
                <h3><span>动态</span></h3>
                <p v-for="(item,index) in dyanmicList" :key="index"><label>{{item.changeContent}}</label><span>{{item.createDate | timeFn}}</span></p>
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_cus_dynamic',query:{customerId:id}}">查看全部动态&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{dyanmicTotal}}</i></router-link></p>
            </div>
            <div class="base penal-box yellow">
                <h3><span>相关团队</span></h3>
                <p><label>{{baseInfo.ownerPersonName}}</label><span>负责人</span></p>
            </div>
            <div class="base penal-box blue">
                <h3><span>地址信息</span></h3>
                <p class="can-click-style" @click.stop="linkClick(baseInfo.ownerPersonName,'',baseInfo.phoneNumber)"><label>联系电话</label><span>{{baseInfo.phoneNumber}}</span><i class="phone"></i></p>
                <p><label>联系地址</label><span>{{baseInfo.address}}</span></p>
                <p><label>电子邮箱</label><span>{{baseInfo.email}}</span></p>
                <p><label>企业网站</label><span>{{baseInfo.webSite}}</span></p>
            </div>
            <div class="base penal-box gerren">
                <h3><span>联系人</span><router-link v-on:click.native="putFromUrl" :to="{name:'m_add_link',query:{customerId:id,customerName:baseInfo.name}}"><i></i></router-link></h3>
                <!--<router-link :to="{name:'m_link_detail',query:{id:item.sid}}" v-for="(item,index) in baseInfo.contacts" :key="index" >-->
                    <p class="can-click-style"  @click=" $router.push({name:'m_link_detail',query:{id:item.sid}})" v-for="(item,index) in baseInfo.contacts" :key="index">
                        <label>{{item.name}}</label><span class="span_w30">{{item.title}}</span><i @click.stop="linkClick(item.name,'',item.phoneNumber)" class="phone" :phone="item.phoneNumber"></i>
                    </p>
                <!--</router-link>-->
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_linker',query:{customerId:id}}">查看全部联系人&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{linkrLength}}</i></router-link></p>
            </div>
            <div class="base penal-box purpple">
                <h3><span>商机</span><router-link v-on:click.native="putFromUrl" :to="{path:'/m_business/m_addBusiness/new',query:{'customerId':id,'customerName':baseInfo.name}}"><i></i></router-link></h3>
                <div v-for="(item,index) in opporList" :key="index" >
                    <div class="item" @click="toOpporDetail(item)">
                        <p><label style="line-height: 36px">{{item.opportunitName}}</label><span style="margin: 0">{{item.lastFollowTime}}</span></p>
                        <p class="address"><label>{{item.customerName}}</label><span style="margin: 0">{{item.estimateAmount}}</span></p>
                        <a class="btn">{{stageMap[item.stage]}}</a>
                    </div>
                </div>
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_business',query:{customerId:id}}">查看全部商机&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{opporTotal}}</i></router-link></p>
            </div>
            <div class="base penal-box yellow">
                <h3><span>跟进计划</span><router-link v-on:click.native="putFromUrl" :to="{name:'m_follow_plan',query:{'cId':id,fromWhere:'customer','customerName':baseInfo.name,'customerId':baseInfo.sid}}"><i></i></router-link></h3>
                <router-link :to="{name:'m_cus_plan_detail',query:{id:item.sid,fromWhere:'customer'}}" v-for="(item,index) in planList" :key="index">
                    <div class="item">
                        <p><label style="max-width: 100%">{{item.target}}</label></p>
                        <p><label>跟进时间：</label><label>{{handleTime(item.contactTime)}}</label></p>
                        <p><label>跟进人：</label><label>{{item.createPersonName}}</label></p>
                        <!--<span class="status"><i class="circle green-circle"></i>已跟进</span>-->
                    </div>
                </router-link>
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_cus_plan',query:{customerId:id}}">查看全部计划&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{planTotal}}</i></router-link></p>

            </div>
            <div class="base penal-box red">
                <h3><span>跟进记录</span><router-link v-on:click.native="putFromUrl" :to="{name:'m_follow_log',query:{cId:id,'customerName':baseInfo.name,'customerId':baseInfo.sid}}"><i></i></router-link></h3>
                <router-link :to="{name:'m_cus_his_detail',params:{id:item.sid,'customerName':baseInfo.name,'customerId':baseInfo.sid}}" v-for="(item,index) in logList" :key="index">
                    <div class="item">
                        <p><label>联系人：</label><label>{{item.contactName}}-{{decisionList[item.decisionRole]}}</label></p>
                        <p><label>商机：</label><label>{{item.opportunityName}}</label></p>
                        <p><label>跟进时间：</label><label>{{item.createTime}}</label></p>
                        <p><label>联系方式：</label><label>{{contactWayList[item.contactWay]}}</label></p>
                    </div>
                </router-link>
                <p class="can-click-style">
                    <router-link class="detail" :to="{name:'m_cus_followLog',query:{customerId:id}}">查看全部跟进记录&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{logTotal}}</i></router-link></p>

            </div>
            <div class="base penal-box yellow">
                <h3><span>销售订单</span></h3>
                <div v-for="(item,index) in orderList" :key="index" class="order-info-box">
                    <p><label class="tit">{{item.orderName}}</label><span>订单编号:{{item.orderCode}}</span></p>
                    <p>{{item.customerName}}</p>
                    <p><label>签约金额：{{item.signAmount}}元</label></p>
                    <p><label>订单状态：{{item.orderStatus ? "已签" : '草稿'}}</label></p>
                </div>
                <p class="can-click-style"><router-link class="detail" :to="{name:'m_order',query:{customerId:id,customerName:baseInfo.name}}">查看全部销售订单&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{orderTotal}}</i></router-link></p>
            </div>
            <attachItem v-if="AttachmentInfo" :param="AttachmentInfo"></attachItem>
            <div>
                <callPhone  ref="childCallPhone"></callPhone>
            </div>

        </div>
        <div class="btnGroups" v-if="id">
            <button @click="deleteCustomer">作废</button>
            <span ></span>
            <button  @click="rightClick">编辑</button>
        </div>
    </div>

</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import attachItem from '../../../components/attachItem.vue'
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import callPhone from '../../../components/m_crm_callPhone.vue'
    import mService from '../m_crm_search/m_crm_bservice.js'
    import u from '@mobile/m_util.js'
    import s from '@mobile/m_service.js'
    import { Actionsheet } from 'vux'
    export default {
        components: {
            attachItem,
            Actionsheet,
            mCrmHeader,
            callPhone
        },
        data () {
            return {
                id:"",
                addUrl:"#/m_add_customer",
                comment:"",
                list:[],
                baseInfo:{},
                linkrLength:0,
                planList:[],
                planTotal:"",
                logList:[],
                logTotal:"",
                orderList:[],
                orderTotal:"",
                opporList:[],
                opporTotal:"",
                dyanmicList:[],
                dyanmicTotal:"",
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
                AttachmentInfo:"",
                num:0
            }
        },
        created(){
            document.title = '客户详情';
        },
        mounted(){
            this.id = this.$route.query.id;
            this.num = this.$route.query.num;
            console.log(this.id);

            if(this.id){
                const param = {
                    customerId:this.id,
                    pageNum:1,
                    pageCount:2
                }
                //获取基本信息
                this.getBaseInfo();
                //动态
                mService.getCusDetailInfo(param,"/crm/customer/getAll").then((data)=>{
                    console.log("动态")
                this.dyanmicList = data[0].list;
                this.dyanmicTotal = data[0].total;
            });
                mService.getCusDetailInfo(param,"/crm/followPlan/queryPlanList").then((data)=>{
                    console.log("计划")
                this.planList = data[0].list;
                this.planTotal = data[0].total;
            });
                mService.getCusDetailInfo(param,"/crm/followHis/queryHisList").then((data)=>{
                    console.log("记录")
                    this.logList = data[0].list;
                    this.logTotal = data[0].total;
            });
                mService.getCusDetailInfo(param,"/crm/opportunities/page").then((data)=>{
                    console.log("商机")
                this.opporList = data[0].list;
                this.opporTotal = data[0].total;
            });
                //订单
                mService.getCusDetailInfo(param,"/crm/order/page").then((data)=>{
                    console.log("订单")
                    this.orderList = data[0].list;
                    this.orderTotal = data[0].total;
            });
                //   /order/page
            }

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
            handleTime(date){
               return u.handleTimeNoSecondFn(date);
            },
            putFromUrl(e){
                //let t_route = $(e.currentTarget).attr("to");
                let fromUrl = {
                    name:this.$route.name,
                    query:this.$route.query
                }
                s.putData("fromUrl",fromUrl);
                //this.$router.push(t_route);
            },
            linkClick(name,gendar,number){
                this.$refs.childCallPhone.callMethod(name,gendar,number);
            },
            rightClick(){
                this.$router.push({name:"m_add_customer",params:{id:this.id,num:this.num}});
            },
            //作废客户
            deleteCustomer(){
                if(this.id){
                    this.$confirm("确认删除该客户吗，删除后无法恢复？").then(()=>{
                        mService.deleteCustomer(this.id).then((data)=>{
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
            goBack(){
                let that = this;
                setTimeout(function(){
                    that.$router.push({
                        name: 'm_customer',
                        query: {
                            num:this.num
                        }
                    });
                },2000);
            },
            getBaseInfo(){
                mService.getCustomerInfoById(this.id).then((data)=>{
                    console.log(data)
                    this.baseInfo = data[0];
                    this.linkrLength = data[0].contacts.length;
                    this.comment = this.commentHandle(data[0].comment);
                    if(data[0].attachmentParam){
                        this.AttachmentInfo = {
                            "appId":data[0].attachmentParam.app,
                            "businessId":data[0].attachmentParam.businessId,
                            "categoryId":data[0].attachmentParam.category,
                        }
                    }
                 });

            },
//            //获取附件信息id
//            getAttachmentParam(){
//                mService.getAttachmentParam().then((data)=>{
//                    console.log(data);
//                    this.AttachmentInfo = data[0];
//            });
//            }


        },
        filters:{
            timeFn(t){
                return u.handleTimeNoSecondFn(t);
            },
            sourceHandle(val){
                switch (val) {
                    case 0:
                        return '网站';
                    case 1:
                        return '百度推广';
                    case 2:
                        return '会销';
                    case 3:
                        return '微信';
                    case 4:
                        return '地推';
                    case 9:
                        return '其它';
                    default:
                        return '';
                }
            },
            typeHandle(val){
                switch (val) {
                    case 0:
                        return '一般客户';
                    case 1:
                        return '潜在客户';
                    case 2:
                        return '普通客户';
                    case 3:
                        return 'VIP客户';
                    default:
                        return '';
                }
            },

        }
    }
</script>
<style lang="scss" scoped>
    .span_w30{
        width: 30%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;text-align: right;
    }
</style>
<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    @import '../../../static/css/m_crm_detail.scss';
    .detail{
    .weui-actionsheet__cell{
        font-size: 17px;
        color: #009EFF!important;
    }
    .weui-actionsheet__cell:before{
        border-top: none!important;
    }
    }
</style>
<style lang="scss" scoped>
    .order-info-box{
        p{
            border:none;
            line-height: 30px;
            .tit{
                font-weight: bold;
                margin-top:10px;
            }

        }
    }
</style>