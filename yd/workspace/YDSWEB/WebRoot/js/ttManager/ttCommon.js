/*
 * @(#)ttCommon.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 社内网系统
 *    SubSystem: 教育考试培训系统
 */
/**
 * @fileoverview 教育考试共通JavaScript.
 *
 * @author renlong
 * @version 1.0
 */
var g_userSelect = new Hash();


var k060131Handle; // 选择考试句柄
var k060141Handle; // 选择课程句柄
var k050021Handle; // 选择试卷句柄
var userSelectModeHandle1; //人员选择模式1句柄
var userSelectModeHandle2; //人员选择模式2句柄
/**
 * 针对对象区分枚举.1:针对全员 2：针对项目组 3：工龄 4：针对个人.
 */
var initmypara = new Hash();

var ObjectTypeEnum = {
    All: 1,
    Project: 2,
    Year: 3,
    Person: 4
};

// 人员选择子画面相关 start
function User(id, name){
    this.id = id;
    this.name = name;
}

/**
 * 取得父页面初始人员数组
 * @return 初始人员数组
 */
function prepareInitUsers(){
    var mode = g_userSelect.get('mode');
    var elementId = g_userSelect.get('elementId');
    
    var usersPrevious = [];
    
    if (mode == 1) {
        // var userIdList = $(elementId).childElements()[0].value;
        var userIdList = $(elementId).down('input', 0).value;
        // var userNameList = $(elementId).childElements()[1].innerHTML;
        var userNameList = $(elementId).down('label', 0).innerHTML;
        
        // 没有用户
        if (userIdList == null || userIdList == '') {
            return usersPrevious;
        }
        // 只有一个用户
        if (userIdList.indexOf(',') < 1) {
            usersPrevious.push(new User(userIdList, userNameList));
            return usersPrevious;
        }
        
        var userId = userIdList.split(',');
        var userName = userNameList.split(',');
        
        for (var i = 0; i < userId.length; i++) {
            usersPrevious.push(new User(userId[i], userName[i]));
        }
    }
    
    return usersPrevious;
}

/**
 * 显示选择的人员
 */
function display(users){

    // 调用模式
    var mode = g_userSelect.get('mode');
    // 控件ID
    var elementId = g_userSelect.get('elementId');
    
    if (mode == 1) {
        var userIdElement = $(elementId).down('input', 0);
        var userNameElement = $(elementId).down('label', 0);
        userIdElement.value = '';
        userNameElement.update();
        
        var userIdList = '';
        var userNameList = '';
        
        //添加新人员
        if (typeof(users) != 'undefined') {
            var len = users.length;
            if (len != 0) {
            
                for (var i = 0; i < len; i++) {
                    //var user = new Element('li', {'id':users[i].id}).update(users[i].name);
                    //Element.insert(usersElement, user);
                    userIdList = userIdList + users[i].id;
                    userNameList = userNameList + users[i].name;
                    if (i != (len - 1)) {
                        userIdList = userIdList + ',';
                        userNameList = userNameList + ',';
                    }
                    
                }
                
                userIdElement.value = userIdList;
                userNameElement.update(userNameList);
            }
        }
    }
    else {
    
        var table = $(elementId);
        var listId = $("cloneTr").childElements()[0].id;
        for (var j = 0; j < users.length; j++) {
            var lengths = table.rows.length;
            if (lengths == 10) {
                return;
            }
            var validateFlag = true;
            for (var i = 0; i < lengths; i++) {
                var idExisted = table.childElements()[0].childElements()[i].childElements()[4].childElements()[0].value;
                if (idExisted == users[j].id) {
                    validateFlag = false;
                }
            }
            
            if (validateFlag) {
                // 新建一行
                var newRow = $("cloneTr").clone(true);
                
                // 设置新建行的ID
                var L = newRow.childElements();
                
                // 设置新建行的属性
                L[0].innerHTML = users[j].name;
                L[4].childElements()[1].name = listId + "[" + table.rows.length + "].userName";
                L[4].childElements()[1].id = listId + "[" + table.rows.length + "].userName";
                
                L[1].childElements()[0].name = listId + "[" + table.rows.length + "].startTime";
                L[2].childElements()[0].name = listId + "[" + table.rows.length + "].endTime";
                L[1].childElements()[0].id = listId + "[" + table.rows.length + "].startTime";
                L[2].childElements()[0].id = listId + "[" + table.rows.length + "].endTime";
                
                L[4].childElements()[0].value = users[j].id;
                L[4].childElements()[1].value = users[j].name;
                L[4].childElements()[0].id = listId + "[" + table.rows.length + "].userId";
                L[4].childElements()[0].name = listId + "[" + table.rows.length + "].userId";
                table.tBodies[0].appendChild(newRow);
                
                listColor(elementId, 300);
            }
        }
		compareTimeForTable(elementId);
    }
}

/**
 * 添加编辑者.
 */
function addRow(table){
    // 新建一行
    var newRow = $("cloneTr").clone(true);
    
    // 设置新建行的ID
    // newRow.id = "p"+table.rows.length;
    var L = newRow.childElements();
    
    // 设置新建行的属性
    L[0].select('input')[0].name = "userName";
    L[0].select('input')[0].id = "userName";
    L[1].select('input')[0].name = "startTime";
    L[1].select('input')[0].id = "startTime";
    L[2].select('input')[0].name = "endTime";
    L[2].select('input')[0].id = "endTime";
    L[3].innerHTML = "<a href = '#' onclick = 'removeRow(" + table + ");'>移除</a>";
    L[4].select('hidden')[0].name = "userId";
    L[4].select('input')[0].id = "userId";
    
    table.tBodies[0].appendChild(newRow);
    
    listColor('editorTable', 100);
}

/**
 * 移除编辑者.
 */
function removeRow(linkElement, tableId){
    // 获得当前行号
    var rowIndex = $(linkElement).up('tr', 0).rowIndex;
    // 该行变色标记
    selectLine(tableId);
    
    var table = $(tableId);
    
    var listId = $("cloneTr").childElements()[0].id;
    
    if (confirm(getMessage("js.tt.warn.JYW12"))) {
    
        // 删除行
        $(tableId).deleteRow(rowIndex);
        
        for (var i = rowIndex; i < table.rows.length; i++) {
            var row = table.rows[i];
            // 设置行的ID
            var L = row.childElements();
            L[1].childElements()[0].name = listId + "[" + i + "].startTime";
            L[2].childElements()[0].name = listId + "[" + i + "].endTime";
            L[4].childElements()[0].name = listId + "[" + i + "].userId";
            L[4].childElements()[1].name = listId + "[" + i + "].userName";
            L[1].childElements()[0].id = listId + "[" + i + "].startTime";
            L[2].childElements()[0].id = listId + "[" + i + "].endTime";
            L[4].childElements()[0].id = listId + "[" + i + "].userId";
            L[4].childElements()[1].id = listId + "[" + i + "].userName";
        }
    }
    compareTimeForTable(tableId);
    listColor(tableId, 300);
}

/**
 * 选择人员
 */
function userSelect(paraMode, paraElementId){

    g_userSelect.set('mode', paraMode);
    g_userSelect.set('elementId', paraElementId);
    
    //随机生成页面
    // var iRand = Math.round(Math.random() * 1000000);
    // var sURL = '../../common/userSelect.jsp?id=' + iRand.toString();
    //var sURL = '../../common/userSelect.jsp';
	// 共通员工选择画面
	var sURL = '../../employee/yb9010Init.action?mode=3';
    var sHandle = 'userSelect' + paraMode;
    
    //计算left,top,居中定位
	var width = 640;
	var height = 450;
    var left = (screen.availWidth - width) * 0.5;
    var top = (screen.availHeight - height) * 0.5;
    var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
    'px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no';
    
    //打开子窗口
    try {
        if (paraMode == 1) {
            userSelectModeHandle1 = window.open(sURL, sHandle, sFeatures);
        }
        else {
            userSelectModeHandle2 = window.open(sURL, sHandle, sFeatures);
        }
        
    } 
    catch (e) {
        MsgBox.error('error');
    }
}

//人员选择子画面相关 end



/**
 * 打开子画面.
 */
function openSubWin(subWinUrl){

    window.open(subWinUrl, 'subwin', 'width=800,height=600');
}

/**
 * 员工ID和姓名控件初始化（TT）.
 * @param {Object} objUserId 员工ID控件.
 * @param {Object} objUserNm 员工姓名控件.
 */
function initTtJsNameFilter(objUserId, objUserNm){
    new JsNameFilter(objUserId, objUserNm, "../../");
}

/**
 * 取得人名.
 */
function getMemberName(objUserid, objUserNm, objForm, elementName, msg){
    var url, pars, id;
    id = $F(objUserid);
    url = '../../common/getUserNmAction.action';
    pars = 'userId=' + encodeURI(id);
    pars = addStamp(pars);
    
    // 清除原有名称
    $(objUserNm).update();
    
    // ID为空时不进行get
    if (id.empty()) {
        return;
    }
    
    // ID输入校验
    if (leaderIdValidate(objForm, elementName, msg, objUserid)) {
        new Ajax.Request(url, {
            method: 'get',
            parameters: pars,
            onComplete: function(request){
                if (!request.responseText.empty()) {
                
                    // 显示服务器的部门主管名称 
                    $(objUserNm).update(request.responseText);
                }
                else {
                    $(objUserid).focus();
                    MsgBox.message(getMessage('js.com.warning.0004', '用户'));
                }
            },
            onFailure: reportError
        });
    }
}

/**
 * 系统错误处理.
 */
function reportError(){
    MsgBox.error(getMessage('js.com.error.0001'));
}


/**
 * 部门主管ID输入校验.
 * @return Boolean true:false.
 */
function leaderIdValidate(objForm, elementName, msg, objUserid){

    form = $(objForm);// 需校验的form
    var continueValidation = true;// 校验状态标记
    // 输入长度校验
    if (form.elements[elementName]) {
        field = form.elements[elementName];
        if (continueValidation && !field.value.empty()) {
            var value = field.value;
            // trim field value
            while (value.substring(0, 1) == ' ') 
                value = value.substring(1, value.length);
            while (value.substring(value.length - 1, value.length) == ' ') 
                value = value.substring(0, value.length - 1);
            if ((6 > -1 && value.length < 6) ||
            (6 > -1 && value.length > 6)) {
                MsgBox.message(getMessage('js.com.warning.0003', msg, '6'));
                continueValidation = false;
            }
        }
        
        // 合法性校验
        if (continueValidation && !field.value.empty() && !field.value.match('19[8-9][0-9]{3}|20[0-9]{4}|[0]{6}')) {
            MsgBox.message(getMessage('js.com.warning.0002', msg));
            continueValidation = false;
        }
    }
    if (continueValidation) {
        return true;
    }
    else {
        $(objUserid).focus();
        return false;
    }
}

//ZHANGAIJUN START
/**
 * 针对对象变化操作.
 * 调用此方法的前提，jsp的项目按DIV的命名要满足条件，在jsp中不要有对DIV隐藏的控制
 */
function showSelectDiv(){
    var showDivValue = $('objectTypeList').value;
    if (ObjectTypeEnum.All == showDivValue) {
        $('div_project').addClassName('none');
        $('div_year').addClassName('none');
        $('div_person').addClassName('none');
        $('div_person_button').addClassName('none');
    }
    else 
        if (ObjectTypeEnum.Project == showDivValue) {
            $('div_project').removeClassName('none');
            $('div_year').addClassName('none');
            $('div_person').addClassName('none');
            $('div_person_button').addClassName('none');
        }
        else 
            if (ObjectTypeEnum.Year == showDivValue) {
                $('div_project').addClassName('none');
                $('div_year').removeClassName('none');
                $('div_person').addClassName('none');
                $('div_person_button').addClassName('none');
            }
            else 
                if (ObjectTypeEnum.Person == showDivValue) {
                    $('div_project').addClassName('none');
                    $('div_year').addClassName('none');
                    $('div_person').removeClassName('none');
                    $('div_person_button').removeClassName('none');
                }
}

/** 
 * 分类初期化.
 * @param {String} pageId 画面ID
 * @param {String} authorityNeed 是否权限控制
 * @param {int} authorityId 权限区分
 * @param {boolean} errorDataExist 是否包含不正常数据
 * @param {String} initExist 是否包含初期值
 * @param {String} sltCategory1 一级分类控件ID
 * @param {String} sltCategory2 二级分类控件ID
 * @param {String} sltCategory3 三级分类控件ID
 * @param {String} firstOptionNull 第一行是否为空
 * @param {String} categorySpeEnable 没有下级分类时，下级分类是否可用区分
 */
function initCategoryList(pageId, authorityNeed, authorityId, errorDataExist, initExist, sltCategory1, sltCategory2, sltCategory3, firstOptionNull, categorySpeEnable){

    var selectIdArr, actionNameArr, sessionPreWord;
    
    var mypara = new Hash();
    
    selectIdArr = [sltCategory1, sltCategory2, sltCategory3];
    
    sessionPreWord = pageId + sltCategory1;
    
    //是否权限控制
    mypara.set(sessionPreWord + 'authorityNeed', authorityNeed);
    //权限区分
    mypara.set(sessionPreWord + 'authorityId', authorityId);
    //是否包含初期值
    mypara.set(sessionPreWord + 'initExist', initExist);
    //是否包含不正常数据
    mypara.set(sessionPreWord + 'errorDataExist', errorDataExist);
    //第一行是否为空
    mypara.set(sessionPreWord + 'firstOptionNull', firstOptionNull);
    //没有下级分类时，下级分类是否可用区分
    mypara.set(sessionPreWord + 'categorySpeEnable', categorySpeEnable);
    
    // Action数组
    actionNameArr = ['../manager/' + 'getCategory1Action.action', '../manager/' + 'getCategory2Action.action', '../manager/' + 'getCategory3Action.action'];
    
    initmypara.set(sessionPreWord, mypara);
    
    registTTMultiSelect(selectIdArr, actionNameArr, mypara, sessionPreWord);
}

function clearCategory(pageId, sltCategory1, sltCategory2, sltCategory3){
    var selectIdArr, actionNameArr, sessionPreWord;
    
    selectIdArr = [sltCategory1, sltCategory2, sltCategory3];
    
    // Action数组
    actionNameArr = ['../manager/' + 'getCategory1Action.action', '../manager/' + 'getCategory2Action.action', '../manager/' + 'getCategory3Action.action'];
    
    sessionPreWord = pageId + sltCategory1;
    var mypara = new Hash();
    mypara = initmypara.get(sessionPreWord);
    
    registTTMultiSelect(selectIdArr, actionNameArr, mypara, sessionPreWord);
}

/** 
 * 注册联动下拉菜单.
 * @param {Object} selectIdArr 下拉菜单Id数组.
 * @param {Object} actionNameArr action Id数组.
 * @param {Object} mypara 参数.
 */
function registTTMultiSelect(selectIdArr, actionNameArr, mypara, sessionPreWord){

    var defaultValueArr;
    
    // 初期值数组(参数3，5，7)
    //if(mypara.get(sessionPreWord+'initExist') == '1'){
    //defaultValueArr = mypara.get(sessionPreWord+'categoryIdInit');
    //}else{
    //defaultValueArr = [0, 0, 0];
    //}
    
    for (var i = 0, len = selectIdArr.size(); i < len; i++) {
        Event.observe($(selectIdArr[i]), 'change', _selectTTOnChange.curry(selectIdArr[i], mypara, sessionPreWord));
        $(selectIdArr[i]).prevSelect = i == 0 ? null : selectIdArr[i - 1];
        $(selectIdArr[i]).nextSelect = i == len ? null : selectIdArr[i + 1];
        $(selectIdArr[i]).action = actionNameArr[i];
        //$(selectIdArr[i]).defaultValue = defaultValueArr[i] ? defaultValueArr[i] : 0;
        $(selectIdArr[i]).defaultValue = $(selectIdArr[i]).readAttribute('defaultValue') || 0;
        $(selectIdArr[i]).enabled = $(selectIdArr[i]).readAttribute('accesskey') || '1';
    }
    // 追加type属性
    $(selectIdArr[0]).writeAttribute('type', 'category1Id');
    $(selectIdArr[1]).writeAttribute('type', 'category2Id');
    $(selectIdArr[2]).writeAttribute('type', 'category3Id');
    
    _resetTTSelect(selectIdArr[0]);
    _loadTTSelectData(selectIdArr[0], true, mypara, sessionPreWord);
    
}

/** 
 * 下拉菜单改变事件.
 * @param {Object} selfId 改变的下拉菜单Id.
 */
function _selectTTOnChange(selfId, mypara, sessionPreWord){

    if ($(selfId).nextSelect != null) {
        _loadTTSelectData.defer($(selfId).nextSelect, false, mypara, sessionPreWord);
        
    }
    
}

/** 
 * 初期加载下拉菜单数据.
 * @param {Object} selectId 菜单Id.
 */
function _loadTTSelectData(selectId, init, mypara, sessionPreWord){
    var param, prevId;
    param = '';
    prevId = $(selectId).prevSelect;
    if (prevId != null) {
    
        param = $(prevId).readAttribute('type') + '=' + encodeURIComponent($(prevId).value);
        
        prevprevId = $(prevId).prevSelect;
        
        if (prevprevId != null) {
            param = param + '&' + $(prevprevId).readAttribute('type') + '=' + encodeURIComponent($(prevprevId).value);
        }
    }
    
    //是否权限控制
    param = param + '& authorityNeed=' + encodeURIComponent(mypara.get(sessionPreWord + 'authorityNeed'));
    //权限区分
    param = param + '& authorityId=' + encodeURIComponent(mypara.get(sessionPreWord + 'authorityId'));
    //是否包含不正常数据
    param = param + '& errorDataExist=' + encodeURIComponent(mypara.get(sessionPreWord + 'errorDataExist'));
    //第一行是否为空
    param = param + '& firstOptionNull=' + encodeURIComponent(mypara.get(sessionPreWord + 'firstOptionNull'));
    
    param = addStamp(param);
    
    new Ajax.Request($(selectId).action, {
        method: 'get',
        parameters: param,
        onComplete: function(request){
            var selectList = request.responseText.evalJSON();
            _resetTTSelect(selectId);
            _setTTSelectList(selectId, selectList, init, mypara, sessionPreWord);
        }
    })
}

/**
 * 设置下拉菜单值.
 * @param {Object} selectId 菜单Id.
 * @param {Object} selectList 数据.
 */
function _setTTSelectList(selectId, selectList, init, mypara, sessionPreWord){
    var optionIdPre;
    var selectElement = $(selectId);
    var initValueExist = false;
    options = selectElement.childElements();
    
    for (var i = 0, len = selectList.length; i < len; i++) {
        //看初期值在列表中是否存在
        if (selectList[i]['categoryId'] == $(selectId).defaultValue) {
            initValueExist = true;
        }
        
        optionIdPre = $(selectId).id + '_';
        if ($(optionIdPre + i) == null) {
            $(selectId).insert({
                bottom: new Element('option', {
                    'id': optionIdPre + i
                })
            });
        }
        $(optionIdPre + i).value = selectList[i]['categoryId'];
        $(optionIdPre + i).update(selectList[i]['categoryName']);
        $(optionIdPre + i).show();
    }
    
    selectElement.disabled = false;
    selectElement.writeAttribute('accesskey', 1);
    
    // 没有下级分类时，下级是否可用区分（参数15）
    if (mypara.get(sessionPreWord + 'categorySpeEnable') == '0') {
        if (selectList.length == 1 && selectList[0]['categoryId'] == 0) {
            selectElement.disabled = true;
            selectElement.writeAttribute('accesskey', 0);
        }
    }
    
    if (init) {
        // 如果有初期值，则设成初期值(参数10)
        if (mypara.get(sessionPreWord + 'initExist') == '1') {
            //如果初期值在列表中没有，则设成第一行
            if (initValueExist == true) {
                $(selectId).value = $(selectId).defaultValue;
            }
            else {
                $(selectId).value = selectList[0]['categoryId'];
            }
        }
        else {
            $(selectId).value = selectList[0]['categoryId'];
        }
        
        // 分类可用不可用区分（参数4,6,8）
        var categoryEnable = $(selectId).enabled;
        
        
        //var categoryEnable=mypara.get(sessionPreWord+'categoryEnable');
        //var categoryNum;
        
        //if ($(selectId).nextSelect!= null) {
        //if ($(selectId).prevSelect!= null) {
        //categoryNum = 1;
        //}else{
        //categoryNum = 0;
        //}
        //}else{
        //categoryNum = 2;
        //}
        
        //if(categoryEnable[categoryNum]=='0'){
        //selectElement.disabled= true;
        //}		
        if (categoryEnable == '0') {
            selectElement.disabled = true;
            selectElement.writeAttribute('accesskey', 0);
        }
        
        
        if ($(selectId).nextSelect != null) {
            _loadTTSelectData($(selectId).nextSelect, true, mypara, sessionPreWord);
        }
        
    }
    else {
        $(selectId).value = selectList[0]['categoryId'];
        if ($(selectId).nextSelect != null) {
            _loadTTSelectData($(selectId).nextSelect, false, mypara, sessionPreWord);
        }
    }
}

/** 
 * 重置菜单到默认状态.
 * @param {Object} selectId 菜单Id.
 */
function _resetTTSelect(selectId){
    var selectElement = $(selectId);
    var options;
    while (selectElement != null) {
        options = selectElement.childElements();
        
        if (options.length > 0) {
            for (var i = 0, len = options.length; i < len; i++) {
                options[i].remove();
            }
        }
        //selectElement.disabled= true;
        
        selectElement = $(selectElement.nextSelect);
    }
    
}

/** 
 * 关闭所有子窗口.
 */
function closeAllChild(){
    if (window.k060131Handle) {
        k060131Handle.close();
    }
    if (window.k060141Handle) {
        k060141Handle.close();
    }
    // 关闭人员选择模式1子画面
    if (window.userSelectModeHandle1) {
        userSelectModeHandle1.close();
    }
    // 关闭人员选择模式2子画面
    if (window.userSelectModeHandle2) {
        userSelectModeHandle2.close();
    }
    if (window.k050021Handle) {
        k050021Handle.close();
    }
    
}

//  ZHANGAIJUN END

//  liuyiwei Start
//弹出画面ID.
var g_box2;

/**
 * 弹出超级管理员登录.
 */
function popPermManager(){

	// 初期化入力项目及校验信息
	$('errormsgDiv').innerHTML = '';
	$('adminId').clear();
	$('adminPw').clear();
	
    if (!g_box2) {
    
        g_box2 = new PopupBox({
            // 唯一标志
            key: 4,
            // 标题内容，元素或字符串
            title: '超级管理员登录',
            // 图标的CSS
            icon: 'img_opt opt_EditTable',
            // 内容元素
            content: $('permManager'),
            // 显示位置，相当与z-index
            position: 4,
            // 是否允许拖动
            drag: true
        })
    }
    
    // 弹出的位置，top left 
    g_box2.Popup();
    
	$('permManager').observe('keydown', function(event){
				    			if(event.keyCode==13){
				    				submitDiv2();
				    			}
				        	});
						
    //$('permManagerIframe').writeAttribute({
    //	src: '../../tt/manager/loadPagePermManagerAction.action'
    //});
}

/**
 * 管理员登陆确认按钮.
 */
function submitDiv2(){

    var pars = $('adminLoginForm').serialize();
    pars = addStamp(pars);
    var url = '../../tt/manager/adminLogin.action';
    new Ajax.Updater('permManager', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
            //initPermManagerForm();
        },
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                if (response.responseText.empty()) {
                
                    window.parent.location = '../../tt/manager/g010021InitMaintPermList.action';
                    closeDiv2();
					showLoader();
                }
            }
        },
        onFailure: reportError
    });
}

/**
 * 关闭弹出的DIV.
 */
function closeDiv2(){

    g_box2.Close();
    
}

//  liuyiwei End


/**
 * 表格的开始时间与结束时间输入校验.
 * @param 表格Id
 */
function compareTimeForTable(tableId){
    if (null != $(tableId).down(0)) {
        listSize = $(tableId).down(0).childElements().length;
        for (var i = 0; i < listSize; i++) {
            startTime = $(tableId).down('tr', i).down('input', 0);
            endTime = $(tableId).down('tr', i).down('input', 1);
            addDateListCheck(startTime, endTime);
        }
    }
}

/**
 * 注册表格的开始时间与结束时间输入校验.
 * @param startTime 开始时间
 * @param startTime 结束时间
 */
function addDateListCheck(startTime, endTime){
	var startDateObj = startTime;
	var endDateObj = endTime;
    addCustomCheck(startDateObj, getMessage('js.com.warning.0006'), 'startTimeCheck', function compareInputTime(){
        if (compareTime(startDateObj, endDateObj)) {
            removeFieldError(endDateObj);
        }
        return compareTime(startDateObj, endDateObj);
    });
    addCustomCheck(endDateObj, getMessage('js.com.warning.0006'), 'endTimeCheck', function compareInputTime(){
        if (compareTime(startDateObj, endDateObj)) {
            removeFieldError(startDateObj);
        }
        return compareTime(startDateObj, endDateObj);
    });
}
/**
 * 配置ckeditor.
 * @param eidtorObject 编辑器对象
 * @param textareaId textarea控件Id
 * @param editorWidth 宽
 * @param editorHeight 高
 * @param toolbarConfig 工具栏配置
 */
function ckeditorConfig(textareaId, editorWidth, editorHeight, toolbarConfig){
	var editor = CKEDITOR.replace(textareaId, {   
					  language : 'zh-cn',   
					  skin : 'office2003', //kama,v2,office2003
					  removePlugins : 'elementspath',
					  //startupFocus : true,   
					  width : editorWidth,   
					  height : editorHeight,   
					  //resize_enabled : false,   
					  resize_maxHeight : editorHeight + 117, 
					  resize_minHeight : editorHeight + 117,  
					  resize_maxWidth : editorWidth, 
					  resize_minWidth : editorWidth,
					  // 可选择字体
					  font_names :	'宋体/SimSun;' + 
					  				'黑体/SimHei;' +
									'ＭＳ Ｐゴシック/ＭＳ Ｐゴシック;' +
									'ＭＳ ゴシック/ＭＳ ゴシック;' +
									'ＭＳ Ｐ明朝/ＭＳ Ｐ明朝;' +
									'ＭＳ 明朝/ＭＳ 明朝;' +
									'HG行書体/HG行書体;' +
									'HG教科書体/HG教科書体;' +
									'HGP創英角ｺﾞｼｯｸUB/HGP創英角ｺﾞｼｯｸUB;' +
									'HGｺﾞｼｯｸE/HGｺﾞｼｯｸE;' +
									'Times New Roman/Times New Roman;' +
									'Arial/Arial;' +
									'Courier New/Courier New;' +
									'Microsoft YaHei/"Microsoft YaHei";' +
									'New Gulim/New Gulim;' + 
									'Georgia/Georgia;' +
									'HGGothicE/HGGothicE;' +
									'Bernard MT Condensed/Bernard MT Condensed;' +
									'Edwardian Script ITC/Edwardian Script ITC;',
					  contentsCss : '../../css/style/editorContents.css', 
					 // bodyClass : 'pre {background-color:#CCCCCC}', 
					  extraPlugins : 'syntaxhighlight',
					  toolbar : toolbarConfig  
					 });
	// 添加预览				 
	addPreview(editor);
	
	return editor;
}

/**
 * 文本编辑器添加预览功能.
 */
function addPreview(editor){
	var previewCmd =
	{
		modes : { wysiwyg:1, source:1 },
		canUndo : false,
		exec : function( editor )
		{
			var sHTML,
				config = editor.config,
				baseTag = config.baseHref ? '<base href="' + config.baseHref + '"/>' : '',
				isCustomDomain = CKEDITOR.env.isCustomDomain();

			if ( config.fullPage )
			{
				sHTML = editor.getData()
						.replace( /<head>/, '$&' + baseTag )
						.replace( /[^>]*(?=<\/title>)/, editor.lang.preview );
			}
			else
			{
				var bodyHtml = '<body ',
						body = editor.document && editor.document.getBody();

				if ( body )
				{
					if ( body.getAttribute( 'id' ) )
						bodyHtml += 'id="' + body.getAttribute( 'id' ) + '" ';
					if ( body.getAttribute( 'class' ) )
						bodyHtml += 'class="' + body.getAttribute( 'class' ) + '" ';
				}

				bodyHtml += '>';

				sHTML =
					editor.config.docType +
					'<html dir="' + editor.config.contentsLangDirection + '">' +
					'<head>' +
					baseTag +
					'<title>' + editor.lang.preview + '</title>' +
					CKEDITOR.tools.buildStyleHtml( editor.config.contentsCss ) +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shCore.js\"></script> ' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushBash.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCpp.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCSharp.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCss.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushDelphi.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushDiff.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushGroovy.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushJava.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushJScript.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPhp.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPlain.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPython.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushRuby.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushScala.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushSql.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushVb.js\"></script>' +
					'	<script type=\"text/javascript\" src=\"../../js/ckeditor/plugins/syntaxhighlight/scripts/shBrushXml.js\"></script>' +
					'	 <link type=\"text/css\" rel=\"stylesheet\" href=\"../../js/ckeditor/plugins/syntaxhighlight/styles/shCore.css\"/>' +
					'	 <link type=\"text/css\" rel=\"stylesheet\" href=\"../../js/ckeditor/plugins/syntaxhighlight/styles/shThemeDefault.css\"/>' +
					'	 <script type=\"text/javascript\">' +
					'	  window.onload=function(){SyntaxHighlighter.config.clipboardSwf = \"../../js/ckeditor/plugins/syntaxhighlight/scripts/clipboard.swf\";' +
					'	  SyntaxHighlighter.all();}' +
					'	 </script>'+
					'</head>' + bodyHtml +
					editor.getData().replace('k060031InitPracticeMode','k060031InitPracticeViewMode') +
					'</body></html>';
			}

			var iWidth	= 640,	// 800 * 0.8,
				iHeight	= 420,	// 600 * 0.7,
				iLeft	= 80;	// (800 - 0.8 * 800) /2 = 800 * 0.1.
			try
			{
				var screen = window.screen;
				iWidth = Math.round( screen.width * 0.8 );
				iHeight = Math.round( screen.height * 0.7 );
				iLeft = Math.round( screen.width * 0.1 );
			}
			catch ( e ){}

			var sOpenUrl = '';
			if ( isCustomDomain )
			{
				window._cke_htmlToLoad = sHTML;
				sOpenUrl = 'javascript:void( (function(){' +
					'document.open();' +
					'document.domain="' + document.domain + '";' +
					'document.write( window.opener._cke_htmlToLoad );' +
					'document.close();' +
					'window.opener._cke_htmlToLoad = null;' +
					'})() )';
			}

			var oWindow = window.open( sOpenUrl, null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' +
				iWidth + ',height=' + iHeight + ',left=' + iLeft );

			if ( !isCustomDomain )
			{
				oWindow.document.open();
				oWindow.document.write( sHTML );
				oWindow.document.close();
			}
		}
	};

	var pluginName = 'previewV2';

	
	editor.addCommand( pluginName, previewCmd );
	editor.ui.addButton( 'PreviewV2',
		{
			label : '预览',
			className : 'cke_button_preview',
			command : pluginName
		});
	
}

 
 /**
  * 根据天数返回指定日期的前几天或后几天
  * @param sDate 'yyyy-MM-dd'
  * @param days 数字 可以为负
  * @return 返回字符串 'yyyy-MM-dd'
  */
 function getNDaySDate(sDate, days) {
 	// 1000 * 60 * 60 * 24
 	var oneDayOfMill = 86400000;
 	var date = new Date(sDate.substring(0, 4), sDate.substring(5, 7) - 1, sDate.substring(8, 10));
 	date.setTime(date.getTime() + Number(days) * oneDayOfMill);
 	
 	return formatOutput(date);
 }
 /**
  * 格式化输出Date()
  * @return 'yyyy-MM-dd'
  */
 function formatOutput(sDate) {
 	var year = sDate.getFullYear();
 	var month = sDate.getMonth() + 1;
 	var day = sDate.getDate();
 	var output;
 	output = '' + year + '-';
 	if (month < 10) {
 		output = output + '0' + month + '-';
 	} else {
 		output = output + '' + month + '-';
 	}
 	if (day < 10) {
 		output = output + '0' + day;
 	} else {
 		output = output + '' + day;
 	}
 	return output;
 }
 
 /**
 * 火狐IE兼容.
 */
function firefoxIE(){
	if (!isIE()) {   
		HTMLElement.prototype.__defineGetter__( "innerText",
			function() {
				var anyString = "";
				var childS = this.childNodes;
				for (var i = 0; i < childS.length; i++) {
		            
					if(childS[i].nodeType==1) {
						anyString += childS[i].tagName=="BR"?'\n':childS[i].innerText;			
					} else if(childS[i].nodeType == 3){
			 			anyString += childS[i].nodeValue;			
					}
		            
				}
				return anyString;
			}
		);
		HTMLElement.prototype.__defineSetter__( "innerText",
			function(sText) {
				this.textContent=sText;
	        }
		); 
	} 
}

function isIE() { 
	if (window.navigator.userAgent.toString().toLowerCase().indexOf("msie")>=1) {
		return true;
	} else {
		return false;
	}
}