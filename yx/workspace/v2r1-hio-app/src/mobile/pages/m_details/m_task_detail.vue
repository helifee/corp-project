<template>
    <div class="detail">
        <div>
            <div class="base penal-box blue">
                <h3><span class="h3_title">{{baseInfo.taskName}}</span></h3>
                <p><label>关联项目</label><span>{{baseInfo.projectName}}</span></p>
                <p><label>项目阶段</label><span>{{baseInfo.projectstageName}}</span></p>
                <p><label>负责人</label><span>{{baseInfo.taskLiableName}}</span></p>
                <p><label>参与人</label><span>{{shares}}</span></p>
                <p><label>起止日期</label><span style="line-height: 22px">{{beginDate}}<br>{{endDate}}</span></p>
                <p><label>共享人</label><span>{{tshares}}</span></p>
                <p><label>进度</label><span>{{baseInfo.taskProgress}}%</span></p>
                <p><label>紧急程度</label><span>{{taskUrgentFlagList[baseInfo.taskUrgentFlag]}}</span></p>
                <p><label>描述</label><span>{{baseInfo.describe}}</span></p>
                <p><label>提醒</label><span>{{baseInfo.remindTime}}提醒{{baseInfo.remindPerson}}</span></p>
                <p><label>创建人</label><span>{{baseInfo.createPersonName}}</span></p>
                <p><label>创建时间</label><span>{{baseInfo.createDate}}</span></p>
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
                taskId:"",
                tendId:"",
                list:[],
                sharePersons:[],
                tsharePerson:[],
                taskUrgentFlagList:{
                    "0":"正常",
                    "1":"紧急",
                    "2":"非常紧急"
                },
                tshares:"",
                shares:"",
                baseInfo:{},
                AttachmentInfo:"",
                beginDate:"",
                endDate:""
            }
        },
        mounted(){
            this.taskId = this.$route.query.taskId;
            this.tendId = this.$route.query.tendId;
            console.log(this.taskId);
            console.log(this.tendId);
            if(this.taskId && this.tendId){
                this.AttachmentInfo = {
                    "appId":"1",
                    "businessId":this.taskId,
                    "categoryId":"1",
                }
                //获取基本信息
                this.getBaseInfo();
            }
        },

        methods: {
            getBaseInfo(){
                mService.getTaskInfoDetails(this.taskId,this.tendId).then((data)=>{
                    console.log(data)
                    this.baseInfo = data[0];
                    if(this.baseInfo.taskParticipantsSharedListDto){
                        let plist = this.baseInfo.taskParticipantsSharedListDto.personList;
                        if(plist){
                            if(plist.length>0){
                                plist.forEach((n,i)=>{
                                    this.sharePersons.push(n.sharedshowName);
                                })
                                this.shares = this.sharePersons.join(" ");
                            }
                        }
                    }
                    if(this.baseInfo.taskSharedListDto){
                        let tlist = this.baseInfo.taskSharedListDto.personList;
                        if(tlist){
                            if(tlist.length>0){
                                tlist.forEach((n,i)=>{
                                    this.tsharePerson.push(n.sharedshowName);
                                })
                                this.tshares = this.tsharePerson.join(" ");
                            }
                        }
                    }
                    //起止 结束时间
                    if(this.baseInfo.beginDate){
                        this.beginDate = u.handleDateTimeFn(this.baseInfo.beginDate);
                    }
                    if(this.baseInfo.endDate){
                        this.endDate = u.handleDateTimeFn(this.baseInfo.endDate);
                    }
                 });

            }
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