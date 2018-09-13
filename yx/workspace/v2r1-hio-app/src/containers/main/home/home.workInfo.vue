<template>
    <div class="work_info home_warp">
        <div class="work_item" v-for="(item,index) in l('{homeLocale.middleTop.workInfoTabs} ')" :key="index" :class="{isActive:tabNow===index}">
            <div class="work_content" :class="'bg_'+index" @click="goLink(index)">
                <div class="tab_name">{{item}}</div>
                <div class="badge">{{ infoNum[index] | formatInfoNum }}</div>
            </div>
        </div>
        <!-- <el-table ref="workInfoTable" style="width: 100%" :data="workInfoData" :default-sort = "{prop: 'startDate', order: 'descending'}" :cell-style="firstColumnCenter"  :header-cell-style="{'background-color': '#fafaf9','text-align':'center'}" class="workInfoTable">
            <el-table-column prop="approveType" label="流程名称" show-overflow-tooltip  width="300">
                <template slot-scope="scope">
                    <router-link class="approve_detail_panel" :to="'/approve/detail/' + scope.row.id ">{{ scope.row.templateName }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="createPersonName" label="发起人" width="150"></el-table-column>
            <el-table-column prop="startDate" label="发起时间">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="100">
                <template slot-scope="scope">
                    {{ scope.row.state | state }}
                </template>
            </el-table-column>
        </el-table> -->
    </div>
</template>

<script>
//获取审批信息
import { getFlowDataHome, getFlowDataCountHome, } from '@Main/approve/getData'
export default {
    data() {
        return {
            tabNow:1,//当前激活的tab
            infoNum:[0,0,0,0],
            workInfoData:[],//当前显示的列表数据
            flowData: {//后端返回的数据
                approving:[],//待批
                pending:[],//待阅
                done:[],//已办
                myApprove:[]//我发起的
            },
        }
    },
    filters:{
        //审批状态 ：0未完成、1已完成、2已关闭、3超期
        state (value){
            switch (value) {
                case 0:
                    return '草稿';
                case 1:
                    return '审批中';
                case 2:
                    return '被驳回';
                case 3:
                    return '已处理';
                case 4:
                    return '已跳过';
                default:
                    return '--';
            }
        },
        //审批数大于100，显示99+
        formatInfoNum (value){
            if ( value > 99 ) {
                return '99+'
            }else{
                return value
            }
        },
    },
    methods:{
        //获取审批信息
        async getFlowData(){
            let res = await getFlowDataHome()//获取四种信息的接口
            if (res && res.length > 0) {
                // this.infoNum = []
                // res.forEach((item)=>{
                //     this.infoNum.push(item.length)
                // })
                // this.workInfoData =  [ ...res[0]]

                this.flowData.approving = [ ...res[0]]
                this.flowData.pending = [ ...res[1]]
                this.flowData.done = [ ...res[2]]
                this.flowData.myApprove = [ ...res[3]]
            }
            // console.info(res)

            
        },
        //审批类型的跳转
        goLink(index) {
            let path = '',
                query = {}
            if (index == 0) {//待审
                path = '/approve/my'
                query = {
                    tab:'1'
                }
            }else if (index == 1) {//待阅
                path = '/approve/shared'
            }else if (index == 2) {//待办
                path = '/approve/my'
                query = {
                    tab:'2'
                }
            }else if (index == 3) {//我发起的
                path = '/approve'
            }
            this.$router.push({
                path:path,
                query:query
            })
        },
        //获取审批数量
        async getFlowDataCountHome(){//获取四种信息的数量
            //审批大权限的判断
            let approvePremission = false
            if(this.$store.state.session.tenantInfo.roleMenus.length > 0 ){//非管理员
                approvePremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
                    return item.url.indexOf('/flow') != -1
                })
            }else{
                approvePremission = true
            }
            
            if(approvePremission){//没有审批大权限，不发请求

                let count = await getFlowDataCountHome()
                console.info("getFlowDataCountHome",count)
                if (count && count.length > 0) {
                    this.infoNum = []
                    count.forEach((item)=>{
                        this.infoNum.push(item)
                    })
                }
            }
        },
        //审批类型的过滤切换
        changeTabPanel(index) {
            this.tabNow = index
            switch (index) {
                case 0://待审批
                    this.workInfoData = [ ...this.flowData.approving]
                    break
                case 1://待阅
                    this.workInfoData = [ ...this.flowData.pending]
                    break
                case 2://已办
                    this.workInfoData = [ ...this.flowData.done]
                    break
                case 3://我发起的
                    this.workInfoData = [ ...this.flowData.myApprove]
                    break
                default:
                    break
            }
            // console.info(this.workInfoData)
        },
        //第一列td居中显示
        firstColumnCenter(obj){
            if(obj.columnIndex==0){
                return {'text-align':'left'}
            }else{
                return {'text-align':'left'}
            }
        },

    },
    mounted(){
        // this.getFlowData() //获取审批信息
        this.getFlowDataCountHome()
    },
    watch: {
        //监控一个xxx的值得变化，来触发调用获取审批信息和获取数量的接口
        "workInfoData": {
          handler(newValue, oldValue) {
                console.info("newValue");
                console.info(newValue);
                
                // this.getFlowData() //获取审批信息
                // this.getFlowDataCountHome()
          },
          deep: true
        },
    },
}
</script>

<style lang="scss" scoped>
.work_info.home_warp{
    height:100%;
    .work_item{
        width:calc( 25% - 18px);
        float:left;
        height:96px;
        margin-bottom:24px;
        & + .work_item{
            margin-left:24px;
        }
        .work_content{
            width:100%;
            min-width:90px;
            height: 96px;
            border-radius:2px;
            text-align:center;
            .tab_name{
                padding-top:20px;
                @include font(14px,14px);
            }
            .badge{
                padding-top:10px;
                @include font(24px,30px);
            }
            &:hover{
                cursor:pointer;
                .tab_name{
                    color: #fff;
                }
                .badge{
                    color: #fff;
                }
            }
            &.bg_0{
                background-color:#FFECEC;
                color: $theme-red;
                &:hover{
                    background-color:$theme-red;
                }
            }
            &.bg_1{
                background-color:#E8F4FF;
                color: $theme-blue;
                &:hover{
                    background-color:$theme-blue;
                }
            }
            &.bg_2{
                background-color:#DCF7EC;
                color: $theme-green;
                &:hover{
                    background-color:$theme-green;
                }
            }
            &.bg_3{
                background-color:#FFF2DE;
                color: $theme-orange;
                &:hover{
                    background-color:$theme-orange;
                }
            }
            // &.bg_3{
            //     background-color:#F3EBFF;
            //     color: #C196FF;
            //     &:hover{
            //         background-color:#C196FF;
            //     }
            // }
            
        }
        .isActive{
            .tab_name{
                box-shadow: 6px 6px 5px #ffe2e1;
            }
        }
    }
    .workInfoTable{
        margin-top:20px;
    }
}
</style>