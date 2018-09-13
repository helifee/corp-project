 var pageNumInfo=1;
;(function ($,window,document,undefined) {

    /**
     * 全局变量
     */
	//问卷id
    var serveyId;
    //问卷名称
    var serveyName;
    var oper;
    var status;
    //判断该问卷下的调查反馈是否存在
    var exitServeyResponse;
    var pageNum=1;
    /**
     * 初始化数据操作
     */
    /**
     */
    $(document).ready(function () {
        try {
            //问卷id
            serveyId = $.xljUtils.getUrlParam('serveyId');
            serveyId = serveyId=='null'?'':serveyId;
            judgeExitServeyResponseByServeyId(serveyId);
            //所属的目录ID
            serveyName = decodeURI(escape($.xljUtils.getUrlParam('serveyName')));
            serveyName = serveyName=='null'?'':serveyName;
            $("#titleBox").html($.xljUtils.htmlEncode(serveyName)+"-结果评估表");
            //操作 新增add 编辑edit
            oper = $.xljUtils.getUrlParam('oper');
            oper = oper=='null'?'':oper;
            
            if(oper == 'DY'){
            	//用户id
                var userId = $.xljUtils.getUrlParam('userId');
            	$.ajax({ //发送更新的ajax请求
                    type: "post",
                    url: serviceUrl+"flow/sysNoticeMsg/deleteOpTypeDataByParamMap?time="+Math.random(),
                    dataType: "json",
                    async: false,
                    data: JSON.stringify({"opType": "DY","businessId": serveyId ,"userId": userId }),
                    contentType: 'application/json;charset=utf-8', //设置请求头信息
                    success: function (data) {
                        console.info("删除待阅成功!");
                    },
                    error: function (data) {
                        if (data.msg) {
                            pop_tip_open('red', data.msg);
                        } else {
                            pop_tip_open('red', "删除待阅失败！");
                        }
                    }
                });
            }
            //问卷状态
            status = $.xljUtils.getUrlParam('status');
            
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
            url: baseUrl+"sys/uuid/generator/getGuuid?time=" + Math.random(),
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
        	replyInfo();
        });
        //预览按钮
        $("#viewBtn").click(function () {
            submitForm('preView');
            //
        });
        //关闭按钮
        $("#closeBtn").click(function () {
             // newwin = window.open("","_parent","");
             // newwin.close();
            window.close();
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
            url: serviceUrl + "oa/servey/serveyQuestion/getCountResponseAnswerByQuestionId?time=" + Math.random(),
            data: JSON.stringify({'serveyId':serveyId,'sidx':'questionNum','type': "PARTY"}),
            dataType: "json",
            success: function (result) {
                //动态创建form表单
                createForm(result.result);
                initFormData();
            }
        });
    }

    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        if (resultList != null && resultList.length > 0) {
        	var count = 1;
            /*获取该问卷下面问题的基本属性字段，拼接form表单*/
        	var resultListLen = resultList.length;
            for (var i = 0; i < resultList.length; i++) {
                var serveyQuestion = resultList[i];
                var question = serveyQuestion.question;//题目内容
                var questionTip = serveyQuestion.questionTip;//题目提示
                var questionTypeCode = serveyQuestion.questionTypeCode;//题目类型编码
                var countPartys = serveyQuestion.countPartys;//问卷参与人数量
                var countReployQuestions = serveyQuestion.countReployQuestions;//问卷中各个题目回复数量
                var optionCountMap = serveyQuestion.optionCountMap;//问卷中各个答案回复数量
                var subQuestionCountMap = serveyQuestion.subQuestionCountMap;
                var isRequired = serveyQuestion.questionRequired;
                var questionScore = serveyQuestion.questionScore;//分数
                if(questionScore == null || questionScore == ""){
                	questionScore = 0;
                }
                var pageSign=0;
                switch (questionTypeCode) {
                    case 'SINGLE_SELECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>单选题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        
                        var xdata=new Array();
                        var ydata=new Array();
                        var j = 0;
                        for(var key in optionCountMap){
                            xdata[j] = getKeyValue(key);
                            ydata[j] = optionCountMap[key];
                            j++;
                        }
                        toBarChart("main_"+count,xdata,ydata);
                        break;
                    case 'MULTI_SELECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>多选题（"+spanisRequired+"单个问题可以选择多项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        
                        var xdata=new Array();
                        var ydata=new Array();
                        var j = 0;
                        for(var key in optionCountMap){
                            xdata[j] = getKeyValue(key);
                            ydata[j] = optionCountMap[key];
                            j++;
                        }
                        toBarChart("main_"+count,xdata,ydata);
                        break;
                    case 'GRADE_SUBJECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        
                        var xdata=new Array();
                        var ydata=new Array();
                        var j = 0;
                        for(var key in optionCountMap){
                            xdata[j] = getKeyValue(key);
                            ydata[j] = optionCountMap[key];
                            j++;
                        }
                        toBarChart("main_"+count,xdata,ydata);
                        break;
                    case 'QA':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>问答题（"+spanisRequired+""+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        break;
                    case 'MATRIX_MULTI_SELECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        var seriesdata = [];
                        var legendData=new Array();
                        var xdata=new Array();
                        var j = 0;
                        for(var key in subQuestionCountMap){
                        	legendData[j]=getKeyValue(key);
                            var serveyQuestion1 = {};
                            serveyQuestion1.name=getKeyValue(key);
                            serveyQuestion1.type='bar';
                            serveyQuestion1.stack='广告';
                            serveyQuestion1.barWidth='30%';
                            var k = 0;
                            var ydata=new Array();
                            for(var key1 in subQuestionCountMap[key]){
                            	xdata[k]=getKeyValue(key1);
                            	ydata[k]=subQuestionCountMap[key][key1];
                            	k++;
                            }
                            serveyQuestion1.data=ydata;
                            seriesdata.push(serveyQuestion1);
                            j++;
                        }
                        toDuiDieBarChart("main_"+count,legendData,xdata,seriesdata);
                        break;
                    case 'MATRIX_SINGLE_SELECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        
                        var seriesdata = [];
                        var legendData=new Array();
                        var xdata=new Array();
                        var j = 0;
                        for(var key in subQuestionCountMap){
                        	legendData[j]=getKeyValue(key);
                            var serveyQuestion1 = {};
                            serveyQuestion1.name=getKeyValue(key);
                            serveyQuestion1.type='bar';
                            serveyQuestion1.stack='广告';
                            serveyQuestion1.barWidth='30%';
                            var k = 0;
                            var ydata=new Array();
                            for(var key1 in subQuestionCountMap[key]){
                            	xdata[k]=getKeyValue(key1);
                            	ydata[k]=subQuestionCountMap[key][key1];
                            	k++;
                            }
                            serveyQuestion1.data=ydata;
                            seriesdata.push(serveyQuestion1);
                            j++;
                        }
                        toDuiDieBarChart("main_"+count,legendData,xdata,seriesdata);
                        break;
                    case 'MATRIX_GRADE_SUBJECT':
                        var textInputObjHtml = '';
                        var spanisRequired="";
                        if (isRequired == 1){
                    		spanisRequired = "*必答题，";
                        }
                        textInputObjHtml += "<div class='item' name='page_"+pageNum+"'>";
                        textInputObjHtml += "<p class='num-box'><span class='num'>"+count+".</span><span>"+question+"</span></p>";
                        textInputObjHtml += "<p class='des'>评分题（"+spanisRequired+"单个问题只能选择一项，"+questionScore+"分）</p>";
                        textInputObjHtml += "<p class='yicanyu'>已参与人数：<span>"+countReployQuestions+"</span>/<span>"+countPartys+"</span><span class='per'>("+(Number(countReployQuestions) / Number(countPartys) * 100.00).toFixed(2)+"%)</span></p>";
                        textInputObjHtml += "<div class='questions chartbox'>";
                        textInputObjHtml += "<div class='my-chart' id='main_"+count+"'>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        textInputObjHtml += "</div>";
                        $("#itemList").append(textInputObjHtml);
                        
                        var seriesdata = [];
                        var legendData=new Array();
                        var xdata=new Array();
                        var j = 0;
                        for(var key in subQuestionCountMap){
                        	legendData[j]=getKeyValue(key);
                            var serveyQuestion1 = {};
                            serveyQuestion1.name=getKeyValue(key);
                            serveyQuestion1.type='bar';
                            serveyQuestion1.stack='广告';
                            serveyQuestion1.barWidth='30%';
                            var k = 0;
                            var ydata=new Array();
                            for(var key1 in subQuestionCountMap[key]){
                            	xdata[k]=getKeyValue(key1);
                            	ydata[k]=subQuestionCountMap[key][key1];
                            	k++;
                            }
                            serveyQuestion1.data=ydata;
                            seriesdata.push(serveyQuestion1);
                            j++;
                        }
                        toDuiDieBarChart("main_"+count,legendData,xdata,seriesdata);
                        break;
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
//            initData.businessObjectCode = businessObjectCode;
//            initData.createPersonName = currentUser?currentUser.realName:'';
//            initData.createPersonId = currentUser?currentUser.id:'';
//            initData.agencyName = currentUser?currentUser.realName:'';
//            initData.agencyId = currentUser?currentUser.id:'';
//            initData.belongCompanyName = currentCompany?currentCompany.name:'';
//            initData.belongCompanyId = currentCompany?currentCompany.id:'';
//            initData.belongDeptName = currentDept?currentDept.name:'';
//            initData.belongDeptId = currentDept?currentDept.id:'';
//            initData.contentTypeName = contentTypeName;
//            initData.contentTypeId = contentTypeId;
//            initData.contentChildName = contentChildName;
//            initData.contentChildId = contentChildId;
//            initData.createDate = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
        }else {
            $.ajax({
            	contentType: "application/json",
                type: 'POST',
                url: serviceUrl + "oa/servey/serveyResponse/queryListByParameter?time="+Math.random(),
                dataType: "json",
                async:false,
                data: JSON.stringify({serveyId: serveyId}),
                success: function(data) {
					if(data.success){
						if(data.result){
							var serveyResponseList=data.result;
							if(serveyResponseList.length > 0){
								var serveyResponse=serveyResponseList[0];
								$("input[name='id']").val(serveyResponse.id);
								if(serveyResponse.list != null && serveyResponse.list.length > 0){
									initData = serveyResponse.list;
								}
							}
						}
					}
				}
            });
        }

        for(var item in initData) {
        	var option = initData[item];
            var inputObj = $('#newQuestionTable :input[name=optionId][value="'+option.optionId+'"]').prop('checked',true);
//            var inputType = $(inputObj[0]).attr('type');
//            if(inputType=='radio'||inputType=='checkbox'){
//                var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+initData[item]+'"]')[0];
//                if(inputObj) {
//                    inputObj.checked = true;
//                }
//            }else{
//                inputObj.val(initData[item]);
//            }
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
            url: serviceUrl + 'oa/servey/serveyQuestionOption/queryList',
            dataType: "json",
            data: JSON.stringify({questionId: questionId}),
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
            url: serviceUrl + 'oa/servey/serveyResponse/queryList',
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
    	window.close();
    }

    /**
     * 表单提交: 初始化参数
     */
    function submitForm(saveType) {
        var url = serviceUrl + 'oa/servey/serveyResponse/save';
        var method = 'POST';
        var data=[];
        $("form").each(function(i,obj){
        	var jsonDataArr = $(obj).serializeArray();
        	if(jsonDataArr.length>0){
    			var jsonData = {};
    			for(var i in jsonDataArr){
    				jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
    			}
    			 data.push(jsonData);
    		}
        });
        var ServeyResponseDto={};
        ServeyResponseDto.id=$("#id").val();
        ServeyResponseDto.list=data;
        ServeyResponseDto.serveyId=serveyId;
        ServeyResponseDto.delflag=false;
		console.log(ServeyResponseDto);
        //ajax方式提交表单，提交时以json格式提交
		
		//如果id有值，则更新 否则保存添加
		if(saveType == 'update') {
			var id=$("#id").val();
			ServeyResponseDto.delflag=false;
			ServeyResponseDto.id=id;
	    	url = serviceUrl + "oa/servey/serveyResponse/update/"+id;
	    	 method = 'PUT';
		}else {
			ServeyResponseDto.delflag=false;
			//暂存操作
			if(saveType == 'temporary'){
				url = serviceUrl + "oa/servey/serveyResponse/temporary/save";
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


function toBarChart(chartid,xdata,ydata){
    var myChart = echarts.init(document.getElementById(chartid));
    var option = {
        color: ['#63B5FF'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : xdata,
                nameGap:15,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:"#d6d6d6",
                        opacity:0.9
                    }

                },
                axisLabel:{
                	interval:0,//横轴信息全部显示
                    textStyle:{
                        color:"#666",
                        fontSize:14,
                        fontFamily:"微软雅黑"
                    },
                formatter:function(val){
                     return getParams(val);
                }

                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {lineStyle:{type:'dashed'}},
                axisLine:{
                    lineStyle:{
                        color:"#d6d6d6",
                        opacity:0.9
                    }

                },
                axisLabel:{
                    textStyle:{
                        color:"#666",
                        fontSize:14,
                        fontFamily:"微软雅黑"
                    }

                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '30%',
                data:ydata
            }
        ]
    };
    myChart.setOption(option);
}
function  toDuiDieBarChart(chartid,legendData,xdata,seriesdata){

    var myChart1= echarts.init(document.getElementById(chartid));
    var option1 = {
        color: ['#F9B950','#EC736A','#63B5FF'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:legendData,
            formatter: function (name) {
                return echarts.format.truncateText(name, 300, '14px Microsoft Yahei', '…');
            },
            tooltip: {
                show: true
            },
            align:"right",
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                splitLine: {lineStyle:{type:'dashed'}},
                axisLine:{
                    lineStyle:{
                        color:"#d6d6d6",
                        opacity:0.9
                    }

                },
                axisLabel:{
                	interval:0,//横轴信息全部显示
                    textStyle:{
                        color:"#666",
                        fontSize:14,
                        fontFamily:"微软雅黑"
                    },
                    formatter:function(val){
                        return getParams(val);
                    }
                },
                data : xdata
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {lineStyle:{type:'dashed'}},
                axisLine:{
                    lineStyle:{
                        color:"#d6d6d6",
                        opacity:0.9
                    }

                },
                axisLabel:{
                    textStyle:{
                        color:"#666",
                        fontSize:14,
                        fontFamily:"微软雅黑"
                    }

                }
            }
        ],
        series : seriesdata
    };
    myChart1.setOption(option1);
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
 * 数据（aa_123）根据_获取aa
 * @returns
 */
function getKeyValue(val){
	if(val != null){
		val=val.split("_")
		if(val.length > 0){
			val = $.xljUtils.htmlDecode(val[0]);
		}
	}
	return val;
}

/**
xAxis.axisLabel.formatter 回调函数 实现标签过长的换行处理
通过设置provideNumber，控制每行显示的字数
使用方式一（静态）：
直接将代码段写在定义里
    xAxis: {
        //其余省略
        axisLabel:{
            interval: 0,//标签设置为全部显示
            formatter:function(params){
            //粘贴以下function内未注释的代码
            }
        }
    }
使用方式一（动态）：
代码段在var option={};之后，在myChart.setOption(option);之前
    option.xAxis.axisLabel={
        interval: 0,//标签设置为全部显示
        formatter:function(params){
        //粘贴以下function内未注释的代码
        }
    }
 */
function getParams(params){
    var newParamsName = "";// 最终拼接成的字符串
    var paramsNameNumber = params.length;// 实际标签的个数
    var provideNumber = 10;// 每行能显示的字的个数
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
    /**
     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
     */
    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
        /** 循环每一行,p表示行 */
        for (var p = 0; p < rowNumber; p++) {
            var tempStr = "";// 表示每一次截取的字符串
            var start = p * provideNumber;// 开始截取的位置
            var end = start + provideNumber;// 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
            } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
            }
            newParamsName += tempStr;// 最终拼成的字符串
        }

    } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
    }
    //将最终的字符串返回
    return newParamsName
}