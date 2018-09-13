/*
 * @(#)Yd0060.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
 */
/**
 * @author pengchuan
 * @version 1.0  2010/11/09
 */


/**
 *初期画面加载
 */
function initForm(){
	
	/**员工Id和姓名自动匹配*/
    new JsNameFilter('empId', 'empNm', window['g_basePath']);
	setTable();
	if($('switchFlag').value==0){
		$('print').removeClassName('none');
		$('endAndPrint').addClassName('none');
		$('modify').addClassName('none');
	}
	else{
		$('endAndPrint').removeClassName('none');
		$('modify').removeClassName('none');
		$('print').addClassName('none');
	}
/**
 *修改信息弹出画面
*/
    g_box= new PopupBox({
        // 唯一标志
        key: 1,
        // 标题内容，元素或字符串
        title: '修改订单',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_modify_orderInfo'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true
    });
	
/**
 *追加订购者弹出画面
*/
    g_box_plus= new PopupBox({
        // 唯一标志
        key: 2,
        // 标题内容，元素或字符串
        title: '追加订购者',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_plus_order'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true
    });
}


/**
 * 设置table显示.
 */
function setTable(){
	
    var row = $('table_orderInfoListHead').select('tr');
    for (var i = 0, len = row.length; i < len; i++) {
        var col;
        if (i == 0) {
            col = row[i].select('th');
        }
        else {
            col = row[i].select('td');
        }
        for (var j = 0, len1 = col.length; j < len1; j++) {
          if (j == 0) {
		  	  col[j].hide();
		  }
        }
    }
	var row1 = $('table_orderInfoList').select('tr');
    for (var i = 0, len = row1.length; i < len; i++) {
		
        var col=row1[i].select('td');
        for (var j = 0, len1 = col.length; j < len1; j++) {
          if (j == 0) {
		  	  col[j].hide();
		  }
       }
   }
   listColor('table_orderInfoList',350);
}
/**
 * 修改信息弹出
 */
function modifyOrderInfo(orderId){
	
	g_box.Popup();
	var url='yd0060modifyInfo.action';
	var pars='orderId='+orderId;
	pars = addStamp(pars);
	new Ajax.Updater('div_modify_orderInfo', url, {
        method: 'get',
		parameters: pars,
        onComplete: function(response){
			
			if(checkException(response)){
				
				return;
			}
			addRequiredCheck('orderTitle',getMessage('js.com.warning.0001','订单标题'), true); 
        }
    });
}
/**
 * 取得个人账户余额
 */
function  getPerRemain(){
	if (!checkInput($('empId'))){
			return;
	}
	if ($('empId').value != "" || $('empNm').value != "") {
        $('remain').removeClassName('none');
        var url = 'yd0060getperRemain.action';
        pars = 'pesAccId=' + $('empId').value;
        pars = addStamp(pars);
        new Ajax.Updater('enableRemain', url, {
            method: 'get',
            parameters: pars,
            onComplete: function(response){
				addDoubleCheck('orderCnt',getMessage('js.gps.error.0003'),1,$('enableRemain').innerHTML/$('closeUnitPrice').value);
            }
        });
    }
}
/**
 * 修改信息保存
 */
function saveModifyOrder(){
    
	if (!checkForm($('orderModifyForm'))){
			return;
	}
    MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
    
        var url = 'yd0060ModifyOrder.action?'+'&orderId='+$('orderId').innerHTML;
		$('orderModifyForm').action=url;
		$('orderModifyForm').submit();
		g_box.close();
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');

}
/**
 * 追加订购者弹出画面
 * @param {Object} obj
 */
function plusOrder(obj){
	$('remain').addClassName('none');
	var radioGP = $(obj).up('tr').select('input');
	var len = radioGP.length;
	var selectedUsers = '';
	for(var i=0; i<len; i++){
			selectedUsers = selectedUsers + ',' + radioGP[i].value;
	}
	$('order').value= selectedUsers.substr(1);
	var rowNum = $(obj).up('tr').rowIndex;
	$('orderPlusForm').reset();
	$('goodsId').value=$('table_orderInfoList').down().childElements()[rowNum].childElements()[0].innerHTML;
	$('orderDetailId').value=$('orderId').innerHTML;
	$('closeUnitPrice').value=$('table_orderInfoList').down().childElements()[rowNum].childElements()[4].innerHTML;
	$('orderCnt').value=1;
	//输入校验
	addRegexCheck($("orderCnt"), getMessage('js.com.warning.0002','订购份数'), '^[1-9][0-9]*$');
	addRequiredCheck('empId', getMessage('js.com.warning.0001','订购者'), true);
	g_box_plus.Popup();
	$('orderPlusForm')['empId'].focus();
}
/**
 * 删除订购者
 * @param {Object} obj
 */
function deleteOrder(obj){
	
	var rowNum = $(obj).up('tr').rowIndex;
	var radioGP = $(obj).up('tr').select('input');
	var len = radioGP.length;
	var selectedUsers = '';
	for(var i=0; i<len; i++){
		if (radioGP[i].checked){
			selectedUsers = selectedUsers + ',' + radioGP[i].value;
		}
	}
	$('orderId2').value=$('orderId').innerHTML;
	$('order').value= selectedUsers.substr(1);
	$('goodsId2').value=$('table_orderInfoList').down().childElements()[rowNum].childElements()[0].innerHTML;
	$('closeUnitPrice2').value=$('table_orderInfoList').down().childElements()[rowNum].childElements()[4].innerHTML;
	if($('order').value!=""){
	MsgBox.confirm(getMessage('js.com.info.0001'), '确认对话框', function(){
	

	var url='yd0060deleteOrder.action?'+'&goodsCateId='+$('goodsCateId').value;
    $('endMoneyForm').action=url;
	$('endMoneyForm').submit();
	}, function(){
			// 取消时回调
			return;
		}, '是', '否');
		}
		else{
			
			MsgBox.error(getMessage('js.com.warning.0001','删除人员')); 
		}
}
/**
 * 追加订购者保存按钮
 */
function submitPlusOrder(){
	
	addCustomCheck('orderCnt', getMessage('js.gps.error.0003'), 'orderCnt', function () {
		var orderCount = $('orderCnt').value;
		var goodsPrice = $('closeUnitPrice').value;
		if (0 < orderCount && orderCount * goodsPrice <= $('enableRemain').innerHTML) {
			return true;
		}
		return false;
	}, false);
	if (!checkForm($('orderPlusForm'))){
		return;
	}
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
			var url = 'yd0060submitPlus.action?'+'&order='+$('order').value+'&goodsCateId='+$('goodsCateId').value;
			$('orderPlusForm').action=url;
			$('orderPlusForm').submit();
			 
		}, function(){
			// 取消时回调
			return;
		}, '是', '否');
}
/**
 * 结束并打印
 */
function endAndPrintOrder(){
    
    if ($('switchFlag').value == 1) {
        MsgBox.confirm(getMessage('js.gps.info.0001'), '确认对话框', function(){
            $('exMoney').value = $('totalPrice').innerHTML;
            var url = 'yd0060endAndPrint.action?'+'orderId='+$('orderId').innerHTML+'&orderContent='+encodeURI($('orderContent').innerHTML)+'&goodsCateId='+$('goodsCateId').value;
            $('endMoneyForm').action=url;
			//$('endMoneyForm').target="_blank";
			$('endMoneyForm').submit();
			//mydelay.delay(0.5);
			
        }, function(){
            // 取消时回调
            return;
        }, '是', '否');
    }
    else {
		MsgBox.confirm(getMessage('js.gps.info.0002'), '确认对话框', function(){
            $('exMoney').value = $('totalPrice').innerHTML;
	        var url = 'yd5010Action.action?'+'orderId='+$('orderId').innerHTML;
	        $('endMoneyForm').action=url;
	        $('endMoneyForm').target="_blank";
			$('endMoneyForm').submit();
			//mydelay.delay(0.5);
			
        }, function(){
            // 取消时回调
            return;
        }, '是', '否');
    }
}

function mydelay(){
	location.reload(true);
}


/**
 * 作废订单
 */
function cancelOrder(){
	
    MsgBox.confirm(getMessage('js.gps.info.0035'), '确认对话框', function(){
		$('exMoney').value = $('totalPrice').innerHTML;
        var url = 'yd0060cancelOrder.action?'+'&orderId=' + $('orderId').innerHTML +'&orderContent='+encodeURI($('orderContent').innerHTML)+ '&cancelFlag=' + $('switchFlag').value+'&goodsCateId='+$('goodsCateId').value;
		$('endMoneyForm').action=url;
		$('endMoneyForm').submit();
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}
