;(function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    var type;
    //手动的调整窗口时

    //上来就执行
    $(function () {
        type = $.xljUtils.getUrlParam("type");
        if (type == 'add') {
            $('title').text("系统参数-新增");
            $(".xj-form-title").text("系统参数-新增");
            $("#saveBtn").unbind('click').on('click', function () {
                $("#sysParameterFrom").attr("data-validate-success", "window.saveInfo()");
                $("#sysParameterFrom").submit();
            });
            //初始化id
            initUuid();

        } else if (type = 'update') {
            $('title').text("系统参数-修改");
            $(".xj-form-title").text("系统参数-修改");
            $("#saveBtn").unbind('click').on('click', function () {
                $("#sysParameterFrom").attr("data-validate-success", "window.updateInfo()");
                $("#sysParameterFrom").submit();
            });
            //根据id加载数据
            id = $.xljUtils.getUrlParam("id");
            getSysParametertById(id);
        }
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });


    });

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = serviceUrl+"sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#sysParameterFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增指标集
     */
    window.saveInfo = function() {
        //序列化表单数组
        var sysParameterArr = $("#sysParameterFrom").serializeArray();
        var sysParameterDto = {};
        sysParameterDto.delflag = false;
        //将表单数组转化为 数据传输对象
        for (var i in sysParameterArr) {
            sysParameterDto[sysParameterArr[i].name] = sysParameterArr[i].value;
        }
        $.ajax({
            url: serviceUrl + "/sys/sysParameter/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysParameterDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "新增成功！");
                        closePage();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 修改-保存
     * @param n
     */
    window.updateInfo =function () {
        var sysParameterArr = $("#sysParameterFrom").serializeArray();
        var sysParameterDto = {};
        var setID = "";
        for (var i in sysParameterArr) {
            if (sysParameterArr[i].name == "id") {
                setID = sysParameterArr[i].value;
            }
            sysParameterDto[sysParameterArr[i].name] = sysParameterArr[i].value;
        }
        $.ajax({
            url: serviceUrl + "/sys/sysParameter/update/" + setID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysParameterDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                        closePage();
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }

    /**
     * 根据id加载指标集信息
     */
    function getSysParametertById(setId) {
        var uBody = "/sys/sysParameter/get/" + setId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#sysParameterFrom").find("input[name='id']").val(data.result.id);
                $("#sysParameterFrom").find("input[name='paraKey']").val(data.result.paraKey);
                $("#sysParameterFrom").find("input[name='paraValue']").val(data.result.paraValue);
                $("#sysParameterFrom").find("input[name='moduleName']").val(data.result.moduleName);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化组织机构请求失败");
            }
        })
    }

    //关闭页面
    function closePage() {
        //重新加载父页面
        window.opener.location.reload();
        //关闭本页面
        window.close();
    }
})(jQuery, window, document);