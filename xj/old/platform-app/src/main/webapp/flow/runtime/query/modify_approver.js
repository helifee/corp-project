var postData = {};
var instanceId = "";
var lastSel,flag;
var historyGrid;
var initDataArray, toShowDataArray, toBeReplacedArray, newNodeArray;
var tempNode, selectedNode;
var firstReplaceDataItem;
var newFullDataArray;
var replaceIndex;

$(function() {
	initDataArray = new Array();
	toShowDataArray = new Array();
	pageInit();
	toBeReplacedArray = new Array();
	newNodeArray = new Array();
});
$(window).resize(function(){
	resizeGrid();
});

/**
 * 初始化页面
 */
function pageInit(){
	// 构造请求数据
	postData.instanceId = $.getUrlParam("instanceId");
	instanceId = postData.instanceId;
	postData.requestSource = "view";
	// 初始化审批历史
	initApproveHistory();
	queryInitApproveDataArray();
	resizeGrid();// 审批历史高宽自适应
}

function queryInitApproveDataArray(){
	$.ajax({
	    url:  hostUrl + "flow/instance/queryApprovalList",
	    data:JSON.stringify(postData),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData ) {
	        if(resultData) {
	        	var tempDataArray = resultData.result;
	        	toShowDataArray = resultData.result;
	        	for(var tdr=0; tdr<tempDataArray.length; tdr++){
	        		var itemData = tempDataArray[tdr];
	        		initDataArray.push(itemData);
	        	}
	        	//console.info(initDataArray);
	        	//console.info("initDataArray.length="+initDataArray.length);
	        	if(resultData.success) {
	        		reloadDataForDataGrid();
	            }else {
	         	    $.xljUtils.tip("red","查询流程实例审批记录数据失败！");
	            }
	        }
	    }
	});
}

function againQueryApproveDataArray(){
	$.ajax({
	    url:  hostUrl + "flow/instance/queryApprovalList",
	    data:JSON.stringify(postData),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    async:false,
	    success:function (resultData ) {
	        if(resultData) {
	        	newFullDataArray = resultData.result;
	        	//console.info("againQueryApproveDataArray newFullDataArray>>>>");
	        	//console.info(newFullDataArray);
	        }
	    }
	});
}

//重新装载数据进行展示
function reloadDataForDataGrid(){
	historyGrid.jqGrid('clearGridData',false);//先清除旧数据
	for(var idx=0; idx<toShowDataArray.length; idx++){
		historyGrid.jqGrid('addRowData', idx, toShowDataArray[idx]);
	}
}

function choosePerson(elementChoose){
	//1-获取选中的环节的Id和人员信息
	if(!selectedNode){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	tempNode = selectedNode;//进行初始化的简单判断
	if(tempNode.acStatus==3){
		pop_tip_open("blue","已完成的环节不能修改审批人！");
		return;
	}
	if(tempNode.acName=="结束"){
		pop_tip_open("blue","结束环节无需替换审批人！");
		return;
	}
	
	//计算出需要被选中的人员数据信息
	calculateRightSelectedPerson();
	
	//3-弹出选人控件
	var $ele = $(elementChoose);
	var selectedIds = "";
	for(idx6=0; idx6<toBeReplacedArray.length; idx6++){
		var item6 = toBeReplacedArray[idx6];
		selectedIds += item6.approverId+",";
	}
	selectedIds = selectedIds.substr(0, selectedIds.length-1);
	$("#selectedPersonIds").val(selectedIds);
	//console.info(">>>>>selectedPersonIds.val()="+$("#selectedPersonIds").val());
	$ele.xljMultipleSelector({
        selectorType: 'person',//选择器类型
        immediatelyShow: true,//是否立即显示，默认是false，已click事件触发
        title: '选择人员',//选择器标题
        gridTitle: '人员列表',//选择器右侧列表标题
        targetId: 'selectedPersonIds',
        //选择器保存按钮回调函数
        saveCallback: function (data, ele) {
			$(ele).data('_multilSelector').gridObj.data('searchIds','');//清除组件中选择人缓存
        	//1-删除grid中已有的对应的环节的数据
        	if(data.length == 0) {
        		$.xljUtils.tip('red', '至少选择一人！');
        		return;
        	}
        	var delIndex = 0;
        	for(var idx1=0; idx1<toBeReplacedArray.length; idx1++){
        		var checkItem = toBeReplacedArray[idx1];
        		for(idx2=0; idx2<toShowDataArray.length; idx2++){
        			var itemData = toShowDataArray[idx2];
        			if(itemData.acStatus != 3 && itemData.acName!="结束"&&itemData.taskStatus != 3){
        				if(itemData.acId==checkItem.acId && itemData.acName==checkItem.acName){
        					toShowDataArray.splice(idx2, 1);
        					if(delIndex==0){
        						delIndex = idx2;
        					}
        					break;
        				}
        			}
        		}
        	}
			// toBeReplacedArray = new Array();//清空本次替换审批人数组
        	//console.info(">>>> delIndex="+delIndex);
        	//console.info(">>>> toShowDataArray is.....");
        	//console.info(toShowDataArray);
        	
        	//2-插入新增的对应的环节的数据
        	//console.info("2-插入新增的对应的环节的数据");
        	for(var idx4=0; idx4<data.length; idx4++){
        		var itemData = data[idx4];
        		//console.info("------------firstReplaceDataItem is >>>> ");
        		//console.info(firstReplaceDataItem);
        		//console.info(itemData);
        		var newDataItem = {};
        		$.extend(newDataItem, firstReplaceDataItem);//对象的拷贝
        		
        		newDataItem.approverId = itemData.userId;
        		newDataItem.approverName = itemData.name;
        		newDataItem.postId = itemData.postId;
        		newDataItem.postName = itemData.prefixName + '/' + itemData.postName;
        		//console.info("------------newDataItem is >>>>idx4= "+idx4);
        		//console.info(newDataItem);
        		//newDataItem.postId = itemData.postId;// ---选人控件暂时没有这个字段
        		//newDataItem.postName = itemData.postName;//postName--选人控件暂时没有这个字段
        		toShowDataArray.splice(delIndex+idx4, 0, newDataItem); // 拼接函数(索引位置, 要删除元素的数量, 元素) 
        		//console.info("------------toShowDataArray is >>>> ");
        		//console.info(toShowDataArray);
        	}
        	reloadDataForDataGrid();//重新装载数据进行展示
        }
    });
}

/**
 * 岗位格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function postFormatter(cellvalue, options, rowObject){
	if(cellvalue == '' || cellvalue == null){
		if(rowObject.acType != '3'){	//非结束节点！
			return '无岗位';
		}
		return '';
	}else{
		var lastIndex = cellvalue.lastIndexOf('/');
		var first = cellvalue.substring(0, lastIndex);
		var last = cellvalue.substring(lastIndex + 1, cellvalue.length);
		return first + '<br/>' + last;
	}
}

//计算出需要被选中的人员数据信息
function calculateRightSelectedPerson(){
	toBeReplacedArray = [];//清空数组
	var firstFlag = false;
	for(var idx=0; idx<toShowDataArray.length; idx++){
		var itemData = toShowDataArray[idx];
		if(itemData.acStatus != 3 && itemData.acName!="结束" && itemData.taskStatus !=3){
			if(itemData.acId==tempNode.acId && itemData.acName==tempNode.acName){
				toBeReplacedArray.push(itemData);
				if(!firstFlag){
					firstReplaceDataItem = itemData;
					firstFlag = true;
				}
			}
		}
	}
	//console.info("---------------------toBeReplacedArray--------------------------------");
	//console.info(toBeReplacedArray);
}

/**
 * 初始化审批历史
 */
function initApproveHistory() {
	historyGrid = $("#_approveHistory");
	historyGrid.jqGrid(
		{
			datatype : "local",
			colModel : [ 
				    {name: 'sequence',label : '序号',align:'center', width: 40, cellattr:addCellAttr},
					{name: 'acId',label : '环节ID', hidden: true},
					{name: 'acType',label : '环节类型', hidden: true },
					{name: 'acName',label : '环节名称',width: 70, cellattr:addCellAttr},
					{name: 'acStatus',label : '环节点亮状态', hidden: true, },
					{name: 'postId',label : '岗位ID',hidden: true },
					{name: 'postName',label : '岗位',width: 200, cellattr:addCellAttr, formatter: postFormatter},
					{name: 'postStatus',label : '岗位点亮状态', hidden: true,},
					{name: 'approverId',label : '责任ID',  hidden: true,editable:false,sortable:false},
					{name: 'approverName',label : '责任人',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskStatus',label : '责任人点亮状态',hidden: true,sortable:false,editable:false},
					{name: 'approvalType',label : '操作',width: 70,editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskComments',label : '处理意见',editable:false,sortable:false,cellattr:addCellAttr},
					{name: 'taskEndTime',label : '处理时间',editable:false,sortable:false,cellattr:addCellAttr}
				
			],
			multiselect:true,
			forceFit:true,  //当为ture时，调整列宽度不会改变表格的宽度。
			height: '100%',
			//rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
			hoverrows:false,                                    //禁止mouse hovering			
			gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
				removeHorizontalScrollBar("_approveHistory");
	        	mergerCell("_approveHistory");                  //合并单元格
	        	setRunningStatus("_approveHistory",false);      //设置运行标识
	        	$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
				
			},
			beforeSelectRow:function(rowid, e){//不让用户进行选中操作
				$("#_approveHistory").jqGrid('resetSelection');
				return true;
			},
			onRightClickRow:function(rowid,iRow,iCol,e){
				$("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
			},
			onSelectRow:function(rowid,status){
				selectedNode = $("#_approveHistory").jqGrid('getRowData',rowid);
				console.log(selectedNode);
				$("#"+rowid).removeClass('ui-state-highlight');
			}
		});
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var newDataArray = new Array();
	//console.info("-------doSaveFormAction--------------");
	var endNode;
	againQueryApproveDataArray();
	var acIdArray = new Array();
	var resultDataArray = new Array();
	for(var ii=0;ii<newFullDataArray.length; ii++){
		var initItem = newFullDataArray[ii];
		var addFlag = true;
		for(var jj=0;jj<acIdArray.length; jj++){
			var acId = acIdArray[jj];
			if(acId == initItem.acId){
				addFlag = false;
				break;
			}
		}
		if(addFlag){
			acIdArray.push(initItem.acId);
		}
	}
	/*//console.info("-------打印 acIdArray的数据   acIdArray.length="+acIdArray.length);
	for(var jj=0;jj<acIdArray.length; jj++){
		//console.info("jj="+(jj+1)+"   acId="+acIdArray[jj]);
	}
	//console.info("-------打印 acIdArray的数据 完成  acIdArray.length="+acIdArray.length);
	
	//console.info("-------打印 toShowDataArray   toShowDataArray.length="+toShowDataArray.length);
	for(var kk=0; kk<toShowDataArray.length; kk++){
		//console.info("kk="+(kk+1)+"   acId="+toShowDataArray[kk]);
	}
	//console.info("-------打印 toShowDataArray 完成  toShowDataArray.length="+toShowDataArray.length);
	*/
	
	//按照环节的顺序,逐个添加环节的岗位和人员信息
	for(var jj=0;jj<acIdArray.length; jj++){
		//console.info("jj="+(jj+1)+"   acId="+acIdArray[jj]);
		var acId = acIdArray[jj];
		//1-先处理旧的数据
		for(var idx3=0; idx3<newFullDataArray.length; idx3++){
			var oldItemData = newFullDataArray[idx3];
			if(oldItemData.acId == acId){
				
				if(oldItemData.acStatus==2 || oldItemData.acStatus==3){//运行中和已完成的
					resultDataArray.push(oldItemData);
				}else if(oldItemData.acStatus==1 && oldItemData.acName!="结束"){//acStatus未1表示 未开始未进行的
				}
				//checkOldItemDataStatus返回值或为0,或为2;(0-不变 2-删除)
				var checkStatus = checkOldItemDataStatus(oldItemData);
				//console.info("acName="+oldItemData.acName+"; acStatus="+oldItemData.acStatus+"; checkStatus="+checkStatus);
				oldItemData.changeType = checkStatus; //表示要删除
				resultDataArray.push(oldItemData);
			}
		}
		
		//2-再处理新的数据
		for(var idx4=0; idx4<toShowDataArray.length; idx4++){
			var newData = toShowDataArray[idx4];
			if(newData.acId == acId){
				newData.changeType = 1; //表示要新增
				resultDataArray.push(newData);
			}
		}
	}
	
	//打印出最后结果数据
	for(var t1=0; t1<resultDataArray.length; t1++){
		var testItem = resultDataArray[t1];
		console.log("changeType="+testItem.changeType+";.acName="+testItem.acName+";acStatus="+testItem.acStatus
				+";postId="+testItem.postId+"; acId="+testItem.acId
				+";approverId="+testItem.approverId+";approverName="+testItem.approverName);
	}
	
	saveFormData(resultDataArray);
}

function checkOldItemDataStatus(oldData){
	var checkStatus = 2;
	var oldAcId = oldData.acId;
	var oldPostId = oldData.postId;
	var oldApproverId = oldData.approverId;
	    
	for (var idx2=0; idx2<toShowDataArray.length; idx2++) {
		var newData = toShowDataArray[idx2];
		var newAcId = newData.acId;
		var newPostId = newData.postId;
		var newApproverId = newData.approverId;
		
		if(oldAcId==newAcId && oldPostId==newPostId && oldApproverId ==newApproverId){
			console.log("newAcId="+newAcId+";newPostId="+newPostId+"; newApproverId="+newApproverId);
			checkStatus = 0;
			toShowDataArray.splice(idx2, 1);
			console.log("---- 删除掉toShowDataArray的第"+idx2+"个元素!!!  toShowDataArray.length="+toShowDataArray.length);
			break;
		}
	}
	return checkStatus;
}

/**
 * 保存保单数据的处理方法
 */
function saveFormData(dataDto){
	$.ajax({
	       url: hostUrl+"flow/instance/updateApprover",
	       data: JSON.stringify(dataDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
					   if(window.opener&&window.opener.gridReload){
						   window.opener.gridReload();
					   }

					   if(window.opener&&window.opener.refreshApproveList){
						   window.opener.refreshApproveList();
					   }

	                   pop_tip_open("green","数据保存操作成功！");
	                   closeMe();
	               }else {
	            	   pop_tip_open("red","数据保存操作失败！");
	               }
	               
	           }
	       }
	});
}

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}

/**
 * Grid自适应
 */
function resizeGrid(){
	$("#_approveHistory").setGridWidth($('#_approveHistoryDiv').width());
}

function commonAjaxAction(urlText, paramObject, actionName){
	$.ajax({
	    url: hostUrl + urlText,
	    data:JSON.stringify(paramObject),
	    type:'POST',
	    contentType:'application/json',
	    dataType:'JSON',
	    success:function (resultData ) {
	        if(resultData) {
	            var successFlag = resultData.success;
	            if(successFlag) {
	              $.xljUtils.tip("green",actionName+"成功！");
	            }else {
	         	  $.xljUtils.tip("red",actionName+"失败！");
	            }
	        }
	    }
	});
}