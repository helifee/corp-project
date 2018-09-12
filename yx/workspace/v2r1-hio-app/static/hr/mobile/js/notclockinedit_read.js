/**
 * lixd
 * 移动端未打卡申请js
 */
var applyId;//系统申请表单据id
//页面加载就执行
$(function () {
    personId = $.xljUtils.getUrlParam("personId");
    businessId = $.xljUtils.getUrlParam("businessId");
    //为开始时间和结束时间赋值
    var nowDate = new Date().format("yyyy-MM-dd");
    $("#notPunchDate").val(nowDate);

    if (businessId == undefined || businessId == null || businessId == '') {
    } else {
        getNoPunchInfoById(businessId);
    }
});

/**
 * 校验
 * @return true?校验通过：校验没通过
 */
function check() {
    //校验必输项、是否重复
    if (checkInfo() && checkDuplicate()) {
        return true;
    } else {
        return false;
    }
}

function formatDate2(str) {
    return str.substring(0, 10);
}

$.weui = {};
$.weui.alert = function (options) {
    options = $.extend({title: '警告', text: '警告内容'}, options);
    var $alert = $('.weui_dialog_alert');
    $alert.find('.weui_dialog_title').text(options.title);
    $alert.find('.weui_dialog_bd').text(options.text);
    $alert.on('touchend click', '.weui_btn_dialog', function () {
        $alert.hide();
        //如果需要跳转，也要等到用户看过提示信息后再跳转
        if (options.url != undefined && options.url != '') {
            window.location.href = options.url;
        }
    });
    $alert.show();
};

/**
 * 根据平台账户获取人力系统用户信息
 * @param account  平台账户
 */
function getHRUserInfo(account) {
    $.ajax({
        url: hostUrl + "emp/empPersonInfo/getHREmpInfoByAccount",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"account": account}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var personId = result.id;
                $('#personId').val(personId);
                var headshipRank = result.headshipRank;//职级
                var rank = $.hrUtils.getHRCodeNameById(headshipRank);
                $('#rank').val(rank);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    })

}

/**
 *根据id查询请假申请信息
 */
function getNoPunchInfoById(id) {
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"businessId": id}),
        success: function (data) {
            if (data.success) {
                var result = data.result.list;
                if (result != null && result.length > 0) {
                    $('#notPunchApplyId').val(result[0].id);
                    $('#personId').val(result[0].personId);
                    var notPunchDate = data.result.notPunchDate;
                    $("#notPunchDate").val(formatDate2(notPunchDate));
                    var signType = result[0].signType;
                    $('#signType').val(signType);
                    $("#realTime").val(result[0].realTime);

                    $("#reason").val(data.result.reason);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });
}

/**
 * 编辑校验
 */
function checkInfo() {
    if ($('#name').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入标题'};
        $.weui.alert(options);
        return false;
    } else if ($('#notPunchDate').val() == "" || $('#notPunchDate').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择未打卡日期'};
        $.weui.alert(options);
        return false;
    } else if ($('#notPunchDate').val() == "" || $('#notPunchDate').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择未打卡申请类型'};
        $.weui.alert(options);
        return false;
    } else if ($('#realTime').val() == "" || $('#realTime').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择实际到岗或离岗时间'};
        $.weui.alert(options);
        return false;
    } else if ($('#reason').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入未打卡原因'};
        $.weui.alert(options);
        return false;
    }
    return true;
}

/**
 * 保存之前先校验
 */
function checkDuplicate() {
    var postDto = {};
    var id = $('#notPunchApplyId').val();
    var notPunchDate = $("#notPunchDate").val();
    notPunchDate = notPunchDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    postDto.notPunchDate = notPunchDate;
    var personId = $("#personId").val();
    postDto.personId = personId;
    var signType = $('#signType').val();
    postDto.signType = signType;//签到类型
    var signTypeValue = $("#signType").find("option:selected").text();
    if (type == "update") {
        postDto.update = "update";
        postDto.id = id;
    }
    var b = true;
    $('#loadingToast').css('display', 'block');//開遮罩
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/queryDuplicateList",
        type: 'POST',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postDto),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.length > 0) {
                    var options = {title: '提示', text: "当天已有" + signTypeValue + "的未打卡记录，请重新选择日期或未打卡申请类型！"};
                    $.weui.alert(options);
                    $('#loadingToast').css('display', 'none');
                    b = false;
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
    $('#loadingToast').css('display', 'none');
    return b;
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
