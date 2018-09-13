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
    var loadOpts = {
    		url: hostUrl + "univ/mq/topic/get/"+id,
    		type:'GET'
    };
    $.xljUtils.xljAjax(loadOpts,function(data){
          $("#id").val(id);
          $("#topic").val(data.topic);
          $("#consumerBeanName").val(data.consumerBeanName);
	});

}

/**
 * 保存主题
 */
function saveTopic(){
	
	var $curForm = $('#baseForm');
	if ($curForm.find("input[name='id']").val() == '') {
		initUuid();
		return;
	} 
	$.xljUtils.customSingleValidate($curForm[0]);
	if (!$curForm.valid()) {
		return;
	}
	
	var type = urlParams['type'];
	var url = null;
	var methodType = "post";
	if("edit" == type){
		var id = urlParams['id'];
		url = hostUrl+'univ/mq/topic/update/'+id;
		baseFormJson.id = id;
		methodType = "put";
	}else if("add" == type){
		url = hostUrl+'univ/mq/topic/save'
	}

	var saveData = $curForm.serializeObject();
	var saveOpts = {
			url:url,
			data:JSON.stringify(saveData),
			type:methodType
	};
	
	$.xljUtils.xljAjax(saveOpts,function(data){
        //重新加载opener
        window.opener.location.href = window.opener.location.href;
        //关闭当前页面
        window.close();
	});
}

/**
 * 初始化主键
 * @returns
 */
function initUuid() {
	$.xljUtils.getUuid(function(uuid){
		if (!$.xljUtils.isEmpty(uuid)) {
			$('#baseForm').find('input[name="id"]').val(uuid);
		}
	});
}

