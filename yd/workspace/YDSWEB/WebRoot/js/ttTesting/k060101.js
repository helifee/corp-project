/*
 * @(#)k060101.js
 * @fileoverview 考生答卷&试卷预览(单题)画面JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 *  考试阅卷(单题)JavaScript.
 *
 * @author lijinling
 * @author sundefu 2010/06/10
 * @version 1.0 2010/04/26
 */
// 所有大题列表
var g_bigQuestionNum;
// 画面显示bean
var g_test;
// 当前大题索引
var g_currentBigquestion = 0;
// 当前小题索引
var g_currentQuestion = 1;
// 填空题答案分隔符
var g_BlankDevider = '<aparter>';
/**
 * 取得字符串字节长度
 *
 * @return 字符串字节长度
 */
String.prototype.getStrByteLength = function(){
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

// 消息类型枚举
var MessageType = {
    STABLE_0: 0,
    RANDOM_0: 1
}

// 试题跳转操作枚举
var OperationFlagEnum = {
    PREB: 1,
    PRE: 2,
    NEXT: 3,
    NEXTB: 4
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

// 是否评分枚举
var MarkFlgEnum = {
    MARKED: 1,
    UNMARK: 2
}
// form外校验用
var body_validation = {
    'examQuestionOrder': {
        'regex': {
            'message': getMessage('js.tt.error.KSE15'),
            'param': {
                'expression': '[0-9]$'
            }
        }
    }
};

// 弹出答案详细层
var g_box;
/**
 * 初期表示.
 */
function init(){
    // 显示加载动画
    showLoader();
    var url = "k060101GetMarkingQuestion.action";
    var pars;
    addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: initCallBack
    });
    g_box = new PopupBox({
        // 唯一标志
        key: 3,
        // 标题内容，元素或字符串
        title: '答案详细',
        // 图标的CSS
        icon: 'img_opt opt_Help',
        // 内容元素
        content: $('answerDetail'),
        // 显示位置，相当与z-index
        position: 3,
        // 是否允许拖动
        drag: true
    });
    // 隐藏加载动画
    hideLoader();
    // 每十分钟更新一次排他锁
    window.setInterval(updateLock, 600000);
}

/**
 * 回调函数.
 * @param {Object} request
 */
function initCallBack(request){
    // 将返回的JSON串解析成试卷对象
    g_test = request.responseText.evalJSON(true);
	// wanqiuhong 10/25 追加： 因为当大题信息为空时，画面无法正常显示，所以追加判断，如果大题信息为空，则提示错误信息
	if (null == g_test.bigQuestionInfo) {
		$('errorMessage').update(createErrorArea(MessageType.RANDOM_0));
	}
    setPage();
    var url = 'k060101GetBigquestionNum.action?_t=' + new Date().getTime();
    var myAjax = new Ajax.Request(url, {
        method: 'get',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                // 取得返回大题数
                g_bigQuestionNum = parseInt(request.responseText, 10);
                setButtonMode();
            }
        }
    })
}
/**
 * 生成试题取得错误消息区域
 * @return 错误消息对象
 */
function createErrorArea(messageType){
    var errorContent = new Element('div', {
        'class': 'prepend-1'
    });
    errorContent.update('试题未取出！ ').insert({
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
    } else {
       var errorMessageContent = new Element('div');
            errorMessageContent.update(getMessage('js.tt.error.KSE26'));
            errorContent.insert({
                bottom: errorMessageContent
            });
    }
    MsgBox.error(errorContent);
}

/**
 * 更新排他锁
 */
function updateLock(){
    var url = 'k060101UpdateLock.action';
    var pars = addStamp('');
    var myAjax = new Ajax.Request(url, {
        method: 'get',
        parameters: pars
    });
}

/**
 * 设置画面试题、答案及评分信息.
 */
function setPage(){
    // 设置问题区域
    setQuestionArea();
    // 设置标准答案区域
    setAnswerArea();
    // 设置评分区域
    setMarkArea();
}

/**
 * 设置问题区域.
 */
function setQuestionArea(){
    $('questionContent').innerHTML = '';
    // 试卷标题
    $('paperTitle').update(g_test.paperTitle);
    // 试卷说明
    $('testInfo').update(g_test.paperDescription);
    // 答案区域标题
    $('AnswerTitle').update(g_test.paperTitle);
    // 阅卷区域标题
    $('markAreaTitle').update(g_test.paperTitle);
    var bigquestionTitleLabel = g_test.bigQuestionInfo.bigquestionShowNum + '、' + g_test.bigQuestionInfo.bigquestionTitle;
    $('bigQuestionTitleInfo1').update(bigquestionTitleLabel);
    $('bigQuestionTitleInfo2').update(bigquestionTitleLabel);
    $('bigQuestionTitleInfo3').update(bigquestionTitleLabel);
    var questionOrder = new Element('div', {
        'class': 'prepend-h'
    });
    $('questionContent').insert({
        bottom: questionOrder
    });
    questionOrder.update('(' + g_test.examQuestion.questionOrder + ')');
    var questionContent = new Element('div', {
        'class': 'prepend-1'
    });
    $('questionContent').insert({
        bottom: questionContent
    });
    questionContent.update(g_test.examQuestion.questionContent);
    //$('questionContent').update('(' + g_test.examQuestion.questionOrder + ')' + g_test.examQuestion.questionContent);
    $('currentQuestion').update(g_test.examQuestion.questionOrder);
    $('total').update(g_test.bigQuestionInfo.questionNum);
    $('examQuestionOrder').clear();
    // 清除题号的fieldError
    removeFieldError($('examQuestionOrder'));
}

/**
 * 设置答案区域内容.
 */
function setAnswerArea(){
    $('answerContent').innerHTML = '';
    var orderDiv = new Element('div', {
        'class': 'prepend-h'
    });
    $('answerContent').insert({
        bottom: orderDiv
    });
    orderDiv.update('(' + g_test.examQuestion.questionOrder + ')');
    for (var i = 0; i < g_test.examQuestion.singleQuestions.length; i++) {
        var singleQuestion = g_test.examQuestion.singleQuestions[i];
        
        var singleQuestionAnswer = new Element('div', {
            'class': 'span-20 prepend-1 last'
        });
        $('answerContent').insert({
            bottom: singleQuestionAnswer
        });
        var singleTitle = new Element('div', {
            'class': 'span-4'
        });
        singleQuestionAnswer.insert({
            bottom: singleTitle
        });
        var titleContent = new Element('div', {
            'class': 'span-2',
            'style': 'overflow: hidden;text-overflow: ellipsis;float:left',
            'title': singleQuestion.answerQuesNo
        });
        singleTitle.insert({
            bottom: titleContent
        })
        //titleContent.update(singleQuestion.answerQuesNo);
        titleContent.update(singleQuestion.answerQuesNo);
        var socre = new Element('div', {
            'class': 'span-2 last',
            'style': 'float:right;'
        });
        socre.update(singleQuestion.answerScore + '分');
        titleContent.insert({
            after: socre
        })
        var answer = new Element('div', {
            'class': 'span-12'
        });
        singleTitle.insert({
            after: answer
        });
        if (singleQuestion.answerType != QuestionStyleEnum.UPLOAD) {
            // 问答题，表示部分答案内容
            if (singleQuestion.answerType == QuestionStyleEnum.TEXTAREA) {
                if (singleQuestion.standardAnswer.getStrByteLength() > 19) {
                    answer.update(getStr(singleQuestion.standardAnswer, 19) + '……');
                }
            }
            else 
                if (singleQuestion.answerType == QuestionStyleEnum.BLANK) {
                    // 填空题时，表示编辑后的答案
                    answer.insert({
                        bottom: editBlankContent(singleQuestion.standardAnswer, 1)
                    });
                }
                else {
                    // 其他题型，直接表示答案
                    answer.update(singleQuestion.standardAnswer);
                }
        }
        else {
            var buttonLabel = '标准答案下载';
            answer.answerContent = singleQuestion.standardAnswer;
            createDownloadForm(answer, buttonLabel);
        }
    }
}

/**
 * 设置评分区域内容.
 */
function setMarkArea(){
    // 清空评分区域
    $('markgingContent').innerHTML = '';
    // 设置题号
    $('questionOrder').update('(' + g_test.examQuestion.questionOrder + ')');
    // 生成评分试卷区域内容
    for (var i = 0; i < g_test.employeeAnswerInfos.length; i++) {
        var paperAnswer = g_test.employeeAnswerInfos[i];
        // 试卷答案DIV
        var paperAnswerDiv = new Element('div', {
            'class': 'span-20'
        });
        // 将试卷答案DIV加入评分区域
        $('markgingContent').insert({
            bottom: paperAnswerDiv
        })
        paperAnswerDiv.id = 'YD' + paperAnswer.employeesId;
        // 试卷序号DIV
        var paperCount = new Element('div', {
            'class': 'span-2'
        });
        paperCount.update('试卷' + (i + 1));
        paperAnswerDiv.insert({
            bottom: paperCount
        });
        // 答案内容
        var contentDiv = new Element('div', {
            'class': 'span-18 last'
        });
        paperCount.insert({
            after: contentDiv
        });
        // 是否评分标志
        var markedFlag = true;
        for (var k = 0; k < paperAnswer.singleQuestions.length; k++) {
            // sundefu 2010.08.23 追加标准答案内容局部变量，用于画面控制
            var questionStandardAnswer = g_test.examQuestion.singleQuestions[k].standardAnswer;
            
            var answer = paperAnswer.singleQuestions[k];
            var answerContentDiv = new Element('div', {
                'class': 'span-18'
            })
            contentDiv.insert({
                bottom: answerContentDiv
            });
            var answerDiv = new Element('div', {
                'class': 'span-9'
            });
            answerDiv.examineId = g_test.examineId;
            answerDiv.examineJoinTimes = paperAnswer.examineJoinTimes;
            answerDiv.employeesId = paperAnswer.employeesId;
            answerDiv.questionId = g_test.examQuestion.questionId;
            answerDiv.questionVersionNo = g_test.examQuestion.questionVersionNo;
            answerDiv.answerSerialNo = answer.answerSerialNo;
            
            var answerQuestionNoDiv = new Element('div', {
                'class': 'span-2',
                'style': 'overflow: hidden;text-overflow: ellipsis',
                'title': answer.answerQuesNo
            })
            answerDiv.insert({
                bottom: answerQuestionNoDiv
            });
            //answerQuestionNoDiv.update('1.1.1.1.1.1.1.1.1.1.1.1.1.1');
            if (!answer.answerQuesNo.blank()) {
                answerQuestionNoDiv.update(answer.answerQuesNo);
            }
            else {
                answerQuestionNoDiv.update('1.');
            }
            if (answer.answerType != QuestionStyleEnum.UPLOAD) {
                var empAnswerContent = new Element('div', {
                    'class': 'span-7 last'
                });
                // 问答题，表示部分答案内容
                if (answer.answerType == QuestionStyleEnum.TEXTAREA) {
                    if (answer.answerContent.getStrByteLength() > 19) {
                        empAnswerContent.update(getStr(answer.answerContent, 19) + '……');
                    }
                }
                else 
                    if (answer.answerType == QuestionStyleEnum.BLANK) {
                        // 填空题时，表示编辑后的答案
                        empAnswerContent.insert({
                            bottom: editBlankContent(answer.answerContent, 1)
                        });
                    }
                    else {
                        // 其他题型，直接表示答案
                        empAnswerContent.update(answer.answerContent);
                    }
                answerQuestionNoDiv.insert({
                    after: empAnswerContent
                });
            }
            else {
                var buttonLabel = '考生答案下载';
                answerDiv.answerContent = answer.answerContent;
                createDownloadForm(answerDiv, buttonLabel);
            }
            answerContentDiv.insert({
                bottom: answerDiv
            });
            var markDiv = new Element('div', {
                'class': 'span-5'
            })
            answerDiv.insert({
                after: markDiv
            })
            var markInputDiv = new Element('div', {
                'class': 'span-3'
            });
            markDiv.insert({
                bottom: markInputDiv
            });
            var remarkDiv = new Element('div', {
                'class': 'span-2 last'
            })
            markDiv.insert({
                after: remarkDiv
            });
            if (answer.markFlg == 2) {
                markedFlag = false;
                var inputName = answerDiv.employeesId + '_' + answerDiv.questionId + '_' + answerDiv.answerSerialNo;
                var markInput = new Element('input', {
                    'type': 'text',
                    'class': 'span-2 text_right last',
                    'name': inputName
                });
                markInputDiv.insert({
                    bottom: markInput
                })
                markDiv.insert({
                    bottom: markInputDiv
                });
                Event.observe(markInput, 'change', subMark.curry(markInput));
                
            }
            else 
                if (answer.markFlg == 1) {
                    var markLabel = new Element('div', {
                        'class': 'span-2 text_right'
                    });
                    markLabel.update(answer.questionPoint);
                    markDiv.insert({
                        bottom: markLabel
                    })
                    var remarkButton = new Element('input', {
                        'type': 'button',
                        'value': '重评',
                        'class': 'span-2 btn'
                    });
                    remarkDiv.insert({
                        bottom: remarkButton
                    })
                    Event.observe(remarkButton, 'click', remark.curry(remarkButton));
                }
            // 是否表示详细按钮
            var ifShowDetails = false;
            if (answer.answerType == QuestionStyleEnum.UPLOAD) {
                ifShowDetails = true;
            }
            else 
                if (answer.answerType == QuestionStyleEnum.TEXTAREA) {
                    // 问答题时，判断答案内容是否超长
                    if (questionStandardAnswer.getStrByteLength() > 19 || answer.answerContent.getStrByteLength() > 19) {
                        ifShowDetails = true;
                    }
                }
                else 
                    if (answer.answerType == QuestionStyleEnum.BLANK) {
                        ifShowDetails = editBlankContent(questionStandardAnswer, 3);
                        if (!ifShowDetails) {
                            ifShowDetails = editBlankContent(answer.answerContent, 3);
                        }
                    }
            if (ifShowDetails) {
                var detailDiv = new Element('div', {
                    'class': 'span-2 last',
                    'style': 'float:right;'
                });
                markInputDiv.insert({
                    after: detailDiv
                });
                var detailButton = new Element('input', {
                    'type': 'button',
                    'value': '详细',
                    'class': 'btn span-2'
                });
                detailDiv.insert({
                    bottom: detailButton
                });
                Event.observe(detailButton, 'click', answerDetail.curry(detailButton));
            }
        }
        // 若该试卷已评分且隐藏已评分选中时,隐藏该试卷
        if (markedFlag && $('hidden').status) {
            paperAnswerDiv.addClassName('none');
        }
    }
}

/**
 * 生成下载文件form
 * @param {Object} areaDiv
 * @param {Object} buttonLabel 按钮文字
 */
function createDownloadForm(areaDiv, buttonLabel){
    var form = new Element('form', {
        'method': 'post'
    });
    areaDiv.insert({
        bottom: form
    });
    var downloadButton = new Element('input', {
        'type': 'button',
        'class': 'span-3 btn'
    });
    downloadButton.value = buttonLabel;
    form.insert({
        bottom: downloadButton
    });
    if (areaDiv.answerContent.length == 0) {
        downloadButton.hide();
    }
    var answerFile = new Element('input', {
        'type': 'hidden'
    });
    downloadButton.insert({
        after: answerFile
    });
    Event.observe(downloadButton, 'click', downloadAnswer.curry(downloadButton));
}

/**
 * 为考生评分.
 * @param {Object} obj
 */
function subMark(obj){

    // 校验评分者给出的分数
    var mark = obj.value;
    var answer = obj.up(1).previous();
    var remarkDiv = obj.up(1).next();
    answerSerialNo = answer.answerSerialNo;
    examineId = answer.examineId;
    examineJoinTimes = answer.examineJoinTimes;
    employeesId = answer.employeesId;
    questionId = answer.questionId;
    questionVersionNo = answer.questionVersionNo;
    bigQuestionSerialNo = g_test.examQuestion.bigquestionSerialNo;
    // 校验评分者给出的分数
    if (!validateQuestionPoint(obj, answerSerialNo)) {
        return;
    }
    var url = "k060101MarkSingleInfo.action";
    var pars = 'testEmployeeAnswerInfo.examineId=' + examineId;
    pars = pars + '&testEmployeeAnswerInfo.employeesId=' + employeesId;
    pars = pars + '&testEmployeeAnswerInfo.examineJoinTimes=' + examineJoinTimes;
    pars = pars + '&testEmployeeAnswerInfo.questionId=' + questionId;
    pars = pars + '&testEmployeeAnswerInfo.questionVersionNo=' + questionVersionNo;
    pars = pars + '&testEmployeeAnswerInfo.answerSerialNo=' + answerSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.bigquestionSerialNo=' + bigQuestionSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.questionPoint=' + mark;
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                resetDataMark(employeesId, answerSerialNo, mark);
                subMarkCallBack(obj, remarkDiv, mark);
                
            }
        }
    })
}

/**
 *
 * @param {Object} answer 答案节点DIV
 * @param {Object} detailButton 详细按钮控件
 */
function subMarkCallBack(obj, remarkDiv, mark){
    var markLabel = new Element('div', {
        'class': 'span-2 text_right',
        'name': obj.name
    });
    markLabel.update(mark);
    obj.insert({
        after: markLabel
    })
    obj.remove();
    var remarkButton = new Element('input', {
        'type': 'button',
        'value': '重评',
        'class': 'span-2 btn'
    });
    remarkDiv.insert({
        bottom: remarkButton
    });
    Event.observe(remarkButton, 'click', remark.curry(remarkButton));
}


/**
 * 所评分数校验.
 * @param {Object} obj 评分框
 * @param {Object} answerSerialNo 答案编号
 */
function validateQuestionPoint(obj, answerSerialNo){

    var validation = true;
    // 标准答案分数
    var fullPoint;
    // 取得标准答案分数
    for (var i = 0; g_test.examQuestion.singleQuestions.length; i++) {
        if (answerSerialNo == g_test.examQuestion.singleQuestions[i].answerSerialNo) {
            fullPoint = g_test.examQuestion.singleQuestions[i].answerScore;
            break;
        }
    }
    // 所评分数格式检查
    addRegexCheck(obj, getMessage('js.com.warning.0002', '所评分数'), '[0-9]');
    // 所评分数校验
    addIntCheck(obj, getMessage('js.tt.error.KSE22', fullPoint), 0, fullPoint);
    
    if (!checkInput(obj)) {
        return false;
    }
    return validation;
}

/**
 * 重置数据信息(评分).
 * @param {Object} employeesId 员工ID
 * @param {Object} answerSerialNo 答案编号
 * @param {Object} mark 得分
 */
function resetDataMark(employeesId, answerSerialNo, mark){
    for (var i = 0; i < g_test.employeeAnswerInfos.length; i++) {
        if (g_test.employeeAnswerInfos[i].employeesId == employeesId) {
            var singleQuestions = g_test.employeeAnswerInfos[i].singleQuestions;
            for (var j = 0; j < g_test.employeeAnswerInfos[i].singleQuestions.length; j++) {
                if (singleQuestions[j].answerSerialNo == answerSerialNo) {
                    singleQuestions[j].markFlg = MarkFlgEnum.MARKED;
                    singleQuestions[j].questionPoint = mark;
                    return;
                }
            }
        }
    }
}

/**
 * 重置数据信息(重评).
 * @param {Object} employeesId 员工ID
 * @param {Object} answerSerialNo 答案编号
 */
function resetDataRemark(employeesId, answerSerialNo){
    for (var i = 0; i < g_test.employeeAnswerInfos.length; i++) {
        if (g_test.employeeAnswerInfos[i].employeesId == employeesId) {
            var singleQuestions = g_test.employeeAnswerInfos[i].singleQuestions;
            for (var j = 0; j < singleQuestions.length; j++) {
                if (singleQuestions[j].answerSerialNo == answerSerialNo) {
                    singleQuestions[j].markFlg = MarkFlgEnum.UNMARK;
                    singleQuestions[j].questionPoint = 0;
                    return;
                }
            }
        }
    }
}

/**
 * 编辑填空题表示答案.
 */
function editBlankContent(blankAnswerContent, operateFlag){
    var answers;
    if (!blankAnswerContent.blank()) {
        answers = blankAnswerContent.split(g_BlankDevider);
    }
    // 编辑的答案控件
    var editBlankAnswer = new Element('div');
    
    // 画面缩略表示答案内容
    if (operateFlag == 1 || operateFlag == 3) {
        if (blankAnswerContent.blank()) {
            return operateFlag == 1 ? blankAnswerContent : false;
        }
        var ifShowDetails = false;
        var totalLength = 20;
        var answerOrder;
        var signal = new Element('div');
        var presentobj;
        signal.update('……');
        for (var i = 0; i < answers.size(); i++) {
            if (totalLength > 3) {
                var blankOrder = new Element('div', {
                    'class': 'color_blue float_l'
                });
                if (i == 0) {
                    editBlankAnswer.insert({
                        bottom: blankOrder
                    });
                }
                else {
                    presentobj.insert({
                        after: blankOrder
                    });
                }
                
                answerOrder = i + 1;
                blankOrder.update('[' + answerOrder + ']');
                totalLength = totalLength - 3;
                presentobj = blankOrder;
            }
            else {
                ifShowDetails = true;
                presentobj.insert({
                    after: signal
                });
                break;
            }
            
            var blankContent = new Element('div', {
                'class': 'float_l'
            });
            presentobj.insert({
                after: blankContent
            });
            var strLength = answers[i].replace(/[^\x00-\xff]/g, 'xx').length;
            if (strLength > totalLength) {
                ifShowDetails = true;
                blankContent.update(getStr(answers[i], totalLength));
                presentobj = blankContent;
                presentobj.insert({
                    after: signal
                });
                break;
            }
            else {
                blankContent.update(answers[i]);
                totalLength = totalLength - strLength;
                presentobj = blankContent;
            }
        }
        
        return operateFlag == 1 ? editBlankAnswer : ifShowDetails;
    }
    // 详细弹出的答案内容
    if (operateFlag == 2) {
        if (blankAnswerContent.blank()) {
            return blankAnswerContent;
        }
        var answerOrder;
        for (var i = 0; i < answers.size(); i++) {
            var blankAnswer = new Element('div', {
                'class': 'span-6'
            });
            answerOrder = i + 1;
            blankAnswer.update('[' + answerOrder + '] ' + answers[i]);
            editBlankAnswer.insert({
                bottom: blankAnswer
            });
        }
        return editBlankAnswer;
    }
}

/**
 * 截取字符串函数
 *
 * @param {Object} str
 * @param {Object} n
 * @return 截取的字符串
 */
var getStr = function(str, n){
    var tmpStr = str.substr(0, n);
    var tmpCode = tmpStr.replace(/[^\x00-\xff]/g, '\r\n').split('');
    n = (tmpCode[n - 1] == '\r') ? n - 2 : n - 1;
    var l = tmpCode.slice(0, n).join('').replace(/\r\n/g, '*').length + 1;
    return tmpStr.substr(0, l);
};

/**
 * 考生答案详细.
 * @param {Object} obj 详细按钮控件
 */
function answerDetail(obj){
    var mainDiv = obj.up(0).up(0).previous();
    examineId = mainDiv.examineId;
    examineJoinTimes = mainDiv.examineJoinTimes;
    employeesId = mainDiv.employeesId;
    questionId = mainDiv.questionId;
    questionVersionNo = mainDiv.questionVersionNo;
    answerSerialNo = mainDiv.answerSerialNo;
    var standardAnswer;
    var pointContent;
    var employeesAnswer;
    var answerType;
    for (var i = 0; i < g_test.examQuestion.singleQuestions.length; i++) {
        var singleQuestion = g_test.examQuestion.singleQuestions[i];
        if (singleQuestion.answerSerialNo == answerSerialNo) {
            standardAnswer = singleQuestion.standardAnswer;
            pointContent = singleQuestion.pointOfScore;
            answerType = singleQuestion.answerType;
            break;
        }
    }
    
    for (var i = 0; i < g_test.employeeAnswerInfos.length; i++) {
        if (g_test.employeeAnswerInfos[i].employeesId == employeesId) {
            var singleQuestions = g_test.employeeAnswerInfos[i].singleQuestions;
            for (var j = 0; j < singleQuestions.length; j++) {
                if (singleQuestions[j].answerSerialNo == answerSerialNo) {
                    employeesAnswer = singleQuestions[j].answerContent;
                    break;
                }
            }
        }
    }
    $('points').innerHTML = '';
    for (var i = 0; i < pointContent.length; i++) {
        var pointDiv = new Element('div', {
            'class': 'span-9'
        });
        pointDiv.update(pointContent[i]);
        $('points').insert({
            bottom: pointDiv
        });
    }
    if (answerType == QuestionStyleEnum.UPLOAD) {
        $('standardAnswer').update('');
        $('employeesAnswer').update('');
    }
    else 
        if (answerType == QuestionStyleEnum.BLANK) {
            $('standardAnswer').update('');
            $('standardAnswer').insert({
                bottom: editBlankContent(standardAnswer, 2)
            });
            $('employeesAnswer').update('');
            $('employeesAnswer').insert({
                bottom: editBlankContent(employeesAnswer, 2)
            });
        }
        else {
            $('standardAnswer').update(standardAnswer);
            $('employeesAnswer').update(employeesAnswer);
        }
    g_box.Popup();
}

/**
 *  关闭考生答案详细.
 */
function closeAnswerDetail(){
    g_box.Close();
}

/**
 * 试题迁移.
 * @param {Object} flag 跳转标志
 */
function moveQuestion(flag){
    switch (flag) {
        case OperationFlagEnum.PREB:
            g_currentBigquestion--;
            break;
        case OperationFlagEnum.PRE:
            g_currentQuestion--;
            break;
        case OperationFlagEnum.NEXT:
            g_currentQuestion++;
            break;
        case OperationFlagEnum.NEXTB:
            g_currentBigquestion++;
            break;
        default:
            return;    }
    // 显示加载动画
    showLoader();
    var isSkipMarked = $('skip').checked;
    var url = "k060101GetMoveQuestion.action";
    var pars = "questionJumpFlag=" + flag;
    pars = pars + "&isSkipMarked=" + isSkipMarked;
    addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                g_test = request.responseText.evalJSON(true);
                setPage();
                setButtonMode();
                // 隐藏加载动画
                hideLoader();
            }
        }
    })
    
}

/**
 * 设置按钮模式.
 */
function setButtonMode(){
    if (g_test.examQuestion.questionOrder == 1) {
        $('pre').disable();
    }
    else {
        $('pre').enable();
    }
    if (g_test.examQuestion.questionOrder == g_test.bigQuestionInfo.questionNum) {
        $('next').disable();
    }
    else {
        $('next').enable();
    }
    if (g_currentBigquestion == 0) {
        $('preB').disable();
    }
    else {
        $('preB').enable();
    }
    if (g_currentBigquestion == (g_bigQuestionNum - 1)) {
        $('nextB').disable();
    }
    else {
        $('nextB').enable();
    }
}

/**
 * 隐藏已评分的试卷.
 */
function hiddenMarked(){
    setMarkArea();
}


/**
 * 重新评分
 * @param {Object} obj 重评按钮
 */
function remark(obj){
    if (!confirm(getMessage('js.tt.warn.KSW17'))) {
        return;
    }
    var answer = obj.up(0).previous(1);
    var markLabel = obj.up(0).previous(0).down(0);
    // 取得参数
    examineId = answer.examineId;
    examineJoinTimes = answer.examineJoinTimes;
    employeesId = answer.employeesId;
    questionId = answer.questionId;
    questionVersionNo = answer.questionVersionNo;
    answerSerialNo = answer.answerSerialNo;
    bigQuestionSerialNo = g_test.examQuestion.bigquestionSerialNo;
    var url = "k060101RemarkSingleInfo.action";
    // 设置参数
    var pars = 'testEmployeeAnswerInfo.examineId=' + examineId;
    pars = pars + '&testEmployeeAnswerInfo.employeesId=' + employeesId;
    pars = pars + '&testEmployeeAnswerInfo.examineJoinTimes=' + examineJoinTimes;
    pars = pars + '&testEmployeeAnswerInfo.questionId=' + questionId;
    pars = pars + '&testEmployeeAnswerInfo.questionVersionNo=' + questionVersionNo;
    pars = pars + '&testEmployeeAnswerInfo.answerSerialNo=' + answerSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.bigquestionSerialNo=' + bigQuestionSerialNo;
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            // 重置数据
            resetDataRemark(employeesId, answerSerialNo);
            obj.remove();
            var markInputDiv = new Element('div', {
                'class': 'span-2'
            });
            var markInput = new Element('input', {
                'type': 'text',
                'class': 'span-2 text_right last',
                'name': markLabel.name
            });
            markInputDiv.insert({
                bottom: markInput
            })
            markLabel.insert({
                after: markInputDiv
            });
            markLabel.remove();
            Event.observe(markInput, 'change', subMark.curry(markInput));
            markInput.focus();
        }
    })
}

/**
 * 结束评分.
 */
function endMark(){
    var form = $('endMarkForm');
    form.method = 'post';
    form.action = 'k060101QuitMarkSingleInfo.action';
    // 显示加载动画
    showLoader();
    form.submit();
}

/**
 * 下载答案.
 * @param {Object} obj 下载按钮控件
 */
function downloadAnswer(obj){
    var answerContent = obj.up(1).answerContent;
    var form = obj.up('form');
    var answerFile = obj.next();
    answerFile.value = answerContent;
    answerFile.name = 'testEmployeeAnswerInfo.answerContent';
    form.action = 'k060101DownloadAnswerFile.action';
    form.submit();
}
