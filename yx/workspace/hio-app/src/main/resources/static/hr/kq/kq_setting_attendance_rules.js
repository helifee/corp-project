// (function ($, window, document, undefined) {
var flag = "false";//考勤期间是否重复
var attendanceRulesEditId;
$(function () {
    resizeHeight();

    var type = $.xljUtils.getUrlParam("type");
    if (type == 'add') {
        $('title').text("出勤规则-新增");
        $(".xj-form-title").text("出勤规则-新增");
        initUuid();
    } else if (type = 'update') {
        $('title').text("出勤规则-修改");
        $(".xj-form-title").text("出勤规则-修改");
        attendanceRulesEditId = window.opener.attendanceRulesEditId;
        getAttendanceRulesById(attendanceRulesEditId);

        document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.
        function loadComplete() {
            if (document.readyState === "complete") { //当页面加载状态
                checkRegular();
                calendarReload();
            }
        }

    }


    //默认正常考勤
    $(".normal").show();
    $(".flexible").hide();


    $("#addKqAddress").on('click', function () {
        window.location.href = "kq_addr_list.html";
        /* function editKqAddress(id) {
             if (id == null || id == "") {
                 var ids = jqGridHoliday.jqGrid('getGridParam', 'selarrrow');
                 if (ids == "" || ids.length == 0) {
                     pop_tip_open("red", "请选择要修改的记录！");
                 } else if (ids.length > 1) {
                     pop_tip_open("red", "只能选择一条记录！");
                 } else {
                     holidayEditId = ids[0];
                     window.open("kq_setting_trip_type_add.html?type=update");
                 }
             } else {
                 holidayEditId = id;
                 window.open("kq_setting_trip_type_add.html?type=update");
             }*/
    })
    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#kqPlan").attr("data-validate-success", "saveForm(0)");
            $("#kqPlan").submit();
        } else if (type == "update") {
            $("#kqPlan").attr("data-validate-success", "saveForm(1)");
            $("#kqPlan").submit();
        }
    });

    pageInit();
    resizeGrid();
});

function pageInit() {
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
//        $(".slide-left .ztree-box").height((w_h - 97) + "px");
    //右侧table
    $(".con-table .mytable").height((w_h - 180) + "px");
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
 * 考勤期间所属机构回调函数
 * @param data
 */
function orgCallback(data) {
    $("#durAddForm").find("input[id='orgId']").val(data.id);
    $("#durAddForm").find("input[id='belongOrgName']").val(data.name);
}

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
    var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#kqPlan").find("input[name='id']").val(guuid);
        }
    });
}


/**
 * 查询单条记录
 */
function getAttendanceRulesById(id) {
    var flag = false;
    var urlBody = "kq/hrKqPlan/get/" + id + "?time=" + Math.random();
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'GET',
        url: urlAll,
        async: false,
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
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
                flag = true;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
    return flag;
}


/**
 * 保存表单
 */
function saveForm(sign) {
    if (sign == 0) {//新增
        addSaveKqPlanForm(sign);
    } else if (sign == 1) {//编辑
        editSaveForm(sign);
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
        hrKqPlanDto[hrKqPlanArr[i].name] = hrKqPlanArr[i].value;
    }
    hrKqPlanDto.delflag = false;
    var id = hrKqPlanDto.id;
    $.ajax({
        url: serviceUrl + "kq/hrKqPlan/save",
        type: 'POST',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqPlanDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    pop_tip_open("blue", "保存成功！");
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

function checkIfRename() {
    var name = $("#name").val();
    var ifChanged = $("#shiftPlanForm").data("nameChanged");

    // 1.新增时校验
    // 2.修改且方案名称字段有修改时
    if (name != null && name != "" && type == 'add' || (type == 'update' && (ifChanged == true || ifChanged == "true"))) {
        $.ajax({
            url: serviceUrl + "kq/hrKqPlan/queryIfRenamePlan",
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
    var urlAll = serviceUrl + urlBody;
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
 * 修改-保存表单
 */
function editSaveForm() {
    var hrKqPlanArr = $("#shiftPlanForm").serializeArray();
    var hrKqPlanDto = {};
    for (var i in hrKqPlanArr) {
        if (hrKqPlanArr[i].name != 'belongOrgName') {
            hrKqPlanDto[hrKqPlanArr[i].name] = hrKqPlanArr[i].value;
        }
    }
    hrKqPlanDto.delflag = false;
    var id = hrKqPlanDto.id;
    $.ajax({
        url: serviceUrl + "kq/hrKqPlan/update/" + hrKqPlanDto.id,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(hrKqPlanDto),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "修改成功！");
                refreshParent(id);
                setTimeout(function () {
                    window.close();
                }, 300);
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

    var planId = $("#planId").val();
    document.getElementById('pbCalendar').contentWindow.location.reload(true);
    setIframeHeight(document.getElementById('pbCalendar'));

}

// })(jQuery, window, document)