/*
 * @(#)c100021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 共通子系统
 */
/**
 * @fileoverview 关键字选择JavaScript.
 *
 * @author chenjunshuai
 * @version 1.0
 */

// 用户输入的与数据库不同的关键字
var g_oldDfName ='';

// 数据库中的关键字
var g_keywordName ='';

// 拼接后的字符串
var g_newStr ='';

/**
 * 提交关键字信息.
 */
function submitKeyStr(obj, keyStrId) {
	
	// 存在用户输入与数据库中不同的关键字
	if (0 == $('flagOld').value){
		selectOldDfName(obj);		
	}
	
	// 数据库中的存在关键字
	if (0 == $('flag').value) {
		selectKeywordName(obj);
	}
	
	// 拼接后的字符串
	g_newStr = g_oldDfName + g_keywordName;
	
	// 将拼接好的字符串传给调用画面	
	window.opener.document.getElementById(keyStrId).value= g_newStr.strip();
	
	// 设置焦点
	window.opener.document.getElementById(keyStrId).focus();
	
	// 关闭窗口
    window.close();
}

/**
 * 用户输入的与数据库不同的关键字.
 */
function selectOldDfName(obj) {
	
	// 只有一条数据
	if (null == obj.oldDfName.length) {
		if (obj.oldDfName.checked) {
			
			// 拼接字符串
			g_oldDfName = obj.oldDfName.value + " ";
		}			
	} else {
	
		// 用户输入与数据库不同的关键字
		for (var i = 0; i < obj.oldDfName.length; i++) {
			if (obj.oldDfName[i].checked) {
				
				// 拼接字符串
				g_oldDfName += obj.oldDfName[i].value + " ";
			}
		}
	}
}

/**
 * 数据库的关键字.
 */
function selectKeywordName(obj) {
	
	// 只有一条数据
	if (null == obj.ttKeywordName.length) {
		if (obj.keywordName.checked) {
			
			// 拼接字符串
			g_keywordName = obj.ttKeywordName.value + " ";
		}
	} else {
		for (var i = 0; i < obj.ttKeywordName.length; i++) {
			if (obj.ttKeywordName[i].checked) {
				
				// 拼接字符串
				g_keywordName += obj.ttKeywordName[i].value + " ";
			}
		}
	}	
}

/**
 * 【取消】按钮事件.
 */
function closeKey(keyStrId) {
	
	// 获取焦点
	window.opener.document.getElementById(keyStrId).focus();
	
	// 关闭窗口
	window.close();
}
