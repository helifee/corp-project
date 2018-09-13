;(function ($, window, document, undefined) {
        var jqGridByDay;//日明细
        var jqGridByMonth;//月结果
        var daysInMonth;//选择的月份有多少天
        var nowKqStartDays = 1;//计薪期间-起始天数
        var nowKqEndDays;//计薪期间-结束天数
        var ifNextMonth;//计薪期间结束天数是否次月
        var kqRestTypeIdList = {};//请假类型列表
        var ifEditStatus = false;//是否允许修改状态(功能权限控制) add by tangsq
        var modalDtoBefore = {};//考勤核算结果修改：保存修改之后的数据
        $(function () {
            //制空
            /*$("#orgIds").val("");
            $("#orgNames").val("");*/
            //resizeHeight();

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
                var nowKqMonth = wagePeriodDto.nowKqMonth;
                if (startDate === undefined || startDate === null || startDate === "") {//计薪期间有设置，但是开始日期为空
                    pop_text_open("blue", '请先设置计薪期间', function () {
                        window.location.href = "kq_wage_period.html?type=update&periodId=" + wagePeriodDto.id + "&nowKqMonth=" + nowKqMonth;
                    }, function () {
                        return;
                    });
                } else {
                    //当前考勤年月
                    queryWagePeriod();
                    queryInApproval();
                    queryAuth();
                    pageInit();
                    //暂不处理，权限按钮相关
                    ifEditStatus = true;

                    var count = queryCountByFileDay();//控制新建按钮是否可用
                    if (count === 0) {//如果未归档不允许调用
                        $("#newKqReport").attr("disabled", true);
                    }

                    //todo 动态历史月报页面查看，仅测试时使用
                    // $('#monthlyReportDynamic').show();
                }
            }

            //resizeGrid();
            var status = $.xljUtils.getUrlParam("status");
            if (status == "01") {
                storageShow();

                //kqSummaryAccounts();
                document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.
            }
            // 下拉多选框
            $('#kqRegular').multipleSelect({
                width: '130px',
                filter: true,
                addTitle: true,
                //placeholder: "所属考勤规则",
                minimumCountSelected: 10
            });
            $('#kqResult').multipleSelect({
                width: '150px',
                filter: true,
                addTitle: true,
                //placeholder: "考勤结果",
                minimumCountSelected: 10
            });

        });

        function loadComplete() {
            if (document.readyState === "complete") { //当页面加载状态
                //showModelInfo(modelId);
                var orgIds = $("#orgIds").val();
                var orgIdsList = [];
                if (orgIds !== undefined && orgIds != null && orgIds !== "") {
                    orgIdsList = orgIds.split(",");
                }
                //首先清空参数
                var postData = $("#listSummaryAccount").jqGrid("getGridParam", "postData");
                $.each(postData, function (k, v) {
                    delete postData[k];
                });
                var nowKqStartDate = $("#nowKqStartDate").text();
                var nowKqEndDate = $("#nowKqEndDate").text();
                var name = $("#name").val();
                var kqRegular = $("#kqRegular").val();
                var kqResult = $("#kqResult").val();
                var queryData = {
                    "startDate": nowKqStartDate,
                    "endDate": nowKqEndDate,
                    "orgIdList": orgIdsList,
                    "name": name,
                    "kqRegular": kqRegular,
                    "kqResult": kqResult
                };
                //queryConditionList(queryData);
                kqSummaryAccounts(queryData);
            }
        }

        function storageDate() {
            var orgIds = $("#orgIds").val();
            var orgNames = $("#orgNames").val();
            var name = $("#name").val();
            var kqRegular = $(".ms-drop").eq(0).html();
            var kqResult = $(".ms-drop").eq(1).html();
            var kqRegularName = $(".ms-choice").eq(0).find("span").text();

            var kqResultName = $(".ms-choice").eq(1).find("span").text();

            var kqRegularIds = $("#kqRegular").val();
            var kqResultIds = $("#kqResult").val();
            //var storage=window.localStorage;
            window.sessionStorage.setItem("summaryAccountOrgIds", orgIds);
            window.sessionStorage.setItem("summaryAccountOrgNames", orgNames);
            window.sessionStorage.setItem("summaryAccountName", name);
            window.sessionStorage.setItem("summaryAccountKqRegular", kqRegular);
            window.sessionStorage.setItem("summaryAccountKqResult", kqResult);
            window.sessionStorage.setItem("kqRegularName", kqRegularName);
            window.sessionStorage.setItem("kqResultName", kqResultName);
            window.sessionStorage.setItem("kqRegularIds", kqRegularIds);
            window.sessionStorage.setItem("kqResultIds", kqResultIds);
        }

        function storageShow() {
            var orgIds = window.sessionStorage.getItem("summaryAccountOrgIds");
            var orgNames = window.sessionStorage.getItem("summaryAccountOrgNames");
            var name = window.sessionStorage.getItem("summaryAccountName");
            var kqRegular = window.sessionStorage.getItem("summaryAccountKqRegular");
            var kqResult = window.sessionStorage.getItem("summaryAccountKqResult");
            var kqRegularName = window.sessionStorage.getItem("kqRegularName");
            var kqResultName = window.sessionStorage.getItem("kqResultName");
            var kqRegularIds = window.sessionStorage.getItem("kqRegularIds");
            var kqResultIds = window.sessionStorage.getItem("kqResultIds");
            var kqRegularId = [];
            if (kqRegularIds != null) {
                kqRegularId = kqRegularIds.split(",");
            }

            var kqResultId = [];
            if (kqResultIds != null) {
                kqResultId = kqResultIds.split(",");
            }


            $("#orgIds").val(orgIds);
            $("#orgNames").val(orgNames);
            $("#name").val(name);
            $(".ms-drop").eq(0).html(kqRegular);
            $(".ms-drop").eq(1).html(kqResult);
            $(".ms-choice").eq(0).find("span").text(kqRegularName);
            $(".ms-choice").eq(1).find("span").text(kqResultName);
            $("#kqRegular").val(kqRegularId);
            $("#kqResult").val(kqResultId);

        }

        // 按钮权限
        queryAuth();

        //审批中的记录
        $(".inAapprovalList").click(function () {
            // window.open("");
        });

        //考勤申请
        $("#kqApplyList").click(function () {
            window.location.href = 'kq_per_apply_list.html';
        });

        //动态月报（仅本地测试使用）
        $("#monthlyReportDynamic").click(function () {
            storageDate();
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            var nowKqMonth = $("#nowKqMonth").val();
            window.location.href = 'kq_summary_monthly_report_dynamic_data.html?nowKqStartDate=' + nowKqStartDate + "&nowKqEndDate=" + nowKqEndDate + "&nowKqMonth=" + nowKqMonth;
        });

        //月报

        $("#monthlyReport").click(function () {
            storageDate();
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            var nowKqMonth = $("#nowKqMonth").val();
            window.location.href = 'kq_summary_monthly_report.html?nowKqStartDate=' + nowKqStartDate + "&nowKqEndDate=" + nowKqEndDate + "&nowKqMonth=" + nowKqMonth;
        });


        //历史月报
        $("#HistoricalMonthlyReport").click(function () {
            storageDate();
            var nowKqMonth = $("#nowKqMonth").val();
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            //window.open('kq_summary_historical_monthly_report.html?nowKqMonth' + nowKqMonth)
            window.location.href = "kq_summary_historical_monthly_report.html?nowKqMonth" + nowKqMonth + "&nowKqStartDate=" + nowKqStartDate + "&nowKqEndDate=" + nowKqEndDate;
        });

        //新建考勤报表
        $("#newKqReport").click(function () {

            pop_text_open("blue", '您确认新建考勤月报表吗？', function () {
                var nowKqStartDate = $("#nowKqStartDate").text();
                var nowKqEndDate = $("#nowKqEndDate").text();
                var date = $("#nowKqMonth").val();
                //alert(date);
                $.ajax({
                    url: hostUrl + "kq/hrKqSummaryFileMonth/newReportFile",
                    type: 'POST',
                    data: JSON.stringify({"startDate": nowKqStartDate, "endDate": nowKqEndDate, "date": date}),
                    dataType: 'JSON',
                    contentType: 'application/json',
                    async: false,
                    success: function (data) {
                        if (data.success) {
                            window.location.href = "kq_summary_accounts.html?btnMenuCode=qddd";
                            $.xljUtils.tip("blue", "新建考勤报表成功！");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }, true);

        });

        $("#kqReportFile").click(function () {
            //您确认归档该月报表吗？如果已经归档过该月报表，弹窗文案：
            // 该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？
            var count = queryCountByFileDay();
            var title = "";
            if (count > 0) {
                title = "该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？";
            } else {
                title = "您确认归档该月报表吗？";
            }
            pop_text_open("blue", title, function () {
                $("#easyDialogYesBtn").hide();
                $("#easyDialogNoBtn").hide();//attr("disabled", false);

                var nowKqStartDate = $("#nowKqStartDate").text();
                var nowKqEndDate = $("#nowKqEndDate").text();
                var orgIds = $("#orgIds").val();
                var date = $("#nowKqMonth").val();

                //归档月统计
                $.ajax({
                    url: hostUrl + "kq/hrKqSummaryFileMonth/saveKqResultForArchiving",
                    type: 'POST',
                    //data:JSON.stringify({"startDate": nowKqStartDate, "endDate": nowKqEndDate, "orgId":orgIds,"date":date}),
                    data: JSON.stringify({"startDate": nowKqStartDate, "endDate": nowKqEndDate, "date": date}),
                    dataType: 'JSON',
                    contentType: 'application/json',
                    async: false,

                    success: function (data) {
                        if (data.success) {
                            $("#newKqReport").attr("disabled", false);
                            $.xljUtils.tip("blue", "归档成功！");
                        }

                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }

                });
            }, true);

        });


        //跳转到年假管理列表
        $("#kqAnnualList").click(function () {
            storageDate();
            window.location.href = "kq_annual_list.html?myFlag=true";
        });


        //跳转到请假申请列表
        $("#kqRestList").on('click', function () {
            var personId = $("#personId").val();
            // window.location.href = "kq_rest_list.html?myFlag=true&myPersonId=" + personId;
            window.location.href = "kq_rest_add.html?type=add";
        });
        //跳转到出差申请列表
        $("#kqBussList").on('click', function () {
            var personId = $("#personId").val();
            // window.location.href = "kq_buss_trip_list.html?myFlag=true&myPersonId=" + personId;
            window.location.href = "kq_buss_trip_add.html?type=add";
        });
        //跳转到未打卡申请列表
        $("#kqNoPunchList").on('click', function () {
            var personId = $("#personId").val();
            // window.location.href = "kq_noPunchCard_list.html?myFlag=true&myPersonId=" + personId;
            window.location.href = "kq_noPunchCard_add.html?type=add";
        });
        //跳转到市内公出申请列表
        $("#kqBussLocalList").on('click', function () {
            var personId = $("#personId").val();
            // window.location.href = "kq_local_city_trip.html?myFlag=true&myPersonId=" + personId;
            window.location.href = "kq_local_city_add.html?type=add";
        });


        $("#SummaryResultEditSave").click(function () {
            // var kqResultTypeValueAm = $("#kqResultTypeValueAm").val();
            // var kqResultTypeValuePm = $("#kqResultTypeValuePm").val();
            var kqResultTypeValueAm = $("#kqResultTypeAm").find("option:selected").text();
            var kqResultTypeValuePm = $("#kqResultTypePm").find("option:selected").text();
            if ((kqResultTypeValueAm === undefined || kqResultTypeValueAm == null || kqResultTypeValueAm === "")
                && (kqResultTypeValuePm === undefined || kqResultTypeValuePm == null || kqResultTypeValuePm === "")) {
                pop_tip_open("red", "请至少选择一个要修改的考勤类型！");
                return;
            }

            var kqRestTypeIdAm = $("#kqRestTypeIdAm").val();
            if (kqResultTypeValueAm === "请假" && (kqRestTypeIdAm === undefined || kqRestTypeIdAm == null || kqRestTypeIdAm === "" || kqRestTypeIdAm === "请选择")) {
                pop_tip_open("red", "请选择上午的请假类型！");
                return;
            }

            var kqRestTypeIdPm = $("#kqRestTypeIdPm").val();
            if (kqResultTypeValuePm === "请假" && (kqRestTypeIdPm === undefined || kqRestTypeIdPm == null || kqRestTypeIdPm === "" || kqRestTypeIdPm === "请选择")) {
                pop_tip_open("red", "请选择下午的请假类型！");
                return;
            }
            addSaveApplyForm();
        });

        $("#addLateAm").click(function () {
            addLateAm();
            $("#addLateAm").hide();
        });
        $("#addLeaveEarlyAm").click(function () {
            addLeaveEarlyAm();
            $("#addLeaveEarlyAm").hide();
        });
        $("#addLatePm").click(function () {
            addLatePm();
            $("#addLatePm").hide();
        });
        $("#addLeaveEarlyPm").click(function () {
            addLeaveEarlyPm();
            $("#addLeaveEarlyPm").hide();
        });

        //导入
        $('#import').click(function () {
            storageDate();
            var orgIds = $("#orgIds").val();
            var orgIdsList = [];
            if (orgIds !== undefined && orgIds != null && orgIds !== "") {
                orgIdsList = orgIds.split(",");
            }
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            var name = $("#name").val();
            var kqRegular = $("#kqRegular").val();
            var kqResult = $("#kqResult").val();
            var queryData = {
                "startDate": nowKqStartDate,
                "endDate": nowKqEndDate,
                "orgIdList": orgIdsList,
                "name": name,
                "kqRegular": kqRegular,
                "kqResult": kqResult
            };
            //kqSummaryAccounts({"startDate": nowKqStartDate, "endDate": nowKqEndDate, "orgId": orgId, "name": name});
            window.location.href = "kq_summary_accounts_import.html?orgIdList=" + orgIdsList + "&startDate=" + nowKqStartDate
                + "&endDate=" + nowKqEndDate + "&name=" + encodeURI(encodeURI(name)) + "&kqRegular=" + kqRegular + "&kqResult=" + kqResult;
        });

        $('#kqSetting').click(function () {
            storageDate();
            window.location.href = "kq_setting.html";
        });

        $('.btn').click(function (e) {
            e.preventDefault();
        });

        function pageInit() {
            daysInit();
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            var orgIds = $("#orgIds").val();
            var orgIdsList = [];
            if (orgIds !== undefined && orgIds != null && orgIds !== "") {
                orgIdsList = orgIds.split(",");
            }
            kqSummaryAccounts({
                "startDate": nowKqStartDate,
                "endDate": nowKqEndDate,
                "orgIdList": orgIdsList
            });
            queryRestApplyTypeList();//查询请假类型
            queryKqResultTypeList();//查询考勤统计结果类型
            queryAttendanceRulesList();//查询考勤规则类型
            getCodeMesBySetId();
        }

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
                    if(list!=null&&list.length>0) {
	                    $.each(list, function (index, value) {
	                        for (var key in value) {
	                            if (key == "code" && value[key] == "2") {//编辑权限
	                                $("#import").show();//导入
	                                $("#showMore").show();//更多（请假申请、出差申请、公出申请、未打卡申请）
                                    $('#kqApplyList').show();//考勤申请
	                                ifEditStatus = true;
	                            }
	                            if (key == "code" && value[key] == "4") {//归档、新建权限
	                                $("#kqReportFile").show();//如果有编辑权限则显示 归档  按钮
	                                $("#newKqReport").show();//新建考勤报表
	                            }
	                        }
	                    });
                    }
                },
                error: function () {
                }
            });
        }

//计算高度
        function resizeHeight() {
//            //左侧  头部底部为60px  title类 为50px
//            var w_h = $(window).height();
//            // $(".slide-left .ztree-box").height((w_h - 70) + "px");
//            //右侧table
//            $(".con-table .mytable").height((w_h - 50) + "px");
        }

//计算表格宽度
        function resizeGrid() {
//            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 50);
//            // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
//            $.xljUtils.gridResizeFn();
            //解决切换页面大小出现滚动条、切换页面百分比页面出现空白的问题
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
            $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width());
            $('#listSummaryAccount').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#listSummaryAccount').jqGrid('setFrozenColumns');
            // 冻结列样式
            $.xljUtils.setFrozenColumnStyle(41);
        }

//grid 自适应宽度
        $(window).resize(function () {
            //resizeHeight();
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
            var name = cm.name;
            // var name = cm.name.substring(0, 3);
            // var month = parseInt(cm.name.substring(3,5));
            // var days = parseInt(cm.name.substring(3, 7));
            // if (days >= 1 && days <= 9) {
            //     name = name + "0" + days;
            // } else if (days > 9) {
            //     name = name + days;
            // }
            var type = name + "kqType";
            var jsonData = JSON.stringify(rowObject);
            var data = eval('(' + jsonData + ')');
            var typeValue = data[type];//考勤类型


            if (typeValue == "1118101005") {//休息日
                return "style='background-color:rgba(176, 176, 176, 1)'";
            }
            // else if (typeValue == "1118100219") {//异常
            //     return "style='background-color:#F24848'";
            // } else if (typeValue == "1118100220") {//请假
            //     return "style='background-color:yellow'";
            // } else if (typeValue == "1118100221") {//出差
            //     return "style='background-color:orange'";
            // } else if (typeValue == "1118100222") {//未打卡
            //     return "style='background-color:cornflowerblue'";
            // }
            // else if (typeValue == "1118100223") {//流程未结束
            //     return "style='background-color:#77d5f7'";
            // }
        }


        /**
         * 考勤核算
         * */
        window.kqSummaryAccounts = function (postData) {
            //加载动态列
            var jqdata = [
                {name: 'name', label: "姓名", width: 150, align: "center", frozen: true},
                {name: 'phone', label: "手机号", width: 150, align: "center", frozen: true},
                {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
                {name: 'postName', label: "职务", width: 150, align: "center", frozen: true},
                {name: 'pinyin', label: "拼音", width: 150, align: "center", frozen: true, hidden: true},
                // {name: 'account', label: "账号", width: 150, align: "center"},
                {name: 'planName', label: "所属考勤规则", width: 150, align: "center"}
            ];
            var month1 = $("#month1").val();
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            nowKqStartDate = nowKqStartDate.replace(new RegExp(/\./gm), "/"); //将所有的'.'转为'/'即可
            var nowKqStart_date = new Date(nowKqStartDate);
            nowKqEndDate = nowKqEndDate.replace(new RegExp(/\./gm), "/"); //将所有的'.'转为'/'即可
            var nowKqEnd_date = new Date(nowKqEndDate);
            // var daysInMonth = $.kqUtils.getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
            while (nowKqStart_date <= nowKqEnd_date) {
                var j = nowKqStart_date.getDate();
                var month = nowKqStart_date.getMonth() + 1;
                // for (var i = 0; i < daysInMonth; i++) {
                //     var j = i + 1;
                if (j >= 1 && j <= 9) {
                    j = "0" + j;
                }
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                var nowKqStart_date_year = nowKqStart_date.getFullYear();
                var name = "day" + month + j;
                var dayOfWeek = nowKqStart_date.getDay();
                if (dayOfWeek === 0) {
                    dayOfWeek = "日";
                } else if (dayOfWeek === 1) {
                    dayOfWeek = "一";
                } else if (dayOfWeek === 2) {
                    dayOfWeek = "二";
                } else if (dayOfWeek === 3) {
                    dayOfWeek = "三";
                } else if (dayOfWeek === 4) {
                    dayOfWeek = "四";
                } else if (dayOfWeek === 5) {
                    dayOfWeek = "五";
                } else if (dayOfWeek === 6) {
                    dayOfWeek = "六";
                }
                var label = nowKqStart_date.getMonth() + 1 + "." + j + "(星期" + dayOfWeek + ")";
                var data = {
                    name: name,
                    label: label,
                    width: 150,
                    align: "center",
                    cellattr: addCellAttr,
                    formatter: kqSummaryResultEditFormatter,
                    nowKqStart_date_year: nowKqStart_date_year
                };
                // var data = {name: name, label: label, width: 150, align: "center"};
                jqdata.push(data);
                nowKqStart_date = new Date(nowKqStart_date.getFullYear(), nowKqStart_date.getMonth(), nowKqStart_date.getDate() + 1);
            }
            jqdata.push({name: 'editHistory', label: "修改历史", width: 150, align: "center"});
            var model = [];
            for (var i = 0; i < jqdata.length; i++) {
                model.push({
                    name: jqdata[i].name,
                    label: jqdata[i].label,
                    width: jqdata[i].width,
                    align: jqdata[i].align,
                    cellattr: jqdata[i].cellattr,
                    formatter: jqdata[i].formatter,
                    nowKqStart_date_year: jqdata[i].nowKqStart_date_year,
                    hidden: jqdata[i].hidden,
                    frozen: jqdata[i].frozen
                });
            }


            var ubody = "kq/hrKqSummary/queryKqSummaryAccountsList";
            var uall = hostUrl + ubody;
            var jgGridResultData;//查询结果
            //卸载jqGrid组件
            jQuery('#listSummaryAccount').GridUnload();
            //创建jqGrid组件
            jqGridByDay = jQuery("#listSummaryAccount").jqGrid(
                {
                    url: uall,
                    postData: postData,
                    datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                    // datatype: "local",
                    mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                    ajaxGridOptions: {contentType: 'application/json'},
                    contentType: "application/json",

                    jsonReader: {
                        root: "result",
                        repeatitems: false
                    },
                    autowidth: true,
                    shrinkToFit: false,
                    rownumbers: true,
                    autoScroll: true,
                    colModel: model,
                    height: $(window).height() - 200,

                    rowNum: -1,//一页显示多少条
                    rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                    // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                    // page: 1,
                    viewrecords: true, //定义是否要显示总记录数
                    // sortname: 'id',//初始化的时候排序的字段
                    // sortorder: "desc",//排序方式,可选desc,asc
                    loadComplete: function (data) {
                        $.xljUtils.setFrozenColumnStyle(41);
                    },
                    loadError: function (xhr, status, error) {
                        pop_tip_open("red", "服务器异常，请联系管理员");
                    },
                    gridComplete: function () {
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                        //冻结列
                        $('#listSummaryAccount').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                        $("#listSummaryAccount").jqGrid('setFrozenColumns');
                    }
                });
        };


        /**
         * 查询请假类型
         */
        function queryRestApplyTypeList() {
            var orgId = $('#orgId').val();

            $.ajax({
                url: hostUrl + "kq/hrKqRest/queryRestApplyTypeList",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"ifAllTypeQuery": "true"}),
                async: false,
                success: function (data) {
                    if (data.success) {
                        restApplyTypeList = data.result;
                        //考勤结果修改弹出层的
                        var selTypeObjAm = $("#kqRestTypeIdAm");
                        var selTypeObjPm = $("#kqRestTypeIdPm");
                        $("#kqRestTypeIdAm").empty();
                        selTypeObjAm.append("<option>请选择</option>");
                        selTypeObjPm.append("<option>请选择</option>");
                        for (i in restApplyTypeList) {
                            var typeId = restApplyTypeList[i].id;
                            kqRestTypeIdList[typeId] = restApplyTypeList[i];
                            var typeName = restApplyTypeList[i].name;
                            if (restApplyTypeList[i].status === "1092100169") {//启用状态的假期
                                selTypeObjAm.append("<option value=" + typeId + ">" + typeName + "</option>");
                                selTypeObjPm.append("<option value=" + typeId + ">" + typeName + "</option>");
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
         * 年月初始化
         */
        window.daysInit = function () {
            var month1 = $("#month1").val();
            if (month1 == null || month1 == "") {
                var date = new Date();
                var month = date.getMonth() + 1;
                if (month >= 1 && month < 10) {
                    month = "0" + month;
                }
                month1 = date.getFullYear() + "-" + month;
                $("#month1").val(month1);
            }
            daysInMonth = $.kqUtils.getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
        };


        /**
         * 上级组织机构回调函数
         * @param data
         */
        window.orgCallback = function (data) {
            var orgId = "";
            var orgName = "";
            for (var i = 0; i < data.length; i++) {
                orgId += data[i].id + ",";
                orgName += data[i].name + ",";
            }
            orgId = orgId.substring(0, orgId.length - 1);
            orgName = orgName.substring(0, orgName.length - 1);
            $("#orgIds").val(orgId);
            $("#orgNames").val(orgName);
        };

        window.empty = function (data) {
            $("#orgIds").val("");
            $("#orgNames").val("");
        };


        /**
         * 条件查询
         */
        window.queryConditionList = function () {
            var orgIds = $("#orgIds").val();
            var orgIdsList = [];
            if (orgIds !== undefined && orgIds != null && orgIds !== "") {
                orgIdsList = orgIds.split(",");
            }
            //首先清空参数
            var postData = $("#listSummaryAccount").jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            var name = $("#name").val();
            var kqRegular = $("#kqRegular").val();
            var kqResult = $("#kqResult").val();
            var queryData = {
                "startDate": nowKqStartDate,
                "endDate": nowKqEndDate,
                "orgIdList": orgIdsList,
                "name": name,
                "kqRegular": kqRegular,
                "kqResult": kqResult
            };
//            $('#listSummaryAccount').jqGrid('destroyFrozenColumns');
            jQuery("#listSummaryAccount").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        };


        //考勤核算结果修改
        function kqSummaryResultEditFormatter(cellValue, options, rowObject) {
            var modalDto = {};

            //判断日期
            var nowKqStart_date_year = options.colModel.nowKqStart_date_year;//年度
            var label = options.colModel.label;
            var date = "";
            if (label !== undefined && label != null && label !== "") {
                var label_arr = label.split(".");
                var month = label.split(".")[0];
                var day = label.split(".")[1].substring(0, 2);
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                date = month + "." + day;
            }
            var edit_date = nowKqStart_date_year + "." + date;
            var personId = rowObject.personId;
            var personName = rowObject.name;
            if (cellValue === undefined || cellValue == null) {
                cellValue = "";
            }

            //判断单元格考勤类型
            var key = options.colModel.name + "kqType";
            var kqType = rowObject[key];
            var kqResultTypeAm = "";
            var kqResultTypePm = "";
            if (kqType !== undefined && kqType !== null && kqType !== "") {
                var kqTypeArr = kqType.split(",");
                if (kqTypeArr !== undefined && kqTypeArr != null) {
                    if (kqTypeArr.length > 0) {
                        kqResultTypeAm = kqTypeArr[0];
                        kqResultTypePm = kqTypeArr[0];
                    }
                    if (kqTypeArr.length > 1) {
                        kqResultTypePm = kqTypeArr[1];
                    }
                }
            }

            modalDto.personId = personId;//人员
            modalDto.personName = personName;
            modalDto.editDate = edit_date;//日期
            modalDto.kqResultTypeAm = kqResultTypeAm;//上午考勤类型
            modalDto.kqResultTypePm = kqResultTypePm;//下午考勤类型
            modalDto.cellValue = cellValue;

            var result = '';
            if (ifEditStatus == true && cellValue !== "无需打卡") {
                // result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqSummaryResultEditModal(\'' + edit_date + '\',\'' + personId + '\',\'' + personName + '\')">' + cellValue + '</a>';
                result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqSummaryResultEditModal(\'' + JSON.stringify(modalDto).replace(/"/g, '&quot;') + '\')">' + cellValue + '</a>';
            } else {
                result = '<span name="kqMonthHref" style="color: #0000FF">' + cellValue + '</span>';
            }
            return result;
        }

        //考勤核算结果修改-详情显示
        window.showKqSummaryResultEditModal = function (jsonData) {
            var kqResultTypeAm_ = document.getElementById("kqResultTypeAm");
            if (kqResultTypeAm_.options != undefined && kqResultTypeAm_.options.length > 0) {
                kqResultTypeAm_.options[0].selected = true;
            }

            var kqResultTypePm_ = document.getElementById("kqResultTypePm");
            if (kqResultTypePm_.options != undefined && kqResultTypePm_.options.length > 0) {
                kqResultTypePm_.options[0].selected = true;
            }

            var kqRestTypeIdAm_ = document.getElementById("kqRestTypeIdAm");
            if (kqRestTypeIdAm_.options != undefined && kqRestTypeIdAm_.options.length > 0) {
                kqRestTypeIdAm_.options[0].selected = true;
            }

            var kqRestTypeIdPm_ = document.getElementById("kqRestTypeIdPm");
            if (kqRestTypeIdPm_.options != undefined && kqRestTypeIdPm_.options.length > 0) {
                kqRestTypeIdPm_.options[0].selected = true;
            }

            var modalDto = eval('(' + jsonData + ')');
            var personId = modalDto.personId;//人员
            var personName = modalDto.personName;
            var edit_date = modalDto.editDate;//日期
            var kqResultTypeAm = modalDto.kqResultTypeAm;//上午考勤类型
            var kqResultTypePm = modalDto.kqResultTypePm;//下午考勤类型
            var cellValue = modalDto.cellValue;

            $("#personId").val(personId);
            $("#personName").val(personName);
            $("#editDate").val(edit_date);

            if (kqResultTypeAm !== "") {
                if (kqResultTypeAm === "1118100347/1118100349") {
                    $("#kqResultTypeAm").val("1118101009");
                } else {
                    $("#kqResultTypeAm").val(kqResultTypeAm);
                }
            }
            if (kqResultTypePm !== "") {
                if (kqResultTypePm === "1118100347/1118100349") {
                    $("#kqResultTypePm").val("1118101009");
                } else {
                    $("#kqResultTypePm").val(kqResultTypePm);
                }
            }

            $("#kqRestTypeId_am").hide();
            $("#kqRestTypeId_pm").hide();
            if (kqResultTypeAm === "1118100220" || kqResultTypePm === "1118100220") {//当天有请假类型，需要动态查询请假类型
                var hrKqAttendanceAccountEditDto = $.kqUtils.queryKqAttendanceAccountEdit(edit_date, personId);
                if (hrKqAttendanceAccountEditDto !== undefined || hrKqAttendanceAccountEditDto != null) {//该员工改天没有修改记录
                    if (kqResultTypeAm === "1118100220") {//上午是请假类型
                        $("#kqRestTypeId_am").show();
                        $("#kqRestTypeIdAm").val(hrKqAttendanceAccountEditDto.kqRestTypeIdAm);
                        modalDto.kqRestTypeIdAm = hrKqAttendanceAccountEditDto.kqRestTypeIdAm;

                    }
                    if (kqResultTypePm === "1118100220") {//下午是请假类型
                        $("#kqRestTypeId_pm").show();
                        $("#kqRestTypeIdPm").val(hrKqAttendanceAccountEditDto.kqRestTypeIdPm);
                        modalDto.kqRestTypeIdPm = hrKqAttendanceAccountEditDto.kqRestTypeIdPm;
                    }
                } else {//不是修改类型，是系统计算出来的结果，如果是请假，也要回显具体请假类型
                    var cellValue_arr = cellValue.split(",");
                    var cellValue_1 = cellValue_arr[0];
                    var cellValue_2 = cellValue_arr[0];
                    if (cellValue_arr.length > 1) {
                        cellValue_2 = cellValue_arr[1];
                    }
                    if (kqResultTypeAm === "1118100220") {//上午是请假类型
                        $("#kqRestTypeId_am").show();

                        var kqRestTypeIdAm = "";
                        $("#kqRestTypeIdAm option").each(function () {
                            if ($(this).text() == cellValue_1) {
                                kqRestTypeIdAm = $(this)[0].value;
                            }
                        });

                        $("#kqRestTypeIdAm").val(kqRestTypeIdAm);
                        modalDto.kqRestTypeIdAm = kqRestTypeIdAm;

                    }
                    if (kqResultTypePm === "1118100220") {//下午是请假类型
                        $("#kqRestTypeId_pm").show();

                        var kqRestTypeIdPm = "";
                        $("#kqRestTypeIdPm option").each(function () {
                            if ($(this).text() == cellValue_2) {
                                kqRestTypeIdPm = $(this)[0].value;
                            }
                        });

                        $("#kqRestTypeIdPm").val(kqRestTypeIdPm);
                        modalDto.kqRestTypeIdPm = kqRestTypeIdPm;
                    }
                }
            }
            modalDtoBefore = modalDto;//保存修改之前的结果
            $("#kqSummaryResultEditModal").modal('show');
            $("#jqGridId").val("kqAnnualLeaveList");
            $("#modalId").val("kqAnnualLeaveModal");
        };

        window.emptyCodeInfo = function (codeName, codeId) {
            $("#" + codeName).val("");
            $("#" + codeId).val("");
            kqSummaryTypeChanged_am();
            kqSummaryTypeChanged_pm();
        };

        window.kqSummaryTypeChanged_am = function () {
            var kqResultTypeValue = $("#kqResultTypeAm").find("option:selected").text();
            // var kqResultTypeValue = $("#kqResultTypeValueAm").val();

            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "请假") {
                $("#kqRestTypeId_am").show();
            } else {
                $("#kqRestTypeId_am").hide();
            }

            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "迟到") {
                $("#addLeaveEarlyAm").show();
            } else {
                $("#addLeaveEarlyAm").hide();
            }
            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "早退") {
                $("#addLateAm").show();
            } else {
                $("#addLateAm").hide();
            }
        };

        window.kqSummaryTypeChanged_pm = function () {
            var kqResultTypeValue = $("#kqResultTypePm").find("option:selected").text();
            // var kqResultTypeValue = $("#kqResultTypeValuePm").val();
            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "请假") {
                $("#kqRestTypeId_pm").show();
            } else {
                $("#kqRestTypeId_pm").hide();
            }

            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "迟到") {
                $("#addLeaveEarlyPm").show();
            } else {
                $("#addLeaveEarlyPm").hide();
            }
            if (kqResultTypeValue !== undefined && kqResultTypeValue != null && kqResultTypeValue === "早退") {
                $("#addLatePm").show();
            } else {
                $("#addLatePm").hide();
            }
        };

        function addSaveApplyForm() {
            initUuid();
            var hrKqAttendanceAccountEditArr = $("#resumptionLeaveForm").serializeArray();
            var hrKqAttendanceAccountEditDto = {};
            for (var i in hrKqAttendanceAccountEditArr) {
                if (hrKqAttendanceAccountEditDto[hrKqAttendanceAccountEditArr[i].name] === "editDate") {
                    var date = hrKqAttendanceAccountEditArr[i].value;
                    hrKqAttendanceAccountEditDto[hrKqAttendanceAccountEditArr[i].name] = new Date(date).getTime();
                } else {
                    hrKqAttendanceAccountEditDto[hrKqAttendanceAccountEditArr[i].name] = hrKqAttendanceAccountEditArr[i].value;
                }
            }

            var type_am = hrKqAttendanceAccountEditDto.kqResultTypeAm;
            var type_pm = hrKqAttendanceAccountEditDto.kqResultTypePm;
            //跟修改之前的数据进行对比
            var type_am_before = modalDtoBefore.kqResultTypeAm;
            var type_pm_before = modalDtoBefore.kqResultTypePm;

            var rest_type_am = hrKqAttendanceAccountEditDto.kqRestTypeIdAm;
            var rest_type_pm = hrKqAttendanceAccountEditDto.kqRestTypeIdAm;

            var rest_type_am_before = modalDtoBefore.kqRestTypeIdAm;
            var rest_type_pm_before = modalDtoBefore.kqRestTypeIdAm;


            if (type_am === "1118101009") {
                type_am = "1118100347/1118100349";
                hrKqAttendanceAccountEditDto.kqResultTypeAm = type_am;
            }

            if (type_pm === "1118101009") {
                type_pm = "1118100347/1118100349";
                hrKqAttendanceAccountEditDto.kqResultTypePm = type_pm;
            }

            /**
             * 不需要修改数据的情况：上午和下午的考勤类型都相同
             *      1.都不是请假类型：不保存
             *      2.是请假类型：上午和下午的请假类型都相同时
             */
            if (type_am === type_am_before && type_pm === type_pm_before) {
                if (type_am_before === "1118100220" || type_pm_before === "1118100220") {
                    var count = 0;//为0表示数据不需要保存
                    if (type_am_before === "1118100220") {//上午请假类型
                        if (rest_type_am !== rest_type_am_before) {//请假类型不相同
                            count++;
                        }
                    }
                    if (type_pm_before === "1118100220") {//下午请假类型
                        if (rest_type_pm !== rest_type_pm_before) {//请假类型不相同
                            count++;
                        }
                    }

                    if (count === 0) {
                        pop_tip_open("blue", "保存成功！");
                        return;
                    }
                } else {
                    pop_tip_open("blue", "保存成功！");
                    return;
                }
            }

            // var kqResultTypeValueAm = $("#kqResultTypeValueAm").val();
            var kqResultTypeValueAm = $("#kqResultTypeAm").find("option:selected").text();

            if (kqResultTypeValueAm !== "请假") {
                hrKqAttendanceAccountEditDto.kqRestTypeIdAm = null;
                hrKqAttendanceAccountEditDto.ifRestTypeAm = "0";
            } else if (kqResultTypeValueAm !== undefined && kqResultTypeValueAm != null && kqResultTypeValueAm === "请假") {
                hrKqAttendanceAccountEditDto.ifRestTypeAm = "1";
                var kqRestTypeValueAm = $("#kqRestTypeIdAm").find("option:selected").text();
                hrKqAttendanceAccountEditDto.kqRestTypeValueAm = kqRestTypeValueAm;
            }

            // var kqResultTypeValuePm = $("#kqResultTypeValuePm").val();
            var kqResultTypeValuePm = $("#kqResultTypePm").find("option:selected").text();
            if (kqResultTypeValuePm !== "请假") {
                hrKqAttendanceAccountEditDto.kqRestTypeIdPm = null;
                hrKqAttendanceAccountEditDto.ifRestTypePm = "0";
            } else if (kqResultTypeValuePm !== undefined && kqResultTypeValuePm != null && kqResultTypeValuePm === "请假") {
                hrKqAttendanceAccountEditDto.ifRestTypePm = "1";
                var kqRestTypeValuePm = $("#kqRestTypeIdPm").find("option:selected").text();
                hrKqAttendanceAccountEditDto.kqRestTypeValuePm = kqRestTypeValuePm;
            }
            hrKqAttendanceAccountEditDto.delflag = 0;

            $.ajax({
                url: hostUrl + "kq/hrKqAttendanceAccountEdit/saveOrUpdate",
                type: 'POST',
                dataType: 'JSON',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify(hrKqAttendanceAccountEditDto),
                success: function (data) {
                    if (data.success) {
                        pop_tip_open("blue", "保存成功！");
                        jqGridByDay.jqGrid().trigger("reloadGrid");
                        $("#kqSummaryResultEditModal").modal('hide');
                    } else {
                        pop_tip_open("red", "保存失败！");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
        }

        $('.modal-cancel').click(function (e) {
            $("#kqSummaryResultEditModal").modal('hide');
        });


        window.initUuid = function () {
            var uBody = "generator/getGuuid" + "?time=" + Math.random();
            var uAll = hostUrl + uBody;
            $.ajax({
                type: 'get',
                url: uAll,
                async: false,
                success: function (data) {
                    var guuid = data.result;
                    $("#resumptionLeaveForm").find("input[name='id']").val(guuid);
                }
            });
        };

        //查询条件
        //1.考勤结果类型
        function queryKqResultTypeList() {
            $.ajax({
                url: hostUrl + "sys/sysCodeItem/getSysCodeItemBySetId",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"code_set_id": "1118", "status": "1"}),
                async: false,
                success: function (data) {
                    if (data.success) {
                        var kqResultTypeList = data.result;
                        var selTypeObj = $("#kqResult");
                        $("#kqRestTypeId").empty();
                        for (i in kqResultTypeList) {
                            var typeId = kqResultTypeList[i].id;
                            var typeName = kqResultTypeList[i].name;
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

        //迟到 1118100347
        function addLateAm() {
            var kqResultTypeAm = $("#kqResultTypeAm").val();
            var kqResultTypeValueAm = $("#kqResultTypeValueAm").val();
            kqResultTypeAm = "1118100347" + "/" + kqResultTypeAm;
            kqResultTypeValueAm = "迟到" + "/" + kqResultTypeValueAm;
            $("#kqResultTypeAm").val(kqResultTypeAm);
            $("#kqResultTypeValueAm").val(kqResultTypeValueAm);
        }

        //早退 1118100349
        function addLeaveEarlyAm() {
            var kqResultTypeAm = $("#kqResultTypeAm").val();
            var kqResultTypeValueAm = $("#kqResultTypeValueAm").val();
            kqResultTypeAm += "/" + "1118100349";
            kqResultTypeValueAm += "/" + "早退";
            $("#kqResultTypeAm").val(kqResultTypeAm);
            $("#kqResultTypeValueAm").val(kqResultTypeValueAm);
        }

        //迟到 1118100347
        function addLatePm() {
            var kqResultTypePm = $("#kqResultTypePm").val();
            var kqResultTypeValuePm = $("#kqResultTypeValuePm").val();
            kqResultTypePm = "1118100347" + "/" + kqResultTypePm;
            kqResultTypeValuePm = "迟到" + "/" + kqResultTypeValuePm;
            $("#kqResultTypePm").val(kqResultTypePm);
            $("#kqResultTypeValuePm").val(kqResultTypeValuePm);
        }

        //早退 1118100349
        function addLeaveEarlyPm() {
            var kqResultTypePm = $("#kqResultTypePm").val();
            var kqResultTypeValuePm = $("#kqResultTypeValuePm").val();
            kqResultTypePm += "/" + "1118100349";
            kqResultTypeValuePm += "/" + "早退";
            $("#kqResultTypePm").val(kqResultTypePm);
            $("#kqResultTypeValuePm").val(kqResultTypeValuePm);
        }


        /**
         * 查询考勤规则
         */
        function queryAttendanceRulesList() {
            $.ajax({
                url: hostUrl + "kq/hrKqPlan/queryList",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                async: false,
                data: "{}",
                success: function (data) {
                    if (data.success) {
                        var typeList = data.result;
                        //考勤结果修改弹出层的
                        var selTypeObj = $("#kqRegular");
                        $("#kqRegular").empty();
                        for (i in typeList) {
                            var typeId = typeList[i].sid;
                            var typeName = typeList[i].name;
                            selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }
                        selTypeObj.append("<option value='notSet'>未设置</option>");
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
        }

        function queryCountByFileDay() {
            var date = $("#nowKqMonth").val();
            var count = 0;
            //归档月统计
            $.ajax({
                url: hostUrl + "kq/hrKqSummaryFileDay/queryCountByFileDay",
                type: 'POST',
                data: JSON.stringify({"date": date}),
                dataType: 'JSON',
                contentType: 'application/json',
                async: false,

                success: function (data) {
                    if (data.success) {
                        count = data.result;

                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
            return count;
        }

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

                            $("#nowKqStartDate").html(nowKqStartDate);
                            $("#nowKqEndDate").html(nowKqEndDate);
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

        /**
         * 查询考勤模块所有审批中的流程总数
         */
        function queryInApproval() {
            var nowKqStartDate = $("#nowKqStartDate").text();
            var nowKqEndDate = $("#nowKqEndDate").text();
            $.ajax({
                url: hostUrl + "kq/hrKqSummary/queryInApprovalList",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                async: false,
                data: JSON.stringify({
                    "applyStartDate": nowKqStartDate.replace(/\./g, "-"),
                    "applyEndDate": nowKqEndDate.replace(/\./g, "-")
                }),
                success: function (data) {
                    if (data.success) {
                        var result = data.result;
                        $("#inApprovalSum").empty();
                        $("#inApprovalSum").html(result);
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
        }


        function getCodeMesBySetId() {
            $.ajax({
                type: 'POST',
                url: hostUrl + "sys/sysCodeItem/getCodeItemBySetId",
                async: false,
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"codeSetId": '1118', "status": "1"}),//只查询有效状态的，即启用的
                success: function (data) {
                    if (data.success == true) {
                        var result = data.result;
                        var selTypeObj1 = $("#kqResultTypeAm");
                        $("#kqResultTypeAm").empty();
                        for (i in result) {
                            var typeId = result[i].id;
                            var typeName = result[i].name;
                            selTypeObj1.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }

                        var selTypeObj2 = $("#kqResultTypePm");
                        $("#kqResultTypePm").empty();
                        for (i in result) {
                            var typeId = result[i].id;
                            var typeName = result[i].name;
                            selTypeObj2.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "服务异常,请联系管理员！");
                }
            });
        }
    }
)

(jQuery, window, document);