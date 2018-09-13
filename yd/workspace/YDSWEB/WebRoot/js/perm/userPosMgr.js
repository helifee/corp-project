/*
 * @(#)userPosMgr.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 用户职位管理JavaScript.
 *
 * @author yaokai
 * @version 1.0
 */

/**
 * 用户职位管理——按职位画面表示
 */
var posUsr=new UserMgr({
				mode: ModeEnum.PosUsr,
				index: 'posUsr',
				autoInit:true,
				container: 'posOrUserTab_Content0',
				action: {
					sourceAction: 'getUserPosMgrPosAction.action',
					sourceParam: addStamp(),
					destAction: 'SubmitUserPosAction.action',
					destParam: '',
					selectAction: 'getUserListAction.action',
					selectParam: addStamp(),
					dialogAction:'getPosInfosAction.action',
					frontSelect: false
				},
				attrName: {
					deptObj: 'deptList',
					prObj: 'posInfos',
					userObj: 'userInfos',
					rltObj: 'perUserPermitInfos',
					deptId: 'deptId',
					deptName: 'deptNm',
					prId: 'posId',
					prName: 'posName',
					userId: 'userId',
					userName: 'userCnm',
					userDept: 'deptId',
					rltPrId: 'posRoleId',
					rltUserId: 'userId',
					rltStart: '',
					rltEnd: '',
					rltOpFlg: 'flg',
					rltKeep: ['updateTime'],
					selectYear: 'userInfo.userStartYear',
					selectName: 'userInfo.userCnm',
					selectDept: 'userInfo.deptId',
					selectPos: 'userInfo.posId',
					submitJson: 'jsonPermitInfo'
				}
			});
			
/**
 * 用户职位管理——按用户画面表示
 */
var usrPos=new UserMgr({
				mode: ModeEnum.UsrPos,
				index: 'usrPos',
				autoInit:false,
				container: 'posOrUserTab_Content1',
				action: {
					sourceAction: 'getUserPosMgrPosAction.action',
					sourceParam: addStamp(),
					destAction: 'SubmitUserPosAction.action',
					destParam: '',
					selectAction: 'getUserListAction.action',
					selectParam: addStamp(),
					dialogAction:'getPosInfosAction.action',
					frontSelect: false
				},
				attrName: {
					deptObj: 'deptList',
					prObj: 'posInfos',
					userObj: 'userInfos',
					rltObj: 'perUserPermitInfos',
					deptId: 'deptId',
					deptName: 'deptNm',
					prId: 'posId',
					prName: 'posName',
					userId: 'userId',
					userName: 'userCnm',
					userDept: 'deptId',
					rltPrId: 'posRoleId',
					rltUserId: 'userId',
					rltStart: '',
					rltEnd: '',
					rltOpFlg: 'flg',
					rltKeep: ['updateTime'],
					selectYear: 'userInfo.userStartYear',
					selectName: 'userInfo.userCnm',
					selectDept: 'userInfo.deptId',
					selectPos: 'userInfo.posId',
					submitJson: 'jsonPermitInfo'
				}
			});

/**
 * 页面Tab功能
 */
function nTabs(thisObj, Num) {
	if (thisObj.className == 'active') return;
	var tabObj = thisObj.parentNode.id;
	var tabList = $(tabObj).select('li');

	//Num:0 按职位选项卡；Num:1 按用户选项卡
		if (Num == 0) {					
			if (usrPos.isChanged()) {				
				if(!confirm('是否放弃修改！')){
					return;
				}
			}
			tabList[0].className = 'active';
			tabList[1].className = 'normal';			
			$('posOrUserTab_Content' + 0).removeClassName('none');
			$('posOrUserTab_Content' + 1).addClassName('none');
			posUsr.init.defer();
			
		} else {
			if(posUsr.isChanged()){
				if(!confirm('是否放弃修改！')){
					return;
				}
			}
			tabList[0].className = 'normal';
			tabList[1].className = 'active';
			$('posOrUserTab_Content' + 0).addClassName('none');
			$('posOrUserTab_Content' + 1).removeClassName('none');	
            usrPos.init.defer();				
		}					
}

	
