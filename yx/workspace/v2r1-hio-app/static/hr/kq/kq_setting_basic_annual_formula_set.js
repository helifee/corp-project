// (function ($, window, document, undefined) {
var saveFlag1 = false;
var saveFlag2 = false;
var fromTag;//来自父页面的哪一个标签

$(function () {
    fromTag = $.xljUtils.getUrlParam("fromTag");
    $("#saveBtn").on('click', function () {
        $("#saveBtn").attr("disabled", true);
        // saveAnnualFormulaLimit(0);
        // saveAnnualStandardForm(0);
        /*$("#annualFormalLimitSetForm").attr("data-validate-success", "");
        $("#annualFormalLimitSetForm").submit();
        $("#annualStandardSetForm").attr("data-validate-success", "");
        $("#annualStandardSetForm").submit();
        $("#annualFormalAwardSetForm").attr("data-validate-success", "");
        $("#annualFormalAwardSetForm").submit();
        $("#annualFormalConvertSetForm").attr("data-validate-success", "");
        $("#annualFormalConvertSetForm").submit();*/


        var flag = $("td").hasClass("has-error");
        if (flag == false) {
            saveAnnualFormulaLimit(0);
            saveAnnualStandardForm(0);
            saveAnnualFormulaAward(0);//保存年假奖励
            saveAnnualFormulaConvertRules();//保存年假折算规则
        }
        $("#saveBtn").attr("disabled", false);
    });

    initUuid();
    queryAuth();
    pageInit();
});
/*//查询用户功能权限  add by tangsq since 20180123
$.ajax({
    type: 'POST',
    url: hostUrl + "sys/sysUserInfo/queryAuthorizationBtnList",
    dataType: 'JSON',
    contentType: 'application/json',
    async: false,//设置为同步
    data: JSON.stringify({"menuCode": "zzrs"}),
    success: function (json) {
        var list = json.result;
        $.each(list, function (index, value) {
            for (var key in value) {
                if (key == "code" && value[key] == "editAuthBtn") {   //编辑权限
                    $("#saveBtn").show();//  保存
                }

            }
        });
    },
    error: function () {
        //alert("error");
    }
});*/

//查询用户功能权限
function queryAuth() {
    $.ajax({
        type: 'POST',
        url: hostUrl + "auth/authData/queryAuthorizationBtnList",
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,//设置为同步
        data: JSON.stringify({"menuCode": "hr_attendance"}),
        success: function (json) {
            var list = json.result;
            $.each(list, function (index, value) {
                for (var key in value) {
                    if (key == "code" && value[key] == "2") {//编辑权限
                        $("#saveBtn").show();//  保存
                    }
                }
            });
        },
        error: function () {
        }
    });
}

$("#closeWindow").on('click', function () {
    // window.history.go(-1);
    window.location.href = "kq_setting.html?fromTag=" + fromTag;

});

function pageInit() {
    queryAnnualFormulaLimit();
    queryAnnualLimitType();
    queryAnnualStandard();
    queryAnnualFormulaAward();//查询年假奖励
    queryAnnualFormulaConvewrtRules();//查询年假规则
}

/**
 * 打开新窗口
 */
function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 250) + ',top=40, left=100');
}

function closeWindow() {
    window.history.go(-1);
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
            $("#annualFormalLimitSetForm").find("input[name='id']").val(guuid);
        }
    });
}

/**
 * 年假公式之年假限制设置
 */
var applyRegular = "";
var applyRegular2 = "";
var numberTest = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;//大于0的整数或小数
function saveAnnualFormulaLimit(sign) {
    initUuid();

    var hrAnnualFormulaArr = $("#annualFormalLimitSetForm").serializeArray();
    var hrAnnualFormulaDto = {};
    for (var i in hrAnnualFormulaArr) {
        if (hrAnnualFormulaArr[i].value == null || hrAnnualFormulaArr[i].value == "") {
            hrAnnualFormulaDto[hrAnnualFormulaArr[i].name] = null;
        } else {
            if (hrAnnualFormulaArr[i].name == "limitInvalidMonth" || hrAnnualFormulaArr[i].name == "limitInvalidDay" || hrAnnualFormulaArr[i].name == "applyMonth") {
                var addr = hrAnnualFormulaArr[i].value;
                if (numberTest.test(addr) == true) {
                    var value = parseInt(addr);
                    hrAnnualFormulaDto[hrAnnualFormulaArr[i].name] = value;
                }
            } else if (hrAnnualFormulaArr[i].name == "applyRegular") {
                applyRegular = hrAnnualFormulaArr[i].value;
            }

            //年假申请规则不选择第三项，则月数保存为空
            if (hrAnnualFormulaDto.applyRegular == "1" || hrAnnualFormulaDto.applyRegular == "2") {
                hrAnnualFormulaDto["applyMonth"] = null;
            }

            //年假申请规则：拼接单选和多选
            if (hrAnnualFormulaArr[i].name == "applyRegular2") {
                applyRegular += "," + hrAnnualFormulaArr[i].value;
            } else {
                hrAnnualFormulaDto[hrAnnualFormulaArr[i].name] = hrAnnualFormulaArr[i].value;
            }
        }
    }
    hrAnnualFormulaDto["applyRegular"] = applyRegular;

    //年假结转为【否】，则是失效日保存为空
    if (hrAnnualFormulaDto.limitIfConvert == "0") {
        hrAnnualFormulaDto["limitInvalidMonth"] = null;
        hrAnnualFormulaDto["limitInvalidDay"] = null;
    }


    hrAnnualFormulaDto.delflag = 0;
    $.ajax({
        url: hostUrl + "kq/hrAnnualFormula/save",
        // url: hostUrl + "kq/hrAnnualFormula/update/2c06c731a8ec494dadacfcc652e6017e",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrAnnualFormulaDto),
        success: function (xhr) {
            if (xhr.success == true) {
                saveFlag1 = true;
                if (saveFlag1 == true && saveFlag2 == true) {
                    //pop_tip_open("blue", "保存成功！");
                }
                //annualFormalLimitSetForm
            } else {
                pop_tip_open("red", "保存失败！");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 年假公式之年假奖励保存
 */
function saveAnnualFormulaAward() {
    //initUuid();
    var hrAnnualFormulaArr = $("#annualFormalAwardSetForm").serializeArray();
    var hrAnnualFormulaDto = {};
    hrAnnualFormulaDto["id"] = $("#annualFormalAwardSetForm").find("input[name='id']").val();
    hrAnnualFormulaDto["awardStandardYears1"] = $("#awardStandardYears1").val();
    //hrAnnualFormulaDto["awardStandardYears1"] = $("#annualFormalAwardSetForm").find("input[name='awardStandardYears1']").val();//$("#awardStandardYears1").val();
    hrAnnualFormulaDto["awardStandardYears2"] = $("#awardStandardYears2").val();
    hrAnnualFormulaDto["awardStandardDay1"] = $("#awardStandardDay1").val();
    hrAnnualFormulaDto["awardStandardDay2"] = $("#awardStandardDay2").val();
    hrAnnualFormulaDto.delflag = 0;
    $.ajax({
        url: hostUrl + "kq/hrKqAnnualAward/saveAnnualAwardInfo",
        // url: hostUrl + "kq/hrKqAnnualAward/save",
        // url: hostUrl + "kq/hrAnnualFormula/update/2c06c731a8ec494dadacfcc652e6017e",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrAnnualFormulaDto),
        success: function (xhr) {
            if (xhr.success == true) {
                saveFlag1 = true;
                if (saveFlag1 == true && saveFlag2 == true) {
                    //pop_tip_open("blue", "保存成功！");
                }
                //annualFormalLimitSetForm
            } else {
                pop_tip_open("red", "保存失败！");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 保存年假折算规则
 */
function saveAnnualFormulaConvertRules() {
    var hrAnnualFormulaArr = $("#annualFormalConvertSetForm").serializeArray();
    var hrAnnualFormulaDto = {};
    //hrAnnualFormulaDto["smallestUnit"]=$("#awardStandardYears1").val();
    // hrAnnualFormulaDto["entryConvert"]=$("#awardStandardYears2").val();
    // hrAnnualFormulaDto["annualMidConvert"]=$("awardStandardDay1").val();
    hrAnnualFormulaDto["id"] = $("#annualFormalConvertSetForm").find("input[name='id']").val();
    hrAnnualFormulaDto["smallestUnit"] = $("input[name='smallestUnit']:checked").val();
    hrAnnualFormulaDto["entryConvert"] = $("input[name='entryConvert']:checked").val();
    hrAnnualFormulaDto["annualMidConvert"] = $("input[name='annualMidConvert']:checked").val();
    $.ajax({
        url: hostUrl + "kq/hrKqAnnualConvertRules/saveAnnualConvertRulesInfo",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrAnnualFormulaDto),
        success: function (xhr) {
            if (xhr.success == true) {
                //pop_tip_open("red", "保存成功",100000);
                $.xljUtils.tip("blue", "保存成功！", 10000);
            } else {

                $.xljUtils.tip("red", "保存失败！");

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");

        }
    });


}

/**
 * 年假公式之年假奖励查询
 */
function queryAnnualFormulaAward() {
    $.ajax({
        url: hostUrl + "kq/hrKqAnnualAward/queryList",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result == null || result == "") {
                    $("#awardStandardYears1").val(0);
                    $("#awardStandardYears2").val(0);
                    $("#awardStandardDay1").val(0);
                    $("#awardStandardDay2").val(0);
                } else {
                    $("#annualFormalAwardSetForm").find("input[name='id']").val(result[0].id);
                    $("#awardStandardYears1").val(result[0].awardStandardYears1);
                    $("#awardStandardYears2").val(result[0].awardStandardYears2);
                    $("#awardStandardDay1").val(result[0].awardStandardDay1);
                    $("#awardStandardDay2").val(result[0].awardStandardDay2);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 年假公式之年假折算规则查询
 */
function queryAnnualFormulaConvewrtRules() {
    $.ajax({
        url: hostUrl + "kq/hrKqAnnualConvertRules/queryList",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                if (result == null || result == "") {

                    $("input[name='smallestUnit']").first().attr("checked", true);
                    $("input[name='entryConvert']").first().attr("checked", true);
                    $("input[name='annualMidConvert']").first().attr("checked", true);


                } else {

                    $("#annualFormalConvertSetForm").find("input[name='id']").val(result[0].id);
                    var smallestUnit = $("input[name='smallestUnit']");
                    var entryConvert = $("input[name='entryConvert']");
                    var annualMidConvert = $("input[name='annualMidConvert']");
                    //alert($("input[name='smallestUnit']").size());
                    //折算最小单位
                    //alert();
                    for (var i = 0; i < smallestUnit.size(); i++) {
                        //alert($(smallestUnit[i]).val());
                        if (smallestUnit[i].value == result[0].smallestUnit) {
                            $(smallestUnit[i]).attr("checked", true);
                        }
                    }
                    //入职折算
                    for (var i = 0; i < entryConvert.size(); i++) {
                        if (entryConvert[i].value == result[0].entryConvert) {
                            $(entryConvert[i]).attr("checked", true);
                        }
                    }
                    //年中折算
                    for (var i = 0; i < annualMidConvert.size(); i++) {
                        if (annualMidConvert[i].value == result[0].annualMidConvert) {
                            $(annualMidConvert[i]).attr("checked", true);
                        }
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
}

/**
 * 年假公式之年假限制查询
 */
function queryAnnualFormulaLimit() {
    $.ajax({
        url: hostUrl + "kq/hrAnnualFormula/queryLatelyInfo",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
            if (data.success == false) {
                pop_tip_open("red", "年假公式查询失败");
            }
            var result = data.result;
            if (result.length > 0) {
                var applyMonth = result[0].applyMonth;
                var applyRegular = result[0].applyRegular;
                var limitIfConvert = result[0].limitIfConvert;

                var limitInvalidDay = result[0].limitInvalidDay;
                var limitInvalidMonth = result[0].limitInvalidMonth;
                $("#applyMonth").val(applyMonth);

                $("#limitInvalidDay").val(limitInvalidDay);
                $("#limitInvalidMonth").val(limitInvalidMonth);

                if (limitIfConvert == "1") {
                    $("input[name='limitIfConvert'][value='1']").attr("checked", true);
                    $(".annualLimit").removeAttr("readonly");
                } else if (limitIfConvert == "0") {
                    $("input[name='limitIfConvert'][value='0']").attr("checked", true);
                    $(".annualLimit").attr("readonly", true);
                } else {
                    $(".annualLimit").attr("readonly", true);
                }

                //年假申请规则回显
                var regulations = applyRegular.split(",");
                if (regulations.length > 0) {
                    for (var i = 0; i < regulations.length; i++) {
                        if (regulations[i] == "1") {
                            $("input[name='applyRegular'][value='1']").attr("checked", true);
                            $(".applyRegular").attr("readonly", true);
                        } else if (regulations[i] == "2") {
                            $("input[name='applyRegular'][value='2']").attr("checked", true);
                            $(".applyRegular").attr("readonly", true);
                        } else if (regulations[i] == "3") {
                            $("input[name='applyRegular'][value='3']").attr("checked", true);
                            $(".applyRegular").removeAttr("readonly");
                        }

                        if (regulations[i] == "4") {
                            $("input[name='applyRegular2'][value='4']").attr("checked", true);
                        }
                        if (regulations[i] == "5") {
                            $("input[name='applyRegular2'][value='5']").attr("checked", true);
                        }
                    }
                } else {
                    $(".applyRegular").attr("readonly", true);
                }

            } else {
                $("input[name='applyRegular'][value='1']").attr("checked", true);
                $(".applyRegular").removeAttr("readonly");
                // $("#applyMonth").val("3");
                // $(".applyRegular").attr("readonly", true);
                $(".annualLimit").attr("readonly", true);
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            pop_tip_open("red", "年假公式查询失败！");
        }
    });
}

function queryAnnualLimitType() {
    $.ajax({
        url: hostUrl + "kq/hrAnnualFormula/queryAnnualLimitType",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                for (var i = 0; i < result.length; i++) {
                    $("#standardType" + (i + 1) + "").val(result[i].sid);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
}


/**
 * 年假公式之年假标准设置
 */
function saveAnnualStandardForm(sign) {
    var standardType = $("input[name='standardType']:checked").val();
    var fixedValue = $("#fixedValue").val();
    if (standardType == "1101100188" && (fixedValue == "" || fixedValue == null)) {
        pop_tip_open("red", "固定值不为空！");
        return;
    }
    var hrAnnualStandardArr = $("#annualStandardSetForm").serializeArray();
    var hrAnnualStandardDto = {};
    for (var i in hrAnnualStandardArr) {

        if (hrAnnualStandardArr[i].value == null || hrAnnualStandardArr[i].value == "") {
            hrAnnualStandardDto[hrAnnualStandardArr[i].name] = null;
        } else {
            hrAnnualStandardDto[hrAnnualStandardArr[i].name] = hrAnnualStandardArr[i].value;
        }

    }
    hrAnnualStandardDto.delflag = 0;

    $.ajax({
        url: hostUrl + "kq/hrAnnualStandard/saveAnnualStandard2",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrAnnualStandardDto),
        success: function (xhr) {
            if (xhr.success == true) {
                saveFlag2 = true;

                if (saveFlag1 == true && saveFlag2 == true) {
                    //pop_tip_open("blue", "保存成功！");
                }

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}


/**
 * 年假公式之年假标准查询
 */
function queryAnnualStandard() {
    var standardType = $("input[name='standardType']:checked").val();
    $.ajax({
        url: hostUrl + "kq/hrAnnualStandard/queryListByCondition",
        type: "post",
        // data: "{}",
        data: JSON.stringify({"standardType": standardType}),
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
            if (data.success == false) {
                pop_tip_open("red", "年假公式查询失败");
            }
            var result = data.result;
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var standardType = result[0].standardType;
                    var standardYear = result[i].standardYear;
                    var standardDay = result[i].standardDay;
                    if (standardType == "1101100186") {
                        $("input[name='standardType'][value='1101100186']").attr("checked", true);
                        $(".checkEntry").attr("readonly", true);
                        $(".checkFixed").attr("readonly", true);
                        if (standardYear != 0) {
                            $("#standardYear" + (i + 2)).val(standardYear);
                            $("#standardDay" + (i + 2)).val(standardDay);
                        } else {
                            $("#standardYear" + (i + 2)).val("");
                            $("#standardDay" + (i + 2)).val("");
                        }
                    } else if (standardType == "1101100187") {
                        $("input[name='standardType'][value='1101100187']").attr("checked", true);
                        $(".checkWork").attr("readonly", true);
                        $(".checkFixed").attr("readonly", true);
                        if (standardYear != 0) {
                            $("#standardYears" + (i + 2)).val(standardYear);
                            $("#standardDays" + (i + 2)).val(standardDay);
                        } else {
                            $("#standardYears" + (i + 2)).val("");
                            $("#standardDays" + (i + 2)).val("");
                        }
                    } else if (standardType == "1101100188") {
                        $("input[name='standardType'][value='1101100188']").attr("checked", true);
                        $(".checkWork").attr("readonly", true);
                        $(".checkEntry").attr("readonly", true);
                        var fixedValue = result[i].fixedValue;
                        $("#fixedValue").val(fixedValue);
                    }
                }
            } else {
                $("input[name='standardType'][value='1101100186']").attr("checked", true);
                $(".checkWork").removeAttr("readonly", true);
                $(".checkEntry").attr("readonly", true);
                $(".checkFixed").attr("readonly", true);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            pop_tip_open("red", "年假公式查询失败！");
        }
    });
}


// })(jQuery, window, document)