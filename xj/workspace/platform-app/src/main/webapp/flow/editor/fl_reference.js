var zTreeObj,lastSel,v_appId,v_businessObjectId,v_businessObjectName,v_start,v_limit,_flListGrid;
var selectedFlowIds;
//var w_h = $(window).height();

$(function() {
	//页面加载完成之后执行
	v_appId = "";
	v_businessObjectId = "";
	v_start = 0;
	v_limit = 10;
	initDatetimepicker();
	queryzTree();
	queryFlList();
	if (v_businessObjectId == "") {
		$('#_btnNew').attr('disabled',true);
		//$('#_btnEdit').attr('disabled',true);
		$('#_btnDefault').attr('disabled',true);
	}
	//页面加载完毕后更改ztree宽高
	$.xljUtils.resizeNestedGrid();
	resizeHeight();

	//错误 #15772 流程配置-引用其他流程：弹出的页面，查询要支持回车，请修改 update by dingguanghuai on 2017/11/02
	$('body').on('keypress',function (event) {
		if(event.keyCode == "13"){
			query();
		}
	});
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
	$('#_startDate').val("");
	$('#_endDate').val("");
	$('#_creator').val("");
	$('#flName').val("");
	v_appId = "";
	v_businessObjectId = "";
	var postData = $("#_flList").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    
	if (!treeNode.pId && typeof (treeNode.pId) != "undefined" && treeNode.pId != 0) {
		v_appId = treeNode.id;
		v_businessObjectId = "";
		v_businessObjectName = "";
		$('#_btnNew').attr('disabled',true);
		//$('#_btnEdit').attr('disabled',true);
		$('#_btnDefault').attr('disabled',true);
		postData = {appId:treeNode.id};
	}else if(typeof (treeNode.pId) != "undefined" && treeNode.pId != 0){
		v_businessObjectId = treeNode.id;
		v_businessObjectName = treeNode.name;
		$('#_btnNew').attr('disabled',false);
		//$('#_btnEdit').attr('disabled',false);
		$('#_btnDefault').attr('disabled',false);
		postData = {businessObjectId:treeNode.id};
		$.ajax({
		       url: hostUrl+"flow/businessObject/get/"+v_businessObjectId+"?t="+ new Date().getTime(),
		       type:'GET',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		    	   var dataObj = resultData.result;
		    	   v_appId = dataObj.appId;
		       }
		});
	}
	
	
	$("#_flList").jqGrid("setGridParam", { postData: postData,page:1,start:0}).trigger("reloadGrid");
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
		url: hostUrl + "flow/businessObject/getTree",
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
            url : hostUrl + "flow/fl/queryFlList",//获取数据的地址
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
                {name:'name',label:'名称',align:"center"},//,formatter:nameFormatter  错误 #15794 流程配置-引用其他流程：引用页面，名称的超链接去掉，请修改 update by dingguanghuai on 2017/11/02
                {name:'code',label:'编号',align:"center"},
                {name:'businessObjectName',label:'业务对象',align:"center"},
                {name:'isDefualt',label:'是否默认',align:"center",formatter: 'isDefualtFormatter'},
                {name:'versionAndStatus',label:'版本号及类型',align:"center", formatter:versionFormatter,width:200},
                {name:'useStatus',label:'状态',align:"center",formatter: 'useStatusFormatter',cellattr: addCellAttr},
                {name:'updateDate',label:'修改时间',align:"center"}
            ],
            forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
            pager : '#_flPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum : 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            viewrecords : true, //定义是否要显示总记录数
           	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
           	multiselect: true,//定义是否可以多选 
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
function query(){
	var postData = $("#_flList").jqGrid("getGridParam", "postData");
  $.each(postData, function (k, v) {
      delete postData[k];
  });
	postData = {
			start:v_start,
			limit:v_limit,
			appId:v_appId,
			businessObjectId:v_businessObjectId,
			useStatus:$('input:radio[name="flow_status"]:checked').val(),
			startDate:$('#_startDate').val(),
			endDate:$('#_endDate').val(),
			creator:$('#_creator').val(),
			flName:$("#flName").val()
			};
	$("#_flList").jqGrid("setGridParam", { postData: postData,page:1,start:0}).trigger("reloadGrid");
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
	$.xljUtils._searchTreeBtnEvent(key,zTreeObj);
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
    if(rowObject.useStatus){
        return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:#3c8dbc;' onclick='viewFl(\""+rowObject.id+"\");'>"+cellvalue+"</a>";        
    }else{
    	return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:red;' onclick='viewFl(\""+rowObject.id+"\");'>"+cellvalue+"</a>";
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

/**
 * 重置JQGrid列的值
 */
function resetData(rowId){
	var v_value = $("#"+rowId+" option:selected").val();
	var v_html = $("#"+rowId+" option:selected").html();
	$("#_flList").jqGrid('setCell',rowId,'id',v_value);
	$("#"+rowId+"_a").attr("onclick","viewFl(\""+v_value+"\");");
}

/**
 * 新建流程模板
 */
function newFl(){
	//var url = encodeURI("fl_new.html?appId="+v_appId+"&businessObjectId="+v_businessObjectId+"&businessObjectName="+v_businessObjectName);
	//var url = "fl_new.html?appId="+v_appId+"&businessObjectId="+v_businessObjectId+"&businessObjectName="+encodeURIComponent(v_businessObjectName)
	//openWin(url);
	window.open(hostUrl+'flow/editor/fl_new.html?appId='+v_appId+'&businessObjectId='+v_businessObjectId+'&businessObjectName='+encodeURIComponent(v_businessObjectName));
}
/**
 * 查看流程模板
 */
function viewFl(flId){
	var url = encodeURI("fl_view.html?flId="+flId+"&businessObjectId=" + v_businessObjectId);
	openWin(url);
}

/**
 * 修改流程模板
 */
function editFl(){
	var ids = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		pop_tip_open("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var flId = $("#_flList").jqGrid('getRowData',ids[0]).id;
		var url = encodeURI("fl_edit.html?flId="+flId+"&businessObjectId=" + v_businessObjectId);
		openWin(url);
	}
}

/**
 * 设置业务对象默认模板（仅设置最高版本）
 */
function setDefaultFl(){
	var putData;
	var flList = new Array();  
	var ids = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(ids.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}else if (ids.length > 1){
		pop_tip_open("blue","最多选择一条数据!");
		return;
	}else if (ids.length == 1){
		var rowIds = $("#_flList").jqGrid('getDataIDs');
		for(var i in rowIds){
			flList.push({
				"id":rowIds[i],
				"isDefualt":0
				});
		}
		putData = {"putData":flList};
		$.ajax({  
		    type: "PUT",  
		    url: hostUrl + "flow/fl/updateBatch",  
		    data: JSON.stringify(putData),//将对象序列化成JSON字符串  
		    dataType:"json",  
		    contentType : 'application/json;charset=utf-8', //设置请求头信息
		    success: function(data){ 
		    	resetDefaultFl();
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
	    url: hostUrl + "flow/fl/update/"+$("#_flList").jqGrid('getCell',id,'id'),  
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
	    url: hostUrl + "flow/fl/updateBatch",  
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
	    url: hostUrl + "flow/fl/updateBatch",  
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
	var idText="";
	var rowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	for(var i in rowIds){
		idText += rowIds[i]+",";
	}
	idText = idText.substring(0, idText.length);
	var popText = "确认要删除吗？"
	pop_text_open("blue", popText, function() {
		$.ajax({
			type : "delete",
			url : hostUrl + "flow/fl/deletePseudoBatch/" + idText,
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
		var flId = $("#_flList").jqGrid('getRowData',ids[0]).id;
		var url = encodeURI("fl_version.html?flId="+flId+"&businessObjectId=" + v_businessObjectId);
		openWin(url);
	}
} 

function submitFormDataAndCloseMe(){
	selectedFlowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
	 if(selectedFlowIds && selectedFlowIds.length>1){
		 pop_tip_open('blue', "只能选择一条流程模板数据！");
	 }else if(!selectedFlowIds || selectedFlowIds.length==0){
		 pop_tip_open('blue', "请选择一条流程模板数据！");
	 }
	 console.log("selectedFlowIds="+selectedFlowIds);
	 opener.loadReferredFlowInfo(selectedFlowIds);
	 closeMe();
}

function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}
/**
 * 批量修改可阅人
 */
function modifyReader(){
	selectedFlowIds = $("#_flList").jqGrid('getGridParam','selarrrow');
    if(selectedFlowIds && selectedFlowIds.length>0){
    	var url = encodeURI(hostUrl+"/flow/editor/fl_reader.html");
    	openWin(url);
    }else{
    	pop_tip_open('blue', "至少选择一条数据！");
    }
}
function  resetGridHeight(){
	//$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(container_h-80, true);
}
//计算高度
function resizeHeight(){
  $(".slide-left .ztree-box").height(($(window).height()-$(".org-title").height()-197)+"px");
}
//ztree 自适应宽度
$(window).resize(function(){
  resizeHeight();
});