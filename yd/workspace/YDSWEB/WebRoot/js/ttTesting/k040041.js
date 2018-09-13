/**
 * @author yukunpeng
 */
/**
 * 画面onload.
 */
function initForm() {
	// 分类初期化
	initCategoryList('K040021', '1', 3, true, '1', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '0');
	
	// 关键字信息
	g_jscon = new JsContentFilter('keyword', 'k040011GetKeywordList.action', 'keywordList');
	
	//加载编辑器
	ckeditorConfig('editor', 830, 200,[['PreviewV2', '-', 'Templates'], 
		['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Print'], 
		['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'], '/', 
		['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'], 
		['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'], 
		['Link', 'Unlink', 'Anchor'], 
		['Table', 'HorizontalRule', 'Smiley', 'SpecialChar'], '/', 
		['Styles', 'Format', 'Font', 'FontSize'], 
		['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'], 
		['TextColor', 'BGColor'], ['Maximize', 'ShowBlocks', '-', 'About']]
	);
	
	$('sltCategory1').focus;
	// Id数组  
 	var selectIdArr = ['questionKindList', 'optionTypeList'];  

 	var actionNameArr = ['k040041SearchKindList.action', 'k040041SearchOptionTypeList.action'];  

 	registMultiSelect(selectIdArr, actionNameArr);
	
	addRequiredCheck('answerScore', getMessage('js.com.warning.0001', '试题分数'), true);
	addRegexCheck('answerScore', getMessage('js.com.warning.0002', '试题分数'), '[1-9]\d*');
}

/**
* 根据题型显示对应编辑框.
*/
function patterControl(sid) {
	var chooseSelectList = [4,5,6,7,8,9,10];
    var optionType  = $(sid).value;
	 //当【题型】不选或选择<填空题>时		
	 //	【选项类型】和【选项数】为空，不可用；								
	if(optionType == null || optionType == 4){
		$('optionTypeList').clear();
		$('optionTypeList').disable();
		
		$('optionNumber').clear();
		$('optionNumber').disable();
	
	
	//当【题型】为<判断题>时									
	//【选项类型】可选择内容为判断题的选项类型，【选项数】为空，不可用；								
	}else if(optionType==3){
		$('optionNumber').clear();
		$('optionNumber').disable();
		$('optionTypeList').enable();
		
	//当【题型】为<单选题>或<多选题>时									
	//【选项类型】可选择内容为选择题的选项类型，【选项数】默认4，选择范围2-10；								
	}else if(optionType == 1||optionType== 2){
		
		$('optionTypeList').enable();
		$('optionNumber').enable();
		$('optionNumber').value = 4;
	}							
									
}

/**
* 关键字取得.
*/
function getKeyword(category1Id){
	
	// 关键字信息
	var url = 'k040031GetKeyWordInfo.action?category1Id='+ encodeURI($('sltCategory1').value);
	g_jscon.setContentArray(url)
}

/**
* 确定事件
*/
function confirmBtn(){
  	
  	if (!validate()){
		return;
	}
	
	// 显示加载动画
	showLoader();

	//表单提交
	var url = 'k040041CheckQuestion.action';
	$('questionCreateAllForm').action = url;
	$('questionCreateAllForm').submit();

}
 
/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate() {

	if ($('sltCategory1').readAttribute('accesskey') == 1 && $('sltCategory1').value == 0) {
	
		addFieldError('sltCategory1', getMessage('js.com.warning.0001', '第一级分类'));
		$('sltCategory1').focus();
		return false;
	}
	
	if ($('sltCategory2').readAttribute('accesskey') == 1 && $('sltCategory2').value == 0) {
	
		addFieldError('sltCategory2', getMessage('js.com.warning.0001', '第二级分类'));
		$('sltCategory2').focus();
		return false;
	}
	
	if ($('sltCategory3').readAttribute('accesskey') == 1 && $('sltCategory3').value == 0) {
	
		addFieldError('sltCategory3', getMessage('js.com.warning.0001', '第三级分类'));
		$('sltCategory3').focus();
		return false;
	}
	
	if (!checkForm('questionCreateAllForm')){
		return false;
	}
	
	if (CKEDITOR.instances.editor.getData() == '' || 
		CKEDITOR.instances.editor.getData().replace(/^\s+|\s+$/g, "").length == 0) {
		MsgBox.error(getMessage('js.com.warning.0001', '试题内容'));
		return false;
	}
	
	if ($F('answers') == '' || 
		$F('answers').replace(/^\s+|\s+$/g, "").length == 0) {
		MsgBox.error(getMessage('js.com.warning.0001', '答案内容'));
		return false;
	}
	
	return true;
}
