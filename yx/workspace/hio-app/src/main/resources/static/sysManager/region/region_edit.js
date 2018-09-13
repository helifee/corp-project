var type=$.xljUtils.getUrlParam('type');
var parentId=$.xljUtils.getUrlParam('parentId');
var selectId="";
$(function () {
	pageInit();
	  if(type=="add"){
		  $("#payTypeTitle").html("省市区-新增");
		   document.title="省市区-新增";
		   selectId="selectId"
	  }else{
		  $("#payTypeTitle").html("省市区-修改");
		   document.title="省市区-修改";
		   selectId=parentId;
	  }
	  $("#saveBtn").on('click',function(){
		  $("#payTypeForm").attr("data-validate-success","saveForm('over')");
		  $("#payTypeForm").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#payTypeForm").attr("data-validate-success","saveForm('continue')");
		  $("#payTypeForm").submit();
	  });
	   
	   
	  
		$('#parentName,#selectRetionName').on('click', function() {
			if(type=="add"){
			
			
			var urlBody = "sys/base/baseRegion/getSelectTree";
			var urlAll = serviceUrl + urlBody;
			var dataPost = {
				menuDelFlag : "0",
				menuStatus : "1",
				selectId:selectId
			}
			$(document.body).data($(this).attr('id'), '');
			$(this).xljSingleSelector({
				title : '选择上级区域',//选择器标题，默认是'选择组织机构'
				selectorType : 'selectTypeRegion',//选择器类型，默认是组织机构选择器
				immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
				treeUrl : urlAll,
				treeParam : dataPost,//生成zTree树的参数
				targetId : 'parentId',//选择的数据的ID存储input域
				targetName : 'parentName',//选择的数据的Name存储input域
				ajaxType : 'POST', //ajax的type 默认为post
				formatTreeJson : function(data) {
					return data;
				},
				treeSettings : {
					data : {
						simpleData : {
							enable : true,
							idKey : 'id',
							pIdKey : 'parentId'
						}
					}
				}
			});
		}else{
			pop_tip_open("blue","上级区域不允许修改");
		}	
		});
	  
    });
function pageInit(){
	if(type=="add"){
		getuuid();
		if(parentId){
		    $("#parentId").val(parentId);
			$("#parentName").val(window.opener.gerParentName());
		}
	}else{
		var id=$.xljUtils.getUrlParam('id'); 
		getPayTypeData(id);
	
	}
}


/**
 * author:liuf
 * describe:新增 获得UUID
 * param: null
 */
function getuuid(){
	$.ajax({
        type:'get',
        url:serviceUrl+"sys/uuid/generator/getGuuid?time="+Math.random(),
        success: function(data) {
        	if(data.success){
        		var guuid=data.result;
        		$("#payTypeForm").find("input[name='id']").val(guuid);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	})
}
/**
 * author:liuf
 * describe:修改 回显数据
 * param: null
 */
function getPayTypeData(id){
	$.ajax({
        type:'get',
        url:serviceUrl+"sys/base/baseRegion/get/"+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var  regionData=data.result;
        		$("input[name='parentId']").val(regionData.parentId);
        		$("input[name='parentName']").val(regionData.parentName);
        		$("input[name='id']").val(regionData.id);
        		$("input[name='name']").val(regionData.name);
        		$("input[name='code']").val(regionData.code);
        		$("input[name='concurrencyVersion']").val(regionData.concurrencyVersion);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },
	        complete:function(){
	        }
	});
}
/**
 * author:liuf
 * describe:保存数据
 * param: null
 */
function saveForm(op){
	var regionArr= $("#payTypeForm").serializeArray();
	var regionDto={};
		for(var i in regionArr){
			regionDto[regionArr[i].name]=regionArr[i].value;
		}
		regionDto.delflag=0;
		if(type=="add"){
			$.ajax({
				url:serviceUrl+"sys/base/baseRegion/save",
				data:JSON.stringify(regionDto),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							if(op=="over"){
								if(regionDto.parentId){
									window.opener.reloadGrid(regionDto.parentId);
								}else{
									window.opener.reloadGrid(regionDto.id);
								}
								window.close();
							}else if(op=="continue"){
								pop_tip_open("green","保存成功");
								$("#payTypeForm")[0].reset();
								if(regionDto.parentId){
									$("#parentId").val(parentId);
									$("#parentName").val(window.opener.gerParentName());
									window.opener.reloadGrid(regionDto.parentId);
								}else{
									window.opener.reloadGrid(regionDto.id);
								}
								getuuid();
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
			var ids=regionDto.id;
			   $.ajax({
			       url:serviceUrl+"sys/base/baseRegion/update/"+ids,
			       data:JSON.stringify(regionDto),
			       type:'put',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               if(resultData.success) {
			            		if(op=="over"){
			            			if(regionDto.parentId){
										window.opener.reloadGrid(regionDto.parentId);
									}else{
										window.opener.reloadGrid(regionDto.id);
									}
									window.close();
								}else if(op=="continue"){
									if(regionDto.parentId){
										window.opener.reloadGrid(regionDto.parentId);
									}else{
										window.opener.reloadGrid(regionDto.id);
									}
									pop_tip_open("green","保存成功");
									$("#payTypeForm")[0].reset();
									getuuid();
									type="add";
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
 * author:liuf
 * describe:关闭页面
 * param: null
 */

function closed(){
	 window.close();
}

function empty(obj){
	if(type=="add"){
		$(obj).prev().val("");
		$(obj).prev().prev().val("");
	}else{
		pop_tip_open("blue","上级区域不允许删除");
	}
}

