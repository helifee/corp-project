<template>
    <div>



        <!--16.66667%-->
        <!--<el-row>-->
            <!--<el-col :span="4" v-if="asideMenu">-->
                <!--&nbsp;-->




            <!--</el-col>-->


            <!--<el-col :span="asideMenu?20:24">-->

                <!--<slot>-->

                <!--</slot>-->
            <!--</el-col>-->
        <!--</el-row>-->
    </div>

</template>
<style scoped lang="scss">

</style>
<script>


    export default {
        computed: {

        },


        methods: {

        },
        props: {

            asideMenu:{
                type:Boolean,
                default:true
            }


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        data() {

            return {

            }
        },

        mounted() {



        },

    }
</script>
