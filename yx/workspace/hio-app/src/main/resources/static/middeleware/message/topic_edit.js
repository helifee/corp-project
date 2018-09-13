var urlParams = null;
$(function(){
        //获取请求参数
        urlParams = $.xljUtils.getUrlParams();
        var type = urlParams['type'];
        var id = urlParams['id'];
        if("edit" == type){
                $("#theme_info").text("修改主题");
                loadDataFromDb();
        }else if("add" == type){
                $("#theme_info").text("新增主题");
        }else {
                $("#theme_info").text("主题详情");
        }
});
/**
 * 按照ID从数据库中加载数据初始化form
 */
function loadDataFromDb(){
        var id = urlParams['id'];
        var uAll = serviceUrl + "sys/middeleware_topic/mqTopic/get/"+id;
        $.ajax({
                type:'get',
                url:uAll,
                success: function(data) {
                        var success = data.success;
                        var msg = data.msg;
                        if(success){
                                var dbResult = data.result;
                                $("#id").val(id);
                                $("#topic").val(dbResult.topic);
                                $("#consumerBeanName").val(dbResult.consumerBeanName);
                               // $("#consumerClass").val(dbResult.consumerClass);

                                //$("#rollBackBeanName").val(dbResult.rollBackBeanName);
                                //$("#validateBeanName").val(dbResult.validateBeanName);


                        }else {
                                //加载数据失败
                                pop_tip_open("red",resultData.msg);
                        }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                        pop_tip_open("red","初始化业务系统信息请求失败");
                }
        })
}
/**
 * 保存主题
 */
function saveTopic(){
        var type = urlParams['type'];
        var baseForm= $("#baseForm").serializeArray();
        var baseFormJson = {};
        $.each(baseForm, function() {
                baseFormJson[this.name] = this.value;
        });
        if($.trim(baseFormJson['topic']).length == 0){
                pop_tip_open("red","主题必填");
                return;
        }
        var url = null;
        var methodType = "post";
        if("edit" == type){
                var id = urlParams['id'];
                url = serviceUrl+'sys/middeleware_topic/mqTopic/update/'+id;
                baseFormJson.id = id;
                methodType = "put";
          }else if("add" == type){
                url = serviceUrl+'sys/middeleware_topic/mqTopic/save'
          }

        $.ajax({
                url:url,
                data:JSON.stringify(baseFormJson),
                type:methodType,
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
                                        window.opener.location.href = window.opener.location.href;
                                        //关闭当前页面
                                        window.close();
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


