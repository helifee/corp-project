<template>
        <span>





            <button v-dynamic-icon='a.jpg,b.jpg'></button>



            <button v-for="item in data" :src="item.isHover?'a.jpg':'b.jpg'" @mouseenter="item.isHover=true;" @mouseleave="item.isHover=false">
                sfsdf
            </button>


            it works
        </span>
</template>
<style>

</style>
<script>


    export default {
        computed: {

        },

        components:{

        },
        methods: {

        },
        props: {


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        created(){

        },
        data() {



            return {

                data:[
                    {
                        a:'sdfsdf',
                        isHover:false
                    }
                ]
            }
        },

        beforeDestroy(){

        },
        destroyed(){

        },
        mounted() {



        },

    }
</script>
