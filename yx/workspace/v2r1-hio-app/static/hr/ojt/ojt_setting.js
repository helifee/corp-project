/**
 * Created by xph on 2017/7/4.
 */

// (function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    var isSave;
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
    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }
    //上来就执行
    $(function () {
        resizeHeight();
        resizeGrid();
        //根据id加载数据
        //目前id为固定值ab6d43492b9c49758a6e1c5451766b84
        // settingId = $.xljUtils.getUrlParam("demandId");
        // settingId = "ab6d43492b9c49758a6e1c5451766b84";
        getOjtSetting();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        $("#saveLearn").on('click', function () {
            $("#ojtLearnFrom").attr("data-validate-success", "saveLearnInfo()");
            $("#ojtLearnFrom").submit();
        });
        //$("#updateBtn").unbind('click').on('click', function () {
        //    updateInfo();
        //});
        $("#saveExam").on('click', function () {
            $("#ojtExamFrom").attr("data-validate-success", "saveExamInfo()");
            $("#ojtExamFrom").submit();
        });

    });


    /**
     * 保存e-Learning培训设置
     */
    function saveLearnInfo() {
        var ojtSettingArr = $("#ojtLearnFrom").serializeArray();
        var ojtSettingDto = {};
        var demandId = "";
        for (var i in ojtSettingArr) {
            if (ojtSettingArr[i].name == "id") {
                demandId = ojtSettingArr[i].value;
            }
            ojtSettingDto[ojtSettingArr[i].name] = ojtSettingArr[i].value;
        }
        if (isSave){
            ojtSettingDto["delflag"]=0;
        }
        // $.ajax({
        //     url: baseUrl + "ojt/hrOjtSetting/update/" + demandId,
        var uBody = isSave?"ojt/hrOjtSetting/save":("ojt/hrOjtSetting/update/" + demandId);
        var type = isSave?"post":"put";
        $.ajax({
            url: baseUrl + uBody,
            type: type,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtSettingDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        isSave = false;
                        $.xljUtils.tip("green", "保存成功！");
                        // closePage();
                    } else {
                        pop_tip_open("red", "数据保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据保存请求失败");
            }

        });
    }


    /**
     * 保存在线考试培训设置
     */
    function saveExamInfo() {
        var ojtSettingArr = $("#ojtExamFrom").serializeArray();
        var ojtSettingDto = {};
        var demandId = $("#ojtLearnFrom").find("input[name='id']").val();
        for (var i in ojtSettingArr) {
            if(null == ojtSettingDto[ojtSettingArr[i].name] ||
                "" == ojtSettingDto[ojtSettingArr[i].name] ||
                ojtSettingDto[ojtSettingArr[i].name] == undefined)
                ojtSettingDto[ojtSettingArr[i].name] = ""+ ojtSettingArr[i].value;
            else
                ojtSettingDto[ojtSettingArr[i].name] += "," + ojtSettingArr[i].value;
        }
        ojtSettingDto["id"] = demandId;
        ojtSettingDto["ifTiming"] = ojtSettingDto["ifTiming"] == undefined ? "":ojtSettingDto["ifTiming"];
        // ojtSettingDto["startNoticeWay"] = ojtSettingDto["startNoticeWay"] == undefined ? "":ojtSettingDto["startNoticeWay"];
        ojtSettingDto["startNoticePerson"] = ojtSettingDto["startNoticePerson"] == undefined ? "":ojtSettingDto["startNoticePerson"];
        if (isSave){
            ojtSettingDto["delflag"]=0;
        }

        var uBody = isSave?"ojt/hrOjtSetting/save":("ojt/hrOjtSetting/update/" + demandId);
        var type = isSave?"post":"put";
        $.ajax({
            url: baseUrl + uBody,
            type: type,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtSettingDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        isSave = false;
                        $.xljUtils.tip("green", "保存成功！");
                        // closePage();
                    } else {
                        pop_tip_open("red", "数据保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据保存请求失败");
            }

        });
    }


    /**
     * 根据id加载设置信息
     */
    function getOjtSetting() {
        var uBody = "ojt/hrOjtSetting/queryListByCondition";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'post',
            url: uAll,
            data: JSON.stringify({}),
            dataType: "JSON",
            async: false,
            contentType:"application/json",
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data.result.length>0) {
                    isSave = false;
                    var setting = data.result[0];
                    $("#ojtLearnFrom").find("input[name='id']").val(setting.id);
                    $("#ojtLearnFrom").find("input[name='size']").val(setting.size);
                    $("#ojtLearnFrom").find("input[name='minute']").val(setting.minute);
                    $("#ojtLearnFrom").find("input[name='remind']").val(setting.remind);
                    if (setting.ifTiming == 1)
                        $("#ojtExamFrom").find("input[id='ifTiming_yes']").attr("checked", "true");
                    else if (setting.ifTiming == 2)
                        $("#ojtExamFrom").find("input[id='ifTiming_no']").attr("checked", "true");
                    if (setting.startNoticePerson!=null && setting.startNoticePerson!=undefined) {
                        var startNoticePersonChoice = setting.startNoticePerson.split(",");
                        for (var i = 0; i < startNoticePersonChoice.length; i++)
                            $("#ojtExamFrom").find("input[id='startNoticePerson_" + startNoticePersonChoice[i] + "']").attr("checked", "true");
                    }
                }else if(data.result.length==0) {
                    isSave = true;
                    initUuid();
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训需求请求失败");
            }
        })
    }


    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#ojtLearnFrom").find("input[name='id']").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    //关闭页面
    function closePage() {
        // //重新加载父页面
        // if(window.opener.location!=undefined) {
        //     window.opener.location.reload();
        // }
        //关闭本页面
        window.close();
    }

// })(jQuery, window, document);