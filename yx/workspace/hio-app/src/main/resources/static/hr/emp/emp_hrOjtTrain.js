;(function($, window, document, undefined){
    /**
     * 家庭信息编辑js
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
        id=$.xljUtils.getUrlParam("id");
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#hrOjtTrainForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrOjtTrainForm").reset();
            $("#hrOjtTrainForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrOjtTrainForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增培训经历");
            $(".xj-form-title").text("新增培训经历");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrOjtTrainForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrOjtTrainForm").submit();

            });
            //初始化UUID
            $.ajax({
                type:"GET",
                dataType:"json",
                url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){
            $('title').text("编辑培训经历");
            $(".xj-form-title").text("编辑培训经历");
            editHomeRelation(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrOjtTrainForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrOjtTrainForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrOjtTrainForm").serializeArray();
        var hrOjtTrainDto = {};
        for(var i in formElements){
            if(formElements[i].name=='startTime'|| formElements[i].name=='endTime'){
                if(formElements[i].value != ''){
                    hrOjtTrainDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrOjtTrainDto[formElements[i].name]=formElements[i].value;
        }
        hrOjtTrainDto.delflag=false;//有效标志位
        hrOjtTrainDto.personId=id;//关联人员Id
        hrOjtTrainDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrOjtTrain/save?time=' + Math.random(),
            data: JSON.stringify(hrOjtTrainDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrOjtTrainForm');
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
        var formElements = $("#hrOjtTrainForm").serializeArray();
        var hrOjtTrainDto = {};
        for(var i in formElements){
            if(formElements[i].name=='startTime'|| formElements[i].name=='endTime'){
                if(formElements[i].value != ''){
                    hrOjtTrainDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrOjtTrainDto[formElements[i].name]=formElements[i].value;
        }
        hrOjtTrainDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrOjtTrain/update/'+id,
            data: JSON.stringify(hrOjtTrainDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrOjtTrainForm');
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
     * 编辑培训经历
     * @param
     */
    function editHomeRelation(id){
        url = baseUrl+'emp/hrOjtTrain/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#subjectId").attr("value",xhr.result.subjectId);//课程
                        $("#startTime").attr("value",changeTimeStyle(xhr.result.startTime).Format("yyyy-MM-dd"));//开始时间
                        $("#endTime").attr("value",changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd"));//结束时间
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
