<template>
    <div class="meeting">
        <searchForm title="会议管理" isBtnCreate=true @btnCreateClick="createClick" @getSearchInfo="getSearchInfo"></searchForm>
        <div class="bx_space"></div>
        <div class="tableContain" >
            <meetingTable  :viewMeetingDetail=true ref="refMeetingTable" :isCopyMe="false"
                          @showViewRecordDialog="showViewRecordDialog" @showWirteRecordDialog="showWirteRecordDialog"></meetingTable>
        </div>
        <!--右侧弹窗创建会议-->
        <meetingDetialEditDialog :dialogVisible="meetingDialogVisible" meetingData="" v-if="meetingDialogVisible"
                                 @successBackFun="successBackFun" @closeCreateModal="closeMeetingDialog"></meetingDetialEditDialog>
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
   import meetingDetialEditDialog from './meetingDetailEditDialog.vue'
   import meetingRecordEdit from './meetingRecordEdit.vue'
    export default {
        name: "meeting",
        components:{
            searchForm,
            meetingTable,
            meetingDetialEditDialog,
            meetingRecord,
            meetingRecordEdit
        },
        data(){
            return{
                meetingDialogVisible:false,
                viewRecordDiaVisible:false,
                writeRecordDiaVisible:false,
                searchForm:"",
                meetingId:"",
                meetingSummaryId:"",     //会议纪要id
                meetingSummaryData:""
            }
        },
        methods:{
            createClick(){
                this.meetingDialogVisible=true;
            },
            closeMeetingDialog(){
                this.meetingDialogVisible=false;
            },
            showViewRecordDialog(row){
                this.meetingSummaryId=row.meetingSummaryId;
                this.viewRecordDiaVisible=true;
            },
            closeViewRecordDialog(){
                this.viewRecordDiaVisible=false;
            },
            showWirteRecordDialog(row){
                this.meetingId=row.meetingInfoId;
                this.writeRecordDiaVisible=true;
            },
            closeWriteRecordDialog(){
                this.writeRecordDiaVisible=false;
            },
            editMeetingSummaryFun(meetingSummaryData){
                this.viewRecordDiaVisible=false;
                this.meetingId="";
                this.meetingSummaryData=meetingSummaryData;
                this.writeRecordDiaVisible=true;
            },
            successBackFun(){
                this.$refs.refMeetingTable.getMeetingListData(this.searchForm,false);
            },
            getSearchInfo(searchForm){
               // console.log("searchForm:"+JSON.stringify(searchForm))
                // this.getMeetingListData(searchForm)
                this.searchForm=searchForm;
                this.$refs.refMeetingTable.handleResetPageNum();
                this.$refs.refMeetingTable.getMeetingListData(searchForm,false)
            },

        }
    }
</script>

<style scoped lang="scss">
.meeting{
     /*height: calc(100% - 12px);*/
     /*background:whitesmoke;*/
     /*position: relative;*/
    .bx_space{
        height: 20px;
        background: whitesmoke;
    }
    /*.tableContain{*/
        /*max-height: 500px;*/
        /*min-height: 200px;*/
    /*}*/

}

</style>