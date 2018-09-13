<template>
    <div>
        <news-block title="全部发文" columnId="all"></news-block>
    </div>

</template>

<script>
    JZY.locale.add('newsLocale',require('./news.locale'))
    import newsBlock from '@Main/news/components/newsBlock.vue'
    import {mapMutations,mapGetters} from 'vuex'
    export default{
        components: {
            newsBlock
        },
        methods:{

        },
        data(){
            return {
            }
        },
        computed:{
            ...mapGetters({
                columnsList:'columnsList'
            })
        },

        mounted() {
            console.log(this.columnsList);

        },
        destroyed() {
        },

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
