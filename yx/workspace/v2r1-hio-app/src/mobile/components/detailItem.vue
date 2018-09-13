<template>
    <div class="detailItem">
        <p><label>{{label}}</label><span>{{value}}</span></p>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))


    export default {
        name:"detailItem",
        components: {

        },
        props: ['label',"value"],
        data () {
            return {
//                isShowPlus:false
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
.detailItem{
    p{
        line-height: 30px;
    font-size:14px;
    overflow:hidden;
        label{
            color: #999;
            float: left;
            width: 30%;
        }
        span{
            color: #333;
            width: 60%;
            float: right;
        }
    }
}
</style>