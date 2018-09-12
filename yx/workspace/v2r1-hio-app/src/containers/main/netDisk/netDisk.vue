<template>
       <div class="kcuf_u-net-disk">
           <!--<div class="theme-font padd10" style="border-bottom:solid 1px rgba(204, 204, 204, 1)">-->
               <net-disk-common ref="diskCommon" :projectPermission="projectPermission" :project-id="projectId"  module="MY_FILE"
                                @openDir="handleOpenDir" v-if="pageData" :page-data="pageData"></net-disk-common>
           <!--</div>-->

       </div>
</template>
<style>

</style>
<script>


    import netDiskCommon from './netDisk.common'

    import netDiskMixin from './netDiskMixin'
    export default {
        mixins:[netDiskMixin],
        components:{
            netDiskCommon
        },
        computed: {

        },

        created(){
            JZY.s.showLoading()
            this.getList()
        },
        watch:{
          // '$store.state.route.query.fileId':function(val){
          //     this.handleOpenDir({sid:val},[{
          //         sid: null,
          //         isLoading:false,
          //         fileName:'根目录'
          //     }])
          //     // this.getList()
          // }
        },
        name: 'jzy-',
        methods: {
            // routerReloadMethod(){
            //     JZY.s.showLoading()
            //
            //     if(!this.lastHandleOpenDirArgs){
            //         this.getList()
            //     }else{
            //         this.handleOpenDir.apply(this,this.lastHandleOpenDirArgs)
            //     }
            //
            //     // this.getList()
            //   console.log('router has been reload')
            // },
            handleOpenDir:JZY.u.debounce(function(row,pathArr,breadMenuIndex,currentPage=1,searchContent,cb){

                console.log('current page in handle open dir:',currentPage)
                cb=cb||function(){}

                this.lastHandleOpenDirArgs=Array.from(arguments)

                console.log('kcuf_u cb--:',cb)

                if(!row){
                    JZY.s.showLoading()
                    this.getList({pageNum:currentPage},searchContent).then(cb)
                    return false
                }

                let findBread=pathArr.find((item)=>item.sid==row.sid)


                // console.trace()
                row.isLoading=true

                this.getList({
                    fileId:row.sid||null,
                    pageNum:currentPage
                },searchContent)
                    .then((res)=>{

                        row.isLoading=false




                        if(!findBread){
                            // 打开文件夹
                            pathArr.push(row)
                        }else{

                            pathArr.splice(breadMenuIndex+1,pathArr.length-1-breadMenuIndex)
                        }
                        console.log('test my cb')
                        cb(res)


                        // JZY.s.hideLoading()

                    })
                    .catch(()=>{
                        // JZY.s.hideLoading()
                        row.isLoading=false
                    })
            },250,true),
            getList(options,searchContent){



                options=JZY.u.deepExtend({
                    fileId:arguments.length==0?(JZY.store.state.route.query.fileId||null):null,
                    pageCount:this.pageData==null?JZY.c.pageCount:this.$refs.diskCommon.pageCount,
                    pageNum:1
                },options)


                // if(process.env.SB==1){
                //     options.pageNum-=1;
                // }

                if(this.projectId){
                    options.projectId=this.projectId
                }
                if(searchContent){
                    options.searchWord=searchContent
                }


                return JZY.xhr.r({
                    type:'post',
                    url:searchContent?'/disk/diskCompanyFile/search':(this.projectId?'/disk/diskCompanyProject/projectRootPage':'/disk/diskCompanyFile/rootPage'),
                    data:options
                },'GLOBAL.GATEWAY.LV_JIE')
                    .then(([res])=>{

                        // res.list.forEach((item)=>{
                        //     item.isDir=false
                        // })
                        JZY.s.hideLoading()
                        this.pageData=res
                        this.$emit('PAGE_TOTAL',res.total)
                        JZY.s.clog('res--:',res)
                        return res
                    })
                    .catch(()=>{
                        JZY.s.hideLoading()
                    })

            }

        },
        props: {
            projectPermission:{
                type:[String,Number],
                default:null
            },
            projectId:{
                type:[Number,String],
                default:null
            }


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        beforeDestroy(){
          console.log('net disk will be destroy')
        },
        data() {

            return {
                // lastHandleOpenDirArgs:null,
                pageData:null,
                // breadMenuPath:this.l('{netDiskLocale.breadMenu.alwaysUsedFiles}')

            }
        },

        mounted() {



        },

    }
</script>
