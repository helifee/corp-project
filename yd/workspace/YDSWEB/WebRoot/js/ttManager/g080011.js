/*
 * @(#)g080011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理
 */
//全局变量
var g_struct = [];
var g_tree = null;
var nowLine;
var editFlag = {
	off: 0, //非编辑中
	createRoot: 1, //新建一级类别
	createChild: 2, //新建子类别
	modify: 3, // 修改
	del: 4, // 删除类别
	undo: 5 // 取消删除
};
var categoryStatus = {
	normal: 0, // 正常
	deleted: 1, // 待删除
	refined: 2 // 已细化
};

var sysStatus = {
	normal: 0, // 正常
	maintaining: 1 // 维护中
};
var refinedText = '（已细化）';
var deletedText = '（待删除）';
var changFlag; // 区分编辑标识
var editAuthority = {
	readOnly: 0,
	editable: 1
};

/**
 * tab选择
 */
function nTabs(thisObj, Num){
    if (thisObj.className == "active") 
        return;
    var tabObj = thisObj.parentNode.id;
    var tabList = $(tabObj).select('li');
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            if (i == tabList.length - 1) {
                thisObj.className = 'active bd_r_1sccc';
            }
            else {
                thisObj.className = 'active';
            }
            $('tab' + i).setStyle({
                display: 'block'
            });
        }
        else {
            if (i == tabList.length - 1) {
                tabList[i].className = 'normal bd_r_1sccc';
            }
            else {
                tabList[i].className = 'normal';
            }
            $('tab' + i).setStyle({
                display: 'none'
            });
        }
    }
}

/**
 * 画面onload.
 */
function initMain() {
	
	initCategory($('tab').select('li')[0], 0);
	
	tafelTreeInit();
	
}

/**
 * 开始维护.
 */
function startMaint(){
	
	if (confirm(getMessage('js.tt.warn.GLW12'))){
		var url = 'g080011StartMaintaining.action';
		var params = 'submitFlag=1';
		params = addStamp(params);
		
		showLoader();
		
		var request = new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onComplete: startMaintBack
		});
	}
}

/**
 * 结束维护.
 */
function stopMaint(){
	
	if (confirm(getMessage('js.tt.warn.GLW14'))){
		var url = 'g080011StopMaintaining.action';
		var params = 'submitFlag=1';
		params = addStamp(params);
		
		showLoader();
		
		var request = new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onComplete: stopMaintBack
		});
	}
}

/**
 * 开始维护Callback.
 */
function startMaintBack(response){
	
	if (response.getHeader('Content-Type').startsWith('text/html')) {
		document.write(response.responseText);
		
	} else {
		if (response.responseText == 'success'){
			
			$('resetForm').submit();
		} else {
			hideLoader();
			if (response.responseText.startsWith('error')) {
		
				// 若响应文本是错误信息，则重新跳转到错误画面
				var url = 'g080011ToErrorPage.action';
				var params = 'errorMessage=' + response.responseText.substring(5);
				
				new Ajax.Request(url, {
					method: 'get',
					parameters: params,
					onSuccess: startMaintBack
				});
			} else if (response.responseText.startsWith('login')) {
				window.location.href = '../../login.jsp';
			} else if (confirm(response.responseText)) {
				var url = 'g080011StartMaintaining.action';
				var params = 'submitFlag=2';
				params = addStamp(params);
				showLoader();
				var request = new Ajax.Request(url, {
					method: 'get',
					parameters: params,
					onComplete: startMaintBack
				});
			}
		}
		
		
	}
	
	
}

/**
 * 停止维护Callback.
 */
function stopMaintBack(response){
	
	if (response.getHeader('Content-Type').startsWith('text/html')) {
		document.write(response.responseText);
		
	} else {
		if (response.responseText == 'success'){
			$('resetForm').submit();
		} else {
			
			hideLoader();
			
			if (response.responseText.startsWith('error')) {
		
				// 若响应文本是错误信息，则重新跳转到错误画面
				var url = 'g080011ToErrorPage.action';
				var params = 'errorMessage=' + response.responseText.substring(5);
				
				new Ajax.Request(url, {
					method: 'get',
					parameters: params,
					onSuccess: stopMaintBack
				});
			} else if (response.responseText.startsWith('login')) {
				window.location.href = '../../login.jsp';
			}  else if (confirm(response.responseText)){
				var url = 'g080011StopMaintaining.action';
				var params = 'submitFlag=2';
				params = addStamp(params);
				
				showLoader();
				
				var request = new Ajax.Request(url, {
					method: 'get',
					parameters: params,
					onComplete: stopMaintBack
				});
			}
		}
		
		
	}
}

/**
 * 类别表设置tab初始化.
 */
function initCategory(thisObj, Num){
	if (changFlag > 0 && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	changFlag = 0;
	initValidation('categoryEditForm');
	nTabs(thisObj, Num);
	$('editFlag').value = editFlag.off;
	$('updateCount').value = new Date().getTime();
	$('changeStatus').value = categoryStatus.normal;
	initButton();
	document.observe("click", function(event) {
		var e = event || window.event;
		var elem = e.srcElement || e.target;
		
		if (g_tree == null){
			return;
		}
		
		// 若触发元素不支持descendantOf则返回
		if (elem.descendantOf == null || elem.descendantOf == 'undifined'){
			return;
		}
		
		// 保留节点选择状态
		if (elem.descendantOf('categoryTree') ||
		$F('editFlag') == editFlag.createChild ||
		$F('editFlag') == editFlag.modify) {
			if (!$F('selectedBranch').empty()) {
				var branch = g_tree.getBranchById($F('selectedBranch'));
				branch.select();
			}
			return;
		}
		
		if ($F('editFlag') == editFlag.del || $F('editFlag') == editFlag.undo) {
			$('editFlag').value = editFlag.off;
			return;
		}
		
		g_tree.unselect();
		
		$('selectedBranch').clear();
		// 初期化编辑按钮
		initButton();
		
		// 不整合数据统计列表取得
		var url = 'g080011GetUnconformity.action';
		var params = 'updateCount=' + $F('updateCount');
		new Ajax.Updater('div_unconformityList', url, {
			method: 'get',
			parameters: params,
			onComplete: errorPageAccess
		});
	});
	
}

/**
 * 区分表设置tab初始化.
 */
function initDiff(thisObj, Num){
	
	if (!$F('categoryName').empty() && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	$('categoryName').clear();
	document.stopObserving('click');
	nTabs(thisObj, Num);
	$('div_diffEdit').hide();
	changFlag = 0;
	
}

/**
 * 不整合数据tab初始化.
 */
function initUnconfData(thisObj, Num){
	
	if (!$F('categoryName').empty() && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	$('categoryName').clear();
	if (changFlag > 0 && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	changFlag = 0;
	document.stopObserving('click');
	nTabs(thisObj, Num);
	
	// 不整合数据统计列表取得
	var url = 'g080011GetUnconformityData.action';
	var params = 'updateCount=' + $F('updateCount');
	
	showLoader();
	
	new Ajax.Updater('div_unconfData_list', url, {
		method: 'get',
		parameters: params,
		onComplete : function(response) {
			var flg = checkException(response);
			
			if (!flg){
				hideLoader();
			}
		}
	});
	
	
}

/**
 * 编辑按钮初始化.
 */
function initButton() {
	
	$('createRootBtn').disable();
	
	if ($F('systemStatus') == sysStatus.normal){
		$('startMaintBtn').show();
		$('stopMaintBtn').hide();
	} else {
		if ($F('editAutority') == editAuthority.editable){
			$('createRootBtn').enable();
		}
		$('startMaintBtn').hide();
		$('stopMaintBtn').show();
	}
	$('createChildBtn').disable();
	$('modifyBtn').disable();
	$('deleteBtn').disable();
	$('undoBtn').disable();
	if ($F('editFlag') != editFlag.createRoot) {
		$('categoryName').disable();
		$('dataSubmitBtn').disable();
		$('categoryName').clear();
		
	}
}

/**
 * 树初始化
 */
function tafelTreeInit() {
	var url = 'g080011InitTree.action';
	var params = '';
	params = addStamp(params);
	
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: tafelTreeInitBack,
		asynchronous: true
	});
}

/**
 * 页面初始callback函数
 * @param {Object} json 返回的json数据
 */
function tafelTreeInitBack(json) {

	if (json.getHeader('Content-Type').startsWith('text/html')) {
		document.write(json.responseText);
		return;
	}
	
	if (json.responseJSON != null) {
		g_struct = json.responseJSON.tree;
	}
	//tree初始化
	if (!g_tree) {
		g_tree = new TafelTree('categoryTree', g_struct, {
			'generate': true, //指定树是否一步步生成
			'imgBase': '../../js/tafelTree/imgs/', //位图的位置
			'width': 'auto', //宽度
			'height': 'auto', //高度
			'openAtLoad': false, //指定load后结点是否打开
			'cookies': false, //是否使用cookies
			//'openOneAtOnce' : true,					//是否只打开一次
			'checkboxesThreeState': false, //是否使用三态checkbox
			'defaultImg': 'page.gif', //默认位图
			'defaultImgOpen': 'folderopen.gif', //默认打开位图
			'defaultImgClose': 'folder.gif', //默认关闭位图
			'defaultImgSelected': 'globe.gif', //默认被选择的位图
			'defaultImgOpenSelected': 'imgfolder.gif', //默认打开的且选择的结点位图
			'defaultImgCloseSelected': 'base.gif', //默认关闭的且选择的结点位图
			'onClick': itemOnClick
		});
		
		// 待删除的节点加红色
		var deletedBranches = g_tree.getBranches(deleted);
		for (var i = 0; i < deletedBranches.length; i++) {
 
			deletedBranches[i].addClass('color_red');
		 
		}
		
		// 已细化的节点加橙色
		var refinedBranches = g_tree.getBranches(refined);
		for (var i = 0; i < refinedBranches.length; i++) {
 
			refinedBranches[i].addClass('color_orange');
		 
		}

	}
}

/**
 * 待删除节点取得过滤器
 * @param {Object} branch 结点
 */
function deleted(branch){
	if (getBranchStatus(branch) == categoryStatus.deleted) {
		return true;
	}
	
	return false;
}

/**
 * 已细化节点取得过滤器
 * @param {Object} branch 结点
 */
function refined(branch){
	if (getBranchStatus(branch) == categoryStatus.refined) {
		return true;
	}
	
	return false;
}

/**
 * 节点点击处理
 * @param {Object} branch 点击的结点
 */
function itemOnClick(branch) {

	// 确认是否放弃当前编辑，如果有当前编辑的话
	if ($F('editFlag') != editFlag.createRoot) {
		if ($F('selectedBranch') == branch.getId()) {
			return;
		}
		if (!$F('categoryName').empty() && !confirm(getMessage('js.tt.warn.KSW13'))) {
			var selectedBranch = g_tree.getBranchById($F('selectedBranch'));
			selectedBranch.select();
			return;
		}
		
		$('editFlag').value = editFlag.off;
	}
	
	// 还原按钮为初始化状态
	initButton();
	
	
	
	// 取得当前节点状态
	var categorySta = getBranchStatus(branch);
	// 取得节点层级
	var branchLevel = branch.getLevel();
	
	// 保存当前选择节点
	$('selectedBranch').value = branch.getId();
	
	// 点击节点的不整合统计列表取得
	var url = 'g080011GetUnconformity.action';
	var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
	'updateCount=' +
	$F('updateCount')
	new Ajax.Updater('div_unconformityList', url, {
		method: 'get',
		parameters: params,
		onComplete: errorPageAccess
	});
	
	if ($F('editAutority') == editAuthority.readOnly) {
		return;
	}
	
	if (categorySta == categoryStatus.deleted) {
	
		// 父节点状态为待删除时，不能取消删除
		if (!(branch.getParent() != null && getBranchStatus(branch.getParent()) == categoryStatus.deleted)) {
			$('undoBtn').enable();
		}
		
	} else {
		$('modifyBtn').enable();
		
		// 非底层节点可以创建子节点
		if (branchLevel < 2) {
			$('createChildBtn').enable();
		}
		
		// 只有叶子节点可以被删除
		if (!hasChildren(branch)) {
			$('deleteBtn').enable();
		}
	}
	
}

/**
 * 新建一级类别
 */
function createRoot() {

	if (!isNecessaryToContinue(editFlag.createRoot)) {
		return;
	}
	
	// 初期化按钮
	initButton();
	
	// 设置编辑标识
	$('editFlag').value = editFlag.createRoot;
	
	// 初始化编辑领域
	enableEditField();
	
}

/**
 * 新建子类别
 */
function createChild() {

	if (!isNecessaryToContinue(editFlag.createChild)) {
		return;
	}
	
	// 设置编辑标识
	$('editFlag').value = editFlag.createChild;
	
	// 初始化编辑领域
	enableEditField();
}

/**
 * 修改
 */
function modify() {

	if (!isNecessaryToContinue(editFlag.modify)) {
		return;
	}
	
	// 设置编辑标识
	$('editFlag').value = editFlag.modify;
	
	// 初始化编辑领域
	enableEditField();
	
	var branch = g_tree.getBranchById($F('selectedBranch'));
	var branchText = branch.getText();
	if (getBranchStatus(branch) == categoryStatus.refined){
		branchText = branchText.replace(refinedText,'')
	}
	$('categoryName').value = branchText;
}

/**
 * 删除类别
 */
function deleteCategory(response) {

	// 保持节点选择状态
	var branch = g_tree.getBranchById($F('selectedBranch'));
	branch.select();
	
	if ($F('editFlag') != editFlag.off &&
	!$F('categoryName').empty() &&
	!confirm(getMessage('js.tt.warn.KSW11'))) {
		return;
	}
	
	// 设置编辑标识
	$('editFlag').value = editFlag.del;
	
	var url = 'g080011DeleteCategory.action';
	var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
					'submitFlag=1';
	params = addStamp(params);
	
	new Ajax.Request(url, {
		method: 'get',
		parameters: params,
		onSuccess: deleteCategoryBack
	});
	
	
	
}

/**
 * 取消删除
 */
function undo() {

	// 保持节点选择状态
	var branch = g_tree.getBranchById($F('selectedBranch'));
	branch.select();
	
	// 设置编辑标识
	$('editFlag').value = editFlag.undo;
	
	var url = 'g080011DeleteCategoryUndo.action';
	var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
					'submitFlag=1';
	params = addStamp(params);
	
	new Ajax.Request(url, {
		method: 'get',
		parameters: params,
		onSuccess: undoBack
	});

}

/**
 * 确定
 */
function dataSubmit() {

	// 分类名称输入校验
	if(!categoryNameValidate()){
		return;
	}
	
	if ($('editFlag').value == editFlag.createRoot) {
		var url = 'g080011createRootCategory.action';
		var params = 'categoryInfo.categoryName=' + encodeURI($F('categoryName'));
		params = addStamp(params);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: createRootBack
		});
	} else if ($('editFlag').value == editFlag.createChild) {
		var url = 'g080011CreateChildCategory.action';
		var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
		'categoryInfo.categoryName=' +
		encodeURI($F('categoryName')) +
		'&' +
		'categoryInfo.categoryStatus=2' +
		'&' +
		'submitFlag=1';
		params = addStamp(params);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: createChildBack
		});
	} else if ($('editFlag').value == editFlag.modify) {
		var url = 'g080011ModifyCategory.action';
		var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
		'categoryInfo.categoryName=' +
		encodeURI($F('categoryName'));
		params = addStamp(params);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: modifyBack
		});
	}
}

/**
 * 新建子类别Callback
 */
function createChildBack(response) {


	if (response.getHeader('Content-Type').startsWith('text/html')) {
	
		// 响应文件为错误画面时，把当前页面替换为错误画面
		if (response.responseText.indexOf('<html>') != -1) {
			document.write(response.responseText);
		} else {
			
			// 响应文件为不整合统计子画面时，把返回内容写入不整合统计div
			$('div_unconformityList').innerHTML = response.responseText;
			
			// 在画面上做新建子类别处理
			var branch = g_tree.getBranchById($F('selectedBranch'));
			var item = {
				'id': $F('newChildId'),
				'txt': $F('categoryName')
			};
			branch.insertIntoLast(item);
			
			if ($F('changeStatus') == categoryStatus.refined) {
				branch.setText(branch.getText() + refinedText);
				branch.changeId(branch.getId().split('_')[0] + '_' + categoryStatus.refined);
				branch.addClass('color_orange');
			}
			
			$('selectedBranch').value = branch.getId();
			$('editFlag').value = editFlag.off;
			$('categoryName').disable();
			$('dataSubmitBtn').disable();
			$('deleteBtn').disable();
			$('categoryName').clear();
			$('updateCount').value = $('updateCount').value + 1;
			
			showOpTip(getMessage('js.tt.info.GTT02'));
		}
		
	} else {
	
		if (response.responseText.startsWith('error')) {
		
			// 若响应文本是错误信息，则重新跳转到错误画面
			var url = 'g080011ToErrorPage.action';
			var params = 'errorMessage=' + response.responseText.substring(5);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: createChildBack
			});
		} else if (response.responseText.startsWith('login')) {
				window.location.href = '../../login.jsp';
		} else if (confirm(getMessage('js.tt.warn.GLW05', response.responseText))) {
		
			// 选择节点在建立子节点后状态为“已细化”
			$('changeStatus').value = categoryStatus.refined;
			
			// 若响应文本是警告信息，弹出警告信息，确定后重新提交创建子类别申请
			var url = 'g080011CreateChildCategory.action';
			var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
			'categoryInfo.categoryName=' +
			encodeURI($F('categoryName')) +
			'&' +
			'categoryInfo.categoryStatus=2' +
			'&' +
			'submitFlag=2';
			params = addStamp(params);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: createChildBack
			});
			return;
			
		}
		
	}
	$('changeStatus').value = categoryStatus.normal;
}

/**
 * 修改类别Callback
 */
function modifyBack(response) {


	if (response.getHeader('Content-Type').startsWith('text/html')) {
	
		document.write(response.responseText);
	}if (response.responseText.startsWith('error')) {
		
		// 若响应文本是错误信息，则重新跳转到错误画面
		var url = 'g080011ToErrorPage.action';
		var params = 'errorMessage=' + response.responseText.substring(5);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: deleteCategoryBack
		});
	} else if (response.responseText.startsWith('login')) {
		window.location.href = '../../login.jsp';
	}  else {
	
		var branch = g_tree.getBranchById($F('selectedBranch'));
		var branchText = $F('categoryName');
		if (getBranchStatus(branch) == categoryStatus.refined){
			branchText = branchText + refinedText;
		}
	
		branch.setText(branchText);
			
		$('editFlag').value = editFlag.off;
		$('categoryName').disable();
		$('dataSubmitBtn').disable();
		$('categoryName').clear();
		
		showOpTip(getMessage('js.tt.info.GTT02'));
	}
}

/**
 * 删除类别Callback
 */
function deleteCategoryBack(response) {


	if (response.getHeader('Content-Type').startsWith('text/html')) {
	
		// 响应文件为错误画面时，把当前页面替换为错误画面
		if (response.responseText.indexOf('<html>') != -1) {
			document.write(response.responseText);
		} else {
			// 响应文件为不整合统计子画面时，把返回内容写入不整合统计div
			$('div_unconformityList').innerHTML = response.responseText;
			
			// 在画面上做删除处理
			var branch = g_tree.getBranchById($F('selectedBranch'));
			branch.setText(branch.getText() + deletedText);
			branch.changeId(branch.getId().split('_')[0] + '_' + categoryStatus.deleted);
			branch.addClass('color_red');
			
			var parentBranch = branch.getParent();
			
			if (parentBranch != null && getBranchStatus(parentBranch) == categoryStatus.refined && !hasChildren(parentBranch)) {
				parentBranch.setText(parentBranch.getText().replace(refinedText,''));
				parentBranch.changeId(parentBranch.getId().split('_')[0] + '_' + categoryStatus.normal);
				parentBranch.removeClass('color_orange');
			}
			
			$('selectedBranch').value = branch.getId();
			$('createChildBtn').disable();
			$('modifyBtn').disable();
			$('deleteBtn').disable();
			$('undoBtn').enable();
			$('categoryName').disable();
			$('dataSubmitBtn').disable();
			$('categoryName').clear();
			
			$('updateCount').value = $('updateCount').value + 1;
			
			showOpTip(getMessage('js.tt.info.GTT02'));
		}
		
	} else {
	
		if (response.responseText.startsWith('error')) {
		
			// 若响应文本是错误信息，则重新跳转到错误画面
			var url = 'g080011ToErrorPage.action';
			var params = 'errorMessage=' + response.responseText.substring(5);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: deleteCategoryBack
			});
		} else if (response.responseText.startsWith('login')) {
				window.location.href = '../../login.jsp';
		} else if (confirm(getMessage('js.tt.warn.GLW05', response.responseText))) {
		
			// 若响应文本是警告信息，弹出警告信息，确定后重新提交删除申请
			var url = 'g080011DeleteCategory.action';
			var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
			'categoryInfo.categoryStatus=1' +
			'&' +
			'submitFlag=2';
			params = addStamp(params);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: deleteCategoryBack
			});
			
		}
		
	}
	
}

/**
 * 取消删除Callback
 */
function undoBack(response) {


	if (response.getHeader('Content-Type').startsWith('text/html')) {
	
		// 响应文件为错误画面时，把当前页面替换为错误画面
		if (response.responseText.indexOf('<html>') != -1) {
			document.write(response.responseText);
		} else {
			// 响应文件为不整合统计子画面时，把返回内容写入不整合统计div
			$('div_unconformityList').innerHTML = response.responseText;
			
			// 在画面上做取消删除处理
			var branch = g_tree.getBranchById($F('selectedBranch'));
			
			branch.setText(branch.getText().replace(deletedText,''));
			branch.changeId(branch.getId().split('_')[0] + '_' + categoryStatus.normal);
			branch.removeClass('color_red');
			
			if ($F('changeStatus') == categoryStatus.refined) {
				var parentBranch = branch.getParent();
				parentBranch.setText(parentBranch.getText() + refinedText);
				parentBranch.changeId(parentBranch.getId().split('_')[0] + '_' + categoryStatus.refined);
				parentBranch.addClass('color_orange');
			}
			$('selectedBranch').value = branch.getId();
			
			if (branch.getLevel() < 2){
				$('createChildBtn').enable();
			}
			
			$('modifyBtn').enable();
			$('deleteBtn').enable();
			$('undoBtn').disable();
			$('categoryName').disable();
			$('dataSubmitBtn').disable();
			$('categoryName').clear();
			
			$('updateCount').value = $('updateCount').value + 1;
			
			showOpTip(getMessage('js.tt.info.GTT02'));
		}
		
	} else {
	
		if (response.responseText.startsWith('error')) {
		
			// 若响应文本是错误信息，则重新跳转到错误画面
			var url = 'g080011ToErrorPage.action';
			var params = 'errorMessage=' + response.responseText.substring(5);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: undoBack
			});
		} else if (response.responseText.startsWith('login')) {
				window.location.href = '../../login.jsp';
		} else if (confirm(getMessage('js.tt.warn.GLW05', response.responseText))) {
		
			// 选择节点的父节点在子节点取消删除后状态为“已细化”
			$('changeStatus').value = categoryStatus.refined;
			
			// 若响应文本是警告信息，弹出警告信息，确定后重新提交取消删除申请
			var url = 'g080011DeleteCategoryUndo.action';
			var params = 'categoryInfo.categoryId=' + $F('selectedBranch') + '&' +
							'submitFlag=2';
			params = addStamp(params);
			
			new Ajax.Request(url, {
				method: 'get',
				parameters: params,
				onSuccess: undoBack
			});
			return;
		}
		
	}
	$('changeStatus').value = categoryStatus.normal;
	
}

/**
 * 新建一级类别Callback
 */
function createRootBack(response) {

	if (!response.getHeader('Content-Type').startsWith('text/plain')) {
		document.write(response.responseText);
		return;
	}
	
	if (response.responseText.startsWith('error')) {
		
		// 若响应文本是错误信息，则重新跳转到错误画面
		var url = 'g080011ToErrorPage.action';
		var params = 'errorMessage=' + response.responseText.substring(5);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: undoBack
		});
		return;
	} else if (response.responseText.startsWith('login')) {
			window.location.href = '../../login.jsp';
			return;
	}
	
	if (g_tree != null && g_tree.countBranches() > 0) {
	
		var strArray = response.responseText.split('&');
		
		var newBranchId = strArray[0];
		var lastBranch = g_tree.getBranchById(strArray[1]);
		
		var item = {
			'id': newBranchId,
			'txt': $F('categoryName')
		};
		
		lastBranch.insertAfter(item);
	} else {
		var item = {
			'id': response.responseText,
			'txt': $F('categoryName')
		};
		
		g_struct = [item];
		
		g_tree = new TafelTree('categoryTree', g_struct, {
			'generate': true, //指定树是否一步步生成
			'imgBase': '../../js/tafelTree/imgs/', //位图的位置
			'width': 'auto', //宽度
			'height': 'auto', //高度
			'openAtLoad': false, //指定load后结点是否打开
			'cookies': false, //是否使用cookies
			//'openOneAtOnce' : true,					//是否只打开一次
			'checkboxesThreeState': false, //是否使用三态checkbox
			'defaultImg': 'page.gif', //默认位图
			'defaultImgOpen': 'folderopen.gif', //默认打开位图
			'defaultImgClose': 'folder.gif', //默认关闭位图
			'defaultImgSelected': 'globe.gif', //默认被选择的位图
			'defaultImgOpenSelected': 'imgfolder.gif', //默认打开的且选择的结点位图
			'defaultImgCloseSelected': 'base.gif', //默认关闭的且选择的结点位图
			'onClick': itemOnClick
		});
		
	}
	
	$('editFlag').value = editFlag.off;
	
	// 初始化编辑领域
	initButton();
	
	showOpTip(getMessage('js.tt.info.GTT02'));
}

/**
 * 局部刷新错误画面返回处理
 * @param  响应信息
 */
function errorPageAccess(response){
	
	if (response.getHeader('Content-Type').startsWith('text/html')) {
	
		// 响应文件为错误画面时，把当前页面替换为错误画面
		if (response.responseText.indexOf('<html>') != -1) {
			document.write(response.responseText);
		}
	}
}

/**
 * 节点状态取得
 * @param {Object} branch 节点
 * @return {Object} 节点状态
 */
function getBranchStatus(branch) {
	var strArray = branch.getId().split('_');
	return strArray[1];
}

/**
 * 是否有子节点
 * @param {Object} branch
 * @return {boolean} true/false
 */
function hasChildren(branch) {
	if (branch.hasChildren()) {
		var children = branch.getChildren();
		
		for (var i = 0; i < children.length; i++) {
		
			if (getBranchStatus(children[i]) != categoryStatus.deleted) {
			
				return true;
			}
		}
		
	}
	
	return false;
}

/**
 * 是否继续处理
 * @param {int} 编辑标识
 * @return {boolean} true/false
 */
function isNecessaryToContinue(flag) {

	if ($F('editFlag') == flag ||
	($F('editFlag') != editFlag.off &&
	!$F('categoryName').empty() &&
	!confirm(getMessage('js.tt.warn.KSW13')))) {
		return false;
	}
	
	return true;
}

/**
 * 使编辑领域可用
 */
function enableEditField() {

	$('categoryName').enable();
	$('dataSubmitBtn').enable();
	$('categoryName').clear();
}

/**
 * 类别名称输入校验.
 * @return Boolean true:false.
 */
function categoryNameValidate() {

	form = $('categoryEditForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	//非空校验
	if (form.elements['categoryName']) {
		field = form.elements['categoryName'];
		if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0)) {
			
			addFieldError('categoryName', getMessage('js.com.warning.0001', '类别名称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('categoryName').focus();
		return false;
	}
}

/**
 * 查看/编辑.
 */
function getDiffDetails(typeId, typeName){
	
	if (changFlag > 0 && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	
	// 区分详细取得
	var url = 'g080011GetDiffDetails.action';
	var params = 'typeId=' + typeId + '&' +
				'typeName=' + typeName + '&' +
				'editAutority=' + $F('editAutority');
	params = addStamp(params);
	
	new Ajax.Updater('div_diffEdit', url, {
		method: 'get',
		parameters: params,
		onComplete:getDiffDetailsBack
	});
	
}

/**
 * 查看/编辑CallBack.
 */
function getDiffDetailsBack(response){
	
	if (response.responseText.indexOf('<html>') != -1) {
		document.write(response.responseText);
	} else {
		Event.observe('table_diffItem', 'click', function(event) {
			
			if (event.element().match('input[type="button"]')){
				event.element().up(1).remove();
				changFlag = changFlag + 1;
			} else{
				if (nowLine != null) nowLine.removeClassName('hover');
			
				if (event.element().match('input') || event.element().match('label')){
					nowLine = event.element().up(1);
				} else{
					nowLine = event.element().up(0);
				}
				
				if (nowLine.match('tr')){
					nowLine.addClassName('hover');
				}
			}
			
		});
		
		$('div_diffEdit').show();
		initValidation('diffEditForm');
		changFlag = 0;
	}
	
}

/**
 * 区分上移.
 */
function moveDiffUp(){

	if (nowLine == null)return;
	
	var bLine = nowLine.previous(0);

	if(bLine != null){
		bLine.insert({before:nowLine});
		changFlag = changFlag + 1;
	}
}

/**
 * 区分下移.
 */
function moveDiffDown() {
	
	if (nowLine == null) return;
	
	var bLine = nowLine.next(0);
	
	if (bLine != null) {
		bLine.insert({after: nowLine});
		changFlag = changFlag + 1;
	}	
}

/**
 * 添加区分.
 */
function addNewItem() {
	var newLine = new Element('tr');
	var cols1 = new Element('td');
	var cols2 = new Element('td');
	var diffNo = new Element('input',{'name':'diffNo','type':'hidden'});
	var diffName = new Element('input',{'name':'diffName','type':'text','maxlength':'100'});
	var deleteBtn = new Element('input',{'class':'span-2 btn','type':'button','value':'删除'});
	diffName.observe('change',function(event) {changFlag = changFlag + 1;});

	registValidate(diffName);
	
	cols1.insert(diffNo);
	cols1.insert(diffName);
	cols2.insert(deleteBtn);
	newLine.insert(cols1);
	newLine.insert(cols2);
	
	$('table_diffItem').down(0).insert({bottom:newLine});
	
	initValidation('diffEditForm');
	
	changFlag = changFlag + 1;
}

/**
 * 退出区分编辑.
 */
function quitEdit(){
	if (changFlag > 0 && !confirm(getMessage('js.tt.warn.KSW13'))){
		return;
	}
	$('div_diffEdit').hide();
	changFlag = 0;
}	

/**
 * 保存.
 */
function save(){
	
	if (changFlag == 0){
		return;
	}
	
	if (!diffNameValidate()){
		return;
	}
	
	// 提交区分信息
    var url = "g080011SaveDiff";
    var pars = $('diffEditForm').serialize();
    new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: saveBack
    });
}	

/**
 * 保存Callback
 */
function saveBack(response){
	if (response.getHeader('Content-Type').startsWith('text/html')) {
		document.write(response.responseText);
	} else if (response.responseText.startsWith('error')) {
		
		// 若响应文本是错误信息，则重新跳转到错误画面
		var url = 'g080011ToErrorPage.action';
		var params = 'errorMessage=' + response.responseText.substring(5);
		
		new Ajax.Request(url, {
			method: 'get',
			parameters: params,
			onSuccess: saveBack
		});
		return;
	} else if (response.responseText.startsWith('login')) {
		window.location.href = '../../login.jsp';
		return;
	} else {
		showOpTip(getMessage('js.tt.info.GTT02'));
		$('div_diffEdit').hide();
		changFlag = 0;
	}
}

/**
 * 分页时使用的ajax提交函数.
 */	
function pagerCommonTag(pageUrl , pageNumber){
   var url = pageUrl;
   var pars = 'pageNumber=' + pageNumber;
   pars = addStamp(pars);
   //再次将form表单序列化传给action
   new Ajax.Updater('div_unconfData_list', url , {  
       parameters: pars,  
	   onLoading : function() {},
	   onSuccess : function(response) {},
	   onComplete : function(request) {
	   
	   }
   });	
}

/**
 * 类别名称输入校验.
 * @return Boolean true:false.
 */
function categoryNameValidate() {

	form = $('categoryEditForm');
	var continueValidation = true;
	//类别名称必须入力校验
	if (form.elements['categoryName']) {
		field = form.elements['categoryName'];
		if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0)) {
			addFieldError('categoryName', getMessage('js.com.warning.0001', '类别名称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('categoryName').focus();
		return false;
	}
}
	
/**
 * 区分名称输入校验.
 * @return Boolean true:false.
 */
function diffNameValidate() {

	var diffNames = $('table_diffItem').select('input[type="text"]');
	var continueValidation = true;// 校验状态标记
	
	for (var i = 0;i < diffNames.length; i++){
		if (diffNames[i].value != null && (diffNames[i].value == "" || diffNames[i].value.replace(/^\s+|\s+$/g, "").length == 0)) {
			addFieldError(diffNames[i], getMessage('js.com.warning.0001', '区分名称'));
			continueValidation = false;
			break;
		} else if ($('typeId').value == 'E02'){
			if (diffNames[i].value.include(',')){
				var diffNameValues = diffNames[i].value.strip().split(',');
				if (diffNameValues != null && diffNameValues.length == 10 && diffNameValues.without('').length == 10 && diffNameValues.uniq().length == 10){
					continue;
				}
			}
			
			addFieldError(diffNames[i], getMessage('js.com.warning.0002', '区分名称'));
			continueValidation = false;
			break;
			
		} else if ($('typeId').value == 'E03'){
			if (diffNames[i].value.include('/')){
				var diffNameValues = diffNames[i].value.strip().split('/');
				if (diffNameValues != null &&diffNameValues.length == 2 && diffNameValues.without('').length == 2 && diffNameValues.uniq().length == 2){
					continue;
				}
			}
			
			addFieldError(diffNames[i], getMessage('js.com.warning.0002', '区分名称'));
			continueValidation = false;
			break;
			
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		diffNames[i].focus();
		return false;
	}
}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

