<template>
    <div style="height:100%;overflow-y: hidden">
        <iframe onLoad="JZY.iframeOnLoad()" ref="iframe" style="height:100%;width:100%;border:none;" :src="src" v-if="src!=null"></iframe>
    </div>
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

            getTargetSrc(path){


                return JZY.c.staticPath+JZY.c.IFRAME_URL_MAP[path||JZY.s.getPathName()]


                // let pathName=path||JZY.s.getPathName(),
                //     upperModuleName=pathName.substring(1).toUpperCase().split("/")[0],
                //     host=JZY.c.IFRAME_HOST[upperModuleName]
                //
                // return host+JZY.c.IFRAME_URL_MAP[pathName]

            },
            setSrc(src){


                // this.src='http://localhost:8084/#/demo'

                // return false;


                this.src=src||this.getTargetSrc()

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
                src:null,

            }
        },

        mounted() {


            this.$router.beforeEach((to,from,next)=>{


                try{
                    let targetSrc=this.getTargetSrc(to.path)

                    // console.log("target src:",targetSrc)
                    // console.log("iframe src:",this.$refs.iframe.src)
                    // console.log('to .path in :',to.path in JZY.c.IFRAME_URL_MAP)

                    if(to.path in JZY.c.IFRAME_URL_MAP  && this.$refs.iframe.src!=targetSrc){
                        this.setSrc(targetSrc)
                    }
                }catch(e){

                }




                next()
            })




            this.setSrc()



        },

    }
</script>
