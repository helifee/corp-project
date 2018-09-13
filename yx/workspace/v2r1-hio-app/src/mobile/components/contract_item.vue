<template>
    <div class="contractItem">
        <h3 :class="myclass">{{data.totalTime}}<a :href="url" v-show="showMore">更多</a></h3>
        <p><label>{{titText}}新增合同金额(含在审)</label><span>{{data.totalMoney}}元</span></p>
        <p><label>{{titText}}累计合同变更金额(含在审)</label><span>{{data.totalChangeMoney}}元</span></p>
        <p><label>{{titText}}累计付款金额(含在审)</label><span>{{data.totalPyamentMoney}}元</span></p>
    </div>
</template>
<script>
    export default {
        name:"conItemRow",
        components: {

        },
        props: ['data',"showMore","myclass","url","titText"],
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
    .contractItem{
        background: #fff;
        margin:10px 10px 0 10px;
        padding: 0 10px 15px 10px;
         h3.h3-style{
             font-size: 15px;
        height: 40px;
        line-height:40px;
        }
         h3.h3-style:after{
        content: " ";
        display: inline-block;
        height: 0px;
        width: 0px;
        border:none;
    }
        h3{
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            color: #191919;
            position: relative;
            border-bottom: 1px solid #ededed;
            margin-bottom: 15px;
        }
        h3:after{
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
            right: 10px;
            margin-top: -4px;
        }
        h3 a{
            float: right;
            font-size: 15px;
            color: #191919;
            margin-right: 20px;
            font-weight: normal;
        }
    }
    p{
        overflow: hidden;
        line-height:28px;
        label{
            float: left;
            font-size: 15px;
            color: #666666;
            width: auto;
        }
        span{
            float: right;
            text-align: right;
            font-size: 15px;
            color: #666666;
            width: auto;
        }
    }

</style>