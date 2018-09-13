var mxBasePath = 'mxgraph/src';
var editor,
	fl,
	acs,
	steps,
	participants,
	flId,
	localTemp;
var editorStatus = 1;
//---------------引用流程模板所需变量 begin ---------------------
var referredFlId = "";
var flowReferredData,
	acs_referred,
	steps_referred,
	participants_referred;
	//---------------引用流程模板所需变量 end ---------------------
//清除localStorage缓存
function clearLocal(){
	var localLength=window.localStorage.length;
	var name;
	var remove=[];
	for(var i=0; i<localLength; i++ ){
		name=window.localStorage.key(i);
		if(name && name.indexOf(localTemp)>=0){
			remove.push(name);
		}
	}
	for(var j=0; j<remove.length; j++ ){
		window.localStorage.removeItem(remove[j]);
	}
}
$(function() {
	//清空缓存
//	window.localStorage.clear();
	flId = $.getUrlParam('flId');
	if(!flId){
		flId = getGuuid("id");
	}
	localTemp="flModel_"+flId+"_";
	clearLocal();
	//获取业务变量列表
	var variableListDef = initVariableListByBusinessObjectId();
	//初始化
	init(variableListDef);

	//初始化仿真业务表单字段列表
	initVariableFormForEmulation(variableListDef);
	$('#publishBtn').on('click', function() {
		$('#button1').click();
		$('#_flForm').attr('data-validate-success', 'publish()');
		$('#_flForm').submit();

	});

	$('#tempSaveBtn').on('click', function() {
		$('#button1').click();
		$('#_flForm').attr('data-validate-success', 'tempSave()');
		$('#_flForm').submit();
	});

	//流程仿真清除参数值
	$('#clearEmulationBusiFormBtn').on('click',function () {
		$('#_emulationBusiForm')[0].reset();
		$('#business_object_name').val($('#businessObjectName').val());
	});

	//仿真按钮点击事件
	$('#_emulationBtn').on('click',function () {
		//$('#_emulationBusiForm').attr('data-validate-success', 'flowEmulation()');
		flowEmulation();
	});

	var isDefault = $.xljUtils.getUrlParams().isDefault;
	if(isDefault){
		$('#isDefualt').val(isDefault);
	}
});

//根据名称获取url参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if(!window.location.search) return null;
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
//模板状态
var flStatus= getUrlParam("flStatus");//2新增，1修改；（暂存之后改为1）
/**
 * 初始化
 */
function init(variableListDef) {
	//模板查询
	if ($.getUrlParam("flStatus") == 0) {
		$("#button1").addClass("active");
		$('#_base').show();
		$('#_designer,#_emulation').hide();
		//隐藏多余按钮
		$("#publishBtn").hide();
		$("#tempSaveBtn").hide();
		$("#yylc").hide();
		resizeEditorHeight();
		editor = new createEditor('config/layouteditor.xml');
		$.ajax({
			type : 'get',
			async : false,
			url : hostUrl + "flow/fl/getAll/" + $.getUrlParam('flId') + "?time=" + new Date().getTime(),
			success : function(data) {
				fl = data.result;
				acs = fl.ac;
				steps = fl.step;
				participants = fl.participant;
				initFormData();
				initCacheData();
				readGraph(fl.graphXml);
			},
			error : function(xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
		//显示可阅读人的信息
		showReaderDataForm();
		$.when(variableListDef).done(function (variableList) {
			queryVariableListForTitleShow(variableList);
		});

		$('#_flForm').find('input,select,textarea').attr('disabled', true);
	}
	//模板修改
	else if ($.getUrlParam("flStatus") == 1) {
		$("#code").attr("disabled",true);//编码不可修改
		$("#button1").removeClass("active");
		$("#button2").addClass("active");
		$('#_designer').show();
		$('#_base,#_emulation').hide();
		// 添加浏览器纵向滚动条
		addHtmlScroll();
		editor = new createEditor('config/layouteditor.xml');
		$.ajax({
			type : "get",
			async : false,
			url : hostUrl + "flow/fl/getAll/" + $.getUrlParam("flId")+ "?time=" + new Date().getTime(),
			success : function(data) {
				fl = data.result;
				acs = fl.ac;
				steps = fl.step;
				participants = fl.participant;
				initFormData();
				initCacheData();
				readGraph(fl.graphXml);
			},
			error : function(xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
		$.when(variableListDef).done(function (variableList) {
			queryVariableListForTitleShow(variableList);
		});
		//设置画布编辑器高度
		resizeEditorHeight();
		//显示可阅读人的信息
		showReaderDataForm();
	}
	else if ($.getUrlParam("flStatus") == 2) {
		$("#button1").addClass("active");
		$('#_base').show();
		$('#_designer,#_emulation').hide();
		//隐藏设计器和流程仿真
		$('#_designer,#_emulation').hide();
//		flId = getGuuid("id");
		var date = new Date();
		$("#appId").val($.getUrlParam('appId'));
		$("#businessObjectId").val($.getUrlParam('businessObjectId'));
		$("#businessObjectName").val($.getUrlParam('businessObjectName'));
		$("#version").val(date.format("yyyyMMddHHmmss"));
		$("#sort").val(date.format("yyyyMMddHHmmss"));
		//新建时初始化默认标题
		
		$.when(variableListDef).done(function (variableList) {
			initDefualtTitle(variableList);
		});
		setTimeout(function() {
			editor = new createEditor('config/layouteditor.xml', 'new');
		}, 3000);
		resizeEditorHeight();
	}
	var code=$("#code").val();
	$("#oldCode").val(code);
}


/**
 * 初始化表单数据
 */
function initFormData() {
	for (var key in fl) {
		if ("titleUpdate" == key || "retract" == key || "useStatus" == key || "doArchive" == key) {
			if (fl[key]) {
				$("input[name='" + key + "'][value='1']").prop("checked", "checked");
			} else {
				$("input[name='" + key + "'][value='0']").prop("checked", "checked");
			}
		} else {
			//$("#" + key).val(fl[key]);
			var val = fl[key];
			if(key=='name'||key == 'businessObjectName'){
				val = $.xljUtils.htmlDecode(fl[key]);
			}
			$("#" + key).val(val);
		}
	}
	flId = getGuuid("id");
	
	var date = new Date();
	$("#version").val(date.format("yyyyMMddHHmmss"));
}

/**
 * 查询相关的业务变量数据列表
 */
function queryVariableListForTitleShow(variableList) {

	//var variableList = data.result;
	$('body').data('variableList',variableList);
	var flowTitle = $("#flowTitle").val();
	//@cmp_e455391a-71ce-4f64-8e70-c06f5cbbbf61@-@cmp_f0a2894d-bf30-4ebc-8c03-f3e21c086790@-@cmp_3c82ede3-7277-49d1-874a-e268f4ac90f5@
	var itemArray = flowTitle.split("@-@");
	var reg = new RegExp("@", "g"); //g,表示全部替换。
	var titleShowText = "";
	var newFlowTitle = "";
	var variableObjJson = {};
	for (var idx = 0; idx < itemArray.length; idx++) {
		var variableId = itemArray[idx];
		variableId = variableId.replace(reg, "");
		var variableName = getVariableNameFromList(variableId, variableList);
		if (variableName && variableName.length > 0) { //这是流程变量没有被删除掉的情况
			titleShowText += "@" + variableName + "@-";
			newFlowTitle += "@" + variableId + "@-";
		}
		variableObjJson[itemArray[idx].code] = itemArray[idx].name;
	}
	$('body').data('variableObjJson',variableObjJson);
	titleShowText = titleShowText.substr(0, titleShowText.length - 1);
	newFlowTitle = newFlowTitle.substr(0, newFlowTitle.length - 1);
	$("#flowTitleShow").val(titleShowText);
	$("#flowTitle").val(newFlowTitle);
}

/**
 * 初始化默认变量
 * @param businessObjectId
 */
function initVariableListByBusinessObjectId() {
	var def = new $.Deferred();
	var paramData = {
		businessObjectId : $.getUrlParam('businessObjectId'),
		delflag : false,
		sord:'asc',
		sidx:'sort'
	};
	$.ajax({ //发送更新的ajax请求
		type : "post",
		url : hostUrl + "flow/businessObjectVariable/queryList",
		dataType : "json",
		//async : false,
		data : JSON.stringify(paramData), //将对象序列化成JSON字符串  ,
		contentType : 'application/json;charset=utf-8', //设置请求头信息
		success : function(data) {
			if(data.success){
				var variableList = data.result;
				def.resolve(variableList);
			}

		},
		error : function(data) {

		}
	});

	return def.promise();
}

/**
 * 初始化默认标题
 * @param variableList
 */
function initDefualtTitle(variableList){
	if(variableList){
		var defualtTitleObj = {};
		var variableObjJson = {};
		for (var i = 0; i < variableList.length; i++) {
			var obj = variableList[i];
			if(obj.code=='business_object_name'||obj.code=='flow_business_company_name'||obj.code=='start_user_name'){
				defualtTitleObj[obj.code] = obj.name;
			}
			variableObjJson[obj.code] = obj.name;
		}
		$('body').data('variableObjJson',variableObjJson);

		var defualtTitle = '';
		var defualtTitleCode = '';
		if(defualtTitleObj['business_object_name']){
			defualtTitle += '@'+defualtTitleObj['business_object_name'] +'@-';
			defualtTitleCode += '@business_object_name@-';
		}
		if(defualtTitleObj['flow_business_company_name']){
			defualtTitle += '@'+defualtTitleObj['flow_business_company_name'] +'@-';
			defualtTitleCode += '@flow_business_company_name@-';
		}
		if(defualtTitleObj['start_user_name']){
			defualtTitle += '@'+defualtTitleObj['start_user_name'] +'@-';
			defualtTitleCode += '@start_user_name@-';
		}

		if(defualtTitle.lastIndexOf('-')!=-1){
			defualtTitle = defualtTitle.substring(0,defualtTitle.lastIndexOf('-'));
		}
		if(defualtTitleCode.lastIndexOf('-')!=-1){
			defualtTitleCode = defualtTitleCode.substring(0,defualtTitleCode.lastIndexOf('-'));
		}

		$('#flowTitleShow').val(defualtTitle);
		$('#flowTitle').val(defualtTitleCode);
	}
}

/**
 * 初始化流程仿真业务变量列表
 */
function initVariableFormForEmulation(variableListDef) {
	$.when(variableListDef).done(function (variableList) {
		if(variableList) {
			var flowFixVariable = ['flow_business_company_id','flow_business_company_name','flow_business_dept_id','flow_business_dept_name',
				'start_user_id','start_user_name','business_object_name','flow_business_project_name','flow_business_project_branch_name'];
			var flowFixRequiredVariable = ['flow_business_company_name','flow_business_dept_name','start_user_name','business_object_name'];
			var _emulationBusinessFormTable = $('#_emulationBusiForm table');
			var tbodyObj = $('<tbody></tbody>');
			for (var i = 0; i < variableList.length; i++) {
				var obj = variableList[i];
				var name = obj.name;
				if(name.lastIndexOf('ID')!=-1||name.lastIndexOf('_id')!=-1){
					continue;
				}
				var code = obj.code;
				var trObj = $('<tr class="form-tr"></tr>');
				var nameTdObj = '';
				var isRequired = false;
				if($.inArray(code,flowFixRequiredVariable)==-1){
					nameTdObj = $('<td><label>'+name+'</label></td>');
				}else{
					isRequired = true;
					nameTdObj = $('<td><label><span>*</span>'+name+'</label></td>');
				}
				var operTdObj = $('<td><label>等于</label></td>');
				var type = obj.type;
				var validateRule;
				switch (type){
					case '2':
						validateRule = 'data-digits="true"';
						break;
					case '3':
						validateRule = 'data-number="true"';
						break;

					case '5':
						validateRule = 'data-date="true"';
						break;
				}

				var codeTdObj = $('<td>' +
					'<div class="input-group form-date">' +
					'<input type="text" id="'+code+'" class="form-control" data-fieldtype="'+obj.type+'" data-required="'+isRequired+'" data-placeholder="'+name+'" '+(validateRule?validateRule:'')+' name="'+code+'">' +
					'</div>' +
					'</td>');
				if(code=='business_object_name'){
					codeTdObj.find('input').val($('#businessObjectName').val());
					codeTdObj.find('input').attr('readonly','readonly');
				}
				var addonSpan = $('<span class="input-group-addon w28" ><a href="javascript:void(0);" class="fa fa-ellipsis-h" aria-hidden="true"></a></span>');
				var removeSpan = $('<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>');
				var orgType = '';
				var tipMsg = '';
				var targetId = '';
				if(code=='flow_business_company_name'){
					orgType = 'company';
					var hideInput = $('<input type="hidden" id="flow_business_company_id" name="flow_business_company_id">');
					targetId = 'flow_business_company_id';
					codeTdObj.find('input').attr('readonly','readonly');
					codeTdObj.find('div').append(removeSpan);
					codeTdObj.find('div').append(addonSpan);
					codeTdObj.find('div').append(hideInput);
				}
				if(code=='flow_business_dept_name'){
					orgType = 'dept';
					var hideInput = $('<input type="hidden" id="flow_business_dept_id" name="flow_business_dept_id">');
					targetId = 'flow_business_dept_id';
					codeTdObj.find('input').attr('readonly','readonly');
					codeTdObj.find('div').append(removeSpan);
					codeTdObj.find('div').append(addonSpan);
					codeTdObj.find('div').append(hideInput);
				}
				if(code=='flow_business_project_name'){
					orgType = 'group';
					var hideInput = $('<input type="hidden" id="flow_business_project_id" name="flow_business_project_id">');
					targetId = 'flow_business_project_id';
					codeTdObj.find('input').attr('readonly','readonly');
					codeTdObj.find('div').append(removeSpan);
					codeTdObj.find('div').append(addonSpan);
					codeTdObj.find('div').append(hideInput);
				}
				if(code=='flow_business_project_branch_name'){
					orgType = 'branch';
					var hideInput = $('<input type="hidden" id="flow_business_project_branch_id" name="flow_business_project_branch_id">');
					targetId = 'flow_business_project_branch_id';
					codeTdObj.find('input').attr('readonly','readonly');
					codeTdObj.find('div').append(removeSpan);
					codeTdObj.find('div').append(addonSpan);
					codeTdObj.find('div').append(hideInput);
				}
				tipMsg = '请选择'+name;
				if(code=='start_user_name'){
					var hideInput = $('<input type="hidden" id="start_user_id" name="start_user_id">');
					targetId = 'start_user_id';
					codeTdObj.find('input').attr('readonly','readonly');
					codeTdObj.find('div').append(removeSpan);
					codeTdObj.find('div').append(addonSpan);
					codeTdObj.find('div').append(hideInput);
					addonSpan.xljSingleSelector({
						title:tipMsg,//选择器标题，默认是'选择组织机构'
						selectorType:"person",//选择器类型，默认是组织机构选择器
						targetId:targetId,
						targetName:code
					});
				}else{
					addonSpan.xljSingleSelector({
						treeUrl:hostUrl + '/sys/org/root/getOrgTreeByType'+'?time='+Math.random(),
						treeParam:{
							'rootDelFlag':'0',
							'rootStatus' :'1',
							'orgDelFlag':'0',
							'orgStatus':'1',
							'type':orgType
						},
						selectNodeType:{
							"type":orgType,
							"msg":tipMsg
						},
						title:tipMsg,//选择器标题，默认是'选择组织机构'
						selectorType:"org",//选择器类型，默认是组织机构选择器
						targetId:targetId,
						targetName:code
					});
				}

				removeSpan.on('click',function () {
					$(this).siblings('input').val('');
				});
				trObj.append(nameTdObj);
				trObj.append(operTdObj);
				trObj.append(codeTdObj);

				tbodyObj.append(trObj);
			}
			_emulationBusinessFormTable.append(tbodyObj);

		}
	});

}

function getVariableNameFromList(dataId, dataList) {
	var name = "";
	for (var idx = 0; idx < dataList.length; idx++) {
		var item = dataList[idx];
		if (item.code == dataId) {
			name = item.name;
			break;
		}
	}
	return name;
}

/**
 * 打开选择默认标题配置页面
 */
function openToSelectVariable() {
	var objectId = $("#businessObjectId").val();
	var objectName = $("#businessObjectName").val();
	openWin(encodeURI("fl_variable.html?objectId=" + objectId + "&objectName=" + objectName));
}

/**
 * 从新页面返回来的数据
 * @param showTitle
 * @param hiddenTitleId
 */
function setNewTitleVariable(showTitle, hiddenTitleId) {
	$("#flowTitleShow").val(showTitle);
	$("#flowTitle").val(hiddenTitleId);
}

/**
 * 为子页面提供数据
 * @returns
 */
function getOldTitleVariable() {
	return $("#flowTitle").val();
}

/**
 * 显示可阅读人的信息
 */
function showReaderDataForm() {
	var readerDataArray = JSON.parse(participants);
	var readerObjArray = new Array();
	if (readerDataArray && readerDataArray.length >= 1) {
		for (var idx = 0; idx < readerDataArray.length; idx++) {
			var readerItem = readerDataArray[idx];
			if (readerItem.type == 3) {
				readerObjArray.push(readerItem);
			}
		}
	}
	var businessObjectId = $("#businessObjectId").val();
	queryVariableList(businessObjectId);
	var returnList = getDataListAfterPostDataProcess(readerObjArray, businessObjectId);
	if (returnList && returnList.length >= 1) {
		returnList = changeArraySort(returnList);
		redrawTBodyOfTable("one", returnList);
	//showResultTextToLabel("one");
	}
}
/**
 * 初始化缓存数据
 */
function initCacheData() {
	if (acs) {
		pushDataToStor(acs);
	}
	if (steps) {
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
	var flDto = {
		"status" : status,
		"delflag" : false
	};
	var acArr = new Array();
	var stepArr = new Array();
	var xmlDoc = $.parseXML(getGraph(editor));

	parseXML(xmlDoc, "mxGraphModel root Start", acArr);
	parseXML(xmlDoc, "mxGraphModel root End", acArr);
	parseXML(xmlDoc, "mxGraphModel root Task", acArr);
	//	console.log("001 acArrr="+JSON.stringify(acArr));
	parseXML(xmlDoc, "mxGraphModel root Fork", acArr);
	parseXML(xmlDoc, "mxGraphModel root Join", acArr);
	parseXML(xmlDoc, "mxGraphModel root Connector", stepArr);

	var flBaseArr = $("#_flForm").serializeArray();
	for (var i in flBaseArr) {
		var name = flBaseArr[i].name;
		if (name && name != undefined && name != null) {
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
	flDto.oldCode = $("#oldCode").val();
	flDto.name = $("#name").val();
	flDto.remark = $("#remark").val();
	var flowTitleShow = $("#flowTitleShow").val();
	flDto.sort = $("#sort").val();

	var checkResult = checkActivityCodeIsRepeated(acArr);
	if (checkResult && checkResult.length > 5) {
		pop_tip_open("blue", checkResult);
		return;
	}

	flDto.participant = JSON.stringify(getSubmitDataListofCommonTable("one", flDto.id, -1, true));
	//	console.log("001 flDto.participant>>>="+flDto.participant);
	flDto.ac = JSON.stringify(acArr);
	//	console.log("002 flDto.ac>>>="+flDto.ac);
	flDto.step = JSON.stringify(stepArr);
	//	console.log("003 flDto.step>>>="+flDto.step);
	return submitData(flDto, status);
}

/**
 * 流程仿真计算
 */
function flowEmulation() {
	//验证仿真业务表单必填项
	$.xljUtils.customSingleValidate($('#_emulationBusiForm')[0]);
	if(!$('#_emulationBusiForm').valid()){
		return;
	}

	//先暂存
	$('#button1').click();
	//$('#_flForm').attr('data-validate-success', 'excuEmulation()');
	//$('#_flForm').submit();
	if(!$('#_flForm').valid()){
		return;
	}

	var submitFlDataDef = save('0');
	$.when(submitFlDataDef).done(function (saveFlag) {
		if(saveFlag){
			excuEmulation();
		}
	});
}

/**
 * 向后台请求仿真执行
 */
function excuEmulation() {
	var formDatas = $('#_emulationBusiForm').serializeArray();
	var variableJson = {};
	$.each(formDatas,function (i,formData) {
		var fieldType = $('#'+formData.name).attr('data-fieldtype');
		if(fieldType=='2'&&formData.value!=''){
			variableJson[formData.name]=parseInt(formData.value);
		}else if(fieldType=='3'&&formData.value!=''){
			variableJson[formData.name]=parseFloat(formData.value);
		}else{
			variableJson[formData.name]=formData.value;
		}

	});
	var paramData = {};
	paramData.businessVariableJson = JSON.stringify(variableJson);
	paramData.flId = $('#id').val();
	paramData.businessObjectId = $.xljUtils.getUrlParams().businessObjectId;

	$.ajax({ //发送更新的ajax请求
		type : "post",
		url : hostUrl + "flow/emulation",
		dataType : "json",
		//async : false,
		data : JSON.stringify(paramData), //将对象序列化成JSON字符串  ,
		contentType : 'application/json;charset=utf-8', //设置请求头信息
		success : function(data) {
			if(data.success){
				$('#flEmulationBtn').click();
				var approvalList = data.result;
				console.info(approvalList);
				var tbodyObj = $('<tbody></tbody>');
				var theader = $('<tr class="form-tr" style="background: #46A7FF;">'+
					'<td style="width: 5%; text-align: center; font-weight: bold">序号</td>'+
					'<td style="width: 15%; text-align: center; font-weight: bold">节点名称</td>'+
					'<td style="width: 15%; text-align: center; font-weight: bold">岗位</td>'+
					'<td style="width: 15%; text-align: center; font-weight: bold">责任人</td>'+
					'<td style="width: 15%; text-align: center; font-weight: bold">操作</td>'+
					'<td style="width: 15%; text-align: center; font-weight: bold">处理意见</td>'+
					'</tr>');
				tbodyObj.append(theader);

				var acIdArr = [];
				var num = 0;
				var repeatAcIdNumJson = {};

				var postIdArr = [];
				var postNum = 0;
				var repeatPostIdNumJson = {};

				for (var i = 0; i < approvalList.length; i++) {
					var obj = approvalList[i];
					var acId = obj.acId;


					var setApproverWhenStart = obj.setApproverWhenStart;


					var nodeName = obj.acName;
					var postId = obj.postId;
					var postName = obj.postName;
					var approverName = obj.approverName;
					if(setApproverWhenStart&&!postName){
						postName = '无岗位';
						approverName = '手选责任人';
					}else if(!setApproverWhenStart&&!postName){
						postName ='无岗位';
						approverName ='无';
					}

					if(obj.acType=='3'){
						postName ='';
						approverName ='';
					}

					if(!postName){
						postName = '';
					}

					if(!approverName || approverName=='null'){
						approverName = '';
					}

					var approvalType = obj.approvalType;

					var trObj = $('<tr class="form-tr" data-acid="'+acId+'"></tr>');
					var numTd = $('<td style="width: 5%; text-align: center;">'+(num+1)+'</td>');
					var nodeNameTd = $('<td style="width: 15%; text-align: center;">'+nodeName+'</td>');
					var postNameTd = $('<td style="width: 15%; text-align: center;">'+postName+'</td>');
					var approverNameTd = $('<td style="width: 15%; text-align: center;">'+approverName+'</td>');
					var approvalTypeTd = $('<td style="width: 15%; text-align: center;"></td>');
					var opinionTd = $('<td style="width: 15%; text-align: center;"></td>');
					var repeatAcIdNum = repeatAcIdNumJson[acId];
					//计算同一节点，合并同一个节点的序号、节点名称
					if($.inArray(acId,acIdArr)==-1){
						trObj.append(numTd);
						trObj.append(nodeNameTd);
						//trObj.append(postNameTd);

						acIdArr.push(acId);
						num++;
					}else{
						if(!repeatAcIdNum){
							repeatAcIdNum = 2;
						}else{
							repeatAcIdNum++;
						}
						repeatAcIdNumJson[acId] = repeatAcIdNum;

						var oldTds = tbodyObj.find('tr[data-acid="'+acId+'"] td');
						if(repeatAcIdNum){
							$(oldTds[0]).attr('rowspan',repeatAcIdNum);
							$(oldTds[1]).attr('rowspan',repeatAcIdNum);
							//$(oldTds[2]).attr('rowspan',repeatAcIdNum);
						}
					}

					var repeatPostIdNum = repeatPostIdNumJson[acId+'/'+postId];
					if($.inArray(acId+'/'+postId,postIdArr)==-1){
						postNameTd.attr("data-postid",acId+'-'+postId);
						trObj.append(postNameTd);
						postIdArr.push(acId+'/'+postId);
						postNum++;
					}else{
						if(!repeatPostIdNum){
							repeatPostIdNum = 2;
						}else{
							repeatPostIdNum++;
						}
						repeatPostIdNum[acId+'/'+postId] = repeatPostIdNum;

						var oldTds = tbodyObj.find('td[data-postid="'+(acId+'-'+postId)+'"]');
						if(repeatPostIdNum){
							//$(oldTds[0]).attr('rowspan',repeatAcIdNum);
							//$(oldTds[1]).attr('rowspan',repeatAcIdNum);
							$(oldTds).attr('rowspan',repeatPostIdNum);
						}

					}

					//trObj.append(postNameTd);
					trObj.append(approverNameTd);
					trObj.append(approvalTypeTd);
					trObj.append(opinionTd);

					tbodyObj.append(trObj);
				}

				$('#_emulationList tbody').empty();
				$('#_emulationList tbody').append(tbodyObj.html());
			}

		},
		error : function(data) {

		}
	});
}

function checkActivityCodeIsRepeated(activityList) {
	var checkResult = "";
	var codeArray = new Array();
	var nameArray = new Array();
	if (activityList && activityList.length > 0) {
		for (var idx1 = 0; idx1 < activityList.length - 1; idx1++) {
			var activity1 = activityList[idx1];
			for (var idx2 = idx1 + 1; idx2 < activityList.length; idx2++) {
				var activity2 = activityList[idx2];
				if (activity1.code == activity2.code) {
					var codeText = activity1.code;
					if (activity1.code && activity1.code != undefined && activity2.code && activity2.code != undefined) {
						var checkIdx = $.inArray(codeText, codeArray);
						if (checkIdx >= 0) { //数据组已经有数据
							var tempArray = nameArray[checkIdx]; //取出nameArray
							if ($.inArray(activity1.name, tempArray) == -1) {
								tempArray.push(activity1.name);
							}
							if ($.inArray(activity2.name, tempArray) == -1) {
								tempArray.push(activity2.name);
							}
							nameArray[checkIdx] = tempArray;
						} else { //数据组没有数据
							codeArray.push(codeText);
							nameArray.push([ activity1.name, activity2.name ]);
						}
					}
				}
			}
		}
	}

	if (codeArray && codeArray.length > 0) {
		for (var idx = 0; idx < codeArray.length; idx++) {
			var codeText = codeArray[idx];
			var nameItems = nameArray[idx];
			checkResult += "编码 " + codeText + " 重复环节: " + nameItems.join("、 ") + ";<br/>";
		}
	}

	return checkResult;
}
/**
 * 编辑器自适应
 */
$(window).resize(function() {
	resizeEditorHeight();
});

/**
 * 提交表单数据
 * 
 * @param json 表单数据的JSON对象
 * @param status 保存状态
 */
function submitData(json, status) {
	var submitFlDataDef = new $.Deferred();
	//编码重复校验
	if(flStatus == 2 && !checkFlowCode()) {
		$.xljUtils.tip("blue","流程模板的编码("+$("#code").val()+")重复！");
		return;
	}
	
	if ($("#name").val() == '') {
		$.xljUtils.tip("blue", "名称不能为空！");
		return;
	}
	if ($("#flowTitleShow").val() == '') {
		$.xljUtils.tip("blue", "默认标题不能为空！");
		return;
	}
	if ($("#sort").val() == '') {
		$.xljUtils.tip("blue", "排序号不能为空！");
		return;
	}
	$.ajax({
		url : hostUrl + "flow/fl/saveAll",
		data : JSON.stringify(json),
		type : 'POST',
		contentType : 'application/json',
		dataType : 'JSON',
		beforeSend: function() {
			if(status == '0') {
				$('#tempSaveBtn').attr('disabled', 'disabled');
				
			} else if(status == '1') {
				$('#publishBtn').attr('disabled', 'disabled');
			}
		},
		complete: function() {
			if(status == '0') {
				$('#tempSaveBtn').removeAttr('disabled');
				
			} else if(status == '1') {
				$('#publishBtn').removeAttr('disabled');
			}			
		},
		success : function(data) {
			if (data) {
				var successFlag = data.success;
				var result = data.result;
				var msg = data.msg;
				if (successFlag) {
					if ("0" == status) {
						pop_tip_open("green", "暂存成功！");
						if (window.opener != null && window.opener._flListGrid != null) {
							window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");							
						}
						flStatus = 1;//模板状态改为：修改
						$("#code").attr("disabled",true);
					} else {
						pop_tip_open("green", "发布成功！");
						if (window.opener != null && window.opener._flListGrid != null) {
							window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");							
						}
						closeWin();
					}

					submitFlDataDef.resolve(true);
				} else {
					if ("0" == status) {
						pop_tip_open("red", "暂存失败！");
						
					} else {
						pop_tip_open("red", "发布失败！");
					}
					submitFlDataDef.resolve(false);
				}
			}
		},
		error : function(xhr) {
			$.xljUtils.getError(xhr.status);
			submitFlDataDef.resolve(false);
		}
	});

	return submitFlDataDef.promise();
}

/**
 * 校验模板编码是否存在
 */
function checkFlowCode(){
	var result = true;
	$.ajax({
		url : hostUrl + "flow/fl/queryFlList",
		data : "{\"code\":\"" + $("#code").val() + "\"}",
		type : 'POST',
		async:false,
		contentType : 'application/json',
		dataType : 'JSON',
		success : function(data) {
			if (data) {
				var dataRes = data.result;
//				console.log(dataRes);
				if(dataRes.list != null && dataRes.list.length > 0) {
					result = false;
				}
			}
		},
		error:function(xhr){
			$.xljUtils.getError(xhr.status);
		}
	});
	return result;
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
function callBack(id, label) {
	changeCell(id, label, editor);
}

/**
 * 编辑器自适应
 */
$(window).resize(function() {
	resizeEditorHeight();
});
//加屏
$(".des-btn").on("click", function(e) {
	$("#graph").height($("#graph_box").height() * 2);
	e.stopPropagation();
});
/**
 * 多页签切换
 */
$(".addPad button").on("click", function(e) {
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	var label = $(this).html();
	if (label == "基本信息") {
		$('#_base').show();
		$('#_designer,#_emulation').hide();
	} else if (label == "设计流程") {
		$('#_designer').show();
		$('#_base,#_emulation').hide();
	} else if (label == "流程仿真") {
		$('#_emulation').show();
		$('#_base,#_designer').hide();
	}
	$('html').getNiceScroll().show().resize(); //重置纵向滚动条  
	e.stopPropagation();
});

//----------------------------- 引用模板的相关处理方法 begin --------------------------------
/**
 * 引用其他流程
 */
function reference() {
	openWin(encodeURI("fl_reference.html"));
}

/**
 * 加载被引用的模板信息
 * @param returnFlId
 */
function loadReferredFlowInfo(returnFlId) {
	referredFlId = returnFlId;
	//查询被引用模板的详细信息
	initByReferredFlId();
}

/**
 * 根据引用模板ID来初始化第二个页签的数据
 */
function initByReferredFlId() {
	//清空缓存
//	window.localStorage.clear();
	clearLocal();
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
			initFormDataByReferFlow(); //使用被引用的流程模板来初始化表单数据
			initCacheDataByReferFlow();
			readGraph(flowReferredData.graphXml);
			changeForkLineName();//改变条件链接线名称
			//设置画布编辑器高度
			resizeEditorHeight();
		},
		error : function(xhr) {
			$.xljUtils.getError(xhr.status);
		}
	});
}

//流程配置-引用其他流程：引用后，分支条件匹配不到的，不要显示变量已删除，直接就去掉分支条件
function changeForkLineName() {
	var flowDatas = window.localStorage;
	if(flowDatas){
		var variableObjJson = $('body').data('variableObjJson');
		var variableCodeArr = [];
		var variableNameArr = [];
		if(variableObjJson){
			for(var variableItem in variableObjJson){
				variableCodeArr.push(variableItem);
				variableNameArr.push(variableObjJson[variableItem]);
			}
		}
		for(var item in flowDatas){
			if(item.indexOf(localTemp)>=0){
				var obj = JSON.parse(flowDatas[item]);
				var flag = true;
				if(obj.conditionExpression&&obj.conditionExpression!=''){
					flag = regVariable(obj.conditionExpression,variableCodeArr);
				}
				if(!flag){
					if(obj.conditionTranslation&&obj.conditionTranslation!=''){
						flag = regVariable(obj.conditionTranslation,variableNameArr);
					}
					if(!flag){
						obj.conditionExpression = undefined;
						obj.conditionTranslation = undefined;
						obj.name = undefined;
						window.localStorage.setItem(localTemp+ obj.nodeId, JSON.stringify(obj));
						callBack(obj.nodeId,'');
					}
				}

			}
		}
	}
}

//流程配置-引用其他流程：引用后，分支条件匹配不到的，不要显示变量已删除，直接就去掉分支条件
//匹配条件表达式，如有未匹配上的则返回false
function regVariable(expression,variableArr) {
	if(!expression||$.trim(expression)==''){
		return '';
	}
	var reg = /\[(.+?)\]/g;
	var matchArr = expression.match(reg);
	var flag = true;
	for (var i = 0; i < matchArr.length; i++) {
		var expressionName = matchArr[i];
		expressionName = expressionName.replace('[','').replace(']','');
		if($.inArray(expressionName,variableArr)==-1){
			flag = false;
			break;
		}
	}

	return flag;
}

function initFormDataByReferFlow() {
	var itemArray = [ "remark", "approvalRepeat", "doArchive", "postIsNull", "approvalPersonIsNull",
		"postMultiPerson", "retract", "useStatus" ];
	for (var idx = 0; idx < itemArray.length; idx++) {
		var key = itemArray[idx];
		//		console.log("--->>> key="+key);
		if ("titleUpdate" == key || "retract" == key || "useStatus" == key || "doArchive" == key) {
			if (flowReferredData[key]) {
				$("input[name='" + key + "'][value='1']").prop("checked", "checked");
			} else {
				$("input[name='" + key + "'][value='0']").prop("checked", "checked");
			}
		} else {
			$("#" + key).val(flowReferredData[key]);
		}
	}
	
	participants = flowReferredData.participant;
	showReaderDataForm(); //显示可阅读人的信息
}

/**
 * 显示可阅读人的信息
 */
function showReaderDataForm() {
	var readerDataArray = JSON.parse(participants);
	var readerObjArray = new Array();
	if (readerDataArray && readerDataArray.length >= 1) {
		for (var idx = 0; idx < readerDataArray.length; idx++) {
			var readerItem = readerDataArray[idx];
			if (readerItem.type == 3) {
				readerObjArray.push(readerItem);
			}
		}
	}
	var businessObjectId = $("#businessObjectId").val();
	queryVariableList(businessObjectId);
	var returnList = getDataListAfterPostDataProcess(readerObjArray, businessObjectId);
	if (returnList && returnList.length >= 1) {
		returnList = changeArraySort(returnList);
		redrawTBodyOfTable("one", returnList);
	}
}

/**
 * 使用被引用的流程模板来初始化缓存数据
 */
function initCacheDataByReferFlow() {
	var reg = new RegExp(referredFlId, "g"); //g,表示全部替换。
	acs_referred = acs_referred.replace(reg, flId);
	if (acs_referred) {
		pushDataToStor(acs_referred);
	}

	var reg = new RegExp(referredFlId, "g"); //g,表示全部替换。
	steps_referred = steps_referred.replace(reg, flId);
	if (steps_referred) {
		pushDataToStor(steps_referred);
	}
}
/**
 * 替换特殊字符
 * @param e
 */
function replaceChar(e){
	if(e.value && ( e.value.indexOf("'")>0 || e.value.indexOf("\\")>0)){
		pop_tip_open("blue", "不可输入' 或 \\");
		e.value=e.value.replace(/['|\\]/g,'');
	}
}
//----------------------------- 引用模板的相关处理方法 end --------------------------------