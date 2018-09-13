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
            //$(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {$(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            //$('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
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
//            debugger;
            print();
            // 标记有待办事项日期
//            callMarkEventDays();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
//            debugger;
            print();
            // 标记有待办事项日期
//            callMarkEventDays();
        };

        var dayClickEvent = function() {
        	var date = $('.c-month').text().replace(/ /g,'') + '-'+ $(this).data('day');
        	$(this).addClass('c-event');
        	$(this).siblings('.c-day').removeClass('c-event');
            $.ajax({
                url:hostUrl + 'oa/workSchedule/getScheduleByDate?_t='+new Date().getTime(),
                data:JSON.stringify({selectDate:date}),
                type:'POST',
                contentType:'application/json',
                dataType:'JSON',
                success:function (resultData ) {
                    if(resultData.success){
                        var resultList = resultData.result;
                        var events = [];
                        for (var i = 0; i < resultList.length; i++) {
                            var obj = resultList[i];
                            var eventObj = {};
                            var isColor = false;
                            if(obj.type=='PERSONAL_PROCEEDING'){
                                eventObj.title = '事项';
                                eventObj.url = hostUrl + 'oa/schedule/schedule_edit.html?act=view&workScheduleId='+obj.id;
                            }else if(obj.type=='TASK'){
                                if(obj.status==1){
                                    isColor = true;
                                }
                                eventObj.title = '任务';
                                eventObj.url = hostUrl + 'oa/taskPackageDispatch/taskPackageDispatch_edit.html?dispatchId='+obj.id;
                            }else if(obj.type=='MEETING'){
                                eventObj.title = '会议';
                                eventObj.url = hostUrl + 'oa/schedule/schedule_edit.html?act=view&workScheduleId='+obj.id;
                            }
                            eventObj.title = eventObj.title+'--'+obj.content;//isColor?"<span style='color: orange'>"+eventObj.title+'--'+obj.content+"</span>":eventObj.title+'--'+obj.content;
                            eventObj.description = obj.content;
                            var beginTime = obj.beginTime;
                            beginTime = beginTime.replace(/-/g,'/');
                            if(beginTime.indexOf('.')!=-1) {
                                beginTime =beginTime.substring(0,beginTime.indexOf("."));
                            }
                            eventObj.datetime = new Date(beginTime);
                            events.push(eventObj);
                        }
                        
                        
                        var eventList = $('<div/>').addClass('c-event-list');
                        for (var i = 0; i < events.length; i++) {
                            var d = events[i].datetime;
                            if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                                var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth() + 1, 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                                var item = $('<div/>').addClass('c-event-item');
                                var title = $('<div/>').addClass('title').html(date + '  ' + events[i].title + '<br/>');
                                var description = $('<div/>').addClass('description').html(events[i].description + '<br/>');
                                item.attr('data-event-day', d.getDate());
                                item.attr('title',events[i].title);
                                item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                                item.append(title);

                                // Add the url to the description if is set
                                if( events[i].url !== undefined )
                                {
                                    var eventUrl = events[i].url;
                                    /*item.on('click',function () {
                                        window.open(eventUrl);
                                    });*/
                                    item.attr('onclick','javascript:window.open("'+eventUrl+'")');
                                    /**
                                     * If the setting url_blank is set and is true, the target of the url
                                     * will be "_blank"
                                     */
                                    type_url = events[i].url_blank !== undefined && 
                                               events[i].url_blank === true ? 
                                               '_blank':'';
                                    description.wrap( '<a href="'+ events[i].url +'" target="'+type_url+'" ></a>' );
                                }

                                eventList.append(item);
                            }
                        }
                        $('.c-event-body').html(eventList);

                        var containerHeight = $(".c-event-grid").parents('.groupnews_container')[0]?$(".c-event-grid").parents('.groupnews_container').height():0;
                        if(containerHeight>0){
                            $(".c-event-grid").height(containerHeight-40-240);
                        }

                        $('.c-event-grid').niceScroll({
                            autohidemode: false,
                            cursorcolor: "#eee",
                            cursorwidth: "6px", // 滚动条的宽度，单位：便素
                            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                            horizrailenabled: false, // nicescroll可以管理水平滚动
                            background: "#fff"
                        });

                        $('.c-event-grid').hover(function () {
                            $(this).getNiceScroll().show().resize();
                        },function () {
                            $(this).getNiceScroll().hide();
                        });
                    }
                }
            });
        };
        
        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                $.ajax({url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }
        
        function callMarkEventDays() {
        	// 标记有待办事项日期
            if (settings.markEventDays && settings.markEventDays.constructor == Function) {
            	//console.log('component :' + $('.c-month', instance).text().replace(/ /g, ''));
            	settings.markEventDays($('.c-month', instance).text().replace(/ /g, ''));
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(dYear + ' - ' + settings.months[dMonth]);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
            
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
//            var clickDay = instance.data('clickDay');
            var clickMonth = instance.data('clickMonth');
            var currentMonth = (adYear+'-'+((dMonth+1)<10?('0'+(dMonth+1)):(dMonth+1)));
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    /*else if(day == (clickDay+'')&&(currentMonth==clickMonth)){
                        cDay.addClass('c-event');
                    }*/

//                    for (var j = 0; j < settings.events.length; j++) {
//                        var d = settings.events[j].datetime;
//                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
//                            //修改事件背景颜色
//                            //cDay.addClass('c-event').attr('data-event-day', d.getDate());
//                            cDay.attr('data-event-day', d.getDate());
//                            cDay.on('click', mouseOverEvent);
//                        }
//                    }
                    cDay.html(day++);
                    cDay.data('day', day - 1);
                    cDay.on('click', dayClickEvent);

                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                var d = settings.events[i].datetime;
                if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth() + 1, 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title + '<br/>');
                    var description = $('<div/>').addClass('description').html(settings.events[i].description + '<br/>');
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    item.append(title);

                    // Add the url to the description if is set
                    if( settings.events[i].url !== undefined )
                    {
                        var eventUrl = settings.events[i].url;
                        /*item.on('click',function () {
                            window.open(eventUrl);
                        });*/
                        item.attr('onclick','javascript:window.open("'+eventUrl+'")');
                        /**
                         * If the setting url_blank is set and is true, the target of the url
                         * will be "_blank"
                         */
                        type_url = settings.events[i].url_blank !== undefined && 
                                   settings.events[i].url_blank === true ? 
                                   '_blank':'';
                        description.wrap( '<a href="'+ settings.events[i].url +'" target="'+type_url+'" ></a>' );
                    }

                    eventList.append(item);
                }
            }
            var containerHeight = $(".c-event-grid").parents('.groupnews_container')[0]?$(".c-event-grid").parents('.groupnews_container').height():0;
            if(containerHeight>0){
                $(".c-event-grid").height(containerHeight-40-240);
            }

            //日程事件滚动条
            $(".c-event-grid").niceScroll({
                autohidemode: true,
                cursorcolor: "#eee",
                cursorwidth: "4px", // 滚动条的宽度，单位：便素
                cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                horizrailenabled: true, // nicescroll可以管理水平滚动
                background: "#fff"
            });
            $(".c-event-grid").getNiceScroll().show().resize();

            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
            
            // 标记有待办事项日期
            if (settings.markEventDays && settings.markEventDays.constructor == Function) {
            	//console.log('component :' + dYear + '-' + settings.months[dMonth])
            	settings.markEventDays(dYear + '-' + settings.months[dMonth]);
            }

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
        weekDays: ['日','一', '二', '三', '四', '五', '六'],
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        textArrows: {previous: '&lt;', next: '&gt;'},
        eventTitle: 'Eventos',
        url: '',
        //默认事件
        events: [],
        firstDayOfWeek: 0
    };
}(jQuery));