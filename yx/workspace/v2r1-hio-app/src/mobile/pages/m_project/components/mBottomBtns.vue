<template>
    <div class="btnGroups">
        <!--<slot></slot>-->
        <button >添加</button>
        <span></span>
        <button >添加</button>
    </div>
</template>

<script>
    export default {
        name: "m-bottom-btns",
        mounted(){
             // let number = this.$children.length
           let number=this.$el.children;
            console.log("number:",number)
        }
    }
</script>

<style  lang="scss">
    .btnGroups{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        button{
            width: calc( 50% - 1px);
            float: left;
            height: 50px;
            background-color: #ffffff;
            color: #009EFF;
            font-size: 16px;
            border: 0;
        }
        span{
            width: 1px;
            height: 30px;
            display: inline-block;
            background: #EDEDED;
            margin-top: 10px;
            float: left;
        }
    }
</style>