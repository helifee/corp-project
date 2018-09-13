<template>
    <div class="conItem">
        <p><label>{{label}}</label><span>{{value}}</span></p>
    </div>
</template>
<script>
    export default {
        name:"conItemRow",
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

<style lang="scss">
    .conItem p{
        font-size: 14px;
        color: #666666;
        overflow: hidden;
        line-height:24px;
        label{
            float: left;
            color: #666666;
        }
        span{
            float: right;
            color: #666666;
            text-align: right;
        }
    }

</style>