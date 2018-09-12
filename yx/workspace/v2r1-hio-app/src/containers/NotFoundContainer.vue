<template>
    <!--<div class="notFoundContainer">-->
        <!--<img src="/asserts/images/404.jpg">-->
    <!--</div>-->
    <div>
        this is 404
    </div>
</template>

<style scoped lang="scss">
    .notFoundContainer {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        min-width: 986px;
        min-height: 600px;
        img {
            flex: 1;
            /*width: 600px;*/
            overflow: auto;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
</style>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>
