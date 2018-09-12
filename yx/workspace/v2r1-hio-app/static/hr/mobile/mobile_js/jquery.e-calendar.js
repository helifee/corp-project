/**
 * @license e-Calendar v0.9.3
 * (c) 2014-2016 - Jhonis de Souza
 * License: GNU
 */

(function ($) {
    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;
        var retDt = new Array();

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(".c-event-over").removeClass("c-event-over");
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $(".c-event-list").empty();
            todoEventItemList($(".c-event-list"), d);


            //$('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $(".c-event-list").empty();
            //$('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };
        //日期单击事件
        var cell_cilck = function () {
            var day = $(this).find("lable").html();
            if (day.length < 2) {//1位的追加一个0
                day = "0" + day;
            }
            var cilck_date = dYear + "-" + settings.months[dMonth] + "-" + day;
            // var noPunchDto = queryNoPunchApply(cilck_date);
            var records = queryKqApplyInfo(cilck_date);//查询考勤信息
            var sngc = "", sign_start = "--:--", sign_end = "--:--";
            var s1 = $(this).attr("sngc_mark");
            var s2 = $(this).attr("cc_mark");
            var s3 = $(this).attr("qj_mark");
            var s4 = $(this).attr("sign_start_date");
            var s5 = $(this).attr("sign_end_date");
            // alert("sngc_mark:" + s1 + "  "+"cc_mark:" + s2 + "  "+"qj_mark:" + s3 + "  "+"sign_start_date:" + s4 + "  "+"sign_end_date:" + s5);

            if (undefined != $(this).attr("sngc_mark") && $(this).attr("sngc_mark") == "市内公出") {
                // sngc = sngc + " 市内公出 ";
                if (records != null) {
                    var out = records[2];
                    var outLength = out.length;
                    if (outLength !== 0) {
                        for (var i = 0; i < out.length; i++) {
                            sngc += $.hrUtils.getHRCodeNameById(out[i].tripType) + ' ';
                            sngc += out[i].applyTripDays + '天' + ' ';
                            sngc += out[i].applyStartDate.substring(0, 16) + '-';
                            sngc += out[i].applyEndDate.substring(0, 16) + ' ';
                            if (out[i].destroyStatus != null && out[i].destroyStatus != '') {
                                if (out[i].destroyStatus == '1081100725') {//已销假
                                    sngc += '已销假';
                                    sngc += out[i].realTripDays + '天 ';
                                    sngc += out[i].realStartDate.substring(0, 16) + '-';
                                    sngc += out[i].realEndDate.substring(0, 16) + ' ';
                                } else {
                                    //未销假不显示
                                }
                            }
                        }
                    }
                }
            }
            if (undefined != $(this).attr("cc_mark") && $(this).attr("cc_mark") == "出差") {
                // sngc = sngc + " 出差 ";
                if (records != null) {
                    var trip = records[1];
                    var tripLength = trip.length;
                    if (tripLength !== 0) {
                        for (var i = 0; i < trip.length; i++) {
                            sngc += $.hrUtils.getHRCodeNameById(trip[i].tripType) + ' ';
                            sngc += trip[i].applyTripDays + '天' + ' ';
                            sngc += trip[i].applyStartDate.substring(0, 16) + '-';
                            sngc += trip[i].applyEndDate.substring(0, 16) + ' ';
                            if (trip[i].destroyStatus != null && trip[i].destroyStatus != '') {
                                if (trip[i].destroyStatus == '1081100725') {//已销假
                                    sngc += '已销假';
                                    sngc += trip[i].realTripDays + '天 ';
                                    sngc += trip[i].realStartDate.substring(0, 16) + '-';
                                    sngc += trip[i].realEndDate.substring(0, 16) + ' ';
                                } else {
                                    //未销假不显示
                                }
                            }
                        }
                    }
                }
            }
            if (undefined != $(this).attr("qj_mark") && $(this).attr("qj_mark") == "请假") {
                sngc = sngc + " 请假 ";
                if (records != null) {
                    var leave = records[0];
                    var leaveLength = leave.length;
                    if (leaveLength !== 0) {
                        for (var i = 0; i < leave.length; i++) {
                            sngc += $.hrUtils.getKqHolidayTypeNameById(leave[i].restType) + ' ';
                            sngc += leave[i].applyRestDays + '天' + ' ';
                            sngc += leave[i].applyStartDate.substring(0, 16) + '-';
                            sngc += leave[i].applyEndDate.substring(0, 16) + '';
                            if (leave[i].destroyStatus != null && leave[i].destroyStatus != '') {
                                if (leave[i].destroyStatus == '1081100725') {//已销假
                                    sngc += '已销假 '
                                    sngc += leave[i].realRestDays + '天 ';
                                    sngc += leave[i].realStartDate.substring(0, 16) + '-';
                                    sngc += leave[i].realEndDate.substring(0, 16) + ' ';
                                } else {
                                    //未销假不显示
                                }
                            }
                        }
                    }
                }
            }
            if ("" == sngc) {
                sngc = "无";
            }

            if (undefined != $(this).attr("sign_start_date")) {
                //sign_start = $(this).attr("sign_start_date").substring(10,16);
                sign_start = $(this).attr("sign_start_date");
                if (sign_start.length >= 16) {
                    sign_start = sign_start.substring(10, 16);
                }
            }
            if (undefined != $(this).attr("sign_end_date")) {
                //sign_end = $(this).attr("sign_end_date").substring(10,16);
                sign_end = $(this).attr("sign_end_date");
                if (sign_end.length >= 16) {
                    sign_end = sign_end.substring(10, 16);
                }
            }
            // //是否已通过审批 ，已在后台校验
            // if (noPunchDto != undefined && noPunchDto != null && noPunchDto.realArrivalTime != null && noPunchDto.realArrivalTime != "") {
            //     sign_start = noPunchDto.realArrivalTime;
            // } else if (undefined != $(this).attr("sign_start_date")) {
            //     //sign_start = $(this).attr("sign_start_date").substring(10,16);
            //     sign_start = $(this).attr("sign_start_date");
            //     if (sign_start.length >= 16) {
            //         sign_start = sign_start.substring(10, 16);
            //     }
            // }
            //
            // if (noPunchDto != undefined && noPunchDto != null && noPunchDto.realLeaveTime != null && noPunchDto.realLeaveTime != "") {
            //     sign_end = noPunchDto.realLeaveTime;
            // } else if (undefined != $(this).attr("sign_end_date")) {
            //     //sign_end = $(this).attr("sign_end_date").substring(10,16);
            //     sign_end = $(this).attr("sign_end_date");
            //     if (sign_end.length >= 16) {
            //         sign_end = sign_end.substring(10, 16);
            //     }
            // }

//********************************************考勤记录栏【开始】********************************************
            $("#sign_info").empty();
            var sign_info_current_date = "<div style='background-color: #f4f4f4'>" +
                "<span class='center-vertical'>考勤记录&nbsp;&nbsp;&nbsp;<span id='cilck_date' >" + cilck_date + "</span></span>";
            // if (noPunchDto !== null && noPunchDto !== undefined) {//有审批记录
            //     if (noPunchDto.status !== null && noPunchDto.status === '草稿') {//已审批
            //         var noPunchDtoS = "'" + noPunchDto.status + "'," + "'" + noPunchDto.id + "'";
            //         // sign_info_current_date += '<input type="button" style="background-color: #42e2b8;border-radius: 9px;  float: right;margin: 2%" value="未打卡说明" ' +
            //         //     'onclick="noPunchApply(' + noPunchDtoS + ')"/>';
            //     } else if (noPunchDto.status !== null && noPunchDto.status === '审批中') {
            //         // sign_info_current_date += '<div style="display: inline-block;margin-left: 41px"><span style="font-size: 12px" >未打卡审批中</span></div>';
            //     }
            // } else if (sign_start === "--:--" || sign_end === "--:--") {//--:--、--:--，且没有审批记录
            //     // sign_info_current_date += '<input type="button" style="background-color: #42e2b8;border-radius: 9px;  float: right;margin: 2%" value="未打卡说明" onclick="noPunchApply()"/>';
            // }
            sign_info_current_date += "</div>";
            $("#sign_info").append(sign_info_current_date);
            $("#sign_info").find("hr").remove();
            $("#sign_info_dt1").remove();
            $("#sign_info_dt2").remove();
            $("#sign_info_kq1").remove();
            $("#sign_info_kq2").remove();

            if (sign_start === undefined || sign_start === null || sign_start === "") {
                sign_start = "--:--";
            }
            if (sign_end === undefined || sign_end === null || sign_end === "") {
                sign_end = "--:--";
            }

//********************************************考勤记录栏【结束】********************************************
            var sign_info_content = '<div class="mui-content" id="sign_info_dt1" style="margin: 3%"> <label>' + sign_start + '</label>&nbsp;&nbsp;<label>签到</label>';
            // if (sign_start == "--:--") {
            //     sign_info_content += '<input type="button" style="background-color: #42e2b8;border-radius: 9px;  float: right;" value="未打卡说明" onclick="noPunchApply()"/>';
            // }
            sign_info_content += "</div>";
            sign_info_content += '<hr class="style-one"/><div class="mui-content" id="sign_info_dt2" style="margin: 3%"><label>' + sign_end + '</label>&nbsp;&nbsp;<label>签退</label>';
            // if (sign_end == "--:--") {
            //     sign_info_content += '<input type="button" style="background-color: #42e2b8;border-radius: 9px;  float: right;" value="未打卡说明" onclick="noPunchApply()"/>';
            // }
            sign_info_content += '</div>';
            sign_info_content += '<hr class="style-one"/>' + '<div class="mui-content" style="background-color: #f4f4f4;" id="sign_info_kq1"><label class=\'center-vertical\'>请假出差记录</label></div>' +
                '<div class="mui-content" style="margin: 3%" id="sign_info_kq2"> ' +
                '<label>' + sngc + '</label></div><hr class="style-one"/>';
            $("#sign_info").append(sign_info_content);
        };

        //加载考勤数据的方法
        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                var dt = {};
                dt.personId = $("#person_id").val();
                dt.date = dYear + "-" + settings.months[dMonth];
                var tendId = $.xljUtils.getUrlParam("tendId");
                dt.tendId = tendId;
                //token
                var accessToken = $.xljUtils.getUrlParam("accessToken");
                var url = settings.url + "?access_token=" + accessToken.split(' ')[1];

                $.ajax({
                    type: "POST", url: url, data: JSON.stringify(dt),
                    contentType: 'application/json', dataType: 'JSON',
                    async: false,
                    success: function (retData) {
                        retDt = retData.result;
                        $("#current_date").empty();
                        $("#current_date").append("<span style='margin: 3%'>考勤记录：：：：</span>&nbsp;&nbsp;&nbsp;<span >" +
                            adYear + "-" + settings.months[adMonth] + "-" + adDay + "</span>");
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        alert("服务异常,请联系管理员！");
                    }
                });
            }
        }

        //画出日历方法
        function print() {
            loadEvents();
            //得到当前月第一天是星期几
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            //得到当前月的最后一天
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            //得到今天的日期
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;
            //console.log("dWeekDayOfMonthStart = " + dWeekDayOfMonthStart);
            //console.log("dLastDayOfPreviousMonth = " + dLastDayOfPreviousMonth);
            var cBody = $('<div/>').addClass('c-grid');
            var cTit = $('<div/>').addClass('c-tit mui-clearfix');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(dYear + ' 年 ' + settings.months[dMonth]);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);


            cTit.append(cPrevious);
            cTit.append(cMonth);
            cTit.append(cNext);
            cBody.append(cTit);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[dayOfWeek]);
                cBody.append(cWeekDay);
                dayOfWeek++;
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>').html("<lable></lable>");
                cDay.on('click', cell_cilck);
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.find("lable").html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                        cDay.attr("id", "today_id_cilck");
                        var today_ele = $('<span/>').addClass("today-text").html("今天");
                        cDay.append(today_ele);
                        cDay.addClass("c-event-over"); //今天默认选中的颜色
                    }
                    //给日期添加考勤状态
                    if (undefined != retDt && retDt.length > 0) {
                        //console.log("============" + JSON.stringify(retDt));
                        for (var j = 0; j < retDt.length; j++) {
                            if ((undefined != retDt[j]) && (day == parseInt((retDt[j].sign_date).split("-")[2]))) {
                                if (undefined != retDt[j].signInTime) {//去掉秒显示
                                    if (retDt[j].signInTime != null && retDt[j].signInTime.length >= 16) {
                                        cDay.attr("sign_start_date", retDt[j].signInTime.substring(0, 16));//签到时间
                                    } else {
                                        cDay.attr("sign_start_date", retDt[j].signInTime);//签到时间
                                    }
                                }
                                if (undefined != retDt[j].signOutTime) {
                                    if (retDt[j].signOutTime != null && retDt[j].signOutTime.length >= 16) {
                                        cDay.attr("sign_end_date", retDt[j].signOutTime.substring(0, 16));//签退时间
                                    } else {
                                        cDay.attr("sign_end_date", retDt[j].signOutTime);//签退时间
                                    }
                                }

                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100753")) {
                                    cDay.attr("sngc_mark", "市内公出");//市内公出标志
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100221")) {
                                    cDay.attr("cc_mark", "出差");//出差标志
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100220")) {
                                    cDay.attr("qj_mark", "请假");//请假标志
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100222")) {
                                    cDay.attr("qj_mark", "补签");//补签标志
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100737")) {
                                    cDay.attr("qj_mark", "正常");//正常标志
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && retDt[j].kq_type == "1118100737") {//正常
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-greenstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-greenstatus"); //正常日期的颜色
                                    break;
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100753")) {
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-greenstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-wcstatus"); //市内公出日期的颜色
                                    break;
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100221")) {
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-greenstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-cjstatus"); //出差日期的颜色
                                    break;
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type.indexOf("1118100219") != -1)) {
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-redstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-redstatus"); //异常日期的颜色
                                    break;
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100220")) {
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-qjstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-qjstatus"); //请假日期的颜色
                                    break;
                                }
                                if (('string' == typeof (retDt[j].kq_type)) && (retDt[j].kq_type == "1118100222")) {
                                    cDay.addClass('c-today');
                                    var today_ele = $('<span/>').addClass("today-text-qjstatus");
                                    cDay.append(today_ele);
                                    cDay.addClass("c-event-over-NoSigStatus"); //补签日期的颜色
                                    break;
                                }
                            }
                        }
                    }
                    cDay.find("lable").html(day++);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.find("lable").html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            //事件列表
            //todoEventItemList(eventList,dDay);

            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);

            //执行点击今天的事件
            // $("#today_id_cilck").attr("cursor: pointer").trigger("click");
            // $("#today_id_cilck").trigger("click");
            $("#today_id_cilck").attr("cursor", "pointer").click();
        }

        return print();
    };

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Eventos',
        url: hostUrl + "/kq/hrKqSummary/querySignListByMonth",
        //默认事件
        events: [],
        firstDayOfWeek: 0
    };

    /**
     * 查询点击日期的考勤信息
     * @param cilck_date
     * @returns {*}
     */
    function queryKqApplyInfo(cilck_date) {
        if (cilck_date === null || cilck_date === "") {
            cilck_date = $("#cilck_date").text();
        }
        var personId = $("#person_id").val();
        //$mobile 开发环境放开、生产环境注释掉，原因 移动端im会自动追加token到header上
        var accessToken = $.xljUtils.getUrlParam("accessToken");
        var urlAll = hostUrl + "/kq/hrKqRest/queryKqApplyInfo?access_token=" + accessToken.split(' ')[1];
        var result;
        var tendId = $.xljUtils.getUrlParam("tendId");
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                "curDate": cilck_date,
                "personId": personId,
                "status": $.hrUtils.APPLY_PASS,
                "tendId": tendId
            }),
            success: function (data) {
                if (data.success) {
                    if (data.result.length !== 0) {
                        var records = data.result;
                        result = records;//考勤信息
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return result;
    }

}(jQuery));