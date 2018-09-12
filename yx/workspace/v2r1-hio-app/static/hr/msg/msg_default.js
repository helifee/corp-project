/**
 * lixd
 * 消息提醒的默认展示js
 * 用途：无复杂的业务需求，只做展示文本提醒
 */
;
(function ($, window, document, undefined) {
    var msgId;//消息id
    //上来就执行
    $(function () {
        //消息id
        msgId = $.xljUtils.getUrlParam("msgId");
        //展示文本
        var showText = $.xljUtils.getUrlParam("showText");
        //使用apache的base64解码
        $('#showText').val(Base64.decode(showText));
        //已阅的处理方式
        var readType=$.xljUtils.getUrlParam("readType");
        if(readType=='1'){//按钮操作
            //显示已阅按钮
            $('#readType').show();
        }else{//看后即毁
            updateStatusOfNoticeMsgByCurrentUser(msgId);
        }
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });
    //将消息设置为已阅
    $("#readType").unbind('click').on('click', function () {
        updateStatusOfNoticeMsgByCurrentUser(msgId);
    });

})(jQuery, window, document);