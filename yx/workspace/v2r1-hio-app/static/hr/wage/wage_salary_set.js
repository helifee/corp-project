/**
 * Created by jh on 2017/7/20.
 */
;(function($, window, document, undefined){
    /*全局变量*/

    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h-350)+"px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    };

    //grid 自适应宽度
    $(window).resize(function(){
        resizeHeight();
        resizeGrid();
    });

    //点击确定
    window.save = function () {
        window.location.href="wage_pay_period.html";
    };

    //清空组织机构
    window.emptyOrg = function () {
        $("#replacePayEdit").find("input[id='orgId']").val("");
        $("#replacePayEdit").find("input[id='orgName']").val("");
    }

     //获取机构信息
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);

    };

    //初始化日期控件
    window.initDatetimepicker = function () {
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };

    $(function () {
        resizeHeight();
        resizeGrid();
        initDatetimepicker();

        //禁用所有按钮的默认行为，即刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

    });

})(jQuery, window, document);