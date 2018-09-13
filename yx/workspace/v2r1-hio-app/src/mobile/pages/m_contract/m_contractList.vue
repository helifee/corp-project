<template>
    <div class="contractList">
        <conItem :list="list" :pageType="pageType"></conItem>
    </div>
</template>
<script>
    import conItem from '../../components/conItem.vue'
    export default {
        name:"contractList",
        props:["list","pageType"],
        components: {
            conItem
        },
        data () {
            return {

            }
        },
        mounted(){

        },
        methods: {
            getSearchResult(){

            },
            getMySelected(){

            }

        }
    }
</script>

<style lang="scss">



</style>