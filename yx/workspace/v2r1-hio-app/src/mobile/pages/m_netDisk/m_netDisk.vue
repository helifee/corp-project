<template>
    <div class="netBox">

        <netDiskList :list="list" :errorimg="errorimg"></netDiskList>

    </div>
</template>



<script>

    JZY.locale.add('m_netDiskLocale',require('./m_netDisk.locale'))
    import  netDiskList  from './m_netDiskList.vue'


    export default {
        components: {
           netDiskList
        },
        data () {
            return {
                errorimg : "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
                list: [{
                    src: 'http://somedomain.somdomain/x.jpg',
                    title: '标题一',
                    desc: '2015/3/3',
                    url: '/component/cell'
                }, {
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                    url: "/component/radio"
                }]
            }
        },
        mounted(){
           JZY.locale.getCurrentLanguage()
                .then((res)=>{
                    this.currentLanguage=res
                })
        },
        methods: {
            
        }
    }
</script>

<style lang="scss">
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/

    .netBox{
        .box {
            padding: 15px;
        }
        
    }



</style>