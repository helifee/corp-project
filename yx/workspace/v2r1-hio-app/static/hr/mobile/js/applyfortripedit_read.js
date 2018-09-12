/**
 * lixd
 * 出差申请移动端js
 */
var tripType;//出差申请类型 1出差2公出
var bussApplyId;//出差申请id
var applyId;//系统申请表单据id
//上来就执行
$(function () {
    tripType = $.xljUtils.getUrlParam("tripType");
    businessId = $.xljUtils.getUrlParam("businessId");
    personId = $.xljUtils.getUrlParam("personId");
    //为开始时间和结束时间赋值
    var nowDate = new Date().format("yyyy-MM-dd");
    $("#applyStartDate").val(nowDate);
    $("#applyEndDate").val(nowDate);

    queryRestApplyTypeList();//显示出差类型

    if (businessId == undefined || businessId == null || businessId == '') {
        $("#destroyStatus").val("1081100727");//默认未销
    } else if (type === 'update') {
        bussApplyId = getQueryString("bussApplyId");
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
function queryRestApplyTypeList() {
    $.ajax({
        url: hostUrl + "kq/hrKqBussTrip/queryBussApplyTypeList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                bussApplyTypeList = data.result;
                var selTypeObj = $("#tripType");
                if (tripType == '1') {//出差
                    $('title').text("出差申请");
                    $('#tripWayN').text("*");//出行方式设为必填项
                    for (i in bussApplyTypeList) {
                        var typeId = bussApplyTypeList[i].id;
                        var typeName = bussApplyTypeList[i].name;
                        if (typeId != '1079100142') {//移除市内公出的
                            selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }
                    }
                } else if (tripType == '2') {//市内公出
                    $('title').text("公出申请");
                    $('#tripWayN').text();//出行方式设为非必填项
                    selTypeObj.append("<option value=" + "1079100142" + ">" + "市内公出" + "</option>");
                } else {//不指定都显示出来
                    $('title').text("出差申请");
                    for (i in bussApplyTypeList) {
                        var typeId = bussApplyTypeList[i].id;
                        var typeName = bussApplyTypeList[i].name;
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
                    //业务表主键
                    $("#bussApplyId").val(result[0].id);

                    $("#personId").val(result[0].personId);
                    var tripType = result[0].tripType;
                    $('#tripType').val(tripType);
                    var tripWay = result.tripWay;
                    $("#tripWay").val(tripWay);
                    $("#applyTripDays").val(result[0].applyTripDays);
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

                    $("#destroyStatus").val(result[0].destroyStatus);

                    applyId = result[0].applyId;
                    $("#applyId").val(applyId);
                    $("#reason").val(result[0].reason);

                    var location = result.location;
                    $('#location').val(location);
                    var destination = result.destination;
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
    if ($('#name').val() == "") {
        $('#loadingToast').css('display', 'none');
        var options = {title: '提示', text: '请输入标题'};
        $.weui.alert(options);
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
 */
function checBussTripDuplicate(applyStartDate, applyEndDate) {
    var postDto = {};
    postDto.applyStartDate = applyStartDate;
    postDto.applyEndDate = applyEndDate;
    var personId = $("#personId").val();
    postDto.personId = personId;
    if (type == 'update') {
        postDto.update = "update";
        var id = $('#bussApplyId').val();
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
 */
function checkRestDuplicateList(applyStartDate, applyEndDate) {
    var personId = $("#personId").val();
    if (personId === null || personId === "" || personId == undefined) {
        var options = {title: '提示', text: "无法获取人员信息！"};
        $.weui.alert(options);
    }
    var postDto = {};
    postDto.applyStartDate = applyStartDate;
    postDto.applyEndDate = applyEndDate;
    postDto.personId = personId;
    if (type == 'update') {
        postDto.update = "update";
        var id = $('#bussApplyId').val();
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
 * 编辑单据信息
 * @param sign  0?新增：修改
 */
function saveDocumentsForm(sign) {
    if (sign == 0) {
        //单据信息
        addSaveDocumentsForm();
    } else if (sign == 1) {
        //单据信息
        updateDocumentsForm(applyId);
    }
}

/**
 * 获取审批单信息
 * @returns {{}}
 */
function getSysApplyDto() {
    var sysApplyDto = {};
    //主键
    var id = $('#id').val();
    sysApplyDto.id = id;
    var code = $('#code').val();
    sysApplyDto.code = code;
    var name = $('#name').val();
    sysApplyDto.name = name;
    var type = $('#type').val();
    sysApplyDto.type = type;
    var applicant = $('#applicant').val();
    sysApplyDto.applicant = applicant;
    var applicantName = $('#applicantName').val();
    sysApplyDto.applicantName = applicantName;
    var deptId = $('#deptId').val();
    sysApplyDto.deptId = deptId;
    var deptName = $('#deptName').val();
    sysApplyDto.deptName = deptName;
    var companyId = $('#companyId').val();
    sysApplyDto.companyId = companyId;
    var companyName = $('#companyName').val();
    sysApplyDto.companyName = companyName;
    var creater = $('#creater').val();
    sysApplyDto.creater = creater;
    var createrName = $('#createrName').val();
    sysApplyDto.createrName = createrName;
    var createrOrgIdPlat = $('#createrOrgIdPlat').val();
    sysApplyDto.createrOrgIdPlat = createrOrgIdPlat;
    var createrOrgNamePlat = $('#createrOrgNamePlat').val();
    sysApplyDto.createrOrgNamePlat = createrOrgNamePlat;
    var applyDate = $('#applyDate').val();
    sysApplyDto.applyDate = applyDate;
    var status = $('#status').val();
    sysApplyDto.status = status;
    var remark = $('#remark').val();
    sysApplyDto.remark = remark;

    sysApplyDto.delflag = 0;
    return sysApplyDto;
}

/**
 * 编辑出差信息
 * @param sign 0：新增：修改
 */
function saveApplyForm(sign) {
    if (sign == 0) {
        //请假申请信息
        addSaveApplyForm();
    } else if (sign == 1) {
        //请假申请信息
        updateApplyForm(bussApplyId);
    }
}

/**
 * 获取出差信息数据
 */
function getHrKqBussTripDto() {
    var hrKqBussTripDto = {};
    var id = $('#bussApplyId').val();
    hrKqBussTripDto.id = id;
    var personId = $('#personId').val();
    hrKqBussTripDto.personId = personId;
    var applyId = $('#applyId').val();
    hrKqBussTripDto.applyId = applyId;
    var destroyStatus = $('#destroyStatus').val();
    hrKqBussTripDto.destroyStatus = destroyStatus;

    //开始结束时间的处理
    var applyStartDate = $("#applyStartDate").val();
    var applyStartTime = $("#applyStartTime").val();
    //开始结束时间的处理
    var applyEndDate = $("#applyEndDate").val();
    var applyEndTime = $("#applyEndTime").val();

    applyStartDate = applyStartDate + " " + applyStartTime;
    applyEndDate = applyEndDate + " " + applyEndTime;
    hrKqBussTripDto.applyStartDate = new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();
    hrKqBussTripDto.applyEndDate = new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime();

    var tripType = $('#tripType').val();
    hrKqBussTripDto.tripType = tripType;
    var applyTripDays = $('#applyTripDays').val();
    hrKqBussTripDto.applyTripDays = applyTripDays;
    var location = $('#location').val();
    hrKqBussTripDto.location = location;
    var destination = $('#destination').val();
    hrKqBussTripDto.destination = destination;
    var tripWay = $('#tripWay').val();
    hrKqBussTripDto.tripWay = tripWay;
    var reason = $('#reason').val();
    hrKqBussTripDto.reason = reason;

    hrKqBussTripDto.delflag = 0;

    return hrKqBussTripDto;
}

/**
 * 计算出差天数时间段
 */
window.calculateBussDays = function () {
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
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        $("#applyEndDate").val(null);
        $("#applyStartDate").val(null);
        var options = {title: '提示', text: "开始时间不能晚于结束时间！"};
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

        var options = {title: '提示', text: "开始时间不能晚于或等于结束时间！"};
        $.weui.alert(options);
        return false;
    }
    $("#applyTripDays").val(days);
    return true;
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
 * 计算出差天数时间段
 */
window.calculateBussDays_new = function () {
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
    var applyEndTime = $("#applyEndTime").val();
    var applyStartTime = $("#applyStartTime").val();
    var applyEndDate = $("#applyEndDate").val();
    var applyStartDate = $("#applyStartDate").val();

    if (new Date(applyStartDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime() > new Date(applyEndDate.replace(/-/g, '/').replace(/年|月/g, "/").replace(/日/g, "")).getTime()) {
        //开始时间不能晚于结束时间
        // $("#applyEndDate").val(null);
        // $("#applyStartDate").val(null);
        $("#applyTripDays").val(0);
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

        //开始时间不能晚于或等于结束时间
        $("#applyTripDays").val(0);
        return false;
    }
    $("#applyTripDays").val(days);
    return true;
};