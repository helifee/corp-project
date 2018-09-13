/*
 * @(#)comCodeMaint.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */
/**
 * @fileoverview 系统参数维护JavaScript.
 *
 * @author renlong
 * @version 1.0
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
 * 标题文字枚举.
 */
var TitleEnum = {
    Normal: '区分详细信息',
    Create: '区分详细信息 - 新建',
    Modify: '区分详细信息 - 修改',
    Sort: '区分排序'
};

/**
 * 当前操作状态.
 */
var g_operateFlag = OperateEnum.None;

/**
 * 画面onload.
 */
function initForm(){

	setTable();

    $('sortBtn').disable();
    $('creatBtn').disable();
    
    // 弹出区分信息参数设定
    g_box = new PopupBox({
        // 唯一标志
        key: 1,
        // 标题内容，元素或字符串
        title: '区分详细信息-编辑',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_diff_info'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true,

		//加载动画
		loader: true
    
    });
    
    // 弹出区分排序参数设定
    g_box_sort = new PopupBox({
        // 唯一标志
        key: 2,
        // 标题内容，元素或字符串
        title: '区分排序',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_diff_sort'),
        // 显示位置，相当与z-index
        position: 11,
        // 是否允许拖动
        drag: true
    
    });
    
}

/**
 * 取得区分列表信息.
 */
function getDiffInfoList(){

    g_operateFlag = OperateEnum.None;

    var url = 'getDiffListAction.action';
    var pars = 'typeId=' + $F('typeId');

    new Ajax.Updater('div_com_code_maintList', url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){

			//设置table显示
            setTable();

            if ($F('typeId').empty()) {
                $('sortBtn').disable();
                $('creatBtn').disable();
            }
            else {
                $('sortBtn').enable();
                $('creatBtn').enable();
            }
            
        },
        onFailure: reportError
    });
}

/**
 * 设置table显示.
 */
function setTable(){
    listColor('table_diffList');
    var row = $('table_diffList').select('tr');
    
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
                if (col[j].innerHTML == '1') {
                    row[i].removeClassName('odd').removeClassName('even');
                    row[i].addClassName('del');
                }
            }
        }
    }
}

/**
 * 修改区分信息.
 * @param {String} diffNo 区分NO.
 */
function modifyDiffInfo(diffNo){

    g_operateFlag = OperateEnum.Modify;

    setTable();

    // 该行变色标记
    selectLine('table_diffList');

    // 弹出的位置，top left 
    

    var url = 'getDiffInfoAction.action';
    var pars = 'typeId=' + $F('typeId') + '&diffNo=' + diffNo;
    pars = addStamp(pars);

    new Ajax.Updater('div_diff_info', url, {
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

            $('diffNo').disable();
			
            //$('diff_info_view_title').innerHTML = TitleEnum.Modify;
			g_box.loaded();
			initValidation('diffInfoForm');
        }
    });
	g_box.Popup();
	
	
	
}

/**
 * 新建区分信息.
 */
function creatDiffInfo(){

    g_operateFlag = OperateEnum.Create;
    

    
    var url = 'getDiffInfoAction.action';
    var pars = 'typeId=' + $F('typeId');
    pars = addStamp(pars);

    new Ajax.Updater('div_diff_info', url, {
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
            //$('diff_info_view_title').innerHTML = TitleEnum.Create;
			
			// 弹出的位置，top left 
    		
			g_box.loaded();
			propertyValidation();
        }
    });
	g_box.Popup();
	
	
}

/**
 * 提交按钮事件.
 */
function submitDiffInfo(){

    // 输入校验
    if (!validate()) {
        return;
    }

    // 修改状态下
    if (g_operateFlag == OperateEnum.Modify) {
        submitModify();
        
        // 新建状态下
    }
    else if (g_operateFlag == OperateEnum.Create) {
            submitCreate();
        }
}

/**
 * 提交新建表单.
 */
function submitCreate(){

    // 页面提交addDiffInfoAction
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
	    var url = 'addDiffInfoAction.action';
        var pars = $('diffInfoForm').serialize() + '&typeId=' + $F('typeId');

        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
				if (request.responseText.empty()) {
					MsgBox.message(getMessage('js.com.warning.0005', '区分'));
				} else {
					g_box.close();
                	getDiffInfoList();
				}
            },
            onFailure: reportError
        });
	}, function(){
		// 取消时回调
		return;
	}, '是', '否');

}

/**
 * 提交修改表单.
 */
function submitModify(){

    // 页面提交updDiffInfoAction
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
		// 确定时回调
		var url = 'updDiffInfoAction.action';
        
        // 修改状态下diffNo被禁用，serialize方法无法取到，需要手动添加
        var pars = 'comCodeMaint.diffNo=' + $F('diffNo') + '&' + $('diffInfoForm').serialize() + '&typeId=' + $F('typeId');
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                if (request.responseText.empty()) {
					MsgBox.message(getMessage('js.com.info.0010'));
				} else {
					g_box.close();
                	getDiffInfoList();
				}
            },
            onFailure: reportError
        });
	}, function(){
		// 取消时回调
		return;
	}, '是', '否');
}

/**
 * 区分排序弹出.
 */
function sortDiffInfoList(){

    g_operateFlag = OperateEnum.Sort;
    // 弹出的位置，top left 
    g_box_sort.Popup(150, 500);
    
    var url = 'getDiffInfoSortAction.action';
    var pars = 'typeId=' + $F('typeId');
    pars = addStamp(pars);
    
    new Ajax.Updater('div_diff_sort', url, {
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
 * 系统错误处理.
 */
function reportError(){
	MsgBox.message(getMessage('js.com.error.0001'));
}

/**
 * 取消.
 */
function cancel(){
    if (g_operateFlag == OperateEnum.Sort) {
        g_box_sort.close();
    }
    else {
        g_box.close();
    }
}

/**
 * 区分上移.
 */
function moveUp(){
    var selectObj = $('diffSort');
    var theObjOptions = selectObj.options;
    for (var i = 1; i < theObjOptions.length; i++) {
        if (theObjOptions[i].selected && !theObjOptions[i - 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i - 1]);
        }
    }
}

/**
 * 区分下移.
 */
function moveDown(){
    var selectObj = $('diffSort');
    var theObjOptions = selectObj.options;
    for (var i = theObjOptions.length - 2; i > -1; i--) {
        if (theObjOptions[i].selected && !theObjOptions[i + 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i + 1]);
        }
    }
}

/**
 * 区分交换.
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
 * 提交区分排序.
 */
function submitDiffSort(){
    var selectObj = $('diffSort');
    var theObjOptions = selectObj.options;
    var diffSort = '';
    for (var i = 0; i < theObjOptions.length; i++) {
        diffSort = diffSort + ',' + theObjOptions[i].value;
    }
    
    // 页面提交updDiffSortAction
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){

        var url = 'updDiffSortAction.action';
        
        var pars = 'diffSort=' + diffSort + '&typeId=' + $F('typeId');
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                g_box_sort.close();
                getDiffInfoList();
            },
            onFailure: reportError
        });
	}, function(){
		// 取消时回调
		return;
	}, '是', '否');

}

/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate() {

	// 区分NO输入校验
	if (!diffNoValidate()) {
		return false;
	}
	
	// 区分名称输入校验
	if (!diffNmValidate()) {
		return false;
	}
	
	// 区分略称输入校验
	if (!diffSnmValidate()) {
		return false;
	}

	// 附加属性校验
	form = $('diffInfoForm');// 需校验的form
	
	var hiddens = form.select('[type="hidden"]');

	for (var i = 0; i < hiddens.length; i++) {
		var id = hiddens[i].id;
		if (id.include('validatePro')) {
			var index = id.replace('validatePro', '');
			field = form.elements['comCodeMaint.pro' + index];
			// 输入合法化校验
			if (field.value != null && !field.value.match(hiddens[i].name)) {
				var warningName = hiddens[i].up('div').select('label')[0].innerHTML;
				MsgBox.message(getMessage('js.com.warning.0002', warningName));
				$(index).focus();
				return false;
			}
		}
	}

	return true;
}

/**
 * 区分NO输入校验.
 * @return Boolean true:false.
 */
function diffNoValidate() {

	form = $('diffInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	if (form.elements['comCodeMaint.diffNo']) {
		field = form.elements['comCodeMaint.diffNo'];
		// 非空校验
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			MsgBox.message(getMessage('js.com.warning.0001', '区分NO'));
			continueValidation = false;
		}
		
		// 输入长度校验
		if (continueValidation && field.value != null) {
			var value = field.value;
			// trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if ((15 > -1 && value.length > 15)) {
				MsgBox.message(getMessage('js.com.warning.0003', '区分NO', '15'));
				continueValidation = false;
			}
		}
		
		// 输入合法化校验
		if (continueValidation && field.value != null && !field.value.match('[a-z0-9A-Z]{1,15}')) {
			MsgBox.message(getMessage('js.com.warning.0002', '区分NO'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('diffNo').focus();
		return false;
	}
}

/**
 * 区分名称输入校验.
 * @return Boolean true:false.
 */
function diffNmValidate() {

	form = $('diffInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 非空校验
	if (form.elements['comCodeMaint.diffName']) {
		field = form.elements['comCodeMaint.diffName'];
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			MsgBox.message(getMessage('js.com.warning.0001', '区分名称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('diffName').focus();
		return false;
	}
}

/**
 * 区分略称输入校验.
 * @return Boolean true:false.
 */
function diffSnmValidate() {

	form = $('diffInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	// 非空校验
	if (form.elements['comCodeMaint.diffShortName']) {
		field = form.elements['comCodeMaint.diffShortName'];
		if (continueValidation && field.value != null && (field.value.empty() || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			MsgBox.message(getMessage('js.com.warning.0001', '区分略称'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('diffShortName').focus();
		return false;
	}
}
