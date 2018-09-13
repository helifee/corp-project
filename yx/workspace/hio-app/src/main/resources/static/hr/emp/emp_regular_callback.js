;(function($, window, document, undefined){
    var oper;//操作类型
    var uuid;//新增主键
    var personId;
    var account;//人员帐号
    var orgId;//机构ID
    var headshipRank;//职级
    var sex;
    var maxEducation;//最高学历
    var maxDegree;//最高学位
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

    //上来就执行
    $(function(){

        //初始页面
        initPersonInfo();
        setIframeHeight();
    });

    /**
     * 初始化页面
     */
    function initPersonInfo() {
        $('title').text("员工转正审批页");
        $(".xj-form-title").text("员工转正审批页");
        // 根据审批单ID获取页面数据
        getEidtInfo();
    }

    /**
     * 修改功能--加载信息
     */
    function getEidtInfo(){
        var applyId = $.xljUtils.getUrlParam("businessId");//获取审批单ID
        //根据审批单Id获取审批单信息
        $.ajax({
            type:"GET",
            url:baseUrl+"sys/sysApply/get/"+applyId,
            dataType:"json",
            async: false,
            success: function(data, textStatus) {
                $("#applyId").val(data.result.id);
                $("#topic").html(data.result.name);//主题
                $("#code").html(data.result.code);//单据号
                $("#createrName").html(data.result.createrName);//制单人
                $("#applicantName").html(data.result.applicantName);//经办人
                $("#companyName").html(data.result.companyName);
                $("#deptName").html(data.result.deptName);
                var applyDate = (data.result.applyDate == ''|| data.result.applyDate == undefined)  ?"":changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#applyDate").html(applyDate);
                var status = data.result.status;
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#statusValue").html(statusValue);
                var approvalDate = (data.result.approvalDate == ''|| data.result.approvalDate == undefined)  ?"":changeTimeStyle(data.result.approvalDate).Format("yyyy-MM-dd hh:mm:ss");
                $("#approvalDate").html(approvalDate);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        //根据审批单ID获取从中间表获取页面信息
        $.ajax({
            url: serviceUrl + "emp/empPersonInfoTmp/queryList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"applyId":applyId}),
            success: function (data, textStatus) {
                if(data.result.length > 0){
                    personId = data.result[0].id;//中间表Id
                    $("#nameName").html(data.result[0].name);//人员名称
                    $("#personCode").html(data.result[0].personCode);//人员编号
                    $("#orgName").html($.hrUtils.getHROrgNameById(data.result[0].orgId));//机构名称
                    $("#postName").html(data.result[0].postName); //岗位名称
                    $("#headshipRank").html($.hrUtils.getHRCodeNameById(data.result[0].headshipRank)); //职级
                    $("#sex").html( $.hrUtils.getHRCodeNameById(data.result[0].sex));//性别
                    $("#maxEducation").html($.hrUtils.getHRCodeNameById(data.result[0].maxEducation));//最高学历
                    $("#maxDegree").html($.hrUtils.getHRCodeNameById(data.result[0].maxDegree));//最高学位
                    var entryTime = data.result[0].entryTime == null ?'': changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").html(entryTime);//入职时间
                    var entryOrgTime = data.result[0].entryOrgTime==null?'':changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    $("#entryOrgTime").html(entryOrgTime);//进入本公司时间
                    $("#periodTerm").html(data.result[0].periodTerm);//试用期
                    var periodEndTime = data.result[0].regularTime == null?'':changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#periodEndTime").html(periodEndTime);//转正日期【注意对应关系】
                    $("#workSummary").html(data.result[0].workSummary);//工作总结
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
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
    }

    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }


})(jQuery, window, document)