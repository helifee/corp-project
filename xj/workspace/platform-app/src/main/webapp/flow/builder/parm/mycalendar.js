/**
 * Created by miying on 2017/5/25.
 */
$(function() {
    var currentYear = new Date().getFullYear();
    var clickdays = [];
    var holiday_json = [];
    var work_json = [];
    var getYear;
    $('#calendar').calendar();

    $('#year').change(function() {
        $('#calendar').calendar({
            startYear:$('#year').val()
        });
    })

    //设置左右的高度一致
    setTimeout(function() {
        $('.row_l').height($('.row_r').height());
    },400);

    $('#signholiday').on("click",function() {
        clickdays = $('.day-content.hasActive');
        if(clickdays.length > 0) {
            for(var i = 0; i < clickdays.length; i++) {
                $(clickdays[i]).removeClass("hasActive").removeClass("workColor").addClass("holidayColor");
                var year = $('.year-title').not('.hidden-xs').text();
                var month = $(clickdays[i]).parentsUntil().parent('.month').find('.month-title').attr('month');
                var day = $(clickdays[i]).text();
                var holidayObj = {year:year, month:month, day:day, dayType:2};
                holiday_json.push(holidayObj);
            }
            $.ajax({ //发送更新的ajax请求
                type: "post",
                url: hostUrl+"flow/calendarDetail/save",

                dataType: "json",
                async: false,
                data: JSON.stringify(holiday_json),
                contentType: 'application/json;charset=utf-8', //设置请求头信息
                success: function (data) {
                    //console.info("success() data is=");
                    //console.info(data);
                },
                error: function (data) {
                    //console.info("error() data is=");
                    //console.info(data);
                }
            });
        }else{
            //alert('请选择日期');
        	pop_tip_open("blue","请选择日期!");
        }
        clickdays = [];
    });
    $('#signwork').on("click",function() {
        clickdays = $('.day-content.hasActive');
        if(clickdays.length > 0) {
            for(var i = 0; i < clickdays.length; i++) {
                $(clickdays[i]).removeClass("hasActive").removeClass("holidayColor").addClass("workColor");
                var year = $('.year-title').not('.hidden-xs').text();
                var month = $(clickdays[i]).parentsUntil().parent('.month').find('.month-title').attr('month');
                var day = $(clickdays[i]).text();
                var workObj = {year:year, month:month, day:day, dayType:1};
                work_json.push(workObj);
            }
            $.ajax({ //发送更新的ajax请求
                type: "post",
                url: hostUrl+"flow/calendarDetail/save",
                dataType: "json",
                async: false,
                data: JSON.stringify(work_json),
                contentType: 'application/json;charset=utf-8', //设置请求头信息
                success: function (data) {
                    //console.info("success() data is=");
                    //console.info(data);
                },
                error: function (data) {
                    //console.info("error() data is=");
                    //console.info(data);
                }
            });
        }else{
            //alert('请选择日期');
            pop_tip_open("blue","请选择日期!");
        }
        clickdays = [];
    });
    //点击保存
    $('.save').on("click",function() {
        var workDay = "";
        $("input[name='workDay']:checked").each(function(index, item) {
            workDay += item.value+",";
        });
        workDay = workDay.substr(0, workDay.length-1);
        var postdata = {
            year: $("#year").val(),
            workDay: workDay,
            startTime: $("#startTime").val(),
            endTime: $("#endTime").val()
        }

        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: hostUrl+"flow/calendarBasic/save",
            dataType: "json",
            async: false,
            data: JSON.stringify(postdata),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                //console.info("success() data is=");
                //console.info(data);
            },
            error: function (data) {
                //console.info("error() data is=");
                //console.info(data);
            }
        });
    });
    $(window).resize(function() {
        setTimeout(function() {
            $('.row_l').height($('.row_r').height());
        },400)
    });
})
