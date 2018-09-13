$(function () {
    var groupId = parent.groupId;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var month = "";
    var year = "";
    var pbTimeMap;
    $('#fullCalendarDemo')
        .fullCalendar({                                  //初始化日历
            header: { 　　　　　　　　　　　　　　　　　　　　//日历最上面表示头部
                left: '',
                center: 'prev,title,next',
                right: ''
            },
            monthNames: ["1月", "2月", "3月", "4月", 　//设置月份名称，中英文均可
                "5月", "6月", "7月", "8月", "9月",
                "10月", "11月", "12月"
            ],
            // monthNamesShort: ["一月", "二月", "三月", 　　//设置月份的简称
            //     "四月", "五月", "六月", "七月", "八月",
            //     "九月", "十月", "十一月", "十二月"
            // ],
            monthNamesShort: ["1月", "2月", "3月", "4月", 　//设置月份的简称
                "5月", "6月", "7月", "8月", "9月",
                "10月", "11月", "12月"
            ],
            dayNames: ["周日", "周一", "周二", "周三", 　　//设置星期名称
                "周四", "周五", "周六"
            ],
            dayNamesShort: ["周日", "周一", "周二", 　　　　//设置星期简称
                "周三", "周四", "周五", "周六"
            ],
            firstDay: 0, 　　　　　　　　　　　　　　　　　　//设置每星期的第一天是星期几，0 是星期日
            // buttonText: {
            //     prev: "<span class='fc-text-arrow'>&lsaquo;上个月</span>",
            //     next: "<span class='fc-text-arrow'>下个月&rsaquo;</span>",
            //     prevYear: "<span class='fc-text-arrow'>&laquo;上一年</span>",
            //     nextYear: "<span class='fc-text-arrow'>下一年&raquo;</span>"
            // },

            // height:$(window).height/2, 　　　　　　　　　　　　//设置日历高度，宽度是自适应的，不好改
            currentTimezone: 'Asia/Beijing', 　　　　　　//设置时区
            theme: true, 　　　　　　　　　　　　　　　　　//true 时日历主题可随 jQuery ui 的主题变化
            selectable: true, 　　　　　　　　　　　　　　//元素是否可以被选中
            selectHelper: true, 　　　　　　　　　　　　　//选中元素时是否显示相关信息
            select: function (startDate, endDate, 　　　//选中某元素的方法，startDate 事项的起始时间，endDate 事项的结束时间
                              allDay, jsEvent, view) { 　　　　　　　　// allDay 事项是否为全天事项，jsEvent 控件的内置对象，view 当前视图
                var startD = $.fullCalendar
                    .formatDate(startDate,
                        'yyyy-MM-dd HH:mm:ss'); 　　　　//formatDate 是格式化时间的方法
                var endD = $.fullCalendar
                    .formatDate(endDate,
                        'yyyy-MM-dd HH:mm:ss');
                //TODO      添加选中某元素时需要进行操作的方法，比如：添加会议、备注等事项
                // $("#calendar").fullCalendar('addEventSource', [{
                //     start: start,
                //     end: end,
                //     rendering: 'background',
                //     block: true
                // }]);

            },
            eventClick: function (event, jsEvent, view) { 　　　　　　　　//点击事项的方法
                var startD = $.fullCalendar
                    .formatDate(event.start,
                        'yyyy-MM-dd HH:mm:ss');
                var endD = $.fullCalendar
                    .formatDate(event.end,
                        'yyyy-MM-dd HH:mm:ss');
                //TODO      添加点击某事项时需要进行操作的方法，比如：修改会议、备注等事项
            },
            //#region 鼠标放上去显示信息
            eventMouseover: function (calEvent, jsEvent, view) {
                $(this).attr('title', calEvent.title);
                $(this).css('font-weight', 'normal');
            },
            editable: true, 　　　　　　　　　　　　　　　　//事项是否可编辑，改变大小、拖拽等
            eventResize: function (event, dayDelta, minuteDelta, revertFunc) {
                //事项大小改变后的方法，往往修改事项的起止时间，event 改变的事项，dayDelta 变化的天数，minuteDelta 变化的分钟数，revertFunc 回调函数
                var startD = $.fullCalendar
                    .formatDate(event.start,
                        'yyyy-MM-dd HH:mm:ss');
                var endD = $.fullCalendar
                    .formatDate(event.end,
                        'yyyy-MM-dd HH:mm:ss');

                //TODO      添加改变某事项大小时需要进行操作的方法，比如：修改会议、备注等事项

                if (!confirm("is this okay?")) {
                    revertFunc();        　　　　　　　　//如果不要改变，则将事项还原
                }

            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {    //拖拽事项之后的方法，allDay 是否全天事项，其他参数同上
                var startD = $.fullCalendar
                    .formatDate(event.start,
                        'yyyy-MM-dd HH:mm:ss');
                var endD = $.fullCalendar
                    .formatDate(event.end,
                        'yyyy-MM-dd HH:mm:ss');

                //TODO      添加拖拽某事项之后需要进行操作的方法，比如：修改会议、备注等事项

                if (!confirm("is this okay?")) {
                    revertFunc();
                }

            },
            events: function (start, end, callback) {
                var events = [];
                /**
                 *  events.push({
                                id: result[i].id,
                                title: result[i].title,
                                currentTimezone: result[i].currentTimezone,
                                start: result[i].start,
                                end: end,
                                allDay: allDay
                            });
     */
                callback(events);

            },
            dayClick: function(dayDate, allDay, jsEvent, view) { //点击单元格事件
            }
        });
    var dates = $('#fullCalendarDemo');
    month = dates[0].textContent.substring(0, 1);
    year = dates[0].textContent.substring(3, 7);
    $('#fullCalendarDemo').find('.fc-button-prev,.fc-button-next').click(function () {
        var dates = $('#fullCalendarDemo');
        month = dates[0].textContent.substring(0, 1);
        year = dates[0].textContent.substring(3, 7);
    });

});


/**
 * 判断数组中是否包含某个值
 * @param arr
 * @param obj
 * @returns {boolean}
 */
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * events去重
 * @param arr
 * @param obj
 * @returns {boolean}
 */
function containsEvents(arr, obj) {
    var i = arr.length;
    obj = obj.getFullYear() + "/" + (obj.getMonth() + 1) + "/" + obj.getDate();
    while (i--) {
        var startDate = arr[i].start;
        var date1 = startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate();
        var endDate = arr[i].end;
        if (endDate != null) {
            var date2 = endDate.getFullYear() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getDate();
            if (obj >= date1 && obj <= date2) {
                return true;
            }
        } else {
            if (date1 == obj) {
                return true;
            }
        }
    }
    return false;
}


/**
 * 删除数组指定元素
 * @param val
 */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


