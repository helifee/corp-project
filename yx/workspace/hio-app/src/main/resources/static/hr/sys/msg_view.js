/**
 * lixd
 * 发送消息js
 */
var msgId;
//上来就执行
$(function () {
    //根据id加载数据
    msgId = $.xljUtils.getUrlParam("msgId");
    getMsgById(msgId);
    //页面加载就更新状态？？？
    updateStatusOfNoticeMsgByCurrentUser();
});
/**
 * 预览
 */
function getMsgById(msgId) {
    $.ajax({
        type: 'get',
        url: platformhosturl + "/flow/sysNoticeMsg/get/" + msgId + "?time=" + Math.random(),
        success: function (data) {
            //根据结果集 解析、赋值、显示
            msgId = data.result.id;
            $("#msgFrom").find("input[name='id']").val(msgId);
            $("#msgFrom").find("input[name='businessId']").val(data.result.businessId);
            $("#msgFrom").find("input[name='title']").val(data.result.title);
            $("#msgFrom").find("input[name='code']").val(data.result.code);
            $("#msgFrom").find("input[name='userId']").val(data.result.userId);
            $("#msgFrom").find("input[name='userName']").val(data.result.userName);
            $("#msgFrom").find("input[name='loginName']").val(data.result.loginName);
            $("#msgFrom").find("input[name='msgType']").val(data.result.msgType);
            $("#msgFrom").find("input[name='source']").val(data.result.source);
            $("#msgFrom").find("input[name='appCode']").val(data.result.appCode);
            $("#msgFrom").find("input[name='ipAddress']").val(data.result.ipAddress);
            $("#msgFrom").find("input[name='sendDate']").val(data.result.sendDate);
            $("#msgFrom").find("input[name='dealDate']").val(data.result.dealDate);
            $("#msgFrom").find("input[name='extendInfo']").val(data.result.extendInfo);
            $("#msgFrom").find("input[name='extendInfo']").val(data.result.extendInfo);
            $("#msgFrom").find("input[name='url']").val(data.result.url);
            $("#msgFrom").find("input[name='isOpen']").val(data.result.isOpen);
            $("#msgFrom").find("input[name='mobibleUrl']").val(data.result.mobibleUrl);
            $("#msgFrom").find("input[name='mobibleParam']").val(data.result.mobibleParam);
            $("#msgFrom").find("input[name='isLocked']").val(data.result.isLocked);
            $("#msgFrom").find("input[name='firstType']").val(data.result.firstType);
            $("#msgFrom").find("input[name='secondType']").val(data.result.secondType);
            $("#msgFrom").find("input[name='thirdType']").val(data.result.thirdType);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化组织机构请求失败");
        }
    })
}
//保存
$("#saveBtn").on('click', function () {
    saveMsg();
});
//更新状态
$("#updateStatusBtn").on('click', function () {
    updateStatusOfNoticeMsgByCurrentUser();
});
//修改附件
$("#updateBtn").on('click', function () {
    updateInfo();
});
/**
 * 初始化主键ID
 */
function initUuid() {
    var uAll = serviceUrl+"sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#msgFrom").find("input[name='id']").val(guuid);
            $("#msgFrom").find("input[name='businessId']").val(guuid);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化主键ID请求失败");
        }
    })
}
//保存消息-发送
function saveMsg() {
    //序列化表单数组
    var postArr = $("#msgFrom").serializeArray();
    var postDto = {};
    postDto.delflag = false;
    //将表单数组转化为 数据传输对象
    for (var i in postArr) {
        postDto[postArr[i].name] = postArr[i].value;
    }
    console.log("JSON.stringify(postDto)===" + JSON.stringify(postDto));
    $.ajax({
        url: platformhosturl + "flow/sysNoticeMsg/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postDto),
        success: function (xhr, textStatus) {
            console.log(xhr);
            if (xhr) {
                if (xhr.success) {
                    $.xljUtils.tip("green", "新增成功！");
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
    var postArr = $("#msgFrom").serializeArray();
    var postDto = {};
    var postID = "";
    for (var i in postArr) {
        if (postArr[i].name == "id") {
            postID = postArr[i].value;
        }
        postDto[postArr[i].name] = postArr[i].value;
    }
    $.ajax({
        url: platformhosturl + "/platform-app/flow/sysNoticeMsg/update/" + postID,
        type: 'put',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(postDto),
        success: function (resultData) {
            if (resultData) {
                var successFlag = resultData.success;
                var result = resultData.result;
                var msg = resultData.msg;
                if (successFlag) {
                    $.xljUtils.tip("green", "修改成功！");
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
 * 通过用户更新消息状态
 */
function updateStatusOfNoticeMsgByCurrentUser() {
    var businessId = $('#businessId').val();
    // var msgType = $('#msgType').val();
    var postData = {};
    postData.id = msgId;
    postData.businessId = businessId;
    // if (msgType == 1) {//审批类消息
    //     postData.oldStatus = "DB";//待办
    //     postData.newStatus = "YB";//已办
    // } else if (msgType == 0) {//通知类消息
    postData.oldStatus = "DY";//待阅
    postData.newStatus = "YY";//已阅
    // }
    postData.extendInfo = "meeting";//会议类消息
    postData.userId = "";//当前用户
    $.ajax({
        url: platformhosturl + "flow/sysNoticeMsg/updateStatusOfNoticeMsg",
        data: JSON.stringify(postData),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (resultData) {
            if (resultData) {
                var successFlag = resultData.success;
                var result = resultData.result;
                var msg = resultData.msg;
                if (successFlag) {
                    console.log(result);
                    pop_tip_open("blue", "更新消息状态成功！" + msg);
                } else {
                    pop_tip_open("red", "更新消息状态失败！" + msg);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "数据修改保存请求失败");
        }
    });
}