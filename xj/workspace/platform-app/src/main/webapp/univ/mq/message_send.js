function preSendTopic(){
        var baseFormJson = {
            topic:$.trim($("#topic").val()),
            msg:$.trim($("#msg").val())
        };
        
        $.xljUtils.xljAjax({
        	url:hostUrl+'univ/mq/message/preSend',
        	data:JSON.stringify(baseFormJson)
        }, function(data) {
        	$.xljUtils.tip('green', '预发送成功！');
        	$("#msgId").val(data.id);
        });
    }

    function sendTopic(){

        //var msgId = $.trim($("#msgId").val());
        
        var msgId = '51fcd3b9-c8f2-4092-bb24-ee54aabf9715';
        if(msgId.length == 0){
            $.xljUtils.tip("blue","消息ID为空");
            return;
        }
        
        var baseFormJson = {
                msgId:msgId
            };
        
        $.xljUtils.xljAjax({
        	url:hostUrl+'univ/mq/message/send',
        	data:JSON.stringify(baseFormJson)
        }, function(data) {
        	$.xljUtils.tip('green', '发送成功！');
        });
        
    }

    function consumerTest(){
        var url = hostUrl+'univ/mq/message/callMethod';

        $.ajax({
            url:url,
            data:{
                d:new Date().getTime()
            },
            type:"post",
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    //toastr.success('数据保存成功！');
                    var successFlag = resultData.success;
                    var msg = resultData.msg;
                    if(successFlag) {
                        var result = resultData.result;
                        //重新加载opener
                        alert("发送成功");
                        // $("#msgId").val(resultData.result.id);
                        //关闭当前页面

                    }else {
                        pop_tip_open("red",resultData.msg);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }

