/*
 * @(#)k040011.js
 * @fileoverview 题库检索一览JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试系统
 */
//全局变量
/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
    Show: '展开',
    Hide: '收缩'
};

/**
 * 批量处理形式枚举.
 */
var BatchEnum = {
    Input: '1',
    Modify: '2',
    Delete: '3',
    Check: '4'
};

/**
 * 试题类型枚举.
 */
var TestTypeEnum = {
    Test: '1',
    Practice: '2'
};

/**
 * 题库画面模式枚举.
 */
var QbPageEnum = {
    Manage: 1,
    Practice: 2,
    Test: 3
};

/**
 * 全选按钮状态flg.
 */
var checkFlg = false;

/**
 * 保存已选择的试题.
 */
var checkBoxStatusHash = new Hash();
var listQuestion = new Array();

/**
 * 关键字信息.
 */
var g_jscon;

/**
 * 画面初始化.
 * @param {String} uiFlg 画面显示flg.
 */
function initForm() {
	
	// 火狐IE兼容
	firefoxIE();

    // 关键字信息
    g_jscon = new JsContentFilter('keyword', 'k040011GetKeywordList.action', 'keywordList');
    
    // 员工ID，姓名动态检索控件
    initTtJsNameFilter('createUserId', 'createUserNm');
    initTtJsNameFilter('updateUserId', 'updateUserNm');
    
    //接口参数.题库画面模式 = <题库管理>时
    if ($('questionUiModel').value == QbPageEnum.Manage) {
        // 分类下拉列表设置
        initCategoryList('k040011', '1', 3, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '0', '1');
    }
    else {
        // 接口参数.题库画面模式 = <练习选题>或<考试选题>时：
		// 分类下拉列表设置
        initCategoryList('k040011', '0', 1, false, '1', 'sltCategory1', 'sltCategory2', 'sltCategory3', '0', '1');
    }
    
    //焦点设置
    $('qbtList').focus();
    
 //   if ($F('itemCount') == 0 && $F('questionUiModel') == QbPageEnum.Manage) {
  //      $('btnUpdate').disable();
  //      $('btnDelete').disable();
  //      $('btnCheck').disable();
 //       $('selAll').disable();
 //   }
    
    // 试题题型设置
    if ($F('questionUiModel') == QbPageEnum.Practice ||
    $F('questionUiModel') == QbPageEnum.Test) {
        $('qkList').disable();
    }
    
    // 练习功能屏蔽，练习不可选。
    //if ($F('questionUiModel') != QbPageEnum.Manage) {
        $('qbtList').disable();
    //}
    
    // 试题内容去Tag
	for (var i=0; i < $('k040011List').rows.length - 1; i++) {
		$('content' + i).innerText = $('rtfContent' + i).innerText.replace( /\r|\n/g, "");
		$('content' + i).title = $('rtfContent' + i).innerText;
	}
	
	// 初始条件保存
	var pars = $('questionForm').serialize();

    if ($('qkList').disabled == true) {
        pars = '&searchInfo.questionKind=' +
        $('qkList').value +
        '&' +
        pars;
    }
    if ($('qbtList').disabled == true) {
        pars = '&searchInfo.questionType=' +
        $('qbtList').value +
        '&' +
        pars;
    }
    $('oldParam').value = pars;
	
	
    // 重置列表颜色
    listColor('k040011List');
}

/**
 * 清空画面项目.
 */
function clearItems(){
    if (confirm(getMessage('js.tt.warn.JYW13'))) {
        // 画面信息清空
        if ($('qbtList').disabled == false) {
            $('qbtList').value = $('questionType').value;
        }
        
        $('keyword').clear();//关键字
        if ($('qkList').disabled == false) {
            $('qkList').clear();//试题题型
        }
        
        $('qdList').clear();//试题难度
        $('scoreDown').clear();//试题分数
        $('scoreUp').clear();//试题分数
         $('cfList').clear();//核对状态
        $('createUserId').clear();//创建者
        $('updateUserId').clear();//更新者
        $('createUserNm').clear();//创建者名
        $('updateUserNm').clear();//更新者名
        if ($('sltCategory1').disabled == false) {
            clearCategory('k040011', 'sltCategory1', 'sltCategory2', 'sltCategory3')
        }
        
        //焦点设置
        if ($('qbtList').disabled == false) {
            $('qbtList').focus()
        }
        $('errorMessage').hide();
        clearError('questionForm');
    }
}

/**
 * 信息栏展开收缩.
 */
function resize(){
    $('div_k040011_view').toggle();
    
    // 更改图标及提示文字
    if ($('modifyIcon').hasClassName('opt_FillRight')) {
        $('modifyIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
        $('modifyIcon').title = IconMsgEnum.Show;
    }
    else {
        $('modifyIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
        $('modifyIcon').title = IconMsgEnum.Hide;
    }
}

/**
 * 题库检索事件.
 */
function getQuestionInfo(){

    //校验通过时
    if (validate()) {

        // 显示加载动画
        showLoader();
        
        //检索数据并刷新信息显示列表
        var url = 'k040011GetQuestionList.action';
        var pars = $('questionForm').serialize();
        if ($('qkList').disabled == true) {
            pars = '&searchInfo.questionKind=' +
            $('qkList').value +
            '&' +
            pars;
        }
        if ($('qbtList').disabled == true) {
            pars = '&searchInfo.questionType=' +
            $('qbtList').value +
            '&' +
            pars;
        }
        $('oldParam').value = pars;
        
        pars = '&category1Id=' +
        $('sltCategory1').value +
        '&category2Id=' +
        $('sltCategory2').value +
        '&category3Id=' +
        $('sltCategory3').value +
        '&mode=' +
        $('mode').value +
        '&paperId=' +
        $('paperId').value +
        '&' +
        pars;
        pars = addStamp(pars);
        new Ajax.Updater('div_k040011_list', url, {
            parameters: pars,
            method: 'post',
            onLoading: function(){
            },
            onSuccess: function(response){
            },
            onFailure: function(request){
                reportError();
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    // 重置列表颜色
                    listColor('k040011List');

                    for (var i=0; i < $('k040011List').rows.length - 1; i++) {
						$('content' + i).innerText = $('rtfContent' + i).innerText.replace( /\r|\n/g, "");
						$('content' + i).title = $('rtfContent' + i).innerText;
					}
                }
                // 隐藏加载动画
                hideLoader();
            }
        });
    }
}

/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber){
    // 显示加载动画
    showLoader();
    
    //从隐藏控件中取出上次使用的检索条件
    var pars = $('oldParam').value;
    pars = '&category1Id=' +
    $('sltCategory1').value +
    '&category2Id=' +
    $('sltCategory2').value +
    '&category3Id=' +
    $('sltCategory3').value +
    '&mode=' +
    $('mode').value +
    '&paperId=' +
    $('paperId').value +
    '&' +
    pars;
    //设定url以及其余参数
    var url = pageUrl + '&pageNumber=' + pageNumber + '&' + pars;
    pars = addStamp(pars);
    new Ajax.Updater('div_k040011_list', url, {
        onComplete: function(request){
        var flg = checkException(request);
        if (!flg) {
            // 重置列表颜色
            listColor('k040011List');
			
			for (var i=0; i < $('k040011List').rows.length - 1; i++) {
				$('content' + i).innerText = $('rtfContent' + i).innerText.replace( /\r|\n/g, "");
				$('content' + i).title = $('rtfContent' + i).innerText;
			}
					
            // 隐藏加载动画
            hideLoader();
        }
        }
    });
    //全选按钮状态flg初始化
    checkFlg = false;
}

/**
 * 新建试题处理
 */
function newQuestion(){
    // 显示加载动画
    showLoader();
    
    targetForm = $('questionForm');
    targetForm.action = 'k040021InitNewQuestionMode';
    targetForm.submit();
}


/**
 * 保存checkBox状态.
 */
function setCheckBoxStatus(){

    var table_paperList = $('k040011List');
    if (table_paperList.rows.length >= 1) {
    
        for (var i = 0, len = table_paperList.rows.length - 1; i < len; i++) {
            var itemSelected = 'questionSelected' + i;
            var itemId = 'questionId' + i;
            
            $(itemSelected).checked = checkBoxStatusHash.get($(itemId).innerText);
        }
    }
}

/**
 * 全部选中/取消.
 * @param {bool} flg 选中/取消，null时根据checkbox判断.
 */
function selectAll(){

    // 取得一览件数
    var itemCounts = $F('itemCount');
    
    if (itemCounts != 0) {
        for (var i = 0; i < itemCounts; i++) {
            var itemSelected = 'questionSelected' + i;
            var itemId = 'questionId' + i;
            
            // 设置checkBox选中状态
            $(itemSelected).checked = $('selAll').checked;
            if ($('selAll').checked) {
            
                // 添加到checkbox选中结果Hash			
                checkBoxStatusHash.set($(itemId).innerText, $(itemSelected).checked);
            }
            else {
                // 添加到checkbox选中结果Hash			
                checkBoxStatusHash.unset($(itemId).innerText, $(itemSelected).checked);
            }
            
        }
    }
}

/**
 * 选中/取消单条数据.
 */
function selectOneItem(itemIndex){
    var itemSelected = 'questionSelected' + itemIndex;
    var itemId = 'questionId' + itemIndex;
    if ($(itemSelected).checked) {
    
        // 添加到checkbox选中结果Hash			
        checkBoxStatusHash.set($(itemId).innerText, $(itemSelected).checked);
    }
    else {
        // 添加到checkbox选中结果Hash			
        checkBoxStatusHash.unset($(itemId).innerText, $(itemSelected).checked);
    }
    
}

/**
 * 将保存选中id的哈希表转化为数组
 */
function hashToArray(){
    //将选择的题库Id保存
    return checkBoxStatusHash.toJSON();
}

/**
 * 批量处理
 */
function batchDeal(mode){
    if (BatchEnum.Input == mode) {
        // 批量录入
        // 显示加载动画
        showLoader();
        
        targetForm = $('questionForm');
        targetForm.action = 'k040041QuestionCreateAll';
        targetForm.submit();
        
    }
    else 
        if (BatchEnum.Modify == mode) {
            // 批量修改
            if (isNoneChecked()) {
                // 显示加载动画
                showLoader();
                targetForm = $('temporaryForm');
                targetForm.action = 'k040031GetQuestionLibraryList?questionIdStrJson=' + checkBoxStatusHash.toJSON();
                targetForm.submit();
            }
        }
        else 
            if (BatchEnum.Delete == mode) {
                // 批量删除
                if (isNoneChecked()) {
                    // 显示加载动画
                    showLoader();
                    targetForm = $('temporaryForm');
                    targetForm.action = 'k040051InitQuesViewAndCheckMode?jsonQueIdList=' + hashToArray() + '&mode =3'+'&callScreenId =k040011'
                    targetForm.submit();
                }
            }
            else 
                if (BatchEnum.Check == mode) {
                    // 批量核对
                    if (isNoneChecked()) {
                        // 显示加载动画
                        showLoader();
                        targetForm = $('temporaryForm');
                        targetForm.action = 'k040051InitQuesViewAndCheckMode?jsonQueIdList=' + hashToArray() + '&mode =2'+'&callScreenId =k040011';
                        targetForm.submit();
                    }
                }
}

/**
 * 题库最终选择按钮的单击事件
 */
function btnChooseClick(){

    if (isNoneChecked()) {
        window.close()
        window.opener.chooseQuestionCallBack(hashToArray());
    }
}

/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate(){

    if (!checkForm('questionForm')) {
        return false;
    }
    
    return true;
}

/**
 * 选中校验.
 * @return Boolean true:false.
 */
function isNoneChecked(){
    //取得table现在的行数
    var rowCnt = $('k040011List').rows.length;
    var isCheckFlg = false;
    for (var i = 0; i < rowCnt - 1; i++) {
        var a = "questionSelected" + i;
        if ($(a).checked == true) 
            isCheckFlg = true;
    }
    //一件都没有被选中时
    if (isCheckFlg == false) {
        //alert(getMessage('js.tt.info.KST11', '试题'));
        MsgBox.message(getMessage('js.tt.info.KST11', '试题'));
        return false;
    }
    return true;
}

/**
 * 关键字取得.
 */
function getKeyword(category1Id){

    // 关键字信息
    var url = 'k040011GetKeywordList.action?category1Id=' + category1Id;
    g_jscon.setContentArray(url)
}

/**
 * 试题预览.
 */
function initQuesViewAndCheckMode(obj){
	
	var clickLine = obj.up('tr', 0);
	var questionId = clickLine.select('input')[0].value;
	var mode = '1';
    var url = 'k040051InitQuesViewAndCheckMode.action?queId=' + questionId + '&mode=' + mode;
    window.open(url, 'newwindow');
}
