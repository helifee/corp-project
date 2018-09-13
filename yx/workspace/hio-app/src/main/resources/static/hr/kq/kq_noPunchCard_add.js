// (function ($, window, document, undefined) {
// var restApplyTypeLists;
var noPunchApplyId;//请假申请id
var applyId;//系统申请表单据id
var duplicateResult;//日期重复校验
var deptComList;//部门和公司映射
var myKqFlag;//是否来自我的考勤（true 是）
var type;
$(function () {

    resizeHeight();
    pageInit();
    myKqFlag = $.xljUtils.getUrlParam("myKqFlag");
    if (myKqFlag == "true" || myKqFlag == true) {
        $("#selectApplicant1").hide();
        $("#selectApplicant2").hide();
    } else {
        $("#selectApplicant1").show();
        $("#selectApplicant2").show();
    }
    type = $.xljUtils.getUrlParam("type");
    if (type == 'add') {
        $('title').text("未打卡申请-新增");
        $(".xj-form-title").text("未打卡申请-新增");
        $("#saveBtn").show();
        $("#applyBtn").show();
        //initUuidDocuments();
        initSysApply();
        initUuidRestApply();
        // getHRUserInfo("admin");//测试
    } else if (type = 'update') {
        $('title').text("未打卡申请-修改");
        $(".xj-form-title").text("未打卡申请-修改");
        noPunchApplyId = window.opener.noPunchApplyId;
        getNoPunchInfoById(noPunchApplyId);
    }

    $("#saveBtn").on('click', function () {
            beforeSave();
        }
    );


    resizeGrid();
});

function pageInit() {

    attachmentInit();
    initDatetimepicker();
    querySignTypeList();

}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    var id=$('notPunchId').val();
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
    var urlAll = serviceUrl + urlBody;
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
 * 初始化单据信息
 */
function initUuidDocuments() {
    var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#sysNotPunchApplyFrom").find("input[name='id']").val(guuid);
            $("#notPunchApplyFrom").find("input[name='applyId']").val(guuid);
        }
    });

    //初始化申请单编号
    var applyCode = $.hrUtils.getApplyCodeByType('kqNoPunch');
    $("#code").val(applyCode);//申请日期
    var sysDate = new Date().format("yyyy-MM-dd");
    $("#applyDate").val(sysDate);//申请日期
    $("#status").val("1067100106");
    $("#notPunchApplyFrom").find("input[name='type']").val("1068100151");//未打卡申请
    // $("#type").val(APPLY_TYPE_QJXX);//请假申请
    // $("#applicant").val("1234");
    // $("#applicantName").val("张三");
    // $("#deptId").val("004a940dbcd54cafa13e3447b38e7e54");
    // $("#deptName").val("EHR事业部");
}

function initUuidRestApply() {
    var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#notPunchApplyFrom").find("input[name='id']").val(guuid);
        }
    });

    var destroyStatus = $.hrUtils.getHRCodeIdByName("1081", "未销");
    $("#destroyStatus").val(destroyStatus);//销假申请状态：未申请

    // var personId = $("#applicant").val();
    // $("#notPunchApplyFrom").find("input[name='personId']").val(personId);
}

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
    if (type == 'add') {
        conditionMap = {
            "notPunchDate": notPunchDate,
            "personId": $("#personId").val(),
            "signType": signType
        };
    } else if (type = 'update') {
        conditionMap = {
            "notPunchDate": notPunchDate,
            "personId": $("#personId").val(),
            "update": "update",
            "id": noPunchApplyId,
            "signType": signType
        };
    }
    $.ajax({
        url: serviceUrl + "kq/hrKqNotPunch/queryDuplicateList",
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
            $('.attachment-container').xljAttachmentSubmit();
            /* saveDocumentsForm(0);
             saveApplyForm(0);*/
            if (type == 'add') {
                saveDocumentsForm(0);
                saveApplyForm(0, applyFlag);
            } else if (type = 'update') {
                saveDocumentsForm(1);
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

function saveApplyForm(sign, applyFlag) {
    if (sign == 0) {
        //请假申请信息
        addSaveApplyForm();
    } else if (sign == 1) {
        //请假申请信息
        updateApplyForm(noPunchApplyId);
    }
    if (applyFlag != null && applyFlag != "") {
    } else {
        setTimeout(function () {
            window.close();
        }, 300);
    }
}


/**
 * 保存表单：保存单据信息
 */
function addSaveDocumentsForm() {
    // initUuidDocuments();
    //var sysApplyArr = $("#sysNotPunchApplyFrom").serializeArray();
    var sysApplyDto = {};
    // for (var i in sysApplyArr) {
    //
    //     // if (sysApplyArr[i].name == "postName" || sysApplyArr[i].name == "rankName") {
    //     // } else
    //
    //     if (sysApplyArr[i].name != "statusValue") {
    //         if (sysApplyArr[i].name == "applyDate") {
    //             var date = sysApplyArr[i].value.replace(/-/g, '/');
    //             if (date != "") {
    //                 sysApplyDto[sysApplyArr[i].name] = new Date(date).getTime();
    //             }
    //         } else {
    //             sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
    //         }
    //     }
    // }
    sysApplyDto.id = $("#id").val();
    sysApplyDto.type = $("#type").val();
    sysApplyDto.name = $("#name").val();
    sysApplyDto.code = $("#code").val();
    var applyDate = $("#applyDate").val();
    if (applyDate != "") {
        sysApplyDto.applyDate = new Date(applyDate.replace(/-/g, '/')).getTime();
    }
    sysApplyDto.applicant = $("#applicant").val();
    sysApplyDto.applicantName = $("#applicantName").val();
    sysApplyDto.deptName = $("#deptName").val();
    sysApplyDto.deptId = $("#deptId").val();
    sysApplyDto.companyId = $("#companyId").val();
    sysApplyDto.companyName = $("#companyName").val();
    sysApplyDto.creater = $("#creater").val();
    sysApplyDto.createrName = $("#createrName").val();
    sysApplyDto.status = $("#status").val();
    sysApplyDto.createrOrgIdPlat = $("#createrOrgIdPlat").val();
    sysApplyDto.createrOrgNamePlat = $("#createrOrgNamePlat").val();
    var approvalDate = $("#approvalDate").val();
    if (approvalDate != "") {
        sysApplyDto.approvalDate = new Date(approvalDate.replace(/-/g, '/')).getTime();
    }
    sysApplyDto.delflag = false;
    sysApplyDto.approvalDate = null;

    $.ajax({
        url: serviceUrl + "sys/sysApply/save",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(sysApplyDto),
        success: function (data) {
            if (data.success == true) {
                // pop_tip_open("blue", "保存成功！");
                // refreshParent();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 保存表单：新增请假
 */
function addSaveApplyForm() {
    initUuidRestApply();
    //var hrKqNotPunchArr = $("#notPunchApplyFrom").serializeArray();
    var hrKqNotPunchDto = {};
    // for (var i in hrKqNotPunchArr) {
    //     if (hrKqNotPunchArr[i].name == "notPunchDate") {
    //         var date = hrKqNotPunchArr[i].value.replace(/-/g, '/');
    //         if (date != "") {
    //             hrKqNotPunchDto[hrKqNotPunchArr[i].name] = new Date(date).getTime();
    //         }
    //     } else {
    //         hrKqNotPunchDto[hrKqNotPunchArr[i].name] = hrKqNotPunchArr[i].value;
    //     }
    // }

    hrKqNotPunchDto.id = $("#notPunchId").val();
    hrKqNotPunchDto.signType = $("#signType").val();
    hrKqNotPunchDto.personId = $("#personId").val();
    hrKqNotPunchDto.applyId = $("#applyId").val();
    hrKqNotPunchDto.signInTime = $("#signInTime").val();
    hrKqNotPunchDto.signOutTime = $("#signOutTime").val();
    var notPunchDate = $("#notPunchDate").val().replace(/-/g, '/');
    if (notPunchDate != '') {
        hrKqNotPunchDto.notPunchDate = new Date(notPunchDate).getTime();
    }
    var realTime = $("#realTime").val();
    hrKqNotPunchDto.realTime = realTime;
    hrKqNotPunchDto.reason = $("#reason").val();
    hrKqNotPunchDto.delflag = false;

    /* if (hrKqNotPunchDto.realArrivalTime > hrKqNotPunchDto.realLeaveTime) {
     pop_tip_open("red", "到岗时间不能大于离岗时间！");
     return;
     }

     var nowDate = new Date();
     if (hrKqNotPunchDto.notPunchDate > nowDate.getTime()) {
     pop_tip_open("red", "不能选择当前日期之后的日期！");
     return;
     }*/
    $.ajax({
        url: serviceUrl + "kq/hrKqNotPunch/save",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(hrKqNotPunchDto),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "保存成功！");
                refreshParent(hrKqNotPunchDto.id);
                // closeWindow();
                setTimeout(function () {
                    window.close();
                }, 300);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 *根据id查询请假申请信息
 */
function getNoPunchInfoById(id) {
    $.ajax({
        url: serviceUrl + "kq/hrKqNotPunch/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"notPunchApplyId": id}),
        success: function (data) {
            if (data.success) {
                var result = data.result.list;
                $("#id").val(result[0].id);
                $("#notPunchId").val(id);//未打卡id
                $("#name").val(result[0].name);
                var status = result[0].status;
                // var statusValue = codeFormatter(status);
                // if (statusValue == null) {
                //     statusValue = "";
                // }
                $("#status").val(status);
                $("#statusValue").val(status);
                if (status != "草稿") {
                    $("#saveBtn").hide();
                    $("#applyBtn").hide();
                } else {
                    $("#saveBtn").show();
                    $("#applyBtn").show();
                }
                $("#personId").val(result[0].personId);
                $("#applicant").val(result[0].applicant);
                $("#applicantName").val(result[0].personName);
                // $("#postId").val(result[0].postId);
                // $("#postName").val(result[0].postName);
                // $("#rankId").val(result[0].rankId);
                $("#type").val(result[0].type);
                $("#code").val(result[0].code);
                $("#deptId").val(result[0].deptId);
                $("#deptName").val(result[0].deptName);

                $("#companyId").val(result[0].companyId);
                $("#companyName").val(result[0].companyName);

                $("#creater").val(result[0].creater);
                $("#createrName").val(result[0].createrName);

                var applyDate = result[0].applyDate;
                // if (applyDate = null || applyDate == "") {
                //     applyDate = "0000-00-00 00:00";
                // }
                $("#applyDate").val(applyDate);
                $("#approvalDate").val(result[0].approvalDate);
                var notPunchDate = result[0].notPunchDate;
                $("#notPunchDate").val(new Date(changeTimeStyle(notPunchDate)).format("yyyy-MM-dd"));
                // $("#realArrivalTime").val(result[0].realArrivalTime);
                // $("#realLeaveTime").val(result[0].realLeaveTime);
                var signType = result[0].signType;
                $("#signType option[value='" + signType + "']").attr("selected", true);
                $("#realLeaveTime").val(result[0].realLeaveTime);
                //todo 实际到岗/离岗时间
                $("#realTime").val(result[0].realTime);
                //制单人所属机构
                $("#sysNotPunchApplyFrom").find("input[name='createrOrgIdPlat']").val(result[0].createrOrgIdPlat);
                $("#sysNotPunchApplyFrom").find("input[name='createrOrgNamePlat']").val(result[0].createrOrgNamePlat);
                applyId = result[0].applyId;
                $("#applyId").val(applyId);

                //基本信息回显
                getEmpById(result[0].personId);
                //回显审批单信息
                getSysApplyById(applyId);
                $("#reason").val(result[0].reason);

                editAttach(applyId);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

function getEmpById(id) {
    if (id == null || id == "") {
        id = $("#personId").val();
    }
    // var urlBody = "emp/empPersonInfo/getEmpById/"+id;
    var urlBody = "emp/empPersonInfo/getEmpById/" + id;
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'GET',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        // data: JSON.stringify({"orgId": orgId}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var personId = result.id;
                $('#personId').val(personId);
                $('#orgId').val(result.orgId);
                $("#personName").val(result.name);
                var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                $("#hrDeptId").val(result.deptId);
                $("#hrDeptName").val(deptName);
                // alert(result.postName);
                // alert($("#postName").val());
                var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                $("#headshipRank").val(headshipRank);
                $("#postName").val(result.postName);
                // $("#postName").val(result.postName);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/**
 * 获取申请单信息
 *修改,回显数据
 */
window.getSysApplyById = function (applyId) {
    var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#sysApplyFrom").find("input[name='id']").val(data.result.id);
            $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
            $("#sysApplyFrom").find("input[name='code']").val(data.result.code);
            //用户的信息
            //制单人
            $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
            $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
            //经办人
            $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
            $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

            $("#companyId").val(data.result.companyId);
            $("#companyName").val(data.result.companyName);

            // $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
            $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
            getDirectDeptAnaDirectComByUser(data.result.deptId);
            // var deptId = $("#deptId");
            // //先清空
            // deptId.empty();
            // deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

            //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
            //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
            $("#sysApplyFrom").find("input[name='applyDate']").val(data.result.applyDate);
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").val(status);
            //isBtnShow2Hide();
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
            // $("#sysApplyFrom").find("input[name='approvalDate']").val(data.result.approvalDate);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化申请单信息失败");
        }
    })
};

/**
 * 请假申请：附件
 * */
function attachmentInit() {
    //创建jqGrid组件
    jQuery("#listAattachmentInit").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            // width: $('.container-all').width() - 150,
            // height: $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 283,
            width: window.screen.availWidth - 20,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'name', label: "附件名称", width: 160, align: "center"},
                {name: 'sort', label: "附件分类", width: 100, align: "center"},
                {name: 'size', label: "附件大小", width: 100, align: "center"},
                {name: 'description', label: "说明", width: 80, align: "center"},
            ],

            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc"//排序方式,可选desc,asc
        });
}


/**
 * 更新单据信息
 */
function updateDocumentsForm(applyId) {
    //var sysApplyArr = $("#sysNotPunchApplyFrom").serializeArray();
    var sysApplyDto = {};
    // var str = "name,applicant,applicantName,deptName,deptId,companyId,companyName";
    // var array = str.split(",");
    // for (var i in sysApplyArr) {
    //     if (contains(array, sysApplyArr[i].name)) {
    //         // if (sysApplyArr[i].name == "name") {
    //         sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
    //     }
    // }
    sysApplyDto.name = $("#name").val();
    sysApplyDto.applicant = $("#applicant").val();
    sysApplyDto.applicantName = $("#applicantName").val();
    sysApplyDto.deptName = $("#deptName").val();
    sysApplyDto.deptId = $("#deptId").val();
    sysApplyDto.companyId = $("#companyId").val();
    sysApplyDto.companyName = $("#companyName").val();

    $.ajax({
        url: serviceUrl + "sys/sysApply/update/" + applyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(sysApplyDto),
        success: function (data) {
            if (data.success == true) {
                // pop_tip_open("blue", "保存成功！");
                // refreshParent();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 更新请假信息
 */
function updateApplyForm(noPunchApplyId) {
    //var hrKqNotPunchArr = $("#notPunchApplyFrom").serializeArray();
    var hrKqNotPunchDto = {};
    // for (var i in hrKqNotPunchArr) {
    //     if (hrKqNotPunchArr[i].name == "notPunchDate") {
    //         var date = hrKqNotPunchArr[i].value.replace(/-/g, '/');
    //         if (date != "") {
    //             hrKqNotPunchDto[hrKqNotPunchArr[i].name] = new Date(date).getTime();
    //         }
    //     } else {
    //         hrKqNotPunchDto[hrKqNotPunchArr[i].name] = hrKqNotPunchArr[i].value;
    //     }
    // }

    hrKqNotPunchDto.personId = $("#personId").val();
    hrKqNotPunchDto.signType = $("#signType").val();
    hrKqNotPunchDto.applyId = $("#applyId").val();
    hrKqNotPunchDto.signInTime = $("#signInTime").val();
    hrKqNotPunchDto.signOutTime = $("#signOutTime").val();
    var notPunchDate = $("#notPunchDate").val().replace(/-/g, '/');
    if (notPunchDate != '') {
        hrKqNotPunchDto.notPunchDate = new Date(notPunchDate).getTime();
    }
    var realTime = $("#realTime").val();
    hrKqNotPunchDto.realTime = realTime;
    hrKqNotPunchDto.reason = $("#reason").val();

    if (hrKqNotPunchDto.realArrivalTime > hrKqNotPunchDto.realLeaveTime) {
        pop_tip_open("red", "到岗时间不能大于离岗时间！");
        return;
    }
    var nowDate = new Date();
    if (hrKqNotPunchDto.notPunchDate > nowDate.getTime()) {
        pop_tip_open("red", "不能选择当前日期之后的日期！");
        return;
    }
    hrKqNotPunchDto.id = noPunchApplyId;
    $.ajax({
        url: serviceUrl + "kq/hrKqNotPunch/update/" + noPunchApplyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(hrKqNotPunchDto),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "保存成功！");
                refreshParent(hrKqNotPunchDto.id);
                // setTimeout(function () {
                //     window.close();
                // }, 300);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}


/**
 * 刷新父页面表格数据
 *@param editId
 */
function refreshParent(editId) {
    window.opener.jqGridKqNoPunch.jqGrid().trigger("reloadGrid");
    if (editId != null && editId != "") {
        window.opener.focusIdCallBack(editId);
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
        autoclose: true,
    });
}

//发起审批
$("#applyBtn").unbind('click').on('click', function () {
    //发起申请
    var applyId = $('#applyId').val();//业务申请单的id
    var passFlag = beforeSave(true);
    if (passFlag == true) {
        toApplyByObjectCode(BOCODE_KQWDK, applyId);
        // applyTest(BOCODE_KQWDK, applyId);
    }
});

/**
 * 仅测试使用
 * @param code
 * @param id
 */
function applyTest(code, id) {
    var urlBody = "kq/hrKqNotPunch/getBusinessObjectVar";
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"businessId": id, "businessObjectCode": code}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 初始化申请单信息
 * 默认经办人为当前制单人
 */
function initSysApply() {
    var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        async: false,
        url: uAll,
        success: function (data) {
            initAttach(data.result.id);
            var loginName = data.result.loginName;
            var flag = getHRUserInfo(loginName);
            if (flag == false) {
                pop_tip_open("red", "当前经办人【" + data.result.applicantName + "】与HR系统无法对应，请选择其他人员！");
                emptyPerson();
            } else if (flag == true) {
                //经办人
                $("#sysNotPunchApplyFrom").find("input[name='applicant']").val(data.result.applicant);
                $("#sysNotPunchApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

                $("#companyId").val(data.result.companyId);
                $("#companyName").val(data.result.companyName);

                // $("#deptId").val(data.result.deptId);
                // $("#deptName").val(data.result.deptName);
                // var dept = $("#deptId");
                // //先清空
                // dept.empty();
                // //机构信息
                // dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");
                //使用后台获取的直属部门的机构id赋值回显
                getDirectDeptAnaDirectComByUser(data.result.deptId);
            }
            $("#sysNotPunchApplyFrom").find("input[name='id']").val(data.result.id);
            $("#applyId").val(data.result.id);//业务表的关联id
            $("#sysNotPunchApplyFrom").find("input[name='name']").val(data.result.name);
            //初始化申请单编号
            var applyCode = $.hrUtils.getApplyCodeByType('kqNoPunch');
            $("#code").val(applyCode);
            //用户的信息
            //制单人
            $("#sysNotPunchApplyFrom").find("input[name='creater']").val(data.result.creater);
            $("#sysNotPunchApplyFrom").find("input[name='createrName']").val(data.result.createrName);

            //制单人所属机构
            $("#sysNotPunchApplyFrom").find("input[name='createrOrgIdPlat']").val(data.result.createrOrgIdPlat);
            $("#sysNotPunchApplyFrom").find("input[name='createrOrgNamePlat']").val(data.result.createrOrgNamePlat);

            var applyDate = data.result.applyDate.substring(0, 10);
            $("#sysNotPunchApplyFrom").find("input[name='applyDate']").val(applyDate);
            $("#sysNotPunchApplyFrom").find("input[name='type']").val(APPLY_TYPE_JGBZ);//机构编制申请

            //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
            //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
            var status = data.result.status;
            $("#status").val(status);
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysNotPunchApplyFrom").find("input[name='statusValue']").val(statusValue);
            // $("#sysNotPunchApplyFrom").find("input[name='approvalDate']").val("0000-00-00 00:00:00");
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化指标集请求失败");
        }
    })
}

/**
 * 用户选择回调方法
 */
function userCallback(data, success) {
    console.log(data);
    //经办人
    var userId = data.id;
    $('#applicant').val(userId);
    getDirectDeptAnaDirectComByUser();

    //业务表保存hr系统人员信息
    var loginName = data.loginName;
    var flag = getHRUserInfo(loginName);
    if (flag == false) {
        pop_tip_open("red", "当前经办人【" + data.name + "】与HR系统无法对应，请选择其他人员！");
        emptyPerson();
        return;
    }
}


/**
 * 根据平台账户获取人力系统用户信息
 * @param account  平台账户
 */
function getHRUserInfo(account) {
    var flag = false;//标志hr系统是否有当前人
    $.ajax({
        url: serviceUrl + "emp/empPersonInfo/getHREmpInfoByAccount",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"account": account}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result != null) {
                    flag = true;
                    var personId = result.id;
                    $('#personId').val(personId);
                    $("#personName").val(result.name);
                    var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                    $("#hrDeptId").val(result.deptId);
                    $("#hrDeptName").val(deptName);
                    $("#postName").val(result.postName);
                    var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                    $("#headshipRank").val(headshipRank);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    })
    return flag;
}

/**
 * 根据用户获取其所有组织的顶级部门和顶级公司
 * @param deptId1 修改时指定选择的值
 */
function getDirectDeptAnaDirectComByUser(deptId1) {
    //经办人
    var applicant = $('#applicant').val();
    var postData = {"userId": applicant};
    $.ajax({
        url: "/hr-app/sys/sysApply/getDirectDeptAnaDirectComByUser",
        type: 'POST',
        async:false,
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
                    if(deptId1!=undefined&&deptId1!=null&&deptId1!=''){
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
}

//新增页面
$("#deptId").change(function () {
    changeCompanyByDeptId();
});

/**
 * 根据机构改变公司
 */
function changeCompanyByDeptId() {
    //当前机构的默认值
    var deptId = $("#deptId").val();
    // alert("现在的机构ID是======"+deptId);
    $.each(deptComList, function (n, value) {
        if (value.directDeptId == deptId) {
            // $('#deptName').val(value.topDeptName);
            $('#deptName').val(value.directDeptAllName);
            $('#companyId').val(value.directCompId);
            $('#companyName').val(value.directCompName);
        }
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
function queryWorkList() {
    var personId = $("#personId").val();
    var notPunchDate = $("#notPunchDate").val();
    var urlBody = "kq/hrKqSummary/queryWorkList";
    var urlAll = serviceUrl + urlBody;
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
    // duplicateCheck();//请假查询
    checkIfDuplicate();//未打卡申请重复查询
}

/**
 * 查询选择的未打卡日期是否有请假记录
 */
function duplicateCheck() {
    var restFlag;
    var personId = $("#personId").val();
    var notPunchDate = $("#notPunchDate").val();
    if (notPunchDate != null) {
        var applyStartDate = notPunchDate + " 09:00";
        var applyEndDate = notPunchDate + " 18:00";
        var urlBody = "kq/hrKqRest/queryDuplicateList";
        var urlAll = serviceUrl + urlBody;
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
                        restFlag = true;
                    } else {
                        restFlag = false;
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }
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
        url: serviceUrl + "sys/sysCodeItem/queryList",
        type: 'POST',
        dataType: 'JSON',
        async:false,
        contentType: 'application/json',
        data: JSON.stringify({"code_set_id": "1107"}),
        success: function (data) {
            if (data.success) {
                signTypeList = data.result;
                var selTypeObj = $("#signType");

                for (i in signTypeList) {
                    var typeId = signTypeList[i].id;
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
    var id=$('notPunchId').val();
    refreshParent(id);
}
// })(jQuery, window, document)