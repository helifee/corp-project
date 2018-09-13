;(function($, window, document, undefined){
    var oper;//操作类型
    var uuid;//新增主键
    var personId;
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
        $('title').text("员工离职审批页");
        $(".xj-form-title").text("员工离职审批页");
        //根据id获取页面信息
        var applyId = $.xljUtils.getUrlParam("businessId");//获取审批单ID
        // 根据审批单ID获取页面数据
        getInfoByAppId(applyId);
    }

    /**
     * 根据审批单Id审批单信息和人员信息
     */
    function getInfoByAppId(applyId){
        //根据审批单Id获取审批单信息
        $.ajax({
            type:"GET",
            url:baseUrl+"sys/sysApply/get/"+applyId,
            dataType:"json",
            success: function(data, textStatus) {
                $("#applyId").val(data.result.id);
                $("#topic").html(data.result.name);//主题
                $("#code").html(data.result.code);//单据号
                $("#createrName").html(data.result.createrName);//制单人
                $("#applicantName").html(data.result.applicantName);//经办人
                $("#companyName").html(data.result.companyName);
                $("#deptName").html(data.result.deptName);
                $("#applyDate").html(data.result.applyDate);
                var status = data.result.status;
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#statusValue").html(statusValue);
                $("#approvalDate").html(data.result.approvalDate);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        //根据审批单Id获取离职中间表信息
        $.ajax({
            type:"POST",
            url:baseUrl+"emp/hrEmpLeaveInfoTmp/queryList",
            dataType:"json",
            contentType:'application/json',
            async: false,//请求需要改为同步
            data:JSON.stringify({"applyId":applyId}),
            success: function(data, textStatus) {
                $("#nameName").html(data.result[0].name);//人员名称
                $("#personId").val(data.result[0].personId);//获取PersonId，用于查询人员信息和合同信息
                $("#leaveInfoId").val(data.result[0].id);//这里需要将离职中间表Id保存下来，用于更新
                $("#leaveType").html(data.result[0].leaveType);
                $("#leaveType_name").html($.hrUtils.getHRCodeNameById(data.result[0].leaveType));
                var leaveTime = (data.result[0].leaveTime == '' || data.result[0].leaveTime == null)?'':changeTimeStyle(data.result[0].leaveTime).Format("yyyy-MM-dd");
                $("#leaveTime").html(leaveTime);
                $("#cause").html(data.result[0].cause);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        var personId = $("#personId").val();
        //根据审批单Id获取人员信息
        $.ajax({
            url: serviceUrl + "emp/empPersonInfo/getPersonAmdContInfo/" + personId,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data, textStatus) {
                $("#name").html(data.result.id);//人员ID
                $("#nameName").html(data.result.name);//人员名称
                $("#personId").html(data.result.id); //人员ID
                $("#personCode").html(data.result.personCode);//人员编号
                $("#orgName").html($.hrUtils.getHROrgNameById(data.result.orgId));//所在机构
                $("#postName").html(data.result.postName);//岗位名称
                $("#headshipRank").html($.hrUtils.getHRCodeNameById(data.result.headshipRank));//职级
                $("#sex").html($.hrUtils.getHRCodeNameById(data.result.sex));//性别
                var entryTime = ( data.result.entryTime == '' || data.result.entryTime == null ) ?'' :changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
                $("#entryTime").html(entryTime);//入职时间
                var  entryOrgTime = (data.result.entryOrgTime == '' || data.result.entryOrgTime == null)?'':changeTimeStyle(data.result.entryOrgTime).Format("yyyy-MM-dd");
                $("#entryOrgTime").html(entryOrgTime);//进入本公司时间
                //todo 转正日期选取人员基本信息中的转正时间
                var periodEndTime = (data.result.regularTime == '' || data.result.regularTime ==null)?'':changeTimeStyle(data.result.regularTime).Format("yyyy-MM-dd");
                $("#periodEndTime").html(periodEndTime);//转正时间
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