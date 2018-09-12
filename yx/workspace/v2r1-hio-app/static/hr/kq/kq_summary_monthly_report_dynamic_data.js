var absenceDate;//旷工详情（日期）
var absencePersonId;//旷工详情（人员id// ）
;(function ($, window, document, undefined) {
    var jqGridByDay;//日明细
    var jqGridByMonth;//月结果
    var daysInMonth;//选择的月份有多少天
    var nowKqMonth;//当前考勤期间
    $(function () {
        resizeHeight();
        //默认查询在职人员
        var personStatusName = codeFormatter("1143100260");
        $("#personStatusName").val(personStatusName);
        $("#personStatus").val("1143100260");
        $("#personStatusName2").val(personStatusName);
        $("#personStatus2").val("1143100260");
        // nowKqMonth = $.xljUtils.getUrlParam("nowKqMonth");
        queryWagePeriod();

        pageInit();
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
        resizeGrid();

    });


    $('.btn').click(function (e) {
        e.preventDefault();
    });

    $("#exportBtnDay").on('click', function () {
        exportBtnDay();
    });
    $("#exportBtnMonth").on('click', function () {
        exportBtnMonth();
    });
    $("#closeWindow").click(function () {
        window.history.go(-1);
    })

    function pageInit() {
        // daysInit();
        // daysInitByMonth();
        initDatetimepicker();
        var orgId = $("#orgId").val();
        var status = $("#personStatus").val();
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();

        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var queryData = {
            "orgIdList": orgIdsList,
            "date": nowKqMonth,
            "status": status,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate
        };

        resultByMonthInit(queryData);
        resultByDayInit(queryData);
        bussList({"date": "true"});
        cityBussList({"date": "true"});
        kqLateList({"date": "true"});
        kqLeaveEarlyList({"date": "true"});
        kqAbsenceList({"date": "true"});
        kqNoSignList({"date": "true"});
        kqAnnualLeaveList();
        kqAbsenceLeaveList();
        kqSickLeaveList();
        kqMaritalLeaveList();
        kqMaternityLeaveList();
        kqPaidLeaveList();
        kqOtherLeaveList();

        kqRestInApprovalList({"personId": "---", "status": $.hrUtils.APPLY_ING});//请假审批中
        kqBussInApprovalList({"personId": "---", "status": $.hrUtils.APPLY_ING});//出差审批中
        kqNoSignInApprovalList({"personId": "---", "status": $.hrUtils.APPLY_ING});//未打卡审批中
        kqBussPublicInApprovalList({"personId": "---", "status": $.hrUtils.APPLY_ING});//市内公出审批中
        // kqNoSignList({"startDate": nowKqStartDate, "endDate": nowKqEndDate, "personId": "---"});//漏打卡天数
    }

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 180) + "px");
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
     * 样式格式化
     * @param rowId
     * @param val
     * @param rowObject
     * @param cm
     * @param rdata
     * @returns {String}
     */
    function addCellAttr(rowId, val, rowObject, cm, rdata) {
        var name = cm.name.substring(0, 3);
        var days = parseInt(cm.name.substring(3, 5));
        if (days >= 1 && days <= 9) {
            name = name + "0" + days;
        } else if (days > 9) {
            name = name + days;
        }
        var type = name + "kqType";
        var jsonData = JSON.stringify(rowObject);
        var data = eval('(' + jsonData + ')');
        var typeValue = data[type];//考勤类型

        if (typeValue == "1118100219") {//异常
            return "style='background-color:#F24848'";
        } else if (typeValue == "1118100220") {//请假
            return "style='background-color:yellow'";
        } else if (typeValue == "1118100221") {//出差
            return "style='background-color:orange'";
        } else if (typeValue == "1118100222") {//未打卡
            return "style='background-color:cornflowerblue'";
        } else if (typeValue == "1118100753") {//市内公出
            return "style='background-color:#23ff2a'";
        } else if (typeValue == "1118100223") {//流程未结束
            return "style='background-color:rgba(17, 211, 171, 0.69);";
        }
    }

    /**
     * 页签切换：按考勤日明细  考勤月结果
     */
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('byuser') > 0) {
            $("#colorDiv").css("visibility", "visible");
            $("#dayDiv").css("display", "block");//按考勤日明细的display属性设置为block（显示）
            $("#monthDiv").css("display", "none");//按考勤月结果的display属性设置为none（隐藏）
            $.xljUtils.removeGridScroll("tableMonth");
            // $.xljUtils.addGridScroll();
            // $.xljUtils.gridResizeFn();
        } else {
            $("#colorDiv").css("visibility", "hidden");
            $("#dayDiv").css("display", "none");//按考勤日明细的display属性设置为none（隐藏）
            $("#monthDiv").css("display", "block");//按考勤月结果的display属性设置为block（显示）
            // $.xljUtils.removeGridScroll("tableDay");
            $.xljUtils.addGridScroll("tableMonth");
            // $.xljUtils.gridResizeFn();
            $("body").find($(".tableMonth")).getNiceScroll().show().resize();
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });


    /**
     * 按人员排班查询人员
     */
    window.queryPersonByType = function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = zTree.getSelectedNodes();
        var id = nodes[0].id;
        var queryType = $("#queryType").val();
        var personName = $("#personName").val();
        var queryPersonData = {
            "queryType": queryType,
            "orgId": id,
            "personName": personName
        };
        jQuery("#listGroupByPerson").jqGrid("setGridParam", {postData: queryPersonData}).trigger("reloadGrid");

    };

    /**
     * 考勤统计：日明细
     * */
    window.resultByDayInit = function (postData) {
        //加载动态列
        var jqdata = [
            {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
            {name: 'postName', label: "职务", width: 150, align: "center", frozen: true},
            {name: 'name', label: "姓名", width: 150, align: "center", frozen: true},
            {name: 'planName', label: "所属考勤规则", width: 150, align: "center", frozen: true},
            {name: 'month', label: "月份", width: 150, align: "center"},
            {name: 'pinyin', label: "拼音", width: 150, hidden: true, align: "center"},
            {name: 'account', label: "账号", width: 150, align: "center"},
            {name: 'phone', label: "手机号", width: 150, align: "center"},
            // {name: 'personCode', label: "人员编号", width: 150, align: "center", frozen: true},
            {name: 'planId', label: "所属考勤规则", width: 150, hidden: true, align: "center"},

        ];
        var month1 = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var nowKqStart_date = new Date(nowKqStartDate);
        var nowKqEnd_date = new Date(nowKqEndDate);
        // var daysInMonth =  $.kqUtils.getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
        while (nowKqStart_date <= nowKqEnd_date) {
            var j = nowKqStart_date.getDate();
            var month = nowKqStart_date.getMonth() + 1;
            if (j >= 1 && j <= 9) {
                j = "0" + j;
            }
            var name = "day" + j;
            var newDate = month + "-" + j;
            var dayOfWeek = new Date(newDate.replace(/-/g, '/')).getDay();
            if (dayOfWeek == 0) {
                dayOfWeek = "日";
            } else if (dayOfWeek == 1) {
                dayOfWeek = "一";
            } else if (dayOfWeek == 2) {
                dayOfWeek = "二";
            } else if (dayOfWeek == 3) {
                dayOfWeek = "三";
            } else if (dayOfWeek == 4) {
                dayOfWeek = "四";
            } else if (dayOfWeek == 5) {
                dayOfWeek = "五";
            } else if (dayOfWeek == 6) {
                dayOfWeek = "六";
            }
            var label = month + "." + j + "(星期" + dayOfWeek + ")";
            var data = {name: name, label: label, width: 150, align: "center", cellattr: addCellAttr};
            jqdata.push(data);
            nowKqStart_date = new Date(nowKqStart_date.getFullYear(), nowKqStart_date.getMonth(), nowKqStart_date.getDate() + 1);
        }
        var model = [];
        for (var i = 0; i < jqdata.length; i++) {
            model.push({
                name: jqdata[i].name,
                label: jqdata[i].label,
                width: jqdata[i].width,
                align: jqdata[i].align,
                cellattr: jqdata[i].cellattr,
                formatter: jqdata[i].formatter,
                frozen: jqdata[i].frozen,
                hidden: jqdata[i].hidden
            });
        }


        var ubody = "kq/hrKqSummary/queryKqResultListByDay";
        var uall = hostUrl + ubody;
        var jgGridResultData;//查询结果
        //卸载jqGrid组件
        jQuery('#listResultByDay').GridUnload();
        //创建jqGrid组件
        jqGridByDay = jQuery("#listResultByDay").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                // datatype: "local",
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",

                jsonReader: {
                    root: "result"
                    // repeatitems: false
                },
                autowidth: true,
                shrinkToFit: false,
                rownumbers: true,
                colModel: model,
                height: $(window).height() - 200,

                rowNum: -1,//一页显示多少条
                // rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                // page: 1,
                viewrecords: true, //定义是否要显示总记录数
                // sortname: 'id',//初始化的时候排序的字段
                // sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    $.xljUtils.setFrozenColumnStyle(40);
                },
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "服务器异常，请联系管理员");
                },
                gridComplete: function () {
                    // resizeGrid();
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    $("#listResultByDay").jqGrid('setFrozenColumns');
                }
            });

    };

    window.emptyCodeInfo = function (codeName, codeId) {
        $("#" + codeName).val("");
        $("#" + codeId).val("");
    };
    window.onchangeKqSummary = function () {
        var name = $("#name").val();
        var orgId = $("#orgId").val();
        var month = $("#nowKqMonth").val();
        var status = $("#personStatus").val();
        var queryDataByDay = {
            "orgId": orgId,
            "name": name,
            "date": month,
            "status": status
        };
        daysInit();
        resultByDayInit(queryDataByDay);
        queryConditionList();
    };

    window.onchangeKqSummaryByMonth = function () {
        var orgId = $("#orgId").val();
        var date = $("#nowKqMonth").val();
        var name = $("#name2").val();
        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var queryDataByMonth = {
            "orgIdList": orgIdsList,
            "name": name,
            "date": date
        };
        daysInitByMonth();
        jQuery("#listResultByMonth").jqGrid("setGridParam", {
            postData: queryDataByMonth,
            page: 1
        }).trigger("reloadGrid");
    };


    function orgFormatter(cellValue, options, rowObject) {
        var orgName = $.hrUtils.getHROrgNameById(cellValue);
        if (orgName != null) {
            return orgName;
        } else {
            return "";
        }
    }

    function postFormatter(cellValue, options, rowObject) {
        var postName = $.hrUtils.getHRPostNameById(cellValue);
        if (postName != null) {
            return postName;
        } else {
            return "";
        }
    }


    window.initDatetimepicker = function () {
        var picker = $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });
    };

    /**
     * 考勤统计：月结果
     * */
    window.resultByMonthInit = function (postData) {
        // var date = $("#nowKqMonth").val();
        var ubody = "kq/hrKqSummary/queryKqResultListByMonth";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#listResultByMonth").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                // datatype: "local",
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                    // repeatitems: false
                },
                autowidth: true,
                shrinkToFit: false,
                rownumbers: true,
                colModel: [
                    {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
                    {name: 'postName', label: "职务", width: 150, align: "center", frozen: true},
                    {name: 'personName', label: "姓名", width: 100, align: "center", frozen: true},
                    {name: 'date', label: "月份", width: 100, align: "center"},
                    {name: 'phone', label: "手机号", width: 150, align: "center"},
                    // {name: 'personCode', label: "人员编号", width: 100, align: "center"},
                    {name: 'planId', label: "所属考勤规则", width: 150, hidden: true, align: "center"},
                    {name: 'planName', label: "所属考勤规则", width: 150, align: "center"},
                    {name: 'shouldAttendanceDays', label: "应出勤时长(天)", width: 80, align: "center"},
                    {name: 'realAttendanceDays', label: "实出勤时长(天)", width: 80, sortable: false, align: "center"},
                    // {name: 'lateBuffer', label: "迟到的天数", width: 80, hidden: true, align: "center"},
                    // {name: 'leaveEarlyBuffer', label: "早退的天数", width: 80, hidden: true, align: "center"},
                    {
                        name: 'bussTripDays',
                        label: "出差天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: bussFormatter
                    },
                    {
                        name: 'bussTripOfCityDays',
                        label: "市内公出天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: cityBussFormatter
                    },
                    {
                        name: 'lateDays',
                        label: "迟到次数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqLateFormatter
                    },
                    {
                        name: 'leaveEarlyDays',
                        label: "早退次数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqLeaveEarlyFormatter
                    },
                    {
                        name: 'absenteeismDays',
                        label: "旷工天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAbsenceFormatter
                    },
                    {
                        name: 'noSignDays',
                        label: "漏打卡天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqNoSignFormatter
                    },
                    {
                        name: 'restInApprovalDays',
                        label: "请假审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqRestInApprovalFormatter
                    },
                    {
                        name: 'bussInApprovalDays',
                        label: "出差审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqBussInApprovalFormatter
                    },
                    {
                        name: 'noPunchInApprovalDays',
                        label: "未打卡审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqNoSignInApprovalFormatter
                    },
                    {
                        name: 'inCityBussInApprovalDays',
                        label: "市内公出审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqBussPublicInApprovalFormatter
                    },
                    {name: 'details', label: "旷工与迟到早退详情", width: 250, sortable: false, align: "center"},
                    {
                        name: 'annualLeave',
                        label: "年假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAnnualLeaveFormatter
                    },
                    {
                        name: 'absenceLeave',
                        label: "事假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAbsenceLeaveFormatter
                    },
                    {
                        name: 'sickLeave',
                        label: "病假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqSickLeaveFormatter
                    },
                    {
                        name: 'maritalLeave',
                        label: "婚假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqMaritalLeaveFormatter
                    },
                    {
                        name: 'maternityLeave',
                        label: "产假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqMaternityLeaveFormatter
                    },
                    // {name: 'replenishSignDays', label: "补签天数", width: 80, sortable: false, align: "center"},
                    {
                        name: 'paidLeaveDays',
                        label: "带薪假天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqPaidLeaveFormatter
                    },
                    {
                        name: 'otherLeaveDays',
                        label: "其他请假天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqOtherLeaveFormatter
                    },
                    {name: 'leaveDetail', label: "请假详情", width: 150, sortable: false, align: "center"}
                ],
                height: $(window).height() - 150,
                rowNum: -1,//一页显示多少条 -1全部
                // rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager3',//表格页脚的占位符(一般是div)的id
                // page: 1,
                // sortname: "id",//初始化的时候排序的字段
                // sortorder: "desc",//排序方式,可选desc,asc
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
/*                    // 冻结列样式begin
                    var space = 0; // 浏览器差异高度(opera默认使用0就可以)
                    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
                    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
                    var isEdge = userAgent.indexOf("Windows NT 6.1;") > -1 && userAgent.indexOf("Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
                    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
                    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
                    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
                    if (isIE) {// 判断是否IE浏览器
                        space = -0.2;
                    } else if (isFF) {// 检测是否是Firefox浏览器
                        space = 0.5;
                    } else if (isOpera) {// 检测是否是Opera浏览器
                        space = 0;
                    } else if (isSafari) { // 检测是否是苹果的Safari浏览器
                        space = 0.6;
                    } else if (isChrome) {// 检测是否是chrome浏览器
                        space = -9;
                    } else if (isEdge) {// 判断是否IE的Edge浏览器
                        space = -0.2;
                    }
                    var bdiv_height = $(".ui-jqgrid-bdiv").height() + space;
                    $('.frozen-div').find('tr').attr('style', 'background-color:#ABD6FE');
                    $('.frozen-div').attr("style", "position:absolute; left:0px; top:0px; height:40px");
                    $('.frozen-bdiv').attr("style", "position:absolute; left:0px; top:40px; overflow-y:hidden; height:" + bdiv_height + "px !important;");
                    // 冻结列样式end*/
                    $.xljUtils.setFrozenColumnStyle(40);


                },
                gridComplete: function () {
                    //冻结列
                    // $("#listResultByMonth").jqGrid('setFrozenColumns');

                    $("table#listResultByMonth").jqGrid().setGridHeight($('.mytable').height() - 70);
                    $.xljUtils.addGridScroll("tableMonth");
                    // $.xljUtils.gridResizeFn();
                    $("body").find($(".tableMonth")).getNiceScroll().show().resize();

                }
            });


    };

    /**
     * 考勤统计：月结果出差详细信息
     * */
    window.bussList = function (postData) {
        var ubody = "kq/hrKqSummary/queryBussDetail";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#bussList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    // {name: 'personId', label: "申请人", width: 100, align: "center", sortable: false},
                    {name: 'personName', label: "申请人", width: 100, align: "center", sortable: false},
                    // {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'location', label: "出发地点", width: 100, sortable: false, align: "center"},
                    {name: 'destination', label: "到达地点", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {name: 'statusValue', label: "审批状态", width: 100, align: "center"},
                    {name: 'destroyStatusValue', label: "销出差状态", width: 100, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#bussList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：市内公出详情
     * @param postData
     */
    window.cityBussList = function (postData) {
        var ubody = "kq/hrKqSummary/queryCityBussDetail";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#cityBussList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    // {name: 'personId', label: "申请人", width: 100, align: "center", sortable: false},
                    {name: 'personName', label: "申请人", width: 100, align: "center", sortable: false},
                    // {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'location', label: "出发地点", width: 100, sortable: false, align: "center"},
                    {name: 'destination', label: "到达地点", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {name: 'statusValue', label: "审批状态", width: 100, align: "center"},
                    {name: 'destroyStatusValue', label: "销出差状态", width: 100, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#cityBussList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：迟到详情
     * @param postData
     */
    window.kqLateList = function (postData) {
        var ubody = "kq/hrKqSummary/queryKqLateDetail";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqLateList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqLateList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：早退详情
     * @param postData
     */
    window.kqLeaveEarlyList = function (postData) {
        var ubody = "kq/hrKqSummary/queryKqLeaveEarlyDetail";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqLeaveEarlyList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqLeaveEarlyList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：旷工详情
     * @param postData
     */
    window.kqAbsenceList = function (postData) {
        var ubody = "kq/hrKqSummary/queryAbsenceDetail";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAbsenceList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    }
                ],

                // width: $('.mytable').width() - 150,
                height: $('.mytable').height() - 70,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：漏打卡天数
     * @param postData
     */
    window.kqNoSignList = function (postData) {
        //未打卡详情（无请假、出差、未打卡，包括审批中和已审批）
        // var ubody = "kq/hrKqSummary/queryNoSignDetail";
        var ubody = "kq/hrKqSummary/queryUnusualDaysInfo";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqNoSignList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'plan_name', label: "考勤方案", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqNoSignList").jqGrid('setSelection', result[0].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：请假审批中
     * @param postData
     */
    window.kqRestInApprovalList = function (postData) {
        var ubody = "kq/hrKqRest/queryInApprovalApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqRestInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "请假开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "请假结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {name: 'approvalStatusValue', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：出差审批中
     * @param postData
     */
    window.kqBussInApprovalList = function (postData) {
        var ubody = "kq/hrKqBussTrip/queryInApprovalApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqBussInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {
                        name: 'applyStartDate',
                        label: "出差开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "出差结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'approvalStatusValue', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "出差事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：未打卡审批中
     * @param postData
     */
    window.kqNoSignInApprovalList = function (postData) {
        var ubody = "kq/hrKqNotPunch/queryInApprovalApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqNoSignInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    // {name: 'shiftName', label: "班次", width: 100, sortable: false, align: "center"},
                    {name: 'notPunchDate2', label: "未打卡日期", width: 100, sortable: false, align: "center"},
                    {name: 'signTypeValue', label: "补卡类型", width: 100, sortable: false, align: "center"},
                    {name: 'approvalStatusValue', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "未打卡事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：市内公出审批中
     * @param postData
     */
    window.kqBussPublicInApprovalList = function (postData) {
        var ubody = "kq/hrKqBussTrip/queryInApprovalApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqBussPublicInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {
                        name: 'applyStartDate',
                        label: "出差开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "出差结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'approvalStatusValue', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "出差事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：年假详情
     * @param postData
     */
    window.kqAnnualLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAnnualLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqAnnualLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    /**
     * 考勤统计：事假详情
     * @param postData
     */
    window.kqAbsenceLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAbsenceLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'destroyStatusValue', label: "销假状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqAbsenceLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：病假详情
     * @param postData
     */
    window.kqSickLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqSickLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqSickLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    /**
     * 考勤统计：婚假详情
     * @param postData
     */
    window.kqMaritalLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqMaritalLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqMaritalLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：产假详情
     * @param postData
     */
    window.kqMaternityLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqMaternityLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqMaternityLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：带薪假详情
     * @param postData
     */
    window.kqPaidLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqPaidLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                // autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqPaidLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：其他假期详情
     * @param postData
     */
    window.kqOtherLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqOtherLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                // autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqOtherLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    window.daysInitByMonth = function () {
        var month2 = $("#nowKqMonth").val();
        if (month2 == null || month2 == "") {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month < 10) {
                month = "0" + month;
            }
            month2 = date.getFullYear() + "-" + month;
            $("#nowKqMonth").val(month2);
        }
        // daysInMonth =  $.kqUtils.getDaysInMonth(month2.substring(0, 4), month2.substring(5, 7));
    };


    function codeFormatter(cellValue, options, rowObject) {
        // var codeName = $.hrUtils.getHRCodeNameById(cellValue);
        var codeName = cellValue;
        if (codeName != null) {
            return codeName;
        } else {
            return "";
        }
    }


    //出差详情页面
    window.showBussModal = function (date, personId) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "status": $.hrUtils.APPLY_PASS
        };
        jQuery("#bussList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");

        // bussList({"date": date, "personId": personId});
        $("#bussModal").modal('show');
        $("#jqGridId").val("bussList");
        $("#modalId").val("bussModal");
    };

    //市内公出详情页面
    window.showCityBussModal = function (date, personId) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "status": $.hrUtils.APPLY_PASS,
            "ifPublicType": "true"
        };
        jQuery("#cityBussList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");

        // bussList({"date": date, "personId": personId});
        $("#cityCussModal").modal('show');
        $("#jqGridId").val("cityBussList");
        $("#modalId").val("cityCussModal");
    };

    //迟到详情
    window.showKqLateModal = function (date, personId, late) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "late": late
        };
        jQuery("#kqLateList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqLateModal").modal('show');
        $("#jqGridId").val("kqLateList");
        $("#modalId").val("kqLateModal");
    };

    //早退详情
    window.showKqLeaveEarlyModal = function (date, personId, leaveEarly) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "leaveEarly": leaveEarly
        };
        jQuery("#kqLeaveEarlyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqLeaveEarlyModal").modal('show');
        $("#jqGridId").val("kqLeaveEarlyList");
        $("#modalId").val("kqLeaveEarlyModal");
    };

    //旷工详情
    window.showKqAbsenceModal = function (date, personId, absence) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            // "type": "absence"
            "absence": absence
        };
        jQuery("#kqAbsenceList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        // jQuery("#kqRestInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "restInApproval"
        //     }
        // }).trigger("reloadGrid");
        // jQuery("#kqBussInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "bussInApproval"
        //     }
        // }).trigger("reloadGrid");
        // jQuery("#kqNoSignInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "noSignInApproval"
        //     }
        // }).trigger("reloadGrid");
        $("#kqAbsenceModal").modal('show');
        $("#jqGridId").val("kqAbsenceModal");
        $("#modalId").val("kqLeaveEarlyModal");
    };

    //旷工详情
    window.showKqAbsence = function (date, personId) {
        absenceDate = date;
        absencePersonId = personId;
        window.open("kq_summary_absence_list.html");
    };

    //未打卡详情
    window.showKqNoSignModal = function (date, personId) {
        var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId
        };
        jQuery("#kqNoSignList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqNoSignModal").modal('show');
        $("#jqGridId").val("kqNoSignList");
        $("#modalId").val("kqNoSignModal");
    };

    //年假详情
    window.showKqAnnualLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "annualLeave"
        };
        jQuery("#kqAnnualLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqAnnualLeaveModal").modal('show');
        $("#jqGridId").val("kqAnnualLeaveList");
        $("#modalId").val("kqAnnualLeaveModal");
    };

    //事假详情
    window.showKqAbsenceLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "absenceLeave"
        };
        jQuery("#kqAbsenceLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqAbsenceLeaveModal").modal('show');
        $("#jqGridId").val("kqAbsenceLeaveList");
        $("#modalId").val("kqAbsenceLeaveModal");
    };

    //病假详情
    window.showKqSickLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "sickLeave"
        };
        jQuery("#kqSickLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqSickLeaveModal").modal('show');
        $("#jqGridId").val("kqSickLeaveList");
        $("#modalId").val("kqSickLeaveModal");
    };

    //婚假详情
    window.showKqMaritalLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "maritalLeave"
        };
        jQuery("#kqMaritalLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqMaritalLeaveModal").modal('show');
        $("#jqGridId").val("kqMaritalLeaveList");
        $("#modalId").val("kqMaritalLeaveModal");
    };

    //产假详情
    window.showKqMaternityLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "maternityLeave"
        };
        jQuery("#kqMaternityLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqMaternityLeaveModal").modal('show');
        $("#jqGridId").val("kqMaternityLeaveList");
        $("#modalId").val("kqMaternityLeaveModal");
    };

    //带薪假详情
    window.showKqPaidLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "paidLeave"
        };
        jQuery("#kqPaidLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqPaidLeaveModal").modal('show');
        $("#jqGridId").val("kqPaidLeaveList");
        $("#modalId").val("kqPaidLeaveModal");
    };

    //其他假期详情
    window.showKqOtherLeaveModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "personId": personId,
            "restType": "otherLeave"
        };
        jQuery("#kqOtherLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqOtherLeaveModal").modal('show');
        $("#jqGridId").val("kqOtherLeaveList");
        $("#modalId").val("kqOtherLeaveModal");
    };

    //请假审批中详情
    window.showKqRestInApprovalModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "status": $.hrUtils.APPLY_ING,
            "personId": personId
        };
        jQuery("#kqRestInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqRestInApprovalModal").modal('show');
        $("#jqGridId").val("kqRestInApprovalList");
        $("#modalId").val("kqRestInApprovalModal");
    };

    //出差审批中详情
    window.showKqBussInApprovalListModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "status": $.hrUtils.APPLY_ING,
            "personId": personId
        };
        jQuery("#kqBussInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqBussInApprovalModal").modal('show');
        $("#jqGridId").val("kqBussInApprovalList");
        $("#modalId").val("kqBussInApprovalModal");
    };

    //未打卡审批中
    window.showKqNoSignInApprovalListModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "status": $.hrUtils.APPLY_ING,
            "personId": personId
        };
        jQuery("#kqNoSignInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqNoSignInApprovalModal").modal('show');
        $("#jqGridId").val("kqNoSignInApprovalList");
        $("#modalId").val("kqNoSignInApprovalModal");
    };
    //市内公出审批中
    window.showKqBussPublicInApprovalListModal = function (date, personId) {
        // var nowKqMonth = $("#nowKqMonth").val();
        var nowKqStartDate = $("#nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var queryData = {
            // "date": nowKqMonth,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "status": $.hrUtils.APPLY_ING,
            "personId": personId,
            "ifPublicType": "true"
        };
        jQuery("#kqBussPublicInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqBussPublicInApprovalModal ").modal('show');
        $("#jqGridId").val("kqBussPublicInApprovalList");
        $("#modalId").val("kqBussPublicInApprovalModal");
    };

    //出差
    function bussFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showBussModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //市内公出
    function cityBussFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showCityBussModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //迟到
    function kqLateFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var lateBuffer = rowObject.lateBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqLateModal(\'' + date + '\',\'' + personId + '\',\'' + lateBuffer + '\')">' + cellValue + '</a>';
        return result;
    }

    //早退
    function kqLeaveEarlyFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var leaveEarlyBuffer = rowObject.leaveEarlyBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqLeaveEarlyModal(\'' + date + '\',\'' + personId + '\',\'' + leaveEarlyBuffer + '\')">' + cellValue + '</a>';
        return result;
    }

    //旷工
    function kqAbsenceFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var absence = rowObject.absenteeismBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAbsenceModal(\'' + date + '\',\'' + personId + '\',\'' + absence + '\')">' + cellValue + '</a>';
        return result;
    }

    //漏打卡：有一次漏打卡就是旷工
    function kqNoSignFormatter(cellValue, options, rowObject) {
        // var date = rowObject.date;
        // var personId = rowObject.personId;
        // var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqNoSignModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        // return result;
        var date = rowObject.date;
        var personId = rowObject.personId;
        var absence = rowObject.absenteeismBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAbsenceModal(\'' + date + '\',\'' + personId + '\',\'' + absence + '\')">' + cellValue + '</a>';
        return result;
    }

    //年假
    function kqAnnualLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAnnualLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //事假
    function kqAbsenceLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAbsenceLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //病假
    function kqSickLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref"  style="color: #0000FF" onclick="showKqSickLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //婚假
    function kqMaritalLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqMaritalLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //产假
    function kqMaternityLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqMaternityLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //带薪假
    function kqPaidLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqPaidLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //其他假期
    function kqOtherLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqOtherLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //请假审批中
    function kqRestInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqRestInApprovalModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //出差审批中
    function kqBussInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqBussInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //未打卡审批中
    function kqNoSignInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqNoSignInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //市内公出审批中
    function kqBussPublicInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqBussPublicInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }


    /**
     * 条件查询
     */
    window.queryConditionList = function () {
        var name = $("#name").val();
        var month = $("#nowKqMonth").val();
        var orgId = $("#orgId").val();
        var status = $("#personStatus").val();
        var nowKqStartDate = $("nowKqStartDate").val();
        var nowKqEndDate = $("#nowKqEndDate").val();
        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var queryDataByDay = {
            "orgIdList": orgIdsList,
            "name": name,
            "date": month,
            "status": status,
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate
        };
        $('#listResultByDay').jqGrid('destroyFrozenColumns');
        jQuery("#listResultByDay").jqGrid("setGridParam", {postData: queryDataByDay}).trigger("reloadGrid");
    };

    $("#name").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            queryConditionList();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });


    window.queryConditionList2 = function () {
        var name = $("#name2").val();
        var month = $("#nowKqMonth").val();
        var orgId = $("#orgId").val();
        var status = $("#personStatus2").val();
        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var queryDataByMonth = {
            "orgIdList": orgIdsList,
            "name": name,
            "date": month,
            "status": status
        };
        $('#listResultByMonth').jqGrid('destroyFrozenColumns');
        jQuery("#listResultByMonth").jqGrid("setGridParam", {postData: queryDataByMonth}).trigger("reloadGrid");
    };

    $("#name2").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            queryConditionList2();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });

    /**
     *  考勤日统计：导出Excel
     */
    window.exportBtnDay = function () {
        //表格数据
        var colNames = $("#listResultByDay").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listResultByDay").jqGrid('getGridParam', 'colModel');
        rowData = $('#listResultByDay').jqGrid('getRowData');
        // for (var i = 0; i < rowData.length; i++) {
        //     var applyStartDate = rowData[i].applyStartDate;
        //     var applyEndDate = rowData[i].applyEndDate;
        //     rowData[i].applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        //     rowData[i].applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        // }
        var name = $("#name").val();
        var month = $("#nowKqMonth").val();
        var orgId = $("#orgId").val();
        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var conditionMap = {
            "start": null,
            "limit": null,
            "date": month,
            "name": name,
            // "orgId": orgId,
            "orgIdList": orgIdsList,
            "colModel": colModel
        };
        var urlBody = "kq/hrKqSummary/exportInfoDay";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({"rowData": rowData, "colModel": colModel}),
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
                        form.attr('action', hostUrl + "kq/hrKqRest/exportInfoClient");
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
    };

    /**
     *  考勤月统计：导出Excel
     */
    window.exportBtnMonth = function () {
        //表格数据
        var colNames = $("#listResultByMonth").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listResultByMonth").jqGrid('getGridParam', 'colModel');
        /* rowData = $('#listResultByMonth').jqGrid('getRowData');
         var str = "bussTripDays,bussTripOfCityDays,lateDays,leaveEarlyDays,absenteeismDays,noSignDays,annualLeave,absenceLeave,sickLeave,maritalLeave,maternityLeave,paidLeaveDays,otherLeaveDays";
         var array = str.split(",");
         for (var i = 0; i < rowData.length; i++) {
             for (var j = 0; j < array.length; j++) {
                 var data = rowData[i];
                 var value = data[array[j]];
                 var sss = value.split(">");
                 var ss = sss[1].split("<");
                 data[array[j]] = ss[0];
             }
         }
 */
        var name = $("#name2").val();
        var month = $("#nowKqMonth").val();
        var orgId = $("#orgId").val();
        var orgIdsList = [];
        if (orgId !== undefined && orgId != null && orgId !== "") {
            orgIdsList = orgId.split(",");
        }


        var conditionMap = {
            "start": null,
            "limit": null,
            "date": month,
            "name": name,
            // "orgId": orgId,
            "orgIdList": orgIdsList,
            "colModel": colModel
        };
        var urlBody = "kq/hrKqSummary/exportBtnMonth";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({"rowData": rowData, "colModel": colModel}),
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
                        form.attr('action', hostUrl + "kq/hrKqRest/exportInfoClient");
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
    };

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

    $('.modal-cancel').click(function (e) {
        // var modalId = "kqNoSignModal";
        var jqGridId = $("#jqGridId").val();
        var modalId = $("#modalId").val();
        jQuery("#" + jqGridId + "").jqGrid("clearGridData");
        $("#" + modalId + "").modal('hide');
    });


    /**
     * 查询考勤周期开始日期（只有天）
     */
    function queryWagePeriod() {
        nowKqStartDays = 1;
        var date = new Date();
        var nowKqMonth = date.getFullYear() + "." + date.getMonth() + 1;
        var nowKqStartDate;
        var nowKqEndDate;
        $.ajax({
            url: hostUrl + "wage/wagePeriod/queryList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            data: "{}",
            success: function (data) {
                if (data.success) {
                    var result = data.result;
                    if (result !== undefined && result != null && !result == "") {
                        if (result[0].nowKqMonth !== undefined && result[0].nowKqMonth != null && !result[0].nowKqMonth == "") {
                            nowKqMonth = result[0].nowKqMonth;
                        }
                        if (result[0].startDate !== undefined && result[0].startDate != null && !result[0].startDate == "") {
                            nowKqStartDays = parseInt(result[0].startDate);
                        }

                        var wagePeriod = $.kqUtils.calculateEndDate2(nowKqMonth, nowKqStartDays, '.');
                        nowKqStartDate = wagePeriod.startDate;
                        nowKqEndDate = wagePeriod.endDate;

                        $("#nowKqStartDate").val(nowKqStartDate);
                        $("#nowKqEndDate").val(nowKqEndDate);
                        $("#nowKqMonth").val(nowKqMonth);

                    }
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

})(jQuery, window, document);