// (function ($, window, document, undefined) {
var applyId;//系统申请表单据id

$(function () {
    querySignTypeList();
    //resizeHeight();
    pageInit();
    //根据业务id加载数据
    applyId = $.xljUtils.getUrlParam("businessId");//业务id 即申请单id 平台默认拼接businessId=？
    // applyId='849c5f31459a4ec5b22dc7df0fdbad1f';
    if (applyId == null || applyId == "") {
        applyId = "----";
    }
    getSysApplyById(applyId);
    getNoPunchInfoById();
    resizeGrid();
    setIframeHeight();
});

/**
 * 修改附件
 * @param businessId 业务单据id
 */
window.editAttach = function (businessId) {
    $('.attachment-container').xljAttachment({
        appId: 'HR',
        businessId: businessId,
        categoryId: ATTACH_TYPE_KQWDK,
        mode: 'view',
        serverAddr: ATTACH_SERVERADDR
    });
};

function pageInit() {
    attachmentInit();
    initDatetimepicker();
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 90) + "px");
    //右侧table
    $(".con-table .mytable").height((w_h - 180) / 3 + "px");
    //xj-main-grid grid-container
}
//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    $.xljUtils.gridResizeFn();
}
//grid 自适应宽度
// $(window).resize(function () {
//     resizeHeight();
//     resizeGrid();
// });

/**
 * 获取申请单信息，用于展示查看
 */
function getSysApplyById(applyId) {
    var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#sysApplyFrom").find("input[name='id']").val(data.result.id);
            $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
            $("#sysApplyFrom").find("input[name='code']").val(data.result.code);
            //用户的信息
            //制单人
            $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
            $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
            //经办人
            $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
            $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

            $("#companyId").val(data.result.companyId);
            $("#companyName").val(data.result.companyName);

            $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
            $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
            var deptId = $("#deptId");
            //先清空
            deptId.empty();
            deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

            //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
            //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
            $("#sysApplyFrom").find("input[name='applyDate']").val(changeTimeStyle(data.result.applyDate).format("yyyy-MM-dd"));
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").val(status);
            //isBtnShow2Hide();
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
            // $("#sysApplyFrom").find("input[name='approvalDate']").val(data.result.approvalDate);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化申请单信息失败");
        }
    })
}

/**
 *根据id查询请假申请信息
 */
function getNoPunchInfoById() {
    $.ajax({
        url: serviceUrl + "kq/hrKqNotPunch/queryApplyList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"applyId": applyId}),//sysApply的id
        success: function (data) {
            if (data.success) {
                var result = data.result.list;
                $("#id").val(result[0].id);
                $("#name").val(result[0].name);
                var status = result[0].status;
                // var statusValue = codeFormatter(status);
                // if (statusValue == null) {
                //     statusValue = "";
                // }
                $("#status").val(status);
                $("#statusValue").val(status);
                if (status != "草稿") {
                    $("#saveBtn").hide();
                    $("#applyBtn").hide();
                } else {
                    $("#saveBtn").show();
                    $("#applyBtn").show();
                }
                $("#personId").val(result[0].personId);
                $("#applicant").val(result[0].applicant);
                $("#applicantName").val(result[0].personName);
                // $("#postId").val(result[0].postId);
                // $("#postName").val(result[0].postName);
                // $("#rankId").val(result[0].rankId);
                $("#type").val(result[0].type);
                $("#code").val(result[0].code);
                $("#deptId").val(result[0].deptId);
                $("#deptName").val(result[0].deptName);

                $("#companyId").val(result[0].companyId);
                $("#companyName").val(result[0].companyName);

                $("#creater").val(result[0].creater);
                $("#createrName").val(result[0].createrName);

                var applyDate = changeTimeStyle(result[0].applyDate).format("yyyy-MM-dd");
                // if (applyDate = null || applyDate == "") {
                //     applyDate = "0000-00-00 00:00";
                // }
                $("#applyDate").val(applyDate);
                $("#approvalDate").val(result[0].approvalDate);
                var notPunchDate = result[0].notPunchDate;
                // $("#notPunchDate").val(new Date(changeTimeStyle(notPunchDate)).format("yyyy-MM-dd"));
                $("#notPunchDate").val((new Date(changeTimeStyle(notPunchDate)).format("yyyy-MM-dd")));
                var signType = result[0].signType;
                $("#signType").val(codeFormatter(signType));
                // $("#signType option[value='" + signType + "']").attr("selected", true);
                // $("#signType").prop("disabled","disabled");//控制补卡类型不能被切换
                $("#realLeaveTime").val(result[0].realLeaveTime);

                //todo 实际到岗/离岗时间
                $("#realTime").val(result[0].realTime);
                //制单人所属机构
                $("#sysNotPunchApplyFrom").find("input[name='createrOrgIdPlat']").val(result[0].createrOrgIdPlat);
                $("#sysNotPunchApplyFrom").find("input[name='createrOrgNamePlat']").val(result[0].createrOrgNamePlat);
                applyId = result[0].applyId;
                $("#applyId").val(applyId);
                //基本信息回显
                getEmpById(result[0].personId);
                $("#reason").val(result[0].reason);

                editAttach(applyId);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
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
                $('#personId').val(personId);
                $('#orgId').val(result.orgId);
                $("#personName").html(result.name);
                var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                $("#hrDeptId").val(result.deptId);
                $("#hrDeptName").val(deptName);
                // alert(result.postName);
                // alert($("#postName").val());
                var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                $("#headshipRank").val(headshipRank);
                $("#postName").val(result.postName);
                // $("#postName").val(result.postName);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });

}

/**
 * 查询补卡类型列表
 */
function querySignTypeList() {
    $.ajax({
        url: serviceUrl + "sys/sysCodeItem/queryList",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"code_set_id": "1107"}),
        success: function (data) {
            if (data.success) {
                signTypeList = data.result;
                var selTypeObj = $("#signType");

                for (i in signTypeList) {
                    var typeId = signTypeList[i].id;
                    var typeName = signTypeList[i].name;
                    selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}

/**
 * 请假申请：附件
 * */
function attachmentInit() {
    //创建jqGrid组件
    jQuery("#listAattachmentInit").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            // width: $('.container-all').width() - 150,
            // height: $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 283,
            width: window.screen.availWidth - 20,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'name', label: "附件名称", width: 160, align: "center"},
                {name: 'sort', label: "附件分类", width: 100, align: "center"},
                {name: 'size', label: "附件大小", width: 100, align: "center"},
                {name: 'description', label: "说明", width: 80, align: "center"},
            ],

            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc"//排序方式,可选desc,asc
        });
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

function initDatetimepicker() {
    //年月日
    var picker = $('.datetimepicker2').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });

    //时分
    $('.datetimepicker3').datetimepicker({
        language: 'zh-CN',
        format: 'hh:ii',
        startView: 1,
        autoclose: true,
    });
}


//针对IE进行时间转换
function changeTimeStyle(bTime) {
    var timePar = bTime.split(' ');
    var timeDate = timePar[0].split('-');
    bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
    var later = new Date(bTime);
    return later;
}

/**
 * 用户选择回调方法
 */
function userCallback(data, success) {
    console.log(data);
    //经办人
    var userId = data.id;
    $('#applicant').val(userId);
    getDirectDeptAnaDirectComByUser();

    //业务表保存hr系统人员信息
    var loginName = data.loginName;
    var flag = getHRUserInfo(loginName);
    if (flag == false) {
        pop_tip_open("red", "当前经办人【" + data.name + "】与HR系统无法对应，请选择其他人员！");
        emptyPerson();
        return;
    }
}

function codeFormatter(cellValue) {
    var codeName = "";
    if (cellValue !== null && cellValue !== undefined && cellValue !== "") {
        codeName = $.hrUtils.getHRCodeNameById(cellValue);
    }
    if (codeName !== null && codeName !== "") {
        return codeName;
    } else {
        return "";
    }
}
// })(jQuery, window, document)