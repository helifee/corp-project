<template>
    <div class="customer-box" :class="myClass">
        <mCrmSearch v-on:searchFn="searchCustomer"></mCrmSearch>
        <div class="menu-box-con">
            <ul class="menu-box">
                <li :class="{current:num==-1}"><a href="javascript:void(0);" @click="searchAll">全部</a></li>
                <li :class="{current:index==num}" v-for="(item,index) in tabList" :key="index"><a href="javascript:void(0);" @click="tab(index,item.val)">{{item.value}}</a></li>
            </ul>
        </div>
        <div class="cus-list pb_50">
            <my_scroller ref="myScroll" v-on:getList="getCustomerList" v-on:gotoDetail="gotoDetail" :pageNum="pageNum" :pageTotal="pageTotal" :isContinue="isContinue" scrollPage="customer" :list="list"></my_scroller>

        </div>
        <div class="common-btn" v-if="isSelect"><button @click="dialogVisibleFn">返回</button></div>
        <div class="common-btn" v-else><button @click="gotoAddPage">添加</button></div>
    </div>

</template>
<script>
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import mCrmSearch from '../../../components/m_crm_search.vue'
    import my_scroller from '../../../components/m_crm_scroll.vue'
    import c_service from '../m_crm_search/m_crm_bservice.js'
    import u from '@mobile/m_util.js'
    export default {
        components: {
            mCrmHeader,
            mCrmSearch,
            my_scroller
        },
        props:{
            dialogVisible : {
                type : Boolean
            },
            isSelect : {
                type : Boolean
            },
            myClass : {
                type : String
            }
        },
        data () {
            return {
                isActive:true,
                isAll:true,
                tabList:[{
                    val:"0",
                    value:"未跟进"
                },{
                    val:"1",
                    value:"跟进中"
                },{
                    val:"2",
                    value:"重点跟进"
                },{
                    val:"3",
                    value:"已签约"
                },{
                    val:"4",
                    value:"失败"
                }],
                addUrl:"#/m_cus/m_add_customer",
                status:"",
                num:-1,
                list:[],
                isContinue:false,
                pageNum:1,
                pageCount:10,
                pageTotal:1,
                customerName:""
            }
        },
        created(){
            if(!this.isSelect)
            document.title = '客户';
        },
        mounted(){
            this.num = this.$route.query.num ? this.$route.query.num : -1;
            if(this.num>=0) this.status = this.num;
            this.getCustomerList();
        },
        methods: {
            dialogVisibleFn(){
                this.$emit("closeDialogVisible")
            },
            searchAll(){
                this.isAll = true;
                this.num = -1;
                this.setUrlFn(this.num);
                this.status = "";
                this.searchCustomer(this.customerName);
            },
            tab(i,status){
                this.isAll = false;
                this.num = i;
                this.setUrlFn(this.num);
                this.status = status;
                this.searchCustomer(this.customerName);
            },
            setUrlFn(num){
                let url = window.location.href; //获取当前url
                if (url.indexOf("?") > 0) {
                    url = url.split("?")[0];
                }
                //window.location.href=url + u.setParam("num", num);
                window.history.replaceState({data:111},null,url + u.setParam("num", num));

            },
            gotoDetail(o){
                let sid = o.customerId;
                 if(this.isSelect){
                     this.$emit("setCustom",o);
                     this.dialogVisibleFn();
                 }else{
                     this.$router.push({
                         name: 'm_cus_detail',
                         query: {
                             id: sid,
                             num:this.num
                         }
                     });
                 }
            },
            gotoAddPage(){
                window.location.href = this.addUrl;
            },
            //根据名称查询
            searchCustomer(val){
               this.customerName = val;
                //获取联系人列表
                let params = {
                    pageNum:1,
                    pageCount:this.pageCount,
                    customerName:this.customerName,
                    status:this.status
                }
                c_service.getCustomerList(params).then((data)=>{
                    this.list = data[0].list;
                    this.pageNum = data[0].pageNum;
                    this.pageTotal = data[0].pageTotal;
                     this.$refs.myScroll.isJixuFn(this.pageTotal>this.pageNum);
                });
            },
            getCustomerList(pageNum){
                if(pageNum) this.pageNum = pageNum;
                if(this.pageNum>this.pageTotal){
                    this.isContinue = false;
                    return;
                }
                //获取联系人列表
                let params = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount,
                    customerName:this.customerName,
                    status:this.status
                }
                c_service.getCustomerList(params).then((data)=>{
                    this.list.push.apply(this.list,data[0].list);
                    this.pageTotal = data[0].pageTotal;
                    this.pageNum = data[0].pageNum;
                    this.$refs.myScroll.isJixuFn(this.pageTotal>this.pageNum);
                });
            }
        }
    }
</script>

<style lang="scss">
    body{
        background: #f5f5f5;
    }
    .menu-box-con{
        overflow-x: scroll;
    }
    ._customerBox{
        position: fixed;
        width:100%;
        height:100%;
        overflow-x:hidden;
        overflow-y:scroll;
        left:0;bottom:0;top:0;right:0;
        z-index: 99;
        background:#fff;
    }
.cus-list{
    overflow: hidden;
    padding: 0px 15px 15px 15px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
}
    .pb_50{
        padding-bottom: 50px;
    }
    .cus-list{
    .item{
        line-height: 20px;
        padding: 15px 0;
        border-bottom: 1px solid #ededed;
        position: relative;
    }
    .item:after{
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
        right: 0px;
        margin-top: -4px;
    }
         .tit{
             font-size: 15px;
             color: #191919;
        }
    .address{
        font-size: 12px;
        color: #999;
    }


    }
    .customer-box{
        .menu-box{
            background: #fff;
            height: 50px;
            box-sizing: border-box;
            box-shadow: inset 0 0 0 0;
            margin-bottom: 10px;
            width: 120%;
        }
        .menu-box li{
            float: left;
            /*width: 20%;*/
            height: 48px;
            line-height: 48px;
            text-align: center;
            padding: 0 16px;
        }
        .menu-box li a{
            font-size: 14px;
            color: #A3A5A8;
            display: inline-block;
            cursor: pointer;

        }
        .menu-box li.current a{
            color: #009EFF;
            border-bottom: 2px solid #009EFF;
        }
    }

</style>