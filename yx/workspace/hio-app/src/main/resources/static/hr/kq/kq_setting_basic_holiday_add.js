// (function ($, window, document, undefined) {
var holidayEditId;
var year;
$(function () {
    // resizeHeight();
    var type = $.xljUtils.getUrlParam("type");
    year = window.opener.yearSelect;
    for (var i = 2010; i <= 2100; i++) {
        $("#year").append("<option value=" + i + ">" + i + "</option>");
    }
    if (year == "" || year == null) {
        year = new Date().getFullYear();
    }
    $("#year  option[value='" + year + "']").attr("selected", true);
    if (type == 'add') {
        $('title').text("节假日-新增");
        $(".xj-form-title").text("节假日-新增");

        initUuid();
    } else if (type = 'update') {
        $('title').text("节假日-修改");
        $(".xj-form-title").text("节假日-修改");
        holidayEditId = window.opener.holidayEditId;
        getHolidayInfoById(holidayEditId);
    }

    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#holidayAddForm").attr("data-validate-success", "saveForm(0)");
            $("#holidayAddForm").submit();
        } else if (type == "update") {
            $("#holidayAddForm").attr("data-validate-success", "saveForm(1)");
            $("#holidayAddForm").submit();
        }
    });


    pageInit();
    // resizeGrid();
});

function pageInit() {
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}


/**
 * 初始化主键ID
 */
function initUuid() {
    var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#holidayAddForm").find("input[name='id']").val(guuid);
        }
    });
}

/**
 * 查询单条记录
 */
function getHolidayInfoById(id) {
    var urlBody = "kq/hrKqHolidaySetting/get/" + id+ "?time=" + Math.random();
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'GET',
        url: urlAll,
        async: false,
        // dataType: 'JSON',
        // contentType: 'application/json',
        // data: "{}",
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                $("#id").val(result.id);
                var year = result.year;
                $("#year  option[value='" + year + "']").attr("selected", true);
                $("#name").val(result.name);
                $("#startDate").val(new Date(changeTimeStyle(result.startDate)).format("yyyy-MM-dd"));
                $("#endDate").val(new Date(changeTimeStyle(result.endDate)).format("yyyy-MM-dd"));
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/**
 * 保存表单
 */
function saveForm(sign) {
    var year = $("#year").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var nowDate = new Date().format("yyyy-MM-dd");
    var startYear = new Date(startDate).getFullYear();
    if (startDate > endDate) {
        pop_tip_open("red", "开始时间不能大于结束时间！");
    } else if (startDate < nowDate) {
        pop_tip_open("red", "开始日期不能小于当前日期！");
    } else if (startDate == nowDate) {
        pop_tip_open("red", "开始日期不能选择当前日期！");
    } else if (startYear != year) {
        pop_tip_open("red", "法定日期请选择" + year + "年的时间");
    } else {
        if (sign == 1) {//编辑
            editSaveForm();
        } else if (sign == 0) {//新增
            addSaveForm(sign);
        }
    }
}

/**
 * 新增考勤期间
 */
function addSaveForm(sign) {
    var hrKqHolidaySettingArr = $("#holidayAddForm").serializeArray();
    var hrKqHolidaySettingDto = {};
    for (var i in hrKqHolidaySettingArr) {
        if (hrKqHolidaySettingArr[i].name == "startDate" || "endDate" == hrKqHolidaySettingArr[i].name) {
            var date = hrKqHolidaySettingArr[i].value.replace(/-/g, '/');
            if (date != "") {
                hrKqHolidaySettingDto[hrKqHolidaySettingArr[i].name] = new Date(date).getTime();
            }
        } else {
            hrKqHolidaySettingDto[hrKqHolidaySettingArr[i].name] = hrKqHolidaySettingArr[i].value;
        }
    }
    hrKqHolidaySettingDto.delflag = false;

    $.ajax({
        url: serviceUrl + "kq/hrKqHolidaySetting/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqHolidaySettingDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    refreshParent(hrKqHolidaySettingDto.id);
                    closeWindow();
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", "保存失败！");
                }
            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}


/**
 * 修改-保存表单
 */
function editSaveForm() {
    var hrKqHolidaySettingArr = $("#holidayAddForm").serializeArray();
    var hrKqHolidaySettingDto = {};
    for (var i in hrKqHolidaySettingArr) {
        if (hrKqHolidaySettingArr[i].name == "startDate" || "endDate" == hrKqHolidaySettingArr[i].name) {
            var date = hrKqHolidaySettingArr[i].value.replace(/-/g, '/');
            if (date != "") {
                hrKqHolidaySettingDto[hrKqHolidaySettingArr[i].name] = new Date(date).getTime();
            }
        } else {
            hrKqHolidaySettingDto[hrKqHolidaySettingArr[i].name] = hrKqHolidaySettingArr[i].value;
        }
    }
    hrKqHolidaySettingDto.delflag = false;

    $.ajax({
        url: serviceUrl + "kq/hrKqHolidaySetting/update/" + hrKqHolidaySettingDto.id,
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqHolidaySettingDto),
        success: function (data) {

            if (data.success) {
                refreshParent(hrKqHolidaySettingDto.id);
                closeWindow();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 刷新父页面表格数据
 */
function refreshParent(editId) {
    window.opener.jqGridHoliday.jqGrid().trigger("reloadGrid");
    if (editId != null && editId != "") {
        window.opener.focusIdRest1CallBack(editId);
    }
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

//针对IE进行时间转换
function changeTimeStyle(bTime) {
    var timePar = bTime.split(' ');
    var timeDate = timePar[0].split('-');
    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
    var later = new Date(bTime);
    return later;
}
// })(jQuery, window, document)