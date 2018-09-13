   var pageNumInfo=1;
   var querstionOtherIds = {};
;(function ($,window,document,undefined) {

    /**
     * 全局变量
     */
	//问卷id
    var serveyId;
    //问卷名称
    var serveyName;
    //问卷状态
    var serveyStatus = "";
    var oper;
    var status;
    var pageNum=1;
    var serveyMultipleSurveys="";
    var temporaryType = "";
    //判断该问卷下的调查反馈是否存在
    var exitServeyResponse;
    var msgId; //消息id
    /**
     * 初始化数据操作
     */
    /**
     */
    $(document).ready(function () {
        try {
            //问卷id
            serveyId = $.xljUtils.getUrlParam('serveyId');
            msgId = $.xljUtils.getUrlParam('msgId');
            serveyId = serveyId=='null'?'':serveyId;
            judgeExitServeyResponseByServeyId(serveyId);
            //所属的目录ID
            serveyName = decodeURI(decodeURI(escape($.xljUtils.getUrlParam('serveyName'))));
            serveyName = serveyName=='null'?'':serveyName;
            var serveyInfo = getQuestionById(serveyId);
            serveyMultipleSurveys = serveyInfo.serveyMultipleSurveys;
            serveyStatus = decodeURI(escape($.xljUtils.getUrlParam('serveyStatus')));
            if(serveyStatus == null || serveyStatus == "" || serveyStatus == "undefined" || serveyStatus == "null"){
            	var sysDate = new Date();//获取系统时间  
            	var newFromDate = new Date(serveyInfo.fromDate);
            	if(serveyInfo.thruDate == null || serveyInfo.thruDate == ""){
            		serveyStatus = "进行中";
            	}else{
            		var newThruDate = new Date(serveyInfo.thruDate);
                	if(newFromDate > sysDate){  
                		serveyStatus = "未开始";
    	            }else if(newThruDate < sysDate){  
    	            	serveyStatus = "已结束";
    	            }else{
    	            	serveyStatus = "进行中";
    	            }
            	}
            }
            $("#titleName").html($.xljUtils.htmlEncode(serveyName));
            //操作 新增add 编辑edit
            oper = $.xljUtils.getUrlParam('oper');
            oper = oper=='null'?'':oper;
            //问卷状态
            status = $.xljUtils.getUrlParam('status');
            //调查人状态
            var type = $.xljUtils.getUrlParam('type');
            
            if(type==1 || serveyStatus == "已结束" || serveyStatus == "未开始"){
            	$("#saveBtn").hide();
            	$("#temporarySaveBtn").hide();
            }else{
            	$("#saveBtn").show();
            	$("#temporarySaveBtn").show();
            }
            var sourceF = $.xljUtils.getUrlParam('source');
            if(sourceF=='YB'){
                $("#saveBtn").hide();
                $("#temporarySaveBtn").hide();
            }
            if(oper == 'DY'){
            	//用户id
                debugger;
                var userId = $.xljUtils.getUrlParam('userId');
            	$("#saveBtn").hide();
            	$("#temporarySaveBtn").hide();
            	$("input").prop("disabled","disabled");
              	$("textarea").prop("readonly","readonly");
              	$("textarea").addClass('read-only');
            	$.ajax({ //发送更新的ajax请求
                    type: "post",
                    url: hostUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsg?time="+Math.random(),
                    dataType: "json",
                    async: false,
                    data: JSON.stringify({"newStatus": "YY","oldStatus":"DY","id":msgId,"businessId": serveyId ,"userId": userId }),
                    contentType: 'application/json;charset=utf-8', //设置请求头信息
                    success: function (data) {
                        console.info(data);
                    },
                    error: function (data) {
                        if (data.msg) {
                            pop_tip_open('red', data.msg);
                        } else {
                          //  pop_tip_open('red', "删除待阅失败！");
                        }
                    }
                });
            }
            
            //双击进入编辑页面，如果是第一次进入编辑，则要初始化uuid
            
            //初始化uuId
            if(exitServeyResponse=='1') {
                $('.xj-form-title span').text('问卷调查');
            }else{
            	initUUId();
                $('.xj-form-title span').text('问卷调查');
            }
            //绑定按钮事件
            bindButton();
            //创建contentRowType的form表单
            createContentRowTypeForm();
        } catch (e) {

        }

    });

    /**
     * 生成ID
     */
    function initUUId() {
        $.ajax({
            type: 'get',
            url: hostUrl + "generator/getGuuid?time=" + Math.random(),
            async:false,
            success: function (data) {
                var guuid = data.result;
                contentRowTypeId = guuid;
                $("#id").val(guuid);
            }
        });
    }

    /**
     * 绑定按钮事件
     */
    function bindButton() {
        //提交按钮
        $("#saveBtn").click(function () {
            submitForm('save');
        });
        //暂存按钮
        $("#temporarySaveBtn").click(function () {
            submitForm('temporary');
        });
        
        //参与人员信息
        $("#replyInfo").click(function () {
        	$("#myModal").modal({backdrop:'static',show:true});
        	//回显参与人员数据
            $.ajax({
            	type: "POST",
            	contentType: "application/json",
                url:hostUrl + 'oa/servey/serveyParty/queryJoinServeyUserInfo/'+'?time='+Math.random(),
                data: JSON.stringify({'serveyId':serveyId,"type":"PARTY"}),
        		dataType:"JSON",
                success: function(data) {
                	var serveyParty=data.result;
                	$("#attendUser").html(serveyParty.reployUsername.join(','));	//参与人员
                	$("#noAttendUser").html(serveyParty.nojoinUsername.join(','));//未参与人员
                },
            	error: function (jqXHR, textStatus, errorThrown) {
        			$.xljUtils.getError(jqXHR.status);
            	}
        	});
        });
        //预览按钮
        $("#viewBtn").click(function () {
            //submitForm('preView');
        	 window.open('serveyQuestionnaire_attribute.html?act=update&id='+serveyId, '_blank');
        });
        //关闭按钮
        $("#closeBtn").click(function () {
             // newwin = window.open("","_parent","");
             // newwin.close();
             window.close();
        });

        $(".radioS").on("click",function(e){
            $(this).parent().siblings().find("span").removeClass("cur");
            $(this).addClass("cur");
            e.stopPropagation();
        });
        $(".checkS").on("click",function(){
            $(this).toggleClass("cur");
            e.stopPropagation();
        });
    }
    
    //点击参与人员信息，获取信息详情
    function replyInfo() {
    	window.open("serveyQuestionnaire_userInfo.html?serveyId="+serveyId);
    }

    /**
     * 创建该问卷下面所有题目类型的form表单
     */
    function createContentRowTypeForm() {
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: hostUrl + "oa/servey/serveyQuestion/queryList?time=" + Math.random(),
            data: JSON.stringify({'serveyId':serveyId,'sidx':'questionNum'}),
            dataType: "json",
            success: function (result) {
                //动态创建form表单
                // createForm(result.result);
                createForm2(result.result);

               initFormData();
            }
        });
    }

    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        var table = $("#newQuestionTable");
        //var row = table.insertRow();
        var count = 1;
        debugger;
        if (resultList != null && resultList.length > 0) {
            /*获取该问卷下面问题的基本属性字段，拼接form表单*/
        	var resultListLen = resultList.length;
            for (var i = 0; i < resultList.length; i++) {
                var serveyQuestion = resultList[i];
                var questionId = serveyQuestion.id;//题目id
                var question = serveyQuestion.question;//题目内容
                var questionTip = serveyQuestion.questionTip;//题目提示
                var questionTypeCode = serveyQuestion.questionTypeCode;//题目类型编码
                var isRequired = serveyQuestion.questionRequired;
                var questionScore = serveyQuestion.questionScore;//分数
                if(questionScore == null || questionScore == ""){
                	questionScore = 0;
                }
                var labelObj;
                var textInputObj;
                var pageSign=0;
                switch (questionTypeCode) {
                   
                    case 'SINGLE_SELECT':
                    	var name = 'optionId';
                    	var spanisRequired="";
                    	var requiredInput="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+",1' name='requiredQuestion' ></label>";
                        }
                        var textInputObjHtml = '';
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>单选题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += " <div class='questions xuan'>";
                        textInputObjHtml += " <form>";
                        textInputObjHtml += requiredInput;
                        var enumList = enumPropertiesResult(questionId);
                       
                        $.each(enumList,function (i,item) {
                        	if(item.optionType == 1){
                        		var inputLabelObj = $('<p><input type="radio"><span></span><input name="textResponse"style="border-left-width:0px;border-top-width:0px;border-right-width:0px;width:200px"/></p>');
                                var inputObj = $(inputLabelObj.find('input')[0]);
                                inputObj.attr('name',name);
                                inputObj.attr('id',item.id);
                                inputObj.val(item.id);
                                querstionOtherIds[item.id]=item.id;
                                var inputObj1 = $(inputLabelObj.find('span')[0]);
                                inputObj1.html(item.sequenceNum+".");
                                textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}else{
                        		var inputLabelObj = $('<p><input type="radio"><span></span></p>');
                                var inputObj = $(inputLabelObj.find('input')[0]);
                               // inputObj.attr('type','hidden');
                                inputObj.attr('name',name);
                                inputObj.attr('id',item.id);
                                inputObj.val(item.id);
                                var inputObj1 = $(inputLabelObj.find('span')[0]);
                                inputObj1.html(item.sequenceNum+"."+item.description);
                                textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}
                        });
                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += " </form>";
                        textInputObjHtml += "</div></div>";
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                   case 'MULTI_SELECT':
                    	var name = 'optionId';
                    	var requiredInput="";
                    	var spanisRequired="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+",1' name='requiredQuestion' ></label>";
                    	}
                        labelObj = $('<label></label>');
                        var textInputObjHtml = '';
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += " <p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>多选题（"+spanisRequired+"单个问题可以选择多项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<div class='questions xuan'>";
                        textInputObjHtml += " <form>";
                        textInputObjHtml += requiredInput;
                        var enumList = enumPropertiesResult(questionId);
                        $.each(enumList,function (i,item) {
                        	if(item.optionType == 1){
                        		var inputLabelObj = $('<p><input type="checkBox"><span></span><input name="textResponse" style="border-left-width:0px;border-top-width:0px;border-right-width:0px;width:200px"/></p>');
                        		 var inputObj = $(inputLabelObj.find('input')[0]);
 	                            inputObj.attr('name',name);
 	                            inputObj.attr('id',item.id);
 	                            inputObj.val(item.id);
 	                            querstionOtherIds[item.id]=item.id;
 	                            var inputObj1 = $(inputLabelObj.find('span')[0]);
 	                            inputObj1.html(item.sequenceNum+".");
 	                            textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}else{
	                            var inputLabelObj = $('<p><input type="checkBox" ><span></span></p>');
	                            var inputObj = $(inputLabelObj.find('input')[0]);
	                            inputObj.attr('name',name);
	                            inputObj.attr('id',item.id);
	                            inputObj.val(item.id);
	                            var inputObj1 = $(inputLabelObj.find('span')[0]);
	                            inputObj1.html(item.sequenceNum+"."+item.description);
	                            textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}
                        });

                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += " </form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                 case 'QA':
                    	var name = 'textResponse';
                    	var requiredInput="";
                    	var spanisRequired="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                    	}
                        labelObj = $('<label></label>');
                        var textInputObjHtml = '';
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>问答题（"+spanisRequired+""+questionScore+"分）</p>";
                        textInputObjHtml += "<div class='questions'>";
                        textInputObjHtml += " <form>";
                        textInputObjHtml += requiredInput;
                       
                        var inputLabelObj = $('<span><textarea data-placeholder="请填写答案"></textarea></span>');
                        var inputObj = $(inputLabelObj.find('textarea')[0]);
                        inputObj.attr('name',name);
                        inputObj.attr('id',questionId);
                        
                        //inputLabelObj.append(item.sequenceNum+"."+item.description);
                        textInputObjHtml += inputLabelObj[0].outerHTML;
                            

                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += " </form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        //labelObj.append(question+' : ');
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                  case 'GRADE_SUBJECT':
                    	var name = 'optionId';
                    	var spanisRequired="";
                    	var requiredInput="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                        }
                        labelObj = $('<label></label>');
                        var textInputObjHtml = '';
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += " <div class='questions xuan'>";
                        textInputObjHtml += " <form>";
                        textInputObjHtml += requiredInput;
                        var enumList = enumPropertiesResult(questionId);
                        $.each(enumList,function (i,item) {
                            var inputLabelObj = $('<p><input type="radio" ><span></span></p>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name',name);
                            inputObj.attr('id',item.id);
                            inputObj.val(item.id);
                            
                            inputLabelObj.append(item.sequenceNum+"."+item.description);
                            textInputObjHtml += inputLabelObj[0].outerHTML;
                            
                        });

                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += " </form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        //labelObj.append(question+' : ');
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                        
                    case 'MATRIX_MULTI_SELECT':
                    	//矩阵类型的问题
                    	 //如果是矩阵多选题，先获取矩阵问题的题目内容
                        var subQuestion = matrixMultiSelectQuestion(questionId);
                    	var name = 'optionId';
                    	var spanisRequired="";
                    	var requiredInput="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                        }
                        labelObj = $('<label></label>');
                        //如果是矩阵多选题，要从矩阵题库中获取题目
                        var enumList = enumPropertiesResult(questionId);
                        var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>矩阵多选题（"+spanisRequired+"每个问题可以多次选择，"+questionScore+"分）</p>";
                        textInputObjHtml += "<div class='questions'>";
                        textInputObjHtml += "<form>";
                        textInputObjHtml += requiredInput;
                        textInputObjHtml += "<table><tbody>";
                        textInputObjHtml += "<tr class='row-tit'>";
                        textInputObjHtml += "<td class='bg'></td>";
                        $.each(subQuestion,function (i,item) {
                            textInputObjHtml += "<td>"+item.question_content+"</td>";
                        });
                        textInputObjHtml += "</tr>";
                        $.each(enumList,function (i,item) {
                        	textInputObjHtml += "<tr>";
                        	textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                        	for(var i = 0; i < subQuestion.length;i++){
                        		var inputLabelObj = $('<td><input type="checkBox"></td>');
                                var inputObj = $(inputLabelObj.find('input')[0]);
                                inputObj.attr('name',name);
                                inputObj.attr('id',subQuestion[i].id + item.id);
                                inputObj.val(subQuestion[i].id + "," + item.id);
                                textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}
                        	textInputObjHtml += "</tr>";
                        });
                        textInputObjHtml += "</tbody></table>";
                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += "</form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        //labelObj.append(question+' : ');
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                    case 'MATRIX_SINGLE_SELECT':
                    	//矩阵类型的问题
                    	 //如果是矩阵多选题，先获取矩阵问题的题目内容
                        var subQuestion = matrixMultiSelectQuestion(questionId);
                    	var name = 'optionId';
                    	var spanisRequired="";
                    	var requiredInput="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                        }
                        labelObj = $('<label></label>');
                        //如果是矩阵多选题，要从矩阵题库中获取题目
                        var enumList = enumPropertiesResult(questionId);
                        var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>矩阵单选题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<div class='questions'>";
                        textInputObjHtml += "<form>";
                        textInputObjHtml += requiredInput;
                        textInputObjHtml += "<table><tbody>";
                        textInputObjHtml += "<tr class='row-tit'>";
                        textInputObjHtml += "<td class='bg'></td>";
                        $.each(subQuestion,function (i,item) {
                            textInputObjHtml += "<td>"+item.question_content+"</td>";
                        });
                        textInputObjHtml += "</tr>";
                        $.each(enumList,function (i,item) {
                        	textInputObjHtml += "<tr>";
                        	textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                        	for(var i = 0; i < subQuestion.length;i++){
                        		var inputLabelObj = $('<td><input type="radio" ></td>');
                                var inputObj = $(inputLabelObj.find('input')[0]);
                                inputObj.attr('name',name+i);
                                inputObj.attr('id',subQuestion[i].id + item.id);
                                inputObj.val(subQuestion[i].id + "," + item.id);
                                textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}
                        	textInputObjHtml += "</tr>";
                        });
                        textInputObjHtml += "</tbody></table>";
                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += "</form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        //labelObj.append(question+' : ');
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                        break;
                    case 'MATRIX_GRADE_SUBJECT':
                    	//矩阵类型的问题
                    	 //如果是矩阵多选题，先获取矩阵问题的题目内容
                        var subQuestion = matrixMultiSelectQuestion(questionId);
                    	var name = 'optionId';
                    	var spanisRequired="";
                    	var requiredInput="";
                    	if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                    		requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                        }
                        labelObj = $('<label></label>');
                        //如果是矩阵多选题，要从矩阵题库中获取题目
                        var enumList = enumPropertiesResult(questionId);
                        var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>矩阵评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<div class='questions'>";
                        textInputObjHtml += "<form>";
                        textInputObjHtml += requiredInput;
                        textInputObjHtml += "<table><tbody>";
                        textInputObjHtml += "<tr class='row-tit'>";
                        textInputObjHtml += "<td class='bg'></td>";
                        $.each(subQuestion,function (i,item) {
                            textInputObjHtml += "<td>"+item.question_content+"</td>";
                        });
                        textInputObjHtml += "</tr>";
                        $.each(enumList,function (i,item) {
                        	textInputObjHtml += "<tr>";
                        	textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                        	for(var i = 0; i < subQuestion.length;i++){
                        		var inputLabelObj = $('<td><input type="radio" ></td>');
                                var inputObj = $(inputLabelObj.find('input')[0]);
                                inputObj.attr('name',name+i);
                                inputObj.attr('id',subQuestion[i].id + item.id);
                                inputObj.val(subQuestion[i].id + "," + item.id);
                                textInputObjHtml += inputLabelObj[0].outerHTML;
                        	}
                        	textInputObjHtml += "</tr>";
                        });
                        textInputObjHtml += "</tbody></table>";
                        //添加题目的隐藏矿
                        var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                        var inputObjTem = $(inputquestionObj.find('input')[0]);
                        inputObjTem.attr('name','questionId');
                        inputObjTem.attr('id','questionId');
                        inputObjTem.val(questionId);
                        inputObjTem.attr('type','hidden');
                        textInputObjHtml += inputquestionObj[0].outerHTML;
                        textInputObjHtml += "</form>";
                        textInputObjHtml += "</div></div>";
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        //labelObj.append(question+' : ');
                        $("#serveyQuestionDiv").append(textInputObjHtml);
                    case 'SEPERATOR_LINE':
                    	pageNum+=1;
                    	pageSign=1;
                    	resultListLen -= 1;
                    default:
                    	break;
                }
                if(pageSign == 0){
                	count++;
                }
            }
            if(pageNum > 1){
	           	 for(var k = 2; k<=pageNum; k++){
	           		 $("div[name='page_"+k+"']").hide();
	           	 }
            }
            
            if(serveyStatus == "已结束" || serveyStatus == "未开始"){
              	 $("input").prop("disabled","disabled");
              	 $("textarea").prop("readonly","readonly");
              	 $("textarea").addClass('read-only');
              }
            
        	$("#serveyQuestionDiv").append("<div id='documentAttachments'>11</div>");
        	initFile('documentAttachments',$.xljUtils.getUrlParam('serveyId'));
            
            var pageTopOrBottom="<span class='tit-box'>共<span>"+resultListLen+"</span>个问题,当前第 <span class='cur' name='pageCur'>1</span>/<span>"+pageNum+"</span>页</span>";
           	pageTopOrBottom+="<div class='page'>";
           	pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,1)'>首页</a>";
           	pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,4)'>上一页</a>";
           	pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,5)'>下一页</a>";
           	pageTopOrBottom+="<a onclick='getPage("+pageNum+","+pageNum+",1)'>尾页</a>";
           	pageTopOrBottom+="<input type='text' class='form-control pageInput' placeholder='页码' id='pageInput'>";
           	pageTopOrBottom+="<button class='btn-sm' onclick='getPage("+pageNum+",1,2)'>GO</button>";
           	pageTopOrBottom+="</div>";
            $("#pageTop").html(pageTopOrBottom);
            var pageTopOrBottom1="<span class='tit-box'>共<span>"+resultListLen+"</span>个问题,当前第 <span class='cur' name='pageCur'>1</span>/<span>"+pageNum+"</span>页</span>";
            pageTopOrBottom1+="<div class='page'>";
            pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,1)'>首页</a>";
            pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,4)'>上一页</a>";
            pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,5)'>下一页</a>";
            pageTopOrBottom1+="<a onclick='getPage("+pageNum+","+pageNum+")',1>尾页</a>";
            pageTopOrBottom1+="<input type='text' class='form-control pageInput' placeholder='页码' id='pageInput1'>";
            pageTopOrBottom1+="<button class='btn-sm' onclick='getPage("+pageNum+",1,3)'>GO</button>";
            pageTopOrBottom1+="</div>";
            $("#pageBottom").html(pageTopOrBottom1);
        }
        
        //最后一行如果为两列，则再添加两列，补充为一行四列
        /*var lastTrObj = table.find("tr:last");
        var lastTrTds = lastTrObj.find('td');
        var colspanAttr = $(lastTrTds[1]).prop('colspan');
        if(colspanAttr&&colspanAttr!='3'){
            if (lastTrTds.length == 2) {
                var cellTemp1 = $('<td class="form-label"></td>');
                var cellTemp2 = $('<td class=""></td>');
                lastTrObj.append(cellTemp1);
                lastTrObj.append(cellTemp2);
            }
        }*/

        //动态添加时间事件
        $('.form_datetime').datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii:ss',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });

    }




       /**
        * 动态创建表单属性2
        */
       function createForm2(resultList) {
           //获取table对象
           var table = $("#newQuestionTable");
           //var row = table.insertRow();
           var count = 1;
           // debugger;
           if (resultList != null && resultList.length > 0) {
               /*获取该问卷下面问题的基本属性字段，拼接form表单*/
               var resultListLen = resultList.length;
               for (var i = 0; i < resultList.length; i++) {
                   var serveyQuestion = resultList[i];
                   var questionId = serveyQuestion.id;//题目id
                   var question = serveyQuestion.question;//题目内容
                   var questionTip = serveyQuestion.questionTip;//题目提示
                   var questionTypeCode = serveyQuestion.questionTypeCode;//题目类型编码
                   var isRequired = serveyQuestion.questionRequired;
                   var questionScore = serveyQuestion.questionScore;//分数
                   var questionOptions =  serveyQuestion.optionList;//题目选项
                   var subQuestionList = serveyQuestion.subQuestionList;//
                   if(questionScore == null || questionScore == ""){
                       questionScore = 0;
                   }
                   var labelObj;
                   var textInputObj;
                   var pageSign=0;
                   switch (questionTypeCode) {

                       case 'SINGLE_SELECT':
                           var name = 'optionId';
                           var spanisRequired="";
                           var requiredInput="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+",1' name='requiredQuestion' ></label>";
                           }
                           var textInputObjHtml = '';
                           textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>单选题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                           textInputObjHtml += " <div class='questions xuan'>";
                           textInputObjHtml += " <form>";
                           textInputObjHtml += requiredInput;
                           // var enumList =  enumPropertiesResult(questionId);
                           var enumList = questionOptions;
                           $.each(enumList,function (i,item) {
                               if(item.optionType == 1){
                                   var inputLabelObj = $('<p><input type="radio"><span></span><input name="textResponse"style="border-left-width:0px;border-top-width:0px;border-right-width:0px;width:200px"/></p>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name);
                                   inputObj.attr('id',item.id);
                                   inputObj.val(item.id);
                                   querstionOtherIds[item.id]=item.id;
                                   var inputObj1 = $(inputLabelObj.find('span')[0]);
                                   inputObj1.html(item.sequenceNum+".");
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }else{
                                   var inputLabelObj = $('<p><input type="radio"><span></span></p>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   // inputObj.attr('type','hidden');
                                   inputObj.attr('name',name);
                                   inputObj.attr('id',item.id);
                                   inputObj.val(item.id);
                                   var inputObj1 = $(inputLabelObj.find('span')[0]);
                                   inputObj1.html(item.sequenceNum+"."+item.description);
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }
                           });
                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += " </form>";
                           textInputObjHtml += "</div></div>";
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;
                       case 'MULTI_SELECT':
                           var name = 'optionId';
                           var requiredInput="";
                           var spanisRequired="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+",1' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           var textInputObjHtml = '';
                           textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += " <p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>多选题（"+spanisRequired+"单个问题可以选择多项，"+questionScore+"分）</p>";
                           textInputObjHtml += "<div class='questions xuan'>";
                           textInputObjHtml += " <form>";
                           textInputObjHtml += requiredInput;
                           // var enumList = enumPropertiesResult(questionId);
                           var enumList = questionOptions;
                           $.each(enumList,function (i,item) {
                               if(item.optionType == 1){
                                   var inputLabelObj = $('<p><input type="checkBox"><span></span><input name="textResponse" style="border-left-width:0px;border-top-width:0px;border-right-width:0px;width:200px"/></p>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name);
                                   inputObj.attr('id',item.id);
                                   inputObj.val(item.id);
                                   querstionOtherIds[item.id]=item.id;
                                   var inputObj1 = $(inputLabelObj.find('span')[0]);
                                   inputObj1.html(item.sequenceNum+".");
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }else{
                                   var inputLabelObj = $('<p><input type="checkBox" ><span></span></p>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name);
                                   inputObj.attr('id',item.id);
                                   inputObj.val(item.id);
                                   var inputObj1 = $(inputLabelObj.find('span')[0]);
                                   inputObj1.html(item.sequenceNum+"."+item.description);
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }
                           });

                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += " </form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;
                       case 'QA':
                           var name = 'textResponse';
                           var requiredInput="";
                           var spanisRequired="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           var textInputObjHtml = '';
                           textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>问答题（"+spanisRequired+""+questionScore+"分）</p>";
                           textInputObjHtml += "<div class='questions'>";
                           textInputObjHtml += " <form>";
                           textInputObjHtml += requiredInput;

                           var inputLabelObj = $('<span><textarea data-placeholder="请填写答案"></textarea></span>');
                           var inputObj = $(inputLabelObj.find('textarea')[0]);
                           inputObj.attr('name',name);
                           inputObj.attr('id',questionId);

                           //inputLabelObj.append(item.sequenceNum+"."+item.description);
                           textInputObjHtml += inputLabelObj[0].outerHTML;


                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += " </form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           //labelObj.append(question+' : ');
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;
                       case 'GRADE_SUBJECT':
                           var name = 'optionId';
                           var spanisRequired="";
                           var requiredInput="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           var textInputObjHtml = '';
                           textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                           textInputObjHtml += " <div class='questions xuan'>";
                           textInputObjHtml += " <form>";
                           textInputObjHtml += requiredInput;
                           // var enumList = enumPropertiesResult(questionId);

                           var enumList = questionOptions;
                           $.each(enumList,function (i,item) {
                               var inputLabelObj = $('<p><input type="radio" ><span></span></p>');
                               var inputObj = $(inputLabelObj.find('input')[0]);
                               inputObj.attr('name',name);
                               inputObj.attr('id',item.id);
                               inputObj.val(item.id);

                               inputLabelObj.append(item.sequenceNum+"."+item.description);
                               textInputObjHtml += inputLabelObj[0].outerHTML;

                           });

                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += " </form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           //labelObj.append(question+' : ');
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;

                       case 'MATRIX_MULTI_SELECT':
                           //矩阵类型的问题
                           //如果是矩阵多选题，先获取矩阵问题的题目内容
                           // var subQuestion = matrixMultiSelectQuestion(questionId);
                           var  subQuestion = subQuestionList;
                           var name = 'optionId';
                           var spanisRequired="";
                           var requiredInput="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           //如果是矩阵多选题，要从矩阵题库中获取题目
                           // var enumList = enumPropertiesResult(questionId);
                           var enumList = questionOptions;
                           var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>矩阵多选题（"+spanisRequired+"每个问题可以多次选择，"+questionScore+"分）</p>";
                           textInputObjHtml += "<div class='questions'>";
                           textInputObjHtml += "<form>";
                           textInputObjHtml += requiredInput;
                           textInputObjHtml += "<table><tbody>";
                           textInputObjHtml += "<tr class='row-tit'>";
                           textInputObjHtml += "<td class='bg'></td>";
                           $.each(subQuestion,function (i,item) {
                               textInputObjHtml += "<td>"+item.question_content+"</td>";
                           });
                           textInputObjHtml += "</tr>";
                           $.each(enumList,function (i,item) {
                               textInputObjHtml += "<tr>";
                               textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                               for(var i = 0; i < subQuestion.length;i++){
                                   var inputLabelObj = $('<td><input type="checkBox"></td>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name);
                                   inputObj.attr('id',subQuestion[i].id + item.id);
                                   inputObj.val(subQuestion[i].id + "," + item.id);
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }
                               textInputObjHtml += "</tr>";
                           });
                           textInputObjHtml += "</tbody></table>";
                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += "</form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           //labelObj.append(question+' : ');
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;
                       case 'MATRIX_SINGLE_SELECT':
                           //矩阵类型的问题
                           //如果是矩阵多选题，先获取矩阵问题的题目内容
                           // var subQuestion = matrixMultiSelectQuestion(questionId);
                           var  subQuestion = subQuestionList;
                           var name = 'optionId';
                           var spanisRequired="";
                           var requiredInput="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           //如果是矩阵多选题，要从矩阵题库中获取题目
                           // var enumList = enumPropertiesResult(questionId);

                           var enumList = questionOptions;
                           var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>矩阵单选题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                           textInputObjHtml += "<div class='questions'>";
                           textInputObjHtml += "<form>";
                           textInputObjHtml += requiredInput;
                           textInputObjHtml += "<table><tbody>";
                           textInputObjHtml += "<tr class='row-tit'>";
                           textInputObjHtml += "<td class='bg'></td>";
                           $.each(subQuestion,function (i,item) {
                               textInputObjHtml += "<td>"+item.question_content+"</td>";
                           });
                           textInputObjHtml += "</tr>";
                           $.each(enumList,function (i,item) {
                               textInputObjHtml += "<tr>";
                               textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                               for(var i = 0; i < subQuestion.length;i++){
                                   var inputLabelObj = $('<td><input type="radio" ></td>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name+i);
                                   inputObj.attr('id',subQuestion[i].id + item.id);
                                   inputObj.val(subQuestion[i].id + "," + item.id);
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }
                               textInputObjHtml += "</tr>";
                           });
                           textInputObjHtml += "</tbody></table>";
                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += "</form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           //labelObj.append(question+' : ');
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                           break;
                       case 'MATRIX_GRADE_SUBJECT':
                           //矩阵类型的问题
                           //如果是矩阵多选题，先获取矩阵问题的题目内容
                           // var subQuestion = matrixMultiSelectQuestion(questionId);
                           var  subQuestion = subQuestionList;
                           var name = 'optionId';
                           var spanisRequired="";
                           var requiredInput="";
                           if (isRequired == 1){
                               spanisRequired = "*必答题，";
                               requiredInput = "<label class='radio-inline'><input type='hidden' value='"+count+"' name='requiredQuestion' ></label>";
                           }
                           labelObj = $('<label></label>');
                           //如果是矩阵多选题，要从矩阵题库中获取题目
                           // var enumList = enumPropertiesResult(questionId);
                           var enumList = questionOptions;
                           var textInputObjHtml = "<div class='item' name='page_"+pageNum+"'>";
                           textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                           textInputObjHtml += "<p class='des'>矩阵评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                           textInputObjHtml += "<div class='questions'>";
                           textInputObjHtml += "<form>";
                           textInputObjHtml += requiredInput;
                           textInputObjHtml += "<table><tbody>";
                           textInputObjHtml += "<tr class='row-tit'>";
                           textInputObjHtml += "<td class='bg'></td>";
                           $.each(subQuestion,function (i,item) {
                               textInputObjHtml += "<td>"+item.question_content+"</td>";
                           });
                           textInputObjHtml += "</tr>";
                           $.each(enumList,function (i,item) {
                               textInputObjHtml += "<tr>";
                               textInputObjHtml += "<td class='col-bg'>"+item.description+"</td>";
                               for(var i = 0; i < subQuestion.length;i++){
                                   var inputLabelObj = $('<td><input type="radio" ></td>');
                                   var inputObj = $(inputLabelObj.find('input')[0]);
                                   inputObj.attr('name',name+i);
                                   inputObj.attr('id',subQuestion[i].id + item.id);
                                   inputObj.val(subQuestion[i].id + "," + item.id);
                                   textInputObjHtml += inputLabelObj[0].outerHTML;
                               }
                               textInputObjHtml += "</tr>";
                           });
                           textInputObjHtml += "</tbody></table>";
                           //添加题目的隐藏矿
                           var inputquestionObj = $('<label class="radio-inline"><input type="radio" ></label>');
                           var inputObjTem = $(inputquestionObj.find('input')[0]);
                           inputObjTem.attr('name','questionId');
                           inputObjTem.attr('id','questionId');
                           inputObjTem.val(questionId);
                           inputObjTem.attr('type','hidden');
                           textInputObjHtml += inputquestionObj[0].outerHTML;
                           textInputObjHtml += "</form>";
                           textInputObjHtml += "</div></div>";
                           if (isRequired){
                               labelObj.append('<span>*</span>');
                           }
                           //labelObj.append(question+' : ');
                           $("#serveyQuestionDiv").append(textInputObjHtml);
                       case 'SEPERATOR_LINE':
                           pageNum+=1;
                           pageSign=1;
                           resultListLen -= 1;
                       default:
                           break;
                   }
                   if(pageSign == 0){
                       count++;
                   }
               }
               if(pageNum > 1){
                   for(var k = 2; k<=pageNum; k++){
                       $("div[name='page_"+k+"']").hide();
                   }
               }

               if(serveyStatus == "已结束" || serveyStatus == "未开始"){
                   $("input").prop("disabled","disabled");
                   $("textarea").prop("readonly","readonly");
                   $("textarea").addClass('read-only');
               }

               $("#serveyQuestionDiv").append("<div id='documentAttachments'>11</div>");
               initFile('documentAttachments',$.xljUtils.getUrlParam('serveyId'));

               var pageTopOrBottom="<span class='tit-box'>共<span>"+resultListLen+"</span>个问题,当前第 <span class='cur' name='pageCur'>1</span>/<span>"+pageNum+"</span>页</span>";
               pageTopOrBottom+="<div class='page'>";
               pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,1)'>首页</a>";
               pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,4)'>上一页</a>";
               pageTopOrBottom+="<a onclick='getPage("+pageNum+",1,5)'>下一页</a>";
               pageTopOrBottom+="<a onclick='getPage("+pageNum+","+pageNum+",1)'>尾页</a>";
               pageTopOrBottom+="<input type='text' class='form-control pageInput' placeholder='页码' id='pageInput'>";
               pageTopOrBottom+="<button class='btn-sm' onclick='getPage("+pageNum+",1,2)'>GO</button>";
               pageTopOrBottom+="</div>";
               $("#pageTop").html(pageTopOrBottom);
               var pageTopOrBottom1="<span class='tit-box'>共<span>"+resultListLen+"</span>个问题,当前第 <span class='cur' name='pageCur'>1</span>/<span>"+pageNum+"</span>页</span>";
               pageTopOrBottom1+="<div class='page'>";
               pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,1)'>首页</a>";
               pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,4)'>上一页</a>";
               pageTopOrBottom1+="<a onclick='getPage("+pageNum+",1,5)'>下一页</a>";
               pageTopOrBottom1+="<a onclick='getPage("+pageNum+","+pageNum+")',1>尾页</a>";
               pageTopOrBottom1+="<input type='text' class='form-control pageInput' placeholder='页码' id='pageInput1'>";
               pageTopOrBottom1+="<button class='btn-sm' onclick='getPage("+pageNum+",1,3)'>GO</button>";
               pageTopOrBottom1+="</div>";
               $("#pageBottom").html(pageTopOrBottom1);
           }

           //最后一行如果为两列，则再添加两列，补充为一行四列
           /*var lastTrObj = table.find("tr:last");
            var lastTrTds = lastTrObj.find('td');
            var colspanAttr = $(lastTrTds[1]).prop('colspan');
            if(colspanAttr&&colspanAttr!='3'){
            if (lastTrTds.length == 2) {
            var cellTemp1 = $('<td class="form-label"></td>');
            var cellTemp2 = $('<td class=""></td>');
            lastTrObj.append(cellTemp1);
            lastTrObj.append(cellTemp2);
            }
            }*/

           //动态添加时间事件
           $('.form_datetime').datetimepicker({
               language: 'zh-CN',
               format: 'yyyy-mm-dd hh:ii:ss',
               weekStart: 1,
               todayBtn: 1,
               autoclose: 1,
               todayHighlight: 1,
               startView: 2,
               forceParse: 0,
               showMeridian: 1
           });

       }
    /**
     * 清空选择器
     */
    window.clearSelector=function(id,name) {
        $(id).val('');
        $(name).val('');
    }
    /**
     * 初始化表单数据
     */
    function initFormData() {
        var initData = {};
        if(exitServeyResponse=='0'){
        	
        }else {
            $(".loading").show();
            $.ajax({
            	contentType: "application/json",
                type: 'POST',
                url: hostUrl + "oa/servey/serveyResponse/queryListByParameter?time="+Math.random(),
                dataType: "json",
                async:true,
                data: JSON.stringify({serveyId: serveyId}),
                success: function(data) {
					if(data.success){
                        $(".loading").hide();
						if(data.result){
							var serveyResponseList=data.result;
							if(serveyResponseList.length > 0){
								var serveyResponse=serveyResponseList[0];
								$("input[name='id']").val(serveyResponse.id);
								if(serveyResponse.list != null && serveyResponse.list.length > 0){
									initData = serveyResponse.list;
                                    if(!(serveyMultipleSurveys == "1" && serveyStatus == "进行中") || temporaryType == "1" || oper == 'DY'){
                                        if(initData.length > 0){
                                            if(temporaryType != "1"){
                                                $("input").prop("disabled","disabled");
                                                $("textarea").prop("readonly","readonly");
                                                $("textarea").addClass('read-only');
                                                $("#saveBtn").hide();
                                                $("#temporarySaveBtn").hide();
                                            }
                                            for(var item in initData) {
                                                var option = initData[item];
                                                if(option.textResponse != null && option.optionId == null){
                                                    $('#'+option.questionId).text(option.textResponse);
                                                }else if(option.textResponse != null && option.optionId != null){
                                                    $('#'+option.optionId).attr("checked","checked");
                                                    $('#'+option.optionId).next().next().val(option.textResponse);
                                                }else if(option.subQuestionId != null){
                                                    $('#'+option.subQuestionId+option.optionId).attr("checked","checked");
                                                }else{
                                                    var inputObj = $('#serveyQuestionDiv :input[name=optionId][value="'+option.optionId+'"]').prop('checked',true);
                                                }
                                                //var textareaObj = $('#newQuestionTable :textarea[name=textResponse][value="'+option.textResponse+'"]').prop('checked',true);
                                                //                var inputType = $(inputObj[0]).attr('type');
                                                //                if(inputType=='radio'||inputType=='checkbox'){
                                                //                    var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+initData[item]+'"]')[0];
                                                //                    if(inputObj) {
                                                //                        inputObj.checked = true;
                                                //                    }
                                                //                }else{
                                                //                    inputObj.val(initData[item]);
                                                //                }
                                            }
                                        }
                                    }

								}
							}
						}
					}
				}
            });
            
        }


    }

   

    /**
     * 根据题目id获取该题目下面的各个选项，例如选择题
     * @param questionId
     */
    function enumPropertiesResult(questionId) {
        var result = "";
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: hostUrl + 'oa/servey/serveyQuestionOption/queryList',
            dataType: "json",
            data: JSON.stringify({questionId: questionId,'sidx':'sequenceNum'}),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    result = data.result;
                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
        return result;
    }
    
    
    
    
    /**
     * 根据题目id获取该题目下面的各个选项，例如选择题
     * @param questionId
     */
    function matrixMultiSelectQuestion(questionId) {
        var result = "";
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: hostUrl + 'oa/servey/serveySubQuestion/queryList',
            dataType: "json",
            data: JSON.stringify({question_id: questionId,'sidx':'questionCode'}),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    result = data.result;
                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
        return result;
    }
    
    
    /**
     * 根据问卷id，判断该问卷id是否做过调查反馈，，如果做过调查反馈，则需要把调查反馈的答案直接选中
     * @param questionId
     */
    function judgeExitServeyResponseByServeyId(serveyId) {
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: hostUrl + 'oa/servey/serveyResponse/queryList',
            dataType: "json",
            data: JSON.stringify({serveyId: serveyId}),
            success: function (data) {
                console.log(data);
                if(data.success) {
                	var responseDate = data.result;
					if(responseDate.length > 0){
						exitServeyResponse = "1";
					}else{
						exitServeyResponse = "0";
					}
					for(var i = 0; i < responseDate.length;i++){
						var zancunType = responseDate[i].temporaryType;
						if(zancunType == "1"){
							temporaryType="1"
						}
					}
                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }
    
    function closeWin() {
       // var newwin = window.open("","_parent","");
       //  newwin.close();
        window.close();
    }
    

    /**
     * 表单提交: 初始化参数
     */
    function submitForm(saveType) {
    	var url = hostUrl + 'oa/servey/serveyResponse/save';
        var method = 'POST';
        var data=[];
        var questionRequiredData = [];
        $("form").each(function(i,obj){
        	var jsonDataArr = $(obj).serializeArray();
        	if(jsonDataArr.length>0){
        		var isquestionRequired = 0;
        		if(saveType != "temporary"){
        			if(jsonDataArr.length==2){
            			for(var i in jsonDataArr){
            				var name = getName(jsonDataArr[i].name);
            				var value = jsonDataArr[i].value;
            				if(name=="requiredQuestion"){
            					var arr2=value.split(",");
            					questionRequiredData.push(arr2[0]);
            					isquestionRequired=1;
            					break;
            				}
            			}
            		}
        		}
        		if(isquestionRequired == 0){
        			var jsonData = {};
        			var requiredNum = 0;
        			var requiredValue = 0;
        			var optionIdShow = "";
        			var arr1="";
        			for(var i in jsonDataArr){
        				var name = getName(jsonDataArr[i].name);
        				var value = jsonDataArr[i].value;
        				if(name=="requiredQuestion"){
        					requiredNum=1;
        					arr1=value.split(",");
        					requiredValue=arr1[0];
        					continue;
        				}
        				
        				if(name == "optionId"){
        					optionIdShow = value;
        				}
	        			if(saveType != "temporary"){
	        				if(name=="textResponse" && requiredNum==1 && arr1.length==2 && ((optionIdShow == "") || (querstionOtherIds[optionIdShow] && value==""))){
	        					questionRequiredData.push(requiredValue);
	        					break;
	        				}
	        				if(name=="textResponse" && requiredNum==1 && arr1.length == 1 && value==""){
	        					questionRequiredData.push(requiredValue);
	        					break;
	        				}
        				}
	        			if(optionIdShow != null && optionIdShow != "" && optionIdShow != "undefined" && name=="textResponse"){
	        				continue;
	        			}
        				if(!jsonData[name]){
        					if(name.indexOf("optionId") != -1){
        						var arr = value.split(',');
        						if(arr.length>1){
        							jsonData["subQuestionId"] = arr[0];
        							jsonData["optionId"] = arr[1];
        						}else{
        							jsonData[name] = value;
        							if(querstionOtherIds[value]){
        								jsonData["textResponse"] = $(this).find(':input[name="textResponse"]').val();;
        							}
        						}
        					}else{
        						jsonData[name] = value;
        					}
        				}else{
        					var jsonData2 = {};
        					jsonData2.questionId = $(this).find(':input[name="questionId"]').val();
        					jsonData2[name] = value;
        					if(name.indexOf("optionId") != -1){
        						var arr = value.split(',');
        						if(arr.length>1){
        							jsonData2["subQuestionId"] = arr[0];
        							jsonData2["optionId"] = arr[1];
        						}else{
        							jsonData2[name] = value;
        							if(querstionOtherIds[value]){
        								jsonData2["textResponse"] = $(this).find(':input[name="textResponse"]').val();;
        							}

        						}
        					}else{
        						jsonData2[name] = value;
        					}
        					data.push(jsonData2);
        				}
        				
        			}
        			 data.push(jsonData);
        		}
    		}
        });
        
        if(questionRequiredData.length > 0){
        	var questionRequiredDataStr = questionRequiredData.join(",");
        	$.xljUtils.tip("red",questionRequiredDataStr+"这几个是必选题，请答题！");
        	return;
        }
        var ServeyResponseDto={};
        ServeyResponseDto.id=$("#id").val();
        ServeyResponseDto.list=data;
        ServeyResponseDto.serveyId=serveyId;
        ServeyResponseDto.delflag=false;
		// console.log(ServeyResponseDto);
        //ajax方式提交表单，提交时以json格式提交
		
		//如果id有值，则更新 否则保存添加
		if(saveType == 'update') {
			var id=$("#id").val();
			ServeyResponseDto.delflag=false;
			ServeyResponseDto.id=id;
	    	url = hostUrl + "oa/servey/serveyResponse/update/"+id;
	    	 method = 'PUT';
		}else {
			ServeyResponseDto.delflag=false;
			//暂存操作
			if(saveType == 'temporary'){
				ServeyResponseDto.temporaryType = "1";
				url = hostUrl + "oa/servey/serveyResponse/temporary/save";
			}
		}
		
		
        $.ajax({
            url:url,
            data:JSON.stringify(ServeyResponseDto),
            type:method,
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if(successFlag){
                    	if(saveType == 'temporary'){
    						$.xljUtils.tip('green', '数据暂存成功！');
    					}else{
    						$.xljUtils.tip('green', '数据保存成功！');
                            closeWin();
    					}
        				
                    }else{
                        switch (resultData.code) {
                            case "50000":
                                $.xljUtils.tip("red",resultData.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",resultData.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",resultData.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",resultData.msg);
                                break;

                            default:
                                $.xljUtils.tip("blue","网络繁忙，请稍后！");
                                break;
                        }
                    }

                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                $.xljUtils.getError(status);
            }
        });

    }


})(jQuery,window,document);


function chlickRadioS(val){
	var inputVal = $(val).find("input");
	$(val).parent().siblings().find("input").removeAttr("checked");
	inputVal.attr('checked','true');
	$(val).parent().siblings().find("span").removeClass("cur");
    $(val).addClass("cur");
    event.stopPropagation();
}

function chlickCheckS(val){
	 $(val).parent().siblings().find("span").removeClass("cur");
    $(val).addClass("cur");
    event.stopPropagation();
}

function getName(val){
	if(val.indexOf("optionId") != -1){
		val = "optionId";
	}
	return val;
}

function getPage(pageNum,k,type){
	if(type == 2){
		k = $("#pageInput").val();
	}else if(type == 3){
		k = $("#pageInput1").val();
	}else if(type == 4){
		if(pageNumInfo>1){
			pageNumInfo-=1;
		}
		k=pageNumInfo;
	}else if(type == 5){
		if(pageNum>pageNumInfo){
			pageNumInfo+=1;
		}
		k=pageNumInfo;
	}
	pageNumInfo = k;
	if(pageNum >= k && k > 0){
		for(var i = 1; i <= pageNum;i++){
			 $("div[name='page_"+i+"']").hide();
		}
		$("div[name='page_"+k+"']").show();
		$("span[name='pageCur']").html(k);
	}
}

/**
 * 初始化附件
 */
function initFile(id,rowId) {
	
    try{
        $('#'+id).xljAttachment({
            appId: '1',
            businessId: rowId,
            categoryId: '1',
            mode: 'view',
            singleUpload: false,
            isAsyncSubmit: false,
            hideButtonsWithNoFile:true

        });
    }catch (e){

    }
}

function getQuestionById(idVal){
	var result="";
	 $.ajax({
        url:hostUrl+'oa/servey/get/'+idVal+'?time='+Math.random(),
        type:'GET',
        async: false,
        dataType:'JSON',
        success:function (resultData) {
            if(resultData&&resultData.success){
            	result = resultData.result;
            }
        }
    });
	return result;
}


