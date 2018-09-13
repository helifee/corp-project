<template>
    <div class="detail">
        <div>
            <div class="base penal-box blue">
                <h3><span>业务信息</span></h3>
                <p><label>标题</label><span>{{baseInfo.mtTitle}}</span></p>
                <p><label>组织人</label><span>{{baseInfo.meetingOrganizationName}}</span></p>
                <p><label>组织部门</label><span>{{baseInfo.organDepartName}}</span></p>
                <p><label>会议地点</label><span>{{baseInfo.boardroomAddressName}}</span></p>
                <p><label>会议时间</label><span>{{beginDate}}<br>{{endDate}}</span></p>
                <p><label>主持人</label><span>{{baseInfo.emceeName}}</span></p>
                <p><label>参会人员</label><span>{{attendNames}}</span></p>
                <p><label>纪要记录人</label><span>{{baseInfo.recorderName}}</span></p>
                <p><label>抄送人</label><span>{{copyNames}}</span></p>
                <p><label>会议目标</label><span>{{baseInfo.meetingTarget}}</span></p>

            </div>
            <div class="base penal-box blue">
                <h3><span>会议议程</span></h3>
                <div v-for="(item,index) in baseInfo.meetingAgendaList" style="border-bottom: 1px solid #ebebeb">
                <p style="border-bottom: none">
                    <label>时间</label><span>{{item.meetingBeginDate}}<br>{{item.meetingEndDate}}</span>

                </p>
                    <p style="border-bottom: none">
                    <label>会议议程</label><span>{{item.meetingAgenda}}</span>
                    </p>
                </div>
            </div>
            <attachItem v-if="AttachmentInfo" :param="AttachmentInfo"></attachItem>

            <div>
            </div>

        </div>

    </div>

</template>
<script>
    import attachItem from '../../components/attachItem.vue'
   import mService from '../../pages/m_details/m_details_service'
    import u from '../../m_util'
    export default {
        components: {
            attachItem
        },
        data () {
            return {
                id:"",
                list:[],
                beginDate:"",
                endDate:"",
                sharePersons:[],
                shares:"",
                baseInfo:{},
                AttachmentInfo:"",
                attachList:[],
                attendNames:"",
                copyNames:""
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            console.log(this.id);

            if(this.id){
                //获取基本信息
                this.getBaseInfo();
            }
        },

        methods: {
            getBaseInfo(){
                mService.getMeetingInfoDetails(this.id).then((data)=>{
                    console.log(data)
                    this.baseInfo = data[0];
                    this.AttachmentInfo =  data[0].accessoryIdDto;
                    if(data[0].meetingAttendeesNameList && data[0].meetingAttendeesNameList.length){
                        this.attendNames = data[0].meetingAttendeesNameList.join(" ");
                    }
                    if(data[0].meetingCopySendNameList && data[0].meetingCopySendNameList.length){
                        this.copyNames = data[0].meetingCopySendNameList.join(" ");
                    }
                    //起止 结束时间
                    if(this.baseInfo.beginDate){
                        this.beginDate = u.handleTimeNoSecondFn(this.baseInfo.beginDate);
                    }
                    if(this.baseInfo.endDate){
                        this.endDate = u.handleTimeNoSecondFn(this.baseInfo.endDate);
                    }
                 });

            },
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
    @import '../../static/css/m_crm_detail.scss';
    .detail{
    .weui-actionsheet__cell{
        font-size: 17px;
        color: #009EFF!important;
    }
    .weui-actionsheet__cell:before{
        border-top: none!important;
    }
    }
</style>