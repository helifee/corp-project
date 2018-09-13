/*
 * @(#)k060031.js
 * @fileoverview 考生答卷&试卷预览(整卷)画面JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 *  考生答卷&试卷预览(整卷)JavaScript.
 *
 * @author sundefu
 * @version 1.0 2010/04/14
 */
// 倒计时
var g_timer;

// 画面模式
var g_mode;

// 剩余时间
var g_leftTime;

// 系统时间
var g_systemTime;
var g_timeId;

// 操作枚举
var OperationFlagEnum = {
    PREB: 1,
    PRE: 2,
    NEXT: 3,
    NEXTB: 4
}

// 模式枚举
var ModeEnum = {
    EDIE: 1,
    PRACTICE_VIEW: 2,
    PRACTICE: 3,
    EXAM: 4,
    GEN_VIEW: 5
}

// 操作题型枚举
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
var g_BlankDevider = '<aparter>';

// 标题枚举
var TitleEnum = {
    TEST: '考生答卷(整卷)',
    VIEW: '试卷预览(整卷)'
}

// 消息类型枚举
var MessageType = {
    STABLE_0: 0,
    RANDOM_0: 1
}
// 试卷信息(测试数据)
var g_test;
/**
 * 画面初期表示
 */
function init(){

    // 获得试卷信息（仅测试数据）
    getTestInfo();
    
}

/**
 * 取得试卷试题信息
 */
function getTestInfo(){
    // 显示加载动画
    showLoader();
    var url = 'k060031GetWholePaperDetails.action';
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        onComplete: drawScreen
    })
}

/**
 * 画面表示
 */
function drawScreen(request){
    // 隐藏加载动画
    hideLoader();
    // 将返回的JSON串解析成试卷对象
    g_test = request.responseText.evalJSON(true);
    g_mode = parseInt($('mode').value, 10);
    initSetQuestion();
    initSetAnswerSheet();
    //g_mode = parseInt($('mode').value, 10);
    setMode(g_mode);
    if (g_test.screenMessage.length > 0) {
        $('errorMessage').update(createErrorArea(MessageType.RANDOM_0));
    }
}

/**
 * 生成试题取得错误消息区域
 * @return 错误消息对象
 */
function createErrorArea(messageType){
    var errorContent = new Element('div', {
        'class': 'prepend-1'
    });
    errorContent.update('试题取得有误！ ').insert({
        bottom: new Element('a', {
            'href': '#this'
        }).update('[详细]').observe('click', function(){
            showErrorMessage(messageType);
        })
    })
    return errorContent;
}

/**
 * 弹出试题取得错误消息
 */
function showErrorMessage(messageType){
    var errorContent = new Element('div');
    if (messageType == MessageType.STABLE_0) {
        errorContent.update('本道大题试题数为0');
    }
    else {
        for (var i = 0; i < g_test.screenMessage.length; i++) {
            var errorMessageContent = new Element('div');
            errorMessageContent.update('ERROR:' + g_test.screenMessage[i]);
            errorContent.insert({
                bottom: errorMessageContent
            });
        }
    }
    MsgBox.error(errorContent);
}

/**
 * 剩余时间倒计时
 */
function setLeftTime(){
    g_leftTime = g_test.examineTimeLeft;
    g_timer = window.setInterval(tip, 1000);
}

/**
 * 初期答题卡
 */
function initSetAnswerSheet(){
    $('answerContent').innerHTML = '';
    for (var i = 0; i < g_test.bigQuestions.length; i++) {
        var answerContent = $('answerContent');
        
        var bigAnswerTitle = new Element('div', {
            'class': 'span-21'
        });
        bigAnswerTitle.update(g_test.bigQuestions[i].bigquestionShowNum + '、' + g_test.bigQuestions[i].bigquestionTitleInfo);
        answerContent.insert({
            bottom: bigAnswerTitle
        });
        var start = -1;
        for (var j = 0; j < g_test.examQuestions.length; j++) {
            if (g_test.examQuestions[j].bigquestionSerialNo == g_test.bigQuestions[i].bigquestionSerialNo) {
                start = j;
                break;
            }
        }
        if (start < 0) {
            continue;
        }
        for (var k = 0; k < g_test.bigQuestions[i].questionNum; k++) {
        
            var answerTitle = new Element('div', {
                'class': 'prepend-h span-4'
            });
            answerTitle.update(g_test.examQuestions[start].questionShowNum);
            answerContent.insert({
                bottom: answerTitle
            });
            createAnswerSheet(start);
            start++;
        }
    }
}

/**
 * 初期问题设定
 */
function initSetQuestion(){
    $('testTitle').update(g_test.paperTitle);
    $('testInfo').update(g_test.paperDescription);
    //$('answerSheetInfo').update(g_test.paperDescription);
    //$('answerSheetTitle').update(g_test.paperTitle);
    
    for (var i = 0; i < g_test.bigQuestions.length; i++) {
        var questionContent = $('questionContent');
        
        var questionTitle = new Element('div');
        questionTitle.update(g_test.bigQuestions[i].bigquestionShowNum + '、' + g_test.bigQuestions[i].bigquestionTitleInfo);
        
        questionContent.insert({
            bottom: questionTitle
        });
        var start = -1;
        for (var j = 0; j < g_test.examQuestions.length; j++) {
            if (g_test.examQuestions[j].bigquestionSerialNo == g_test.bigQuestions[i].bigquestionSerialNo) {
                start = j;
                break;
            }
        }
        
        if (start < 0) {
            var tempDiv = new Element('div');
            tempDiv.update(createErrorArea(MessageType.STABLE_0));
            $('questionContent').insert({
                bottom: tempDiv
            })
            continue;
        }
        for (var k = 0; k < g_test.bigQuestions[i].questionNum; k++) {
        
            var questionDiv = new Element('div', {
                'class': 'prepend-h'
            });
            questionDiv.update(g_test.examQuestions[start].questionShowNum);
            questionContent.insert({
                bottom: questionDiv
            });
            var questionCon = new Element('div', {
                'class': 'prepend-1'
            });
            questionCon.update(g_test.examQuestions[start].questionContent);
            questionContent.insert({
                bottom: questionCon
            });
            start++;
			// wanqiuhong 10/27 追加： start溢出
			if (start == g_test.examQuestions.length) {
				break;
			}
        }
    }
}

/**
 * 模式设定
 */
function setMode(mode){
    switch (mode) {
        case ModeEnum.EDIE:
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
 * 编辑模式设定
 */
function setEditMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 练习预览模式设定
 */
function setPracticeViewMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 *练习模式设定
 */
function setPracticeMode(){
    document.title = TitleEnum.TEST;
    $('viewAnswer').enable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 考试模式设定
 */
function setExamMode(){
    setLeftTime();
    document.title = TitleEnum.TEST;
    $('viewAnswer').disable();
    $('handIn').enable();
    $('desert').enable();
}

/**
 * 生成预览模式设定
 */
function setGenViewMode(){
    document.title = TitleEnum.VIEW;
    $('viewAnswer').disable();
    $('handIn').disable();
    $('desert').disable();
}

/**
 * 生成答题卡
 */
function createAnswerSheet(currentQuestion){
    var comboList = g_test.examQuestions[currentQuestion].singleQuestions;
    for (var i = 0; i < comboList.length; i++) {
        var answerType = comboList[i].answerType;
        switch (answerType) {
            case QuestionStyleEnum.SINGLEOPTION:
                genSingleOption(comboList[i], currentQuestion);
                break;
            case QuestionStyleEnum.MULOPTION:
                genMulOption(comboList[i], currentQuestion);
                break;
            case QuestionStyleEnum.JUDGE:
                genJudge(comboList[i], currentQuestion);
                break;
            case QuestionStyleEnum.BLANK:
                genBlank(comboList[i], currentQuestion);
                break;
            case QuestionStyleEnum.TEXTAREA:
                genDecireble(comboList[i], currentQuestion);
                break;
            case QuestionStyleEnum.UPLOAD:
                genUpload(comboList[i], currentQuestion);
                break;
            default:
                return;        }
    }
}

/**
 * 生成单选题答题卡.
 * @param {Object} answerObject
 */
function genSingleOption(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'radio'
        
        });
        option.value = answerObject.optionList[i];
        option.name = tmpl.id;
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
 * @param {Object} answerObject
 */
function genMulOption(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent.split(',');
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'checkbox'
        });
        option.value = answerObject.optionList[i];
        option.name = tmpl.id;
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
        option.checked = false;
        if (answers != null && answers != "") {
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
 * @param {Object} answerObject
 */
function genJudge(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent;
    for (var i = 0; i < answerObject.optionList.length; i++) {
        var option = new Element('input', {
            'type': 'radio'
        });
        option.value = answerObject.optionList[i];
        option.name = tmpl.id;
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
 * @param {Object} answerObject
 */
function genBlank(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var inputName = g_test.examQuestions[currentQuestion].bigquestionSerialNo + '_' + g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var answers = answerObject.answerContent.split(g_BlankDevider);
    for (var i = 0; i < answerObject.blankNumber; i++) {
        var textInput = new Element('input', {
            'type': 'text',
            'name': inputName + '_' + i
        });
        textInput.maxLength = g_Blanklength;
        var div = new Element('div');
        div.addClassName('span-4');
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
 * @param {Object} answerObject
 */
function genDecireble(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var textAreaName = g_test.examQuestions[currentQuestion].bigquestionSerialNo + '_' + g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var textareaInput = new Element('textarea', {
        'name': textAreaName
    });
    textareaInput.addClassName('span-10 h_122')
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
 * @param {Object} answerObject
 */
function genUpload(answerObject, currentQuestion){
    var answerSheet = $('answerContent');
    var tmpl = $('tmpl').clone(true);
    var title = new Element('div');
    title.innerHTML = answerObject.answerQuesNo;
    tmpl.insert({
        bottom: title
    });
    tmpl.id = g_test.examQuestions[currentQuestion].questionId + '_' + answerObject.answerSerialNo;
    var fileInput = new Element('input', {
        'type': 'file',
        'class': 'span-10'
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
    bindEvent(answerObject, tmpl);
    var form = new Element('Form', {
        'enctype': 'multipart/form-data',
        'method': 'post'
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
        bottom: tmpl
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
    var iframe = new Element('iframe');
    iframe.addClassName('none');
    iframe.id = 'iframe' + answerObject.answerSerialNo;
    iframe.name = 'iframe' + answerObject.answerSerialNo;
    answerSheet.insert({
        bottom: form
    });
    answerSheet.insert({
        bottom: iframe
    });
}

/**
 * 答题卡内控件绑定事件.
 * @param {Object} answerObject
 * @param {Object} tmpl
 */
function bindEvent(answerObject, tmpl){

    // 编辑预览、练习预览、生成预览模式下不绑定事件 
    if (g_mode == ModeEnum.EDIE || g_mode == ModeEnum.GEN_VIEW || g_mode == ModeEnum.PRACTICE_VIEW) {
        return;
    }
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
 * @param {Object} tmpl
 */
function bindSingleOption(tmpl){
    var radioNode = tmpl.select('INPUT');
    for (var i = 0; i < radioNode.length; i++) {
        Event.observe(radioNode[i], 'click', subSingleOption.curry(radioNode[i], i));
    }
}

/**
 * 多选题控件事件绑定.
 * @param {Object} tmpl
 */
function bindMultiOption(tmpl){
    var checkNode = tmpl.select('INPUT');
    for (var i = 0; i < checkNode.length; i++) {
        Event.observe(checkNode[i], 'click', subMultiOption.curry(checkNode[i]));
    }
}

/**
 * 判断题控件事件绑定.
 * @param {Object} tmpl
 */
function bindJudgment(tmpl){
    var radioNode = tmpl.select('INPUT');
    for (var i = 0; i < radioNode.length; i++) {
        Event.observe(radioNode[i], 'click', subJudgment.curry(radioNode[i], i));
    }
}

/**
 * 填空题控件事件绑定.
 * @param {Object} tmpl
 */
function bindBlank(tmpl){
    var textInputNode = tmpl.select('INPUT');
    for (var i = 0; i < textInputNode.length; i++) {
        Event.observe(textInputNode[i], 'change', subBlank.curry(textInputNode[i]));
    }
}

/**
 * 问答题控件事件绑定.
 * @param {Object} tmpl
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
 */
function subSingleOption(obj, answerOrder){
    var answerContent = answerOrder;
    var answerSerialNo = obj.up(1).id.split('_')[1];
    var questionId = obj.up(1).id.split('_')[0];
    subAnswer(questionId, answerSerialNo, answerContent);
}

/**
 * 多选题答案提交.
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
    var answerSerialNo = obj.up(1).id.split('_')[1];
    var questionId = obj.up(1).id.split('_')[0];
    subAnswer(questionId, answerSerialNo, answerContent);
}

/**
 * 判断题答案提交.
 */
function subJudgment(obj, answerOrder){
    var answerContent = answerOrder;
    var answerSerialNo = obj.up(1).id.split('_')[1];
    var questionId = obj.up(1).id.split('_')[0];
    subAnswer(questionId, answerSerialNo, answerContent);
}

/**
 * 填空题答案提交.
 */
function subBlank(obj){
    var inputNodes = obj.up(1).select('INPUT');
    
    var answerContent = '';
    validationFlg = true;
    for (var i = 0; i < inputNodes.length; i++) {
        // 填空题答案校验
        addLengthCheck(inputNodes[i], getMessage('js.com.warning.0011', '答案', g_Blanklength), 0, g_Blanklength);
        if (!checkInput(inputNodes[i])) {
            validationFlg = false;
        }
 //       if (answerContent.blank()) {
 //           answerContent = inputNodes[i].value;
 //       }
 //       else {
 //           answerContent += g_BlankDevider + inputNodes[i].value;
 //       }
          if (0 == i) {
	          answerContent = inputNodes[i].value;
	      }
	      else {
	          answerContent += g_BlankDevider + inputNodes[i].value;
	      }       
    }
    if (!validationFlg) {
        return;
    }
    var answerSerialNo = obj.up(1).id.split('_')[1];
    var questionId = obj.up(1).id.split('_')[0];
    subAnswer(questionId, answerSerialNo, answerContent);
}

/**
 * 问答题答案提交.
 */
function subTextArea(obj){
    var answerContent = obj.value;
    var answerSerialNo = obj.up(0).id.split('_')[1];
    var questionId = obj.up(0).id.split('_')[0];
    var currentQuestion = getcurrentQuestionIndex(questionId);
    var comboList = g_test.examQuestions[currentQuestion].singleQuestions;
    for (var i = 0; i < comboList.length; i++) {
        if (comboList[i].answerSerialNo == answerSerialNo) {
            // 问答题答案校验
            addLengthCheck(obj, getMessage('js.com.warning.0011', '答案', comboList[i].wordLimits), 0, comboList[i].wordLimits);
            if (!checkInput(obj)) {
                return;
            }
            break;
        }
    }
    subAnswer(questionId, answerSerialNo, answerContent);
}

/**
 * 上传题答案提交.
 */
function subFile(okButton){

    var obj = okButton.previous()
    // 试题区分
    var questionFlg;
    var questionId = obj.up(0).id.split('_')[0];
    var answerSerialNo = obj.up(0).id.split('_')[1];
    var currentQuestion = getcurrentQuestionIndex(questionId);
    var comboList = g_test.examQuestions[currentQuestion].singleQuestions;
    if (comboList.length > 1) {
        questionFlg = 3;
    }
    else {
        questionFlg = 1;
    }
    var bigquestionSerialNo = g_test.examQuestions[currentQuestion].bigquestionSerialNo;
    var questionVersionNo = g_test.examQuestions[currentQuestion].questionVersionNo;
    obj.id = bigquestionSerialNo + 'answer' + questionId + answerSerialNo;
    obj.name = bigquestionSerialNo + 'answer' + questionId + answerSerialNo;
    if (!validateUploadFile(obj)) {
        obj.focus();
        return;
    }
    if (!confirm('确定上传文件！')) {
        return;
    }
    
    var answerContent = obj.value;
    var form = obj.up('form');
    if (form.encoding) {
        form.encoding = 'multipart/form-data';
    }
    var iframe = $('iframe' + answerSerialNo);
    iframe.observe('load', callbackfun.curry(iframe));
    obj.name = 'answer';
    form.action = 'k060041UploadTestAnswerFile.action';
    obj.up(0).next(0).value = questionFlg;
    obj.up(0).next(1).value = questionId;
    obj.up(0).next(2).value = bigquestionSerialNo;
    obj.up(0).next(3).value = answerSerialNo;
    obj.up(0).next(4).value = questionVersionNo;
    form.submit();
    obj.name = bigquestionSerialNo + 'answer' + questionId + answerSerialNo;
}

/**
 * 上传题校验
 * @param {Object} obj 上传控件
 */
function validateUploadFile(obj){
    addRequiredCheck(obj, getMessage('js.tt.info.KST11','文件'), true);
    addRegexCheck(obj, getMessage('js.tt.error.JYE10'), '.+\.(txt|TXT|doc|DOC)');
    if (!checkInput(obj)) {
        return false;
    }
    return true;
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
 * 提交答案
 * @param {Object} questionId
 * @param {Object} answerSerialNo
 * @param {Object} answerContent
 */
function subAnswer(questionId, answerSerialNo, answerContent){
	// 显示加载动画
    showLoader();
    var currentQuestion = getcurrentQuestionIndex(questionId);
    var comboList = g_test.examQuestions[currentQuestion].singleQuestions;
    var questionFlg;
    if (comboList.length > 1) {
        questionFlg = 3;
    }
    else {
        questionFlg = 1;
    }
    //var questionId = g_test.examQuestions[currentQuestion].questionId;
    var bigquestionSerialNo = g_test.examQuestions[currentQuestion].bigquestionSerialNo;
    var questionVersionNo = g_test.examQuestions[currentQuestion].questionVersionNo;
    var url = 'k060041SubmitTestAnswer.action';
    var pars = 'testEmployeeAnswerInfo.questionVersionNo=' + questionVersionNo;
    pars = pars + '&testEmployeeAnswerInfo.questionId=' + questionId;
    pars = pars + '&testEmployeeAnswerInfo.answerSerialNo=' + answerSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.bigquestionSerialNo=' + bigquestionSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.answerContent=' + encodeURI(answerContent);
    pars = pars + '&testEmployeeAnswerInfo.questionFlg=' + questionFlg;
	addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                if (request.responseText == 'error') {
                    MsgBox.error(getMessage('js.tt.error.KSE55'));
                    // 提交答案失败，重绘答题卡
                    initSetAnswerSheet();
                    refreshLeftTime();
                }
                else {
                    // 提交成功，保存画面答案内容
                    for (var i = 0; i < comboList.length; i++) {
                        if (comboList[i].answerSerialNo == answerSerialNo) {
                            comboList[i].answerContent = answerContent;
                            break;
                        }
                    }
                }
            }
        }
    })
	// 隐藏加载动画
	hideLoader();
}

/**
 * 剩余时间倒计时
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
        endTest();
        return;
    }
    if (g_mode == ModeEnum.EXAM) {
        $('leftTimeLabel').removeClassName('none');
    }
    
    if (S < 10) {
        $('leftSecond').update('0' + S + '秒');
    }
    else {
        $('leftSecond').update(S + '秒');
    }
    if (M < 10) {
        $('leftMunite').update('0' + M + '分');
    }
    else {
        $('leftMunite').update(M + '分');
    }
    if (H < 10) {
        $('leftHour').update('0' + H + '小时');
    }
    else {
        $('leftHour').update(H + '小时');
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
 * 查看答案
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
 * 交卷
 */
function submitTest(){
    if (!confirm(getMessage('js.tt.warn.KSW01'))) {
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
 * 放弃考试
 */
function desertTest(){
    if (!confirm(getMessage('js.tt.warn.KSW02'))) {
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
 * 切换模式
 */
function changeMode(){
    var form = $('subTest');
    form.action = 'k060031ChangeToSingleMode.action';
    // 显示加载动画
    showLoader();
    form.submit();
}

/**
 * 取得当前题号
 * @param {Object} questionId
 */
function getcurrentQuestionIndex(questionId){
    for (var i = 0; i < g_test.examQuestions.length; i++) {
        if (questionId == g_test.examQuestions[i].questionId) {
            return i;
        }
    }
}

/**
 * 刷新剩余时间
 */
function refreshLeftTime(){
    var url = 'k060041GetExamLeftTime.action?_t=' + new Date().getTime();
    var myAjax = new Ajax.Request(url, {
        method: 'get',
        onComplete: function(request){
            g_test.examineTimeLeft = parseInt(request.responseText, 10);
            setLeftTime();
        }
    })
}

// form外校验用
var body_validation = {};

/** 
 * k060031_wait_jsp画面onload.
 */
function initForm() {
	clearInterval(g_timeId);
	if (!g_systemTime) {
		g_systemTime = new Date(Date.parse($('sysTime').value.replace(/-/g, "/"))).getTime();
	}
	
	// 系统时间增加1秒
	g_systemTime = g_systemTime + 1000;
	
	// 设定页面服务器时间
	systemTime(g_systemTime);
	
	// 考试开始时间取得
	var g_startTime = new Date(Date.parse($('startTime').value.replace(/-/g, "/"))).getTime();
	
	// 剩余时间
	var g_timeDistance = g_startTime - g_systemTime;
	if (g_timeDistance > 0) {
		
		// 天
		var g_day = Math.floor(g_timeDistance/86400000)
	 	g_timeDistance -= g_day * 86400000;
		
		// 时
	 	var g_hour = Math.floor(g_timeDistance/3600000)
	 	g_timeDistance -= g_hour * 3600000;
		
		// 分
	 	var g_minute = Math.floor(g_timeDistance/60000)
	 	g_timeDistance -= g_minute * 60000;
		
		// 秒
	 	var g_second = Math.floor(g_timeDistance/1000)
		
		// 每隔20分钟重新取服务器的时间
		if (g_minute%20 == 0 && g_second==0) {
			var url = "k060031ObtainSystemTime.action";
			var pars = addStamp('');
			    new Ajax.Updater('sdiv', url, {
			        method: 'post',
			        parameters: pars,
			        onSuccess: function(response) {
			        },
			        onFailure: function(request){
			        },
				    onComplete: function(response) {
						
						// 从新获取系统时间
						g_systemTime = new Date(Date.parse($('sysTime').value.replace(/-/g, "/"))).getTime();
					}
			   });		
		   	
		}
		
		// 设置剩余时间
		setTimeLabel(g_day, g_hour, g_minute, g_second);
		g_timeId = window.setInterval(initForm,1000);
	 } else {
	 	g_day = 0;
		g_hour = 0;
		g_minute = 0;
		g_second = 0;
		
		// 设置剩余时间
	 	setTimeLabel(g_day, g_hour, g_minute, g_second);
	 	clearInterval(g_timeId);
		
	 	if($F('examineStatus') == 0){
	 		// 开始考试
	 		startTest();
	 	}else{
	 		// 重新考试
	 		reStartTest();
	 	}
	 }
}

/**
 * 设定服务器的时间.
 */
function systemTime(systemTime) {
	$('systemTimeDiv').innerHTML = new Date(systemTime).toLocaleDateString() + " " +(new Date(systemTime)).toLocaleTimeString();
}

/**
 * 设定剩余的时间.
 */
function setTimeLabel(g_day, g_hour, g_minute, g_second) {
 	if (g_hour < 10) {
		g_hour = "0" + g_hour;
	}
 	if (g_minute < 10) {
		g_minute = "0" + g_minute;
	}
 	if (g_second < 10) {
		g_second = "0" + g_second;
	}
	$('day').update(g_day + '天');
	$('second').update(g_second + '秒');
	$('minute').update(g_minute + '分');
	$('hour').update(g_hour + '小时');	
}

/**
 * 开始考试.
 */
function startTest() {
	window.location.href="k060021ExamStart.action?examineId="+$('examineId').value+
						   "&examineInfo.examineFlg="+parseInt($('examineFlg').value,10)+
						   "&examineInfo.examineTime="+parseInt($('examineTime').value,10);
}
 
 /**
  * 重新考试.
  */
 function reStartTest() {
 	window.location.href="k060021ExamRestart.action?examineId="+$('examineId').value+
 						   "&examineInfo.examineFlg="+parseInt($('examineFlg').value,10)+
 						   "&examineInfo.examineTime="+parseInt($('examineTime').value,10);
 }
 