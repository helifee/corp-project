<template>
    <div class="linker-box" :class="myClass">
        <mCrmSearch  v-on:searchFn="searchLinker"></mCrmSearch>
        <div class="link-list pb_50">
            <div class="item">
                <my_scroller ref="myScroll" v-on:getList="getLinkerList" v-on:gotoDetail="gotoDetail" :pageNum="pageNum" :isContinue="hasNext" scrollPage="link_list" :list="list"></my_scroller>

            </div>
        </div>
        <div class="common-btn" v-if="!isSelect"><button @click="gotoAddPage">添加</button></div>
        <div class="common-btn" v-else><button @click="dialogVisibleFn">返回</button></div>
    </div>
</template>
<script>
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import mCrmSearch from '../../../components/m_crm_search.vue'
    import mCrmService from '../m_crm_search/m_crm_bservice.js'
    import my_scroller from '../../../components/m_crm_scroll.vue'
    export default {
        name:"m_linker",
        components: {
            mCrmHeader,
            mCrmSearch,
            my_scroller
        },
        props:{
            dialogVisibleLinker : {
                type : Boolean
            },
            isSelect : {
                type : Boolean
            },
            myClass : {
                type : String
            },
            customerId:{

            }
        },
        data () {
            return {
                pageNum:1,
                pageCount:10,
                searchName:"",
                hasNext:false,
                list:[],
                isShowPlus:true,
                logId:"",
                addUrl:"#/m_link/m_add_link",
                customerCurId:""
            }
        },
        created(){
            if(!this.isSelect)
            document.title = '联系人';
        },
        mounted(){
            this.customerCurId = this.$route.query.customerId ? this.$route.query.customerId : this.customerId;
            this.getLinkerList();
        },
        methods: {
            dialogVisibleFn(){
                this.$emit("closeDialogVisible")
            },
            searchLinker(val){
                this.searchName = val;
                //获取联系人列表
                let params = {
                    pageNum:1,
                    pageCount:this.pageCount,
                    name:this.searchName,
                    customerId:this.customerCurId
                }
                mCrmService.getLinkerList(params).then((data)=>{
                    this.list = data[0].data;
                    this.hasNext = data[0].hasNext;
                    this.$refs.myScroll.isJixuFn(this.hasNext);

            });
            },
            getLinkerList(pageNum){
                if(pageNum) this.pageNum = pageNum;
                const param = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount,
                    name:this.searchName,
                    customerId:this.customerCurId
                }
                mCrmService.getLinkerList(param).then((data)=>{
                    console.log(data);
                    this.list.push.apply(this.list,data[0].data);
                    this.hasNext = data[0].hasNext;
                    this.$refs.myScroll.isJixuFn(this.hasNext);
              });
            },
            gotoAddPage(){
                window.location.href = this.addUrl;
            },
            gotoDetail(o){
                let sid = o.contcatId;
                if(this.isSelect){
                    this.$emit("setLinker",o);
                    this.dialogVisibleFn();
                }else{
                    this.$router.push({
                        name: 'm_link_detail',
                        query: {
                            id: sid
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/
.linker-box{
    .link-list{
        background: #F5F6F7;
        width: 100%;
    }
    .layer-zizu{
        width: 10px;
        position: absolute;
        right: 10px;
        top:6px;
        opacity: 0.5;
        text-align: center;
        line-height: 20px;
    }
    .layer-zizu span{
        display: block;
        font-size: 10px;
        color: #454546;
    }
    .link-list .item .tit{
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #A9AAAC;
        padding-left: 15px;
    }
    .link-list .item .p_con{
        overflow: hidden;
        padding-left: 15px;
        background-color: #fff;
    }
    .link-list .item .p_box{
        padding-left:50px;
    }
    .link-list .item .p_box.female{
        background: url("../../../static/images/portrait_female.png") left center no-repeat;
        background-size: 40px 40px;
    }
    .link-list .item .p_box.male{
        background: url("../../../static/images/portrait_male.png") left center no-repeat;
        background-size: 40px 40px;
    }
    .link-list .item .p_box p{
        padding: 10px 0;
        border-bottom: 1px solid #EDEDED;
    }
    .link-list .item .p_box span{
        font-size: 17px;
        color: #191919;
        line-height: 17px;
        display: block;
    }
    .link-list .item .p_box label{
        font-size: 12px;
        color: #A3A5A8;
    }
}

</style>