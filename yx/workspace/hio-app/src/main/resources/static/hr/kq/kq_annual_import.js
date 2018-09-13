;(function ($, window, document, undefined) {
    $(function () {
        resizeHeight();
        pageInit();
        resizeGrid();
    });


    //上传
    $("#saveBtn").click(function () {
        pop_tip_open("blue", "上传成功！");
    });

    //关闭
    $("#closeWindow").click(function () {
        window.close();
    });

    //下载成功
    $("#downloadTemplate").click(function () {
        pop_tip_open("blue", "下载成功！");
    });

    function pageInit() {

    }


//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 180) / 3 + "px");
        //xj-main-grid grid-container
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

//grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

})(jQuery, window, document);