/*
 * @(#)relatedSelect.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: Manual
 */
/**
 * @fileoverview 
 *
 * @author tianjian
 * @version 1.0
 */

/**
 * 删除时form提交.
 */
function del() {
	$('perManagerForm').action = "deletePerson.action"
	$('perManagerForm').submit();
}

/**
 * 修改时form提交.
 */
function upd(fromId) {
	$('perManagerForm').action = "initModifyPerson.action?fromId="+fromId;
	$('perManagerForm').submit();
}

function groupSubmit(){
	$('addgroupForm').action = "initSearchPerson.action?fromId=groupAdd"
	$('addgroupForm').submit();
	
}
