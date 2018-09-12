;(function($, window, document, undefined){
    /**
     * 专业资格认证编辑js
     */
    var id;//编辑的id
    var name;//编辑的name
    var oper;//操作
    var rowData;//选中的数据
    var uuid;
    var url;//提交的地址
    var type;//提交方法
    /**
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem:    ["上午", "下午"],
        //suffix:      ["st", "nd", "rd", "th"],
        today:       "今天"
    };
    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language : 'zh',
        format : "yyyy-mm-dd",
        minView:'month',
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    }

    $(function(){
        //初始页面
        initPage();
    });

    //todo 计算剩余支付金额
    window.setSurplusPay = function(){
        var totalCost = $("#totalCost").val();
        var alreadyPay = $("#alreadyPay").val();
        if(totalCost != '' && alreadyPay != ''){
            if($.isNumeric(totalCost) && $.isNumeric(alreadyPay)){
                if(parseInt(totalCost)<parseInt(alreadyPay)){
                    $.xljUtils.tip("red","总金额不能小于已支付金额");
                }else{
                    $("#surplusPay").val(totalCost - alreadyPay);
                }
            }else{
                $("#surplusPay").val('');
            }
        }
    }


    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        id=$.xljUtils.getUrlParam("id");
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#hrRecRecruitForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrRecRecruitForm").reset();
            $("#hrRecRecruitForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrRecRecruitForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增招聘信息");
            $(".xj-form-title").text("新增招聘信息");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrRecRecruitForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrRecRecruitForm").submit();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                url:baseUrl+"/generator/getGuuid"+'?time='+Math.random(),
                dataType:"json",
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){
            $('title').text("编辑招聘信息");
            $(".xj-form-title").text("编辑招聘信息");
            editHrEmpMajorInfo(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrRecRecruitForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrRecRecruitForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrRecRecruitForm").serializeArray();
        var hrRecRecruitDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'time'){
                hrRecRecruitDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                continue;
            }
            hrRecRecruitDto[formElements[i].name]=formElements[i].value;
        }
        hrRecRecruitDto.delflag=0;//有效标志位
        hrRecRecruitDto.personId=id;//关联人员Id
        hrRecRecruitDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrRecRecruit/save?time=' + Math.random(),
            data: JSON.stringify(hrRecRecruitDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrRecRecruitForm');
                        //关闭窗口
                        window.close();
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    }
    /**
     * 表单--修改提交
     */
    window.submitEditForm = function(){
        var formElements = $("#hrRecRecruitForm").serializeArray();
        var hrRecRecruitDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'time'){
                hrRecRecruitDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                continue;
            }
            hrRecRecruitDto[formElements[i].name]=formElements[i].value;
        }
        hrRecRecruitDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrRecRecruit/update/'+id,
            data: JSON.stringify(hrRecRecruitDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrRecRecruitForm');
                        //关闭窗口
                        window.close();
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 编辑专业资格认证信息
     * @param
     */
    function editHrEmpMajorInfo(id){
        url = baseUrl+'emp/hrRecRecruit/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#channelId").attr("value",xhr.result.channelId);
                        $("#channelId_name").attr("value",$.hrUtils.getHRCodeNameById(xhr.result.channelId));
                        $("#totalCost").attr("value",xhr.result.totalCost);
                        $("#alreadyPay").attr("value",xhr.result.alreadyPay);
                        $("#surplusPay").attr("value",xhr.result.surplusPay);
                        $("#thisPay").attr("value",xhr.result.thisPay);
                        $("#payCounts").attr("value",xhr.result.payCounts);
                        var time = xhr.result.time==null ? '' : changeTimeStyle(xhr.result.time).Format("yyyy-MM-dd");
                        $("#time").attr("value",time);
                        $("#payWay").attr("value",xhr.result.payWay);
                    }else{
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","服务异常,请联系管理员！");
                                break;
                        }
                    }

                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }

        });
    }

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
    }

    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }
})(jQuery, window, document)
