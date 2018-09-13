//todo 调定薪js

;(function ($, window, document, undefined) {

    var goBackHtml;//跳转页面

    var jqGridHistory;//调薪历史grid

    //审批单ID
    var applicationUUID;

    //接收传过来的三个参数值
    var personId = $.xljUtils.getUrlParam('personId');
    var id = $.xljUtils.getUrlParam('id');
    var businessId = $.xljUtils.getUrlParam('businessId');

    /* if (personId && personId != undefined && personId != 'undefined' && personId != null) {
     personId = JSON.parse(personId);
     } else{
     personId = '';
     }
     if (id && id != undefined && id != 'undefined' && id != null) {
     id = JSON.parse(id);
     } else {
     id = '';
     }*/
    /* if (businessId && businessId != undefined && businessId != 'undefined' && businessId != null) {
     businessId = JSON.parse(businessId);
     }else {
     businessId = '';
     }*/


    //手动的调整窗口时,grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        // resizeGrid();
    });

    var itemEnable = [];//页面中展示的所有项目

    //计算表格高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".row .modal-body").height(w_h - 80);
        $(".row .modal-body").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $("#courseware .ui-jqgrid-bdiv table").jqGrid().setGridWidth($('#courseware .mytable').width() - 15, true);
        $("#paper .ui-jqgrid-bdiv table").jqGrid().setGridWidth($('#paper .mytable').width() - 15, true);

        $.xljUtils.gridResizeFn();
    };


    $(function () {
        var tempGoBackHtml = localStorage.getItem('goBackHtml');
        if (tempGoBackHtml && tempGoBackHtml != undefined && tempGoBackHtml != 'undefined' && tempGoBackHtml != null) {
            goBackHtml = JSON.parse(tempGoBackHtml);
        }
        queryAuth();//数据权限
        resizeHeight();//初始化高度

        if (businessId != '' && businessId != null && businessId != undefined) {
            initAdjustFormByEdit();
            $("#isedit").val("1");//如果这样则为修改操作
        } else {
            //新增页面显示选择人员按钮空间
            $("#selectPersonRemove").show();//删除人员
            $("#selectPerson").show();//删除人员

            //初始化调薪表单
            initAdjustForm();
        }


        initDatetimepicker();//初始化日期空间
        // $("#saveAdjustBtn").unbind('click').on('click', function () {
        //     $("#adjustFrom").attr("data-validate-success","" );//校验
        /// var data =  ehrApplyData();
        //     return data;
        // });

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        resizeGrid();
    });

    //查询用户功能权限
    window.queryAuth = function () {
        $.ajax({
            type: 'POST',
            url: hostUrl + "auth/authData/queryAuthorizationBtnList",
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,//设置为同步
            data: JSON.stringify({"menuCode": "hr_salary"}),
            success: function (json) {
                var list = json.result;
                if (list != null && list.length > 0) {
                    $.each(list, function (index, value) {
                        for (var key in value) {
                            if (key == "code" && value[key] == "2") {//编辑权限
                                $("#applyBtn").show();//  提交审批
                                $("#saveAdjustBtn").show();//  暂存
                            }
                        }
                    });
                }
            },
            error: function () {
            }
        });
    };

    //初始化拼接调定薪表单，以及历史表头
    window.initAdjustForm = function () {
        var urlBody = "wage/wageAdjustInfo/querySalaryItem";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({}),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    //初始化表单上方表单数据
                    itemEnable = [];
                    itemEnable = json.result.itemEnable;
                    if (undefined != itemEnable && "" != itemEnable) {
                        var wageAdjustVal = "";
                        for (var i = 0; i < itemEnable.length; i++) {
                            var item = itemEnable[i];
                            wageAdjustVal = wageAdjustVal +
                                "<tr class=\"form-tr\"><td class=\"form-label\"><label>当前" + item.name + "</label></td><td>" +
                                "<input type=\"number\"class=\"form-control addInputWidth\" id=\"before_" + item.code + "\" name=\"before_" + item.code + "\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                                "<td class=\"form-label\"><label>调整后" + item.name + "</label></td><td>" +
                                "<input type=\"number\" onchange=\"sumAfter()\" class=\"form-control addInputWidth\" id=\"after_" + item.code + "\" value=\"0\" name=\"after_" + item.code + "\" valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td></tr>";
                        }
                        wageAdjustVal = wageAdjustVal +
                            "<tr class=\"form-tr\">\<td class=\"form-label\" style=\"width:19%\"><label>调整前工资合计</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"before_wage_sum\" name=\"before_wage_sum\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                            "<td class=\"form-label\" style=\"width:19%\"><label>调整后工资合计</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"after_wage_sum\" name=\"after_wage_sum\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td></tr>" +
                            "<tr class=\"form-tr\">\<td class=\"form-label\"><label>调整幅度(%)</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"adjust_rose\" name=\"adjust_rose\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                            "<td class=\"form-label\"><label><span class=\"req_f\"></span>调整生效时间</label></td>" +
                            "<td>" +
                            "<div class=\"input-group date datetimepicker2\" id=\"datetimepicker\" data-required=\"true\"  style=\"width: 94%\">" +
                            "<input id=\"adjust_take_time\" name=\"adjust_take_time\" type=\"text\" class=\"form-control\" readonly data-required=\"true\" data-placeholder=\"生效时间\" valueType=\"Timestamp\" isData=\"true\" isFlowVar=\"true\">" +
                            "<div class=\"input-group-addon\">" +
                            "<a class=\"glyphicon glyphicon-remove\" onclick=\"emptyDateObject()\"></a></div>" +
                            "<span class=\"input-group-addon \">" +
                            "<span class=\"glyphicon glyphicon-calendar addLeft\"></span>" +
                            "</span></div>" +
                            "</tr>" +
                            "<tr class=\"form-tr\"><td class=\"form-label\"><label>调整原因</label></td>\<td colspan=\"3\">" +
                            "<input type=\"text\"class=\"form-control addInputWidth\" id=\"remark\" name=\"remark\" valueType=\"str\" isData=\"true\" isFlowVar=\"true\"></td></tr>";
                        $("#adjustTable").append(wageAdjustVal);
                    }

                    //初始化表单下方历史调整列表数据
                    var itemAll = json.result.queryShowList;
                    var itemListShow = [];
                    var itemListValShow = [];
                    itemListShow.push("id");
                    itemListShow.push("personId");
                    itemListValShow.push({name: 'id', label: 'id', editable: false, hidden: true, key: true});
                    itemListValShow.push({name: 'personId', label: 'personId', editable: true, hidden: true});
                    for (var k in itemAll[0]) {
                        itemListShow.push("调整后" + itemAll[0][k]);
                        itemListValShow.push({
                            name: "after_" + k,
                            label: "调整后" + itemAll[0][k],
                            editable: false,
                            sortable: false,
                            align: 'center',
                            width: 150
                        });
                    }
                    itemListShow.push("调整涨幅");
                    itemListShow.push("调整生效时间");
                    itemListShow.push("调整原因");
                    itemListValShow.push({
                        name: "adjust_rose",
                        label: "调整幅度(%)",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 150
                    });
                    itemListValShow.push({
                        name: "adjust_take_time",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        label: "调整生效时间",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 150
                    });
                    itemListValShow.push({
                        name: "remark",
                        label: "调整原因",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 250
                    });
                    jqGridHistory = jQuery("#salaryHistoryList").jqGrid(
                        {
                            mtype: "POST",
                            datatype: "json",
                            colNames: itemListShow,
                            colModel: itemListValShow,
                            rowNum: -1,//一页显示多少条 -1全部
                            autowidth: true,
                            shrinkToFit: true,//缩小适应，避免出现横向滚动条
                            multiselect: false,
                            multiboxonly: false,//只能通过复选框进行多选
                            gridComplete: function () {
                                $.xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                            }
                        });
                } else {
                    pop_tip_open("blue", json.message);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化失败");
            }
        })
    };

    //修改进入
    window.initAdjustFormByEdit = function () {
        var urlBody = "wage/wageAdjustInfo/adjustInfoCheck";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            url: urlAll,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({"personId": personId, "id": id, "businessId": businessId}),

            success: function (json) {
                if (json.success == true) {
                    //初始化表单上方表单数据
                    var itemEnable = [];
                    itemEnable = json.result.itemEnable;
                    if (undefined != itemEnable && "" != itemEnable) {
                        var wageAdjustVal = "";
                        for (var i = 0; i < itemEnable.length; i++) {
                            var item = itemEnable[i];
                            wageAdjustVal = wageAdjustVal +
                                "<tr class=\"form-tr\"><td class=\"form-label\"><label>当前" + item.name + "</label></td><td>" +
                                "<input type=\"number\"class=\"form-control addInputWidth\" id=\"before_" + item.code + "\" name=\"before_" + item.code + "\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                                "<td class=\"form-label\"><label>调整后" + item.name + "</label></td><td>" +
                                "<input type=\"number\" onchange=\"sumAfter()\"  class=\"form-control addInputWidth\" id=\"after_" + item.code + "\" value=\"0\" name=\"after_" + item.code + "\" valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\" ></td></tr>";
                        }
                        wageAdjustVal = wageAdjustVal +
                            "<tr class=\"form-tr\">\<td class=\"form-label\"><label>调整前工资合计</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"before_wage_sum\" name=\"before_wage_sum\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                            "<td class=\"form-label\"><label>调整后工资合计</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"after_wage_sum\" name=\"after_wage_sum\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td></tr>" +
                            "<tr class=\"form-tr\">\<td class=\"form-label\"><label>调整幅度(%)</label></td>" +
                            "<td><input type=\"number\"class=\"form-control addInputWidth\" id=\"adjust_rose\" name=\"adjust_rose\" value=\"0\" readonly valueType=\"BigDecimal\" isData=\"true\" isFlowVar=\"true\"></td>" +
                            "<td class=\"form-label\"><label><span class=\"req_f\"></span>调整生效时间</label></td>" +
                            "<td>" +
                            "<div class=\"input-group date datetimepicker2\" id=\"datetimepicker\" data-required=\"true\"  style=\"width: 94%\">" +
                            "<input id=\"adjust_take_time\" name=\"adjust_take_time\" type=\"text\" class=\"form-control\" readonly data-required=\"true\" data-placeholder=\"生效时间\" valueType=\"Timestamp\" isData=\"true\" isFlowVar=\"true\">" +
                            "<div class=\"input-group-addon\">" +
                            "<a class=\"glyphicon glyphicon-remove\" onclick=\"emptyDateObject()\"></a></div>" +
                            "<span class=\"input-group-addon \">" +
                            "<span class=\"glyphicon glyphicon-calendar addLeft\"></span>" +
                            "</span></div>" +
                            "</tr>" +
                            "<tr class=\"form-tr\"><td class=\"form-label\"><label>调整原因</label></td>\<td colspan=\"3\">" +
                            "<input type=\"text\"class=\"form-control addInputWidth\" id=\"remark\" name=\"remark\" valueType=\"str\" isData=\"true\" isFlowVar=\"true\"></td></tr>";
                        $("#adjustTable").append(wageAdjustVal);
                    }
                    //初始化表单下方历史调整列表数据
                    var itemAll = json.result.queryShowList;
                    var itemListShow = [];
                    var itemListValShow = [];
                    itemListShow.push("id");
                    itemListShow.push("personId");
                    itemListValShow.push({name: 'id', label: 'id', editable: false, hidden: true, key: true});
                    itemListValShow.push({name: 'personId', label: 'personId', editable: true, hidden: true});
                    for (var k in itemAll[0]) {
                        itemListShow.push("调整后" + itemAll[0][k]);
                        itemListValShow.push({
                            name: "after_" + k,
                            label: "调整后" + itemAll[0][k],
                            editable: false,
                            sortable: false,
                            align: 'center',
                            width: 150
                        });
                    }
                    itemListShow.push("调整涨幅");
                    itemListShow.push("调整生效时间");
                    itemListShow.push("调整原因");
                    itemListValShow.push({
                        name: "adjust_rose",
                        label: "调整幅度(%)",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 150
                    });
                    itemListValShow.push({
                        name: "adjust_take_time",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        label: "调整生效时间",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 150
                    });
                    itemListValShow.push({
                        name: "remark",
                        label: "调整原因",
                        editable: false,
                        sortable: false,
                        align: 'center',
                        width: 250
                    });
                    jqGridHistory = jQuery("#salaryHistoryList").jqGrid(
                        {
                            mtype: "POST",
                            datatype: "json",
                            colNames: itemListShow,
                            colModel: itemListValShow,
                            rowNum: -1,//一页显示多少条 -1全部
                            autowidth: true,
                            shrinkToFit: true,//缩小适应，避免出现横向滚动条
                            multiselect: false,
                            multiboxonly: false,//只能通过复选框进行多选
                            gridComplete: function () {
                                $.xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                            }
                        });

                    //面板数据填充
                    var adjustInfo = json.result.hold;
                    if (adjustInfo != undefined && adjustInfo != null) {

                        $("#businessId").val(adjustInfo.businessId);//流程ID
                        $("#approvalStatus").val(adjustInfo.approvalStatus);//流程状态
                        $("#id").val(adjustInfo.id);
                        $('#personId').val(adjustInfo.personId);

                        $("#personName").val(adjustInfo.realName);
                        $("#deptName").val(adjustInfo.prefixName);
                        $("#before_wage_sum").val(adjustInfo.before_wage_sum);
                        $("#after_wage_sum").val(adjustInfo.after_wage_sum);
                        $("#remark").val(adjustInfo.remark);
                        $("#adjust_rose").val(adjustInfo.adjust_rose);
                        $("#adjust_take_time").val(adjustInfo.adjust_take_time.substr(0, 10));
                        $("#topicName").val(adjustInfo.topicName);
                        if (document.getElementById("before_base_pay")) {
                            $("#before_base_pay").val(adjustInfo.before_base_pay);
                        }
                        if (document.getElementById("after_base_pay")) {
                            $("#after_base_pay").val(adjustInfo.after_base_pay);
                        }
                        if (document.getElementById("before_job_subsidies")) {
                            $("#before_job_subsidies").val(adjustInfo.before_job_subsidies);
                        }
                        if (document.getElementById("after_job_subsidies")) {
                            $("#after_job_subsidies").val(adjustInfo.after_job_subsidies);
                        }
                        if (document.getElementById("before_fixed_item1")) {
                            $("#before_fixed_item1").val(adjustInfo.before_fixed_item1);
                        }
                        if (document.getElementById("after_fixed_item1")) {
                            $("#after_fixed_item1").val(adjustInfo.after_fixed_item1);
                        }
                        if (document.getElementById("before_fixed_item2")) {
                            $("#before_fixed_item2").val(adjustInfo.before_fixed_item2);
                        }
                        if (document.getElementById("after_fixed_item2")) {
                            $("#after_fixed_item2").val(adjustInfo.after_fixed_item2);
                        }
                        if (document.getElementById("before_security_benefits")) {
                            $("#before_security_benefits").val(adjustInfo.before_security_benefits);
                        }
                        if (document.getElementById("after_security_benefits")) {
                            $("#after_security_benefits").val(adjustInfo.after_security_benefits);
                        }
                    }

                    //历史表格数据填充
                    var hisotryList = json.result.hisotryList;
                    if (hisotryList != undefined && hisotryList != null && hisotryList.length > 0) {
                        for (var i = 0; i <= hisotryList.length; i++) {
                            jQuery("#salaryHistoryList").jqGrid('addRowData', i + 1, hisotryList[i]);
                        }
                    }
                } else {
                    pop_tip_open("blue", json.message);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化失败");
            }
        })
    };

    //清空相关信息
    window.clearForm = function () {
        $("#isedit").val("0");//如果这样则为修改操作
        //清空主题
        $("#topicName").val("");
        //清空调定薪人员
        $("#personName").val("");
        $("#personId").val("");
        //清空部门
        $("#deptName").val("");
        //清空调整前工资合计
        $("#before_wage_sum").val("");
        //清空调整后工资合计
        $("#after_wage_sum").val("");
        //清空调整幅度
        $("#adjust_rose").val("");
        //清空调整生效时间
        $("#adjust_take_time").val("");
        //清空调整原因
        $("#remark").val("");
        //清空其他相关
        if (itemEnable != null && itemEnable.length > 0) {
            for (var i = 0; i < itemEnable.length; i++) {
                var item = itemEnable[i];
                $("#before_" + item.code).val("");//清空调整前固定薪资项
                $("#after_" + item.code).val("");//清空调整后固定薪资项项
            }
        }
        //清空历史表数据
        jQuery("#salaryHistoryList").jqGrid("clearGridData");
    };

    //更换人员信息后，初始化相关数据信息
    window.userCallback = function (data, success) {
        clearForm();//清除相关信息
        //经办人
        var userId = data.id;
        //根据人员ID查询相关数据
        $.ajax({
            url: hostUrl + 'wage/wageAdjustInfo/queryAdjustHistory',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({"personId": userId}),
            async: false,
            success: function (json) {
                if (json.success == true) {
                /*
                     //查看是否存在草稿或者是审批中相关数据
                     var tempResult = json.result;
                     if (tempResult != null) {
                     var adjustInfo = tempResult.hold;

                     var objKeys = Object.keys(adjustInfo);

                     //当前非审批完成的最新记录
                     if (adjustInfo != undefined && adjustInfo != null && objKeys.length > 0) {

                     //修改提交
                     $("#isedit").val("1");//如果这样则为修改操作

                     $("#id").val(adjustInfo.id);
                     $("#businessId").val(adjustInfo.businessId);//流程ID
                     $('#personId').val(adjustInfo.personId);

                     $("#personName").val(adjustInfo.realName);
                     $("#deptName").val(adjustInfo.prefixName);
                     $("#before_wage_sum").val(adjustInfo.before_wage_sum);
                     $("#after_wage_sum").val(adjustInfo.after_wage_sum);
                     $("#remark").val(adjustInfo.remark);
                     $("#adjust_rose").val(adjustInfo.adjust_rose);
                     $("#adjust_take_time").val(adjustInfo.adjust_take_time.substr(0, 10));
                     $("#topicName").val(adjustInfo.topicName);
                     if (document.getElementById("before_base_pay")) {
                     $("#before_base_pay").val(adjustInfo.before_base_pay);
                     }
                     if (document.getElementById("after_base_pay")) {
                     $("#after_base_pay").val(adjustInfo.after_base_pay);
                     }
                     if (document.getElementById("before_job_subsidies")) {
                     $("#before_job_subsidies").val(adjustInfo.before_job_subsidies);
                     }
                     if (document.getElementById("after_job_subsidies")) {
                     $("#after_job_subsidies").val(adjustInfo.after_job_subsidies);
                     }
                     if (document.getElementById("before_fixed_item1")) {
                     $("#before_fixed_item1").val(adjustInfo.before_fixed_item1);
                     }
                     if (document.getElementById("after_fixed_item1")) {
                     $("#after_fixed_item1").val(adjustInfo.after_fixed_item1);
                     }
                     if (document.getElementById("before_fixed_item2")) {
                     $("#before_fixed_item2").val(adjustInfo.before_fixed_item2);
                     }
                     if (document.getElementById("after_fixed_item2")) {
                     $("#after_fixed_item2").val(adjustInfo.after_fixed_item2);
                     }
                     if (document.getElementById("before_security_benefits")) {
                     $("#before_security_benefits").val(adjustInfo.before_security_benefits);
                     }
                     if (document.getElementById("after_security_benefits")) {
                     $("#after_security_benefits").val(adjustInfo.after_security_benefits);
                     }
                     }
                     //没有审批中或草稿数据，直接赋值人员姓名和机构部门信息
                     else {
                     var personName = data.name;
                     $('#personId').val(userId);
                     $('#personName').val(personName);
                     $('#topicName').val(personName + "的调定薪申请");
                     var empPersonDto = $.hrUtils.getHRPersonInfoById(userId);
                     if (empPersonDto != null) {
                     $('#personId').val(userId);
                     $('#personName').val(empPersonDto.realName);
                     $('#deptName').val(($.hrUtils.getHRPrefixOrgNameById(empPersonDto.deptId)));
                     $('#topicName').val(empPersonDto.realName + "的调薪申请");
                     }
                     }
                     //历史数据
                     var hisotryList = tempResult.hisotryList;
                     if (hisotryList != undefined && hisotryList != null && hisotryList.length > 0) {

                     //将当前数据填充为最进的历史修改后数据
                     var tempHistory = hisotryList[0];
                     if (document.getElementById("before_base_pay")) {
                     $("#before_base_pay").val(tempHistory.after_base_pay);
                     }
                     if (document.getElementById("before_job_subsidies")) {
                     $("#before_job_subsidies").val(tempHistory.after_job_usbsidies);
                     }
                     if (document.getElementById("before_fixed_item1")) {
                     $("#before_fixed_item1").val(tempHistory.after_fixed_item1);
                     }
                     if (document.getElementById("before_fixed_item2")) {
                     $("#before_fixed_item2").val(tempHistory.after_fixed_item2);
                     }
                     if (document.getElementById("before_security_benefits")) {
                     $("#before_security_benefits").val(tempHistory.after_security_benefits);
                     }
                     //修改前合计
                     sumBefore();

                     for (var i = 0; i <= hisotryList.length; i++) {
                     jQuery("#salaryHistoryList").jqGrid('addRowData', i + 1, hisotryList[i]);
                     }
                     }
                     }
                     //没有审批中或草稿数据，直接赋值人员姓名和机构部门信息
                     else {
                     var personName = data.name;
                     $('#personId').val(userId);
                     $('#personName').val(personName);
                     $('#topicName').val(personName + "的调定薪申请");
                     var empPersonDto = $.hrUtils.getHRPersonInfoById(userId);
                     if (empPersonDto != null) {
                     $('#personId').val(userId);
                     $('#personName').val(empPersonDto.realName);
                     $('#deptName').val(($.hrUtils.getHRPrefixOrgNameById(empPersonDto.deptId)));
                     $('#topicName').val(empPersonDto.realName + "的调定薪申请");
                     }
                     }
                 */

                    //新增进来每次都进行新增处理
                    var personName = data.name;
                    $('#personId').val(userId);
                    $('#personName').val(personName);
                    $('#topicName').val(personName + "的调定薪申请");
                    var empPersonDto = $.hrUtils.getHRPersonInfoById(userId);
                    if (empPersonDto != null) {
                        $('#personId').val(userId);
                        $('#personName').val(empPersonDto.realName);
                        $('#deptName').val(($.hrUtils.getHRPrefixOrgNameById(empPersonDto.deptId)));
                        $('#topicName').val(empPersonDto.realName + "的调薪申请");
                    }

                    //历史数据展示处理
                    var tempResult = json.result;
                    if (tempResult != null) {
                        var hisotryList = tempResult.hisotryList;
                        if (hisotryList != undefined && hisotryList != null && hisotryList.length > 0) {

                            //将当前数据填充为最进的历史修改后数据
                            var tempHistory = hisotryList[0];
                            if (document.getElementById("before_base_pay")) {
                                $("#before_base_pay").val(tempHistory.after_base_pay);
                            }
                            if (document.getElementById("before_job_subsidies")) {
                                $("#before_job_subsidies").val(tempHistory.after_job_subsidies);
                            }
                            if (document.getElementById("before_fixed_item1")) {
                                $("#before_fixed_item1").val(tempHistory.after_fixed_item1);
                            }
                            if (document.getElementById("before_fixed_item2")) {
                                $("#before_fixed_item2").val(tempHistory.after_fixed_item2);
                            }
                            if (document.getElementById("before_security_benefits")) {
                                $("#before_security_benefits").val(tempHistory.after_security_benefits);
                            }
                            //修改前合计
                            sumBefore();

                            for (var i = 0; i <= hisotryList.length; i++) {
                                jQuery("#salaryHistoryList").jqGrid('addRowData', i + 1, hisotryList[i]);
                            }
                        }
                    }

                } else {
                    pop_tip_open("blue", "调定薪数据初始化失败!");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化失败");
            }
        })
    };

    //保存前的判断
    window.saveForm = function () {

        var personId = $("#personId");
        if (personId == null || personId.val() == '' || $("#personName").val() == '' || $("#personName").val() == '') {
            $.xljUtils.tip("blue", "调薪人员不能为空！");
            return false;
        }
        if ($("#topicName") == null || $("#topicName").val() == '') {
            $.xljUtils.tip("blue", "主题不能为空！");
            return false;
        }
        if ($("#adjust_take_time") == null || $("#adjust_take_time").val() == '') {
            $.xljUtils.tip("blue", "生效时间不能为空！");
            return false;
        }
        //工资合计不能为空
        if ($("#after_wage_sum") != undefined && ($("#after_wage_sum").val() == "" || $("#after_wage_sum").val() == 0)) {
            $.xljUtils.tip("blue", "调定薪必须输入金额！");
            return false;
        }
        else if ($("#after_base_pay") != undefined && $("#after_base_pay").val() == "") {
            $("#after_base_pay").val(0);
        } else if ($("#after_job_subsidies") != undefined && $("#after_job_subsidies").val() == "") {
            $("#after_job_subsidies").val(0);
        } else if ($("#after_security_benefits") != undefined && $("#after_security_benefits").val() == "") {
            $("#after_security_benefits").val(0);
        } else if ($("#after_fixed_item1") != undefined && $("#after_fixed_item1").val() == "") {
            $("#after_fixed_item1").val(0);
        } else if ($("#after_fixed_item2") != undefined && $("#after_fixed_item2").val() == "") {
            $("#after_fixed_item2").val(0);
        }

        var info = {};
        //获取需要保存的表单数据
        var adjustInfo = $("#adjustFrom").serializeArray();
        for (var i in adjustInfo) {
            //过滤掉不必要的参数
            for (var i in adjustInfo) {
                if (adjustInfo[i].name == "before_base_pay" || adjustInfo[i].name == "before_job_subsidies" || adjustInfo[i].name == "before_security_benefits"
                    || adjustInfo[i].name == "before_fixed_item1" || adjustInfo[i].name == "before_fixed_item2" || adjustInfo[i].name == "before_wage_sum") { //格式化数据
                    var temp = 0;
                    if (adjustInfo[i].value != "" && adjustInfo[i].value != null) {
                        temp = parseFloat(adjustInfo[i].value);
                    }
                    info[adjustInfo[i].name] = temp;
                }
                else if (adjustInfo[i].name == "after_base_pay" || adjustInfo[i].name == "after_job_subsidies" || adjustInfo[i].name == "after_security_benefits"
                    || adjustInfo[i].name == "after_fixed_item1" || adjustInfo[i].name == "after_fixed_item2" || adjustInfo[i].name == "after_wage_sum") { //格式化数据
                    var temp = 0;
                    if (adjustInfo[i].value != "" && adjustInfo[i].value != null) {
                        temp = parseFloat(adjustInfo[i].value);
                    }
                    info[adjustInfo[i].name] = temp;
                } else {
                    info[adjustInfo[i].name] = adjustInfo[i].value;
                }
            }
        }
        var data = ehrApplyData();
        var isedit = $("#isedit").val();
        if (isedit == "0") {//新增保存
            saveApply(info);
        } else {//修改
            updateApply(info);
        }

    };

    //保存调定薪申请单js方法
    window.saveApply = function (info) {

        // //新增默认为草稿状态
        // info.approvalStatus = "4";

        /* $.ajax({
         type:'get',
         url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
         success: function(data) {
         var guuid=data.result;
         if(guuid!=null&&guuid!='') {
         $("#adjustFrom").find("input[name='id']").val(guuid);
         info.id = guuid;
         $.ajax({
         url: hostUrl + "wage/wageAdjustInfo/saveAdjustInfo",
         type: 'POST',
         dataType: 'JSON',
         contentType: "application/json",
         data: JSON.stringify(info),
         success: function (resultData) {
         if (resultData) {
         var successFlag = resultData.success;
         var message = resultData.message;
         if (successFlag) {
         setTimeout(function () {
         pop_tip_open("green", "数据保存成功！");
         goBack();
         }, 450);
         } else {
         pop_tip_open("red", "数据保存失败！" + message);
         }
         }
         }, error: function (XMLHttpRequest, textStatus, errorThrown) {
         pop_tip_open("red", "数据保存请求失败");
         }
         });
         }else {
         pop_tip_open("red","初始化主键ID请求失败");
         }

         },error:function(XMLHttpRequest, textStatus, errorThrown){
         pop_tip_open("red","初始化主键ID请求失败");
         }
         });*/
    };

    //修改调定薪申请单js方法
    window.updateApply = function (info) {
        $.ajax({
            url: hostUrl + "wage/wageAdjustInfo/updateAdjustInfo",
            type: 'POST',
            dataType: 'JSON',
            contentType: "application/json",
            data: JSON.stringify(info),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var message = resultData.message;
                    if (successFlag) {
                        setTimeout(function () {
                            pop_tip_open("green", "数据修改成功！");
                            goBack();
                        }, 450);
                    } else {
                        pop_tip_open("red", "数据修改失败！" + message);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改请求失败");
            }
        });
    };


    window.sumBefore = function () {
        //保留的小数位数
        var itemPrec = 4;

        var before_base_pay = 0;
        var before_job_subsidies = 0;
        var before_security_benefits = 0;
        var before_fixed_item1 = 0;
        var before_fixed_item2 = 0;
        if (document.getElementById("before_base_pay") != undefined && document.getElementById("before_base_pay") != null && document.getElementById("before_base_pay").value != "" && document.getElementById("before_base_pay").value != null) {
            before_base_pay = parseFloat(document.getElementById("before_base_pay").value);
        }
        if (document.getElementById("before_job_subsidies") != undefined && document.getElementById("before_job_subsidies") != null && document.getElementById("before_job_subsidies").value != "" && document.getElementById("before_job_subsidies").value != null) {
            before_job_subsidies = parseFloat(document.getElementById("before_job_subsidies").value);
        }
        if (document.getElementById("before_security_benefits") != undefined && document.getElementById("before_security_benefits") != null && document.getElementById("before_security_benefits").value != "" && document.getElementById("before_security_benefits").value != null) {
            before_security_benefits = parseFloat(document.getElementById("before_security_benefits").value);
        }
        if (document.getElementById("before_fixed_item1") != undefined && document.getElementById("before_fixed_item1") != null && document.getElementById("before_fixed_item1").value != "" && document.getElementById("before_fixed_item1").value != null) {
            before_fixed_item1 = parseFloat(document.getElementById("before_fixed_item1").value);
        }
        if (document.getElementById("before_fixed_item2") != undefined && document.getElementById("before_fixed_item2") != null && document.getElementById("before_fixed_item2").value != "" && document.getElementById("before_fixed_item2").value != null) {
            before_fixed_item2 = parseFloat(document.getElementById("before_fixed_item2").value);
        }
        // var sum = before_base_pay + before_job_subsidies + before_security_benefits + before_fixed_item1 + before_fixed_item2;
        var sum1 = $.wageUtils.add(before_base_pay, before_job_subsidies, itemPrec);
        sum1 = $.wageUtils.add(sum1, before_security_benefits, itemPrec);
        sum1 = $.wageUtils.add(sum1, before_fixed_item1, itemPrec);
        sum1 = $.wageUtils.add(sum1, before_fixed_item2, itemPrec);
        document.getElementById("before_wage_sum").value = sum1;
    };

    window.sumAfter = function () {

        //保留的小数位数
        var itemPrec = 0;

        var after_base_pay = 0;
        var after_job_subsidies = 0;
        var after_security_benefits = 0;
        var after_fixed_item1 = 0;
        var after_fixed_item2 = 0;
        if (document.getElementById("after_base_pay") != undefined && document.getElementById("after_base_pay") != null && document.getElementById("after_base_pay").value != "" && document.getElementById("after_base_pay").value != null) {

            if (parseFloat(document.getElementById("after_base_pay").value) > 99999999) {
                document.getElementById("after_base_pay").value = 99999999;
                $.xljUtils.tip("blue", "单项最大值不能超过99999999！");
            }

            //校验小数位数
            if (itemEnable != null && itemEnable.length > 0) {
                for (var tempItem in itemEnable) {
                    if (itemEnable[tempItem].code == "base_pay") {
                        var dot = document.getElementById("after_base_pay").value.indexOf(".");//获取小数点所在位置，可以得出整数位数
                        var len = (typeof(itemEnable[tempItem].itemPerce) == "undefined") ? 2 : itemEnable[tempItem].itemPerce;
                        itemPrec = itemPrec > len ? itemPrec : len;
                        if (dot == -1) {//没有小数点
                        }
                        else if (document.getElementById("after_base_pay").value.length - dot - 1 > len) { //小数位数多余设定位数
                            document.getElementById("after_base_pay").value = parseFloat(document.getElementById("after_base_pay").value.toString().substring(0, dot + len + 1));
                            $.xljUtils.tip("blue", itemEnable[tempItem].name + "的小数位数不能超过" + len + "位！");
                        }
                    }
                    break;
                }
            }

            after_base_pay = parseFloat(document.getElementById("after_base_pay").value);
        }
        if (document.getElementById("after_job_subsidies") != undefined && document.getElementById("after_job_subsidies") != null && document.getElementById("after_job_subsidies").value != "" && document.getElementById("after_job_subsidies").value != null) {

            if (parseFloat(document.getElementById("after_base_pay").value) > 99999999) {
                document.getElementById("after_base_pay").value = 99999999;
                $.xljUtils.tip("blue", "单项最大值不能超过99999999！");
            }
            //校验小数位数
            if (itemEnable != null && itemEnable.length > 0) {
                for (var tempItem in itemEnable) {
                    if (itemEnable[tempItem].code == "job_subsidies") {
                        var dot = document.getElementById("after_job_subsidies").value.indexOf(".");//获取小数点所在位置，可以得出整数位数
                        var len = (typeof(itemEnable[tempItem].itemPerce) == "undefined") ? 2 : itemEnable[tempItem].itemPerce;
                        itemPrec = itemPrec > len ? itemPrec : len;
                        if (dot == -1) {//没有小数点
                        }
                        else if (document.getElementById("after_job_subsidies").value.length - dot - 1 > len) { //小数位数多余设定位数
                            document.getElementById("after_job_subsidies").value = parseFloat(document.getElementById("after_job_subsidies").value.toString().substring(0, dot + len + 1));
                            $.xljUtils.tip("blue", itemEnable[tempItem].name + "的小数位数不能超过" + len + "位！");
                        }
                        break;
                    }
                }
            }

            after_job_subsidies = parseFloat(document.getElementById("after_job_subsidies").value);
        }
        if (document.getElementById("after_security_benefits") != undefined && document.getElementById("after_security_benefits") != null && document.getElementById("after_security_benefits").value != "" && document.getElementById("after_security_benefits").value != null) {

            if (parseFloat(document.getElementById("after_security_benefits").value) > 99999999) {
                document.getElementById("after_security_benefits").value = 99999999;
                $.xljUtils.tip("blue", "单项最大值不能超过99999999！");
            }
            //校验小数位数
            if (itemEnable != null && itemEnable.length > 0) {
                for (var tempItem in itemEnable) {
                    if (itemEnable[tempItem].code == "security_benefits") {
                        var dot = document.getElementById("after_security_benefits").value.indexOf(".");//获取小数点所在位置，可以得出整数位数
                        var len = (typeof(itemEnable[tempItem].itemPerce) == "undefined") ? 2 : itemEnable[tempItem].itemPerce;
                        itemPrec = itemPrec > len ? itemPrec : len;
                        if (dot == -1) {//没有小数点
                        }
                        else if (document.getElementById("after_security_benefits").value.length - dot - 1 > len) { //小数位数多余设定位数
                            document.getElementById("after_security_benefits").value = parseFloat(document.getElementById("after_security_benefits").value.toString().substring(0, dot + len + 1));
                            $.xljUtils.tip("blue", itemEnable[tempItem].name + "的小数位数不能超过" + len + "位！");
                        }
                        break;
                    }
                }
            }

            after_security_benefits = parseFloat(document.getElementById("after_security_benefits").value);
        }
        if (document.getElementById("after_fixed_item1") != undefined && document.getElementById("after_fixed_item1") != null && document.getElementById("after_fixed_item1").value != "" && document.getElementById("after_fixed_item1").value != null) {

            if (parseFloat(document.getElementById("after_fixed_item1").value) > 99999999) {
                document.getElementById("after_fixed_item1").value = 99999999;
                $.xljUtils.tip("blue", "单项最大值不能超过99999999！");
            }
            //校验小数位数
            if (itemEnable != null && itemEnable.length > 0) {
                for (var tempItem in itemEnable) {
                    if (itemEnable[tempItem].code == "fixed_item1") {
                        var dot = document.getElementById("after_fixed_item1").value.indexOf(".");//获取小数点所在位置，可以得出整数位数
                        var len = (typeof(itemEnable[tempItem].itemPerce) == "undefined") ? 2 : itemEnable[tempItem].itemPerce;
                        itemPrec = itemPrec > len ? itemPrec : len;
                        if (dot == -1) {//没有小数点
                        }
                        else if (document.getElementById("after_fixed_item1").value.length - dot - 1 > len) { //小数位数多余设定位数
                            document.getElementById("after_fixed_item1").value = parseFloat(document.getElementById("after_fixed_item1").value.toString().substring(0, dot + len + 1));
                            $.xljUtils.tip("blue", itemEnable[tempItem].name + "的小数位数不能超过" + len + "位！");
                        }
                        break;
                    }
                }
            }

            after_fixed_item1 = parseFloat(document.getElementById("after_fixed_item1").value);
        }
        if (document.getElementById("after_fixed_item2") != undefined && document.getElementById("after_fixed_item2") != null && document.getElementById("after_fixed_item2").value != "" && document.getElementById("after_fixed_item2").value != null) {

            if (parseFloat(document.getElementById("after_fixed_item2").value) > 99999999) {
                document.getElementById("after_fixed_item2").value = 99999999;
                $.xljUtils.tip("blue", "单项最大值不能超过99999999！");
            }
            //校验小数位数
            if (itemEnable != null && itemEnable.length > 0) {
                for (var tempItem in itemEnable) {
                    if (itemEnable[tempItem].code == "fixed_item2") {
                        var dot = document.getElementById("after_fixed_item2").value.indexOf(".");//获取小数点所在位置，可以得出整数位数
                        var len = (typeof(itemEnable[tempItem].itemPerce) == "undefined") ? 2 : itemEnable[tempItem].itemPerce;
                        itemPrec = itemPrec > len ? itemPrec : len;
                        if (dot == -1) {//没有小数点
                        }
                        else if (document.getElementById("after_fixed_item2").value.length - dot - 1 > len) { //小数位数多余设定位数
                            document.getElementById("after_fixed_item2").value = parseFloat(document.getElementById("after_fixed_item2").value.toString().substring(0, dot + len + 1));
                            $.xljUtils.tip("blue", itemEnable[tempItem].name + "的小数位数不能超过" + len + "位！");
                        }
                        break;
                    }
                }
            }

            after_fixed_item2 = parseFloat(document.getElementById("after_fixed_item2").value);
        }
        // var sum = after_base_pay + after_job_subsidies + after_security_benefits + after_fixed_item1 + after_fixed_item2;

        var sum1 = $.wageUtils.add(after_base_pay, after_job_subsidies, itemPrec);
        sum1 = $.wageUtils.add(sum1, after_security_benefits, itemPrec);
        sum1 = $.wageUtils.add(sum1, after_fixed_item1, itemPrec);
        sum1 = $.wageUtils.add(sum1, after_fixed_item2, itemPrec);
        document.getElementById("after_wage_sum").value = sum1;
        sumRose();
    };

    window.sumRose = function () {
        //保留的小数位数
        var itemPrec = 4;

        var adjustRose = 0;
        var beforeSumVal = 0;
        var afterSumVal = 0;
        if (document.getElementById("before_wage_sum").value != "" && document.getElementById("before_wage_sum").value != null) {
            beforeSumVal = parseFloat(document.getElementById("before_wage_sum").value);
        }
        if (document.getElementById("after_wage_sum").value != "" && document.getElementById("after_wage_sum").value != null) {
            afterSumVal = parseFloat(document.getElementById("after_wage_sum").value);
        }
        // var beforeSumVal = document.getElementById("before_wage_sum").valueAsNumber;
        // var afterSumVal = document.getElementById("after_wage_sum").valueAsNumber;
        if (beforeSumVal != 0) {

            var sum1 = $.wageUtils.subtract(afterSumVal, beforeSumVal, itemPrec);
            adjustRose = $.wageUtils.divide(sum1, beforeSumVal, itemPrec);
            // adjustRose = (afterSumVal - beforeSumVal)/beforeSumVal;
        }
        adjustRose = (adjustRose * 100).toFixed(2);//进行四色五入
        document.getElementById("adjust_rose").value = adjustRose;
        // document.getElementById("adjust_rose").valueAsNumber = adjustRose * 100;
    };

    //返回上一级
    window.goBack = function () {

        if (goBackHtml == "calculate") {
            window.location.href = "wage_salary_calculate.html?queryFlag=01";
        }
        // else if(goBackHtml=="adjustment") {
        //     window.location.href="wage_salary_adjustment_list.html?queryFlag=01";
        // }
        else {
            window.history.go(-1);
        }
    };


    //初始化日期控件
    window.initDatetimepicker = function () {
        var picker = $('#datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };

    /**
     * 格式化时间
     */
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

    window.myNumberic = function (e, len, name) {

        if (name == null || name == "undefined") {
            name = "";
        }
        var obj = e.srcElement || e.target;
        var dot = obj.value.indexOf(".");//整数位数
        if (parseFloat(obj.value) > 99999999) {
            obj.value.value = 99999999;
            setTimeout(function () {
                $.xljUtils.tip("blue", name + "的最大值不能超过99999999！");
            }, 300);
            return false;
        }
        len = (typeof(len) == "undefined") ? 2 : len;
        var key = e.keyCode || e.which;
        if (key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40)) {//这里为了兼容Firefox的backspace,tab,del,方向键

        }
        if (key <= 57 && key >= 48) { //数字
            if (dot == -1) {//没有小数点

            }
            if (obj.value.length - dot - 1 > len) { //小数位数多余设定位数
                obj.value = parseFloat(obj.value.toString().substring(0, dot + len));
                setTimeout(function () {
                    $.xljUtils.tip("blue", name + "的小数位数不能超过" + len + "位！");
                }, 300);
                return false;
            }

            else if (obj.value.length <= dot + len) {//小数位数

            }
        } else if ((key == 46) && dot == -1) {//小数点
        }
    };

    window.check = function () {
        var personId = $("#personId");
        if (personId == null || personId.val() == '' || $("#personName").val() == '' || $("#personName").val() == '') {
            $.xljUtils.tip("blue", "调薪人员不能为空！");
            return false;
        }
        if ($("#topicName") == null || $("#topicName").val() == '') {
            $.xljUtils.tip("blue", "主题不能为空！");
            return false;
        }
        if ($("#adjust_take_time") == null || $("#adjust_take_time").val() == '') {
            $.xljUtils.tip("blue", "生效时间不能为空！");
            return false;
        }
        //工资合计不能为空
        if ($("#after_wage_sum") != undefined && ($("#after_wage_sum").val() == "" || $("#after_wage_sum").val() == 0)) {
            $.xljUtils.tip("blue", "调定薪必须输入金额！");
            return false;
        }
        else if ($("#after_base_pay") != undefined && $("#after_base_pay").val() == "") {
            $("#after_base_pay").val(0);
        } else if ($("#after_job_subsidies") != undefined && $("#after_job_subsidies").val() == "") {
            $("#after_job_subsidies").val(0);
        } else if ($("#after_security_benefits") != undefined && $("#after_security_benefits").val() == "") {
            $("#after_security_benefits").val(0);
        } else if ($("#after_fixed_item1") != undefined && $("#after_fixed_item1").val() == "") {
            $("#after_fixed_item1").val(0);
        } else if ($("#after_fixed_item2") != undefined && $("#after_fixed_item2").val() == "") {
            $("#after_fixed_item2").val(0);
        }
        var info = {};
        //获取需要保存的表单数据
        var adjustInfo = $("#adjustFrom").serializeArray();
        for (var i in adjustInfo) {
            //过滤掉不必要的参数
            for (var i in adjustInfo) {
                if (adjustInfo[i].name == "before_base_pay" || adjustInfo[i].name == "before_job_subsidies" || adjustInfo[i].name == "before_security_benefits"
                    || adjustInfo[i].name == "before_fixed_item1" || adjustInfo[i].name == "before_fixed_item2" || adjustInfo[i].name == "before_wage_sum") { //格式化数据
                    var temp = 0;
                    if (adjustInfo[i].value != "" && adjustInfo[i].value != null) {
                        temp = parseFloat(adjustInfo[i].value);
                    }
                    info[adjustInfo[i].name] = temp;
                }
                else if (adjustInfo[i].name == "after_base_pay" || adjustInfo[i].name == "after_job_subsidies" || adjustInfo[i].name == "after_security_benefits"
                    || adjustInfo[i].name == "after_fixed_item1" || adjustInfo[i].name == "after_fixed_item2" || adjustInfo[i].name == "after_wage_sum") { //格式化数据
                    var temp = 0;
                    if (adjustInfo[i].value != "" && adjustInfo[i].value != null) {
                        temp = parseFloat(adjustInfo[i].value);
                    }
                    info[adjustInfo[i].name] = temp;
                } else {
                    info[adjustInfo[i].name] = adjustInfo[i].value;
                }
            }
        }
        return true;
    }

})(jQuery, window, document);