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
        $('#homeRelationForm')[0].reset();
        $("#closeBtn").on("click",function(){
            $("#homeRelationForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增家庭信息");
            $(".xj-form-title").text("新增家庭信息");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#homeRelationForm").attr("data-validate-success", "window.submitAddForm()");
               // $("#homeRelationForm").submit();
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
            $('title').text("家庭信息修改");
            $(".xj-form-title").text("家庭信息修改");
            editHomeRelation(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#homeRelationForm").attr("data-validate-success", "window.submitEditForm()");
                //$("#homeRelationForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#homeRelationForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name == 'birth'){
                if(formElements[i].value !=''){
                    empWorkHistoryDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                }
                continue;
            }
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        empWorkHistoryDto.personId=id;//关联人员Id
        empWorkHistoryDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: hostUrl+'emp/hrEmpFamily/save?time=' + Math.random(),
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        // window.history.go(-1);
                        //window.location.href = 'emp_personinfo.html?id=' + id ;
                        // window.opener.callBackPerInfo(xhr.result.id, 'hrEmpFamilyForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#hrEmpFamilyForm').jqGrid().trigger("reloadGrid");
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
        var formElements = $("#homeRelationForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name=="birth"){
                if(formElements[i].value != ''){
                    empWorkHistoryDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                }else{
                    empWorkHistoryDto[formElements[i].name]=null;
                }
                continue;
            }
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: hostUrl+'emp/hrEmpFamily/update/'+id,
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        //window.history.go(-1);
                        // window.opener.callBackPerInfo(id, 'hrEmpFamilyForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#hrEmpFamilyForm').jqGrid().trigger("reloadGrid");
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
    function editHomeRelation(id){
        url = hostUrl+'emp/hrEmpFamily/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#relation").attr("value",xhr.result.relation);//关系
                        var relationName = (xhr.result.relation ==''|| xhr.result.relation == undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.relation);
                        $("#relation_name").val(relationName);
                        $("#name").attr("value",xhr.result.name);//姓名
                        var birth = (xhr.result.birth =='' || xhr.result.birth == null)?'':changeTimeStyle(xhr.result.birth).Format("yyyy-MM-dd");
                        $("#birth").attr("value",birth);//出生日期
                        $("#org").attr("value",xhr.result.org);//工作单位
                        $("#headship").attr("value",xhr.result.headship);//职务
                        $("#telphone").attr("value",xhr.result.telphone);//联系电话

                        $("#politicalStatus").val(xhr.result.politicalStatus);//政治面貌
                        var partyFigureName = (xhr.result.politicalStatus ==''|| xhr.result.politicalStatus == undefined)?'':$.hrUtils.getHRCodeNameById(xhr.result.politicalStatus);
                        $("#politicalStatus_name").val(partyFigureName);
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
    };
})(jQuery, window, document)
