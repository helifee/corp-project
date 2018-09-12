/**
 * 兼职信息
 * lixd
 * 2018-4-25 15:14:57
 */
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
        $('#postForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("postForm").reset();
            $("#postForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("postForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增兼职信息");
            $(".xj-form-title").text("新增兼职信息");
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#postForm").attr("data-validate-success", "window.submitAddForm()");
                // $("#postForm").submit();
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
        }else if(oper=="edit"){//编辑兼职信息
            $('title').text("兼职信息修改");
            $(".xj-form-title").text("兼职信息修改");
            editWorkHistory(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#postForm").attr("data-validate-success", "window.submitEditForm()");
                // $("#postForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
     window.submitAddForm = function(){
        var formElements = $("#postForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name == "deptName"){
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        empWorkHistoryDto.userId=id;//关联人员Id
        $.ajax({
            type: 'POST',
            url: hostUrl+'emp/empPersonInfo/savePost?time=' + Math.random(),
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.parent.closePa();
                        //window.location.href = 'emp_personinfo.html?id=' + id ;
                        //window.parent.location.reload();
                        window.parent.$('#postList').jqGrid().trigger("reloadGrid");
                    } else {
                        //异常处理
                        switch (xhr.status) {
                            case 601:
                                $.xljUtils.tip("red", xhr.message);
                                break;
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

        var formElements = $("#postForm").serializeArray();
        var empWorkHistoryDto = {};
        for(var i in formElements){
            if(formElements[i].name == "deptName"){
                continue;
            }
            empWorkHistoryDto[formElements[i].name]=formElements[i].value;
        }
        empWorkHistoryDto.delflag=0;//有效标志位
        empWorkHistoryDto.postId=id;
        $.ajax({
            type: 'post',
            url: hostUrl+'emp/empPersonInfo/updatePost',
            data: JSON.stringify(empWorkHistoryDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //关闭窗口
                        //window.history.go(-1);
                        //window.parent.closePa();
                        // window.opener.callBackPerInfo(id, 'workHistoryForm');
                        // window.close();
                        window.parent.closePa();
                        //window.parent.location.reload();
                        window.parent.$('#postList').jqGrid().trigger("reloadGrid");
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
     * 查询兼职信息
     * @param
     */
    function editWorkHistory(id){
        url = hostUrl+'emp/empPersonInfo/getPost/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#deptId").attr("value",xhr.result.organizationId);
                        $("#userId").attr("value",xhr.result.userId);
                        $("#deptName").val(xhr.result.organizationName);
                        $("#postName").attr("value",xhr.result.positionName);
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

    //todo 部门回调
    window.deptCallback = function (data) {
        $("#deptName").val(data.prefixName);
        $("#deptId").val(data.sid || data.id);
    };

    //todo 清空机构
    window.emptyOrg = function(){
        $("#deptName").val("");
        $("#deptId").val("");
    }

})(jQuery, window, document)
