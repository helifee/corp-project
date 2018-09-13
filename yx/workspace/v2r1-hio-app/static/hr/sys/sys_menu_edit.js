/**
 * lixd
 * 系统菜单编辑js
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
            $('title').text("菜单-新增");
            $(".xj-form-title").text("菜单-新增");
            $("#addBtn").show();
            $("#updateBtn").hide();
            //初始化id
            initUuid();
        } else if (type === 'update') {
            $('title').text("菜单-修改");
            $(".xj-form-title").text("菜单-修改");
            $("#addBtn").hide();
            $("#updateBtn").show();
            //根据id加载数据
            menuId = $.xljUtils.getUrlParam("menuId");
            getSysMenuById(menuId);
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
                $("#sysMenuFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增指标集
     */
    function saveInfo() {
        //序列化表单数组
        var sysMenuArr = $("#sysMenuFrom").serializeArray();
        var sysMenutDto = {};
        sysMenutDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in sysMenuArr) {
            sysMenutDto[sysMenuArr[i].name] = sysMenuArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysMenutDto),
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
        var sysMenuArr = $("#sysMenuFrom").serializeArray();
        var sysMenuDto = {};
        var menuID = "";
        for (var i in sysMenuArr) {
            if (sysMenuArr[i].name == "id") {
                menuID = sysMenuArr[i].value;
            }
            sysMenuDto[sysMenuArr[i].name] = sysMenuArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/update/" + menuID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysInfoSetDto),
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
        var sysInfoSetArr = $("#sysMenuFrom").serializeArray();
        var sysInfoSetDto = {};
        var setID = "";
        for (var i in sysInfoSetArr) {
            if (sysInfoSetArr[i].name == "id") {
                setID = sysInfoSetArr[i].value;
            }
            sysInfoSetDto[sysInfoSetArr[i].name] = sysInfoSetArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysMenu/update/" + setID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysInfoSetDto),
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
    function getSysMenuById(setId) {
        var uBody = "/sys/sysMenu/get/" + setId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#sysMenuFrom").find("input[name='id']").val(data.result.id);
                $("#sysMenuFrom").find("input[name='moduldId']").val(data.result.moduldId);
                $("#sysMenuFrom").find("input[name='name']").val(data.result.name);
                $("#sysMenuFrom").find("input[name='type']").val(data.result.type);
                $("#sysMenuFrom").find("input[name='sort']").val(data.result.sort);
                $("#sysMenuFrom").find("input[name='status']").val(data.result.status);
                $("#sysMenuFrom").find("input[name='treeId']").val(data.result.treeId);
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