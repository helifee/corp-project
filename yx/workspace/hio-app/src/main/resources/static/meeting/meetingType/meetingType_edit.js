var type=$.xljUtils.getUrlParam('type');
var updateId=$.xljUtils.getUrlParam('id'); 
$(function () {
	/**
	 * 根据查询返回数据整理成zTree需要的JSON数据
	 * @param arr
	 * @returns
	 */
	function formatZTreeData(arr) {
		$.each(arr, function(index, value){
			value.iconSkin = 'diy-group';
		});
		
		return arr;
	};
	pageInit();
	  if(type=="add"){
		  $("#commonToolsTitle").html("会议类别-新增");
		   document.title="会议类型-新增";
		 /* $(".removetr").hide();*/
	  }else{
		  $("#commonToolsTitle").html("会议类型-修改");
		   document.title="会议类型-修改";
		   $("#saveAndCreateBtn").hide();
	/*	  $(".removetr").show();*/
	  }
	  $("#saveBtn").on('click',function(){
		  //saveForm('continue')
		  //saveForm('over')
		  
		  if($("#baseProjectType").valid()) {
			  $("#baseProjectType").attr("data-validate-success","saveForm('over')");
			  $("#baseProjectType").submit();
		  }
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#baseProjectType").attr("data-validate-success","saveForm('continue')");
		  $("#baseProjectType").submit();
	  });
	  
	  $('.category-selecter').xljSingleSelector({
			title:'选择会议类型',//选择器标题，默认是'选择组织机构'
			selectorType:'meeting',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
			treeUrl:serviceUrl + 'oa/meeting/meetingType/queryList?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
			treeParam:{},//生成zTree树的请求参数，json对象
			targetId:'parentId',//选择的数据的ID存储input域的id
			targetName:'parentName',//选择的数据的Name存储input域
			saveCallback:function (selectData,ele) {
				if (selectData != null) {
					$("input[name='parentName']").val(selectData.name);
					$("input[name='parentId']").val(selectData.id);
				}
				//如果选择自己，则给出提示，不能选择
				/*if(selectData.id==updateId){
					$.xljUtils.tip('blue',"父级不能选择自己，请重新选择！");
			    	return
				}
				if(selectData.parentId==updateId){
					$.xljUtils.tip('blue',"上级不能选择自己的下级，请重新选择！");
			    	return
				}*/
				//judgeChildIdByTargetId(updateId,selectData.id);
			},
			formatTreeJson:formatZTreeData,
			treeSettings:{data:{
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'parentId'
					}
				}
			}
		});
	  
	  //initTreeMeetingType();
    });

//打开新增页面，初始化会议的时候，把会议类别初始化成树结构
function initTreeMeetingType(){
	$('.category-selecter').unbind('click');
	$('.category-selecter').xljSingleSelector({
		title:'选择会议类型',//选择器标题，默认是'选择组织机构'
		selectorType:'meeting',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:serviceUrl + 'oa/meeting/meetingType/queryList?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
		targetId:'parentId',//选择的数据的ID存储input域的id
		targetName:'parentName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("input[name='parentName']").val(selectData.name);
				$("input[name='parentId']").val(selectData.id);
			}
			//如果选择自己，则给出提示，不能选择
			/*if(selectData.id==updateId){
				$.xljUtils.tip('blue',"父级不能选择自己，请重新选择！");
		    	return
			}*/
			/*if(selectData.parentId==updateId){
				$.xljUtils.tip('blue',"上级不能选择自己的下级，请重新选择！");
		    	return
			}*/
			//judgeChildIdByTargetId(updateId,selectData.id);
		},
		//formatTreeJson:formatZTreeData(selectData),
		treeSettings:{data:{
				simpleData: {
					enable: true,
					idKey: 'id',
					pIdKey: 'parentId'
				}
			}
		}
	});
}

function formatZTreeData(arr) {
	$.each(arr, function(index, value){
		value.iconSkin = 'diy-group';
	});
	
	return arr;
};

function judgeChildIdByTargetId(parentId,childId){
	var tar;
	var paramData;
    paramData = JSON.stringify({'parentId':parentId,'childId':childId});
		$.ajax({
			type:'post',
			url:serviceUrl+'oa/meeting/meetingType/judgeChildIdByTargetId'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:paramData,
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var meetingSummary=data.result;
						/*if(meetingSummary == '1'){
							$.xljUtils.tip('blue',"上级不能选择自己的下级，请重新选择！");
					    	return;
						}*/
						tar = meetingSummary;
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
		return tar;
}




function pageInit(){
	if(type=="add"){
		var rowData=window.opener.getParamsToAdd();
		var name=rowData.name;
		var parentsCode=rowData.parentsCode;
		var parentId=rowData.parentId;
	}else{
		var rowData=window.opener.getParamsToUpdate();
		var name=rowData.name;
		var parentsCode=rowData.parentsCode;
		var parentId=rowData.parentId;
	}
//	var name=decodeURI($.xljUtils.getUrlParam('name'))=="undefined"?"":decodeURI($.xljUtils.getUrlParam('name')); 
//	var parentsCode=decodeURI($.xljUtils.getUrlParam('parentsCode'))=="undefined"?"":decodeURI($.xljUtils.getUrlParam('parentsCode')); 
//	var parentId=$.xljUtils.getUrlParam('parentId');
	$("#parentName").val(name);
	//$("#parentCode").val(code);
	$("#parentIdLabel").val(parentsCode);
	if(parentId){
		$("#parentId").val(parentId);
	}
	if(type=="add"){
		getuuid();
	}else{
		var id=$.xljUtils.getUrlParam('id'); 
		getMeetingTypeData(id);
	}
}
/**
 * author:wangpw
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
        		$("#baseProjectType").find("input[name='id']").val(guuid);
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
 * author:wangpw
 * describe:修改 回显数据
 * param: null
 */
function getMeetingTypeData(id){
	$.ajax({
        type:'get',
        url:serviceUrl+"oa/meeting/meetingType/get/"+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var meetingType=data.result;
        		$("input[name='parentId']").val(meetingType.parentId);
        		$("input[name='id']").val(meetingType.id);
        		$("input[name='sort']").val(meetingType.sort);
        		$("input[name='name']").val(meetingType.name);
        		$("input[name='code']").val(meetingType.code);
        		$("input[name='flowInstanceCode']").val(meetingType.flowInstanceCode);
        		$("input[name='flowInstanceName']").val(meetingType.flowInstanceName);
        		$("input[name='hyjyFlowInstanceCode']").val(meetingType.hyjyFlowInstanceCode);
        		$("input[name='hyjyFlowInstanceName']").val(meetingType.hyjyFlowInstanceName);
        		$("input[name='status'][value="+meetingType.status+"]").attr("checked",true);//状态
				$('input[name="status"]').attr('disabled',true);
        		$("textarea[name='remarks']").val(meetingType.remarks);
        		$("input[name='createPersonId']").val(meetingType.createPersonId);
        		$("input[name='createPersonName']").val(meetingType.createPersonName);
        		$("input[name='createDate']").val(meetingType.createDate);
        		$("input[name='updatePersonId']").val(meetingType.updatePersonId);
        		$("input[name='updatePersonName']").val(meetingType.updatePersonName);
        		$("input[name='updateDate']").val(meetingType.updateDate);
        		$("input[name='disabledId']").val(meetingType.disabledId);
        		$("input[name='disabledDate']").val(meetingType.disabledDate);
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
 * author:wangpw
 * describe:保存数据
 * param: null
 */
function saveForm(op){
	if($("#parentId").val()==updateId){
		$.xljUtils.tip('blue',"父级不能选择自己，请重新选择！");
    	return
	}
	if((type == 'edit') && $("#parentId").val() != null && $("#parentId").val() != ""){
		var meetingSummaryNew = judgeChildIdByTargetId(updateId,$("#parentId").val());
		if(meetingSummaryNew == '1'){
			$.xljUtils.tip('blue',"上级不能选择自己的下级，请重新选择！");
			return;
		}
	}
	
	var meetingType= $("#baseProjectType").serializeArray();
	var meetingTypeDto={};
		for(var i in meetingType){
			if(meetingType[i].name=="disabledDate"||"createDate"==meetingType[i].name||"updateDate"==meetingType[i].name){
				meetingTypeDto[meetingType[i].name]=new Date().getTime();;
			}else{
				if(meetingType[i].name=="parentName"){
				}else{
					meetingTypeDto[meetingType[i].name]=meetingType[i].value;
				}
			}
		}
		meetingTypeDto.delflag=0;
		if(type=="add"){
			//判断该会议类别是否存在
			var repeatNumber = judgeRepeatObject(meetingTypeDto);
			if(repeatNumber != '0'){
				$.xljUtils.tip('blue',"类型和编码已存在，请重新填写！");
				return;
			}
			$.ajax({
				url:serviceUrl+"oa/meeting/meetingType/save",
				data:JSON.stringify(meetingTypeDto),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData) {
						//toastr.success('数据保存成功！');
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if(successFlag) {
							if(op=="over"){
								//window.opener.reloadGrid();
		            			//window.opener.location.href=window.opener.location.href;
								if(meetingTypeDto.parentId){
									window.opener.reloadGrid(meetingTypeDto.parentId);
								}else{
									window.opener.reloadGrid(meetingTypeDto.id);
								}
								window.close();
							}else if(op=="continue"){
								if(meetingTypeDto.parentId){
									window.opener.reloadGrid(meetingTypeDto.parentId);
								}else{
									window.opener.reloadGrid(meetingTypeDto.id);
								}
								//initTreeMeetingType();
								var name=$("#parentName").val();
								var parentId=$("#parentId").val();
								
								var flowInstanceCode=$("#flowInstanceCode").val();
								var flowInstanceName=$("#flowInstanceName").val();
								var hyjyFlowInstanceCode=$("#hyjyFlowInstanceCode").val();
								var hyjyFlowInstanceName=$("#hyjyFlowInstanceName").val();
								
								$("#baseProjectType")[0].reset();
								getuuid();
								$("#parentName").val(name);
								$("#flowInstanceCode").val('');
								$("#flowInstanceName").val('');
								$("#hyjyFlowInstanceCode").val('');
								$("#hyjyFlowInstanceName").val('');
								if(parentId){
									$("#parentId").val(parentId);
								}
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
			var ids=meetingTypeDto.id;
			   $.ajax({
			       url:serviceUrl+"/oa/meeting/meetingType/update/"+ids,
			       data:JSON.stringify(meetingTypeDto),
			       type:'put',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               if(resultData.success) {
			            		if(op=="over"){
			            			//window.opener.reloadGrid();
			            			if(meetingTypeDto.parentId){
										window.opener.reloadGrid(meetingTypeDto.parentId);
									}else{
										window.opener.reloadGrid(meetingTypeDto.id);
									}
									window.close();
								}else if(op=="continue"){
									if(meetingTypeDto.parentId){
										window.opener.reloadGrid(meetingTypeDto.parentId);
									}else{
										window.opener.reloadGrid(meetingTypeDto.id);
									}
									var name=$("#parentName").val();
									var parentId=$("#parentId").val();
									$("#baseProjectType")[0].reset();
									getuuid();
									$("#parentName").val(name);
									if(parentId){
										$("#parentId").val(parentId);
									}
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
 * 根据类型和编码判断会议类别是否存在
 * @param parentId
 * @param childId
 * @returns
 */
function judgeRepeatObject(meetingTypeDto){
	var tar;
		$.ajax({
			type:'post',
			url:serviceUrl+'oa/meeting/meetingType/judgeRepeatObject'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(meetingTypeDto),
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var meetingSummary=data.result;
						tar = meetingSummary;
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
		return tar;
}



/**
 * author:wangpw
 * describe:关闭页面
 * param: null
 */

function closed(){
	 window.close();
}


/**
 * 清空上级菜单
 */
function restParent(){
	/*$("#parentId").attr("value", "");
	$("#parentIdName").attr("value", "");*/
	$("#parentId").val("");
	$("#parentIdName").val("");
}
