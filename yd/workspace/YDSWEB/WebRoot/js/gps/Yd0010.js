/*
 * @(#)Yd0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
 */
/**
 * @author pengchuan
 * @version 1.0  2010/10/29
 */
/**
 *初期画面加载
 */
function initForm(){
	
	/**员工Id和姓名自动匹配*/
	new JsNameFilter('accId', 'accName', window['g_basePath']);
	/**
	 *转账弹出画面
	*/
	 g_box_acc= new PopupBox({
	        // 唯一标志
	        key: 6,
	        // 标题内容，元素或字符串
	        title: '转账',
	        // 图标的CSS
	        icon: 'img_opt opt_EditTable',
	        // 内容元素
	        content: $('div_transAcc_Info'),
	        // 显示位置，相当与z-index
	        position: 10,
	        // 是否允许拖动
	        drag: true,
	        //加载动画
	        loader: false
	    });
}
/**
 * 交易履历一览
 */
function searchExchangeHis(){
	    
		var url = 'yd0010findExHisList.action';
		var pars=$('accountInfoForm').serialize()+ '&pageNumber=1';
		$('oldParam').value = $('accountInfoForm').serialize();
		pars = addStamp(pars);
	    new Ajax.Updater('div_person_accountInfoList', url, {
	        method: 'get',
			parameters: pars,
			onComplete: function(response){
				if (checkException(response)) {
		        	return;
				}
				$('remain').innerHTML=$('remain_new').value;
			} 
    	});
}

/**
 * 转账画面弹出
 */
function transAccount(){
	$('transrAccForm').reset();
	initValidation('transrAccForm');
	addRequiredCheck('transMoney',getMessage('js.com.warning.0001','转账金额'), true);
	if($('remain').innerHTML < 1000 && $('remain').innerHTML >0){
		addDoubleCheck('transMoney', getMessage('js.com.warning.0014','转账金额',0.01,$('remain').innerHTML),0.01,$('remain').innerHTML);
	}
    g_box_acc.Popup();
	
}

/**
 * 转账画面保存按钮
 */
function submitTransAcc(){
	
    if(('YD'+$('accId').value)==$('loginId').value){
		MsgBox.error(getMessage('js.gps.error.0004')); 
		return;
	}
    if (checkForm($('transrAccForm'))) {
    
        MsgBox.confirm(getMessage('js.gps.info.0037',$('accName').value,$('transMoney').value), '确认对话框', function(){
            var url = 'yd0010SaveTrans.action';
            $('transrAccForm').action = url;
            $('transrAccForm').submit();
            g_box_acc.close();
        }, function(){
            // 取消时回调
            return;
        }, '是', '否');
    }
}

/**
 * 分页时使用的ajax提交函数.
*/
function pagerCommonTag(pageUrl, pageNumber){
	
    var url = pageUrl;
    var pars = $('oldParam').value+ '&pageNumber=' + pageNumber;
    pars = addStamp(pars);
    new Ajax.Updater('div_person_accountInfoList', url, {
        method: 'get',
        parameters: pars,
        onFailure: function(response){
            MsgBox.error(getMessage('js.com.error.0001'));
        },
		onComplete: function(response){
			if (checkException(response)) {
	        	return;
			}
			$('remain').innerHTML=$('remain_new').value;
		} 
    });
}
