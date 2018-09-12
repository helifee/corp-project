;(function ($, window, document, undefined) {
// var restApplyTypeLists;
    var restApplyTypeList;
    var applyId;//系统申请表单据id
    var typeStatus;//年假状态：启用/禁用
    var annualRemainDays;//当前员工的年假剩余天数
    var applyRegular;//年假限制设置
    var deptComList;//部门和公司映射
    // var startFlag = true;//用于判断开始日期是否是工作日（true  是  false 否）
    // var endFlag = true;//用于判断结束日期是否是工作日（true  是  false 否）
    var restTypeList = {};//请假类型列表
    var annualInfo;//员工个人年假信息
    var annualRemainDaysForForm;//请假信息表中保存的年假剩余天数（审批中或者已审批的申请单需要显示）
    var nowAnualYear;//当前查询哪一年度的年假
    var restTypeForUpdate;//修改时的请假类型显示
    var businessId;
    var personId;
    $(function () {
        resizeHeight();
        businessId = $.xljUtils.getUrlParam("businessId");
        personId = $.xljUtils.getUrlParam("personId");
        $("#applicant").val(personId);
        $("#personId").val(personId);
        $("#businessId").val(businessId);

        initDatetimepicker();
        queryAnnualFormula();//年假限制设置

        if (businessId == undefined || businessId == '' || businessId == null) {
            $('title').text("请假申请-新增");
            $(".xj-form-title").text("请假申请-新增");
            $("#destroyStatus").val("1081100727");//默认未销
            $("#approvalStatus").val($.hrUtils.APPLY_DRAFT);//默认为草稿状态（年假类型的剩余天数显示使用）
            var nowDate = new Date();
            var annualYear = nowDate.getFullYear();
            $("#annualYear").val(annualYear).change();
        } else {
            $('title').text("请假申请-修改");
            $(".xj-form-title").text("请假申请-修改");
            getKqRestInfoById(businessId);
        }

        //默认是今年
        $("#nowApplyYear").val(new Date().getFullYear());
        queryRestApplyTypeList();//查询请假类型
        $("#restType option[value='" + restTypeForUpdate + "']").attr("selected", true);

        queryAnnualInfoById();
        restInit();//查询本年度申请列表

        annualRemainDaysShow();
        if (annualInfo.length > 0) {
            $("#annualRemainDays").val(annualInfo[0].annualRemainDays);
        }
        resizeGrid();
    });


    /**
     * 显示剩余年假信息
     */
    function annualRemainDaysShow() {
        var approvalStatus = $("#approvalStatus").val();
        var restType = $("#restType").find("option:selected").text();
        // var restTypeName = $("#restTypeName").find("option:selected").text();
        if (restType === "年假") {
            if (approvalStatus !== null && approvalStatus !== undefined && (approvalStatus === "草稿" || approvalStatus === $.hrUtils.APPLY_DRAFT)) {
                if (annualInfo.length > 0) {
                    annualRemainDays = annualInfo[0].annualRemainDays;
                    $("#annualRemainDaysS").empty().append("年假剩余" + annualRemainDays + "天");
                }
                // } else if (approvalStatus !== null && approvalStatus !== undefined && (approvalStatus === "审批中" || approvalStatus === "已审批")) {
            } else {//其他天数显示表中的天数
                $("#annualRemainDaysS").empty().append("年假剩余" + annualRemainDaysForForm + "天");
            }

        } else {
            $("#annualRemainDaysS").empty();
        }
    }


//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 180) / 3 + "px");
        //xj-main-grid grid-container
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

    /**
     * 清空人员
     */
    window.emptyPerson = function () {
        $("#applicantName").val("");
        $("#applicant").val("");
        $("#deptName").val("");
        $("#companyId").val("");
        $("#companyName").val("");
        $("#deptId").empty();
    };

    function queryRestApplyTypeList() {
        var hrDeptId = $('#hrDeptId').val();
        $.ajax({
            url: hostUrl + "kq/hrKqRest/queryRestApplyTypeList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"orgId": hrDeptId}),
            async: false,
            success: function (data) {
                if (data.success) {
                    restApplyTypeList = data.result;
                    var selTypeObj = $("#restType").empty();
                    for (i in restApplyTypeList) {
                        var typeId = restApplyTypeList[i].id;
                        restTypeList[typeId] = restApplyTypeList[i];
                        var typeName = restApplyTypeList[i].name;
                        if (restApplyTypeList[i].status === "1092100169") {//启用状态的假期
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

    function checkIfDuplicate() {
        var duplicateFlag = false;
        var applyStartDate = $("#applyStartDate").val();
        var applyEndDate = $("#applyEndDate").val();
        var applyEndTime = $("#applyEndTime").val();
        var applyStartTime = $("#applyStartTime").val();
        var personId = $("#personId").val();
        var id = $("#id").val();
        // var type = $("#restType").val();//请假类型
        var typeName = $("#restType").find("option:selected").text(); //请假类型
        applyStartDate = applyStartDate + " " + applyStartTime;
        applyEndDate = applyEndDate + " " + applyEndTime;
        queryBussDuplicateList(applyStartDate, applyEndDate, personId, id);
        var conditionMap = {};
        var applyId = $("#id").val();
        if (businessId == undefined || businessId == '' || businessId == null) {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val()
            };
        } else {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val(),
                "update": "update",
                "applyId": applyId
            };
        }

        $.ajax({
            url: hostUrl + "kq/hrKqRest/queryDuplicateList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(conditionMap),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    var applyRegulars = "";
                    var falseFlag = 0;
                    if (applyRegular != null && applyRegular != "") {
                        applyRegulars = applyRegular.split(",");
                        if (annualRemainDays > 0 && contains(applyRegulars, "4") == true && typeName == "事假") {//年假有剩余时不可申请事假
                            pop_tip_open("red", "年假有剩余时不可申请事假");
                            falseFlag++;
                            return;
                        }

                        if (annualRemainDays > 0 && contains(applyRegulars, "5") == true && typeName == "病假") {//年假有剩余时不可申请病假
                            pop_tip_open("red", "年假有剩余时不可申请病假");
                            falseFlag++;
                            return;
                        }
                    }

                    if (annualRemainDays == 0 && typeName == "年假") {//年假剩余天数为0不可申请年假
                        pop_tip_open("red", "您的年假天数已用完！");
                        falseFlag++;
                        return;
                    }

                    /*  if (!startFlag) {
                     pop_tip_open("red", "开始时间不是工作日，请重新选择!");
                     return;
                     }

                     if (!endFlag) {
                     pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                     return;
                     }*/


                    if (falseFlag == 0) {
                        if (count == false) {
                            pop_tip_open("red", "当前时间段已有出差申请记录，不允许请假！");
                            duplicateFlag = false;
                        } else if (result.length > 0) {
                            pop_tip_open("red", "当前时间段已有请假记录，请重新选择开始结束日期！");
                            duplicateFlag = false;
                        } else {
                            duplicateFlag = true;
                        }
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return duplicateFlag;
    }

    /**
     * 修改附件
     * @param businessId 业务单据id
     */
    window.editAttach = function (businessId) {
        $('.attachment-container').xljAttachment({
            appId: 'HR',
            businessId: businessId,
            categoryId: ATTACH_TYPE_KQQJ,
            mode: 'edit',
            serverAddr: ATTACH_SERVERADDR
        });
    };
    var count = true;

    window.queryBussDuplicateList = function (applyStartDate, applyEndDate, personId, id) {
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryDuplicateList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": personId,
                "update": "update",
                "id": id
            }),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    count = result.length <= 0;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    /**
     *根据id查询请假申请信息
     */
    function getKqRestInfoById(businessId) {
        $.ajax({
            url: hostUrl + "kq/hrKqRest/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"businessId": businessId}),
            success: function (data) {
                if (data.success) {
                    var result = data.result.list;
                    if (result != null && result.length > 0) {
                        $("#id").val(result[0].id);//添加id赋值用来 过滤此表单的已有出差记录的校验  add by tangsq since 20180611

                        $("#topicName").val(result[0].topicName);
                        $("#phone").val(result[0].phone);
                        $("#businessId").val(result[0].businessId);
                        var approvalStatusValue = result[0].approvalStatusValue;
                        var approvalStatus = result[0].approvalStatus;
                        $("#approvalStatus").val(approvalStatus);
                        $("#approvalStatusValue").val(approvalStatusValue);

                        //基本信息回显
                        $("#personId").val(result[0].personId);
                        $("#personName").val(result[0].personName);
                        $("#applicant").val(result[0].applicant);
                        $("#applicantName").val(result[0].personName);

                        $("#applyRestDays").val(result[0].applyRestDays);
                        var applyStartDate = result[0].applyStartDate;
                        var applyEndDate = result[0].applyEndDate;
                        $("#applyStartDate").val(new Date(changeTimeStyle(applyStartDate)).format("yyyy-MM-dd"));
                        $("#applyEndDate").val(new Date(changeTimeStyle(applyEndDate)).format("yyyy-MM-dd"));
                        $("#applyStartTime option[value='" + applyStartDate.substring(11, 16) + "']").attr("selected", true);
                        $("#applyEndTime option[value='" + applyEndDate.substring(11, 16) + "']").attr("selected", true);
                        // alert(applyStartDate.substring(11, 16));
                        $("#reason").val(result[0].reason);

                        restTypeForUpdate = result[0].restType;
                        $("#destroyStatus").val(result[0].destroyStatus);

                        var restTypeName = result[0].restTypeName;
                        if (restTypeName === "探亲假" || restTypeName === "外籍探亲假") {//手动探亲假需要将请假天数改为输入
                            $("#applyRestDays").css("background-color", "#ffffff");
                            $("#applyRestDays").css("cursor", "auto");
                            $("#applyRestDays").removeAttr("readonly");
                            $("#applyRestDays").removeAttr("unselectable");
                        } else {
                            $("#applyRestDays").css("background-color", "#eaeaea");
                            $("#applyRestDays").css("cursor", "not-allowed");
                            $("#applyRestDays").attr("readonly", "true");
                            $("#applyRestDays").attr("unselectable", "on");
                        }

                        if (restTypeName === "年假") {
                            var start_year = parseInt(new Date(changeTimeStyle(applyStartDate)).getFullYear());
                            var end_year = parseInt(new Date(changeTimeStyle(applyEndDate)).getFullYear());
                            $("#annualYear").val(end_year);
                            $("#annualYear").change();
                        }

                        applyId = result[0].applyId;
                        $("#applyId").val(applyId);

                        annualRemainDaysForForm = result[0].annualRemainDays;
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
     * 获取申请单信息
     *修改,回显数据
     */
    window.getSysApplyById = function (applyId) {
        var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#sysApplyFrom").find("input[name='id']").val(data.result.id);
                $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
                $("#sysApplyFrom").find("input[name='code']").val(data.result.code);
                //用户的信息
                //制单人
                $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
                $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
                //经办人
                $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
                $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

                $("#companyId").val(data.result.companyId);
                $("#companyName").val(data.result.companyName);

                // $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
                $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
                getDirectDeptAnaDirectComByUser(data.result.deptId);
                // var deptId = $("#deptId");
                // //先清空
                // deptId.empty();
                // deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                $("#sysApplyFrom").find("input[name='applyDate']").val(changeTimeStyle(data.result.applyDate).format("yyyy-MM-dd"));
                var status = data.result.status;
                $("#sysApplyFrom").find("input[name='status']").val(status);
                //isBtnShow2Hide();
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
                // $("#sysApplyFrom").find("input[name='approvalDate']").val(data.result.approvalDate);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化申请单信息失败");
            }
        })
    };

    /**
     * 根据假期类别名称查询信息
     */
    window.queryAnnualTypeInfo = function (name) {
        $.ajax({
            url: hostUrl + "kq/hrKqHolidaytypeSetting/queryListByCondition",
            type: "post",
            data: JSON.stringify({"name": name}),
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    typeStatus = result[0].status;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };


    /**
     *年假校验
     */
    window.annualCheck = function () {
        var restType = $("#restType").find("option:selected").text();
        if (restType === "年假") {
            var a = document.getElementById("restType");
            if (annualInfo.length <= 0) {
                pop_tip_open("red", "没有查询到您" + nowAnualYear + "年的年假信息，请选择其他类型假期！");
                if (a.options[0].innerText !== "年假") {
                    a.options[0].selected = true;//默认选中第一个
                    $("#annualRemainDaysS").empty();
                } else {
                    a.options[1].selected = true;//默认选中第二个
                    $("#annualRemainDaysS").empty();
                }
                return;
            }
            var applyRestDays = $("#applyRestDays").val();
            if (annualInfo.length > 0) {
                annualRemainDays = annualInfo[0].annualRemainDays;
                $("#annualRemainDaysS").empty();
                $("#annualRemainDaysS").append("年假剩余" + annualRemainDays + "天");
                if (annualRemainDays <= 0) {
                    if (a.options[0].innerText !== "年假") {
                        a.options[0].selected = true;//默认选中第一个
                        $("#annualRemainDaysS").empty();
                    } else {
                        if (a.options.length >= 1) {
                            a.options[1].selected = true;//默认选中第二个
                            $("#annualRemainDaysS").empty();
                        } else {
                            $("#applyStartDate").val("");
                            $("#applyEndDate").val("");
                        }
                    }
                    pop_tip_open("red", "您" + nowAnualYear + "年的年假剩余天数是0，不能申请年假");

                } else if (annualRemainDays >= 0) {
                    if (applyRestDays > annualRemainDays) {
                        pop_tip_open("red", "您" + nowAnualYear + "年的年假仅剩" + annualRemainDays + "天，请重新选择开始结束日期");
                        $("#applyStartDate").val("");
                        $("#applyEndDate").val("");
                        $("#applyRestDays").val(0);
                    }
                }
            }
        } else {
            $("#annualRemainDaysS").empty();
        }
    };

    window.annualCheck2 = function () {
        var applyRestDays = $("#applyRestDays").val();
        var restType = $("#restType").find("option:selected").text();
        if (restType == "年假") {
            if (annualRemainDays < applyRestDays) {
                pop_tip_open("red", "您的年假天数仅剩" + annualRemainDays + "天，请调整时间或选择其他类型假期");
            }
        }
    };
    /**
     * 查询员工个人的年假信息
     */
    window.queryAnnualInfoById = function () {
        var personId = $("#personId").val();
        var annualYear = $("#annualYear").val();
        $.ajax({
            url: hostUrl + "kq/hrKqAnnual/queryAnnualDays",
            type: "post",
            data: JSON.stringify({"personId": personId, "annualYear": annualYear}),
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    annualInfo = data.result.list;
                    nowAnualYear = annualYear;
                    if (annualInfo.length > 0) {
                        $("#annualRemainDays").val(annualInfo[0].annualRemainDays);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return annualInfo;
    };

    /**
     * 查询年假公式--年假限制设置
     */
    window.queryAnnualFormula = function () {
        $.ajax({
            url: hostUrl + "kq/hrAnnualFormula/queryLatelyInfo",
            type: "post",
            data: "{}",
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    if (result.length > 0) {
                        applyRegular = result[0].applyRegular;
                        var applyRegulars = applyRegular.split(",");
                        if (contains(applyRegulars, "4") == true) {//年假有剩余时不可申请事假

                        }
                        if (contains(applyRegulars, "5") == true) {//年假有剩余时不可申请病假

                        }
                    } else {
                        applyRegular = null;
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
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

    /**
     * 刷新父页面表格数据
     */
    window.refreshParent = function (editId) {
        window.opener.jqGridKqRest.jqGrid().trigger("reloadGrid");
        if (editId != null && editId != "") {
            window.opener.focusIdCallBack(editId);
        }
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

    /**
     * 根据平台账户获取人力系统用户信息
     * @param account  平台账户
     */
    function getHRUserInfo(account) {
        var flag = false;//标志hr系统是否有当前人
        $.ajax({
            url: hostUrl + "emp/empPersonInfo/getHREmpInfoByAccount2",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"account": account}),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    if (result != null) {
                        flag = true;
                        var personId = result.id;
                        $('#personId').val(personId);
                        $('#orgId').val(result.orgId);
                        $("#personName").val(result.name);
                        $("#phone").val(result.phone);
                        var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                        $("#hrDeptId").val(result.deptId);
                        $("#hrDeptName").val(deptName);
                        $("#postName").val(result.postName);
                        var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                        $("#headshipRank").val(headshipRank);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return flag;
    }

    /**
     * 根据用户获取其所有组织的顶级部门和顶级公司
     * @param deptId1 修改时指定选择的值
     */
    window.getDirectDeptAnaDirectComByUser = function (deptId1) {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: hostUrl + "sys/sysApply/getDirectDeptAnaDirectComByUser",
            type: 'POST',
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        var data = xhr.result;
                        console.log(data);
                        //赋值所属机构下拉
                        //部门公司映射
                        deptComList = data;
                        var deptId = $("#deptId");
                        //先清空
                        deptId.empty();

                        //遍历机构信息
                        $.each(data, function (n, value) {
                            deptId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
                        });
                        //修改页面指定回显
                        if (deptId1 != undefined && deptId1 != null && deptId1 != '') {
                            //赋值
                            deptId.val(deptId1);
                        }
                        //联动所属公司
                        changeCompanyByDeptId();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.message);
                            return;
                        }
                        $.xljUtils.tip("red", "获取直属部门和公司失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    //新增页面
    $("#deptId").change(function () {
        changeCompanyByDeptId();
    });
    /**
     * 根据机构改变公司
     */
    window.changeCompanyByDeptId = function () {
        //当前机构的默认值
        var deptId = $("#deptId").val();
        // alert("现在的机构ID是======"+deptId);
        $.each(deptComList, function (n, value) {
            //直属
            if (value.directDeptId == deptId) {
                // $('#deptName').val(value.directDeptName);
                $('#deptName').val(value.directDeptAllName);
                $('#companyId').val(value.directCompId);
                $('#companyName').val(value.directCompName);
            }
        });
    };

    //针对IE进行时间转换
    window.changeTimeStyle = function (bTime) {
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        return new Date(bTime);
    };

    /**
     * 计算工作日天数
     * @return {string}
     */
    window.calculateWorkDays = function () {
        var msg = "";
        var personId = $("#personId").val();
        var startDate = $("#applyStartDate").val();
        var endDate = $("#applyEndDate").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndTime = $("#applyEndTime").val();

        if (personId !== null && personId !== "" && isNaN(startDate) && isNaN(endDate)) {
            if (startDate > endDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                $("#applyStartDate").val("");
                $("#applyEndDate").val("");
                return;
            }
            msg = getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime);
        } else {
            $("#applyRestDays").val(0);
        }
        return msg;
    };

    /**
     *工作日请假天数计算
     */
    window.getWorkDays = function (personId, startDate, endDate, applyStartTime, applyEndTime) {
        var msg = "";
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
                "startDate": startDate,
                "endDate": endDate,
                "applyStartTime": applyStartTime,
                "applyEndTime": applyEndTime
            }),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    var resultList = result["list"];
                    var sum = result["sum"];
                    var ss = startDate.substring(0, 10);
                    var ifPlanSet = result["ifPlanSet"];
                    if (ifPlanSet == false) {
                        msg = "请先设置考勤方案!";
                        pop_tip_open("red", msg);
                        $("#applyRestDays").val(0);
                        $("#applyStartDate").val("");
                        $("#applyEndDate").val("");
                        return;
                    }
                    if (!contains(resultList, startDate.substring(0, 10))) {
                        msg = "开始时间不是工作日，请重新选择!";
                        pop_tip_open("red", "开始时间不是工作日，请重新选择!");
                        $("#applyRestDays").val(0);
                        $("#applyStartDate").val("");
                        return;
                    }
                    if (!contains(resultList, endDate.substring(0, 10))) {
                        msg = "结束时间不是工作日，请重新选择!";
                        pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                        $("#applyRestDays").val(0);
                        $("#applyEndDate").val("");
                        return;
                    }
                    $("#applyRestDays").val(sum);

                } else {
                    pop_tip_open("red", data.message);
                    $("#applyRestDays").val(0);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                msg = "服务异常,请联系管理员！";
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return msg;
    };

    /**
     * 计算请假天数
     */
    window.calculateRestDays2 = function () {
        var msg = "";
        var restType = $("#restType").val();
        // var restType = $("#restType").find("option:selected").text();
        var result = restTypeList[restType];
        var restTypeName = result.name;
        if (restTypeName === "探亲假" || restTypeName === "外籍探亲假") {//手动探亲假需要将请假天数改为输入
            $("#applyRestDays").css("background-color", "#ffffff");
            $("#applyRestDays").css("cursor", "auto");
            $("#applyRestDays").removeAttr("readonly");
            $("#applyRestDays").removeAttr("unselectable");
        } else {
            $("#applyRestDays").css("background-color", "#eaeaea");
            $("#applyRestDays").css("cursor", "not-allowed");
            $("#applyRestDays").attr("readonly", "true");
            $("#applyRestDays").attr("unselectable", "on");
        }
        var calculateRule = result.calculateRule;//1088100158  工作日  1088100159 自然日
        if (!isNaN(applyStartDate) && !isNaN(applyEndDate)) {
        }
        if (calculateRule == "1088100158") {
            msg = calculateWorkDays();
        } else if (calculateRule == "1088100159") {
            getWorkDays2();
        }
        var applyEndTime = $("#applyEndTime").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndDate = $("#applyEndDate").val();
        var applyStartDate = $("#applyStartDate").val();

        if (new Date(applyStartDate.replace(/-/g, '/')).getTime() > new Date(applyEndDate.replace(/-/g, '/')).getTime()) {
            $("#applyEndDate").val(null);
            $("#applyStartDate").val(null);
            pop_tip_open("red", "开始时间不能大于结束时间！");
            return;
        }

        applyEndDate = applyEndDate + " " + applyEndTime;
        applyStartDate = applyStartDate + " " + applyStartTime;
        applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        if (!isNaN(applyStartDate) && !isNaN(applyEndDate)) {
            if (applyStartDate > applyEndDate) {
                var start = document.getElementById("applyStartTime");
                start.options[0].selected = true;//默认选中第一个

                var end = document.getElementById("applyEndTime");
                end.options[0].selected = true;//默认选中第一个

                pop_tip_open("red", "开始时间不能大于结束时间！");
                return;
            }

            var startYear = parseInt(new Date(applyStartDate).getFullYear());
            var endYear = parseInt(new Date(applyEndDate).getFullYear());
            var nowApplyYear = $("#nowApplyYear").val();

            if (startYear === endYear && startYear !== nowApplyYear) {//开始和结束时间的年度一致才修改当前请假申请年度
                $("#nowApplyYear").val(startYear);
                var data = {
                    "year": startYear
                };
                jQuery("#listRest").jqGrid("setGridParam", {postData: data}).trigger("reloadGrid");
            }
        }
        if (restTypeName === "年假") {
            if (!isNaN(applyStartDate) && !isNaN(applyEndDate)) {
                var start_year = parseInt(new Date(applyStartDate).getFullYear());
                var end_year = parseInt(new Date(applyEndDate).getFullYear());
                var annualYear = $("#annualYear").val();
                if (end_year !== start_year) {//跨年请假
                    pop_tip_open("red", "不允许跨年申请年假！");
                    $("#applyEndDate").val("");
                    $("#applyRestDays").val(0);

                    return;
                } else if (start_year !== annualYear) {
                    $("#annualYear").val(start_year);
                    $("#annualYear").change();
                }
            }
            annualRemainDaysShow();
            annualCheck();
        } else {
            $("#annualRemainDaysS").empty();
        }

        return msg;
    };

    /**
     * 自然日请假天数计算：不管排班
     */
    window.getWorkDays2 = function () {
        var startDate = $("#applyStartDate").val();
        var endDate = $("#applyEndDate").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndTime = $("#applyEndTime").val();

        var days = 0;

        if (isNaN(startDate) && isNaN(endDate)) {
            days = getDateDiff(startDate, endDate) + 1;
        }
        if ((applyStartTime === "09:00" && applyEndTime === "12:00") || (applyStartTime === "13:30" && applyEndTime === "18:00")) {//请半天
            days = days - 0.5;
            if (days < 0) {
                days = 0;
            }
        } else if (applyStartTime === "13:30" && applyEndTime === "12:00") {
            days = days - 1;
            if (days < 0) {
                days = 0;
            }
        }
        $("#applyRestDays").val(days);
    };

    function getDateDiff(date1, date2) {
        var sArr = date1.replace(/-/g, "/");
        var eArr = date2.replace(/-/g, "/");
        var sRDate = new Date(sArr);
        var eRDate = new Date(eArr);
        var days = eRDate.getTime() - sRDate.getTime();
        var result = parseInt(days / (24 * 60 * 60 * 1000));
        // return Math.abs(result);
        return Math.abs(result);
    }

    /**
     * 个人年度请假信息
     * */
    window.restInit = function () {
        var personId = $("#personId").val();
        if (personId === null || personId === "") {
            personId = "null-";//避免人员id获取不到时查到所有人的数据
        }
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var ubody = "kq/hrKqRest/queryPerApplyList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridKqRest = jQuery("#listRest").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: {"personId": personId, "year": year, "approvalStatus": $.hrUtils.APPLY_PASS},
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    // repeatitems: false
                    root: "result"
                },
                colModel: [
                    // {name: 'id', label: "序号", width: 48, align: "center"},
                    {name: 'topicName', label: "主题", width: 93, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {
                        name: 'restTypeName',
                        label: "请假类型",
                        width: 100,
                        align: "center"
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
                rowNum: -1,//一页显示多少条
                // rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                    console.log(data);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    };

    //字符串截取：yyyy-MM-dd hh:mm
    function dateFormatter(cellValue, options, rowObjec) {
        if (cellValue == null || cellValue == "") {
            return "";
        } else {
            return cellValue.substring(0, 16);
        }
    }

    /**
     * 校验
     * @returns {*}
     */
    window.check = function () {
        $.xljUtils.customSingleValidate("#sysApplyFrom");
        var validRet = $("#sysApplyFrom").valid();
        //如果校验没有通过
        if (!validRet) {
            return validRet;
        }
        var passFlag = false;//是否校验成功并成功保存（用于发起审批时首先保存数据）：true为通过 false为不通过
        var duplicateFlag = checkIfDuplicate();//校验
        annualCheck();
        if (duplicateFlag != null && (duplicateFlag == "true" || duplicateFlag == true)) {//不重复，校验通过
            var flag = $("td").hasClass("has-error");
            if (flag == false) {
                passFlag = true;
            }
        }
        return passFlag;
    }
})(jQuery, window, document);