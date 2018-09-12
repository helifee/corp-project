<template>
    <div class="item">
        <div class="title">
            <h3>商机</h3>
            <router-link to="/crm/allrecord"><span class="all">全部商机</span></router-link>
        </div>
        <div class="table">
            <el-table
                    :data="tableData"
                    style="width: 100%;text-align: center;"
                    :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                    :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                <el-table-column
                        prop="name"
                        label="商机名称"
                        width="140">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/business/details/' + scope.row.sid + '?customer=' + scope.row.customerId ">{{ scope.row.name}}</router-link>
                        </template>
                </el-table-column>
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
                        prop="estimateAmount"
                        label="预计成交金额"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="lastContactTime"
                        label="最后跟进"
                        width="145">
                </el-table-column>
                <el-table-column
                        prop="stage"
                        label="商机阶段"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                                <a style="cursor: pointer; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.sid)"></a>
                            </el-tooltip>
                            <!-- <span @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.sid)" style="color: #409EFF; cursor: pointer;">查看记录</span> -->
                        </template>
                </el-table-column>
            </el-table>
        </div>
        <dialog-follow-recordform-cu-spe-opp :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-spe-opp>
    </div>
</template>
<script>
import dialogFollowRecordformCuSpeOpp from '@Main/crm/components/dialog.follow.recordform_cu_spe_opp.vue'
import {opportunityList} from '@Main/crm/getData'
  export default {
      components:{
            dialogFollowRecordformCuSpeOpp
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
                this.opportunityListData();
            },
        showRecordformDialog (customerId,contactId,opportunityId){
            this.recordformDialogVisible = true;
            this.$nextTick(function(){
                this.$refs.recordformId.test(customerId,contactId,opportunityId)
            })
        },
        showRecord (id){
            this.$emit("showRecordDia",id);
            console.log(id)
        },
        //商机
        async opportunityListData(){
            let res = await opportunityList()
            console.info('商机数据',res[0])
            res[0].forEach((item)=>{
                if(item.stage=="0"){
                    item.stage="立项";
                }else if(item.stage=="1"){
                    item.stage="初步沟通";
                }else if(item.stage=="2"){
                    item.stage="需求商定";
                }else if(item.stage=="3"){
                    item.stage="方案报价";
                }else if(item.stage=="4"){
                    item.stage="赢单";
                }else if(item.stage=="5"){
                    item.stage="输单";
                }
            })
            this.tableData=res[0];
        },
    },
    created (){
           this.opportunityListData();
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
