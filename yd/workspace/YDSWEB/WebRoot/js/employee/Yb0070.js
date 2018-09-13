/*
 * @(#)Yb0070.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
 */
/**
 * @fileoverview 人员管理画面JavaScript.
 *
 * @author fangjiayuan
 * @version 1.0
 */

/**
 * 组信息弹出窗.
 */
var g_team;

/**
 * 新建或者更新flag.
 */
var g_flag;

/**
 * 画面初期化.
 */
function initForm(){
	
	// 成员数只显示13个人
	initTeamUser();
	
    // 在高度达到指定值时出现滚动条
    listColor('table_teamList', 300);
	// 申请内容存在时
	if($('table_applay')){
		
		// 申请内容在高度达到指定值时出现滚动条
    	autoScroll('table_applay', 100);
	}
	
    // 弹出组信息新建/修改参数设定
    g_team = new PopupBox({
        // 唯一标志
        key: 'dis',
        // 标题内容，元素或字符串
        title: $('teamTitle'),
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_emp_team_creat'),
        // 显示位置，相当与z-index
        position: 2,
        // 是否允许拖动
        drag: true
    
    });
	// 员工选择pop画面
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
		position: 3,
		// 是否允许拖动
		drag: true,
		loader: true
	});

}
/**
 * 成员数只显示13个人.
 */
function initTeamUser() {
	var teamUserName= $$('.teamUser');
	for(var i = 0; i < teamUserName.length; i++){
		var userName=teamUserName[i].innerHTML.split(',');
		if(userName.length > 15){
			var User = userName[0]+','+userName[1]+','+
					   userName[2]+','+userName[3]+','+
					   userName[4]+','+userName[5]+','+
					   userName[6]+','+userName[7]+','+
					   userName[8]+','+userName[9]+','+
					   userName[10]+','+userName[11]+','+
					   userName[12]+'...';
			$('teamUserNm'+i).innerHTML = User;
		}
		
	}

}
/**
 * 新建组信息事件.
 */
function createTeamInfo() {
	
	// 新建
	g_flag = 1;
	$('teamCreatForm').reset();
	$('teamTitle').update('组信息  新建');
	$('teamNm').clear();
	$('teamSnm').clear();
	$('teamLeaderId').clear();
	$('teamLeaderNm').clear();
	$('userNm').innerHTML = '';
	$('teamDiffNm02').checked=true;
	$('joinApplyFlga').checked=false;
	$('userCnt').innerHTML = '';

	// 员工姓名自动匹配
	new JsNameFilter('teamLeaderId', 'teamLeaderNm', '../');
	g_team.Popup();
	$('teamCreatForm')['teamNm'].focus();


}

/**
 * 修改组信息事件.
 * @param {Object} obj
 */
function modifyTeamInfo(obj) {
	
	// 修改
	g_flag = 2;
	var i = $(obj).up('tr').rowIndex;
	
	var url = 'yb0070SearchTeamInfo.action';
	var param = 'teamId=' + $F('teamId'+ i);
	
	$('div_emp_team_creat').update();
	
	param = addStamp(param);
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			if (checkException(request)) {
        		return;
        	}
			$('div_emp_team_creat').update(request.responseText);
			$('teamCreatForm').reset();
			// 标题设定
			$('teamTitle').update('组信息  修改');
			// 员工姓名自动匹配
			new JsNameFilter('teamLeaderId', 'teamLeaderNm', '../');
			// 弹出组信息修改画面
			g_team.Popup();
			// 组名focus
			$('teamCreatForm')['teamNm'].focus();
			// 初始化form校验
			initValidation('teamCreatForm');
		}
	});

}

/**
 * 删除组信息事件.
 * @param {Object} obj
 */
function deleteTeamInfo(obj) {

	var i = $(obj).up('tr').rowIndex;
	MsgBox.confirm(getMessage('js.com.info.0001'), '确认对话框', function() {	
		var url = 'yb0070DeleteTeamInfo.action';
		var param = 'teamId=' + $F('teamId'+ i);
		param = addStamp(param);
		new Ajax.Request(url, {
			method: 'get',
			parameters: param,
			onSuccess: function(request) {
				if (checkException(request)) {
	        		return;
	        	}
				$('div_emp_team_list').update(request.responseText);
				
				// 成员数只显示13个人
				initTeamUser();

				// 在高度达到指定值时出现滚动条
	    		listColor('table_teamList', 300);
	
				showOpTip(getMessage('js.com.info.0010'));
	
			},
			onFailure: function(request) {
			MsgBox.error(getMessage('js.com.error.0001'));
			}
		});
	}, nullFunc, '是', '否');
}
/**
 * 退出组信息事件.
 * @param {Object} obj
 */
function quitUser(obj) {
	var i = $(obj).up('tr').rowIndex;
	// 加入组需要申请
	if($F('joinApplyFlg'+ i)=='1'){
		$('quitBtn'+i).value = '退出中';
		$('quitBtn'+i).disabled=true;
	// 加入组不需要申请
	}else{
		$('quitBtn'+i).value = '已退出';
		$('quitBtn'+i).disabled=true;
	}
	var url = 'yb0070QuitUser.action';
	var param = 'teamId=' + $F('teamId'+ i)+'&'+'joinApplyFlg=' + $F('joinApplyFlg'+ i);
	param = addStamp(param);	
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			if (checkException(request)) {
	        	return;
	        }
			$('div_emp_team_list').update(request.responseText);
			
			// 成员数只显示13个人
			initTeamUser();
			
			// 在高度达到指定值时出现滚动条
	    	listColor('table_teamList', 300);
			if ($F('joinApplyFlg' + i) == '1') {
				showOpTip(getMessage('js.emp.info.0006'));
			} else {			
				showOpTip(getMessage('js.emp.info.0008'));
			}
		},
		onFailure: function(request) {
		MsgBox.error(getMessage('js.emp.error.0016'));
		}
	});	
}

/**
 * 加入组信息事件.
 * @param {Object} obj
 */
function joinUser(obj) {
	var i = $(obj).up('tr').rowIndex;

	// 加入组需要申请
	if($F('joinApplyFlg'+ i)=='1'){
		$('joinBtn'+i).value = '加入中';
		$('joinBtn'+i).disabled=true;
	// 加入组不需要申请
	}else{
		$('joinBtn'+i).value = '已加入';
		$('joinBtn'+i).disabled=true;
	}
	var url = 'yb0070JoinUser.action';
	var param = 'teamId=' + $F('teamId'+ i)+'&'+'joinApplyFlg=' + $F('joinApplyFlg'+ i);
	param = addStamp(param);	
	new Ajax.Request(url, {
		method: 'get',
		parameters: param,
		onSuccess: function(request) {
			if (checkException(request)) {
	        	return;
	        }
			$('div_emp_team_list').update(request.responseText);
			
			// 成员数只显示13个人
			initTeamUser();

			// 在高度达到指定值时出现滚动条
	    	listColor('table_teamList', 300);
			if ($F('joinApplyFlg' + i) == '1') {
				showOpTip(getMessage('js.emp.info.0006'));
			}else{
				showOpTip(getMessage('js.emp.info.0007'));
			}
	
		},
		onFailure: function(request) {
		MsgBox.error(getMessage('js.emp.error.0016'));
		}
	});	

}

/**
 * 同意事件.
 */
function agree() {
	// 申请内容校验
	if(!ApplayValidate())return;
	var url='yb0070AgreeTeamUserFlg.action';
	MsgBox.confirm(getMessage('js.emp.info.0004'), '确认对话框',function() {
		$('teamApplayForm').action=url;
		$('teamApplayForm').submit();
	}, nullFunc, '是', '否');	
}

/**
 * 不同意事件.
 */
function disAgree() {
	// 申请内容校验
	if(!ApplayValidate())return;
	var url='yb0070DisAgreeTeamUserFlg.action';
	MsgBox.confirm(getMessage('js.emp.info.0005'), '确认对话框', function() {
		$('teamApplayForm').action=url;
		$('teamApplayForm').submit();
	}, nullFunc, '是', '否');	
}

/**
 * 申请内容Checked.
 */
function applayAllCheck(){
	var i = 1;
	var g_applaycount = $NN('yb0071CondA.applayInfosList').length;
	while (i <= g_applaycount) {
		$('yb0071CondA.applayInfosList-' + i).checked = $('applayAll').checked
		i++;
	}

}

/**
 * 申请内容校验.
 * @return Boolean true:false.
 */
function ApplayValidate(){
	var flg = false;
	var i = 1;
	var g_applaycount = $NN('yb0071CondA.applayInfosList').length;
	while (i <= g_applaycount) {
		if($('yb0071CondA.applayInfosList-' + i).checked==true){
			flg = true;
		}
		i++;
	}
	if(!flg){
		MsgBox.message(getMessage('js.com.warning.0001', $('applayLabel').innerHTML));
	}
	
	return flg;
}

/**
 * 申请内容unChecked.
 */
function applayAllNoCheck(){
	var i = 1;
	var g_applaycount = $NN('yb0071CondA.applayInfosList').length;
	while (i <= g_applaycount) {
		if($('yb0071CondA.applayInfosList-' + i).checked==false){
			$('applayAll').checked=false
			return;
		}else{
			$('applayAll').checked=true
		}
		i++;
	}

}

/**
 * 关闭按钮事件.
 */
function cancelTeamInfo() {
	MsgBox.confirm(getMessage('js.com.info.0005'), '确认对话框', function() {
		g_team.Close(0);
	}, nullFunc, '是', '否');
}

/**
 * 保存按钮事件.
 */
function saveTeamInfo(){
	// 输入校验
    if (!checkForm ($('teamCreatForm'))) {
        return;
    }
	$('teamLeaderId').disabled = false;
	$('teamLeaderNm').disabled = false;

	var url;
	// 新建
	if (g_flag == 1) {
		url = 'yb0070InsertTeamInfo.action';
		var msg = getMessage('js.com.info.0008');
	// 修改
	} else if (g_flag == 2) {
		url = 'yb0070UpdateTeamInfo.action';
		var msg = getMessage('js.com.info.0009');
	}
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function() {
		new Ajax.Request(url, {
		parameters: $('teamCreatForm').serialize(),
		method: 'post',
		onSuccess: function(request) {
			if (checkException(request)) {
	               return;
	           }
			$('div_emp_team_list').update(request.responseText);
			
			// 成员数只显示13个人
			initTeamUser();

			// 在高度达到指定值时出现滚动条
	    	listColor('table_teamList', 300);
	
			showOpTip(msg);
			g_team.close(0);
	
		},
		onFailure: function(request) {
			MsgBox.error(getMessage('js.emp.error.0016'));
		}
		});	
	}, nullFunc, '是', '否');		
}

/**
 * 人员类
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 取得父页面初始人员数组
 * @return 初始人员数组
 */
function prepareInitUsers() {
	
	// 传初始人员
	var usersPrevious = [];
	var idInfo = $('userId').value;
	var nameInfo = $('userNm').innerHTML;

	var id = idInfo.split(',');
	var name = nameInfo.split(',');
	
	// 初始人员存在则传给人员选择画面
	if(idInfo!='' && nameInfo!=''){
		for (var i = 0, len = id.length; i < len; i++) {
			usersPrevious.push(new User(id[i], name[i]));
		}
	}
	return usersPrevious;
}

/**
 * 取得所选人员信息
 * @param 人员数组
 */
function display(users){
	
	var teamUserId = '';
	var teamUserNm = ''; 
	
	//所选人员
	if(typeof(users) != 'undefined') {
	
		if( users.length != 0) {
			for (var i = 0, len = users.length; i < len; i++){
				if(i==len-1){
					teamUserId = teamUserId + users[i].id
					teamUserNm = teamUserNm + users[i].name
				}else{
					teamUserId = teamUserId + users[i].id + ','
					teamUserNm = teamUserNm + users[i].name + ','
				}
			}
			$('userId').value = teamUserId;
			$('userNm').innerHTML = teamUserNm;
			$('userCnt').innerHTML = users.length;
			emp_box.close(0);				
		}
	}else{
		MsgBox.message(getMessage('js.com.error.0001'));
	}

}
/**
 * 属性为私有组时
 * 组长为登录者
 */
function teamLeaderIdAdd(){
	
	// 属性为私有组时
	if ($('teamDiffNm01').checked) {
		// 组长为登录者
		$('teamLeaderId').value = $('loginUserId').value.substring(2);
		$('teamLeaderNm').value = $('loginUserNm').value
		$('teamLeaderId').disabled = true;
		$('teamLeaderNm').disabled = true;
	} else{
		$('teamLeaderId').disabled = false;
		$('teamLeaderNm').disabled = false;

	}
	
	
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
function chooseUser() {
	
	// 参数empNum为限定选择的人数，如果不需要限定则不传
	$('empSelectPage').src = 'yb9010Init.action';
	emp_box.Popup();
}

/**
 * 成员加入/退出审批事件.
 */
function selectYesOrNo(){
	if($('joinApplyFlga').checked){
		$('joinApplyFlga').checked = false;
	} else{
		$('joinApplyFlga').checked = true;
	}
	
}
