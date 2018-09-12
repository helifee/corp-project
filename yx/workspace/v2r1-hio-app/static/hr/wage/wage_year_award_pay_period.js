/**
 * ruanxin
 * 发薪期间设置js
 */
;
(function ($, window, document, undefined) {

    var type = "2";//默认为年终奖期间

    /**
     * wageCalculate:由薪资计算页面进入
     * createPayPeriod:由年终奖计算页面—新增操作进入
     * updatePayPeriod:由年终奖计算页面—修改操作进入
     */
    var periodFlag = localStorage.getItem('periodFlag');
    if (periodFlag && periodFlag != undefined && periodFlag != 'undefined' && periodFlag != null) {
        periodFlag = JSON.parse(periodFlag);
    }

    var payPeriodId = '';//当前修改期间ID
    var oldPayPeriod;//修改期间

    //初始化页面，如果已存在发薪数据，则直接取最新发薪期间，否则在此页面进行新建
    window.initPayPeriod = function () {
        $.ajax({
            type: "POST",
            url:hostUrl+ "wage/wagePayPeriod/queryList",
            data: JSON.stringify({type:type}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                if(data.success) {
                    if(data.result!=null&&data.result.length>0) {
                        if(periodFlag=="wageCalculate") {
                            window.location.href="wage_year_award_calculate.html";
                        }
                        else if(periodFlag=="createPayPeriod") {
                            initUuid();
                            var nowDate = new Date(); //将日期格式串,转换成先要的格式
                            $("#payPeriod").val(nowDate.format('yyyy-MM'));
                            $("#wageYear").val(nowDate.format('yyyy'));
                        }
                    }else {
                        initUuid();
                        var nowDate = new Date(); //将日期格式串,转换成先要的格式
                        $("#payPeriod").val(nowDate.format('yyyy-MM'));
                        $("#wageYear").val(nowDate.format('yyyy'));
                    }
                }else {
                    $("#saveBtn").addClass('ui-state-disabled');
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveBtn").addClass('ui-state-disabled');
                pop_tip_open("red","初始化计薪期间请求失败");
            }
        })
    };

    //保存前的判断以及校验
    window.saveCheck = function() {

        //判断必选项是否都已选中
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        for(var i in payPeriodArr) {
            if(payPeriodArr[i].name=="id"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","主键初始化失败，请刷新页面重新设置保存！");
                return false;
            }
            else if(payPeriodArr[i].name=="payPeriod"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","工资对比期间不能为空，年终奖期间保存失败！");
                return false;
            }
            else if(payPeriodArr[i].name=="wageYear"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","年终奖所属年份不能为空，年终奖期间保存失败！");
                return false;
            }
        }

        //新建期间
        if(periodFlag=="wageCalculate"||periodFlag=="createPayPeriod") {
            savePayPeriod("wage/wagePayPeriod/saveAnnualBonusPayPeriod");
        }

        //修改操作
        else if(periodFlag=="updatePayPeriod") {
            if(oldPayPeriod!=null&&oldPayPeriod!=undefined) {
                var tempPayPeriod = $("#payPeriod").val();
                var tempWageYear = $("#wageYear").val();
                if(tempPayPeriod==oldPayPeriod.payPeriod&&tempWageYear==oldPayPeriod.wageYear) {
                    pop_tip_open("blue","年终奖期间没有被更改!");
                    return false;
                }
                else {
                    pop_text_open("blue",'年终奖期间被修改后，期间将重新回到草稿状态，需重新计算归档，是否确定修改期间？',function(){
                        savePayPeriod("wage/wagePayPeriod/updateAnnualBonusPayPeriod");
                    },true);
                }

            }
        }
    };

    //期间保存
    window.savePayPeriod = function(url) {

        //拼接保存的dto
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="id") {
                parPeriodDto.id = payPeriodArr[i].value;
                parPeriodDto.sid = payPeriodArr[i].value;
            }
            else if(payPeriodArr[i].name=="payPeriod") {
                parPeriodDto.payPeriod = payPeriodArr[i].value;
            } else if(payPeriodArr[i].name=="wageYear") {
                parPeriodDto.wageYear = payPeriodArr[i].value;
            }
        }
        parPeriodDto.delflag = 0;
        parPeriodDto.type = type;
        $.ajax({
            url:hostUrl+url,
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(parPeriodDto),
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        setTimeout(function () {
                            $.xljUtils.tip("green",message);
                            window.location.href="wage_year_award_calculate.html";
                        }, 450);
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","发薪期间请求失败");
            }
        });
    };

    //根据项目id获取记录
    window.getPayPeriodById = function () {
        if(payPeriodId!=null&&payPeriodId!='') {
            $.ajax({
                type:'get',
                url:hostUrl +"wage/wagePayPeriod/get/"+payPeriodId,
                success: function(data) {
                    if(data!=null&&data.result!=null&&data.result!=undefined) {
                        $("#id").val(payPeriodId);
                        $("#payPeriod").val(data.result.payPeriod);
                        $("#wageYear").val(data.result.wageYear);
                        oldPayPeriod = data.result;
                    }else {
                        pop_tip_open("blue","年终奖期间异常");
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","初始化年终奖期间请求失败");
                }
            });
        }else {
            pop_tip_open("blue","参数异常，请重新刷新页面或返回重新进入!");
        }

    };

    //清除日期响应事件
    window.emptyDateObject = function(name) {
        $("#"+name).val("");
    };

    //初始化日期控件
    window.initDatetimepicker = function() {
        $('#datetimepickerByWagePayPeriod').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });

        $('#datetimepickerByWageYear').datetimepicker({
            format: 'yyyy',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 4,
            forceParse: false,
            language: 'zh-CN'
        });

    };

    //日期格式化
    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };


    $(function () {

        //初始化日期控件
        initDatetimepicker();

        //由薪资计算页面进入或者是由年终奖计算页面—新增操作进入
        if(periodFlag=="wageCalculate"||periodFlag=="createPayPeriod") {
            //期间初始化
            initPayPeriod();
        }
        //由年终奖计算页面—修改操作进入
        else if(periodFlag=="updatePayPeriod") {
            payPeriodId = localStorage.getItem('payPeriodId');
            if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
                payPeriodId = JSON.parse(payPeriodId);
            }
            getPayPeriodById();
        }

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });

    $("#saveBtn").unbind('click').on('click', function () {
        $("#payPeriodFrom").attr("data-validate-success","saveCheck()");
        $("#payPeriodFrom").submit();
    });

    $("#closeBtn").unbind('click').on('click', function () {
        //由薪资计算页面进入
        if(periodFlag=="wageCalculate") {
            window.location.href="wage_salary_calculate.html";
        }
        //由年终奖计算页面—修改操作进入或者是由年终奖计算页面—新增操作进入
        else if(periodFlag=="updatePayPeriod"||periodFlag=="createPayPeriod") {
            window.location.href="wage_year_award_calculate.html";
        }

    });

    //初始化主键ID
    window.initUuid = function() {
        $.ajax({
            type:'get',
            url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#payPeriodFrom").find("input[name='id']").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };


})(jQuery, window, document);