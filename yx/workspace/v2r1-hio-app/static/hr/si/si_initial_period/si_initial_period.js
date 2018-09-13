/**
 * ruanxin
 * 社保期间业务表——增加js
 */
;
(function ($, window, document, undefined) {

    var periodFlag = false;//是否设置期间

    //初始化页面，如果已存在社保期间，则直接跳转，否则在此页面进行新建
    window.initPayPeriod = function () {
        $.ajax({
            type: "POST",
            url:hostUrl+ "si/siCalculateDate/queryList",
            data: JSON.stringify({}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                if(data.success) {
                    if(data.result!=null&&data.result.length>0) {
                        window.location.href="../si_file/si_file.html";
                    }else {
                        var nowDate = new Date().format('yyyy-MM'); //将日期格式串,转换成先要的格式
                        $("#siTime").val(nowDate);
                        initUuid();
                    }
                }else {
                    $("#saveBtn").addClass('ui-state-disabled');
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveBtn").addClass('ui-state-disabled');
                pop_tip_open("red","初始化社保期间请求失败");
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
            if(payPeriodArr[i].name=="siTime"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue", "数据保存失败！社保期间不能为空");
                return;
            }
        }
        //拼接保存的dto
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="siTime") {
                parPeriodDto.siTime = payPeriodArr[i].value;
            }
            if(payPeriodArr[i].name=="id") {
                parPeriodDto.id = payPeriodArr[i].value;
                parPeriodDto.sid = payPeriodArr[i].value;
            }
        }

        parPeriodDto.delflag = 0;
        $.ajax({
            url:hostUrl+"si/siCalculateDate/save",
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
                            $.xljUtils.tip("green","社保期间新增成功！");
                            window.location.href="../si_file/si_file.html";
                        }, 300);
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","社保期间新增失败");
            }
        });
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

    //清除日期响应事件
    window.emptyDateObject = function(dateIdText) {
        $("#"+dateIdText).val("");
    };

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
                            window.location.href = "si_wage_period.html";
                        }, function () {
                            return;
                        });
                    }else {
                        periodFlag = true;
                        initDatetimepicker();//初始化日期空间
                        initPayPeriod();//初始化主键
                    }
                }
                //记录不存在，需新增插入
                else {
                    pop_text_open("blue", '请先设置计薪期间', function () {
                        window.location.href = "si_wage_period.html";
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