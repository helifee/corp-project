$(function() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    //防止按钮刷新页面
    $('.btn').click(function(e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function(e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
});
