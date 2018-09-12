/**
 * 考勤模块使用
 * @author YangYQ
 * @date 2018/1/31
 */

(function ($) {
    //更新当前考勤期间：针对当前考勤期间异常为空值的情况
    function updateNowKqMonth(nowKqMonth, id) {
        var flag = false;
        $.ajax({
            type: 'PUT',
            url: hostUrl + 'wage/wagePeriod/update/' + id,
            data: JSON.stringify({'nowKqMonth': nowKqMonth,"type":"kq"}),
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {
                    flag = true;
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('更新失败：' + errorThrown);
            }
        });
        return flag;
    }


    if (!$.kqUtils) {
        $.extend({
            kqUtils: {
                //以下为参数
                /* baseUrl: '/static/',
                 // hostUrl: 'http://localhost:9999/platform-app/hr/',
                 // hostUrl: window.parent.JZY.xhr.transformUrl('/', 'GLOBAL.HR'),*/

                headers: {
                    Authorization: window.parent.JZY.c.AUTO_LOGIN.headers.authorization,
                    'Content-Type': 'application/json; charset=utf-8'
                },

                /*  headers_noContent: {
                      // Authorization: 'bearer 75470d25-4f8a-44f9-afe1-a12d31c97e6e',
                      // Authorization: 'bearer 49109848-ba00-46bd-931f-ba4572ba7e43',
                      Authorization: window.parent.JZY.c.AUTO_LOGIN.headers.authorization
                  },*/

                // token: '2aa906d1-b867-4872-81b6-f885efde86dc',
                token: window.parent.JZY.s.getAccessTokenByAuthorization(),

                //以下为方法
                //计薪期间查询，返回对象
                queryWagePeriod: function () {
                    var wagePeriodDto;
                    $.ajax({
                        type: 'POST',
                        url: hostUrl + 'wage/wagePeriod/queryList',
                        data: '{}',
                        dataType: 'JSON',
                        async: false,
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.success) {
                                if (data.result !== null && data.result.length > 0) {
                                    wagePeriodDto = data.result[0];
                                    var nowKqMonth = wagePeriodDto.nowKqMonth;
                                    if (nowKqMonth === undefined || nowKqMonth === null || nowKqMonth === '') {
                                        nowKqMonth = new Date().format('yyyy.MM');
                                        var flag = updateNowKqMonth(nowKqMonth, wagePeriodDto.sid);
                                        if (flag) {
                                            wagePeriodDto.nowKqMonth = nowKqMonth;
                                        }
                                    }
                                }
                            }
                        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                            pop_tip_open('red', '计薪期间查询失败！');
                        }
                    });
                    return wagePeriodDto;
                },


                //获取当月最后一天
                getDaysInMonth: function (year, month) {
                    var date = new Date(year, month, 0);
                    var days = date.getDate();
                    return days;
                },

                /**
                 * 获取下一个月
                 *
                 * @date 格式为yyyy-mm的日期，如：2017-12
                 */
                getNextMonth: function (date, split) {
                    var arr = date.split(split);
                    var year = arr[0]; //获取当前日期的年份
                    var month = arr[1]; //获取当前日期的月份
                    var year2 = year;
                    var month2 = parseInt(month) + 1;
                    if (month2 == 13) {
                        year2 = parseInt(year2) + 1;
                        month2 = 1;
                    }
                    if (month2 < 10) {
                        month2 = '0' + month2;
                    }
                    var t2 = year2 + split + month2;
                    return t2;
                },

                /**
                 * 计算计薪周期结束日期的天数
                 * @param startDate 计薪周期结束开始的天数
                 */
                calculateEndDate: function (startDate) {
                    var endDate;
                    if (startDate != null && startDate !== '') {
                        startDate = parseInt(startDate);
                        if (startDate === 1) {
                            endDate = 31;
                        } else {
                            endDate = startDate - 1;
                        }
                    }
                    return endDate;
                },
                /**
                 * 计算计薪周期结束日期的天数
                 * @param nowKqMonth    当前考勤年月
                 * @param startDays     计薪周期结束开始的天数
                 * @param split         分隔符（分隔符要与）nowKqMonth一致
                 * @return :wagePeriod
                 * endDays      计算计薪周期结束日期的天数
                 * nextDate     当前考勤年月的下个自然月（startDays不是1的时候才返回值）
                 * startDate    当前考勤期间的开始期间（年月日）
                 * endDate      当前考勤期间的结束期间（年月日）
                 */
                calculateEndDate2: function (nowKqMonth, startDays, split) {
                    var wagePeriod = {};
                    var endDays;
                    var endDate;
                    var month = "";
                    if (startDays != null && startDays !== '') {
                        startDays = parseInt(startDays);
                        if (startDays === 1) {
                            endDays = 31;
                            var nowKqMonth_ = nowKqMonth.replace(eval("/\\" + split + "/gi"), '/');
                            var date_ = new Date(nowKqMonth_ + "/01");
                            endDays = this.getDaysInMonth(date_.getFullYear(), date_.getMonth() + 1);
                            month = nowKqMonth;
                        } else {
                            endDays = startDays - 1;
                            var nextDate = this.getNextMonth(nowKqMonth, split);
                            var nextDate_ = new Date(nextDate.replace(eval("/\\" + split + "/gi"), '/') + "/01");
                            var nextDate_days = this.getDaysInMonth(nextDate_.getFullYear(), nextDate_.getMonth() + 1);
                            if (nextDate_days < endDays) {
                                endDays = nextDate_days;
                            }
                            month = nextDate;
                        }
                    }

                    if (startDays >= 1 && startDays <= 9) {
                        startDays = "0" + startDays;
                    }
                    if (endDays >= 1 && endDays <= 9) {
                        endDays = "0" + endDays;
                    }
                    endDate = month + split + endDays;
                    wagePeriod.endDays = endDays;
                    wagePeriod.nextDate = nextDate;
                    wagePeriod.endDate = endDate;
                    wagePeriod.startDate = nowKqMonth + split + startDays;
                    return wagePeriod;
                },
                //根据日期和人员id确定唯一一条考勤核算结果修改记录
                queryKqAttendanceAccountEdit: function (editDate, personId) {
                    var hrKqAttendanceAccountEditDto;
                    $.ajax({
                        type: "POST",
                        url: hostUrl + "kq/hrKqAttendanceAccountEdit/queryList",
                        data: JSON.stringify({"editDate": editDate, "personId": personId}),
                        dataType: "JSON",
                        async: false,
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success) {
                                if (data.result != null && data.result.length > 0) {
                                    hrKqAttendanceAccountEditDto = data.result[0];
                                }
                            }
                        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                            pop_tip_open("red", "服务异常,请联系管理员！");
                        }
                    });
                    return hrKqAttendanceAccountEditDto;
                },
            }
        });
    }


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
    };


    $.extend($.kqUtils, {});
})(jQuery);
