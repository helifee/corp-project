<template>
    <div class="meeting">
        <searchForm title="抄送我的" isBtnCreate=false @getSearchInfo="getSearchInfo"></searchForm>
        <div class="bx_space"></div>
        <div class="tableContain" >
            <meetingTable  :isCopyMe="true" ref="refMeetingTable"
                           @showViewRecordDialog="showViewRecordDialog" @showWirteRecordDialog="showWirteRecordDialog"></meetingTable>
        </div>
        <!--右侧弹窗查看纪要-->
        <meetingRecord :dialogVisible="viewRecordDiaVisible" v-if="viewRecordDiaVisible" :meetingSummaryId="meetingSummaryId"
                       @closeCreateModal="closeViewRecordDialog" @editMeetingSummaryFun="editMeetingSummaryFun"></meetingRecord>
        <!--右侧弹窗填写纪要-->
        <meetingRecordEdit :dialogVisible="writeRecordDiaVisible" :meetingId="meetingId" :meetingSummaryData="meetingSummaryData"
                           v-if="writeRecordDiaVisible"
                           @closeCreateModal="closeWriteRecordDialog" @successBackFun="successBackFun"></meetingRecordEdit>
    </div>
</template>

<script>
   import searchForm from './components/searchForm.vue'
   import meetingTable from './components/meetingTable.vue'
   import meetingRecord from './meetingRecord.vue'
   import meetingRecordEdit from './meetingRecordEdit.vue'
    export default {
        name: "meetingCopyme",
        components:{
            searchForm,
            meetingTable,
            meetingRecord,
            meetingRecordEdit
        },
        data(){
            return{
                currentPage: 4,
                viewRecordDiaVisible:false,
                meetingSummaryId:"",
                writeRecordDiaVisible:false,
                meetingSummaryData:"",
                meetingId:""
            }
        },
        methods:{
            showViewRecordDialog(row){
                this.meetingSummaryId=row.meetingSummaryId;
                this.viewRecordDiaVisible=true;
            },
            closeViewRecordDialog(){
                this.viewRecordDiaVisible=false;
            },
            showWirteRecordDialog(row){
                console.log("kdkd")
                this.meetingId=row.meetingInfoId;
                this.writeRecordDiaVisible=true;
            },
            closeWriteRecordDialog(){
                this.writeRecordDiaVisible=false;
            },
            getSearchInfo(searchForm){
                this.$refs.refMeetingTable.handleResetPageNum();
                this.$refs.refMeetingTable.getMeetingListData(searchForm,false)
            },
            successBackFun(){
                this.$refs.refMeetingTable.getMeetingListData(this.searchForm,false);
            },
            editMeetingSummaryFun(meetingSummaryData){
                this.viewRecordDiaVisible=false;
                this.meetingId="";
                this.meetingSummaryData=meetingSummaryData;
                this.writeRecordDiaVisible=true;
            },
        }
    }
</script>

<style scoped lang="scss">
.meeting{
     /*height: calc(100% - 12px);*/
     /*background:whitesmoke;*/
    /*.tableContain{*/
        /*margin-top: 10px;*/
    /*}*/
    .bx_space{
        height: 20px;
        background: whitesmoke;
    }
}
</style>