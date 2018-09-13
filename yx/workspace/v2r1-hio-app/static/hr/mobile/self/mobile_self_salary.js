;(function ($, window, document, undefined) {
    var payTime; //发薪时间
    var payPeriodId; //发薪批次
    var id; //批次Id

    var incomeList = new Array();//收入项目
    var deductionList = new Array();//扣减项
    var empList = new Array();//个人缴费项目
    var unitList = new Array();//公司缴费项目
    var compositeList = new Array();//综合项目
    var centreList = new Array();//中间项目
    var taxList = new Array();//个税项目

    $.weui = {};
    $.weui.alert = function (options) {
        options = $.extend({title: '警告', text: '警告内容'}, options);
        var $alert = $('.weui_dialog_alert');
        $alert.find('.weui_dialog_title').text(options.title);
        $alert.find('.weui_dialog_bd').text(options.text);
        $alert.on('touchend click', '.weui_btn_dialog', function () {
            $alert.hide();
        });
        $alert.show();
    };

    //上来就执行
    $(function () {
        initPayPeriod();//初始化发薪期间日期
        initShowFile();//初始化展示项
        initGetWageDetailsByPeriodAndPayPeriodId();
    });

    //初始化账套显示薪资项
    window.initShowFile = function () {
        var map = {};
        map.payPeriodId = payPeriodId;
        var tendId = $.xljUtils.getUrlParam("tendId");
        map.tendId=tendId;
        //如果是重团队薪酬穿透而来
        var personId = $.xljUtils.getUrlParam("personId");
        map.personId=personId;
        $.ajax({
            url: hostUrl + "self/selfSalaryInfo/querySelfSalaryItem",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(map),
            success: function (data) {
                if (data != null && data.result != null) {
                    var result = data.result;
                    incomeList = result.incomeList;//收入项目
                    deductionList = result.deductionList;//扣减项
                    empList = result.empList;//个人缴费项目
                    unitList = result.unitList;//公司缴费项目
                    compositeList = result.compositeList;//综合项目
                    centreList = result.centreList;//中间项目
                    taxList = result.taxList;//个税项目
                    //确定薪资明细div的总行数        lenght
                    var salaryItemRow = 1;
                    var salaryItemRow1 = 1;
                    if (incomeList != null && incomeList.length > 0) {
                        salaryItemRow = incomeList.length;
                    }
                    if (deductionList != null && deductionList.length > 0) {
                        salaryItemRow1 = deductionList.length;
                    }
                    //薪资明细具体显示
                    $("#salaryItem1").empty();
                    for (var i = 0; i < salaryItemRow; i++) {
                        //收入项显示
                        var temp1 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (incomeList != null && incomeList.length > i) {
                            var temp1 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + incomeList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" style="float: right" id="' + incomeList[i].code + '" name="' + incomeList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + incomeList[i].code + '" name="' + incomeList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#salaryItem1").append(temp1);

                    }
                    $("#salaryItem2").empty();
                    for (var i = 0; i < salaryItemRow1; i++) {
                        //扣减项显示
                        var temp2 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%"> ' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (deductionList != null && deductionList.length > i) {
                            var temp2 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + deductionList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" id="' + deductionList[i].code + '" name="' + deductionList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + deductionList[i].code + '" name="' + deductionList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#salaryItem2").append(temp2);
                    }

                    //社保个人缴费明细显示
                    $("#siItem").empty();
                    var siItemRow = 1;
                    if (empList != null && empList.length > 0) {
                        siItemRow = empList.length;
                    }
                    for (var i = 0; i < siItemRow; i++) {
                        var temp1 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (empList != null && empList.length > i) {
                            var temp1 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + empList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" id="' + empList[i].code + '" name="' + empList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + empList[i].code + '" name="' + empList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#siItem").append(temp1);
                    }

                    //社保公式缴费项目
                    $("#companyItem").empty();
                    var companyItemRow = 1;
                    if (unitList != null && unitList.length > 0) {
                        companyItemRow = unitList.length;
                    }
                    for (var i = 0; i < companyItemRow; i++) {
                        var temp1 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (unitList != null && unitList.length > i) {
                            var temp1 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + unitList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" id="' + unitList[i].code + '" name="' + unitList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + unitList[i].code + '" name="' + unitList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#companyItem").append(temp1);
                    }

                    //个税项目
                    $("#taxItem").empty();
                    var taxItemRow = 1;
                    if (taxList != null && taxList.length > 0) {
                        taxItemRow = taxList.length;
                    }
                    for (var i = 0; i < taxItemRow; i++) {
                        var temp1 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (taxList != null && taxList.length > i) {
                            var temp1 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + taxList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" id="' + taxList[i].code + '" name="' + taxList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + taxList[i].code + '" name="' + taxList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#taxItem").append(temp1);
                    }


                    //综合项目明细显示
                    $("#compositeItem").empty();
                    var compositeItemRow = 1;
                    if (compositeList != null && compositeList.length > 0) {
                        compositeItemRow = compositeList.length;
                    }
                    for (var i = 0; i < compositeItemRow; i++) {
                        var temp1 = '<div class="weui_cells">' +
                            '<div class="weui_cell">' +
                            '<div class="weui_cell_hd span_width">' +
                            '<label class="weui_label"> </label>' +
                            '</div>' +
                            '<div class="weui_cell_bd weui_cell_primary">' +
                            '<input class="weui_input" type="text" readonly style="width: 100%">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        if (compositeList != null && compositeList.length > i) {
                            var temp1 = '<div class="weui_cells">' +
                                '<div class="weui_cell">' +
                                '<div class="weui_cell_hd span_width">' +
                                '<label class="weui_label">' + compositeList[i].name + '</label>' +
                                '</div>' +
                                '<div class="weui_cell_bd weui_cell_primary" id="' + compositeList[i].code + '" name="' + compositeList[i].code + '">' +
                                // '<input class="weui_input" style="width: 100%" id="' + compositeList[i].code + '" name="' + compositeList[i].code + '" type="text" readonly>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        $("#compositeItem").append(temp1);
                    }
                } else {
                    clearForm();
                }

            },
            error: function (data, errorThrown) {
                clearForm();
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };

    /**
     * 根据发薪期间ID和人员ID查询薪资明细
     */
    window.initGetWageDetailsByPeriodAndPayPeriodId = function () {
        clearForm();
        initShowFile();
        payPeriodId = $("#payTime").val();
        var payPeriod = $("#payPeriod").val();
        if (payPeriod == null || payPeriod == '') {
            // var options = {title: '提示', text: '请选择发薪月份'};
            // $.weui.alert(options);
            clearForm();
        }
        else if (payPeriodId == "" || payPeriodId == null) {
            // var options = {title: '提示', text: '没有发薪记录!'};
            // $.weui.alert(options);
            clearForm();
        } else {
            var tendId = $.xljUtils.getUrlParam("tendId");
            //如果是重团队薪酬穿透而来
            var personId = $.xljUtils.getUrlParam("personId");
            $.ajax({
                url: hostUrl + "self/selfSalaryInfo/queryWageDetailsByPeriodAndPayPeriodId",
                type: 'POST',
                dataType: 'JSON',
                async:false,
                contentType: 'application/json',
                data: JSON.stringify({payPeriodId: payPeriodId,tendId:tendId,personId:personId}),
                success: function (data) {
                    if (data.success && data.result != null) {
                        var wageSalaryInfoDto = data.result;
                        //收入项目
                        if (incomeList != null && incomeList.length > 0) {
                            for (var i = 0; i < incomeList.length; i++) {
                                var temp = incomeList[i].code;
                                // $("#" + incomeList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + incomeList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                        //扣减项目
                        if (deductionList != null && deductionList.length > 0) {
                            for (var i = 0; i < deductionList.length; i++) {
                                var temp = deductionList[i].code;
                                // $("#" + deductionList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + deductionList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                        //社保个人缴费项目
                        if (empList != null && empList.length > 0) {
                            for (var i = 0; i < empList.length; i++) {
                                var temp = empList[i].code;
                                // $("#" + empList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + empList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                        //公司缴费
                        if (unitList != null && unitList.length > 0) {
                            for (var i = 0; i < unitList.length; i++) {
                                var temp = unitList[i].code;
                                // $("#" + unitList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + unitList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                        //个税项目
                        if (taxList != null && taxList.length > 0) {
                            for (var i = 0; i < taxList.length; i++) {
                                var temp = taxList[i].code;
                                // $("#" + taxList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + taxList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                        //综合项目
                        if (compositeList != null && compositeList.length > 0) {
                            for (var i = 0; i < compositeList.length; i++) {
                                var temp = compositeList[i].code;
                                // $("#" + compositeList[i].code).val(wageSalaryInfoDto[temp]);
                                $("#" + compositeList[i].code).html(wageSalaryInfoDto[temp]);
                            }
                        }
                    } else {
                        clearForm();
                    }
                },
                error: function () {
                    clearForm();
                }
            })
        }
    };

    //根据发薪期间，加载发薪时间，避免一人一月发多次可以切换选择
    window.initPayTime = function () {
        var value = $("#payPeriod").val();
        $("#payTime").empty();
        payTime = "";
        payPeriodId = "";
        if (value != null && value != '') {
            var tendId = $.xljUtils.getUrlParam("tendId");
            //如果是重团队薪酬穿透而来
            var personId = $.xljUtils.getUrlParam("personId");
            $.ajax({    //查询所有的账套列表
                type: "POST",
                url: hostUrl + "self/selfSalaryInfo/queryPayWageTime",
                data: JSON.stringify({payPeriod: value, createDate: new Date(),tendId:tendId,personId:personId}),
                dataType: "JSON",
                async: false,
                contentType: "application/json",
                success: function (data) {
                    var result = data.result;
                    if (result != null) {

                        var tempPayTime = result.payTime;//查询出来的除默认展示字段外的其他需要展示字段
                        if (tempPayTime != null && tempPayTime != '' && tempPayTime.length > 0) {
                            $("#personName").html(tempPayTime[0].personName);
                            $("#orgName").html(tempPayTime[0].orgName);
                            for (var i = 0; i < tempPayTime.length; i++) {
                                $("#payTime").append(' <option value="' + tempPayTime[i].payPeriodId + '">' + tempPayTime[i].payTime + '</option>');
                            }
                            payTime = tempPayTime[0].payTime;
                            payPeriodId = tempPayTime[0].payPeriodId;
                            //初始化个人工资信息
                            initGetWageDetailsByPeriodAndPayPeriodId();
                        } else {
                            //解决没有发薪记录不显示个人基本信息问题
                            if(personId!=null&&personId!=''&&personId!=undefined) { //团队薪资
                                var tempPersonInfo = $.hrUtils.getHRPersonNameById(personId);
                                if(tempPersonInfo!=null&&tempPersonInfo!=undefined) {
                                    var tempPersonName = tempPersonInfo.realName;
                                    $('#personName').html(tempPersonName);
                                    var tempDeptName = $.hrUtils.getHRPrefixOrgNameById(tempPersonInfo.deptId);
                                    $('#orgName').html(tempDeptName);
                                }
                            }
                            else { //我的工资
                                var tempPersonInfo = $.hrUtils.getLoginUser();
                                if(tempPersonInfo!=null&&tempPersonInfo!=undefined) {
                                    var tempPersonName = $.hrUtils.getHRPersonNameById(tempPersonInfo.userId);
                                    $('#personName').html(tempPersonName);
                                    var tempDeptName = $.hrUtils.getHRPrefixOrgNameById(tempPersonInfo.orgId);
                                    $('#orgName').html(tempDeptName);
                                }
                            }

                            $("#payTime").append(' <option value="">未发薪</option>');
                            clearForm();
                        }
                    } else {

                        //解决没有发薪记录不显示个人基本信息问题
                        if(personId!=null&&personId!=''&&personId!=undefined) { //团队薪资
                            var tempPersonInfo = $.hrUtils.getHRPersonNameById(personId);
                            if(tempPersonInfo!=null&&tempPersonInfo!=undefined) {
                                var tempPersonName = tempPersonInfo.realName;
                                $('#personName').html(tempPersonName);
                                var tempDeptName = $.hrUtils.getHRPrefixOrgNameById(tempPersonInfo.deptId);
                                $('#orgName').html(tempDeptName);
                            }
                        }
                        else { //我的工资
                            var tempPersonInfo = $.hrUtils.getLoginUser();
                            if(tempPersonInfo!=null&&tempPersonInfo!=undefined) {
                                var tempPersonName = $.hrUtils.getHRPersonNameById(tempPersonInfo.userId);
                                $('#personName').html(tempPersonName);
                                var tempDeptName = $.hrUtils.getHRPrefixOrgNameById(tempPersonInfo.orgId);
                                $('#orgName').html(tempDeptName);
                            }
                        }

                        $("#payTime").append(' <option value="">未发薪</option>');
                        clearForm();
                    }
                },
                error: function () {
                    clearForm();
                }
            });
        } else {
            // initForm();
            clearForm();
        }
    };

    //清除面板
    window.clearForm = function () {
        incomeList = [];
        deductionList = [];
        empList = [];
        unitList = [];
        compositeList = [];
        centreList = [];
        taxList = [];

        $("#compositeItem").empty();
        $("#taxItem").empty();
        $("#companyItem").empty();
        $("#siItem").empty();
        $("#salaryItem1").empty();
        $("#salaryItem2").empty();
        //
        // //收入项目
        // if(incomeList!=null&&incomeList.length>0) {
        //     for(var i=0;i<incomeList.length;i++) {
        //         $("#"+incomeList[i].code).val(0);
        //     }
        // }
        // //扣减项目
        // if(deductionList!=null&&deductionList.length>0) {
        //     for(var i=0;i<deductionList.length;i++) {
        //         $("#"+deductionList[i].code).val(0);
        //     }
        // }
        // //社保个人缴费项目
        // if(empList!=null&&empList.length>0) {
        //     for(var i=0;i<empList.length;i++) {
        //         $("#"+empList[i].code).val(0);
        //     }
        // }
        // //综合项目
        // if(unitList!=null&&unitList.length>0) {
        //     for(var i=0;i<unitList.length;i++) {
        //         $("#"+unitList[i].code).val(0);
        //     }
        // }
        // //个税项目
        // if(taxList!=null&&taxList.length>0) {
        //     for(var i=0;i<taxList.length;i++) {
        //         $("#"+taxList[i].code).val(0);
        //     }
        // }
        // //综合项目
        // if(compositeList!=null&&compositeList.length>0) {
        //     for(var i=0;i<compositeList.length;i++) {
        //         $("#"+compositeList[i].code).val(0);
        //     }
        // }
    };

    //清除日期响应事件
    window.emptyDateObject = function () {
        //清除发薪月份
        $("#payPeriod").val("");
        //清除发薪时间
        $("#payTime").empty();
        $("#payTime").append(' <option value="">未发薪</option>');
        //清除展示的各项记录
        clearForm();
        // initForm();
    };

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

    //初始化发薪日期
    window.initPayPeriod = function () {
        var value = $("#payPeriod").val();
        if (value == null || value == '' || value == undefined) {  //我的团队处进来，给定月份
            value = GetRequest().payPeriod;
        }
        if(value == null || value == '' || value == undefined){ //主要针对我的工资处出来，初始化赋默认值
            value = (new Date()).Format("yyyy-MM");
        }
        $("#payPeriod").val(value);
        initPayTime();//初始化发薪时间选项
    };

    //切换发薪月份
    window.changePayPeriod = function () {
        var perPeriod = $("#payPeriod").val();
        //表示清除
        if (perPeriod == null || perPeriod == "") {
            clearForm();
        }
        //重选选择值
        else {
            //清除发薪时间
            $("#payTime").empty();
            $("#payTime").append(' <option value="">未发薪</option>');
            //清除展示的各项记录
            clearForm();
            initPayTime();//初始化发薪时间选项
        }
    };

    //切换发薪时间
    window.changePayTime = function () {
        //初始化个人工资信息
        initGetWageDetailsByPeriodAndPayPeriodId();
    };

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

})(jQuery, window, document);
