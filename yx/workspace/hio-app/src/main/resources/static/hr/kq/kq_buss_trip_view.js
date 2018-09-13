/**
 * lixd
 * 考勤出差审批详情，只做查看
 */
//上来就执行
var bussApplyTypeList;//出差类型
var applyId;//系统申请表单据id
$(function () {
    queryRestApplyTypeList();
    //根据业务id加载数据
    applyId = $.xljUtils.getUrlParam("businessId");//业务id 即申请单id 平台默认拼接businessId=？
    //applyId = '27dabcfde0074748919d912da589a8e2';
    getSysApplyById(applyId);
    getKqBussInfoById(applyId);
    setIframeHeight();
});

/**
 * 获取申请单信息
 *修改,回显数据
 */
window.getSysApplyById = function (applyId) {
    var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#sysApplyFrom").find("input[name='id']").attr('value', data.result.id);
            $("#sysApplyFrom").find("input[name='name']").attr('value', data.result.name);
            $("#sysApplyFrom").find("input[name='code']").attr('value', data.result.code);
            //用户的信息
            //制单人
            $("#sysApplyFrom").find("input[name='creater']").attr('value', data.result.creater);
            $("#sysApplyFrom").find("input[name='createrName']").attr('value', data.result.createrName);
            //经办人
            $("#sysApplyFrom").find("input[name='applicant']").attr('value', data.result.applicant);
            $("#sysApplyFrom").find("input[name='applicantName']").attr('value', data.result.applicantName);

            $("#companyId").attr('value', data.result.companyId);
            $("#companyName").attr('value', data.result.companyName);

            $("#sysApplyFrom").find("input[name='deptId']").attr('value', data.result.deptId);
            $("#sysApplyFrom").find("input[name='deptName']").attr('value', data.result.deptName);
            var deptId = $("#deptId");
            //先清空
            deptId.empty();
            deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

            $("#sysApplyFrom").find("input[name='applyDate']").attr('value', changeTimeStyle(data.result.applyDate).format("yyyy-MM-dd"));
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").attr('value', status);
            //isBtnShow2Hide();
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysApplyFrom").find("input[name='statusValue']").attr('value', statusValue);
            //todo 制单人所属机构
            $("#createrOrgIdPlat").attr('value', data.result.createrOrgIdPlat);
            $("#createrOrgNamePlat").attr('value', data.result.createrOrgNamePlat);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化申请单信息失败");
        }
    })
};

/**
 *根据id查询出差申请信息
 */
function getKqBussInfoById(id) {
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/queryList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"applyId": id}),
        success: function (data) {
            //默认查询出差申请。如果查不到则去查市内公出
            var result = new Array();
            if (data.success) {
                result = data.result;
                if (result != null && result.length > 0) {
                    $("#code").attr('value', result[0].code);
                    $("#name").attr('value', result[0].name);
                    var status = result[0].status;
                    $("#status").attr('value', status);
                    if (status != "草稿") {
                        $("#saveBtn").hide();
                        $("#applyBtn").hide();
                    } else {
                        $("#saveBtn").show();
                        $("#applyBtn").show();
                    }

                    $("#personId").attr('value', result[0].personId);
                    //基本信息回显
                    getEmpById(result[0].personId);
                    $("#applicant").attr('value', result[0].applicant);
                    $("#applicantName").attr('value', result[0].personName);
                    $("#postId").attr('value', result[0].postId);
                    $("#postName").attr('value', result[0].postName);
                    $("#rankId").attr('value', result[0].rankId);
                    var tripType = result[0].tripType;
                    $("#tripTypeValue").attr('value', $.hrUtils.getHRCodeNameById(tripType));
                    var tripWay = result[0].tripWay;
                    $("#tripWay").attr('value', tripWay);
                    $("#deptId").attr('value', result[0].deptId);
                    $("#deptName").attr('value', result[0].deptName);
                    // $("#applyDate").attr('value', changeTimeStyle(result[0].applyDate).format("yyyy-MM-dd"));
                    $("#applyTripDays").attr('value', result[0].applyTripDays);
                    var applyStartDate = result[0].applyStartDate;
                    var applyEndDate = result[0].applyEndDate;
                    var temp1 = "";
                    if (applyStartDate != null && applyStartDate != "") {
                        var applyStartDate2 = new Date(changeTimeStyle(applyStartDate));
                        if (applyStartDate2 != null && applyStartDate2 != "") {
                            temp1 = applyStartDate2.format("yyyy-MM-dd").toString();
                            // $("#applyStartDate").attr('value',applyStartDate2.format("yyyy-MM-dd").toString()) ;
                        }
                    }
                    var temp2 = "";
                    if (applyEndDate != null && applyEndDate != "") {
                        var applyEndDate2 = new Date(changeTimeStyle(applyEndDate));
                        if (applyEndDate2 != null && applyEndDate2 != "") {
                            // $("#applyEndDate").attr('value',applyEndDate2.format("yyyy-MM-dd"));
                            temp2 = applyEndDate2.format("yyyy-MM-dd").toString();
                        }
                    }
                    if (applyStartDate != null && applyStartDate != "") {
                        // $("#applyStartTime option[value='" + applyStartDate.substring(11, 16) + "']").attr("selected", true);
                        temp1 = temp1 + " " + applyStartDate.substring(11, 16);
                    }
                    $("#applyStartDate").attr('value', temp1);
                    if (applyStartDate != null && applyStartDate != "") {
                        // $("#applyEndTime option[value='" + applyEndDate.substring(11, 16) + "']").attr("selected", true);
                        temp2 = temp2 + " " + applyEndDate.substring(11, 16);
                    }
                    $("#applyEndDate").attr('value', temp2);
                    $("#tripType option[value='" + tripType + "']").prop("selected", true);
                    $("#tripType").prop("disabled", "disabled");//控制出差方式不能被更换
                    $("#applyStartTime").prop("disabled", "disabled");//控制开始时间不能被切换
                    $("#applyEndTime").prop("disabled", "disabled");//控制结束时间不能被切换
                    // $("#tripWay option[value='" + tripWay + "']").attr("selected", true);

                    $("#destroyStatus").attr('value', result[0].destroyStatus);

                    applyId = result[0].applyId;
                    $("#applyId").attr('value', applyId);
                    //回显审批单信息
                    getSysApplyById(applyId);
                    $("#reason").text(result[0].reason);//回显 dom追加，适配打印展示

                    $("#location").attr('value', result[0].location);
                    $("#destination").attr('value', result[0].destination);


                    editAttach(applyId);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

function getEmpById(id) {
    if (id == null || id == "") {
        id = $("#personId").val();
    }
    // var urlBody = "emp/empPersonInfo/getEmpById/"+id;
    var urlBody = "emp/empPersonInfo/getEmpById/" + id;
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'GET',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        // data: JSON.stringify({"orgId": orgId}),
        success: function (data) {
            if (data.success == true) {
                var result = data.result;
                var personId = result.id;
                $('#personId').attr('value', personId);
                $('#orgId').attr('value', result.orgId);
                $("#personName").attr('value', result.name);
                var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                $("#hrDeptId").attr('value', result.deptId);
                $("#hrDeptName").attr('value', deptName);
                // alert(result.postName);
                // alert($("#postName").val());
                var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                $("#headshipRank").attr('value', headshipRank);
                $("#postNameS").attr('value', result.postName);
                // $("#postName").attr('value',result.postName);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}


/**
 * 发起流程后，平台调用我们的方法
 * 这个页面需要么
 */
function flowCallBack() {
    //刷新一下页面
    window.location.reload();
}

//针对IE进行时间转换
function changeTimeStyle(bTime) {
    var timePar = bTime.split(' ');
    var timeDate = timePar[0].split('-');
    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
    var later = new Date(bTime);
    return later;
}

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
/**
 * 修改附件
 * @param businessId 业务单据id
 */
window.editAttach = function (businessId) {
    $('.attachment-container').xljAttachment({
        appId: 'HR',
        businessId: businessId,
        categoryId: ATTACH_TYPE_KQCC,
        mode: 'view',
        serverAddr: ATTACH_SERVERADDR
    });
};

function codeFormatter(cellValue, options, rowObject) {
    var codeName = $.hrUtils.getHRCodeNameById(cellValue);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
}


/**
 * 查询出差类型列表
 */
function queryRestApplyTypeList() {
    $.ajax({
        url: serviceUrl + "kq/hrKqBussTrip/queryBussApplyTypeList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: "{}",
        success: function (data) {
            if (data.success) {
                bussApplyTypeList = data.result;
                var selTypeObj = $("#tripType");

                for (i in bussApplyTypeList) {
                    var typeId = bussApplyTypeList[i].id;
                    var typeName = bussApplyTypeList[i].name;
                    if (typeId != '1079100142') {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}
