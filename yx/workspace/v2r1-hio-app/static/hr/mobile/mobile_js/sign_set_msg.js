(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    var msg_content = $.xljUtils.getUrlParam("msg_content");//获取消息内容
    $("#msg_id").empty();
    if(undefined != msg_content && "" != msg_content){
        // if(msg_content == "sign_set_1"){
        //     $("#msg_id").append("<lable>" + "马上到上班时间,记得签到!" + "</lable>");
        // }else if(msg_content == "sign_set_2"){
        //     $("#msg_id").append("<lable>" + "您今天上班未在规定时间内打卡!" + "</lable>");
        // }else if(msg_content == "sign_set_3"){
        //     $("#msg_id").append("<lable>" + "您昨天有漏刷卡情况,请关注!" + "</lable>");
        // }else{
        //     $("#msg_id").append("<lable>" + "消息内容错误!" + "</lable>");
        // }
        //使用apache的base64解码
        $("#msg_id").append("<lable>" + Base64.decode(msg_content) + "</lable>");
    }else{
        $("#msg_id").append("<lable>没有消息显示!</lable>");
    }
    var msgId = $.xljUtils.getUrlParam("msgId");//获取消息id
    //初始化页面
    $(function(){
        //修改消息状态为已阅
        //var businessId = $('#businessId').val();
        // var msgType = $('#msgType').val();
        var postData = {};
        postData.id = msgId;
        postData.businessId = msgId;
        postData.oldStatus = "DY";//待阅
        postData.newStatus = "YY";//已阅
        postData.extendInfo = "meeting";//会议类消息
        postData.userId = "";//当前用户
        //平台访问的路径
        var platformhosturl="/platform-app/";
        var uBody =
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
                            alert("更新消息状态成功！" + msg);
                        } else {
                            alert("更新消息状态失败！" + msg);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("数据修改保存请求失败");
                }
            });
    });

})(document, window);