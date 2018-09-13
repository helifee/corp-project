/** 当天信息初始化 **/
var planId;
var date;
$(function () {
    var dayDate = new Date();
    var d = $.fullCalendar.formatDate(dayDate, "dddd");
    var m = $.fullCalendar.formatDate(dayDate, "yyyy/MM/dd");
    var lunarDate = lunar(dayDate);
    $(".alm_date").html(m + "&nbsp;" + d);
    $(".today_date").html(dayDate.getDate())
    $("#alm_cnD").html("农历" + lunarDate.lMonth + "月" + lunarDate.lDate);
    $("#alm_cnY").html(lunarDate.gzYear + "年&nbsp;" + lunarDate.gzMonth + "月&nbsp;" + lunarDate.gzDate + "日");
    $("#alm_cnA").html("【" + lunarDate.animal + "年】");
    var fes = lunarDate.festival();
    if (fes.length > 0) {
        $(".alm_lunar_date").html($.trim(lunarDate.festival()[0].desc));
        $(".alm_lunar_date").show();
    } else {
        $(".alm_lunar_date").hide();
    }


    $("#kqPbCalendarSave").click(function () {
        kqPbCalendarSave();
    });
});
$(document).ready(function () {

    // var date = new Date();
    // var d = date.getDate();
    // var m = date.getMonth();
    // var y = date.getFullYear();
    var dayDate = new Date();
    date = $.fullCalendar.formatDate(dayDate, "yyyy-MM");
    // var sss=$("#planId",window.parent.document);
    planId = $("#planId", window.parent.document)[0].defaultValue;
    $('#calendar').fullCalendar({
        header: {
            left: '',
            center: 'prev,title,next',
            right: ''
            // left: 'prev,next today',
            // center: 'title',
            // right: 'month,basicWeek,basicDay'
        },
        monthNames: ["1月", "2月", "3月", "4月", 　//设置月份名称，中英文均可
            "5月", "6月", "7月", "8月", "9月",
            "10月", "11月", "12月"
        ],
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
        currentTimezone: 'Asia/Beijing', 　　　　　　//设置时区
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
        editable: true,
        events: function (start, end, callback) {
            var events = [];
            $.ajax({
                url: serviceUrl + "kq/hrKqPbManage/queryPBListForCalendar",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                async: false,
                data: JSON.stringify({"planId": planId, "date": date}),
                success: function (data) {
                    if (data.success) {
                        var result = data.result;
                        for (var i = 0; i < result.length; i++) {
                            var allDay = result[i].allDay;
                            if (allDay !== null && allDay !== "" && allDay !== undefined) {
                                if (allDay === "true") {
                                    allDay = true;
                                } else if (allDay === "false") {
                                    allDay = false;
                                }
                            }
                            events.push({
                                id: result[i].id,
                                title: result[i].title,
                                currentTimezone: result[i].currentTimezone,
                                start: result[i].start,
                                allDay: allDay
                            });
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    // $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });

            callback(events);
        },


        dayClick: function (dayDate, allDay, jsEvent, view) { //点击单元格事件
            $("#applyButton").show();
            $("#kqPbCalendarEdit").modal('show');
            var pbDate = dayDate.format("yyyy-MM-dd");
            $("#pbDate").val(pbDate);
        },
        loading: function (bool) {
            if (bool)
                $("#msgTopTipWrapper").show();
            else
                $("#msgTopTipWrapper").fadeOut();
        }
    });

});


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


/**
 * 排班保存
 */
function kqPbCalendarSave() {
    var HrKqPbManageDto = {};
    //主键初始化放在后台
    var pbDate = $("#pbDate").val();
    var date = pbDate.replace(/-/g, '/');
    if (date !== "") {
        HrKqPbManageDto.date = date;
    }
    var pbType = $("#pbType").val();
    HrKqPbManageDto.type = pbType;
    HrKqPbManageDto.delflag = false;
    HrKqPbManageDto.planId = "17fb443336cc4ee2bad8d71d194c11dd";

    $.ajax({
        url: serviceUrl + "kq/hrKqPbManage/save",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(HrKqPbManageDto),
        success: function (data) {
            if (data.success) {
                // pop_tip_open("blue", "保存成功！");
                window.parent.calendarReload();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}



