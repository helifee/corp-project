/**
 * Create by ztf on 2017/6/20
 */
var urlParamJson = $.xljUtils.getUrlParams();
var choseQuestion=0;
var querstionIds = {};
$(window).resize(function(){
	resizeTbody();
});
function resizeTbody(){
	$(".tbody-box").height($(window).height()-350+"px");
}
$(function () {
	$("#subjectInfo").hide();
	resizeTbody();
	$(".tit-btns button").on("click",function(e){
		$(this).addClass("active");
		e.stopPropagation();
	});
	$(".modal-title .yulan").mouseenter(function(){
		$(this).next().show();
	}).mouseleave(function(){
		$(this).next().hide();
	});

    /**
     * 初始化表单数据
     */
    function initFormData() {
        if(urlParamJson.act=='create'){
            $('#editTitle').text('问卷创建-新增');
            initUUID();
            initCategoryTree();
        }else if(urlParamJson.act=='update'){
            $('#editTitle').text('问卷创建-修改');
            var idVal = urlParamJson.id;
            initserveyCreate(idVal,1);
            initFile(idVal,"update");
        }
    }
    initFormData();
    initserveyQuestionType();
    //保存按钮点击事件
    $('#saveBtn').on('click',function () {
        $("#serveyCreateForm").attr("data-validate-success","serverCreateEdit('over')");
		$("#serveyCreateForm").submit();
    });
    
    //保存按钮点击事件
    $('#saveAndCreateBtn').on('click',function () {
    	$("#serveyCreateForm").attr("data-validate-success","serverCreateEdit('continue')");
  		$("#serveyCreateForm").submit();
    });
    
    //暂存按钮点击事件
    $('#zancun').on('click',function () {
        serverCreateEdit('zancun');
    });
    
    
    //直接审
    $('#directConclusion').on('click',function () {
        $("#serveyCreateForm").attr("data-validate-success","serverCreateEdit('directConclusion')");
  		$("#serveyCreateForm").submit();
    });
    
    $("#checkAll").click(function(){   
        if(this.checked){   
            $("input[name='serveyCreateBox']").prop("checked", true);  
        }else{   
    	$("input[name='serveyCreateBox']").prop("checked", false);
        }   
    });
    
    //保存按钮点击事件
    $('#saveAttrsBtn').on('click',function () {
    	if(choseQuestion == 0){
    		saveAttrsBtn();
    	}else if(choseQuestion == 1){
    		//判断是否选择多行
            var idsVal = $('#serveyCreateShowTable').jqGrid('getGridParam', 'selarrrow');
            if (idsVal.length > 1) {
                $.xljUtils.tip('blue', "只能选择一行问卷信息！");
                return;
            }

            //判断是否选择数据
            var idVal = $('#serveyCreateShowTable').jqGrid('getGridParam', 'selrow');
            if (!idVal) {
                $.xljUtils.tip('blue', "请选择一条需要导入的问卷！");
                return;
            }
            $('#serveyCreateDiv').hide();
            $('#serveyCreateShowDiv').hide();
            $('#serveyCreatePageDiv').show();
            $('#danduo').hide();
            $('#wenda').hide();
            $('#titleInfo').html("问题列表");
            questionList(idVal);
    	}else if(choseQuestion == 2){
    		 //判断是否选择数据
            var idVals = $('#serveyCreatePageTable').jqGrid('getGridParam', 'selarrrow');
            for(var i = 0; i < idVals.length;i++){
            	if(idIsHava(idVals[i])=="true"){
            		getQuestionById(idVals[i]);
            	}
            }
			addTbodyBoxScroll();
			resizeTbodyBox();
            $("#myModal").modal("hide");
            $('#yulanPage').show();
    	}else if(choseQuestion == 3){
    		updateAttrsBtn();
    	}
    });
    
    
    function idIsHava(idval){
    	var flag = "false";
    	if(!querstionIds[idval]){
    		flag = "true";
    	}
    	return flag;
    }
    
    
    /**
     * 多页签切换
     */
    $(".con-tit button").on("click",function(e){
    	var index = $(this).index();
    	var name = $(this).attr("name");
    	$(this).siblings().removeClass("active");
    	$(this).addClass("active");
        e.stopPropagation();
        selectType = name;
        console.info("多页签切换  >>selectType="+selectType);
    	if(name == "questionnaire"){
    		$("#serveyInfo").show();
    		$("#subjectInfo").hide();
    	}else if(name == "topic"){
    		$("#subjectInfo").show();
    		$("#serveyInfo").hide();
    	}
		resizeTbodyBox();
    	$.xljUtils.resizeNestedGrid();
    	$('.ui-jqgrid').removeAttr('style');
    });
    
    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
        // newwin = window.open("","_parent","");
        // newwin.close();
		window.close();
    });
	initDatetimepicker();
});

//初始化日期控件
function initDatetimepicker(){
	$('#fromDate').off('click').on('click',function () {
		var maxDate = $('#thruDate').val();
		WdatePicker({
			el: this,
			dateFmt: "yyyy-MM-dd",
			errDealMode:-1,
			maxDate:maxDate
		});

	});
	$('#fromDate').siblings('span.input-group-addon').off('click').on('click',function () {
		var maxDate = $('#thruDate').val();
		WdatePicker({
			el: 'fromDate',
			dateFmt: "yyyy-MM-dd",
			errDealMode:-1,
			maxDate:maxDate
		});

	});

	$('#thruDate').off('click').on('click',function () {
		var minDate=$("#fromDate").val();
		WdatePicker({
			el: this,
			dateFmt: "yyyy-MM-dd",
			errDealMode:-1,
			minDate:minDate
		});

	});
	$('#thruDate').siblings('span.input-group-addon').off('click').on('click',function () {
		var minDate=$("#fromDate").val();
		WdatePicker({
			el: 'thruDate',
			dateFmt: "yyyy-MM-dd",
			errDealMode:-1,
			minDate:minDate
		});

	});
}
function serverCreateEdit(serveyCreateFormType){


	var serverCreateArr = $("#serveyCreateForm").serializeArray();
	var serverCategoryDto = {};
	for (var serverCreate in serverCreateArr) {
		if(serverCreateArr[serverCreate].name == "fromDate"){
			if(serverCreateArr[serverCreate].value != null && serverCreateArr[serverCreate].value != ""){
				serverCategoryDto[serverCreateArr[serverCreate].name] = serverCreateArr[serverCreate].value+" 00:00:00";
			}else{
				serverCategoryDto[serverCreateArr[serverCreate].name] = null;
			}
		}else if(serverCreateArr[serverCreate].name == "thruDate"){
			if(serverCreateArr[serverCreate].value != null && serverCreateArr[serverCreate].value != ""){
				serverCategoryDto[serverCreateArr[serverCreate].name] = serverCreateArr[serverCreate].value+" 23:59:59";
			}else{
				serverCategoryDto[serverCreateArr[serverCreate].name] = null;
			}
		}else{
			serverCategoryDto[serverCreateArr[serverCreate].name] = serverCreateArr[serverCreate].value;
		}
	}
	
	if(serveyCreateFormType == "directConclusion"){
		serverCategoryDto["directConclusion"] = 1;
	}else{
		serverCategoryDto["directConclusion"] = 0;
	}
	
	$('input[name="multipleSurveys"]:checked').each(function(){    
		serverCategoryDto["serveyMultipleSurveys"] = $(this).val();
	});
	
	$('input[name="notice"]:checked').each(function(){    
		serverCategoryDto["serveyNoticeType"] = $(this).val();    
	});

	var fromDate = serverCategoryDto.fromDate;
	var thruDate = serverCategoryDto.thruDate;
	if(fromDate&&thruDate&&fromDate!=''&&thruDate!=''){
		var begin = new Date(fromDate.replace(/-/g,'/'));
		var end = new Date(thruDate.replace(/-/g,'/'));
		if(begin>end){
			$.xljUtils.tip('blue','调查结束时间不能小于调查开始时间！');
			return;
		}
	}

	var i = 0;
	var data = [];
	$("td[name='serveyQuestionInfo']").each(
            function()
            {
            	var $jqObj = $($("td[name='serveyQuestionInfo']")[i]).parent();
            	var serveyQuestion = {};
            	var serveyQuestionId = $jqObj.find($("input[name='serveyQuestionId']"))[0];
            	if(serveyQuestionId != null){
            		serveyQuestion.serveyQuestionId = serveyQuestionId.value;
            	}
            	var serveyCreateType = $jqObj.find($("input[name='serveyCreateType']"))[0];
            	if(serveyCreateType != null){
            		serveyQuestion.serveyCreateType = serveyCreateType.value;
            	}
            	var questionRequired = $jqObj.find($("input[name='questionRequired']"))[0];
            	if(questionRequired != null && questionRequired.value != "undefined" && questionRequired.value != ""){
            		serveyQuestion.questionRequired = questionRequired.value;
            	}else{
            		serveyQuestion.questionRequired = 0;
            	}
            	var questionOther = $jqObj.find($("input[name='questionOther']"))[0];
            	if(questionOther != null && questionOther.value != 'undefined' && questionOther.value != ''){
            		serveyQuestion.questionOther = questionOther.value;
            	}else{
            		serveyQuestion.questionOther = 0;
            	}
            	var questionScore = $jqObj.find($("input[name='score']"))[0];
            	if(questionScore != null && questionScore.value != "" && questionScore.value != "undefined"){
            		serveyQuestion.questionScore = questionScore.value;
            	}else{
            		serveyQuestion.questionScore = 0;
            	}
            	var serialNumber = $jqObj.find($("input[name='serialNumber']"))[0];
            	if(serialNumber != null){
            		serveyQuestion.serialNumber = serialNumber.value;
            	}
            	var question = $jqObj.find($("input[name='question']"))[0];
            	if(question != null){
            		serveyQuestion.question = $.xljUtils.escapeHtml(question.value);
            	}
            	var questionTypeCode = $jqObj.find($("input[name='questionTypeCode']"))[0];
            	if(questionTypeCode != null){
            		serveyQuestion.questionTypeCode = questionTypeCode.value;
            	}
            	var questionTip = $jqObj.find($("input[name='questionTip']"))[0];
            	if(questionTip != null){
            		serveyQuestion.questionTip = $.xljUtils.escapeHtml(questionTip.value);
            	}
            	var problemIdNums = $jqObj.find($("input[name='problemIdNums']"))[0];
            	if(problemIdNums != null){
            		serveyQuestion.problemIdNums = problemIdNums.value;
            	}
            	var problemIdTexts = $jqObj.find($("input[name='problemIdTexts']"))[0];
            	if(problemIdTexts != null){
            		serveyQuestion.problemIdTexts = $.xljUtils.escapeHtml(problemIdTexts.value);
            	}
            	var optionIdNums = $jqObj.find($("input[name='optionIdNums']"))[0];
            	if(optionIdNums != null){
            		serveyQuestion.optionIdNums = optionIdNums.value;
            	}
            	var optionIdTexts = $jqObj.find($("input[name='optionIdTexts']"))[0];
            	if(optionIdTexts != null){
            		serveyQuestion.optionIdTexts = $.xljUtils.escapeHtml(optionIdTexts.value);
            	}
            	var weightFactorInfos = $jqObj.find($("input[name='weightFactorInfos']"))[0];
            	if(weightFactorInfos != null){
            		serveyQuestion.weightFactorInfos = weightFactorInfos.value;
            	}
            	data.push(serveyQuestion);
                i++;
            }
	);
	if(serveyCreateFormType=='directConclusion'&&data.length==0){
		$.xljUtils.tip("blue","问卷题目不能为空！");
		return;
	}
	serverCategoryDto["data"] = data;
	var url = '';
	var type = '';
	if(urlParamJson.act=='create'){
		url = serviceUrl+'oa/servey/serveyCreate/createServey';
		type = 'POST';
	}else if(urlParamJson.act=='update'){
		var idVal = $("#id").val();
		url = serviceUrl+'oa/servey/serveyCreate/update/'+idVal;
		type = 'put';
	}
	$('#documentAttachments').xljAttachmentSubmit(function(isSuccess, obj){
		if (isSuccess) {
			if (obj.success === true) {}
		} else {
			$.xljUtils.getError(obj);
		}
	});
	$.ajax({
		url : url,
		data : JSON.stringify(serverCategoryDto),
		type : type,
		contentType : 'application/json',
		dataType : 'JSON',
		success : function(resultData) {
			if (resultData) {
				var successFlag = resultData.success;
				if (successFlag) {
					   if(serveyCreateFormType=="over"){
					   	if(window.opener&&$.isFunction(window.opener.reloadGrid)){
							window.opener.reloadGrid(serverCategoryDto.id);
						}
	                	   startFlow();
	                   }else if(serveyCreateFormType=="continue"){
	                	   $('#serveyCreateList').jqGrid().trigger("reloadGrid");
	                	   $("#serveyCreateForm")[0].reset();
	                	   $("#serveyCreateAdd").html("");
	                	   $("#delete_tr_id").html("");
	                	   initUUID();
	                	   urlParamJson.act='create';
	                   }else if(serveyCreateFormType=="zancun"){
	                	   var idVal1 = $("#id").val();
	                	   $('#serveyCreateList').jqGrid().trigger("reloadGrid");
	                	   $("#serveyCreateForm")[0].reset();
	                	   $("#serveyCreateAdd").html("");
	                	   $("#delete_tr_id").html("");
	                	   urlParamJson.act='update';
	                	   initserveyCreate(idVal1);
	                   }else if(serveyCreateFormType=="directConclusion"){
	                   	if(window.opener&&$.isFunction(window.opener.reloadGrid)){
							window.opener.reloadGrid(serverCategoryDto.id);
						}

	                	   window.close();
	                   }
				} else {
					$.xljUtils.tip("red", resultData.msg);
				}
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
		}
	});
}

function initserveyCreate(idVal,type){
	$.ajax({
        url:serviceUrl+'oa/servey/serveyCreate/get/'+idVal+'?time='+Math.random(),
        type:'GET',
        dataType:'JSON',
        success:function (resultData) {
            if(resultData&&resultData.success){
                var result = resultData.result;
                for(var item in result) {
                    $('#serveyCreateForm :input[name="'+item+'"]').val(result[item]);
                }
                var multipleSurveys = result["serveyMultipleSurveys"];
                $('input[name=multipleSurveys][value="'+multipleSurveys+'"]').prop('checked',true);
                var serveyCategory = result["serveyCategory"];
                if(serveyCategory != null){
                	 $("#parentName").val($.xljUtils.htmlDecode(serveyCategory.name));
                	 $("#parentId").val(serveyCategory.id);
                }
                
                var serveyPartyList = result["serveyPartyList"];
                var serveyQuestionList = result["serveyQuestionList"];
                var readers = new Array();
                var readersId = new Array();
                var participants = new Array();
                var participantsId = new Array();
                var closingNotices = new Array();
                var closingNoticeId = new Array();
                if(serveyPartyList != null){
                    for(var i =0;i<serveyPartyList.length;i++){
                    	if(serveyPartyList[i].type == "PARTY"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			participantsId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			participants.push(serveyPartyList[i].partyName);
                    		}
                    	}else if(serveyPartyList[i].type == "READER"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			readersId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			readers.push(serveyPartyList[i].partyName);
                    		}
                    	}else if(serveyPartyList[i].type == "NOTICE"){
                    		if(serveyPartyList[i].partyId != null && serveyPartyList[i].partyId !=""){
                    			closingNoticeId.push(serveyPartyList[i].partyId);
                    		}
                    		if(serveyPartyList[i].partyName != null && serveyPartyList[i].partyName !=""){
                    			closingNotices.push(serveyPartyList[i].partyName);
                    		}
                    	}
                    	
                    }
                    $("#participant").val(participants.join(","));
                    $("#reader").val(readers.join(","));
                    $("#participantId").val(participantsId.join(","));
                    $("#readerId").val(readersId.join(","));
                    $("#closingNoticeId").val(closingNoticeId.join(","));
                    $("#closingNotice").val(closingNotices.join(","));
                }
                var tableClumns = "";
                if(serveyQuestionList!= null){
                	for(var i =0;i<serveyQuestionList.length;i++){
                		var questionInfoSub="";
                		if(serveyQuestionList[i].question.length>50){
                			questionInfoSub = serveyQuestionList[i].question.substring(0,50)+"...";
                		}else{
                			questionInfoSub = serveyQuestionList[i].question;
                		}
                		tableClumns = tableClumns + "<tr >";
                		tableClumns = tableClumns + "<td class='w20'><input name='serveyCreateBox' type='checkbox' />";
                		tableClumns = tableClumns + "<input name='serveyCreateType' type='hidden' value='normal' />";
                		tableClumns = tableClumns + "<input type='hidden' id='serveyQuestionId' name='serveyQuestionId' value='"+serveyQuestionList[i].id+"'/></td>";
                		tableClumns = tableClumns + "<input name='serialNumber' type='hidden' value='"+serveyQuestionList[i].questionNum+"' />";
                		tableClumns = tableClumns + "<input name='question' type='hidden' value='"+serveyQuestionList[i].question+"' />";
                		tableClumns = tableClumns + "<input name='questionTypeCode' type='hidden' value='"+serveyQuestionList[i].questionTypeCode+"' />";
                		tableClumns = tableClumns + "<td class='w20' name='questionNum'>"+serveyQuestionList[i].questionNum+"</td>";
                    	tableClumns = tableClumns + "<td class='w60' name='question' title='"+serveyQuestionList[i].question+"'>"+questionInfoSub+"</td>";
                    	tableClumns = tableClumns + "<td class='w20' name='serveyQuestionInfo'>"+getQuestionNameByCode(serveyQuestionList[i].questionTypeCode)+"</td>";
                    	tableClumns = tableClumns + "</tr>";
                    }
                }
                $("#serveyCreateAdd").append(tableClumns);
                addTbodyBoxScroll();
            	resizeTbodyBox();
                if(type==1){
                	initCategoryTree(result["serveyCategoryId"]);
                }
            }
        }
    });
}


function initCategoryTree(delId) {
	$('#parentSpan').xljSingleSelector({
        title:'调查分类',
        selectorType:'serveyCategory',
        targetId:'parentId',
        targetName:'parentName',
        treeUrl:serviceUrl+'oa/servey/serveyCategory/queryList?time='+Math.random(),
        treeSettings:{
            "data":{
                "simpleData":{
                    "enable":true,
                    "idKey":"id",
                    "pIdKey":"parentId",
                    "rootPId":null
                }
            },
            callback:{
                onNodeCreated:function (event,treeId,treeNode) {
                    if(delId==treeNode.id){
                        $.fn.zTree.getZTreeObj(treeId).removeNode(treeNode,false);
                    }

                }
            }

        }
    });
}

/**
 * describe: 发起审批
 * param: 
 */
function startFlow(){
	 var businessId=$("#id").val();
	// window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode=wjgl&businessId="+businessId+"&time="+Math.random());
	 window.location.href = "/platform-app/flow/runtime/approve/start.html?businessObjectCode=wjgl&businessId="+businessId+"&time="+Math.random();
//	 window.close();
}

function closeWin(aa,resultData) {
    if(resultData.success) {
        window.close();
    }
}

function initserveyQuestionType(){
	$.ajax({
		url : serviceUrl+'oa/servey/serveyQuestionType/queryList',
		data : "{}",
		type : "POST",
		contentType : 'application/json',
		dataType : 'JSON',
		success : function(resultData) {
			if (resultData) {
				var successFlag = resultData.success;
				if (successFlag) {
					var result = resultData.result;
					var buttons = "<span>添加题目</span>";
					for(var i=0;i<result.length;i++){
						if(result[i].code == "SEPERATOR_LINE"){
							continue;
						}
						buttons = buttons + "<button type='button' onclick='serveyCreateArreModal(\""+result[i].code+"\",\""+result[i].name+"\",this)'>"+result[i].name+"</button>";
					}
					$("#buttonAdd").html(buttons);
				} else {
					$.xljUtils.getError(resultData.msg);
				}
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
		}
	});
}

/**
 * 初始化UUID
 */
function initUUID() {
	$.ajax({
        type:"GET",
        url:serviceUrl+"oa/content/contentChild/getGuuid?time="+Math.random(),
        dataType:"json",
        success: function(resultValue, textStatus) {
            var uuid = resultValue.result;
            $('#id').val(uuid);
            if(urlParamJson.act=='create'){
            	initFile(uuid,"create");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $.xljUtils.tip("red","服务异常,请联系管理员！");
        }
    });
}

function testCallback(data) {
    console.info(data);
}

function initServeyTableData(idVal){
	var initServeyGrid = jQuery("#serveyCreateAdd").jqGrid({
        url: serviceUrl + 'oa/servey/serveyCreate/queryServeyQuestionList',
        ajaxGridOptions: {contentType: 'application/json'},
        mtype: "POST",
        contentType: "application/json",
        datatype: "json",
        postData: {delflag: false,"serveyId": idVal},
        multiboxonly: true,
        multiselect: true,
        autowidth: true,
        rownumbers: true,
        jsonReader: {
            repeatitems: false
        },
        colNames: ['ID', '序号', '题目', '题型'],
        colModel: [
            {name: 'id', index: 'id', width: 55, hidden: true},
            {name: 'name', index: 'name'},
            {name: 'question', index: 'question'},
            {name: 'questionTypeCode', index: 'questionTypeCode'},
        ],
        viewrecords: true,
        loadError: function (xhr, status, error) {
            $.xljUtils.getError(xhr.status);
        },
        gridComplete: function () {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
        },
        loadComplete: function (xhr) {

        }
    });
}

function serveyCreateArreModal(code,type,that){
	$('#serveyCreateDiv').hide();
	$('#serveyCreateShowDiv').hide();
    $('#serveyCreatePageDiv').hide();
	$('#yulanPage').show();
	$("#buttonAdd button").removeClass("active");
	$(that).addClass("active");//加样式
	//悬浮框图片
	if(code == "SINGLE_SELECT"){
		$(".tip").find("img").attr("src","image/yl_danxuan.png");
	}else if(code == "MULTI_SELECT"){
		$(".tip").find("img").attr("src","image/yl_duoxuan.png");
	}else if(code == "QA"){
		$(".tip").find("img").attr("src","image/yl_wenda.png");
	}else if(code == "MATRIX_MULTI_SELECT"){
		$(".tip").find("img").attr("src","image/yl_jzduoxuan.png");
	}else if(code == "MATRIX_SINGLE_SELECT"){
		$(".tip").find("img").attr("src","image/yl_jzdanxuan.png");
	}

	if(code == "SEPERATOR_LINE"){
		var serveyTypeName = type;
		$(this).addClass("active");		var required = "0";
		var other = "0";
		var serveyType = code;
		var questionInfo = "分页符";
		var questionTipInfo = "分页符";
		var problemIdNum = "";
		var problemIdText = "";
		var optionIdNum = "";
		var optionIdText = "";
		var num = $("#serveyCreateAdd tr").length+1;
		var addTr = "<tr>";
			addTr = addTr + "<td class='w20'><input name='serveyCreateBox' type='checkbox' /><input name='serveyCreateType' type='hidden' value='insert' /></td>";
			addTr = addTr + "<td class='w20' name='questionNum'>"+num+"</td>";
			addTr = addTr + "<td class='w60' name='question' title='"+questionInfo+"'>"+questionInfo+"</td>";
			addTr = addTr + "<td class='w20' name='serveyQuestionInfo'>"+serveyTypeName;
			addTr = addTr + "<input id='serialNumber' name='serialNumber' type='hidden' value='"+num+"'/>";
			addTr = addTr + "<input name='question' type='hidden' value='"+questionInfo+"'/>";
			addTr = addTr + "<input name='questionTypeCode' type='hidden' value='"+serveyType+"'/>";
			addTr = addTr + "<input name='questionTip' type='hidden' value='"+questionTipInfo+"'/>";
			addTr = addTr + "<input name='problemIdNums' type='hidden' value='"+problemIdNum+"'/>";
			addTr = addTr + "<input name='problemIdTexts' type='hidden' value='"+problemIdText+"'/>";
			addTr = addTr + "<input name='optionIdNums' type='hidden' value='"+optionIdNum+"'/>";
			addTr = addTr + "<input name='optionIdTexts' type='hidden' value='"+optionIdText+"'/>";
			addTr = addTr + "<input name='questionRequired' type='hidden' value='"+required+"'/>";
			addTr = addTr + "<input name='questionOther' type='hidden' value='"+other+"'/>";
			addTr = addTr + "<input name='weightFactorInfos' type='hidden' value='0'/>";
			addTr = addTr + "<input name='score' type='hidden' value='0'/>";
			addTr = addTr + "</td></tr>";
		$("#serveyCreateAdd").append(addTr);
	}else{
		choseQuestion=0;
		$("#xuanDiv").html("");
		$("#problemTable").html("");
		$("#optionTable").html("");
		$("#wenda").html("");
		$("#subQuestionInfoDiv").hide();
		if(code != "QA"){
			$("#danduo").show();
			$("#wenda").hide();
			$('#serveyCreateDiv').show();
			$('#serveyCreateShowDiv').hide();
		    $('#serveyCreatePageDiv').hide();
			var divTemplate = "";
			divTemplate += "<div class='input-box'><label>题目</label><input type='text'  id='questionInfo'></div>";
			divTemplate += "<div class='input-box'><label>提示</label><input type='text'  id='questionTipInfo'>";
			divTemplate += "<input type='hidden' id='serveyType1' /><input type='hidden' id='serveyTypeName'/>";
			divTemplate += "</div>";
			divTemplate += "<div class='other-option'>";
			divTemplate += "<label>本题总分</label>";
			divTemplate += "<input class='short' id='scoreInfo' onkeyup='onKeyDownOrOnafterpaste(this)' onafterpaste='onKeyDownOrOnafterpaste(this)' type='text'>";
			divTemplate += "<input class='check-c' value='1' name='required' type='checkbox'>";
			divTemplate += "<label>必答题</label>";
			if(code != "SINGLE_SELECT" &&  code != "MULTI_SELECT" &&  code != "QA" &&  code != "GRADE_SUBJECT"){
				$("#subQuestionInfoDiv").show();
				getProblem();
			}
			if(code == "SINGLE_SELECT" ||  code == "MULTI_SELECT"){
				divTemplate += "<input class='check-c' value='1' name='other' type='checkbox'>";
				divTemplate += "<label>允许填写“其他”答案</label>";
			}
			divTemplate += "</div>";
			$("#xuanDiv").html(divTemplate);
			getOption();
		}else{
			$("#wenda").show();
			$("#danduo").hide();
			var divTemplate = "";
			divTemplate += "<div class='input-box clearfix'>";
			divTemplate += "<label>问答题目</label>";
			divTemplate += "<textarea id='questionInfo'  class='form-control mytext'></textarea>";
			divTemplate += "</div>";
			divTemplate += "<div class='input-box clearfix'>";
			divTemplate += "<label>提示信息</label>";
			divTemplate += "<textarea id='questionTipInfo'  class='form-control mytext'></textarea>";
			divTemplate += "<input type='hidden' id='serveyType1' /><input type='hidden' id='serveyTypeName'/>";
			divTemplate += " </div>";
			divTemplate += "<div class='other-option'>";
			divTemplate += "<label>本题总分</label>";
			divTemplate += "<input type='text' id='scoreInfo' onkeyup='onKeyDownOrOnafterpaste(this)' onafterpaste='onKeyDownOrOnafterpaste(this)'  class='short'>";
			divTemplate += "<input type='checkbox' value='1' name='required' class='check-c'>";
			divTemplate += "<label>必答题</label>";
			divTemplate += "</div>";
			$("#wenda").html(divTemplate);
		}
		$("#serveyType1").val(code);
		$("#serveyTypeName").val(type);
		$("#titleInfo").html(type);
		$("#serveyCreateTable").html("");
		$("#myModal").modal('show');
	}
}

function getProblem(){
	var problem = "";
	var xuhao=['A','B','C','D'];
	for(var i = 1; i <= 4;i++){
		problem = problem + "<tr>";
		problem = problem + "<td><input name='problemIdNum' type='text'  value='"+xuhao[i-1]+"' class='option-input'></td>";
		problem = problem + "<td><input type='text' name='problemIdText'  class='con-input1'></td>";
		problem = problem + "<td class='deltd'><a onclick='delTr(this,\"problemId\");' class='del'></a></td>";
		problem = problem + "</tr>";
	}
	$("#problemTable").html(problem);
	return problem;
}

function getOption(){
	var option = "";
	var xuhao=['A','B','C','D'];
	for(var i = 1; i <= 4;i++){
		option = option + "<tr>";
		option = option + "<td><input name='optionIdNum' type='text'  value='"+xuhao[i-1]+"' class='option-input'></td>";
		option = option + "<td><input type='text' name='optionIdText'  class='con-input'></td>";
		option = option + "<td><input name='weightFactorInfo' class='value-input' onkeyup=\"onKeyDownOrOnafterpaste(this)\" onafterpaste=\"onKeyDownOrOnafterpaste(this)\"/></td>";
		option = option + "<td class='deltd'><a onclick='delTr(this,\"optionId\");' class='del'></a></td>";
		option = option + "</tr>";
	}
	$("#optionTable").html(option);
}

/**
 * 保存组件属性
 */
function saveserveyCreateAttr() {
	console.info("操作成功");
}

function addTr(id){
	var option = "<tr>";
	option = option + "<td><input name='"+id+"Num' type='text'  class='option-input'></td>";
	option = option + "<td><input type='text' name='"+id+"Text'  class='con-input'></td>";
	option = option + "<td><input name='weightFactorInfo' class='value-input' onkeyup=\"onKeyDownOrOnafterpaste(this)\" onafterpaste=\"onKeyDownOrOnafterpaste(this)\"/></td>";
	option = option + "<td class='deltd'><a onclick='delTr(this,\"optionId\");' class='del'></a></td>";
	option = option + "</tr>";
	$("#optionTable").append(option);
}

function addTr1(id){
	var problem = "<tr>";
	problem = problem + "<td><input name='"+id+"Num' type='text'  class='option-input'></td>";
	problem = problem + "<td><input type='text' name='"+id+"Text'  class='con-input1'></td>";
	problem = problem + "<td class='deltd'><a onclick='delTr(this,\"problemId\");' class='del'></a></td>";
	problem = problem + "</tr>";
	$("#problemTable").append(problem);
}

function delTr(k,name){
	var $jqObj = $(k).parent().parent();  //获得本身tr的序号
	objNextTrNum($jqObj,name);
	$jqObj.remove();
}

function objNextTrNum($jqObj,name){
	var $jqSiblObj = $jqObj.next();   //获得下一个tr的信息
	if($jqSiblObj.length > 0){
		$jqSiblObj.find("td[name='"+name+"Num']").html(Number($jqSiblObj.find("td[name='"+name+"Num']").text())-1);   
		objNextTrNum($jqSiblObj,name);
	}
}


function saveAttrsBtn(){
	
	var serveyTypeName = $("#serveyTypeName").val();
	var scoreInfo = $("#scoreInfo").val();
	var required = $('input[name="required"]:checked').val();
	var other = $('input[name="other"]:checked').val();
	var serveyType = $("#serveyType1").val();
	var questionInfo = $("#questionInfo").val();
	var questionTipInfo = $.xljUtils.escapeHtml($("#questionTipInfo").val());
	var problemIdNum = $.xljUtils.escapeHtml(getArrByVal("input","problemIdNum"));
	var problemIdText = $.xljUtils.escapeHtml(getArrByVal("input","problemIdText"));
	var optionIdNum = $.xljUtils.escapeHtml(getArrByVal("input","optionIdNum"));
	var optionIdText = $.xljUtils.escapeHtml(getArrByVal("input","optionIdText"));
	var weightFactorInfos = getArrByweightFactor("input","weightFactorInfo");
	var num = $("#serveyCreateAdd tr").length+1;
	var questionInfoSub="";
	if(questionInfo.length>50){
		questionInfoSub = questionInfo.substring(0,50)+"...";
	}else{
		questionInfoSub = questionInfo;
	}
	questionInfoSub = $.xljUtils.escapeHtml(questionInfoSub);
	questionInfo = $.xljUtils.escapeHtml(questionInfo);
	var addTr = "<tr>";
		addTr = addTr + "<td class='w20'><input name='serveyCreateBox' type='checkbox' /><input name='serveyCreateType' type='hidden' value='insert' /></td>";
		addTr = addTr + "<td class='w20' name='questionNum'>"+num+"</td>";
		addTr = addTr + "<td class='w60' name='question' title='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'>"+$.xljUtils.decodeSpecialChars(questionInfoSub)+"</td>";
		addTr = addTr + "<td class='w20' name='serveyQuestionInfo'>"+serveyTypeName;
		addTr = addTr + "<input id='serialNumber' name='serialNumber' type='hidden' value='"+num+"'/>";
		addTr = addTr + "<input name='question' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'/>";
		addTr = addTr + "<input name='questionTypeCode' type='hidden' value='"+serveyType+"'/>";
		addTr = addTr + "<input name='questionTip' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionTipInfo)+"'/>";
		addTr = addTr + "<input name='problemIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdNum)+"'/>";
		addTr = addTr + "<input name='problemIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdText)+"'/>";
		addTr = addTr + "<input name='optionIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdNum)+"'/>";
		addTr = addTr + "<input name='optionIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdText)+"'/>";
		addTr = addTr + "<input name='questionRequired' type='hidden' value='"+required+"'/>";
		addTr = addTr + "<input name='questionOther' type='hidden' value='"+other+"'/>";
		addTr = addTr + "<input name='weightFactorInfos' type='hidden' value='"+weightFactorInfos+"'/>";
		addTr = addTr + "<input name='score' type='hidden' value='"+scoreInfo+"'/>";
		addTr = addTr + "</td></tr>";
	$("#serveyCreateAdd").append(addTr);
	$("#myModal").modal("hide");
	addTbodyBoxScroll();
	resizeTbodyBox();
}

function getArrByVal(type,name){
	var valArr = new Array;
    $(type+"[name='"+name+"']").each(function(i){
    valArr[i] = $(this).val();
      });
    var priv = valArr.join('、');
    return priv;
}

function getArrByHtml(type,name){
	var valArr = new Array;
    $(type+"[name='"+name+"']").each(function(i){
    valArr[i] = $(this).html();
      });
    var priv = valArr.join('、');
    return priv;
}

function getArrByweightFactor(type,name){
	var valArr = new Array;
    $(type+"[name='"+name+"']").each(function(i){
    	if($(this).val() != null && $(this).val() != ""){
    		 valArr[i] = $(this).val();
    	}else{
    		 valArr[i] = 0;
    	}
      });
    var priv = valArr.join('、');
    return priv;
}

function emptyDateObject(dateIdText){
	$("#"+dateIdText).val("");
}

function getquestionType(questionTypeCode){
	
}

function chooseOne(chk){ 
	//先取得同name的chekcBox的集合物件 
	var obj = document.getElementsByName("serveyCreateBox"); 
	for (var i=0; i<obj.length; i++){ 
		//判斷obj集合中的i元素是否為cb，若否則表示未被點選 
		if (obj[i]!=chk) obj[i].checked = false; 
		//若要至少勾選一個的話，則把上面那行else拿掉，換用下面那行 
		else obj[i].checked = true; 
	} 
} 

function upOrDownApp(status){
	
	var len = $('input[name="serveyCreateBox"]:checked').length;
	if(len > 1 || len < 1){
		if(status == 0){
			$.xljUtils.tip('blue', "只能选择一行数据进行上移！");
		}else if(status == 1){
			$.xljUtils.tip('blue', "只能选择一行数据进行下移！");
		}
		return;
	}
	
	var serveyCreateBoxCheck = $('input[name="serveyCreateBox"]:checked');
	var $jqObj = $(serveyCreateBoxCheck).parent().parent();  //获得本身tr的序号
	var num = Number($jqObj.find("td[name='questionNum']").text());
	if(status == 0){
		if(num == 1){  //判断是否在把第一行向上移
		   return;
		}else{
		   //上移操作
			var $trOObjt = $("#hide_tr_id").append($jqObj.html());  //把本身tr放入临时信息
			var $jqSublObj = $jqObj.prev();   //获得上一个tr的信息
			$trOObjt.find("td[name='questionNum']").html(Number($trOObjt.find("td[name='questionNum']").text())-1);
			$trOObjt.find("input[name='serialNumber']").val(Number($trOObjt.find("input[name='serialNumber']").val())-1);
			$jqSublObj.find("td[name='questionNum']").html(Number($jqSublObj.find("td[name='questionNum']").text())+1);
			$jqSublObj.find("input[name='serialNumber']").val(Number($jqSublObj.find("input[name='serialNumber']").val())+1);
			var serveyQuestionId = $jqSublObj.find("input[name='serveyQuestionId']").val();
			var serveyQuestionId1 = $trOObjt.find("input[name='serveyQuestionId']").val();
			
			var serveyCreateType = $jqSublObj.find("input[name='serveyCreateType']").val();
			if(serveyQuestionId != null && serveyCreateType == "normal"){
				$jqSublObj.find("input[name='serveyCreateType']").val("update_question");
			}
			
			var serveyCreateType1 = $trOObjt.find("input[name='serveyCreateType']").val();
			if(serveyQuestionId1 != null  && serveyCreateType1 == "normal"){
				$trOObjt.find("input[name='serveyCreateType']").val("update_question");
			}
			
			$jqObj.html("").append($jqSublObj.html());   //把本身tr清空并插入上一个信息
			$jqSublObj.html("").append($trOObjt.html());   //把上一个tr清空并插入临时保存的tr信息
			$jqSublObj.find("input[name='serveyCreateBox']").prop("checked",true);
			$("#hide_tr_id").html("");   //清空临时tr信息
		}

	}else if(status == 1){
		var $jqLastTr = $("#serveyCreateAdd tr:last-child");   //获得最后一个tr的对象
		var num1 = Number($jqLastTr.find("td[name='questionNum']").text())
		if(num == num1){  //判断是否想把最后一行往下移
			return;
		}else{
			var $trOObjt = jQuery("#hide_tr_id").append($jqObj.html());  //把本身tr放入临时信息
			$trOObjt.find("td[name='questionNum']").html(Number($trOObjt.find("td[name='questionNum']").text())+1);
			$trOObjt.find("input[name='serialNumber']").val(Number($trOObjt.find("input[name='serialNumber']").val())+1);
			var $jqSiblObj = $jqObj.next();   //获得下一个tr的信息
			$jqSiblObj.find("td[name='questionNum']").html(Number($jqSiblObj.find("td[name='questionNum']").text())-1);   
			$jqSiblObj.find("input[name='serialNumber']").val(Number($jqSiblObj.find("input[name='serialNumber']").val())-1);
			var serveyQuestionId = $jqSiblObj.find("input[name='serveyQuestionId']").val();
			var serveyQuestionId1 = $trOObjt.find("input[name='serveyQuestionId']").val();
			
			var serveyCreateType = $jqSiblObj.find("input[name='serveyCreateType']").val();
			if(serveyQuestionId != null && serveyCreateType == "normal"){
				$jqSiblObj.find("input[name='serveyCreateType']").val("update_question");
			}
			
			var serveyCreateType1 = $trOObjt.find("input[name='serveyCreateType']").val();
			if(serveyQuestionId1 != null && serveyCreateType1 == "normal"){
				$trOObjt.find("input[name='serveyCreateType']").val("update_question");
			}
			$jqObj.html("").append($jqSiblObj.html());   //把本身tr清空并插入下一个tr信息
			$jqSiblObj.html("").append($trOObjt.html());   //把下一个tr清空并插入临时保存的tr信息
			$jqSiblObj.find("input[name='serveyCreateBox']").prop("checked",true);
			jQuery("#hide_tr_id").html("");    //清空临时tr信息
			//serialNumber  questionNum serveyQuestionId
		}
	}
}

function deleteTr(){
	var serveyCreateBoxCheck = $('input[name="serveyCreateBox"]:checked');
	var questionNumShow = "";
	$(serveyCreateBoxCheck).each(function(){
	    var $jqObj = $(this).parent().parent();  //获得本身tr的序号
	   	var serveyQuestionId = $jqObj.find("input[name='serveyQuestionId']").val();
	   	var serveyCreateType = $jqObj.find("input[name='serveyCreateType']").val();
	   	if(serveyQuestionId != null && serveyCreateType != "insert"){
	   		$jqObj.find("input[name='serveyCreateType']").val("delete");
	   		$("#delete_tr_id").append($jqObj.html());  //把本身tr放入临时信息
	   	}
	   	objNext($jqObj);
		var num = $jqObj.find("input[name='serialNumber']").val();
	   	if(questionNumShow == null || questionNumShow == "" || num == questionNumShow){
	   		var $jqSublObj = $jqObj.prev();//获得上一个tr
		   	if($jqSublObj.length > 0){
		   		$jqSublObj.find("input[name='serveyCreateBox']").prop("checked",true);
		   		questionNumShow = $jqSublObj.find("input[name='serialNumber']").val();
		   	}else{
		    	var $jqSiblObj = $jqObj.next();   //获得下一个tr的信息
		    	if($jqSiblObj.length > 0){
		    		$jqSiblObj.find("input[name='serveyCreateBox']").prop("checked",true);
		    		questionNumShow = $jqSiblObj.find("input[name='serialNumber']").val();
		    	}
		    }
	   	}
	   	delete querstionIds[serveyQuestionId];  
	   	$jqObj.remove();
	});
	resizeTbodyBox();
}

function objNext($jqObj){
	var $jqSiblObj = $jqObj.next();   //获得下一个tr的信息
	if($jqSiblObj.length > 0){
		$jqSiblObj.find("td[name='questionNum']").html(Number($jqSiblObj.find("td[name='questionNum']").text())-1);   
		$jqSiblObj.find("input[name='serialNumber']").val(Number($jqSiblObj.find("input[name='serialNumber']").val())-1);
		var serveyQuestionId = $jqSiblObj.find("input[name='serveyQuestionId']").val();
		var serveyCreateType = $jqSiblObj.find("input[name='serveyCreateType']").val();
		if(serveyQuestionId != null && serveyCreateType == "normal"){
			$jqSiblObj.find("input[name='serveyCreateType']").val("update_question");
		}
		objNext($jqSiblObj);
	}
}

function getQuestionNameByCode(code){
	if(code == "SINGLE_SELECT"){
		return "单选题";
	}else if(code == "MULTI_SELECT"){
		return "多选题";
	}else if(code == "QA"){
		return "问答题";
	}else if(code == "GRADE_SUBJECT"){
		return "评分题";
	}else if(code == "MATRIX_MULTI_SELECT"){
		return "矩阵多选题";
	}else if(code == "MATRIX_SINGLE_SELECT"){
		return "矩阵单选题";
	}else if(code == "MATRIX_GRADE_SUBJECT"){
		return "矩阵评分题";
	}else if(code == "SEPERATOR_LINE"){
		return "分页符";
	}
}

function getYuLan(code){
	var str = "";
	if(code == "SINGLE_SELECT"){
		str = str + "<div>";
		str = str + "您最喜欢水果？【单选题】<br /><br />";
		str = str + "<label><input name='Fruit' type='radio'/>苹果 </label>"; 
		str = str + "<label><input name='Fruit' type='radio'/>桃子 </label>";
		str = str + "<label><input name='Fruit' type='radio'/>香蕉 </label>";
		str = str + "<label><input name='Fruit' type='radio'/>梨 </label>";
		str = str + "</div>";
	}else if(code == "MULTI_SELECT"){
		str = str + "<div>";
		str = str + "您最喜欢水果？【多选题】<br /><br />";
		str = str + "<label><input type='checkbox' name='cb1' checked>苹果<br> </label>"; 
		str = str + "<label><input type='checkbox' name='cb1' checked>桃子 <br></label>";
		str = str + "<label><input type='checkbox' name='cb1' checked>香蕉<br> </label>";
		str = str + "<label><input type='checkbox' name='cb1' checked>梨 </label>";
		str = str + "</div>";
	}else if(code == "QA"){
		str = str + "<div>";
		str = str + "您最喜欢水果？【问答题】<br /><br />";
		str = str + "<label><textarea cols='30' rows='3' ></textarea></label>"; 
		str = str + "</div>";
	}else if(code == "GRADE_SUBJECT"){
		str = str + "<div>";
		str = str + "你认为一个问答题需要设置多少分？【评分题】<br /><br />";
		str = str + "<label><input  type='radio'/>一分 </label>"; 
		str = str + "<label><input type='radio'/>二分 </label>";
		str = str + "<label><input type='radio'/>三分 </label>";
		str = str + "<label><input type='radio'/>五分 </label>";
		str = str + "</div>";
	}else if(code == "MATRIX_MULTI_SELECT"){
		str = str + "<div>";
		str = str + "那个部门给你留下最深印象？【矩阵多选题】<br /><br />";
		str = str + "<table><tr>"; 
		str = str + "<td></td><td>仪表</td><td>态度</td><td>专业知识</td><td>合作精神</td>";
		str = str + "<td>前台</td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td>";
		str = str + "<td>销售</td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td>";
		str = str + "<td>开发</td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td><td><input type='checkbox' name='cb1' checked></td>";
		str = str + "</tr></table>"; 
		str = str + "</div>";
	}else if(code == "MATRIX_SINGLE_SELECT"){
		str = str + "<div>";
		str = str + "那个部门给你留下最深印象？【矩阵单选题】<br /><br />";
		str = str + "<table><tr>"; 
		str = str + "<td></td><td>仪表</td><td>态度</td><td>专业知识</td><td>合作精神</td>";
		str = str + "<td>前台</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1'></td>";
		str = str + "<td>销售</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1'></td>";
		str = str + "<td>开发</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1'></td>";
		str = str + "</tr></table>"; 
		str = str + "</div>";
	}else if(code == "MATRIX_GRADE_SUBJECT"){
		str = str + "<div>";
		str = str + "给自己打分？【矩阵评分题】<br /><br />";
		str = str + "<table><tr>"; 
		str = str + "<td></td><td>10分</td><td>8分</td><td>6分</td><td>0分</td>";
		str = str + "<td>周一</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td>";
		str = str + "<td>周二</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td>";
		str = str + "<td>周三</td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td><td><input type='radio' name='cb1' ></td>";
		str = str + "</tr></table>"; 
		str = str + "</div>";
	}
	return str;
}
function danXuan(){
	$("#myModal").modal({backdrop:'static',show:true});
}
function chosePage(){
	$('#serveyCreateDiv').hide();
	$('#serveyCreateShowDiv').show();
    $('#serveyCreatePageDiv').hide();
    $('#danduo').hide();
    $('#wenda').hide();
    $('#yulanPage').hide();
    $('#titleInfo').html("问卷列表");
	choseQuestion=1;
	$('#myModal').modal('show');
	initCategoryList();
}
$('#myModal').on('hide.bs.modal', function () {
	$('#myModal').find(".ui-jqgrid-bdiv").getNiceScroll().hide();
});
$('#myModal').on('shown.bs.modal', function () {
	$.xljUtils.gridResizeFn();
});
function questionList(id){
	 var serveyCreatePageTable = "<table class='table table-bordered' id='serveyCreatePageTable'>";
	 serveyCreatePageTable += "<tbody>";
	 serveyCreatePageTable += "</tbody>";
	 serveyCreatePageTable += "</table>";
	 serveyCreatePageTable += "<div id='serveyCreatePagePager'></div>";
	 $("#serveyCreatePageDiv").html(serveyCreatePageTable);
	 var categoryGrid = jQuery("#serveyCreatePageTable").jqGrid({
	        url: serviceUrl + 'oa/servey/serveyQuestion/page',
	        ajaxGridOptions: {contentType: 'application/json'},
	        mtype: "POST",
	        contentType: "application/json",
	        datatype: "json",
	        postData: {"sidx":"questionNum","serveyId":id},
	        multiboxonly: true,
	        multiselect: true,
	        autowidth: true,
	        rownumbers: true,
	        jsonReader: {
	            repeatitems: false
	        },
	        colNames: ['ID','编号', '题目内容', '题目提示', '题目类型编码','矩阵问题','矩阵问题编码','选项问题','选项分数','问题分数','问题是否必选','其他','选项编号'],
	        colModel: [
					{name: 'id', index: 'id', width: 55, hidden: true},
					{name: 'questionNum', index: 'questionNum', width: 55, hidden: true},
					{name: 'question', index: 'question'},
					{name: 'questionTip', index: 'questionTip'},
					{name: 'questionTypeCode', index: 'questionTypeCode'},
					{name: 'questionContent', index: 'questionContent', hidden: true},
					{name: 'questionCode', index: 'questionCode', hidden: true},
					{name: 'description', index: 'description', hidden: true},
					{name: 'weightFactor', index: 'weightFactor', hidden: true},
					{name: 'questionScore', index: 'questionScore', hidden: true},
					{name: 'questionRequired', index: 'questionRequired', hidden: true},
					{name: 'questionOther', index: 'questionOther', hidden: true},
					{name: 'sequenceNum', index: 'sequenceNum', hidden: true},
	        ],
	        rowNum: 100,//一页显示多少条
	        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
	        pager: '#serveyCreatePagePager',//表格页脚的占位符(一般是div)的id
	        viewrecords: true,
	        loadError: function (xhr, status, error) {
	            $.xljUtils.getError(xhr.status);
	        },
	        gridComplete: function () {
				$(".ui-jqgrid .ui-jqgrid-hbox").css("marginTop","4px");
				$(".ui-widget-content").css({"overflow":"hidden"});
	            $.xljUtils.addGridScroll();
	            $.xljUtils.gridResizeFn();
	        },
	        loadComplete: function (xhr) {

	        }
	    });
	 choseQuestion=2;
}

/**
 * 初始化调查问卷列表
 */
function initCategoryList() {
	var serveyCategoryId = $("#parentId").val();
	if(serveyCategoryId == null || serveyCategoryId == ""){
		serveyCategoryId = Math.random();
	}
	var serveyCreateShowTable = "<table class='table table-bordered' id='serveyCreateShowTable'>";
	serveyCreateShowTable += "<tbody>";
	serveyCreateShowTable += "</tbody>";
	serveyCreateShowTable += "</table>";
	serveyCreateShowTable += "<div id='serveyCreateShowPager'></div>";
	$("#serveyCreateShowDiv").html(serveyCreateShowTable);
    var categoryGrid = jQuery("#serveyCreateShowTable").jqGrid({
        url: serviceUrl + 'oa/servey/page?time='+Math.random(),
        ajaxGridOptions: {contentType: 'application/json'},
        mtype: "POST",
        contentType: "application/json",
        datatype: "json",
        postData: {delflag: false,"serveyType":"0","serveyCategoryId":serveyCategoryId},
        multiboxonly: true,
        multiselect: true,
        // width: $("#serveyCreateShowDiv").width(),
        autowidth:true,
        rownumbers: true,
        jsonReader: {
            repeatitems: false
        },
        colNames: ['ID', '问卷名称', '问卷描述', '创建日期'],
        colModel: [
            {name: 'id', index: 'id',hidden: true},
            {name: 'name', index: 'name'},
            {name: 'description', index: 'description'},
            {name: 'createDate', index: 'createDate'}
        ],
        rowNum: 100,//一页显示多少条
        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
        pager: '#serveyCreateShowPager',//表格页脚的占位符(一般是div)的id
        viewrecords: true,
        loadError: function (xhr, status, error) {
            $.xljUtils.getError(xhr.status);
        },
        gridComplete: function () {
			$(".ui-jqgrid .ui-jqgrid-hbox").css("marginTop","4px");
			$(".ui-widget-content").css({"overflow":"hidden"});
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
        },
        loadComplete: function (xhr) {

        }
    });
}

function getQuestionById(idVal){
	 var rowData = $('#serveyCreatePageTable').jqGrid("getRowData",idVal);
	 var serveyTypeName = getQuestionNameByCode(rowData.questionTypeCode);
     querstionIds[idVal]=idVal;
     var serveyType = rowData.questionTypeCode;
     var questionInfo = $.xljUtils.escapeHtml(rowData.question);
 	 var questionTipInfo = $.xljUtils.escapeHtml(rowData.questionTip);
 	 var problemIdNum = $.xljUtils.escapeHtml(rowData.questionCode);
	 var problemIdText = $.xljUtils.escapeHtml(rowData.questionContent);
	 var optionIdNum = $.xljUtils.escapeHtml(rowData.sequenceNum);
	 var optionIdText = $.xljUtils.escapeHtml(rowData.description);
	 var required = rowData.questionRequired;
	 var other = rowData.questionOther;
	 var weightFactorInfos = rowData.weightFactor;
	 var score = rowData.questionScore;
     
     var num = $("#serveyCreateAdd tr").length+1;
     var questionInfoSub="";
 	 if(questionInfo.length>50){
 		 questionInfoSub = questionInfo.substring(0,50)+"...";
 	 }else{
 	 	 questionInfoSub = questionInfo;
 	 }
     var addTr = "<tr class='form-tr'>";
     	addTr = addTr + "<td class='w20'><input name='serveyCreateBox' type='checkbox' /><input name='serveyCreateType' type='hidden' value='insert' /></td>";
 		addTr = addTr + "<td class='w20' name='questionNum'>"+num+"</td>";
 		addTr = addTr + "<td class='w60' name='question' title='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'>"+$.xljUtils.decodeSpecialChars(questionInfoSub)+"</td>";
 		addTr = addTr + "<td class='w20' name='serveyQuestionInfo'>"+serveyTypeName;
 		addTr = addTr + "<input type='hidden' id='serveyQuestionId' name='serveyQuestionId' value='"+idVal+"'/>";
 		addTr = addTr + "<input id='serialNumber' name='serialNumber' type='hidden' value='"+num+"'/>";
 		addTr = addTr + "<input name='question' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'/>";
 		addTr = addTr + "<input name='questionTypeCode' type='hidden' value='"+serveyType+"'/>";
 		addTr = addTr + "<input name='questionTip' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionTipInfo)+"'/>";
 		addTr = addTr + "<input name='problemIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdText)+"'/>";
 		addTr = addTr + "<input name='optionIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdText)+"'/>";
 		addTr = addTr + "<input name='questionRequired' type='hidden' value='"+required+"'/>";
 		addTr = addTr + "<input name='questionOther' type='hidden' value='"+other+"'/>";
 		addTr = addTr + "<input name='weightFactorInfos' type='hidden' value='"+weightFactorInfos+"'/>";
 		addTr = addTr + "<input name='score' type='hidden' value='"+score+"'/>";
 		addTr = addTr + "<input name='problemIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdNum)+"'/>";
		addTr = addTr + "<input name='optionIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdNum)+"'/>";
 		addTr = addTr + "</td></tr>";
     $("#serveyCreateAdd").append(addTr);

}

function onKeyDownOrOnafterpaste(val){
	val.value=val.value.replace(/[^0-9-]+/g,'');
}


function updateQuestion(val){
	$('#yulanPage').show();
	choseQuestion=3;
	$("#subQuestionInfoDiv").hide();
	var len = $('input[name="serveyCreateBox"]:checked').length;
	if(len > 1 || len < 1){
		$.xljUtils.tip('blue', "只能选择一行数据进行修改！");
		return;
	}
	var serveyCreateBoxCheck = $('input[name="serveyCreateBox"]:checked');
	var $jqObj = $(serveyCreateBoxCheck).parent().parent();  //获得本身tr的序号
	
	var serveyQuestionId = $jqObj.find($("input[name='serveyQuestionId']"))[0];
	if(serveyQuestionId != null){
		serveyQuestionId = serveyQuestionId.value;
	}
	var serveyCreateType = $jqObj.find($("input[name='serveyCreateType']"))[0];
	if(serveyCreateType != null){
		serveyCreateType = serveyCreateType.value;
	}
	var serialNumber = $jqObj.find($("input[name='serialNumber']"))[0];
	if(serialNumber != null){
		serialNumber = serialNumber.value;
	}
	var questionRequired = 0;
	var questionOther = 0;
	var questionScore = 0;
	var question = "";
	var questionTypeCode = "";
	var questionTip = "";
	var problemIdTexts = "";
	var optionIdTexts = "";
	var weightFactorInfos = "";
	var problemIdNums = "";
	var optionIdNums = "";
	if(serveyCreateType != "insert"){
		var result = getQuestionById1(serveyQuestionId);
		if(result["questionTypeCode"] != null){
			 questionTypeCode = result["questionTypeCode"];
		}
		if(result["question"] != null){
			question = result["question"];
		}
        if(result["questionTip"] != null){
        	questionTip = result["questionTip"];
        }
        if(result["problemIdText"] != null){
        	problemIdTexts = result["problemIdText"];
        }
        if(result["optionIdText"] != null){
        	optionIdTexts = result["optionIdText"];
        }
        questionRequired = result["questionRequired"];
        questionOther = result["questionOther"];
        weightFactorInfos = result["weightFactorInfos"];
        problemIdNums = result["problemIdNums"];
        optionIdNums = result["optionIdNums"];
        if(result["questionScore"] != null){
        	questionScore = result["questionScore"];
        }
	}else{
		questionRequired = $jqObj.find($("input[name='questionRequired']"))[0];
		if(questionRequired != null){
			questionRequired = questionRequired.value;
		}
		questionOther = $jqObj.find($("input[name='questionOther']"))[0];
		if(questionOther != null && questionOther != 'undefined'){
			questionOther = questionOther.value;
		}
		questionScore = $jqObj.find($("input[name='score']"))[0];
		if(questionScore != null){
			questionScore = questionScore.value;
		}
		question = $jqObj.find($("input[name='question']"))[0];
		if(question != null){
			question = $.xljUtils.escapeHtml(question.value);
		}
		questionTypeCode = $jqObj.find($("input[name='questionTypeCode']"))[0];
		if(questionTypeCode != null){
			questionTypeCode = questionTypeCode.value;
		}
		questionTip = $jqObj.find($("input[name='questionTip']"))[0];
		if(questionTip != null){
			questionTip = $.xljUtils.escapeHtml(questionTip.value);
		}
		problemIdTexts = $jqObj.find($("input[name='problemIdTexts']"))[0];
		if(problemIdTexts != null){
			problemIdTexts = $.xljUtils.escapeHtml(problemIdTexts.value);
		}
		
		problemIdNums = $jqObj.find($("input[name='problemIdNums']"))[0];
    	if(problemIdNums != null){
    		problemIdNums = $.xljUtils.escapeHtml(problemIdNums.value);
    	}
    	optionIdNums = $jqObj.find($("input[name='optionIdNums']"))[0];
    	if(optionIdNums != null){
    		optionIdNums = $.xljUtils.escapeHtml(optionIdNums.value);
		}
    	
		optionIdTexts = $jqObj.find($("input[name='optionIdTexts']"))[0];
		if(optionIdTexts != null){
			optionIdTexts = $.xljUtils.escapeHtml(optionIdTexts.value);
		}
		weightFactorInfos = $jqObj.find($("input[name='weightFactorInfos']"))[0];
		if(weightFactorInfos != null){
			weightFactorInfos = weightFactorInfos.value;
		}
	}
	$("#xuanDiv").html("");
	$("#problemTable").html("");
	$("#optionTable").html("");
	$("#wenda").html("");
	if(questionTypeCode != "QA"){
		$("#danduo").show();
		$("#wenda").hide();
		$('#serveyCreateDiv').show();
		$('#serveyCreateShowDiv').hide();
	    $('#serveyCreatePageDiv').hide();
		var divTemplate = "";
		divTemplate += "<div class='input-box'><label>题目</label><input type='text'  id='questionInfo' value='"+$.xljUtils.decodeSpecialChars(question)+"'></div>";
		divTemplate += "<div class='input-box'><label>提示</label><input type='text'  id='questionTipInfo' value='"+$.xljUtils.decodeSpecialChars(questionTip)+"'>";
		divTemplate += "<input type='hidden' id='serveyType1' /><input type='hidden' id='serveyTypeName'/>";
		divTemplate += "</div>";
		divTemplate += "<div class='other-option'>";
		divTemplate += "<label>本题总分</label>";
		divTemplate += "<input class='short' id='scoreInfo' value='"+questionScore+"' onkeyup='onKeyDownOrOnafterpaste(this)' onafterpaste='onKeyDownOrOnafterpaste(this)' type='text'>";
		if(questionRequired == 1){
			divTemplate += "<input type='checkbox' checked='checked' value='1' name='required' class='check-c'>";
		}else{
			divTemplate += "<input type='checkbox' value='1' name='required' class='check-c'>";
		}
		divTemplate += "<label>必答题</label>";
		if(questionTypeCode != "SINGLE_SELECT" &&  questionTypeCode != "MULTI_SELECT" &&  questionTypeCode != "QA" &&  questionTypeCode != "GRADE_SUBJECT"){
			$("#subQuestionInfoDiv").show();
			getUpdateProblem(problemIdNums,problemIdTexts);
		}
		if(questionTypeCode == "SINGLE_SELECT" ||  questionTypeCode == "MULTI_SELECT"){
			if(questionOther == 1){
				divTemplate += "<input class='check-c' checked='checked' value='1' name='other' type='checkbox'>";
			}else{
				divTemplate += "<input class='check-c' value='1' name='other' type='checkbox'>";
			}
			
			divTemplate += "<label>允许填写“其他”答案</label>";
		}
		divTemplate += "</div>";
		$("#xuanDiv").html(divTemplate);
		getUpdateOption(optionIdNums,optionIdTexts,weightFactorInfos);
	}else{
		$("#wenda").show();
		$("#danduo").hide();
		var divTemplate = "";
		divTemplate += "<div class='input-box clearfix'>";
		divTemplate += "<label>问答题目</label>";
		divTemplate += "<textarea id='questionInfo'  class='form-control mytext'>"+$.xljUtils.decodeSpecialChars(question)+"</textarea>";
		divTemplate += "</div>";
		divTemplate += "<div class='input-box clearfix'>";
		divTemplate += "<label>提示信息</label>";
		divTemplate += "<textarea id='questionTipInfo'  class='form-control mytext'>"+$.xljUtils.decodeSpecialChars(questionTip)+"</textarea>";
		divTemplate += "<input type='hidden' id='serveyType1' /><input type='hidden' id='serveyTypeName'/>";
		divTemplate += " </div>";
		divTemplate += "<div class='other-option'>";
		divTemplate += "<label>本题总分</label>";
		divTemplate += "<input type='text' id='scoreInfo'  value='"+questionScore+"' onkeyup='onKeyDownOrOnafterpaste(this)' onafterpaste='onKeyDownOrOnafterpaste(this)'  class='short'>";
		if(questionRequired == 1){
			divTemplate += "<input type='checkbox' checked='checked' value='1' name='required' class='check-c'>";
		}else{
			divTemplate += "<input type='checkbox' value='1' name='required' class='check-c'>";
		}
		divTemplate += "<label>必答题</label>";
		divTemplate += "</div>";
		$("#wenda").html(divTemplate);
	}
	$("#serveyType1").val(questionTypeCode);
	$("#serveyTypeName").val(getQuestionNameByCode(questionTypeCode));
	$("#titleInfo").html(getQuestionNameByCode(questionTypeCode));
	$("#serveyCreateTable").html("");
	$("#myModal").modal({backdrop:'static',show:true});
}

function getUpdateProblem(problemIdNums,problemIdTexts){
	var problemIdTextsArr = [];
	var problemIdNumsArr = [];
	if(problemIdTexts != null && problemIdTexts != ""){
		problemIdTextsArr = problemIdTexts.split('、');
		problemIdNumsArr = problemIdNums.split('、');
	}
	var problem = "";
	if(problemIdTextsArr.length > 0){
		for(var i = 0; i < problemIdTextsArr.length;i++){
			problem = problem + "<tr >";
			problem = problem + "<td ><input name='problemIdNum' type='text'  value='"+$.xljUtils.decodeSpecialChars(problemIdNumsArr[i])+"' class='option-input'></td>";
			problem = problem + "<td ><input type='text' class='con-input1'  name='problemIdText' value='"+$.xljUtils.decodeSpecialChars(problemIdTextsArr[i])+"'></td>";
			problem = problem + "<td class='deltd'><a onclick='delTr(this,\"problemId\");' class='del'></a></td>";
			problem = problem + "</tr>";
		}
	}else{
		var xuhao=['A','B','C','D'];
		for(var i = 1; i <= 4;i++){
			problem = problem + "<tr>";
			problem = problem + "<td><input name='problemIdNum' type='text'  value='"+xuhao[i-1]+"' class='option-input'></td>";
			problem = problem + "<td><input type='text' name='problemIdText'  class='con-input1'></td>";
			problem = problem + "<td class='deltd'><a onclick='delTr(this,\"problemId\");' class='del'></a></td>";
			problem = problem + "</tr>";
		}
	}
	
	$("#problemTable").html(problem);
}

function getUpdateOption(optionIdNums,optionIdTexts,weightFactorInfos){
	var optionIdTextsArr=[];
	var weightFactorInfosArr = [];
	var optionIdNumsArr = [];
	if(optionIdTexts != null && optionIdTexts != ""){
		optionIdTextsArr = optionIdTexts.split('、');
		weightFactorInfosArr = weightFactorInfos.split('、');
		optionIdNumsArr = optionIdNums.split('、');
	}
	
	var option="";
	if(optionIdTextsArr.length > 0){
		for(var i = 0; i < optionIdTextsArr.length;i++){
			option = option + "<tr>";
			option = option + "<td name='optionIdNum'><input name='optionIdNum'  type='text' value='"+$.xljUtils.decodeSpecialChars(optionIdNumsArr[i])+"' class='option-input'></td>";
			option = option + "<td><input type='text' name='optionIdText'  class='con-input' value='"+$.xljUtils.decodeSpecialChars(optionIdTextsArr[i])+"'></td>";
			option = option + "<td><input name='weightFactorInfo' class='value-input' onkeyup=\"onKeyDownOrOnafterpaste(this)\" onafterpaste=\"onKeyDownOrOnafterpaste(this)\" value='"+weightFactorInfosArr[i]+"'/></td>";
			option = option + "<td class='deltd'><a onclick='delTr(this,\"optionId\");' class='del'></a></td>";
			option = option + "</tr>";
		}
	}else{
		for(var i = 1; i <= 4;i++){
			var xuhao=['A','B','C','D'];
			for(var i = 1; i <= 4;i++){
				option = option + "<tr>";
				option = option + "<td><input name='optionIdNum'  type='text' value='"+xuhao[i-1]+"' class='option-input'></td>";
				option = option + "<td><input type='text'  name='optionIdText' class='con-input'></td>";
				option = option + "<td><input name='weightFactorInfo' class='value-input' onkeyup=\"onKeyDownOrOnafterpaste(this)\" onafterpaste=\"onKeyDownOrOnafterpaste(this)\"/></td>";
				option = option + "<td class='deltd'><a onclick='delTr(this,\"optionId\");' class='del'></a></td>";
				option = option + "</tr>";
			}
		}
	}
	
	$("#optionTable").html(option);
}

function updateAttrsBtn(){
	var serveyCreateBoxCheck = $('input[name="serveyCreateBox"]:checked');
	var $jqObj = $(serveyCreateBoxCheck).parent().parent();  //获得本身tr的序号
	var serveyCreateType = $jqObj.find($("input[name='serveyCreateType']"))[0];
	if(serveyCreateType != null){
		serveyCreateType = serveyCreateType.value;
	}
	var serveyQuestionId = $jqObj.find($("input[name='serveyQuestionId']"))[0];
	if(serveyQuestionId != null){
		serveyQuestionId = serveyQuestionId.value;
	}
	if(serveyCreateType != "insert"){
		serveyCreateType="update";
	}else{
		serveyCreateType="insert";
	}
	var serveyTypeName = $("#serveyTypeName").val();
	var scoreInfo = $("#scoreInfo").val();
	var serveyType = $("#serveyType1").val();
	var questionInfo = $("#questionInfo").val();
	var questionTipInfo = $.xljUtils.escapeHtml($("#questionTipInfo").val());
	var problemIdNum = $.xljUtils.escapeHtml(getArrByVal("input","problemIdNum"));
	var problemIdText = $.xljUtils.escapeHtml(getArrByVal("input","problemIdText"));
	var optionIdNum =$.xljUtils.escapeHtml( getArrByVal("input","optionIdNum"));
	var optionIdText = $.xljUtils.escapeHtml(getArrByVal("input","optionIdText"));
	var required = $('input[name="required"]:checked').val();
	var other = $('input[name="other"]:checked').val();
	var weightFactorInfos = getArrByweightFactor("input","weightFactorInfo");
	var num = Number($jqObj.find("td[name='questionNum']").text());
	var questionInfoSub="";
	if(questionInfo.length>50){
		questionInfoSub = questionInfo.substring(0,50)+"...";
	}else{
		questionInfoSub = questionInfo;
	}
	questionInfoSub = $.xljUtils.escapeHtml(questionInfoSub);
	questionInfo = $.xljUtils.escapeHtml(questionInfo);
	var addTr = "";
		addTr = addTr + "<td class='w20'><input name='serveyCreateBox' type='checkbox'/><input name='serveyCreateType' type='hidden' value='"+serveyCreateType+"' /></td>";
		addTr = addTr + "<td class='w20' name='questionNum'>"+num+"</td>";
		addTr = addTr + "<td class='w60' name='question' title='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'>"+$.xljUtils.decodeSpecialChars(questionInfoSub)+"</td>";
		addTr = addTr + "<td class='w20' name='serveyQuestionInfo'>"+serveyTypeName;
		addTr = addTr + "<input id='serialNumber' name='serialNumber' type='hidden' value='"+num+"'/>";
		addTr = addTr + "<input name='question' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionInfo)+"'/>";
		addTr = addTr + "<input name='questionTypeCode' type='hidden' value='"+serveyType+"'/>";
		addTr = addTr + "<input name='questionTip' type='hidden' value='"+$.xljUtils.decodeSpecialChars(questionTipInfo)+"'/>";
		addTr = addTr + "<input name='problemIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdNum)+"'/>";
		addTr = addTr + "<input name='problemIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(problemIdText)+"'/>";
		addTr = addTr + "<input name='optionIdNums' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdNum)+"'/>";
		addTr = addTr + "<input name='questionRequired' type='hidden' value='"+required+"'/>";
		addTr = addTr + "<input name='questionOther' type='hidden' value='"+other+"'/>";
		addTr = addTr + "<input name='optionIdTexts' type='hidden' value='"+$.xljUtils.decodeSpecialChars(optionIdText)+"'/>";
		addTr = addTr + "<input name='weightFactorInfos' type='hidden' value='"+weightFactorInfos+"'/>";
		addTr = addTr + "<input name='score' type='hidden' value='"+scoreInfo+"'/>";
		addTr = addTr + "<input type='hidden' name='serveyQuestionId' value='"+serveyQuestionId+"'/>";
		addTr = addTr + "</td>";
		$jqObj.html(addTr);
		$jqObj.find("input[name='serveyCreateBox']").prop("checked",true);
		$("#myModal").modal("hide");
}

/**
 * 根据id获取这份问卷的全部信息
 * @param idVal
 * @returns {String}
 */
function getQuestionById1(idVal){
	var result = "";
	$.ajax({
	    url:serviceUrl+'oa/servey/serveyQuestion/get/'+idVal,
	    type:'GET',
	    dataType:'JSON',
	    async: false,
	    success:function (resultData) {
	        if(resultData&&resultData.success){
	            result = resultData.result;
	           
	        }
	    }
	});
	return result;
}

function addTbodyBoxScroll(){
	$(".tbody-box").niceScroll({
		autohidemode: false,
		cursorcolor: "#eee",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以管理水平滚动
		background: "#fff"
	});
}
function resizeTbodyBox(){
	$(".tbody-box").getNiceScroll().show().resize();
}

function emptyDateObject1(dateIdText,dateId){
	$("#"+dateIdText).val("");
	$("#"+dateId).val("");
}

/**
 * 初始化附件
 */
function initFile(rowId,operationType) {
        switch (operationType){
            case 'update':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: rowId,
                        categoryId: '1',
                        mode: 'edit',
                        singleUpload: false,
                        isAsyncSubmit: false
                    });
                }catch (e){

                }
                break;
            case 'create':
                try{
                    $('#documentAttachments').xljAttachment({
                        appId: '1',
                        businessId: rowId,
                        categoryId: '1',
                        mode: 'add',
                        singleUpload: false,
                        isAsyncSubmit: false
                    });
                }catch (e){

                }
                break;

            default:
                $('#documentAttachments').xljAttachment({appId: '1', businessId: rowId, categoryId: '1'});
                break;
        }
}

function flowCallBack(){
	var businessId=$("#id").val();
	window.opener.reloadGrid(businessId);
	window.close();
}

