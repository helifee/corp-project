/**
 * ruanxin
 * 发薪期间设置js
 */
;
(function ($, window, document, undefined) {

    var type = "1";//默认为月期间

    var periodFlag = false;//是否设置期间

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
                        window.location.href="wage_salary_calculate.html";
                    }else {
                        var nowDate = new Date().format('yyyy-MM'); //将日期格式串,转换成先要的格式
                        $("#payPeriod").val(nowDate);
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

    //新增发薪期间保存
    window.payPeriodSave = function() {

        //未保存薪资期间
        if(!periodFlag) {
            pop_tip_open("blue","数据保存失败，必须先设置计薪期间！");
            return false;
        }

        //判断必选项是否都已选中
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="payPeriod"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","数据保存失败！发薪期间不能为空");
                return false;
            }
        }

        //拼接保存的dto
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="payPeriod") {
                parPeriodDto.payPeriod = payPeriodArr[i].value;
            }
        }
        // $("#saveBtn").addClass('ui-state-disabled');
        parPeriodDto.delflag = 0;
        parPeriodDto.type = type;
        $.ajax({
            url:hostUrl+"wage/wagePayPeriod/save",
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
                            $.xljUtils.tip("green","发薪期间新增成功！");
                            window.location.href="wage_salary_calculate.html";
                        }, 300);
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","发薪期间请求失败");
            }
        });
    };

    //清除日期响应事件
    window.emptyDateObject = function() {
        $("#payPeriod").val("");
    };

    //初始化日期控件
    window.initDatetimepicker = function() {
        var picker = $('#datetimepicker').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
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

        //计薪期间设置
        var querydata ={time:new Date()};
        $.ajax({
            type:'post',
            dataType:'json',
            contentType:'application/json',
            data:JSON.stringify(querydata),
            url:hostUrl+"wage/wagePeriod/queryList",
            success: function(data) {
                //记录已经存在
                if(data.result!=null&&data.result.length>0) {
                    var tempDate = data.result[0];
                    var startDate = tempDate.startDate;
                    if (startDate === undefined || startDate === null || startDate === "") {//计薪期间有设置，但是开始日期为空
                        pop_text_open("blue", '请先设置计薪期间', function () {
                            window.location.href = "wage_period.html";
                        }, function () {
                            return;
                        });
                    }else {
                        periodFlag = true;
                        initDatetimepicker();//初始化日期空间
                        initPayPeriod();
                    }
                }
                //记录不存在，需新增插入
                else {
                    pop_text_open("blue", '请先设置计薪期间', function () {
                        window.location.href = "wage_period.html";
                    }, function () {
                        return;
                    });
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化计薪期间请求失败");
            }
        });




    });


})(jQuery, window, document);