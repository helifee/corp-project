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
    }

    $(function(){
        //初始页面
        initPage();
    });

    /**
     * 调动前机构回调函数
     */
    window.orgBeforeCallback = function (data) {
        $("#orgBeforeName").val(data.name);
        $("#orgBefore").val(data.id);
    }
    /**
     * 调动后机构回调函数
     */
    window.orgAfterCallback = function (data) {
        $("#orgAfterName").val(data.name);
        $("#orgAfter").val(data.id);
    }
    /**
     * 调动前部门回调函数
     */
    window.deptBefpreCallback = function (data) {
        $("#deptBefpreName").val(data.name);
        $("#deptBefpre").val(data.id);
    }

    /**
     * 调动后部门回调函数
     */
    window.deptAfterCallback = function (data) {
        $("#deptAfterName").val(data.name);
        $("#deptAfter").val(data.id);
    }

    /**
     * 调动前岗位回调函数
     */
    window.postBeforeCallback = function (data) {
        $("#postBeforeName").val(data.name);
        $("#postBefore").val(data.id);
    }

    /**
     * 调动后岗位回调函数
     */
    window.postAfterCallback = function (data) {
        $("#postAfterName").val(data.name);
        $("#postAfter").val(data.id);
    }

    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        id=$.xljUtils.getUrlParam("id");
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#hrEmpChangeForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrOjtTrainForm").reset();
            $("#hrEmpChangeForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增变动情况");
            $(".xj-form-title").text("新增变动情况");
            $("#changeTime").val(new Date().Format("yyyy-MM-dd"));//默认变动时间为当前日期
            $("#effectTime").val(new Date().Format("yyyy-MM-dd"));//默认生效时间为当前日期
            //初始化数据数据
            initData();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpChangeForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrEmpChangeForm").submit();
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
            $('title').text("编辑变动情况");
            $(".xj-form-title").text("编辑变动情况");
            editHrEmpChangeInfo(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrEmpChangeForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrEmpChangeForm").submit();
            });
        }
    }

    //todo 初始化页面数据
    function initData(){
        url = baseUrl+'emp/hrEmpChange/queryList';
        $.ajax({
            type:'POST',
            url:url+'?time='+Math.random(),
            data:JSON.stringify({"personId":id,"isLastChange":'1009100036'}),
            dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        if(xhr.result!=null && xhr.result.length > 0){
                            $("#type").val(xhr.result[0].type);//调动类型
                            var typeName = (xhr.result[0].type == '' || xhr.result[0].type == undefined) ?'':$.hrUtils.getHRCodeNameById(xhr.result[0].type);
                            $("#type_name").val(typeName);
                            var changeTime = (xhr.result[0].changeTime == '' || xhr.result[0].changeTime == undefined) ?'':changeTimeStyle(xhr.result[0].changeTime).Format("yyyy-MM-dd");
                            $("#changeTime").val(changeTime);
                            var effectTime = (xhr.result[0].effectTime == '' || xhr.result[0].effectTime == undefined) ?'':changeTimeStyle(xhr.result[0].effectTime).Format("yyyy-MM-dd");
                            $("#effectTime").val(effectTime);
                            $("#orgBefore").val(xhr.result[0].orgAfter);//调动前机构(注意要使用调动后的值)
                            var orgBefore = (xhr.result[0].orgAfter=='' || xhr.result[0].orgAfter == undefined)?'':$.hrUtils.getHROrgNameById(xhr.result[0].orgAfter);
                            $("#orgBeforeName").val(orgBefore);
                            $("#orgAfter").val(xhr.result[0].orgAfter);//调动后机构
                            var orgAfter = (xhr.result[0].orgAfter=='' || xhr.result[0].orgAfter == undefined)?'':$.hrUtils.getHROrgNameById(xhr.result[0].orgAfter);
                            $("#orgAfterName").val(orgAfter);
                            $("#deptBefpre").val(xhr.result[0].deptAfter);//调动前部门（注意使用调动后的部门）
                            var deptBefpre = (xhr.result[0].deptAfter=='' || xhr.result[0].deptAfter == undefined)?'':$.hrUtils.getHROrgNameById(xhr.result[0].deptAfter);
                            $("#deptBefpre_name").val(deptBefpre);
                            $("#deptAfter").val(xhr.result[0].deptAfter);//调动后部门
                            var deptAfter = (xhr.result[0].deptAfter=='' || xhr.result[0].deptAfter == undefined)?'':$.hrUtils.getHROrgNameById(xhr.result[0].deptAfter);
                            $("#deptAfterName").val(deptAfter);
                            $("#postBefore").val(xhr.result[0].postAfter);//调动前岗位（注意使用调动后岗位）
                            var postBefore =(xhr.result[0].postAfter=='' || xhr.result[0].postAfter == undefined)?'':$.hrUtils.getHRPostNameById(xhr.result[0].postAfter);
                            $("#postBeforeName").val(postBefore);
                            $("#postAfter").val(xhr.result[0].postAfter);//调动后岗位
                            var postAfter =(xhr.result[0].postAfter=='' || xhr.result[0].postAfter == undefined)?'':$.hrUtils.getHRPostNameById(xhr.result[0].postAfter);
                            $("#postAfterName").val(postAfter);
                            $("#headshipRankBefore").val(xhr.result[0].headshipRankAfter);//调动前职级
                            var headshipRankBefore = (xhr.result[0].headshipRankAfter == '' || xhr.result[0].headshipRankAfter == undefined) ?'':$.hrUtils.getHRCodeNameById(xhr.result[0].headshipRankAfter);
                            $("#headshipRankBefore_name").val(headshipRankBefore);
                            $("#headshipRankAfter").val(xhr.result[0].headshipRankAfter);//调动前职级
                            var headshipRankAfter = (xhr.result[0].headshipRankAfter == '' || xhr.result[0].headshipRankAfter == undefined) ?'':$.hrUtils.getHRCodeNameById(xhr.result[0].headshipRankAfter);
                            $("#headshipRankAfter_name").val(headshipRankBefore);
                        }
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
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrEmpChangeForm").serializeArray();
        var hrEmpChangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'changeTime' || formElements[i].name == 'effectTime'){
                if(formElements[i].value != ''){
                    hrEmpChangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");
                }
                continue;
            }
            hrEmpChangeDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpChangeDto.delflag=false;//有效标志位
        hrEmpChangeDto.personId=id;//关联人员Id
        hrEmpChangeDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrEmpChange/saveEmpChange?time=' + Math.random(),
            data: JSON.stringify(hrEmpChangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        window.opener.callBackPerInfo(xhr.result.id, 'hrEmpChangeForm');
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
        var formElements = $("#hrEmpChangeForm").serializeArray();
        var hrEmpChangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'changeTime' || formElements[i].name == 'effectTime'){
                if(formElements[i].value != ''){
                    hrEmpChangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");
                }
                continue;
            }
            hrEmpChangeDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpChangeDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrEmpChange/updateEmpChange/'+id,
            data: JSON.stringify(hrEmpChangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        window.opener.callBackPerInfo(id, 'hrEmpChangeForm');
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
     * 编辑变动情况
     * @param
     */
    function editHrEmpChangeInfo(id){
        url = baseUrl+'emp/hrEmpChange/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#type").attr("value",xhr.result.type);//变动类型
                        $("#type_name").attr("value",$.hrUtils.getHRCodeNameById(xhr.result.type));
                        $("#changeTime").attr("value",changeTimeStyle(xhr.result.changeTime).Format("yyyy-MM-dd"));//变动时间
                        $("#effectTime").attr("value",changeTimeStyle(xhr.result.effectTime).Format("yyyy-MM-dd"));//生效时间
                        $("#orgBefore").attr("value",xhr.result.orgBefore);//调动前机构
                        $("#orgBeforeName").attr("value",$.hrUtils.getHROrgNameById(xhr.result.orgBefore));
                        $("#deptBefpre").attr("value",xhr.result.deptBefpre);//调动前部门
                        $("#deptBefpre_name").attr("value",$.hrUtils.getHROrgNameById(xhr.result.deptBefpre));
                        $("#postBefore").attr("value",xhr.result.postBefore);//调动前岗位
                        $("#postBeforeName").attr("value",$.hrUtils.getHRPostNameById(xhr.result.postBefore));
                        $("#headshipRankBefore").attr("value",xhr.result.headshipRankBefore);//调动前职级
                        $("#headshipRankBefore_name").attr("value",$.hrUtils.getHRCodeNameById(xhr.result.headshipRankBefore));
                        $("#orgAfter").val(xhr.result.orgAfter);//调动后机构
                        $("#orgAfterName").attr("value",$.hrUtils.getHROrgNameById(xhr.result.orgAfter));
                        $("#deptAfter").val(xhr.result.deptAfter);//调动后部门
                        $("#deptAfterName").attr("value",$.hrUtils.getHROrgNameById(xhr.result.deptAfter));
                        $("#postAfter").val(xhr.result.postAfter);//调动后岗位
                        $("#postAfterName").attr("value",$.hrUtils.getHRPostNameById(xhr.result.postAfter));
                        $("#headshipRankAfter").val(xhr.result.headshipRankAfter);//调动后职级
                        $("#headshipRankAfter_name").attr("value",$.hrUtils.getHRCodeNameById(xhr.result.headshipRankAfter));
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
    };
})(jQuery, window, document)
