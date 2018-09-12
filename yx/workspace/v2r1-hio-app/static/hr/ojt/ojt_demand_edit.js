/**
 * Created by xph on 2017/6/30.
 */

// (function ($, window, document, undefined) {
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    var j = false;
    var type;
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }
    //上来就执行
    $(function () {
        //closePage('86c0ed0aa63b4c74b3904872fd0b564e','e79e4f2a90bb479785ee098c263c074c');
        resizeHeight();
        initDatetimepicker();
        type = $.xljUtils.getUrlParam("type");
        if (type === 'add') {
            //初始化流程信息
            initSysApply();
            $('title').text("培训需求-新增");
            $(".xj-form-title").text("培训需求-新增");
            /*$("#saveBtn").show();
            $("#updateBtn").hide();*/
            //初始化id
            initUuid();
        } else if (type === 'update') {
            $('title').text("培训需求-修改");
            $(".xj-form-title").text("培训需求-修改");
            /*$("#saveBtn").hide();
            $("#updateBtn").show();*/
            //根据id加载数据
            demandId = $.xljUtils.getUrlParam("demandId");
            var applyId  = $.xljUtils.getUrlParam("applyId");
            if(demandId !=null || demandId != ''){
                getOjtDemandById(demandId);
            }
            if(applyId !=null || applyId != ''){
                //初始化流程信息
                getSysApplyById(applyId);
            }else{
                pop_tip_open("red", "没有审批!");
            }
            j = true;
        }
    });
//防止按钮刷新页面
$('.btn').click(function (e) {
    e.preventDefault();
});
//清除input框内容
$('#valueEmpty').click(function (e) {
    e.preventDefault();
    $(this).parents('.fullWidth').children('input').val('');
});
$("#saveBtn").on('click', function () {
    if (type == 'add'){
        if(j == false){
            //保存需求信息
            //保存申请信息
            $("#ojtDemandFrom").attr("data-validate-success", "");
            $("#ojtDemandFrom").submit();
            //保存申请信息
            $("#sysApplyFrom").attr("data-validate-success", "");
            $("#sysApplyFrom").submit();
            var flag = $("td").hasClass("has-error");
            if (flag == false) {
                saveInfo();
                saveSysApplyInfo();
            }
        }else {
            pop_tip_open("red", "已暂存，可以发起审批!");
            //$('body').find("#tip-box-alert").css("poistion","fixed");
        }
    }else{
        //修改需求信息
        $("#ojtDemandFrom").attr("data-validate-success", "");
        $("#ojtDemandFrom").submit();
        //修改申请信息
        $("#sysApplyFrom").attr("data-validate-success", "");
        $("#sysApplyFrom").submit();
        var flag = $("td").hasClass("has-error");
        if (flag == false) {
            updateInfo();
            updateSysApplyInfo();
        }
    }
});
//$("#updateBtn").unbind('click').on('click', function () {
//    updateInfo();
//});
$("#updateBtn").on('click', function () {
    //修改需求信息
    $("#ojtDemandFrom").attr("data-validate-success", "");
    $("#ojtDemandFrom").submit();
    //修改申请信息
    $("#sysApplyFrom").attr("data-validate-success", "");
    $("#sysApplyFrom").submit();
    var flag = $("td").hasClass("has-error");
    if (flag == false) {
        updateSysApplyInfo();
        updateInfo();
    }
});
/**
 * 修改-申请信息
 * 也就是改主题名
 * @param n
 */
function updateSysApplyInfo() {
    var id = $('#id1').val();
    var sysApplyArr = $("#sysApplyFrom").serializeArray();
    var sysApplyDto = {};
    for (var i in sysApplyArr) {
        if (sysApplyArr[i].name != 'approvalDate'){
            sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
        }
        if (sysApplyArr[i].name == 'applyDate'){
            var valueDat = sysApplyArr[i].value;
            var v = new Date(changeTimeStyle(valueDat)).format("yyyy-MM-dd hh:mm:ss");
            sysApplyDto[sysApplyArr[i].name] = v;
        }
    }
    //$("#sysApplyFrom").find("input[name='applyDate']").val(new Date(changeTimeStyle(data.result.applyDate)).format("yyyy-MM-dd"));
    $.ajax({
        url: baseUrl + "/sys/sysApply/update/" + id,
        type: 'put',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(sysApplyDto),
        success: function (resultData) {
            if (resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if (successFlag) {
                    $.xljUtils.tip("green", "修改成功！");
                    //pop_tip_open("green", "修改成功！");
                    //closePage();
                } else {
                    pop_tip_open("red", "数据修改保存失败！" + msg);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "数据修改保存请求失败");
        }

    });
}
/**
 * 保存申请信息
 */
function saveSysApplyInfo() {
    var orgSizeApplyArr = $("#sysApplyFrom").serializeArray();
    var orgSizeApplyDto = {};
    orgSizeApplyDto.delflag = 0;
    for (var i in orgSizeApplyArr) {
        if (orgSizeApplyArr[i].name != 'approvalDate'){
            orgSizeApplyDto[orgSizeApplyArr[i].name] = orgSizeApplyArr[i].value;
        }
    }
    $.ajax({
        url: baseUrl + "/sys/sysApply/save/",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(orgSizeApplyDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    //$.xljUtils.tip('', "保存成功！");
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", xhr.msg);
                }
            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });
}
    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#ojtDemandFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增培训需求
     */
    function saveInfo() {
        //序列化表单数组
        var ojtDemandArr = $("#ojtDemandFrom").serializeArray();
        var ojtDemandDto = {};
        ojtDemandDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in ojtDemandArr) {
            if (ojtDemandArr[i].name == "stratDate" || "endDate" == ojtDemandArr[i].name) {
                var date = ojtDemandArr[i].value.replace(/-/g, '/');
                if (date != "") {
                    ojtDemandDto[ojtDemandArr[i].name] = new Date(date).getTime();
                }
            } else if("orgName" == ojtDemandArr[i].name){
            } else {
                ojtDemandDto[ojtDemandArr[i].name] = ojtDemandArr[i].value;
            }
        }
        $.ajax({
            url: baseUrl + "ojt/hrOjtDemand/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtDemandDto),
            success: function (xhr, textStatus) {
                j = true;
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "新增成功！");
                        //window.opener.reloadDemandByIds(ojtDemandDto.id,ojtDemandDto.orgId);
                        closePage(ojtDemandDto.id,ojtDemandDto.orgId);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 修改
     * @param n
     */
    function updateInfo() {
        var ojtDemandArr = $("#ojtDemandFrom").serializeArray();
        var ojtDemandDto = {};
        var demandId = "";
        for (var i in ojtDemandArr) {
            if (ojtDemandArr[i].name == "stratDate" || "endDate" == ojtDemandArr[i].name) {
                var date = ojtDemandArr[i].value.replace(/-/g, '/');
                if (date != "") {
                    ojtDemandDto[ojtDemandArr[i].name] = new Date(date).getTime();
                }
            } else if("orgName" == ojtDemandArr[i].name){
            } else if (ojtDemandArr[i].name == "id") {
                demandId = ojtDemandArr[i].value;
            }else {
                ojtDemandDto[ojtDemandArr[i].name] = ojtDemandArr[i].value;
            }
        }
        $.ajax({
            url: baseUrl + "ojt/hrOjtDemand/update/" + demandId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtDemandDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        //pop_tip_open("green", "修改成功！");
                        $.xljUtils.tip("green", "修改成功！");
                        closePage(demandId,ojtDemandDto.orgId);
                        //closePage(demandId);
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }

    /**
     * 根据id加载指标集信息
     */
    function getOjtDemandById(demandId) {
        var uBody = "/ojt/hrOjtDemand/get/" + demandId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtDemandFrom").find("input[name='id']").val(data.result.id);
                $("#ojtDemandFrom").find("input[name='name']").val(data.result.name);
                $("#ojtDemandFrom").find("input[name='type']").val(data.result.type);
                $("#ojtDemandFrom").find("input[name='orgId']").val(data.result.orgId);
                $("#ojtDemandFrom").find("input[name='chargeName']").val(data.result.chargeName);
                $("#ojtDemandFrom").find("input[name='trainStudent']").val(data.result.trainStudent);
                $("#ojtDemandFrom").find("input[name='trainNum']").val(data.result.trainNum);
                $("#ojtDemandFrom").find("input[name='trainFee']").val(data.result.trainFee);
                var stratDate = data.result.stratDate;
                var endDate = data.result.endDate;
                $("#ojtDemandFrom").find("input[name='stratDate']").val(new Date(changeTimeStyle(stratDate)).format("yyyy-MM-dd"));
                $("#ojtDemandFrom").find("input[name='endDate']").val(new Date(changeTimeStyle(endDate)).format("yyyy-MM-dd"));
                /*$("#applyStartDate").val(new Date(changeTimeStyle(applyStartDate)).format("yyyy-MM-dd"));
                $("#applyEndDate").val(new Date(changeTimeStyle(applyEndDate)).format("yyyy-MM-dd"));
                $("#applyStartTime option[value='" + applyStartDate.substring(11, 16) + "']").attr("selected", true);
                $("#applyEndTime option[value='" + applyEndDate.substring(11, 16) + "']").attr("selected", true);*/
                $("#ojtDemandFrom").find("input[name='trainAddress']").val(data.result.trainAddress);
                $("#ojtDemandFrom").find("input[name='trainTeacher']").val(data.result.trainTeacher);
                $("#ojtDemandFrom").find("textarea[name='trainAim']").val(data.result.trainAim);
                $("#ojtDemandFrom").find("textarea[name='trainContent']").val(data.result.trainContent);
                $("#ojtDemandFrom").find("textarea[name='trainClass']").val(data.result.trainClass);
                var orgName = $.hrUtils.getHROrgNameById(data.result.orgId);
                $("#ojtDemandFrom").find("input[name='orgName']").val(orgName == undefined?data.result.orgId:orgName);

                /*$("#ojtDemandFrom").find("input[name='code']").val(data.result.code);
                //用户的信息
                //申请人
                $("#ojtDemandFrom").find("input[name='approver']").val(data.result.approver);
                $("#ojtDemandFrom").find("input[name='applyDate']").val(data.result.applyDate);
                $("#ojtDemandFrom").find("input[name='title']").val(data.result.title);
                var status = data.result.status;
                $("#ojtDemandFrom").find("input[name='status']").val(status);

                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#ojtDemandFrom").find("input[name='statusValue']").val(statusValue);*/
                //处理指标属性下拉回显
                // $("#status").val(data.result.status);
                //$("#property ").get(0).selectedIndex=1;  //设置Select索引值为1的项选中
                //$("#property ").val(4);   // 设置Select的Value值为4的项选中
                //$("#property option[text='jQuery']").attr("selected", true);   //设置Select的Text值为jQuery的项选中


            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训需求请求失败");
            }
        })
    }
//针对IE进行时间转换
window.changeTimeStyle = function (bTime) {
    if (bTime == null){
        return;
    }
    var timePar = bTime.split(' ');
    var timeDate = timePar[0].split('-');
    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
    var later = new Date(bTime);
    return later;
};
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
    //关闭页面
    function closePage(id,orgId) {
        //重新加载父页面
        //window.opener.location.reload();
        //window.opener.reloadDemandList(id);
        if(window.opener.reloadDemandByIds!=undefined) {
            window.opener.reloadDemandByIds(id, orgId);
        }
        //关闭本页面
        window.close();
    }

    //初始化日期控件
    function initDatetimepicker(){
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        }).on('changeDate',function () {
            var startDate = $("#startDate").val();
            var endDate = $("#endDate").val();
            if (new Date(startDate) > new Date(endDate)){
                //alert("开始时间不能大于结束时间");
                pop_tip_open("red", "开始时间不能晚于结束时间！");
                $("#endDate").val("");
                $("#startDate").val("");
            }
        });

        //时分
        $('.datetimepicker3').datetimepicker({
            language: 'zh-CN',
            format: 'hh:ii',
            startView:1,
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
//发起
$("#applyBtn").unbind('click').on('click', function () {
    if(j == true){
        toApply();
    }else {
        pop_tip_open("red", "先暂存，在发起申请!");
    }
});
/**
 * 打开编制申请页面
 * @param
 */
function toApply() {
    if (checkStatus()) {
        //发起申请
        //var applyId = $('#id1').val();//业务申请单的id
        var applyId  = $.xljUtils.getUrlParam("applyId");
        if (type == 'add') {
            var applyId = $("#applyId").val();
        }
        toApplyByObjectCode(BOCODE_EXAMPAPER, applyId);
    }
}
function checkStatus() {
    var status = $('#status').val();//状态
    if (status != APPLY_STATUS_DRAFT) {
        pop_tip_open("red", "只有草稿状态才能保存");
        return false;
    } else {
        return true;
    }
}
/**
 * 初始化申请单信息
 */
function initSysApply() {
    var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#id1").val(data.result.id);
            $("#applyId").val(data.result.id);
            $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
            //初始化申请单编号
            var applyCode = $.hrUtils.getApplyCodeByType('EXAMPAPER');
            $("#sysApplyFrom").find("input[name='code']").val(applyCode);
            //用户的信息
            //制单人
            $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
            $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
            //经办人
            $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
            $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

            $("#sysApplyFrom").find("input[name='companyId']").val(data.result.companyId);
            $("#sysApplyFrom").find("input[name='companyName']").val(data.result.companyName);

            $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
            $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
            var dept = $("#deptId");
            //先清空
            dept.empty();
            //机构信息
            dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

            $("#sysApplyFrom").find("input[name='applyDate']").val(data.result.applyDate);
            $("#sysApplyFrom").find("input[name='type']").val(APPLY_TYPE_EXAMPAPER);//机构编制申请

            //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
            //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").val(status);
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
            //$("#sysApplyFrom").find("input[name='approvalDate']").val("0000-00-00 00:00:00");
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化指标集请求失败");
        }
    })
}
function getSysApplyById(applyId) {
    var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#id1").val(data.result.id);
            $("#applyId").val(data.result.id);
            $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
            $("#sysApplyFrom").find("input[name='code']").val(data.result.code);
            //用户的信息
            //制单人
            $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
            $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
            //经办人
            $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
            $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

            $("#sysApplyFrom").find("input[name='companyId']").val(data.result.companyId);
            $("#sysApplyFrom").find("input[name='companyName']").val(data.result.companyName);

            $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
            $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
            var deptId = $("#deptId");
            //先清空
            deptId.empty();
            deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

            //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
            //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
            $("#sysApplyFrom").find("input[name='applyDate']").val(new Date(changeTimeStyle(data.result.applyDate)).format("yyyy-MM-dd"));
            /*$("#sysApplyFrom").find("input[name='applyDate']").val(data.result.applyDate);*/
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").val(status);
            //isBtnShow2Hide();
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
            if(data.result.approvalDate != null){
                $("#sysApplyFrom").find("input[name='approvalDate']").val(new Date(changeTimeStyle(data.result.approvalDate)).format("yyyy-MM-dd hh:mm:ss"));
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化指标集请求失败");
        }
    })
}
//测试获取业务变量接口
$("#testVarBtn").unbind('click').on('click', function () {
    var businessId = $('#id1').val();//业务申请单的id
    getBusinessObjectVar("/ojt/hrOjtDemand/getBusinessDemand", businessId, 'EXAMPAPER', 'EXAMPAPER_FLOW');
});
//测试状态回调接口
$("#testStatusCallBtn").unbind('click').on('click', function () {
    var businessId = $('#id1').val();//业务申请单的id
    statusCallBack(businessId, "EXAMPAPER", 1);
});
window.orgCallback = function (data) {
    var orgId = data.id;
    $("#orgId").val(data.id);
    // $("#orgName").val(data.name);
    $("#orgName").val(data.prefixName);

}
//清空组织机构
window.emptyOrg = function () {
    $("#ojtDemandFrom").find("input[id='orgId']").val("");
    $("#ojtDemandFrom").find("input[id='orgName']").val("");
}
/**
 * 用户选择回调方法
 */
function userCallback(data, success) {
    console.log(data);
    //经办人
    var userId = data.id;
    $('#applicant').val(userId);
    //getTopDeptAnaTopComByUser();
    getDirectDeptAnaDirectComByUser();
}
/**
 * 根据用户获取其所有组织的直属部门和直属公司
 */
function getDirectDeptAnaDirectComByUser() {
    //经办人
    var applicant = $('#applicant').val();
    var postData = {"userId": applicant};
    $.ajax({
        url: "/hr-app/sys/sysApply/getDirectDeptAnaDirectComByUser",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    var data = xhr.result;
                    console.log(data);
                    //赋值所属机构下拉
                    //部门公司映射
                    deptComList = data;
                    var deptId = $("#deptId");
                    //先清空
                    deptId.empty();

                    //遍历机构信息
                    $.each(data, function (n, value) {
                        deptId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
                    });
                    //联动所属公司
                    changeCompanyByDeptId();
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", "获取顶级部门和公司失败！");
                }
            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}
/**
 * 根据用户获取其所有组织的顶级部门和顶级公司
 */
function getTopDeptAnaTopComByUser() {
    //经办人
    var applicant = $('#applicant').val();
    var postData = {"userId": applicant};
    $.ajax({
        url: "/hr-app/sys/sysApply/getTopDeptAnaTopComByUser",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    var data = xhr.result;
                    console.log(data);
                    //赋值所属机构下拉
                    //部门公司映射
                    deptComList = data;
                    var deptId = $("#deptId");
                    //先清空
                    deptId.empty();

                    //遍历机构信息
                    $.each(data, function (n, value) {
                        deptId.append("<option value='" + value.topDeptId + "'>" + value.topDeptAllName + "</option>");
                    });
                    //联动所属公司
                    changeCompanyByDeptId();
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", "获取顶级部门和公司失败！");
                }
            } else {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}
//新增页面
$("#deptId").change(function () {
    changeCompanyByDeptId();
});
/**
 * 根据机构改变公司
 */
function changeCompanyByDeptId() {
    //当前机构的默认值
    var deptId = $("#deptId").val();
    // alert("现在的机构ID是======"+deptId);
    $.each(deptComList, function (n, value) {
        if (value.topDeptId == deptId) {
            $('#deptName').val(value.deptName);
            $('#companyId').val(value.topCompId);
            $('#companyName').val(value.topCompName);
        }
    });
}
// })(jQuery, window, document);