var id= $.xljUtils.getUrlParam('id');
var taskpackageId="";
var recordSuccessStatus="";
$(function () {
	pageInit();
    });

/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit(){
		getTaskPackageBean(id);
	
}
function getTaskPackageBean(id){
	$.ajax({
        type:'get',
        url:hostUrl+'oa/taskPackage/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        		var resultData=data.result;
        		 $("input[name='id']").val(resultData.id);
        		 $("input[name='concurrencyVersion']").val(resultData.concurrencyVersion);
        		 $("input[name='title']").val(resultData.title);
        		 $("input[name='proposeUserId']").val(resultData.proposeUserId);
        		 $("input[name='proposeUser']").val(resultData.proposeUser);
        		 $("input[name='proposeDeptId']").val(resultData.proposeDeptId);
        		 $("input[name='proposeDept']").val(resultData.proposeDept);
        		 $("#proposeDept").val(resultData.proposeDept);
        		 $("input[name='createPersonId']").val(resultData.createPersonId);
        		 $("input[name='createPersonName']").val(resultData.createPersonName);
        		 $("#createPersonName").val(resultData.createPersonName);
        		 $("textarea[name='remark']").val(resultData.remark);
        		$('#uploadFileTaskPackage').xljAttachment({appId:'1',businessId:resultData.id,categoryId:'1',mode:'view',singleUpload:false,hideButtonsWithNoFile:true});
        		 recordSuccessStatus=resultData.status;
        		 taskpackageId=resultData.id;
        		var resultAcount= resultData.list;
        		if(resultAcount.length>0){
        			var countLengt=1;
        			for(var o in resultAcount){
        				addUpdateCount(countLengt,resultAcount[o].id);
        				var  Acount=$("#countForm").find("tr").eq(countLengt);
        		/*		 $('#uploadFile_'+resultAcount[o].id).xljAttachment({appId:'1',businessId:resultAcount[o].id,categoryId:'1',mode:'view',hideButtonsWithNoFile:true});*/
        				/* $('#uploadFile_'+resultAcount[o].id).xljAttachment({appId:'1',businessId:uuid,categoryId:'1',mode:'add',singleUpload:true});*/
        				 /*attachment.initAttachment("1",resultAcount[o].id,"1");*/
        				Acount.find("input[name='content']").val(resultAcount[o].content);
        				Acount.find("input[name='dutyUser']").val(resultAcount[o].dutyUser);
        				Acount.find("input[name='dutyDept']").val(resultAcount[o].dutyDept);
        				Acount.find("input[name='expectCompleteDate']").val(resultAcount[o].expectCompleteDate.substring(0,resultAcount[o].expectCompleteDate.indexOf(".")));
        				Acount.find("input[name='remark']").val(resultAcount[o].remark);
        				Acount.find("input[name='id']").val(resultAcount[o].id);
        				if(recordSuccessStatus=="3"){
        					Acount.find("input[name='reportStatus']").val("关闭");
        				}else{
        					var status=resultAcount[o].reportStatus;
        					if(status=="0"){
        						Acount.find("input[name='reportStatus']").val("草稿");
        					}else if(status=="1"){
        						Acount.find("input[name='reportStatus']").val("未汇报");
        					}else if(status=="2"){
        						Acount.find("input[name='reportStatus']").val("已汇报");
        					}else if(status=="4"){
        						Acount.find("input[name='reportStatus']").val("发送中");
        					}else if(status=="5"){
        						Acount.find("input[name='reportStatus']").val("忽略");
        					} 
        				}
        				
        				if(resultAcount[o].actualCompleteDate){
        					Acount.find("input[name='actualCompleteDate']").val(resultAcount[o].actualCompleteDate.substring(0,resultAcount[o].actualCompleteDate.indexOf(".")));
        				}
        				Acount.find("input[name='report']").val(resultAcount[o].report);
        				countLengt++;
        			}
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
 * author:liuf
 * describe:关闭页面
 * param: null
 */
function closed(){
	 window.close();
}

function reminder(){
var ids=$("#taskPack").val();
	$.ajax({
		url:hostUrl+"oa/taskPackage/reminder/"+ids,
		type:'post',
		dataType:'JSON',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","催办成功！");
			}else{
				pop_tip_open("red",resultData.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}

function addUpdateCount(i,id){
	 var row=$('<tr class="form-tr">'
			 +'<td><input type="checkbox" name="check" ></td>'
	         +'<td style="text-align:center"></td>'
	         +'<td><div><input type="text" name="content"  class="form-control addInputWidth"  disabled="disabled"><input type="hidden" id="'+id+'" name="id" ></div></td>'
	         +'<td><input type="text" class="form-control addInputWidth"  name="dutyUser"  disabled="disabled"></td>'
	         +'<td><input type="text" name="dutyDept" class="form-control addInputWidth"  disabled="disabled"></td>'
	         +'<td><input class="form-control" id="periodEndTime" size="16" type="text" name="expectCompleteDate"  data-rule-required="true"  disabled="disabled"></td>'
	         +'<td><input type="text"  name="remark" class="form-control addInputWidth" disabled="disabled"></td>'
	         +'<td><input class="form-control"  type="text" name="reportStatus"    disabled="disabled"></td>'
	         +'<td><input class="form-control"  type="text" name="actualCompleteDate"    disabled="disabled"><input class="form-control"  type="hidden" name="report"></td>'
	         +'<td style="text-align:center"><a href="javascript:void(0);" onclick="showModal(this)">详情</a></td>'
	         +'</tr>');
		     $("#countForm").append(row);
		   $('#countForm tr:last').xljSingleSelectorUtil();
			  $('.form_datetime').datetimepicker({
			        language:  'zh-CN',
			        format: 'yyyy-mm-dd hh:ii',
			        weekStart: 1,
			        todayBtn:  1,
			        autoclose: 1,
			        todayHighlight: 1,
			        startView: 2,
			        forceParse: 0,
			        showMeridian: 1,
				  pickerPosition:'top-right'
			    });
			 resetNum();
}
function  resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}

function showModal(ele){
	var obj=$(ele).parent().parent();
	var dispatchId=obj.find("input[name='id']").val();	
	$("#myModal").modal("show");

	 $('#uploadFile').xljAttachment({appId:'1',businessId:taskpackageId,categoryId:'1',mode:'view',singleUpload:false,hideButtonsWithNoFile:true});
	 $("#myModal").find("input[name='id']").val(obj.find("input[name='id']").val());
	 $("#myModal").find("textarea[name='content']").html(obj.find("input[name='content']").val());
	 $("#myModal").find("input[name='dutyUser']").val(obj.find("input[name='dutyUser']").val());
	 $("#myModal").find("input[name='dutyDept']").val(obj.find("input[name='dutyDept']").val());
	 $("#myModal").find("input[name='expectCompleteDate']").val(obj.find("input[name='expectCompleteDate']").val());
	 $("#myModal").find("input[name='actualCompleteDate']").val(obj.find("input[name='actualCompleteDate']").val());
	 $("#myModal").find("input[name='reportStatus']").val(obj.find("input[name='reportStatus']").val());
	 $("#myModal").find("textarea[name='remark']").html(obj.find("input[name='remark']").val());
	 $("#myModal").find("textarea[name='report']").html(obj.find("input[name='report']").val());
	 if(obj.find("input[name='reportStatus']").val()=="已汇报"){
		 $("#myModal").find("textarea[name='report']").attr("disabled","disabled");
		 $('#reportFile').xljAttachment({appId:'1',businessId:dispatchId,categoryId:'2',mode:'view',singleUpload:false,hideButtonsWithNoFile:true});
	 }else{
		 $('#reportFile').xljAttachment({appId:'1',businessId:dispatchId,categoryId:'2',mode:'edit',singleUpload:false});
	 }
}
function saveDispatch(){
	var  dispatchId=$("#myModal").find("input[name='id']").val();
	var obj=$("#"+dispatchId).parent().parent().parent();
	obj.find("input[name='report']").val($("#myModal").find("textarea[name='report']").val());
	$("#myModal").find("textarea[name='report']").val()
	$("#myModal").modal("hide");
	if($("#myModal").find("input[name='reportStatus']").val()!="已汇报"){
		   $("#reportFile").xljAttachmentSubmit();
	};
}
function sendTaskAgain(){
	var sendTaskId=$("#taskPack").val();
	var data={
			sendTaskId:sendTaskId	
	}
	$.ajax({
		url:hostUrl+"oa/taskPackage/sendTaskAgain",
		type:'post',
		contentType : "application/json", 
		dataType:'JSON',
		data:JSON.stringify(data),
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","重新发送成功！");
				$("#countForm").find("tr").each(function(i){
				var status=$(this).find("td").eq(7).val();
				if(status=="忽略"){
					$(this).find("td").eq(7).val("已发送");
				}
				});
				
			}else{
				pop_tip_open("red",resultData.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}

function recordSuccess(){
	 if(recordSuccessStatus=="1"){
		 pop_tip_open("blue","草稿状态的数据不允许标记");
	 }else{
		var checkedTrObjs = $("input[name='check']:checked").parent().parent();
		if(checkedTrObjs.length>0){
		var Allchecked =new Array();
		for(var o=0;o<checkedTrObjs.length;o++){
			var checkedData={};
			var checkedId=$(checkedTrObjs[o]).find("input[name='id']").val();
			var report=$(checkedTrObjs[o]).find("input[name='report']").val();
			var reportStatus=$(checkedTrObjs[o]).find("input[name='reportStatus']").val();
			if(reportStatus=="已汇报"){
				record=false;
				pop_tip_open("blue","已汇报的不需要标记");
				return;
			}
			checkedData.checkedId=checkedId;
			checkedData.report=report;
			Allchecked.push(checkedData);
		}
		
		var data={
			checkedIds:Allchecked,
		}
		$.ajax({
			url:hostUrl+"oa/taskPackageDispatch/recordSuccess",
			type:'post',
			contentType : "application/json", 
			dataType:'JSON',
			data:JSON.stringify(data),
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					pop_tip_open("blue","标记成功");
					for(var o=0;o<checkedTrObjs.length;o++){
						$(checkedTrObjs[o]).find("input[name='reportStatus']").val("已汇报");
						$(checkedTrObjs[o]).find("input[name='report']").val("管理员标记为完成");
					}
					 window.opener.reloadGrid(id);
				}else{
					pop_tip_open("red",resultData.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
	 }
	 }
}
