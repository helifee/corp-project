/**
 * 计薪期间设置--考勤模块使用
 * @author YangYQ
 * @date 20178/1/31
 */

(function ($, window, document, undefined) {

    var type;
    var nowKqMonth;//当前考勤年月
    $(function () {
        for (var i = 1; i <= 31; i++) {
            $("#startDate").append("<option value=" + i + ">" + i + "</option>");
        }

        var date = new Date().getDate();
        $("#startDate  option[value='" + date + "']").attr("selected", true);

        type = $.xljUtils.getUrlParam("type");
        if (type === "add") {
            nowKqMonth = new Date().format('yyyy.MM'); //将日期格式串,转换成先要的格式
            initUuid();
            periodChange();
        } else if (type === "update") {//一般不会使用
            initPeriod();
            var periodId = $.xljUtils.getUrlParam("periodId");
            nowKqMonth = $.xljUtils.getUrlParam("nowKqMonth");
            $("#periodId").val(periodId);
        }


        $("#saveBtn").click(function () {
            if (type === "add") {
                addSavePeriod();
            } else if (type === "update") {
                updateSavePeriod();
            }
        });
    });


    //初始化页面，如果已存在发薪数据，则直接取最新发薪期间，否则在此页面进行新建
    function initPeriod() {
        $.ajax({
            type: "POST",
            url: hostUrl + "wage/wagePeriod/queryList",
            data: "{}",
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data.success) {
                    if (data.result != null && data.result.length > 0) {
                        periodChange();
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化计薪期间请求失败");
            }
        })
    }


    window.periodChange = function () {
        var startDate = parseInt($("#startDate").val());
        $("#nowOrNextMonth").empty();
        $("#endDate").empty();
        var wagePeriod = $.kqUtils.calculateEndDate2(nowKqMonth, startDate, '.');
        var endDate = wagePeriod.endDays;
        if (startDate === 1) {
            $("#nowOrNextMonth").html("当月");
            $("#endDate").html(endDate);
        } else if (startDate > 1) {
            $("#nowOrNextMonth").html("次月");
            $("#endDate").html(endDate);
        }
    };

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uBody = "generator/getGuuid" + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            async: false,
            success: function (data) {
                var guuid = data.result;
                $("#periodId").val(guuid);
            }
        });
    }

    //计薪设置新增：数据库没有设置的记录，需要设置开始结束日期和当前考勤期间
    function addSavePeriod() {
        var wagePeriodDto = {};
        var periodId = $("#periodId").val();
        var startDate = $("#startDate").val();//计薪开始日期
        var endDate = $("#endDate").text();//计薪结束日期
        var nowKqMonth = new Date().format('yyyy.MM'); //当前考勤期间
        wagePeriodDto.id = periodId;
        wagePeriodDto.startDate = startDate;
        wagePeriodDto.endDate = endDate;
        wagePeriodDto.nowKqMonth = nowKqMonth;
        $.ajax({
            url: hostUrl + "/wage/wagePeriod/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(wagePeriodDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    setTimeout(function () {
                        window.history.go(-1);
                    }, 300);
                } else {
                    pop_tip_open("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }

    //计薪设置修改：数据库有记录但是没有设置期间的情况，只更新开始结束日期
    function updateSavePeriod() {
        var periodId = $('#periodId').val();
        var wagePeriodDto = {};
        var startDate = $("#startDate").val();//计薪开始日期
        var endDate = $("#endDate").text();//计薪结束日期
        wagePeriodDto.startDate = startDate;
        wagePeriodDto.endDate = endDate;
        $.ajax({
            url: hostUrl + "/wage/wagePeriod/update/" + periodId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(wagePeriodDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    setTimeout(function () {
                        window.history.go(-1);
                    }, 300);

                } else {
                    pop_tip_open("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
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


})(jQuery, window, document);