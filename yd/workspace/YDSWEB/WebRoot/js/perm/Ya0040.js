/*
 * @(#)Ya0040.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 用户角色管理画面JavaScript.
 *
 * @author yuchenglin
 * @version 1.0
 */

/**
 * 用户ID.
 */
var g_userId;

/**
 * 用户名.
 */
var g_userName;

/**
 * 人员类（弹出的员工选择画面取得本页面传递的人员数组用）
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 初期化.
 */
function initForm(){

	new JsNameFilter('userId', 'userNm', window['g_basePath']); 
	
	var searchUserConst = 0;

	// 按钮状态设置为不可用
    $('insertUserRole').disable();
	
	// pop员工选择画面
	emp_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'empSelect',
		// *标题内容，可用元素或字符串
		title: '员工选择',
		// *图标的CSS
		icon: 'org_info',
		// *内容元素
		content: $('empSelectPage'),
		// *显示位置，相当与z-index
		position: 9,
		// 是否允许拖动
		drag: true,
		loader: true
	});
	
	// pop用户权限明细画面
	permit_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'permitList',
		// *标题内容，可用元素或字符串
		title: '查看权限',
		// *图标的CSS
		icon: 'org_info',
		// *内容元素
		content: $('permitSelectPage'),
		// *显示位置，相当与z-index
		position: 9,
		// 是否允许拖动
		drag: true,
		loader: true

	});
	
	// 新建角色画面
	role_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my02',
		
		// *标题内容，可用元素或字符串
		title: '角色选择',
		
		// *内容元素
		content: $('div_role_search'),
		
		// *显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		// 是否需要加载动画
		//loader: true
		
		// 关闭后的回调，用于刷新页面等
		afterclose: function(){
			afterClose();
		}
	});

	// 用户角色有效时间修改画面
	time_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my03',
		
		// *标题内容，可用元素或字符串
		title: '有效时间编辑',
		
		// *内容元素
		content: $('div_emp_adv_update'),
		
		// *显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		// 关闭后的回调，用于刷新页面等
		afterclose: function(){
			afterClose();
		}
	});
}

/**
 * 查看角色按钮事件.
 */
function roleSearch(){

    // 输入校验
    if (!checkForm('roleInfoForm')) {
		searchUserRoleByUserId();			
        return;
    }

	// 员工ID和员工姓名有一个为空的时候，新建按钮设置为不可用
	if ($F('userId').empty() || $F('userNm').empty()) {
		$('insertUserRole').disable();	
		return;
	} else {
		// 员工ID和员工姓名都不为空的时候，新建按钮设置为可用
		$('insertUserRole').enable();		
	} 
 
 	// 设置全局变量
 	g_userId = $F('userId');
	g_userName = $F('userNm');
	
    //加载动画
    showLoader();

	var url = 'ya0040FindUserRoleLst.action';
    var pars = $('roleInfoForm').serialize();
    pars = addStamp(pars);
	new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
		onSuccess: function(request){
			hideLoader();
			if (checkException(request)) {
				return;
			}

			$('div_peo_empInfoList').update(request.responseText);
			
			// 在高度达到指定值时出现滚动条
   			listColor('table_peoList', 300);

        }
    });

}

/**
 * 关闭员工选择画面
 * 由弹出的员工选择画面调用
 */
function empSelectPageLoaded() {
	emp_box.loaded();
}

/**
 * 弹出员工选择画面
 * 参数empNum为限定选择的人数，如果不需要限定则不传
 */
function selectUser(){
	// 参数empNum为限定选择的人数，如果不需要限定则不传
	$('empSelectPage').src = '../employee/yb9010Init.action?empNum=1';
	emp_box.Popup();
}

/**
 * 弹出的员工选择画面取得本页面传递的人员数组
 * @return 本页面传递的人员数组
 * ※弹出的员工选择画面会调用
 */
function prepareInitUsers() {
	
	 // 传初始人员
	 var usersPrevious = [];
	 var id = 'YD'+$('userId').value;
	 var name = $('userNm').value;
	 // 初始人员存在则传给人员选择画面
	 if (id && name) {
	 	usersPrevious.push(new User(id, name));
	 }
	 return usersPrevious;

}

/**
 * 取得弹出的员工选择画面所选人员信息
 * @param 人员数组
 * ※弹出的员工选择画面会调用
 */
function display(users) {
	//所选人员
	if (typeof(users) != 'undefined') {
		if (users.length != 0) {
			//所选人员只有一个只取数组里的第一个
			$('userId').value = users[0].id.replace('YD', '');
			$('userNm').value = users[0].name;
			
			//关闭弹出的员工选择画面※
			emp_box.close(0);
		}
	} else {
		alert('请添加名为users的类');
	}
}

/**
 * 弹出查询权限画面
 */
function popUserPermit() {
	
	// 输入校验
    if (!checkForm('roleInfoForm')) {
		searchUserRoleByUserId();
        return;
    }

	var userId = $('userId').value;
	
	$('permitSelectPage').src = 'ya0060GetUserPermInfo.action?userId=' + 'YD' + userId;
	permit_box.popup();
	
}

/**
 * 关闭查询权限画面
 * 由弹出的查询权限画面调用
 */
function permitSelectPageLoaded() {
	permit_box.loaded();
}

function closedPopup() {
	permit_box.close(0);
}

/**
 * 用户角色追加事件.
 */
function newUesrRole() { 

	$('userId').value = g_userId;
	$('userNm').value = g_userName;
	
    var url = 'ya0040FindRoleLst.action';
	pars = addStamp();
    new Ajax.Request(url, {
		method: 'get',
		parameters: pars,
        onSuccess: function(request){
			hideLoader();			
            if (checkException(request)) {
                return;
            }
			
			$('div_role_search').update(request.responseText);
			var perRoleIdInfos = $NN('perRoleIdInfos');
			for(var i=0; i<perRoleIdInfos.length; i++){
				if(perRoleIdInfos[i].checked){
					perRoleIdInfos[i].disabled = true;
				}
			}
			
        }
	})
	role_box.popup();
}

/**
 * 角色新建画面确定按钮事件.
 */
function ok_btn(){
	
    // 输入校验
    if (!checkForm('roleLstForm')) {
        return;
    }
	
	var perRoleIdInfos = $NN('perRoleIdInfos');
	var content = 0;
	for (var i = 0; i < perRoleIdInfos.length; i++) {		
		if (!perRoleIdInfos[i].disabled && perRoleIdInfos[i].checked) {
			content = 1;
			break;
		}
	}
	
	if (content == 0) {
		MsgBox.message(getMessage('js.per.info.0006'));
		return;
	}
	
	
	// 页面提交(新建)
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
		yesNewCreate();
	}, function() {
	}, '是', '否');
	
}

/**
 * 角色新建画面确定按钮事件-具体处理.
 */
function yesNewCreate() {
    var url = 'ya0040InsertRoleLst.action';
    var pars = $('roleLstForm').serialize();
    pars = addStamp(pars);
	new Ajax.Request(url, {
        method: 'post',
        parameters: pars,		
		onSuccess: function(request) {
			checkException(request);
			if (request.responseText.empty()) {
				showOpTip(getMessage('js.com.error.0005'));
			} else {	
							
				// 调用父页面接口  
				role_box.close();  
				showOpTip(getMessage('js.com.info.0008'));
			}
		}
    });
	
}

/**
* 弹出层关闭后的回调，用于刷新页面等
*/
function afterClose(){
	
	var url = 'ya0040FindUserRoleLst.action';
    var pars = 'ya0040CondA.userId=' + g_userId + '&ya0040CondA.userNm=' + g_userName;
    pars = addStamp(pars);
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
            hideLoader();
            if (checkException(request)) {
                return;
            }

			$('div_peo_empInfoList').update(request.responseText);
			// 在高度达到指定值时出现滚动条
   			listColor('table_peoList', 300);
        }
    });	
}

/**
 * 用户角色权限有效时间修改事件.
 */
function permitDataUpdate(ele) {

	$('userId').value = g_userId;
	$('userNm').value = g_userName;
		
	var index;
	// 弹出画面初始化 
	$('popStartTime').clear();
	$('popEndTime').clear();
	$('popIndex').clear();
	$('popUserId').clear();
	$('popPosRoleId').clear();
	$('popStartTime').enable();
	$('popEndTime').enable();
	removeFieldError($('popEndTime'));
	removeFieldError($('popStartTime'));
	
	// 如果来源是修改按钮 需要将画面的内容放到弹出层中
	if (ele != null) {
		index = $(($(ele).up('tr')).cells[0]).innerHTML;
		// 索引设定
		$('popIndex').value = index;

		// 开始日期
		$('popStartTime').value = $('perUserPermitInfoList[' + index + '].permitStaDate').innerHTML;
		// 结束日期
		$('popEndTime').value = $('perUserPermitInfoList[' + index + '].permitEndDate').innerHTML;
		// 用户Id
		$('popUserId').value = $('perUserPermitInfoList[' + index + '].userId').innerHTML;	
		// 权限Id
		$('popPosRoleId').value = $('perUserPermitInfoList[' + index + '].posRoleId').innerHTML;

	} else {
		return;
	}
	
	time_box.popup();
}

/**
 * 有效时间修改画面数据提交事件.
 */
function commitData() {
	
	// 所用参数取得
	var startTime = $('popStartTime').value;
	var endTime = $('popEndTime').value;
	var popUserId = $('popUserId').value;
	var popPosRoleId = $('popPosRoleId').value;

	// 开始日期的判断
	if ('' == startTime.toString()) {
		addFieldError($('popStartTime'), getMessage('js.com.warning.0001','开始日期'));
		return;
	}
	
	if ('' != endTime.toString()) {
		//开始日期和结束日期校验
		if (!compareDate(startTime, endTime)) {
			addFieldError($('popStartTime'), getMessage('js.com.warning.0006'));
			return;
		}
	} else {
		endTime = '9999-12-31';
	}

	// 页面提交(修改有效期间)
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
		// 设置Action
		var url = 'ya0040UpdateTime';
		// 设置参数
		var pars = 'ya0040CondA.userId='+ popUserId + '&ya0040CondA.perRoleId='+ popPosRoleId + '&ya0040CondA.permitStartDate=' + startTime + '&ya0040CondA.permitEndDate=' + endTime;
	    new Ajax.Request(url, {
	        method: 'post',
	        parameters: pars,	
			onSuccess: function(request) {
				checkException(request);
				if (request.responseText.empty()) {
					showOpTip(getMessage('js.com.error.0005'));
				} else {				
						
					// 调用父页面接口  
					time_box.close();  
					showOpTip(getMessage('js.com.info.0009'));

				}
			}
    	});
	}, function() {
	}, '是', '否');

}

/**
 * 比较日期大小
 * @param String 'yyyy-MM-dd'
 * @param String 'yyyy-MM-dd'
 * @return <= true / > false
 */
function compareDate(d12, d22) {
	var d1 = new Date(d12.replace(/\-/g, "\/"));
	var d2 = new Date(d22.replace(/\-/g, "\/"));
	if (d1 > d2) {
	
		return false;
	}
	return true;
}

/**
 * 用户角色权限删除事件.
 */
function deletePermitData(ele) {

	$('userId').value = g_userId;
	$('userNm').value = g_userName;
	
	// 索引取得
	index = $(($(ele).up('tr')).cells[0]).innerHTML;
	
	var temp = new Array(4);
	temp[0] = $('perUserPermitInfoList[' + index + '].userId').innerHTML;	
	temp[1] = $('perUserPermitInfoList[' + index + '].posRoleId').innerHTML;
	temp[2] = $('perUserPermitInfoList[' + index + '].permitStaDate').innerHTML;
	
	// 删除当前所选记录
	MsgBox.confirm(getMessage('js.com.info.0001'), '确认对话框', function() {
		// 设置Action
		var url = 'ya0040DeletePermitData';
		// 设置参数
		var pars = 'ya0040CondA.userId='+temp[0] + '&ya0040CondA.perRoleId='+temp[1] + '&ya0040CondA.permitStartDate=' + temp[2];
	    new Ajax.Request(url, {
	        method: 'post',
	        parameters: pars,	
			onSuccess: function(request) {
				checkException(request);
				if (request.responseText.empty()) {
					showOpTip(getMessage('js.com.error.0005'));
				} else {					
					afterClose();
					showOpTip(getMessage('js.com.info.0010'));
				}
			}
    	});		
		
	}, function() {
	}, '是', '否');
	
}

/**
 * 根据userId检索数据
 */
function searchUserRoleByUserId() {
	
	var url = 'ya0040FindUserRoleList.action';
    pars = addStamp();
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
            hideLoader();			
            if (checkException(request)) {
                return;
            }			
			$('div_peo_empInfoList').update(request.responseText);
			$('insertUserRole').disable();
        }
    });
}

