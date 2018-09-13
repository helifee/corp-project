var type = $.xljUtils.getUrlParam('type');
var id = $.xljUtils.getUrlParam('id');
var regInput = true;
$(function () {
    pageInit();

    $("#saveBtn").on('click', function () {
        $("#taskPackageForm").attr("data-validate-success", "saveForm('over')");
        $("#taskPackageForm").submit();
    });

    $("#publicMessage").on('click', function () {
        $("#taskPackageForm").attr("data-validate-success", "saveForm('public')");
        $("#taskPackageForm").submit();
    });
});

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit() {
    getUserInfo();
    if (type == "add") {
        $("#taskPackageTitle").html("任务包-新增");
        document.title = "任务包-新增";

        var uuid = getuuid();
        $("#taskPack").val(uuid);
        addCount();
        $('#uploadFile').xljAttachment({
            appId: '1',
            businessId: uuid,
            categoryId: '1',
            mode: 'add',
            singleUpload: false
        });
    } else {
        $("#taskPackageTitle").html("任务包-修改");
        document.title = "任务包-修改";

        $('#uploadFile').xljAttachment({
            appId: '1',
            businessId: id,
            categoryId: '1',
            mode: 'edit',
            singleUpload: false
        });
        getTaskPackageBean(id);
    }

}

function getUserInfo() {
    $.ajax({
        type: 'get',
        url: serviceUrl + "/oa/officeOut/getUserInfo" + "?time=" + Math.random(),
        async: false,
        success: function (data) {
            if (type == "add") {
                $("#proposeUser").val(data.result.securityUserDto.realName);
                $("#proposeUserId").val(data.result.securityUserDto.id);
                $("#proposeDeptId").val(data.result.securityDirectDeptDto.prefixId);
                $("#proposeDept").val(data.result.securityDirectDeptDto.prefixName);
                $("input[name='proposeDept']").val(data.result.securityDirectDeptDto.prefixName);
                $("#createPersonName").val(data.result.securityUserDto.realName);
            }
        }
    });
}
/*function getCurrentData(){
 $("#publishDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
 }*/
function getTaskPackageBean(id) {
    $.ajax({
        type: 'get',
        url: serviceUrl + 'oa/taskPackage/get/' + id + '?time=' + Math.random(),
        success: function (data) {
            if (data.success) {
                var resultData = data.result;
                $("input[name='id']").val(resultData.id);
                $("input[name='concurrencyVersion']").val(resultData.concurrencyVersion);
                $("input[name='title']").val(resultData.title);
                $("input[name='proposeUserId']").val(resultData.proposeUserId);
                $("input[name='proposeUser']").val(resultData.proposeUser);
                $("input[name='proposeDeptId']").val(resultData.proposeDeptId);
                $("input[name='proposeDept']").val(resultData.proposeDept);
                $("#proposeDept").val(resultData.proposeDept);
                $("input[name='createPersonId']").val(resultData.createPersonId);
                $("input[name='createPersonName']").val(resultData.createPersonName);
                $("#createPersonName").val(resultData.createPersonName);
                $("textarea[name='remark']").val(resultData.remark);
                var resultAcount = resultData.list;
                if (resultAcount.length > 0) {
                    var countLengt = 1;
                    for (var o in resultAcount) {
                        addUpdateCount(countLengt, resultAcount[o].id);
                        console.log(resultAcount[o]);
                        var Acount = $("#countForm").find("tr").eq(countLengt);
                        Acount.find("input[name='content']").val(resultAcount[o].content);
                        Acount.find("input[name='id']").val(resultAcount[o].id);
                        Acount.find("input[name='dutyUserId']").val(resultAcount[o].dutyUserId);
                        Acount.find("input[name='dutyUser']").val(resultAcount[o].dutyUser);
                        Acount.find("input[name='dutyDeptId']").val(resultAcount[o].dutyDeptId);
                        Acount.find("input[name='dutyDept']").val(resultAcount[o].dutyDept);
                        $("#dutyDept_" + resultAcount[o].id).val(resultAcount[o].dutyDept);
                        Acount.find("input[name='expectCompleteDate']").val(resultAcount[o].expectCompleteDate.substring(0, resultAcount[o].expectCompleteDate.indexOf(".")));
                        Acount.find("input[name='remark']").val(resultAcount[o].remark);
                        countLengt++;
                    }
                }
            } else {
                pop_tip_open("red", data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        }
    });
}
/**
 * author:liuf
 * describe:获取uuid
 * param: null
 */
function getuuid() {
    $.ajax({
        beforeSend: function () {
            var guuid = "";
        },
        type: 'get',
        async: false,
        url: serviceUrl+'sys/uuid/generator/getGuuid?time=' + Math.random(),
        success: function (data) {
            if (data.success) {
                guuid = data.result;
            } else {
                pop_tip_open("red", data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        },
        complete: function () {
        }
    });
    return guuid;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * author:liuf
 * describe:新增 修改数据
 * param: null
 */
function saveForm(op) {
    if (!regInput) {
        return;
    }
    var taskPackageArr = $("#taskPackageForm").serializeArray();
    var taskPackageDto = {};
    for (var i in taskPackageArr) {
        taskPackageDto[taskPackageArr[i].name] = taskPackageArr[i].value;
    }
    taskPackageDto.delflag = 0;
    taskPackageDto.status = 1;
    taskPackageDto.createDate = new Date().getTime();
    taskPackageDto.updateDate = new Date().getTime();
    var ChirdDataList = new Array();
    var contentEmptyFlag = false;
    var dutyUserFlag = false;
    $("#countForm").find("tr").each(function (i) {
        if (i > 0) {
            var jsonDataArr = $(this).find(":input").serializeArray();
            var jsonData = {};
            jsonData.taskPackageId = taskPackageDto.id;
            jsonData.delflag = 0;
            for (var i in jsonDataArr) {
                jsonData[jsonDataArr[i].name] = jsonDataArr[i].value;
            }
            if (!jsonData.dutyUser) {
                jsonData.dutyUserId = "";
            }
            if (!jsonData.content||$.trim(jsonData.content) == '') {
                contentEmptyFlag = true;
                $(this).find(':input[name="content"]').focus();
                return;
            }
            if(!jsonData.dutyUser||jsonData.dutyUser==''){
                dutyUserFlag = true;
                $(this).find(':input[name="dutyUser"]').focus();
                return;
            }
            ChirdDataList.push(jsonData);
        }
    });
    if(contentEmptyFlag){
        $.xljUtils.tip('blue','任务内容不能为空！');
        return;
    }

    if(dutyUserFlag){
        $.xljUtils.tip('blue','责任人不能为空！');
        return;
    }
    taskPackageDto.list = ChirdDataList;
    if (type == "add") {
        $.ajax({
            url: serviceUrl + "oa/taskPackage/save",
            data: JSON.stringify(taskPackageDto),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        if (op == "over") {
                            $("#uploadFile").xljAttachmentSubmit();
                            window.opener.reloadGrid(taskPackageDto.id);
                            window.close();
                        } else if (op == "public") {
                            $.ajax({
                                url: serviceUrl + "oa/taskPackage/publishMessage/" + taskPackageDto.id,
                                type: 'PUT',
                                dataType: 'JSON',
                                success: function (resultData) {
                                    if (resultData && resultData.success) {
                                        pop_tip_open("green", "发布成功！");
                                        $("#uploadFile").xljAttachmentSubmit();
                                        window.opener.reloadGrid(taskPackageDto.id);
                                        window.close();
                                    } else {
                                        pop_tip_open("red", resultData.msg);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    $.xljUtils.getError(jqXHR.status);
                                }
                            });
                        }


                    } else {
                        pop_tip_open("red", resultData.msg);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    } else if (type == "edit") {
        $.ajax({
            url: serviceUrl + "oa/taskPackage/update/" + taskPackageDto.id,
            data: JSON.stringify(taskPackageDto),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        if (op == "over") {
                            window.opener.reloadGrid(taskPackageDto.id);
                            $("#uploadFile").xljAttachmentSubmit();
                            window.close();
                        } else if (op == "public") {
                            $.ajax({
                                url: serviceUrl + "oa/taskPackage/publishMessage/" + taskPackageDto.id,
                                type: 'PUT',
                                dataType: 'JSON',
                                success: function (resultData) {
                                    if (resultData && resultData.success) {
                                        $("#uploadFile").xljAttachmentSubmit();
                                        pop_tip_open("green", "发布成功！");
                                        window.opener.reloadGrid(taskPackageDto.id);
                                        window.close();
                                    } else {
                                        pop_tip_open("red", resultData.msg);
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    $.xljUtils.getError(jqXHR.status);
                                }
                            });
                        }

                    } else {
                        pop_tip_open("red", resultData.msg);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }

}
/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */
function closed() {
    window.close();
}

function addCount() {
    $.ajax({
        type: 'get',
        async: false,
        url: serviceUrl+'sys/uuid/generator/getGuuid?time=' + Math.random(),
        success: function (data) {
            if (data.success) {
                var guuid = data.result;
                var row = $('<tr class="form-tr">'
                    + '<td><input type="checkbox" name="check" ></td>'
                    + '<td style="text-align:center"></td>'
                    + '<td><div><input type="text" data-html="true"   name="content"  class="form-control addInputWidth" placeholder="内容" data-maxlength="500" onblur="regData(this)"><input type="hidden" id="' + guuid + '" name="id" value="' + guuid + '"></div></td>'
                    + '<td><div class="input-group fullWidth"><input type="hidden"  id="dutyUserId_' + guuid + '" name="dutyUserId">'
                    + '<input type="text" data-html="true"   class="form-control addInputWidth single-selector" id="dutyUser_' + guuid + '" name="dutyUser" data-targetname="dutyUser_' + guuid + '" data-targetid="dutyUserId_' + guuid + '" data-selectorType="person" data-saveCallback="getOrgInfoChird1" >'
                    + '<div class="input-group-addon"><a class="glyphicon glyphicon-remove"   onclick="empty1(this)"></a></div>'
                    + '<span class="input-group-addon w28">'
                    + '<a class="fa fa-ellipsis-h single-selector"   data-targetname="dutyUser_' + guuid + '" data-targetid="dutyUserId_' + guuid + '" data-selectorType="person" data-saveCallback="getOrgInfoChird2"></a>'
                    + '</span></div></td>'
                    + '<td><div><input type="hidden" name="dutyDeptId" class="form-control addInputWidth"  ><input type="hidden" name="dutyDept" class="form-control addInputWidth" ><input type="text" data-html="true"   id="dutyDept_' + guuid + '" class="form-control addInputWidth"  disabled="disabled"><div></td>'
                    + '<td><div class="input-group date form_datetime form-date expectCompleteDate"  data-date-format="HH:ii p" data-link-field="dtp_input1">'
                    + '<input class="form-control" id="periodEndTime" size="16" type="text" data-html="true"   name="expectCompleteDate"  data-rule-required="true" readonly>'
                    + ' <span class="input-group-addon" ><span class="glyphicon glyphicon-th"></span></span>'
                    + ' </div></td>'
                    + '<td><div><input type="text" data-html="true"    name="remark" class="form-control addInputWidth"  placeholder="备注" data-maxlength="2000" onblur="regData(this)"></div>'
                    + '</td>'
                    + '</tr>');
                $("#countForm").append(row);
                row.find("input[name='expectCompleteDate']").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                row.find("input[name='dutyUserId']").val($("#proposeUserId").val());
                $('#countForm tr:last').xljSingleSelectorUtil();
                $('.form_datetime input').on('click', function () {
                    WdatePicker({
                        el: this,
                        dateFmt: "yyyy-MM-dd HH:mm:ss",
                        errDealMode: -1,
                        onpicked: function (dp) {
                            var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                            if (periodProceeding == '1') {
                                var newDate = (dp.cal.newdate.H > 10 ? dp.cal.newdate.H : '0' + dp.cal.newdate.H) + ':' + (dp.cal.newdate.m > 10 ? dp.cal.newdate.m : '0' + dp.cal.newdate.m) + ':' + (dp.cal.newdate.s > 10 ? dp.cal.newdate.s : '0' + dp.cal.newdate.s);
                                $('#beginTime').val(newDate);
                            }
                        }
                    });
                });

                $('.form_datetime .input-group-addon').on('click', function () {
                    WdatePicker({
                        el: $(this).siblings('input')[0],
                        dateFmt: "yyyy-MM-dd HH:mm:ss",
                        errDealMode: -1,
                        onpicked: function (dp) {
                            var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                            if (periodProceeding == '1') {
                                var newDate = (dp.cal.newdate.H > 10 ? dp.cal.newdate.H : '0' + dp.cal.newdate.H) + ':' + (dp.cal.newdate.m > 10 ? dp.cal.newdate.m : '0' + dp.cal.newdate.m) + ':' + (dp.cal.newdate.s > 10 ? dp.cal.newdate.s : '0' + dp.cal.newdate.s);
                                $('#beginTime').val(newDate);
                            }
                        }
                    });
                });

                resetNum();
            } else {
                pop_tip_open("red", data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        }
    });

}


function regData(ele) {
    var placeholder = $(ele).attr("placeholder");
    var specialKey = "#$%\\'\\\\^*\"\+[]【】{}";
    var inputval = $(ele).val();
    if ((specialKey.indexOf(inputval) > -1 && (inputval != "")) || inputval.indexOf("'") > -1 || inputval.indexOf("&gt;") > -1 || inputval.indexOf("&lt;") > -1) {
        pop_tip_open("blue", placeholder + "不允许输入特殊字符");
        regInput = false;
        $(ele).val("");
        return;
    }
    var dataLength = $(ele).val().length;
    var dataMaxLength = $(ele).attr("data-maxlength");
    if (parseInt(dataLength) > parseInt(dataMaxLength)) {
        pop_tip_open("blue", placeholder + "输入超长,请重新输入");
        regInput = false;
        $(ele).val("");
        return;
    } else {
        regInput = true;
    }
}
function addUpdateCount(i, id) {
    var row = $('<tr class="form-tr">'
        + '<td><input type="checkbox" name="check" ></td>'
        + '<td style="text-align:center"></td>'
        + '<td><div><input type="text" data-html="true"   name="content"  class="form-control addInputWidth"  placeholder="内容" data-maxlength="500" onblur="regData(this)"><input type="hidden" name="id" id="' + i + '" ></div></td>'
        + '<td><div class="input-group fullWidth"><input type="hidden"  id="dutyUserId_' + i + '" name="dutyUserId">'
        + '<input type="text" data-html="true"   class="form-control addInputWidth single-selector" id="dutyUser_' + i + '" name="dutyUser" data-targetname="dutyUser_' + i + '" data-targetid="dutyUserId_' + i + '" data-selectorType="person" data-saveCallback="getOrgInfoChird1" >'
        + '<div class="input-group-addon"><a class="glyphicon glyphicon-remove"   onclick="empty1(this)"></a></div>'
        + '<span class="input-group-addon w28">'
        + '<a class="fa fa-ellipsis-h single-selector"   data-targetname="dutyUser_' + i + '" data-targetid="dutyUserId_' + i + '" data-selectorType="person" data-saveCallback="getOrgInfoChird2"></a>'
        + '</span></div></td>'
        + '<td><div><input type="hidden" name="dutyDeptId" class="form-control addInputWidth"  ><input type="hidden" name="dutyDept" class="form-control addInputWidth" ><input type="text" data-html="true"   id="dutyDept_' + id + '" class="form-control addInputWidth"  disabled="disabled"><div></td>'
        + '<td><div class="input-group date form_datetime form-date expectCompleteDate"  data-date-format="HH:ii p" data-link-field="dtp_input1">'
        + '<input class="form-control" id="periodEndTime" size="16" type="text" data-html="true"   name="expectCompleteDate"  data-rule-required="true" readonly>'
        + ' <span class="input-group-addon" ><span class="glyphicon glyphicon-th"></span></span>'
        + ' </div></td>'
        + '<td><div><input type="text" data-html="true"    name="remark"  placeholder="备注" data-maxlength="500" onblur="regData(this)" class="form-control addInputWidth"></div>'
        + '</td>'
        + '</tr>');
    $("#countForm").append(row);
    $('#countForm tr:last').xljSingleSelectorUtil();
    $('.form_datetime input').on('click', function () {
        WdatePicker({
            el: this,
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            errDealMode: -1,
            onpicked: function (dp) {
                var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                if (periodProceeding == '1') {
                    var newDate = (dp.cal.newdate.H > 10 ? dp.cal.newdate.H : '0' + dp.cal.newdate.H) + ':' + (dp.cal.newdate.m > 10 ? dp.cal.newdate.m : '0' + dp.cal.newdate.m) + ':' + (dp.cal.newdate.s > 10 ? dp.cal.newdate.s : '0' + dp.cal.newdate.s);
                    $('#beginTime').val(newDate);
                }
            }
        });
    });

    $('.form_datetime .input-group-addon').on('click', function () {
        WdatePicker({
            el: $(this).siblings('input')[0],
            dateFmt: "yyyy-MM-dd HH:mm:ss",
            errDealMode: -1,
            onpicked: function (dp) {
                var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                if (periodProceeding == '1') {
                    var newDate = (dp.cal.newdate.H > 10 ? dp.cal.newdate.H : '0' + dp.cal.newdate.H) + ':' + (dp.cal.newdate.m > 10 ? dp.cal.newdate.m : '0' + dp.cal.newdate.m) + ':' + (dp.cal.newdate.s > 10 ? dp.cal.newdate.s : '0' + dp.cal.newdate.s);
                    $('#beginTime').val(newDate);
                }
            }
        });
    });
    resetNum();
}
function empty(obj) {
    $(obj).parent().prev().val("");
    $(obj).parent().prev().prev().val("");
    $(obj).parent().parent().parent().next().next().find(":input").val("");
}
function empty1(obj) {
    $(obj).parent().prev().val("");
    $(obj).parent().prev().prev().val("");
    $(obj).parent().parent().parent().next().find(":input").val("");
}
function resetNum() {
    $("#countForm").find("tr").each(function (i) {
        if (i > 0) {
            $(this).find("td").eq(1).html(i);
        }
    });
}


function delAcount() {
    var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
    checkedTrObjs.remove();
    resetNum();
}

function getOrgInfo(backdata, ele) {
    var rootElement = $(ele).parent().parent().parent().parent();
    rootElement.find("input[name='proposeDeptId']").val(backdata.prefixId);
    rootElement.find("input[name='proposeDept']").val(backdata.prefixName);
    rootElement.find("#proposeDept").val(backdata.prefixName);
}
function getOrgInfoChird1(backdata, ele) {
    var rootElement = $(ele).parent().parent().next();
    var guuid = $(ele).parent().parent().parent().find("input[name='id']").val();
    rootElement.find("input[name='dutyDeptId']").val(backdata.prefixId);
    rootElement.find("input[name='dutyDept']").val(backdata.prefixName);
    rootElement.find("#dutyDept_" + guuid).val(backdata.prefixName);
}
function getOrgInfoChird2(backdata, ele) {
    var rootElement = $(ele).parent().parent().parent().next();
    var guuid = $(ele).parent().parent().parent().parent().find("input[name='id']").val();
    rootElement.find("input[name='dutyDeptId']").val(backdata.prefixId);
    rootElement.find("input[name='dutyDept']").val(backdata.prefixName);
    rootElement.find("#dutyDept_" + guuid).val(backdata.prefixName);
}

