/**
 * erp_cloud_platform portal_edit Created by dingguanghuai on 2017/3/23.
 * @author dingguanghuai
 * @date 2017/3/23
 * @desc portal门户编辑页面，新增和修改共用
 */
$(function () {
    /**
     * 初始化form数据
     */
    function initFormData() {
        //获取url中的参数portalPageId
        var urlParam = $.xljUtils.getUrlParams();
        var act;
        var portalPageId;
        if(urlParam){
            act = urlParam.act;
            portalPageId = urlParam.portalPageId;
        }

        if(act&&act=='create'){
        	$('title').text("门户-新增");
            $("#editTitle").text('新增');
            $("#portalPageForm").attr('action',baseUrl+'oa/portal/portalPage/save');
            $("#portalPageForm").attr('method','POST');
	       	 //初始化UUID
	            $.ajax({
	                type:"GET",
	                url:baseUrl+"oa/content/contentChild/getGuuid?_t="+new Date().getTime(),
	                dataType:"json",
	                success: function(resultValue, textStatus) {
	                     var uuid = resultValue.result;
	                     $('#componentId').val(uuid);
	              		//上传图片初始化
	                  	//$('.attachment-container').xljAttachment({appId:'1',businessId:uuid,categoryId:'1',mode:'add',singleUpload:true});
	                },
	              	 error: function(XMLHttpRequest, textStatus, errorThrown) {
	              		 $.xljUtils.tip("red","服务异常,请联系管理员！");
	                  }
	            });
        }else if(act&&act=='update'){
        	$('title').text("门户-修改");
            $("#editTitle").text('修改');

            $.ajax({
                url:baseUrl+'oa/portal/portalPage/get/'+portalPageId+'?time='+Math.random(),
                type:'GET',
                success:function (resultData) {
                    if(resultData&&resultData.success) {
                        var portal = resultData.result;
                        for(var item in portal) {
                            if($("#portalPageForm :input[name='"+item+"']").length>0){
                                $("#portalPageForm :input[name='"+item+"']").val(portal[item]);
                            }
                        }
                      //上传图片初始化
                    	//$('.attachment-container').xljAttachment({appId:'1',businessId:portalPageId,categoryId:'1',mode:'edit',singleUpload:true});
                        $("#portalPageForm").attr('action',baseUrl+'oa/portal/portalPage/update/'+portal['id']);
                        $("#portalPageForm").attr('method','PUT');
                    }
                }
            });
        }else if(act&&act=='copy'){
        	$('title').text("门户-复制");
            $("#editTitle").text('复制');

            $.ajax({
                url:baseUrl+'oa/portal/portalPage/get/'+portalPageId+'?time='+Math.random(),
                type:'GET',
                success:function (resultData) {
                    if(resultData&&resultData.success) {
                        var portal = resultData.result;
                        for(var item in portal) {
                            if($("#portalPageForm :input[name='"+item+"']").length>0){
                                $("#portalPageForm :input[name='"+item+"']").val(portal[item]);
                            }
                        } 
                        //将id置为空
                    	 //初始化UUID
        	            $.ajax({
        	                type:"GET",
        	                url:baseUrl+"oa/content/contentChild/getGuuid",
        	                dataType:"json",
        	                success: function(resultValue, textStatus) {
        	                     var uuid = resultValue.result;
        	                     $("#portalPageForm input[name='id']").val(uuid);
        	              		//复制的上传图片初始化
        	                  	///$('.attachment-container').xljAttachment({appId:'1',businessId:uuid,categoryId:'1',mode:'add',singleUpload:true});
        	                },
        	              	 error: function(XMLHttpRequest, textStatus, errorThrown) {
                                 $.xljUtils.tip("red","服务异常,请联系管理员！");
        	                  }
        	            });
                       
                        $("#portalPageForm").attr('action',baseUrl+'oa/portal/portalPage/copy/'+portal['id']);
                        $("#portalPageForm").attr('method','PUT');
                    }
                }
            });
        }
    }

    //初始化form数据
    initFormData();

    //保存方法
    $('#saveBtn').on('click',function () {
        var portalPageId = $('#componentId').val();
        $('#portalPageForm').attr('data-callback','closeWindow(true,"'+portalPageId+'")');
        //上传图片提交
        $('#portalPageForm').submit();
 /*       $('.attachment-container').xljAttachmentSubmit(function(isSuccess, obj){
    		if (isSuccess) {
    					//保留数字前面有0
    				  $('#portalPageCode').val($('#portalPageCode').val()+" ");
    				  //表单提交
    		} else {
    			$.xljUtils.getError(obj);
    			return;
    		}
    	});*/
        
    });

    //保存并新增
    $('#saveAndCreateBtn').on('click',function () {
        var portalPageId = $('#componentId').val();
        $('#portalPageForm').attr('data-callback','closeWindow(false,"'+portalPageId+'")');
        //上传图片提交
        $('#portalPageForm').submit();
/*        $('.attachment-container').xljAttachmentSubmit(function(isSuccess, obj){
    		if (isSuccess) {
    				  //表单提交
    		} else {
    			$.xljUtils.getError(obj);
    			return;
    		}
    	});*/
       
    });

    //关闭编辑窗口
    $('#closeWindowBtn').on('click',function () {
        window.close();
    });
});

/**
 * form表单提交回调函数
 */
function closeWindow(isSave,portalPageId,xhr) {
    if(xhr) {
        var successFlag = xhr.success;
        if(successFlag) {
            var result = xhr.result;
            var act = $.xljUtils.getUrlParam('act')
            if (act&&(act=='copy' || act == 'create')) {
                // $.xljUtils.setJqGridAddedRowId($('#portalList', window.opener.document), $("#portalPageForm input[name='id']").val());
                window.opener.setJqGridAddedRowId($("#portalPageForm input[name='id']").val());
            }
            //刷新父页面
            window.opener.reloadGrid(portalPageId);
            if(isSave) {
                window.close();
            }else{
                window.location.href = "portal_edit.html?act=create";
            }
        }else{
        	switch (xhr.code) {
			case "50000":
				$.xljUtils.tip("red",xhr.msg);
				break;
			case "50001":
                $.xljUtils.tip("red",xhr.msg);
				break;
			case "50002":
                $.xljUtils.tip("blue",xhr.msg);
				break;
			case "50003":
                $.xljUtils.tip("red",xhr.msg);
				break;

			default:
                $.xljUtils.tip("red","服务异常,请联系管理员！");
				break;
			}
        }
    }
}