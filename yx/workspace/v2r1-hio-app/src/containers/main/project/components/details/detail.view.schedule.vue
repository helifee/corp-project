<template>
    <div class="fc-component-wrapper" v-if="isReady">



        <!--<user-tree :selectUserDialogVisible="showUserTreeOnly"-->
                   <!--:show-inside-outside-tabs="true"-->
                   <!--@closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"-->
                   <!--:selectedUsers = "sharedCalendarPeoples"-->
                   <!--@getUserTree = "getUserTreeOnly"-->
                   <!--:enable-checked-multiple="true">-->


            <!--<template slot-scope="scope">-->

                <!--<el-checkbox style="margin-left:30px;" v-model="scope.row.isShowTitle">{{l('showTitle')}}</el-checkbox>-->

                <!--&lt;!&ndash;{{&ndash;&gt;-->
                <!--&lt;!&ndash;JSON.stringify(scope.row)&ndash;&gt;-->
                <!--&lt;!&ndash;}}&ndash;&gt;-->
            <!--</template>-->

        <!--</user-tree>-->


        <!--<user-tree :selectUserDialogVisible="formShareTreeVisible"-->
        <!--:show-inside-outside-tabs="true"-->
        <!--@closeCreateModal ="formShareTreeVisible = !formShareTreeVisible"-->
        <!--:selectedUsers = "sharedCalendarPeoples"-->

        <!--:enable-checked-multiple="true"></user-tree>-->


        <!--showUserOnly-->
        <!--@getUserTree = "getUserTreeOnly"-->

        <!--{{l('{demoLocale.foo}和{demoLocale.test}至少选择一项')}}-->





        <link v-if="JZY.u.isIE9()" type="text/css" rel="stylesheet" href="/static/fullCalendar/fullcalendar.css">


        <right-slide-modal
                ref="addScheduleDialog"
                @close="handleNewScheduleDialogClose"
                :title="l('DETAIL'==scheduleDialogMode?'viewAgenda':('UPDATE'==scheduleDialogMode?'editAgenda':'addNewAgenda'))"
                :visible.sync="addNewScheduleDialogVisible"
                :showClose="false">
            <div slot="operateButtons" style="display:inline-block;float:right;">

                <!--<div style="display:inline-block;float:right;">-->
                <el-button v-if="'DETAIL'!=scheduleDialogMode" @click="submitNewScheduleDialog()" size="small">{{l('{global.save}')}}</el-button>
                <el-button v-if="'DETAIL'==scheduleDialogMode"
                           @click="JZY.s.unDisabledAllInput($refs.form.$el);scheduleDialogMode='UPDATE';updateTypeWhenEdit='1';"
                           size="small">{{l('modifyCurrentSchedule')}}</el-button>

                <el-button v-if="'DETAIL'==scheduleDialogMode && form.isRepeat==true"
                           @click="JZY.s.unDisabledAllInput($refs.form.$el);scheduleDialogMode='UPDATE';updateTypeWhenEdit='0';"
                           size="small">{{l('modifyAllSchedule')}}</el-button>

                <el-button v-if="'DETAIL'==scheduleDialogMode" size="small" @click="dropSchedule(1)">{{l('deleteToday')}}</el-button>
                <el-button v-if="'DETAIL'==scheduleDialogMode && form.isRepeat==true" size="small" @click="dropSchedule(0)">{{l('deleteAll')}}</el-button>
                <el-button @click="$refs.addScheduleDialog.handleClose()" size="small">{{l('{global.close}')}}</el-button>
                <!--</div>-->

                <!--</ul>-->
            </div>
            <div class="record">

                <task-detail v-if="currentViewTask" :taskId = "currentViewTask.taskId"></task-detail>


                <el-form v-if="!currentViewTask" :class="{'detail-form':'DETAIL'==scheduleDialogMode}" ref="form"  :model="form" :rules="rules" label-width="120px">
                    <!--<el-form-item :label="l('scheduleTitle')" prop="scheduleTitle">-->
                    <el-form-item :label="l('scheduleTitle')" prop="scheduleTitle">
                        <el-input :placeholder="l('{global.pleaseInput}{scheduleTitle}')" v-model="form.scheduleTitle"></el-input>
                    </el-form-item>


                    <el-form-item :label="l('{g.startEndTime}')" prop="startEndTime">
                        <el-date-picker
                                style="width:100%;"
                                v-model="form.startEndTime"
                                :picker-options="pickerOptions"
                                type="datetimerange"
                                :start-placeholder="l('{g.beginTime}')"
                                :end-placeholder="l('{global.endTime}')"
                                :default-time="['12:00:00']">
                        </el-date-picker>
                    </el-form-item>





                    <!--<el-form-item :label="l('{g.beginTime}')" prop="beginTime">-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--<el-date-picker type="datetime" v-model="form.beginTime" style="width: 100%;"></el-date-picker>-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col class="line" :span="2">-</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--</el-form-item>-->
                    <!--<el-form-item :label="l('{global.endTime}')" prop="endTime">-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--<el-date-picker type="datetime" v-model="form.endTime" style="width: 100%;"></el-date-picker>-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col class="line" :span="2">-</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--</el-form-item>-->

                    <el-form-item :label="l('{g.remind}')" prop="advanceTime">
                        {{l('beforeStart')}}

                        <el-select v-model="form.advanceTime" >
                            <el-option
                                    v-for="(item,index) in dicts.sysDictionaryList" :key="index" :label="item.dicFid" :value="item.dicFid"></el-option>
                        </el-select>
                        <!--sysDictionaryList-->


                        <!--<el-input-number type="number" :min="5" style="width:200px;"  v-model.number="form.advanceTime"></el-input-number>-->
                        {{l('{g.minute}')}}
                    </el-form-item>

                    <div :style="form.isRepeat?{border:'dashed 1px lightgray',marginBottom:'20px'}:{}">
                        <el-form-item :label="l('eventLoop')" prop="isRepeat">
                            <el-checkbox :disabled="'DETAIL'==scheduleDialogMode" v-model="form.isRepeat">{{l('loop')}}</el-checkbox>

                            <!--<el-input :placeholder="l('{global.pleaseInput}{address}')" v-model="form.address"></el-input>-->
                        </el-form-item>

                        <div v-if="form.isRepeat">
                            <el-form-item :label="l('loop')">

                                <el-select v-model="form.repetitionFrequency" >
                                    <el-option
                                            v-for="(item,index) in l('loopSelect')" :key="index" :label="l('{g.every}')+item" :value="index"></el-option>
                                </el-select>

                            </el-form-item>

                            <el-form-item :label="l('{g.end}')">

                                <el-select v-model="form.endFrequency" >
                                    <el-option
                                            v-for="(item,index) in l('endFrequencySelect')" :key="index" :label="item" :value="index"></el-option>
                                </el-select>

                            </el-form-item>

                            <el-form-item v-if="form.endFrequency==1" :label="l('frequency')">
                                <el-input style="width:80px;margin-right:5px;" v-model.number="form.endFrequencyNum">

                                </el-input>{{l('timesLater')}}
                            </el-form-item>
                            <el-form-item v-if="form.endFrequency==2" :label="l('until')">
                                <el-date-picker type="datetime" v-model="form.endFrequencyTime" style="width: 100%;"></el-date-picker>


                            </el-form-item>
                        </div>
                    </div>

                    <!--<el-form-item :label="l('sharedPeople')">-->
                    <!--sharedPeople-->
                    <!--</el-form-item>-->




                    <el-form-item :label="l('place')" prop="address">

                        <el-input :placeholder="l('{global.pleaseInput}{place}')" v-model="form.address"></el-input>
                    </el-form-item>

                    <el-form-item :label="l('scheduleDetails')" prop="scheduleDetails">
                        <el-input v-model="form.scheduleDetails" v-textarea-limiter type="textarea" :maxlength="100"></el-input>
                    </el-form-item>


                </el-form>

            </div>
        </right-slide-modal>


        <div v-if="isFullCalendarReady">

            <el-row style="padding-top:20px;padding-bottom:20px;">
                <el-col :span="20">
                    <el-row>

                        <el-col :span="8">
                            <el-radio-group size="small" v-model="d_w_y">
                                <el-radio-button label=".fc-agendaDay-button">{{getText('.fc-agendaDay-button')}}</el-radio-button>
                                <el-radio-button label=".fc-agendaWeek-button">{{getText('.fc-agendaWeek-button')}}</el-radio-button>

                                <el-radio-button label=".fc-month-button">{{getText('.fc-month-button')}}</el-radio-button>
                            </el-radio-group>
                            <el-button size="small" :disabled="isToday" @click="handleTodayClick()" type="primary">{{getText('.fc-today-button')}}</el-button>
                        </el-col>
                        <el-col :span="8" style="text-align:center;margin-top:5px;">

                            <div style="display:inline-block;">
                                <i class="icon20 el-icon-arrow-left" @click="handleNextMonthClick('prev')"></i>
                                <span style="position:relative;top:-2px;">{{fcCenterText}}</span>
                                <i class="icon20 el-icon-arrow-right" @click="handleNextMonthClick('next')"></i>
                            </div>
                        </el-col>
                        <!--<el-col :span="8">-->

                            <!--<div style="display:inline-block;float:right;margin-top:5px;">-->
                                <!--<el-checkbox @change="updateEventsVisibleConfig" v-model="isShowAgenda">{{l('{scheduleLocale.agenda}')}}</el-checkbox>-->
                                <!--<el-checkbox @change="updateEventsVisibleConfig" v-model="isShowTask">{{l('{scheduleLocale.task}')}}</el-checkbox>-->
                            <!--</div>-->
                        <!--</el-col>-->
                    </el-row>
                </el-col>
                <!--<el-col :span="4" style="text-align:right;padding-right:10px;">-->

                    <!--<div style="display:inline-block;">-->
                        <!--<el-button @click="showUserTreeOnly=true" size="small">{{l('{scheduleLocale.shareSchedule}')}}</el-button>-->



                        <!--<el-popover-->
                                <!--ref="shareHelpPopOver"-->
                                <!--placement="left"-->
                                <!--trigger="hover"-->
                                <!--width="300">-->

                            <!--<p>-->
                                <!--{{l('shareHelpInf')}}-->
                            <!--</p>-->

                        <!--</el-popover>-->

                        <!--<i v-popover:shareHelpPopOver class="el-icon-question theme-font icon20"></i>-->
                        <!--&lt;!&ndash;<el-button v-popover:popover5>删除</el-button>&ndash;&gt;-->


                        <!--&lt;!&ndash;<el-popover&ndash;&gt;-->
                        <!--&lt;!&ndash;ref="shareHelpPopOver"&ndash;&gt;-->
                        <!--&lt;!&ndash;placement="top-start"&ndash;&gt;-->
                        <!--&lt;!&ndash;placement="left"&ndash;&gt;-->
                        <!--&lt;!&ndash;width="200"&ndash;&gt;-->
                        <!--&lt;!&ndash;trigger="hover">&ndash;&gt;-->

                        <!--&lt;!&ndash;{{l('shareHelpInf')}}&ndash;&gt;-->

                        <!--&lt;!&ndash;</el-popover>&ndash;&gt;-->

                        <!--&lt;!&ndash;<i v-popper:shareHelpPopOver class="el-icon-question theme-font icon20"></i>&ndash;&gt;-->



                        <!--&lt;!&ndash;<el-button @click="addBlankSchedule()" size="small" type="primary">&ndash;&gt;-->
                            <!--&lt;!&ndash;<i class="el-icon-plus"></i>{{l('{scheduleLocale.addNewAgenda}')}}</el-button>&ndash;&gt;-->
                    <!--</div>-->

                <!--</el-col>-->
            </el-row>






        </div>
        <el-row>
            <el-col :span="20">
                <div ref="jqFullCalendarWrapper">

                </div>
            </el-col>
            <el-col :span="4" class="right-member-wrapper">

                <div style="width:90%;margin:0 auto;position:relative;">
                    <div style="position:absolute;top:112px;height:1px;width:100%;background:#dcdfe6;z-index:1;"></div>
                    <div v-if="rightPeopleData.length==0">
                        暂无任何数据
                    </div>
                    <el-table border v-if="rightPeopleData.length>0" :data="rightPeopleData" max-width="100%" min-width="100%">
                        <el-table-column label="所有成员" min-width="100%" max-width="100%">
                            <template slot-scope="scope">
                                <div v-if="scope.$index==0">

                                    <el-input clearable @clear="searchRightPeople({teamPersonName:searchedMemberName})"

                                              v-model="searchedMemberName"
                                              :maxlength="100" style="font-size:12px;width:106%;margin-left:-3%;margin-bottom:25px;margin-top:10px;" :placeholder="l('searchMember')">
                                        <el-button v-if="!isSearchingMember" @click="searchRightPeople({teamPersonName:searchedMemberName})" slot="append" icon="el-icon-search"></el-button>

                                        <i v-if="isSearchingMember" slot="append" class="el-icon-loading"></i>
                                    </el-input>


                                    <!--<el-input v-model="searchRightPeopleModel" @change="searchRightPeople()" :maxlength="100"-->
                                              <!--style="width:100%;margin-bottom:25px;margin-top:15px;" :placeholder="l('searchMember')"></el-input>-->
                                </div>
                                <div v-if="rightPeopleData.length==1 && scope.row.teamPersonName==null">暂未搜索到任何用户</div>
                                <div v-if="scope.row.teamPersonName!=null" @click="(scope.row.isChoosed=!scope.row.isChoosed)">
                                <!--<div @click="rightPeopleData.length==1 && (JZY.u.warningMsg('至少保留一位成员')) || (rightPeopleData.length>1 && (scope.row.isChoosed=!scope.row.isChoosed))">-->
                                    <el-row class="right-people-row" style="height:50px;cursor:pointer;">
                                        <el-col :span="6" style="text-align:center;line-height:50px;">
                                            <img :src="JZY.s.getOssThumbSrc(scope.row.teamPersonImgUrl)" style="position:relative;top:7.5px;display:block;margin:0 auto;width:35px;height:35px;">
                                        </el-col>
                                        <el-col :title="scope.row.teamPersonName" :span="12" style="text-align:center;line-height:50px;
max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
">

                                            {{scope.row.teamPersonName}}

                                        </el-col>
                                        <el-col v-show="scope.row.isChoosed" :span="6" style="text-align:center;line-height:50px;">

                                            <i class="el-icon-check icon20"></i>
                                        </el-col>
                                    </el-row>


                                    <span></span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>


            </el-col>
        </el-row>









        <!--<el-row>-->
        <!--<el-col :span="8">-->
        <!--<el-radio-group v-model="currentCalendarType" size="small">-->
        <!--<el-radio-button label="日"></el-radio-button>-->
        <!--<el-radio-button label="周" ></el-radio-button>-->
        <!--<el-radio-button label="月"></el-radio-button>-->
        <!--</el-radio-group>-->
        <!--</el-col>-->
        <!--<el-col :span="8" class="full-calendar-header">-->
        <!--<div class="header-center">-->
        <!--<span class="prev-month" @click.stop="goPrev">-->
        <!--<i class="el-icon-arrow-left"></i>-->
        <!--</span>-->
        <!--<span class="title">-->
        <!--&lt;!&ndash; -&#45;&#45;{{$refs.fullCalendar?$refs.fullCalendar.currentMonth.locale($refs.fullCalendar.locale).format('MMMM YYYY'):''}}&ndash;&gt;-->
        <!--{{calendarTitle}}-->
        <!--</span>-->
        <!--<span class="next-month" @click.stop="goNext">-->
        <!--<i class="el-icon-arrow-right"></i>-->
        <!--</span>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
        <!--<div style="display:inline-block;float:right;">-->
        <!--<el-checkbox>日程</el-checkbox>-->
        <!--<el-checkbox>任务</el-checkbox>-->
        <!--<el-checkbox>联系提醒</el-checkbox>-->
        <!--<el-button size="small" type="primary" icon="el-icon-plus">新建日程</el-button>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row>-->
        <!--<el-col :span="20">-->
        <!--<jzy-full-calendar ref="fullCalendar" class="test-fc" :events="fcEvents"-->
        <!--first-day='1'-->
        <!--@changeMonth="changeMonth"-->
        <!--@eventClick="eventClick"-->
        <!--@dayClick="dayClick"-->
        <!--@moreClick="moreClick">-->


        <!--<template slot="fc-event-card" slot-scope="p">-->

        <!--<p><i class="fa">&nbsp;</i> {{ p.event.title }} test</p>-->
        <!--</template>-->
        <!--</jzy-full-calendar>-->
        <!--</el-col>-->
        <!--<el-col :span="4" style="margin-top:20px;">-->
        <!--成员区域-->
        <!--</el-col>-->
        <!--</el-row>-->





    </div>
</template>
<style lang="scss">

    .fc-agendaWeek-view .fc-week-number.fc-widget-header{

        width:45px !important;
    }


    .fc-agendaWeek-view .fc-week-number.fc-widget-header.fc-axis div{
        font-size:12px;
    }

    .fc-content{
        color:black;
        border: solid 1px #666;
        border-radius: 4px;
        .fc-time{
            display:none;
        }
    }



    .fc-component-wrapper{
        right-member-wrapper{
            .right-people-row:hover{
                background:#f5f7fa;
            }

            tr:hover,td:hover{
                background:none !important;
            }
            tr:hover td{
                background:none !important;
            }
            thead th{
                text-align:center;
            }
        }



        .fc-day.fc-widget-content{
            /*cursor:pointer;*/
            /*&:hover{*/
            /*background:#cfe8e8;*/

            /*}*/
        }
        .fc-header-toolbar{
            display:none;
        }
        .el-radio-button:first-child .el-radio-button__inner,.el-radio-button__orig-radio:checked+.el-radio-button__inner{
            background-color:transparent;
            color:#666;
        }
    }

    /**{*/
    /*background:blue;*/
    /*color:red;*/
    /*}*/

    @import '~@/plugins/fullcalendar.css';
    .full-calendar-header{
        display: flex;
        align-items: center;
        /*.header-left,.header-right{*/
        /*flex:1;*/
        /*}*/
        .header-center{
            display:inline-block;
            margin:0 auto;
            /*flex:3;*/
            text-align:center;
            .title{
                margin: 0 10px;
            }
            .prev-month,.next-month{
                cursor: pointer;
            }
        }
    }
</style>
<script>

    import taskDetail from '@Main/task/components/task.detail.vue'

    // JZY.u.formatTime(new Date(JZY.VM.schedule.fcInstance.fullCalendar('getDate').toString()))

    // const MAX_QUERY_YEAR=3


    // import moment from 'moment'
    // if(typeof(window)!='undefined'){
    //     window.moment=moment
    // }


    JZY.locale.add('scheduleLocale',require('@Main/schedule/schedule.locale'))

    // import defaultConfig from './schedule.fullCalendar.defaultConfig'
    import defaultConfig from '@Main/schedule/schedule.fullCalendar.defaultConfig'

    // import jQuery from 'jquery'


    import 'fullcalendar/dist/fullcalendar.css'
    // import '/static/fullCalendar/fullcalendar.js'
    // import 'fullcalendar'
    // import 'fullcalendar/dist/locale/zh-cn.js'
    // import 'fullcalendar/dist/locale/zh-cn.js'
    // import '@/plugins/fullcalendar/locale.js'
    // import '@/plugins/fullcalendar/locale-all.js'


    const TYPES={

        AGENDA:{

            color:'rgba(246, 255, 237, 1)'
        },
        TASK:{
            color:'rgba(230, 247, 255, 1)'
        }
    }



    // let demoEvents = [
    //     {
    //         title    : 'Sunny 725-727',
    //         start    : '2018-02-25',
    //         end      : '2018-02-27',
    //         cssClass : 'family'
    //     },
    //     {
    //         title : '726-727',
    //         start : '2018-02-26',
    //         end : '2018-02-27',
    //         cssClass : ['home', 'work']
    //     }
    //     ,
    //     {
    //         title : '2/27-2/28',
    //         start : '2018-02-27',
    //         end : '2018-02-28'
    //     },
    //     {
    //         title : '2/27-2/28',
    //         start : '2018-02-27',
    //         end : '2018-02-28'
    //     },
    //     {
    //         title : '2/27-2/28',
    //         start : '2018-02-27',
    //         end : '2018-02-28'
    //     },
    //     {
    //         title : '2/26-3/05',
    //         start : '2018-02-26',
    //         end : '2018-03-05'
    //     },
    //     {
    //         title : '1/27-1/28',
    //         start : '2018-01-27',
    //         end : '2018-01-28'
    //     },
    //     {
    //         title : '1/21-1/22',
    //
    //         start : '2018-01-21',
    //         end : '2018-01-22'
    //     },
    //     {
    //         title : '1/27-2/2',
    //         start : '2018-01-27',
    //         end : '2018-02-02'
    //     },
    //     {folderRemark
    //         title : '3/27-3/28',
    //         start : '2018-03-27',
    //         end : '2018-03-28'
    //     },
    // ];
    export default{
        components:{
            taskDetail
        },
        async created(){
            if(JZY.DEBUG_MODE){
                window.DETAIL_TASK_VM=this
            }
            JZY.s.eventBus.$on('UPDATE_PROJECT_DYNAMIC',JZY.u.debounce(()=>{
                try{
                    this.refreshCurrentMonthSchedule()
                        .then((events)=>{
                            this.refreshEventDom(events)

                        })
                }catch(e){

                }
            },200,false))

            await JZY.s.getScript('/static/fullCalendar/lunar.js')
            await JZY.s.getScript('/static/fullCalendar/fullcalendar.js')
            await JZY.s.getScript('/static/fullCalendar/locale.js')



            let rightPeopleData=JZY.u.copy(this.memberList)

            rightPeopleData.forEach((item)=>{
                item.isChoosed=item.teamType=='负责人'
                // item.isChoosed=item.teamPersonId==JZY.store.state.session.sid
            })
            this.rightPeopleData=rightPeopleData

            JZY.xhr.requestPromises([
                JZY.xhr.r('/sys/common/getSysTime','GLOBAL.TEST.WANG_TAO'),
                //查询右上角共享弹出的dailog我共享给别人的列表
                // JZY.xhr.r({type:'post',url:'/schedule/querySharedCalendar'}),
                JZY.xhr.callInterfaceAndSetData({url:'/schedule/querySysDictionaryList',type:'post'},this.dicts,'sysDictionaryList'),

                this.queryScheduleList({},true),
                // this.queryScheduleList(this.scheduleQueryParams),
                //查询右侧共享给我的人列表

            ])
                .then(async ([[time],
                                 // [{personList}],
                                 [sysDictionaryList],scheduleList

                             ])=>{


                    JZY.s.clog('kcuf_u scheduleList-:',scheduleList);


                    // (personList||[]).forEach((item)=>{
                    //     item.sid=item.sharedShowId
                    //     item.nodeId=item.sharedShowId
                    //     item.name=item.sharedShowName
                    // })
                    //
                    // this.sharedCalendarPeoples=(personList||[])

                    this.isReady=true


                    // this.currentServerTime='2019-03-29 14:22:30'
                    this.currentServerTime=time
                    this.currentMonth=time.split('-').slice(0,2).join(',')
                    // alert(this.currentMonth)






                    JZY.call(this,'setCurrentVM')

                    await JZY.u.waiting()
                    let self=this;
                    let lan=(await JZY.locale.getCurrentLanguage()).toLowerCase();
                    (function($){
                        // alert($)
                        let $jqFullCalendarWrapper=$(self.$refs.jqFullCalendarWrapper)
                        self.fcInstance=$jqFullCalendarWrapper
                        $jqFullCalendarWrapper.on('click','a[data-goto]',function(){
                            self.d_w_y='.fc-agendaDay-button'
                        })

                        let fcConfig={
                            locale:lan,

                            // events:scheduleList,


                            timezone: "local",

                            //     dayClick: function(date, allDay, jsEvent, view)
                            // {
                            //     alert(date); // Gives Sat Nov 21 2015 19:00:00 GMT+0000
                            // },

                            select:function(start, end){

                                return false


                                JZY.s.clog("start and end:",
                                    JZY.u.formatTime(new Date(start.toString())),
                                    JZY.u.formatTime(new Date(end.toString()))
                                )

                                self.scheduleDialogMode='ADD'
                                self.addNewScheduleDialogVisible=true
                                self.$nextTick(()=>{
                                    self.$refs.form.resetFields()



                                    let startTime=JZY.u.formatTime(new Date(start.toString())),
                                        endTime=JZY.u.formatTime(new Date(end.toString()))

                                    // if(self.d_w_y!='.fc-month-button'){
                                    //     self.form.startEndTime=[new Date(startTime),
                                    //         new Date(endTime)]
                                    //
                                    // }else{

                                    if(self.d_w_y=='.fc-month-button'){
                                        startTime=startTime.split(' ')[0]+' 08:00:00'
                                        endTime=startTime.split(' ')[0]+' 18:00:00'
                                    }


                                    // if(new Date(startTime).getTime()<new Date(self.currentServerTime).getTime()){
                                    //
                                    //
                                    //     self.$nextTick(()=>{
                                    //         JZY.u.infoMsg(self.l('selectedTimeLessThanCurrentTime'))
                                    //     })
                                    //
                                    //     // setTimeout(()=>{
                                    //     //     JZY.u.infoMsg(self.l('selectedTimeLessThanCurrentTime'))
                                    //     // },200)
                                    //
                                    //
                                    //     startTime=new Date(self.currentServerTime).getTime()+(1000*3600)
                                    // }

                                    self.form.startEndTime=[new Date(startTime),
                                        new Date(endTime)]
                                    // }


                                })

                            },

                            ...JZY.u.deepExtend(defaultConfig,self.fullCalendarConfig)


                        }

                        if(self.readonly){
                            fcConfig.select=()=>{}
                            fcConfig.eventClick=()=>{}
                        }else{
                            setTimeout(()=>{
                                (function () {
                                    // Create the <style> tag
                                    var style = document.createElement('style');

                                    // Add a media (and/or media query) here if you'd like!
                                    // style.setAttribute('media', 'screen')
                                    // style.setAttribute('media', 'only screen and (max-width : 1024px)')

                                    // WebKit hack :(
                                    style.appendChild(document.createTextNode(''));

                                    // Add the <style> element to the page
                                    document.head.appendChild(style);

                                    return style.sheet;
                                })().insertRule('.fc-day.fc-widget-content:hover{background:#cfe8e8;}', 0);
                            })
                        }




                        JZY.s.clog('fc config:',fcConfig)




                        $jqFullCalendarWrapper.fullCalendar(fcConfig);

                        // self.$nextTick(()=>{
                        self.isFullCalendarReady=true

                        // setTimeout(()=>{
                        //     self.updateCustomFC()
                        // })




                        // })

                    })(jQuery);

                    setTimeout(()=>{
                        this.refreshEventDom(scheduleList)



                        this.updateCustomFC()

                        JZY.s.hideLoading()
                    })





                    // JZY.s.clog('schedule init promise res:',time,scheduleList,taskList,shareList)
                })
                .catch((e)=>{
                    console.warn('catch a e-:',e)

                    JZY.s.hideLoading()
                })

        },

        beforeCreate(){


            JZY.s.showLoading()




            return false;

            if(JZY.DEBUG_MODE){
                JZY.xhr.request({
                    type:'post',
                    url:'/schedule/queryScheduleDetails',
                    data:{
                        scheduleId:'27399adceac243fd8130f9ccedaf88ae'
                    }
                }).then(([res])=>{

                    res.startEndTime=[new Date(res.beginTime),new Date(res.endTime)]

                    this.form=res

                    // this.currentViewScheduleData=res
                    this.scheduleDialogMode='DETAIL'

                    JZY.s.clog('res--:',res)
                })
            }
        },
        props:{
            memberList:Array,
            id:[String,Number],
            module:{
                type:String,
                default:'SCHEDULE'
            },
            readonly:Boolean,

            // scheduleQueryParams:{
            //     type:Object,
            //     default:{}
            // },
            fullCalendarConfig:Object
        },
        methods:{
            async searchRightPeople(body={}){
                body.projectId=this.id
                  // let str=this.searchRightPeopleModel.trim()
                  //
                  // let body={
                  //     projectId:this.id
                  // }
                  // if(str!=''){
                  //     body.teamPersonName=str
                  //
                  //
                  //
                  //
                  //
                  //
                  // }
                this.isSearchingMember=true
                let time=Date.now()
                let res=await JZY.xhr.r({
                    type:'post',
                    url:'/project/projectTeamPerson/page',
                    data:body
                }).catch(()=>{
                    setTimeout(()=>{this.isSearchingMember=false},Date.now()-time)
                })

                setTimeout(()=>{this.isSearchingMember=false},Date.now()-time)


                let rightPeopleData=res[0].list


                // if(rightPeopleData.length==0){
                //     JZY.u.warningMsg('系统没有找到该用户')
                //     return false
                // }


                let previousChoosedRightPeopleData=JZY.u.copy(this.rightPeopleData.filter((item)=>item.isChoosed==true)),
                    handledRightPeopleData=[]
                rightPeopleData.forEach((item,index)=>{
                    // item.isChoosed=index==0

                    let findedItemInPreviouseData=previousChoosedRightPeopleData.find((prevItem)=>prevItem.teamPersonId==item.teamPersonId)

                    if(!findedItemInPreviouseData){
                        item.isChoosed=false
                        handledRightPeopleData.unshift(item)
                    }
                    // else{
                    //     handledRightPeopleData.push(item)
                    // }

                })
                rightPeopleData=previousChoosedRightPeopleData.concat(handledRightPeopleData)



                if(rightPeopleData.length==0){
                    rightPeopleData.unshift({
                        teamPersonImgUrl:null,
                        teamPersonId:null,
                        teamPersonName:null
                    })
                }

                let myIndex=rightPeopleData.findIndex((item)=>item.sharedShowId==JZY.store.state.session.sid)
                if(myIndex!=-1){
                    let myObj=JZY.u.copy(rightPeopleData[myIndex])
                    rightPeopleData.splice(myIndex,1)
                    rightPeopleData.unshift(myObj)
                }


                let headPersonIndex=rightPeopleData.findIndex((item)=>item.teamType=='负责人')

                if(headPersonIndex!=-1){
                    let firstItem=JZY.u.copy(rightPeopleData[headPersonIndex])
                    rightPeopleData.splice(headPersonIndex,1)
                    rightPeopleData.unshift(firstItem)
                }

                console.log('kcuf_u right people data--:',rightPeopleData)

                this.rightPeopleData=rightPeopleData




                // rightPeopleData.forEach((item)=>{
                //     item.isChoosed=false
                // })
                // this.rightPeopleData=rightPeopleData

            },
            handleRightPeopleClick(row){
                row.isChoosed=!row.isChoosed
            },
            handleNewScheduleDialogClose(){
                this.currentScheduleId=null
                this.currentViewTask=null;
            },
            isTask(row){

                return TYPES.TASK.color==row.color
            },
            refreshEventDom(events){
                this.fcInstance.fullCalendar( 'removeEvents');
                this.fcInstance.fullCalendar('addEventSource', events);
            },

            getUserTreeOnly(arr){
                JZY.s.clog('arr',arr)


                let list=[]

                JZY.u.copy(arr).forEach((item)=>{
                    list.push({
                        sharedShowId:item.sid,
                        isShowTitle:item.isShowTitle==true?0:1
                    })
                })


                JZY.xhr.post('/schedule/sharedCalendar',{
                    personList:list
                })

                this.sharedCalendarPeoples=arr


            },
            addBlankSchedule(){

                this.scheduleDialogMode='ADD';
                this.addNewScheduleDialogVisible=true;
                this.$nextTick(function(){
                    JZY.s.unDisabledAllInput(this.$refs.form.$el);
                    this.$refs.form.resetFields();
                });
            },

            dropSchedule(updateType){

                let promise=JZY.u.warningMsg(l('{g.areYouConfirm}')+l(updateType==1?'deleteToday':'deleteAll')+l('{g.questionMark}'),true)


                console.log('promise--:',promise)

                promise.then(()=>{
                    JZY.xhr.post('/schedule/delete',{
                        updateType:updateType,
                        scheduleId:this.currentScheduleId,
                        isRepeat:this.form.isRepeat==true?0:1
                    })
                        .then(()=>{
                            let index=this.scheduleList.find((item)=>{
                                return this.currentScheduleId==item.scheduleId
                            })


                            this.scheduleList.splice(index,1)

                            this.addNewScheduleDialogVisible=false

                            this.updateEventsVisibleConfig()





                        })
                })


            },
            queryScheduleDetailById(id){
                return JZY.xhr.request({
                    type:'post',
                    url:'/schedule/queryScheduleDetails',
                    data:{
                        scheduleId:id
                    }
                }).then(([res])=>{

                    res.startEndTime=[new Date(res.beginTime),new Date(res.endTime)]


                    res.isRepeat=res.isRepeat==0?true:false

                    this.form=res

                    // this.currentViewScheduleData=res
                    this.scheduleDialogMode='DETAIL'

                    this.addNewScheduleDialogVisible=true

                    this.$nextTick(()=>{
                        JZY.s.disabledAllInput(this.$refs.form.$el)
                    })





                    JZY.s.clog('res--:',res)
                })
            },
            updateCustomFC(){

                this.fcInstance.fullCalendar('gotoDate',this.currentServerTime)
                this.$nextTick(()=>{
                    this.updateIsToday()
                    this.setFCCenterText()
                })
            },
            handleTodayClick(){
                this.getDOM('.fc-today-button').click()
                this.$nextTick(()=>{
                    this.setFCCenterText()
                    this.updateIsToday()
                    try{
                        this.currentMonth=this.getCurrentSelectedDate().split('-').slice(0,2).join(',')
                    }catch(e){}
                    this.refreshCurrentMonthSchedule()
                })
            },
            // handlePrevMonthClick(){
            //     this.getDOM('.fc-prev-button').click();
            //     this.setFCCenterText();
            //     this.$nextTick(()=>{
            //         this.updateIsToday()
            //     })
            // },
            updateIsToday(){
                this.isToday=jQuery(this.getDOM('.fc-today-button')).attr('disabled')=='disabled'


            },
            getCurrentSelectedDate(){
                return JZY.u.formatTime(new Date(this.fcInstance.fullCalendar('getDate').toString()))
            },
            getFirstDayTimeByCurMonth(curMonth){
                return curMonth.split(",").join('-')+'-01 00:00:00'
            },
            getPrevMonthOrNextMonthByCurMonth(curMonth,step=1){
                let arr=curMonth.split(','),
                    year=arr[0],
                    month=arr[1]
                month=month-0+step
                if(month==13){
                    month=1
                    year=year-0+1
                }
                if(month==0){
                    month=12
                    year=year-0-1
                }
                if((''+month).length==1){
                    month='0'+month
                }

                return [year,month].join(',')

            },
            refreshCurrentMonthSchedule(){
                JZY.s.clog('refresh current month was invoked')

                let from=this.getPrevMonthOrNextMonthByCurMonth(this.currentMonth,-1),
                    to=this.getPrevMonthOrNextMonthByCurMonth(this.currentMonth,2),
                    startTime=this.getFirstDayTimeByCurMonth(from),
                    endTime=this.getFirstDayTimeByCurMonth(to)


                return this.queryScheduleList({
                    beginTime:startTime,
                    endTime:endTime
                })
                //     .then((events)=>{
                //     this.updateEventsVisibleConfig()
                //     // this.refreshEventDom(events)
                //
                // })

            },
            queryScheduleListByCurMonth(lastMonth,monthStep){


                JZY.s.clog('last month and month step:',lastMonth,monthStep)



                let curMonth=this.getCurrentSelectedDate().split('-').slice(0,2).join(','),
                    // targetMonth,
                    startTime,
                    endTime


                if(monthStep>0){


                    let targetMonth=this.getPrevMonthOrNextMonthByCurMonth(curMonth,monthStep)
                    startTime=this.getFirstDayTimeByCurMonth(lastMonth)
                    endTime=this.getFirstDayTimeByCurMonth(targetMonth)
                }else{
                    let fromMonth=this.getPrevMonthOrNextMonthByCurMonth(curMonth,-1)
                    let endMonth=this.getPrevMonthOrNextMonthByCurMonth(lastMonth,1)

                    startTime=this.getFirstDayTimeByCurMonth(fromMonth)
                    endTime=this.getFirstDayTimeByCurMonth(endMonth)
                }




                JZY.s.clog("cur---:",curMonth,startTime,endTime)
                // return false


                if(this.currentMonth==curMonth){
                    return false;
                }else{
                    this.currentMonth=curMonth
                }

                //
                // if(monthStep<0){
                //     let temp=startTime
                //     startTime=endTime
                //     endTime=temp
                // }



                // JZY.s.clog('start and end time4:',curMonth,targetMonth,startTime,endTime)

                this.queryScheduleList({
                    beginTime:startTime,
                    endTime:endTime
                }).then((events)=>{
                    this.refreshEventDom(events)

                })
            },
            handleNextMonthClick(type){


                this.getDOM('.fc-'+type+'-button').click();
                this.setFCCenterText();
                this.$nextTick(()=>{
                    this.updateIsToday()



                    this.queryScheduleListByCurMonth(this.currentMonth,type=='next'?2:-1)




                    // let date=this.getCurrentSelectedDate()

                })
            },


            //右上角按钮
            // querySharedCalendar(body={}){
            //     return JZY.xhr.r({
            //         type:'post',
            //         url:'/schedule/querySharedCalendar',
            //         data:body
            //     })
            //         .then(([res])=>{
            //
            //             this.sharedCalendarPeoples=Array.isArray(res)?res:[]
            //
            //
            //             return this.sharedCalendarPeoples
            //
            //         })
            // },
            // 日程区域日程列表
            queryScheduleList(body={},isFirstLoad=false){

                if(this.rightPeopleData.length>0 && this.rightPeopleData.every((item)=>item.isChoosed!=true)){
                    return new Promise((resolve)=>{
                        resolve([])
                    })
                }


                body.createPersonList=(function(arr){
                    let res=[]

                    arr.forEach((item)=>{

                        if(item.isChoosed){
                            res.push({
                                createPersonId:item.teamPersonId
                            })
                        }


                    })

                    return res

                })(this.rightPeopleData);
                body.pageNum=1
                body.pageCount=JZY.u.MAX_JAVA_INT
                body.projectId=this.id
                body.taskName=''

                // if(isFirstLoad){
                //     // if(isFirstLoad && !body.createPersonList.find((item)=>item.createPersonId==JZY.store.state.session.sid)){
                //     body.createPersonList.unshift({
                //         createPersonId:JZY.store.state.session.sid
                //     })
                // }


                return JZY.xhr.r({
                    type:'post',
                    url:'/task/queryProjectTaskList',
                    data:body
                })
                    .then(([res])=>{

                        let taskList=res.list

                        // debugger
                        //
                        //
                        // let {scheduleList,taskList}=res
                        //
                        let data=[]
                        // //
                        // scheduleList.forEach((item)=>{
                        //     data.push({
                        //         title:item.scheduleTitle,
                        //         start:item.beginTime,
                        //         end:item.endTime,
                        //         ...item,
                        //         VM:this,
                        //         ...TYPES.AGENDA
                        //
                        //         // title: 'All Day Event',
                        //         // start: '2018-03-01',
                        //     })
                        // })

                        taskList.forEach((item)=>{
                            data.push({
                                title:'['+(JZY.store.state.session.name==item.createPersonName?'我':item.createPersonName)+'] '+item.taskName,
                                start:item.beginDate,
                                end:item.endDate,
                                ...item,
                                VM:this,
                                ...TYPES.TASK

                                // title: 'All Day Event',
                                // start: '2018-03-01',
                            })
                        })



                        this.scheduleList=data


                        JZY.s.clog('query schedule list was invoked')



                        return data




                        // return res
                    })

            },
            submitNewScheduleDialog(){






                // if('ADD'==scheduleDialogMode){
                this.$refs.form.validate((valid)=>{
                    JZY.s.clog('valid--:',valid)
                    if(valid){

                        let beginTime=JZY.u.formatTime(this.form.startEndTime[0]).split('/').join('-')
                        let endTime=JZY.u.formatTime(this.form.startEndTime[1]).split('/').join('-')

                        let data=JZY.u.copy(this.form)

                        data.beginTime=beginTime
                        data.endTime=endTime
                        data.isRepeat=data.isRepeat==true?0:1


                        if('endFrequencyTime' in data && typeof(data.endFrequencyTime)=='object'){
                            data.endFrequencyTime=JZY.u.formatTime(data.endFrequencyTime).split('/').join('-')
                        }

                        JZY.s.clog('data---:',data)

                        delete data.startEndTime


                        if(this.scheduleDialogMode=='UPDATE'){
                            data.updateType=this.updateTypeWhenEdit
                            data.scheduleId=this.currentScheduleId
                        }


                        JZY.xhr.post(this.scheduleDialogMode=='UPDATE'?'/schedule/update':'/schedule/save',data)
                            .then(()=>{
                                this.addNewScheduleDialogVisible=false


                                this.refreshCurrentMonthSchedule()



                            })


                    }
                })
                // }else{
                //
                // }






            },
            updateEventsVisibleConfig(){
                let arr=[]
                if(this.isShowAgenda){ arr.push('AGENDA') }
                if(this.isShowTask){ arr.push('TASK') }

                let events=[]
                this.scheduleList.forEach((event)=>{
                    let {color}=event
                    arr.forEach((type)=>{
                        if(TYPES[type].color==color){
                            events.push(event)
                        }
                    })
                })
                this.refreshEventDom(events)


            },
            setFCCenterText(){
                this.fcCenterText=this.getText('.fc-center h2')
            },
            getDOM(selector){
                return   (this.$refs.jqFullCalendarWrapper).querySelector(selector)
            },
            getText(selector){
                return this.getDOM(selector).innerText
            },

            goPrev () {
                var newMonth = moment(this.$refs.fullCalendar.currentMonth).subtract(1, 'months').startOf('month');
                this.$refs.fullCalendar.emitChangeMonth(newMonth);
            },
            goNext () {
                var newMonth = moment(this.$refs.fullCalendar.currentMonth).add(1, 'months').startOf('month');
                this.$refs.fullCalendar.emitChangeMonth(newMonth);
            },

            'changeMonth' (start, end, current) {
                this.calendarTitle=this.$refs.fullCalendar.currentMonth.locale(this.$refs.fullCalendar.locale).format('MMMM YYYY')
                // console.log('changeMonth', start.format(), end.format(), current.format())
            },
            'eventClick' (event, jsEvent, pos) {
                console.log('eventClick', event, jsEvent, pos)
            },
            'dayClick' (day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            },
            'moreClick' (day, events, jsEvent) {
                console.log('moreCLick', day, events, jsEvent)
            },
            test1:function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({foo:'barrrrrrr'})
                    },100)
                })
            },
            async testAsync(){
                let obj=await this.test1()

                alert(obj.foo)
            }
        },
        watch:{
            rightPeopleData:{
                handler:function(nv,ov){

                    if(nv.every((item)=>item.isChoosed==false)){
                        this.fcInstance.fullCalendar( 'removeEvents');
                        this.scheduleList=[]
                        return false
                    }

                    if(nv.length!=0 && ov.length!=0){
                        this.refreshCurrentMonthSchedule()
                            .then((events)=>{
                                this.refreshEventDom(events)

                            })
                    }

                    // JZY.s.clog("nv and ov:",nv,ov)

                },
                deep:true
            },
            // isShowAgenda(value){
            //
            // },
            // isShowTask(value){
            //
            // },
            d_w_y(value){
                this.getDOM(value).click()
                this.$nextTick(()=>{
                    this.updateIsToday()
                    this.setFCCenterText()
                    try{
                        document.querySelector('.fc-time-grid-container').scrollTop=0
                    }catch(e){}
                })
                // this.setFCCenterText()
            }
        },
        computed:{
            // detailMode(){
            //     return this.scheduleDialogEditingMode==false && this.currentViewScheduleData==null
            // },
            // update
            // calendarTitle () {
            //
            //     // if(!this.$refs.fullCalendar) return;
            //     if (!this.$refs.fullCalendar.currentMonth) return;
            //     alert(this.$refs.fullCalendar.currentMonth.locale(this.$refs.fullCalendar.locale).format('MMMM YYYY'))
            //     return this.$refs.fullCalendar.currentMonth.locale(this.$refs.fullCalendar.locale).format('MMMM YYYY')
            // }
        },
        data(){
            let self=this
            return {
                isSearchingMember:false,
                searchedMemberName:'',
                searchRightPeopleModel:'',
                currentViewTask:null,
                isReady:false,
                dicts:{
                    // sysDictionaryList:[]
                },
                pickerOptions:{
                    disabledDate(date){
                        return new Date(date).getTime()+(86400*1000)<new Date(self.currentServerTime).getTime()
                    }
                },
                updateTypeWhenEditMode:null,
                scheduleList:[],
                currentScheduleId:null,
                isToday:false,
                currentServerTime:JZY.u.formatTime(Date.now()).split('/').join('-'),
                currentMonth:JZY.u.formatTime(Date.now()).split('/').slice(0,2).join(','),
                showUserTreeOnly:false,
                sharedCalendarPeoples:[],//右上角分享按钮数据
                // sharedCreatePersonList:[],
                rightPeopleData:[],
                rules:{

                    scheduleTitle:JZY.s.f.rules.requiredInput(this.l('scheduleTitle')),
                    startEndTime:[
                        { type: 'array', required: true,message: this.l('{g.pleaseChoose}{g.startEndTime}'), trigger: 'change,blur'},


                    ],
                    advanceTime:{ type: 'number', required: true,message: this.l('{g.pleaseInput}{scheduleLocale.advanceTime}'), trigger: 'blur'}


                    // { type: 'date', required: true,message: '请选择日期', trigger: 'blur,change'}

                },
                form:{
                    startEndTime:'',
                    scheduleTitle:'',
                    isRepeat:false,
                    advanceTime:5,
                    address:'',
                    scheduleDetails:''



                    ,repetitionFrequency:0
                    ,endFrequency:1
                    ,endFrequencyNum:1
                    ,endFrequencyTime:''

                    ,scheduleSharedParam:{
                        personList:[],
                        roleList:[],
                        departmentList:[]
                    }

                },

                addNewScheduleDialogVisible:false,
                // addNewScheduleDialogVisible:JZY.DEBUG_MODE,
                // currentViewScheduleData:null,
                scheduleDialogMode:'ADD',
                // scheduleDialogEditingMode:false,


                isShowAgenda:true,
                isShowTask:true,
                fcCenterText:'',
                fcInstance:null,
                d_w_y:'.fc-month-button',
                isFullCalendarReady:false,
                calendarTitle:'',
                // currentCalendarType:'月',
                name:'Sunny!',
                // fcEvents : demoEvents
                // menus:[
                //     {
                //         moduleName:'通讯录1',
                //         name:'contact1',
                //         children:[
                //             {
                //                 moduleName:'通讯录1-儿子1',
                //                 url:'/home',
                //             }
                //         ]
                //     },{
                //         moduleName:'通讯录2',
                //         name:'contact2',
                //         url:'/home',
                //     }
                // ]
            }
        },
        async mounted(){

            //
            // let rightPeopleData=[
            //     {
            //         "sharedShowId":"mock",
            //         "sharedShowName":"mock"
            //     },{
            //         "sharedShowId":"mock",
            //         "sharedShowName":"mock"
            //     }
            // ]
            //
            // rightPeopleData.forEach((item)=>{
            //     item.isChoosed=false
            // })
            // this.rightPeopleData=rightPeopleDatas




        },
        beforeDestroy(){
          JZY.s.eventBus.$off('UPDATE_PROJECT_DYNAMIC')
        },
        destroyed(){

            this.fcInstance.fullCalendar('destroy')
        },
        TYPES:TYPES
    }
</script>
