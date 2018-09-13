var zTreeObj,lastSel,v_appId,v_businessObjectId,v_businessObjectName,v_start,v_limit,_flListGrid;
var selectedFlowIds,vartreeNode;
//var w_h = $(window).height();
$(function() {
	//页面加载完成之后执行
	v_appId = "";
	v_businessObjectId = "";
	v_start = 0;
	v_limit = 10;
	resizeHeight();
	initDatetimepicker();
	queryzTree();
	queryFlList();
	if (v_businessObjectId == "") {
		$('#_btnNew').attr('disabled',true);
		$('#_btnNew').attr("disabled","disabled");
		//$('#_btnEdit').attr('disabled',true);
		$('#_btnDefault').attr('disabled',true);
		$('#_btnDefault').attr("disabled","disabled");
	}

	//错误 #15772 流程配置-引用其他流程：弹出的页面，查询要支持回车，请修改 update by dingguanghuai on 2017/11/02
	$('body').on('keypress',function (event) {
		if(event.keyCode == "13"){
			query();
		}
	});
    queryAppSystemList();

});
//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
		view: {
			dblClickExpand: false,  
			showLine: true,  
			selectedMulti: false,
			fontCss: getFont,
			nameIsHTML: true,
			fontCss: getFontCss
		},  
		edit: {  
			enable: true,
			showRemoveBtn:false,
			showRenameBtn:false,
			drag: {  
				autoExpandTrigger: true,  
				prev: null,  
				inner: null,  
				next: null,
				isCopy: false,
				isMove: false
			}
		 },  
		data: {
			keep: {
				leaf: true,
				parent: true
			},
			simpleData: {
				enable: true
			}
		},
		callback: {  
	        onClick: zTreeOnClick, //点击节点事件
	        beforeDrag: null, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
	        beforeDrop: null, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
	        beforeDragOpen: null, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
	        onDrag: null, //捕获节点被拖拽的事件回调函数  
	        onDrop: null, //捕获节点拖拽操作结束的事件回调函数
			onCollapse: function(){
				$.xljUtils.treeResizeFn();
			},
	        onExpand:function(){
				$.xljUtils.treeResizeFn();
				//捕获节点被展开的事件回调函数
			}
		}  
	};
function getFont(treeId, node) {
    return node.font ? node.font : {};
}

//递归树匹配节点icon
function recursionArray(arr) {
  for(var i in arr) {
  	if(arr[i].pId == 0) {
          arr[i].icon = "../../common/zTreeStyle/img/diy/main.png";
       }else {
          arr[i].icon = "../../common/zTreeStyle/img/diy/1_open.png";
      } 
  }
}
//节点点击事件
function zTreeOnClick(event, treeId, treeNode) {
	$('input:radio[name="flow_status"]:checked').parent().removeClass("active");
	$('input:radio[name="flow_status"][value=""]').attr("checked");
	$('input:radio[name="flow_status"][value=""]').parent().addClass("active");
	/*$('#_startDate').val("");
	$('#_endDate').val("");
	$('#_creator').val("");
	$('#flName').val("");
	v_appId = "";
	v_businessObjectId = "";*/
	var postData = $("#_flList").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    
	//if (!treeNode.pId && typeof (treeNode.pId) != "undefined" && treeNode.pId != 0) {
	if (treeNode.dataType!='2') {
		v_appId = treeNode.id;
		v_businessObjectId = "";
		v_businessObjectName = "";
		$('#_btnNew').attr('disabled',true);
		$('#_btnNew').attr("disabled","disabled");
		//$('#_btnEdit').attr('disabled',true);
		$('#_btnDefault').attr('disabled',true);
		$('#_btnDefault').attr("disabled","disabled");
		if(treeNode.dataType=='1'){
			postData = {parentId:treeNode.id};
		}else{
			postData = {appId:treeNode.id};
		}

	//}else if(typeof (treeNode.pId) != "undefined" && treeNode.pId != 0){
	}else if(treeNode.dataType=='2'){
		v_businessObjectId = treeNode.id;
		v_businessObjectName = treeNode.name;
		$('#_btnNew').attr('disabled',false);
		$('#_btnNew').removeAttr("disabled");
		//$('#_btnEdit').attr('disabled',false);
		$('#_btnDefault').attr('disabled',false);
		$('#_btnDefault').removeAttr("disabled");
		postData = {businessObjectId:treeNode.id};
	}
	
	$("#_flList").jqGrid("setGridParam", { postData: postData,page:1,start:0}).trigger("reloadGrid");
}
function searchAppIdBybusinessObjectId(){
	$.ajax({
	       url: serviceUrl+"flow/businessObject/get/"+v_businessObjectId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       async : false,
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   v_appId = dataObj.appId;
	       }
	});
}

//隐藏/显示Tree
$('.sidebar-toggle').click(function() {
    if($('body').hasClass('sidebar-collapse')) {
        $('.collapse_btn_container').css('borderBottom','1px solid #ddd').children('span').show();
        $('#_zTree').css('display','block');
        $(this).children('span').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
    }else{
        $('.collapse_btn_container').css('borderBottom','0px').children('span').hide();
        $('#_zTree').css('display','none');
        $(this).children('span').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
    }
});
//获取业务对象树
var key;
function queryzTree() {
	$.ajax({
		type:"post",
		url: serviceUrl + "flow/businessObject/getTree",
		dataType:"json",
		contentType: "application/json;charset=utf-8",
		data:"{}",
		success: function(json) {

			var zNodes = json.result;
			recursionArray(zNodes);
			zTreeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
			$.xljUtils.addTreeScroll();

			key = $("#key");
			/*key.bind("focus", focusKey)
			.bind("blur", blurKey)
			.bind("propertychange", searchNode)
			.bind("input", searchNode);*/
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
		},
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		}
	})
}
//构建模板列表
function queryFlList(){
    //创建jqGrid组件
    _flListGrid = $("#_flList").jqGrid(
        {
            url : serviceUrl + "flow/fl/queryFlList",//获取数据的地址
            datatype : "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",//ajax提交方式。POST或者GET，默认GET
//            postData:{"businessObjectId":""},
            jsonReader : {

            	repeatitems: false
            },  
            colModel : [
                {name:'id',label:'id',align:"center",hidden:true},
                {name:'businessObjectId',label:'业务对象ID',align:"center",hidden:true},
                {name:'concurrencyVersion',label:'并发版本',align:"center",hidden:true},
                {name:'name',label:'模板名称',align:"center",formatter:nameFormatter},
                {name:'code',label:'编号',align:"center",hidden:true},
                {name:'businessObjectName',label:'业务对象',align:"center"},
                {name:'isDefualt',label:'默认',align:"center",formatter: 'isDefualtFormatter',width:80},
                {name:'useStatus',label:'状态',align:"center",formatter: 'useStatusFormatter',cellattr: addCellAttr,width:60},
                {name:'flowTitle',label:'流程标题',align:"center",width:220},
                {name:'titleUpdate',label:'允许修改',align:"center",formatter: 'isDefualtFormatter',width:80},
                {name:'versionAndStatus',label:'版本号及类型',align:"center",editable:true,formatter:versionFormatter,width:180},
                {name:'doArchive',label:'归档',align:"center",formatter:doArchiveFormatter,width:80},
                {name:'approvalRepeat',label:'审批人重复策略',align:"center",formatter: approvalRepeatFormatter,width:100},
                {name:'postMultiPerson',label:'同岗多人审批策略',align:"center",formatter: postMultiPersonFormatter,width:100},
                {name:'retractAllow',label:'允许撤回流程',align:"center",formatter: 'isDefualtFormatter',width:80},
                {name:'updateDate',label:'修改时间',align:"center",width:120}
            ],
			width:$(".grid-container").width(),
			height:$(".grid-container").height()-80,
            forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
            pager : '#_flPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum : 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            viewrecords : true, //定义是否要显示总记录数
           	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
           	multiselect:true,//定义是否可以多选 
           	gridComplete:function(){
         	    $.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
           	},
            loadError:function(xhr,status,error){
            	$.xljUtils.getError(xhr.status);
            }
        });
    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    $("#_flList").jqGrid('navGrid', '#_flPager', {add: false, edit: false, del: false, search:false, refresh:false });
}
//根据条件获取流程模板列表
function query() {
    var postData = $("#_flList").jqGrid("getGridParam", "postData");
    console.log(postData);
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    searchAppIdBybusinessObjectId();
    var appid = $("#appId1").val();
    appid = appid == '-1' ? "" : appid;

    postData = {
        start: v_start,
        limit: v_limit,
        appId:appid,
        useStatus: $('input:radio[name="flow_status"]:checked').val(),
        startDate: $('#_startDate').val(),
        endDate: $('#_endDate').val(),
        creator: $('#_creator').val(),
        flName: $("#flName").val(),
        retract:$("#retract").val(),
        approvalRepeat:$("#approvalRepeat").val(),
        postMultiPerson:$("#postMultiPerson").val(),
        titleUpdate:$("#titleUpdate").val(),
        updateUserId:$("#updateUserId").val()
    };
    var businessObjectId = $("#busiObjectId1").val();
    var busiObjectType = $("#busiObjectType").val();
    if(busiObjectType && busiObjectType == '1'){
        postData.parentId = businessObjectId;
	}else if(busiObjectType && busiObjectType == '2'){
        postData.businessObjectId = businessObjectId;
	}
    $("#_flList").jqGrid("setGridParam", {postData: postData, page: 1, start: 0}).trigger("reloadGrid");
}
//初始化日期控件
function initDatetimepicker(){
	$('.mydatetimepicker').datetimepicker({ 
  	  language: 'zh-CN', //语言
	  format: 'yyyy-mm-dd hh:ii:ss',//显示格式
	  //minView: "month",//设置只显示到月份
	  initialDate: new Date(),//初始化当前日期
	  autoclose: true,//选中自动关闭
	  todayBtn: true//显示今日按钮
  });
}
function emptyDateObject(dateIdText){
	$("#"+dateIdText).val("");
}

/*
 * 树搜索方法
 */
var lastValue;
function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}
function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}
function clickRadio(e) {
	/*lastValue = "";
	var zTree = $.fn.zTree.getZTreeObj("_zTree");
	var value = $.trim(key.get(0).value);
	//如果搜索框内无内容，不进行搜索，展开所有节点
	if(value == ""){
		zTree.expandAll(true);
		$.xljUtils.treeResizeFn();
	}else{
		searchNode();
	}*/
	var searchKeys = ['code', 'name'];
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj, searchKeys);
}
var nodeList = [];
var nodeList1 = [];
function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("_zTree");
	var value = $.trim(key.get(0).value);
	if (lastValue === value) return;
	if (value === "") return;
	updateNodes(false);

	nodeList = zTree.getNodesByParamFuzzy("name", value);//按名次匹配
	nodeList1 = zTree.getNodesByParamFuzzy("code", value);//按编码匹配
	nodeList=nodeList.concat(nodeList1);//符合条件的节点
	for(var i=0;i<nodeList.length;i++){
		var node=nodeList[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,true);
		}
	}
	updateNodes(true);
}
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("_zTree");
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
function filter(node) {
	return !node.isParent && node.isFirstNode;
}
function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}
function setTrigger() {
	var zTree = $.fn.zTree.getZTreeObj("_zTree");
	zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
}

/**
 * 样式格式化
 * @param rowId
 * @param val
 * @param rowObject
 * @param cm
 * @param rdata
 * @returns {String}
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(!rowObject.useStatus){
        return "style='color:red'";
    }
}
/**
 * 名称格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function nameFormatter(cellvalue, options, rowObject){
	var busiObjectId = rowObject.businessObjectId;
    if(rowObject.useStatus){
        return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:#3c8dbc;' onclick='editFl(\""+rowObject.id+"\");'>"+cellvalue+"</a>";
    }else{
    	return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:red;' onclick='editFl(\""+rowObject.id+"\");'>"+cellvalue+"</a>";
    }	
}
//是否默认格式化
$.extend($.fn.fmatter , {
	isDefualtFormatter : function(cellvalue, options, rowObject) {
		if(cellvalue == true){
			return "是";
		}else{
			return "否";
		}
}
});
$.extend($.fn.fmatter.isDefualtFormatter , {
    unformat : function(cellvalue, options) {
	if(cellvalue == "是"){
		return true;
	}else{
		return false;
	}
}
});
//状态格式化
$.extend($.fn.fmatter , {
	useStatusFormatter : function(cellvalue, options, rowObject) {
		if(cellvalue == true){
			return "启用";
		}else{
			return "禁用";
		}
}
});
$.extend($.fn.fmatter.useStatusFormatter , {
    unformat : function(cellvalue, options) {
	if(cellvalue == "启用"){
		return true;
	}else{
		return false;
	}
}
});

/**
 * 版本及类型格式化
 */
function versionFormatter(cellvalue, options, rowObject){
	var _versionValue = "";
	var data = JSON.parse(cellvalue);
	_versionValue += "<select id=\""+options.rowId+"\" onchange=\"resetData(\'"+options.rowId+"');\">";
	var i = 0;
	for(var key in data){
		if(i == 0){
			_versionValue += "<option value=\""+key+"\" selected=\"selected\">"+data[key]+"<\/option>";
		}else{
			_versionValue += "<option value=\""+key+"\">"+data[key]+"<\/option>";
		}
		++i;
	}
	_versionValue += "<\/select>";
	return _versionValue
}
//是否归档格式化
function doArchiveFormatter(cellvalue, options, rowObject) {
    if (cellvalue == true) {
        return "归档";
    } else {
        return "不归档";
    }
}
//审批人重复策略格式化
function approvalRepeatFormatter(cellvalue, options, rowObject) {
    if (cellvalue == '1') {
        return "不跳过";
    } else if(cellvalue == '2') {
        return "前置审批";
    }else if(cellvalue == '3') {
        return "后置审批";
    }else{
    	return cellvalue;
	}
}
//同岗多人审批策略格式化
function postMultiPersonFormatter(cellvalue, options, rowObject) {
    if (cellvalue == '1') {
        return "抢占";
    } else if(cellvalue == '3') {
        return "并行";
    }else{
    	return cellvalue;
	}
}

/**
 * 重置JQGrid列的值
 */
function resetData(rowId){
	var v_value = $("#"+rowId+" option:selected").val();
	var v_html = $("#"+rowId+" option:selected").html();
	$("#_flList").jqGrid('setCell',rowId,'id',v_value);
	$("#"+rowId+"_a").attr("onclick","editFl(\""+rowId+"\");");
}

/**
 * 新建流程模板
 */
function newFl(){
	//var url = encodeURI("fl_new.html?appId="+v_appId+"&businessObjectId="+v_businessObjectId+"&businessObjectName="+v_businessObjectName);
	//var url = "fl_new.html?appId="+v_appId+"&businessObjectId="+v_businessObjectId+"&businessObjectName="+encodeURIComponent(v_businessObjectName)
	//openWin(url);
	searchAppIdBybusinessObjectId();
	window.open(serviceUrl+'flow/builder/fl_template.html?appId='+v_appId+'&businessObjectId='+v_businessObjectId+'&businessObjectName='+encodeURIComponent(v_businessObjectName)+"&act=create");
}
/**
 * 查看流程模板
 */
function viewFl(flId, busiObjectId){
	var url = encodeURI("fl_all.html?flId="+flId+"&businessObjectId=" + busiObjectId+"&flStatus=0");
	openWin(url);
}

/**
 * 修改流程模板
 */
function editFl(ids){
	if(!ids){
		ids = $("#_flList").jqGrid('getGridParam','selarrrow');
	}else{
		ids = ids.split(',');
	}
	if(ids.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		pop_tip_open("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var flId = $("#_flList").jqGrid('getRowData',ids[0]).id;
		v_businessObjectId = $("#_flList").jqGrid('getRowData',ids[0]).businessObjectId;
		var url = encodeURI("../builder/fl_template.html?flId="+flId+"&businessObjectId=" + v_businessObjectId+"&act=update");
		openWin(url);
	}
}

/**
 * 设置业务对象默认模板（仅设置最高版本）
 */
function setDefaultFl(){
	var paramData = {};
	var ids = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		$.xljUtils.tip("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		$.xljUtils.tip("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var defaultFlId = $("#_flList").jqGrid('getGridParam','selrow');
		var rowData = $("#_flList").jqGrid('getRowData',defaultFlId);
		var businessObjectId = rowData.businessObjectId;
		paramData.defaultFlId = defaultFlId;
		paramData.businessObjectId = businessObjectId;
		$.ajax({
		    type: "POST",
		    url: serviceUrl + "flow/fl/setDefaultFl",
		    data: JSON.stringify(paramData),//将对象序列化成JSON字符串
		    dataType:"json",  
		    contentType : 'application/json;charset=utf-8', //设置请求头信息
		    success: function(data){ 
		    	//resetDefaultFl();
				if(data.success&&data.result){
					$.xljUtils.tip("green","设置成功！");
					$("#_flList").jqGrid("setGridParam").trigger("reloadGrid");
				}
		    },
			error: function(xhr){ 
				$.xljUtils.getError(xhr.status);
			}  
		}); 
	}
}

/**
 * 重置业务对象默认模板
 */
function resetDefaultFl(){
	var id = $("#_flList").jqGrid('getGridParam','selrow');
	var putData = {
		"id":$("#_flList").jqGrid('getCell',id,'id'),
		"concurrencyVersion":parseInt($("#_flList").jqGrid('getCell',id,'concurrencyVersion'))+1,
		"businessObjectId":$("#_flList").jqGrid('getCell',id,'businessObjectId'),
		"code":$("#_flList").jqGrid('getCell',id,'code'),
		"isDefualt":1
		};
	$.ajax({  
	    type: "PUT",  
	    url: serviceUrl + "flow/fl/update/"+$("#_flList").jqGrid('getCell',id,'id'),  
	    data: JSON.stringify(putData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType : 'application/json;charset=utf-8', //设置请求头信息
	    success: function(data){ 
	    	pop_tip_open("green","设置成功！");
	    	$("#_flList").jqGrid("setGridParam").trigger("reloadGrid");
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	}); 	
}
//启用模板
function availableFl(){
	var putData;
	var flList = new Array();  
	var rowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}	
	for(var i in rowIds){
		flList.push({
			"id":rowIds[i],
			"useStatus":1
			});
	}
	putData = {"putData":flList};
	$.ajax({  
	    type: "PUT",  
	    url: serviceUrl + "flow/fl/updateBatch",  
	    data: JSON.stringify(putData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType : 'application/json;charset=utf-8', //设置请求头信息
	    success: function(data){ 
	    	pop_tip_open("green","启用成功！");
	    	$("#_flList").jqGrid("setGridParam").trigger("reloadGrid");
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		}  
	}); 
} 
//禁用模板
function disableFl(){
	var putData;
	var flList = new Array();  
	var rowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}	
	for(var i in rowIds){
		flList.push({
			"id":rowIds[i],
			"useStatus":0
			});
	}
	putData = {"putData":flList};
	$.ajax({  
	    type: "PUT",  
	    url: serviceUrl + "flow/fl/updateBatch",  
	    data: JSON.stringify(putData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType : 'application/json;charset=utf-8', //设置请求头信息
	    success: function(data){ 
	    	pop_tip_open("green","禁用成功！");
	    	$("#_flList").jqGrid("setGridParam").trigger("reloadGrid");


	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	}); 
}

/**
 * 删除模板
 */
function deleteFl(){
	var codeText="";
	var rowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	for(var i in rowIds){
		codeText += $("#_flList").jqGrid('getRowData',rowIds[i]).code+",";
	}
	codeText = codeText.substring(0, codeText.length);
	console.log("codeText="+codeText);
	var popText = "确认要删除吗？"
	pop_text_open("blue", popText, function() {
		$.ajax({
			type : "delete",
			url : serviceUrl + "flow/fl/deleteFlowsByCodeText/" + codeText,
			dataType : "json",
			contentType : 'application/json;charset=utf-8', //设置请求头信息
			success : function(data) {
				pop_tip_open("green", "删除成功！");
				$("#_flList").jqGrid("setGridParam").trigger("reloadGrid");
			},
			error : function(xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
	}, function() {
		return;
	});
} 
//清除localStorage缓存
function clearLocal(localTemp){
	var localLength=window.localStorage.length;
	var name;
	var remove=[];
	for(var i=0; i<localLength; i++ ){
		name=window.localStorage.key(i);
		if(name && name.indexOf(localTemp)>=0){
			remove.push(name);
		}
	}
	for(var i=0; i<remove.length; i++ ){
		window.localStorage.removeItem(remove[i]);
	}
}
/**
 * 版本查看
 */
function checkVersion(){
	var ids = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		pop_tip_open("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var data = $("#_flList").jqGrid('getRowData',ids[0]);
		var flId = data.id;
		var code = data.code;
		var url = encodeURI("fl_version.html?code=" + code  +"&businessObjectId=" + v_businessObjectId);
		openWin(url);
	}
} 

/**
 * 批量修改可阅人
 */
function modifyReader(){
	selectedFlowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
    if(selectedFlowIds && selectedFlowIds.length>0){
    	var url = encodeURI(serviceUrl+"/flow/editor/fl_reader.html");
    	openWin(url);
    }else{
    	pop_tip_open('blue', "至少选择一条数据！");
    }
}

function gotoReplace(){
	var url = encodeURI(serviceUrl+"/flow/runtime/replace/replace_list.html?titName=flow");
	openWin(url);
}
function  resetGridHeight(){
	//$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(container_h-80, true);
}
//计算高度
function resizeHeight(){
  $(".slide-left .ztree-box").height(($(window).height()-145)+"px");
	$(".grid-container").height(($(window).height()-$(".con-tit").height()-$("#userList").height()-25)+"px");
}
function resizeGrid(){
	$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.grid-container').height()-80);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.grid-container').width(), true);
}
//ztree 自适应宽度
$(window).resize(function(){
  	resizeHeight();
	resizeGrid();
});

//高级查询
$("#changeRightIcon").on("click",function(e){
    $(this).toggleClass("col");
    var colFlag = $(this).hasClass("col");
    if(colFlag){
        $('#changeRightIcon').addClass('fa-angle-down');
        $('#changeRightIcon').removeClass('fa-angle-up');
        $("#xj-form-content_"+selectType).hide();
    }else{
        $('#changeRightIcon').addClass('fa-angle-up');
        $('#changeRightIcon').removeClass('fa-angle-down');
        $("#xj-form-content_"+selectType).show();
    }
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.gridResizeFn();


});
//默认不展开
var select1="0";
$(".senior-btn").on("click",function(e){
    var btnName=$("#highSearchBtn").html();
    if(btnName=='高级查询'){
        $("#highSearchBtn").html("收起");
        $('#highSearchClass').addClass('fa-angle-up');
        $('#highSearchClass').removeClass('fa-angle-down');
    }else{
        $("#highSearchBtn").html("高级查询");
        $('#highSearchClass').addClass('fa-angle-down');
        $('#highSearchClass').removeClass('fa-angle-up');
    }
	if(select1=="0"){//不展开
		select1="1";
	}else{//展开
		select1="0";
	}
    var p_obj = $(".condition-con:visible");
    $(p_obj).find(".senior-tr").toggleClass("hide");
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});
/**
 * 查询所有业务系统的静态数据
 */
function queryAppSystemList() {
    var postdata = {
        appDelFlag: "0",
        appStatus: "1"
    };
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"sys/res/appSystem/queryList",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            sysAppList = data.result;
            if(sysAppList && sysAppList.length>0){
                fristAppId = sysAppList[0].id;
            }
            $("#appId1").empty();
            $.each(sysAppList, function(index, item){
                $("#appId1").append("<option value='"+item.id+"'>"+item.name+"</option>");
            });
            $("#appId1").append("<option value='-1'  selected='selected'>全部</option>");
            init_xljSingleArraySelector('1');
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
 * 初始化业务对象
 * @param type
 */
function init_xljSingleArraySelector(type){
//	$('.singleArray-first').xljSingleArraySelector({
    $('#tree_0'+type).xljSingleArraySelector({
        selectorTypeArray:['busiObject'],
        selectorType:'busiObject',
        appId : $("#appId"+type).val(),
        treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
        targetId: 'busiObjectId'+type, //选择的数据的ID存储input域
        targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
        saveCallback: function(selectData,selectArray,ele){
            $("#busiObjectType").val(selectData[0].dataType);
            // queryFlowViewList(busiObjectId,type);
        }
    });
}

/**
 * 切换业务对象
 * @param type
 * @param that
 */
function appIdChange(type, that){
    if(that.value){
        appId = that.value;
    }else{
        appId=that;
        $("#appId"+type).val(appId);
    }
    //queryBusiObjectList(appId);
    $("#busiObjectName"+type).val("");
    $("#busiObjectId"+type).val("");
    $("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
//	$('#tree_0'+type).xljSingleArrayDraw({
    $('#tree_0'+type).xljSingleArrayDraw({
        selectArray: ['busiObject'],
        selectType:'busiObject',
        appId : appId,
        treeNO : parseInt(type)-1,
        treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
        targetId: 'busiObjectId'+type, //选择的数据的ID存储input域
        targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
        saveCallback: function(selectData,selectArray,ele){
            $("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
            var busiObjectId = $("#busiObjectId"+type).val();
        }
    },$('#tree_0'+type));
}

/**
 * 清空修改人
 */
function emptyUserObject(){
    $("#updateUser").val("");
    $("#updateUserId").val("");
}
/**
 * 选人的回调函数处理事件
 * @param data
 * @param ele
 */
function authorizerCallback(data, ele){
    $("#authorizer").val(data.name);
    $("#authorizerId").val(data.id);
}

/**
 * 情况业务对象
 * @param type
 */
function emptyBusiObject(){
    $("#busiObjectId1").val("");
    $("#busiObjectName1").val("");
}

/**
 * 重置查询条件
 */
function resetFrom() {
	$("#flName").val("");
    $("input[type='radio'][name='flow_status']").get(0).checked = true
    $("#appId1").val("-1");
	emptyBusiObject();
    $("#retract").val("");
    $("#approvalRepeat").val("");
    $("#postMultiPerson").val("");
    $("#titleUpdate").val("");
    emptyUserObject();
    emptyDateObject('_startDate');
    emptyDateObject('_endDate');
}

/**
 *  批量修改模板属性
 */
var updateIds;
function updateFlows(){
    var ids = $("#_flList").jqGrid('getGridParam','selarrrow');
    if(!ids || ids.length == 0){
        pop_tip_open("blue","至少选择一条数据！");
        return;
    } else {
        updateIds = ids;
       window.open("fl_updateBatch.html");
    }
}