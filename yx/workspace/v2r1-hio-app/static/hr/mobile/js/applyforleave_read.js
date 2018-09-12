/**
 * lixd
 * 请假申请移动端js
 */
var type;//编辑类型
var applyId;//系统申请表单据id
var typeStatus;//年假状态：启用/禁用
var annualRemainDays;//当前员工的年假剩余天数
var applyRegular;//年假限制设置
var annualInfo;//员工个人年假信息
var isSubmit = false;//是否发起
var restTypeList = {};//请假类型列表
//上来就执行
$(function () {
    type = getQueryString("type");
    var personId = getQueryString("personId");//人员id
    var businessId = getQueryString("businessId");//业务id
    $("#personId").val(personId);
    $("#businessId").val(businessId);
    var nowDate = new Date().format("yyyy-MM-dd");
    $("#applyStartDate").val(nowDate);
    $("#applyEndDate").val(nowDate);

    queryAnnualFormula();//年假限制设置
    queryAnnualTypeInfo("年假");
    queryRestApplyTypeList();//查询请假类型
    getLeaveDetail();//获取本年度人员请假明细
    if (businessId == undefined || businessId == '' || businessId == null) {
        $("#destroyStatus").val("1081100727");//默认未销
    } else {
        getKqRestInfoById(businessId);
    }
    queryAnnualInfoById(personId);
    annualCheck();
    //计算请假天数
    calculateRestDays2();
});

/**
 * 校验
 * @returns true?校验通过了：校验没通过
 */
function check() {
    var applyStartDate = $("#applyStartDate").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    applyStartDate = applyStartDate + " " + applyStartTime;
    applyEndDate = applyEndDate + " " + applyEndTime;
    //适配Android 和ios日期格式转化
    applyStartDate = applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    applyEndDate = applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    //校验必填项、时间段选择、出差、请假记录是否重复
    if (checkInfo() && calculateRestDays2() && checkRestDuplicateList(applyStartDate, applyEndDate)) {
        return true;
    } else {
        return false;
    }
}

//暂存
$("#saveDraft").on('click', function () {
    saveInfo();
});
//提交
$('#submitApp').click(function () {
    isSubmit = true;//编辑后提交
    saveInfo();
});

/**
 * 查询请假类型
 * 不同机构下的人员，请假类型可能不同
 */
function queryRestApplyTypeList() {
    var hrEmpInfo = $.hrUtils.getHREmpInfo();
    var orgId = hrEmpInfo.orgId;
    $.ajax({
        url: hostUrl + "kq/hrKqRest/queryRestApplyTypeList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"orgId": orgId}),
        async: false,
        success: function (data) {
            if (data.success) {
                var restApplyTypeList = data.result;
                //没有假期类型
                if (restApplyTypeList.length == 0) {
                    var options = {title: '提示', text: "请假类型的适用公司范围不包含人员所属的公司"};
                    $.weui.alert(options);
                }
                var selTypeObj = $("#restType");

                for (i in restApplyTypeList) {
                    var typeId = restApplyTypeList[i].id;
                    restTypeList[typeId] = restApplyTypeList[i];
                    var typeName = restApplyTypeList[i].name;
                    if (typeStatus == "1092100170" && restApplyTypeList[i].name != "年假") {//年假未启用
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    } else {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });
};
//请假天数
$('#applyRestDays').click(function () {
    annualCheck2();
});

/**
 * 年假检查
 */
function annualCheck2() {
    var applyRestDays = $("#applyRestDays").val();//请假天数
    var restType = $("#restType").find("option:selected").text();
    if (restType == "年假") {
        if (annualRemainDays < applyRestDays) {
            var options = {title: '提示', text: "您的年假天数仅剩" + annualRemainDays + "天，请调整时间或选择其他类型假期"};
            $.weui.alert(options);
        }
    }
};
/**
 *年假校验
 */
window.annualCheck = function () {
    var personId = $("#personId").val();
    var restType = $("#restType").find("option:selected").text();
    if (restType == "年假") {

        var a = document.getElementById("restType");
        if (annualInfo.length > 0) {
            annualRemainDays = annualInfo[0].annualRemainDays;
            $("#annualRemainDaysS").empty();
            $("#annualRemainDaysS").append("&nbsp;&nbsp;年假剩余" + annualRemainDays + "天");
            // var restType = $("#restType").find("option:selected").text();
            if (annualRemainDays <= 0) {
                a.options[0].selected = true;//默认选中第一个
                var options = {title: '提示', text: "您年假剩余天数是0，不能请年假"};
                $.weui.alert(options);
            }
        } else {
            var options = {title: '提示', text: "没有查到您的年假信息，请选择其他类型假期！"};
            $.weui.alert(options);
            a.options[0].selected = true;//默认选中第一个
        }
    } else {
        $("#annualRemainDaysS").empty();
    }
};

/**
 * 查询年假公式--年假限制设置
 */
function queryAnnualFormula() {
    $.ajax({
        url: hostUrl + "kq/hrAnnualFormula/queryLatelyInfo",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                applyRegular = result[0].applyRegular;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
};

//获取剩余请假天数
function queryAnnualInfoById(personId) {
    $.ajax({
        url: hostUrl + "kq/hrKqAnnual/queryAnnualDays",
        type: "post",
        data: JSON.stringify({"personId": personId}),
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result.list;
                annualInfo = data.result.list;
                annualRemainDays = result[0].annualRemainDays;
                var restType = $("#restType").find("option:selected").text();
                if (restType == "年假" && annualRemainDays <= 0) {
                    var a = document.getElementById("restType");
                    a.options[0].selected = true;//默认选中第一个
                    var options = {title: '提示', text: "您年假剩余天数是0，不能请年假"};
                    $.weui.alert(options);
                }
                if (annualInfo.length > 0) {
                    $("#annualRemainDays").val(annualInfo[0].annualRemainDays);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
};

//获取本年度休假明细
function getLeaveDetail() {
    var personInfoDto = $.hrUtils.getHREmpInfo();//获取当前登陆人员信息
    if (personInfoDto != null) {
        var postData = {};
        postData.personId = personInfoDto.id;
        $.ajax({
            type: "post",
            url: hostUrl + "kq/hrKqRest/queryListThisYearByPersonId",
            data: JSON.stringify(postData),
            contentType: "application/json",
            dataType: "JSON",
            success: function (data) {
                if (data.success) {
                    var records = data.result;
                    var len = records.length;
                    for (var i = 0; i < len; i++) {
                        var ul = $('<ul></ul>');
                        ul.append('<li>' + $.hrUtils.getKqHolidayTypeNameById(records[i].restType) + '</li>'
                            + '<li>' + records[i].applyRestDays + '天' + '</li>'
                            + '<li>' + records[i].applyStartDate.substring(0, 10) + '</li>'
                            + '<li>' + records[i].applyEndDate.substring(0, 10) + '</li>');
                        if (records[i].destroyStatus != null && records[i].destroyStatus != '') {
                            if (records[i].destroyStatus == '1081100725') {//已销假
                                ul.append('<li>已销假</li>'
                                    + '<li>' + records[i].realRestDays + '天</li>'
                                    + '<li>' + records[i].realStartDate.substring(0, 10) + '</li>'
                                    + '<li>' + records[i].realEndDate.substring(0, 10) + '</li>');
                            } else {

                            }
                        }
                        //追加到请假明细中
                        $('.lev_detail').append(ul);
                    }
                }
            },
            error: function () {
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
            }
        });
    }
};

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
 * 编辑校验
 */
function checkInfo() {

    var applyStartDate = $("#applyStartDate").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    applyStartDate = applyStartDate + " " + applyStartTime;
    applyEndDate = applyEndDate + " " + applyEndTime;
    //适配Android 和ios日期格式转化
    applyStartDate = applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    applyEndDate = applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");

    if ($('#name').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入标题'};
        $.weui.alert(options);
        return false;
    } else if ($('#applyStartDate').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择请假开始时间'};
        $.weui.alert(options);
        return false;
    } else if ($('#applyEndDate').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择请假结束时间'};
        $.weui.alert(options);
        return false;
    } else if ($('#applyRestDays').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入请假天数'};
        $.weui.alert(options);
        return false;
    } else if ($('#reason').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入请假事由'};
        $.weui.alert(options);
        return false;
    }
    else if (new Date(applyStartDate).getTime() > new Date(applyEndDate).getTime()) {
        var options = {title: '提示', text: "开始时间不得晚于结束时间！"};
        $.weui.alert(options);
        return false;
    }
    return true;
}

/**
 * 判断一个数是否包含在一个数组内
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
 * 根据假期类别名称查询信息
 */
function queryAnnualTypeInfo(name) {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryListByCondition",
        type: "post",
        data: JSON.stringify({"name": name}),
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                typeStatus = result[0].status;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
};


/**
 *根据id查询请假申请信息
 */
function getKqRestInfoById(businessId) {
    $.ajax({
        type: 'POST',
        url: hostUrl + "kq/hrKqRest/queryApplyList",
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"businessId": businessId}),
        success: function (data) {
            if (data.success) {
                var result = data.result.list;
                if (result != null && result.length > 0) {
                    $("#restApplyFormId").val(result[0].id);
                    $("#personId").val(result[0].personId);
                    var restType = result[0].restType;
                    $("#restType option[value='" + restType + "']").attr("selected", true);
                    $("#applyRestDays").val(result[0].applyRestDays);
                    var applyStartDate = result[0].applyStartDate;
                    var applyEndDate = result[0].applyEndDate;
                    if (applyStartDate != null) {
                        $("#applyStartDate").val(applyStartDate.substring(0, 10));
                        $('#applyStartTime').val(applyStartDate.substring(11, 16));
                    }
                    if (applyEndDate != null) {
                        $("#applyEndDate").val(applyEndDate.substring(0, 10));
                        $('#applyEndTime').val(applyEndDate.substring(11, 16));
                    }

                    $("#reason").val(result[0].reason);

                    $("#destroyStatus").val(result[0].destroyStatus);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });
};


/**
 * 保存之前先校验
 */
function checkRestDuplicateList(applyStartDate, applyEndDate) {
    var typeName = $("#restType").find("option:selected").text(); //请假类型
    var postDto = {};
    postDto.applyStartDate = applyStartDate;
    postDto.applyEndDate = applyEndDate;
    postDto.personId = $("#personId").val();
    var id = $('#restApplyFormId').val();
    var applyId = $('#applyId').val();
    if (type == 'update') {//如果是修改，不和本身比较
        postDto.update = "update";
        postDto.id = id;
        postDto.applyId = applyId;
    }
    var b = true;
    $.ajax({
        url: hostUrl + "kq/hrKqRest/queryDuplicateList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(postDto),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var applyRegulars = applyRegular.split(",");
                if (annualRemainDays > 0 && contains(applyRegulars, "4") == true && typeName == "事假") {//年假有剩余时不可申请事假
                    var options = {title: '提示', text: "年假有剩余时不可申请事假"};
                    $.weui.alert(options);
                    b = false;
                }

                if (annualRemainDays > 0 && contains(applyRegulars, "5") == true && typeName == "病假") {//年假有剩余时不可申请病假
                    var options = {title: '提示', text: "年假有剩余时不可申请病假"};
                    $.weui.alert(options);
                    b = false;
                }

                if (annualRemainDays == 0 && typeName == "年假") {//年假剩余天数为0不可申请年假
                    var options = {title: '提示', text: "您的年假天数已用完！"};
                    $.weui.alert(options);
                    b = false;
                }
                if (result.length > 0) {
                    var options = {title: '提示', text: "当前时间段已有请假记录，请重新选择开始结束日期！"};
                    $.weui.alert(options);
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
    return b;
};

/**
 * 校验所选时段是否有出差信息
 * @param applyStartDate
 * @param applyEndDate
 */
function queryBussDuplicateList(applyStartDate, applyEndDate) {
    var personId = $("#personId").val();
    if (personId === null || personId === "" || personId == undefined) {
        var options = {title: '提示', text: "无法获取人员信息！"};
        $.weui.alert(options);
    }
    $.ajax({
        url: hostUrl + "kq/hrKqBussTrip/queryDuplicateList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"applyStartDate": applyStartDate, "applyEndDate": applyEndDate, "personId": personId}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.length > 0) {
                    var options = {title: '提示', text: "当前时间段已有出差申请记录，不允许请假！"};
                    $.weui.alert(options);
                    return false;
                } else {
                    return true;
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });
};

//保存申请单信息
function saveDocumentsForm(sign) {
    if (sign == 0) {
        //单据信息
        addSaveDocumentsForm();
    } else if (sign == 1) {
        //单据信息
        updateDocumentsForm(applyId);
    }
};

/**
 * 获取请假信息数据
 */
function getHrKqRestDto() {
    var hrKqRestDto = {};
    var id = $('#restApplyFormId').val();
    hrKqRestDto.id = id;
    hrKqRestDto.delflag = 0;

    var personId = $('#personId').val();
    hrKqRestDto.personId = personId;
    var applyId = $('#applyId').val();
    hrKqRestDto.applyId = applyId;
    var destroyStatus = $('#destroyStatus').val();
    hrKqRestDto.destroyStatus = destroyStatus;
    var restType = $('#restType').val();
    hrKqRestDto.restType = restType;

    var applyStartDate = $('#applyStartDate').val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $('#applyEndDate').val();
    var applyEndTime = $("#applyEndTime").val();
    var annualRemainDays = $("#annualRemainDays").val();
    hrKqRestDto.annualRemainDays = annualRemainDays;

    applyStartDate = applyStartDate + " " + applyStartTime;
    applyEndDate = applyEndDate + " " + applyEndTime;
    hrKqRestDto.applyStartDate = new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    hrKqRestDto.applyEndDate = new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    var applyRestDays = $('#applyRestDays').val();
    hrKqRestDto.applyRestDays = applyRestDays;
    var reason = $('#reason').val();
    hrKqRestDto.reason = reason;
    return hrKqRestDto;
}

/**
 * 格式化日期
 * @param str
 * @returns {string}
 */
function formatDate(str) {
    var str1 = str.substring(0, 10);//年月日
    var str2 = str.substring(11, 16);//时分
    return str1 + "T" + str2;
}

/**
 * 初始化附件
 * @param businessId 业务单据id
 */
function initAttach(businessId) {
    $('#attachmentUpload').xljAttachment({
        appId: "HR",		//系统id
        businessId: businessId,//业务表单id
        categoryId: ATTACH_TYPE_KQQJ,
        mode: 'add',
        singleUpload: false,
        autoSubmit: true,//直接上传正式表，不存临时表
    });
};

/**
 * 修改附件
 * @param businessId 业务单据id
 */
function editAttach(businessId) {
    $('#attachmentUpload').xljAttachment({
        appId: "HR",		//系统id
        businessId: businessId,//业务表单id
        categoryId: ATTACH_TYPE_KQQJ,
        mode: 'edit',
        singleUpload: false,
    });
};
//计算请假天数
window.calculateRestDays2 = function () {
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        $("#applyEndDate").val(null);
        $("#applyStartDate").val(null);
        var options = {title: '提示', text: "开始时间不能大于结束时间！"};
        $.weui.alert(options);
        return false;
    }

    var restType = $("#restType").val();
    var result = restTypeList[restType];

    var calculateRule = result.calculateRule;
    if (calculateRule == "1088100158") {//工作日
        if (!calculateWorkDays()) {
            return false;
        }
    } else if (calculateRule == "1088100159") {//自然日
        getWorkDays2();
    }

    applyEndDate = applyEndDate + " " + applyEndTime;
    applyStartDate = applyStartDate + " " + applyStartTime;
    applyStartDate = new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    applyEndDate = new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    if (applyStartDate > applyEndDate) {
        var start = document.getElementById("applyStartTime");
        start.options[0].selected = true;//默认选中第一个

        var end = document.getElementById("applyEndTime");
        end.options[0].selected = true;//默认选中第一个

        var options = {title: '提示', text: "开始时间不能大于结束时间！"};
        $.weui.alert(options);
        return false;
    }
    return true;
};
/**
 * 计算工作日天数
 * @returns {string}
 */
window.calculateWorkDays = function () {
    var personId = $("#personId").val();
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    if (personId != null && personId != "" && startDate != null && startDate != "" && endDate != null && endDate != "") {
        if (!getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime)) {
            return false;
        }
    } else {
        $("#applyRestDays").val(0);
    }
    return true;
};
/**
 *工作日请假天数计算
 */
window.getWorkDays = function (personId, startDate, endDate, applyStartTime, applyEndTime) {
    var b = true;
    var urlBody = "kq/hrKqPbManage/queryWorkDays";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "personId": personId,
            "startDate": startDate,
            "endDate": endDate,
            "applyStartTime": applyStartTime,
            "applyEndTime": applyEndTime
        }),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var resultList = result["list"];
                var sum = result["sum"];
                var ss = startDate.substring(0, 10);
                if (!contains(resultList, startDate.substring(0, 10))) {
                    var options = {title: '提示', text: "开始时间不是工作日，请重新选择！"};
                    $.weui.alert(options);
                    $("#applyRestDays").val(0);
                    $("#applyStartDate").val("");
                    b = false;
                }
                if (!contains(resultList, endDate.substring(0, 10))) {
                    var options = {title: '提示', text: "结束时间不是工作日，请重新选择！"};
                    $.weui.alert(options);
                    $("#applyRestDays").val(0);
                    $("#applyEndDate").val("");
                    b = false;
                }
                var applyRestDays = result.length;
                $("#applyRestDays").val(sum);

            } else {
                var options = {title: '提示', text: data.msg};
                $.weui.alert(options);
                $("#applyRestDays").val(0);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
            b = false;
        }
    });
    return b;
};
/**
 * 自然日请假天数计算：不管排班
 */
window.getWorkDays2 = function () {
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    var days = 0;
    if (startDate != null && startDate != "" && endDate != null && endDate != "") {
        days = getDateDiff(startDate, endDate) + 1;
    }
    if ((applyStartTime == "09:00" && applyEndTime == "12:00") || (applyStartTime == "13:30" && applyEndTime == "18:00")) {//请半天
        days = days - 0.5;
        if (days < 0) {
            days = 0;
        }
    } else if (applyStartTime == "13:30" && applyEndTime == "12:00") {
        days = days - 1;
        if (days < 0) {
            days = 0;
        }
    }
    $("#applyRestDays").val(days);
};

/**
 * 计算两个时间相差的天数
 * @param date1
 * @param date2
 * @returns {number}
 */
function getDateDiff(date1, date2) {
    date1 = date1.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    date2 = date2.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    // var sArr = date1.split("/");
    // var eArr = date2.split("/");
    var sRDate = new Date(date1);
    var eRDate = new Date(date2);
    var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
    // return Math.abs(result);
    return Math.abs(result);
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
/**
 * 根据用户获取其所有组织的顶级部门和顶级公司
 * @param deptId1 修改时指定选择的值
 */
window.getDirectDeptAnaDirectComByUser = function (deptId1) {
    //经办人
    var applicant = $('#applicant').val();
    var postData = {"userId": applicant};
    $.ajax({
        url: hostUrl + "sys/sysApply/getDirectDeptAnaDirectComByUser",
        type: 'POST',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    var data = xhr.result;
                    console.log(data);
                    //赋值所属机构下拉
                    //部门公司映射
                    deptComList = data;
                    var deptId = $("#deptId");
                    //先清空
                    deptId.empty();

                    //遍历机构信息
                    $.each(data, function (n, value) {
                        deptId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
                    });
                    //修改页面指定回显
                    if (deptId1 != undefined && deptId1 != null && deptId1 != '') {
                        //赋值
                        deptId.val(deptId1);
                    }
                    //联动所属公司
                    changeCompanyByDeptId();
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", "获取直属部门和公司失败！");
                }
            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
};

//新增页面
$("#deptId").change(function () {
    changeCompanyByDeptId();
});
/**
 * 根据机构改变公司
 */
window.changeCompanyByDeptId = function () {
    //当前机构的默认值
    var deptId = $("#deptId").val();
    // alert("现在的机构ID是======"+deptId);
    $.each(deptComList, function (n, value) {
        //直属
        if (value.directDeptId == deptId) {
            // $('#deptName').val(value.directDeptName);
            $('#deptName').val(value.directDeptAllName);
            $('#companyId').val(value.directCompId);
            $('#companyName').val(value.directCompName);
        }
    });
};
//========================录入编辑时，只校验不提示，如果不符合校验规则，日期显示0天===================================================
/**
 * 计算请假天数,不提示
 * 如果不符合要求设置天数为0
 */
window.calculateRestDays2_new = function () {
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        //开始时间不能大于结束时间
        // $("#applyEndDate").val(null);
        // $("#applyStartDate").val(null);
        $('#applyRestDays').val(0);
        return false;
    }

    var restType = $("#restType").val();
    var result = restTypeList[restType];

    var calculateRule = result.calculateRule;
    if (calculateRule == "1088100158") {//工作日
        //计算工作日天数
        calculateWorkDays_new();
    } else if (calculateRule == "1088100159") {//自然日
        getWorkDays2_new();
    }

    applyEndDate = applyEndDate + " " + applyEndTime;
    applyStartDate = applyStartDate + " " + applyStartTime;
    applyStartDate = new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    applyEndDate = new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    if (applyStartDate > applyEndDate) {
        var start = document.getElementById("applyStartTime");
        start.options[0].selected = true;//默认选中第一个

        var end = document.getElementById("applyEndTime");
        end.options[0].selected = true;//默认选中第一个

        //开始时间不能大于结束时间
        $("#applyRestDays").val(0);
        return;
    }
};
/**
 * 计算工作日天数，不提示
 * @returns {string}
 */
window.calculateWorkDays_new = function () {
    var personId = $("#personId").val();
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    if (personId != null && personId != "" && startDate != null && startDate != "" && endDate != null && endDate != "") {
        //工作日请假天数计算
        getWorkDays_new(personId, startDate, endDate, applyStartTime, applyEndTime);
    } else {
        $("#applyRestDays").val(0);
    }
};
/**
 *工作日请假天数计算,不提示
 */
window.getWorkDays_new = function (personId, startDate, endDate, applyStartTime, applyEndTime) {
    var urlBody = "kq/hrKqPbManage/queryWorkDays";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "personId": personId,
            "startDate": startDate,
            "endDate": endDate,
            "applyStartTime": applyStartTime,
            "applyEndTime": applyEndTime
        }),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var resultList = result["list"];
                var sum = result["sum"];
                var ss = startDate.substring(0, 10);
                if (!contains(resultList, startDate.substring(0, 10))) {
                    //开始时间不是工作日
                    $("#applyRestDays").val(0);
                    // $("#applyStartDate").val("");
                    return;
                }
                if (!contains(resultList, endDate.substring(0, 10))) {
                    //结束时间不是工作日
                    $("#applyRestDays").val(0);
                    // $("#applyEndDate").val("");
                    return;
                }
                var applyRestDays = result.length;
                $("#applyRestDays").val(sum);

            } else {
                // var options = {title: '提示', text: data.msg};
                // $.weui.alert(options);
                $("#applyRestDays").val(0);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
};
/**
 * 自然日请假天数计算：不管排班,不提示
 */
window.getWorkDays2_new = function () {
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    var days = 0;
    if (startDate != null && startDate != "" && endDate != null && endDate != "") {
        days = getDateDiff(startDate, endDate) + 1;
    }
    if ((applyStartTime == "09:00" && applyEndTime == "12:00") || (applyStartTime == "13:30" && applyEndTime == "18:00")) {//请半天
        days = days - 0.5;
        if (days < 0) {
            days = 0;
        }
    } else if (applyStartTime == "13:30" && applyEndTime == "12:00") {
        days = days - 1;
        if (days < 0) {
            days = 0;
        }
    }
    $("#applyRestDays").val(days);
};