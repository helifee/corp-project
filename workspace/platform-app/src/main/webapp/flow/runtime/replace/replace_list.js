var selectType="instance";//选中类型 instance/flow
var hiddenType="flow";//选中类型 instance/flow
var instanceGrid, flowGrid;
var sysAppList, busiObjectList;
var flowParamList = new Array();
var flowDataList = new Array();
var selectedRowID = "";
$(function() {
	//流程模板跳转而来，带页签参数
	var titName = $.xljUtils.getUrlParam('titName');
	if(titName){
		$(".con-tit button[name='flow']").click();
	}
	
	//页面加载完成之后执行	
	queryAppSystemList();
	queryBusiObjectList();
	initFlowGridTable();
	initInstanceGridList();
	$.xljUtils.resizeNestedGrid();
});

String.prototype.startWith = function(compareStr){
    return this.indexOf(compareStr) == 0;
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
	var hidden = "";
	if("instance" == name){
		selectType = "instance";
		hidden = "flow";
	}else if(name == "flow"){
    	selectType = "flow";
    	hidden = "instance";
    }
	$("#"+selectType+"Grid").show();
	$("#"+hidden+"Grid").hide();
	
	$("#"+selectType+"Condition").show();
	$("#"+hidden+"Condition").hide();
	$('.ui-jqgrid').removeAttr('style');
	$.xljUtils.resizeNestedGrid();
	$.xljUtils.addGridScroll();
});

function initInstanceGridList(){
	instanceGrid = $("#instanceGridList");
	var paramData1 = {approverId:"-1"};
	var urlText1 = hostUrl+"flow/instance/queryListByApprover"; //;
	var colModel1 = [
					{name:'id',  hidden:true}, 
	                {name:'groupId',  hidden:true},  
	                {name:'postId',  hidden:true}, 
	                {name:'participantId',  hidden:true},
	                {name:'status',  hidden:true},
	                {name:'appId',  label:'系统名称',  sortable:false, align:"left", formatter: systemformatter},
	                {name:'businessObjectId',  label:'业务对象', sortable:false, align:"left", formatter: objectformatter},
	                {name:'name',  label:'流程标题',  sortable:false, align:"left" },
	                {name:'flowBusinessCompanyName',  label:'所属公司', sortable:false, align:"left"},
	                {name:'currentApprovers',  label:'当前审批人', sortable:false, align:"left" },
	                {name:'startUserName',  label:'发起人', sortable:false, align:"left" },
	                {name:'instanceId',  label:'实例id', sortable:false, align:"left",hidden:true },
	                {name:'startDate',  label:'发起时间', sortable:false, align:"left" }];
	initSingleGrid(instanceGrid, paramData1, urlText1, colModel1,"instanceGridPager");
}

function initFlowGridTable(){
	flowGrid = $("#flowGridList");
	var colModel = [ {name:'id',      label:'id', hidden:true },
	                 {name:'name',    label:'模板名称',       align:"center", },
	                 {name:'code',    label:'流程编号',       align:"center", },
	                 {name:'acId',    label:'环节Id', hidden:true,      align:"center", formatter: acIdFormatter},
	                 {name:'ac',    label:'环节名称',       align:"center", formatter: acFormatter},
	                 {name:'participantId',  label:'流程模板审批人',    align:"center", formatter: personFormatter},
	                 {name:'version',    label:'流程版本',       align:"center", },
	                 {name:'objectName',     label:'业务对象',    align:"center"},];
	
	flowGrid.jqGrid({
		datatype : "local",
		scroll  : true,  scrollrows:true,
		colModel : colModel,
		jsonReader: { repeatitems: false },
		multiselect:true,//定义是否可以多选
		viewrecords : true, //定义是否要显示总记录数
        /*pager: '#flowGridPager',//定义翻页用的导航栏，必须是有效的html元素            
        rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
        rowList:  [20, 50, 100, 200], //可供用户选择一页显示多少条*/
        onSelectRow: function (rowid, status) {//被选中的状态
        	selectedRowID = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
        	$.xljUtils.resizeNestedGrid();
        	$.xljUtils.addGridScroll();
	    }
	});
}

function initSingleGrid(itemGrid, postParam, urlText, colModel,pagerIdText){
	itemGrid.jqGrid( {//创建jqGrid组件
        url : urlText, 
        postData : postParam,
        datatype : "json", 
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype : "post", 
        //jsonReader : { root:"result" },
        jsonReader: { repeatitems: false },
        colModel : colModel,    
        rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
        sortname : 'id',//默认的排序列
        sortorder : "desc",//排序方式,可选desc,asc
        viewrecords : true, //定义是否要显示总记录数
        pager: '#'+pagerIdText,//定义翻页用的导航栏，必须是有效的html元素            
        rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
        rowList:  [20, 50, 100, 200], //可供用户选择一页显示多少条
       	multiselect:true,//定义是否可以多选
       	gridComplete: function() {//当表格所有数据都加载完成
       		$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
        	$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
	    },
	    ondblClickRow:function(	rowId){
	    	var rowData = instanceGrid.jqGrid('getRowData',rowId);
	    	var url = hostUrl+"flow/runtime/approve/flow.html?instanceId=" + rowData.instanceId
			 + "&time=" + new Date().getTime(); 
        	window.open(url);
        },
        loadError: function(xhr, status, error){
        	
        }
    });
}

/**
 * 业务系统的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function personFormatter(cellvalue, options, rowObject) {
	return rowObject.participantIdName+"/"+rowObject.participantScopeName;
}

function acFormatter(cellvalue, options, rowObject) {
	return rowObject.ac.split('-')[0];
}
function acIdFormatter(cellvalue, options, rowObject) {
	return rowObject.ac.split('-')[1];
}

/**
 * 业务系统的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function systemformatter(cellvalue, options, rowObject) {
    var systemName = "";
    $.each(sysAppList, function (index, item) {//遍历mapList的数组数据
        if (item.id == cellvalue) {
            systemName = item.name;
        }
    });//$.each(appList
    return systemName;
}

function objectformatter(cellvalue, options, rowObject) {
    var systemName = "";
    $.each(busiObjectList, function (index, item) {//遍历mapList的数组数据
        if (item.id == cellvalue) {
            systemName = item.name;
        }
    });//$.each(appList
    return systemName;
}

function emptyDataObject(idText, nameText, postId){
	$("#"+idText).val("");
	$("#"+nameText).val("");
	if(postId){
		$("#"+postId).empty();
	}
}

//流程实例的查询条件是:人员Id(先选择人员)+岗位Id(根据人员查询对应的岗位列表)
function instanceSearchAction(){
	instanceGrid.jqGrid('clearGridData',false);
	var participantId = $("#participantId1").val();//"participant-11111";
	var postId = $("#post1").val();
	
	var param = {participantId: participantId, postId: postId};

	instanceGrid.jqGrid('setGridParam', {
        datatype: 'json', postData: param,page:1
    }).trigger("reloadGrid");
	$.xljUtils.addGridScroll();
	$.xljUtils.gridResizeFn();
}

function flowSearchAction(){
	$("#flowGridList").jqGrid('clearGridData',false);
	var participantId = $("#participantId2").val();
	var dataType1 = $("#dataType1").val();
	var type = "3";
	if("post"==dataType1){
		type = "2";
	}
	if('commonRole'==dataType1){
		type = "5";
	}
	else if("user"==dataType1){
		type = "1"; 
	}
	var paramData = {approverId: participantId, type: type};
	$.ajax({ //发送更新的ajax请求
	    type : "post",  
	    url : hostUrl+"flow/fl/queryListByApprover",    
	    dataType : "json",  
	    data : JSON.stringify(paramData),//将对象序列化成JSON字符串  ,
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	    success : function(data){
	    	var flowDataList1 = data.result;
	    	var flowParamList = new Array();
	    	for(var idx=0; idx<flowDataList1.length; idx++){
	    		var item = flowDataList1[idx];
	    		var paramItem = {participantId:item.participantId, participantScope:item.participantScope};
	    		flowParamList.push(paramItem);
	    	}
	    	if(!flowDataList1 || flowDataList1.length==0){
	    		pop_tip_open("blue", "查不到符合条件的记录!");
	    		return ;
	    	}
	    	
	    	//开始去准备显示数据
			//setTimeout(function () {
				var flowDataList2 = showFlowGridDataAfterPostDataProcess(flowParamList, flowDataList1);
				$("#flowGridList").jqGrid('clearGridData',false);//先清除旧数据
				for(var i=0; i<=flowDataList2.length; i++){
					$("#flowGridList").jqGrid('addRowData', i + 1, flowDataList2[i]);
				}
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
			//},3000);

	    },  
	    error : function(data){  
	    	
	    }  
	});
}




/**
 * 实现流程实例替换审批人的逻辑
 */
function instanceReplaceAction(){
	var postId = $("#post2").val();
	var postName = $("#post2").find("option:selected").text();
	var participantId = $("#replacerId1").val();
	var participantName = $("#replacer1").val();
	if(!participantId || participantId =="" || participantId.length == 0){
		pop_tip_open("blue","请选择新流程参与人!");
		return;
	}
	if(!postId || postId =="" || postId.length == 0){
		pop_tip_open("blue","请选择新流程参与人的岗位!");
		return;
	}

	var groupList = new Array();  
	var rowIds = instanceGrid.jqGrid('getGridParam','selarrrow');
    if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条实例数据！");
		return;
	}	
    $.each(rowIds, function(index,rowIdItem){
		var item = instanceGrid.jqGrid('getRowData', rowIdItem);
		var dataItem = {
				id:item.id,  
				postId:postId, 
				postName:postName, 
				status: item.status, 
				source: item.instanceId,		// TODO 后台以source接收instanceId
				participantId:participantId,
				participantName:participantName
		};
		groupList.push(dataItem);
	});
	
	$.ajax({  
	    type: "POST",  
	    url: hostUrl+"flow/instanceGroup/replaceInstanceGroup",  
	    data: JSON.stringify(groupList),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: "application/json;charset=utf-8", //设置请求头信息  
	    success: function(data){ 
	    	pop_tip_open("green","替换流程实例审批人操作成功！");
	    	instanceGrid.jqGrid('clearGridData',false);
	    	instanceSearchAction();
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	});
}
/**
 * 实现流程模板替换审批人的逻辑
 */
function flowReplaceAction(){
	var oldParticipantId = $("#participantId2").val();
	var dataType1 = $("#dataType1").val();
	var oldType = "3";
	if("post"==dataType1){
		oldType = "2";
	}else if("user"==dataType1){
		oldType = "1"; 
	}else if("commonRole"==dataType1){
		oldType = "5"; 
	}
	
	var replacerId = $("#replacerId2").val();
	var dataType2 = $("#dataType2").val();
	var postId2 = $("#postId2").val();
	var type = "3";
	var scope = "312";
	if("post"==dataType2){
		type = "2";
		scope = "21";
	}else if("user"==dataType2){
		type = "1"; 
		scope = "11";
	}else if("commonRole"==dataType2){
		type = "5"; 
		scope = "51";
	}
	
	if(!replacerId || replacerId =="" || replacerId.length == 0){
		pop_tip_open("blue","请选择新流程参与人!");
		return;
	}
	
	var participantList = new Array();  
	var rowIds = flowGrid.jqGrid('getGridParam','selarrrow');
	var rowData = $("#flowGridList").jqGrid('getRowData',rowIds);
	var acId=rowData.acId;
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条模板数据！");
		return;
	}	
	
	$.each(rowIds, function(index,rowIdItem){
		var item = flowGrid.jqGrid('getRowData', rowIdItem);
		var dataItem = {oldParticipantId:oldParticipantId, oldParticipantType: oldType, flId:item.id, 
		participantId:replacerId, participantType:type, participantScope:scope,paramValue:postId2,acId:item.acId };
		participantList.push(dataItem);
	});
	
	$.ajax({  
	    type: "POST",  
	    url: hostUrl+"flow/participant/replaceFlowParticipant?time=" + new Date().getTime(),  
	    data: JSON.stringify(participantList),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: "application/json;charset=utf-8", //设置请求头信息  
	    success: function(data){ 
	    	pop_tip_open("green","替换流程模板审批人操作成功！");
	    	flowGrid.jqGrid('clearGridData',false);
	    	flowSearchAction();
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	});
}

$('.singleArray-first').xljSingleArraySelector({
    selectorTypeArray:['person','post','role','commonRole'],
	targetId:'participantId2',//选择的数据的ID存储input域
	targetName:'participant2',//选择的数据的Name存储input域
	/**
	  * 保存回调函数
     * @param selectDatas 已选择的数据json对象
     */
    saveCallback: function (treeNode) {
    	//选中结果
       var singleArray;
       var type = treeNode[0].type;
       if("post"==type || "person"==type || "user"==type){
    	   singleArray = ['person','post'];
       }else if(1==type) {
    	   singleArray = ['role'];
       }else {
    	   singleArray = ['commonRole'];
       }
       if(0==type){
    	   type='commonRole';
       }
       $("#dataType1").val(type);
       //画第二个树
        $('.singleArray-second').xljSingleArrayDraw({
            selectArray: singleArray,
			selectType: singleArray[0]
        },$('.singleArray-second'));
    }
});
$('.singleArray-second').xljSingleArraySelector({
	selectorTypeArray:['person', 'post', 'role', 'commonRole'],
	treeParam : {commonStatus: true},
	targetId:'replacerId2',//选择的数据的ID存储input域
	targetName:'replacer2',//选择的数据的Name存储input域
	
	saveCallback: function (treeNode) {
    	//选中结果
       var singleArray;
       var type = treeNode[0].type;
       var postId = treeNode[0].postId;
       if(0==type){
    	   type='commonRole';
       }
       $("#postId2").val(postId);
       $("#dataType2").val(type);
    }
});
/**
 * 审批人的回调函数处理事件
 * @param data
 * @param ele
 */
function approverCallback(data, ele){
	if(selectType == "instance"){
		$("#replacer1").val(data.name);
		$("#replacerId1").val(data.id);
		$("#post2").empty();
		queryAndShowUserPostList(data.id, "post2");
	}else{
		$("#replacer2").val(data.name);
		$("#replacerId2").val(data.id);
		alert(data.ac);
		var type = data.type;
		$("#type1").val(data.type);	
	}
}


/**
 * 替换人的回调函数处理事件
 * @param data
 * @param ele
 */
function replacerCallback(data, ele){
	if(selectType == "instance"){
		$("#participant1").val(data.name);
		$("#participantId1").val(data.id);
		$("#post1").empty();
		queryAndShowUserPostList(data.id, "post1");
	}else{
		$("#participant2").val(data.name);
		$("#participantId2").val(data.id);
		var type = data.type;
		$("#type1").val(data.type);
	}
}

function queryAndShowUserPostList(userId, postSelectId){
    var postdata = {
		userId: userId,
		searchType: 'Post'
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"sys/org/orgnazation/userRPOM",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	var dataList = data.result.postDtoList;
        	$("#"+postSelectId).empty();//首先清空select现在有的内容
        	$.each(dataList, function (index, item) {//遍历mapList的数组数据  
                 $("#"+postSelectId).append("<option value=" + item.id + ">"+ item.orgPrefixName+"/"+ item.name + "</option>");
            });
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });
}


/**
 * 查询所有业务系统的静态数据
 */
function queryAppSystemList() {
    var postdata = {
    	appDelflag: "0",
        appStatus: "1"
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"sys/res/appSystem/queryList",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	sysAppList = data.result;
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

/**
 * 查询所有的业务对象静态数据
 */
function queryBusiObjectList() {
    var postdata = {
        delflag: 0
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"flow/businessObject/queryList",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	busiObjectList = data.result;
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

//---------------------  回写显示部分通用的逻辑   begin -----------------------------
var userKey = "user";
var userArray = new Array();
var postKey = "post";
var postArray = new Array();
var roleKey = "role";
var roleArray = new Array();
var orgKey = "org";
var orgArray = new Array();
var resDataIdArray = new Array();//指定资源的ID数组
var resDataNameArray = new Array();//指定资源的name数组
var typeItemArray = ["","人员","岗位","角色","相对参与人"];
/**
 * 为查询资源数据准备查询参数(user/post/role/org)
 * @param personList: 获取到的参与人数据
 */
function prepareParamDataForResData(personList){
	userArray.splice(0,userArray.length);//先清空数据内的所有元素
	postArray.splice(0,postArray.length);//先清空数据内的所有元素
	roleArray.splice(0,roleArray.length);//先清空数据内的所有元素
	orgArray.splice(0,orgArray.length);//先清空数据内的所有元素
	for(var idx=0; idx<personList.length; idx++){
		var item = personList[idx];
		var scope = item.participantScope;
		scope = scope+"";
		if(scope == "11"){//指定人员
			userArray.push(item.participantId);
		}else if(scope == "21"){//指定岗位
			postArray.push(item.participantId);
		}else if(scope.startWith("31")||scope.startWith("51")){//选择了角色
			roleArray.push(item.participantId);
			if(scope=="316"){
				orgArray.push(item.paramValue);
			}
		}
	}
	var typeArray = [userKey, postKey, roleKey, orgKey];
	var idArray = [userArray, postArray, roleArray, orgArray];
	var paramArray = new Array();
	for(var i=0; i<typeArray.length; i++){
		var idItemArray = idArray[i];
		if(idItemArray.length>0){
			var obj = new Object();
			obj.type = typeArray[i];
			obj.ids = idArray[i];
			paramArray.push(obj);
		}
	}
	return paramArray;
}

/**
 * 根据给定的参数查询,查询对应的资源数据列表
 * @param paramData：给定的参数
 */
function queryResDataList(paramData){
	var postdata={ paramData:paramData };
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"sys/org/orgnazation/queryResListByIds",    
	    dataType:"json",  
	    async: false,
	    data:  JSON.stringify(postdata),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var resDataList = data.result;
	    	//先清空数组的数据, 然后压入查询到的数据    
	    	resDataIdArray.length = 0;
	    	resDataNameArray.length = 0;  
	    	$.each(resDataList,function(index, item){//遍历mapList的数组数据
	    		resDataIdArray.push(item.id); 
	    		resDataNameArray.push(item.name);
	    	});//$.each(appList	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		alert("查询资源数据的接口异常");
	    	}
	    }  
	});//end-for $.ajax({
}

/**
 *  对查询数据进行后处理加工,以便进行Table TR TD的展示
 *  此方法是table tr td中通用的
 * @param resultList 
 * @returns 返回经加工处理的数据列表
 */
function showFlowGridDataAfterPostDataProcess(paramList, resultList){
	if(!paramList || paramList.length==0){//如果为空或没有数据,则不进行处理
		return;
	}
	var paramArray = prepareParamDataForResData(paramList);//先准备查询的数据
	queryResDataList(paramArray);
	var dataList = new Array();
	$.each(resultList,function(index,item){//遍历resultList的数组数据
 	   item.participantTypeText = typeItemArray[item.participantType];
 	   item.participantScopeName = getParticipantScopeText(item.participantScope);
 	   var scope = item.participantScope+"";
 	   if(scope == "11" || scope == "21" || scope.startWith("31")||scope.startWith("51")){
 		   item.participantIdName = getResDataText(item.participantId);
 		   if(scope == "316"){
 			  item.paramValueName = getResDataText(item.paramValue);
 		   }
 	   }
 	   dataList.push(item);
 	});	
	return dataList;
}

/**
 * 根据chooseType返回对应的中文业务术语
 * @param chooseType
 * @returns
 */
function getParticipantScopeText(chooseType){
	var numValues = ["11","12","21","22",
	                 "31","311","312","313","314","315","316","317"
	                 ,"41","42","43","44","51"];
	
	var typeNames = ["指定人员","表单人员","指定岗位","表单岗位"
	                 ,"指定标准岗位","本集团","本公司","本部门","本项目","本分期","指定组织","表单组织"
	                 ,"发起人直接领导","发起人顶级部门领导","上一环节审批人直接领导","上一环节审批人顶级部门领导","指定角色"];
	var idx = jQuery.inArray(chooseType+"", numValues);
	return typeNames[idx];
}

/**
 * 根据资源数组的ID,获取对应的Name值
 * @param resDataId
 * @returns ID对应的Name值
 */
function getResDataText(resDataId){
	var idx = jQuery.inArray(resDataId, resDataIdArray);
	var retText = resDataNameArray[idx];
	if(!retText){
		retText = "暂无";
	}
	return retText;
}
