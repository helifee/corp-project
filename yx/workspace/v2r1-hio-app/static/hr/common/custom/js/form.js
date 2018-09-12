$(function() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        initialDate: new Date(),//初始化当前日期
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    $('.datetimepicker2').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
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
