<template>
        <div>
            js gantt
        </div>
</template>
<style>

</style>
<script>
    import './jsgantt.css'
    import './jsgantt'


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


            console.log('JSGantt--:',JSGantt)

        },

    }
</script>
