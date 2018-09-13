/*
 * @(#)k060091.js
 * @fileoverview 考试阅卷(整卷)&答案对照画面JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 *  考试阅卷(整卷)&答案对照JavaScript.
 *
 * @author sundefu
 * @version 1.0 2010/04/14
 */
var EnumMode = {
    ANSWERMARK: 1,
    ANSWERVIEW_TEST: 2,
    ANSWERVIEW_PRACTICE: 3
};

// 消息类型枚举
var MessageType = {
    STABLE_0: 0,
    RANDOM_0: 1
}

// 答案详细弹出层
var g_box;

// 画面模式
var g_mode;

// 待评分试卷详细信息
var g_test;

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

/**
 *  初期表示
 */
function init(){
    g_mode = $('mode').value;
    if (g_mode != EnumMode.ANSWERMARK) {
        // 隐藏评分控制区域
        $('controlDiv').addClassName('none');
        $('paperCountDiv').addClassName('none');
        $('hiddenMarked').addClassName('none');
    }
    else {
        // 每十分钟更新一次排他锁
        window.setInterval(updateLock, 600000);
    }
    // 获得试卷信息（仅测试数据）
    getTestInfo();
    // 弹出答案详细信息初始化
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
}

/**
 * 更新排他锁.
 */
function updateLock(){
    var url = 'k060091UpdateMarkLock.action?_t=' + new Date().getTime();
    new Ajax.Request(url, {
        method: 'get'
    });
}

/**
 * 退出评分.
 */
function endMark(){
    // 显示加载动画
    showLoader();
    var url = 'k060091QuitMark.action?_t=' + new Date().getTime();
    new Ajax.Request(url, {
        method: 'get',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                var examineId = request.responseText;
                window.location.href = 'k060121InitMarkTaskList?examineId=' + examineId;
            }
        }
    });
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

/**
 * 取得试卷答案信息
 */
function getTestInfo(){
    // 显示加载动画
    showLoader();
    var url = 'k060091GetMarkingPaperDetail.action?_t=' + new Date().getTime();
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                drawScreen(request);
            }
        }
    })
}

/**
 *  画面试卷表示.
 */
function drawScreen(request){
    // 隐藏加载动画
    hideLoader();
    // 将服务器端返回JSON串解析成对象
    g_test = request.responseText.evalJSON(true);
    allPaperNum = g_test.paperAllNum;
	// wanqiuhong 10/25 追加： 因为当大题信息为空时，画面无法正常显示，所以追加判断，如果大题信息为空，则提示错误信息
	if (0 == g_test.bigQuestions.length) {
		$('errorMessage').update(createErrorArea(MessageType.RANDOM_0));
	}
    setQuestion();
    setMarkArea();
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
 * 设置问题区域.
 */
function setQuestion(){
    $('questionContent').innerHTML = '';
    $('paperTitle').update(g_test.paperTitle);
    $('testInfo').update(g_test.paperDescription);
    
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
        }
    }
}

/**
 * 设置阅卷区域.
 */
function setMarkArea(){
    // 组合题总序号
    var singleQuestionOrder = 0;
    $('markArea').innerHTML = '';
    $('markAreaTitle').update(g_test.paperTitle);
    $('markingPaperNo').innerHTML = g_test.markingPaperNo;
    $('paperAllNum').innerHTML = g_test.paperAllNum;
    if (g_test.markingPaperNo == g_test.paperAllNum) {
        $('nextPaper').disable();
    }
    else {
        $('nextPaper').enable();
    }
    if (g_test.markingPaperNo == 1) {
        $('prePaper').disable();
    }
    else {
        $('prePaper').enable();
    }
    if (g_mode != EnumMode.ANSWERMARK) {
        for (var i = 0; i < g_test.examQuestions.length; i++) {
            var singleQuestionList = g_test.examQuestions[i].singleQuestions;
            for (var j = 0; j < singleQuestionList.length; j++) {
                singleQuestionList[j].markFlg = 1;
            }
        }
    }
    
    for (var i = 0; i < g_test.bigQuestions.length; i++) {
        var questionTitle = new Element('div', {
            'class': 'span-22'
        });
        questionTitle.update(g_test.bigQuestions[i].bigquestionShowNum + '、' + g_test.bigQuestions[i].bigquestionTitleInfo);
        $('markArea').insert({
            bottom: questionTitle
        });
        for (var j = 0; j < g_test.examQuestions.length; j++) {
            if (g_test.examQuestions[j].bigquestionSerialNo == g_test.bigQuestions[i].bigquestionSerialNo) {
                start = j;
                break;
            }
        }
        for (var k = 0; k < g_test.bigQuestions[i].questionNum; k++, start++) {
            var markedFlag = true;
            var question = g_test.examQuestions[start];
            var questionDiv = new Element('div', {
                'class': 'span-1'
            });
            var questionDivContent = new Element('div', {
                'class': 'span-22 prepend-h'
            })
            $('markArea').insert({
                bottom: questionDivContent
            });
            questionDiv.update(question.questionShowNum);
            questionDivContent.insert({
                bottom: questionDiv
            });
            var answerContentDiv = new Element('div', {
                'class': 'span-21 last'
            });
            questionDiv.insert({
                after: answerContentDiv
            });
            var singleQuestions = g_test.examQuestions[start].singleQuestions;
            for (var j = 0; j < singleQuestions.length; j++) {
                var singleAnswer = new Element('div', {
                    'class': 'span-21 last'
                });
                answerContentDiv.insert({
                    bottom: singleAnswer
                });
                singleQuestionOrder = singleQuestionOrder + 1;
                var singleQuestion = singleQuestions[j];
                var singleQuestionAnswer = new Element('div', {
                    'class': 'span-10'
                });
                var quesNoAndPoint = new Element('div', {
                    'class': 'span-5'
                });
                singleAnswer.insert({
                    bottom: singleQuestionAnswer
                });
                singleQuestionAnswer.insert({
                    bottom: quesNoAndPoint
                });
                var singleTitle = new Element('div', {
                    'class': 'span-2',
                    'style': 'overflow: hidden;text-overflow: ellipsis;float:left',
                    'title': singleQuestion.answerQuesNo
                });
                quesNoAndPoint.insert({
                    bottom: singleTitle
                });
                singleTitle.update(singleQuestion.answerQuesNo);
                singleTitle.addClassName('span-1');
                var socre = new Element('div', {
                    'class': 'span-2',
                    'style': 'float:right;'
                });
				if (singleQuestions.length > 1) {
					if (singleQuestion.questionScoreDetails.empty()){
						socre.update(singleQuestion.answerScore + '分');
					} else {
						socre.update(singleQuestion.questionScoreDetails.split(',')[j] + '分');
					}					
				} else {
					socre.update(singleQuestion.paperQuestionScore + '分');
				}
                singleTitle.insert({
                    after: socre
                })
                var answer = new Element('div', {
                    'class': 'span-4'
                });
                quesNoAndPoint.insert({
                    after: answer
                });
                // 不是上传题，表示答案内容
                if (singleQuestion.answerType != QuestionStyleEnum.UPLOAD) {
                    // 问答题，表示部分答案内容
                    if (singleQuestion.answerType == QuestionStyleEnum.TEXTAREA) {
                        if (singleQuestion.standardAnswer.getStrByteLength() > 19) {
                            answer.update(getStr(singleQuestion.standardAnswer, 19) + '……');
                        }else{
                        	answer.update(singleQuestion.standardAnswer);
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
                    // 文件上传题，直接表示答案下载按钮
                    var buttonLabel = '标准答案下载';
                    answer.answerContent = singleQuestion.standardAnswer;
                    createDownloadForm(answer, buttonLabel);
                }
                var answerContent = new Element('div', {
                    'class': 'span-6'
                });
                singleQuestionAnswer.insert({
                    after: answerContent
                });
                // 不是文件上传题，表示考生答案内容
                if (singleQuestion.answerType != QuestionStyleEnum.UPLOAD) {
                    var employeeAnswer = new Element('div', {
                        'class': 'span-4 text_right'
                    });
                    // 问答题，表示部分答案内容
                    if (singleQuestion.answerType == QuestionStyleEnum.TEXTAREA) {
                        if (singleQuestion.answerContent.getStrByteLength() > 19) {
                            employeeAnswer.update(getStr(singleQuestion.answerContent, 19) + '……');
                        }else{
                        	employeeAnswer.update(singleQuestion.answerContent);
                        }
                    }
                    else 
                        if (singleQuestion.answerType == QuestionStyleEnum.BLANK) {
                            // 填空题时，表示编辑后的答案
                            employeeAnswer.insert({
                                bottom: editBlankContent(singleQuestion.answerContent, 1)
                            });
                        }
                        else {
                            // 其他题型，直接表示答案
                            employeeAnswer.update(singleQuestion.answerContent);
                        }
                    employeeAnswer.questionId = question.questionId;
                    employeeAnswer.answerSerialNo = singleQuestion.answerSerialNo;
                    employeeAnswer.bigquestionSerialNo = question.bigquestionSerialNo;
                    employeeAnswer.questionVersionNo = question.questionVersionNo;
                    
                    answerContent.insert({
                        bottom: employeeAnswer
                    });
                    // 判断需不需要表示【详细】按钮
                    var ifShowDetails = false;
                    if (singleQuestion.answerType == QuestionStyleEnum.BLANK) {
                        ifShowDetails = editBlankContent(singleQuestion.standardAnswer, 3);
                        if (!ifShowDetails) {
                            ifShowDetails = editBlankContent(singleQuestion.answerContent, 3);
                        }
                    }
                    else 
                        if (singleQuestion.answerType == QuestionStyleEnum.TEXTAREA) {
                            if (singleQuestion.standardAnswer.getStrByteLength() > 19 || singleQuestion.answerContent.getStrByteLength() > 19) {
                                ifShowDetails = true;
                            }
                        }
                    // 需要表示详细按钮时
                    if (ifShowDetails) {
                        var detailButton = new Element('input', {
                            'type': 'button',
                            'class': 'span-2 btn',
                            'value': '详细',
                            'style': 'float:right;'
                        })
                        employeeAnswer.insert({
                            after: detailButton
                        });
                        Event.observe(detailButton, 'click', answerDetail.curry(detailButton));
                    }
                }
                else {
                    var employeeAnswer = new Element('div', {
                        'class': 'span-4 text_right'
                    });
                    employeeAnswer.questionId = question.questionId;
                    employeeAnswer.answerSerialNo = singleQuestion.answerSerialNo;
                    employeeAnswer.bigquestionSerialNo = question.bigquestionSerialNo;
                    employeeAnswer.questionVersionNo = question.questionVersionNo;
                    answerContent.insert({
                        bottom: employeeAnswer
                    });
                    
                    var buttonLabel = '考生答案下载';
                    employeeAnswer.answerContent = singleQuestion.answerContent;
                    
                    createDownloadForm(employeeAnswer, buttonLabel);
                    
                    /*
                     var downloadButton = new Element('input', {
                     'type': 'button',
                     'class': 'span-3 btn',
                     'value': '考生答案下载',
                     'style': 'float:right;'
                     });
                     employeeAnswer.insert({
                     after: downloadButton
                     });
                     Event.observe(downloadButton, 'click', download.curry(downloadButton));
                     */
                    var detailButton = new Element('input', {
                        'type': 'button',
                        'class': 'span-2 btn',
                        'value': '详细',
                        'style': 'float:right;'
                    })
                    employeeAnswer.insert({
                        after: detailButton
                    });
                    Event.observe(detailButton, 'click', answerDetail.curry(detailButton));
                }
                var markContent = new Element('div', {
                    'class': 'span-5 last',
                    'style': 'float:right;'
                });
                answerContent.insert({
                    after: markContent
                });
                if (singleQuestion.markFlg != 1) {
                    if (singleQuestion.markFlg == 2) {
                        markedFlag = false;
						if (!singleQuestion.answerContent.empty()) {
	                        var markInput = new Element('input', {
	                            'type': 'text',
	                            'class': 'span-2 text_right',
	                            'name': 'markInput' + singleQuestionOrder
	                        });
	                        markContent.insert({
	                            bottom: markInput
	                        });
	                        Event.observe(markInput, 'change', subMark.curry(markInput));							
						} else {
		                    var markLabel = new Element('div', {
		                        'class': 'span-2 text_right',
		                        'name': 'markInput' + singleQuestionOrder
		                    });
		                    markLabel.update(0);
		                    markContent.insert({
		                        bottom: markLabel
		                    })
                            var remarkButton = new Element('input', {
                                'type': 'button',
                                'value': '重评',
                                'class': 'span-2 btn'
                            });
                            markLabel.insert({
                                after: remarkButton
                            })
                            Event.observe(remarkButton, 'click', remark.curry(remarkButton));
						}
                    }
                    else {
	                    var markLabel = new Element('div', {
	                        'class': 'span-2 text_right',
	                        'name': 'markInput' + singleQuestionOrder
	                    });
	                    markLabel.update(0);
	                    markContent.insert({
	                        bottom: markLabel
	                    })
                        var remarkButton = new Element('input', {
                            'type': 'button',
                            'value': '重评',
                            'class': 'span-2 btn'
                        });
                        markLabel.insert({
                            after: remarkButton
                        })
                        Event.observe(remarkButton, 'click', remark.curry(remarkButton));						
                        markedFlag = true;
                    }
                }
                else {
                    var markLabel = new Element('div', {
                        'class': 'span-2 text_right',
                        'name': 'markInput' + singleQuestionOrder
                    });
                    markLabel.update(singleQuestion.questionPoint);
                    markContent.insert({
                        bottom: markLabel
                    })
                    if (singleQuestion.markFlg == 1) {
                        if (g_mode == EnumMode.ANSWERMARK) {
                            var remarkButton = new Element('input', {
                                'type': 'button',
                                'value': '重评',
                                'class': 'span-2 btn'
                            });
                            markLabel.insert({
                                after: remarkButton
                            })
                            Event.observe(remarkButton, 'click', remark.curry(remarkButton));
                        }
                    }
                    
                }
            }
            if (markedFlag && $('hidden').status) {
                questionDivContent.addClassName('none');
            }
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
        'class': 'span-3 btn last'
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
 * 下载答案.
 * @param {Object} obj 下载按钮控件
 */
function downloadAnswer(obj){
    var answerContent = obj.up(1).answerContent;
    var form = obj.up('form');
    var answerFile = obj.next();
    answerFile.value = answerContent;
    if("标准答案下载" == obj.value){
	    answerFile.name = 'testEmployeeAnswerInfo.answerContent';
	    form.action = 'k060091DownloadStandardAnswerFile.action';	
    }else{
	    answerFile.name = 'testEmployeeAnswerInfo.answerContent';
	    form.action = 'k060091DownloadAnswerFile.action';
    }
    form.submit();
}

/**
 * 隐藏已评的试题.
 */
function hiddenMarked(){
    setMarkArea();
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
 * @param {Object} obj
 */
function answerDetail(obj){
    var mainDiv = obj.previous();
    questionId = mainDiv.questionId;
    answerSerialNo = mainDiv.answerSerialNo;
    var standardAnswer;
    var pointOfScore;
    var employeesAnswer;
    var answerType;
    for (var i = 0; i < g_test.examQuestions.length; i++) {
        if (questionId == g_test.examQuestions[i].questionId) {
            for (var j = 0; j < g_test.examQuestions[i].singleQuestions.length; j++) {
                var singleQuestion = g_test.examQuestions[i].singleQuestions[j];
                if (singleQuestion.answerSerialNo == answerSerialNo) {
                    standardAnswer = singleQuestion.standardAnswer;
                    pointOfScore = singleQuestion.pointOfScore;
                    employeesAnswer = singleQuestion.answerContent;
                    answerType = singleQuestion.answerType;
                    break;
                }
            }
            break;
        }
    }
    
    $('points').innerHTML = '';
    for (var i = 0; i < pointOfScore.length; i++) {
        var pointDiv = new Element('div', {
            'class': 'span-9'
        });
        pointDiv.update(pointOfScore[i]);
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
    // 关闭弹出层
    g_box.Close();
}

/**
 * 评分.
 * @param {Object} obj 评分框控件
 */
function subMark(obj){
    var mark = obj.value;
    var answerDiv = obj.up(0).previous().down(0);
    questionId = answerDiv.questionId;
    answerSerialNo = answerDiv.answerSerialNo;
    questionVersionNo = answerDiv.questionVersionNo;
    bigQuestionSerialNo = answerDiv.bigquestionSerialNo;
    
    // 标准答案分数
    var fullPoint;
    // 取得标准答案分数
    for (var i = 0; g_test.examQuestions.length; i++) {
        if (questionId == g_test.examQuestions[i].questionId) {
            for (var j = 0; g_test.examQuestions[i].singleQuestions.length; j++) {
                if (answerSerialNo == g_test.examQuestions[i].singleQuestions[j].answerSerialNo) {
				if (g_test.examQuestions[i].singleQuestions.length > 1) {
					if (g_test.examQuestions[i].singleQuestions[j].questionScoreDetails.empty()){
						fullPoint = g_test.examQuestions[i].singleQuestions[j].answerScore;
					} else {
						fullPoint = g_test.examQuestions[i].singleQuestions[j].questionScoreDetails.split(',')[j];
					}					
				} else {
					fullPoint = g_test.examQuestions[i].singleQuestions[j].paperQuestionScore;
				}					
                    break;
                }
            }
            if (fullPoint) {
                break;
            }
        }
    }
    // 所评分数格式检查
    addRegexCheck(obj, getMessage('js.com.warning.0002', '所评分数'), '[0-9]');
    // 所评分数校验
    addIntCheck(obj, getMessage('js.tt.error.KSE22', fullPoint), 0, fullPoint);
    
    // 校验评分者给出的分数
    if (!checkInput(obj)) {
        return;
    }
    // 答案分数校验
    validateQuestionPoint(questionId, mark, answerSerialNo, obj);
    
    var url = 'k060091MarkWholePaper.action';
    var pars = 'testEmployeeAnswerInfo.questionId=' + questionId;
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
                for (var i = 0; i < g_test.examQuestions.length; i++) {
                    if (questionId == g_test.examQuestions[i].questionId) {
                        for (var j = 0; j < g_test.examQuestions[i].singleQuestions.length; j++) {
                            var singleQuestion = g_test.examQuestions[i].singleQuestions[j];
                            if (singleQuestion.answerSerialNo == answerSerialNo) {
                                singleQuestion.markFlg = 1;
                                singleQuestion.questionPoint = obj.value;
                                break;
                            }
                        }
                        break;
                    }
                }
                markCallBack(obj);
            }
        }
    })
}

/**
 * 评分刷新画面.
 * @param {Object} obj 评分框控件
 */
function markCallBack(obj){
    var markContent = obj.up(0);
    var mark = obj.value;
    var singleName = obj.name;
    obj.remove();
    var markLabel = new Element('div', {
        'class': 'span-2 text_right',
        'name': singleName
    });
    markLabel.update(mark);
    markContent.insert({
        bottom: markLabel
    })
    var remarkButton = new Element('input', {
        'type': 'button',
        'value': '重评',
        'class': 'span-2 btn'
    });
    markLabel.insert({
        after: remarkButton
    })
    Event.observe(remarkButton, 'click', remark.curry(remarkButton));
}

/**
 * 所评分数校验.
 * @param {Object} questionPoint 分数
 * @param {Object} answerSerialNo 答案编号
 */
function validateQuestionPoint(fullPoint, questionPoint, obj){
    // 输入试卷号非数字，提示用户 
    if (isNaN(questionPoint) || questionPoint.length == 0) {
        addFieldError(obj, getMessage('js.com.warning.0002'));
        return false;
    }
    var markPoint = parseInt(questionPoint, 10);
    // 若给出的评分超过标准答案分数 弹出消息提示
    if (markPoint > fullPoint || markPoint < 0) {
        addFieldError(obj, getMessage('js.tt.error.KSE22', fullPoint));
        return false;
    }
    return true;
}

/**
 * 重新评分.
 * @param {Object} obj 重评按钮控件
 */
function remark(obj){
    var answerDiv = obj.up(0).previous().down(0);
    questionId = answerDiv.questionId;
    answerSerialNo = answerDiv.answerSerialNo;
    questionVersionNo = answerDiv.questionVersionNo;
    bigQuestionSerialNo = answerDiv.bigquestionSerialNo;
    
    var url = 'k060091ReMarkWholePaper.action';
    var pars = 'testEmployeeAnswerInfo.questionId=' + questionId;
    pars = pars + '&testEmployeeAnswerInfo.questionVersionNo=' + questionVersionNo;
    pars = pars + '&testEmployeeAnswerInfo.answerSerialNo=' + answerSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.bigquestionSerialNo=' + bigQuestionSerialNo;
    pars = pars + '&testEmployeeAnswerInfo.questionPoint=' + 0;
    addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                for (var i = 0; i < g_test.examQuestions.length; i++) {
                    if (questionId == g_test.examQuestions[i].questionId) {
                        for (var j = 0; j < g_test.examQuestions[i].singleQuestions.length; j++) {
                            var singleQuestion = g_test.examQuestions[i].singleQuestions[j];
                            if (singleQuestion.answerSerialNo == answerSerialNo) {
                                singleQuestion.markFlg = 2;
                                singleQuestion.questionPoint = 0;
                                break;
                            }
                        }
                        break;
                    }
                }
                remarkCallBack(obj);
            }
        }
    })
}

/**
 * 重新评分刷新画面.
 * @param {Object} obj 按钮控件
 */
function remarkCallBack(obj){
    var markContent = obj.up(0);
    var singleName = obj.previous().name;
    obj.previous().remove();
    obj.remove();
    var markInput = new Element('input', {
        'type': 'text',
        'class': 'span-2 text_right',
        'tooltip': '请输入分数:',
        'name': singleName
    });
    markContent.insert({
        bottom: markInput
    });
    Event.observe(markInput, 'change', subMark.curry(markInput));
    markInput.focus();
}

/**
 * 上一张
 */
function prePaper(){
    // 显示加载动画
    showLoader();
    var url = 'k060091PreviousPaper.action';
    var ifSkipMarked = $('skip').checked;
    var pars = 'markingPaperNo=' + $('markingPaperNo').innerHTML;
    var pars = pars + '&ifSkipMarked=' + ifSkipMarked;
    addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                drawScreen(request);
            }
        }
    });
    $('paperOrder').clear();
    removeFieldError($('paperOrder'));
}

/**
 * 下一张
 */
function nextPaper(){
    // 显示加载动画
    showLoader();
    var url = 'k060091NextPaper.action';
    var ifSkipMarked = $('skip').checked;
    var pars = 'markingPaperNo=' + $('markingPaperNo').innerHTML;
    var pars = pars + '&ifSkipMarked=' + ifSkipMarked;
    addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
                drawScreen(request);
            }
        }
    });
    $('paperOrder').clear();
    removeFieldError($('paperOrder'));
}


