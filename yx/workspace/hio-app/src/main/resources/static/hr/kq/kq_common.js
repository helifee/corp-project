$(function () {
    initDatetimepicker();
});

//初始化日期控件
function initDatetimepicker() {
    //年月日
    var picker = $('.datetimepicker2').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });

    //时分
    $('.datetimepicker3').datetimepicker({
        language: 'zh-CN',
        format: 'hh:ii',
        startView: 1,
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
