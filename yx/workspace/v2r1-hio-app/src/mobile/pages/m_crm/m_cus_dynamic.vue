<template>
    <div class="history-box">
        <div class="his-con">
            <my_scroller ref="myScroll" v-on:getList="getDyanmicList" :pageNum="pageNum" :pageTotal="pageTotal" scrollPage="dyanmicList"  :isContinue="isContinue" :list="list"></my_scroller>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import mCrmHeader from '../../components/m_crm_header.vue'
    import my_scroller from '../../components/m_crm_scroll.vue'
    import c_service from '../m_crm/m_crm_search/m_crm_bservice.js'
    export default {
        components: {
            mCrmHeader,
            my_scroller
        },
        data () {
            return {
                idMap:"",
                id:"",
                list:[],
                pageNum:1,
                pageCount:10,
                pageTotal:1,
                isContinue:false,
                isShowPlus:false,
                decisionList:{
                    "0":"普通员工",
                    "1":"采购决策人",
                    "2":"项目决策人",
                    "3":"人事决策人"
                }
            }
        },
        created(){
            document.title = '动态列表';
        },
        mounted(){
            this.id = this.$route.query.customerId;
            //获取动态列表
            this.getDyanmicList();
        },
        methods: {
            getDyanmicList(pageNum){
                if(pageNum) this.pageNum = pageNum;
                if(this.pageNum>this.pageTotal){
                    this.isContinue = false;
                    return;
                }
                const params = {
                    customerId:this.id,
                    pageNum:this.pageNum,
                    pageCount:this.pageCount
                };
                c_service.getDyanmicList(params).then((data)=>{
                    console.log(data[0]);
                    this.list.push.apply(this.list,data[0].list);
                    this.pageNum = data[0].pageNum;
                    this.pageTotal = data[0].pageTotal;
                    this.$refs.myScroll.isJixuFn(this.pageTotal>this.pageNum);
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    body{
        background: #f5f5f5;
    }
.his-con{
    .item{
        overflow: hidden;
        background: #fff;
        margin-top: 10px;
        padding: 15px;
        position: relative;
    }
    .l25{
        line-height: 25px;
    }
    .item p{
        overflow: hidden;

    }
   .item p span{
       font-size: 15px;
       color: #191919;
   }
    .item p label{
        font-size: 15px;
        color: #666666;
    }
    .mr12{
        margin-right: 12px;
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
        right: 15px;
        margin-top: -4px;
    }
    .item.no-event:after{
        height: 0;
        width: 0;
        border-width:0;
    }
}
</style>