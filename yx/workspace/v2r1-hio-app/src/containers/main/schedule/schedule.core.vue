<template>

    <div style="min-width:1048px;height: calc(100% - 6px);overflow-y:scroll;padding-left:10px;padding-right:10px;box-sizing:border-box;" class="fc-component-wrapper" v-if="isReady">


        <blend-tree
                ref= "xxxTree"
                :enable-checked-multiple = "true"
                :tagButtons="['user']"
                activeTab = "user"
                :workStatus = "1"
                :resultDataListShow = "true"
                fromMoudle="schedule"
                :selectedDataToTree = "sharedCalendarPeoples"
                @getDataFromTree = "getUserTreeOnly">
            <!--添加按钮图标的插槽-->
            <div slot="add_button">
                <i class="el-icon-circle-plus" @click.stop = "$refs.xxxTree.blendTreeDialogShow()"></i>
            </div>
            <!--日程共享人专用-->
            <template slot-scope="user">
            <span class="tmpl">
              <el-checkbox v-if="user.data.hasOwnProperty('scheduleTitleShow')" v-model="user.data.scheduleTitleShow"></el-checkbox>
            </span>
            </template>
        </blend-tree>

        <!--<user-tree :selectUserDialogVisible="showUserTreeOnly"-->
                   <!--:show-inside-outside-tabs="true"-->
                   <!--@closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"-->
                   <!--:selectedUsers = "sharedCalendarPeoples"-->
                   <!--@getUserTree = "getUserTreeOnly"-->
                   <!--:enable-checked-multiple="true">-->


            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->

                <!--&lt;!&ndash;&lt;!&ndash;{{scope.row.isShowTitle=true}}&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-checkbox :disabled="(scope.row.sid==JZY.store.state.session.sid) && (scope.row.isShowTitle=true)" class="schedule-show-title" style="margin-left:30px;font-size:12px;" v-model="scope.row.isShowTitle">{{l('showTitle')}}</el-checkbox>&ndash;&gt;-->

                <!--&lt;!&ndash;</span>&ndash;&gt;-->

                <!--&lt;!&ndash;&lt;!&ndash;{{&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;JSON.stringify(scope.row)&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;}}&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->

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
            <div slot="operateButtons" style="display:inline-block;position:absolute;right:0;">

                <!--<div style="display:inline-block;float:right;">-->
                <el-button :disabled="isSaving" v-if="'DETAIL'!=scheduleDialogMode" @click="submitNewScheduleDialog()" size="small">{{l('{global.'+(isSaving?'saving':'save')+'}')}}</el-button>

                <el-button v-if="'DETAIL'==scheduleDialogMode && form.delete==true"
                           @click="modifySchedule()"
                           size="small">{{l('modifySchedule')}}</el-button>

                <!--<el-button v-if="'DETAIL'==scheduleDialogMode"-->
                           <!--@click="JZY.s.unDisabledAllInput($refs.form.$el);scheduleDialogMode='UPDATE';updateTypeWhenEdit='1';"-->
                           <!--size="small">{{l('modifyCurrentSchedule')}}</el-button>-->

                <!--<el-button v-if="'DETAIL'==scheduleDialogMode && form.isRepeat==true"-->
                           <!--@click="JZY.s.unDisabledAllInput($refs.form.$el);scheduleDialogMode='UPDATE';updateTypeWhenEdit='0';"-->
                           <!--size="small">{{l('modifyAllSchedule')}}</el-button>-->

                <el-button type="danger" v-if="'DETAIL'==scheduleDialogMode && form.delete==true" size="small" @click="dropSchedule()">{{l('deleteSchedule')}}</el-button>
                <!--<el-button v-if="'DETAIL'==scheduleDialogMode && form.isRepeat==true && form.delete==true" size="small" @click="dropSchedule(0)">{{l('deleteAll')}}</el-button>-->
                <el-button @click="$refs.addScheduleDialog.handleClose()" size="small">{{l('{global.close}')}}</el-button>
                <!--</div>-->

                <!--</ul>-->
            </div>
            <div class="record" v-if="addNewScheduleDialogVisible">

                <task-detail v-if="currentViewTask" :taskId = "currentViewTask.taskId"></task-detail>


                <el-form :disabled="'DETAIL'==scheduleDialogMode" v-if="!currentViewTask"
                         :class="{'detail-form':'DETAIL'==scheduleDialogMode}" ref="form"
                         :model="form" :rules="rules" :label-width="JZY.IS_CC?'80px':'120px'">
                    <!--<el-form-item size="small" :label="l('scheduleTitle')" prop="scheduleTitle">-->
                    <el-form-item size="small" :label="l('scheduleTitle')" prop="scheduleTitle">
                        <el-input :placeholder="l('{global.pleaseInput}{scheduleTitle}')" v-model="form.scheduleTitle"></el-input>
                    </el-form-item>


                    <el-form-item size="small" :label="l('{g.startEndTime}')" prop="startEndTime">
                        <el-date-picker
                                style="width:100%;"
                                v-model="form.startEndTime"
                                :picker-options="pickerOptions"
                                type="datetimerange"
                                :start-placeholder="l('{g.beginTime}')"
                                :end-placeholder="l('{global.endTime}')"
                                >
                        </el-date-picker>
                    </el-form-item>





                    <!--<el-form-item size="small" :label="l('{g.beginTime}')" prop="beginTime">-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--<el-date-picker type="datetime" v-model="form.beginTime" style="width: 100%;"></el-date-picker>-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col class="line" :span="2">-</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--</el-form-item>-->
                    <!--<el-form-item size="small" :label="l('{global.endTime}')" prop="endTime">-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--<el-date-picker type="datetime" v-model="form.endTime" style="width: 100%;"></el-date-picker>-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col class="line" :span="2">-</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--</el-form-item>-->

                    <el-form-item size="small" :label="l('{g.remind}')" prop="advanceTime">
                        {{l('beforeStart')}}

                        <el-select v-model="form.advanceTime" >
                            <el-option
                                    v-for="(item,index) in dicts.sysDictionaryList" :key="index" :label="item.dicFid" :value="item.dicFid"></el-option>
                        </el-select>
                        <!--sysDictionaryList-->


                        <!--<el-input-number type="number" :min="5" style="width:200px;"  v-model.number="form.advanceTime"></el-input-number>-->
                        {{l('{g.minute}')}}
                    </el-form-item>

                    <el-form-item size="small"v-show="'DETAIL'==scheduleDialogMode && (!form.isRepeat)" :label="l('eventLoop')" prop="isRepeat">
                        不重复
                    </el-form-item>
                    <div :style="form.isRepeat?{border:'DETAIL'!=scheduleDialogMode?'dashed 1px lightgray':'none',marginBottom:'20px'}:{}">
                        <el-form-item size="small" :label="l('eventLoop')" prop="isRepeat">
                            <el-checkbox :disabled="!canRepeat" v-show="'DETAIL'!=scheduleDialogMode" v-model="form.isRepeat">{{l('loop')}}</el-checkbox>

                            <span v-show="'DETAIL'==scheduleDialogMode">{{form.repetitionResult||'无'}}</span>

                            <!--<el-input :placeholder="l('{global.pleaseInput}{address}')" v-model="form.address"></el-input>-->
                        </el-form-item>



                        <div v-show="form.isRepeat && 'DETAIL'!=scheduleDialogMode" :style="{marginTop:'DETAIL'==scheduleDialogMode?'20px':'0'}">
                            <el-form-item size="small" :label="l('loop')">

                                <!--<span style="display:none;">{{canRepeat}}</span>-->
                                <el-select v-model="form.repetitionFrequency" >
                                    <el-option
                                            v-if="item.visible"
                                            v-for="(item,index) in loopSelect" :key="index" :label="l('{g.every}')+item.str" :value="''+index"></el-option>
                                </el-select>

                            </el-form-item>

                            <el-form-item size="small" :label="l('{g.end}')">

                                <el-select v-model="form.endFrequency" >
                                    <el-option
                                            v-for="(item,index) in l('endFrequencySelect')" :key="index" :label="item" :value="''+index"></el-option>
                                </el-select>

                            </el-form-item>

                            <el-form-item size="small"v-if="form.endFrequency==1" :label="l('frequency')">
                                <el-input-number :min="1" :controls="false" :max="30" style="width:80px;margin-right:5px;" v-model.number="form.endFrequencyNum">

                                </el-input-number>{{l('timesLater')}}
                            </el-form-item>
                            <el-form-item size="small"v-if="form.endFrequency==2" :label="l('until')">
                                <el-date-picker type="datetime" v-model="form.endFrequencyTime" style="width: 100%;"></el-date-picker>


                            </el-form-item>
                        </div>
                    </div>

                    <el-form-item size="small"label="共享人员">


                        <!--res.scheduleSharedParam._personList=res.scheduleSharedParam.personList.map((item)=>({sid:item.sharedShowId}))-->
                        <!--res.scheduleSharedParam._roleList=res.scheduleSharedParam.roleList.map((item)=>({roleId:item.sharedShowId}))-->
                        <!--res.scheduleSharedParam._departmentList=res.scheduleSharedParam.departmentList.map((item)=>({sid:item.sharedShowId}))-->


                        <span v-if="isNoopSharedPersonInForm && 'DETAIL'==scheduleDialogMode">无</span>

                        <group-tree
                                ref="groupTree"
                                :selectedDeptsToTree="form.scheduleSharedParam._departmentList"
                                :selectedRolesToTree="form.scheduleSharedParam._roleList"
                                :selectedUsersToTree="form.scheduleSharedParam._personList"
                                @getDataFromGroupTree="getDataFromGroupTree"
                        >

                        </group-tree>
                    </el-form-item>

                    <!--<el-form-item size="small" :label="l('sharedPeople')">-->
                    <!--sharedPeople-->
                    <!--</el-form-item>-->




                    <el-form-item size="small" :label="l('place')" prop="address">

                        <el-input maxlength="100" :placeholder="l('{global.pleaseInput}{place}')" v-model="form.address"></el-input>
                    </el-form-item>

                    <el-form-item size="small" :label="l('scheduleDetails')" prop="scheduleDetails">
                        <el-input v-model="form.scheduleDetails" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                    </el-form-item>


                </el-form>

            </div>
        </right-slide-modal>


        <div v-if="isFullCalendarReady">

            <div style="padding-top:20px;padding-bottom:20px;">
                <div style="width:82.3%;display:inline-block;">
                    <el-row>

                        <el-col :span="8">
                            <el-radio-group style="position:relative;top:-2px;" size="small" v-model="d_w_y">
                                <el-radio-button label=".fc-agendaDay-button">{{getText('.fc-agendaDay-button')}}</el-radio-button>
                                <el-radio-button label=".fc-agendaWeek-button">{{getText('.fc-agendaWeek-button')}}</el-radio-button>

                                <el-radio-button label=".fc-month-button">{{getText('.fc-month-button')}}</el-radio-button>
                            </el-radio-group>
                            <el-button style="margin-left:25px;" size="small" :disabled="isToday" @click="handleTodayClick()" type="primary">{{getText('.fc-today-button')}}</el-button>
                        </el-col>
                        <el-col :span="8" style="text-align:center;margin-top:5px;">

                            <div style="display:inline-block;">
                                <i class="icon20 el-icon-arrow-left" @click="handleNextMonthClick('prev')"></i>
                                <span style="position:relative;top:-2px;">{{fcCenterText}}</span>
                                <i class="icon20 el-icon-arrow-right" @click="handleNextMonthClick('next')"></i>
                            </div>
                        </el-col>
                        <el-col :span="8" style="">

                            <div style="display:inline-block;float:right;margin-top:5px;margin-right:20px;">
                                <el-checkbox @change="updateEventsVisibleConfig" v-model="isShowAgenda">{{l('{scheduleLocale.agenda}')}}</el-checkbox>
                                <el-checkbox @change="updateEventsVisibleConfig" v-model="isShowTask">{{l('{scheduleLocale.task}')}}</el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="width:17.6%;float:right;text-align:right;">

                    <!--<div style="display:inline-block;">-->
                        <el-button v-popover:shareBtnTitle @click="$refs.xxxTree.blendTreeDialogShow()" size="small"><i class="el-icon-share"></i></el-button>
                        <!--<el-button @click="showUserTreeOnly=true" size="small">{{l('{scheduleLocale.shareSchedule}')}}</el-button>-->


                    <el-popover
                            ref="shareBtnTitle"
                            placement="left"
                            trigger="hover"
                            width="70"
                            >

                        <!--{{l('{scheduleLocale.shareSchedule}')}}-->
                        <div style="text-align: center;">{{l('{scheduleLocale.shareSchedule}')}}</div>



                    </el-popover>
                    <el-popover
                            ref="addNewAgendaTitle"
                            placement="left"
                            trigger="hover"
                            width="70"

                    >

                        <div style="text-align: center;">{{l('{scheduleLocale.addNewAgenda}')}}</div>
                            <!--{{l('{scheduleLocale.addNewAgenda}')}}-->


                    </el-popover>


                        <el-popover
                                ref="shareHelpPopOver"
                                placement="left"
                                trigger="hover"
                                width="300">

                            <p>

                                {{l('shareHelpInf')}}
                            </p>

                        </el-popover>

                        <i style="margin-right:10px;margin-left:10px;" v-popover:shareHelpPopOver class="el-icon-question theme-font icon20"></i>
                        <!--<el-button v-popover:popover5>删除</el-button>-->


                        <!--<el-popover-->
                        <!--ref="shareHelpPopOver"-->
                        <!--placement="top-start"-->
                        <!--placement="left"-->
                        <!--width="200"-->
                        <!--trigger="hover">-->

                        <!--{{l('shareHelpInf')}}-->

                        <!--</el-popover>-->

                        <!--<i v-popper:shareHelpPopOver class="el-icon-question theme-font icon20"></i>-->



                        <el-button v-popover:addNewAgendaTitle ref="addNewAgendaBtn" @click="addBlankSchedule()" size="small" type="primary">
                            <i class="el-icon-plus"></i></el-button>
                    <!--</div>-->

                </div>
            </div>






        </div>
        <div style="position:relative;overflow:hidden;">
            <!--max-height:calc(100% - 73.5px);-->

            <div style="display:inline-block;width:82.3%;overflow-y:auto;" :span="20">
                <div ref="jqFullCalendarWrapper" style="height:100%;">

                </div>
            </div>
            <div style="position:absolute;display:inline-block;width:17.6%;height:100%;overflow-y:auto;" :span="4" class="right-member-wrapper">

                <div style="width:100%;margin:0 auto;position:relative;padding-left:10px;box-sizing:border-box;overflow-x:hidden;">
                    <div style="position:absolute;top:112px;height:1px;width:100%;background:#dcdfe6;z-index:1;"></div>
                    <!--<div v-if="rightPeopleData.length==0">-->
                        <!--暂无任何数据-->
                    <!--</div>-->


                    <el-table border :data="rightPeopleData" max-width="100%" min-width="100%">
                        <el-table-column label="所有成员" min-width="100%" max-width="100%">
                            <template slot-scope="scope">
                                <div v-if="scope.$index==0">
                                    <el-input @focus="handleInputFocus" clearable @clear="querySharedCreatePersonList({sharedShowName:searchedMemberName})" v-model="searchedMemberName"
                                              :maxlength="100"
                                              style="width:106%;position:relative;left:-3%;margin-bottom:25px;margin-top:10px;" :placeholder="l('searchMember')">
                                        <el-button v-if="!isSearchingMember" @click="querySharedCreatePersonList({sharedShowName:searchedMemberName})" slot="append" icon="el-icon-search"></el-button>
                                        <i v-if="isSearchingMember" slot="append" class="el-icon-loading"></i>
                                    </el-input>
                                </div>
                                <div v-if="rightPeopleData.length==1 && scope.row.sharedShowName==null">暂未搜索到任何用户</div>
                                <div v-if="scope.row.sharedShowName!=null" @click="(scope.row.isChoosed=!scope.row.isChoosed)">
                                <!--<div @click="rightPeopleData.length==1 && (JZY.u.warningMsg('至少保留一位成员')) || (rightPeopleData.length>1 && (scope.row.isChoosed=!scope.row.isChoosed))">-->
                                    <el-row class="right-people-row" style="height:50px;cursor:pointer;">
                                        <el-col :span="6" style="text-align:center;line-height:50px;">
                                            <img src="/static/images/logo.png" style="position:relative;top:7.5px;display:block;margin:0 auto;width:35px;height:35px;">
                                        </el-col>
                                        <el-col :title="scope.row.sharedShowName" :span="12" style="text-align:center;line-height:50px;
max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;

">

                                            {{scope.row.sharedShowName}}

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


            </div>
        </div>









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
        <!--&lt;!&ndash; -&#45;&#45;{{$refs.jqFullCalendarWrapper?$refs.jqFullCalendarWrapper.currentMonth.locale($refs.jqFullCalendarWrapper.locale).format('MMMM YYYY'):''}}&ndash;&gt;-->
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


    /* 改造 */

    .fc-agendaWeek-view .fc-week-number.fc-widget-header{

        width:45px !important;
    }


    .fc-agendaWeek-view .fc-week-number.fc-widget-header.fc-axis div{
        font-size:12px;
    }



    .fc-toolbar
    .fc-left{


        position:
                absolute;


        top:
                0;


        left:
                0;


        float:
                none;


    }





    .fc
    table
    >
    thead
    >
    tr
    >
    th
    div{


        font-weight:
                bold;


        /*color:#46A7FF;*/
                /*#25992E;*/


        font-size:12px;


    }





    .fc-sat
    span,.fc-sun
    div{


        /*color:*/
                /*#46A7FF !important;*/
                /*#ED6D23 !important;*/


    }





    .fc-ltr
    .fc-basic-view
    .fc-day-top
    .fc-day-number{


        width:
                100%;


        text-align:
                right;


        display:
                block;


        font-size:
                20px;


        font-family:
                Arial;


        font-weight:
                600;


        padding:
                12px
                12px
                0
                12px;


        line-height:
                23px;


        height:
                23px;


        color:
                #555;


    }





    .fc-day-cnTerm{


        text-align:
                right;


        padding:
                12px
                12px
                0
                12px;


        /*color:*/
                /*#6ABA49;*/


        font-size:
                12px;


    }





    .fc-day-cnDate{


        text-align:
                right;


        padding:
                12px
                12px
                0
                12px;


        color:
                #999;


        font-size:
                12px;


    }


    .schedule-body .el-popover{
        min-width:50px !important;
    }

    .schedule-body .select_user .el-col-11:nth-child(1) li:nth-child(2){
        display:none;
    }

    .schedule-show-title .el-checkbox__label{
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

    /*.fc-scroller{*/
        /*max-height:60%;*/
    /*}*/


    .fc-component-wrapper{


        .blend_tree_wrap{
            display:none;
        }
        .el-input__suffix-inner .el-input__clear{

            /*opacity:0.3;*/
        }

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
            cursor:pointer;
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


    /*@import "../../static/fullCalendar/fullcalendar.css";*/
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

    .fc-ltr .fc-basic-view .fc-day-top .fc-day-number{
        display: inline;
        width: auto;
        float: left !important;
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
    // require('@/plugins/fullcalendar/locale.js')
    // import '@/plugins/test.js'


    // require('@plugins/fullcalendar/locale.js')
    //
    // import '@plugins/test.js'

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
            document.body.classList.add('schedule-body')
            this.formCopy=JZY.u.copy(this.form)
            await JZY.s.getScript('/static/fullCalendar/lunar.js')
            await JZY.s.getScript('/static/fullCalendar/fullcalendar.js')
            await JZY.s.getScript('/static/fullCalendar/locale.js')
            JZY.xhr.requestPromises([
                JZY.xhr.r('/sys/common/getSysTime','GLOBAL.TEST.WANG_TAO'),
                //查询右上角共享弹出的dailog我共享给别人的列表
                JZY.xhr.r({type:'post',url:'/schedule/querySharedCalendar'}),
                JZY.xhr.callInterfaceAndSetData({url:'/schedule/querySysDictionaryList',type:'post'},this.dicts,'sysDictionaryList'),

                this.queryScheduleList(this.scheduleQueryParams,true),
                //查询右侧共享给我的人列表
                this.querySharedCreatePersonList({},true)
                // ,
                // this.querySharedCalendar()
            ])
                .then(async ([[time],[{personList}],[sysDictionaryList],scheduleList
                                 // ,[shareList]
                             ])=>{


                    console.log('kcuf_u scheduleList-:',scheduleList,time);


                    (personList||[]).forEach((item)=>{
                        item.sid=item.sharedShowId
                        // item.nodeId=item.sharedShowId
                        item.name=item.sharedShowName
                        item.scheduleTitleShow=item.isShowTitle==0?true:false
                    })

                    this.sharedCalendarPeoples={
                        userList:(personList||[])
                    }

                    this.isReady=true


                    // this.currentServerTime='2019-03-29 14:22:30'
                    this.currentServerTime=time
                    this.currentMonth=time.split('-').slice(0,2).join(',')
                    // alert(this.currentMonth)






                    JZY.call(this,'setCurrentVM')

                    await JZY.u.waiting()
                    let self=this;
                    let lan=(await JZY.locale.getCurrentLanguage()).toLowerCase();
                    let str=await JZY.u.waiting();
                    (function($){
                        // alert($)
                        // setTimeout(()=>{
                        //     alert(self.$refs.jqFullCalendarWrapper)
                        // })

                        let $jqFullCalendarWrapper=$(self.$refs.jqFullCalendarWrapper)
                        console.log('self.$refs.jqFullCalendarWrapper--:',self.$refs.jqFullCalendarWrapper)
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

                            select:function(start, end,e){

                                console.log('select arguments---:',e.target,e.currentTarget,e.target.classList)


                                // alert(new Date(end.toString())-new Date(start.toString()))
                                // alert(JZY.u.formatTime(new Date(start.toString())).split(' ')[0]
                                //     ==JZY.u.formatTime(new Date(end.toString())).split(' ')[0])


                                console.log("start and end:",
                                    JZY.u.formatTime(new Date(start.toString())),
                                    JZY.u.formatTime(new Date(end.toString()),
                                        new Date(start.toString()),
                                        new Date(start.toString()).getTime(),
                                        new Date(end.toString())-new Date(start.toString())
                                    )
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
                                    else if(['.fc-content-skeleton=>.fc-content-skeleton',
                                        '.fc-day,.fc-widget-content,.fc-mon,.fc-today=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-mon,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-tue,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-wed,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-thu,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-fri,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-sat,.fc-future=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-sun,.fc-future=>.fc-highlight',
                                        ".fc-day,.fc-widget-content,.fc-mon,.fc-past=>.fc-highlight",
                                        '.fc-day,.fc-widget-content,.fc-tue,.fc-past=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-wed,.fc-past=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-thu,.fc-past=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-fri,.fc-past=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-sat,.fc-past=>.fc-highlight',
                                        '.fc-day,.fc-widget-content,.fc-sun,.fc-past=>.fc-highlight',

                                    ].includes(JZY.s.TARGET_CLASS_CHANGE_PATH)){
                                        startTime=startTime.split(' ')[0]+' 00:00:00'
                                        endTime=endTime.split(' ')[0]+' 23:59:59'
                                    }


                                    // else if(self.d_w_y=='.fc-month-button'){
                                    //     startTime=startTime.split(' ')[0]+' 08:00:00'
                                    //     endTime=startTime.split(' ')[0]+' 18:00:00'
                                    // }


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




                        console.log('fc config:',fcConfig)

                        $jqFullCalendarWrapper.fullCalendar(fcConfig);
                        setTimeout(()=>{


                            // self.$nextTick(()=>{




                            //
                            self.refreshEventDom(scheduleList)

                            setTimeout(()=>{
                                self.isFullCalendarReady=true
                            },50)

                            // setTimeout(()=>{
                            //     self.isFullCalendarReady=true
                            // },1000)
                            self.updateCustomFC()
                            JZY.s.hideLoading()
                            self.fixCalendarHeight()
                            window.addEventListener('resize',self.fixCalendarHeight)

                        })




                        // })

                    })(jQuery);






                    // this.updateCustomFC()




                    // console.log('schedule init promise res:',time,scheduleList,taskList,shareList)
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

                    console.log('res--:',res)
                })
            }
        },
        props:{
            module:{
                type:String,
                default:'SCHEDULE'
            },
            readonly:Boolean,
            scheduleQueryParams:{
                type:Object,
                default:{}
            },
            fullCalendarConfig:Object
        },
        methods:{
            handleInputFocus(event){
              // console.log('focus args:',arguments,jQuery(event.target).closest('.el-input').innerHTML)
              //
              //   setTimeout(()=>{
              //       console.log('focus args:',arguments,jQuery(event.target).closest('.el-input').innerHTML)
              //   },2000)
            },
            // handleIsShowTitleChangeInShareDialog(row){
            //     if(!row.isShowTitle && row.sid==JZY.store.state.session.sid){
            //         JZY.u.warningMsg('当前登录人不可设定不显示标题')
            //         row.isShowTitle=true
            //     }
            //   console.log('row----:',row)
            // },
            fixCalendarHeight(){

                try{
                    this.fcInstance.fullCalendar('option','height',document.documentElement.clientHeight-(JZY.IS_CC?40:100));
                }catch(e){
                    console.warn('fix calendar height e--:',e)
                }
            },

            getDataFromGroupTree(selectedIds){
              console.log('kcuf_u selected ids--:',selectedIds)


                this.form.scheduleSharedParam.personList=selectedIds.userList.map((item)=>({sharedShowId:item.sid}))
                this.form.scheduleSharedParam.roleList=selectedIds.roleList.map((item)=>({sharedShowId:item.roleId}))
                this.form.scheduleSharedParam.departmentList=selectedIds.deptList.map((item)=>({sharedShowId:item.sid}))
            },
            handleNewScheduleDialogClose(){
                this.addNewScheduleDialogVisible=false
                this.currentScheduleId=null
                this.currentViewTask=null;
                this.form=JZY.u.copy(this.formCopy)
            },
            isTask(row){

                return TYPES.TASK.color==row.color
            },
            refreshEventDom(events){
                console.log('this.fcInstance--:',this.fcInstance)
                this.fcInstance.fullCalendar( 'removeEvents');
                this.fcInstance.fullCalendar('addEventSource', events);
            },

            getUserTreeOnly(arr){
                console.log('arr',arr)


                let list=[]
                    // ,
                    // newSelectedList=[]

                JZY.u.copy(arr.userList).forEach((item)=>{
                    list.push({
                        sharedShowId:item.sid,
                        // isShowTitle:0
                        isShowTitle:item.scheduleTitleShow==true?0:1
                    })
                    // newSelectedList.push({
                    //     sid:item.sid,
                    //     name:item.name,
                    //     scheduleTitleShow:
                    // })
                })


                JZY.xhr.post('/schedule/sharedCalendar',{
                    personList:list
                })

                // this.sharedCalendarPeoples={
                //     userList:arr
                // }


            },
            addBlankSchedule(){

                this.scheduleDialogMode='ADD';
                this.addNewScheduleDialogVisible=true;
                this.$nextTick(function(){
                    JZY.s.unDisabledAllInput(this.$refs.form.$el);
                    this.$refs.form.resetFields();
                });
            },

            showDropOrModifyDialog(type){
                let self=this
                const h = this.$createElement;
              return new Promise((resolve)=>{
                  this.$msgbox({
                      title: `您正在${type=='modify'?'修改':'删除'}重复事件`,
                      message: h('div', null, [
                          h('div',null,'您要'+(type=='modify'?'修改':'删除')+'整个重复事件，还是只删除今天的该事件'),
                          h('div',{
                              style:{
                                  'text-align':'right',
                                  'margin-top':'30px'
                              }
                          },[
                              h('el-button',{
                                  attrs:{
                                      size:'mini',
                                      type:'primary'
                                  },
                                  on:{
                                      click:function(){
                                          self.$msgbox.close()
                                          resolve('all')
                                      }
                                  }
                              },type=='modify'?'修改整个重复事件':'删除整个重复事件'),
                              h('el-button',{
                                  attrs:{
                                      size:'mini'
                                  },
                                  on:{
                                      click:function(){
                                          self.$msgbox.close()
                                          resolve('today')
                                      }
                                  }
                              },type=='modify'?'仅修改当前':'仅删除当前'),
                              h('el-button',{
                                  attrs:{
                                      size:'mini'
                                  },
                                  on:{
                                      click:function(){
                                          self.$msgbox.close()
                                      }
                                  }
                              },'取消'),
                          ]),

                      ]),
                      showCancelButton: false,
                      showConfirmButton:false,

                  })
              })
            },

            async modifySchedule(){
                let res
                if(this.form.isRepeat){
                    res=await this.showDropOrModifyDialog('modify')
                }else{
                    res='today'
                }
                JZY.s.unDisabledAllInput(this.$refs.form.$el);
                this.scheduleDialogMode='UPDATE';
                this.updateTypeWhenEdit=res=='today'?'1':'0';
            },
            async dropSchedule(updateType){
                // form.isRepeat==true

                let res
                if(this.form.isRepeat){
                    res=await this.showDropOrModifyDialog('drop')
                }else{
                    res='today'
                }

                    // .then((res)=>{
                let promise=JZY.u.warningMsg(l('{g.areYouConfirm}')+l(res!='all'?'deleteToday':'deleteAll')+l('{g.questionMark}'),true)


                console.log('promise--:',promise)

                promise.then(()=>{
                    JZY.xhr.post('/schedule/delete',{
                        updateType:res=='today'?'1':'0',
                        scheduleId:this.currentScheduleId,
                        isRepeat:this.form.isRepeat==true?0:1
                    })
                        .then(async ()=>{
                            let index=this.scheduleList.findIndex((item)=>{
                                return this.currentScheduleId==item.scheduleId
                            })




                            // this.scheduleList.splice(index,1)

                            this.addNewScheduleDialogVisible=false

                            let list=await this.refreshCurrentMonthSchedule()
                            this.updateEventsVisibleConfig()

                            // this.updateEventsVisibleConfig()





                        })
                })
                    // })
                // return false




            },
            queryScheduleDetailById(id,obj){
                return JZY.xhr.request({
                    type:'post',
                    url:'/schedule/queryScheduleDetails',
                    data:{
                        scheduleId:id,
                        beginTime:obj.beginTime,
                        endTime:obj.endTime
                    }
                }).then(([res])=>{

                    res.startEndTime=[new Date(res.beginTime),new Date(res.endTime)]

                    res.scheduleSharedParam=JZY.u.copy(res.scheduleSharedDto)

                    res.scheduleSharedParam._personList=res.scheduleSharedDto.personList.map((item)=>({sid:item.sharedShowId,name:item.sharedShowName}))
                    res.scheduleSharedParam._roleList=res.scheduleSharedDto.roleList.map((item)=>({roleId:item.sharedShowId,roleName:item.sharedShowName}))
                    res.scheduleSharedParam._departmentList=res.scheduleSharedDto.departmentList.map((item)=>({sid:item.sharedShowId,name:item.sharedShowName}))

                    if(!JZY.u.isNull(res.endFrequencyTime &&(new Date(res.endFrequencyTime).getTime()!=0))){
                        res.endFrequencyTime=new Date(res.endFrequencyTime)
                    }
                    if(new Date(res.endFrequencyTime).getTime()==0){
                        res.endFrequencyTime=''
                    }

                    //     ,scheduleSharedParam:{
                    //     personList:[],
                    //         roleList:[],
                    //         departmentList:[]
                    // }


                    res.isRepeat=res.isRepeat==0?true:false

                    this.form=res

                    // this.currentViewScheduleData=res
                    this.scheduleDialogMode='DETAIL'

                    this.addNewScheduleDialogVisible=true

                    this.$nextTick(()=>{
                        JZY.s.disabledAllInput(this.$refs.form.$el)
                    })





                    console.log('res--:',res)
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
                console.log('refresh current month was invoked')

                let from=this.getPrevMonthOrNextMonthByCurMonth(this.currentMonth,-1),
                    to=this.getPrevMonthOrNextMonthByCurMonth(this.currentMonth,2),
                    startTime=this.getFirstDayTimeByCurMonth(from),
                    endTime=this.getFirstDayTimeByCurMonth(to)


                return this.queryScheduleList({
                    beginTime:startTime,
                    endTime:endTime
                }).then((events)=>{
                    this.updateEventsVisibleConfig()
                    // this.refreshEventDom(events)

                })

            },
            queryScheduleListByCurMonth(lastMonth,monthStep){


                console.log('last month and month step:',lastMonth,monthStep)



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




                console.log("cur---:",curMonth,startTime,endTime)
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



                // console.log('start and end time4:',curMonth,targetMonth,startTime,endTime)

                this.queryScheduleList({
                    beginTime:startTime,
                    endTime:endTime
                }).then((events)=>{
                    this.updateEventsVisibleConfig()
                    // this.refreshEventDom(events)

                })
            },
            handleNextMonthClick(type){




                this.getDOM('.fc-'+type+'-button').click();
                this.setFCCenterText();
                this.$nextTick(()=>{
                    this.updateIsToday()


                    // if(this.rightPeopleData.every((item)=>item.isChoosed==false)){
                    //     this.fcInstance.fullCalendar( 'removeEvents');
                    //     return false
                    // }


                    this.queryScheduleListByCurMonth(this.currentMonth,type=='next'?2:-1)




                    // let date=this.getCurrentSelectedDate()

                })
            },
            // 右侧
            querySharedCreatePersonList(body={},isFirstLoad=false){
                this.isSearchingMember=true
                let time=Date.now()
                return JZY.xhr.r({
                    type:'post',
                    url:'/schedule/querySharedCreatePersonList',
                    data:body
                })
                    .then(([rightPeopleData])=>{

                        setTimeout(()=>{this.isSearchingMember=false},Date.now()-time)


                        if(this.searchedMemberName.trim()=='' && (!rightPeopleData.find((item)=>item.sharedShowId==JZY.store.state.session.sid))){
                            rightPeopleData.unshift({
                                imUserId:null,
                                resourceImgUrl:JZY.store.state.session.userInfo.resourceImgUrl,
                                sharedShowId:JZY.store.state.session.sid,
                                sharedShowName:'我'
                            })
                        }
                        if(!isFirstLoad){
                            if(this.searchedMemberName.trim()!=''){
                                // let index=rightPeopleData.findIndex((item)=>item.sharedShowId==JZY.store.state.session.sid)
                                // if(index!=-1){
                                //     rightPeopleData.splice(index,1)
                                // }
                            }else{
                                if(!rightPeopleData.find((item)=>item.sharedShowId==JZY.store.state.session.sid)){
                                    rightPeopleData.unshift({
                                        imUserId:null,
                                        resourceImgUrl:JZY.store.state.session.userInfo.resourceImgUrl,
                                        sharedShowId:JZY.store.state.session.sid,
                                        sharedShowName:'我'
                                    })
                                }
                            }

                        }

                        // searchedMemberName
                        // if(rightPeopleData.length==0){
                        //     JZY.u.warningMsg('系统没有找到该用户')
                        //     return false
                        // }

                        // if(!window.aaaa){
                        //     rightPeopleData=[{"sharedShowId" :"100349","sharedShowName" :"我","resourceImgUrl" :null,"imUserId" :null,"isChoosed" :true},
                        //         {"sharedShowId" :"1003499","sharedShowName" :"我a","resourceImgUrl" :null,"imUserId" :null,"isChoosed" :true}
                        //     ]
                        //     window.aaaa=true
                        // }else{
                        //
                        //     rightPeopleData=[{"sharedShowId" :"1003488","sharedShowName" :"我aaaa","resourceImgUrl" :null,"imUserId" :null,"isChoosed" :true},
                        //         // {"sharedShowId" :"1003499","sharedShowName" :"我a","resourceImgUrl" :null,"imUserId" :null,"isChoosed" :true}
                        //     ]
                        // }

                        // this.sharedCreatePersonList=sharedCreatePersonList

                        //
                        // let rightPeopleData=[
                        //     {
                        //         "sharedShowId" :"mock",
                        //         "sharedShowName" :"mock"
                        //     },{
                        //         "sharedShowId" :"mock",
                        //         "sharedShowName" :"mock"
                        //     }
                        // ]
                        // rightPeopleData[0].isChoosed=true
                        
                        let previousChoosedRightPeopleData=JZY.u.copy(this.rightPeopleData.filter((item)=>item.isChoosed==true)),
                            handledRightPeopleData=[]
                        rightPeopleData.forEach((item,index)=>{





                            item.isChoosed=false

                            // item.isChoosed=index==0

                            let findedItemInPreviouseData=previousChoosedRightPeopleData.find((prevItem)=>prevItem.sharedShowId==item.sharedShowId)

                            if(!findedItemInPreviouseData){
                                item.isChoosed=false
                                handledRightPeopleData.unshift(item)
                            }
                            if(isFirstLoad){
                                item.isChoosed=item.sharedShowId==JZY.store.state.session.sid
                            }
                            // else{
                            //     handledRightPeopleData.push(item)
                            // }

                        })
                        rightPeopleData=handledRightPeopleData.concat(previousChoosedRightPeopleData)



                        if(rightPeopleData.length==0){
                            rightPeopleData.unshift({
                                imUserId:null,
                                resourceImgUrl:null,
                                sharedShowId:null,
                                sharedShowName:null
                            })
                        }



                        //把我排列在第一个元素
                        let myIndex=rightPeopleData.findIndex((item)=>item.sharedShowId==JZY.store.state.session.sid)
                        if(myIndex!=-1){
                            let myObj=JZY.u.copy(rightPeopleData[myIndex])
                            rightPeopleData.splice(myIndex,1)
                            rightPeopleData.unshift(myObj)
                        }


                        this.rightPeopleData=rightPeopleData
                            // .concat(JZY.u.copy(rightPeopleData))


                        return rightPeopleData

                    })
                    .catch(()=>{
                        setTimeout(()=>{this.isSearchingMember=false},Date.now()-time)
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
                                createPersonId:item.sharedShowId
                            })
                        }


                    })

                    return res

                })(this.rightPeopleData);

                if(isFirstLoad){
                // if(isFirstLoad && !body.createPersonList.find((item)=>item.createPersonId==JZY.store.state.session.sid)){
                    body.createPersonList.unshift({
                        createPersonId:JZY.store.state.session.sid
                    })
                }


                return JZY.xhr.r({
                    type:'post',
                    url:'/schedule/queryScheduleList',
                    data:body
                })
                    .then(([res])=>{


                        let {scheduleList,taskList}=res

                        let data=[]


                        function getTitle(titleKey,item){
                           let name='['+(JZY.store.state.session.name==item.createPersonName?'我':item.createPersonName)+'] '

                            if(item.isShowTitle=='1'){
                               return name+'占用'
                            }


                            return name+item[titleKey]
                        }

                        //
                        scheduleList.forEach((item)=>{
                            data.push({
                                title:getTitle('scheduleTitle',item),
                                start:item.beginTime,
                                end:item.endTime,
                                ...item,
                                VM:this,
                                ...TYPES.AGENDA

                                // title: 'All Day Event',
                                // start: '2018-03-01',
                            })
                        })

                        taskList.forEach((item)=>{
                            data.push({
                                title:getTitle('taskName',item),
                                start:item.beginTime,
                                end:item.endTime,
                                ...item,
                                VM:this,
                                ...TYPES.TASK

                                // title: 'All Day Event',
                                // start: '2018-03-01',
                            })
                        })



                        this.scheduleList=data


                        console.log('query schedule list was invoked')



                        return data




                        // return res
                    })

            },
            submitNewScheduleDialog(){






                // if('ADD'==scheduleDialogMode){
                this.$refs.form.validate((valid)=>{

                    if(!JZY.u.isNull(this.form.endFrequencyTime) && (!JZY.u.isNull(this.form.startEndTime))){

                        if(this.form.endFrequencyTime.getTime()<this.form.startEndTime[0].getTime()){


                            JZY.u.warningMsg(JZY.locale.$t('loopEndTimeCannotLessThanScheduleStartTime'))
                            return false
                        }
                    }



                    console.log('valid--:',valid)
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


                        console.log('data---:',data)


                        delete data.startEndTime


                        if(this.scheduleDialogMode=='UPDATE'){
                            data.updateType=this.updateTypeWhenEdit
                            data.scheduleId=this.currentScheduleId
                        }


                        this.isSaving=true
                        JZY.xhr.post(this.scheduleDialogMode=='UPDATE'?'/schedule/update':'/schedule/save',data)
                            .then(async ()=>{
                                this.addNewScheduleDialogVisible=false


                                // await JZY.u.waiting(2000)
                                let list=await this.refreshCurrentMonthSchedule()
                                this.updateEventsVisibleConfig()
                                // this.refreshEventDom(list)
                                // this.queryScheduleList()



                                this.isSaving=false
                            })
                            .catch(()=>{
                                this.isSaving=false
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
                // console.trace()
                return   (this.$refs.jqFullCalendarWrapper).querySelector(selector)
            },
            getText(selector){
                return this.getDOM(selector).innerText
            },

            goPrev () {
                var newMonth = moment(this.$refs.jqFullCalendarWrapper.currentMonth).subtract(1, 'months').startOf('month');
                this.$refs.jqFullCalendarWrapper.emitChangeMonth(newMonth);
            },
            goNext () {
                var newMonth = moment(this.$refs.jqFullCalendarWrapper.currentMonth).add(1, 'months').startOf('month');
                this.$refs.jqFullCalendarWrapper.emitChangeMonth(newMonth);
            },

            'changeMonth' (start, end, current) {
                this.calendarTitle=this.$refs.jqFullCalendarWrapper.currentMonth.locale(this.$refs.jqFullCalendarWrapper.locale).format('MMMM YYYY')
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
            // 'form.isRepeat':function(nv,ov){
            //     if(this.form.startEndTime=='' && nv){
            //
            //         JZY.u.warningMsg('请先选择日程起止时间')
            //         this.form.isRepeat=false
            //     }
            //   // console.log('form is repeat has changed:',nv,ov)
            // },
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
                                this.updateEventsVisibleConfig()
                                // this.refreshEventDom(events)

                            })
                    }


                    // console.log("nv and ov:",nv,ov)

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
                        let obj=document.querySelector('.fc-time-grid-container');

                        (function($){
                            try{


                            // <el-radio-button label=".fc-agendaDay-button">{{getText('.fc-agendaDay-button')}}</el-radio-button>
                            //     <el-radio-button label=".fc-agendaWeek-button">{{getText('.fc-agendaWeek-button')}}</el-radio-button>
                            //
                            //     <el-radio-button label=".fc-month-button">{{getText('.fc-month-button')}}</el-radio-button>

                                if(value=='.fc-agendaWeek-button'){
                                    obj.scrollTop=$('.fc-agendaWeek-view .fc-title').offset().top-$('.fc-agendaWeek-view').offset().top

                                }else if(value=='.fc-agendaDay-button'){
                                    obj.scrollTop=$('.fc-agendaDay-view .fc-title').offset().top-$('.fc-agendaDay-view').offset().top
                                }else{
                                    obj.scrollTop=0
                                }
                            }catch(e){
                                obj.scrollTop=0
                            }


                        })(jQuery);


                    }catch(e){}
                })
                // this.setFCCenterText()
            }
        },
        computed:{
            canRepeat(){

                let res=true
                // return this.loopSelect
                try{
                    if(this.form.startEndTime==''){
                        this.loopSelect.forEach((item)=>item.visible=true)
                        // return this.loopSelect
                    }else{

                        let step=(this.form.startEndTime[1].getTime()-this.form.startEndTime[0].getTime())/1000/86400
                        console.log('kcuf_u step--:',step)
                        this.loopSelect.forEach((item)=>item.visible=false)
                        // if(step>365){
                        //     this.loopSelect.forEach((item)=>item.visible=false)
                        //     // return []
                        // }else
                        
                        
                        if(step>365){
                            JZY.u.warningMsg('日程起止时间跨度超过1年，将不能设置重复')
                            this.form.isRepeat=false
                            res=false
                        }
                        // else{
                        //     this.form.isRepeat=true
                        // }
                        
                        if(step>30){
                            this.loopSelect.filter((item,index)=>index>=(this.form.repetitionFrequency='3')).forEach((item)=>item.visible=true)
                            // return this.loopSelect.slice(this.form.repetitionFrequency='3')
                        }
                        else if(step>7){
                            this.loopSelect.filter((item,index)=>index>=(this.form.repetitionFrequency='2')).forEach((item)=>item.visible=true)
                            // return this.loopSelect.slice(this.form.repetitionFrequency='2')
                        }else{
                            if(JZY.u.formatTime(this.form.startEndTime[1]).split(' ')[0]!=JZY.u.formatTime(this.form.startEndTime[0]).split(' ')[0]){
                                this.loopSelect.filter((item,index)=>index>=(this.form.repetitionFrequency='1')).forEach((item)=>item.visible=true)

                            }

                            // if(step>1){
                            //     this.loopSelect.filter((item,index)=>index>=(this.form.repetitionFrequency='1')).forEach((item)=>item.visible=true)
                            //     // return this.loopSelect.slice(this.form.repetitionFrequency='1')
                            // }
                            else{
                                this.loopSelect.forEach((item)=>item.visible=true)
                            }
                        }
                        // return this.loopSelect
                    }
                }catch(e){
                    console.warn('computed loop select e--:',e)
                    // return this.loopSelect
                }


                return res

            },
            isNoopSharedPersonInForm(){

                try{
                    let isNoop=true,
                        str=this.form.scheduleSharedDto
                    for(var i in str){
                        if(str[i].length>0){
                            isNoop=false;
                            break;
                        }
                    }
                    return isNoop
                    // return JZY.u.isNull(form.scheduleSharedDto)
                }catch(e){
                    console.log('calculating is noop share--P:',e)
                    return false
                }
            }
            // detailMode(){
            //     return this.scheduleDialogEditingMode==false && this.currentViewScheduleData==null
            // },
            // update
            // calendarTitle () {
            //
            //     // if(!this.$refs.jqFullCalendarWrapper) return;
            //     if (!this.$refs.jqFullCalendarWrapper.currentMonth) return;
            //     alert(this.$refs.jqFullCalendarWrapper.currentMonth.locale(this.$refs.jqFullCalendarWrapper.locale).format('MMMM YYYY'))
            //     return this.$refs.jqFullCalendarWrapper.currentMonth.locale(this.$refs.jqFullCalendarWrapper.locale).format('MMMM YYYY')
            // }
        },
        data(){
            let self=this
            return {
                isSearchingMember:false,
                loopSelect:JZY.locale.$t('loopSelect').map((str,index)=> ({index:index,str:str,visible:true}) ),
                isSaving:false,
                searchedMemberName:'',
                currentViewTask:null,
                isReady:false,
                dicts:{
                    // sysDictionaryList:[]
                },
                pickerOptions:{
                    // disabledDate(date){
                    //     return new Date(date).getTime()+(86400*1000)<new Date(self.currentServerTime).getTime()
                    // }
                },
                updateTypeWhenEditMode:null,
                scheduleList:[],
                currentScheduleId:null,
                isToday:false,
                currentServerTime:JZY.u.formatTime(Date.now()).split('/').join('-'),
                currentMonth:JZY.u.formatTime(Date.now()).split('/').slice(0,2).join(','),
                showUserTreeOnly:false,
                sharedCalendarPeoples:null,//右上角分享按钮数据
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



                    ,repetitionFrequency:'0'
                    ,endFrequency:'1'
                    ,endFrequencyNum:'1'
                    ,endFrequencyTime:''

                    ,scheduleSharedParam:{
                        personList:[],
                        roleList:[],
                        departmentList:[]
                    }

                },
                formCopy:null,

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
        beforeDestroy(){
            document.body.classList.remove('schedule-body')
            window.removeEventListener('resize',self.fixCalendarHeight)
            this.fcInstance.fullCalendar('destroy')
        },

        destroyed(){


        },
        TYPES:TYPES
    }
</script>
