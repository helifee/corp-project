<template>
        <div class="loading">
            <div class="load-box">
                <img class='load' src='../static/images/load.gif'/>
                <div class="textWaiting">请稍后...</div>
            </div>
        </div>
</template>
<script>

    export default {
        name:"loadingComp",
        components: {

        },
        props: [],
        data () {
            return {

            }
        },
        mounted(){

        },
        methods: {
            loadingShowStyle(text){
                $("body").css("overflow","hidden");
                var scrollTop = $(window).scrollTop();
                var top =  $(window).height()/2;
                $(".loading").eq(0).show();
                $(".loading").eq(0).find(".load-box").show();
                $(".loading").eq(0).css("top",scrollTop+"px");
                $(".loading .load-box").css("top",top+"px");
                if(text) $(".loading .load-box .textWaiting").html(text);
            },
            loadingHideStyle(){
                $("body").css("overflow","auto");
                $(".loading").eq(0).hide();
                $(".loading").eq(0).find(".load-box").hide();
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*加载loading*/
    .loading{
        display: none;
        background: transparent;
        z-index: 999;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        border-radius: 6px;
        opacity: 0.7;
        overflow: auto;
    }
    .loading .load-box{
        display: none;
        z-index: 1001;
        opacity: 0.7;
        width:128px;height:128px;background: #000000;border-radius: 10px;
        position: absolute;
        top:50%;
        left: 50%;
        margin-left: -64px;
        margin-top:-64px;
        vertical-align: middle;
    }
    .loading .load-box img.load{width:36px;height:36px; margin: 40px 46px 4px 46px;}
    .textWaiting{
        color: #fff;text-align: center;font-size: 12px;
        font-family: PingFangSC-Regular;letter-spacing: 0;line-height: 12px;
        margin-top: 10px;
    }
</style>