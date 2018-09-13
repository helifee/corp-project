;(function($, window, document, undefined){
    //上来就执行
    var businessId;
    $(function(){
        //初始页面
        businessId = $.xljUtils.getUrlParam("businessId");//业务ID
        getInfoByBusinessId(businessId);

    });
    /**
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem:    ["上午", "下午"],
        today:       "今天"
    };

    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language : 'zh',
        format : "yyyy-mm-dd",
        minView:'month',
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });

    /**
     * 根据businessId查询业务单据信息
     */
    function getInfoByBusinessId(businessId){
        $.ajax({
            type:"POST",
            url:hostUrl+"emp/hrEmpLeaveInfo/queryList",
            dataType:"json",
            contentType:'application/json',
            async: false,//请求需要改为同步
            data:JSON.stringify({"businessId":businessId}),
            success: function(data, textStatus) {
                $("#personId").val(data.result[0].personId);
                $("#leaveType").val(data.result[0].leaveType);
                $("#leaveType_name").val($.hrUtils.getHRCodeNameById(data.result[0].leaveType));
                var leaveTime = (data.result[0].leaveTime == '' || data.result[0].leaveTime == null)?'':changeTimeStyle(data.result[0].leaveTime).Format("yyyy-MM-dd");
                $("#leaveTime").val(leaveTime);
                $("#cause").val(data.result[0].cause);
                $("#topicName").val(data.result[0].topicName);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 格式化时间
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }


})(jQuery, window, document);