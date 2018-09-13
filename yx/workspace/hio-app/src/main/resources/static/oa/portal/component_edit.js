/**
 * erp_cloud_platform component_edit Created by dingguanghuai on 2017/3/27.
 * @author dingguanghuai
 * @date 2017/3/27
 */
var urlParam = $.xljUtils.getUrlParams();
var act;
var componentId;
if (urlParam) {
	act = urlParam.act;
	componentId = urlParam.componentId;
}
$(function () {
    $('#addCategory').css({cursor: 'pointer'});
    //初始化类别列表
    initCategory();

    /**
     * 初始化form数据
     */
    function initFormData() {
        //获取url中的参数portalPageId

        if (act && act == 'create') {
            $('title').text("组件-新增");
            $("#editTitle").text('新增');
        
       /*     $("#componentForm").attr('action', serviceUrl + 'portal/component/save');
            $("#componentForm").attr('method', 'POST');*/
            //初始化UUID
            $.ajax({
                type: "GET",
                url: serviceUrl + "oa/content/contentChild/getGuuid?_t="+new Date().getTime(),
                dataType: "json",
                success: function (resultValue, textStatus) {
                    var uuid = resultValue.result;
                    $('#componentId').val(uuid);
                    //上传图片初始化
                    $('.attachment-container').xljAttachment({
                        appId: '1',
                        businessId: uuid,
                        categoryId: '1',
                        mode: 'add',
                        singleUpload: true
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });

        } else if (act && act == 'update') {
            $('title').text("组件-修改");
            $("#editTitle").text('修改');

            $.ajax({

                url: serviceUrl + 'sys/portal/component/get/' + componentId + '?_t=' + new Date().getTime(),

                type: 'GET',
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        var component = resultData.result;
                        console.log(component);
                        for (var item in component) {
                            if (item == 'displayDelete' || item == 'displayRefresh' || item == 'displayMove') {
                                if ($("#componentForm :input[name='" + item + "']").length > 0) {
                                    $("#componentForm :input[name='" + item + "']")[0].checked = component[item];
                                }
                            } else if(item == 'titleIcon'){
                                if(component[item]){
           	    		    	 document.getElementById('newImg').setAttribute('src',"data:image/jpeg;base64,"+component[item]);
           	    		    	 document.getElementById('newImg').setAttribute('width',"80px");
           	    		    	 document.getElementById('newImg').setAttribute('hight',"80px");
           	    		     }
                            }else{
                                if ($("#componentForm :input[name='" + item + "']").length > 0) {
                                    $("#componentForm :input[name='" + item + "']").val(component[item]);
                                }
                            }
                            if (item == 'categoryId'&&component[item]) {
                                $('#categoryId option[value="' + component[item] + '"]')[0].selected = true;
                            }
                           

                        }
                    }
                }
            });
        }
    }

    //初始化form数据
    initFormData();

    //保存方法
    $('#saveBtn').on('click', function () {
    	$("#componentForm").attr("data-validate-success","saveForm('over')");
		$("#componentForm").submit();
    	
    /*    var componentId = $('#componentId').val();*/
    });

    //保存并新增
    $('#saveAndCreateBtn').on('click', function () {
    	$("#componentForm").attr("data-validate-success","saveForm('continue')");
		$("#componentForm").submit();

    });

    //关闭编辑窗口
    $('#closeWindowBtn').on('click', function () {
        //$(window.opener.document.getElementById("componentList")).jqGrid('setGridParam', {postData: {delflag: false}}).trigger('reloadGrid');
        window.close();
    });

    //分类表单提交
    $("#saveCategoryBtn").on('click', function () {

        $("#categoryForm").attr('action', serviceUrl + 'sys/portal/componentCategory/save');

        $("#categoryForm").submit();
    });

    //分类表单弹出层关闭
    $('#categoryModal').on('hide.bs.modal', function () {
        document.getElementById("categoryForm").reset();
    });
});

function newFile() {
    var windowURL = window.URL || window.webkitURL;
    var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
    document.getElementById('newImg').setAttribute('src',loadImg);
    document.getElementById('newImg').setAttribute('width',"80px");
    document.getElementById('newImg').setAttribute('hight',"80px");
}  
function saveForm(op){
	var componentId=$("#componentId").val();
	if(act=="create"){
		   $.ajax({
		       url:serviceUrl + 'sys/portal/component/save',
		       data:new FormData($( "#componentForm" )[0]),  
		       type:'POST',
			   	processData:false,
				contentType:false,
		       success:function (resultData) {
		           if(resultData) {
		               if( resultData.success) {
		                   if(op=="over"){
		                	   closeWindow(true,componentId,resultData);
		                   }else if(op=="continue"){
		                	   closeWindow(false,componentId,resultData);
		                   }
		               }else {
		            		pop_tip_open("red",resultData.msg);
		               }
		           }
		       },
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
		   });
	}else{
		   $.ajax({
		       url:serviceUrl + 'sys/portal/component/update',
		       data:new FormData($( "#componentForm" )[0]),  
		       type:'POST',
			   	processData:false,
				contentType:false,
		       success:function (resultData) {
		           if(resultData) {
		        	    if( resultData.success) {
			                   if(op=="over"){
			                	   closeWindow(true,componentId,resultData);
			                   }else if(op=="continue"){
			                	   closeWindow(false,componentId,resultData);
			                   }
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

}

/**
 * 初始化分类列表
 */
function initCategory() {
    //获取分类列表
    $.ajax({

        url: serviceUrl + "sys/portal/componentCategory/queryList",

        data: JSON.stringify({}),
        type: 'POST',
        async: false,
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (resultData) {
            if (resultData && resultData.success) {
                var result = resultData.result;
                if ($.isArray(result)) {
                    $.each(result, function () {
                        $("#categoryId").append("<option value='" + this.id + "'>" + this.categoryName + "</option>");
                    });
                }

            } else {
                $.xljUtils.tip('red', '获取分类列表失败！');
            }
        }
    });
}

/**
 * form表单提交回调函数
 */
function closeWindow(isSave,componentId, xhr) {
    if (xhr) {
        var successFlag = xhr.success;
        if (successFlag) {
            var result = xhr.result;
            var act = $.xljUtils.getUrlParam('act');
            if (act && act == 'create') {
                window.opener.setJqGridAddedRowId(componentId);
            }
            //刷新父页面
            window.opener.reloadGrid(componentId);
            if (isSave) {
                window.close();
            } else {
                window.location.href = "component_edit.html?act=create";
            }
        } else {
            //异常处理
            switch (xhr.code) {
                case "50000":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50001":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50002":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                default:
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    break;
            }
        }
    }
}

/**
 * 保存组件分类回调函数
 * @param xhr 执行保存后返回的json数据
 */
function closeCategoryModal(xhr) {
    if (xhr) {
        var successFlag = xhr.success;
        if (successFlag) {
            $.xljUtils.tip('green', '数据保存成功！');
            var result = xhr.result;
            $("#categoryId").append("<option value='" + result.id + "'>" + result.categoryName + "</option>");
            document.getElementById("categoryForm").reset();
            $('#categoryModal').modal('hide')
        } else {
            switch (xhr.code) {
                case "50000":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50001":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50002":
                    $.xljUtils.tip("blue", xhr.msg);
                    break;
                case "50003":
                    $.xljUtils.tip("red", xhr.msg);
                    break;

                default:
                    $.xljUtils.tip('red', '数据保存失败！');
                    break;
            }


        }
    }
}
