<template>
    <div class="contract-box">
        <crmSearch v-on:searchFn="searchPay" ref="searchCompnent"></crmSearch>
        <my_scroller ref="myScroll" v-on:getList="getPayList" :pageNum="pageNum" :isContinue="isContinue" scrollPage="pay" :list="list"></my_scroller>


    </div>
</template>
<script>
    import crmSearch from '../../components/m_crm_search.vue'
    import contractList from '../m_contract/m_contractList.vue'
    import my_scroller from '../../components/m_crm_scroll.vue'
    import service from '../m_contract/m_contract_service.js'
    import u from '@mobile/m_util.js'
    export default {
        name:"m_pay_home",
        components: {
            crmSearch,
            my_scroller,
            contractList
        },
        data () {
            return {
                list:[],
                pageNum:1,
                isContinue:false,
                pageCount:10,
                pageTotal:1,
                title:""
            }
        },
        created(){
            document.title = "付款台账";
        },
        mounted(){
            if(this.$route.query.title){
                this.$refs.searchCompnent.onFocus(this.$route.query.title);
                this.searchPay(this.$route.query.title);
            }else{
                this.getPayList();
            }
        },
        methods: {
            setUrlFn(val){
                let url = window.location.href; //获取当前url
                if (url.indexOf("?") > 0) {
                    url = url.split("?")[0];
                }
                window.history.replaceState({data:222},null,url + u.setParam("title", val));
            },
            getPayList(pageNum){
                if(pageNum) this.pageNum = pageNum;
                if(this.pageNum>this.pageTotal){
                    this.isContinue = false;
                    return;
                }
                const param = {
                    pageCount:this.pageCount,
                    pageNum:this.pageNum,
                    title:this.title
                }
                service.getPayList(param).then((data)=>{
                    this.list.push.apply(this.list,data[0].list);
                    this.pageTotal = data[0].pageTotal;
                    this.pageNum = data[0].pageNum;
                    if(this.pageTotal<=this.pageNum){
                        this.isContinue = false;
                    }else{
                        this.isContinue = true;
                    }
                    console.log(data)
                 })
            },
            searchPay(val){
                this.setUrlFn(val);
                this.title = val;
                //获取联系人列表
                let params = {
                    pageNum:1,
                    pageCount:this.pageCount,
                    title:this.title
                }
                service.getPayList(params).then((data)=>{
                    this.list = data[0].list;
                    this.pageTotal = data[0].pageTotal;
                    this.pageNum = data[0].pageNum;
                    if(this.pageTotal<=this.pageNum){
                        this.isContinue = false;
                    }else{
                        this.isContinue = true;
                    }
            });
            }
        },
        watch:{
            isContinue(){
                this.$refs.myScroll.isJixuFn(this.isContinue);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';



</style>