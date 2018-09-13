var instanceAcDto = {"acType":"2"};
var nodeName, nodeCode, position, srcRowIndex, interval;
var businessObjectId;
$(function(){
	initPageParam(); //初始化参数的处理, 其中设置审批类型放在该方法里面
	queryApproveType();
});

/**
 * 初始化参数的处理, 其中设置审批类型放在该方法里面
 */
function initPageParam(){
	addHtmlScroll();	
	instanceAcDto.id = getGuuid();
	instanceAcDto.fiId = $.getUrlParam('instanceId');
	position = $.getUrlParam('position');
	srcRowIndex = $.getUrlParam('srcRowIndex');
	interval = $.getUrlParam('interval');
	nodeName = $.getUrlParam('name');
	nodeCode = $.getUrlParam('code');
	$("#name").val(nodeName);
	$("#code").val(nodeCode);
	setBusinessObjectIdByInstanceId();
}

function setBusinessObjectIdByInstanceId(){
	var instanceId = $.getUrlParam('instanceId');
	$.ajax({
		type : 'get',
		async : false,
	    url: serviceUrl + "flow/instance/get/"+instanceId+'?time='+ Math.random(),
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData) {
	    	var dataObj = resultData.result;
	    	businessObjectId = dataObj.businessObjectId;
	    	queryVariableList(businessObjectId);
	    }
	});
}
/**
 * 查询审批类型
 */
function queryApproveType(){
	var paramData = {delflag:false, status:true };
	$.ajax({
	    type: "post",  
	    url: serviceUrl + "flow/approveType/queryList",    
	    dataType:"json",  
	    data: JSON.stringify(paramData),
	    contentType: 'application/json;charset=utf-8',  
	    success: function(data){
	    	$("#approveTypeId").empty();
            var resultList = data.result;
	    	$.each(resultList,function(index,item){
                $("#approveTypeId").append("<option value='"+item.code+"'>"+item.name+"</option>");
	    	});	    	
	    } 
	});
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction() {
	if (instanceAcDto.id != "") {
		var formDataArray = $("#_flAcForm").serializeArray();
		for (var i in formDataArray) {
			var name = formDataArray[i].name;
			if (name && name != undefined && name != null) {
				if (!("" == name || name.startWith('participantId')
					|| name.startWith('participantScope') || name.startWith('paramValue')
					|| name.startWith('type_') || name.startWith('type_')  
					|| name.startWith('status_one_'))) {
					instanceAcDto[name] = formDataArray[i].value;
				}
			}
		}

		//获取审批人
		var participantList = getSubmitDataListofCommonTable("one", "", instanceAcDto.id, false);
		if (!participantList || participantList.length <= 0) {
			$.xljUtils.tip("red", "审批人不能为空！");
			return;
		}
		instanceAcDto.participant = JSON.stringify(participantList);

		//获取抄送人
		var ccPersonList = getSubmitDataListofCommonTable("two", "", instanceAcDto.id, false);
		instanceAcDto.ccPerson = JSON.stringify(ccPersonList);
//		window.localStorage.setItem(acDto.nodeId, JSON.stringify(acDto));
		
		$.ajax({  
		    type: "post",  
		    url: serviceUrl + "flow/instance/createAc",  
		    data: JSON.stringify(instanceAcDto),
		    dataType:"json",  
		    contentType : 'application/json;charset=utf-8',
		    success: function(data){ 
		    	if(data.success){
		    		var srcIndex, srcRowId;
		    		var ids = window.opener.jqGrid.getDataIDs();
		    		var result = JSON.parse(data.result);
		    		$.each(result, function (key, value) {
		    			if(position == 'before'){
		    				srcIndex = parseInt(srcRowIndex);
		    				srcRowId = ids[srcIndex - 1];
		    				window.opener.jqGrid.jqGrid('addRowData',instanceAcDto.id+key,value,position, srcRowId);
		    				window.opener.addApprovalList(srcIndex - 1,0,value);
		    			}else if(position == 'after'){
		    				srcIndex = parseInt(srcRowIndex) + parseInt(interval);
		    				srcRowId = ids[srcIndex - 1];
		    				window.opener.jqGrid.jqGrid('addRowData',instanceAcDto.id+key,value, position, srcRowId);
		    				window.opener.addApprovalList(srcIndex, 0, value);
		    			}
		    		});
		    		window.opener.resizeGrid();
		    		window.opener.jqGrid.jqGrid('resetSelection');
		    		closeWin();
		    	}else{
		    		pop_tip_open("red",data.msg);
		    	}
		    },
			error: function(xhr){ 
				$.xljUtils.getError(xhr.status);
			} 
		}); 
		
	}
}
/**
 * 保存表单的数据到本地缓存
 */
function saveForm(){
	$("#_flAcForm").attr("data-validate-success","doSaveFormAction()");
	$("#_flAcForm").submit();	
}
