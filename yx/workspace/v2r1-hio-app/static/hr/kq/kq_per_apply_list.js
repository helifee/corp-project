;(function ($, window, document, undefined) {
	var focusId1; //请假聚焦Id
	var focusId2; //出差聚焦Id
	var focusId3; //公出聚焦Id
	
    $(function () {
        var msg = $.hrUtils.verifUserInfo();
        if (msg != null && msg.length > 0) {
            pop_tip_open("red", msg);
        } else {
            $("#personId").val("");
        }
        
        // 初始化列表
        pageInit();
        resizeGrid();
        
        //初始化日期控件
        initDatetimepicker();
    });

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    // 返回
    $('#backToSmmmery').click(function (e) {
        e.preventDefault();
        window.location.href = "kq_summary_accounts.html?status=01";
    });

    // 初始化考勤审批列表
    function pageInit() {
        kqRestApprovalList({"personId": "", "name": "---", "myApplyFlag": true});//请假
        kqBussApprovalList({"personId": "", "name": "---", "myApplyFlag": true});//出差
        kqNoSignApprovalList({"personId": "", "name": "---", "myApplyFlag": true});//未打卡
        kqLocalCityApprovalList({"personId": "", "name": "---", "myApplyFlag": true, "ifPublicType": "true"});//市内公出
    }

    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() / 2 - 100);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 32, true);
        $.xljUtils.gridResizeFn();
    }

    //grid 自适应宽度
    $(window).resize(function () {
        resizeGrid();
    });

    /**
     * 请假
     * @param postData
     */
    function kqRestApprovalList(postData) {
        var ubody = "kq/hrKqRest/queryApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridKqRest = $("#kqRestApplyList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: postData,
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false,
                    root: "result.list"
                },
                colModel: [
                    {name: 'id', label: "申请单id", hidden: true, align: "center"},
                    {name: 'companyId', label: "平台companyId", hidden: true, align: "center"},
                    {name: 'code', label: "申请单编码", width: 170, hidden: true, align: "center"},
                    {name: 'topicName', label: "主题", width: 220, align: "center"},
                    {name: 'approvalStatus', label: "审批状态", width: 80, hidden: true, align: "center"},
                    {name: 'approvalStatusValue', label: "审批状态", width: 80, align: "center"},
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {name: 'personId', label: "hr系统申请人id", hidden: true, width: 100, align: "center"},
                    {
                        name: 'restTypeName',
                        label: "请假类型",
                        width: 100,
                        align: "center"
                    },
                    {name: 'applyRestDays', label: "请假天数", width: 80, align: "center"},
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
                    {
                    	name: 'applyDate', 
                    	label: "申请日期",
                    	formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                    	width: 100, 
                    	align: "center"
                    },
                    {
                        name: 'destroyStatusValue',
                        label: "销假状态",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: destroyFormatter
                    }
                ],

                height: "100%",
                autowidth: true,
                shrinkToFit: true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                sortname: '',//初始化的时候排序的字段
                sortorder: "",//排序方式,可选desc,asc
                rowNum: -1,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    
                    //如果焦点id不为空
                    if (focusId1 != undefined && focusId1 != null) {
                        //闪亮聚焦
                        $("#kqRestApplyList").setSelection(focusId1);
                    }
                }
            });
    }

    /**
     * 出差
     * @param postData
     */
    function kqBussApprovalList(postData) {
        var ubody = "kq/hrKqBussTrip/queryApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = $("#kqBussApplyList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: postData,
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false,
                    root: "result.list"
                },
                colModel: [
                    {name: 'id', label: "申请单id", hidden: true, align: "center"},
                    {name: 'companyId', label: "companyId", hidden: true, align: "center"},
                    {name: 'code', label: "申请单编码", width: 220, hidden: true, align: "center"},
                    {name: 'topicName', label: "主题", width: 220, align: "center"},
                    {name: 'approvalStatus', label: "审批状态", width: 80, hidden: true, align: "center"},
                    {name: 'approvalStatusValue', label: "审批状态", width: 80, align: "center"},
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {name: 'personId', label: "hr系统申请人id", hidden: true, width: 100, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 80, align: "center"},
                    {name: 'location', label: "出发地点", width: 120, align: "center"},
                    {name: 'destination', label: "到达地点", width: 120, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 110,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 110,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                    	name: 'applyDate', 
                    	label: "申请日期",
                    	formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                    	width: 100, 
                    	align: "center"
                    },
                    {
                        name: 'destroyStatusValue',
                        label: "销出差状态",
                        width: 100,
                        align: "center",
                        formatter: destroyFormatter
                    }
                ],

                height: "100%",
                autowidth: true,
                shrinkToFit: true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                sortname: '',//初始化的时候排序的字段
                sortorder: "",//排序方式,可选desc,asc
                rowNum: -1,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                //pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                },
                loadError: function (xhr, status, error) {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();

                    //如果焦点id不为空
                    if (focusId2 != undefined && focusId2 != null) {
                        //闪亮聚焦
                        $("#kqBussApplyList").setSelection(focusId2);
                    }
                }
            });
    }

    /**
     * 市内公出
     * @param postData
     */
    function kqLocalCityApprovalList(postData) {
        var ubody = "kq/hrKqBussTrip/queryApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridKqBuss = $("#kqLocalCityApplyList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: postData,
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false,
                    root: "result.list"
                },
                colModel: [
                    {name: 'id', label: "申请单id", hidden: true, align: "center"},
                    {name: 'companyId', label: "companyId", hidden: true, align: "center"},
                    {name: 'code', label: "申请单编码", width: 220, hidden: true, align: "center"},
                    {name: 'topicName', label: "主题", width: 220, align: "center"},
                    {name: 'approvalStatus', label: "审批状态", width: 80, hidden: true, align: "center"},
                    {name: 'approvalStatusValue', label: "审批状态", width: 80, align: "center"},
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 80, align: "center"},
                    {name: 'location', label: "出发地点", width: 120, align: "center"},
                    {name: 'destination', label: "到达地点", width: 120, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 110,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 110,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                    	name: 'applyDate', 
                    	label: "申请日期",
                    	formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                    	width: 100, 
                    	align: "center"
                    },
                    {
                        name: 'destroyStatusValue',
                        label: "销公出状态",
                        width: 100,
                        align: "center",
                        formatter: destroyFormatter
                    }
                ],

                height: "100%",
                autowidth: true,
                shrinkToFit: true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                sortname: '',//初始化的时候排序的字段
                sortorder: "",//排序方式,可选desc,asc
                rowNum: -1,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                },
                loadError: function (xhr, status, error) {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();

                    //如果焦点id不为空
                    if (focusId3 != undefined && focusId3 != null) {
                        //闪亮聚焦
                        $("#kqLocalCityApplyList").setSelection(focusId3);
                    }
                }
            });
    }

    /**
     * 未打卡
     * @param postData
     */
    function kqNoSignApprovalList(postData) {
        var ubody = "kq/hrKqNotPunch/queryApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridKqNoPunch = $("#kqNoSignApplyList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: postData,
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false,
                    root: "result.list"
                },
                colModel: [
                    {name: 'id', label: "申请审批单id", width: 100, hidden: true},
                    {name: 'code', label: "申请单编码", width: 170, hidden: true, align: "center"},
                    {name: 'companyId', label: "companyId", width: 170, align: "center", hidden: true},
                    {name: 'topicName', label: "主题", width: 220, align: "center"},
                    {name: 'approvalStatus', label: "审批状态", width: 80, hidden: true, align: "center"},
                    {name: 'approvalStatusValue', label: "审批状态", width: 80, align: "center"},
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
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
                    {
                    	name: 'applyDate', 
                    	label: "申请日期",
                    	formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                    	width: 100, 
                    	align: "center"
                    }
                ],

                height: "100%",
                autowidth: true,
                shrinkToFit: true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                rowNum: -1,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                //pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: '',//初始化的时候排序的字段
                sortorder: "",//排序方式,可选desc,asc
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                },
                loadError: function (xhr, status, error) {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    }

    //查询条件
    window.kqApplyListQuery = function () {
        var name = $("#personName").val();
        var personId = $("#personId").val();


        if (name === undefined || name == null || name === "") {
            name = "---";//输入为空的时候不查询任何数据
        }
        var queryData = {
            "name": name,
            "personId": personId
        };
        $("#kqRestApplyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqBussApplyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqLocalCityApplyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqNoSignApplyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
    };

    //字符串截取：yyyy-MM-dd hh:mm
    function dateFormatter(cellValue, options, rowObject) {
        if (cellValue == null || cellValue === "") {
            return "";
        } else {
            return cellValue.substring(0, 16);
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

    //初始化日期控件
    window.initDatetimepicker = function () {
        var picker = $('.datetimepicker2').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };
    
    // 格式化日期yyyy-MM-dd
    window.formatDate = function(strTime){
    	var date = new Date(strTime);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    };
    
    // 计算时间差
    function getDateDiff(date1, date2) {
        var sArr = date1.split("-");
        var eArr = date2.split("-");
        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
        var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
        return Math.abs(result);
    }
    
    
    //****************************************************************************
    //===================销假申请 ===================
    $('#resumptionRest').click(function(){
    	$("#restApply1").show();
        showResLeaveMode();
    });
    window.showResLeaveMode = function () {
        var ids =  $("#kqRestApplyList").jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择一条记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var count = 0;
            var count2 = 0;
            for (i in ids) {
                var rowData = $("#kqRestApplyList").getRowData(ids[i]);
                if (rowData.approvalStatusValue != "已审批") {
                    count++;
                }

                if (rowData.destroyStatusValue == "已销" || rowData.destroyStatusValue == "无效") {
                    $("#rSave1").hide();
                }
                if (rowData.destroyStatusValue == "未销") {
                    $("#rSave1").show();
                }
            }
            if (count == 0) {
                var rowData1 =$("#kqRestApplyList").getRowData(ids[0]);
                getRestInfoByIdForRes(rowData1.id);
            } else {
                pop_tip_open("red", "审批通过才能销假，请重新选择！");
            }
        }
    };
    // 根据id查询请假记录信息
    window.getRestInfoByIdForRes = function (id) {
        $.ajax({
            url: hostUrl + "kq/hrKqRest/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"id": id}),
            success: function (data) {
                $("#realRestDays1").val("");
                $("#realStartDate1").val("");
                $("#realEndDate1").val("");
                $("#realStartTime1 option:first").prop("selected", 'selected');
                $("#realEndTime1 option:first").prop("selected", 'selected');
                if (data.success) {
                    var result = data.result.list;
                    $("#resumptionId1").val(result[0].id);
                    $("#rPersonId1").val(result[0].personId);
                    $("#rName1").val(result[0].personName);
                    $("#rType1").val(result[0].restType);
                    var destroyStatus = result[0].destroyStatus;
                    var rApplyRestDays = result[0].applyRestDays;
                    var rApplyStartDate = result[0].applyStartDate;
                    var rApplyEndDate = result[0].applyEndDate;
                    if (destroyStatus !== null && destroyStatus !== undefined && (destroyStatus === "1081100725")) {//销假状态：已销
                        $("#ifAllDestroy1 option[value='no']").attr("selected", true);
                        $("#ifAllDestroy1").val("no");
                        $("#ifAllDestroy1").change();
                        rApplyRestDays = result[0].applyRestDaysOld;
                        rApplyStartDate = result[0].applyStartDateOld;
                        rApplyEndDate = result[0].applyEndDateOld;
                        $("#realRestDays1").val(result[0].applyRestDays);
                        var realStartDate = result[0].applyStartDate;
                        var realEndDate = result[0].applyEndDate;
                        if (realStartDate !== null && realStartDate !== "") {
                            $("#realStartDate1").val(formatDate(new Date(realStartDate.replace(/-/g, '/'))));
                            $("#realStartTime1 option[value='" + realStartDate.substring(11, 16) + "']").attr("selected", true);
                        }

                        if (realEndDate !== null && realEndDate !== "") {
                            $("#realEndDate1").val(formatDate(new Date(realEndDate.replace(/-/g, '/'))));
                            $("#realEndTime1 option[value='" + realEndDate.substring(11, 16) + "']").attr("selected", true);
                        }
                        $("#ifAllDestroy1").attr("disabled", "disabled");
                        $(".realApplyInfo1").attr("disabled", "disabled");
                    } else if (destroyStatus === "1081100969") {//销假状态：无效（即全销）
                        $("#realApplyInfo1").removeAttr("disabled");
                        $("#ifAllDestroy1").removeAttr("disabled");
                        $("#realRestDays1").removeAttr("disabled");
                        $("#ifAllDestroy1 option[value='yes']").attr("selected", true);
                        $("#ifAllDestroy1").val("yes");
                        $("#ifAllDestroy1").change();
                        $("#ifAllDestroy1").attr("disabled", "disabled");
                        $("#realRestDays1").attr("disabled", "disabled");
                    } else {
                        $("#realApplyInfo1").removeAttr("disabled");
                        $("#ifAllDestroy1").removeAttr("disabled");
                        $("#realRestDays1").attr("disabled", "disabled");
                    }
                    $("#rTypeName1").val(result[0].restTypeName);
                    $("#rApplyRestDays1").val(rApplyRestDays);
                    $("#rApplyStartDate1").val(rApplyStartDate);
                    $("#rApplyEndDate1").val(rApplyEndDate);
                    $("#rApplyId1").val(result[0].id);

                    $("#treeModal1").modal('show');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };
    window.ifAllDestroyChange1 = function () {
        var ifAllDestroy = $("#ifAllDestroy1").val();
        if (ifAllDestroy !== null && ifAllDestroy !== undefined) {
            if (ifAllDestroy === "yes") {
                $(".realApplyInfo1").hide();
            } else if (ifAllDestroy === "no") {
                $(".realApplyInfo1").show();
            }
        }
    };
    window.calculateWorkDays = function () {
        var personId = $("#rPersonId1").val();
        var realStartDate = $("#realStartDate1").val();
        var realEndDate = $("#realEndDate1").val();
        var realStartTime = $("#realStartTime1").val();
        var applyEndTime = $("#realEndTime1").val();
        var applyStartDate = $("#applyStartDate1").val();
        var applyEndDate = $("#applyEndDate1").val();

        if (personId != null && personId != "" && realStartDate != null && realStartDate != "" && realEndDate != null && realEndDate != "") {
            getWorkDays(personId, realStartDate, realEndDate, realStartTime, applyEndTime);
        } else {
            $("#realRestDays1").val(0);
        }

        if (realStartDate != null && realStartDate != "" && realEndDate != null && realEndDate != "") {
            if (realStartDate > realEndDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                $("#realStartDate1").val("");
                $("#realEndDate1").val("");
                return;
            }
            if (realStartDate < applyStartDate) {
                pop_tip_open("red", "实际开始时间不能小于申请开始时间！");
                $("#realStartDate1").val("");
                return;
            }

            if (realStartDate > applyEndDate) {
                pop_tip_open("red", "实际开始时间不能大于申请结束时间！");
                $("#realStartDate1").val("");
                return;
            }

            if (realEndDate > applyEndDate) {
                pop_tip_open("red", "实际结束时间不能大于申请结束时间！");
                $("#realEndDate1").val("");
                return;
            }
        }
    };
    window.getWorkDays = function (personId, realStartDate, realEndDate, realStartTime, applyEndTime) {
        var urlBody = "kq/hrKqPbManage/queryWorkDays";
        var urlAll = hostUrl + urlBody;
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
                        $("#realStartDate1").val("");
                        $("#realRestDays1").val(0);
                        return;
                    } else if (!contains(resultList, realEndDate)) {
                        pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                        $("#realEndDate1").val("");
                        $("#realRestDays1").val(0);
                        return;
                    } else {
                        var applyRestDays = result.length;
                        $("#realRestDays1").val(sum);
                    }

                } else {
                    pop_tip_open("red", data.msg);
                    $("#realRestDays1").val(0);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    };
    /**
     * 销假
     */
    window.destroyRestUpdate1 = function () {
        var ids = jqGridKqRest.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择！");
            return;
        }
        if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
            return;
        }
        var rowData = $("#kqRestApplyList").getRowData(ids[0]);
        var personId = rowData.personId;
        var applyStartDate = rowData.applyStartDate;
        applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        var applyEndDate = rowData.applyEndDate;
        applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        var restTypeName = rowData.restTypeName;
        var applyRestDays = rowData.applyRestDays;
        var realRestDays = $("#realRestDays1").val();

        if (restTypeName === "年假") {//年假类型的申请，需要先释放年假天数
            if (!isNaN(applyStartDate) && !isNaN(applyEndDate)) {
                var start_year = parseInt(new Date(applyStartDate).getFullYear());
                var end_year = parseInt(new Date(applyEndDate).getFullYear());
                if (end_year !== start_year) {//跨年请假
                    pop_tip_open("red", "异常请假记录，不允许跨年申请年假！");
                    return;
                } else if (start_year === end_year) {
                    $("#annualYear1").val(start_year);
                }
            }
            var ifAllDestroy = $("#ifAllDestroy1").val();
            var days = 0;
            if (ifAllDestroy !== undefined && ifAllDestroy === "yes") {//全销
                days = parseFloat(applyRestDays);
            } else if (ifAllDestroy !== undefined && ifAllDestroy === "no") {//非全销
                days = parseFloat(applyRestDays) - parseFloat(realRestDays);
            }
            var flag = updatePersonAnnualInfo(personId, days, "sub");
            if (flag !== null && flag === true) {//执行成功
                updateApplyInfo1();
            }
        } else {
            updateApplyInfo1();
        }
    };
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
        var annualYear = $("#annualYear1").val();
        var flag = false;
        var urlBody = "kq/hrKqAnnual/updateForRest/" + personId;
        var urlAll = hostUrl + urlBody;
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
    /**
     * 更新请假信息：销假
     */
    window.updateApplyInfo1 = function () {
        var realRestDays = $("#realRestDays1").val();
        var rApplyRestDays = $("#rApplyRestDays1").val();
        var restApplyId = $("#resumptionId1").val();
        // var hrKqRestArr = $("#resumptionLeaveForm").serializeArray();
        var hrKqRestDto = {};
        var ifAllDestroy = $("#ifAllDestroy1").val();
        if (ifAllDestroy !== null && ifAllDestroy === "yes") {//全销
            $("#destroyStatus1").val("1081100969");
            hrKqRestDto.destroyStatus = '1081100969';//无效
        } else if (ifAllDestroy !== null && ifAllDestroy === "no") {//部分销假
            $("#destroyStatus1").val("1081100725");
            hrKqRestDto.destroyStatus = '1081100725';//已销

            var applyStartDate = $("#rApplyStartDate1").val();
            var applyEndDate = $("#rApplyEndDate1").val();
            var realEndDate = $("#realEndDate1").val();
            var realEndTime = $("#realEndTime1").val();
            var realStartDate = $("#realStartDate1").val();
            var realStartTime = $("#realStartTime1").val();
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

            if (hrKqRestDto.applyStartDate > hrKqRestDto.applyEndDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                return;
            }

            if (hrKqRestDto.applyStartDate < hrKqRestDto.applyStartDateOld) {
                pop_tip_open("red", "实际开始时间不能小于申请开始时间！");
                return;
            }

            if (hrKqRestDto.applyStartDate > hrKqRestDto.applyEndDateOld) {
                pop_tip_open("red", "实际开始时间不能大于申请结束时间！");
                return;
            }

            if (hrKqRestDto.applyEndDate > hrKqRestDto.applyEndDateOld) {
                pop_tip_open("red", "实际结束时间不能大于申请结束时间！");
                return;
            }
        }

        $.ajax({
            url: hostUrl + "kq/hrKqRest/update/" + restApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqRestDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "销假成功！");
                    $('#kqRestApplyList').jqGrid().trigger("reloadGrid");
                    focusId1 = restApplyId;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    
    //****************************************************************************
    //===================销出差申请 ===================
    $('#resumptionBuss').click(function(){
    	$("#bussApply2").show();
        showBussTripMode();
    });
    function showBussTripMode() {
        var ids = $("#kqBussApplyList").jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择一条记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var count = 0;
            for (i in ids) {
                var rowData = $("#kqBussApplyList").getRowData(ids[i]);
                if (rowData.approvalStatusValue != "已审批") {
                    count++;
                }

                if (rowData.destroyStatusValue == "已销" || rowData.destroyStatusValue == "无效") {
                    $("#rSave2").hide();
                }
                if (rowData.destroyStatusValue == "未销") {
                    $("#rSave2").show();
                }
            }
            if (count == 0) {
                var rowData1 =$("#kqBussApplyList").getRowData(ids[0]);
                getBussInfoByIdForRes(rowData1.id);
            } else {
                pop_tip_open("red", "审批通过才能销出差，请重新选择！");
            }
        }
    }
    /**
     * 根据id查询出差记录信息
     */
    function getBussInfoByIdForRes(id) {
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"id": id}),
            success: function (data) {
                $("#realTripDays2").val("");
                $("#realStartDate2").val("");
                $("#realEndDate2").val("");
                $("#realStartTime2 option:first").prop("selected", 'selected');
                $("#realEndTime2 option:first").prop("selected", 'selected');
                if (data.success) {
                    var result = data.result.list;
                    $("#resumptionId2").val(result[0].id);
                    $("#rPersonId2").val(result[0].personId);
                    $("#rName2").val(result[0].personName);
                    $("#rTripType2").val(result[0].tripType);
                    $("#tripTypeName2").val(result[0].tripTypeValue);
                    $("#rApplyId2").val(result[0].applyId);
                    var destroyStatus = result[0].destroyStatus;
                    $("#destroyStatus2").val(destroyStatus);
                    var rApplyTripDays = result[0].applyTripDays;
                    var rApplyStartDate = result[0].applyStartDate;
                    var rApplyEndDate = result[0].applyEndDate;
                    if (destroyStatus !== null && destroyStatus !== undefined && destroyStatus === "1081100725") {//销假状态：已销
                        $("#ifAllDestroy2 option[value='no']").attr("selected", true);
                        $("#ifAllDestroy2").val("no");
                        $("#ifAllDestroy2").change();
                        rApplyTripDays = result[0].applyTripDaysOld;
                        rApplyStartDate = result[0].applyStartDateOld;
                        rApplyEndDate = result[0].applyEndDateOld;
                        $("#realTripDays2").val(result[0].applyTripDays);
                        var realStartDate = result[0].applyStartDate;
                        var realEndDate = result[0].applyEndDate;
                        if (realStartDate !== null && realStartDate !== "") {
                            $("#realStartDate2").val(formatDate(new Date(realStartDate.replace(/-/g, '/'))));
                            $("#realStartTime2 option[value='" + realStartDate.substring(11, 16) + "']").attr("selected", true);
                        }

                        if (realEndDate !== null && realEndDate !== "") {
                            $("#realEndDate2").val(formatDate(new Date(realEndDate.replace(/-/g, '/'))));
                            $("#realEndTime2 option[value='" + realEndDate.substring(11, 16) + "']").attr("selected", true);
                        }
                        $("#ifAllDestroy2").attr("disabled", "disabled");
                        $(".realApplyInfo2").attr("disabled", "disabled");
                    } else if (destroyStatus === "1081100969") {//销假状态：无效（即全销）
                        $(".realApplyInfo2").removeAttr("disabled");
                        $("#ifAllDestroy2").removeAttr("disabled");
                        $("#realTripDays2").removeAttr("disabled");
                        $("#ifAllDestroy2 option[value='yes']").attr("selected", true);
                        $("#ifAllDestroy2").val("yes");
                        $("#ifAllDestroy2").change();
                        $("#ifAllDestroy2").attr("disabled", "disabled");
                        $("#realTripDays2").attr("disabled", "disabled");

                    } else {
                        $(".realApplyInfo2").removeAttr("disabled");
                        $("#ifAllDestroy2").removeAttr("disabled");
                        $("#realTripDays2").attr("disabled", "disabled");
                    }

                    $("#rApplyTripDays2").val(rApplyTripDays);
                    $("#rApplyStartDate2").val(rApplyStartDate);
                    $("#rApplyEndDate2").val(rApplyEndDate);
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
    window.updateApplyInfo2 = function() {
        var realTripDays = $("#realTripDays2").val();//实际出差天数
        var rApplyTripDays = $("#rApplyTripDays2").val();//申请。出差天数
        var bussApplyId = $("#resumptionId2").val();
        var hrKqBussTrip = {};
        var ifAllDestroy = $("#ifAllDestroy2").val();
        if (ifAllDestroy !== null && ifAllDestroy === "yes") {//全销
            $("#destroyStatus2").val("1081100969");
            hrKqBussTrip.destroyStatus = '1081100969';//无效
        } else {
            $("#destroyStatus2").val("1081100725");
            hrKqBussTrip.destroyStatus = '1081100725';//已销
            var realEndDate = $("#realEndDate2").val();
            var realEndTime = $("#realEndTime2").val();
            var realStartDate = $("#realStartDate2").val();
            var realStartTime = $("#realStartTime2").val();
            var applyStartDate = $("#rApplyStartDate2").val();
            var applyEndDate = $("#rApplyEndDate2").val();
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
            url: hostUrl + "kq/hrKqBussTrip/update/" + bussApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqBussTrip),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    $('#kqBussApplyList').jqGrid().trigger("reloadGrid");
                    focusId2 = bussApplyId;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }
    window.ifAllDestroyChange2 = function() {
        var ifAllDestroy = $("#ifAllDestroy2").val();
        if (ifAllDestroy !== null && ifAllDestroy !== undefined) {
            if (ifAllDestroy === "yes") {
                $(".realApplyInfo2").hide();
            } else if (ifAllDestroy === "no") {
                $(".realApplyInfo2").show();
            }
        }
    }
    window.calculateBussDays2 = function() {
        var realStartDate = $("#realStartDate2").val();
        var realEndDate = $("#realEndDate2").val();
        var realStartTime = $("#realStartTime2").val();
        var realEndTime = $("#realEndTime2").val();

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
        $("#realTripDays2").val(days);
    }
    
    
    //****************************************************************************
    //===================销公出申请 ===================
    $('#resumptionLocal').click(function(){
    	$("#bussApply3").show();
        showLocalTripMode();
    });
    function showLocalTripMode() {
        var ids = $("#kqLocalCityApplyList").jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择一条记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var count = 0;
            for (i in ids) {
                var rowData = $("#kqLocalCityApplyList").getRowData(ids[i]);
                if (rowData.approvalStatusValue != "已审批") {
                    count++;
                }

                if (rowData.destroyStatusValue == "已销" || rowData.destroyStatusValue == "无效") {
                    $("#rSave3").hide();
                }
                if (rowData.destroyStatusValue == "未销") {
                    $("#rSave3").show();
                }
            }
            if (count == 0) {
                var rowData1 =$("#kqLocalCityApplyList").getRowData(ids[0]);
                getLocalInfoByIdForRes(rowData1.id);
            } else {
                pop_tip_open("red", "审批通过才能销公出，请重新选择！");
            }
        }
    }
    /**
     * 根据id查询出差记录信息
     */
    function getLocalInfoByIdForRes(id) {
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"bussApplyId": id, "ifPublicType": "true"}),
            success: function (data) {
                $("#realTripDays3").val("");
                $("#realStartDate3").val("");
                $("#realEndDate3").val("");
                $("#realStartTime3 option:first").prop("selected", 'selected');
                $("#realEndTime3 option:first").prop("selected", 'selected');
                if (data.success) {
                    var result = data.result.list;
                    $("#resumptionId3").val(result[0].id);
                    $("#rPersonId3").val(result[0].personId);
                    $("#rName3").val(result[0].personName);
                    $("#rTripType3").val(result[0].tripType);
                    $("#tripTypeName3").val(result[0].tripTypeValue);
                    $("#rApplyId3").val(result[0].applyId);
                    var destroyStatus = result[0].destroyStatus;
                    $("#destroyStatus3").val(destroyStatus);
                    var rApplyTripDays = result[0].applyTripDays;
                    var rApplyStartDate = result[0].applyStartDate;
                    var rApplyEndDate = result[0].applyEndDate;
                    if (destroyStatus !== null && destroyStatus !== undefined && destroyStatus === "1081100725") {//销假状态：已销
                        $("#ifAllDestroy3 option[value='no']").attr("selected", true);
                        $("#ifAllDestroy3").val("no");
                        $("#ifAllDestroy3").change();
                        rApplyTripDays = result[0].applyTripDaysOld;
                        rApplyStartDate = result[0].applyStartDateOld;
                        rApplyEndDate = result[0].applyEndDateOld;
                        $("#realTripDays3").val(result[0].applyTripDays);
                        var realStartDate = result[0].applyStartDate;
                        var realEndDate = result[0].applyEndDate;
                        if (realStartDate !== null && realStartDate !== "") {
                            $("#realStartDate3").val(formatDate(new Date(realStartDate.replace(/-/g, '/'))));
                            $("#realStartTime3 option[value='" + realStartDate.substring(11, 16) + "']").attr("selected", true);
                        }

                        if (realEndDate !== null && realEndDate !== "") {
                            $("#realEndDate3").val(formatDate(new Date(realEndDate.replace(/-/g, '/'))));
                            $("#realEndTime3 option[value='" + realEndDate.substring(11, 16) + "']").attr("selected", true);
                        }
                        $("#ifAllDestroy3").attr("disabled", "disabled");
                        $(".realApplyInfo3").attr("disabled", "disabled");
                    } else if (destroyStatus === "1081100969") {//销假状态：无效（即全销）
                        $(".realApplyInfo3").removeAttr("disabled");
                        $("#ifAllDestroy3").removeAttr("disabled");
                        $("#realTripDays3").removeAttr("disabled");
                        $("#ifAllDestroy3 option[value='yes']").attr("selected", true);
                        $("#ifAllDestroy3").val("yes");
                        $("#ifAllDestroy3").change();
                        $("#ifAllDestroy3").attr("disabled", "disabled");
                        $("#realTripDays3").attr("disabled", "disabled");

                    } else {
                        $(".realApplyInfo3").removeAttr("disabled");
                        $("#ifAllDestroy3").removeAttr("disabled");
                        $("#realTripDays3").attr("disabled", "disabled");
                    }

                    $("#rApplyTripDays3").val(rApplyTripDays);
                    $("#rApplyStartDate3").val(rApplyStartDate);
                    $("#rApplyEndDate3").val(rApplyEndDate);
                    $("#treeModal3").modal('show');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
    window.ifAllDestroyChange3 = function() {
        var ifAllDestroy = $("#ifAllDestroy3").val();
        if (ifAllDestroy !== null && ifAllDestroy !== undefined) {
            if (ifAllDestroy === "yes") {
                $(".realApplyInfo3").hide();
            } else if (ifAllDestroy === "no") {
                $(".realApplyInfo3").show();
            }
        }
    }
    window.calculateBussDays3 = function() {
        var realStartDate = $("#realStartDate3").val();
        var realEndDate = $("#realEndDate3").val();
        var realStartTime = $("#realStartTime3").val();
        var realEndTime = $("#realEndTime3").val();

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
        $("#realTripDays3").val(days);
    }
    /**
     * 更新公出信息
     */
    window.updateApplyInfo3 = function() {
        var realTripDays = $("#realTripDays3").val();//实际出差天数
        var rApplyTripDays = $("#rApplyTripDays3").val();//申请。出差天数
        var bussApplyId = $("#resumptionId3").val();
        var hrKqBussTrip = {};
        var ifAllDestroy = $("#ifAllDestroy3").val();
        if (ifAllDestroy !== null && ifAllDestroy === "yes") {//全销
            $("#destroyStatus3").val("1081100969");
            hrKqBussTrip.destroyStatus = '1081100969';//无效
        } else {
            $("#destroyStatus3").val("1081100725");
            hrKqBussTrip.destroyStatus = '1081100725';//已销
            var realEndDate = $("#realEndDate3").val();
            var realEndTime = $("#realEndTime3").val();
            var realStartDate = $("#realStartDate3").val();
            var realStartTime = $("#realStartTime3").val();
            var applyStartDate = $("#rApplyStartDate3").val();
            var applyEndDate = $("#rApplyEndDate3").val();
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
            url: hostUrl + "kq/hrKqBussTrip/update/" + bussApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqBussTrip),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    $('#kqLocalCityApplyList').jqGrid().trigger("reloadGrid");
                    focusId3 = bussApplyId;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
    // END ****************************************************************************

})(jQuery, window, document);
