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
            $('title').text("试题类别-新增");
            $(".xj-form-title").text("试题类别-新增");
        }else if(type=='update'){
            $('title').text("试题类别-修改");
            $(".xj-form-title").text("试题类别-修改");
            //根据id加载数据
            typeId = $.xljUtils.getUrlParam("typeId");
            getOjtThemeTypeById(typeId);
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
                $("#ojtThemeTypeFrom").attr("data-validate-success", "saveInfo(0)");
                $("#ojtThemeTypeFrom").submit();
            }else if(type=='update') {
                $("#ojtThemeTypeFrom").attr("data-validate-success", "saveInfo(1)");
                $("#ojtThemeTypeFrom").submit();
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
                $("#ojtThemeTypeFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  根据试题类别id获取试题类别信息
     * @param typeId
     */
    function getOjtThemeTypeById(typeId) {
        var uBody = "/ojt/hrOjtThemeType/get/" + typeId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtThemeTypeFrom").find("input[name='id']").val(data.result.id);
                $("#ojtThemeTypeFrom").find("input[name='name']").val(data.result.name);
                $("#ojtThemeTypeFrom").find("input[name='code']").val(data.result.code);
                $("#ojtThemeTypeFrom").find("textarea[name='remark']").val(data.result.remark);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化试题类别信息请求失败");
            }
        })
    }


    /**
     * 新增培训需求
     */
    window.saveInfo = function(isSave) {
        var ojtThemeTypeArr = $("#ojtThemeTypeFrom").serializeArray();
        var ojtThemeTypeDto = {};
        for (var i in ojtThemeTypeArr) {
            ojtThemeTypeDto[ojtThemeTypeArr[i].name] = ojtThemeTypeArr[i].value;
        }
        ojtThemeTypeDto.delflag = 0;
        $.ajax({
            url: baseUrl + (isSave == 0 ? "ojt/hrOjtThemeType/save/" : ("ojt/hrOjtThemeType/update/" + ojtThemeTypeDto.id)),
            type: isSave==0?'POST':'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtThemeTypeDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "保存成功！");
                        if(window.opener.reloadTypeList!=undefined){
                            window.opener.reloadTypeList(ojtThemeTypeDto.id);
                        }
                        window.close();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存试题失败！"+xhr.msg);
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