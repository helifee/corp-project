<template>
    <div class="customer-box">
        <mCrmHeader titleName="商机管理" :isShowPlus="true" v-on:rightClick="gotoAddPage"></mCrmHeader>
        <div>
           <crmSearch 
           v-on:searchResult="getSearchResult" 
           :placeholder="placeholder" 
           :type="type"
           :page="page"
           v-on:mySelected="getMySelected">
           </crmSearch>
           <crmSearchListItem 
           :page="page" 
           :searchList="list" 
           v-on:selected="getSelected">
           </crmSearchListItem>

       </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { XHeader,Grid,GridItem } from 'vux'
    import crmSearch from '././m_crm_search/m_crm_common_search.vue'
    import crmSearchListItem from '././m_crm_search/m_crm_common_searchItem.vue'
    import mSearch from '././m_crm_search/m_crm_search.js'

    export default {
        components: {
            crmSearch,
            XHeader,
            crmSearchListItem
        },
        data () {
            return {
                type : '2',
                page : '2',
                placeholder : "搜索商机",
                list : [{
                        title:"默认的列表",
                        time:"2018/2/3",
                        dec:"默认首页初步沟通",
                        other:"其它其它"
                    }]
            }
        },
        mounted(){

        },
        methods: {
            //搜索关键词的回调
            getSearchResult(data){
                console.log(data)
            },
            //搜索结果的回调
            getMySelected(item){
                console.log(item.title)
            },
            //列表点击事件
            getSelected(item){
                console.log(item.title)
            }
        }
    }
</script>

<style lang="scss">
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/


</style>