<template>
       <div>
            <core module="DIR_MANAGE" @openDir="handleOpenDir" v-if="pageData" :page-data="pageData"></core>
       </div>
</template>
<style>

</style>
<script>

    import core from './netDisk.common'

    import netDisk from './netDisk'


    // JZY.s.clog('netDisk--:',netDisk)


    import netDiskMixin from './netDiskMixin'
    export default {
        mixins:[netDiskMixin],
        computed: {

        },

        components:{
            core
        },
        methods: {
            handleOpenDir:netDisk.methods.handleOpenDir,
            getList(options){

                options=JZY.u.deepExtend({
                    pageCount:JZY.c.pageCount,
                    pageNum:1
                },options)


                // if(process.env.SB==1){
                //     options.pageNum-=1;
                // }

                return JZY.xhr.r({
                    type:'post',
                    url:'/disk/diskCompanyFileDirectory/directoryManagementPage',
                    // url:'/disk/diskCompanyFile/rootPage',
                    data:options
                })
                    .then(([res])=>{

                        // res.list.forEach((item)=>{
                        //     item.isDir=false
                        // })
                        JZY.s.hideLoading()
                        this.pageData=res
                        JZY.s.clog('res--:',res)
                    })
                    .catch(()=>{
                        JZY.s.hideLoading()
                    })

            }

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


            JZY.s.showLoading()
            this.getList()


            // JZY.xhr.r({
            //     type:'post',
            //     url:'/disk/diskCompanyFileDirectory/directoryManagementPage',
            //     // url:'/disk/diskCompanyFileDirectory/directoryManagementPage',
            //     data:{}
            // })
            //     .then(([res])=>{
            //
            //         // res.list.forEach((item)=>{
            //         //     item.isDir=true
            //         // })
            //
            //         this.pageData=res
            //         JZY.s.clog('res--:',res)
            //     })

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
