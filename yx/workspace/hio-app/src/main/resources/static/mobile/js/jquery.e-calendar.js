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
            todoEventItemList($(".c-event-list"),d);


            //$('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            //$(this).removeClass('c-event-over')
            //var d = $(this).attr('data-event-day');
            //$(".c-event-list").empty();
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

        function loadEvents() {
            if (typeof settings.url!= 'undefined' && settings.url!= '') {
                $.ajax({
                    type: "POST", url: settings.url, data: "{}",
                    contentType: 'application/json',  dataType: 'JSON',
                    async: false,
                    success:function(retData){
                        //console.log("success is called retData="+JSON.stringify(retData));
                        var result = retData.result;
                        var success = retData.success;
                        var eventList = new Array();
                        if(success && result && result.length>0){
                            for(var idx=0; idx<result.length; idx++){
                                var itemData = result[idx];
                                var eventData = new Object();
                                eventData.id = itemData.id;
                                eventData.content = itemData.content;
                                eventData.beginTime = itemData.beginTime;
                                eventData.endTime = itemData.endTime;
                                eventData.taskOwnerId = itemData.taskOwnerId;
                                eventData.status = itemData.status;
                                eventData.type = itemData.type;
                                eventData.source = itemData.source;
                                eventData.periodTaskNum = itemData.periodTaskNum;
                                eventList.push(eventData);
                            }
                            settings.events = eventList;
                        }//end-if
                    }
                });



            }
        }

        var todoEventItemList = function(eventList,clickDay){
            for (var i = 0; i < settings.events.length; i++) {
            	var eventItem = settings.events[i]; 
                var d = eventItem.beginTime;
                d = new Date(d.replace(/-/g,"/"));
                if (d.getMonth() == dMonth && d.getFullYear() == dYear && d.getDate() == clickDay) {
                    var shiduan = "";
                    if(d.getHours()>12){
                        shiduan = "下午";
                    }else if(d.getHours()==12){
                        shiduan = "中午";
                    }else{
                        shiduan = "上午";
                    }
                    var date = shiduan+ lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    console.log("--->>>eventItem.id="+eventItem.id+"; eventItem.type="+eventItem.type);
                    if(eventItem.type == "TASK"){
                    	var hb_btn = $('<button/>').addClass('hb-btn').text("汇报").attr("businessId",eventItem.id);
                        hb_btn.on("click",function(){ //传参数  ----todo
                            var id = $(this).attr("businessId");
                            //window.open("schedule_report.html?businessId="+id);
                            window.location.href = path+"/mobile/schedule/schedule_report.html?businessId="+id;
                        });
                    }else{
                    	var hb_btn = $('<button/>').addClass('hb-btn').text("查看").attr("businessId",eventItem.id);
                        hb_btn.on("click",function(){ //传参数  ----todo
                            var id = $(this).attr("businessId");
                            window.location.href = path+"/mobile/schedule/schedule_detail.html?businessId="+id;
                        });
                    }
                    
                    var title = $('<div/>').addClass('title mui-clearfix').html("<span>"+date+"</span>");
                    title.append(hb_btn);
                    var content = $('<div/>').addClass('description').html(eventItem.content);
                    item.attr('data-event-day', d.getDate());
                    item.append(title,content);
                    eventList.append(item);
                }

            }
        };
        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

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
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.find("lable").html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                        var today_ele = $('<span/>').addClass("today-text").html("今天");
                        cDay.append(today_ele);
                        cDay.addClass("c-event-over"); //今天默认选中
                    }


                    for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].beginTime;
                        if(d.length==16){
                            d += ":00";
                        }
                        if(d.length>19){
                            d = d.substring(0,d.lastIndexOf('.'));
                        }
                        d = new Date(d.replace(/-/g,"/"));
                        var status = settings.events[j].status;
                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            //状态不同 样式不同
                           if(status){
                               var status_ele = $('<span/>');
                               if(status=="1"){
                                   status_ele.addClass('event-red');
                               }else if(status=="2"){
                                   status_ele.addClass('event-blue');
                               }else if(status=="3"){
                                   status_ele.addClass('event-green');
                               }
                               cDay.append(status_ele);
                           }

                        }
                    }
                    cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                    cDay.find("lable").html(day++);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.find("lable").html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            //事件列表
            todoEventItemList(eventList,dDay);

            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
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
        weekDays: [ '日','一', '二', '三', '四', '五', '六'],
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        textArrows: {previous: '<span class=" mui-icon mui-icon-arrowleft"></span>', next: '<span class="mui-icon mui-icon-arrowright"></span>'},
        eventTitle: 'Eventos',
        url: "/platform-app/oa/workSchedule/queryListByUser",
        //默认事件
        events: [

        ],
        firstDayOfWeek: 0
    };
}(jQuery));