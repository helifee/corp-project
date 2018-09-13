/**
 * Created by dgh on 2017/5/9.
 * update by ztf on 2017/6/16
 */
var urlParamJson = $.xljUtils.getUrlParams();
$(function () {

    /**
     * 初始化表单数据
     */
    function initFormData() {
        if(urlParamJson.act=='create'){
        	initUUID();
            $('#editTitle').text('分类设置-新增');
            var idVal = urlParamJson.id;
            var name = decodeURI(escape($.xljUtils.getUrlParam('name')));
            if(idVal != null && idVal != "undefined"){
            	 $("#parentId").val(idVal);
            }
           if(name != null && name != "undefined" && name != "null"){
        	   $("#parentName").val(name);
           }
            initParentCategoryTree();
        }else if(urlParamJson.act=='update'){
            $('#editTitle').text('分类设置-修改');
            var idVal = urlParamJson.id;
            $.ajax({
                url:hostUrl+'oa/servey/serveyCategory/get/'+idVal+'?time='+Math.random(),
                type:'GET',
                dataType:'JSON',
                success:function (resultData) {
                    if(resultData&&resultData.success){
                        var result = resultData.result;
                        for(var item in result) {
                        	if(item == "parentName"){
                        		$('#serveyCategoryForm :input[name="'+item+'"]').val($.xljUtils.htmlDecode(result[item]));
                        	}else{
                        		$('#serveyCategoryForm :input[name="'+item+'"]').val(result[item]);
                        	}
                            
                        }

                        initParentCategoryTree(result.id);

                    }
                }
            });
        }


    }
    initFormData();
    //保存按钮点击事件
    $('#saveBtn').on('click',function () {
        $("#serveyCategoryForm").attr("data-validate-success","serverCategoryEdit('over')");
		$("#serveyCategoryForm").submit();
    });
    
    //保存按钮点击事件
    $('#saveAndCreateBtn').on('click',function () {
    	$("#serveyCategoryForm").attr("data-validate-success","serverCategoryEdit('continue')");
  		$("#serveyCategoryForm").submit();
    });
    
    function initParentCategoryTree(delId) {
        $('#parentSpan').xljSingleSelector({
            title:'调查分类',
            selectorType:'serveyCategory',
            targetId:'parentId',
            targetName:'parentName',
            treeUrl:hostUrl+'oa/servey/serveyCategory/queryList?time='+Math.random(),
            treeSettings:{
                "data":{
                    "simpleData":{
                        "enable":true,
                        "idKey":"id",
                        "pIdKey":"parentId",
                        "rootPId":null
                    }
                },
                callback:{
                    onNodeCreated:function (event,treeId,treeNode) {
                        if(delId==treeNode.id){
                            $.fn.zTree.getZTreeObj(treeId).removeNode(treeNode,false);
                        }

                    }
                }

            }
        });
    }

    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
         // newwin = window.open("","_parent","");
         // newwin.close();
        window.close();
    });
});

function serverCategoryEdit(serveyCategoryFormType){
	var serverCategoryArr = $("#serveyCategoryForm").serializeArray();
	var serverCategoryDto = {};
	for (var serverCategory in serverCategoryArr) {
		serverCategoryDto[serverCategoryArr[serverCategory].name] = serverCategoryArr[serverCategory].value;
	}
	var url = '';
	var type = '';
	if(urlParamJson.act=='create'){
		url = hostUrl+'oa/servey/serveyCategory/save';
		type = 'POST';
	}else if(urlParamJson.act=='update'){
		var idVal = urlParamJson.id;
		url = hostUrl+'oa/servey/serveyCategory/update/'+idVal;
		type = 'put';
	}
	
	$.ajax({
		url : url,
		data : JSON.stringify(serverCategoryDto),
		type : type,
		contentType : 'application/json',
		dataType : 'JSON',
		success : function(resultData) {
			if (resultData) {
				var successFlag = resultData.success;
				if (successFlag) {
					   if(serveyCategoryFormType=="over"){
	                	   window.opener.reloadGrid(serverCategoryDto["id"]);
	                	   window.close();
	                   }else if(serveyCategoryFormType=="continue"){
	                	   $('#serveyCategoryList').jqGrid().trigger("reloadGrid");
	                	   $("#serveyCategoryForm")[0].reset();
	                	   initUUID();
	                	   urlParamJson.act='create';
	                   }
				} else {
					pop_tip_open("red", resultData.msg);
				}
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
		}
	});
}

function closeWin(aa,resultData) {
    if(resultData.success) {
        window.close();
    }
}

/**
 * 初始化UUID
 */
function initUUID() {
    $.ajax({
        type:"GET",
        url:baseUrl+"oa/content/contentChild/getGuuid?time="+Math.random(),
        dataType:"json",
        success: function(resultValue, textStatus) {
            var uuid = resultValue.result;
            $('#id').val(uuid);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $.xljUtils.tip("red","服务异常,请联系管理员！");
        }
    });
}

/**
 * 获取问卷列表
 */
function serveyCategoryQueryList(parentId,name) {
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: baseUrl + "oa/servey/serveyCategory/queryList?time=" + Math.random(),
        data: JSON.stringify({'parentId':parentId,'name':name}),
        dataType: "json",
        success: function (result) {
            
        }
    });
}

function emptyDateObject(dateIdText,id){
	$("#"+dateIdText).val("");
	$("#"+id).val("");
}