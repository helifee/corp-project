/**
 * lixd
 * 系统角色编辑js
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
            $('title').text("角色-新增");
            $(".xj-form-title").text("角色-新增");
            $("#saveBtn").show();
            $("#updateBtn").hide();
            //初始化id
            initUuid();
        } else if (type === 'update') {
            $('title').text("角色-修改");
            $(".xj-form-title").text("角色-修改");
            $("#saveBtn").hide();
            $("#updateBtn").show();
            //根据id加载数据
            roleId = $.xljUtils.getUrlParam("roleId");
            getSysRoleInfoById(roleId);
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
                $("#sysRoleInfoFrom").find("input[name='id']").val(guuid);
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
        var sysRoleInfoArr = $("#sysRoleInfoFrom").serializeArray();
        var sysRoleInfoDto = {};
        sysRoleInfoDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in sysRoleInfoArr) {
            sysRoleInfoDto[sysRoleInfoArr[i].name] = sysRoleInfoArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysRoleInfo/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysRoleInfoDto),
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
        var sysRoleInfoArr = $("#sysRoleInfoFrom").serializeArray();
        var sysRoleInfoDto = {};
        var roleID = "";
        for (var i in sysRoleInfoArr) {
            if (sysRoleInfoArr[i].name == "id") {
                roleID = sysRoleInfoArr[i].value;
            }
            sysRoleInfoDto[sysRoleInfoArr[i].name] = sysRoleInfoArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysRole/update/" + roleID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysRoleInfoDto),
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
        var sysRoleInfoArr = $("#sysRoleInfoFrom").serializeArray();
        var sysRoleInfoDto = {};
        var roleID = "";
        for (var i in sysRoleInfoArr) {
            if (sysRoleInfoArr[i].name == "id") {
                roleID = sysRoleInfoArr[i].value;
            }
            sysRoleInfoDto[sysRoleInfoArr[i].name] = sysRoleInfoArr[i].value;
        }
        $.ajax({
            url: baseUrl + "/sys/sysRoleInfo/update/" + roleID,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysRoleInfoDto),
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
    function getSysRoleInfoById(roleId) {
        var uBody = "/sys/sysRoleInfo/get/" + roleId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#sysRoleInfoFrom").find("input[name='id']").val(data.result.id);
                $("#sysRoleInfoFrom").find("input[name='name']").val(data.result.name);
                $("#sysRoleInfoFrom").find("input[name='sort']").val(data.result.sort);
                if (data.result.isSysoper == '1') {//管理员
                    $("#sysRoleInfoFrom").find("input[id='isSysoper']").attr("checked", true);
                }
                if (data.result.isBussinessuser == '1') {//业务员
                    $("#sysRoleInfoFrom").find("input[id='isBussinessuser']").attr("checked", false);
                }
                if (data.result.isHrleader == '1') {//领导
                    $("#sysRoleInfoFrom").find("input[id='isHrleader']").attr("checked", false);
                }
                //处理指标属性下拉回显
                $("#status").val(data.result.status);
                //$("#property ").get(0).selectedIndex=1;  //设置Select索引值为1的项选中
                //$("#property ").val(4);   // 设置Select的Value值为4的项选中
                //$("#property option[text='jQuery']").attr("selected", true);   //设置Select的Text值为jQuery的项选中


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