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
        weekStart : 1,
        todayBtn : 1,
        minView:'month',
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
        id=$.xljUtils.getUrlParam("id");
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#hrEmpMajorForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrOjtTrainForm").reset();
            $("#hrEmpMajorForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrEmpMajorForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增专业资格认证");
            $(".xj-form-title").text("新增专业资格认证");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpMajorForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrEmpMajorForm").submit();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
                dataType:"json",
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){
            $('title').text("编辑专业资格认证");
            $(".xj-form-title").text("编辑专业资格认证");
            editHrEmpMajorInfo(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpMajorForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrEmpMajorForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrEmpMajorForm").serializeArray();
        var hrEmpMajorDto = {};
        for(var i in formElements){
            if(formElements[i].name == 'getTime' || formElements[i].name == 'endTime'){
                if(formElements[i].value != ''){
                    hrEmpMajorDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrEmpMajorDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpMajorDto.delflag=false;//有效标志位
        hrEmpMajorDto.personId=id;//关联人员Id
        hrEmpMajorDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrEmpMajor/save?time=' + Math.random(),
            data: JSON.stringify(hrEmpMajorDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrEmpMajorForm');
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
        var formElements = $("#hrEmpMajorForm").serializeArray();
        var hrEmpMajorDto = {};
        for(var i in formElements){
            if(formElements[i].name == 'getTime' || formElements[i].name == 'endTime'){
                if(formElements[i].value != ''){
                    hrEmpMajorDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }else{
                    hrEmpMajorDto[formElements[i].name]=null;
                }
                continue;
            }
            hrEmpMajorDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpMajorDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrEmpMajor/update/'+id,
            data: JSON.stringify(hrEmpMajorDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrEmpMajorForm');
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
        url = baseUrl+'emp/hrEmpMajor/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#name").attr("value",xhr.result.name);//名称
                        $("#getTime").attr("value",changeTimeStyle(xhr.result.getTime).Format("yyyy-MM-dd"));//获得时间
                        $("#approvalOrg").attr("value",xhr.result.approvalOrg);//发证单位
                        $("#certificateCode").attr("value",xhr.result.certificateCode);//证书编号
                        $("#rank").attr("value",xhr.result.rank);//等级
                        var endTime = xhr.result.endTime==null?'':changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd");
                        $("#endTime").attr("value",endTime);//截止日期
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
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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
