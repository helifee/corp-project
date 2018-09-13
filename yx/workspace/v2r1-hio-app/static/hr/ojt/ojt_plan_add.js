/**
 * Created by xph on 2017/7/12.
 */

(function ($, window, document, undefined) {
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
        initDatetimepicker();
        initUuid();
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
            $("#ojtPlanFrom").attr("data-validate-success", "saveInfo()");
            $("#ojtPlanFrom").submit();
        });
    });

    /**
     * 新增考试计划
     */
    window.saveInfo = function() {

        //序列化表单数组
        var ojtPlanArr = $("#ojtPlanFrom").serializeArray();
        var ojtPlanDto = {};
        ojtPlanDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in ojtPlanArr) {
            if (ojtPlanArr[i].name == "startDate" || "endDate" == ojtPlanArr[i].name) {
                var date = ojtPlanArr[i].value.split(':');
                if (date != "") {
                    ojtPlanDto[ojtPlanArr[i].name] = new Date(date[0]*1000*60*60+date[1]*1000*60).getTime();
                }
            } else if("orgName" == ojtPlanArr[i].name){
            } else {
                ojtPlanDto[ojtPlanArr[i].name] = ojtPlanArr[i].value;
            }
        }
        if(ojtPlanDto.startDate>ojtPlanDto.endDate){
            $.xljUtils.tip("blue", "开始时间不能大于结束时间！");
            return;
        }
        ojtPlanDto.paperId = "";
        ojtPlanDto.startUpStatus = "0";
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamAct/save",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtPlanDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "新增成功！");
                        closePage(ojtPlanDto.id);
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
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#ojtPlanFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  获取机构信息
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);

    }

    //关闭页面
    function closePage(planId) {
        //重新加载父页面
        if(window.opener.reloadDataList!=undefined) {
            window.opener.reloadDataList(planId);
        }
        //关闭本页面
        window.close();
    }

    //初始化日期控件
    function initDatetimepicker(){
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });

        //时分
        $('.datetimepicker3').datetimepicker({
            language:  'zh-CN',
            format: 'hh:ii',
            startView:1,
            autoclose: true
        });

        //只选择年月
        $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });

        //只选择年
        $('.datetimepickerY').datetimepicker({
            format: 'yyyymm',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 4,
            forceParse: false,
            language: 'zh-CN'
        });
    }
})(jQuery, window, document);
