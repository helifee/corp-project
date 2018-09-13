/**
 * Created by lixd on 2017/8/11.
 * 预警消息js
 */
/**
 * 通过用户更新消息状态
 */
function updateStatusOfNoticeMsgByCurrentUser(msgId) {
    var businessId = msgId;
    // var msgType = $('#msgType').val();
    var postData = {};
    postData.id = msgId;
    postData.businessId = businessId;
    //消息类型
    var source = $.xljUtils.getUrlParam("source");
    if (source == "DB") {//审批类消息
        postData.oldStatus = "DB";//待办
        postData.newStatus = "YB";//已办
    } else if (source == "DY") {//通知类消息
        postData.oldStatus = "DY";//待阅
        postData.newStatus = "YY";//已阅
    }
    // postData.extendInfo = "meeting";//会议类消息
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
/**
 * 测试将消息状态由已办改为待办
 * 绩效待办恢复
 * @param msgId
 */
function updateStatusYB2DB(msgId) {
    var businessId = msgId;
    var postData = {};
    postData.id = msgId;
    postData.businessId = businessId;
    postData.oldStatus = "YB";//已办
    postData.newStatus = "DB";//待办
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
                    pop_tip_open("blue", "恢复消息状态成功！" + msg);
                } else {
                    pop_tip_open("red", "恢复消息状态失败！" + msg);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "数据修改保存请求失败");
        }
    });
}