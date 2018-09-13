// (function ($, window, document, undefined) {
var flag = "false";//考勤期间是否重复
var durationSetEditId;
$(function () {
    resizeHeight();

    var type = $.xljUtils.getUrlParam("type");
    if (type == 'add') {
        $('title').text("考勤期间-新增");
        $(".xj-form-title").text("考勤期间-新增");
        initUuid();
    } else if (type = 'update') {
        $('title').text("考勤期间-修改");
        $(".xj-form-title").text("考勤期间-修改");
        durationSetEditId = window.opener.durationSetEditId;
        getDurationInfoById(durationSetEditId);
    }

    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#durAddForm").attr("data-validate-success", "saveForm(0)");
            $("#durAddForm").submit();
        } else if (type == "update") {
            $("#durAddForm").attr("data-validate-success", "saveForm(1)");
            $("#durAddForm").submit();
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
            $("#durAddForm").find("input[name='id']").val(guuid);
        }
    });
}

/**
 * 查询所选考勤期间所属机构是否重复
 */
function duplicateCheck(orgId) {
    if (orgId == null || orgId == "") {
        orgId = $("#orgId").val();
    }
    var urlBody = "kq/hrKqDurationSetting/queryIfDuplicate";
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"orgId": orgId}),
        success: function (data) {
            if (data.success == true) {
                flag = data.result;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

    if (flag == null || flag == "") {
        flag = false;
    }

    return flag;

}

/**
 * 查询单条记录
 */
function getDurationInfoById(id) {
    var urlBody = "kq/hrKqDurationSetting/get/" + id + "?time=" + Math.random();
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
                $("#accountDay").val(result.accountDay);
                $("#analysisDay").val(result.analysisDay);
                $("#remark").val(result.remark);

                var orgId = result.orgId;
                $("#orgId").val(orgId);
                var orgName = $.hrUtils.getHROrgNameById(orgId);
                if (orgName == null) {
                    orgName = "";
                }
                $("#belongOrgName").val(orgName);

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
    if (sign == 0) {//新增
        var orgId = $("#orgId").val();
        var flag = duplicateCheck(orgId);
        if (flag != "true" && flag != true) {
            addSaveForm(sign);
        } else {
            pop_tip_open("red", "所属机构重复，请重新选择！");
        }
    } else if (sign == 1) {//编辑
        editSaveForm(sign);
    }
}

/**
 * 新增考勤期间
 */
function addSaveForm(sign) {
    var hrKqDurationSettingArr = $("#durAddForm").serializeArray();
    var hrKqDurationSettingDto = {};
    for (var i in hrKqDurationSettingArr) {
        if (hrKqDurationSettingArr[i].name != "belongOrgName") {
            hrKqDurationSettingDto[hrKqDurationSettingArr[i].name] = hrKqDurationSettingArr[i].value;
        }
    }
    hrKqDurationSettingDto.delflag = false;

    $.ajax({
        url: serviceUrl + "kq/hrKqDurationSetting/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqDurationSettingDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    refreshParent(hrKqDurationSettingDto.id);
                    // $('#listKqSetForDur').jqGrid().trigger("reloadGrid");
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
    var hrKqDurationSettingArr = $("#durAddForm").serializeArray();
    var hrKqDurationSettingDto = {};
    for (var i in hrKqDurationSettingArr) {
        if (hrKqDurationSettingArr[i].name != "belongOrgName") {
            hrKqDurationSettingDto[hrKqDurationSettingArr[i].name] = hrKqDurationSettingArr[i].value;
        }
    }
    hrKqDurationSettingDto.delflag = false;

    $.ajax({
        url: serviceUrl + "kq/hrKqDurationSetting/update/" + hrKqDurationSettingDto.id,
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqDurationSettingDto),
        success: function (data) {

            if (data.success) {
                refreshParent(hrKqDurationSettingDto.id);
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
    window.opener.jqGridDurSet.jqGrid().trigger("reloadGrid");
    if (editId != null && editId != "") {
        window.opener.focusIdDurationCallBack(editId);
    }
}
// })(jQuery, window, document)