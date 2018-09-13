<template>
    <div>
    <news-block title="全部发文" :dataList="newsData"></news-block>
    </div>
</template>

<script>
    JZY.locale.add('newsLocale',require('./news.locale'))
    import newsBlock from '@Main/news/components/newsBlock.vue'
    export default{
        components: {
            newsBlock
        },
        methods:{

        },
        data(){
            return {
                newsData:newsData
            }
        },

        mounted() {

        },
        destroyed() {
        },

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
