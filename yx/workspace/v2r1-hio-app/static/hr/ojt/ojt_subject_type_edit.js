/**
* Created by xph on 2017/7/5.
*/

(function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    var typeId;
    var type;
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }
    //上来就执行
    $(function () {
        resizeHeight();
        type = $.xljUtils.getUrlParam("type");
        if(type=='add'){
            //初始化id
            initUuid();
            $('title').text("课程类别-新增");
            $(".xj-form-title").text("课程类别-新增");
        }else if(type=='update'){
            $('title').text("课程类别-修改");
            $(".xj-form-title").text("课程类别-修改");
            //根据id加载数据
            typeId = $.xljUtils.getUrlParam("typeId");
            getOjtSubjectTypeById(typeId);
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
        $("#saveBtn").on('click', function () {
            if(type=='add'){
                $("#ojtSubjectTypeFrom").attr("data-validate-success", "saveInfo(0)");
                $("#ojtSubjectTypeFrom").submit();
            }else if(type=='update') {
                $("#ojtSubjectTypeFrom").attr("data-validate-success", "saveInfo(1)");
                $("#ojtSubjectTypeFrom").submit();
            }
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
                $("#ojtSubjectTypeFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  根据课程类别id获取课程类别信息
     * @param typeId
     */
    function getOjtSubjectTypeById(typeId) {
        var uBody = "/ojt/hrOjtSubjectType/get/" + typeId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtSubjectTypeFrom").find("input[name='id']").val(data.result.id);
                $("#ojtSubjectTypeFrom").find("input[name='name']").val(data.result.name);
                $("#ojtSubjectTypeFrom").find("input[name='code']").val(data.result.code);
                $("#ojtSubjectTypeFrom").find("textarea[name='remark']").val(data.result.remark);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化课程类别信息请求失败");
            }
        })
    }


    /**
     * 新增课程类别
     */
    window.saveInfo = function(isSave) {
        var ojtSubjectTypeArr = $("#ojtSubjectTypeFrom").serializeArray();
        var ojtSubjectTypeDto = {};
        for (var i in ojtSubjectTypeArr) {
            ojtSubjectTypeDto[ojtSubjectTypeArr[i].name] = ojtSubjectTypeArr[i].value;
        }
        ojtSubjectTypeDto.delflag = 0;
        $.ajax({
            url: baseUrl + (isSave == 0 ? "ojt/hrOjtSubjectType/save/" : ("ojt/hrOjtSubjectType/update/" + ojtSubjectTypeDto.id)),
            type: isSave==0?'POST':'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtSubjectTypeDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "保存成功！");
                        if(window.opener.getSubjectTypeTree!=undefined) {
                            window.opener.getSubjectTypeTree();
                        }
                        if(window.opener.initTypeSelect!=undefined){}
                        window.opener.initTypeSelect();
                        window.close();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存课程失败！"+xhr.msg);
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

    //关闭页面
    window.closePage = function () {
        //重新加载父页面
        // window.opener.reloadTypeList();
        //关闭本页面
        window.close();
    }

})(jQuery, window, document);