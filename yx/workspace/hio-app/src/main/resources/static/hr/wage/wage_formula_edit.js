;(function ($,window,document,undefined) {

    //计算表格高度
    window.resizeHeight = function() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧只有一个列表 高一点
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 90) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width()-1, true);
        $.xljUtils.gridResizeFn();
    };


    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });


    $(function () {

        //初始化高度
        resizeHeight();

        //禁用所有按钮的默认行为，即刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });


    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

})(jQuery, window, document);