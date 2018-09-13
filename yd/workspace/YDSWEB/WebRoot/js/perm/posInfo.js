/*
 * @(#)posInfo.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 职位管理画面JavaScript.
 * 
 * @author chenjunshuai
 * @version 1.0
 */

/**
 * 职位状态枚举.0:无效 1：有效.
 */													
var PosStateEnum = {Invalid : 0, Valid : 1};

/**
 * 操作状态枚举.0:无 1：修改 2：新建.
 */
var OperateEnum = {None : 0, Modify : 1, Create : 2};
/**
 * 滚动条操作状态枚举.0:不移动 1：向上移动 2：向下移动 3:滚动条置顶 4:滚动条置底
 */
var UDFlagEnum = {None : 0, Up : 1, Down : 2 ,Top : 3, Bottom : 4};
/**
 * 画面onload.
 */

var nowLine; //当前选中行


function init(){
	// 鼠标点击后取得当前行
    var myFunction = {	
					  clickEvent:function(event) {
					                 nowLine = event.element().up('tr',0);
					             }
	                 };
	myFunction.bindClickEvent = myFunction.clickEvent.bindAsEventListener(myFunction);
	Event.observe('table_posList','click',myFunction.bindClickEvent);
	$('refer').disable();
	$('cancle').disable();
}

/**
* 向上移动.
*/
function moveUpRow(){
	
	// 启用提交按钮
	$('refer').enable();
	
	// 起用取消按钮
	$('cancle').enable();
	
	// 如果没有选中一行
	if (nowLine == null){
		alert(getMessage("js.com.info.0014"));
		return;
	}
	
	// 取前一行
	var bLine = nowLine.previous(0);
	if (bLine != null) {
		
		// 前一行标记设置
		if(!bLine.select('input')[5].value == 2){	
			bLine.select('input')[5].value = OperateEnum.Modify;
		}
				
		// 当前行标记设置
		if(!nowLine.select('input')[5].value == 2){	
			nowLine.select('input')[5].value = OperateEnum.Modify;
		}
		// 前一行的要提交的数据设置为可用
		bLine.select('input')[1].enable();
		bLine.select('input')[2].enable();
		bLine.select('input')[3].enable();
		bLine.select('input')[4].enable();
		bLine.select('input')[5].enable();
		bLine.select('input')[6].enable();

		bLine.select('select')[0].enable();
		
		// 当前行的要提交的数据设置为可用
		nowLine.select('input')[1].enable();
		nowLine.select('input')[2].enable();
		nowLine.select('input')[3].enable();
		nowLine.select('input')[4].enable();
		nowLine.select('input')[5].enable();
		nowLine.select('input')[6].enable();

		nowLine.select('select')[0].enable();
		
		// 设置当前行与前一行排序的序号
		var displaySeq = bLine.select('input')[4].value;
		bLine.select('input')[4].value= nowLine.select('input')[4].value;
		nowLine.select('input')[4].value = displaySeq;
		
		// 插入当前行
		bLine.insert({before:nowLine});
		
		//移动滚动条
		changeScrollPosition((nowLine.select('input')[4].value - 1), UDFlagEnum.Up);
		
	}
}

/**
* 向下移动.
*/
function moveDownRow(){
	
	// 启用提交按钮
	$('refer').enable();
	
	// 起用取消按钮
	$('cancle').enable();
	
	// 如果没有选中一行
	if (nowLine == null){
		alert(getMessage("js.com.info.0014"));
		return;
	}
	
	// 取下一行
	var bLine = nowLine.next(0);
	if(bLine != null){
		
		// 前一行标记设置
		if (!bLine.select('input')[5].value == 2) {	
			bLine.select('input')[5].value = OperateEnum.Modify;
		}
				
		// 当前行标记设置
		if (!nowLine.select('input')[5].value == 2) {	
			nowLine.select('input')[5].value = OperateEnum.Modify;
		}
		
		// 下一行的要提交的数据设置为可用
		bLine.select('input')[1].enable();
		bLine.select('input')[2].enable();
		bLine.select('input')[3].enable();
		bLine.select('input')[4].enable();
		bLine.select('input')[5].enable();
		bLine.select('input')[6].enable();
		bLine.select('select')[0].enable();
		
		// 当前行的要提交的数据设置为可用
		nowLine.select('input')[1].enable();
		nowLine.select('input')[2].enable();
		nowLine.select('input')[3].enable();
		nowLine.select('input')[4].enable();
		nowLine.select('input')[5].enable();
		nowLine.select('input')[6].enable();
		nowLine.select('select')[0].enable();
		
		// 设置当前行与下一行排序的序号
		var displaySeq =bLine.select('input')[4].value;
		bLine.select('input')[4].value= nowLine.select('input')[4].value;
		nowLine.select('input')[4].value = displaySeq;
		
		// 插入当前行
		bLine.insert({after:nowLine});
		
		//移动滚动条
		changeScrollPosition((nowLine.select('input')[4].value - 1),UDFlagEnum.Down);
	}
}

/**
* 删除该新建行
*/
function removeRow(rowIndex){
	if (confirm(getMessage('js.com.info.0001'))) {
		var table_posList = $('table_posList'); //表名称
		var a = $("posInfoList[" + rowIndex + "].displaySeq").value;	
		for(var i= a-1; i< (table_posList.rows.length); i++){
			table_posList.down('tr', i).select('input')[4].value = table_posList.down('tr', i).select('input')[4].value - 1;
		}
		table_posList.deleteRow(a -1);
	} 
} 


/**
* 取消职位信息.
*/
function cancel(){
	if (confirm(getMessage('js.com.info.0005'))) {
	location.reload();
	}
}

/**
* 修改职位信息.
*/
function modifyPosInfo(rowIndex){
	
	// 启用提交按钮
	$('refer').enable();
	
	// 起用取消按钮
	$('cancle').enable();
	
	if (confirm(getMessage("js.com.info.0003"))){
		var table_posList = $('table_posList'); //表名称
		
		
		// 设置隐藏域
		$('a5'+rowIndex).addClassName('none');   
		$('a6'+rowIndex).removeClassName('none');
		$('a7'+rowIndex).addClassName('none');   
		$('a8'+rowIndex).removeClassName('none');
		$('a9'+rowIndex).addClassName('none');
		$('a10'+rowIndex).removeClassName('none');
		
		var upFlagStr = "posInfoList[" + rowIndex + "].flag";  
	    var desplaySeqStr = "posInfoList[" + rowIndex + "].displaySeq";
	    var posIdStr = "posInfoList[" + rowIndex + "].posId";
		var posNameStr = "posInfoList[" + rowIndex + "].posName";
		var parentPosStr = "posInfoList[" + rowIndex + "].parentPos";
		var posDescStr = "posInfoList[" + rowIndex + "].posDesc";
		var posStateStr = "posInfoList[" + rowIndex + "].posState";
		var checkStr = "m" + rowIndex;
		
		// 设置属性为活性
		$(upFlagStr).enable();
		$(desplaySeqStr).enable();
		$(posIdStr).enable();
		$(posNameStr).enable();
		$(parentPosStr).enable();
		$(posDescStr).enable();
		$(checkStr).enable();
		$(posStateStr).enable();
		$(upFlagStr).value = OperateEnum.Modify;
		
		// 设置当前行的背景颜色
		table_posList.down('tr', ($(desplaySeqStr).value - 1)).addClassName("bgclr_F1D3FB");
	
	} 
	
	
	
}

/**
* 新建职位信息.
*/
function AddRow(table){	
	
	// 启用提交按钮
	$('refer').enable();
	
	// 启用取消按钮
	$('cancle').enable();
	
	if (confirm(getMessage("js.com.info.0013"))){
		
		// 新建一行
		var newRow = $("cloneTr").clone(true);
		
		// 设置新建行的ID
		newRow.id = "p"+table.rows.length;
		var L = newRow.childElements();
		
		// 设置新建行的属性
		L[0].select('input')[0].name="p"+table.rows.length;
		L[0].select('input')[0].id="p"+table.rows.length;
		L[0].select('input')[0].disable();
		L[0].down().addClassName('none'); 
		L[0].down(1).removeClassName('none');
		L[0].select('input')[0].value=(table.rows.length+1);
		L[1].select('input')[0].name="posInfoList["+table.rows.length+"].posId";
		L[1].select('input')[0].id="posInfoList["+table.rows.length+"].posId";
		L[1].select('input')[0].clear();
		L[1].select('input')[0].enable();
		L[1].down().addClassName('none'); 
		L[1].down(1).removeClassName('none');
		L[2].select('input')[0].name="posInfoList["+table.rows.length+"].posName";
		L[2].select('input')[0].id="posInfoList["+table.rows.length+"].posName";
		L[2].select('input')[0].clear();
		L[2].select('input')[0].enable();
		L[2].down().addClassName('none'); 
		L[2].down(1).removeClassName('none');
		L[3].select('select')[0].name="posInfoList["+table.rows.length+"].parentPos";
		L[3].select('select')[0].id="posInfoList["+table.rows.length+"].parentPos";
		L[3].select('select')[0].clear();
		L[3].select('select')[0].enable();
		L[3].down().addClassName('none'); 
		L[3].down(1).removeClassName('none');
		L[4].select('input')[0].name="posInfoList["+table.rows.length+"].posDesc";
		L[4].select('input')[0].id="posInfoList["+table.rows.length+"].posDesc";
		L[4].select('input')[0].clear();
		L[4].select('input')[0].enable();
		L[4].select('input')[1].name = "posInfoList["+table.rows.length+"].displaySeq";
		L[4].select('input')[1].id = "posInfoList["+table.rows.length+"].displaySeq";
		L[4].select('input')[1].value = (table.rows.length+1);
		L[4].select('input')[1].enable();
		L[4].select('input')[2].name = "posInfoList["+table.rows.length+"].flag";
		L[4].select('input')[2].id = "posInfoList["+table.rows.length+"].flag";
		L[4].select('input')[2].value = OperateEnum.Create;
		L[4].select('input')[2].enable();
		L[4].down().addClassName('none'); 
		L[4].down(1).removeClassName('none'); 
		L[5].innerHTML = "<div style='display:none;'><input type='text' name='posInfoList["+table.rows.length+"].posState' value='1' id='posInfoList["+table.rows.length+"].posState' style='WIDTH: 0px; HEIGHT: 0px'/></div><input type='checkbox' name='m" + table.rows.length + "' value='true' checked id='m"+ table.rows.length + "' onclick='selectCheckbox("+ table.rows.length +")'/>";		
		L[6].innerHTML = "<a href = '#' onclick = 'removeRow("+ table.rows.length +");'>删除</a>";

		table.tBodies[0].appendChild(newRow);
		
		// 设置新建行的背景颜色
		newRow.addClassName("bgclr_F1D3FB");
		nowLine = newRow;
	}

	changeScrollPosition(table.rows.length,UDFlagEnum.Bottom);

	return newRow;
}

/**
 * 滚动条位置改变
 * @param rowsCount
 * @param udFlag: 0:新建；1：UP：2DOWN。
 * @return
 */
function changeScrollPosition(  rowsCount , udFlag){	
	
	 if(rowsCount != -1){
		
		var trHeight = 0;
		
		if(udFlag == UDFlagEnum.None ){
			$("myScoll").scrollTop = $("myScoll").scrollTop;
		}
		
		if(udFlag == UDFlagEnum.Down){		
			if((rowsCount+1) > $('table_posList').rows.length - 1){		
				trHeight = $('table_posList').down('tr', (rowsCount)).scrollHeight;			
			}else{			
				trHeight = $('table_posList').down('tr', (rowsCount + 1)).scrollHeight;			
			}		
			$("myScoll").scrollTop = $("myScoll").scrollTop  + trHeight;
		}
		
		if(udFlag == UDFlagEnum.Up){		
			if((rowsCount-1) < 0){
				trHeight = $('table_posList').down('tr', (rowsCount)).scrollHeight;	
			}else{
				trHeight = $('table_posList').down('tr', (rowsCount-1)).scrollHeight;
			}	
			$("myScoll").scrollTop = $("myScoll").scrollTop  - trHeight;
		}
		
		if(udFlag == UDFlagEnum.Top){
			$("myScoll").scrollTop = 0;
		}
		
		if(udFlag == UDFlagEnum.Bottom){
			$("myScoll").scrollTop = $('table_posList').scrollHeight;
		}
	}	
}

/**
* 提交新建或修改的职位信息.
*/
function submitPosInfo(){
	if (confirm(getMessage('js.com.info.0004'))) {
		 var table_posList = $('table_posList'); //表名称
		 for(var i= 0; i< (table_posList.rows.length); i++){
			 //输入校验
			if (!validate(i)) {
				return;
			}	
       	 }
	     
	     // 表单提交
	     var url = "updPosInfosAction.action";
	     $("posInfoListForm").action = url; 
	     $("posInfoListForm").submit();
	} 
}

/**
* Checkbox选中和不选中的状态.
*/
function selectCheckbox(rowsIndex){
	var posStateStr =$("posInfoList[" + rowsIndex + "].posState");
	var checkStr = "m" + rowsIndex;
	var objPosState = $(checkStr);
	if(objPosState.checked) {
		objPosState.checked = true;
		
		// 设置隐藏属性
		posStateStr.value = PosStateEnum.Valid;
	}else{
		objPosState.checked = false;
		
		// 设置隐藏属性
		posStateStr.value = PosStateEnum.Invalid;
	}
}

/**
* 输入校验.
* @return Boolean true:false.
*/
function validate(index){
	
	// 职位ID输入校验.
	if(!posIdValidate(index)){
		return false;
	}
	
	// 职位名称输入校验
	if(!posNameValidate(index)){
		return false;
	}
	
	// 上级职位名称输入校验
	if(!parentPosValidate(index)){
		return false;
	}
	
	// 职位描述输入校验
	if(!posDescValidate(index)){
		return false;
	}
	
	// 排列顺序校验
	if(!displaySeqValidate(index)){
		return false;
	}
	
	// 职位状态校验
	if(!posStateValidate(index)){
		return false;
	}
	return true;
}

/**
* 职位ID输入校验.
* @return Boolean true:false.
*/
function posIdValidate(b){	
	var table_posList = $('table_posList'); //表名称	
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('input')[1]) {
		field = table_posList.down('tr', b).select('input')[1];
		
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage("js.com.warning.0001", "职位ID"));
			continueValidation = false;
		}
		
		// 输入长度校验
		if (continueValidation && field.value != null) {
			var value = field.value;
			
			// trim field value
			while (value.substring(0, 1) == " ") 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == " ") 
				value = value.substring(0, value.length - 1);
	        if ((0 > -1 && value.length < 0) ||
	                (3 > -1 && value.length > 3)) {
				alert(getMessage("js.com.warning.0003", "职位ID小于", '3'));
				continueValidation = false;
			}
		}
		
		// 输入合法化校验
		if (continueValidation && field.value != null && !field.value.match("[0-9]{1,3}")) {
			alert(getMessage("js.com.warning.0002", "职位ID"));
			continueValidation = false;
		}
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].posId").focus();
		return false;
	}
}

/**
* 职位名称输入校验.
* @return Boolean true:false.
*/
function posNameValidate(b){	
	var table_posList = $('table_posList'); //表名称	
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('input')[2]) {
		field = table_posList.down('tr', b).select('input')[2];
		
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage("js.com.warning.0001", "职位名称"));
			continueValidation = false;
		}
        var value = field.value;
        
        // trim field value
        while (value.substring(0, 1) == ' ') 
            value = value.substring(1, value.length);
        while (value.substring(value.length - 1, value.length) == ' ') 
            value = value.substring(0, value.length - 1);
        if ((0 > -1 && value.length < 0) ||
        (20 > -1 && value.length > 20)) {
            alert(getMessage("js.com.warning.0003", "职位名称", "200"));
            continueValidation = false;
        }
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].posName").focus();
		return false;
	}
}

/**
* 上级职位ID输入校验.
* @return Boolean true:false.
*/
function parentPosValidate(b){
	var table_posList = $('table_posList'); //表名称
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('select')[0]) {
		field = table_posList.down('tr', b).select('select')[0];
		
		// 输入长度校验
		if (continueValidation && field.value != null) {
			var value = field.value;
			
			// trim field value
			while (value.substring(0, 1) == " ") 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == " ") 
				value = value.substring(0, value.length - 1);
	        if ((0 > -1 && value.length < 0) ||
	                (3 > -1 && value.length > 3)) {
				alert(getMessage("js.com.warning.0003", "上级职位ID小于", '3'));
				continueValidation = false;
			}
		}
		
		// 输入合法化校验
		if (continueValidation && field.value != null && !field.value.match("[0-9]{1,3}")) {
			alert(getMessage("js.com.warning.0002", "上级职位ID"));
			continueValidation = false;
		}
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].posName").focus();
		return false;
	}
}

/**
* 显示顺序输入校验.
* @return Boolean true:false.
*/
function displaySeqValidate(b){
	var table_posList = $('table_posList'); //表名称
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('input')[4]) {
		field = table_posList.down('tr', b).select('input')[4];
		
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage("js.com.warning.0001", "显示顺序"));
			continueValidation = false;
		}
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].displaySeq").focus();
		return false;
	}
}
/**
* 职位描述输入校验.
* @return Boolean true:false.
*/
function posDescValidate(b){
	var table_posList = $('table_posList'); //表名称
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('input')[3]) {
		field = table_posList.down('tr', b).select('input')[3];
        var value = field.value;
        
        // trim field value
        while (value.substring(0, 1) == ' ') 
            value = value.substring(1, value.length);
        while (value.substring(value.length - 1, value.length) == ' ') 
            value = value.substring(0, value.length - 1);
        if ((0 > -1 && value.length < 0) ||
        (200 > -1 && value.length > 200)) {
            alert(getMessage("js.com.warning.0003", "职位描述", "200"));
            continueValidation = false;
        }
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].posDesc").focus();
		return false;
	}
}

/**
* 职位状态输入校验.
* @return Boolean true:false.
*/
function posStateValidate(b){
	var table_posList = $('table_posList'); //表名称
	// 校验状态标记
	var continueValidation = true;
	if (table_posList.down('tr', b).select('input')[6]) {
		field = table_posList.down('tr', b).select('input')[6];
		
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage("js.com.warning.0001", "职位状态"));
			continueValidation = false;
		}
		
		// 职位校验（0或1）
		if(0 !=field.value  && 1!= field.value){
			alert(getMessage("js.com.warning.0002", "职位状态"));
		}
	}
	if (continueValidation) {
		return true;
	} else {
		
		// 获得焦点
		$("posInfoList[" + b + "].posState").focus();
		return false;
	}
}

