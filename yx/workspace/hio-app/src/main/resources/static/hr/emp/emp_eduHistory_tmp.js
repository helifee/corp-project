/**
 * 员工学习经历中间表js
 */
;
(function ($, window, document, undefined) {

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    }

    var uuid;//记录主键
    var oper;//操作类型
    var id;//中间表主键
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
            pop_tip_open("red", "入学时间不能晚于毕业时间！");
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
                //submitAddForm();
                $("#eduHistoryForm").attr("data-validate-success", "window.submitAddForm()");
                $("#eduHistoryForm").submit();
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
        }else if(oper=="edit"){//编辑学习经历
            var id=$.xljUtils.getUrlParam("id");//add对应关联人员Id  edit对应被编辑对象id
            $('title').text("学习经历修改");
            $(".xj-form-title").text("学习经历修改");
            editEduHistory(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                //submitEditForm();
                $("#eduHistoryForm").attr("data-validate-success", "window.submitEditForm()");
                $("#eduHistoryForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var applyId =$.xljUtils.getUrlParam("applyId");//获取审批单ID
        var formElements = $("#eduHistoryForm").serializeArray();
        var hrEmpEducationTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'startTime' || formElements[i].name == 'endTime'){
                hrEmpEducationTmpDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                continue;
            }
            hrEmpEducationTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpEducationTmpDto.delflag = false;//有效标志位
        hrEmpEducationTmpDto.applyId = applyId;//关联申请单Id
        hrEmpEducationTmpDto.id = uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrEmpEducationTmp/saveEmpEducation?time=' + Math.random(),
            data: JSON.stringify(hrEmpEducationTmpDto),
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
    window.submitEditForm = function(){
        var id=$.xljUtils.getUrlParam("id");//add对应关联人员Id  edit对应被编辑对象id
        var formElements = $("#eduHistoryForm").serializeArray();
        var HrEmpEducationDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'startTime' || formElements[i].name == 'endTime'){
                HrEmpEducationDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                continue;
            }
            HrEmpEducationDto[formElements[i].name]=formElements[i].value;
        }
        HrEmpEducationDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrEmpEducationTmp/updateEdu/'+id,
            data: JSON.stringify(HrEmpEducationDto),
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
    function editEduHistory(id){
        url = baseUrl+'emp/hrEmpEducationTmp/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        var startTime = (xhr.result.startTime == null || xhr.result.startTime == '')?'':changeTimeStyle(xhr.result.startTime).Format("yyyy-MM-dd");
                        $("#startTime").attr("value",startTime);//入学时间
                        var endTime = (xhr.result.endTime == null || xhr.result.endTime == '')?'':changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd");
                        $("#endTime").attr("value",endTime);//毕业时间
                        $("#schooolName").attr("value",xhr.result.schooolName);//学校名称
                        $("#major").attr("value",xhr.result.major);//专业
                        $("#studyType").val(xhr.result.studyType);//学习形式
                        var studyTypeName = (xhr.result.studyType=='' || xhr.result.studyType ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.studyType);
                        $("#studyType_name").val(studyTypeName);//代码项
                        $("#education").val(xhr.result.education);//学历
                        var education_name = (xhr.result.education=='' || xhr.result.education ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.education);
                        $("#education_name").val(education_name);//代码项
                        $("#degree").val(xhr.result.degree);//学位
                        var degree_name = (xhr.result.degree=='' || xhr.result.degree ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.degree);
                        $("#degree_name").val(degree_name);//代码项
                        $("#isMaxEducation").val(xhr.result.isMaxEducation);//是否最高学历
                        var isMaxEducation_name = (xhr.result.isMaxEducation=='' || xhr.result.isMaxEducation ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.isMaxEducation);
                        $("#isMaxEducation_name").val(isMaxEducation_name);//代码项
                        $("#isMaxDegree").val(xhr.result.isMaxDegree);//是否最高学位
                        var isMaxDegree_name = (xhr.result.isMaxDegree=='' || xhr.result.isMaxDegree ==undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.isMaxDegree);
                        $("#isMaxDegree_name").val(isMaxDegree_name);//代码项
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

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    }

})(jQuery, window, document);