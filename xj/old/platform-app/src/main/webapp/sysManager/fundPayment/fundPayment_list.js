/**
 * @author luorongxin
 */
var rowData;//当前选中数据
var rowDataBefore;//上一次选中数据
var openUrl="fundPayment_edit.html";//编辑页
/**
 * 初始化
 */
$(function(){
	//添加时间事件
	$('.form_datetime').datetimepicker({
        language: 'zh-CN', //语言
  	  	format: 'yyyy-mm-dd',//显示格式  HH:ii:ss
  	  	minView: "month",//设置只显示到月份
  	  	initialDate: new Date(),//初始化当前日期
  	  	autoclose: true,//选中自动关闭
  	  	todayBtn: true//显示今日按钮 
    })
	$('.addOrg').xljSingleSelector({
		title: "选择组织机构",//选择器标题，默认是'选择组织机构'
		selectorType: "org",//选择器类型，默认是组织机构选择器
		targetId: 'belongOrgId',
		targetName: 'belongOrgName',
		saveCallback: function (selectData, ele) {
			$(ele).val(selectData.name);
			var eleName = $(ele).attr('name');
			var reg = /[A-Z]/g;
			var arr;
			var lastIndex;
			while ((arr = reg.exec(eleName)) != null) {
				lastIndex = arr.index;
			}

			var targetId = '';
			if (lastIndex) {
				targetId = eleName.substring(0, lastIndex) + 'Id';
			} else {
				targetId = eleName + 'Id';
			}

			$('#' + targetId).val(selectData.id);
		}
	});
	$('.glyphicon-remove').on('click',{targetId:'belongOrgId', fileCode: 'belongOrgName'},function (e) {
		$('#'+e.data.targetId).val('');
		$('#'+e.data.fileCode).val('');
	});

    //加载grid
    pageInit();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    //重置模糊搜索关键字
    $('#keywords').val('');
    // 按钮事件绑定
    $("#modifyBtn").on('click',function () {
    	modifyFundPayment();
    });

    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){
    	if(event.keyCode==13){ 
    	$("#searchBtn").click(); 
    	  } 
	}); 
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    //阻止默认行为
    $('.btn').click(function(e) {
        e.preventDefault();
    });
});
/**
 * 模糊查询: 名字或者编码
 */
function fuzzySearch(){
	var param = $('#keywords').val();
};

/**
 * 加载列表
 */
function pageInit(){
	jQuery("#list2").jqGrid({
		url: hostUrl + 'sys/base/customFormInstance/fundPage',
		ajaxGridOptions: {
			contentType: 'application/json'
		},
		mtype: "POST",
		contentType: "application/json",
		datatype: "json",
		postData: {},
		multiboxonly: true,
		multiselect: true,
		autowidth: true,
		rownumbers: true,
		jsonReader: {
			repeatitems: false
		},
		colNames : [ 'id', 'formSearchSeniorKey','导入状态' ,'支付状态','单据编号' , '主题', '业务类型', '申请金额','付款金额', '经办日期', '导入日期', '付款日期','付款银行', '付款账户' ],
        colModel : [ 
            {name : 'id',label : 'id',width : 60,sortable:false,hidden:true},
            {name : 'formSearchSeniorKey',label : 'formSearchSeniorKey',hidden:true},
            {name : 'importstatus',label : '导入状态',editable:true,width : 40,sortable:false,align:'center',formatter: importstatusFormatter},
            {name : 'paystatus',label : '支付状态',editable:true,width : 40,sortable:false,align:'center',formatter: paystatusFormatter},
            {name : 'vbusinesscode',label : '单据编号',editable:true,width : 80,sortable:false,align:'left'},
            {name : 'vtheme',label : '主题',editable:true,width : 80,sortable:false,align:'left'},
            {name : 'vbusinesstype',label : '业务类型',editable:true,width : 60,sortable:false,align:'center',formatter: vbusinesstypeFormatter},
            {name : 'napplymny',label : '申请金额',editable:true,width : 50,sortable:false,align:'left'},
			{name : 'npaymny',label : '付款金额',editable:true,width : 50,sortable:false,align:'left'},
            {name : 'dapplydate',label : '经办日期',editable:true,width : 50,sortable:false,align:'center'},
            {name : 'dimportdate',label : '导入日期',editable:true,width : 50,sortable:false,align:'center'},
            {name : 'dpaydate',label : '付款日期',editable:true,width : 50,sortable:false,align:'center'},
            {name : 'paybankname',label : '付款银行',editable:true,width : 80,sortable:false,align:'center',hidden:true},
            {name : 'payaccountcode',label : '付款账户',editable:true,sortable:false,width : 80,align:'center',hidden:true}
        ],
		ondblClickRow: function (rowid) {
//				var row = $("#list2").jqGrid('getRowData', rowid);
//				if (row.status == i18nDef['draft']) {
//					window.open("../customForm/dist/index.html?type=edit&id=" + row.id + "&customFormId=" + customFormId + "&session=" + sessionId + "&time=" + Math.random());
//				} else {
//					window.open("/platform-app/flow/runtime/approve/flow.html?instanceId=" + row.instanceId + "&businessId=" + row.id);
//				}
		},
		loadError:function(xhr,status,error){
	    	//异常处理
	    	console.log(xhr.status);
	    	if(xhr.status==404){
	    		pop_tip_open("red","请求url有误！");
	    		return;
	    	}
	    	if(xhr.status==405){
	    		pop_tip_open("red","请求方法有误！");
	    		return;
	    	}
	    	pop_tip_open("red","网络异常,请联系管理员！");
	    },
	    loadComplete:function(xhr){
	    	console.log(xhr);
	    	if(!xhr.success){
	    		switch (xhr.code) {
				case "50000":
					pop_tip_open("red",xhr.msg);
					break;
				case "50001":
					pop_tip_open("red",xhr.msg);
					break;
				case "50002":
					pop_tip_open("blue",xhr.msg);
					break;
				case "50003":
					pop_tip_open("red",xhr.msg);
					break;

				default:
					pop_tip_open("red","查询数据失败！");
					break;
				}
    	   }else{
    		   //success
    	   }
	    },
		onCellSelect: function () {
			if (rowDataBefore != null && rowDataBefore != 'undefined') {
				$('#list2 ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
			}
		},
		onSelectRow: function () {
			var rowId = $('#list2').jqGrid("getGridParam", "selrow");
			rowData = $('#list2').jqGrid('getRowData', rowId);
		},
		gridComplete: function () {
			rowDataBefore = rowData;
			if (rowDataBefore != null && rowDataBefore != 'undefined') {
				$('#list2').setSelection(rowDataBefore.id, true);
				$('#list2 ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
			}
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
//			toGetFormSearchInfo();
		},
		rowNum: 20, //一页显示多少条
		rowList: [20, 50, 100, 200], //可供用户选择一页显示多少条
		pager: '#pager2', //表格页脚的占位符(一般是div)的id
		sortname: 'id', //初始化的时候排序的字段
		sortorder: "desc",
		viewrecords: true
	}).navGrid('#pager2', {
		add: false,
		edit: false,
		del: false,
		search: false,
		refresh: false
	});
}


function reloadGrid(){
	$('#list2').jqGrid().trigger("reloadGrid");
}

//过滤特殊字符
function filterSpecStr(strSrc) {
	var filtered = strSrc.replace(/\t/g, '    ');
	filtered = filtered.replace(/\r|\n/g, '');
	return filtered;
}


/**
 * 动态表格展示
 * @param cellvalue  	当前cell的值
 * @param options		该cell的options设置，包括{rowId, colModel,pos,gid} 
 * @param rowObject		当前cell所在row的值，如{ id=1, name="name1", price=123.1, ...}
 * @returns
 */
function operateFormatter(cellvalue, options, rowObject) {
	var formShowColumnJsonVal;
	try {
		if (rowObject.formValueJson) {
			formShowColumnJsonVal = JSON.parse(filterSpecStr(rowObject.formValueJson));
		}
	} catch (e) {
		pop_tip_open("red", "表单值JSON解析失败。");
	}
	return getColValue(options.colModel.name,formShowColumnJsonVal);
}

/**
 * 动态获取显示值
 * @param currentColName
 * @returns
 */
function getColValue(currentColName,formShowColumnJsonVal){
	var resValue="";
	for(var k in formShowColumnJsonVal) {
	    //遍历对象，k即为key，obj[k]为当前k对应的值
	    var formShow=formShowColumnJsonVal[k];
	    console.log(formShow);
		if (formShow && formShow.rewirteFlag==currentColName) {
			if (formShow.cmpValueShowName == null || formShow.cmpValueShowName == "null") {
				resValue = "";
			} else {
				resValue = formShow.cmpValueShowName;
				break;
			}
		} else {
			resValue = "";
		}
	}
	return resValue;
}

/**
 * 导入资金平台
 */
function importFundPayment(){
	var dataParam=[];
	var flag=true;
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		pop_tip_open("blue","请选择要导入的行！");
		return;
	}
	for(var i=0;i<ids.length;i++){
		var selData=$('#list2').jqGrid('getRowData',ids[i]);
		if(selData.importstatus!=""){
			flag=false;
			pop_tip_open("blue","请选择未导入资金平台的记录!");
			return;
		}
		if(selData.npaymny !=null && parseFloat(selData.npaymny)>0){
			flag=false;
			pop_tip_open("blue","本地已付款的单据不能导入资金平台!");
			return;
		}
		if(selData.bisoverrule!=null && selData.bisoverrule==1){
			flag=false;
			pop_tip_open("blue","请选择未支付驳回的记录!");
			return;
		}
		if(/\s/.test(selData.vbusinesscode)){
			flag=false;
			pop_tip_open("blue","业务编码有误!");
			return;
		}
		dataParam.push(selData);
	}
	ids = ids.join(",");
	if(flag){
		$.ajax({
		   url: hostUrl+"sys/base/customFormInstance/importFundPayment/"+ids,
//	       data:JSON.stringify(ids.join(",")),
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
            		   pop_tip_open("green","导入成功！");
            		   reloadGrid();
	               }else {
	            	   if(result!=null && result>0){
	            		   reloadGrid();
	            	   }
	                   pop_tip_open("red",msg);
	               }
	           }
	       }
	   });
	}
}

/**
 * 资金平台同步
 */
function synFund(){
	$.ajax({
		   url: hostUrl+"sys/base/customFormInstance/synFund",
	       data:JSON.stringify({}),
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	         		   pop_tip_open("green","同步成功！");
	         		   reloadGrid();
	               }else {
	                   pop_tip_open("red",msg);
	               }
	           }
	       }
	   });
}

/**
 * 业务类型格式化
 */
function vbusinesstypeFormatter(cellvalue, options, rowObject){
	if (cellvalue == "1") {
		return "外部结算-有无合同付款";
	} else if(cellvalue == "2"){
		return "外部结算-退工程保证金";
	} else if(cellvalue == "3"){
		return "外部结算-销售类退款";
	} else if(cellvalue == "4"){
		return "外部结算-报销(含工资)";
	} else if(cellvalue == "5"){
		return "外部借款";
	} else if(cellvalue == "6"){
		return "员工结算-报销";
	} else if(cellvalue == "7"){
		return "员工结算-借款";
	} else if(cellvalue == "8"){
		return "资金调拨";
	} else if(cellvalue == "9"){
		return "退质保金";
	} else{
		return "";
	}
}
/**
 * 导入状态格式化
 */
function importstatusFormatter(cellvalue, options, rowObject) {
	if (cellvalue == "1") {
		return "<span class='bbsIcon yes'></span>";
	} else {
		return "";
	}
}

/**
 * 支付状态格式化
 */
function paystatusFormatter(cellvalue, options, rowObject) {
	if (cellvalue == "2") {
		return "<span class='bbsIcon yes'></span>";
	} else if (cellvalue == "3") {
		return "<span class='bbsIcon no'></span>";
	} else{
		return "";
	}
}

/**
 * 表单查询功能实现
 */
//function toGetFormSearchInfo(){
//	var obj = jQuery("#list2").jqGrid().getRowData();//读取表格所有数据
//	if(obj && obj.length>0){
//		var formSearchSeniorJson = JSON.parse(obj[0].formSearchSeniorKey);
//		if (formSearchSeniorJson && formSearchSeniorJson.length > 0) {
//			for (var i = 0; i < formSearchSeniorJson.length; i++) {
//				var temp = formSearchSeniorJson[i];
//				if (temp['name'] == "主题") {
//					$("#vtheme").attr("dd",temp['id']);
//				}
//				if (temp['name'] == "经办日期") {
//					$("#dapplydate").attr("dd",temp['id']);
//				}
//				if (temp['name'] == "付款日期") {
//					$("#dpaydate").attr("dd",temp['id']);
//				}
//				if (temp['name'] == "导入日期") {
//					$("#dimportdate").attr("dd",temp['id']);
//				}
//				if (temp['name'] == "单据编号") {
//					$("#vbusinesscode").attr("dd",temp['id']);
//				}
//			}
//		}
//	}
//}

/**
 * 查询
 */
function search(searchType) {
	var customFormInstanceDto = {};
	var searchSql = "";
	customFormInstanceDto.formSearchSeniorValue = null;
	if(searchType==1){//高级查询
		if($("#vtheme").val()){
			searchSql += getSearchSeniorSql($("#vtheme").attr("dd"), $("#vtheme").val(), "text",searchType);
		}
		if($("#dapplydate").val()){
			searchSql += getSearchSeniorSql($("#dapplydate").attr("dd"), $("#dapplydate").val(), "date",searchType);
		}
		if($("#dpaydate").val()){
			searchSql += getSearchSeniorSql($("#dpaydate").attr("dd"), $("#dpaydate").val(), "date",searchType);	
		}
		if($("#dimportdate").val()){
			searchSql += getSearchSeniorSql($("#dimportdate").attr("dd"), $("#dimportdate").val(), "date",searchType);
		}
		if($("#vbusinesstype").val()){
			searchSql += " and t.business_type = '"+$("#vbusinesstype").val()+"' ";
		}
		if (searchSql) {
			customFormInstanceDto.formSearchSeniorValue = searchSql;
		}
	}else{//模糊查询
		if($("#keywords").val()){
			searchSql += getSearchSeniorSql($("#vtheme").attr("dd"), $("#keywords").val(), "text",searchType);
//			searchSql += getSearchSeniorSql($("#vbusinesscode").attr("dd"), $("#keywords").val(), "text",searchType);
		}
		if (searchSql) {
			searchSql = "and (" + searchSql.substring(2) + ")";
			customFormInstanceDto.formSearchSeniorValue = searchSql;
		}
	}
	console.log(searchSql);
	$("#list2").jqGrid('setGridParam', {
		postData: customFormInstanceDto
	}).trigger('reloadGrid');
	return false;
}


/**
 * 高级查询拼接sql
 */
function getSearchSeniorSql(id, value, type,searchType) {
	var headStr = "";
	if(searchType==1){
		headStr = " and s.form_search_senior_value like ";
	}else{
		headStr = "or s.form_search_senior_value like ";
	}
	var delimiter = ":";
	var sql = "";
	if (type == "text") {
		sql = " '%" + id + delimiter + "%" + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	} else if (type == "date") {
		sql = " '%" + id + delimiter + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	}
	return headStr;
}