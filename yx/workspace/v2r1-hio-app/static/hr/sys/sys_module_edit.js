/**
 * lixd
 * 系统模块编辑js
 */

;
(function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //上来就执行
    $(function () {
        type = $.xljUtils.getUrlParam("type");
        if (type === 'add') {
            $('title').text("指标集-新增");
            $(".xj-form-title").text("指标集-新增");
            $("#saveBtn").show();
            $("#updateBtn").hide();
            //初始化id
            initUuid();
        } else if (type === 'update') {
            $('title').text("指标集-修改");
            $(".xj-form-title").text("指标集-修改");
            $("#saveBtn").hide();
            $("#updateBtn").show();
            //根据id加载数据
            menuId = $.xljUtils.getUrlParam("menuId");
            alert(menuId);
            getSysModuleById(menuId);
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
        $("#saveBtn").unbind('click').on('click', function () {
            saveInfo();
        });
        $("#updateBtn").unbind('click').on('click', function () {
            updateInfo();
        });
    });

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#sysModuleFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增模块
     */
    function saveInfo() {
        //序列化表单数组
        var sysModuleArr = $("#sysModuleFrom").serializeArray();
        var sysMenuDto = {};
        sysMenuDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in sysModuleArr) {
            sysMenuDto[sysModuleArr[i].name] = sysModuleArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysMenuDto),
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
    function updateInfo() {
        var sysModuleArr = $("#sysModuleFrom").serializeArray();
        var sysMenuDto = {};
        var setID = "";
        for (var i in sysModuleArr) {
            if (sysModuleArr[i].name == "id") {
                setID = sysModuleArr[i].value;
            }
            sysMenuDto[sysModuleArr[i].name] = sysModuleArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/update/" + setID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysMenuDto),
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
     * 修改
     * @param n
     */
    function updateInfo() {
        var sysModeleArr = $("#sysModeleFrom").serializeArray();
        var sysMenuDto = {};
        var menuId = "";
        for (var i in sysModeleArr) {
            if (sysModeleArr[i].name == "id") {
                menuId = sysModeleArr[i].value;
            }
            sysMenuDto[sysModeleArr[i].name] = sysModeleArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/update/" + menuId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysMenuDto),
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
    function getSysModuleById(menuId) {
        var uBody = "/sys/sysMenu/get/" + menuId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#sysModuleFrom").find("input[name='id']").val(data.result.id);
                $("#sysModuleFrom").find("input[name='parentId']").val(data.result.parentId);
                $("#sysModuleFrom").find("input[name='moduleId']").val(data.result.moduleId);
                $("#sysModuleFrom").find("input[name='name']").val(data.result.name);
                $("#sysModuleFrom").find("input[name='sysFlag']").val(data.result.sysFlag);
                $("#sysModuleFrom").find("input[name='sort']").val(data.result.sort);
                $("#sysModuleFrom").find("input[name='remark']").val(data.result.remark);
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