var type= $.xljUtils.getUrlParam('type');
$(function () {
	pageInit();
	  $('.form_datetime').datetimepicker({
	        language:  'zh-CN',
	        format: 'yyyy-mm-dd hh:ii',
	        weekStart: 1,
	        todayBtn:  1,
	        autoclose: 1,
	        todayHighlight: 1,
	        startView: 2,
	        forceParse: 0,
	        showMeridian: 1
	    });
		$('#appName,#selectAppName').on('click', function() {
			var urlBody = "sys/party/integrateApp/getAppTree";
			var urlAll = serviceUrl + urlBody;
			var dataPost = {
				menuDelFlag : "0",
				menuStatus : "1"
			}
			$(document.body).data($(this).attr('id'), '');
			$(this).xljSingleSelector({
				title : '选择应用名称',//选择器标题，默认是'选择组织机构'
				selectorType : 'integrateApp',//选择器类型，默认是组织机构选择器
				immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
				treeUrl : urlAll,
				treeParam : dataPost,//生成zTree树的参数
				targetId : 'appId',//选择的数据的ID存储input域
				targetName : 'appName',//选择的数据的Name存储input域
				ajaxType : 'POST', //ajax的type 默认为post
				saveCallback:function(){
					$("#userConfigForm").find("input[name='appName']").focus();
				},
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
		});
	if(type=="add"){
		$("#userConfigTitle").html("用户配置-新增");
		document.title="用户配置-新增";
		$("#realNames").hide();
	}else if(type=="edit"){
		$("#userConfigTitle").html("用户配置-修改");
		document.title="用户配置-修改";
		$("#realNamediv").hide();
	}else if(type=="editList"){
		$("#userConfigTitle").html("用户配置-批量修改");
		document.title="用户配置-批量修改";
		$("#multipleSeleteUser").hide();
	}
	$("#saveBtn").on('click',function(){
		$("#userConfigForm").submit();
	});
	
    });

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit(){
	if(type=="add"){
		 var uuid=getuuid();
		$("#userConfigId").val(uuid);
	}else if(type=="edit"){
		var id = $.xljUtils.getUrlParam('id');
		getUserConfigData(id)
	}
}
/**
 * author:liuf
 * describe:获取uuid
 * param: null
 */
function getuuid(){
	$.ajax({
		beforeSend:function(){
			var guuid="";
		},
        type:'get',
        async:false,
		url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	 guuid=data.result;
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
	return guuid;
}
/**
 * author:liuf
 * describe:编辑回显数据
 * param: null
 */
function getUserConfigData(id){
	   $.ajax({
	       url:serviceUrl+"sys/party/userConfig/getUserConfig/"+id+'?time='+Math.random(),
	       type:'get',
	       success: function(data) {
	    	   if(data.success){
	    		   var userConfigData=data.result;
	    		     $("input[name='id']").val(userConfigData[0].id);
	    		     $("#realNames").val(userConfigData[0].realName);
	    		     $("input[name='appName']").val(userConfigData[0].appName);
	    		     $("input[name='appId']").val(userConfigData[0].appId);
	    		     $("input[name='userId']").val(userConfigData[0].userId);
	    		     $("input[name='token']").val(userConfigData[0].token);
	    		     $("input[name='startTime']").val(userConfigData[0].startTime);
	    		     $("input[name='endTime']").val(userConfigData[0].endTime);
	    		     $("textarea[name='remark']").val(userConfigData[0].remark);
	    		     $("input[name='status'][value="+userConfigData[0].status+"]").attr("checked",true);//状态
	    		     $("input[name='concurrencyVersion']").val(userConfigData[0].concurrencyVersion);
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
 * author:liuf
 * describe:新增 修改数据
 * param: null
 */
function saveForm(){
	var userConfigArr= $("#userConfigForm").serializeArray();
	var userConfigDto={};
		for(var i in userConfigArr){
			if(userConfigArr[i].name=="startTime"||userConfigArr[i].name=="endTime"){
				userConfigDto[userConfigArr[i].name]=new Date(Date.parse(userConfigArr[i].value.replace(/-/g,  "/"))).getTime();
			}else{
				userConfigDto[userConfigArr[i].name]=userConfigArr[i].value;
			}
		}
		userConfigDto.delflag=0;
		userConfigDto.updateDate=new Date().getTime();
		delete userConfigDto.realName;
		delete userConfigDto.appName;
		if(type=="add"){
			var userConfigList=new Array();
			var user=userConfigDto.userId;
			var userList=user.split(",");
			for(var p in userList){
				var userConfig={};
				userConfig.id=getuuid();
				userConfig.delflag=userConfigDto.delflag;
				userConfig.createDate=new Date().getTime();
				userConfig.updateDate=userConfigDto.updateDate;
				userConfig.appId=userConfigDto.appId;
				userConfig.userId=userList[p];
				userConfig.startTime=userConfigDto.startTime;
				userConfig.endTime=userConfigDto.endTime;
				userConfig.status=userConfigDto.status;
				userConfig.remark=userConfigDto.remark;
				userConfigList.push(userConfig);
			}
			   $.ajax({
			       url:serviceUrl+"sys/party/userConfig/saveBatch",
			       data:JSON.stringify(userConfigList),
			       type:'POST',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			                	   window.opener.reloadGrid();
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
		}else if(type=='edit'){
			var userConfigId=$("#userConfigId").val();
			   $.ajax({
			       url:serviceUrl+"sys/party/userConfig/update/"+userConfigId,
			       data:JSON.stringify(userConfigDto),
			       type:'PUT',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			            		   window.opener.reloadGrid();
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
		}else if(type=="editList"){
			   $.ajax({
				   beforeSend:function(){
					   userConfigDto.id=getuuid();
				   },
			       url:serviceUrl+"sys/party/userConfig/updateBatch/",
			       data:JSON.stringify(userConfigDto),
			       type:'post',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			            		   window.opener.reloadGrid();
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

	
}
/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */
function closed(){
	 window.close();
}
