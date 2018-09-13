<template>
    <div class="applicationTable">
        <div class="title">{{appTitle}} - 应用开关设置</div>
        <el-table :data="tableData" :show-header="false" >
            <el-table-column width="120">
                <template slot-scope="scope">
                    <!--<span class="icon_yuan" v-if="scope.row.icon!=null" v-bind:style="{ background: '#'+ scope.row.icon.split('#')[1]}">-->
                        <!--{{scope.row.icon.split("#")[0]}}-->
                    <!--</span>-->
                    <!--<span class="icon_yuan" else="scope.row.icon!=null" >-->
                    <!--</span>-->
                    <span > {{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change="handleSetChange(scope.row)" active-color="rgba(0, 153, 255, 1)"
                               inactive-color="rgba(204, 204, 204, 1)" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column min-width="400" >
                <template slot-scope="scope">
                    <span style="color: #999999;">{{scope.row.remark}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {sysAppEventBus} from '../appEventBus'
    export default {
        name: "applicationtable",
        data(){
            return{
                tableData:[],
                appTitle:"",
            }
        },
        created(){
            this.satchBus();
        },
        methods:{
            handleSetChange(row){
                let curStatus=row.status==true?"1":"0";
                JZY.xhr.post('/sys/app/update/'+row.sid,{status:curStatus},{alertSuccess:true}).then((resultData)=>{
                    // console.log(JSON.stringify(resultData))
                }).catch((e)=>{
                    //接口失败 恢复之前的状态
                    row.status=curStatus=="0"?true:false;
                })
            },
            satchBus(){
                let self=this;
                sysAppEventBus.$on('sysApp_switch_item',busData=>{
                    // console.log("sysApp_switch_item"+JSON.stringify(busData));
                    if(busData!=""){
                        self.tableData=busData[0].items;
                        self.appTitle=busData[0].category;
                    }
                })

            },

        }
    }
</script>

<style scoped lang="scss">
.applicationTable{
     padding: 20px;
    .title{
        /*background-color: whitesmoke;*/
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 14px;
    }
    .summary{
        color: #999999;
    }
    .icon_yuan{
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 50%;
        display: inline-block;
        color:#fff;
        margin: 0 10px;
        &.bg_0{
            background-color:#f00;  //红
        }
        &.bg_1{
            background-color:#fc0; //黄
        }
        &.bg_2{
            background-color:#45a7fe; //蓝
        }
        &.bg_3{
            background-color:#7ed321;  //绿
        }
        &.bg_4{
            background-color:pink;   //粉
        }
        &.bg_5{
            background-color:#e06741;  //深红
        }
        &.bg_6{
            background-color:#00cccc;
        }
        &.bg_7{
            background-color:#999933;
        }

    }
    /*.itemTitle{*/
        /*font-size: 16px;*/
        /*font-weight: 400;*/
    /*}*/
}
</style>