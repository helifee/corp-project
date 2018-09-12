
;(function ($, window, document, undefined) {
    var payTime ; //发薪时间
    var payPeriodId ; //发薪批次
    var id ; //批次Id
    $("#payPeriod").val($.xljUtils.getUrlParam("payPeriod"));
    var incomeList = new Array();//收入项目
    var deductionList = new Array();//扣减项
    var empList = new Array();//个人缴费项目
    var unitList = new Array();//公司缴费项目
    var compositeList = new Array();//综合项目
    var centreList = new Array();//中间项目
    var taxList = new Array();//个税项目
    var personId = $.xljUtils.getUrlParam("personId");
    //初始化账套显示薪资项
    window.initShowFile = function () {
        var map = {};
        map.payPeriodId = payPeriodId;
        $.ajax({
            url: hostUrl + "self/selfSalaryInfo/querySelfSalaryItem",
            type: 'POST',
            dataType: 'JSON',
            async:false,
            contentType: 'application/json',
            data: JSON.stringify(map),
            success: function (data) {
                if(data!=null&&data.result!=null) {
                    var result = data.result;
                    console.log(data);
                    incomeList = result.incomeList;//收入项目
                    deductionList = result.deductionList;//扣减项
                    empList = result.empList;//个人缴费项目
                    unitList = result.unitList;//公司缴费项目
                    compositeList = result.compositeList;//综合项目
                    centreList = result.centreList;//中间项目
                    taxList = result.taxList;//个税项目
                    //确定薪资明细div的总行数
                    var salaryItemRow = 1;
                    if(incomeList!=null&&incomeList.length>0) {
                        salaryItemRow = incomeList.length;
                    }
                    if(deductionList!=null&&deductionList.length>0) {
                        if(deductionList.length>salaryItemRow)
                            salaryItemRow = deductionList.length;
                    }
                    //薪资明细具体显示
                    $("#salaryItem").empty();
                    for(var i=0;i<salaryItemRow;i++) {
                        //收入项显示
                        var temp1 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(incomeList!=null&& incomeList.length > i){
                            temp1 = '<td class="form-label" style="width: 250px"><label>' + incomeList[i].name + '</label></td>' +
                                '<td style="width: 180px;" id="' + incomeList[i].code + '" name="' + incomeList[i].code + '"></td>';
                        }
                        //扣减项显示
                        var temp2 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(deductionList!=null&&deductionList.length> i){
                            temp2 = '<td class="form-label" style="width: 250px"><label>' + deductionList[i].name + '</label></td>' +
                                '<td style="width: 180px;" id="' + deductionList[i].code + '" name="' + deductionList[i].code + '"></td>';
                        }

                        if(i==0) {
                            $("#salaryItem").append('<tr class="form-tr" >' +
                                '<td class="form-label" rowspan="' + salaryItemRow + '" align="center" style="width: 210px"><label>收入项目</label></td>' +
                                temp1 +
                                '<td class="form-label" rowspan="' + salaryItemRow + '" align="center" style="width: 210px"><label>扣减项目</label></td>' +
                                temp2 +
                                '</tr>');
                        }else {
                            $("#salaryItem").append('<tr class="form-tr">' + temp1 + temp2 + '</tr>');
                        }
                    }


                    //确定社保明细div的总行数
                    var siItemRow = 1;
                    if(empList!=null&&empList.length>0) {
                        siItemRow = empList.length;
                    }
                    if(unitList!=null&&unitList.length>0) {
                        if(unitList.length>siItemRow)
                            siItemRow = unitList.length;
                    }
                    //薪资明细具体显示
                    $("#siItem").empty();
                    for(var i=0;i<siItemRow;i++) {
                        //个人缴费
                        var temp1 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(empList!=null&& empList.length > i){
                            temp1 = '<td class="form-label" style="width: 250px"><label>' + empList[i].name + '</label></td>' +
                                '<td style="width: 180px;" id="' + empList[i].code + '" name="' + empList[i].code + '"></td>';
                        }
                        //公式缴费
                        var temp2 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(unitList!=null&&unitList.length> i){
                            temp2 = '<td class="form-label" style="width: 250px"><label>' + unitList[i].name + '</label></td>' +
                                '<td style="width: 180px;" id="' + unitList[i].code + '" name="' + unitList[i].code + '"></td>';
                        }

                        if(i==0) {
                            $("#siItem").append('<tr class="form-tr" >' +
                                '<td class="form-label" rowspan="' + siItemRow + '" align="center" style="width: 210px"><label>个人缴费</label></td>' +
                                temp1 +
                                '<td class="form-label" rowspan="' + siItemRow + '" align="center" style="width: 210px"><label>公司缴费</label></td>' +
                                temp2 +
                                '</tr>');
                        }else {
                            $("#siItem").append('<tr class="form-tr">' + temp1 + temp2 + '</tr>');
                        }
                    }


                    //个税项目
                    $("#taxItem").empty();
                    var taxItemRow = 1;
                    if(taxList!=null&&taxList.length>0) {
                        taxItemRow = taxList.length;
                    }
                    for(var i=0;i<taxItemRow;i++) {
                        var temp1 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(taxList!=null&&taxList.length>i){
                            temp1 = '<td class="form-label"><label>' + taxList[i].name + '</label></td>' +
                                '<td id="' + taxList[i].code + '" name="' + taxList[i].code + '"></td>';
                        }
                        if(i==0) {
                            $("#taxItem").append('<tr class="form-tr" >' +
                                '<td class="form-label" rowspan="' + taxItemRow + '" align="center"><label>个税项目</label></td>' +
                                temp1 +
                                '</tr>');
                        }else {
                            $("#taxItem").append('<tr class="form-tr">' + temp1 + '</tr>');
                        }
                    }


                    //综合项目明细显示
                    $("#compositeItem").empty();
                    var compositeItemRow = 1;
                    if(compositeList!=null&&compositeList.length>0) {
                        compositeItemRow = compositeList.length;
                    }
                    for(var i=0;i<compositeItemRow;i++) {
                        var temp1 = '<td class="form-label"><label></label></td>' +
                            '<td></td>';
                        if(compositeList!=null&&compositeList.length>i){
                            temp1 = '<td class="form-label"><label>' + compositeList[i].name + '</label></td>' +
                                '<td id="' + compositeList[i].code + '" name="' + compositeList[i].code + '"></td>';
                        }
                        if(i==0) {
                            $("#compositeItem").append('<tr class="form-tr" >' +
                                '<td class="form-label" rowspan="' + compositeItemRow + '" align="center"><label>综合部分</label></td>' +
                                temp1 +
                                '</tr>');
                        }else {
                            $("#compositeItem").append('<tr class="form-tr">' + temp1 + '</tr>');
                        }
                    }

                }

            },
            error: function (data, errorThrown) {
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
        if(payPeriod == null || payPeriod == '') {
            pop_tip_open("blue", "请选择发薪月份");
            // initForm();
            clearForm();
        }
        else if(payPeriodId=="" || payPeriodId==null) {
            pop_tip_open("blue","没有发薪记录!");
            // initForm();
            clearForm();
        }else {
            $.ajax({
                url: hostUrl + "self/selfSalaryInfo/queryWageDetailsByPeriodAndPayPeriodId",
                type: 'POST',
                dataType: 'JSON',
                async:false,
                contentType: 'application/json',
                data: JSON.stringify({payPeriodId: payPeriodId,personId:personId}),
                success: function (data) {
                    if(data.success&&data.result!=null) {
                        var wageSalaryInfoDto = data.result;
                        console.log(wageSalaryInfoDto);
                        //收入项目
                        if(incomeList!=null&&incomeList.length>0) {

                            for(var i=0;i<incomeList.length;i++) {
                                var temp = incomeList[i].code;
                                $("#"+incomeList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                        //扣减项目
                        if(deductionList!=null&&deductionList.length>0) {
                            for(var i=0;i<deductionList.length;i++) {
                                var temp = deductionList[i].code;
                                $("#"+deductionList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                        //社保个人缴费项目
                        if(empList!=null&&empList.length>0) {
                            for(var i=0;i<empList.length;i++) {
                                var temp = empList[i].code;
                                $("#"+empList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                        //公司缴费
                        if(unitList!=null&&unitList.length>0) {
                            for(var i=0;i<unitList.length;i++) {
                                var temp = unitList[i].code;
                                $("#"+unitList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                        //个税项目
                        if(taxList!=null&&taxList.length>0) {
                            for(var i=0;i<taxList.length;i++) {
                                var temp = taxList[i].code;
                                // //如果是税率就增加百分号
                                // if(temp=="tax_rate") {
                                //     $("#"+taxList[i].code).append(wageSalaryInfoDto[temp]+"%");
                                // }else {
                                //     $("#"+taxList[i].code).append(wageSalaryInfoDto[temp]);
                                // }
                                $("#"+taxList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                        //综合项目
                        if(compositeList!=null&&compositeList.length>0) {
                            for(var i=0;i<compositeList.length;i++) {
                                var temp = compositeList[i].code;
                                $("#"+compositeList[i].code).append(wageSalaryInfoDto[temp]);
                            }
                        }

                    }else {
                        // initForm();
                        clearForm();
                    }
                },
                error:function () {
                    // initForm();
                    clearForm();
                }
            })
        }
    };

    //根据发薪期间，加载发薪时间，避免一人一月发多次可以切换选择
    //查询 薪资计算历史表
    window.initPayTime = function () {
        var value = $("#payPeriod").val();
        $("#payTime").empty();
        payTime = "";
        payPeriodId = "";
        if(value!=null&&value!='') {
            $.ajax({    //查询所有的账套列表
                type: "POST",
                url:hostUrl+ "self/selfSalaryInfo/queryPayWageTime",
                data: JSON.stringify({payPeriod:value,createDate:new Date(),personId:personId}),
                dataType: "JSON",
                async:false,
                contentType:"application/json",
                success: function(data) {
                    var result = data.result;
                    console.log(result);
                    if(result!=null) {
                        var tempPayTime = result.payTime;//查询出来的除默认展示字段外的其他需要展示字段
                        if(tempPayTime != null && tempPayTime != '' && tempPayTime.length > 0) {
                            for (var i = 0; i < tempPayTime.length; i++) {
                                $("#payTime").append(' <option value="'+tempPayTime[i].payPeriodId+'">' + tempPayTime[i].payTime +'</option>');
                            }
                            payTime = tempPayTime[0].payTime;
                            payPeriodId =  tempPayTime[0].payPeriodId;
                            //初始化个人工资信息
                            initGetWageDetailsByPeriodAndPayPeriodId();
                        }else {
                            $("#payTime").append(' <option value="">未发薪</option>');
                            // initForm();
                            clearForm();
                        }
                    }else {
                        $("#payTime").append(' <option value="">未发薪</option>');
                        // initForm();
                        clearForm();
                    }
                },
                error:function () {
                    // initForm();
                    clearForm();
                }
            });
        }else {
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
        taxList = [];
        compositeList = [];

        $("#compositeItem").empty();
        $("#taxItem").empty();
        $("#siItem").empty();
        $("#salaryItem").empty();

        // $("#salaryItem").append('<tr class="form-tr" >' +
        //     '<td class="form-label" rowspan="1" align="center" style="width: 210px"><label>收入项目</label></td>' +
        //     '<td class="form-label" rowspan="1" align="center" style="width: 210px"><label>扣减项目</label></td>' +
        //     '</tr>');
        // $("#siItem").append('<tr class="form-tr" >' +
        //     '<td class="form-label" rowspan="1" align="center" style="width: 210px"><label>个人缴费</label></td>' +
        //     '<td class="form-label" rowspan="1" align="center" style="width: 210px"><label>公司缴费</label></td>' +
        //     '</tr>');
        // $("#taxItem").append('<tr class="form-tr" >' +
        //     '<td class="form-label" rowspan="1" align="center"><label>个税项目</label></td></tr>');
        // $("#compositeItem").append('<tr class="form-tr" >' +
        //     '<td class="form-label" rowspan="1" align="center"><label>综合部分</label></td></tr>');
    };

    //为面板赋初始值
    window.initForm = function () {

        //收入项目
        if(incomeList!=null&&incomeList.length>0) {
            for(var i=0;i<incomeList.length;i++) {
                if(incomeList[i].type=="1"||incomeList[i].type=="2"||incomeList[i].type=="8") { //整数、小数、浮点数
                    $("#"+incomeList[i].code).append(0);
                }else {
                    $("#"+incomeList[i].code).append("");
                }
            }
        }
        //扣减项目
        if(deductionList!=null&&deductionList.length>0) {
            for(var i=0;i<deductionList.length;i++) {
                if(deductionList[i].type=="1"||deductionList[i].type=="2"||deductionList[i].type=="8") { //整数、小数、浮点数
                    $("#"+deductionList[i].code).append(0);
                }else {
                    $("#"+deductionList[i].code).append("");
                }
            }
        }
        //社保个人缴费项目
        if(empList!=null&&empList.length>0) {
            for(var i=0;i<empList.length;i++) {
                if(empList[i].type=="1"||empList[i].type=="2"||empList[i].type=="8") { //整数、小数、浮点数
                    $("#"+empList[i].code).append(0);
                }else {
                    $("#"+empList[i].code).append("");
                }
            }
        }
        //公司缴费
        if(unitList!=null&&unitList.length>0) {
            for(var i=0;i<unitList.length;i++) {
                if(unitList[i].type=="1"||unitList[i].type=="2"||unitList[i].type=="8") { //整数、小数、浮点数
                    $("#"+unitList[i].code).append(0);
                }else {
                    $("#"+unitList[i].code).append("");
                }
            }
        }
        //个税项目
        if(taxList!=null&&taxList.length>0) {
            for(var i=0;i<taxList.length;i++) {
                if(taxList[i].type=="1"||taxList[i].type=="2"||taxList[i].type=="8") { //整数、小数、浮点数
                    $("#"+taxList[i].code).append(0);
                }else {
                    $("#"+taxList[i].code).append("");
                }
            }
        }
        //综合项目
        if(compositeList!=null&&compositeList.length>0) {
            for(var i=0;i<compositeList.length;i++) {
                if(compositeList[i].type=="1"||compositeList[i].type=="2"||compositeList[i].type=="8") { //整数、小数、浮点数
                    $("#"+compositeList[i].code).append(0);
                }else {
                    $("#"+compositeList[i].code).append("");
                }
            }
        }

    };

    //初始化日期控件
    window.initDatetimepicker = function() {
        var picker1 = $('#datetimepicker1').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });
    };

    //清除日期响应事件
    window.emptyDateObject = function() {
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
        if(value == null || value == '') {
            value = (new Date()).Format("yyyy-MM");
            $("#payPeriod").val(value);
        }
        initPayTime();//初始化发薪时间选项
    };

    //切换发薪月份
    window.changePayPeriod = function () {
        var perPeriod = $("#payPeriod").val();
        //表示清除
        if(perPeriod==null||perPeriod=="") {

        }
        //重选选择值
        else {
            //清除发薪时间
            $("#payTime").empty();
            $("#payTime").append(' <option value="">未发薪</option>');//添加一个选项
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

    //上来就执行
    $(function(){
        var urlParam = $.xljUtils.getUrlParam("backFlag");
        if(urlParam&&urlParam!=undefined&&urlParam=='team'){
            $('#backBtn').show();
        }

        initDatetimepicker();//初始化时间插件
        initShowFile();
        initPayPeriod();//初始化发薪期间ID

        $("#queryBtn").click(function () {
            clearForm();//清除面板
            var perPeriod = $("#payPeriod").val();
            initGetWageDetailsByPeriodAndPayPeriodId();
        });
    });


})(jQuery, window, document);
