;(function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //上来就执行
    $(function () {
        var type = $.xljUtils.getUrlParam("type");
        var module = $.xljUtils.getUrlParam("module");
        $("#module").val(module);
        if (type == 'add') {
            $('title').text("指标集-新增");
            $(".xj-form-title").text("指标集-新增");
            $("#saveBtn").show();
            $("#updateBtn").hide();
            //初始化id
            initUuid();
        } else if (type = 'update') {
            $('title').text("指标集-修改");
            $(".xj-form-title").text("指标集-修改");
            $("#saveBtn").hide();
            $("#updateBtn").show();
            //根据id加载数据
            setId = $.xljUtils.getUrlParam("setId");
            getSysInfoSetById(setId);
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
            $("#sysInfoSetFrom").attr("data-validate-success", " window.saveInfo()");
            $("#sysInfoSetFrom").submit();
        });
        $("#updateBtn").unbind('click').on('click', function () {
            $("#sysInfoSetFrom").attr("data-validate-success", " window.updateInfo()");
            $("#sysInfoSetFrom").submit();
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
                $("#sysInfoSetFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增指标集
     */

window.saveInfo = function(){
        //序列化表单数组
        var sysInfoSetArr = $("#sysInfoSetFrom").serializeArray();
        var sysInfoSetDto = {};
        sysInfoSetDto.delflag = false;
        //sysInfoSetDto.status = 1;
        if($("#name").val()==""||$("#name").val()==null){
            $.xljUtils.tip("blue","指标集名称不可为空！");
            return;
        }
        for (var i in sysInfoSetArr) {
            sysInfoSetDto[sysInfoSetArr[i].name] = sysInfoSetArr[i].value;
        }
        $.ajax({
            url: serviceUrl + "/sys/sysInfoSet/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(sysInfoSetDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "新增成功！");
                        // closePage();
                        window.close();
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
window.updateInfo = function(){
        if($("#name").val()==""||$("#name").val()==null){
            $.xljUtils.tip("blue","指标集名称不可为空！");
            return;
        }
        var sysInfoSetArr = $("#sysInfoSetFrom").serializeArray();
        var sysInfoSetDto = {};
        var setID = "";
        for (var i in sysInfoSetArr) {
            if (sysInfoSetArr[i].name == "id") {
                setID = sysInfoSetArr[i].value;
            }
            sysInfoSetDto[sysInfoSetArr[i].name] = sysInfoSetArr[i].value;
        }
        $.ajax({
            url: serviceUrl + "/sys/sysInfoSet/update/" + setID,
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
                        // closePage();
                        window.close();
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
    function getSysInfoSetById(setId) {
        var uBody = "/sys/sysInfoSet/get/" + setId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#sysInfoSetFrom").find("input[name='id']").val(data.result.id);
                $("#sysInfoSetFrom").find("input[name='name']").val(data.result.name);
                $("#sysInfoSetFrom").find("input[name='nameEn']").val(data.result.nameEn);
                $("#sysInfoSetFrom").find("input[name='sort']").val(data.result.sort);
                //记录类型
                if (data.result.type == '1') {//单记录
                    $("input[name='type'][value='1']").attr("checked",true);
                 } else if (data.result.type == '2') {//多记录
                    $("input[name='type'][value='2']").attr("checked",true);
                }
                //处理指标属性下拉回显
                $("#property").val(data.result.property);

                $("#sysInfoSetFrom").find("input[name='addFunction']").val(data.result.addFunction);
                $("#sysInfoSetFrom").find("input[name='updateFunction']").val(data.result.updateFunction);
                $("#sysInfoSetFrom").find("input[name='delFunction']").val(data.result.delFunction);
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