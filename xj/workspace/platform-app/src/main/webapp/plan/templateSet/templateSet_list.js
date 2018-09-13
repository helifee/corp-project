/**
 * author:zhangfangzhi
 * date:20170323
 */
var zTreeObj;
var jqGrid;
var jqGrid2;
var type=null;
var rowData;
var rowDataBefore;
$(function(){
	//计算高度
	function resizeHeight(){
		//左侧  头部底部为60px  title类 为50px
		var w_h = $(window).height();
		$(".slide-left .ztree-box").height((w_h-152)+"px");
	}
	resizeHeight();
	$(window).resize(function() {
		resizeHeight();
	});
	//初始化表格
	initJqGrid();
	initJqGrid2('-2');
	
	$("#listButton").hide();
	
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
	//禁用所有按钮的默认行为
//    $('.btn').click(function() {
//        return false;
//    });
    
    //所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
	            case 403:
	                pop_tip_open("red","系统拒绝。");
	                break;
	            case 404:
	                pop_tip_open("red","您访问的资源不存在。");
	                break;
	            case 500:
	                pop_tip_open("red","服务器异常。");
	                break;
            }
        }
    );
    getScale();
    getCategroy();
    loadControlSet();
});

/**
 * 初始化模板列表
 */
function initJqGrid(){
	jqGrid = jQuery("#list").jqGrid(
        {
        	url: baseUrl+"/pl/plTemplate/queryList",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{},
            datatype : "json", 
            autowidth:true,
            rownumbers: true,
            jsonReader : {
            	root:"result"
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {
                 	label: '模板名称',
                     name: 'name',
                     width: 100,
                     editable: false,
                     cellattr: addCellAttr
                 },
                 {
                 	 label: '模板状态',
                     name: 'status',
                     width: 75,
                     editable: false,
                     formatter:function(value){
                      	if(value=="1"){
    						return "发布";
    					}else if(value=="0"){
    						return "暂存";
    					}else{
    						return "";
    					}
                     }
                 },
                 {
                 	 label: '启用状态',
                     name: 'openStatus',
                     width: 75,
                     editable: false,
                     formatter:function(value){
                      	if(value=="1"){
    						return "启用";
    					}else if(value=="0"){
    						return "禁用";
    					}else{
    						return "";
    					}
                     },
                     cellattr: addCellAttr
                 }
//                 ,
//                 {
// 					 label : '模板描述',
//                     name: 'description',
//                     width: 75,
//                     editable: false
//                 }
             ],
            viewrecords : true,
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	$('#list').setSelection(rowDataBefore.id,true);
                	$('#list '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
            },
            onCellSelect: function(){
            	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
            },
            onSelectRow: function () {
            	var rowId=$('#list').jqGrid("getGridParam","selrow");
            	rowData = $('#list').jqGrid('getRowData',rowId);
            	$("#listButton").show();
    			$("#list2").jqGrid('setGridParam',{postData:{'templateId':rowId}}).trigger('reloadGrid'); 
            },
            rowNum : -1
        });
}

/**
 * 改变行字段颜色
 */
function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.openStatus=="0"){
        return "style='color:red'";
    }
}

/**
 * 初始化模板项列表
 */
function initJqGrid2(templateId){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: baseUrl+"/pl/plTemplateItem/queryList",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"templateId":templateId},
            datatype : "json", 
            autowidth:true,
            rownumbers: true,
            jsonReader : {
            	root:"result"
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {
                 	label: '级别',
                     name: 'categoryName',
                     width: 75,
                     editable: false
                 },
                 {
                 	 label: '阶段',
                     name: 'scaleName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '业务事项',
                     name: 'businessName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '星级考核',
                     name: 'starName',
                     width: 75,
                     editable: false
                 }
             ],
            viewrecords : true,
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            rowNum : -1
        });
}

/**
 * 模板添加
 */
function addTemplate(oper){
	cleanStyle();
	type=oper;
	//重置表单
	$('#templateForm')[0].reset();
	$("#description").html("");
	$("#templateForm").find("input[name='id']").val("");
	$(".modal-title").html("模板-新增");
    $("#templateForm").attr('action',baseUrl+'/pl/plTemplate/save');
    $("#templateForm").attr('method','POST');
    
	$('#myModal').modal('show');
}

/**
 * 模板修改
 */
function editTemplate(oper){
	cleanStyle();
	type=oper;
	var rowId=$('#list').jqGrid("getGridParam","selrow");
	if(rowId){
		$(".modal-title").html("模板-修改");
        $.ajax({
            url:baseUrl+'/pl/plTemplate/get/'+rowId+'?time='+Math.random(),
            type:'GET',
            success:function (resultData) {
                if(resultData&&resultData.success) {
                    var result = resultData.result;
                    for(var item in result) {
                        if($("#templateForm :input[name='"+item+"']").length>0){
                            $("#templateForm :input[name='"+item+"']").val(result[item]);
                        }
                    }
                    $("#templateForm").attr('action',baseUrl+'/pl/plTemplate/update/'+result['id']);
                    $("#templateForm").attr('method','PUT');
                    $('#myModal').modal('show');
                }
            }
        });
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}

/**
 * 模板发布
 */
function publishTemplate(){
	var id=$('#list').jqGrid('getGridParam','selrow');
	if(id) {
		pop_text_open("blue","确认发布么？",function(){
			$.ajax({
			   url: hostUrl+"/pl/plTemplate/update/"+id,
		       data:JSON.stringify({'status':'1'}),
		       type:'PUT',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		           if(resultData) {
		               var successFlag = resultData.success;
		               if(successFlag) {
		            	   jQuery("#list").trigger("reloadGrid");
		               }else {
		                   pop_tip_open("red","发布失败！");
		               }
		           }
		       }
		   });
		},true);
	}else{
		pop_tip_open("blue","请选择模板！");
	}
}

/**
 * 启用禁用
 */
function enableOrNot(st){
	var id=$('#list').jqGrid('getGridParam','selrow');
	
	if(id!=null && id!=""){
		var rowData = $("#list").jqGrid('getRowData',id);
		var status=rowData.openStatus;
		if(status=="启用"){
			status="1";
		}else{
			status="0";
		}
		if(status!=st){
			$.ajax({
		       url:hostUrl+"/pl/plTemplate/enableOrNot",
		       data:JSON.stringify({'id':id,'openStatus':st}),
		       type:'POST',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		           if(resultData) {
		               var successFlag = resultData.success;
		               var result = resultData.result;
		               var msg = resultData.msg;
		               if(successFlag) {
		            	   //刷新表格
		            	   jQuery("#list").trigger("reloadGrid");
		               }else {
		                   pop_tip_open("red","状态更新失败！");
		               }
		           }
		       }
			});
		}
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}

/**
 * 模板保存
 * @param op
 */
function saveForm(op){
	$('#'+op).attr('data-callback','formCallBack(true)');
    $('#'+op).submit();
}

/**
 * 模板保存
 * @param op
 */
function saveItemForm(op){
	$('#'+op).attr('data-callback','formItemCallBack(true)');
    $('#'+op).submit();
}

/**
 * 清除样式
 */
function cleanStyle(){
    $("#templateForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
    $("#templateItemForm").find("input[name='businessName']").parent().removeClass("has-error has-feedback");
    $("#templateItemForm").find("input[name='categoryId']").parent().removeClass("has-error has-feedback");
    $("#templateItemForm").find("input[name='scaleId']").parent().removeClass("has-error has-feedback");
}

/**
 * form表单提交回调函数
 */
function formCallBack(isSave,resultJsonData) {
    if(resultJsonData) {
        var successFlag = resultJsonData.success;
        var msg = resultJsonData.msg;
        var result = resultJsonData.result;
        if(successFlag) {
        	jQuery("#list").trigger("reloadGrid");
        	$('#myModal').modal('hide');
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}

/**
 * form表单提交回调函数
 */
function formItemCallBack(isSave,resultJsonData) {
    if(resultJsonData) {
        var successFlag = resultJsonData.success;
        var msg = resultJsonData.msg;
        var result = resultJsonData.result;
        if(successFlag) {
        	jQuery("#list2").trigger("reloadGrid");
        	$('#templateItemModal').modal('hide');
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}

/**
 * 模板子项添加
 */
function templateItemAdd(){
	cleanStyle();
	//重置表单
	$('#templateItemForm')[0].reset();
	$("#templateItemForm").find("input[name='id']").val("");
	var rowId=$('#list').jqGrid("getGridParam","selrow");
	$("#templateItemForm").find("input[name='templateId']").val(rowId);
	$(".modal-item-title").html("模板子项-新增");
    $("#templateItemForm").attr('action',baseUrl+'/pl/plTemplateItem/save');
    $("#templateItemForm").attr('method','POST');
    
	$('#templateItemModal').modal('show');
}

/**
 * 模板子项修改
 */
function templateItemEdit(){
	cleanStyle();
	var rowId=$('#list2').jqGrid("getGridParam","selrow");
	if(rowId){
		$(".modal-item-title").html("模板子项-修改");
        $.ajax({
            url:baseUrl+'/pl/plTemplateItem/get/'+rowId+'?time='+Math.random(),
            type:'GET',
            success:function (resultData) {
                if(resultData&&resultData.success) {
                    var result = resultData.result;
                    for(var item in result) {
                        if($("#templateItemForm :input[name='"+item+"']").length>0){
                            $("#templateItemForm :input[name='"+item+"']").val(result[item]);
                        }
                    }
                    $("#templateItemForm").attr('action',baseUrl+'/pl/plTemplateItem/update/'+result['id']);
                    $("#templateItemForm").attr('method','PUT');
                    $('#templateItemModal').modal('show');
                }
            }
        });
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}

/**
 * 模板子项删除
 */
function templateItemDel(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id) {
		pop_text_open("blue","确认删除吗？",function(){
			$.ajax({
				url:baseUrl+"/pl/plTemplateItem/deletePseudo/"+id,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData && resultData.success) {
						jQuery("#list2").trigger("reloadGrid");
					}else{
						pop_tip_open("red","删除数据失败！");
					}
				}
			});
		},true);
	}else{
		pop_tip_open("blue","请选择要删除的行！");
	}
}

/**
 * 引入预置模板
 */
function includePreTemplate(){
	var id=$('#list').jqGrid('getGridParam','selrow');
	var row=$('#list').jqGrid('getRowData',id);
	if(row){
		if(row.status!='发布'){
			if(id) {
				pop_text_open("blue","引入预置模板将会删除当前暂存版所有业务事项，是否继续引入？",function(){
					$.ajax({
					   url: hostUrl+"/pl/plTemplate/includeDefaultTemplate",
				       data:JSON.stringify({'id':id}),
				       type:'POST',
				       contentType:'application/json',
				       dataType:'JSON',
				       success:function (resultData) {
				           if(resultData) {
				               var successFlag = resultData.success;
				               if(successFlag) {
				            	   jQuery("#list2").trigger("reloadGrid");
				               }else {
				                   pop_tip_open("red","数据保存失败！");
				               }
				           }
				       }
				   });
				},true);
			}
		}else{
			pop_tip_open("blue","该模板已发布不能引入！");
		}
	}else{
		pop_tip_open("blue","请选择模板！");
	}
}

/**
 * 模板管控控制设置
 */
function saveControl() {
	var v = $('input[name=control]:checked').val();
    $.ajax({
		   url: hostUrl+"/pl/plSysConfig/update/49f8c0c4831148bc93492b62365c08b3",
	       data:JSON.stringify({'isGroupControl':v}),
	       type:'PUT',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               if(successFlag) {
	            	   pop_tip_open("blue","操作成功！");
	               }else {
	                   pop_tip_open("red","发布失败！");
	               }
	           }
	       }
	   });
}

/**
 * 模板管控控制查询
 */
function loadControlSet(){
	$.ajax({
        url:baseUrl+'/pl/plSysConfig/get/49f8c0c4831148bc93492b62365c08b3?time='+Math.random(),
        type:'GET',
        success:function (resultData) {
            if(resultData&&resultData.success) {
                var result = resultData.result;
                if(result.isGroupControl=="1"){
                	$("input[name='control']").get(0).checked = true;
                }else{
                	$("input[name='control']").get(1).checked = true;
                }
            }
        }
    });
}

/**
 * 阶段下拉
 */
function  getScale(){
	  $.ajax({
        type:'POST',
        url:hostUrl+'pl/plProjectScale/queryList',
        dataType:'json',
        data:JSON.stringify({'type':'0'}),
        contentType:'application/json',
        async:true,
        success: function(json) {
      	  	if(json.success){
      	  		data=json.result;
      	  		var bodyData = {};
      	  		for (var o in data){
      	  			$("#scaleId").append("<option value='"+data[o].id+"'>"+data[o].scaleName+"</option>")  
      	  		}
      	  	}else{
      	  		pop_tip_open("red",data.msg);
      	  	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
      }
    });
}

/**
 * 阶段下拉
 */
function  getCategroy(){
	  $.ajax({
        type:'POST',
        url:hostUrl+'pl/plProjectCategory/queryList',
        dataType:'json',
        data:JSON.stringify({'category':'1'}),
        contentType:'application/json',
        async:true,
        success: function(json) {
      	  	if(json.success){
      	  		data=json.result;
      	  		var bodyData = {};
      	  		for (var o in data){
      	  			$("#categoryId").append("<option value='"+data[o].id+"'>"+data[o].categoryName+"</option>")  
      	  		}
      	  	}else{
      	  		pop_tip_open("red",data.msg);
      	  	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
      }
    });
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$("#templateForm").validate().resetForm(); //清除验证
	$("#templateItemForm").validate().resetForm(); //清除验证
	$('#'+modal).modal('hide');
}
