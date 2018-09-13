/*
 * @(#)Ya0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 职位角色管理画面JavaScript.
 *
 * @author lijinling
 * @version 1.0
 */

/**
 * 职位列表.
 */
var g_posList = new Array;

/**
 * 角色列表.
 */
var g_roleList = new Array;

/**
 * 调整结果列表.
 */
var g_resultList = new Array;

/**
 * 职位角色关系.
 */
var g_posRoleInfo;

/**
 * 初期表示.
 */
function init() {

	// 获取所有职位
	var positions = $NN('position');
	
	// 获取所有角色
	var roles = $NN('roles');
	if (positions == null || roles == null) {
		return;
	}
	
	// 将职位信息存入全局变量中
	for (var i = 0; i < positions.length; i++) {
	
		// 从画面获得职位信息
		var pos = positions[i].value;
		
		// 用逗号分隔信息
		var temp = pos.split(',');
		
		// 新生成职位对象
		var posObject = new Object;
		
		// 第一项为职位ID
		posObject.posId = temp[0];
		
		// 第二项为职位名
		posObject.posName = temp[1];
		
		// 存入职位全局列表
		g_posList.push(posObject);
	}

	// 将角色信息存入全局变量中
	for (var i = 0; i < roles.length; i++) {

		// 从画面获得角色信息
		var role = roles[i].value;

		// 用逗号分隔信息.
		var temp = role.split(',');

		// 新生成角色对象
		var roleObject = new Object;

		// 第一项为角色ID	
		roleObject.roleId = temp[0];

		// 第二项为角色名		
		roleObject.roleName = temp[1];

		// 存入角色全局列表
		g_roleList.push(roleObject);
	}
	
	//初期时提交和取消按钮非活性.
	$('submitBtn').disable();
	
	// 异步向服务器请求职位角色对应关系
	var url = 'ya0010GetPosRoleInfos.action';
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		onComplete: getPosRoleInfosBack,
		onFailure: reportError
	});
}

/**
 * 取得职位角色信息回调函数
 * @param {Object} request
 */
function getPosRoleInfosBack(request) {

	// 将服务器返回的JSON串解析为对象数组
	g_posRoleInfo = request.responseText.evalJSON(true);

	// 根据职位角色关系初始化调整结果列表
	for (var i = 0; i < g_posList.length; i++) {

		// 新生成调整结果对象
		var resultObject = new Object;

		// 调整结果对象的职位ID
		resultObject.posId = g_posList[i].posId;

		// 调整结果对象的职位名
		resultObject.posName = g_posList[i].posName;

		// 调整之前的角色数组
		var beforeChange = new Array;

		// 根据职位ID初始化调整前角色数组
		for (var j = 0; j < g_posRoleInfo.length; j++) {
			if (g_posList[i].posId == g_posRoleInfo[j].posId) {
				beforeChange.push(g_posRoleInfo[j].roleId);
			}
		}

		// 初始化调整之前的角色数组
		resultObject.beforeChange = beforeChange;

		// 初始化调整之后的角色数组
		resultObject.afterChange = beforeChange;

		// 是否已经调整FLAG
		resultObject.changeFlag = false;

		// 将调整结果对象插入到调整结果列表中
		g_resultList.push(resultObject);
	}
}

/**
 * 单击职位事件.
 * @param {Object} obj 单击控件.
 */
function focusPos(obj) {

	//获取职位列表长度
	var posList = $('poslist').childElements();
	
	//重新设置列表背景颜色
	for (var i = 0; i < posList.length; i++) {
		posList[i].removeClassName('bgclr_F1D3FB');
	}

	//设置选中单元格背景颜色	
	Element.extend(obj).addClassName('bgclr_F1D3FB');
	
	//获取所选职位信息
	var Input = $(obj).select('input');

	// 取得所选职位ID
	var posId = Input[0].value.split(',')[0];

	// 将所选职位ID存入隐藏域 
	$('posId').value = posId;
	
	// 设置所选职位对应角色为选中状态
	setRole(posId);
}

/**
 * 在画面中设置职位对应角色.
 * @param {Object} posId 职位ID.
 */
function setRole(posId) {

	//职位所对应角色数组
	var roleIds = getRoles(posId)
	
	//获得所有角色
	var roles = $NN('roles');
	
	//重置角色的状态
	for (var i = 0; i < roles.length; i++) {
		roles[i].checked = false;
		Element.writeAttribute($(roles[i]).up(0),{'flag':'0'});
	}
	
	//设置职位所对应角色为选中状态
	for (var i = 0; i < roles.length; i++) {
		var roleTemp = roles[i].value.split(',')[0];
		for (var j = 0; j < roleIds.length; j++) {
			if (roleTemp == roleIds[j]) {
				roles[i].checked = true;
				Element.writeAttribute(roles[i].up(0),{'flag':'1'});
				break;
			}
		}
	}
}

/**
 * 获取职位对应的角色
 * @param {Object} posId 职位ID
 */
function getRoles(posId) {

	for (var i = 0; i < g_resultList.length; i++) {

		if (g_resultList[i].posId == posId) {

			// 是否已调整
			if (g_resultList[i].changeFlag) {

				//返回调整后的角色数组
				return g_resultList[i].afterChange;
			} else {

				//返回调整前的角色数组
				return g_resultList[i].beforeChange;
			}
		}
	}
}

/**
 * 选中角色事件.
 * @param {Object} obj 单击控件.
 */
function selectRole(obj) {
	
	// 获得职位ID
	var posId = $('posId').value;
	
	// 若之前未选中任何职位
	if (posId == 'default') {

		// 提示用户必须先选择职位
		MsgBox.message(getMessage('js.per.info.0001'));
		return;
	}

	var role = obj.select('input')[0];

	// 如果复选框未选中（0：未选中，1：选中），设为选中
	if (Element.readAttribute(obj,'flag') == '0') {
		Element.writeAttribute(obj,{'flag':'1'});
		role.checked = true;
	} else {
		Element.writeAttribute(obj,{'flag':'0'});
		role.checked = false;
	}
	
	//获得被选中的角色ID
	var roleIds = getCheckedRoleIds();
	
	// 当前职位与调整前相比是否改变
	if (!isChanged(posId, roleIds)) {

		// 删除调整列表对应职位ID的行
		deleteRow(posId);
	} else {

		// 添加新调整的行
		insertRow(posId);
	}
}

/**
 *被选中的复选框.
 */
function getCheckedRoleIds() {

	var RoleIds = new Array;

	// 获取被选中的复选框
	var roles = $NN('roles');

	// 获取被选中的复选框所对应的角色ID
	for (var i = 0; i < roles.length; i++) {
		if (roles[i].checked) {
			RoleIds.push(roles[i].value.split(',')[0]);
		}
	}

	// 返回被选中的角色的ID
	return RoleIds;
}

/**
 * 职位所对应角色是否改变并设置改变后的角色.
 * @param {Object} posId 职位ID.
 * @param {Object} roleIds 角色ID.
 */
function isChanged(posId, roleIds) {

	//遍历职位角色关系，对比职位对应角色是否改变
	for (var i = 0; i < g_resultList.length; i++) {
		if (g_resultList[i].posId == posId) {

			// 将职位对应的角色数组排序然后转换为字符串,对比调整前后角色是否变化
			if (roleIds.sort().toString() == g_resultList[i].beforeChange.sort().toString()) {
				g_resultList[i].afterChange = g_resultList[i].beforeChange;
				g_resultList[i].changeFlag = false;
				return false;
			} else {
				g_resultList[i].afterChange = roleIds;
				g_resultList[i].changeFlag = true;
				return true;
			}
		}
	}
}

/**
 * 添加调整行.
 * @param {Object} posId 职位ID.
 */
function insertRow(posId) {

	// 删除之前职位已存在的调整行
	deleteRow(posId);
	
	// 提交和取消按钮活性
	$('submitBtn').enable();
	
	// 添加调整行
	var row = $('temp').clone(true);
	
	// 插入行
	$('sublist').down(0).insert({
		bottom: row
	});
	
	// 插入行的单元格
	var cells = row.childElements();
	
	//编辑调整行
	for (var i = 0; i < g_resultList.length; i++) {
		if (g_resultList[i].posId == posId) {

			// 编辑职位名
			cells[0].update(g_resultList[i].posName);
			cells[0].addClassName('text_center vertical_mid');

			// 编辑调整前的角色名
			cells[1].update(roleEdit(g_resultList[i].beforeChange));

			// 编辑调整后的角色名
			cells[2].update(roleEdit(g_resultList[i].afterChange));

			// 编辑调整行取消操作
			row.id = '_' + posId;

			// 显示行
			row.removeClassName('none');
		}
	}
}

/**
 * 删除调整行.
 * @param {Object} posId 职位ID.
 */
function deleteRow(posId) {

	// 从画面获得调整列表
	var rows = $('sublist').down(0).childElements();
	posId = '_' + posId;

	// 遍历画面调整列表
	for (var i = 1; i < rows.length; i++) {

		// 若职位ID与参数相同
		if (posId == rows[i].id) {

			// 删除该行
			rows[i].remove();
			break;
		}
	}

	// 如果调整列表为空 ，则提交和取消按钮非活性
	if ($('sublist').down(0).childElements().length == 1) {
		$('submitBtn').disable();
	}
	
}

/**
 * 取消调整行.
 */
function cancelRow(obj) {

	// 获取该行职位ID
	var posId = obj.up(1).id.substring(1);

	// 删除行
	obj.up(1).remove();
	
	// 如果调整列表为空 ，则提交和取消按钮非活性.
	if ($('sublist').down(0).childElements().length == 1) {
		$('submitBtn').disable();
	}

	// 重置职位对应角色.
	resetRole(posId);
}

/**
 * 编辑插入单元格.
 * @param {Object} roleIds 角色数组.
 */
function roleEdit(roleIds) {

	// 编辑结果
	var result = '';

	//遍历职位所对应角色并编辑.
	for (var i = 0; i < roleIds.length; i++) {

		// 编辑结果(以', '为分隔)
		result += ', ' + getRoleName(roleIds[i]);
	}

	// 若角色为空,返回空串
	if (result.length == 0) {
		return result;
	}

	// 返回编辑结果(去掉之前的逗号和空格).
	return result.substring(2);
}

/**
 * 获取职位ID对应角色名
 * @param {Object} roleId
 */
function getRoleName(roleId) {

	//遍历角色数组 返回角色ID对应角色名.
	for (var i = 0; i < g_roleList.length; i++) {
		if (g_roleList[i].roleId == roleId) {
			return g_roleList[i].roleName;
		}
	}
}

/**
 * 重置职位对应角色
 * @param {Object} posId 职位ID
 */
function resetRole(posId) {

	// 将职位ID对应角色设置成调整前状态.
	for (var i = 0; i < g_resultList.length; i++) {
		if (g_resultList[i].posId == posId) {
			g_resultList[i].afterChange = g_resultList[i].beforeChange;
			g_resultList[i].changeFlag = false;
		}
	}

	// 重置当前选中职位的角色显示.
	if (posId == $('posId').value) {
		setRole(posId);
	}
}

/**
 * 确认取消所有修改
 */
function okCancel() {

	// 恢复至调整前的状态
	for (var i = 0; i < g_resultList.length; i++) {
		g_resultList[i].afterChange = g_resultList[i].beforeChange;
		g_resultList[i].changeFlag = false;
	}
	var rows = $('sublist').down(0).childElements();

	// 删除调整列表
	for (var i = 1; i < rows.length; i++) {
		rows[i].remove();
	}

	// 重置复选框
	resetRole($('posId').value);

	// 提交和取消按钮非活性
	$('submitBtn').disable();
	
}

/**
 * 提交调整列表.
 */
function submitAll() {

	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
		okSubmit();
	}, function() {
	}, '是', '否');
}

/**
 * 确认提交操作
 */
function okSubmit() {

	// 删除调整列表
	deleteSubList()

	// 提交结果
	var subResult = new Array;

	// 遍历调整结果
	for (var i = 0; i < g_resultList.length; i++) {

		// 若职位对应角色改变
		if (g_resultList[i].changeFlag) {

			// 若调整前职位无角色
			if (g_resultList[i].beforeChange.length == 0) {
				for (var j = 0; j < g_resultList[i].afterChange.length; j++) {
					var temp = new Array(4);
					temp[0] = g_resultList[i].posId;
					temp[1] = g_resultList[i].afterChange[j];
					temp[2] = '';
					temp[3] = true;
					subResult.push(temp);
				}

			// 若调整后职位无角色	
			} else if (g_resultList[i].afterChange.length == 0) {
				for (var j = 0; j < g_resultList[i].beforeChange.length; j++) {
					var temp = new Array(4);
					temp[0] = g_resultList[i].posId;
					temp[1] = g_resultList[i].beforeChange[j];
					temp[2] = getUpdateTime(temp[0], temp[1]);
					temp[3] = false;
					subResult.push(temp);
				}

			// 若调整前后职位都有角色
			} else {
				for (var j = 0; j < g_resultList[i].beforeChange.length; j++) {
					var tempRoleId = g_resultList[i].beforeChange[j];
					var flag = false;
					for (var k = 0; k < g_resultList[i].afterChange.length; k++) {
						if (tempRoleId == g_resultList[i].afterChange[k]) {
							flag = true;
							break;
						}
					}

					// 调整前有，而调整后无的角色追加入提交结果数组标记为false（删除）
					if (!flag) {
						var temp = new Array(4);
						temp[0] = g_resultList[i].posId;
						temp[1] = tempRoleId;
						temp[2] = getUpdateTime(temp[0], temp[1]);
						temp[3] = false;
						subResult.push(temp)
					}
				}
				for (var j = 0; j < g_resultList[i].afterChange.length; j++) {
					var tempRoleId = g_resultList[i].afterChange[j];
					var flag = false;
					for (var k = 0; k < g_resultList[i].beforeChange.length; k++) {
						if (tempRoleId == g_resultList[i].beforeChange[k]) {
							flag = true;
							break;
						}
					}

					// 调整前无，而调整后有的角色追加入提交结果数组标记为true（插入）
					if (!flag) {
						var temp = new Array(4);
						temp[0] = g_resultList[i].posId;
						temp[1] = tempRoleId;
						temp[2] = '';
						temp[3] = true;
						subResult.push(temp)
					}
				}
			}
		}
	}

	// 将提交结果转化成JSON串
	var posRoleInfosResult = Object.toJSON(subResult);

	// 设置Action
	var url = 'ya0010Sub';

	// 设置参数
	var pars = 'posRoleInfosResult=' + posRoleInfosResult;

	// Ajax提交请求
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(request) {
			if(checkException(request)) return;
			
			var rows = $('sublist').down(0).childElements();
			// 删除调整列表
			for (var i = 1; i < rows.length; i++) {
				rows[i].remove();
			}

			$('refresh').submit();
		},
		onFailure: reportError
	});
}

/**
 * 删除调整列表
 */
function deleteSubList() {
	var rows = $('sublist').childElements();

	// 删除调整列表
	for (var i = 1; i < rows.length; i++) {
		rows[i].remove();
	}
}

/**
 * 获取职位角色记录的时间戳.
 * @param {Object} posId 职位ID.
 * @param {Object} roleId 角色ID.
 */
function getUpdateTime(posId, roleId) {
	for (var i = 0; i < g_posRoleInfo.length; i++) {
		if (posId == g_posRoleInfo[i].posId && roleId == g_posRoleInfo[i].roleId) {
			return g_posRoleInfo[i].updateTime;
		}
	}
}

/**
 * 系统错误处理
 */
function reportError() {
	MsgBox.message(getMessage('js.com.error.0001'));
}
