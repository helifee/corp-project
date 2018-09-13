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

    //公式模板切换
    window.formulaSel = function () {
        var temp = $("#formulaSelect").val();
        if(temp==0) { //显示公式模板
            document.getElementById('formulaMouldDiv').style.display = 'block';//设置为显示
            document.getElementById('editFormulaDiv').style.display = 'none';//设置为隐藏
        }else if(temp==1) { //显示公式编辑器
            document.getElementById('editFormulaDiv').style.display = 'block';//设置为隐藏
            document.getElementById('formulaMouldDiv').style.display = 'none';//设置为隐藏
        }
    };

    //公式模板增加行记录
    window.addFormulaMoudle = function() {
        $("#formulaMouldTable").append(
            ' <tr class="form-tr">' +
            '   <td>' +
            '       <span class="form-label">早退>' +
            '           <input id="item_name" name="item_name" type="text" >' +
            '           <span>次</span>' +
            '           <span>，按每</span>' +
            '           <span>次</span>' +
            '           <span>固定金额扣款</span>' +
            '           <input id="t2" name="item_name" type="text" >' +
            '           <span>元。</span>' +
            '       </span>' +
            '       <button class="btn btn-info" type="button" data-toggle="tooltip" title="删除" onclick="delFormulaMoudle(this)">' +
            '           <span class="glyphicon glyphicon-minus"></span>' +
            '       </button>'+
            '   </td>' +
            '</tr>'
        );
    };

    //刪除行記錄
    window.delFormulaMoudle = function (obj) {
        var i = obj.parentNode.parentNode.rowIndex;
        document.getElementById('formulaMouldTable').deleteRow(i);
    };


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