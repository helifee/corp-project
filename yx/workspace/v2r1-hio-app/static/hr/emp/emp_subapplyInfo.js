;(function($, window, document, undefined){
    /**
     * 工资补助变动编辑js
     */
    var id;//编辑的id
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
        format : "yyyy-mm-dd hh:ii:00",
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });

    $(function(){
        //初始页面
        initPage();
    });
    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        id=$.xljUtils.getUrlParam("id");//add对应关联人员Id  edit对应被编辑对象id
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#workHistroyForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("workHistroyForm").reset();
            $("#workHistroyForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("workHistroyForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增工作经历");
            $(".xj-form-title").text("新增工作经历");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                submitAddForm();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                dataType:"json",
                url:baseUrl+"/generator/getGuuid"+'?time='+Math.random(),
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){//编辑工作经历
            $('title').text("工作经历修改");
            $(".xj-form-title").text("工作经历修改");
            editWorkHistory(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                submitEditForm();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    function submitAddForm(){
        var formElements = $("#workHistroyForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        empWorkHistoryDto.personId=id;//关联人员Id
        empWorkHistoryDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/empWorkHistory/save?time=' + Math.random(),
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
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
    function submitEditForm(){
        var formElements = $("#workHistroyForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/empWorkHistory/update/'+id,
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
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
     * 编辑工作经历
     * @param
     */
    function editWorkHistory(id){
        url = baseUrl+'emp/empWorkHistory/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#startTime").attr("value",xhr.result.startTime);
                        $("#endTime").attr("value",xhr.result.endTime);
                        $("#org").attr("value",xhr.result.org);
                        $("#post").attr("value",xhr.result.post);
                        $("#witness").attr("value",xhr.result.witness);
                        $("#witnessPhone").attr("value",xhr.result.witnessPhone);
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

})(jQuery, window, document)
