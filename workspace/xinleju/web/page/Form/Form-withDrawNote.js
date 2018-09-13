/**
 * 收回
 * @param wiId
 */
function withDraw(fiId,wiId){
	if(isEmpty($('#spUserNote').val())){
		alert("请填写撤回意见！");
		return;
	}
    var confirmWithDraw = window.confirm("确认要撤回么？");
    if(confirmWithDraw){
    	if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("正在操作，请稍侯！");
		}else{
			$('body',window.parent.document).mask("正在操作，请稍侯！");
		}
    	$.ajax({
    		url : 'Form!withDraw.do',
    		data : {fiId : fiId, wiId : wiId,'spUserNote' : encodeURI(isNotEmpty($('#spUserNote').val()) ? $('#spUserNote').val() : "")},
    		dataType : "json",
    		success :function(responseText){
    			if(Browser.isIE6() || Browser.isIE7()){
    				$('body').unmask();
    			}else{
    				$('body',window.parent.document).unmask();
    			}
    			if(responseText && responseText.success){
    				alert("您已成功撤回！");
    				window.returnValue = "reFlash";
    				window.close();
    			}else{
    				alert(responseText.msg);
    			}
    		},
    		error : function(){
    			alert("网络连接失败，请检查网络！");
    		}
    	});
    }
}
/**
 * 收回
 * @param wiId
 */
function jbrWithDraw(fiId){
	if(isEmpty($('#spUserNote').val())){
		alert("请填写撤回意见！");
		return;
	}
    var confirmWithDraw = window.confirm("确认要撤回么？");
    if(confirmWithDraw){
    	if(Browser.isIE6() || Browser.isIE7()){
			$('body').mask("操作中，请稍侯！");
		}else{
			$('body',window.parent.document).mask("操作中，请稍侯！");
		}
    	Ext.Ajax.request({
    		type : "POST",
    		dataType : "json",
    		url : "Form!fiWithDraw.ajax",
    		params : {'fiId' : fiId,'spUserNote' : encodeURI(isNotEmpty($('#spUserNote').val()) ? $('#spUserNote').val() : "")},
    		success : function(resp) {
    			var response = Ext.util.JSON.decode(resp.responseText);
    			if(response && response.success){
					alert("操作成功！");
    				window.returnValue = "reFlash";
					window.close();
				}else{
					alert(response.debugInfo);
	    	    	if(Browser.isIE6() || Browser.isIE7()){
	    				$('body').unmask();
	    			}else{
	    				$('body',window.parent.document).unmask();
	    			}
				}
    		},
    		failure : function() {
    			alert("操作失败!");
    	    	if(Browser.isIE6() || Browser.isIE7()){
    				$('body').unmask();
    			}else{
    				$('body',window.parent.document).unmask();
    			}
    		}
    	});
    }
}
/**
 * 审批意见切换
 * @param str
 */
function addNote(str){
	if(isNotEmpty(str)){
		note = str;
	}else{
		note = "";
	}
	$('#spUserNote').val(note);
}