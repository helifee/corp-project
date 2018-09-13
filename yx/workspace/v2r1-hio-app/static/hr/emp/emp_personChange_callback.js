/**
 * 人事变动信息审批回显页面js
 */
;(function($, window, document, undefined){
    var oper;//操作类型
    var applicationUUID;//审批单ID
    var personId;
    var personArr = new Array();//用来动态保存更新人员的ID

    //上来就执行
    $(function(){
        //初始页面
        initInfo();
        initUpload();
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
     * 初始化页面
     */
    function initInfo() {
        $('title').text("人员变动审批页");
        $(".xj-form-title").text("人员变动审批页");
        //根据id获取页面信息
        var applyId = $.xljUtils.getUrlParam("businessId");//获取审批单ID
        // 根据审批单ID获取页面数据
        getInfoByAppId(applyId);
    }

    /**
     * 根据id获取审批单信息
     */
    function getInfoByAppId(applyId){
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
        //根据审批单ID获取从中间表获取页面信息
        $.ajax({
            url: baseUrl + "emp/hrEmpChange/queryList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"applyId":applyId}),
            success: function (data, textStatus) {
                if(data.result.length > 0){
                    personId = data.result[0].id;//中间表Id
                    $("#personId").val(data.result[0].personId);//人员ID
                    var empPersonDto = $.hrUtils.getHRPersonInfoById(data.result[0].personId);
                    $("#personName").html(empPersonDto.name);//人员名称
                    $('#phone').html(empPersonDto.phone);
                    var type=data.result[0].type;//变动类型
                    $('#type').val(type);
                    var type_name=$.hrUtils.getHRCodeNameById(type);
                    $('#type_name').html(type_name);
                    var orgBefore=data.result[0].orgBefore;//变动前机构
                    $('#orgBefore').val(orgBefore);
                    var orgBeforeName=$.hrUtils.getHROrgNameById(orgBefore);
                    $('#orgBeforeName').html(orgBeforeName);
                    var orgAfter=data.result[0].orgAfter;//变动后机构
                    $('#orgAfter').val(orgAfter);
                    var orgAfterName=$.hrUtils.getHROrgNameById(orgAfter);
                    $('#orgAfterName').html(orgAfterName);
                    var deptBefpre=data.result[0].deptBefpre;//变动前部门
                    $('#deptBefpre').val(deptBefpre);
                    var deptBefpreName=$.hrUtils.getHROrgNameById(deptBefpre);
                    $('#deptBefpreName').html(deptBefpreName);
                    var deptAfter=data.result[0].deptAfter;//变动后部门
                    $('#deptAfter').val(deptAfter);
                    var deptAfterName=$.hrUtils.getHROrgNameById(deptAfter);
                    $('#deptAfterName').html(deptAfterName);
                    var postBefore=data.result[0].postBefore;//变动前岗位
                    $('#postBefore').val(postBefore);
                    var postBeforeName=$.hrUtils.getPtPostNameById(postBefore);
                    $('#postBeforeName').html(postBeforeName);
                    var postAfter=data.result[0].postAfter;//变动后岗位
                    $('#postAfter').val(postAfter);
                    var postAfterName=$.hrUtils.getPtPostNameById(postAfter);
                    $('#postAfterName').html(postAfterName);
                    var headshipRankBefore=data.result[0].headshipRankBefore;//变动前职级
                    $('#headshipRankBefore').val(headshipRankBefore);
                    var headshipRankBefore_name=$.hrUtils.getHRCodeNameById(headshipRankBefore);
                    $('#headshipRankBefore_name').html(headshipRankBefore_name);
                    var headshipRankAfter=data.result[0].headshipRankAfter;//变动前职级
                    $('#headshipRankAfter').val(headshipRankAfter);
                    var headshipRankAfter_name=$.hrUtils.getHRCodeNameById(headshipRankAfter);
                    $('#headshipRankAfter_name').html(headshipRankAfter_name);

                    var changeTime=data.result[0].changeTime;//生效时间
                    if(""!=$.hrUtils.filterNull(changeTime)&&changeTime.length>10){
                        $('#changeTime').html(changeTime.substr(0,10));
                    }
                    var remark=data.result[0].remark;//说明
                    $('#remark').html(remark);
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
    };
    function initUpload() {
        $('.attachment-container').xljAttachment({
            appId: "HR",
            businessId: $.xljUtils.getUrlParam("businessId"),
            categoryId: ATTACH_TYPE_PERSON,
            mode: "view",
            singleUpload: false,
            autoSubmit: false,
            fromTempTable: false,
            serverAddr: ATTACH_SERVERADDR
        });
    }
})(jQuery, window, document);