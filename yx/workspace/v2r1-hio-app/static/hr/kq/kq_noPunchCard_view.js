/**
 * 考勤漏打卡申请
 */
// (function ($, window, document, undefined) {
var noPunchApplyId;//请假申请id
var applyId;//系统申请表单据id
var deptComList;//部门和公司映射
var personId;
var businessId;
$(function () {
    resizeHeight();
    pageInit();
    personId = $.xljUtils.getUrlParam("personId");
    businessId = $.xljUtils.getUrlParam("businessId");
    $("#applicant").val(personId);
    $("#personId").val(personId);

    if (businessId == undefined || businessId == null || businessId == '') {
        $('title').text("未打卡申请-新增");
        $(".xj-form-title").text("未打卡申请-新增");
    } else {
        $('title').text("未打卡申请-修改");
        $(".xj-form-title").text("未打卡申请-修改");
        getNoPunchInfoById(businessId);//根据businessId查询
    }
    resizeGrid();
});

function pageInit() {
    initDatetimepicker();
    querySignTypeList();
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    var id = $('notPunchId').val();
    refreshParent(id);
    window.close();
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 90) + "px");
    //右侧table
    $(".con-table .mytable").height((w_h - 180) / 3 + "px");
    //xj-main-grid grid-container
}

//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    $.xljUtils.gridResizeFn();
}

//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});


/**
 * 清空人员
 */
window.emptyPerson = function () {
    $("#applicantName").val("");
    $("#applicant").val("");
    $("#deptName").val("");
    $("#companyId").val("");
    $("#companyName").val("");
    $("#deptId").empty();
};

//查询当天的打卡记录
window.signCheck = function () {
    var realArrivalTime = $("#realArrivalTime").val();
    var realLeaveTime = $("#realLeaveTime").val();
    var notPunchDate = $("#notPunchDate").val().replace(/-/g, '/');
    if (realArrivalTime > realLeaveTime) {
        $("#realArrivalTime").val(null);
        $("#realLeaveTime").val(null);
        pop_tip_open("red", "到岗时间不能大于离岗时间！");
        return;
    }
    var nowDate = new Date();
    if (new Date(notPunchDate).getTime() > nowDate.getTime()) {
        pop_tip_open("red", "不能选择当前日期之后的日期！");
        $("#realArrivalTime").val(null);
        $("#realLeaveTime").val(null);
        $("#notPunchDate").val(null);
        return;
    }
    var urlBody = "kq/hrKqSign/querySignInfo";
    var urlAll = hostUrl + urlBody;
    var personId = $("#personId").val();
    var date = $("#notPunchDate").val();
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"personId": personId, "date": date}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result != null && result.length > 0) {//有打卡记录
                    $("#realArrivalTime").css("color", "");

                    $("#realLeaveTime").css("color", "");
                    var signInTimeS = result[0].signInTime;
                    var signOutTimeS = result[0].signOutTime;
                    var signInTime = "";
                    var signOutTime = "";
                    if (signInTimeS !== null && signInTimeS.length >= 16) {
                        signInTime = signInTimeS.substring(11, 16);
                    }
                    if (signOutTimeS !== null && signInTimeS.length >= 16) {
                        signOutTime = signOutTimeS.substring(11, 16);
                    }
                    if (signInTime === null || signInTime === "") {
                        $("#realArrivalTime").css("color", "red");
                        $("#signInTime").val("");
                        $("#notPunchApplyFrom").find("input[id='realArrivalTime']").val("");
                        // $("#realArrivalTime").val("");
                        $("#realArrival").show();
                        $("#realArrival2").hide();
                    } else {
                        $("#notPunchApplyFrom").find("input[id='realArrivalTime']").val(signInTime);
                        $("#notPunchApplyFrom").find("input[id='realArrivalTime2']").val(signInTime);
                        $("#signInTime").val(signInTime);
                        // $("#realArrivalTime").val(signInTime);
                        $("#realArrival").hide();
                        $("#realArrival2").show();
                    }
                    if (signOutTime === null || signOutTime === "") {
                        $("#realLeaveTime").css("color", "red");
                        $("#signOutTime").val("");
                        // $("#realLeaveTime").val("");
                        $("#notPunchApplyFrom").find("input[id='realLeaveTime']").val("");

                        $("#realLeave").show();
                        $("#realLeave2").hide();
                    } else {
                        $("#signOutTime").val(signOutTime);
                        $("#notPunchApplyFrom").find("input[id='realLeaveTime']").val(signOutTime);
                        $("#notPunchApplyFrom").find("input[id='realLeaveTime2']").val(signOutTime);

                        // $("#realLeaveTime").val(signOutTime);
                        $("#realLeave").hide();
                        $("#realLeave2").show();
                    }
                } else if (result === null) {
                    $("#realArrivalTime").css("color", "red");

                    $("#realLeaveTime").css("color", "red");
                    $("#signInTime").val("");
                    $("#notPunchApplyFrom").find("input[id='realArrivalTime']").val("");
                    $("#notPunchApplyFrom").find("input[id='realLeaveTime']").val("");
                    $("#notPunchApplyFrom").find("input[id='realArrivalTime2']").val("");
                    $("#notPunchApplyFrom").find("input[id='realLeaveTime2']").val("");
                    // $("#realArrivalTime").val("");
                    $("#signOutTime").val("");
                    // $("#realLeaveTime").val("");
                    $("#realArrival").show();
                    $("#realArrival2").hide();
                    $("#realLeave").show();
                    $("#realLeave2").hide();
                }

                // queryWorkList();
                checkIfDuplicate();//未打卡申请重复查询

            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
};

/**
 * 初始化附件
 * @param businessId 业务单据id
 */
window.initAttach = function (businessId) {
    $('.attachment-container').xljAttachment({
        appId: "HR",		//系统id
        businessId: businessId,//业务表单id
        categoryId: ATTACH_TYPE_KQWDK,//附件分类
        mode: "add",
        //singleUpload:true,	//单个上传
        singleUpload: false,	//多个上传
        autoSubmit: false,
        fromTempTable: false,
        serverAddr: ATTACH_SERVERADDR	//附件服务器地址
    });
};

/**
 * 修改附件
 * @param businessId 业务单据id
 */
window.editAttach = function (businessId) {
    $('.attachment-container').xljAttachment({
        appId: 'HR',
        businessId: businessId,
        categoryId: ATTACH_TYPE_KQWDK,
        mode: 'edit',
        serverAddr: ATTACH_SERVERADDR
    });
};


function checkIfDuplicate() {
    var duplicateFlag = false;
    var notPunchDate = $("#notPunchDate").val();
    var signType = $("#signType").val();//未打卡申请类型：签到/签退
    var conditionMap = {};
    if (type === 'add') {
        conditionMap = {
            "notPunchDate": notPunchDate,
            "personId": $("#personId").val(),
            "signType": signType
        };
    } else if (type === 'update') {
        conditionMap = {
            "notPunchDate": notPunchDate,
            "personId": $("#personId").val(),
            "update": "update",
            "id": noPunchApplyId,
            "signType": signType
        };
    }
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/queryDuplicateList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(conditionMap),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.length > 0) {
                    pop_tip_open("red", "当天已有未打卡记录，请重新选择日期！");
                    $("#notPunchDate").val("");
                    $("#realArrivalTime").val("");
                    $("#realArrivalTime2").val("");
                    $("#realLeaveTime").val("");
                    $("#realLeaveTime2").val("");
                    duplicateFlag = false;
                } else {
                    duplicateFlag = true;
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
    return duplicateFlag;
}

/**
 * 保存之前先校验
 */
function beforeSave(applyFlag) {
    var passFlag = false;//是否校验成功并成功保存（用于发起审批时首先保存数据）：true为通过 false为不通过
    var duplicateFlag = checkIfDuplicate();
    if (duplicateFlag == true) {//校验通过
        $("#sysNotPunchApplyFrom").attr("data-validate-success", "");
        $("#sysNotPunchApplyFrom").submit();

        $("#notPunchApplyFrom").attr("data-validate-success", "");
        $("#notPunchApplyFrom").submit();

        var flag = $("td").hasClass("has-error");
        if (flag == false) {
            //提交附件
            // $('.attachment-container').xljAttachmentSubmit();
            /* saveDocumentsForm(0);
             saveApplyForm(0);*/
            if (type === 'add') {
                // saveDocumentsForm(0);
                saveApplyForm(0, applyFlag);
            } else if (type === 'update') {
                // saveDocumentsForm(1);
                saveApplyForm(1, applyFlag);
            }
            passFlag = true;
        }
    }
    return passFlag;
}


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
                    $("#id").val(result[0].id);
                    $("#notPunchId").val(id);//未打卡id
                    $("#topicName").val(result[0].topicName);
                    $("#phone").val(result[0].phone);
                    $("#reason").val(result[0].reason);
                    var approvalStatusValue = result[0].approvalStatusValue;
                    var approvalStatus = result[0].approvalStatus;
                    $("#approvalStatus").val(approvalStatus);
                    $("#approvalStatusValue").val(approvalStatusValue);

                    $("#personId").val(result[0].personId);
                    $("#personName").val(result[0].personName);
                    $("#applicant").val(result[0].applicant);
                    $("#applicantName").val(result[0].personName);

                    var notPunchDate = result[0].notPunchDate;
                    $("#notPunchDate").val(new Date(changeTimeStyle(notPunchDate)).format("yyyy-MM-dd"));
                    var signType = result[0].signType;
                    $("#signType option[value='" + signType + "']").attr("selected", true);
                    $("#realLeaveTime").val(result[0].realLeaveTime);
                    //todo 实际到岗/离岗时间
                    $("#realTime").val(result[0].realTime);
                    applyId = result[0].applyId;
                    $("#applyId").val(applyId);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
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

function initDatetimepicker() {
    //年月日
    var picker = $('.datetimepicker2').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });

    //时分
    $('.datetimepicker3').datetimepicker({
        language: 'zh-CN',
        format: 'hh:ii',
        startView: 1,
        autoclose: true
    });
}


function codeFormatter(codeId) {
    var codeName = $.hrUtils.getHRCodeNameById(codeId);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
}

//针对IE进行时间转换
function changeTimeStyle(bTime) {
    var timePar = bTime.split(' ');
    var timeDate = timePar[0].split('-');
    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
    var later = new Date(bTime);
    return later;
}


/**
 * 查询工作日（整月）
 */

/*function queryWorkList() {
    var personId = $("#personId").val();
    var notPunchDate = $("#notPunchDate").val();
    var urlBody = "kq/hrKqSummary/queryWorkList";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "personId": personId,
            "notPunchDate": notPunchDate
        }),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result.length > 0 && !contains(result, notPunchDate)) {
                    pop_tip_open("red", notPunchDate + "不是工作日，请重新选择!");
                    $("#notPunchDate").val("");
                    return;
                } else if (result.length == 0) {
                    pop_tip_open("red", notPunchDate + "不是工作日，请重新选择!");
                    $("#notPunchDate").val("");
                    return;
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
    //
    checkIfDuplicate();//未打卡申请重复查询
}*/

/**
 * 查询选择的未打卡日期是否有请假记录
 */
function duplicateCheck() {
    var restFlag = true;
    var personId = $("#personId").val();
    var notPunchDate = $("#notPunchDate").val();
    if (notPunchDate != null) {
        var applyStartDate = notPunchDate + " 09:00";
        var applyEndDate = notPunchDate + " 18:00";
        var urlBody = "kq/hrKqRest/queryDuplicateList";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                "personId": personId,
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate
            }),
            success: function (data) {
                if (data.success == true) {
                    result = data.result;
                    if (result.length > 0) {
                        pop_tip_open("red", notPunchDate + "已有请假记录，请选择其他日期！");
                        $("#notPunchDate").val("");
                        $("#realArrivalTime").val("");
                        $("#realArrivalTime2").val("");
                        $("#realLeaveTime").val("");
                        $("#realLeaveTime2").val("");
                        restFlag = false;
                    } else {
                        restFlag = true;
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });

    }
    return restFlag;
}


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
 * 查询补卡类型列表
 */
function querySignTypeList() {
    $.ajax({
        url: hostUrl + "sys/sysCodeItem/queryList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"code_set_id": "1107"}),
        success: function (data) {
            if (data.success) {
                signTypeList = data.result;
                var selTypeObj = $("#signType");

                for (i in signTypeList) {
                    var typeId = signTypeList[i].sid;
                    var typeName = signTypeList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 发起流程后，平台调用我们的方法
 */
function flowCallBack() {
    var id = $('notPunchId').val();
    refreshParent(id);
}

/**
 * 校验
 * @return true?校验通过：校验没通过
 */
window.check = function () {
    //先校验表单
    $.xljUtils.customSingleValidate("#sysNotPunchApplyFrom");
    var validRet = $("#sysNotPunchApplyFrom").valid();
    //如果校验没有通过
    if (!validRet) {
        return validRet;
    }
    //再校验业务
    var passFlag = false;//是否校验成功并成功保存（用于发起审批时首先保存数据）：true为通过 false为不通过
    if (checkIfDuplicate() && duplicateCheck()) {
        // if (checkIfDuplicate()) {
        passFlag = true;
    } else {
        passFlag = false;
    }

    return passFlag;
};

// })(jQuery, window, document)