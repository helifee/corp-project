<template>
    <div class="meetingRoom"  v-loading="loading">
        <el-row class="heards">
            <el-col :span="8">
                <el-radio-group size="small" v-model="d_w_y" @change="handleSelViewChange">
                    <el-radio-button label=".fc-agendaWeek-button" >周</el-radio-button>
                    <!--<el-radio-button label=".fc-agendaDay-button">{{getText('.fc-agendaDay-button')}}</el-radio-button>-->
                    <el-radio-button label=".fc-month-button">月</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="8" style="text-align: center">
                <div style="display:inline-block;margin-top: 8px;">
                    <i class="icon20 el-icon-arrow-left" @click="handleNextClick('prev')"></i>
                    <span style="position:relative;top:-2px;">{{fcCenterText}}</span>
                    <i class="icon20 el-icon-arrow-right" @click="handleNextClick('next')"></i>
                </div>
            </el-col>
            <el-col :span="8" style="text-align: right">
                <el-button @click="handleAddRoomReserve" size="small" type="primary">
                    <i class="el-icon-plus"></i>预订会议室</el-button>
            </el-col>
        </el-row>
        <el-row class="roomMain">
            <el-col :span="20" class="datetable">
                <!--<div ref="jqFullCalendarWrapper"></div>-->
                <reserveRoomCalendar ref="refReserveRoomCalendar"  @initEnd="initData"
                                     @calendarDayClick="calendarDayClick" @calendarEventClick="calendarEventClick"></reserveRoomCalendar>
            </el-col>
            <el-col :span="4">
                <div class="roomTitle">
                    所有会议室
                </div>
                <div class="search">
                    <el-input placeholder="搜索会议室"  class="input-with-select" v-model="searchRoom" clearable>
                        <el-button slot="append" icon="el-icon-search" size="mini" @click="handleSearchRoom"></el-button>
                    </el-input>
                </div>
                <el-table :data="meetingRoomList" :show-header="false" style="min-height: 300px" >
                    <el-table-column  width="20" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!--<div class="roomListItem">-->
                            <el-checkbox v-model="scope.row.isChecked" @change="handleRoomSeleChange(scope.row)"></el-checkbox>
                            <!--<span class="opera">-->
                            <!--<i class="el-icon-edit-outline" @click.stop="editRoom(scope.row.sid)"></i>-->
                            <!--<i class="el-icon-close"  style="margin-left: 10px" @click.stop="delRoom(scope.row.sid)"></i>-->
                            <!--</span>-->
                            <!--</div>-->
                        </template>
                    </el-table-column>
                    <el-table-column   show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column width="70">
                        <template slot-scope="scope">
                            <!--<div class="roomListItem">-->
                            <span class="opera">
                                    <i class="el-icon-edit-outline" @click.stop="editRoom(scope.row.sid)"></i>
                                    <i class="el-icon-close"  style="margin-left: 10px" @click.stop="delRoom(scope.row.sid)"></i>
                                </span>
                            <!--</div>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="createRoom">
                    <el-button style="width: 100%;border-radius: 0;" @click="handleCreateRoom"><i class="el-icon-plus"></i>创建会议室</el-button>
                </div>
            </el-col>
        </el-row>
        <!--右侧弹窗创建/编辑会议室-->
        <meetingRoomEdit :dialogVisible="roomDialogVisible" v-if="roomDialogVisible"
                         @updateRoomList="handleUpdateRoomList" :meetingRoomId="meetingRoomId"
                         @closeCreateModal="closeRoomDialog"></meetingRoomEdit>
        <!--右侧弹窗创建/编辑预定会议室-->
        <reserveMeetRoomEdit :dialogVisible="roomReserveDialogVisible" v-if="roomReserveDialogVisible"
                             @reserveSuccessFun="reserveSuccessFun"  :reserveMeetingLook="reserveMeetingLook"
                             :reserveMeetingRoomId="reserveMeetingRoomId"  @closeCreateModal="closeReserveRoomDialog"></reserveMeetRoomEdit>
        <!--右侧弹窗创建/查看会议占用预定的会议室信息-->
        <meetingRoomLook :dialogVisible="meetingRoomLookDialogVisible" v-if="meetingRoomLookDialogVisible"
                         @closeCreateModal="closeMeetingRoomLookDialog" :meetingId="meetingId"></meetingRoomLook>
    </div>
</template>

<script>
    import meetingRoomEdit from './components/meetingRoomEdit.vue'
    import reserveMeetRoomEdit from './components/reserveMeetRoomEdit'
    import reserveRoomCalendar from './components/reserveRoomCalendar/calendarCore'
    import meetingRoomLook from './components/meetingRoomLook'
    const TYPES={
        meetingUse:{
            color:'rgba(230, 247, 255, 1)',
            borderColor:'rgba(145, 213, 255, 1)',
            textColor:'#666666'
        },
        reserveMeeting:{
            color:'rgba(246, 255, 237, 1)',
            borderColor:'rgba(183, 235, 143, 1)',
            textColor:'#666666'
        }
    }
    export default {
        name: "meeting-room",
        components:{
            meetingRoomEdit,
            reserveMeetRoomEdit,
            reserveRoomCalendar,
            meetingRoomLook
        },
        data(){
            return{
                d_w_y:'.fc-agendaWeek-button',
                fcCenterText:'',
                meetingRoomList:[],
                meetingRoomListBack:[],
                roomDialogVisible:false,
                roomReserveDialogVisible:false,
                meetingRoomLookDialogVisible:false,
                meetingRoomId:"",
                curSelMeetingRoomId:"",    //右边选择的用于查询日程的id
                reserveMeetingRoomId:"",
                systime:"",
                currentMonth:"",
                startCurDate:"",
                endCurDate:"",
                searchRoom:"",
                loading:false,
                meetingId:"",
                reserveMeetingLook:false
            }
        },
        created(){
            // JZY.xhr.requestPromises([
            //     JZY.xhr.r('/sys/common/getSysTime','GLOBAL'),
            //     this.getMeetingRoomList()
            // ]).then(async ([[time]])=>{
            //     this.$nextTick(()=>{
            //         this.getSysTime(time);
            //         if(this.meetingRoomList.length>0){
            //             this.getMeetingRoomUseList(this.curSelMeetingRoomId);
            //         }
            //     })
            //
            // })
        },
        mounted(){
            // this.$refs.refReserveRoomCalendar.changeEventSource();

        },
        methods:{
            initData(){
                this.getFCCenterText();
                //入口，日期组件加载完成后执行
                JZY.xhr.requestPromises([
                    // JZY.xhr.r('/sys/common/getSysTime','GLOBAL'),
                    this.getMeetingRoomList()
                ]).then(async ([])=>{
                    this.$nextTick(()=>{
                        // this.getSysTime(time);
                        if(this.meetingRoomList.length>0){
                            this.getMeetingRoomUseList(this.curSelMeetingRoomId);
                        }
                    })
                })
            },
            handleNextClick(type){
                // if(this.systime!=""){
                //计算出上下月，上下周的日期
                // if(type=="prev"){
                //     if(this.d_w_y==".fc-agendaWeek-button"){
                //         // this.startCurDate=moment(this.startCurDate).add(-7,'days').format("YYYY-MM-DD");
                //         // this.endCurDate=moment(this.endCurDate).add(-7,'days').format("YYYY-MM-DD");
                //         // this.fcCenterText=moment( this.startCurDate).startOf('week').format("YYYY年MM月DD")+" - "+
                //         //     moment(this.endCurDate).endOf('week').format("DD日");
                //     }else {
                //         this.currentMonth=moment(this.currentMonth).add(-1,'months');
                //         this.fcCenterText=moment(this.currentMonth).format("YYYY年MM");
                //     }
                // }else if(type=="next"){
                //     if(this.d_w_y==".fc-agendaWeek-button"){
                //         this.startCurDate=moment(this.startCurDate).add(7,'days').format("YYYY-MM-DD");
                //         this.endCurDate=moment(this.endCurDate).add(7,'days').format("YYYY-MM-DD");
                //         this.fcCenterText=moment( this.startCurDate).startOf('week').format("YYYY年MM月DD")+" - "+
                //             moment(this.endCurDate).endOf('week').format("DD日");
                //         // console.log()
                //     }else {
                //         this.currentMonth=moment(this.currentMonth).add(1,'months');
                //         this.fcCenterText=moment(this.currentMonth).format("YYYY年MM");
                //     }
                // }
                this.$refs.refReserveRoomCalendar.changeCurConten(type);
                this.getFCCenterText();
                this.$nextTick(()=>{
                    this.getMeetingRoomUseList(this.curSelMeetingRoomId);
                })
                // }
            },
            getFCCenterText(){
                this.$nextTick(()=>{
                    this.fcCenterText=jQuery(".meetingCalendarCss .fc-header-toolbar .fc-center H2").text();
                    if(this.d_w_y==".fc-agendaWeek-button"){
                        let newDay=this.fcCenterText.replace(/[年月]/g,"/").replace(/[日 ]/g,"");
                        let arrDay=newDay.split("–");
                        this.startCurDate=moment(arrDay[0]).startOf('week').format("YYYY-MM-DD");
                        let endDate=moment(this.startCurDate).format("YYYY-MM")+"-"+arrDay[1];
                        if(arrDay[1].length>5){
                            endDate=arrDay[1];
                        }else  if(arrDay[1].length>2){
                            endDate=moment(this.startCurDate).format("YYYY")+"/"+arrDay[1];
                        }
                        this.endCurDate=moment(endDate).endOf('week').format("YYYY-MM-DD");
                        // debugger
                    }else{
                        let newMonth =  this.fcCenterText.replace(/[月年]/g,"");
                        let arrMonth=newMonth.split(" ");
                        this.currentMonth=moment(arrMonth[0]+"-"+this.transformMonth(arrMonth[1])).format('YYYY-MM');
                    }
                })
            },
            transformMonth(item){
                switch (item){
                    case '一': return 1;break;
                    case '二': return 2;break;
                    case '三': return 3;break;
                    case '五': return 5;break;
                    case '六': return 6;break;
                    case '七': return 7;break;
                    case '八': return 8;break;
                    case '九': return 9;break;
                    case '十': return 10;break;
                    case '十一': return 11;break;
                    case '十二': return 12;break;
                }
            },
            handleSelViewChange(lable){
                this.getFCCenterText();
                // if(this.systime!=""){
                if(lable==".fc-agendaWeek-button"){
                    this.$refs.refReserveRoomCalendar.setCalendarView("agendaWeek");
                }else if(lable==".fc-month-button"){
                    this.$refs.refReserveRoomCalendar.setCalendarView("month");
                }
                this.$nextTick(()=>{
                    this.getMeetingRoomUseList(this.curSelMeetingRoomId);
                })

                // }
            },
            // getSysTime(systime){
            //     this.systime=moment(systime).format("YYYY-MM-DD");
            //     // console.log(this.systime)
            //     // this.currentMonth=moment(this.systime).format('YYYY-MM');
            //     this.startCurDate=moment(new Date(this.systime)).startOf('week').format("YYYY-MM-DD");
            //     this.endCurDate=moment(new Date(this.systime)).endOf('week').format("YYYY-MM-DD");
            //     // console.log(this.startCurDate+":"+this.endCurDate)
            //     // if(this.d_w_y==".fc-agendaWeek-button"){
            //     //     this.fcCenterText=moment( this.startCurDate).format("YYYY年MM月DD")+" - "+
            //     //         moment(this.endCurDate).format("DD日");
            //     // }else{
            //     //     this.fcCenterText=moment(this.currentMonth).format("YYYY年MM");
            //     // }
            // },
            handleSearchRoom(){
                if(this.searchRoom.trim()==""){
                    this.meetingRoomList=JZY.u.copy(this.meetingRoomListBack);
                }else {
                    let searchR=this.meetingRoomListBack.filter((item) => {
                        return item.name.indexOf(this.searchRoom)!=-1
                    })
                    this.meetingRoomList=JZY.u.copy(searchR);
                }
            },
            handleCreateRoom(){
                this.meetingRoomId="";
                this.roomDialogVisible=true;
            },
            closeRoomDialog(){
                this.roomDialogVisible=false;
            },
            handleAddRoomReserve(){
                this.reserveMeetingRoomId="";
                this.reserveMeetingLook=false;
                this.roomReserveDialogVisible=true;
            },
            closeReserveRoomDialog(){
                this.roomReserveDialogVisible=false;
            },
            closeMeetingRoomLookDialog(){
                this.meetingRoomLookDialogVisible=false;
            },
            reserveSuccessFun(){
                this.roomReserveDialogVisible=false;
                this.getMeetingRoomUseList(this.curSelMeetingRoomId);
            },
            editRoom(roomId){
                this.meetingRoomId=roomId;
                this.roomDialogVisible=true;
            },
            handleRoomSeleChange(row){
                try{
                    this.meetingRoomList.forEach(item=>{
                        item.isChecked=false;
                        if(row.sid==item.sid){
                            item.isChecked=true;
                            this.curSelMeetingRoomId=item.sid;
                            this.getMeetingRoomUseList(this.curSelMeetingRoomId);
                        }
                    })
                }catch (e){}

            },
            calendarDayClick(){
                this.reserveMeetingLook=false;
                this.roomReserveDialogVisible=true;
            },
            calendarEventClick(data){
                //meetingId为空为单独预定，不为空为会议占用预定
                console.log(data.meetingId,data.meetingBoardroomId)
                if(data.meetingId==null || data.meetingId==""){
                    this.reserveMeetingRoomId=data.meetingBoardroomId;
                    this.reserveMeetingLook=true;
                    this.roomReserveDialogVisible=true;
                }else {
                    //只能查看
                    this.meetingId=data.meetingId;
                    this.meetingRoomLookDialogVisible=true;
                    // this.$refs.refMeetingRoomLook.getMeetDetailById(data.meetingId);
                }
                console.log(data.meetingId,data.meetingBoardroomId);
            },
            delRoom(roomId){
                this.$confirm('此操作将删除当会议室, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRoomData(roomId);
                }).catch(() => {
                });
            },
            handleUpdateRoomList(type,resultData){
                this.searchRoom="";
                if(type=="add"){
                    this.getMeetingRoomList(resultData);
                }else{
                    this.getMeetingRoomList();
                }
            },
            async getMeetingRoomList(positionSid){
                await JZY.xhr.post('/meeting/meetingBoardroom/queryList',{},{alertSuccess:false}).then((resultData)=>{
                    this.meetingRoomList=[];
                    this.meetingRoomListBack=[];
                    resultData[0].forEach((item,index)=>{
                        let roomInfo={
                            name:item.name,
                            sid:item.sid,
                            isChecked:false,
                        }
                        if(positionSid!=undefined){
                            if(positionSid==item.sid){
                                roomInfo.isChecked=true;
                                this.curSelMeetingRoomId=item.sid
                            }
                        }else{
                            if(index==0){
                                roomInfo.isChecked=true;
                                this.curSelMeetingRoomId=item.sid
                            }
                        }
                        this.meetingRoomList.push(roomInfo);
                        this.meetingRoomListBack.push(roomInfo);
                    })
                }).catch((e)=>{
                    //接口失败
                })
            },
            async getMeetingRoomUseList(roomId){
                this.loading=true;
                let pas={
                    meetingBoardroomId:roomId
                }
                if(this.d_w_y==".fc-agendaWeek-button"){
                    pas.reserveStartTime=this.startCurDate+" 00:00:00";
                    pas.reserveEndTime=this.endCurDate+" 23:59:59";
                }else if(this.d_w_y==".fc-month-button"){
                    // console.log( moment(this.currentMonth).startOf('month').format("YYYY-MM-DD"));
                    // console.log( moment(this.currentMonth).endOf('month').format("YYYY-MM-DD"));
                    pas.reserveStartTime=moment(this.currentMonth).startOf('month').format("YYYY-MM-DD") +" 00:00:00";
                    pas.reserveEndTime=moment(this.currentMonth).endOf('month').format("YYYY-MM-DD") +" 23:59:59";
                }
                // console.log("pas",JSON.stringify(pas))
                await JZY.xhr.request({type:'POST',url:'/meeting/meetingReserveBoardroom/queryList',data:pas},false,false).then((resultData)=>{
                    this.loading=false;
                    let calendarEvtents=[];
                    resultData[0].forEach(item=>{
                        let startDate=moment(item.reserveStartTime).format('YYYY-MM-DD');  //开始日期
                        let endData=moment(item.reserveEndTime).format('YYYY-MM-DD');  //结束日期
                        let reserveType=item.meetingId;       //meetingId为空为单独预定，不为空为会议占用预定
                        let evtent={};
                        if(this.d_w_y==".fc-month-button"){
                            evtent={
                                start:moment(item.reserveStartTime).format('YYYY-MM-DDTHH:mm:ss'),
                                end:moment(item.reserveEndTime).format('YYYY-MM-DDTHH:mm:ss'),
                                title:moment(item.reserveStartTime).format('HH:mm')+"~"+moment(item.reserveEndTime).format('HH:mm')+" "+item.useUserName,
                            }
                            if (reserveType == null || reserveType == "") {
                                calendarEvtents.push({
                                    meetingBoardroomId: item.sid,
                                    meetingId: reserveType,
                                    ...evtent,
                                    ...TYPES.reserveMeeting
                                })
                            } else {
                                calendarEvtents.push({
                                    meetingId: reserveType,
                                    ...evtent,
                                    ...TYPES.meetingUse
                                })
                            }
                        }else {
                            // 处理跨天的情况
                            if (startDate != endData) {
                                for (let i = 0; moment(item.reserveStartTime).add(i, 'd').format('YYYY-MM-DD') <= endData; i++) {
                                    let curData = moment(item.reserveStartTime).add(i, 'd');
                                    if (i == 0) {
                                        //第一天
                                        if (moment(item.reserveStartTime).format('HH:mm:ss') == "00:00:00") {
                                            evtent = {
                                                start: moment(curData).format('YYYY-MM-DD'),
                                                title: item.useUserName,
                                                allDay: true
                                            }
                                        } else {
                                            evtent = {
                                                start: moment(item.reserveStartTime).format('YYYY-MM-DDTHH:mm:ss'),
                                                end: moment(item.reserveStartTime).format('YYYY-MM-DD') + "T24:00:00",
                                                title:moment(item.reserveStartTime).format('HH:mm')+"~"+"24:00 "+item.useUserName
                                            }
                                        }

                                    } else {
                                        if (moment(curData).format('YYYY-MM-DD') < endData) {
                                            //中间的天
                                            evtent = {
                                                start: moment(curData).format('YYYY-MM-DD'),
                                                title: item.useUserName,
                                                allDay: true
                                            }
                                        } else {
                                            //最后一天
                                            if (moment(item.reserveEndTime).format('HH:mm:ss') != "00:00:00") {
                                                evtent = {
                                                    start: moment(curData).format('YYYY-MM-DD') + "T00:00:00",
                                                    end: moment(item.reserveEndTime).format('YYYY-MM-DDTHH:mm:ss'),
                                                    title: "00:00~"+ moment(item.reserveEndTime).format('HH:mm')+item.useUserName,
                                                }
                                            } else {
                                                continue;
                                            }
                                        }
                                    }
                                    if (reserveType == null || reserveType == "") {
                                        calendarEvtents.push({
                                            meetingBoardroomId: item.sid,
                                            meetingId: reserveType,
                                            ...evtent,
                                            ...TYPES.reserveMeeting
                                        })
                                    } else {
                                        calendarEvtents.push({
                                            meetingId: reserveType,
                                            ...evtent,
                                            ...TYPES.meetingUse
                                        })
                                    }
                                }
                            } else {
                                evtent = {
                                    // title:moment(item.reserveStartTime).format('HH:mm')+"~"+moment(item.reserveEndTime).format('HH:mm')+item.useUserName,
                                    start: moment(item.reserveStartTime).format('YYYY-MM-DDTHH:mm:ss'),
                                    end: moment(item.reserveEndTime).format('YYYY-MM-DDTHH:mm:ss'),
                                    title: moment(item.reserveStartTime).format('HH:mm')+"~"+moment(item.reserveEndTime).format('HH:mm')+" "+item.useUserName,
                                }
                                if (reserveType == null || reserveType == "") {
                                    calendarEvtents.push({
                                        meetingBoardroomId: item.sid,
                                        meetingId: reserveType,
                                        ...evtent,
                                        ...TYPES.reserveMeeting
                                    })
                                } else {
                                    calendarEvtents.push({
                                        meetingId: reserveType,
                                        ...evtent,
                                        ...TYPES.meetingUse
                                    })
                                }
                            }
                        }
                        // console.log("getMeetingRoomUseList111:"+JSON.stringify(calendarEvtent))

                    })
                    // console.log("getMeetingRoomUseList:"+JSON.stringify(calendarEvtents))
                    this.$refs.refReserveRoomCalendar.changeEventSource(calendarEvtents);

                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
            async delRoomData(roomId){
                JZY.xhr.drop('/meeting/meetingBoardroom/delete/'+roomId,{},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.meetingRoomList.forEach((item,index)=>{
                            if(item.sid==roomId){
                                this.meetingRoomList.splice(index,1)
                            }
                        })
                    }catch (e){
                        this.$message(+e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .meetingRoom{
        /*height: calc(100% - 72px);*/
        background: whitesmoke;
        position: relative;
        overflow-y: auto;
        .heards{
            background-color:#fff;
            padding:10px 20px;
        }
        .roomMain{
            margin-top: 10px;
            .datetable{
                background-color:#fff;
            }
            .roomTitle{
                height: 40px;
                font-weight: 650;
                font-size: 13px;
                line-height: 40px;
                border: 1px solid rgba(217, 217, 217, 1);
                text-align: center;
            }
            .search{
                background-color:#fff;
                padding: 10px 5px;
                border-bottom: 1px solid #ebeef5;
            }
            .createRoom{
                background-color:#fff;
                font-weight: 650;
                font-size: 13px;
                color: #333333;
            }
            /*.roomListItem{*/
            .opera{
                float: right;
                cursor: pointer;
                /*padding-right: 5px;*/
                /*display: none;*/
            }
            /*&:hover{*/
            /*.opera{*/
            /*display: block;*/
            /*}*/
            /*}*/
            /*}*/
        }
    }
</style>