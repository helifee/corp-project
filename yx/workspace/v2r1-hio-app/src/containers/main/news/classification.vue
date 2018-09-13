<template>
    <div>
        <news-block :title="title" :columnId="id"></news-block>
    </div>
</template>

<script>
    JZY.locale.add('newsLocale',require('./news.locale'))
    import newsBlock from '@Main/news/components/newsBlock.vue'
    import {getNewsTypeName} from '@Main/news/getData.js'
    export default{
        components: {
            newsBlock
        },
        methods:{
            //发布新闻
            async rqNewsTypeName(id){
                let res = await getNewsTypeName(id);
                console.log(res,"resresres");
                this.title = res.name;
            },
        },
        data(){
            return {
                title:'',
                id:'',
            }
        },
        columnsList:{
            get() {
                return this.$store.state.columnsList
            },
            set(value) {
                console.log("value",value)
                this.$store.dispatch('sortColumn', value)
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.rqNewsTypeName(this.id);
            this.columnsList = this.$store.state.columnsList;
        },
        watch:{
            '$route.params.id':function(curVal,oldVal){
                this.id = curVal;
                this.rqNewsTypeName(curVal);
            },
        },

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
