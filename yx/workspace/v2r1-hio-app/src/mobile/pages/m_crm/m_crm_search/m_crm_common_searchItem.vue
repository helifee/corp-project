<template>

  <div class="common_list_type1">
        <crmBusinessList v-if="page=='1'" :searchList="searchList" v-on:selectItem="selectItem"></crmBusinessList>
        <crmOrderList v-if="page=='2'" :searchList="searchList" v-on:selectItem="selectItem"></crmOrderList>
  </div>

</template>
<script>

    // import { Panel } from 'vux'
    import crmBusinessList from "@mobile/pages/m_crm/m_business/m_business_list.vue"
    import crmOrderList from "@mobile/pages/m_crm/m_order/m_order_list.vue"
    import crmBusinessCusList from "@mobile/pages/m_crm/m_business/m_business_cus_list.vue"
    export default {
        name: "crm_search_list_item",
        components: {
           crmBusinessList,
           crmOrderList,
           crmBusinessCusList
        },
        props:["searchList","page"],
        methods: {
            selectItem(item){
                this.$emit("selected",item);
            }
        },
        data () {
            return {
            
            }
        }
    }   
</script>

<style lang="scss">
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/

.common_list_type1{
    padding:10px;
    ul,ul li{
        list-style: none
    }
}
</style>