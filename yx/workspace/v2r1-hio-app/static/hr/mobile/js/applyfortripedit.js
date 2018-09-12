/**
 * lixd
 * 出差申请移动端js
 */
var tripType;//出差申请类型 1出差2公出
var applyId;//系统申请表单据id
var bussTypeList = {};//出差类型列表
//上来就执行
$(function () {
    tripType = $.xljUtils.getUrlParam("tripType");
    businessId = $.xljUtils.getUrlParam("businessId");
    personId = $.xljUtils.getUrlParam("personId");
    //为开始时间和结束时间赋值
    var nowDate = new Date().format("yyyy-MM-dd");
    $("#applyStartDate").val(nowDate);
    $("#applyEndDate").val(nowDate);

    queryBussTypeList();//显示出差类型

    if (businessId == undefined || businessId == null || businessId == '') {
        $("#destroyStatus").val("1081100727");//默认未销
        $('#personId').val(personId);
    } else {
        getKqBussInfoById(businessId);
    }
    //计算出差天数
    calculateBussDays();
});

/**
 * 校验
 * @return true?校验通过了：校验没通过
 */
function check() {
    var applyStartDate = $("#applyStartDate").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    applyStartDate = applyStartDate + " " + applyStartTime;
    applyEndDate = applyEndDate + " " + applyEndTime;
    applyStartDate = applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    applyEndDate = applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    //校验必填、时间段选择、是否存在出差、请假信息
    if (checkInfo() && calculateBussDays() && checBussTripDuplicate(applyStartDate, applyEndDate) && checkRestDuplicateList(applyStartDate, applyEndDate)) {
        return true;
    } else {
        return false;
    }
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
 * 查询出差类型列表
 */
function queryBussTypeList() {
    var bussType = $.xljUtils.getUrlParam("tripType");
    if (bussType == '1') {//出差
        bussType = "01";
    } else if (bussType == '2') {//公出
        bussType = "02";
    }
    $.ajax({
        url: hostUrl + "kq/hrKqBusstypeSetting/queryListByCondition",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({"status": "1092100169", "bussType": bussType}),//只查询启用状态的出差类型
        success: function (data) {
            if (data.success) {
                bussApplyTypeList = data.result;
                var selTypeObj = $("#tripType");

                for (i in bussApplyTypeList) {
                    var typeId = bussApplyTypeList[i].id;
                    var typeName = bussApplyTypeList[i].name;
                    bussTypeList[typeId] = bussApplyTypeList[i];
                    // if (typeId != '1079100142') {
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    // }
                }
                $("#tripType option:first").prop("selected", 'selected');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

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
 *根据id查询出差申请信息
 */
function getKqBussInfoById(id) {
    var bussType = $.xljUtils.getUrlParam("tripType");
    var param = {};
    param.businessId = id;
    if (2 == bussType) {
        param.ifPublicType = "true";
    }
    $.ajax({
        url: hostUrl + "kq/hrKqBussTrip/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(param),
        success: function (data) {
            if (data.success) {
                var result = data.result.list;
                if (result != null && result.length > 0) {
                    $('#bussTripId').val(result[0].id);//赋值出差表id
                    //业务表主键
                    $("#id").val(result[0].id);

                    $("#personId").val(result[0].personId);
                    //主题
                    $("#topicName").val(result[0].topicName);
                    //出差类型
                    var tripType = result[0].tripType;
                    $('#tripType').val(tripType);
                    //出行方式
                    var tripWay = result[0].tripWay;
                    $("#tripWay").val(tripWay);
                    $("#applyTripDays").val(result[0].applyTripDays);
                    var applyStartDate = result[0].applyStartDate;
                    var applyEndDate = result[0].applyEndDate;
                    if (applyStartDate != null) {
                        $("#applyStartDate").val(applyStartDate.substring(0, 10));
                        // $('#applyStartTime').val(applyStartDate.substring(11, 16));
                        $("#applyStartTime option[value='" + applyStartDate.substring(11, 16) + "']").attr("selected", true);
                    }
                    if (applyEndDate != null) {
                        $("#applyEndDate").val(applyEndDate.substring(0, 10));
                        // $('#applyEndTime').val(applyEndDate.substring(11, 16));
                        $("#applyEndTime option[value='" + applyEndDate.substring(11, 16) + "']").attr("selected", true);
                    }

                    $("#destroyStatus").val(result[0].destroyStatus);

                    applyId = result[0].applyId;
                    $("#applyId").val(applyId);
                    $("#reason").val(result[0].reason);

                    var location = result[0].location;
                    $('#location').val(location);
                    var destination = result[0].destination;
                    $('#destination').val(destination);
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
 * @return boolean
 */
function checkInfo() {
    var starttime = $('#applyStartDate').val();
    var endtime = $('#applyEndDate').val();
    if (starttime == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择出差开始时间'};
        $.weui.alert(options);
        return false;
    } else if (endtime == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择出差结束时间'};
        $.weui.alert(options);
        return false;
    }
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    starttime = starttime + " " + applyStartTime;
    endtime = endtime + " " + applyEndTime;
    starttime = starttime.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    endtime = endtime.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "");
    if ($('#topicName').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入主题'};
        $.weui.alert(options);
        $('#topicName').focus();
        return false;
    } else if (starttime == "" || starttime == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择出差开始时间'};
        $.weui.alert(options);
        return false;
    } else if (endtime == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择出差结束时间'};
        $.weui.alert(options);
        return false;
    } else if ($('#tripType').val() == "" || $('#tripType').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请选择出差类型'};
        $.weui.alert(options);
        return false;
    } else if ($('#reason').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入出差事由'};
        $.weui.alert(options);
        return false;
    } else if ($('#location').val() == "" || $('#location').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入出发地点'};
        $.weui.alert(options);
        return false;
    } else if ($('#destination').val() == "" || $('#destination').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入到达地点'};
        $.weui.alert(options);
        return false;
    }
    //出差的出行方式必填，公出非必填 与pc端逻辑保存一致
    else if (tripType == '1' && $('#tripWay').val() == "" || $('#tripWay').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入出行方式'};
        $.weui.alert(options);
        return false;
    } else if ($('#applyTripDays').val() == "" || $('#applyTripDays').val() == null) {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入出差天数'};
        $.weui.alert(options);
        return false;
    }
    else if (new Date(starttime).getTime() > new Date(endtime).getTime()) {
        var options = {title: '提示', text: "开始时间不得晚于结束时间！"};
        $.weui.alert(options);
        return false;
    }
    return true;
}

/**
 * 校验出差信息是否存在
 * @return boolean
 */
function checBussTripDuplicate(applyStartDate, applyEndDate) {
    var postDto = {};
    postDto.applyStartDate = applyStartDate;
    postDto.applyEndDate = applyEndDate;
    var personId = $("#personId").val();
    postDto.personId = personId;

    if (businessId == undefined || businessId == null || businessId == '') {

    } else {//修改
        postDto.update = "update";
        var id = $('#id').val();
        postDto.id = id;
    }

    var b = true;
    $.ajax({
        url: hostUrl + "kq/hrKqBussTrip/queryDuplicateList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postDto),
        async: false,
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.length > 0) {
                    var options = {title: '提示', text: "当前时间段已有出差记录，请重新选择开始结束日期！"};
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
}

/**
 * 校验 时间段内是否存在出差信息
 * @param applyStartDate
 * @param applyEndDate
 * @return boolean
 */
function checkRestDuplicateList(applyStartDate, applyEndDate) {
    var personId = $("#personId").val();
    if (personId === null || personId === "" || personId == undefined) {
        var options = {title: '提示', text: "无法获取人员信息！"};
        $.weui.alert(options);
        return false;
    }
    var postDto = {};
    postDto.applyStartDate = applyStartDate;
    postDto.applyEndDate = applyEndDate;
    postDto.personId = personId;

    if (businessId == undefined || businessId == null || businessId == '') {

    } else {//修改
        postDto.update = "update";
        var id = $('#id').val();
        postDto.id = id;
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
                if (result.length > 0) {
                    var options = {title: '提示', text: "当前时间段已有请假申请记录，不允许申请出差！"};
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
}


/**
 * 计算出差天数时间段
 * @return boolean
 */
window.calculateBussDays = function () {
    var tripType = $("#tripType").val();
    if (tripType === null || tripType === "" || tripType == undefined) {
        var options = {title: '提示', text: "出差类型不能为空"};
        $.weui.alert(options);
        return false;
    }
    var tripTypeText = $("#tripType").find("option:selected").text();
    var bussTypeDto = bussTypeList[tripType];
    var calculateRule = bussTypeDto.calculateRule;//1088100158  工作日  1088100159 自然日

    var days = 0;
    if (calculateRule == "1088100158") {
        days = calculateWorkDays();
    } else if (calculateRule == "1088100159") {
        days = calculateNatureDays();
    }
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        $("#applyEndDate").val(null);
        $("#applyStartDate").val(null);
        var options = {title: '提示', text: "开始时间不能大于结束时间"};
        $.weui.alert(options);
        return false;
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

        var options = {title: '提示', text: "开始时间不能大于结束时间"};
        $.weui.alert(options);
        return false;
    }
    $("#applyTripDays").val(days);
    return true;
};

/**
 * 工作日计算出差天数
 * @return {number}
 */
function calculateWorkDays() {
    var days = 0;
    var personId = $("#personId").val();
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    if (personId !== null && personId !== "" && isNaN(startDate) && isNaN(endDate)) {
        if (startDate > endDate) {
            var options = {title: '提示', text: "开始时间不能大于结束时间"};
            $.weui.alert(options);
            $("#applyStartDate").val("");
            $("#applyEndDate").val("");
            return;
        }
        days = getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime);
    }
    return days;
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
 * 自然日计算出差天数
 * @return {number}
 */
function calculateNatureDays() {
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
    return days;
}

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

/**
 * 工作日计算出差天数
 * 考勤方案，工作日选择的不对影响流程，需要提示
 */
function getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime) {
    var sum = 0;
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
                var msg = "";
                var result = data.result;
                if (result != undefined && result != null) {
                    var resultList = result["list"];
                    sum = result["sum"];
                    var ifPlanSet = result["ifPlanSet"];
                    if (ifPlanSet == false) {
                        msg = "请先设置考勤方案!";
                        var options = {title: '提示', text: "请先设置考勤方案！"};
                        $.weui.alert(options);
                        sum = 0;
                        $("#applyStartDate").val("");
                        $("#applyEndDate").val("");
                        return;
                    }
                    if (!contains(resultList, startDate.substring(0, 10))) {
                        var options = {title: '提示', text: "开始时间不是工作日，请重新选择!"};
                        $.weui.alert(options);
                        sum = 0;
                        $("#applyStartDate").val("");
                        return;
                    }
                    if (!contains(resultList, endDate.substring(0, 10))) {
                        var options = {title: '提示', text: "结束时间不是工作日，请重新选择!"};
                        $.weui.alert(options);
                        sum = 0;
                        $("#applyEndDate").val("");

                    }
                    // $("#applyRestDays").val(sum);
                }
            } else {
                var options = {title: '提示', text: data.message};
                $.weui.alert(options);
                // $("#applyRestDays").val(0);
                sum = 0;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
    return sum;
}

//========================录入编辑时，只校验不提示，如果不符合校验规则，日期显示0天===================================================
/**
 * 计算出差天数时间段,只校验不提示
 */
window.calculateBussDays_new = function () {
    var tripType = $("#tripType").val();
    if (tripType === null || tripType === "" || tripType == undefined) {
        var options = {title: '提示', text: "出差类型不能为空"};
        $.weui.alert(options);
        return;
    }
    var tripTypeText = $("#tripType").find("option:selected").text();
    var bussTypeDto = bussTypeList[tripType];
    var calculateRule = bussTypeDto.calculateRule;//1088100158  工作日  1088100159 自然日

    var days = 0;
    if (calculateRule == "1088100158") {
        days = calculateWorkDays_new();
    } else if (calculateRule == "1088100159") {
        days = calculateNatureDays();
    }
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        // $("#applyEndDate").val(null);
        // $("#applyStartDate").val(null);
        // var options = {title: '提示', text: "开始时间不能大于结束时间"};
        // $.weui.alert(options);
        return;
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

        // var options = {title: '提示', text: "开始时间不能大于结束时间"};
        // $.weui.alert(options);
        return;
    }
    $("#applyTripDays").val(days);
};

/**
 * 工作日计算出差天数,只校验不提示
 * @return {number}
 */
function calculateWorkDays_new() {
    var days = 0;
    var personId = $("#personId").val();
    var startDate = $("#applyStartDate").val();
    var endDate = $("#applyEndDate").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndTime = $("#applyEndTime").val();

    if (personId !== null && personId !== "" && isNaN(startDate) && isNaN(endDate)) {
        if (startDate > endDate) {
            // var options = {title: '提示', text: "开始时间不能大于结束时间"};
            // $.weui.alert(options);
            // $("#applyStartDate").val("");
            // $("#applyEndDate").val("");
            return;
        }
        days = getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime);
    }
    return days;
}