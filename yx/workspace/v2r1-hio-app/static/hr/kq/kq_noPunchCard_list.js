// (function ($, window, document, undefined) {
var jqGridKqNoPunch;
//请假类型列表
var restApplyTypeList;
var applyStatus;
var focusId;
var myFlag;//是否来自考勤核算(true 是)
var myPersonId;//来自我的考勤的人员id
var noPunchApplyId;//未打卡申请id
var token;
$(function () {
    resizeHeight();
    token = $.kqUtils.token;
    myFlag = $.xljUtils.getUrlParam("myFlag");
    myPersonId = $.xljUtils.getUrlParam("myPersonId");

    if (myFlag !== undefined && (myFlag === true || myFlag === "true")) {
        $("#backToSmmmery").show();
    } else {
        $("#backToSmmmery").hide();
    }

    //计薪期间校验
    var wagePeriodDto = $.kqUtils.queryWagePeriod();
    if (wagePeriodDto === undefined || wagePeriodDto == null) {//计薪期间没有设置记录
        pop_text_open("blue", '请先设置计薪期间', function () {
            window.location.href = "kq_wage_period.html?type=add";
        }, function () {
            return;
        });
    } else {
        var startDate = wagePeriodDto.startDate;
        if (startDate === undefined || startDate === null || startDate === "") {//计薪期间有设置，但是开始日期为空
            pop_text_open("blue", '请先设置计薪期间', function () {
                window.location.href = "kq_wage_period.html?type=update&periodId=" + wagePeriodDto.id;
            }, function () {
                return;
            });
        } else {
            //适配oa首页快捷方式、IMpc端快捷方式
            //配置菜单 /hr-app/hr/kq/kq_noPunchCard_list_myKq.html?myFlag=true 然后挂载到
            if (myPersonId == undefined || myPersonId == null || myPersonId == "") {
                //验证用户信息
                var msg = $.hrUtils.verifUserInfo();
                if (msg != null && msg.length > 0) {
                    pop_tip_open("red", msg);
                } else {
                    //hr人员信息
                    //无法获取获取当前登录人，暂不处理，改为手动赋值
                    // var personInfoDto = $.hrUtils.getHREmpInfo();
                    // myPersonId = personInfoDto.id;//赋值当前登陆人hr系统人员id
                    myPersonId = "kqcsf482ff6bcabd3515a4182dfjtzef";
                }
            }
            pageInit();
        }
    }

    resizeGrid();
});

//返回按钮
$("#backToSmmmery").click(function () {
    window.location.href = "kq_summary_accounts.html";
});

$("#exportBtn").on('click', function () {
    exportExcel();
});

$('.btn').click(function (e) {
    e.preventDefault();
});

function pageInit() {
    initDatetimepicker();
    if (myFlag == true || myFlag == "true") {
        noPunchInit({"personId": myPersonId});
    } else {
        noPunchInit({"personId": ""});
    }
    // noPunchInit({"personId": ""});
    querySPStatusList();
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}

//计算高度
function resizeHeight() {
    // //左侧  头部底部为60px  title类 为50px
    // var w_h = $(window).height();
    // // $(".slide-left .ztree-box").height((w_h - 70) + "px");
    // //右侧table
    // $(".mytable").height((w_h - 128) + "px");
}

//计算表格宽度
function resizeGrid() {
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 72);
    // // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-5, true);
    // $.xljUtils.gridResizeFn();
    //解决切换页面大小出现滚动条、切换页面百分比页面出现空白的问题
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
}

//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});

/**
 * 样式格式化:对字段标红
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    // if (!rowObject.useStatus) {
    //     return "style='color:red'";
    // }
}

/**
 * 考勤期间所属机构回调函数
 * @param data
 */
function personCallback(data) {
    $("#groupListForm").find("input[id='orgId']").val(data.id);
    $("#groupListForm").find("input[id='belongOrgName']").val(data.name);
}

/**
 * 跳转到新增页面
 */
function addNotPunchApplyInfo(sign) {
    // window.open("kq_noPunchCard_add_local.html?type=add");
    // window.location.href = "kq_noPunchCard_add_local.html?type=add";
    if (sign == 0) {
        window.location.href = "kq_noPunchCard_add_local.html?type=add";
    } else if (sign == 3) {//我的考勤跳转
        window.location.href = "kq_noPunchCard_add_local.html?type=add&myKqFlag=true&myPersonId=" + myPersonId;
        // window.open("kq_noPunchCard_add_local.html?type=add&myKqFlag=true");
    }
}

function editNotPunchApplyInfo(sign) {
    var ids = jqGridKqNoPunch.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择要修改的记录！");
    } else if (ids.length > 1) {
        pop_tip_open("red", "只能选择一条记录！");
    } else if (sign == 1) {
        noPunchApplyId = ids[0];
        // window.open("kq_noPunchCard_add_local.html?type=update");
        window.location.href = "kq_noPunchCard_add_local.html?type=update&noPunchApplyId=" + noPunchApplyId;
    } else if (sign == 4) {//我的考勤跳转
        noPunchApplyId = ids[0];
        // window.open("kq_noPunchCard_add_local.html?type=update&myKqFlag=true");
        // window.open("kq_noPunchCard_add_local.html?type=update");
        window.location.href = "kq_noPunchCard_add_local.html?type=update&noPunchApplyId=" + noPunchApplyId + "&myPersonId=" + myPersonId + "&myKqFlag=true";
    }
}

function editNotPunchApplyInfo2(sign, id) {
    noPunchApplyId = id;
    if (sign == 1) {
        // window.open("kq_noPunchCard_add_local.html?type=update");
        window.location.href = "kq_noPunchCard_add_local.html?type=update&noPunchApplyId=" + noPunchApplyId;
    } else if (sign == 4) {//我的考勤跳转
        // window.open("kq_noPunchCard_add_local.html?type=update&myKqFlag=true");
        window.location.href = "kq_noPunchCard_add_local.html?type=update&myKqFlag=true&noPunchApplyId=" + noPunchApplyId + "&myPersonId=" + myPersonId;
    }
}

/**
 * 机构回调函数
 */
function orgCallback(data) {
    $("#noPunchListForm").find("input[id='orgId']").val(data.id);
    $("#noPunchListForm").find("input[id='belongOrgName']").val(data.name);
}

/**
 * 清空组织机构上级
 */
function empty() {
    $("#noPunchListForm").find("input[id='orgId']").val("");
    $("#noPunchListForm").find("input[id='belongOrgName']").val("");
}

/**
 * 样式格式化:对字段标红
 */
window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
    // if (!rowObject.useStatus) {
    //     return "style='color:red'";
    // }

    if (rowObject.signInTime == null || rowObject.signInTime == "") {
        return "style='color:red'";
    }


};
window.addCellAttr2 = function (rowId, val, rowObject, cm, rdata) {
    if (!rowObject.useStatus) {
        return "style='color:black'";
    }
    if (rowObject.signOutTime == null || rowObject.signOutTime == "") {
        return "style='color:red'";
    }
};

/**
 * 出差信息
 * */
function noPunchInit(postData) {
    var ubody = "kq/hrKqNotPunch/queryApplyList";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridKqNoPunch = jQuery("#listNoPunchCard").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            // postData:{accountId:account_id,nameOrCode:""},
            postData: postData,
            contentType: "application/json",
            datatype: "JSON",
            jsonReader: {
                repeatitems: false
                // root: "result"
            },
            colModel: [
                // {name: 'code', label: "申请单编码", width: 170, align: "center"},
                {name: 'topicName', label: "主题", width: 100, align: "center"},
                {name: 'approvalStatus', label: "审批状态", width: 100, align: "center", hidden: true},
                {name: 'approvalStatusValue', label: "审批状态", width: 100, align: "center"},
                // {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                {name: 'personName', label: "申请人", width: 100, align: "center"},
                // {name: 'sysMobile', label: "手机号", width: 100, align: "center"},
                // {name: 'currentApprover', label: "当前审批人",width: 100, align: "center"},
                {
                    name: 'notPunchDate',
                    label: "未打卡日期",
                    width: 100,
                    align: "center",
                    formatter: "date",
                    formatoptions: {newformat: 'Y-m-d'}
                },
                {
                    name: 'signTypeValue',
                    label: "补卡类型",
                    width: 100,
                    align: "center"
                },
                {
                    name: 'realTime',
                    label: "实际到岗/离岗时间",
                    width: 100,
                    align: "center"
                },
                // {name: 'applyDate', label: "申请日期", width: 100, align: "center"},
                {name: 'applyId', label: "申请审批单id", width: 100, hidden: true}
            ],

            // width: window.screen.availWidth,
            // height: $(window).height() - 200,
            autowidth: true,
            shrinkToFit: true,
            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            rowNum: 20,//一页显示多少条
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: '',//初始化的时候排序的字段
            sortorder: "",//排序方式,可选desc,asc
            viewrecords: true, //定义是否要显示总记录数
            loadComplete: function (data) {
                $.xljUtils.setFrozenColumnStyle(41);
            },
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "服务器异常，请联系管理员");
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                if (myFlag == "true" || myFlag == true) {
                    editNotPunchApplyInfo2(4, rowid);
                } else {
                    editNotPunchApplyInfo2(1, rowid);
                }
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();

                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listNoPunchCard").setSelection(focusId);
                }
            }
        });
}

//回调函数
function focusIdCallBack(editId) {
    focusId = editId;
}

function notPunchApplyListQuery() {
    var name = $("#personName").val();
    var SPStatus = $("#SPStatus").val();
    var orgId = $("#orgId").val();
    var orgName = $("#belongOrgName").val();
    var notPunchDate = $("#notPunchDate").val();

    var queryData = {
        "name": name,
        "statusList": SPStatus,
        "orgName": orgName,
        "notPunchDate": notPunchDate
    };
    jQuery("#listNoPunchCard").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
}

$("#personName").keydown(function (e) {
    if (e.keyCode == 13) {
        userOnId = "";
        notPunchApplyListQuery();
        event = arguments.callee.caller.arguments[0] || window.event;
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    }
});


function delNotPunch() {
    var ids = jqGridKqNoPunch.jqGrid('getGridParam', 'selarrrow');
    var count = 0;
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择！");
    } else if (ids.length > 0) {
        for (i in ids) {
            var rowData = $("#listNoPunchCard").getRowData(ids[i]);
            // var sysApplyDto = $.hrUtils.getSysApplyById(rowData.applyId);
            //非草稿
            // if (APPLY_STATUS_DRAFT != rowData.approvalStatus) {
            if ($.hrUtils.APPLY_DRAFT != rowData.approvalStatus) {
                count++;
            }
        }
        if (count == 0) {
            pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
                getSysApplyIdsById(ids);
            }, true);
        } else {
            pop_tip_open("red", "只能删除草稿状态的记录，请重新选择！");
            notPunchApplyListQuery();
        }
    }
}

/**
 *根据id查询未打卡申请信息
 */
function getSysApplyIdsById(ids) {
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/querySysApplyIds/" + ids,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        // data: JSON.stringify({"restApplyId": ids}),
        success: function (data) {
            if (data.success) {
                var result = data.result;
                // var applyIds = result;
                delNotPunchInfoById(ids);
                // deleteSysApplyInfo(result);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 删除草稿状态的未打卡信息
 */
function delNotPunchInfoById(ids) {
    var urlBody = "kq/hrKqNotPunch/deleteBatch/" + ids;
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
                $('#listNoPunchCard').jqGrid().trigger("reloadGrid");

                var w = $.hrUtils.focusNode(ids);
                focusIdCallBack(w);
                $('#listNoPunchCard').jqGrid("setGridParam", {
                    GridComplete: function () {
                        if (w != null && w != "") {
                            $('#listNoPunchCard').setSelection(w);
                        }
                        w = "";
                    }
                }).trigger("reloadGrid");
            } else {
                pop_tip_open("red", json.message);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "删除失败!");
        }
    })
}

/**
 *删除请假相关的单据信息
 */
function deleteSysApplyInfo(ids) {
    var urlBody = "sys/sysApply/deleteBatch/" + ids;
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
                $('#listNoPunchCard').jqGrid().trigger("reloadGrid");
            } else {
                pop_tip_open("red", json.message);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "删除失败!");
        }
    })
}


/**
 * 查询审批状态列表
 */
function querySPStatusList() {
    $.ajax({
        url: hostUrl + "kq/hrKqRest/querySPStatusList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var sPStatusList = data.result;
                var selTypeObj = $("#SPStatus");

                for (i in sPStatusList) {
                    var typeId = sPStatusList[i].id;
                    var typeName = sPStatusList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
                // 下拉多选框
                selTypeObj.multipleSelect({
                    width: '130px',
                    filter: true,
                    addTitle: true,
                    minimumCountSelected: 10
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 根据id查询未打卡记录信息
 */
function getInfoById(id) {
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"notPunchApplyId": id}),
        success: function (data) {
            if (data.success) {
                var result = data.result;
                $("#resumptionId").val(result[0].id);
                $("#rPersonId").val(result[0].personId);
                $("#rName").val(result[0].personName);
                $("#rTripType").val(result[0].tripType);
                $("#rApplyTripDays").val(result[0].applyTripDays);
                $("#rApplyStartDate").val(result[0].applyStartDate);
                $("#rApplyEndDate").val(result[0].applyEndDate);
                $("#rApplyId").val(result[0].applyId);
                $("#realTripDays").val(result[0].realTripDays);

                $("#destroyStatus").val(result[0].destroyStatus);
                var realStartDate = result[0].realStartDate;
                var realEndDate = result[0].realEndDate;
                if (realStartDate != null && realStartDate != "") {
                    $("#realStartDate").val(new Date(realStartDate).format("yyyy-MM-dd"));
                    $("#realStartTime option[value='" + realStartDate.substring(11, 16) + "']").attr("selected", true);
                }

                if (realEndDate != null && realEndDate != "") {
                    $("#realEndDate").val(new Date(realEndDate).format("yyyy-MM-dd"));
                    $("#realEndTime option[value='" + realEndDate.substring(11, 16) + "']").attr("selected", true);
                }
                $("#treeModal2").modal('show');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 更新出差信息
 */
function updateApplyInfo() {
    $("#destroyStatus").val("1081100148");
    var bussApplyId = $("#resumptionId").val();
    var hrKqBussTripArr = $("#resumptionLeaveForm").serializeArray();
    var hrKqBussTrip = {};
    for (var i in hrKqBussTripArr) {
        if (hrKqBussTripArr[i].name == "realStartDate" || hrKqBussTripArr[i].name == "realEndDate"
            || hrKqBussTripArr[i].name == "realTripDays" || hrKqBussTripArr[i].name == "destroyStatus") {
            hrKqBussTrip[hrKqBussTripArr[i].name] = hrKqBussTripArr[i].value;
        }
    }
    hrKqBussTrip.delflag = 0;

    var realEndDate = hrKqBussTrip.realEndDate;
    var realEndTime = $("#realEndTime").val();
    var realStartDate = hrKqBussTrip.realStartDate;
    var realStartTime = $("#realStartTime").val();

    realEndDate = realEndDate + " " + realEndTime;
    realStartDate = realStartDate + " " + realStartTime;
    hrKqBussTrip["realEndDate"] = new Date(realEndDate).getTime();
    hrKqBussTrip["realStartDate"] = new Date(realStartDate).getTime();
    if (hrKqBussTrip.realStartDate > hrKqBussTrip.realEndDate) {
        pop_tip_open("red", "开始时间不能大于结束时间！");
        return;
    }
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/update/" + bussApplyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(hrKqBussTrip),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "保存成功！");
                $('#listNoPunchCard').jqGrid().trigger("reloadGrid");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}


//初始化日期控件
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
}

/**
 * 销假申请审批 true：通过 false：不通过
 */
function bussApproval(sign) {
    var restApplyId = $("#resumptionId").val();
    var destroyStatus = "";
    if (sign == "true") {
        destroyStatus = "1081100149";
    } else if (sign == "false") {
        destroyStatus = "1081100150";
    }
    $.ajax({
        url: hostUrl + "kq/hrKqNotPunch/update/" + restApplyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"destroyStatus": destroyStatus}),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "审批成功！");
                $('#listRest').jqGrid().trigger("reloadGrid");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 *  导出Excel
 */
window.exportExcel = function () {
//表格数据
    /* rowData = $('#listNoPunchCard').jqGrid('getRowData');
     for (var i = 0; i < rowData.length; i++) {
     var notPunchDate = rowData[i].notPunchDate;
     if (notPunchDate != undefined && notPunchDate != null && notPunchDate.trim() != '') {
     // var date = notPunchDate.replace(/-/g, '/');
     // rowData[i].notPunchDate = new Date(date).getTime();
     rowData[i].notPunchDate2 = notPunchDate;
     } else {
     rowData[i].notPunchDate2 = "";
     }
     rowData[i].notPunchDate = "";

     }
     */

    var name = $("#personName").val();
    var SPStatus = $("#SPStatus").val();
    var orgId = $("#orgId").val();
    var orgName = $("#belongOrgName").val();
    var notPunchDate = $("#notPunchDate").val();

    var conditionMap = {
        "start": null,
        "limit": null,
        "name": name,
        "statusList": SPStatus,
        "orgName": orgName,
        "notPunchDate": notPunchDate
    };
    var urlBody = "kq/hrKqNotPunch/exportInfo";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(conditionMap),
        async: false,
        success: function (json) {
            if (json.success == true) {
                var path = json.result;
                if (undefined != path && "" != path) {//指定下载
                    var form = $("<form>");   //定义一个form表单
                    form.attr('style', 'display:none');   //在form表单中添加查询参数
                    form.attr('target', 'exportTarget');
                    form.attr('method', 'post');
                    form.attr('action', hostUrl + "/kq/hrKqRest/exportInfoClient?" + token);
                    //添加后台导出参数
                    var input1 = $('<input>');
                    input1.attr('type', 'hidden');
                    input1.attr('name', "path");
                    input1.attr('value', path);

                    $('body').append(form);  //将表单放置在web中
                    form.append(input1);   //将查询参数控件提交到表单上
                    form.submit();   //表单提交
                    pop_tip_open("", "导出成功");
                }
            } else {
                pop_tip_open("red", json.message);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "导出失败");
        }
    })
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

function codeFormatter(cellValue, options, rowObject) {
    var codeName = $.hrUtils.getHRCodeNameById(cellValue);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
}

//查询审批记录
$("#flowBtn").click(function () {
    flowView();
});

//查询审批记录
function flowView() {
    var idsVal = $('#listNoPunchCard').jqGrid('getGridParam', 'selarrrow');
    if (idsVal && idsVal != "") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行查询！");
            return;
        } else {
            var rowId = $('#listNoPunchCard').jqGrid("getGridParam", "selrow");
            var rowData = $('#listNoPunchCard').jqGrid('getRowData', rowId);
            if (rowData.status === '草稿') {
                pop_tip_open("red", "草稿状态不允许查看！");
            } else {
                var businessId = rowData.applyId;
                toFlowView(businessId, FLCODE_KQWDK);
            }
        }
    } else {
        $.xljUtils.tip("blue", "请选择要查询的数据！");
    }
}

// })(jQuery, window, document)