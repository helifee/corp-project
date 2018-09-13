<template>
    <div>
        <core module="RECENTLY" v-if="pageData" :page-data="pageData"></core>
    </div>
</template>
<style>

</style>
<script>

    import core from './personalNetDisk.common.vue'


    export default {
        computed: {

        },

        components:{
            core
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

            JZY.xhr.r({
                type:'post',
                url:'/disk/diskCompanyFile/recentVisitPage',
                data:{}
            })
                .then(([res])=>{

                    // res.list.forEach((item)=>{
                    //     item.isDir=true
                    // })

                    this.pageData=res
                    JZY.s.clog('res--:',res)
                })

        },
        data() {



            return {

                pageData:null,
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
