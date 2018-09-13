var mxBasePath = 'mxgraph/src';
var editor,fl,acs,steps,participants;
var flag=0;
var editorStatus=0;
$(function() {
	window.localStorage.clear(); //清空缓存
	init();
	showReaderDataForm();//显示可阅读人的信息
	queryVariableListForTitleShow();
	$('#_flForm').find('input,select,textarea').attr('disabled',true);

});

/**
 * 初始化
 */
function init() {
	//隐藏设计器和流程仿真
	$('#_designer,#_emulation').hide();		
	resizeEditorHeight();
	$.ajax({
		type : 'get',
		async : false,
		url : hostUrl + "flow/fl/getAll/" + $.getUrlParam('flId'),
		success : function(data) {
			console.log("init() ----->>>flow/fl/getAll/"+$.getUrlParam('flId'));
			console.log(JSON.stringify(data));
			fl = data.result;
			acs = fl.ac;
			steps = fl.step;
			participants = fl.participant;
			initFormData();
			initCacheData();
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
	    async : true,
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
 * 环节、环节连线编辑后的回调函数
 * 
 * @param id  环节/环节连线ID
 * @param label 环节/环节连线label 
 */
function callBack(id,label){
	changeCell(id,label,editor);
}

/**
 * 自适应
 */
$(window).resize(function(){
	resizeEditorHeight();
});

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
//加屏
$(".des-btn").on("click",function(e){
	$("#graph").height($("#graph_box").height()*2);
	e.stopPropagation();
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
	  if(flag==0){
		  editor = new createEditor('config/layouteditor.xml');
		  readGraph(fl.graphXml);
		  flag=1;
	  }

  }else if(label == "流程仿真"){
	  $('#_emulation').show();
	  $('#_base,#_designer').hide();	
  }
  e.stopPropagation();
});