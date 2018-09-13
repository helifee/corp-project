<template>
    <div class="wrap">
        <div class="mainContent">
            <today-plan @showRecordDia="showRecordformDialog"></today-plan>
            <history-follow @showRecordDia="showRecordDialog"></history-follow>
        </div>
        <div class="aside-right-wrapper">
            <crm-rank></crm-rank>
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
    .wrap{
        .mainContent{
            width: calc(100% - 250px);
            background: whitesmoke;
        }
        .aside-right-wrapper {
            width: 250px;
            height: 100%;
            background: white;
            box-shadow: -3px 0px 5px rgba(153, 153, 153, 0.34902);
            position: fixed;
            right: 0;
            bottom: 0;
            top: 0px;
            margin-top: 60px;
            overflow-y: scroll;
        }
        .mainContent{
        }
    }

</style>
