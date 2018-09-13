/**
 *  hy_affirm_attend
 *  参加会议确认一览画面用
 */

/**
 * checkbox 全选选择框 选中时/未选中时的画面设定
 */
function allselect() {
	var objForm = document.ckform;
	var objLen = objForm.length;
	objSourceElement = document.getElementById('hiddeninfos');
	objTargetElement = document.getElementById('temporaryinfos');
	//全选选择框 选中时
	if(objForm.elements[0].checked == true){
		for (var elcount = 1; elcount < objLen; elcount++){
		    if (objForm.elements[elcount].type == "checkbox"){
		    	objForm.elements[elcount].checked = true;
		    }
		}
		// 列表
		movetemplist(objSourceElement, objTargetElement);
	}else{
		// 全选选择框 未选中时
		for (var i = 1; i < objLen; i++){
		    if (objForm.elements[i].type == "checkbox"){
		    	objForm.elements[i].checked = false;
		    }
		}
		//清空列表
		cleartemplist(objTargetElement);
	}

	return true;

}

/**
 * 检查checkbox列表，去过list中check全部选择，
 * 自动把“全选”设置为true
 * @param keyinfos
 * @return true
 */
function checkselect(keyinfos){
	var objForm = document.ckform;
	var objLen = objForm.length;
	var ckflg = true;
	for (var elcount = 1; elcount < objLen; elcount++){
	    if (objForm.elements[elcount].type == "checkbox"){
	    	if(objForm.elements[elcount].checked == false){
	    		ckflg = false;
	    	}
	    }
	}
	if (ckflg == true && objForm.elements[0].type == "checkbox"){
		objForm.elements[0].checked = true;
	}else{
		objForm.elements[0].checked = false;
	}
	
	if (document.getElementById(keyinfos).checked == true){
		addtemporarylist(keyinfos);
	}else{
		deltemporarylist(keyinfos);
	}
	return true;
}
 
/**
 * 确认按钮
 */
function affirmattend(){
	objTargetElement = document.getElementById('temporaryinfos');
	if (objTargetElement.length == 0 
			||(objTargetElement.length == 1 && objTargetElement[0].value == "") ){
		alert("请至少选择一个会议！")
	}else{
		targetForm = document.forms[0];
		targetForm.action = "affirmhuizhi.action"
		targetForm.submit();
	}
}

/**
  * 对temporaryinfos设置内容
  * @param keyinfos
  * @return true
  */
function addtemporarylist(keyinfos){
	objTargetElement = document.getElementById('temporaryinfos');
	objTargetElement.length = objTargetElement.length + 1;
	objTargetElement.options[objTargetElement.length - 1].text = "";
	objTargetElement.options[objTargetElement.length - 1].value = keyinfos;
	objTargetElement.options[objTargetElement.length - 1].selected = true;
}

/**
 * 对temporaryinfos设置内容,清除值
 * @param keyinfos
 * @return true
 */
function deltemporarylist(keyinfos){
	objTargetElement = document.getElementById('temporaryinfos');
	
	var aryTempTargetOptions = new Array();
	var x = 0;
	var ivalue = "";
	var flg = 0;
	for ( var i = 0; i < objTargetElement.length; i++) {
		ivalue = objTargetElement.options[i].value;
		if (ivalue == keyinfos) {
			flg = 1;
		}
		if (flg == 0) {
			var objTempValues = new Object();
			objTempValues.text = objTargetElement.options[i].text;
			objTempValues.value = objTargetElement.options[i].value;
			aryTempTargetOptions[x] = objTempValues;
			x++;
		}
		flg = 0;
	}
	
	objTargetElement.length = aryTempTargetOptions.length;
	for ( var i = 0; i < aryTempTargetOptions.length; i++) {
		objTargetElement.options[i].text = aryTempTargetOptions[i].text;
		objTargetElement.options[i].value = aryTempTargetOptions[i].value;
		objTargetElement.options[i].selected = true;
	}
}

/**
 *把源checkbox内容设置到目标checkbox内容中 
 *@param objSourceElement 源 
 *@param objTargetElement 目标 
 * 
 */
function movetemplist(objSourceElement, objTargetElement) {
	objTargetElement.length = objSourceElement.length;
	for ( var i = 0; i < objSourceElement.length; i++) {
		objTargetElement.options[i].text = objSourceElement[i].text;
		objTargetElement.options[i].value = objSourceElement[i].value;
		objTargetElement.options[i].selected = true;
	}
}

/**
 * 清空checkbox list相关内容
 * @param objTargetElement checkbox
 */
function cleartemplist(objTargetElement){
	objTargetElement.length = 1;
	objTargetElement.options[0].text = "";
	objTargetElement.options[0].value = "";
	objTargetElement.options[0].selected = false;
}
