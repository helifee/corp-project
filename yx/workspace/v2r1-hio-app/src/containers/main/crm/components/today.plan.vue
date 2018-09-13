<template>
    <div class="item">
        <div class="title">
            <h3>本日计划跟进客户</h3>
            <router-link to="/crm/allplan"><span class="all">全部计划</span></router-link>
        </div>
        <div class="table">
            <el-table
                    :data="tableData"
                    style="width: 100%;text-align: center;"
                    :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                    :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                <el-table-column
                        prop="customerName"
                        label="客户名称"
                        width="140">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/customer/details?customerId=' + scope.row.customerId">{{ scope.row.customerName}}</router-link>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="contactName"
                        label="联系人"
                        width="80">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/contacts/details?customerId=' + scope.row.customerId+'&contactId='+ scope.row.contactId">{{ scope.row.contactName}}</router-link>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="contactWay"
                        label="联系方式"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="decisionRole"
                        label="决策关系"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="商机"
                        width="120">
                    <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/business/details/' + scope.row.opportunityId + '?customer=' + scope.row.customerId ">{{ scope.row.opportunityName}}</router-link>
                        </template>
                </el-table-column>
                <!-- <el-table-column
                        prop="telephone"
                        label="联系电话"
                        width="120">
                </el-table-column> -->
                <el-table-column
                        prop="contactTime"
                        label="计划跟进时间"
                        width="140">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <a class="el-icon-tickets" style="cursor: pointer; color:#46A7FF; font-size:14px;" @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.opportunityId,scope.row.sid,scope.row.target)"></a>
                        </el-tooltip>
                        <!-- <span @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.opportunityId,scope.row.sid,scope.row.target)" style="color: #409EFF; cursor: pointer;">跟进记录</span> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <dialog-follow-recordform-cu-plan :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-plan>
    </div>
</template>
<script>
import dialogFollowRecordformCuPlan from '@Main/crm/components/dialog.follow.recordform_cu_plan.vue'
import {todyPlan} from '@Main/crm/getData'
  export default {
      components:{
            dialogFollowRecordformCuPlan
        },
    data() {
      return {
          recordformDialogVisible : false,
          tableData: []
      };
    },
    methods: {
        showRecordformDialogClo(){
                this.recordformDialogVisible = false;
                this.todayPlanData();
            },
        showRecordformDialog (customerId,contactId,opportunityId,planId,target){
            this.recordformDialogVisible = true;
            this.$nextTick(function(){
                this.$refs.recordformId.test(customerId,contactId,opportunityId,planId,target)
            })
        },
        showRecord (id,title){
            this.$emit("showRecordDia",id,title);
        },
        //本日计划
        async todayPlanData(){
            let res = await todyPlan()
            console.info('本日计划数据',res[0])
            res[0].forEach((item)=>{
                if(item.decisionRole=="0"){
                    item.decisionRole="普通员工";
                }else if(item.decisionRole=="1"){
                    item.decisionRole="采购决策人";
                }else if(item.decisionRole=="2"){
                    item.decisionRole="项目决策人";
                }else if(item.decisionRole=="3"){
                    item.decisionRole="人事决策人";
                }

                if(item.contactWay==0){
                    item.contactWay="电话"
                }else if(item.contactWay==1){
                    item.contactWay="邮件"
                }else if(item.contactWay==2){
                    item.contactWay="短信"
                }else if(item.contactWay==3){
                    item.contactWay="上门拜访"
                }else if(item.contactWay==4){
                    item.contactWay="会务"
                }
            })
            res[0].forEach((item)=>{
                    item.contactTime=item.contactTime.substring(0,item.contactTime.length-3);
                })
            this.tableData=res[0];
            console.log(this.tableData);
        },
    },
    created (){
           this.todayPlanData();
        },
  }
</script>

<style scoped lang="scss" scoped>
    .item{
        background: #FFFFFF;
        border-radius: 2px;
        .title{
            position: relative;
            height: 60px;
            line-height: 60px;
            text-align: center;
            margin-left: 24px;
            margin-right: 24px;
            border-bottom: 1px solid #EBEBEB;
            margin-bottom: 16px;
            h3{
                float: left;
                line-height: 60px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #191919;
                margin-top:0px;
                margin-bottom:0px;
            }
            span.all{
                position: absolute;
                right: 16px;
                top:0px;
                text-align: right;
                font-family: MicrosoftYaHei;
                font-size: 12px;
                color: #46A7FF;
                line-height: 60px;
            }
        }
        .table{
            margin-left: 24px;
            margin-right: 24px;
            padding-bottom: 48px;
        }
    }
</style>
