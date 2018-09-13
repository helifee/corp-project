/*
 * @(#)j030141.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 变更履历画面JavaScript.
 *
 * @author lijinling
 * @version 1.00
 */
var OptionEnum = {
    OptionOne: 1,
    OptionTwo: 2
}

/**
 * 初期表示.
 */
function init(){
    // 显示加载动画
    showLoader();
    // 版本号
    var versionNo = parseInt($F('versionNo'), 10);
    // 修改号
    var updateNo = parseInt($F('updateNo'), 10);
	
	// 前一版版本号
    var preVersionNo = parseInt($F('preVersionNo'), 10);
    // 前一版修改号
    var preUpdateNo = parseInt($F('preUpdateNo'), 10);
    
    // 复制选项
    var tempOption1 = $('tmplOption').clone(true);
    
    var tempOption2 = $('tmplOption').clone(true);
    
    // 获取下拉列表
    var versionSelect = $('versionSelect');
    
    // 编辑选项
    tempOption1.label = '第' + preVersionNo + '版（第' + (preUpdateNo + 1) + '次修改）';
    tempOption2.label = '第' + (preVersionNo + 1) + '版';
    tempOption1.value = OptionEnum.OptionOne;
    tempOption2.value = OptionEnum.OptionTwo;
	
    // 插入选项
    versionSelect.insert({
        bottom: tempOption1
    })
    versionSelect.insert({
        bottom: tempOption2
    })
	
	// 如果版本号和修改号与前一版不同，说明不是再编辑后第一次提交
	if (versionNo != preVersionNo || updateNo != preUpdateNo){
		
		// 这时的默认值是已选择版本
		if (updateNo == 0){
			versionSelect.value = OptionEnum.OptionTwo;
		} else {
			versionSelect.value = OptionEnum.OptionOne;
		}
	}
	
    // 隐藏加载动画
    hideLoader();
}

/**
 * 提交审批.
 */
function submitApprove(){

    // 自动校验
    if (!checkForm('submitApproveForm')) 
        return;
    
    if (!confirm(getMessage('js.tt.warn.KSW12'))) {
        return;
    }
    
    // 获取下拉列表
    var versionSelect = $('versionSelect');
    
    // 设置版本变更选项
    $('option').value = versionSelect.options[versionSelect.selectedIndex].value;
    
    var form = $('submitApproveForm');
    
    form.action = 'j030141SubmitModifyHistory.action' + '?' + dataSerialize(form);
    // 显示加载动画
    showLoader();
    // 提交表单
    form.submit();
    
}
