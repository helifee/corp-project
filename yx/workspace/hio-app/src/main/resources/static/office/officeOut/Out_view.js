
var id=$.xljUtils.getUrlParam('businessId');
$(function(){
	pageInit();
});
function pageInit(){
	var defObjs = initFile();
	var defObjs2 = getOfficeOutEcho(id);
		   // window.parent.resizeIframeTo();
		try{
			$(window.parent.document.getElementById('bizForm')).width('99%');
			/*$.when(defObjs.attachDef,defObjs2.getDef).done(function (flag,flag2) {
				resizeOfficeIframe();
			});*/
			setTimeout(function () {
				resizeOfficeIframe();
			},2000);
		}catch (e){

		}


}
function initFile() {
	var defObjs = {};
	var def = new $.Deferred();
	try{
		$('.attachment-container').xljAttachment({
			appId: 'officeOut',
			businessId: id,
			categoryId: '1',
			mode: 'view',
			singleUpload: false,
			hideButtonsWithNoFile:true,
			loadFilesDone:function () {
				def.resolve(true);
				resizeOfficeIframe();
				defObjs.attachDef = def.promise();
			}
		});

	}catch (e){
	}
	return defObjs;
}
function getOfficeOutEcho(id){
	var defObjs = {};
	var def = new $.Deferred();
	$('body').css({'min-width':'100%'});
	$.ajax({
	      type:'get',
	      url: serviceUrl+"/oa/officeOut/getOfficeOut/"+id+"?time="+Math.random(),
	      success: function(data) {
	    	  if(data.success){
	    		  var officeOutData=data.result;
	    		  $("#theme").text(officeOutData.theme);
	    		  $("#proposeUser").text(officeOutData.proposeUser);
	    		  $("#proposeDept").text(officeOutData.proposeDept);
	    		  $("#createPersonName").text(officeOutData.createPersonName);
	    		  $("#createFormdata").text(officeOutData.createFormdata);
	    		  $("#remark").text(officeOutData.remark);
	    	     	var officeOutInfoList=officeOutData.list;
	        		if(officeOutInfoList.length>0){
	        		  	var countLengt=0;
	        			for(var o in officeOutInfoList){
	        				addOutInfoList();
	        				var  OutInfoList=$("#officeOutList").find("tr").eq(countLengt);
	        				OutInfoList.find("label[name='id']").text(officeOutInfoList[o].id);
	        				OutInfoList.find("label[name='stockNum']").text(officeOutInfoList[o].stockNum);
	        				OutInfoList.find("label[name='stockName']").text(officeOutInfoList[o].stockName);
	        				OutInfoList.find("label[name='typeName']").text(officeOutInfoList[o].typeName);
	        				OutInfoList.find("label[name='stockSpecifications']").text(officeOutInfoList[o].stockSpecifications);
	        				OutInfoList.find("label[name='outStockCount']").text(officeOutInfoList[o].outStockCount);
	        				OutInfoList.find("label[name='inCount']").text(officeOutInfoList[o].officeinfoNum);
	        				countLengt++;
	        			}
	        		}

				   resizeOfficeIframe();
				  def.resolve(true);
				  defObjs.getDef = def.promise();
	    	  }

	      },
		error:function (xhr) {
		}
	 });
	return defObjs;
}
function addOutInfoList(){
	var row=$("<tr style='text-align:center'><td><input type='checkbox' name='rowCheck'></td>" +
			"<td></td>" +
			"<td> <label name='stockNum'></label></td>" +
			"<td> <label name='stockName'></label></td>" +
			"<td><label name='typeName'></label></td>" +
			"<td> <label name='stockSpecifications'></label></td>" +
			"<td><label name='outStockCount'></label></td>"+
			"<td><label name='inCount'></label></td></tr>");
$("#officeOutList").append(row);
resetNum();

}
function resetNum(){
	$("#officeOutList").find("tr").each(function(i){
		if(i>-1){
			$(this).find("td").eq(1).html(i+1);
		}
	});
}

function toclose(){
	  window.close();
}

function resizeOfficeIframe() {
	try{


	if (window.parent&&window.parent.document.bizForm){
		var bizForm = window.parent.document.bizForm;
		$(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
	} else {
		// ff
		// var iframeBody = document.getElementById('bizForm').contentDocument.body;
		// b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
		var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
		iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
	}
	}catch (e){

	}
}