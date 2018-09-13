
$(document).ready(function () {
    $('#calendar').eCalendar();
    //得到当前日期并把值赋给ca_today元素
    $('.ca_today').text($('.c-today')[0].textContent);
    //显示星期几
    var weekday = new Date().getDay();
    var show_day = new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日');
    $('.ca_weather p:nth-child(2)').text(show_day[weekday - 1]);
    //重新定义日历事件
    $('#calendar').eCalendar({
        events: [
            {title: '周中汇报', description: '周中汇报', datetime: new Date(2017, new Date().getMonth(), 13, 17)},
            {title: '产品会议演讲', description: 'BRA x ARG - Semifinal', datetime: new Date(2017, new Date().getMonth(), 23, 16)},
            {title: '月末总结会', description: 'Classificatórias de equipes', datetime: new Date(2017, new Date().getMonth(), 27, 16)}
        ]
    });

});

//汇制报表
// 基于准备好的dom，初始化echarts实例
var Chart1 = echarts.init(document.getElementById('chartDiv'));
var Chart2 = echarts.init(document.getElementById('chartDiv2'));
var Chart3 = echarts.init(document.getElementById('chartDiv3'));
var Chart4 = echarts.init(document.getElementById('chartDiv4'));
var Chart5 = echarts.init(document.getElementById('chartDiv5'));
var Chart6 = echarts.init(document.getElementById('chartDiv6'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '资金日报'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    color:["#46A7FF"],
    series: [{
        name: '单位(亿)',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
Chart1.setOption(option);
Chart2.setOption(option);
Chart3.setOption(option);
Chart4.setOption(option);
Chart5.setOption(option);
Chart6.setOption(option);
