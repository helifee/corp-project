<template>
    <div class="linker-box">
        <mCrmHeader titleName="联系人" :isShowPlus="isShowPlus" :addUrl="addUrl"></mCrmHeader>
        <mCrmSearch></mCrmSearch>
        <div class="list">
            <my_scroller  v-on:getList="getLinkerList" :isContinue="isContinue" v-on:gotoDetail="gotoDetail" scrollPage="link_list" myref="scroller_link_list" :list="list"></my_scroller>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import mCrmSearch from '../../../components/m_crm_search.vue'
    import my_scroller from '../../../components/m_crm_scroll.vue'
    import mCrmService from '../m_crm_search/m_crm_bservice.js'
    export default {
        name:"m_linker",
        components: {
            mCrmHeader,
            mCrmSearch,
            my_scroller
        },
        data () {
            return {
                isContinue:true,
                pageNum:1,
                pageCount:2,
                pageTotal:1,
                list:[],
                height:"",
                isShowPlus:true,
                addUrl:"#/m_link/m_add_link"
            }
        },
        mounted(){

           this.getLinkerList();
        },
        methods: {
            getLinkerList(){
                if(this.pageNum>this.pageTotal){
                    this.isContinue = false;
                    return;
                }
                //获取联系人列表
                let params = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount
                }
                mCrmService.getLinkerList(params).then((data)=>{
                    console.log(data);
                    this.list.push.apply(this.list,data[0].list);
                    this.pageTotal = data[0].pageTotal;
                    this.pageNum = data[0].pageNum;
                    this.pageNum++;
              });
            },
            gotoDetail(sid){
                this.$router.push({
                    name: 'm_link_detail',
                    query: {
                        id: sid
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../static/css/m_crm.scss';
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/
.linker-box{
    .list{
        padding: 20px;
    }
    .list .item{
        padding-right: 20px;
        position: relative;
        margin-bottom: 20px;
    }
    .list .item p{
        line-height: 25px;
    }
    label{
        color: #999;
    }
    span{
        color: #333;
        margin-right: 20px;
    }
    .imgIcon{
        fill: $crm-a-color;
        position: absolute;
        right: 10px;
        top:5px;
    }
}

</style>