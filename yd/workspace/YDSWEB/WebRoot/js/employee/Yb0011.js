/*
 * @(#)Yb0011.js
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
var firstPopFlag= 0;
/**
 * 【查询】按钮事件.
 */
function advSearchEmpInfo(){
	
	
    // 输入校验
    if (!checkForm('advEmpInfoForm')) {
        return;
    }
    
    // 开始日期与结束日期输入校验
    if (!startYearValidate()) {
        return;
    }
	
	
    
    //取得选择的部门和职位(调用ydsTree.js中的方法)
    var dept = $('myTreeDept').getAllSelected();
    var pos = $('myTree').getSelected();
    
    //加载动画
    showLoader();
    
    //设置性别
    if ($('advEmpSexM').checked == true && $('advEmpSexF').checked == true) {
        $('empSex').value = '';
    }
    else 
        if ($('advEmpSexM').checked == true && $('advEmpSexF').checked == false) {
            $('empSex').value = 'm'
        }
        else 
            if ($('advEmpSexM').checked == false && $('advEmpSexF').checked == true) {
                $('empSex').value = 'f'
            }
            else {
                $('empSex').value = '';
            }
    
	var url = 'yb0011FindAdvEmpLst.action';
    var pars = $('advEmpInfoForm').serialize() + '&' + serialize(dept, 'yb0011CondA.deptIdInfos') + '&' + serialize(pos, 'yb0011CondA.posIdInfos');
    pars = addStamp(pars);
    new Ajax.Updater('div_peo_empInfoList', url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
			
            hideLoader();
            if (checkException(response)) {
                return;
            }
			// 设定是否是第一次弹出高级查询画面
           firstPopFlag= 1;
            g_box.close();
            
            new SortTable('table_peoListHead', 'table_peoList');
			
            
            // 员工一览画面初始化
            $('empInfoForm').reset();
			$('selStateId').value='';
            
            // 在高度达到指定值时出现滚动条
            listColor('table_peoList', 450);
       }
    });
}

/**
 * 【清空】按钮事件.
 */
function clearEmpInfo(){

    // 树的结点置为非选中
    $('myTreeDept').unselectAll();
    $('myTree').unselectAll();
    
    // 高级检索画面内容清空
    $('advEmpInfoForm').reset();
	var g_stateid = $NN('yb0011CondA.empStateIdInfos');
	for(var i=0;i<g_stateid.length;i++){
		g_stateid[i].checked = false;
	}
    
}

/**
 * 员工类别unChecked.
 */
function empStatusIdNoCheck(){

    var g_statusidcount = $NN('yb0011CondA.empStatusIdInfos').length;
}

/**
 * 员工状态unChecked.
 */
function empStateIdNoCheck(){

    var g_stateidcount = $NN('yb0011CondA.empStateIdInfos').length;
}

/**
 *入社期间校验.
 */
function startYearValidate(){

    // 开始日期与结束日期输入校验
    startDate = $('startYearFrom').value;
    endDate = $('startYearTo').value;
    if (startDate != '' && endDate != '') {
        if (startDate > endDate) {
            
            addFieldError($('startYearTo'), '结束日期必须大于或等于开始日期！');
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

