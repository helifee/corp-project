<template>
    <div class="recordBox">
        <mCtitle :titleName="title[0]" :isShowPlus="true"></mCtitle>
    </div>
</template>
<script>
  
    
    export default {
        name:"m_record",
        components: {
            mCtitle
        },
        props: [],
        data () {
            return {
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="scss">
    // @import '../static/css/m_crm.scss';
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/




</style>