/*
 * @(#)Yb0020.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
 */
/**
 * @fileoverview 员工信息维护画面JavaScript.
 *
 * @author gaoweiwei
 * @version 1.0
 */
/**
 * 画面模式(mode).
 * 		1：员工信息登记模式（一览传）
 * 		2:员工信息查看模式
 * 		3：员工信息修改模式
 * 		4：员工信息登记模式（主画面传）
 */
//var myPopbox03;
//var posList = null;
//var closeFlag=0;
/**
 * [职位设定]事件.
 */
/*
function beforeClose03(){
    return true;
}

function afterClose03(){
    //	alert(Object.toJSON($('myInnerPage').contentWindow.empPosInfoList));

	closeFlag = $('myInnerPage').contentWindow.closeFlag;
	if(closeFlag==1){
		posList = $('myInnerPage').contentWindow.empPosInfoList;
	}else{
		posList = $('myInnerPage').contentWindow.empPosInfoList2;
	}
	
    //posList = $('myInnerPage').contentWindow.empPosInfoList;
    
    // 画面操作List排序：降序
    posList.sort(function(a, b){
        if (a['mainPosFlg'] == b['mainPosFlg']) {
            posList.sort(function(a, b){
                if (a['posType'] == b['posType']) {
                    return a['dispSeq'] < b['dispSeq'] ? 1 : -1;
                }
                return a['posType'] < b['posType'] ? 1 : -1;
            });
        }
        return a['mainPosFlg'] < b['mainPosFlg'] ? 1 : -1;
    });
    
    // 重新生成表格
    reloadTbl(posList);
}

function popInnerPage(){
    $('myInnerPage').src = 'yb0040Init.action?' + 'empId=' + $F('empIdHid') + '&empName=' + $F('empCnm')+'&mode='+$F('mode');
    myPopbox03.popup();
}

function myInnerPageLoaded(){
    myPopbox03.loaded();
}

function myInnerPageClose(){
    myPopbox03.close();
}

function myInnerPageCloseForce(){
    myPopbox03.close();
}
*/

/**
 * 重新生成表格.
 */
/*
function reloadTbl(obj){

    // 原有表格行数
    var rowHis = $('posTable').rows.length;
    
    // 传入表格行数
    var pRow = obj.length;
    
    // 当前职位一览index
    var nIdx = 0;
    
    // 传入表中当前职位行数
    var pIdx = 0;
    for (var x = 0; x < pRow; x++) {
        if (obj[x].endTime == '9999-12-31') {
            pIdx++;
        }
    }
    
    if (rowHis > pIdx || rowHis == pIdx) {
        //alert('原表格多行');
        // 取得原有表格中的所有行
        var rowNow1 = $('posTable').select('tr');
        
        // 职位一览
        for (var i = 0; i < pRow; i++) {
            if (obj[i].endTime == '9999-12-31') {
                // 职位类别	
                rowNow1[nIdx].childElements()[0].addClassName('percent_40');
                rowNow1[nIdx].childElements()[0].innerHTML = obj[i].posTypeName;
                // 职位名称
                rowNow1[nIdx].childElements()[1].addClassName('margin_right_15');
                rowNow1[nIdx].childElements()[1].innerHTML = obj[i].posSName;
                
                nIdx++;
            }
        }
        //alert('当前表格行数:'+ nIdx);
        
        // 删除多余行
        for (var j = nIdx; j < rowHis; j++) {
            $('posTable').deleteRow(nIdx);
            if (nIdx > $('posTable').rows.length) {
                break;
            }
        }
        
        listColor('posTable', 116);
    }
    else {
        //alert('原表格少行');
        var length = pIdx - rowHis;
        //alert('缺少行数:'+ length);
        // 原表格增行
        if (rowHis == 0) {
            for (var b = 0; b < pIdx; b++) {
                // 新建一行
				$('posTable').down(0).insert({bottom: 
					new Element('tr').insert({bottom: new Element('td')})
									 .insert({bottom: new Element('td')})
				});
				
//                var newRow1 = $('posTable').insertRow();
//               var newTd0 = newRow1.insertCell();
//                var newTd1 = newRow1.insertCell();
            }
        }
        else {
            for (var a = 0; a < length; a++) {
                // 新建一行
				var newRow = $('posTable').down(1).clone(true);
				$('posTable').down(0).insert({bottom:newRow});
				
//                var newRow = $('cloneTr').clone(true);
//                $('posTable').tBodies[0].appendChild(newRow);
            }
        }
        
        // 取得原有表格中的所有行
        var rowNow2 = $('posTable').select('tr');
        
        // 职位一览
        for (var y = 0; y < pRow; y++) {
            //alert('行数：'+ $('posTable').rows.length);
            if (obj[y].endTime == '9999-12-31') {
                // 职位类别
                rowNow2[nIdx].childElements()[0].addClassName('percent_40');
                rowNow2[nIdx].childElements()[0].innerHTML = obj[y].posTypeName;
                // 职位名称
                rowNow2[nIdx].childElements()[1].addClassName('margin_right_15');
                rowNow2[nIdx].childElements()[1].innerHTML = obj[y].posSName;
                
                nIdx++;
            }
        }
        
        listColor('posTable', 116);
    }
}
*/

/**
 * 初始化.
 */
function init(){

        /*
myPopbox03 = new PopupBox({
        // 唯一标志，相同页面中不可重复
        key: 'my03',
        
        // 标题内容，可用元素或字符串
        title: '员工职位设定',
        
        // 图标的CSS
        icon: 'img_opt opt_Relation',
		//右上角的关闭隐藏
        noclose:true,
        // 内容元素
        content: $('myPopContent03'),
        
        // 显示位置，相当与z-index
        position: 3,
        
        // 是否允许拖动
        drag: true,
        
        // 是否需要加载动画
        loader: true,
        
        // 关闭前的回调，用于校验等

      beforeclose: function(){
            // 如果返回false不会关闭弹出层
            return beforeClose03();
        },
        
        // 关闭后的回调，用于刷新页面等
        afterclose: function(){
            afterClose03();
        }

    });
*/

    // Id数组,Action数组
	var selectIdArr, actionNameArr;
	// 职位类别，职位联动设定
	// Id数组
	selectIdArr = ['posType', 'posId'];
	// Action数组
    actionNameArr = ['yb0020FindPosTypeLst.action', 'yb0020FindPosLst.action'];
	// 下拉列表无回调
 //	registMultiSelect(selectIdArr, actionNameArr);

    // 登记模式（一览传）
    if ($F('mode') == 1) {
        $('quitDate').hide();
		$('lizhi').hide();
        $('_title_after').innerHTML = '【登记】';
        $('empSexM').checked = true;
		$('empStateList').disable();
		// 下拉列表无回调
		registMultiSelect(selectIdArr, actionNameArr);
    }
    // 查看模式
    if ($F('mode') == 2) {
        $('_title_after').innerHTML = '【查看】';
        $('empIdHid').value = $F('empId').substring(2);
        $('empIdHid').disable();
        $('empCpnm').disable();
        $('empJrnm').disable();
        $('empCnm').disable();
        $('empJknm').disable();
        $('empCpsnm').disable();
        $('empJnm').disable();
        $('empSexM').disable();
        $('empSexF').disable();
        $('graduated').disable();
        $('degreeList').disable();
        $('major').disable();
        $('uploadButton').hide();
        $('startDate').disable();
        $('chargeOrgList').disable();
        $('empDmnm').disable();
        $('empStatusList').disable();
        $('empEmailComp').disable();
        $('empEmailPub').disable();
		$('posType').disable();
		$('posId').disable();
		if($('empStateList').value=='03' || $('empStateList').value=='04'){
			$('quitDate').disable();
		    $('empStateList').disable();
		}
		else{
			$('quitDate').hide();
			$('lizhi').hide();
		    $('empStateList').disable();
		}
		
        $('dosubmit').hide();
    }
    
    // 修改模式
    if ($F('mode') == 3) {
        $('_title_after').innerHTML = '【修改】';
        $('empIdHid').value = $F('empId').substring(2);
        $('empIdHid').disable();
		$('posType').disable();
		$('posId').disable();
      
		if($('empStateList').value=='03' || $('empStateList').value=='04'){
			$('quitDate').disable();
		    $('empStateList').disable();
		}
		else{
			$('quitDate').hide();
			$('lizhi').hide();
		    $('empStateList').disable();
		}
    }
    
    // 登记模式（主画面传）
    if ($F('mode') == 4) {
		$('quitDate').hide();
		$('lizhi').hide();
        $('_title_after').innerHTML = '【登记】';
        $('empSexM').checked = true;
		$('empStateList').disable();
		// 下拉列表无回调
		registMultiSelect(selectIdArr, actionNameArr);
    }
	
	// 个人信息修改模式
    if ($F('mode') == 5) {
        $('empIdHid').value = $F('empId').substring(2);
        $('empIdHid').disable();
        $('empCpnm').disable();
        $('empCnm').disable();
        $('empCpsnm').disable();
        $('empSexM').disable();
        $('empSexF').disable();
        $('uploadButton').hide();
        $('startDate').disable();
        $('chargeOrgList').disable();
        $('empDmnm').disable();
        $('empStatusList').disable();
        $('empEmailComp').disable();
		$('posType').disable();
		$('posId').disable();
		if($('empStateList').value=='03' || $('empStateList').value=='04'){
			$('quitDate').disable();
		    $('empStateList').disable();
		}
		else{
			$('quitDate').hide();
			$('lizhi').hide();
		    $('empStateList').disable();
		}
    }
    
    // 自动匹配初始值
    new JsContentFilter('graduated', 'yb0020FindFilterLst.action', 'graduatedList');
    new JsContentFilter('major', 'yb0020FindFilterLst.action', 'majorList');
    
    // 无刷新文件上传
    new JsFileUpload({
        fileInputId: 'upload', // file控件ID
        backVarName: 'fileName', // 储存路径的隐藏控件ID
        eventElementId: 'uploadButton', // 上传图片按钮ID
        onSuccess: function(){ // 成功返回执行方法
            $('empImg').src = getTempUrl($('fileName').value);
        }
    });
    
    var img = $('empImg');
    if (!$('fileName').value && $('empImgId').value) {
        img.src = '../employee/yb0020GetImage.action?fileName=' + $('empImgId').value;
    }
    else if($('fileName').value){
    	img.src = getTempUrl($('fileName').value);
    }
    else {
        img.src = '../images/emp/pho1.png';
    }
    
    /*=========================2010/08/03 滕长龙对应无刷新上传 end =========================*/
    
}

/**
 * [保存]按钮事件.
 */
function saveEmpInfo(){

    //输入校验
    if (!checkForm('mainForm')) {
        return;
    }
    
    // 员工职位设定校验
    if ($F('mode') == '1' && $('posId').value=='') {
        MsgBox.message(getMessage('js.com.warning.0001',$('posTypeLabel').innerHTML));
        return;
    } else if ($F('mode') == '4' && $('posId').value=='') {
        MsgBox.message(getMessage('js.com.warning.0001',$('posTypeLabel').innerHTML));
        return;
    }
    
    
    // 修改状态下
	if($F('mode') == 3 || $F('mode') == 5 ){
		MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
		    submit();
		}, function(){
		}, '是', '否');
	}else{
		MsgBox.confirm(getMessage('js.com.info.0002'), '确认对话框', function(){
		    submit();
		}, function(){
		}, '是', '否');
	}


}

/**
 * 保存画面内容.
 */
function submit(){

    // 页面提交
    if ($F('mode') == '1') {
		
			var url = 'yb0020RegFromLst.action';
			//var url = 'yb0020RegFromLst.action?' + arrToBean(posList, 'posList');
			$('mainForm').action = url;
			$('mainForm').submit();
		
	}
	else {
		      if ($F('mode') == '4') {
		
				var url = 'yb0020RegFromMain.action';
				//var url = 'yb0020RegFromMain.action?' + arrToBean(posList, 'posList');
				$('mainForm').action = url;
				$('mainForm').submit();
			
		      }
			else {
				    if ($F('mode') == '3') {
					
						var url = 'yb0020Update.action';
						$('mainForm').action = url;
						$('mainForm').submit();
					
				    }
				   else {
				   	      if ($F('mode') == '5') {
						  
						  	var url = 'yb0020UpdatePersonal.action';
						  	$('mainForm').action = url;
						  	$('mainForm').submit();
						  }
						  else{
							  	var url = 'yb0020Update.action';
								$('mainForm').action = url;
								$('mainForm').submit();
						  }
					}
			}
	}
	
	// 页面提交
    /*
if ($F('mode') == '1') {
		if($F('flg') == '1' && posList == null){
			var url = 'yb0020RegFromLst.action';
            $('mainForm').action = url;
            $('mainForm').submit();
		}else{
			$('empPosListJson').value = posList.toJSON();
			var url = 'yb0020RegFromLst.action';
	        //var url = 'yb0020RegFromLst.action?' + arrToBean(posList, 'posList');
	        $('mainForm').action = url;
	        $('mainForm').submit();
		}
    } else if ($F('mode') == '4') {
		if($F('flg') == '1' && posList == null){
            var url = 'yb0020RegFromMain.action';
            $('mainForm').action = url;
            $('mainForm').submit();
		}else{
			$('empPosListJson').value = posList.toJSON();
            var url = 'yb0020RegFromMain.action';
            //var url = 'yb0020RegFromMain.action?' + arrToBean(posList, 'posList');
            $('mainForm').action = url;
            $('mainForm').submit();
		}
    } else if ($F('mode') == '3') {
        if ($F('flg') == '2' && posList == null) {
            var url = 'yb0020Update.action?' + dataSerialize($('posTable'));
            $('mainForm').action = url;
            $('mainForm').submit();
        }else if ($F('flg') == '2' && posList != null) {
			$('empPosListJson').value = posList.toJSON();
            var url = 'yb0020Update.action';
            $('mainForm').action = url;
            $('mainForm').submit();
        } else {
			if($F('flg') == '' && posList == null){
	            var url = 'yb0020Update.action?' + dataSerialize($('posTable'));
	            $('mainForm').action = url;
	            $('mainForm').submit();
			}else if($F('flg') == '' && posList != null){
				$('empPosListJson').value = posList.toJSON();
	            var url = 'yb0020Update.action';
	            $('mainForm').action = url;
	            $('mainForm').submit();
			}else{
				var url = 'yb0020Update.action'
				$('mainForm').action = url;
				$('mainForm').submit();				
			}

        }
    }
*/
}
/**
 * 状态变更.
 */
/*
function changeEmpState(){

    var empId = $F('empIdHid');
    var empNm = $F('empCnm');
    
    //	var url = 'yb0030Init.action';
    //	var pars = 'empId=' + empId;
    //	pars = pars + '&empNm=' + encodeURI(empNm);
    
    //	var myAjax = new Ajax.Request(url, {
    //		method: 'post',
    //		parameters: pars,
    //		onComplete: function() {
    //		}
    //	}); 
    
    //    var url = 'yb0020ChangeState.action?empIdHid=' + empId + '&empCnm=' + empNm;
    //    $('mainForm').action = url;
    //    $('mainForm').submit();
    
    if (posList == null) {
      
   location.href = 'yb0020ChangeState.action?empIdHid=' + empId +
        '&empCnm=' +
        encodeURI(empNm) +
        '&updateTime=' +
        $F('updateTime') +
        '&' +
        $('mainForm').serialize();


	  var url = 'yb0020ChangeState.action?empIdHid=' + empId +
        '&empCnm=' +
        encodeURI(empNm) +
        '&updateTime=' +
        $F('updateTime');
	            $('mainForm').action = url;
	            $('mainForm').submit();
    }
    else {

		$('empPosListJson').value = posList.toJSON();
  
    location.href = 'yb0020ChangeState.action?empIdHid=' + empId +
        '&empCnm=' +
        encodeURI(empNm) +
        '&updateTime=' +
        $F('updateTime') +
        '&' +
        $('mainForm').serialize();


 
      $('empPosListJson').value = posList.toJSON();
	    var url = 'yb0020ChangeState.action?empIdHid=' + empId +
        '&empCnm=' +
        encodeURI(empNm) +
        '&updateTime=' +
        $F('updateTime');
	            $('mainForm').action = url;
	            $('mainForm').submit();

    }
    
    //    var url = 'yb0030Init.action?empId=' + empId + '&empNm=' + empNm;
    //   
    //	$('mainForm').action = url;
    //	$('mainForm').submit();
}
*/
/**
 * 自动入力事件.
 */

function autoInput(){
    $('empEmailComp').value = $('empDmnm').value;
}

/**

 * 职位设定.

 */

//function setEmpPosInfo(){
//	
//	var setForm = $('mainForm');
//	setForm.action = 'posSetAction.action' + '?' + dataSerialize($('mainForm'));
//	setForm.submit();
//}
/**

 * 清空事件.

 */

/*

function clearEmpInfo()

 {

 // 员工详细信息内容清空

 $('empId').clear();

 $('empCpnm').clear();

 $('empJrnm').clear();

 $('empCnm').clear();

 $('empJknm').clear();

 $('empCpsnm').clear();

 $('empJnm').clear();

 $('graduated').clear();

 $('degreeList').value = '';

 $('major').clear();

 // 照片数据

 $('startDate').clear();

 $('chargeOrgList').value = '';

 $('empDmnm').clear();

 $('empStatusList').value = '';

 $('empEmailComp').clear();

 $('empEmailPub').clear();

 $('empSex').value = '';

 }

 */




