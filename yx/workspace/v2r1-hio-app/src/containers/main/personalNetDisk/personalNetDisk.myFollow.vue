<template>
    <div>
        <!--<div class="theme-font padd10" style="border-bottom:solid 1px rgba(204, 204, 204, 1)">-->
        <net-disk-common :companyDisk="false"  module="MY_FOLLOW" @openDir="handleOpenDir" v-if="pageData" :page-data="pageData"></net-disk-common>
        <!--</div>-->

    </div>
</template>
<style>

</style>
<script>


    import netDiskCommon from './personalNetDisk.common.vue'

    export default {
        components:{
            netDiskCommon
        },
        computed: {

        },

        created(){
            JZY.s.showLoading()
            this.getList()
        },
        name: 'jzy-',
        methods: {
            handleOpenDir:JZY.u.debounce(function(row,pathArr,breadMenuIndex,currentPage=1,searchContent='',cb){
                cb=cb||function(){}

                if(!row){
                    JZY.s.showLoading()
                    this.getList({pageNum:currentPage},searchContent)
                    return false
                }


                let findBread=pathArr.find((item)=>item.sid==row.sid)


                // console.trace()
                row.isLoading=true

                this.getList({
                    parentId:row.sid,
                    // fileId:row.sid,
                    pageNum:currentPage
                },searchContent)
                    .then(()=>{
                        row.isLoading=false


                        if(!findBread){
                            // 打开文件夹
                            pathArr.push(row)
                        }else{

                            pathArr.splice(breadMenuIndex+1,pathArr.length-1-breadMenuIndex)
                        }

                        cb()

                        // JZY.s.hideLoading()

                    })
                    .catch(()=>{
                        // JZY.s.hideLoading()
                        row.isLoading=false
                    })
            },250,true),
            getList(options,searchContent){

                options=JZY.u.deepExtend({
                    pageCount:JZY.c.pageCount,
                    pageNum:1
                },options)


                // if(process.env.SB==1){
                //     options.pageNum-=1;
                // }

                if(searchContent){
                    options.searchWord=searchContent
                }
                return JZY.xhr.r({
                    type:'post',
                    // url:'/disk/personalFile/queryPageList',
                    url:searchContent?'/disk/personalFile/search':('/disk/personalFavorite/getFavoriteFiles'),


                    data:options
                },'GLOBAL.GATEWAY.YI_FEI_HU')
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
        data() {

            return {
                pageData:null,
                // breadMenuPath:this.l('{netDiskLocale.breadMenu.alwaysUsedFiles}')

            }
        },

        mounted() {



        },

    }
</script>


<!--<template>-->
    <!--<div>-->
        <!--<core v-if="pageData" :page-data="pageData"></core>-->
    <!--</div>-->
<!--</template>-->
<!--<style>-->

<!--</style>-->
<!--<script>-->

    <!--import core from './personalNetDisk.common.vue'-->


    <!--export default {-->
        <!--computed: {-->

        <!--},-->

        <!--components:{-->
            <!--core-->
        <!--},-->
        <!--methods: {-->

        <!--},-->
        <!--props: {-->


            <!--// value: {-->
            <!--//-->
            <!--//     type: [Object],-->
            <!--//     default: {}-->
            <!--// }-->
        <!--},-->
        <!--beforeCreate() {-->

        <!--},-->
        <!--created(){-->

            <!--JZY.xhr.r({-->
                <!--type:'post',-->
                <!--url:'/disk/personalFavorite/getFavoriteFiles',-->
                <!--data:{}-->
            <!--})-->
                <!--.then(([res])=>{-->

                    <!--// res.list.forEach((item)=>{-->
                    <!--//     item.isDir=true-->
                    <!--// })-->

                    <!--this.pageData=res-->
                    <!--JZY.s.clog('res&#45;&#45;:',res)-->
                    <!--JZY.s.hideLoading()-->
                <!--})-->

        <!--},-->
        <!--data() {-->



            <!--return {-->

                <!--pageData:null,-->
                <!--data:[-->
                    <!--{-->
                        <!--a:'sdfsdf',-->
                        <!--isHover:false-->
                    <!--}-->
                <!--]-->
            <!--}-->
        <!--},-->

        <!--beforeDestroy(){-->

        <!--},-->
        <!--destroyed(){-->

        <!--},-->
        <!--mounted() {-->



        <!--},-->

    <!--}-->
<!--</script>-->
