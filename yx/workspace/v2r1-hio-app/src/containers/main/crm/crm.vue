<template>
    <div class="wrap crmDiv" v-if="crmShow">
        <div class="mainContent">
            <today-plan @showRecordDia="showRecordformDialog" class="plan"></today-plan>
            <history-follow @showRecordDia="showRecordDialog" class="record"></history-follow>
            <crm-rank class="aside-right-wrapper"></crm-rank>
        </div>
        <dialog-follow-record  :dialogVisible="recordDialogVisible" :recordId="recordId" @closeCreateModal="closeRecordDialog"></dialog-follow-record>
        <dialog-follow-recordform :title1="recordformTitle" :dialogVisible="recordformDialogVisible" :recordId="recordformId" @closeCreateModal="closeRecordformDialog"></dialog-follow-recordform>

    </div>
</template>

<script>
    import crmRank from '@Main/crm/components/crm.rank.vue'
    import historyFollow from '@Main/crm/components/history.follow.vue'
    import todayPlan from '@Main/crm/components/today.plan.vue'
    import dialogFollowRecord from '@Main/crm/components/dialog.follow.record.vue'
    import dialogFollowRecordform from '@Main/crm/components/dialog.follow.recordform.vue'
    export default{
        components:{
            crmRank,
            historyFollow,
            todayPlan,
            dialogFollowRecord,
            dialogFollowRecordform
        },
        methods:{
            routerReloadMethod(){
                this.crmShow=false;
                this.$nextTick(function(){
                    this.crmShow=true;
                })
                JZY.s.hideLoading();
            },
            showRecordDialog (id){
                this.recordId = id;
                this.recordDialogVisible = true;
            },
            closeRecordDialog (id){
                this.recordDialogVisible = false;
            },
            showRecordformDialog (id,title){
                this.recordformId = id;
                this.recordformTitle = title;
                this.recordformDialogVisible = true;
            },
            closeRecordformDialog (id){
                this.recordformDialogVisible = false;
            },
        },
        data(){
            return {
                crmShow:true,
                recordId:'',
                recordDialogVisible:false,
                recordformId:'',
                recordformDialogVisible:false,
                recordformTitle:''
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .crmDiv{
        background:#F0F2F3;
    }
    .wrap{
        .mainContent{
            width: calc(100% - 266px);
            background: whitesmoke;
            .record{margin-top: 16px;}
        }
        .aside-right-wrapper {
            width: 250px;
            height: 100%;
            background: white;
            // box-shadow: -3px 0px 5px rgba(153, 153, 153, 0.34902);
            position: fixed;
            right: 16px;
            bottom: 0;
            top: 6px;
            margin-top: 60px;
            overflow-y: auto;
        }
    }
</style>
