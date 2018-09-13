/**
 * ruanxin
 * 社保期间业务表——增加js
 */
;
(function ($, window, document, undefined) {

    var accountId;//父页面当前选中的档案

    //初始化账套
    window.initAccount = function() {
        $.ajax({    //查询所有的账套列表
            type: "POST",
            url:serviceUrl+ "/si/socialFundAccount/querySiAccountListForShow",
            data: JSON.stringify({}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                var result = data.result;
                if(result!=null&&result!=''&&result.length>0) {
                    for (var i = 0; i < result.length; i++) {
                        $("#accountSelect").append(' <option value="'+result[i].id+'">'+result[i].orgName+'-'+result[i].name+'</option>');
                        if(result[i].id==accountId) {
                            $("#accountSelect option[value='"+result[i].id+"']").prop("selected", true);
                            $("#accountId").val(result[i].id);//为账套赋值
                            setPayPeriod(result[i].id);//为发薪月份赋值
                        }
                    }
                }
            }
        });
    }

   /* //根据账套更改账套隐藏域的值
    $("#accountSelect").change(function(){
        var temp = $("#accountSelect").val();
        $("#accountId").val(temp);
        setPayPeriod(temp);
    });*/

    //根据账套ID查询下个期间
    window.setPayPeriod = function(accountId) {
        var uBody = "/si/siCalculateDate/queryPayPeriodByAccountId/" + accountId;
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#siTime").val(data.result);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "根据账套获取最新发薪月份失败");
            }
        })
    }

    //点击确定
    window.payPeriodSave = function() {
        window.location.href="../si_file/si_file.html";
    }

    /*//新增发薪期间保存
    window.payPeriodSave = function() {
        //判断必选项是否都已选中
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="siTime"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","数据保存失败！社保期间不能为空");
                return;
            }else if (payPeriodArr[i].name=="accountId"&&(payPeriodArr[i].value==""||payPeriodArr[i].value==null)) {
                pop_tip_open("blue","数据保存失败！所属账套不能为空");
                return;
            }
        }
        var description=$("#description").val();
        if(description!="" && description.length>1000){
            pop_tip_open("blue","描述长度不能超过1000！");
            return;
        }
        //拼接保存的dto
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="siTime") {
                parPeriodDto.siTime = payPeriodArr[i].value;
            }
            if(payPeriodArr[i].name=="accountId") {
                parPeriodDto.accountId = payPeriodArr[i].value;
            }
            if(payPeriodArr[i].name=="id") {
                parPeriodDto.id = payPeriodArr[i].value;
            }
            if(payPeriodArr[i].name=="description") {
                parPeriodDto.description = payPeriodArr[i].value;
            }
        }

        parPeriodDto.delflag = false;
        $.ajax({
            url:baseUrl+"si/siCalculateDate/save",
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
                        $.xljUtils.tip("green","社保期间新增成功！");
                        // refreshParent();
                        window.opener.focusSiPeriodList(parPeriodDto.id);
                        closePage();
                    }else {
                        pop_tip_open("blue",msg);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","社保期间新增失败");
            }
        });
    }*/

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
    }

    //清除日期响应事件
    window.emptyDateObject = function(dateIdText) {
        $("#"+dateIdText).val("");
    }

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
    }

    //刷新父页面表格数据
    window.refreshParent = function() {
        window.opener.jqGridCalculate.jqGrid('setGridParam',{ postData:{accountId:null}}).trigger("reloadGrid");
    }

    //关闭页面
    window.closePage = function() {
        //关闭本页面
        window.opener=null;
        window.open('','_self');
        window.close();
    }

    $(function () {
       // accountId  = window.opener.accountId;
        initAccount();//初始化可选账套
        initDatetimepicker();//初始化日期空间
        initUuid();//初始化主键
    });

})(jQuery, window, document);