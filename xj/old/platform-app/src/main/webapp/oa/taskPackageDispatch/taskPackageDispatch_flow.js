var dispatchId = $.xljUtils.getUrlParam('dispatchId');
var id = $.xljUtils.getUrlParam('id');
$(function () {
    if($.xljUtils.getUrlParam('source')=='YB'){
        $('#ignoreNotice').hide();
        $('#acceptNotice').hide();
    }
    pageInit();

});

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit() {
    getTaskPackageDispatchBean(dispatchId);
    /* $('#uploadFile').xljAttachment({appId:'1',businessId:id,categoryId:'1',mode:'add',singleUpload:true});*/

}
function getTaskPackageDispatchBean(id) {
    $.ajax({
        type: 'get',
        url: hostUrl + 'oa/taskPackageDispatch/get/' + id + '?time=' + Math.random(),
        success: function (data) {
            if (data.success) {
                var resultData = data.result
                $("input[name='id']").val(resultData.id);
                $("input[name='concurrencyVersion']").val(resultData.concurrencyVersion);
                $("textarea[name='content']").val(resultData.content);
                $("textarea[name='content']").attr("title", resultData.content);
                $("input[name='dutyUserId']").val(resultData.dutyUserId);
                $("input[name='dutyUser']").val(resultData.dutyUser);
                $("input[name='dutyDeptId']").val(resultData.dutyDeptId);
                $("input[name='dutyDept']").val(resultData.dutyDept);
                $("input[name='expectCompleteDate']").val(resultData.expectCompleteDate.substring(0, resultData.expectCompleteDate.indexOf(".")));
                $("textarea[name='remark']").html(resultData.remark);
                $("textarea[name='remark']").attr("title", resultData.remark);
                var d = resultData.reportStatus;
                var taskpackageId = resultData.taskPackageId;
                $('#uploadFile').xljAttachment({
                    appId: '1',
                    businessId: taskpackageId,
                    categoryId: '1',
                    mode: 'view',
                    singleUpload: false,
                    hideButtonsWithNoFile: true
                });
                if (d == "0") {
                    $("input[name='reportStatus']").val("未汇报");
                } else if (d == "1") {
                    $("input[name='reportStatus']").val("已汇报");
                }
            } else {
                pop_tip_open("red", data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        }
    });
}


/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */



function updateNoticeMsg(d) {
    var data = {
        id: id,
        businessId: dispatchId,
        oldStatus: "DB",
        newStatus: "YB"
    };
    $.ajax({
        url: hostUrl + "flow/sysNoticeMsg/updateStatusOfNoticeMsg",
        type: 'post',
        contentType: "application/json",
        dataType: 'JSON',
        data: JSON.stringify(data),
        success: function (resultData) {
            if (resultData && resultData.success) {
                if (window.opener&&$.isFunction(window.opener.refreshMyTaskData)){
                    window.opener.refreshMyTaskData();
                }

                if(window.opener&&$.isFunction(window.opener.refreshJqGridData)){
                    //刷新流程消息列表
                    window.opener.refreshJqGridData();
                }
            } else {
                $.xljUtils.tip("red", resultData.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        }
    });
    var taskStatus = {
        taskStatus: d,
        dispatchId: dispatchId
    }
    $.ajax({
        url: hostUrl + "oa/taskPackageDispatch/updateTaskDispathStatus",
        type: 'post',
        contentType: "application/json",
        dataType: 'JSON',
        data: JSON.stringify(taskStatus),
        success: function (resultData) {
            if (resultData && resultData.success) {
                if (window.opener&&$.isFunction(window.opener.refreshMyTaskData)){
                    window.opener.refreshMyTaskData("toApprove");
                }
                if(window.opener&&$.isFunction(window.opener.refreshJqGridData)){
                    //刷新流程消息列表
                    window.opener.refreshJqGridData();
                }
                window.open("", "_self");
                window.close();
            } else {
                pop_tip_open("red", resultData.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        }
    });
}

function closed() {
    window.opener = null;
    window.open("", "_self");
    window.close();
}
