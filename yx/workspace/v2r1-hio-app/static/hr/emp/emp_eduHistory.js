/**
 * 员工学习经历js
 */
;
(function ($, window, document, undefined) {
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

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    }

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
        $('#eduHistoryForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("eduHistoryForm").reset();
            $("#eduHistoryForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("eduHistoryForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增教育经历");
            $(".xj-form-title").text("新增教育经历");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#eduHistoryForm").attr("data-validate-success", "window.submitAddForm()");
                // $("#eduHistoryForm").submit();
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
        }else if(oper=="edit"){//编辑学习经历
            $('title').text("学习经历修改");
            $(".xj-form-title").text("学习经历修改");
            editEduHistory(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#eduHistoryForm").attr("data-validate-success", "window.submitEditForm()");
                // $("#eduHistoryForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#eduHistoryForm").serializeArray();
        var HrEmpEducationDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'startTime' || formElements[i].name == 'endTime'){
                if(formElements[i].value != ''){
                    HrEmpEducationDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                }
                continue;
            }
            HrEmpEducationDto[formElements[i].name]=formElements[i].value;
        }
        HrEmpEducationDto.delflag=0;//有效标志位
        HrEmpEducationDto.personId=id;//关联人员Id
        HrEmpEducationDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: hostUrl+'emp/hrEmpEducation/saveEmpEducation?time=' + Math.random(),
            data: JSON.stringify(HrEmpEducationDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        // window.history.go(-1);
                        //window.location.href = 'emp_personinfo.html?id=' + id ;
                        // window.opener.callBackPerInfo(xhr.result.id, 'eduHistoryForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#eduHistoryForm').jqGrid().trigger("reloadGrid");
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
        var formElements = $("#eduHistoryForm").serializeArray();
        var HrEmpEducationDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'startTime' || formElements[i].name == 'endTime'){
                if(formElements[i].value != ''){
                    HrEmpEducationDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                }
                continue;
            }
            HrEmpEducationDto[formElements[i].name]=formElements[i].value;
        }
        HrEmpEducationDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: hostUrl+'emp/hrEmpEducation/updateEdu/'+id,
            data: JSON.stringify(HrEmpEducationDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        //window.history.go(-1);
                        // window.opener.callBackPerInfo(id, 'eduHistoryForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#eduHistoryForm').jqGrid().trigger("reloadGrid");
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
    function editEduHistory(id){
        url = hostUrl+'emp/hrEmpEducation/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#startTime").attr("value",changeTimeStyle(xhr.result.startTime).Format("yyyy-MM-dd"));//入学时间
                        $("#endTime").attr("value",changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd"));//毕业时间
                        $("#schooolName").attr("value",xhr.result.schooolName);//学校名称
                        $("#major").attr("value",xhr.result.major);//专业
                        $("#studyType").val(xhr.result.studyType);//学习形式
                        $("#studyType_name").val($.hrUtils.getHRCodeNameById(xhr.result.studyType));
                        $("#education").val(xhr.result.education);//学历
                        $("#education_name").val($.hrUtils.getHRCodeNameById(xhr.result.education));
                        $("#degree").val(xhr.result.degree);//学位
                        $("#degree_name").val($.hrUtils.getHRCodeNameById(xhr.result.degree));
                        $("#isMaxEducation").val(xhr.result.isMaxEducation);//是否最高学历
                        $("#isMaxEducation_name").val($.hrUtils.getHRCodeNameById(xhr.result.isMaxEducation));
                        $("#isMaxDegree").val(xhr.result.isMaxDegree);//是否最高学位
                        $("#isMaxDegree_name").val($.hrUtils.getHRCodeNameById(xhr.result.isMaxDegree));
                        $("#remark").val(xhr.result.remark);//备注

                        $("#educationType").val(xhr.result.educationType);//学习类别
                        var educationType_name = (xhr.result.educationType=='' || xhr.result.educationType ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.educationType);
                        $("#educationType_name").val(educationType_name);
                        $("#graduationCertificateType").val(xhr.result.graduationCertificateType);//毕业证类型
                        var graduationCertificateType_name = (xhr.result.graduationCertificateType=='' || xhr.result.graduationCertificateType ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.graduationCertificateType);
                        $("#graduationCertificateType_name").val(graduationCertificateType_name);
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

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    }
})(jQuery, window, document);