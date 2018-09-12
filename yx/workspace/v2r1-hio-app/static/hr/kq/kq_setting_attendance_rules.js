// (function ($, window, document, undefined) {
var flag = "false";//考勤期间是否重复
var attendanceRulesEditId;
var jqGridKqAddr;
var type;
var beforeOrgIds;//点击选择之前的机构
var beforeOrgNames;//点击选择之前的机构
var beforeUserIds;//点击选择之前的人员
var beforeUserNames;//点击选择之前的人员
var editAddressId;
var beforeHeight;


$(function () {
    // resizeHeight();
    beforeHeight = $(window).height();
    var headers_ = $.kqUtils.headers;
    $('#headers').val(JSON.stringify(headers_));
    type = $.xljUtils.getUrlParam("type");
    if (type === 'add') {
        $('title').text("出勤规则-新增");
        $(".xj-form-title").text("出勤规则-新增");
        initUuid();
        getKqSignAddressByPlanId2("----");
    } else if (type === 'update') {
        $('title').text("出勤规则-修改");
        $(".xj-form-title").text("出勤规则-修改");
        $("#name").bind("input propertychange", function () {
            $("#kqPlan").data("nameChanged", true);
        });
        // attendanceRulesEditId = window.opener.attendanceRulesEditId;
        attendanceRulesEditId = $.xljUtils.getUrlParam("attendanceRulesEditId");
        getAttendanceRulesById(attendanceRulesEditId);
        getKqSignAddressByPlanId2(attendanceRulesEditId);
        document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.
        function loadComplete() {
            if (document.readyState === "complete") { //当页面加载状态
                checkRegular();
                calendarReload();

            }
        }

    }

    //选择考勤人员
    $("#personOrOrgId").click(function () {
        attendancePersonSelect();
    });


    $("#selectPerson").on('click', function () {
        // empty();
        // var treeId = $.MultipleSelector.getTreeId();
        // if (treeId != null) {
        //     var treeObjS = $.fn.zTree.getZTreeObj("" + treeId + "");
        //     if (treeObjS != null) {
        //         var nodes = treeObjS.getSelectedNodes(true);
        //         if (nodes.length > 0) {
        //             treeObjS.cancelSelectedNode(nodes[0]);
        //         }
        //     }
        // }
        beforeUserIds = $("#userIds").val();
        beforeUserNames = $("#userNames").val();
        $("#selectPersonModal").click();
    });

    $("#selectOrg").on('click', function () {
        // empty();
        // var treeId = $.MultipleSelector.getTreeId();
        // if (treeId != null) {
        //     var treeObjS = $.fn.zTree.getZTreeObj("" + treeId + "");
        //     if (treeObjS != null) {
        //         var nodes = treeObjS.getSelectedNodes(true);
        //         if (nodes.length > 0) {
        //             treeObjS.cancelSelectedNode(nodes[0]);
        //         }
        //     }
        // }
        beforeOrgIds = $("#orgIds").val();
        beforeOrgNames = $("#orgNames").val();
        $("#selectOrgModal").click();
    });


    //默认正常考勤
    $(".normal").show();
    $(".flexible").hide();


    //新增签到地点
    $("#addKqAddress").on('click', function () {
        // window.open("kq_addr_add.html?type=add");
        if (type == "add") {
            $("#kqPlan").attr("data-validate-success", "");
            $("#kqPlan").submit();
        } else if (type == "update") {
            $("#kqPlan").attr("data-validate-success", "");
            $("#kqPlan").submit();
        }
        var flag = $("td").hasClass("has-error");
        if (flag == false) {
            openPa('kq_addr_add.html?type=add');
        }
    });

    //删除签到地点
    $("#deleteKqAddress").click(function () {
        deleteKqAddress();
    });
    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#kqPlan").attr("data-validate-success", "saveForm(0)");
            $("#kqPlan").submit();
        } else if (type == "update") {
            $("#kqPlan").attr("data-validate-success", "saveForm(1)");
            $("#kqPlan").submit();
        }
    });

    //返回
    $("#goBack").click(function () {
        window.location.href = "kq_setting.html";
    });

    pageInit();
    resizeGrid("init");
});

function pageInit() {
}

function openNewWindow(src) {
    window.open(src, "_blank", 'width=' + (window.screen.availWidth - 380) + ',height=' + (window.screen.availHeight - 260) + ',top=150, left=200');
}

function closeWindow() {
    window.close();
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    // var w_h = $(window).height();
//        $(".slide-left .ztree-box").height((w_h - 97) + "px");
    //右侧table
    // $(".con-table .mytable").height((w_h - 120) + "px");
}

//计算表格宽度
function resizeGrid(para) {
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 100);
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width() + 45, true);

    var nowHeight = $(window).height();
    //分别设置jqGrid列表的高度
    if (para !== undefined && para !== null && para === "init") {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 500);
    } else {
        if (nowHeight > beforeHeight) {//变大了
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() / 2 - 200);
        } else {//变小了
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() / 2 - 160);
        }
    }
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 400, true);

    beforeHeight = $(window).height();
    $.xljUtils.gridResizeFn();
}


//grid 自适应宽度
$(window).resize(function () {
    // resizeHeight();
    resizeGrid();
});

//表格上面 切换：考勤期间设置/节假日设置/假期类别设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('byrest') > 0) {
        $("#durDiv").css("display", "none");//考勤期间设置为none（隐藏）
        $("#restDiv").css("display", "block");//节假日设置设置为block（显示）
        $("#typeDiv").css("display", "none");//假期类别设置设置为block（显示）
    } else if ($(this).attr('class').indexOf('bytype') > 0) {
        $("#durDiv").css("display", "none");//考勤期间设置设置为none（隐藏）
        $("#restDiv").css("display", "none");//节假日设置设置为block（显示）
        $("#typeDiv").css("display", "block");//假期类别设置设置为block（显示）
    } else {
        $("#durDiv").css("display", "block");//考勤期间设置设置为block（显示）
        $("#restDiv").css("display", "none");//节假日设置设置为none（隐藏）
        $("#typeDiv").css("display", "none");//假期类别设置设置为none（隐藏）
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});

/**
 * 清空组织机构上级
 */
function empty() {
    $("#durAddForm").find("input[id='orgId']").val("");
    $("#durAddForm").find("input[id='belongOrgName']").val("");
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
            $("#kqPlan").find("input[name='id']").val(guuid);
            $("#planId").val();
            attendanceRulesEditId = guuid;
        }
    });
}


// /**
//  * 查询单条记录
//  */
// function getAttendanceRulesById(id) {
//     var flag = false;
//     var urlBody = "kq/hrKqPlan/get/" + id + "?time=" + Math.random();
//     var urlAll = hostUrl + urlBody;
//     $.ajax({
//         type: 'GET',
//         url: urlAll,
//         async: false,
//         success: function (data) {
//             if (data.success == true) {
//                 var result = data.result;
//                 $("#planId").val(result.id);
//                 $("#name").val(result.name);
//                 var ifCrossDay = result.ifCrossDay;
//                 var ifSign = result.ifSign;
//                 var attendanceRules = result.attendanceRules;
//                 $("input[name='ifCrossDay'][value=" + ifCrossDay + "]").attr("checked", true);
//                 $("input[name='ifSign'][value=" + ifSign + "]").attr("checked", true);
//                 $("input[name='attendanceRules'][value=" + attendanceRules + "]").attr("checked", true);
//                 $("#workInTime").val(result.workInTime);
//                 $("#lunchBreakStartTime").val(result.lunchBreakStartTime);
//                 $("#lunchBreakEndTime").val(result.lunchBreakEndTime);
//                 if (attendanceRules === "1257100771") {//正常考勤
//                     // $(".normal").show();
//                     // $(".flexible").hide();
//                     $("#workOutTime").val(result.workOutTime);
//                 } else if (attendanceRules === "1257100773") {//弹性考勤
//                     // $(".normal").hide();
//                     // $(".flexible").show();
//                     $("#workingHours").val(result.workingHours);
//                     $("#flexibleTime").val(result.flexibleTime);
//                 }
//                 flag = true;
//             }
//         }, error: function (XMLHttpRequest, textStatus, errorThrown) {
//             pop_tip_open("red", "服务异常,请联系管理员！");
//         }
//     });
//     return flag;
// }

/**
 * 查询单条记录
 */
function getAttendanceRulesById(id) {
    var flag = false;
    var urlBody = "kq/hrKqPlan/getKqPlanById";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        url: urlAll,
        async: false,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"planId": id}),
        success: function (data) {
            if (data.success == true) {
                var resultS = data.result;
                if (resultS != null && resultS.length > 0) {
                    var result = resultS[0];
                    $("#planId").val(result.id);
                    $("#name").val(result.name);
                    var ifCrossDay = result.ifCrossDay;
                    var ifSign = result.ifSign;
                    var attendanceRules = result.attendanceRules;
                    $("input[name='ifCrossDay'][value=" + ifCrossDay + "]").attr("checked", true);
                    $("input[name='ifSign'][value=" + ifSign + "]").attr("checked", true);
                    $("input[name='attendanceRules'][value=" + attendanceRules + "]").attr("checked", true);
                    $("#workInTime").val(result.workInTime);
                    $("#lunchBreakStartTime").val(result.lunchBreakStartTime);
                    $("#lunchBreakEndTime").val(result.lunchBreakEndTime);
                    if (attendanceRules === "1257100771") {//正常考勤
                        // $(".normal").show();
                        // $(".flexible").hide();
                        $("#workOutTime").val(result.workOutTime);
                    } else if (attendanceRules === "1257100773") {//弹性考勤
                        // $(".normal").hide();
                        // $(".flexible").show();
                        $("#workingHours").val(result.workingHours);
                        $("#flexibleTime").val(result.flexibleTime);
                    }
                    var orgName = result.orgName;
                    var orgId = result.orgId;
                    var personId = result.personId;
                    var personName = result.personName;

                    // var attendancePersonName = "";
                    if (orgName !== undefined && orgName != null && orgName !== "") {
                        // attendancePersonName += orgName;
                        $("#orgIds").val(orgId);
                        $("#orgNames").val(orgName);
                        // attendancePersonName += ",";
                    }

                    if (personName !== undefined && personName != null && personName !== "") {
                        // attendancePersonName += personName;
                        $("#userIds").val(personId);
                        $("#userNames").val(personName);
                    }
                    // $("#attendancePersonName").val(attendancePersonName);
                    flag = true;
                }
            } else {
                pop_tip_open("red", data.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
    return flag;
}

/**
 * 查询方案下的签到地点
 */
function getKqSignAddressByPlanId(planId) {
    var flag = false;
    var urlBody = "kq/hrKqAddr/queryAddrList";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        url: urlAll,
        async: false,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"planId": planId}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                flag = true;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
    return flag;
}

function getKqSignAddressByPlanId2(planId) {
    var ubody = "kq/hrKqAddr/queryAddrList";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridKqAddr = jQuery("#signAddressList").jqGrid(
        {
            url: uall,
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            postData: {"planId": planId},
            mtype: "POST",
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            jsonReader: {
                root: "result"
            },

            // rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 55, hidden: true},
                {name: 'signType', label: '打卡方式', width: 90, hidden: true, align: "center"},
                {name: 'signTypeValue', label: '打卡方式', width: 90, align: "center", hidden: true},
                {name: 'address', label: '打卡地点', width: 90, align: "center"},
                {name: 'ip', label: '网关', width: 90, align: "center"},
                {name: 'scope', label: '有效范围（米）', width: 90, align: "center"}
            ],
            autowidth: true,
            shrinkToFit: false,
            height: "100%",
            rowNum: -1,//一页显示多少条 -1全部
            sortname: "id",//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "查询出勤规则查询失败!");
            },
            loadComplete: function (data) {
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                editSignAddress(rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
}

/**
 * 保存表单
 */
function saveForm(sign) {
    addAttendancePerson();
    if (sign == 0) {//新增
        addSaveKqPlanForm(sign);
    } else if (sign == 1) {//编辑
        editSaveKqPlanForm(sign);
    }
}

/**
 * 新增考勤方案
 * @param sign
 */
function addSaveKqPlanForm(sign) {
    var hrKqPlanArr = $("#kqPlan").serializeArray();
    var hrKqPlanDto = {};
    for (var i in hrKqPlanArr) {
        if (hrKqPlanArr[i].name === 'id') {
            hrKqPlanDto['sid'] = hrKqPlanArr[i].value;
        } else {
            hrKqPlanDto[hrKqPlanArr[i].name] = hrKqPlanArr[i].value;
        }
    }
    hrKqPlanDto.delflag = 0;
    var id = hrKqPlanDto.sid;
    $.ajax({
        url: hostUrl + "kq/hrKqPlan/save",
        type: 'POST',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqPlanDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    pop_tip_open("blue", "保存成功！");
                    // refreshParent(id);
                    // closeWindow();
                    setTimeout(function () {
                        window.location.href = "kq_setting.html";
                    }, 1000);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            pop_tip_open("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 修改考勤方案
 * @param sign
 */
function editSaveKqPlanForm(sign) {
    var hrKqPlanArr = $("#kqPlan").serializeArray();
    var hrKqPlanDto = {};
    for (var i in hrKqPlanArr) {
        if (hrKqPlanArr[i].name === 'id') {
            hrKqPlanDto['sid'] = hrKqPlanArr[i].value;
        } else {
            hrKqPlanDto[hrKqPlanArr[i].name] = hrKqPlanArr[i].value;
        }
    }
    hrKqPlanDto.delflag = 0;
    var id = hrKqPlanDto.sid;
    $.ajax({
        url: hostUrl + "kq/hrKqPlan/update/" + id,
        type: 'PUT',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqPlanDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    pop_tip_open("blue", "保存成功！");
                    // refreshParent(id);
                    // closeWindow();
                    // setTimeout(function () {
                    //     window.location.href = "kq_setting.html";
                    // }, 1000);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            pop_tip_open("red", "服务异常,请联系管理员！");
        }

    });
}

function checkIfRename() {
    var name = $("#name").val();
    var ifChanged = $("#kqPlan").data("nameChanged");

    // 1.新增时校验
    // 2.修改且方案名称字段有修改时
    if (name != null && name != "" && type == 'add' || (type == 'update' && (ifChanged == true || ifChanged == "true"))) {
        $.ajax({
            url: hostUrl + "kq/hrKqPlan/queryIfRenamePlan",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({"name": name}),
            success: function (data) {
                if (data) {
                    if (data.success) {
                        renameFlag = data.result;
                        if (renameFlag == 'true') {
                            $("#name").val("");
                            $.xljUtils.tip("red", "您填写的方案名称已存在，请重新填写！");
                        }
                    } else {
                        pop_tip_open("red", "查询失败！");
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

}


/**
 * 查询单条记录
 */
function getKqPlanInfoById(id) {
    var urlBody = "kq/hrKqPlan/get/" + id + "?time=" + Math.random();
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'GET',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        // data: "{}",
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                $("#id").val(result.id);
                $("#name").val(result.name);
                var orgId = result.orgId;
                $("#orgId").val(orgId);
                $("#belongOrgName").val(orgFormatter(orgId));
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/**
 * 刷新父页面表格数据
 */
function refreshParent(editId) {
    // window.opener.kqShiftsPlanInit(id);

}


function checkRegular() {
    // var attendanceRules = $("#kqPlan").find("input[name='attendanceRules'][checked]").val();//出勤规则
    var attendanceRules = $("input[name='attendanceRules']:checked").val();
    var ifCrossDay = $("input[name='ifCrossDay']:checked").val();
    var ifSign = $("input[name='ifSign']:checked").val();

    if (attendanceRules !== undefined && attendanceRules !== null) {
        if (attendanceRules === "1257100771") {//正常考勤
            $(".normal").show();
            $(".flexible").hide();
        } else if (attendanceRules === "1257100773") {//弹性考勤
            $(".normal").hide();
            $(".flexible").show();
        }
    }

}

/**
 * 重新加载日历控件
 */
function calendarReload(sign) {
    document.getElementById('pbCalendar').contentWindow.location.reload(true);
    setIframeHeight(document.getElementById('pbCalendar'));

}

/**
 * 选择考勤人员
 */
function attendancePersonSelect() {
    openNewWindow("kq_setting_attendance_person.html");

}

/**
 * 多选机构的回调
 */
function orgCallback(data) {
    // var orgIds = $("#orgIds").val();
    // var orgNames = $("#orgNames").val();
    var orgIds = "";
    var orgNames = "";
    if (data.length === 0) {//没有选择任何机构
        return;
    }
    for (var i = 0; i < data.length; i++) {
        orgIds += data[i].id + ",";
        orgNames += data[i].prefixName + ",";
    }
    orgIds = orgIds.substring(0, orgIds.length - 1);
    orgNames = orgNames.substring(0, orgNames.length - 1);
    var orgIds_check = "";
    if (type === 'add') {
        orgIds_check = orgIds;
    } else if (type === 'update') {
        if (orgIds !== undefined && orgIds !== null && orgIds !== "") {
            var orgIds_arr = orgIds.split(",");
            if (beforeOrgIds !== undefined && beforeOrgIds !== null && beforeOrgIds !== "") {

                for (var i = 0; i < orgIds_arr.length; i++) {
                    var orgId_ = orgIds_arr[i];
                    if (!contains(beforeOrgIds.split(","), orgId_)) {
                        orgIds_check += orgId_ + ",";
                    }
                }
                orgIds_check = orgIds_check.substring(0, orgIds_check.length - 1);
            } else {
                orgIds_check = orgIds;
            }
        }
    }
    var result = attendancePersonCheck(1, orgIds_check);
    if (result !== undefined && result != null && result.length > 0) {
        if (orgIds != null && orgIds != "") {
            var orgIdArr = orgIds.split(",");
            for (var i = 0; i < result.length; i++) {
                if ($.inArray(result[i].orgOrPersonId, orgIdArr) != -1) {
                    pop_tip_open("red", "所选机构已设置考勤方案！");
                    $('#orgIds').val(beforeOrgIds);
                    $('#orgNames').val(beforeOrgNames);
                    $('#orgIds').attr("title", beforeOrgIds);
                    $('#orgNames').attr("title", beforeOrgNames);
                    break;
                }
            }
        }
    } else {
        $('#orgIds').val(orgIds);
        $('#orgNames').val(orgNames);
    }
}

/*
    选人回调方法，获取人员ids 更新操作  add by tangsq 20170719
    */
function personCallback(data) {
    console.log(data);
    // var userIds = $("#userIds").val();
    // var userNames = $("#userNames").val();
    var userIds = "";
    var userNames = "";
    var userIds_check = "";
    if (data.length === 0) {//没有选择任何人员
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var user_id;
        var data_id = data[i].id.split("/");
        if (data_id !== undefined && data_id != null) {
            user_id = data_id[data_id.length - 1];
        }
        userIds += user_id + ",";
        userNames += data[i].prefixName + "/" + data[i].name + ",";
        if (type === 'add') {
            userIds_check += user_id + ",";
        } else if (type === 'update') {
            if (beforeUserIds !== undefined && beforeUserIds !== null && beforeUserIds !== "") {
                if (!contains(beforeUserIds.split(","), user_id)) {
                    userIds_check += user_id + ",";
                }
            } else {
                userIds_check += user_id + ",";
            }
        }

    }
    userIds = userIds.substring(0, userIds.length - 1);
    var result = attendancePersonCheck(2, userIds_check);
    if (result !== undefined && result != null && result.length > 0) {

        if (userIds != null && userIds != "") {
            var userIdArr = userIds.split(",");
            for (var i = 0; i < result.length; i++) {
                if ($.inArray(result[i].orgOrPersonId, userIdArr) != -1) {
                    pop_tip_open("red", "所选人员已设置考勤方案！");
                    $('#userIds').val(beforeUserIds);
                    $('#userNames').val(beforeUserNames);
                    $('#userIds').attr("title", beforeUserIds);
                    $('#userNames').attr("title", beforeUserNames);
                }
            }
        }

    } else {
        $('#userIds').val(userIds);
        $('#userNames').val(userNames);
    }
}


/**
 * 添加出勤人员
 * @param sign
 */
function addAttendancePerson(sign) {
    var hrKqAttendancePersonDto = {};
    hrKqAttendancePersonDto.delflag = 0;
    var orgIds = $("#orgIds").val();
    var userIds = $("#userIds").val();
    var planId = $("#planId").val();
    hrKqAttendancePersonDto.orgIds = orgIds;
    hrKqAttendancePersonDto.userIds = userIds;
    hrKqAttendancePersonDto.planId = planId;
    // var id = hrKqPlanDto.id; id放到后台处理
    $.ajax({
        url: hostUrl + "kq/hrKqAttendancePerson/save",
        type: 'POST',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqAttendancePersonDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    // pop_tip_open("blue", "保存成功！");
                    refreshParent(id);
                    closeWindow();
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            pop_tip_open("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 校验考勤人员或考勤机构是否重复设置
 * @return true:不重复   false：重复
 */
function attendancePersonCheck(sign, ids) {
    var result;
    var id = $("#planId").val();
    var idsList = [];
    if (ids !== undefined && ids != null && ids !== "") {
        idsList = ids.split(",");
    }

    var condition = {};
    if (sign === 1) {//机构
        condition = {"orgIdsList": idsList, "notQueryPlanId": id};
    } else if (sign === 2) {//人员
        condition = {"personIdsList": idsList, "notQueryPlanId": id};
    }


    $.ajax({
        url: hostUrl + "kq/hrKqAttendancePerson/queryListByCondition",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(condition),
        success: function (data) {
            if (data) {
                if (data.success) {
                    result = data.result;
                } else {
                    pop_tip_open("red", "查询失败！");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
    return result;
}

function deleteKqAddress() {
    // var ids = jqGridKqAddr.jqGrid('getGridParam', 'selarrrow');
    var id = jqGridKqAddr.jqGrid("getGridParam", "selrow");
    var count = 0;
    if (id === "" || id == null) {
        pop_tip_open("red", "请选择！");
    } else {
        pop_text_open("blue", '确认删除吗？', function () {
            var urlBody = "kq/hrKqAddr/delete/" + id;
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'DELETE',
                url: urlAll,
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                data: "{}",
                success: function (json) {
                    if (json.success == true) {
                        pop_tip_open("blue", "删除成功!");
                        $('#signAddressList').jqGrid().trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除失败!");
                }
            })
        }, true);
    }
}


//修改签到地点
function editSignAddress(id) {
    editAddressId = id;
    attendanceRulesEditId = $("#planId").val();
    // window.open("kq_addr_add.html?type=update");
    openPa("kq_addr_add.html?type=update");
    // if (id == null || id == "") {
    //     var ids = jqGridKqAddr.jqGrid('getGridParam', 'selarrrow');
    //     if (ids == "" || ids.length == 0) {
    //         pop_tip_open("red", "请选择要修改的记录！");
    //     } else if (ids.length > 1) {
    //         pop_tip_open("red", "只能选择一条记录！");
    //     } else {
    //         editAddressId = ids[0];
    //         window.open("kq_addr_add.html?type=update");
    //     }
    // } else {
    //     editAddressId = id;
    //     window.open("kq_addr_add.html?type=update");
    // }
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


// })(jQuery, window, document)