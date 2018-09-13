<template>
    <div class="applicationMenu" >
        <el-menu  :default-active="JZY.s.getPathName()"
                  @select="handleSelect"
       >
            <!--<el-menu-item index="/system/application/collaboration">-->
                <!--<div class="diyHove">-->
                   <!--<span>协同办公</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/system/application/crm">-->
                <!--<div class="diyHove">-->
                   <!--<span slot="title">营销管理（CRM）</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/system/application/netDisk">-->
                <!--<div class="diyHove">-->
                    <!--<span slot="title">文档管理</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/system/application/ehr">-->
                <!--<div class="diyHove">-->
                    <!--<span slot="title">EHR</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/system/application/log">-->
                <!--<div class="diyHove">-->
                    <!--<span slot="title">汇报日志</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/system/application/office">-->
                <!--<div class="diyHove">-->
                    <!--<span slot="title">行政办公</span>-->
                <!--</div>-->
            <!--</el-menu-item>-->
            <el-menu-item  v-for="(item,index) in appData" :key="index" :index="item.category">
                <div class="diyHove">
                    <span slot="title">{{item.category}}</span>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import testData from './localtestData'
    import {sysAppEventBus} from './appEventBus'
    export default {
        name: "applicationmenu",
        data(){
          return{
              // data:testData.app,
              appData:[],
              // keysData:{
              //     '/system/application/collaboration':"协同办公",
              //     '/system/application/crm':"营销管理（CRM）",
              //     '/system/application/netDisk':"文档管理",
              //     '/system/application/ehr':"EHR",
              //     '/system/application/log':"汇报日志",
              //     '/system/application/office':"行政办公"
              // }
          }
        },
        mounted(){
            this.rquireInterface();
            // let itemname=this.keysData[JZY.s.getPathName()];
            // sysAppEventBus.$emit('sysApp_switch_item', this.filterBus(itemname));
        },
        beforeDestroy(){
            sysAppEventBus.$off();
        },
        methods:{
            filterBus(itemName){
                return this.appData.filter(item=>{
                    if(item.category==itemName){
                        return item.items;
                    }
                })
            },
            handleSelect(path){
                // console.log(path)
                // let itemname=this.keysData[path];
                // let self=this;
                    sysAppEventBus.$emit('sysApp_switch_item', this.filterBus(path));

            },
            async rquireInterface(){
                await JZY.xhr.post('/sys/app/queryAppList',{},{alertSuccess:false}).then((resultData)=>{
                    // console.log(JSON.stringify(resultData))
                    try{
                        this.appData=this.arrangeData(resultData[0]);
                        let itemname=resultData[0][0].category;
                        sysAppEventBus.$emit('sysApp_switch_item', this.filterBus(itemname));
                    }catch (e){
                        this.$message("applicaton.menu.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            arrangeData(data){
                //把字符0和1转成boolean
                 data.forEach(item=>{
                    item.status=item.status=="1"?true:false;
                    if(item.items){
                        this.arrangeData(item.items);
                    }
                })
                return data;
            }
        }
    }
</script>
<style scoped lang="scss">
    .applicationMenu{
        height: 100%;
    }
</style>
<!--<style scoped lang="scss">-->
    <!--.applicationMenu{-->
        <!--background-color: rgba(102, 102, 102, 1);-->
        <!--height: 100%;-->
        <!--.el-menu-vertical-demo{-->
            <!--padding-top: 10px;-->
            <!--.diyHove:hover{-->
                <!--background-color: rgba(0, 153, 255, 1);-->
                <!--margin-left: -20px;-->
                <!--margin-right: -20px;-->
                <!--padding: 0 20px;-->
            <!--}-->
            <!--.is-active .diyHove{-->
                <!--background-color: rgba(0, 153, 255, 1);-->
                <!--margin-left: -20px;-->
                <!--margin-right: -20px;-->
                <!--padding: 0 20px;-->
            <!--}-->
        <!--}-->
    <!--}-->


<!--</style>-->