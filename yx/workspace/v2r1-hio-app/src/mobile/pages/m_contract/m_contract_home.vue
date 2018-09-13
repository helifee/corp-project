<template>
    <div class="contract-box">
        <crmSearch v-on:searchFn="searchContract" ref="searchCompnent"></crmSearch>
        <my_scroller v-on:getList="getContractList" ref="myScroll" :pageNum="pageNum" :isContinue="isContinue" scrollPage="contract" :list="list"></my_scroller>


    </div>
</template>
<script>
    import crmSearch from '../../components/m_crm_search.vue'
    import my_scroller from '../../components/m_crm_scroll.vue'
    import service from '../m_contract/m_contract_service.js'
    import u from '@mobile/m_util.js'
    export default {
        name:"m_contract_home",
        components: {
            crmSearch,
            my_scroller
        },
        data () {
            return {
                list:[],
                pageCount:10,
                pageNum:1,
                title:"",
                pageTotal:1,
                isContinue:false

            }
        },
        created(){
            document.title = "合同支付台账";
        },
        mounted(){
            if(this.$route.query.title){
                this.$refs.searchCompnent.onFocus(this.$route.query.title);
                this.searchContract(this.$route.query.title);
            }else{
                this.getContractList();
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
            getSearchResult(){

            },
            getMySelected(){

            },
            searchContract(val){
                this.setUrlFn(val);
                this.title = val;
                //获取联系人列表
                let params = {
                    pageNum:1,
                    pageCount:this.pageCount,
                    title:this.title
                }
                service.getContractList(params).then((data)=>{
                    this.list = data[0].list;
                    this.pageTotal = data[0].pageTotal;
                    if(this.pageTotal>this.pageNum){
                        this.isContinue = true;
                    }else {
                        this.isContinue = false;
                    }
            });
            },
            getContractList(pageNum){
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
                service.getContractList(param).then((data)=>{
                    this.list.push.apply(this.list,data[0].list);
                    this.pageTotal = data[0].pageTotal;
                    if(this.pageTotal>this.pageNum){
                        this.isContinue = true;
                    }else {
                        this.isContinue = false;
                    }
                    console.log(data)
            })
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

    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/
    body{
        background: #f5f5f5;
    }


</style>