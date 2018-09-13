/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-17
 */

/**
 * 此文件实现环节信息的新增和编辑功能
 */

//------------------全局变量的定义------------------------------
var acItemData;
var businessObjectId;
var nodeType, nodeLabel;

$(function(){
	
	//$('#_flAcForm').bootstrapValidator(validatorrule);	//初始化表单验证插件
	
	initPageParam(); //初始化参数的处理, 其中设置审批类型放在该方法里面
	
	queryVariableList(businessObjectId); //common_table.js里面定义的
	editorStatus = $.getUrlParam('editorStatus');
	if (editorStatus == 0) {
		$('#_flAcForm').find('input,select,textarea').attr('disabled', true);
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
	//console.info("initPageParam >> nodeType="+nodeType+"; nodeLabel="+nodeLabel);
	if("start"==nodeType||"end"==nodeType){
		$("#name").attr("readonly","readonly");
		$("#code").val(nodeType);
		$("#code").attr("readonly","readonly");
		$("#approverPart").empty();
		$("#aprroverSettingType").empty();
		$("#postMultiPerson_TD1").empty();
		$("#postMultiPerson_TD2").empty();
		$("#approveTypeId").append("<option value='"+nodeType+"'>"+nodeLabel+"</option>");
		$("#approveTypeId").attr("readonly","readonly");
		$("#hiddenPartTwo").hide();
		$("#hiddenPartOne").hide();
		$("#hiddenPartThree").hide();
		$("#hiddenPersonRepeat").hide();
		$("#overdueTR").hide();
		
	}else{
		$("#name").removeAttr("readonly");
		$("#code").removeAttr("readonly");
		queryAndSetApproveType();
		$("#hiddenPartTwo").show();
		$("#hiddenPartOne").show();
		$("#hiddenPartThree").show();
		$("#hiddenPersonRepeat").show();
		$("#overdueTR").show();
		//对于中间节点,默认增加一个code
//		var nodeIdNum = nodeId-4;
//		if(nodeIdNum<1){
//			nodeIdNum = 1;
//		}
//		if(nodeIdNum<10){
//			$("#code").val("N000"+nodeIdNum);
//		}else if(nodeIdNum>=10 && nodeIdNum<100){
//			$("#code").val("N00"+nodeIdNum);
//		}else if(nodeIdNum>=100 && nodeIdNum<1000){
//			$("#code").val("N0"+nodeIdNum);
//		}
		$("#code").val("task_"+nodeId);
	}
	
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
	
	//设置多岗与审批类型连动
	$('#approveTypeId').change(function() {
		if($('#approveTypeId').val() == 'HQ') {
			$("input[name='approveStrategy'][value='3']").attr("checked","checked");
		}
	});
}

/**
 * 设置表单数据,只在fl.ac.html中使用
 */
function setFormValue(nodeId){
	$("#name").val(acItemData.name);
	$("#code").val(acItemData.code);
	var dataCode = acItemData.code;
	if(!dataCode || dataCode==null || dataCode==undefined){
		//增加对直接保存的默认值的处理
//		var nodeIdVal = $("#nodeId").val();
//		var nodeIdNum = nodeIdVal-4;
//		if(nodeIdNum<1){
//			nodeIdNum = 1;
//		}
//		if(nodeIdNum<10){
//			$("#code").val("N000"+nodeIdNum);
//		}else if(nodeIdNum>=10 && nodeIdNum<100){
//			$("#code").val("N00"+nodeIdNum);
//		}else if(nodeIdNum>=100 && nodeIdNum<1000){
//			$("#code").val("N0"+nodeIdNum);
//		}
		$("#code").val("task_"+nodeId);
	}
	
	$("#approveTypeId").val(acItemData.approveTypeId);
	var dataTypeId = acItemData.approveTypeId;
	if(!dataTypeId || dataTypeId==null || dataTypeId==undefined){
		$("#approveTypeId").val("SH");//如果没有值，则设置为默认值SH
	}
	
	$("#remark").val(acItemData.remark);
	  
	var approveValue = acItemData.approveStrategy;
	$("input[name='approveStrategy'][value='"+approveValue+"']").attr("checked",true);
	var postValue = acItemData.postMultiPerson;
	$("input[name='postMultiPerson'][value='"+postValue+"']").attr("checked",true);
	var isAddLabel = acItemData.isAddLabel;
	var addLabelVal = "0";
	if(isAddLabel == "true" || isAddLabel==true){
		addLabelVal = "1";
	}
	var skipValue = acItemData.personRepeatIsSkipped;
	$("input[name='personRepeatIsSkipped'][value='"+skipValue+"']").attr("checked",true);
	
	$("input[name='isAddLabel'][value='"+addLabelVal+"']").attr("checked",true);
	if("1"==isAddLabel){
		$("#approverPart").hide();
		$("#haveApprover").show();
		var isStart = acItemData.isStart;
		console.log("----- isStart="+isStart);
		if(isStart== true){
			isStart = "1";
		}else{
			isStart = "0";
		}
		$("input[name='isStart'][value='"+isStart+"']").attr("checked",true);
	}else{
		$("#approverPart").show();
		$("#haveApprover").hide();
	}
	
	//设置逾期项
	$('#overdueTime').val((acItemData.overdueTime!=null?acItemData.overdueTime:'6'));
	var overdueHandle = acItemData.overdueHandle;
	if(!overdueHandle || overdueHandle==null || overdueHandle==undefined){
		overdueHandle = "0";
	}
	$('#overdueHandle').val(overdueHandle);
	
	$('#postIsNull').val(acItemData.postIsNull!=null?acItemData.postIsNull:'1');
	$('#approvalPersonIsNull').val(acItemData.approvalPersonIsNull!=null?acItemData.approvalPersonIsNull:'1');
}

function approveTypeChange(that){
	var selectedType = $(that).val();
	if(selectedType == "JG"){//如果是校稿环节,则判断是否含有发起人,如果没有发起人,则在第一行添加一个发起人
		var tempDataList = getTableAllTRTDData("one");
		var checkFlag = "NONE";
		if(tempDataList && tempDataList.length>0){
			for(var idx=0; idx<tempDataList.length; idx++){
				var item = tempDataList[idx];
				if(item.participantType == "4" && item.participantScope=="40"){
					checkFlag = "EXIST";
					break;
				}
			}
		}
		
		if(checkFlag == "NONE"){//如果没有发起人,则在第一行添加一个发起人
			addStarterRow("one",0);
		}
	}
}


function addStarterRow(blockIdx,itIdx){
	var tableDataList = getTableAllTRTDData(blockIdx);
	if(tableDataList && tableDataList.length>0){
		console.log("addRow >> tableDataList"+JSON.stringify(tableDataList));
	}
	
	$.each(tableDataList,function(index,singleItem){//遍历mapList的数组数据
		singleItem.sort = singleItem.sort+1;
	});
	var newObj = new Object();
	newObj.blockIdx = blockIdx;
	//新增的对象默认: 角色-本公司
	newObj.sort = itIdx;
	newObj.participantType = "4";
	newObj.participantTypeName = "发起人";
	newObj.participantScope = '40';
	tableDataList.push(newObj);
	//将数组重新排序, 然后绘制表格
	tableDataList = changeArraySort(tableDataList);
	redrawTBodyOfTable(blockIdx, tableDataList);
	$('html').getNiceScroll().show().resize();       //重置纵向滚动条
	singleSelectTR(blockIdx+"_1");
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
 * 查询和设置审批类型
 */
function queryAndSetApproveType(){
	var paramData = {delflag:false, status:true }; //{ delflag:false };
	$.ajax({ //发送更新的ajax请求
	    type: "post",  
	    url: hostUrl+"flow/approveType/queryList",    
	    dataType:"json",  
	    async: false,
	    data: JSON.stringify(paramData),
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	$("#approveTypeId").empty();//首先清空select现在有的内容
            var resultList = data.result;
	    	$.each(resultList,function(index,item){//遍历mapList的数组数据
                $("#approveTypeId").append("<option value='"+item.code+"'>"+item.name+"</option>");
                $("#approveTypeId").val("SH");
	    	});	    	
	    } 
	});
}

/**
 * 处理 环节审批人设置方式radio的选中事件
 * @param idxValue
 */
function settingTypeChange(idxValue){
	if("1" == idxValue){
		$("#haveApprover").hide();
		$("#approverPart").show();
	}else{
		$("#haveApprover").show();
		$("#approverPart").hide();
	}
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var formDataArray = $("#_flAcForm").serializeArray();
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
	
    //获取审批人和抄送人的数据列表  participant  ccPerson
	if("0"==acDto.isAddLabel || false ==acDto.isAddLabel){//0为在模板环节中设置
		if(acDto.acType == '1' || acDto.acType == '3'){
			//console.info("start end环节不需要校验");
		}else{
			var participantList = getSubmitDataListofCommonTable("one", acDto.flId, acDto.id, false);
			if(!participantList || participantList.length<=0){
				pop_tip_open("red","流程模板审批人不能为空!");
				return;
			};
			console.log("开始打印流程模板审批人的信息，共("+participantList.length+")条数据....");
			for(var idx=0; idx<participantList.length; idx++){
				var itemData = participantList[idx];
				console.log(JSON.stringify(itemData));
			}
			acDto.participant = JSON.stringify(participantList);
			//acDto.isStart = undefined;//是否必须指定审批人必须去掉
		}
		
	}
	//console.info("--------------------doSaveFormAction acDto.isAddLabel="+acDto.isAddLabel);
	//console.info(acDto);
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
	$("#_flAcForm").attr("data-validate-success","doSaveFormAction()");
	$("#_flAcForm").submit();	
}
