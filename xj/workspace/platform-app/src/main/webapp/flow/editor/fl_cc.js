/**
 * @author: zhangfangzhi
 * @date: 2017-11-20
 */

/**
 * 此文件实现抄送人的新增和编辑功能
 */

//------------------全局变量的定义------------------------------
var acItemData;
var businessObjectId;
var nodeType, nodeLabel;
$(function(){
	initPageParam(); //初始化参数的处理, 其中设置审批类型放在该方法里面
	queryVariableList(businessObjectId); //common_table.js里面定义的
	editorStatus = $.getUrlParam('editorStatus');
	if (editorStatus == 0) {
		$('#_flCcForm').find('input,select,textarea').attr('disabled', true);
	}
});

/**
 * 初始化参数的处理, 其中设置审批类型放在该方法里面
 */
function initPageParam(){
	// 添加浏览器纵向滚动条
	addHtmlScroll();	
	//1-获取节点参数的进行赋值
	var nodeId =  $.getUrlParam('nodeId');
	$("#nodeId").val(nodeId);
	businessObjectId = $.getUrlParam('businessObjectId');
	nodeType = $.getUrlParam('nodeType');
	var index = jQuery.inArray(nodeType, acTypeArr);
	$("#acType").val(index);
	nodeLabel = $.getUrlParam('label');
	if(nodeLabel == '') {
		nodeLabel = '新环节'
	}
	$("#name").val(nodeLabel);
	$("#name").removeAttr("readonly");
	$("#code").removeAttr("readonly");
	$("#code").val("task_"+nodeId);
	
	//2-通过nodeId获取环节的缓存信息
	acItemData = JSON.parse(window.localStorage.getItem(opener.localTemp+ nodeId));
	//console.log("001--通过nodeId获取环节的缓存信息 acItemData="+JSON.stringify(acItemData));
	if(acItemData && acItemData.id){//已经有32位的acid,即修改的情况
		acItemData.flId = opener.flId;
		var acId = acItemData.id;
		//console.log("003--acId="+acId);
		//console.log("004--acItemData.flId="+acItemData.flId);
		$("#id").val(acId);
		setFormValue(nodeId);//设置表单数据
		fetchPersonListAndShow();
	}else{//没有32位的acId则需要设置生成一个ID
		getGuuid("id");
	}
}

/**
 * 设置表单数据,只在fl.cc.html中使用
 */
function setFormValue(nodeId){
	$("#name").val(acItemData.name);
	$("#code").val(acItemData.code);
	var dataCode = acItemData.code;
	if(!dataCode || dataCode==null || dataCode==undefined){
		$("#code").val("task_"+nodeId);
	}
}

/**
 * 从本地的缓存中取出数据，并经过格式转换,以table格式展示
 */
function fetchPersonListAndShow(){
	var ccPersonText = acItemData.ccPerson;
	//console.log("002 fetchPersonListAndShow >>> acItemData.ccPersonText"+acItemData.ccPersonText);
	
	var acIdText = acItemData.id;
	var participantText = acItemData.participant;
	//console.log("002 fetchPersonListAndShow >>> acItemData.participant"+acItemData.participant);
	var ccPersonList;
	if(ccPersonText && ccPersonText.length>0){
		ccPersonList = JSON.parse(ccPersonText);
	}
	var participantList;
	if(participantText && participantText.length>0){
		participantList = JSON.parse(participantText);
	}
	
	//合并两个数组的元素
	var dataList = new Array();
	if(ccPersonList && ccPersonList.length>0){
		$.each(ccPersonList,function(index,item){
			if(acIdText == item.acId){
				dataList.push(item);
			}
		});
	}
	
	if(participantList && participantList.length>0){
		$.each(participantList,function(index,item){
			if(acIdText == item.acId){
				dataList.push(item);
			}
		});
	}
	
	//数据格式化处理,然后以table展示
	var returnList = getDataListAfterPostDataProcess(dataList, businessObjectId);  
	showTableByInitDataList(returnList);
}

/**
 * 根据拿到的初始化处理过的数据,进行table tr td的展示,此方法不通用,需要针对页面进行调整
 * @param initDataList
 */
function showTableByInitDataList(initDataList){
	var dataOneList = new Array();
	var dataTwoList = new Array();
	$.each(initDataList,function(index,item){//遍历resultList的数组数据
		if(item.type==1){
		   dataOneList.push(item);
        } else if(item.type==2){
           dataTwoList.push(item);
        }
	});
	if(dataOneList && dataOneList.length>=1){
		redrawTBodyOfTable("one", dataOneList);
		//showResultTextToLabel("one");
	}
	if(dataTwoList && dataTwoList.length>=1){
		redrawTBodyOfTable("two", dataTwoList);
		//showResultTextToLabel("two");
	}
}

/**
 * 执行提交数据的操作
 */
function doSaveFormCction(){
	var formDataArray = $("#_flCcForm").serializeArray();
	var acDto = {};
	for(var i in formDataArray){
		var name = formDataArray[i].name;
		//需要过滤掉参与人的所有字段
		if(name && name!=undefined && name!=null){
			if( !(""==name || name.startWith('participantId') 
			   || name.startWith('participantScope') || name.startWith('paramValue')
			  || name.startWith('type_') || name.startWith('type_') ) ){
				if (name == "isStart" || name == "isAddLabel") {
					acDto[name] = formDataArray[i].value == "1" ? true : false;
				}else{
					acDto[name]=formDataArray[i].value;
				}
			}
		}
		
	}
	acDto.delflag = false;
	acDto.flId = opener.flId;
	
	acDto.code = $("#code").val();
	acDto.name = $("#name").val();
	
    //获取抄送人的数据列表   ccPerson
	var ccPersonList = getSubmitDataListofCommonTable("two", acDto.flId, acDto.id, false);
	console.log("开始打印流程模板抄送人的信息，共("+ccPersonList.length+")条数据....");
	for(var idx=0; idx<ccPersonList.length; idx++){
		var itemData = ccPersonList[idx];
		console.log(JSON.stringify(itemData));
	}
	console.log("打印流程模板审批人和抄送人的信息结束.........");
	acDto.ccPerson = JSON.stringify(ccPersonList);
	window.localStorage.setItem(opener.localTemp+ acDto.nodeId, JSON.stringify(acDto));
	opener.callBack(acDto.nodeId, acDto.name);
	pop_tip_open("green","保存成功!");
	closeWin();
}
/**
 * 保存表单的数据到本地缓存
 */
function saveForm(){
	$("#_flCcForm").attr("data-validate-success","doSaveFormCction()");
	$("#_flCcForm").submit();	
}
