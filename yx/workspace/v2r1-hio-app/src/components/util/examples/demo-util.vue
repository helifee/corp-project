<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="包含方法">
                <el-alert :key="Math.random()" v-for="name in Object.keys(u)" :closable="false" style="margin-bottom:10px;" :title="name" type="success"></el-alert>
            </el-tab-pane>
            <el-tab-pane label="软件依赖">
                <el-alert :closable="false" style="margin-bottom:10px;" title="element-ui/lib/message-box" type="success"></el-alert>
            </el-tab-pane>
            <!--<el-tab-pane label="download">-->
                <!--<a onclick="window.open(this.href)" target="_blank" download="fwUtil.vue" href="/downloadSource/fwUtil.js">下载fwUtil(若点击无效请在请窗口打开)</a><br>-->
            <!--</el-tab-pane>-->
        </el-tabs>
    </div>
</template>
<style lang="less" type="text/less" scoped>

</style>
<script>
    import u from '../src/index.js'
    export default {
        props:{

        },
        mounted(){

        },
        methods:{

        },
        data(){
            return {
                u:u
            }
        },
        computed:{

        },
        watch:{

        }
    }
</script>
