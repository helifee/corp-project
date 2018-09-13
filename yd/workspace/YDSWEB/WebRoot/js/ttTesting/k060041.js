/*
 * @(#)k060041.js
 * @fileoverview 考生答卷&试卷预览(单题)画面JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 *  考生答卷&试卷预览(单题)JavaScript.
 *
 * @author lijinling
 * @version 1.0 2010/03/29
 */
// 倒计时
var g_timer;

// 画面模式
var g_mode;

// 剩余时间
var g_leftTime;

//当前大题的索引
var g_currentbigQuestion = -1;

//当前小题的索引
var g_currentQuestion;

//当前大题在小题列表的起始索引
var g_bigQuestionStart;

// 操作枚举
var OperationFlagEnum = {
    PREB: 1,
    PRE: 2,
    NEXT: 3,
    NEXTB: 4
}

// 模式枚举
var ModeEnum = {
    EDIT: 1,
    PRACTICE_VIEW: 2,
    PRACTICE: 3,
    EXAM: 4,
    GEN_VIEW: 5
}

// 试题题型枚举
var QuestionStyleEnum = {
    SINGLEOPTION: 1,
    MULOPTION: 2,
    JUDGE: 3,
    BLANK: 4,
    TEXTAREA: 5,
    UPLOAD: 6
}
// 填空题固定长度
var g_Blanklength = 10;

// 填空题答案分隔符
var g_BlankDevider = '[aparter]';

// 页面标题枚举
var TitleEnum = {
    TEST: '考生答卷(单题)',
    VIEW: '试卷预览(单题)'
}
// 试卷详细信息
var g_test;

// form外校验用
var body_validation = {
    'questionOrder': {
        'regex': {
            'message': getMessage('js.tt.error.KSE15'),
            'param': {
                'expression': '[0-9]$'
            }
        }
    }
};
/**
 * 画面初期表示.
 */
function init(){
    // 画面模式取得
    g_mode = parseInt($('mode').value, 10);
    // 获得试卷信息
    getTestInfo();
}

/**
 * 取得试卷信息.
 */
function getTestInfo(){
    // 显示加载动画
    showLoader();
    var url = 'k060041GetTestPaperSingleQues.action';
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                // 隐藏加载动画
                hideLoader();
                // 将返回的JSON串解析成试卷对象
                g_test = request.responseText.evalJSON(true);
                // 画面模式相关设定
                setMode(g_mode);
                // 初期问题设定
                initSetQuestion();
                // 设定试题跳转按钮模式
                setButtonMode();
            }
        }
    })
}

/**
 * 初期问题设定.
 */
function initSetQuestion(){
    // 试卷标题
    $('testTitle').update(g_test.paperTitle);
    // 试卷说明
    $('testInfo').update(g_test.paperDescription);
    // 答题卡说明
    //$('answerSheetInfo').update(g_test.paperDescription);
    // 答题卡标题
    //$('answerSheetTitle').update(g_test.paperTitle);
    // 若试卷没有大题
    if (!g_test.bigQuestions || g_test.bigQuestions.length == 0) {
        g_currentbigquestion = -1;
        g_bigquestionStart = -1;
        return;
    }
    // 最近答题的大题编号
    var currentBigquestionSerialNo = $('curBigquestionSerialNo').value;
    if (currentBigquestionSerialNo.length == 0) {
        g_currentbigquestion = 0;
    }
    else 
        if (!isNaN(currentBigquestionSerialNo)) {
            var curBigquestionSerialNo = parseInt(currentBigquestionSerialNo, 10);
            for (var i = 0; i < g_test.bigQuestions.length; i++) {
                if (curBigquestionSerialNo == g_test.bigQuestions[i].bigquestionSerialNo) {
                    g_currentbigquestion = i;
                }
            }
        }
    var bigquestionSerialNo = g_test.bigQuestions[g_currentbigquestion].bigquestionSerialNo;
    var flag = false;
    // 取得当前大题的小题起始索引
    for (var i = 0; i < g_test.examQuestions.length; i++) {
        if (bigquestionSerialNo == g_test.examQuestions[i].bigquestionSerialNo) {
            g_currentQuestion = i;
            g_bigquestionStart = i;
            flag = true;
            break;
        }
    }
    if (!flag) {
        g_bigquestionStart = -1;
        g_currentbigquestion = 0;
    }
    else {
        var currentQuestionId = $('currentQuestionId').value;
        for (var i = 0; i < g_test.examQuestions.length; i++) {
            if (g_test.examQuestions[i].questionId == currentQuestionId) {
                g_currentQuestion = i;
            }
        }
    }
    refreshQuestion();
}

/**
 * 模式设定.
 *
 */
function setMode(mode){
    switch (mode) {
        case ModeEnum.EDIT:
            setEditMode();
            break;
        case ModeEnum.PRACTICE_VIEW:
            setPracticeViewMode();
            break;
        case ModeEnum.PRACTICE:
            setPracticeMode();
            break;
        case ModeEnum.EXAM:
            setExamMode();
            break;
        case ModeEnum.GEN_VIEW:
            setGenViewMode();
            break;
        default:
            return;    }
}

/**
 * 编辑模式设定.
 */
function setEditMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 练习预览模式设定.
 */
function setPracticeViewMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 *练习模式设定.
 */
function setPracticeMode(){
    document.title = TitleEnum.TEST;
    $('viewAnswer').enable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 考试模式设定.
 */
function setExamMode(){
    setLeftTime();
    document.title = TitleEnum.TEST;
    $('viewAnswer').disable();
    $('handIn').enable();
    $('desert').enable();
}

/**
 * 生成预览模式设定.
 */
function setGenViewMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 剩余时间倒计时.
 */
function setLeftTime(){
    clearInterval(g_timer);
    g_leftTime = g_test.examineTimeLeft;
    // 显示倒计时
    $('lefeTimeLabel').removeClassName('none');
    g_timer = window.setInterval(tip, 1000);
}

/**
 * 试题跳转.
 */
function jumpQuestion(){
    // 添加非空校验
    addRequiredCheck($('questionOrder'), getMessage('js.com.warning.0001', '题号'), true);
    // 试题非空添加题号校验
    if (g_currentbigquestion != -1) {
        // 添加题号越界校验
        addIntCheck($('questionOrder'), getMessage('js.tt.error.KSE02'), 1, g_test.bigQuestions[g_currentbigquestion].questionNum);
    }
    
    // 输入试题号越界
    if (!checkInput($('questionOrder'))) {
        return;
    }
    var questionShowNum = parseInt($('questionOrder').value, 10);
    g_currentQuestion = g_bigquestionStart + questionShowNum - 1;
    // 刷新答题卡
    refreshQuestion();
    // 设定按钮模式
    setButtonMode();
    
}

/**
 * 试题迁移.
 * @param {Object} flag 迁移标志
 */
function moveQuestion(flag){

    switch (flag) {
        // 上一大题
        case OperationFlagEnum.PREB:
            prebigquestion();
            break;
        //	上一题
        case OperationFlagEnum.PRE:
            g_currentQuestion--;
            break;
        // 下一题
        case OperationFlagEnum.NEXT:
            g_currentQuestion++;
            break;
        // 下一大题
        case OperationFlagEnum.NEXTB:
            nextbigquestion();
            break;
        default:
            return;    }
    setButtonMode();
    refreshQuestion();
    
}

/**
 * 跳到上一大题.
 */
function prebigquestion(){
    g_currentbigquestion--;
    
    var bigquestionSerialNo = g_test.bigQuestions[g_currentbigquestion].bigquestionSerialNo;
    var flag = false;
    for (var i = 0; i < g_test.examQuestions.length; i++) {
        if (bigquestionSerialNo == g_test.examQuestions[i].bigquestionSerialNo) {
            g_currentQuestion = i;
            g_bigquestionStart = i;
            flag = true;
            break;
        }
    }
    if (!flag) {
        g_bigquestionStart = -1;
    }
}

/**
 * 跳到下一大题.
 */
function nextbigquestion(){

    g_currentbigquestion++;
    
    var bigquestionSerialNo = g_test.bigQuestions[g_currentbigquestion].bigquestionSerialNo;
    
    var flag = false;
    for (var i = 0; i < g_test.examQuestions.length; i++) {
        if (bigquestionSerialNo == g_test.examQuestions[i].bigquestionSerialNo) {
            g_currentQuestion = i;
            g_bigquestionStart = i;
            flag = true;
            break;
        }
    }
    if (!flag) {
        g_bigquestionStart = -1;
    }
}

/**
 * 设定试题内容.
 */
function setQuestionContent(){

    var titleOrder = g_test.bigQuestions[g_currentbigquestion].bigquestionShowNum;
    
    var titleContent = g_test.bigQuestions[g_currentbigquestion].bigquestionTitleInfo;
    // 设置大题标题
    $('bigquestionTitleQuestion').update(titleOrder + '、' + titleContent);
    // 设置答题卡大题标题信息
    $('bigquestionTitleAnswer').update(titleOrder + '、' + titleContent);
    if (g_bigquestionStart < 0) {
        $('questionShowNumAnswer').update('');
        
        var questionContent = new Element('div');
        
        questionContent.update(createErrorArea());
        
        $('questionContent').insert({
            bottom: questionContent
        });
        return;
    }
    var question = g_test.examQuestions[g_currentQuestion];
    // 设置答题卡题号信息
    $('questionShowNumAnswer').update(question.questionShowNum);
    
    var questionTitle = new Element('div');
    questionTitle.update(question.questionShowNum);
    
    var questionContent = new Element('div', {
        'class': 'prepend-1'
    });
    
    questionContent.update(question.questionContent);
    // 设置试题内容
    $('questionContent').insert({
        bottom: questionTitle
    });
    $('questionContent').insert({
        bottom: questionContent
    });
}

/**
 * 生成试题取得错误消息区域
 * @return 错误消息对象
 */
function createErrorArea(){
    var errorContent = new Element('div', {
        'class': 'prepend-1'
    });
    errorContent.update('试题取得有误！ ').insert({
        bottom: new Element('a', {
            'href': '#this'
        }).update('[详细]').observe('click', function(){
            MsgBox.error('本道大题试题数为0！');
        })
    })
    return errorContent;
}

/**
 * 按钮模式设定.
 */
function setButtonMode(){
    if (g_bigquestionStart < 0) {
        $('pre').disable();
        $('next').disable();
    }
    if (g_currentbigquestion <= 0) {
        $('preB').disable();
    }
    else {
        $('preB').enable();
    }
    if (g_bigquestionStart < 0 ||
    g_currentQuestion + 1 - g_bigquestionStart ==
    g_test.bigQuestions[g_currentbigquestion].questionNum) {
        $('next').disable();
    }
    else {
        $('next').enable();
    }
    if (g_bigquestionStart < 0 || g_currentQuestion - g_bigquestionStart == 0) {
        $('pre').disable();
    }
    else {
        $('pre').enable();
    }
    if (g_test.bigquestionNum == 0 || g_currentbigquestion + 1 == g_test.bigquestionNum) {
        $('nextB').disable();
    }
    else {
        $('nextB').enable();
    }
}

/**
 * 生成答题卡.
 */
function createAnswerSheet(){
    // 若当前大题没有小题
    if (g_bigquestionStart < 0) {
        return;
    }
    // 小题的组合题列表
    var comboList = g_test.examQuestions[g_currentQuestion].singleQuestions;
    for (var i = 0; i < comboList.length; i++) {
        var answerType = comboList[i].answerType;
        switch (answerType) {
            case QuestionStyleEnum.SINGLEOPTION:
                genSingleOption(comboList[i]);
                break;
            case QuestionStyleEnum.MULOPTION:
                genMulOption(comboList[i]);
                break;
            case QuestionStyleEnum.JUDGE:
                genJudge(comboList[i]);
                break;
            case QuestionStyleEnum.BLANK:
                genBlank(comboList[i]);
                break;
            case QuestionStyleEnum.TEXTAREA:
                genDecireble(comboList[i]);
                break;
            case QuestionStyleEnum.UPLOAD:
                genUpload(comboList[i]);
                break;
            default:
                return;        }
    }
}

/**
 * 生成单选题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genSingleOption(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'radio'
        });
        option.value = answerObject.optionList[i];
        option.name = answerObject.answerSerialNo;
        var mark = new Element('span');
        mark.innerHTML = answerObject.optionList[i];
        var div = new Element('div');
        div.addClassName('span-2');
        div.insert({
            bottom: option
        });
        option.insert({
            after: mark
        });
        if (!answerObject.answerContent.blank() && answerObject.answerContent == i) {
            option.checked = true;
        }
        tmpl.insert({
            bottom: div
        });
    }
    bindEvent(answerObject, tmpl);
    answerSheet.insert({
        bottom: tmpl
    });
}

/**
 * 生成多选题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genMulOption(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent.split(',');
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'checkbox'
        });
        option.value = answerObject.optionList[i];
        option.name = answerObject.answerSerialNo;
        var mark = new Element('span');
        mark.innerHTML = answerObject.optionList[i];
        var div = new Element('div');
        div.addClassName('span-2');
        div.insert({
            bottom: option
        });
        option.insert({
            after: mark
        });
        if (answers != null) {
            for (var j = 0; j < answers.length; j++) {
                if (answers[j] == i) {
                    option.checked = true;
                }
            }
        }
        tmpl.insert({
            bottom: div
        });
    }
    bindEvent(answerObject, tmpl);
    answerSheet.insert({
        bottom: tmpl
    });
}

/**
 * 生成判断题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genJudge(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent;
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'radio'
        });
        option.value = answerObject.optionList[i];
        option.name = answerObject.answerSerialNo;
        var mark = new Element('span');
        var div = new Element('div');
        div.addClassName('span-2');
        mark.innerHTML = answerObject.optionList[i];
        div.insert({
            bottom: option
        });
        option.insert({
            after: mark
        });
        tmpl.insert({
            bottom: div
        });
        if (!answerObject.answerContent.blank() && answerObject.answerContent == i) {
            option.checked = true;
        }
    }
    bindEvent(answerObject, tmpl);
    answerSheet.insert({
        bottom: tmpl
    });
}

/**
 * 生成填空题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genBlank(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent.split(g_BlankDevider);
    for (var i = 0; i < answerObject.blankNumber; i++) {
        var textInput = new Element('input', {
            'type': 'text',
            'name': answerObject.answerQuesNo + '_' + i
        });
        //textInput.maxLength = g_Blanklength;
        var div = new Element('div', {
            'class': 'span-4'
        });
        div.insert({
            bottom: textInput
        });
        tmpl.insert({
            bottom: div
        });
        if (answers[i] != null) {
            textInput.value = answers[i];
        }
    }
    bindEvent(answerObject, tmpl);
    answerSheet.insert({
        bottom: tmpl
    });
}

/**
 * 生成问答题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genDecireble(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    var textareaInput = new Element('textarea', {
        'class': 'span-15 h_122',
        'name': 'textarea' + answerObject.answerSerialNo
    });
    textareaInput.maxLength = answerObject.wordLimits;
    tmpl.insert({
        bottom: textareaInput
    });
    textareaInput.value = answerObject.answerContent;
    bindEvent(answerObject, tmpl);
    answerSheet.insert({
        bottom: tmpl
    });
}

/**
 * 生成上传题答题卡.
 * @param {Object} answerObject 答案对象
 */
function genUpload(answerObject){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = 'A' + answerObject.answerSerialNo;
    var fileInput = new Element('input', {
        'type': 'file',
        'class': 'span-8',
        'name': 'fileInput' + answerObject.answerSerialNo
    });
    
    var okButton = new Element('input', {
        'type': 'button',
        'value': '上传',
        'class': 'btn span-2'
    })
    tmpl.insert({
        bottom: fileInput
    });
    fileInput.insert({
        after: okButton
    });
    Event.observe(fileInput, 'blur', refreshLeftTime);
    bindEvent(answerObject, tmpl);
    var form = new Element('Form', {
        'enctype': 'multipart/form-data',
        'method': 'post'
    });
    form.insert({
        bottom: tmpl
    });
    var answerSerialNoHidden = new Element('input', {
        'type': 'hidden',
        'name': 'testEmployeeAnswerInfo.answerSerialNo'
    });
    
    var questionFlgHidden = new Element('input', {
        'type': 'hidden',
        'name': 'testEmployeeAnswerInfo.questionFlg'
    });
    
    var questionIdHidden = new Element('input', {
        'type': 'hidden',
        'name': 'testEmployeeAnswerInfo.questionId'
    });
    
    var bigquestionSerialNoHidden = new Element('input', {
        'type': 'hidden',
        'name': 'testEmployeeAnswerInfo.bigquestionSerialNo'
    });
    
    var questionVersionNoHidden = new Element('input', {
        'type': 'hidden',
        'name': 'testEmployeeAnswerInfo.questionVersionNo'
    });
    form.insert({
        bottom: questionFlgHidden
    })
    form.insert({
        bottom: questionIdHidden
    })
    form.insert({
        bottom: bigquestionSerialNoHidden
    })
    form.insert({
        bottom: answerSerialNoHidden
    })
    form.insert({
        bottom: questionVersionNoHidden
    })
    form.target = 'iframe' + answerObject.answerSerialNo;
    var iframe = new Element('iframe', {
        'class': 'none',
        'id': 'iframe' + answerObject.answerSerialNo,
        'name': 'iframe' + answerObject.answerSerialNo
    });
    answerSheet.insert({
        bottom: form
    });
    form.insert({
        after: iframe
    });
}

/**
 * 答题卡内控件绑定事件.
 * @param {Object} answerObject 答案对象
 * @param {Object} tmpl 控件容器
 */
function bindEvent(answerObject, tmpl){

    // 编辑预览、练习预览、生成预览模式下不绑定事件 
    if (g_mode == ModeEnum.EDIT || g_mode == ModeEnum.GEN_VIEW || g_mode == ModeEnum.PRACTICE_VIEW) {
        return;
    }
    // 根据答案题型为控件绑定不同事件
    switch (answerObject.answerType) {
        case QuestionStyleEnum.SINGLEOPTION:
            bindSingleOption(tmpl);
            break;
        case QuestionStyleEnum.MULOPTION:
            bindMultiOption(tmpl);
            break;
        case QuestionStyleEnum.JUDGE:
            bindJudgment(tmpl);
            break;
        case QuestionStyleEnum.BLANK:
            bindBlank(tmpl);
            break;
        case QuestionStyleEnum.TEXTAREA:
            bindTextArea(tmpl);
            break;
        case QuestionStyleEnum.UPLOAD:
            bindFileUpload(tmpl);
            break;
        default:
            return;    }
}

/**
 * 单选题控件事件绑定.
 * @param {Object} tmpl 控件容器
 */
function bindSingleOption(tmpl){
    var radioNode = tmpl.select('INPUT');
    for (var i = 0; i < radioNode.length; i++) {
        Event.observe(radioNode[i], 'click', subSingleOption.curry(radioNode[i], i));
    }
}

/**
 * 多选题控件事件绑定.
 * @param {Object} tmpl 控件容器
 */
function bindMultiOption(tmpl){
    var checkNode = tmpl.select('INPUT');
    for (var i = 0; i < checkNode.length; i++) {
        Event.observe(checkNode[i], 'click', subMultiOption.curry(checkNode[i]));
    }
}

/**
 * 判断题控件事件绑定.
 * @param {Object} tmpl 控件容器
 */
function bindJudgment(tmpl){
    var radioNode = tmpl.select('INPUT');
    for (var i = 0; i < radioNode.length; i++) {
        Event.observe(radioNode[i], 'click', subJudgment.curry(radioNode[i], i));
    }
}

/**
 * 填空题控件事件绑定.
 * @param {Object} tmpl 控件容器
 */
function bindBlank(tmpl){
    var textInputNode = tmpl.select('INPUT');
    for (var i = 0; i < textInputNode.length; i++) {
        Event.observe(textInputNode[i], 'change', subBlank.curry(textInputNode[i]));
    }
}

/**
 * 问答题控件事件绑定.
 * @param {Object} tmpl 控件容器
 */
function bindTextArea(tmpl){
    var textArea = tmpl.down('TEXTAREA');
    Event.observe(textArea, 'change', subTextArea.curry(textArea));
}

/**
 * 上传文件控件事件绑定.
 * @param {Object} tmpl
 */
function bindFileUpload(tmpl){
    var okButton = tmpl.select('INPUT')[1];
    Event.observe(okButton, 'click', subFile.curry(okButton));
}

/**
 * 单选题答案提交.
 * @param {Object} obj 单选按钮
 */
function subSingleOption(obj, answerOrder){
    var answerContent = answerOrder;
    answerSerialNo = obj.up(1).id.substring(1);
    subAnswer(answerSerialNo, answerContent);
}

/**
 * 多选题答案提交.
 * @param {Object} obj 复选框
 */
function subMultiOption(obj){
    var checkbox = obj.up(1).select('INPUT');
    var answerContent = '';
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            answerContent = answerContent + ',' + i;
        }
    }
    if (answerContent.length != 0) {
        answerContent = answerContent.substring(1);
    }
    answerSerialNo = obj.up(1).id.substring(1);
    subAnswer(answerSerialNo, answerContent);
}

/**
 * 判断题答案提交.
 * @param {Object} obj 单选按钮
 */
function subJudgment(obj, answerOrder){
    var answerContent = answerOrder;
    answerSerialNo = obj.up(1).id.substring(1);
    subAnswer(answerSerialNo, answerContent);
}

/**
 * 填空题答案提交.
 * @param {Object} obj 输入框
 */
function subBlank(obj){
    var inputNodes = obj.up(1).select('INPUT');
    
    var answerContent = '';
    var validationFlg = true;
    for (var i = 0; i < inputNodes.length; i++) {
        // 填空题答案校验
        addLengthCheck(inputNodes[i], getMessage('js.com.warning.0011', '答案', g_Blanklength), 0, g_Blanklength);
        if (!checkInput(inputNodes[i])) {
            validationFlg = false;
        }
		if (answerContent == '') {
			answerContent = inputNodes[i].value;
		} else {
			answerContent += g_BlankDevider + inputNodes[i].value;
		}
        
    }
    // 通过校验
    if (validationFlg) {
        answerSerialNo = obj.up(1).id.substring(1);
        subAnswer(answerSerialNo, answerContent);
    }
}

/**
 * 问答题答案提交.
 * @param {Object} obj 文本域
 */
function subTextArea(obj){
    var answerContent = obj.value;
    var answerSerialNo = obj.up(0).id.substring(1);
    var comboList = g_test.examQuestions[g_currentQuestion].singleQuestions;
    for (var i = 0; i < comboList.length; i++) {
        if (comboList[i].answerSerialNo == answerSerialNo) {
            // 填空题答案校验
            addLengthCheck(obj, getMessage('js.com.warning.0011', '答案', comboList[i].wordLimits), 0, comboList[i].wordLimits);
            if (!checkInput(obj)) {
                return;
            }
        }
    }
    subAnswer(answerSerialNo, answerContent);
}

/**
 * 上传题答案提交.
 * @param {Object} okButton 上传按钮控件
 */
function subFile(okButton){
    var obj = okButton.previous()
    if (!validateUploadFile(obj)) {
        return;
    }
    if (!confirm('确定上传文件！')) {
        return;
    }
    obj.name = 'answer';
    var answerContent = obj.value;
    var answerSerialNo = obj.up(0).id.substring(1);
    var form = obj.up('form');
    if (form.encoding) {
        form.encoding = 'multipart/form-data';
    }
    var iframe = $('iframe' + answerSerialNo);
    // 设置iframe加载时回调函数
    iframe.observe('load', callbackfun.curry(iframe));
    // 试题区分
    var questionFlg;
    var comboList = g_test.examQuestions[g_currentQuestion].singleQuestions;
    // 设置试题区分
    if (comboList.length > 1) {
        questionFlg = 3;
    }
    else {
        questionFlg = 1;
    }
    var questionId = g_test.examQuestions[g_currentQuestion].questionId;
    var bigquestionSerialNo = g_test.bigQuestions[g_currentbigquestion].bigquestionSerialNo;
    var questionVersionNo = g_test.examQuestions[g_currentQuestion].questionVersionNo;
    form.action = 'k060041UploadTestAnswerFile.action';
    // 设置隐藏key的值
    obj.up(0).next(0).value = questionFlg;
    obj.up(0).next(1).value = questionId;
    obj.up(0).next(2).value = bigquestionSerialNo;
    obj.up(0).next(3).value = answerSerialNo;
    obj.up(0).next(4).value = questionVersionNo;
    form.submit();
}

/**
 * 上传文件是否成功
 * @param {Object} obj Iframe控件
 */
function callbackfun(obj){
    var result = '';
    // IE8或FireFox
    if (obj.contentDocument) {
        result = obj.contentDocument.documentElement.outerText;
        // 非IE8
        if (!result) {
            result = obj.contentDocument.documentElement.textContent;
        }
    }
    else {
        result = document.frames[obj.id].document.documentElement.outerText;
    }
    // 超过大题大题时间
    if (result == 'error') {
        MsgBox.error(getMessage('js.tt.error.KSE55'));
        refreshLeftTime();
    }
}

/**
 * 上传题校验
 * @param {Object} obj 上传控件
 */
function validateUploadFile(obj){
    addRequiredCheck(obj, getMessage('js.tt.info.KST11','文件'), false);
    addRegexCheck(obj, getMessage('js.tt.error.JYE10'), '.+\.(txt|TXT|doc|DOC)');
    if (!checkInput(obj)) {
        return false;
    }
    return true;
}

/**
 * 提交答案.
 * @param {Object} answerSerialNo 答案编号
 * @param {Object} answerContent 答案内容
 */
function subAnswer(answerSerialNo, answerContent){
    var comboList = g_test.examQuestions[g_currentQuestion].singleQuestions;
    var questionFlg;
    if (comboList.length > 1) {
        questionFlg = 3;
    }
    else {
        questionFlg = 1;
    }
    var questionId = g_test.examQuestions[g_currentQuestion].questionId;
    var bigquestionSerialNo = g_test.bigQuestions[g_currentbigquestion].bigquestionSerialNo;
    var questionVersionNo = g_test.examQuestions[g_currentQuestion].questionVersionNo;
    var url = 'k060041SubmitTestAnswer.action';
    var pars = 'testEmployeeAnswerInfo.questionVersionNo=' + questionVersionNo;
    pars = pars + '&testEmployeeAnswerInfo.questionId=' + questionId;
    pars = pars + '&testEmployeeAnswerInfo.answerSerialNo=' + answerSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.bigquestionSerialNo=' + bigquestionSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.answerContent=' + answerContent;
    pars = pars + '&testEmployeeAnswerInfo.questionFlg=' + questionFlg;
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                // 超过大题大题时间
                if (request.responseText == 'error') {
                    refreshQuestion();
                    MsgBox.error(getMessage('js.tt.error.KSE55'));
                    // 刷新倒计时
                    refreshLeftTime();
                    return;
                }
                for (var i = 0; i < comboList.length; i++) {
                    if (comboList[i].answerSerialNo == answerSerialNo) {
                        comboList[i].answerContent = answerContent;
                        break;
                    }
                }
            }
        }
    })
}

/**
 * 刷新答题卡和问题.
 */
function refreshQuestion(){
    var questionContentChildren = $('questionContent').childElements()
    for (var i = 0; i < questionContentChildren.length; i++) {
        questionContentChildren[i].remove();
    }
    var answerSheetChildren = $('answerContent').childElements();
    for (var i = 0; i < answerSheetChildren.length; i++) {
        answerSheetChildren[i].remove();
    }
    setQuestionContent();
    createAnswerSheet();
}

/**
 * 剩余时间倒计时.
 */
function tip(){
    g_leftTime--;
    var H;
    var M;
    var S;
    if (g_leftTime >= 0) {
        H = Math.floor(g_leftTime / 3600);
        M = Math.floor((g_leftTime - H * 3600) / 60);
        S = (g_leftTime - H * 3600) % 60;
    }
    else {
        H = 0;
        M = 0;
        S = 0;
        setTimeLabel(S, M, H);
        clearInterval(g_timer);
        endTest();
        return;
    }
    setTimeLabel(S, M, H);
}

/**
 * 显示倒计时时间.
 * @param {Object} S 时
 * @param {Object} M 分
 * @param {Object} H 秒
 */
function setTimeLabel(S, M, H){
    if (S < 10) {
        $('S').update('0' + S + '秒');
    }
    else {
        $('S').update(S + '秒');
    }
    if (M < 10) {
        $('M').update('0' + M + '分');
    }
    else {
        $('M').update(M + '分');
    }
    if (H < 10) {
        $('H').update('0' + H + '小时');
    }
    else {
        $('H').update(H + '小时');
    }
}

/**
 * 考试结束.
 */
function endTest(){
    // 已到考试结束时，提示用户是否提交试卷
    if (confirm(getMessage('js.tt.info.KST01'))) {
        var form = $('subTest');
        form.action = 'k060041SubmitTestPaper.action';
        // 显示加载动画
        showLoader();
        form.submit();
    }
    else {
        var form = $('subTest');
        form.action = 'k060041GiveupSubmitTestPaper.action';
        // 显示加载动画
        showLoader();
        form.submit();
    }
    window.opener.location.reload();
    window.open('', '_self', '');
	window.close();
}

/**
 * 查看答案.
 */
function viewAnswer(){
    if (!confirm(getMessage('js.tt.warn.KSW05'))) {
        return;
    }
    var form = $('subTest');
    form.action = 'k060041ViewPracticeAnswer.action';
    // 显示加载动画
    showLoader();
    form.submit();
}

/**
 * 交卷.
 */
function submitTest(){
    if (!confirm(getMessage('js.tt.warn.KSW01'))) {
        refreshLeftTime();
        return;
    }
    var form = $('subTest');
    form.action = 'k060041SubmitTestPaper.action';
    // 显示加载动画
    showLoader();
    form.submit();
    window.opener.location.reload();
    window.open('', '_self', '');
	window.close();
}

/**
 * 放弃考试.
 */
function desertTest(){
    if (!confirm(getMessage('js.tt.warn.KSW02'))) {
        refreshLeftTime();
        return;
    }
    var form = $('subTest');
    form.action = 'k060041DesertTest.action';
    // 显示加载动画
    showLoader();
    form.submit();
    window.opener.location.reload();
    window.open('', '_self', '');
	window.close();
}

/**
 * 切换模式.
 */
function changeMode(){
    var form = $('subTest');
    form.action = 'k060041ChangeToWholePaper.action';
    // 显示加载动画
    showLoader();
    form.submit();
}

/**
 * 刷新剩余时间
 */
function refreshLeftTime(){
    var url = 'k060041GetExamLeftTime.action?_t=' + new Date().getTime();
    var pars = addStamp('');
    var myAjax = new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(response);
            if (!flg) {
                g_test.examineTimeLeft = parseInt(request.responseText, 10);
                setLeftTime();
            }
        }
    })
}
