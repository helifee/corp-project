var mxBasePath = 'mxgraph/src';
var editor,fl,acs,steps,participants,flId;
var editorStatus=1;
//---------------引用流程模板所需变量 begin ---------------------
var referredFlId = "";
var flowReferredData, acs_referred,steps_referred, participants_referred;
//---------------引用流程模板所需变量 end ---------------------

$(function() {
	//清空缓存
	window.localStorage.clear(); 
	//初始化
	init();
	queryVariableListForTitleShow();
	//设置画布编辑器高度
	resizeEditorHeight();
	//显示可阅读人的信息
	showReaderDataForm();
	
    $('#publishBtn').on('click',function(){
    	$('form').attr('data-validate-success','publish()');
    	$('form').submit();
    	
    });
    
    $('#tempSaveBtn').on('click',function(){
    	$('form').attr('data-validate-success','tempSave()');
    	$('form').submit();
    });
});


/**
 * 初始化
 */
function init(){
	// 添加浏览器纵向滚动条
	addHtmlScroll();	
	/*//隐藏设计器和流程仿真
	$('#_designer,#_emulation').hide();	*/
	$('#_designer').show();
	$('#_base,#_emulation').hide();
	editor = new createEditor('config/layouteditor.xml');
	$.ajax({
		type : "get",
		async : false,
		url : hostUrl + "flow/fl/getAll/" + $.getUrlParam("flId"),
		success : function(data) {
//			console.log(JSON.stringify(data));
			fl = data.result;
			acs = fl.ac;
			steps = fl.step;
			participants = fl.participant;
			initFormData();
			initCacheData();
			readGraph(fl.graphXml);
		},
		error:function(xhr){
			$.xljUtils.getError(xhr.status);
		}
	});
}

/**
 * 初始化表单数据
 */
function initFormData() {
	for (var key in fl) {
		if ("titleUpdate"==key || "retract"==key || "useStatus"==key || "doArchive"==key) {
			if (fl[key]) {
				$("input[name='"+key+"'][value='1']").prop("checked", "checked");
			} else {
				$("input[name='"+key+"'][value='0']").prop("checked", "checked");
			}
		} else {
			$("#" + key).val(fl[key]);
		}
	}
	flId = getGuuid("id");
	var date = new Date();
    $("#version").val(date.format("yyyyMMddHHmmss"));
}

/**
 * 查询相关的业务变量数据列表
 */
function queryVariableListForTitleShow(){
	var objectId = $("#businessObjectId").val();
	var paramData = {businessObjectId:objectId, delflag:false};
	$.ajax({ //发送更新的ajax请求
	    type : "post",  
	    url : hostUrl+"flow/businessObjectVariable/queryList",    
	    dataType : "json",
	    async : false,
	    data : JSON.stringify(paramData),//将对象序列化成JSON字符串  ,
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	    success : function(data){
	    	var variableList = data.result;	
	    	var flowTitle = $("#flowTitle").val();
	    	//@cmp_e455391a-71ce-4f64-8e70-c06f5cbbbf61@-@cmp_f0a2894d-bf30-4ebc-8c03-f3e21c086790@-@cmp_3c82ede3-7277-49d1-874a-e268f4ac90f5@
	    	var itemArray = flowTitle.split("@-@");
	    	var reg = new RegExp("@","g");//g,表示全部替换。
	    	var titleShowText = "";
	    	var newFlowTitle = "";
	    	for(var idx=0; idx<itemArray.length; idx++){
	    		var variableId = itemArray[idx];
	    		variableId = variableId.replace(reg,"");
	    		var variableName = getVariableNameFromList(variableId, variableList);
	    		if(variableName && variableName.length>0){//这是流程变量没有被删除掉的情况
	    			titleShowText += "@"+variableName+"@-";
	    			newFlowTitle += "@"+variableId+"@-";
	    		}
	    	}
	    	titleShowText = titleShowText.substr(0, titleShowText.length-1);
	    	newFlowTitle = newFlowTitle.substr(0, newFlowTitle.length-1);
	    	$("#flowTitleShow").val(titleShowText);
	    	$("#flowTitle").val(newFlowTitle);
	    },  
	    error : function(data){  
	    	
	    }  
	});
}

function getVariableNameFromList(dataId, dataList){
	var name = "";
	for(var idx=0; idx<dataList.length; idx++){
		var item = dataList[idx];
		if(item.code == dataId){
			name = item.name;
			break;
		}
	}
	return name;
}

/**
 * 打开选择默认标题配置页面
 */
function openToSelectVariable(){
	var objectId = $("#businessObjectId").val();
	var objectName = $("#businessObjectName").val();
	openWin(encodeURI("fl_variable.html?objectId="+objectId+"&objectName="+objectName));
}

/**
 * 从新页面返回来的数据
 * @param showTitle
 * @param hiddenTitleId
 */
function setNewTitleVariable(showTitle, hiddenTitleId){
	$("#flowTitleShow").val(showTitle);
	$("#flowTitle").val(hiddenTitleId);
}

/**
 * 为子页面提供数据
 * @returns
 */
function getOldTitleVariable(){
	return $("#flowTitle").val();
}

/**
 * 显示可阅读人的信息
 */
function showReaderDataForm(){
	var readerDataArray = JSON.parse(participants);
	var readerObjArray = new Array();
	if(readerDataArray && readerDataArray.length>=1){
		for(var idx=0; idx<readerDataArray.length; idx++){
			var readerItem = readerDataArray[idx];
			if(readerItem.type == 3){
				readerObjArray.push(readerItem);
			}
		}
	}
	var businessObjectId = $("#businessObjectId").val();
	queryVariableList(businessObjectId);
	var returnList = getDataListAfterPostDataProcess(readerObjArray, businessObjectId);  
	if(returnList && returnList.length>=1){
		returnList = changeArraySort(returnList);
		redrawTBodyOfTable("one", returnList);
		//showResultTextToLabel("one");
	}
}
/**
 * 初始化缓存数据
 */
function initCacheData() {
	if(acs){
		pushDataToStor(acs);
	}
	if(steps){
		pushDataToStor(steps);		
	}
}

/**
 * 发布
 */
function publish() {
	save("1");
}
/**
 * 暂存
 */
function tempSave() {
	save("0");
}

/**
 * 保存
 * 
 * @param status 保存状态。(0-草稿、1-发布、2-失效)
 */
function save(status) {
	var flDto = {"status":status, "delflag":false};	
	var acArr = new Array();
	var stepArr = new Array();
	var xmlDoc = $.parseXML(getGraph(editor));
	
	parseXML(xmlDoc,"mxGraphModel root Start",acArr);
	parseXML(xmlDoc,"mxGraphModel root End",acArr);
	parseXML(xmlDoc,"mxGraphModel root Task",acArr);
//	console.log("001 acArrr="+JSON.stringify(acArr));
	parseXML(xmlDoc,"mxGraphModel root Fork",acArr);
	parseXML(xmlDoc,"mxGraphModel root Join",acArr);
	parseXML(xmlDoc,"mxGraphModel root Connector",stepArr);
	
	var flBaseArr = $("#_flForm").serializeArray();
	for (var i in flBaseArr) {
		var name = flBaseArr[i].name;
		if(name && name!=undefined && name!=null){
			if ("" == name || name.startWith('participantId') || name.startWith('participantScope')
					|| name == 'flowTitleShow' || name.startWith('paramValue') 
					|| name.startWith('type_') || name.startWith('status_one_')) {
				//过滤掉不传入后台的元素
			} else if (name == "retract" || name == "useStatus" || name == "titleUpdate" || name == "doArchive") {
				flDto[name] = flBaseArr[i].value == "1" ? true : false;
			} else {
				flDto[name] = flBaseArr[i].value;
			}
		}
	}
	
	flDto.code = $("#code").val();
	flDto.name = $("#name").val();
	flDto.remark = $("#remark").val();
	var flowTitleShow = $("#flowTitleShow").val();
	flDto.sort = $("#sort").val();
	
	var checkResult = checkActivityCodeIsRepeated(acArr);
	if(checkResult && checkResult.length>5){
		pop_tip_open("blue", checkResult);
		return;
	}
	
	flDto.participant = JSON.stringify(getSubmitDataListofCommonTable("one", flDto.id, -1, true));
//	console.log("001 flDto.participant>>>="+flDto.participant);
	flDto.ac = JSON.stringify(acArr);
//	console.log("002 flDto.ac>>>="+flDto.ac);
	flDto.step = JSON.stringify(stepArr);
//	console.log("003 flDto.step>>>="+flDto.step);
	submitData(flDto,status);
}

function checkActivityCodeIsRepeated(activityList){ 
	var checkResult = "";
	var codeArray = new Array();
	var nameArray = new Array();
	if(activityList && activityList.length>0){
		for(var idx1=0; idx1<activityList.length-1; idx1++){
			var activity1 = activityList[idx1];
			for(var idx2=idx1+1; idx2<activityList.length; idx2++){
				var activity2 = activityList[idx2];
				if(activity1.code == activity2.code){
					var codeText = activity1.code;
					if(activity1.code && activity1.code!=undefined && activity2.code && activity2.code!=undefined ){
						var checkIdx = $.inArray(codeText, codeArray);
						if(checkIdx>=0){//数据组已经有数据
							var tempArray = nameArray[checkIdx];//取出nameArray
							if($.inArray(activity1.name, tempArray)==-1){
								tempArray.push(activity1.name);
							}
							if($.inArray(activity2.name, tempArray)==-1){
								tempArray.push(activity2.name);
							}
							nameArray[checkIdx] = tempArray;
						}else{//数据组没有数据
							codeArray.push(codeText);
							nameArray.push([activity1.name, activity2.name]);
						}
					}
				}
			}
		}
	}
	
	if(codeArray && codeArray.length>0){
		for(var idx=0; idx<codeArray.length; idx++){
			var codeText = codeArray[idx];
			var nameItems = nameArray[idx];
			checkResult +="编码 "+codeText+" 重复环节: "+nameItems.join("、 ")+";<br/>";
		}
	}

	return checkResult;
}

/**
 * 提交表单数据
 * 
 * @param json 表单数据的JSON对象
 * @param status 保存状态
 */
function submitData(json,status){
//	console.log("submitData---JSON.stringify(json)="+JSON.stringify(json));
	if($("#name").val()==''){
		$.xljUtils.tip("blue","名称不能为空！");
		return;
	}
	if($("#flowTitleShow").val()==''){
		$.xljUtils.tip("blue","默认标题不能为空！");
		return;
	}
	if($("#sort").val()==''){
		$.xljUtils.tip("blue","排序号不能为空！");
		return;
	}
	$.ajax({
		url : hostUrl + "flow/fl/saveAll",
		data : JSON.stringify(json),
		type : 'POST',
		contentType : 'application/json',
		dataType : 'JSON',
		success : function(data) {
			if (data) {
				var successFlag = data.success;
				var result = data.result;
				var msg = data.msg;
				if (successFlag) {
					if("0" == status){
						pop_tip_open("green","暂存成功！");
						if (window.opener != null)
							window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");
						closeWin();
						}
					else{
						pop_tip_open("green","发布成功！");
						if (window.opener != null)
							window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");
						closeWin();
					}
				} else {
					if("0" == status)
						pop_tip_open("red","暂存失败！");
					else
						pop_tip_open("red","发布失败！");
				}
			}
		},
		error:function(xhr){
			$.xljUtils.getError(xhr.status);
		}
	});
}


/**
 * 从画布获取XML
 * 
 * @param editor  画布编辑器
 */
function getGraph(editor) {
	var encoder = new mxCodec();
	var node = encoder.encode(editor.graph.getModel());
	var xml = mxUtils.getXml(node);
	return xml;
}

/**
 * 环节、环节连线编辑后的回调函数
 * 
 * @param id  环节/环节连线ID
 * @param label 环节/环节连线label 
 */
function callBack(id,label){
	changeCell(id,label,editor);
}

/**
 * 编辑器自适应
 */
$(window).resize(function(){
	resizeEditorHeight();
});
/**
 * 多页签切换
 */
$(".addPad button").on("click",function(e){
  $(this).siblings().removeClass("active");
  $(this).addClass("active");
  var label = $(this).html();
  if(label == "基本信息"){
	  $('#_base').show();
	  $('#_designer,#_emulation').hide();
  }else if(label == "设计流程"){
	  $('#_designer').show();
	  $('#_base,#_emulation').hide();	  
  }else if(label == "流程仿真"){
	  $('#_emulation').show();
	  $('#_base,#_designer').hide();	  	  
  }
  $('html').getNiceScroll().show().resize();       //重置纵向滚动条  
  e.stopPropagation();
});

//----------------------------- 引用模板的相关处理方法 begin --------------------------------
/**
 * 引用其他流程
 */
function reference(){
	openWin(encodeURI("fl_reference.html"));
}

/**
 * 加载被引用的模板信息
 * @param returnFlId
 */
function loadReferredFlowInfo(returnFlId){
	referredFlId = returnFlId;
	//查询被引用模板的详细信息
	initByReferredFlId();
}

/**
 * 根据引用模板ID来初始化第二个页签的数据
 */
function initByReferredFlId(){
	//清空缓存
	window.localStorage.clear();
	//隐藏设计器和流程仿真
	/*editor = null;
	$('#_designer,#_emulation').hide();	
	editor = new createEditor('config/layouteditor.xml');*/
	$.ajax({
		type : "get",
		async : false,
		url : hostUrl + "flow/fl/getAll/" + referredFlId,
		success : function(data) {
			flowReferredData = data.result;
			acs_referred = flowReferredData.ac;
			steps_referred = flowReferredData.step;
			participants_referred = flowReferredData.participant;
			
			//与赵和广确认了,引用模板所需要替换的数据不是第一个页签的,而是第二个页签数据
			initFormDataByReferFlow();//使用被引用的流程模板来初始化表单数据
			initCacheDataByReferFlow();
			readGraph(flowReferredData.graphXml);
			//设置画布编辑器高度
			resizeEditorHeight();
		},
		error:function(xhr){
			$.xljUtils.getError(xhr.status);
		}
	});
}

function initFormDataByReferFlow() {
	var itemArray = ["remark","approvalRepeat","doArchive","postIsNull","approvalPersonIsNull",
	                 "postMultiPerson","retract","useStatus"];
	for (var idx=0; idx<itemArray.length; idx++) {
		var key = itemArray[idx];
//		console.log("--->>> key="+key);
		if ("titleUpdate"==key || "retract"==key || "useStatus"==key || "doArchive"==key) {
			if (flowReferredData[key]) {
				$("input[name='"+key+"'][value='1']").prop("checked", "checked");
			} else {
				$("input[name='"+key+"'][value='0']").prop("checked", "checked");
			}
		} else {
			$("#" + key).val(flowReferredData[key]);
		}
	}
	participants = flowReferredData.participant;
	showReaderDataForm();//显示可阅读人的信息
}

/**
 * 显示可阅读人的信息
 */
function showReaderDataForm(){
	var readerDataArray = JSON.parse(participants);
	var readerObjArray = new Array();
	if(readerDataArray && readerDataArray.length>=1){
		for(var idx=0; idx<readerDataArray.length; idx++){
			var readerItem = readerDataArray[idx];
			if(readerItem.type == 3){
				readerObjArray.push(readerItem);
			}
		}
	}
	var businessObjectId = $("#businessObjectId").val();
	queryVariableList(businessObjectId);
	var returnList = getDataListAfterPostDataProcess(readerObjArray, businessObjectId);  
	if(returnList && returnList.length>=1){
		returnList = changeArraySort(returnList);
		redrawTBodyOfTable("one", returnList);
	}
}

/**
 * 使用被引用的流程模板来初始化缓存数据
 */
function initCacheDataByReferFlow() {
	var reg = new RegExp(referredFlId,"g");//g,表示全部替换。
	acs_referred = acs_referred.replace(reg,flId);
	if(acs_referred){
		pushDataToStor(acs_referred); 
	}

	var reg = new RegExp(referredFlId,"g");//g,表示全部替换。
	steps_referred = steps_referred.replace(reg,flId);
	if(steps_referred){
		pushDataToStor(steps_referred);	
	}
}

//----------------------------- 引用模板的相关处理方法 end --------------------------------