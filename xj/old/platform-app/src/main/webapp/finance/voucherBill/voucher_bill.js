var rowData;//当前选中数据
var rowDataBefore;
var appCode ;
var accountSetId ;
var companyId;
var bl = false; // 凭证生成加载业务单据，false查询，true重新加载
var exportbl = false; // 查询凭证，false查询，true重新加载
//数据列的定义
var colModeldata =[];

$(window).resize(function(){
	resizeHeight();
	$("#systemGrid").jqGrid().setGridWidth($(".grid-box").width()-2, true);
	$("#systemGrid").jqGrid().setGridHeight($(".grid-box").height()-60, true);
	$('#generateList').jqGrid().setGridWidth($(".con-table:visible").width()-2, true);
	$('#generateList').jqGrid().setGridHeight($(".con-table:visible").height()-60, true);
	$('#exportList').jqGrid().setGridWidth($(".con-table:visible").width()-2, true);
	$('#exportList').jqGrid().setGridHeight($(".con-table:visible").height()-60, true);
});
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	//右侧table
	$('.tabs').height(w_h - $('.tabContainer').outerHeight()-20+'px' );
	$(".grid-box").height((w_h-$('.l_title').height()-20)+"px");

	//
	$(".con-table").height(w_h-$('.tabContainer').outerHeight()-$(".con-tit:visible").outerHeight()-19+"px");
	/**/
}
$(function(){
	//切换标签
	switchPage();
	resizeHeight();
	/**
	 * tab页切换
	 */
	function switchPage() {
		$('.tabbtn').click(function() {

			$('.tabcontent').css('display','none');
			var index = $(this).index();
			$('.tabbtn').removeClass('active');
			$(this).addClass('active');
			var tabitem = $('.tabcontent')[index];
			$(tabitem).css('display','block');
			$(".con-table").height($(window).height()-$('.tabContainer').outerHeight()-$(".con-tit:visible").outerHeight()-19+"px");
		})
	}
	$('.date').datetimepicker({
		language: 'zh-CN', //语言
		format: 'yyyy-mm-dd',//显示格式
		minView: "month",//设置只显示到月份
		initialDate: new Date(),//初始化当前日期
		autoclose: true,//选中自动关闭
		todayBtn: true//显示今日按钮
	});

	var bdate = myformatter(getCurrentMonthFirst(new Date()));
	var edate = myformatter(new Date());
	$("#beginDate").val(bdate);  
	$("#endDate").val(edate);
	$("#auditDateBegin").val(bdate);  
	$("#auditDateEnd").val(edate);
	$("#appDateBegin").val(bdate);  
	$("#appDateEnd").val(edate);
	appCode = $.xljUtils.getUrlParam('app_code');
	getFinanceSystem();
});


function myformatter(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
} 
function getCurrentMonthFirst(date){
 date.setDate(1);
 return date;
}
/**
 * @auther chc
 * @discution grid show
 * 查询财务系统公司
 */
function getAccountSetList(){
	var registerId = $('#selectFinanceSystem').val();
	jQuery("#systemGrid").jqGrid(
            {
                url: hostUrl+'finance/accountSet/getSystemRegisterpage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json",
				width:$(".grid-box").width()-2,
				height:$(".grid-box").height()-60,
                autowidth:true,
                rownumbers:true,
                postData:{registerId:registerId,appCode:appCode},
                jsonReader : {
                    repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                             {name : 'id',label : 'id',hidden:true,align : "center"},
                             {name : 'code',label : '帐套编码',align : "center"},
                             {name : 'companyCode',label : '公司编码',align : "center"},
                             {name : 'companyName',label : '公司名称',align : "center"},
                         ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#systemGridPage',//表格页脚的占位符(一般是div)的id
                
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#systemGrid'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#systemGrid').jqGrid("getGridParam","selrow");
        		    rowData = $('#systemGrid').jqGrid('getRowData',rowId);
        		    accountSetId=$('#systemGrid').jqGrid("getGridParam","selrow");
          		    getVoucherCompany();
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                loadComplete:function(xhr){
               	 var arr = $("#systemGrid").jqGrid("getRowData"); 


               	 if(arr!=null && arr.length>0){
               		$('#systemGrid').setSelection(arr[0].id,true);
	                 accountSetId = arr[0].id;
               	 }
                },
                gridComplete:function(){
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					$("#systemGridPage_right,#systemGridPage_left").remove();
					rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#systemGrid').setSelection(rowDataBefore.id,true);
                    	$('#systemGrid'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });
    
}

/**
 * author:chc
 * describe:查询所有财务系统数据 
 * param:null
 */
function getFinanceSystem(){
	var updatedata ={
			status : 1,
			delflag:0
		};
	$.ajax({
        type:'post',
        url:hostUrl+'finance/sysRegister/queryList',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        async: false,
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 for(var o in company){
        				 $("#selectFinanceSystem").append("<option value='"+company[o].id+"'>"+company[o].fiSysName+"</option>")
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 
	$("#selectFinanceSystem option:first").prop("selected", 'selected');
	getAccountSetList();
}
function searchFinanceSys(){
	var registerId = $('#selectFinanceSystem').val();
	jQuery("#systemGrid").jqGrid("setGridParam",{postData:{registerId:registerId,appCode:appCode}}).trigger("reloadGrid");
	getAccountSetList();	
}

function getVoucherCompany(){
	var updatedata ={};
	updatedata.accountSetId = accountSetId;
	$.ajax({
        type:'post',
        url:hostUrl+'finance/accountSetCompany/queryList',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify('{"delflag":"0","accountSetId":"'+accountSetId+'"}'),
        async: true,
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 if(company.length==0){
        				 $("#selectCompany").empty();
        				 $("#billType").empty();
        				 $("#exportBillType").empty();
        			 }else{
        				 $("#selectCompany").empty();
        				 $("#billType").empty();
        				 $("#exportBillType").empty();
        				 for(var o in company){
            				 $("#selectCompany").append("<option value='"+company[o].companyId+"'>"+company[o].companyName+"</option>")
            			 } 
        				 $("#selectCompany option:first").prop("selected", 'selected');
        				 companyId = $('#selectCompany').val();
        				 getVoucherTemplatType();
        			 }
        		 }else{
        			 $("#selectCompany").empty();
        		 }
        	}else{
        		$("#selectCompany").empty();
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 
	
	$('#generateList').jqGrid("clearGridData");
	$('#exportList').jqGrid("clearGridData");
	$('#generatePager').val("");
	$('#exportPager').val("");
}
function changeCompany(value){
	companyId = value;
	getVoucherTemplatType();
}
function getVoucherTemplatType(){
	var updatedata ={
			accountSetId:accountSetId,
			companyId:companyId,
			delflag:0,
			status:1
		};
		$.ajax({
	        type:'post',
	        url:hostUrl+'finance/voucherTemplateType/queryList',
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        async: true,
	        success: function(data) {
	        	if(data.success){
	        		 if(data.result){	
	        			 var company=data.result;
	        			 if(company.length==0){
	        				 $("#billType").empty();
	        				 $("#exportBillType").empty();
	        			 }else{
	        				 $("#billType").empty();
	        				 $("#exportBillType").empty();
	        				 var ts = new TreeSelector("billType");
	        				 var exportts = new TreeSelector("exportBillType");
	        				 for(var o in company){
	            				 //$("#billType").append("<option value='"+company[o].id+"'>"+company[o].name+"</option>")
//	        					 alert(company[o].name+"---"+company[o].parentId);
	        					 ts.add(company[o].id,company[o].parentId,company[o].name);
//	            				 $("#exportBillType").append("<option value='"+company[o].id+"'>"+company[o].name+"</option>")
	        					 exportts.add(company[o].id,company[o].parentId,company[o].name);
	            			 } 
	        				 ts.createTree();
	        				 exportts.createTree();
	        				 $("#billType option:first").prop("selected", 'selected');
	        				 $("#exportBillType option:first").prop("selected", 'selected');
	        			 }
	        		 }else{
	        			 $("#billType").empty();
	        			 $("#exportBillType").empty();
	        		 }
	        	}else{
	        		$("#billType").empty();
	        		 $("#exportBillType").empty();
	        		pop_tip_open("red",data.msg);
	        	}
	     },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
		}) 
}

function billTypeChange(value){
	$('#exportBillType').val(value);
	$('#billType').val(value);
}

var selectType ;
var authBegain ; //付款开始日期
var authEnd ;	//	付款结束日期
var	appauthBegain ; //审核开始日期
var	appauthEnd ; 	// 审核结束日期
var billType ;
var isFull;
var companyName ;
//查询业务单据
function loadBill(){
	companyId = $("#selectCompany").val();
	companyName = $("#selectCompany").find("option:selected").text();
	selectType = $('#generateType input[name="pz_type"]:checked ').val();
	authBegain = $('#auditDateBegin').val(); //付款开始日期
	authEnd = $('#auditDateEnd').val();	//	付款结束日期
	appauthBegain = $('#appDateBegin').val(); //审核开始日期
	appauthEnd = $('#appDateEnd').val(); 	// 审核结束日期
	billType = $("#billType").val();
	if(!bl){
		loadBillGridColmn();
	}else{
		$('#generateList').jqGrid("setGridParam",{postData:{accountSetId:accountSetId,selectType:selectType,authBegain:authBegain,authEnd:authEnd,
        	appauthBegain:appauthBegain,appauthEnd:appauthEnd,billType:billType,companyId:companyId,companyName:companyName}}).trigger("reloadGrid");
	}
}
function loadBillGridColmn(){
	var updatedata ={
			billType:billType
		};
	$.ajax({
        type:'post',
        url:hostUrl+'finance/voucherBill/getBillCol',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        async: true,
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 colModeldata=[];
        			 colModeldata.push({name : 'id',label : 'id',hidden:true,align : "center"});
        			 var company=data.result;
    				 for(var o in company){
    					 colModeldata.push({name : company[o].code,label : company[o].name,align : "center"});
        			 } 
    				 colModeldata.push({name : 'billType',label : 'billType',hidden:true,align : "center"});
    				 loadBillGrid();
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 
	
}
function loadBillGrid(){
	jQuery("#generateList").jqGrid(
            {
                url: hostUrl+'finance/voucherBill/getBillPage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json",
				height:$(".con-table:visible").height()-60,
				width:$(".con-table:visible").width()-2,
                autowidth:true,
                rownumbers:true,
                multiselect:true,
                postData:{
                	accountSetId:accountSetId,selectType:selectType,authBegain:authBegain,authEnd:authEnd,
                	appauthBegain:appauthBegain,appauthEnd:appauthEnd,billType:billType,companyId:companyId,companyName:companyName
                	},
                jsonReader : {
                    repeatitems: false
                },
                colModel : colModeldata,
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#generatePager',//表格页脚的占位符(一般是div)的id
                
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#generateList'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#generateList').jqGrid("getGridParam","selrow");
        		      rowData = $('#generateList').jqGrid('getRowData',rowId);
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                gridComplete:function(){
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#generateList').setSelection(rowDataBefore.id,true);
                    	$('#generateList'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });
	bl = true;
}
//生成凭证
function createVouchar(flag){
	var ids=$('#generateList').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请至少选择一行！");
		return;
	}
	//var idarr = ids.split(',');
	var billtypes = "";
	for(var i=0;i<ids.length;i++){
		var rowData = $('#generateList').jqGrid('getRowData',ids[i]);
		billtypes += encodeURI(rowData.billType)+",";
	}
	$("#loading").show();
	
	var updatedata ={
			accountSetId:accountSetId,
			companyId:companyId,
			billType:billType,//单据类型
			typeId:billType,//单据类型
			ids:ids,
			billtypes:billtypes,
			selectType:selectType,
			flag:flag
	};
	$.ajax({
        type:'post',
        url:hostUrl+'finance/voucherBill/createVouchar/',
        dataType:'JSON',
        data:JSON.stringify(updatedata),
        contentType : 'application/json',
        success: function(data){
        	if(data.success){
        		$("#loading").hide();
        		pop_tip_open("red","生成成功！");
        		$('#generateList').jqGrid("setGridParam",{postData:{accountSetId:accountSetId,selectType:selectType,authBegain:authBegain,authEnd:authEnd,
                	appauthBegain:appauthBegain,appauthEnd:appauthEnd,billType:billType,companyId:companyId,companyName:companyName}}).trigger("reloadGrid");
        	}else{
        		$("#loading").hide();
        		pop_tip_open("red",data.msg);
        	}
        }
	});
}

function noCreateVouchar(){
	var ids=$('#generateList').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请至少选择一行！");
		return;
	}
	var updatedata ={
			accountSetId:accountSetId,
			billType:billType,//单据类型
			ids:ids,
			billtypes:billtypes,
	};
	$("#loading").show();
	$.ajax({
        type:'post',
        url:hostUrl+'finance/voucherBill/noCreateVoucher/',
        dataType:'JSON',
        data:JSON.stringify(updatedata),
        contentType : 'application/json',
        success: function(data){
        	$("#loading").hide();
        	if(data.success){
        		$('#generateList').jqGrid("setGridParam",{postData:{accountSetId:accountSetId,selectType:selectType,authBegain:authBegain,authEnd:authEnd,
                	appauthBegain:appauthBegain,appauthEnd:appauthEnd,billType:billType,companyId:companyId,companyName:companyName}}).trigger("reloadGrid");
        	}
        }
	});
}

//查询凭证
function doSearch(){
	selectType = $('#exportType input[name="pz_type1"]:checked ').val();
	authBegain = $('#beginDate').val(); //生成凭证开始日期
	authEnd = $('#endDate').val();	//	生成凭证结束日期
	billType = $("#exportBillType").val();
	isFull = $("#isFull").val();
	if(!exportbl){
		loadVoucherGrid();
	}else{
		$('#exportList').jqGrid("setGridParam",{postData:{accountSetId:accountSetId,sendStatus:selectType,enterDateBegain:authBegain,enterDateEnd:authEnd,
			templateTypeId:billType,status:isFull}}).trigger("reloadGrid");
	}
}
function loadVoucherGrid(){
	jQuery("#exportList").jqGrid(
            {
                url: hostUrl+'finance/voucherBill/getVoucherBillPage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json",
				height:$(".con-table:visible").height()-60,
				width:$(".con-table:visible").width()-2,
                autowidth:true,
                rownumbers:true,
                multiselect:true,
                postData:{accountSetId:accountSetId,sendStatus:selectType,enterDateBegain:authBegain,enterDateEnd:authEnd,
            		templateTypeId:billType,status:isFull
                	},
                jsonReader : {
                    repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                             {name : 'id',label : 'id',hidden:true,align : "center"},
                             {name : 'billType',label : '单据类型',align : "center"},
                             {name : 'word',label : '凭证字',align : "center"},
                             {name : 'voucherNo',label : '凭证号',align : "center"},
                             {name : 'enterDate',label : '凭证日期',align : "center"},
                             {name : 'debitAmount',label : '借方金额合计',align : "center"},
                             {name : 'creditAmount',label : '贷方金额合计',align : "center"},
                             {name : 'enterName',label : '制单人',align : "center"},
                             {name : 'sendStatus',label : '状态',align : "center",formatter:function(type){
                             	if (type == "0") {
                             		return "未输出";
                             	} else if (type == "1") {
                             		return "已输出";
                             	} else if (type == "2") {
                             		return "输出失败";
                             	} else {
                             		return "";
                             	}
                             }},
                             {name : 'notFullError',label : '不完整凭证描述',align : "center"},
                             {name : 'errorCause',label : '结果描述',align : "center"}
                         ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#exportPager',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	window.open("voucher_entry.html?id="+rowid+"&accountSetId="+accountSetId);
                },
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#exportList'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#exportList').jqGrid("getGridParam","selrow");
        		      rowData = $('#exportList').jqGrid('getRowData',rowId);
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                gridComplete:function(){
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#exportList').setSelection(rowDataBefore.id,true);
                    	$('#exportList'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });
	exportbl = true;
}

function outputVoucher(){
	var ids=$('#exportList').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请选择要输出的行！");
		return;
	}
	$("#loading").show();
	$.ajax({
		url:hostUrl+"finance/voucherBill/outputVoucher/"+ids,
		type:'post',
		contentType : 'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			$("#loading").hide();
			if (resultData&&resultData.success) {
				if(resultData.code==1){
					$('#exportList').jqGrid().trigger("reloadGrid");
					pop_tip_open("green","输出成功！");
					$('#exportList').jqGrid().trigger("reloadGrid");
				}else{
					pop_tip_open("green","未输出！");
				}
				
			}else{
				pop_tip_open("red",resultData.msg);
				$('#exportList').jqGrid().trigger("reloadGrid");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$("#loading").hide();
			$.xljUtils.getError(jqXHR.status);
        }
	});
}

function delVoucherBill(){
	var ids=$('#exportList').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	  pop_text_open("blue",'确认要删除这这'+ids.length+'条数据吗？',function(){
			$.ajax({
				url:hostUrl+"finance/voucherBill/deletePseudoBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						pop_tip_open("green","删除成功！");
						$('#exportList').jqGrid().trigger("reloadGrid");
					}else{
						pop_tip_open("red",resultData.msg);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
			});
	  },function(){
		  return;
	  });	
}

function download(filename){
	var ids=$('#exportList').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请选择要下载的行！");
		return;
	}
	if(ids.length>1){
		pop_tip_open("blue","请选择一行！");
		return;
	}
	location.href=hostUrl + "finance/voucherBill/downLoad?voucherid="+ids+"&filename="+filename;
}