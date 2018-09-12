;(function($, window, document, undefined){
    /**
     * 工作记录编辑js
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
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        minView:'month',
        showMeridian : 1
    }).on('changeDate',function () {
        var startDate = $("#startTime").val();
        var endDate = $("#endTime").val();
        if (new Date(startDate) > new Date(endDate)){
            pop_tip_open("red", "开始时间不能晚于结束时间！");
            $("#endTime").val("");
        }
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
                $("#workHistroyForm").attr("data-validate-success", "window.submitAddForm()");
                // $("#workHistroyForm").submit();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                url:hostUrl+"/generator/getGuuid"+'?time='+Math.random(),
                dataType:"json",
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
                $("#workHistroyForm").attr("data-validate-success", "window.submitEditForm()");
                // $("#workHistroyForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
     window.submitAddForm = function(){
        var formElements = $("#workHistroyForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name == "startTime" || formElements[i].name == "endTime"){
                if(formElements[i].value != ''){
                    empWorkHistoryDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                }
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        empWorkHistoryDto.personId=id;//关联人员Id
        empWorkHistoryDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: hostUrl+'emp/empWorkHistory/save?time=' + Math.random(),
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        // window.history.go(-1);
                       // window.location.href = 'emp_personinfo.html?id=' + id ;
                        // window.opener.callBackPerInfo(xhr.result.id, 'workHistoryForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#workHistoryForm').jqGrid().trigger("reloadGrid");
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.message);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.message);
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

        var formElements = $("#workHistroyForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name == "startTime" || formElements[i].name == "endTime"){
                if(formElements[i].value != ''){
                    empWorkHistoryDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                }
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: hostUrl+'emp/empWorkHistory/update/'+id,
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                       // window.history.go(-1);
                        // window.opener.callBackPerInfo(id, 'workHistoryForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#workHistoryForm').jqGrid().trigger("reloadGrid");
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.message);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.message);
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
        url = hostUrl+'emp/empWorkHistory/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#startTime").attr("value",changeTimeStyle(xhr.result.startTime).Format("yyyy-MM-dd"));
                        $("#endTime").attr("value",changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd"));
                        $("#org").attr("value",xhr.result.org);
                        $("#dept").val(xhr.result.dept);
                        $("#post").attr("value",xhr.result.post);
                        $("#headship").val(xhr.result.headship);
                        $("#duty").val(xhr.result.duty);
                        $("#workType").val(xhr.result.workType);
                        $("#leaveReasons").val(xhr.result.leaveReasons);
                        $("#remark").val(xhr.result.remark);
                        $("#witness").attr("value",xhr.result.witness);
                        $("#witnessPhone").attr("value",xhr.result.witnessPhone);
                    }else{
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.message);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.message);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.message);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.message);
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
