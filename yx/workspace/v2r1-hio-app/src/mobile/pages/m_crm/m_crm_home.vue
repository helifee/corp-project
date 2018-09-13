<template>
    <div class="crm-box">
        <div>
            <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="clickMenus" show-cancel></actionsheet>
        </div>
        <grid>
            <grid-item :link="{path: item.path}" v-for="(item,index) in list" :key="index">
                <img slot="icon" :src="item.img" class="memu-img">
                <span class="grid-center my-item-title">{{item.name}}</span>
            </grid-item>
        </grid>

        <!-- 销售排行榜 -->
        <div class="panel-box">
            <h3><i class="ph_icon"></i>销售排行榜</h3>
            <!--<router-link class="history-tit crm_a" to="/m_cus_history" titleName="更多">更多</router-link>-->
            <div class="titbox">
                <span class="w20">名次</span>
                <span class="w40">姓名</span>
                <span class="w40">本月新单</span>
                <!--<span class="w30">本月客户</span>-->
            </div>
            <div class="ph-box">
                <p v-for="(item,index) in bottomCount" :key="index" v-if="index<5">
                    <span class="w20">{{index+1}}</span>
                    <span class="w40">{{item.salesmanName}}</span>
                    <span class="w40">{{item.newOrderCount}}</span>
                    <!--<span class="w30">{{item.newCustomerCount}}</span>-->
                </p>
                <p v-for="(item,index) in bottomCount" :key="index" v-if="index>=5 && isExpend">
                    <span class="w20">{{index+1}}</span>
                    <span class="w40">{{item.salesmanName}}</span>
                    <span class="w40">{{item.newOrderCount}}</span>
                    <!--<span class="w30">{{item.newCustomerCount}}</span>-->
                </p>
                <div class="look-all continue" v-show="b_l>5">
                    <span class="loadNextPage expend-span" style="cursor: pointer;float: none;color: #999" v-show="!isExpend" @click="isExpend=!isExpend">展开更多</span>
                    <span class="loadNextPage col-span" style="cursor: pointer;float: none;color: #999" v-show="isExpend" @click="isExpend=!isExpend">收起</span>
                </div>
            </div>
        </div>
        <!-- 今日跟进客户 -->
        <div class="panel-box">
            <h3 style="height: 40px;line-height: 30px"><i class="jh_icon"></i>今日跟进计划</h3>
            <router-link class="history-tit crm_a" to="/m_cus_history" titleName="更多">更多</router-link>
            <my_scroller :isContinue="isContinue" :nopage="true" v-on:gotoDetail="gotoPlanDetail" :decision="decisionRoleList" scrollPage="cus_today" myref="scroller_today" :list="todayList"></my_scroller>
        </div>
        <!-- 商机 -->
        <div class="detail pb_50">
            <div class="panel-box">
                <h3 style="height: 40px;line-height: 30px"><i class="sj_icon"></i>商机</h3>
                <router-link class="history-tit crm_a" to="/m_business" titleName="更多">更多</router-link>
                <my_scroller :isContinue="isContinue" v-on:gotoDetail="gotoDetail" :nopage="true" scrollPage="home_oppor" :list="opporList"></my_scroller>
            </div>
        </div>
        <div class="common-btn"><button @click="rightClick">添加</button></div>
    </div>
</template>
<script>
    import { Grid,GridItem,Actionsheet } from 'vux'
    import my_scroller from '../../components/m_crm_scroll.vue'
    import my_header from '../../components/m_crm_header.vue'
    import c_service from '../m_crm/m_crm_search/m_crm_bservice.js'
    export default {
        components: {
            Grid,
            GridItem,
            Actionsheet,
            my_scroller,
            my_header
        },
        data () {
            return {
                isContinue:false,
                bottomCount: [],
                isExpend:false,
                b_l:0,
                todayList:[],
                opporList:[],
                decisionRoleList:{
                    "0":"普通员工",
                    "1":"采购决策人",
                    "2":"项目决策人",
                    "3":"人事决策人"
                },
                menus: [
                    {
                        label:"新建客户",
                        url:"#/m_cus/m_add_customer"
                    },
                    {
                        label:"新建联系人",
                        url:"#/m_link/m_add_link"
                    },
                    {
                        label:"新建商机",
                        url:"#/m_business/m_addBusiness/new"
                    }
                ],
                list:[
                    {name:"客户",path:"./m_cus/m_customer",img:JZY.c.m_imgPath+"/kehu@2x.png"},
                    {name:"联系人",path:"./m_link/m_linker",img:JZY.c.m_imgPath+"/lianxiren@2x.png"},
                    {name:"商机",path:"./m_business",img:JZY.c.m_imgPath+"/shangji@2x.png"},
                    {name:"订单",path:"./m_order",img:JZY.c.m_imgPath+"/dingdan@2x.png"},

                ],

                showMenus:false
            }
        },
        created(){
            document.title = 'CRM';
        },
        mounted(){
            this.getMonthRankingsFn();
            this.getPlanListFn();
            //获取商机列表
            this.getOpporListFn();
        },
        methods: {
            gotoDetail(o){
                this.$router.push("/m_b_details/" + o.sid);
            },
            gotoPlanDetail(o){
                this.$router.push({name:"m_cus_plan_detail",query:{id:o.sid}});
            },
            rightClick(){
                this.showMenus = true;

            },
            clickMenus(key,menuItem){
               window.location.href = menuItem.url;
            },
            getMonthRankingsFn(){
                c_service.getMonthRankingsFn().then((data)=>{
                    console.log(data);
                    this.bottomCount = data[0];
                    this.b_l = data[0].length;
                });
            },
            //跟进计划
            getPlanListFn(){
                c_service.getPlanListFn().then((data)=>{
                    console.log(data);
                    this.todayList = data[0];
            });
            },
            //商机
            getOpporListFn(){
                c_service.getOpporListFn().then((data)=>{
                    console.log(data);
                    this.opporList = data[0];
            });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    @import '../../static/css/m_crm_detail.scss';
    .look-all span.col-span:after{
        border-width: 1px 0 0 1px;
        top:58%;
    }
    .common-btn{
        width: 100%;
        box-shadow: inset 0 0 0 0 #CCCCCC;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        button{
            cursor: pointer;
            font-size: 16px;
            color: #009EFF;
            background: #FFFFFF;
            display: inline-block;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            outline: none;
            border: none;
        }
    }
    .common-btn.w50{
        width: 50%;
    }
    .common-btn.del-fr {
        right: 0;
        button{
            color: red
        }
    }
    body{
        background: #f5f5f5;
    }
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/

    .crm-box{
    .weui-grids{
        background: #fff;
    }
    .weui-grid__icon{
        height: 40px;
        width: 40px;
    }
    .weui-grid:before{
        border-right: none;
    }
    .weui-grid{
        text-align: center;
    }
    .panel-box{
        background: #fff;
    }
    .memu-img{
        background: #6A6A6A;
        height: 40px;
        width: 40px;
        vertical-align: middle;
        display: inline-block;
        border-radius:50%
    }

    .my-item-title{
        color: #232323;
        font-size: 13px;
    }
    .panel-box{
        position: relative;
        margin: 15px;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #EDEDED;
    }
    .panel-box {
    .ph_icon{
        width: 12px;
        height: 13px;
        display: inline-block;
        vertical-align: middle;
        background: url("../../static/images/paihang@2x.png") no-repeat;
        background-size: 12px 13px;
        margin-right: 8px;
        margin-bottom: 2px;
    }
    .jh_icon{
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        background: url("../../static/images/genjin@2x.png") no-repeat;
        background-size: 14px 14px;
        margin-right: 8px;
        margin-bottom: 2px;
    }
    .sj_icon{
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        background: url("../../static/images/shangji@2x.png") no-repeat;
        background-size: 14px 14px;
        margin-right: 8px;
        margin-bottom: 2px;
    }
    .titbox{
        box-sizing: border-box;
        overflow: hidden;
        line-height: 50px;
    }
        .titbox span{
            font-size: 14px;
            color: #999999;
            display: inline-block;
            float: left;
            text-align: center;
        }
        h3{
            font-size: 14px;
            color: #191919;
            text-align: center;
            font-weight: normal;
        }
        .item{
            border-top: 1px solid #EDEDED;
            padding: 15px 0;
        }
        .item h3 {
            color: #333;
            font-weight: normal;
            line-height: 20px;
            text-align: left;
        }
        a{
            float: right;
            color: #ccc;
            font-size: 12px;
            margin-top: 10px;
        }
        h3 a{
            font-size: 14px;
            color: #191919;
        }
        .right-arrow{
           width:7px;
            height: 14px;
            display: inline-block;
            background: url("../../static/images/goto.png") no-repeat;
            background-size: 7px 14px;
            margin-left: 10px;
            margin-bottom: -3px;

        }
        p span{
            color: #999;
            margin-right: 20px;
            font-size: 12px;
        }
        .item.home_oppor_item{
            position: relative;
        }
        .item.home_oppor_item p{
            overflow: hidden;
            line-height: 24px;
        }
        .item.home_oppor_item p span{
           margin-right: 0;
            color: #333;
            font-size: 14px;
        }
        .item.home_oppor_item p label{
            margin-right: 0;
            color: #999;
            font-size: 14px;
        }
        .item.home_oppor_item .btn{
            height: 18px;
            width: 56px;
            line-height: 18px;
            background: #F1E8FC;
            border-radius: 1px;
            text-align: center;
            font-size: 11px;
            color: #AC76EA;
            float: none;
        }
        .item.home_oppor_item .mr20{
            margin-right: 20px;
        }
        .item.home_oppor_item.can-click-style:after{
            right:0px;
        }
        .history-tit{
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 14px;
            color: #999999;
        }
    .ph-box{
        overflow: hidden;
    }
        .ph-box p{
            text-align: center;
            overflow: hidden;
            line-height: 40px;
        }
        .ph-box span{
            display: inline-block;
            float: left;
            margin-right: 0;
            font-size: 15px;
            color: #191919;
        }
        .w50{
            width: 50%;
        }
        .w10{
            width: 10%;
        }
        .w30{
            width: 30%;
        }
        .w20{
            width: 20%;
        }
        .w40{
            width: 40%;
        }
    }
    }


</style>