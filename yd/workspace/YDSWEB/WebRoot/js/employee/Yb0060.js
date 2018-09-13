/*
 * @(#)Yb0060.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
 */
/**
 * @fileoverview 系统参数维护JavaScript.
 *
 * @author pengchuan
 * @version 1.0  2010/07/21
 */
/**
 * 操作状态枚举.0:无 1：新建 2：更改 3：排序.
 */
var OperateEnum = {
    None: '0',
    Create: '1',
    Modify: '2',
    Sort: '3'
};

/**
 * 标题枚举.
 */
var TitleEnum = {
    Normal: '职位详细信息',
    Create: '职位详细信息 - 新建',
    Modify: '职位详细信息 - 修改',
    Sort: '职位排序'
};

/**
 * 当前操作状态.
 */
var g_operateFlag = OperateEnum.None;

/**
 *初期画面加载
 */
function initForm(){

    setTable();
	if($('sortBtn')){
	    $('sortBtn').disable();
	    $('creatBtn').disable();
	}
/**
 *编辑弹出画面
*/
    g_box = new PopupBox({
        // 唯一标志
        key: 1,
        // 标题内容，元素或字符串
        title: '职位详细信息-编辑',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_pos_info'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true,
        //加载动画
        loader: true
    });

/**
 *排序弹出画面
*/
    g_box_sort = new PopupBox({
        // 唯一标志
        key: 2,
        // 标题内容，元素或字符串
        title: '职位排序',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_pos_sort'),
        // 显示位置，相当与z-index
        position: 11,
        // 是否允许拖动
        drag: true
    });
    
}

/**
 * 取得职位列表信息.
 */
function getPosInfoList(){

    g_operateFlag = OperateEnum.None;
    
    var url = 'yb0060FindList.action';
    var pars = 'posTypeId=' + $F('posTypeId');
    
    new Ajax.Updater('div_emp_posList', url, {
        method: 'post',
        parameters: pars,
        onComplete: function(response){
       
	        setTable();
            if ($F('posTypeId').empty()) {
                $('sortBtn').disable();
                $('creatBtn').disable();
            }
            else {
                $('sortBtn').enable();
                $('creatBtn').enable();
            }
			 
           /**
            * 检出结果隔行变色
            */
           //listColor('table_posList', 450); 
        }
    });
}
	
/**
 * 设置table显示.
 */
function setTable(){
	
    listColor('table_posList',450);
    var row = $('table_posList').select('tr');
    
    for (var i = 0, len = row.length; i < len; i++) {
        var col;
        if (i == 0) {
            col = row[i].select('th');
        }
        else {
            col = row[i].select('td');
        }
        for (var j = 0, len1 = col.length; j < len1; j++) {
            if (j == 3) {
               col[j].hide();
                if (col[j].innerHTML == '0') {
                    row[i].removeClassName('odd').removeClassName('even');
                    row[i].addClassName('del');
                }
            }
        }
    }
}
/**
 * 修改职位信息弹出.
 * @param {String} posId
 */
function modifyPosInfo(posId){

    g_operateFlag = OperateEnum.Modify;
	
	setTable();

    // 该行变色标记
    selectLine('table_posList');
    var url = 'yb0060CreatePosInfo.action';
    var pars = 'posId=' + posId;
    pars = addStamp(pars);
    new Ajax.Updater('div_pos_info', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onLoading: function(){
        },
        onSuccess: function(response){
        },
        onFailure: function(request){
        },
        onComplete: function(request){
     
           // $('diff_info_view_title').innerHTML = TitleEnum.Modify;
            g_box.loaded();
            initValidation('posInfoForm');
            if ($('posState').value == 1) {
                $('posState').checked = true;
            }
        }
    });
    g_box.Popup();
	
}

/**
 * 新建职位信息弹出.
 */
function creatPosInfo(){


    g_operateFlag = OperateEnum.Create;
    
    
    var url = 'yb0060CreatePosInfo.action';
    var pars = 'posTypeId=' + $F('posTypeId');
    pars = addStamp(pars);
    
    new Ajax.Updater('div_pos_info', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onLoading: function(){
        },
        onSuccess: function(response){
        },
        onFailure: function(request){
        },
        onComplete: function(request){
            // $('diff_info_view_title').innerHTML = TitleEnum.Create;
            g_box.loaded();
			initValidation('posInfoForm');
            propertyValidation();
            $('posState').checked = true;
            
        }
    });
    g_box.Popup();
    
}

/**
 * 职位排序弹出.
 */
function sortPosInfoList(){

    g_operateFlag = OperateEnum.Sort;
    // 弹出的位置，top left 
    g_box_sort.Popup(150, 500);
    
    var url = 'yb0060PosInfoSort.action';
    var pars = 'posTypeId=' + $F('posTypeId');
    pars = addStamp(pars);
    
    new Ajax.Updater('div_pos_sort', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onLoading: function(){
        },
        onSuccess: function(response){
        },
        onFailure: function(request){
        },
        onComplete: function(request){
        }
    });
}

/**
 * 提交按钮.
 */
function submitPosInfo(){

    
    // 修改状态下
    if (g_operateFlag == OperateEnum.Modify) {
        submitModify();
        
    // 新建状态下
    }
    else 
        if (g_operateFlag == OperateEnum.Create) {
            submitCreate();
        }
}

/**
 * 提交新建表单.
 */
function submitCreate(){
	
    //输入校验
    if (!checkForm('posInfoForm')) {
        return;
    }
	
    MsgBox.confirm(getMessage('js.com.info.0002'), '确认对话框', function(){
        if ($('posState').checked == true) {
            $('posState').value = '1';
		
        }
        
        var url = 'yb0060AddPosInfo.action';
        var pars = $('posInfoForm').serialize() + '&posTypeId=' + $F('posTypeId');
        
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                g_box.close()
                getPosInfoList()
            },
            onFailure: reportError
        });
    }, function(){
        // 取消时回调
     
    }, '是', '否');
    
}

/**
 * 提交修改表单.
 */
function submitModify(){
	
    //输入校验
    if (!checkForm('posInfoForm')) {
        return;
    }
	
	
    MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
		if ($('posState').checked == true) {
            $('posState').value = '1';
        }
        var url = 'yb0060UpdPosInfo.action';
        var pars = $('posInfoForm').serialize();
        
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
			onSuccess:function(request){
			},
            onComplete: function(request){
                g_box.close()
                getPosInfoList()
            },
            onFailure: reportError
        });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');

}







/**
 * 职位顺序上移.
 */
function moveUp(){
    var selectObj = $('posSort');
    var theObjOptions = selectObj.options;
    for (var i = 1; i < theObjOptions.length; i++) {
        if (theObjOptions[i].selected && !theObjOptions[i - 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i - 1]);
        }
    }
}
/**
 * 职位顺序下移.
 */
function moveDown(){
    var selectObj = $('posSort');
    var theObjOptions = selectObj.options;
    for (var i = theObjOptions.length - 2; i > -1; i--) {
        if (theObjOptions[i].selected && !theObjOptions[i + 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i + 1]);
        }
    }
}

/**
 *顺序交换.
 */
function swapOptionProperties(option1, option2){
    var tempStr = option1.value;
    option1.value = option2.value;
    option2.value = tempStr;
    tempStr = option1.text;
    option1.text = option2.text;
    option2.text = tempStr;
    tempStr = option1.selected;
    option1.selected = option2.selected;
    option2.selected = tempStr;
}

/**
 * 提交职位排序.
 */
function submitPosSort(){
    var selectObj = $('posSort');
    var theObjOptions = selectObj.options;
    var posSort = '';
    for (var i = 0; i < theObjOptions.length; i++) {
        posSort = posSort + ',' + theObjOptions[i].value;
    }
	MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
	   
	    var url = 'yb0060UpdPosSort.action';
        var pars = 'posSort=' + posSort;
        
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                g_box_sort.close()
                getPosInfoList()
            },
            onFailure: reportError
        });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
    
   
}
/**
 * 系统错误处理.
 */
function reportError(){
    alert(getMessage('js.com.error.0001'));
}

/**
 * 取消命令处理.
 */
function cancel(){
    if (g_operateFlag == OperateEnum.Sort) {
        g_box_sort.close();
    }
    else {
        g_box.close();
    }
}

