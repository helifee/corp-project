;
(function ($, window, document, undefined) {

//上来就执行
    $(function () {
        //time();
        //queryTimeAndUser();
        monthNum();
        Datetime();

        ageChart(null);
        educationChart(null);
        changeChart(null);

        window.queryAgeAndEducation = function () {
            var queryDayAgeAndEducation=$("#entryDate").val();
            queryDayAgeAndEducation=queryDayAgeAndEducation+'-01';
            if(queryDayAgeAndEducation !=null && queryDayAgeAndEducation != undefined){
                ageChart(queryDayAgeAndEducation);
                educationChart(queryDayAgeAndEducation);
            }else {
                alert("请选择查询月份！");
            }
        };

        window.queryByYear=function () {
            var queryYear=$("#year").val();
            queryYear=queryYear+"-01-01";
            if(queryYear !=null && queryYear != undefined){
                changeChart(queryYear);
            }else {
                alert("请选择查询年份！");
            }
        }
    });

    /**
    window.queryTimeAndUser = function () {
        $.ajax({
            type: "POST",
            url: hostUrl + 'emp/hrEmpIndex/queryLoginUser',
            dataType: "json",
            data: JSON.stringify({}),
            contentType: "application/json",
            success: function (data) {
                var result=data.result;
                $("#showTime").html(result.text);
                $("#showUserName").html(result.loginUser);
                $("#showUserName").css({color:"#3398DB",fontSize:"18px"});
                $("#showTime").css({fontSize:"18px"});
            }
        });
    }
	*/

    //设置日期时间控件
    var Datetime = function(e) {
        $('#datetimepicker1').datetimepicker({
            language: 'zh-CN',//显示中文
            format: 'yyyy-mm',//显示格式
            minView: 3,//设置只显示到月份
            initialDate: new Date(),
            autoclose: true,//选中自动关闭
            todayBtn: false,//显示今日按钮
            locale: moment.locale('zh-cn'),
            startView: 3
        });
        $('#datetimepicker2').datetimepicker({
            language: 'zh-CN',//显示中文
            format: 'yyyy',//显示格式
            minView: 4,//设置只显示到月份
            initialDate: new Date(),
            autoclose: true,//选中自动关闭
            todayBtn: false,//显示今日按钮
            locale: moment.locale('zh-cn'),
            startView: 4
        });

    }

    //人才流动
    function changeChart(queryYear) {
        var myChartChange = echarts.init(document.getElementById('main3'));
        myChartChange.showLoading();
        var names = [];
        var numsEntry = [];
        var numsLeave = [];
        $.ajax({
            type: "POST",
            url: hostUrl + 'emp/hrEmpIndex/queryChangePersonList',
            dataType: "json",
            data: JSON.stringify({'queryDay':queryYear}),
            contentType: "application/json",
            success: function (data) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                var listEntry = data.result.listEntry;
                var listLeave = data.result.listLeave;
                for (var i = 0; i < listEntry.length; i++) {
                    names.push(listEntry[i].groupName);    //挨个取出类别并填入类别数组
                    numsEntry.push(listEntry[i].num);    //挨个取出销量并填入入职数组
                    numsLeave.push(listLeave[i].num);    //挨个取出销量并填入销量数组
                }
                myChartChange.hideLoading();    //隐藏加载动画
                myChartChange.setOption({
                    title: {
                        text: '人才流动'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['离职', '入职']
                    },
                    grid: {
                        left: '13%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true,
                        y2: 140

                    },
                    toolbox: {
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: [0, 0.01],
                        data:names,
                        axisLabel:{
                            interval:0,//横轴信息全部显示
                            rotate:-30,//-30度角倾斜显示
                        }
                    },
                    yAxis: {
                        type: 'value',
                        minInterval : 1
                    },
                    series: [
                        {
                            name: '离职',
                            type: 'line',
                            stack: '总量',
                            data: numsLeave
                        },
                        {
                            name: '入职',
                            type: 'line',
                            stack: '总量',
                            data: numsEntry
                        }
                    ]
                });
            },
            error: function (errorMsg) {
				//请求失败时执行该函数
				$.xljUtils.tip("red", "人才流动图表请求数据失败!");
                myChartChange.hideLoading();
        }
        });
    }

    function ageChart(queryDayAgeAndEducation){
        //人才结构-年龄
        var myChart = echarts.init(document.getElementById('main1'));
        myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
        var names = [];    //类别数组（实际用来盛放X轴坐标值）
        var nums = [];    //销量数组（实际用来盛放Y坐标值）
        $.ajax({
            type: "POST",
            url: hostUrl+'emp/hrEmpIndex/queryAgeList',
            dataType: "json",
            data: JSON.stringify({'queryDay':queryDayAgeAndEducation}),
            contentType:"application/json",
            success: function (data) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                var list=data.result.list;
                if(list){
                    $.each(list, function (index, item) {
                        names.push(item.groupName);    //挨个取出类别并填入类别数组
                        nums.push(item.num);    //挨个取出销量并填入销量数组
                    });
                }else{
                    names=['0-25','26-30','31-45','46-55','56以上'];
                    nums=['0','0','0','0','0'];
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    color: ['#3398DB'],
                    /*toolbox: {
                        feature: {
                            myTool1: {
                                show: true,
                                title: '入职日期',
                                icon: '../../images/icon/timeIcon.png',
                                onclick: function (){
                                    alert('myToolHandler1')
                                }
                            }
                        },
                        showTitle: '入职日期'
                    },*/
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0%',
                        right: '6%',
                        bottom: '10%',
                        containLabel: false
                    },
                    title : {
                        text: '人才结构'
                    },
                    legend: {
                        data:['年龄']
                    },
                    xAxis: {
                        type: 'category',
                        data: names,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        splitLine: { show: false },//去除网格线
                        type: 'value',
                        minInterval : 1
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        type: 'bar',
                        name: '年龄',  //显示在上部的标题
                        data: nums,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#333'
                                    }
                                }
                            }
                        }
                    }]
                });
            },
            error: function (errorMsg) {
                //请求失败时执行该函数
                $.xljUtils.tip("red", "图表请求数据失败!");
                myChart.hideLoading();
            }
        });
    }

    function educationChart(queryDayAgeAndEducation){
        //人才结构-学历
        var myChartEducation = echarts.init(document.getElementById('main2'));
        myChartEducation.showLoading();
        var nameEducation = [];    //类别数组（实际用来盛放X轴坐标值）
        var numEducation = [];    //销量数组（实际用来盛放Y坐标值）
        $.ajax({
            type: "POST",
            url: hostUrl+'emp/hrEmpIndex/queryEducationList',
            dataType: "json",
            data: JSON.stringify({'queryDay':queryDayAgeAndEducation}),
            contentType:"application/json",
            success: function (data) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                var list=data.result.list;
                if(list){
                    $.each(list, function (index, item) {
                        nameEducation.push(item.groupName);    //挨个取出类别并填入类别数组
                        numEducation.push(item.num);    //挨个取出销量并填入销量数组
                    });
                }else{
                    nameEducation=['专科以下','本科','硕士','博士以上'];
                    numEducation=['0','0','0','0','0'];
                }
                myChartEducation.hideLoading();    //隐藏加载动画
                myChartEducation.setOption({        //加载数据图表
                    color: ['#339966'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: false
                    },
                    legend: {
                        data:['学历']
                    },
                    xAxis: {
                        type: 'category',
                        data: nameEducation,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        splitLine: { show: false },//去除网格线
                        type: 'value',
                        position:'right',
                        minInterval : 1
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        type: 'bar',
                        name: '学历',  //显示在上部的标题
                        data: numEducation,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#333'
                                    }
                                }
                            }
                        }
                    }]
                });
            },
            error: function (errorMsg) {
                //请求失败时执行该函数
                $.xljUtils.tip("red", "图表请求数据失败!");
                myChartEducation.hideLoading();
            }
        });
    }

    function time() {
        var now = new Date();
        var hour = now.getHours();
        if (hour < 6) {
            $("#showTime").html("凌晨好！");
        }
        else if (hour < 12) {
            $("#showTime").html("上午好！");
        }
        else if (hour < 18) {
            $("#showTime").html("下午好！");
        }
        else {
            $("#showTime").html("晚上好！");
        }
    }

    function monthNum(){
        $.ajax({
            type: "POST",
            url:hostUrl+'emp/hrEmpIndex/queryMonthEmpNum',
            dataType: "JSON",
            data: JSON.stringify({}),
            contentType:"application/json",
            success: function (data) {
                if (data.success) {
                    var result=data.result;
                    $("#workingNum").html(result.workingNum);
                    $("#entryNum").html(result.entryNum);
                    $("#regularNum").html(result.regularNum);
                    $("#changeNum").html(result.changeNum);
                    $("#leaveNum").html(result.leaveNum);
                    $("#contractNum").html(result.contractNum);
                    $("#anniversaryNum").html(result.anniversaryNum);
                    $("#birthNum").html(result.birthNum);
                }
            },
            error: function (data) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    //在职钻取
    $("#working").click(function () {
        window.location.href="working_list.html";
    });
    //入职钻取
    $("#entry").click(function() {
        window.location.href="entry_list.html";
    });
    //转正钻取
    $("#regular").click(function () {
        window.location.href="regular_list.html";
    });
    //调动钻取
    $("#change").click(function () {
        window.location.href="change_list.html";
    });
    //离职钻取
    $("#leave").click(function () {
        window.location.href="leave_list.html";
    });
    //合同到期钻取
    $("#contract").click(function () {
        window.location.href="contract_list.html";
    });
    //周年钻取
    $("#anniversary").click(function () {
        window.location.href="anniversary_list.html";
    });
    //生日钻取
    $("#birth").click(function () {
        window.location.href="birth_list.html";
    });

})(jQuery, window, document);




