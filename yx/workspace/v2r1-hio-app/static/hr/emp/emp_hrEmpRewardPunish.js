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
        $('#hrEmpRewardPunishForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrEmpRewardPunishForm").reset();
            $("#hrEmpRewardPunishForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrEmpRewardPunishForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增奖惩情况信息");
            $(".xj-form-title").text("新增奖惩情况信息");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpRewardPunishForm").attr("data-validate-success", "window.submitAddForm()");
                // $("#hrEmpRewardPunishForm").submit();
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
        }else if(oper=="edit"){
            $('title').text("编辑奖惩情况信息");
            $(".xj-form-title").text("编辑奖惩情况信息");
            editHrEmpRewardPunishInfo(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpRewardPunishForm").attr("data-validate-success", "window.submitEditForm()");
                // $("#hrEmpRewardPunishForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrEmpRewardPunishForm").serializeArray();
        var hrEmpRewardPunishDto = {};
        for(var i in formElements){
            if(formElements[i].name == 'getTime'){
                if(formElements[i].value != ''){
                    hrEmpRewardPunishDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrEmpRewardPunishDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpRewardPunishDto.delflag=0;//有效标志位
        hrEmpRewardPunishDto.personId=id;//关联人员Id
        hrEmpRewardPunishDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: hostUrl+'emp/hrEmpRewardPunish/save?time=' + Math.random(),
            data: JSON.stringify(hrEmpRewardPunishDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        // window.opener.callBackPerInfo(xhr.result.id, 'hrEmpRewardPunishForm');
                        //关闭窗口
                        // window.close();
                        // window.history.go(-1);
                       // window.location.href = 'emp_personinfo.html?id=' + id ;
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#hrEmpRewardPunishForm').jqGrid().trigger("reloadGrid");
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
        var formElements = $("#hrEmpRewardPunishForm").serializeArray();
        var hrEmpRewardPunishDto = {};
        for(var i in formElements){
            if(formElements[i].name == 'getTime'){
                if(formElements[i].value != ''){
                    hrEmpRewardPunishDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrEmpRewardPunishDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpRewardPunishDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: hostUrl+'emp/hrEmpRewardPunish/update/'+id,
            data: JSON.stringify(hrEmpRewardPunishDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        // window.opener.callBackPerInfo(id, 'hrEmpRewardPunishForm');
                        //关闭窗口
                        // window.close();
                        // window.history.go(-1);
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#hrEmpRewardPunishForm').jqGrid().trigger("reloadGrid");
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
     * 编辑奖惩信息
     * @param
     */
    function editHrEmpRewardPunishInfo(id){
        url = hostUrl+'emp/hrEmpRewardPunish/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#name").attr("value",xhr.result.name);//名称
                        var getTime = xhr.result.getTime == null ?'':changeTimeStyle(xhr.result.getTime).Format("yyyy-MM-dd");
                        $("#getTime").attr("value",getTime);//获得时间
                        $("#type").attr("value",xhr.result.type);//类型
                        $("#cause").attr("value",xhr.result.cause);//原因
                        $("#approvalOrg").attr("value",xhr.result.approvalOrg);//批准机构
                        $("#documentNumber").attr("value",xhr.result.documentNumber);//公文编号
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
