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
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        minView:'month',
        forceParse : 0,
        showMeridian : 1
    });

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };

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
        $('#languageAbilityForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrOjtTrainForm").reset();
            $("#languageAbilityForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("languageAbilityForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增语言能力信息");
            $(".xj-form-title").text("新增语言能力信息");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#languageAbilityForm").attr("data-validate-success", "window.submitAddForm()");
                $("#languageAbilityForm").submit();
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
            $('title').text("编辑语言能力信息");
            $(".xj-form-title").text("编辑语言能力信息");
            editLanaguageAbility(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#languageAbilityForm").attr("data-validate-success", "window.submitEditForm()");
                $("#languageAbilityForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
     window.submitAddForm = function(){
        var formElements = $("#languageAbilityForm").serializeArray();
        var hrEmpLanguageAbilityDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){   //以_name结尾跳过
                continue;
            }
            if(formElements[i].name == 'getTime'){
                if(formElements[i].value != ''){
                    hrEmpLanguageAbilityDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrEmpLanguageAbilityDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpLanguageAbilityDto.delflag=false;//有效标志位
        hrEmpLanguageAbilityDto.personId=id;//关联人员Id
        hrEmpLanguageAbilityDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrEmpLanguageAbility/save?time=' + Math.random(),
            data: JSON.stringify(hrEmpLanguageAbilityDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrEmpLanguageAbilityForm');
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
        var formElements = $("#languageAbilityForm").serializeArray();
        var hrEmpLanguageAbilityDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){   //以_name结尾跳过
                continue;
            }
            if(formElements[i].name == 'getTime'){
                if(formElements[i].value != ''){
                    hrEmpLanguageAbilityDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            hrEmpLanguageAbilityDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpLanguageAbilityDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrEmpLanguageAbility/update/'+id,
            data: JSON.stringify(hrEmpLanguageAbilityDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrEmpLanguageAbilityForm');
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
     * 编辑语言能力
     * @param
     */
    function editLanaguageAbility(id){
        url = baseUrl+'emp/hrEmpLanguageAbility/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#languageKind").attr("value",xhr.result.languageKind);//语种
                        $("#rank").attr("value",xhr.result.rank);//等级
                        $("#getTime").attr("value",changeTimeStyle(xhr.result.getTime).Format("yyyy-MM-dd"));//获取时间
                        $("#certifiedName").attr("value",xhr.result.certifiedName);//证书名称
                        $("#approvalOrg").attr("value",xhr.result.approvalOrg);//发证单位
                        $("#certificateCode").attr("value",xhr.result.certificateCode);//证书编号
                        $("#isSecondLanguage").val(xhr.result.isSecondLanguage);//是否是第二语言
                        $("#isSecondLanguage_name").val($.hrUtils.getHRCodeNameById(xhr.result.isSecondLanguage));
                        $("#isMaxRank").val(xhr.result.isMaxRank);//是否最高等级
                        $("#isMaxRank_name").val($.hrUtils.getHRCodeNameById(xhr.result.isMaxRank));
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

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    }

})(jQuery, window, document)
