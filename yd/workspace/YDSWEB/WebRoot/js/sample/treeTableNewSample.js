/*
 * @(#)TreeTableNew.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: SAMPLE
 */
/**
 * @fileoverview 多级树表格演示JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/12/08
 */

/**
 * 画面初期化.
 */
function init() {
	// 使用ajax加载
	TreeTableX.AjaxLoadData('treeTableNewfindAuthorLst.action', initTable);
}

function initTable(data) {
	var param = {};
	// 目标容器
	param.dest = 'dest';
	
	// 整体大小
	param.size = {
		width: 400,
		height: 400
	};
	
	// 总层数
	param.totalLevel = 3;
	
	// 表头各列名及宽度(可选)
	//param.headWidth = {
	//	'编号': 70,
	//	'姓名': 70,
	//	'书名': 130,
	//	'价格': 50,
	//	'ISBN': 80
	//};
	
	// 一级各列宽度
	param.lv1Width = {
		'authorId': 70,
		'authorName': 70,
		'authorBooks': 240
	};
	
	// 一级各列附加CSS
	param.lv1Class = {
		'authorId': 'text_center',
		'authorName': 'text_indent_8',
		'authorBooks': 'text_right font_simsun'
	};
	
	// 二级各列宽度
	param.lv2Width = {
		'bookName': 120,
		'bookPrice': 50,
		// 使用不存在的列来制造空白
		'blank1':5,
		'bookIsbn': 55,
		'bookStores': 80
	};
	
	// 二级各列附加CSS
	param.lv2Class = {
		'bookName': 'text_indent_8',
		'bookPrice': 'text_right font_simsun',
		// 不要边框
		'blank1':'bd_l_trans1',
		'bookIsbn': 'text_center font_simsun',
		'bookStores': 'text_right'
	};
	
	param.lv3Width = {
		'storeName': 110,
		'storeCount': 80
	}
	param.lv3Class = {
		'storeName': 'text_indent_8',
		'storeCount': 'text_right font_simsun'
	}
	
	// 使用ajax加载第二级数据
	param.ajax = {
		// 注意参数传递方式
		lv2: 'treeTableNewfindBookLst.action?authorId=#{authorId}',
		lv3: 'treeTableNewfindStoreLst.action?bookIsbn=#{bookIsbn}'
	}
	
	// 子列表名称(使用ajax时不需要)
	//param.lv2Name = "bookList";
	//param.lv3Name = "storeList";
	
	// 缩进
	param.lv2Indent = 70;
	param.lv3Indent = 120;
		
	var myTreeTable = new TreeTableX(param, data);
}
