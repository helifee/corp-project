/**
 * 人事转正查看页面js
 */
;(function($, window, document, undefined){
    //上来就执行
    $(function(){
        var businessId = $.xljUtils.getUrlParam("businessId");
        //初始页面
        getEidtInfo(businessId);
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
     * 修改功能--加载信息
     */
    function getEidtInfo(businessId){
        //根据审批单ID获取从中间表获取页面信息
        $.ajax({
            url: hostUrl + "emp/empPersonInfoTmp/queryRegularListByBusinessId",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"businessId":businessId}),
            success: function (data, textStatus) {
                if(data.result.length > 0){
                    $("#personId").val(data.result[0].personId);//人员ID
                    $("#personName").val(data.result[0].personName);//人员名称
                    var headshipRank = data.result[0].headshipRank;
                    $("#headshipRank").val(headshipRank); //职级
                    $("#headshipRankValue").val($.hrUtils.getHRCodeNameById(headshipRank));//职级
                    var entryTime = data.result[0].entryTime == null ? '' : changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").val(entryTime);//入职时间
                    $("#probationPeriod").val(data.result[0].probationPeriod);//试用期限
                    var regularTime = data.result[0].regularTime == null ? '' : changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#regularTime").val(regularTime);//转正日期【注意对应关系】
                    $("#workSummary").val(data.result[0].workSummary);//工作总结
                    $('#phone').val(data.result[0].phone);
                    $('#topicName').val(data.result[0].topicName);
                    $('#businessId').val(businessId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
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