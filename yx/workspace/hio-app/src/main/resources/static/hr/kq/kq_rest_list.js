var restApplyId;//请假申请id
var restApplyTypeList;
var applyIds;
var applyStatus;
var jqGridKqRest;
var typeName;
var focusId;//编辑后的焦点
var myFlag;//是否是我的考勤(true 是)
var myPersonId;//来自我的考勤的人员id
(function ($, window, document, undefined) {
    var exportRowData;
//请假类型列表
    $(function () {
        resizeHeight();
        myFlag = $.xljUtils.getUrlParam("myFlag");
        myPersonId = $.xljUtils.getUrlParam("myPersonId");
        //适配oa首页快捷方式、IMpc端快捷方式
        //配置菜单 /hr-app/hr/kq/kq_rest_list_myKq.html?myFlag=true 然后挂载到
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
        // updatePersonAnnualInfo("kqcsf482ff6bcabd3515a4182dfjtzef");
    });
    //查询审批记录
    $("#flowBtn").click(function () {
        flowView();
    });

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    //查询审批记录
    function flowView() {
        var idsVal = $('#listRest').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行查询！");
                return;
            } else {
                var rowId = $('#listRest').jqGrid("getGridParam", "selrow");
                rowData = $('#listRest').jqGrid('getRowData', rowId);
                var businessId = rowData.applyId;
                toFlowView(businessId, FLCODE_KQQJ);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要查询的数据！");
        }
    }

    $("#resumptionLeave").on('click', function () {
        $("#restApply").show();
        // $("#restApproval").hide();
        showResLeaveMode(0);
    });


    /**
     * 取消申请：将状态改为草稿
     */
    $("#cancel").on('click', function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
            return;
        }
        if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
            return;
        }
        var rowData = $("#listRest").getRowData(ids[0]);
        var personId = rowData.personId;
        var restTypeName = rowData.restTypeName;
        var applyRestDays = rowData.applyRestDays;
        if (restTypeName === "年假") {//年假类型的申请，需要先释放年假天数
            var flag = updatePersonAnnualInfo(personId, applyRestDays, "sub");
            if (flag !== null && flag === true) {//执行成功
                updateRestApplyStatus(rowData.applyId);
            }
        } else {
            updateRestApplyStatus(rowData.applyId);
        }
    });

    $("#exportBtn").on('click', function () {
        exportExcel();
    });

    function pageInit() {
        initDatetimepicker();
        initDatetimepicker2();
        if (myFlag == true || myFlag == "true") {
            restInit({"personId": myPersonId});
        } else {
            restInit({"personId": ""});
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
     * 机构回调函数
     */
    window.orgCallback = function (data) {
        $("#kqRestListForm").find("input[id='orgId']").val(data.id);
        $("#kqRestListForm").find("input[id='belongOrgName']").val(data.name);
    };

    /**
     * 清空组织机构上级
     */
    window.empty = function () {
        $("#kqRestListForm").find("input[id='orgId']").val("");
        $("#kqRestListForm").find("input[id='belongOrgName']").val("");
    };

    /**
     * 跳转到新增请假页面
     */
// var restApplyTypeLists;
    window.addRestApplyInfo = function (sign) {
        if (sign == 0) {
            // restApplyTypeLists = restApplyTypeList;
            window.open("kq_rest_add.html?type=add");
        } else if (sign == 3) {//我的考勤跳转
            // restApplyTypeLists = restApplyTypeList;
            window.open("kq_rest_add.html?type=add&myKqFlag=true");
        }
    };

    window.editRestApplyInfo = function (sign) {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else if (sign == 1) {
            restApplyId = ids[0];
            window.open("kq_rest_add.html?type=update");
        } else if (sign == 4) {//我的考勤跳转
            // restApplyTypeLists = restApplyTypeList;
            restApplyId = ids[0];
            window.open("kq_rest_add.html?type=update&myKqFlag=true");
        }
    };

    window.editRestApplyInfo2 = function (sign, rowId) {
        if (sign == 1) {
            restApplyId = rowId;
            window.open("kq_rest_add.html?type=update");
        } else if (sign == 4) {//我的考勤跳转
            restApplyId = rowId;
            window.open("kq_rest_add.html?type=update&myKqFlag=true");
        }
    };
    /**
     * 请假信息
     * */
    window.restInit = function (postData) {
        var ubody = "kq/hrKqRest/queryApplyList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridKqRest = jQuery("#listRest").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: postData,
                // postData:{accountId:account_id,nameOrCode:""},
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false
                    // root: "result"
                },
                colModel: [
                    // {name: 'id', label: "序号", width: 48, align: "center"},
                    {name: 'applyId', label: "申请单id", hidden: true, align: "center"},
                    {name: 'code', label: "申请单编码", width: 170, align: "center"},
                    {name: 'name', label: "主题", width: 93, align: "center"},
                    {
                        name: 'status',
                        label: "审批状态",
                        width: 100,
                        align: "center"
                        // , formatter: codeFormatter
                    },
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {name: 'personId', label: "hr系统申请人id", hidden: true, width: 100, align: "center"},
                    // {name: 'currentApprover', label: "当前审批人",width: 100, align: "center"},
                    {
                        name: 'restTypeName',
                        label: "请假类型",
                        width: 100,
                        align: "center"
                        // , formatter: typeFormatter
                    },
                    {name: 'applyRestDays', label: "请假天数", width: 100, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 120,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 120,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'applyDate', label: "申请日期", width: 100, align: "center"},
                    {
                        name: 'destroyStatusValue',
                        label: "销假状态",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: destroyFormatter
                    }
                ],

                // width: window.screen.availWidth,
                height: $(window).height() - 200,
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
                    console.log(data);
                },
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    var rowData = $('#listRest').jqGrid('getRowData', rowid);
                },
                ondblClickRow: function (rowid, iRow, iCol, e) {
                    if (myFlag == true || myFlag == "true") {
                        editRestApplyInfo2(4, rowid);
                    } else {
                        editRestApplyInfo2(1, rowid);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    //如果焦点id不为空
                    if (focusId != undefined && focusId != null) {
                        //闪亮聚焦
                        $("#listRest").setSelection(focusId);
                    }
                }
            }).navGrid('#pager2', {add: false, edit: false, del: false, search: false, refresh: false});
    };

    //回调函数
    window.focusIdCallBack = function (editId) {
        focusId = editId;
        //聚焦
        $('#listRest').jqGrid("setGridParam", {
            gridComplete: function () {
                if (editId != null && editId != "") {
                    $("#listRest").setSelection(editId);
                }
            }
        }).trigger("reloadGrid");
    };


    window.restApplyListQuery = function () {
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
            "date": date
        };
        jQuery("#listRest").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
    };

    $("#personName").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            restApplyListQuery();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });

    window.deleteRest = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');

        var count = 0;
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
        } else if (ids.length > 0) {
            for (i in ids) {
                var rowData = $("#listRest").getRowData(ids[i]);
                var sysApplyDto = $.hrUtils.getSysApplyById(rowData.applyId);
                //非草稿
                if (APPLY_STATUS_DRAFT != sysApplyDto.status) {
                    count++;
                }
            }
            if (count == 0) {
                delRestInfoById(ids);
            } else {
                pop_tip_open("red", "只能删除草稿状态的记录，请重新选择！");
                //加载刷新
                restApplyListQuery();
            }
        }
    };

    /**
     *根据id查询请假申请信息
     */
    window.getKqRestInfoById = function (ids) {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/querySysApplyIds/" + ids,
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: "{}",
            // data: JSON.stringify({"restApplyId": ids}),
            success: function (data) {
                if (data.success) {
                    var result = data.result;
                    applyIds = result;
                    deleteSysApplyInfo(applyIds);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    /**
     * 删除请假信息
     */
    window.delRestInfoById = function (ids) {
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            getKqRestInfoById(ids);
            var urlBody = "kq/hrKqRest/deleteByApplyIds/" + ids;
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
                            $('#listRest').jqGrid("setGridParam", queryData).trigger("reloadGrid");
                            return;
                        }
                        $('#listRest').jqGrid("setGridParam", {
                            GridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listRest').setSelection(w);
                                }
                            }
                        }).trigger("reloadGrid");
                        focusIdCallBack(w);
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除失败!");
                }
            })
        }, true);
    };

    /**
     *删除请假相关的单据信息
     */
    window.deleteSysApplyInfo = function (ids) {
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
                // if (json.success == true) {
                //     pop_tip_open("green", "删除成功!");
                //     $('#listRest').jqGrid().trigger("reloadGrid");
                // } else {
                //     pop_tip_open("red", json.msg);
                // }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "删除失败!");
            }
        })
    };


    /**
     * 查询请假类型列表
     */
    window.queryRestApplyTypeList = function () {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/queryRestApplyTypeList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"ifAllTypeQuery": "true"}),
            success: function (data) {
                if (data.success) {
                    var restApplyTypeList = data.result;
                    var selTypeObj = $("#type");

                    selTypeObj.append("<option value=''>" + "全部" + "</option>");
                    for (i in restApplyTypeList) {
                        var typeId = restApplyTypeList[i].id;
                        var typeName = restApplyTypeList[i].name;
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };


    /**
     * 查询审批状态列表
     */
    window.querySPStatusList = function () {
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
    };

    /**
     * 根据id查询请假记录信息
     */
    window.getRestInfoByIdForRes = function (id) {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"restApplyId": id}),
            success: function (data) {
                $("#realRestDays").val("");
                $("#realStartDate").val("");
                $("#realEndDate").val("");
                $("#realStartTime option:first").prop("selected", 'selected');
                $("#realEndTime option:first").prop("selected", 'selected');
                // $("#realStartTime").val("");
                // $("#realEndTime").val("");
                if (data.success) {
                    var result = data.result.list;
                    $("#resumptionId").val(result[0].id);
                    $("#rPersonId").val(result[0].personId);
                    $("#rName").val(result[0].personName);
                    $("#rType").val(result[0].restType);
                    var destroyStatus = result[0].destroyStatus;
                    var rApplyRestDays = result[0].applyRestDays;
                    var rApplyStartDate = result[0].applyStartDate;
                    var rApplyEndDate = result[0].applyEndDate;
                    if (destroyStatus !== null && destroyStatus !== undefined && (destroyStatus === "1081100725")) {//销假状态：已销
                        $("#ifAllDestroy option[value='no']").attr("selected", true);
                        $("#ifAllDestroy").val("no");
                        $("#ifAllDestroy").change();
                        rApplyRestDays = result[0].applyRestDaysOld;
                        rApplyStartDate = result[0].applyStartDateOld;
                        rApplyEndDate = result[0].applyEndDateOld;
                        $("#realRestDays").val(result[0].applyRestDays);
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
                        // $(".realApplyInfo").attr("disabled", "disabled");
                        $(".realApplyInfo").disable();
                    } else if (destroyStatus === "1081100969") {//销假状态：无效（即全销）
                        $(".realApplyInfo").enable();
                        $("#ifAllDestroy").removeAttr("disabled");
                        $("#realRestDays").removeAttr("disabled");
                        $("#ifAllDestroy option[value='yes']").attr("selected", true);
                        $("#ifAllDestroy").val("yes");
                        $("#ifAllDestroy").change();
                        $("#ifAllDestroy").attr("disabled", "disabled");
                        $("#realRestDays").attr("disabled", "disabled");
                    } else {
                        $(".realApplyInfo").enable();
                        $("#ifAllDestroy").removeAttr("disabled");
                        $("#realRestDays").attr("disabled", "disabled");
                    }
                    $("#rTypeName").val(result[0].restTypeName);
                    $("#rApplyRestDays").val(rApplyRestDays);
                    $("#rApplyStartDate").val(rApplyStartDate);
                    $("#rApplyEndDate").val(rApplyEndDate);
                    $("#rApplyId").val(result[0].applyId);

                    $("#treeModal2").modal('show');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    window.showResLeaveMode = function (sign) {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择一条记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var count = 0;
            var count2 = 0;
            for (i in ids) {
                var rowData = $("#listRest").getRowData(ids[i]);
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
                getRestInfoByIdForRes(ids[0]);
            } else {
                pop_tip_open("red", "审批通过才能销假，请重新选择！");
            }
        }
    };


    /**
     * 0  申请  1  审批
     */
    // window.showResLeaveMode = function (sign) {
    //     var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
    //     if (ids == "" || ids.length == 0) {
    //         pop_tip_open("red", "请选择一条记录！");
    //     } else if (ids.length > 1) {
    //         pop_tip_open("red", "只能选择一条记录！");
    //     } else {
    //         var count = 0;
    //         var count2 = 0;
    //         for (i in ids) {
    //             var rowData = $("#listRest").getRowData(ids[i]);
    //             if (rowData.status != "已审批") {
    //                 count++;
    //             }
    //
    //             if (rowData.destroyStatus == "已申请") {
    //                 $("#rSave").hide();
    //                 $("#raNo").show();
    //                 $("#raYes").show();
    //             }
    //             if (rowData.destroyStatus == "审批通过") {
    //                 $("#raYes").hide();
    //                 $("#raNo").hide();
    //                 $("#rSave").hide();
    //             }
    //
    //
    //             if (rowData.destroyStatus == "未申请" || rowData.destroyStatus == "审批未通过") {
    //                 $("#raYes").hide();
    //                 $("#raNo").hide();
    //                 $("#rSave").show();
    //             }
    //         }
    //
    //         if (count == 0) {
    //             getRestInfoByIdForRes(ids[0]);
    //         } else {
    //             pop_tip_open("red", "审批通过才能销假，请重新选择！");
    //         }
    //     }
    // };


    /**
     * 销假
     */
    window.destroyRestUpdate = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
            return;
        }
        if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
            return;
        }
        var rowData = $("#listRest").getRowData(ids[0]);
        var personId = rowData.personId;
        var applyStartDate = rowData.applyStartDate;
        applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        var applyEndDate = rowData.applyEndDate;
        applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        var restTypeName = rowData.restTypeName;
        var applyRestDays = rowData.applyRestDays;
        var realRestDays = $("#realRestDays").val();
        if (!isNaN(applyStartDate) && !isNaN(applyEndDate)) {
            var start_year = parseInt(new Date(applyStartDate).getFullYear());
            var end_year = parseInt(new Date(applyEndDate).getFullYear());
            if (end_year !== start_year) {//跨年请假
                pop_tip_open("red", "异常请假记录，不允许跨年申请年假！");
                return;
            } else if (start_year === end_year) {
                $("#annualYear").val(start_year);
            }
        }
        if (restTypeName === "年假") {//年假类型的申请，需要先释放年假天数
            var ifAllDestroy = $("#ifAllDestroy").val();
            var days = 0;
            if (ifAllDestroy !== undefined && ifAllDestroy === "yes") {//全销
                days = parseFloat(applyRestDays);
            } else if (ifAllDestroy !== undefined && ifAllDestroy === "no") {//非全销
                days = parseFloat(applyRestDays) - parseFloat(realRestDays);
            }
            var flag = updatePersonAnnualInfo(personId, days, "sub");
            if (flag !== null && flag === true) {//执行成功
                updateApplyInfo();
            }
        } else {
            updateApplyInfo();
        }
    };

    /**
     * 更新请假信息：销假
     */
    window.updateApplyInfo = function () {
        var realRestDays = $("#realRestDays").val();
        var rApplyRestDays = $("#rApplyRestDays").val();
        var restApplyId = $("#resumptionId").val();
        // var hrKqRestArr = $("#resumptionLeaveForm").serializeArray();
        var hrKqRestDto = {};
        var ifAllDestroy = $("#ifAllDestroy").val();
        if (ifAllDestroy !== null && ifAllDestroy === "yes") {//全销
            $("#destroyStatus").val("1081100969");
            hrKqRestDto.destroyStatus = '1081100969';//无效
        } else if (ifAllDestroy !== null && ifAllDestroy === "no") {//部分销假
            $("#destroyStatus").val("1081100725");
            hrKqRestDto.destroyStatus = '1081100725';//已销

            var applyStartDate = $("#rApplyStartDate").val();
            var applyEndDate = $("#rApplyEndDate").val();
            var realEndDate = $("#realEndDate").val();
            var realEndTime = $("#realEndTime").val();
            var realStartDate = $("#realStartDate").val();
            var realStartTime = $("#realStartTime").val();
            if (realStartDate === null || realStartDate === "") {
                pop_tip_open("red", "实际开始时间不能为空！");
                return;
            }

            if (realEndDate === null || realEndDate === "") {
                pop_tip_open("red", "实际结束时间不能为空！");
                return;
            }
            realStartDate = realStartDate + " " + realStartTime;
            realEndDate = realEndDate + " " + realEndTime;
            //将原有的请假信息保存到*Old中
            hrKqRestDto["applyEndDateOld"] = new Date(applyEndDate).getTime();
            hrKqRestDto["applyStartDateOld"] = new Date(applyStartDate).getTime();
            hrKqRestDto["applyRestDaysOld"] = rApplyRestDays;
            //将实际请假信息更新的到原请假信息对应字段中
            hrKqRestDto["applyStartDate"] = new Date(realStartDate).getTime();
            hrKqRestDto["applyEndDate"] = new Date(realEndDate).getTime();
            hrKqRestDto["applyRestDays"] = realRestDays;

            if (hrKqRestDto.realStartDate > hrKqRestDto.realEndDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                return;
            }


            if (hrKqRestDto.realStartDate < applyStartDate) {
                pop_tip_open("red", "实际开始时间不能小于申请开始时间！");
                return;
            }


            if (hrKqRestDto.realStartDate > applyEndDate) {
                pop_tip_open("red", "实际开始时间不能大于申请结束时间！");
                return;
            }


            if (hrKqRestDto.realEndDate > applyEndDate) {
                pop_tip_open("red", "实际结束时间不能大于申请结束时间！");
                return;
            }
        }

        $.ajax({
            url: serviceUrl + "kq/hrKqRest/update/" + restApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqRestDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "销假成功！");
                    $('#listRest').jqGrid().trigger("reloadGrid");
                    focusIdCallBack(restApplyId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    // window.reatDestoryCheck = function () {
    //
    // };


    /**
     * 销假申请审批 true：通过 false：不通过
     */
    window.restApproval = function (sign) {
        var restApplyId = $("#resumptionId").val();
        var destroyStatus = "";
        if (sign == "true") {
            destroyStatus = "1081100149";
        } else if (sign == "false") {
            destroyStatus = "1081100150";
        }
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/update/" + restApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"destroyStatus": destroyStatus}),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "审批成功！");
                    $('#listRest').jqGrid().trigger("reloadGrid");
                    focusIdCallBack(restApplyId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    /**
     * 提交审批
     */
    window.applyApproval = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var rowData = $("#listRest").getRowData(ids);
            var applyStartDate = rowData.applyStartDate;
            var applyEndDate = rowData.applyEndDate;
            $.ajax({
                url: serviceUrl + "kq/hrKqRest/kqRestApproval",
                type: 'POST',
                dataType: 'JSON',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": ids[0],
                    "applyStartDate": applyStartDate,
                    "applyEndDate": applyEndDate,
                    "applyId": "1d82338fa16b48548bfc0cbcdcd35526"
                }),
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
    };

    /**
     *审批通过
     */
    window.approvalSucess = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');

        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            $.ajax({
                url: serviceUrl + "kq/hrKqRest/kqRestApprovalSuccess",
                type: 'POST',
                dataType: 'JSON',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({"id": ids[0]}),
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
    };

    /**
     * 审批：退回
     */
    window.approvalBack = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');

        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var rowData = $("#listRest").getRowData(ids);
            var applyStartDate = rowData.applyStartDate;
            var applyEndDate = rowData.applyEndDate;
            $.ajax({
                url: serviceUrl + "kq/hrKqRest/kqRestApprovalBack",
                type: 'POST',
                dataType: 'JSON',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": ids[0],
                    "applyStartDate": applyStartDate,
                    "applyEndDate": applyEndDate,
                    "applyId": "1d82338fa16b48548bfc0cbcdcd35526"
                }),
                success: function (data) {
                    if (data.success) {
                        pop_tip_open("blue", "退回成功！");
                        $('#listRest').jqGrid().trigger("reloadGrid");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
        }
    };

    /*
     function changePager(text) {
     var pagerCenter = $('#listRest');//获取td
     var total = pagerCenter.jqGrid('getGridParam', 'rowList');
     var sss = pagerCenter.find('select');
     var ss = pagerCenter.find('select').hasClass('ui-pg-selbox');
     var select = $('.mytable .ui-pg-selbox');
     $(".mytable .ui-pg-selbox  option[value='" + text + "']").attr("selected", true);
     }
     */

    /**
     *  导出Excel
     */
    window.exportExcel = function () {
//表格数据
        var colNames = $("#listRest").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listRest").jqGrid('getGridParam', 'colModel');
        /*rowData = $('#listRest').jqGrid('getRowData');
         for (var i = 0; i < rowData.length; i++) {
         var applyStartDate = rowData[i].applyStartDate;
         var applyEndDate = rowData[i].applyEndDate;
         rowData[i].applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
         rowData[i].applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
         }*/
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
            "date": date
        };
        var urlBody = "kq/hrKqRest/exportInfo";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify(rowData),
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
    window.initDatetimepicker = function () {
        //年月日
        var picker = $('.datetimepicker2').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };

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

    window.getHolidayNameById = function (id) {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/getHolidayNameById",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"id": id}),
            success: function (data) {
                if (data.success) {
                    typeName = data.result;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    function typeFormatter(cellValue, options, rowObject) {
        getHolidayNameById(cellValue);
        if (typeName != null) {
            return typeName;
        } else {
            return "";
        }
    }

    window.calculateWorkDays = function () {
        var personId = $("#rPersonId").val();
        var realStartDate = $("#realStartDate").val();
        var realEndDate = $("#realEndDate").val();
        var realStartTime = $("#realStartTime").val();
        var applyEndTime = $("#realEndTime").val();
        var applyStartDate = $("#applyStartDate").val();
        var applyEndDate = $("#applyEndDate").val();

        if (personId != null && personId != "" && realStartDate != null && realStartDate != "" && realEndDate != null && realEndDate != "") {
            getWorkDays(personId, realStartDate, realEndDate, realStartTime, applyEndTime);
        } else {
            $("#realRestDays").val(0);
        }

        if (realStartDate != null && realStartDate != "" && realEndDate != null && realEndDate != "") {
            if (realStartDate > realEndDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                $("#realStartDate").val("");
                $("#realEndDate").val("");
                return;
            }
            if (realStartDate < applyStartDate) {
                pop_tip_open("red", "实际开始时间不能小于申请开始时间！");
                $("#realStartDate").val("");
                return;
            }

            if (realStartDate > applyEndDate) {
                pop_tip_open("red", "实际开始时间不能大于申请结束时间！");
                $("#realStartDate").val("");
                return;
            }

            if (realEndDate > applyEndDate) {
                pop_tip_open("red", "实际结束时间不能大于申请结束时间！");
                $("#realEndDate").val("");
                return;
            }
        }
    };
    window.getWorkDays = function (personId, realStartDate, realEndDate, realStartTime, applyEndTime) {
        var urlBody = "kq/hrKqSummary/queryWorkDays";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                "personId": personId,
                "startDate": realStartDate,
                "endDate": realEndDate,
                "applyStartTime": realStartTime,
                "applyEndTime": applyEndTime
            }),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    var resultList = result["list"];
                    var sum = result["sum"];
                    if (!contains(resultList, realStartDate)) {
                        pop_tip_open("red", "开始时间不是工作日，请重新选择!");
                        $("#realStartDate").val("");
                        $("#realRestDays").val(0);
                        return;
                    } else if (!contains(resultList, realEndDate)) {
                        pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                        $("#realEndDate").val("");
                        $("#realRestDays").val(0);
                        return;
                    } else {
                        var applyRestDays = result.length;
                        $("#realRestDays").val(sum);
                    }

                } else {
                    pop_tip_open("red", data.msg);
                    $("#realRestDays").val(0);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    };

    /**
     * 判断一个数是否包含在一个数组内
     */
    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    //字符串截取：yyyy-MM-dd hh:mm
    function dateFormatter(cellValue, options, rowObjec) {
        if (cellValue == null || cellValue == "") {
            return "";
        } else {
            return cellValue.substring(0, 16);
        }
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
    function updateRestApplyStatus(id) {
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
                    $('#listRest').jqGrid().trigger("reloadGrid");
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 更新年假天数(针对已休天数的增加和减少)
     * @param personId
     * @param floatDays
     * @param type
     *          add  已休天数的增加
     *          sub  已休天数的释放
     */
    function updatePersonAnnualInfo(personId, floatDays, type) {
        if (type === undefined || type === null || type === "") {
            pop_tip_open("销假失败！");
            return;
        }
        var annualYear = $("#annualYear").val();
        var flag = false;
        var urlBody = "kq/hrKqAnnual/updateForRest/" + personId;
        var urlAll = serviceUrl + urlBody;
        // annual_used_days      annualUsedDays
        $.ajax({
            type: 'PUT',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"floatDays": floatDays.toString(), "type": type, "annualYear": annualYear}),
            success: function (data) {
                if (data.success == true) {
                    flag = true;
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return flag;
    }

    window.ifAllDestroyChange = function () {
        var ifAllDestroy = $("#ifAllDestroy").val();
        if (ifAllDestroy !== null && ifAllDestroy !== undefined) {
            if (ifAllDestroy === "yes") {
                $(".realApplyInfo").hide();
            } else if (ifAllDestroy === "no") {
                $(".realApplyInfo").show();
            }
        }
    };
})(jQuery, window, document);