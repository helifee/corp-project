// (function ($, window, document, undefined) {
var jqGridKqBuss;
//请假类型列表
var restApplyTypeList;
var applyStatus;
var focusId;
var focusW = false;
var myFlag;//是否是我的考勤(true 是)
var myPersonId;//来自我的考勤的人员id
$(function () {
    resizeHeight();
    myFlag = $.xljUtils.getUrlParam("myFlag");
    myPersonId = $.xljUtils.getUrlParam("myPersonId");
    //适配oa首页快捷方式、IMpc端快捷方式
    //配置菜单 /hr-app/hr/kq/kq_local_city_trip_myKq.html?myFlag=true 然后挂载到
    if (myPersonId == undefined || myPersonId == null || myPersonId == "") {
        //验证用户信息
        var msg = $.hrUtils.verifUserInfo();
        if (msg != null && msg.length > 0) {
            pop_tip_open("red", msg);
        } else {
            //hr人员信息
            var personInfoDto = $.hrUtils.getHREmpInfo();
            myPersonId = personInfoDto.id;//赋值当前登陆人hr系统人员id
        }
    }
    if (myFlag == true || myFlag == "true") {
        $("#backToMyKq").click(function () {
            window.history.go(-1);
        });
    }
    pageInit();
    resizeGrid();
});

$('.btn').click(function (e) {
    e.preventDefault();
});

$("#resumptionLeave").on('click', function () {
    $("#bussApply").show();
    // $("#bussApproval").hide();
    showResLeaveMode(0);
});

/**
 * 取消申请：将状态改为草稿
 */
$("#cancel").on('click', function () {
    var ids = jqGridKqBuss.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择要修改的记录！");
        return;
    }
    if (ids.length > 1) {
        pop_tip_open("red", "只能选择一条记录！");
        return;
    }
    var rowData = $("#listBussTrip").getRowData(ids[0]);
    updateBussApplyStatus(rowData.applyId);
});

// $("#resumptionLeaveApproval").on('click', function () {
//     $("#bussApply").hide();
//     $("#bussApproval").show();
//     showResLeaveMode(1);
// });

$("#exportBtn").on('click', function () {
    exportExcel();
});
//查询审批记录
$("#flowBtn").click(function () {
    flowView();
});

//查询审批记录
function flowView() {
    var idsVal = $('#listBussTrip').jqGrid('getGridParam', 'selarrrow');
    if (idsVal && idsVal != "") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行查询！");
            return;
        } else {
            var rowId = $('#listBussTrip').jqGrid("getGridParam", "selrow");
            rowData = $('#listBussTrip').jqGrid('getRowData', rowId);
            var businessId = rowData.applyId;
            toFlowView(businessId, FLCODE_KQCC);
        }
    } else {
        $.xljUtils.tip("blue", "请选择要查询的数据！");
    }
}

function pageInit() {
    initDatetimepicker();
    initDatetimepicker2();
    if (myFlag == true || myFlag == "true") {
        bussTripInit({"personId": myPersonId, "ifPublicType": "true"});
    } else {
        bussTripInit({"personId": "", "ifPublicType": "true"});
    }
    queryRestApplyTypeList();
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
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    // $(".slide-left .ztree-box").height((w_h - 70) + "px");
    //右侧table
    $(".con-table .mytable").height((w_h - 110) + "px");
}

//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 60);
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
    $.xljUtils.gridResizeFn();
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
    if (!rowObject.useStatus) {
        return "style='color:red'";
    }
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
 * 跳转到新增请假页面
 */
// var restApplyTypeLists;
function addBussApplyInfo(sign) {
    if (sign == 0) {
        // restApplyTypeLists = restApplyTypeList;
        window.open("kq_local_city_add.html?type=add");
    } else if (sign == 3) {//我的考勤跳转
        window.open("kq_local_city_add.html?type=add&myKqFlag=true");
    }
}

var bussApplyId;//出差申请id
function editBussApplyInfo(sign) {
    var ids = jqGridKqBuss.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择要修改的记录！");
    } else if (ids.length > 1) {
        pop_tip_open("red", "只能选择一条记录！");
    } else if (sign == 1) {
        bussApplyId = ids[0];
        window.open("kq_local_city_add.html?type=update");
    } else if (sign == 4) {//我的考勤跳转
        bussApplyId = ids[0];
        window.open("kq_local_city_add.html?type=update&myKqFlag=true");
    }
}

function editBussApplyInfo2(sign, rowId) {
    if (sign == 1) {
        bussApplyId = rowId;
        window.open("kq_local_city_add.html?type=update");
    } else if (sign == 4) {//我的考勤跳转
        bussApplyId = rowId;
        window.open("kq_local_city_add.html?type=update&myKqFlag=true");
    }
}

/**
 * 机构回调函数
 */
function orgCallback(data) {
    $("#orgId").val(data.id);
    $("#belongOrgName").val(data.name);
}

/**
 * 清空组织机构上级
 */
function empty() {
    $("#orgId").val("");
    $("#belongOrgName").val("");
}

/**
 * 出差信息
 * */
function bussTripInit(postData) {
    var ubody = "kq/hrKqBussTrip/queryApplyList";
    var uall = serviceUrl + ubody;
    //创建jqGrid组件
    jqGridKqBuss = jQuery("#listBussTrip").jqGrid(
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
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'applyId', label: "申请单id", hidden: true, align: "center"},
                {name: 'code', label: "申请单编码", width: 220, align: "center"},
                {name: 'name', label: "主题", width: 93, align: "center"},
                {name: 'status', label: "审批状态", width: 100, align: "center"},
                // {name: 'approver', label: "当前审批人", width: 80, align: "center"},
                {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                {name: 'personName', label: "申请人", width: 100, align: "center"},
                // {name: 'currentApprover', label: "当前审批人",width: 100, align: "center"},
                {name: 'applyTripDays', label: "出差天数", width: 100, align: "center"},
                {name: 'location', label: "出发地点", width: 120, align: "center"},
                {name: 'destination', label: "到达地点", width: 120, align: "center"},
                {
                    name: 'applyStartDate',
                    label: "开始时间",
                    width: 100,
                    align: "center",
                    formatter: dateFormatter
                },
                {
                    name: 'applyEndDate',
                    label: "结束时间",
                    width: 100,
                    align: "center",
                    formatter: dateFormatter
                },
                {name: 'applyDate', label: "申请日期", width: 100, align: "center"},
                {
                    name: 'destroyStatusValue',
                    label: "销出差状态",
                    width: 100,
                    align: "center",
                    formatter: destroyFormatter
                }
            ],

            // width: window.screen.availWidth,
            height: $(window).height() - 210,
            autowidth: true,
            shrinkToFit: true,
            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            sortname: '',//初始化的时候排序的字段
            sortorder: "",//排序方式,可选desc,asc
            rowNum: 20,//一页显示多少条
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: "#pager2",//表格页脚的占位符(一般是div)的id
            viewrecords: true, //定义是否要显示总记录数
            loadComplete: function (data) {
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                if (myFlag == true || myFlag == "true") {
                    editBussApplyInfo2(4, rowid);
                } else {
                    editBussApplyInfo2(1, rowid);
                }
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                /*var idss = jqGridKqBuss.jqGrid('getGridParam', 'selarrrow');
                 var w = $.hrUtils.focusNode(idss);*/
                if (focusW == null && focusW != undefined) {
                    $("#listBussTrip tr").last().find(":input[role='checkbox']").prop('checked', true);
                    $("#listBussTrip tr").last().find(":input[role='checkbox']").trigger("click");
                }
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listBussTrip").setSelection(focusId);

                }
            }
        });
}

//回调函数
function focusIdCallBack(editId) {
    focusId = editId;
}


function bussApplyListQuery() {
    var name = $("#personName").val();
    var SPStatus = $("#SPStatus").val();
    var restType = $("#type").val();
    var orgId = $("#orgId").val();
    var orgName = $("#belongOrgName").val();
    var date = $("#date").val();

    var queryData = {
        "name": name,
        "status": SPStatus,
        "type": restType,
        "orgName": orgName,
        "date": date,
        "ifPublicType": "true"
    };
    jQuery("#listBussTrip").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
}

$("#personName").keydown(function (e) {
    if (e.keyCode == 13) {
        userOnId = "";
        bussApplyListQuery();
        event = arguments.callee.caller.arguments[0] || window.event;
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    }
});

function deleteBussApply() {
    var ids = jqGridKqBuss.jqGrid('getGridParam', 'selarrrow');
    /*var w = $.hrUtils.focusNode(ids);
     if (w == null){
     var ubody = "kq/hrKqBussTrip/queryApplyList";
     var uall = serviceUrl + ubody;
     var queryData = {
     uall:uall,
     datatype:'json',
     page:1
     };
     jQuery("#listBussTrip").jqGrid("setGridParam", queryData).trigger("reloadGrid");
     return;
     }
     return;*/
    var count = 0;
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择！");
    } else if (ids.length > 0) {
        for (i in ids) {
            var rowData = $("#listBussTrip").getRowData(ids[i]);
            var sysApplyDto = $.hrUtils.getSysApplyById(rowData.applyId);
            //非草稿
            if (APPLY_STATUS_DRAFT != sysApplyDto.status) {
                count++;
            }
        }
        if (count == 0) {
            delBussInfoById(ids);
        } else {
            pop_tip_open("red", "只能删除草稿状态的记录，请重新选择！");
            bussApplyListQuery();
        }
    }
}

/**
 *根据id查询请假申请信息
 */
function getKqBussInfoById(ids) {
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/querySysApplyIds/" + ids,
        type: 'POST',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: "{}",
        // data: JSON.stringify({"restApplyId": ids}),
        success: function (data) {
            if (data.success) {
                var result = data.result;
                // var applyIds = result;
                deleteSysApplyInfo(result);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 删除草稿状态的出差信息
 */
function delBussInfoById(ids) {
    pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
        getKqBussInfoById(ids);
        var urlBody = "kq/hrKqBussTrip/deleteBatch/" + ids;
        var urlAll = serviceUrl + urlBody;
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
                    var w = $.hrUtils.focusNode(ids);
                    if (w == null) {
                        var queryData = {
                            page: 1
                        };
                        $('#listBussTrip').jqGrid("setGridParam", queryData).trigger("reloadGrid");
                        return;
                    }
                    $('#listBussTrip').jqGrid("setGridParam", {
                        GridComplete: function () {
                            if (w != null && w != "") {
                                $('#listBussTrip').setSelection(w);
                            }
                        }
                    }).trigger("reloadGrid");
                    focusIdCallBack(w);
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        })
    }, true);
}

/**
 *删除请假相关的单据信息
 */
function deleteSysApplyInfo(ids) {
    var urlBody = "sys/sysApply/deleteBatch/" + ids;
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'DELETE',
        url: urlAll,
        async: false,
        dataType: 'json',
        contentType: 'application/json',
        data: "{}",
        success: function (json) {
            if (json.success == true) {
            } else {
                pop_tip_open("red", json.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员!");
        }
    })
}


/**
 * 查询出差类型列表
 */
function queryRestApplyTypeList() {
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/queryBussApplyTypeList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var restApplyTypeList = data.result;
                var selTypeObj = $("#type");

                selTypeObj.append("<option value=''>" + "全部" + "</option>");
                for (i in restApplyTypeList) {
                    var typeId = restApplyTypeList[i].id;
                    var typeName = restApplyTypeList[i].name;
                    if (typeId == '1079100142') {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
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


/**
 * 查询审批状态列表
 */
function querySPStatusList() {
    $.ajax({
        url: serviceUrl + "kq/hrKqRest/querySPStatusList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                var sPStatusList = data.result;
                var selTypeObj = $("#SPStatus");

                selTypeObj.append("<option value=''>" + "全部" + "</option>");
                for (i in sPStatusList) {
                    var typeId = sPStatusList[i].id;
                    var typeName = sPStatusList[i].name;
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

/**
 * 根据id查询出差记录信息
 */
function getBussInfoByIdForRes(id) {
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"bussApplyId": id, "ifPublicType": "true"}),
        success: function (data) {
            $("#realTripDays").val("");
            $("#realStartDate").val("");
            $("#realEndDate").val("");
            $("#realStartTime option:first").prop("selected", 'selected');
            $("#realEndTime option:first").prop("selected", 'selected');
            if (data.success) {
                var result = data.result.list;
                $("#resumptionId").val(result[0].id);
                $("#rPersonId").val(result[0].personId);
                $("#rName").val(result[0].personName);
                var tripType = result[0].tripType;
                var tripTypeName = codeFormatter(tripType);
                $("#rTripType").val(tripType);
                $("#tripTypeName").val(tripTypeName);
                $("#rApplyId").val(result[0].applyId);
                var destroyStatus = result[0].destroyStatus;
                $("#destroyStatus").val(destroyStatus);
                var rApplyTripDays = result[0].applyTripDays;
                var rApplyStartDate = result[0].applyStartDate;
                var rApplyEndDate = result[0].applyEndDate;
                if (destroyStatus !== null && destroyStatus !== undefined && destroyStatus === "1081100725") {//销假状态：已销
                    $("#ifAllDestroy option[value='no']").attr("selected", true);
                    $("#ifAllDestroy").val("no");
                    $("#ifAllDestroy").change();
                    rApplyTripDays = result[0].applyTripDaysOld;
                    rApplyStartDate = result[0].applyStartDateOld;
                    rApplyEndDate = result[0].applyEndDateOld;
                    $("#realTripDays").val(result[0].applyTripDays);
                    var realStartDate = result[0].applyStartDate;
                    var realEndDate = result[0].applyEndDate;
                    if (realStartDate !== null && realStartDate !== "") {
                        $("#realStartDate").val(new Date(realStartDate.replace(/-/g, '/')).format("yyyy-MM-dd"));
                        $("#realStartTime option[value='" + realStartDate.substring(11, 16) + "']").attr("selected", true);
                    }

                    if (realEndDate !== null && realEndDate !== "") {
                        $("#realEndDate").val(new Date(realEndDate.replace(/-/g, '/')).format("yyyy-MM-dd"));
                        $("#realEndTime option[value='" + realEndDate.substring(11, 16) + "']").attr("selected", true);
                    }
                    $("#ifAllDestroy").attr("disabled", "disabled");
                    $(".realApplyInfo").disable();
                } else if (destroyStatus === "1081100969") {//销假状态：无效（即全销）
                    $(".realApplyInfo").enable();
                    $("#ifAllDestroy").removeAttr("disabled");
                    $("#realTripDays").removeAttr("disabled");
                    $("#ifAllDestroy option[value='yes']").attr("selected", true);
                    $("#ifAllDestroy").val("yes");
                    $("#ifAllDestroy").change();
                    $("#ifAllDestroy").attr("disabled", "disabled");
                    $("#realTripDays").attr("disabled", "disabled");

                } else {
                    $(".realApplyInfo").enable();
                    $("#ifAllDestroy").removeAttr("disabled");
                    $("#realTripDays").attr("disabled", "disabled");
                }

                $("#rApplyTripDays").val(rApplyTripDays);
                $("#rApplyStartDate").val(rApplyStartDate);
                $("#rApplyEndDate").val(rApplyEndDate);
                $("#treeModal2").modal('show');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

function showResLeaveMode(sign) {
    var ids = jqGridKqBuss.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择一条记录！");
    } else if (ids.length > 1) {
        pop_tip_open("red", "只能选择一条记录！");
    } else {
        var count = 0;
        for (i in ids) {
            var rowData = $("#listBussTrip").getRowData(ids[i]);
            if (rowData.status != "已审批") {
                count++;
            }

            if (rowData.destroyStatusValue == "已销" || rowData.destroyStatusValue == "无效") {
                $("#rSave").hide();
            }
            if (rowData.destroyStatusValue == "未销") {
                $("#rSave").show();
            }


        }
        if (count == 0) {
            getBussInfoByIdForRes(ids[0]);
        } else {
            pop_tip_open("red", "审批通过才能销出差，请重新选择！");
        }
    }
}

/**
 * 更新出差信息
 */
function updateApplyInfo() {

    var realTripDays = $("#realTripDays").val();//实际出差天数
    var rApplyTripDays = $("#rApplyTripDays").val();//申请。出差天数
    var bussApplyId = $("#resumptionId").val();
    // var hrKqBussTripArr = $("#resumptionLeaveForm").serializeArray();
    var hrKqBussTrip = {};
    var ifAllDestroy = $("#ifAllDestroy").val();
    if (ifAllDestroy !== null && ifAllDestroy === "yes") {//全销
        $("#destroyStatus").val("1081100969");
        hrKqBussTrip.destroyStatus = '1081100969';//无效
    } else {
        $("#destroyStatus").val("1081100725");
        hrKqBussTrip.destroyStatus = '1081100725';//已销
        var realEndDate = $("#realEndDate").val();
        var realEndTime = $("#realEndTime").val();
        var realStartDate = $("#realStartDate").val();
        var realStartTime = $("#realStartTime").val();
        var applyStartDate = $("#rApplyStartDate").val();
        var applyEndDate = $("#rApplyEndDate").val();
        if (realStartDate === null || realStartDate === "") {
            pop_tip_open("red", "实际开始时间不能为空！");
            return;
        }

        if (realEndDate === null || realEndDate === "") {
            pop_tip_open("red", "实际结束时间不能为空！");
            return;
        }
        realEndDate = realEndDate + " " + realEndTime;
        realStartDate = realStartDate + " " + realStartTime;
        //将原有的出差信息保存到*Old中
        hrKqBussTrip["applyEndDateOld"] = new Date(applyEndDate).getTime();
        hrKqBussTrip["applyStartDateOld"] = new Date(applyStartDate).getTime();
        hrKqBussTrip["applyTripDaysOld"] = rApplyTripDays;
        //将实际出差信息更新的到原出差信息表对应字段中
        hrKqBussTrip["applyEndDate"] = new Date(realEndDate).getTime();
        hrKqBussTrip["applyStartDate"] = new Date(realStartDate).getTime();
        hrKqBussTrip["applyTripDays"] = realTripDays;

        if (hrKqBussTrip.realStartDate > hrKqBussTrip.realEndDate) {
            pop_tip_open("red", "开始时间不能大于结束时间！");
            return;
        }
        if (hrKqBussTrip.realStartDate < applyStartDate) {
            pop_tip_open("red", "实际开始时间不能小于申请开始时间！");
            return;
        }


        if (hrKqBussTrip.realStartDate > applyEndDate) {
            pop_tip_open("red", "实际开始时间不能大于申请结束时间！");
            return;
        }


        if (hrKqBussTrip.realEndDate > applyEndDate) {
            pop_tip_open("red", "实际结束时间不能大于申请结束时间！");
            return;
        }
    }

    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/update/" + bussApplyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(hrKqBussTrip),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "保存成功！");
                $('#listBussTrip').jqGrid().trigger("reloadGrid");
                focusIdCallBack(bussApplyId);
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
//     rowData = $('#listBussTrip').jqGrid('getRowData');
    var urlBody = "kq/hrKqBussTrip/exportInfo";
    var urlAll = serviceUrl + urlBody;
    // for (var i = 0; i < rowData.length; i++) {
    //     var applyStartDate = rowData[i].applyStartDate;
    //     var applyEndDate = rowData[i].applyEndDate;
    //     rowData[i].applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
    //     rowData[i].applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
    // }
    var name = $("#personName").val();
    var SPStatus = $("#SPStatus").val();
    var restType = $("#type").val();
    var orgId = $("#orgId").val();
    var orgName = $("#belongOrgName").val();
    var date = $("#date").val();

    var conditionMap = {
        "start": null,
        "limit": null,
        "name": name,
        "status": SPStatus,
        "type": restType,
        "orgName": orgName,
        "date": date,
        "ifPublicType": "true"
    };
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
                    form.attr('action', serviceUrl + "org/orgPostRelation/exportInfoClient");
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
                pop_tip_open("red", json.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "导出失败");
        }
    })
};


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
    var bussApplyId = $("#resumptionId").val();
    var destroyStatus = "";
    if (sign == "true") {
        destroyStatus = "1081100149";
    } else if (sign == "false") {
        destroyStatus = "1081100150";
    }
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/update/" + bussApplyId,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({"destroyStatus": destroyStatus}),
        success: function (data) {
            if (data.success) {
                pop_tip_open("blue", "审批成功！");
                $('#listBussTrip').jqGrid().trigger("reloadGrid");
                focusIdCallBack(bussApplyId)
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


function codeFormatter(cellValue, options, rowObject) {
    var codeName = $.hrUtils.getHRCodeNameById(cellValue);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
}

//字符串截取：yyyy-MM-dd hh:mm
function dateFormatter(cellValue, options, rowObjec) {
    if (cellValue == null || cellValue == "") {
        return "";
    } else {
        return cellValue.substring(0, 16);
    }
}

/**
 * 计算出差天数
 */
function calculateBussDays() {
    var realStartDate = $("#realStartDate").val();
    var realEndDate = $("#realEndDate").val();
    var realStartTime = $("#realStartTime").val();
    var realEndTime = $("#realEndTime").val();

    var days = 0;
    if (realStartDate != null && realStartDate != "" && realEndDate != null && realEndDate != "") {
        days = getDateDiff(realStartDate, realEndDate) + 1;
    }
    if ((realStartTime == "09:00" && realEndTime == "12:00") || (realStartTime == "13:30" && realEndTime == "18:00")) {//请半天
        days = days - 0.5;
        if (days < 0) {
            days = 0;
        }
    } else if (realStartTime == "13:30" && realEndTime == "12:00") {
        days = 0;
    }
    $("#realTripDays").val(days);
}

function getDateDiff(date1, date2) {
    var sArr = date1.split("-");
    var eArr = date2.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
    // return Math.abs(result);
    return Math.abs(result);
}

function initDatetimepicker2() {
    var picker = $('.datetimepickerM').datetimepicker({
        format: 'yyyy-mm',
        weekStart: 1,
        autoclose: true,
        startView: 3,
        minView: 3,
        forceParse: false,
        language: 'zh-CN'
    });
}

/**
 * 更新单据申请表的状态（针对审批通过但是要取消申请的情况）
 * @param id
 */
function updateBussApplyStatus(id) {
    var urlBody = "sys/sysApply/update/" + id;
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'PUT',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"status": "1067100106"}),
        success: function (data) {
            if (data.success == true) {
                pop_tip_open("blue", "取消成功！");
                $('#listBussTrip').jqGrid().trigger("reloadGrid");
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
}

function ifAllDestroyChange() {
    var ifAllDestroy = $("#ifAllDestroy").val();
    if (ifAllDestroy !== null && ifAllDestroy !== undefined) {
        if (ifAllDestroy === "yes") {
            $(".realApplyInfo").hide();
        } else if (ifAllDestroy === "no") {
            $(".realApplyInfo").show();
        }
    }
}

function destroyFormatter(cellValue, options, rowObject) {
    var name = cellValue;
    if (cellValue !== undefined && cellValue !== null) {
        if (cellValue === "无效") {
            name = "已销";
        }
    } else {
        return ""
    }
    return name;
}

// })(jQuery, window, document)