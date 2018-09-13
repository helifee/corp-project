/*
// (function ($, window, document, undefined) {
// var holidayTypeAddType;
var renameFlag;
var systemItemFlag;
$(function () {

    var type = $.xljUtils.getUrlParam("type");
    if (type === 'add') {
        $('title').text("假期类别-新增");
        $(".xj-form-title").text("假期类别-新增");
        pageInit();
        initUuid();
        getMaxCode();
    } else if (type === 'update') {
        $('title').text("假期类别-修改");
        $(".xj-form-title").text("假期类别-修改");
        holidayTypeEditId = window.opener.holidayTypeEditId;
        systemItemFlag = window.opener.systemItemFlag;
        pageInit();
        getHolidayTypeInfoById(holidayTypeEditId);
    }

    $("#saveBtn").on('click', function () {
        if (type == "add") {
            $("#holidayTypeAddForm").attr("data-validate-success", "saveForm(0)");
            $("#holidayTypeAddForm").submit();
        } else if (type == "update") {
            $("#holidayTypeAddForm").attr("data-validate-success", "saveForm(1)");
            $("#holidayTypeAddForm").submit();
        }
    });

});

function pageInit() {
    // queryHolidayUnitList();
    queryCalculateRuleList();
    queryHolidayTypeList();
    queryHolidayStatusList();
    queryHolidayPropertyList();

}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}


/!**
 * 多选的回调
 *!/
function orgCallback1(data) {
    console.log(data);
    var orgIds = "";
    for (var i = 0; i < data.length; i++) {
        orgIds += data[i].id + ",";
    }
    orgIds = orgIds.substring(0, orgIds.length - 1);
    $('#orgIds').val(orgIds);
    orgCheck(data);
}

function orgCheck(data) {
    if (data.length > 1000) {
        pop_tip_open("red", "机构数不能超过1000！");
        $("#holidayTypeAddForm").find("input[id='orgIds']").val("");
        $("#holidayTypeAddForm").find("input[id='orgName11']").val("");
    }
}

/!**
 * 清空组织机构上级
 *!/
function empty() {
    $("#holidayTypeAddForm").find("input[id='orgIds']").val("");
    $("#holidayTypeAddForm").find("input[id='orgName11']").val("");
}
/!**
 * 查询假期单位类型
 *!/
function queryHolidayUnitList() {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryHolidayUnitList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var holidayUnitTypeList = data.result;
                var selTypeObj = $("#unit");

                // selTypeObj.append("<option value=''>" + "全部" + "</option>");
                for (i in holidayUnitTypeList) {
                    var typeId = holidayUnitTypeList[i].id;
                    var typeName = holidayUnitTypeList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/!**
 * 计算规则
 *!/
function queryCalculateRuleList() {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryCalculateRuleList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var calculateRuleTypeList = data.result;
                var selTypeObj = $("#calculateRule");

                // selTypeObj.append("<option value=''>" + "全部" + "</option>");
                for (i in calculateRuleTypeList) {
                    var typeId = calculateRuleTypeList[i].id;
                    var typeName = calculateRuleTypeList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/!**
 * 查询假期类型
 *!/
function queryHolidayTypeList() {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryHolidayTypeList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var holidayTypeList = data.result;
                var selTypeObj = $("#type");

                for (i in holidayTypeList) {
                    var typeId = holidayTypeList[i].id;
                    var typeName = holidayTypeList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/!**
 * 查询假期类型状态
 *!/
function queryHolidayStatusList() {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryHolidayStatusList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var holidayStatusList = data.result;
                var selTypeObj = $("#status");

                for (i in holidayStatusList) {
                    var typeId = holidayStatusList[i].id;
                    var typeName = holidayStatusList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/!**
 * 查询假期属性类型
 *!/
function queryHolidayPropertyList() {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryHolidayPropertyList",
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var holidayPropertyList = data.result;
                var selTypeObj = $("#property");

                for (i in holidayPropertyList) {
                    var typeId = holidayPropertyList[i].id;
                    var typeName = holidayPropertyList[i].name;
                    if (systemItemFlag == true) {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        // $("#property  option[value='" + holidayPropertyList[i].id + "']").attr("selected", true);
                    } else if (holidayPropertyList[i].name == '自定义项') {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        $("#property  option[value='" + holidayPropertyList[i].id + "']").attr("selected", true);

                    }
                }

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/!**
 * 初始化主键ID
 *!/
function initUuid() {
    var uBody = "generator/getGuuid" + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#holidayTypeAddForm").find("input[name='id']").val(guuid);
        }
    });
}

/!**
 * 查询单条记录
 *!/
function getHolidayTypeInfoById(id) {
    var urlBody = "kq/hrKqHolidaytypeSetting/get/" + id + "?time=" + Math.random();
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

                $("#id").val(result.id);
                $("#code").val(result.code);
                $("#name").val(result.name);
                $("#unit").val(result.unit);
                $("#remark").val(result.remark);

                var calculateRule = result.calculateRule;
                $("#calculateRule  option[value='" + calculateRule + "']").attr("selected", true);

                var type = result.type;
                $("#type  option[value='" + type + "']").attr("selected", true);

                var status = result.status;
                $("#status  option[value='" + status + "']").attr("selected", true);

                var property = result.property;
                $("#property  option[value='" + property + "']").attr("selected", true);

                var orgIds = result.orgIds;
                $("#orgIds").val(orgIds);
                // var orgName = result.orgNames;
                  var orgName = orgInterpret(orgIds);
                 if (orgName == null) {
                 orgName = "";
                 }
                $("#orgName11").val(orgName);
                if (systemItemFlag == true) {
                    $("#code").attr("disabled", "true");
                    $("#name").attr("disabled", "true");
                    $("#unit").removeAttr("readonly");
                    $("#unit").attr("disabled", "true");
                    $("#calculateRule").attr("disabled", "true");
                    $("#type").attr("disabled", "true");
                    $("#status").attr("disabled", "true");
                    $("#property").attr("disabled", "true");
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/!**
 * 保存表单
 *!/
function saveForm(sign) {
    if (renameFlag == "true") {
        pop_tip_open("red", "您填写的假期名称已存在，请重新填写！");
    } else {
        if (sign == 1) {
            editSaveForm();
        } else if (sign == 0) {
            addSaveForm(sign);
        }
    }
}

/!**
 * 新增假期类别
 *!/
function addSaveForm(sign) {
    // $("#attribute").removeAttr("disabled");
    var hrKqHolidaytypeSettingArr = $("#holidayTypeAddForm").serializeArray();
    var hrKqHolidaytypeSettingDto = {};
    for (var i in hrKqHolidaytypeSettingArr) {
        if (hrKqHolidaytypeSettingArr[i].name != "orgName11") {
            hrKqHolidaytypeSettingDto[hrKqHolidaytypeSettingArr[i].name] = hrKqHolidaytypeSettingArr[i].value;
        }
    }
    hrKqHolidaytypeSettingDto.delflag = 0;
    // hrKqHolidaytypeSettingDto.status = "1092100169";//启用

    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqHolidaytypeSettingDto),
        success: function (xhr) {
            if (xhr.success) {
                refreshParent(hrKqHolidaytypeSettingDto.id);
                closeWindow();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

function checkIfRename() {
    var name = $("#name").val();
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryIfRename",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({"name": name}),
        success: function (data) {
            if (data.success) {
                renameFlag = data.result;
                if (renameFlag == 'true') {
                    $.xljUtils.tip("red", "您填写的假期名称已存在，请重新填写！");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });

}


/!**
 * 修改-保存表单
 *!/
function editSaveForm() {
    var hrKqHolidaytypeSettingArr = $("#holidayTypeAddForm").serializeArray();
    var hrKqHolidaytypeSettingDto = {};
    for (var i in hrKqHolidaytypeSettingArr) {
        if (hrKqHolidaytypeSettingArr[i].name != "orgName11") {
            hrKqHolidaytypeSettingDto[hrKqHolidaytypeSettingArr[i].name] = hrKqHolidaytypeSettingArr[i].value;
        }
    }
    hrKqHolidaytypeSettingDto.delflag = 0;

    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/update/" + hrKqHolidaytypeSettingDto.id,
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqHolidaytypeSettingDto),
        success: function (data) {

            if (data.success) {
                refreshParent(hrKqHolidaytypeSettingDto.id);
                closeWindow();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/!**
 * 多选机构翻译
 *!/
function orgInterpret(orgIds) {
    var ids = orgIds.split(",");
    var orgName = "";
    if (ids != null && ids != "") {
        for (var i = 0; i < ids.length; i++) {
            orgName += $.hrUtils.getHROrgNameById(ids[i]) + ",";
        }
    }

    if (orgName != null) {
        orgName = orgName.substring(0, orgName.length - 1);
        return orgName;
    } else {
        return "";
    }
}

/!**
 * 刷新父页面表格数据
 *!/
function refreshParent(editId) {
    window.opener.jqGridHolidayType.jqGrid().trigger("reloadGrid");
    if (editId != null && editId != "") {
        window.opener.focusIdTypeCallBack(editId);
    }
}

function getMaxCode() {
    var maxCode = 0;
    var urlBody = "kq/hrKqHolidaytypeSetting/getMaxCode";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success == true) {
                maxCode = data.result;
                if (maxCode > 0 && maxCode <= 9) {
                    maxCode = "0" + maxCode;
                }
                $("#code").val(maxCode);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}


// })(jQuery, window, document)*/
