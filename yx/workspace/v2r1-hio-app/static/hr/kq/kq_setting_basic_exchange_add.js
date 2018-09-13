// (function ($, window, document, undefined) {
var exchangeEditId;
var type;
$(function () {
    type = $.xljUtils.getUrlParam("type");
    if (type === 'add') {
        $('title').text("调休日-新增");
        $(".xj-form-title").text("调休日-新增");

        initUuid();
    } else if (type === 'update') {
        $('title').text("调休日-修改");
        $(".xj-form-title").text("调休日-修改");
        exchangeEditId = window.parent.exchangeEditId;
        getExchangeInfoById(exchangeEditId);
    }

    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#exchangeAddForm").attr("data-validate-success", "saveForm(0)");
            $("#exchangeAddForm").submit();
        } else if (type == "update") {
            $("#exchangeAddForm").attr("data-validate-success", "saveForm(1)");
            $("#exchangeAddForm").submit();
        }
    });
    pageInit();
});

function pageInit() {
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.parent.closePa();
}


/**
 * 初始化主键ID
 */
function initUuid() {
    var uBody = "generator/getGuuid" + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#exchangeAddForm").find("input[name='id']").val(guuid);
        }
    });
}

/**
 * 查询单条记录
 */
function getExchangeInfoById(id) {
    var urlBody = "kq/hrKqExchangeSetting/get/" + id + "?time=" + Math.random();
    var urlAll = hostUrl + urlBody;
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
                $("#id").val(result.sid);
                var year = result.year;
                $("#year  option[value='" + year + "']").attr("selected", true);
                $("#remark").val(result.remark);
                $("#exchangeDate").val(new Date(changeTimeStyle(result.exchangeDate)).format("yyyy-MM-dd"));
                $("#publicDate").val(new Date(changeTimeStyle(result.publicDate)).format("yyyy-MM-dd"));

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
    var exchangeDate = $("#exchangeDate").val();
    var nowDate = new Date().format("yyyy-MM-dd");
    var exchangeYear = new Date(exchangeDate).getFullYear();
    // if (exchangeDate < nowDate) {
    //     pop_tip_open("red", "调休日不能小于当前日期！");
    // } else if (exchangeDate == nowDate) {
    //     pop_tip_open("red", "调休日不能选择当前日期！");
    // } else
    if (exchangeYear !== parseInt(year)) {
        pop_tip_open("red", "调休日请选择" + year + "年的时间");
    } else {
        var checkDto = duplicateCheck();
        if (checkDto.flag === false) {//重复校验不通过
            var message = checkDto.message;
            if (message === undefined || message == null || message === "") {
                message = "您选择的期间已有调休日或公休日已设置，请重新选择！";
            }
            pop_tip_open("red", message);
            return;
        }
        if (sign == 1) {//编辑
            editSaveForm();
        } else {//新增
            addSaveForm(sign);
        }
    }
}

/**
 * 新增考勤调休日
 */
function addSaveForm(sign) {
    var hrKqExchangeSettingArr = $("#exchangeAddForm").serializeArray();
    var hrKqExchangeSettingDto = {};
    for (var i in hrKqExchangeSettingArr) {
        if (hrKqExchangeSettingArr[i].name == "publicDate" || "exchangeDate" == hrKqExchangeSettingArr[i].name) {
            var date = hrKqExchangeSettingArr[i].value.replace(/-/g, '/');
            if (date != "") {
                hrKqExchangeSettingDto[hrKqExchangeSettingArr[i].name] = new Date(date).getTime();
            }
        } else {
            hrKqExchangeSettingDto[hrKqExchangeSettingArr[i].name] = hrKqExchangeSettingArr[i].value;
        }
    }
    hrKqExchangeSettingDto.delflag = 0;

    $.ajax({
        url: hostUrl + "kq/hrKqExchangeSetting/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqExchangeSettingDto),
        success: function (data) {

            if (data.success) {
                pop_tip_open("blue", data.message);
                setTimeout(function () {
                    closeWindow();
                }, 500);
                refreshParent(hrKqExchangeSettingDto.id);
            } else {
                pop_tip_open("red", data.message);
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
    var hrKqExchangeSettingArr = $("#exchangeAddForm").serializeArray();
    var hrKqExchangeSettingDto = {};
    for (var i in hrKqExchangeSettingArr) {
        if (hrKqExchangeSettingArr[i].name == "publicDate" || "exchangeDate" == hrKqExchangeSettingArr[i].name) {
            var date = hrKqExchangeSettingArr[i].value.replace(/-/g, '/');
            if (date != "") {
                hrKqExchangeSettingDto[hrKqExchangeSettingArr[i].name] = new Date(date).getTime();
            }
        } else {
            hrKqExchangeSettingDto[hrKqExchangeSettingArr[i].name] = hrKqExchangeSettingArr[i].value;
        }
    }
    hrKqExchangeSettingDto.delflag = 0;

    $.ajax({
        url: hostUrl + "kq/hrKqExchangeSetting/update/" + hrKqExchangeSettingDto.id,
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqExchangeSettingDto),
        success: function (data) {

            if (data.success) {
                pop_tip_open("blue", data.message);
                setTimeout(function () {
                    closeWindow();
                }, 500);
                refreshParent(hrKqExchangeSettingDto.id);
            } else {
                pop_tip_open("red", data.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}

//重复校验
function duplicateCheck() {
    var flag = false;
    var message = "";
    var exchangeDate = $("#exchangeDate").val();
    var publicDate = $("#publicDate").val();
    var id = $("#id").val();
    var urlBody = "kq/hrKqExchangeSetting/queryListByCondition";
    var urlAll = hostUrl + urlBody;
    if (type === 'add') {
        id = "";
    }
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"exchangeDate": exchangeDate, "publicDate": publicDate, "id": id}),
        success: function (data) {
            if (data.success === true) {
                if (data.result.length === 0) {
                    flag = true;
                }
            } else {
                message = data.message;
                return false;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

    var checkDto = {};
    checkDto.flag = flag;
    checkDto.message = message;
    return checkDto;
}

/**
 * 刷新父页面表格数据
 */
function refreshParent(editId) {
    window.parent.jqGridExchange.jqGrid().trigger("reloadGrid");
    if (editId != null && editId != "") {
        window.parent.focusIdRest2CallBack(editId);
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