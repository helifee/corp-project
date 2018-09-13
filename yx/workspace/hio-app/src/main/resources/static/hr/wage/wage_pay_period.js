/**
 * ruanxin
 * 发薪期间设置js
 */
;
(function ($, window, document, undefined) {


    //新增发薪期间保存  save
    window.payPeriodSave = function() {
        //判断必选项是否都已选中
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="payPeriod"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","数据保存失败！发薪期间不能为空");
                return;
            }
        }

        //拼接保存的dto
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="payPeriod") {
                parPeriodDto.payPeriod = payPeriodArr[i].value;
            }
            if(payPeriodArr[i].name=="id") {
                parPeriodDto.id = payPeriodArr[i].value;
            }
        }

        $("#saveBtn").addClass('ui-state-disabled');

        parPeriodDto.delflag = false;
        $.ajax({
            url:baseUrl+"wage/wagePayPeriod/save",
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(parPeriodDto),
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if(successFlag) {
                        $.xljUtils.tip("green","发薪期间新增成功！");
                        window.opener.focusSalaryPayPeriodList(parPeriodDto.id);
                        // refreshParent();
                        closePage();
                    }else {
                        pop_tip_open("blue",msg);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","发薪期间请求失败");
            }
        });
    };

    //跳转至薪资计算页面
    window.savePayPeriod = function () {
        window.location.href="wage_salary_calculate.html";
    };

    //清除日期响应事件
    window.emptyDateObject = function() {
        $("#payPeriod").val("");
    };

    //初始化主键ID
    window.initUuid = function() {
        $.ajax({
            type:'get',
            url:serviceUrl +  "sys/uuid/generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#payPeriodFrom").find("input[name='id']").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
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


    $(function () {
        initDatetimepicker();//初始化日期空间
        initUuid();//初始化主键
    });

})(jQuery, window, document);