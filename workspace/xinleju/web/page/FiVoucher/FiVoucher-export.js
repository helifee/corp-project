
/**
 * 当前正在编辑的科目
 */
var curCaption = null;

/**
 * 当前正在编辑的辅助核算
 */
var curAssMap = null;
var curAssMapDetail = null;

/**
 * 当前正在编辑的现金流量项目
 */
var curCashFlow = null;

var updatAssNames = new Array();
var updatAssCodes = new Array();
var updatAssContent = new Array();

/**
 * 双击凭证列表的行时，打开凭证信息查看对话框，查看凭证。
 */
function showVoucherInfo(rowIndex, rowData) {
	$("#dlg_voucherInfo").dialog("open");
	var id = rowData.id;
	$("#voucherId").val(id);
	// 根据凭证id查询出凭证信息
	$.post("FiVoucher!getVoucherById.do", {
		voucherId : id
	}, function(res) {
		var date1 = $('#date1');
    	date1.hide();
    	$('#date1').next('span').hide();
		$("#_flag").html(res.fiVoucherData.flag);
		$("#_voucherNo").html(res.fiVoucherData.voucherNo);
		$("#_enter").html(res.fiVoucherData.enter);
		var d1 = dateFormatter(res.fiVoucherData.postingDate);
		$("#_postingDate").html(d1);
		var d3 = dateFormatter(res.fiVoucherData.createDate);
		$("#_prepareddate").html(d3);
		$('#_prepareddate').show();
		var d2 = dateFormatter(res.fiVoucherData.exportDate);
		$("#_exportDate").html(d2);
		$("#_errorCause").html(res.fiVoucherData.errorCause);
		$("#_debitAmount").html(res.fiVoucherData.debitAmount.toFixed(2));
		$("#_creditAmount").html(res.fiVoucherData.creditAmount.toFixed(2));
		var amount = res.fiVoucherData.creditAmount
				- res.fiVoucherData.debitAmount;
		$("#_amount").html(amount);
       /* $("#dg_voucher_entry").datagrid({
			data : res.fiEntryDataList
		});*/
		$("#dg_bill").datagrid({
			data : res.voucherBillList
		});
		
		initVoucherEntry(id);
      

	}, "json")
}



/**
 * 双击相关单据是打开单据详细页
 */
function showBillInfo(rowIndex, rowData){
	var rcbx_detail_url = "ex/expensexecute/dayexpense/dayexpense!todayEdit.do";
	var htfk_detail_url = "ex/expensexecute/conpayapply/conpayapply!editPage.do";
	var ljk_detail_url = "ex/expensexecute/borrowmon/$%7BpageContext.request.contextPath%7D/expensexecute/borrowmon/borrowmon!editdblShenpi.do";
	//var ljkhk_detail_url = "http://127.0.0.1:100/ex/expensexecute/payregister/$%7BpageContext.request.contextPath%7D/expensexecute/payregister/payregister!loginfk.do?payregist={"biscanedit":0,"bisoverrule":0,"condmap":null,"corpid":10,"corpname":"","dapplydate":"2016-04-22","dapprovedate":"","deptid":58,"deptname":"","dimportdate":"","dpaydate":"","dr":0,"id":6125,"importstatus":0,"napplymny":1000,"npaymny":0,"operatorid":0,"payformid":"","paystatus":2,"reverse1":"","reverse10":0,"reverse11":"","reverse12":"","reverse13":"","reverse2":"","reverse3":"","reverse4":"","reverse5":"","reverse6":0,"reverse7":0,"reverse8":0,"reverse9":0,"selected":false,"sourceid":5988,"ts":"","userValue":null,"vapprovecode":"","vapproveid":0,"vapprovenote":"","vapprovestatus":"","vbusinesscode":"JTBB-XXLC-2016-4-0083","vbusinesstype":"日常报销","vcategory":"","vendstatus":0,"voperator":"ç³»ç»ç®¡çå","vsourcetype":"","vtheme":"rrrr"}&";
	//var hk_sxqs = "ex/expensexecute/matterask/$%7BpageContext.request.contextPath%7D/expensexecute/matterask/matterask!editdblShenpi.do";
	var hk_sxqs = "ex/expensexecute/matterask/matterask!editdblShenpi.do";
	
	var sa_url = "sa/feebusiness/szgl/szgl_djcx!toDetail.do?id=";
	var co_url = "web/PaymentRegist!payRegistView.do?paymentRegist.id=";
		
	var bill_id = rowData.billId;
	var corp_id = rowData.corpId;
	var dept_id = rowData.deptId;
	var type = rowData.billType;
	var hostn = window.location.host;
	var contxtWebPath=$("#contextPath").val();
	if(type == "日常报销"){
		window.open(contxtWebPath+rcbx_detail_url+"?id="+bill_id+"&corpid="+corp_id+"&deptid="+dept_id);
	}
	if(type == "合同付款"){
		window.open(contxtWebPath+htfk_detail_url+"?id="+bill_id+"&corpid="+corp_id);
	}
	if(type == "领借款"){
		window.open(contxtWebPath+ljk_detail_url+"?borrowid="+bill_id+"&corpid="+corp_id);
	}
	
	if(type=="收款单" || type=="退款单" || type=="结转单" || type=="换票单" || type=="收结转"){
		window.open(contxtWebPath+sa_url+bill_id);
	}
	if(type=="事项请示"){
		window.open(contxtWebPath+hk_sxqs+"?borrowid="+bill_id+"&corpid="+corp_id);
	}
	//if(type=="付款记录" || type=="工程投入" || type=="单独收发票" ){
		var coUrl = "";
		if(type=='无文本合同'){
			coUrl = "web/NoContractPayment!edit.do?id=" ;
			window.open(contxtWebPath+coUrl+bill_id);
		}else if(type=='补录开发费用'){
			coUrl = "web/DevelopCost!edit.do?paymentApply.id=" ;
			window.open(contxtWebPath+coUrl+bill_id);
		}else if(type=='单独收发票'){
			coUrl = "web/Invoice!edit.do?invoice.id=" ;
			window.open(contxtWebPath+coUrl+bill_id);
		}else if(type=='产值'){
			coUrl = "web/Production!edit.do?production.contractId="+rowData.contractId+"&production.id=" ;
			window.open(contxtWebPath+coUrl+bill_id);
		}else if(type=='代付管理'){
			coUrl = "web/PaymentInstead!edit.do?paymentApply.id=";
			window.open(contxtWebPath+coUrl+bill_id);
		}else{
			coUrl = "web/ContractPayment!edit.do?paymentApply.id=";
			window.open(contxtWebPath+coUrl+bill_id);
		}
		
	//}
}


function initVoucherEntry(vouncherId){
	//alert(vouncherId);
	$('#dg_voucher_entry').datagrid({
		url:'FiVoucher!getVoucherEntryByVoucherId.do?voucherId='+vouncherId,
	    fit:true,
        columns : [[
			    {
				  field : 'id',
				  title : 'id',
				  hidden: true
				},
				{
					  field : 'voucherDataId',
					  title : 'voucherDataId',
					  hidden: true
				},
				{
					  field : 'assName',
					  title : 'assName',
					  hidden: true
				},
				{
					  field : 'captionCode',
					  title : 'captionCode',
					  hidden: true
				},
                {
        		  width:250,
        		  align : 'center',
	        	  field : 'summary',
	        	  title : '摘要',
	        	  editor: {
	                    type: 'text',
	                    options: {
	                        required: true,
	                        missingMessage: '请填入摘要！',
	                        iconWidth: 15
	                    }
	              }
	        	},
	        	{
	        		  width:150,
	        		  align : 'center',
		        	  field : 'captionName',
		        	  title : '会计科目',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        required: true,
		                        missingMessage: '请填入会计科目！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	openCaptionDialog();//打开会计科目窗口
		                            	curCaption=e.data.target;
		                            	initCaptionTreeGrid();
		                            }
		                        }]
		                    }
		                }
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'assCompent',
		        	  title : '辅助核算',
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                    	//readonly: true,
		                        //required: true,
		                        //missingMessage: '请填入辅助核算！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	curAssMap=e.data.target;
		                            	openAassDialog(curAssMap);//打开会计科目窗口
		                            }
		                        }]
		                    }
				      }
		            
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'cashFlowName',
		        	  title : '现金流量项目',
		        	  formatter: function(value,row,index){
			  				if (value != ''){
			  					return row.cashFlowCode+"/"+row.cashFlowName;
			  				}
		  			  },
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	openCashFlowDialog();
		                            	curCashFlow=e.data.target;
		                            	initCashFlowTreeGrid();
		                            }
		                        }]
		                    }
				      }
		            
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'drmny',
		        	  title : '借方金额',
		        	  /*formatter: function(value,row,index){
			  				if (value == 0){
			  					return "";
			  				}else{
			  					return value;
			  				}
		  			  },*/
		        	  editor: {
		                    type: 'text'
		              }
	        	  },
	        	  {
	        		  width:100,
	        		  align : 'center',
		        	  field : 'crmny',
		        	  title : '贷方金额',
		        	  /*formatter: function(value,row,index){
		        		  if (value == 0){
			  					return "";
			  			  }else{
			  					return value;
			  			  }
		  			  },*/
		        	  editor: {
		                    type: 'text'
		              }
	        	  },
	        	  {
	        		  width:200,
	        		  align : 'center',
		        	  field : 'remarks',
		        	  title : '备注',
		        	  editor: {
		                    type: 'text'
		              }
	        	  }
	       ]],
	       onLoadSuccess:function(data){   
	    	   $('#dg_voucher_entry').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
	           
	       },  	      
	       rownumbers:true
	       
	  });
}

//页面初始化
/*$(function(){
	initCaptionTreeGrid();
});*/


/**
 * 增加分录
 */
function append(){
	
    var voucherId = $("#voucherId").val();
	
	var url = contextPath + "/FiVoucher!isSend.do?voucherId="+voucherId;

	$.get(url, {}, function(result) {
		if (result.success=="1") {
			$.messager.alert("提示", "此凭证以输出，无法进行修改!", "info");
		}else{
			var row = {"id":null,"voucherDataId":null,"summary":null,"captionName":null,"assName":null,"drmny":null,"crmny":null,"remarks":null,editing:true};
			$('#dg_voucher_entry').datagrid('appendRow',row);
			//TODO 
			var editIndex = $('#dg_voucher_entry').datagrid('getRows').length-1;
			$('#dg_voucher_entry').datagrid('selectRow', editIndex);
			$('#dg_voucher_entry').datagrid('beginEdit', editIndex);
		}
	},'json');
	
}

/**
 * 打开会计科目选窗口
 */
function openCaptionDialog(){
	$("#captionDialog").dialog("open");
}

/**
 * 打开现金流量项目窗口
 */
function openCashFlowDialog(){
	$("#cashflowDialog").dialog("open");
}

/**
 * 打开辅助核算
 * @param curAssMap
 */
function openAassDialog(curAssMap){
	var row = $("#dg_voucher_entry").datagrid("getSelected");
	//得到当前所选行的索引
	var index = $("#dg_voucher_entry").datagrid("getRowIndex",row);
	var assVal = $(curCaption).parents("td[field=captionName]").next("td").find("input[type=text]").val()
	var assArry = new Array();
	var curAssArray = "";
	//if(curCaption == null){
	if(row.captionId == null || row.captionId==""){
		var row = $("#dg_voucher_entry").treegrid("getSelected");
		//var curStr = encodeURI(row.assName)+row.assCode+encodeURI(row.realAssName);
		//curAssArray += curStr +"&";
		curAssArray = row.assCompent;
	}else{
		assArry = assVal.split(',');
	}
	var assNumber = "";
	for(var i=0;i<assArry.length;i++){
		var val = trim(assArry[i]);
		var objId =  getObjuectId(val);
		//assNumber += objId + ","
		assNumber += val + ","
	}
	
	$('#assMapGrid').datagrid({
		url:'FiAssMapping!bulidEditedAssMaping.do?assStr='+encodeURI(assNumber)+'&curAss='+encodeURI(curAssArray),
	    fit:true,
        columns : [[
			    {
				  field : 'id',
				  title : 'ID',
				  hidden: true
				},
				{
				   field : 'assid',
				   title : 'assid',
				   hidden: true
				},
                {
        		  width:150,
        		  align : 'center',
	        	  field : 'assname',
	        	  title : '核算类型名称'
	        	},
	        	{
	        		  width:260,
	        		  align : 'center',
		        	  field : 'asscode',
		        	  title : '核算内容'/*,
		        	  editor: {
		                    type: 'textbox',
		                    options: {
		                        required: true,
		                        missingMessage: '请填入核算内容！',
		                        iconWidth: 15,
		                        icons: [{
		                            iconCls: 'icon-edit',
		                            handler: function (e) { 
		                            	openAssMapDetailDialog();
		                            	curAssMapDetail=e.data.target;
		                            }
		                        }]
		                    }
		                }*/
	        	  }
	        	  ,
	        	  {
	        		  width:100,
	        		  field:'_operate',
	        		  align:'center',
	        		  formatter:formatOper
	        	  }
	       ]],
	       onDblClickCell: function(index,field,value){
		   		$(this).datagrid('beginEdit', index);
		   		var ed = $(this).datagrid('getEditor', {index:index,field:field});
		   		$(ed.target).focus();
		   		
	   	   }

	  });
	
	
	$("#assMapDialog").dialog("open");
}
var indextag ;
function formatOper(val,row,index){
	return '<a href="#" onclick="openAssMapDetailDialog('+index+')">修改</a>';
}
/**
 *打开辅助核算内容窗口
 */
var bizObjectId = "";
function openAssMapDetailDialog(index){
	indextag = index;
	$("#assMapGrid").datagrid('selectRow',index);
	var row = $("#assMapGrid").datagrid("getSelected");
	bizObjectId = row.assname;
	//alert(bizObjectId);
	$('#assMapDetailGrid').datagrid({
        url: 'FiAssMapping!loadDetails.do?fiAssMapping.assName='+encodeURI(bizObjectId)+'&accountSetId='+document.getElementById("accountSetId").value+"&companyId="+companyId,//传一个业务编码：1代表是公司2代表是项目分期3代表是产品类型
        toolbar: '#tb3',
        columns: [[
			{
				  field : 'assMappingId',
				  title : 'assMappingId',
				  hidden: true
			},
            {
                field: 'assItemCode',
                title: '核算代码',
                width: 150,
                align: 'center'
            },
            {
                field: 'assItemName',
                title: '核算名称',
                width: 150
            } 
            ]],  
        fit: true,
        singleSelect: true,
        rownumber: true
    });
	$('#qckqry').searchbox({
        prompt: '核算名称查找',
        searcher: doSearchAss
    });
	
	$("#assMapDetailDialog").dialog("open");
	
}
/*模糊搜索*/
function doSearchAss(value, name) {
    var urlr=encodeURI(encodeURI('FiAssMapping!loadDetailMap.do?fiAssMapping.assName=' + bizObjectId+'&accountSetId='+document.getElementById("accountSetId").value+"&companyId="+companyId +'&queryParam=' +value ));
	 $('#assMapDetailGrid').datagrid({ url: urlr});
}

/**
 * 过滤空格
 * 
 * @param str
 * @returns
 */
function trim(str)
{ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

function getObjuectId(bizObjectName){
	
	var bizObjectId = 1;
	if(bizObjectName=='项目分期')
		bizObjectId=2;
	if(bizObjectName=='产品类型')
		bizObjectId=3;
	if(bizObjectName=='房间信息')
		bizObjectId=4;
	if(bizObjectName=='银行账户')
		bizObjectId=5;
	if(bizObjectName=='款项名称')
		bizObjectId=6;
	if(bizObjectName=='支付方式')
		bizObjectId=7;
	if(bizObjectName=='付款单位')
		bizObjectId=8;
	if(bizObjectName=='人员档案')
		bizObjectId=9;
	if(bizObjectName=='部门档案')
		bizObjectId=10;
	if(bizObjectName=='供应商辅助核算')
		bizObjectId=11;
	
	return bizObjectId;
}

/**
 * 当科目窗口关闭时调用。取消所有的选择的。
 */
function captionDialogClose(){
	$("#captionGrid").treegrid("unselectAll");
}

/**
 * 当辅助核算窗口关闭时调用。取消所有的选择的。
 */
function assDialogClose(){
	$("#assMapGrid").treegrid("unselectAll");
}

function cashflowDialogClose(){
	$("#cashflowGrid").treegrid("unselectAll");
}

/**
 * 初始化弹出的会计科目窗口的会计科目列表。
 */
function initCaptionTreeGrid(data){
	$('#captionGrid').treegrid({
		  data:captionList,
		  singleSelect : true,
		  toolbar: '#tb1',
		  idField:'id',    
		  treeField:'subcode',
		  fit:true,
	      columns : [[
	                 /* {
			        	  field : 'id',
			        	  checkbox:true
	                  },*/
	                  {
		        		  width:150,
			        	  field : 'subcode',
			        	  title : '会计科目编码'
		        	  },
		        	  {
		        		  width:200,
			        	  field : 'subname',
			        	  title : '会计科目名称'
		        	  },
		        	  {
		        		  width:150,
		        		  align : 'center',
			        	  field : 'assName',
			        	  title : '辅助核算'
		        	  }
		  ]],
		  rownumbers:true
		  
	  });
}

/**
 * 现金流量项目选择对话框确认按钮点击时调用。将选中的现金流量项目赋值到分录中
 */
function cashflowSelect(){		
	var cashflowRow = $("#cashflowGrid").treegrid("getSelected");
	if(!cashflowRow){
		$.messager.alert('提示','请选择一条现金流量项目');   
	}else{
		var row = $("#dg_voucher_entry").datagrid("getSelected");
		//得到当前所选行的索引
		var index = $("#dg_voucher_entry").datagrid("getRowIndex",row);
		//将选择的现金流量设置到输入框
        $(curCashFlow).textbox('setText', cashflowRow.subname);
        row.cashFlowCode = cashflowRow.subcode;
      
        $("#cashflowDialog").dialog("close");

	}
}

/**
 * 初始化弹出的现金流量列表
 */
function initCashFlowTreeGrid(data){
	$('#cashflowGrid').treegrid({
		  data:cashFlowList,
		  singleSelect : true,
		  toolbar: '#tb1',
		  idField:'id',    
		  treeField:'subcode',
		  fit:true,
	      columns : [[
	                 /* {
			        	  field : 'id',
			        	  checkbox:true
	                  },*/
	                  {
		        		  width:150,
			        	  field : 'subcode',
			        	  title : '编码'
		        	  },
		        	  {
		        		  width:200,
			        	  field : 'subname',
			        	  title : '名称'
		        	  }
		        	  
		  ]],
		  rownumbers:true,
		  onClickRow:function(row){

		  }
		  
	  });
}

function assDetailSelect(){
	var assMapDetailRow = $("#assMapDetailGrid").treegrid("getSelected");
	if(!assMapDetailRow){
		$.messager.alert('提示','请选择一个辅助核算内容');   
	}else{
		$("#assMapGrid").datagrid('selectRow',indextag);
		var row = $("#assMapGrid").datagrid("getSelected");
		//得到当前所选行的索引
		//var index = $("#assMapGrid").datagrid("getRowIndex",row);
		//将选择的会计科目设置到输入框
        //$(curAssMapDetail).textbox('setText', assMapDetailRow.assItemName);
		/*row.asscode = assMapDetailRow.assItemName;
        row.assid = assMapDetailRow.assItemCode;*/
		$("#assMapGrid").datagrid('updateRow',{
			index:indextag,
			row:{
				asscode:assMapDetailRow.assItemName,
				assid : assMapDetailRow.assItemCode,
			}
		});
        //alert(row.assid);
        //TODO 设置辅助核算,应该设置id。
        //$(curCaption).parents("td[field=captionName]").next("td").find("input[type=text]").val(captionRow.assName)
        //$(curCaption).parents("td[field=captionName]").next("td").find("input[type=hidden]").val(captionRow.assName)
        //row.assCode = captionRow.assName;
        
        $("#assMapDetailDialog").dialog("close");

	}

}

/**
 * 科目选择对话框确认按钮点击时调用。将选中的会计科目赋值到分录中
 */
function captionSelect(){		
	var captionRow = $("#captionGrid").treegrid("getSelected");
	if(!captionRow){
		$.messager.alert('提示','请选择一个科目');   
	}else{
		var row = $("#dg_voucher_entry").datagrid("getSelected");
		//得到当前所选行的索引
		var index = $("#dg_voucher_entry").datagrid("getRowIndex",row);
		//将选择的会计科目设置到输入框
        $(curCaption).textbox('setText', captionRow.subname);
        row.captionId = captionRow.id;
        row.captionCode = captionRow.subcode;
        //TODO 设置辅助核算,应该设置id。
        $(curCaption).parents("td[field=captionName]").next("td").find("input[type=text]").val(captionRow.assName)
        $(curCaption).parents("td[field=captionName]").next("td").find("input[type=hidden]").val(captionRow.assName)
        row.assCode = captionRow.assName;
        
        $("#captionDialog").dialog("close");
//        $('#grid').datagrid("getRows")[editingId].subid = data.id;
//        $('#grid').datagrid("getRows")[editIndex].assCode = captionRow.assName;
//        $("#grid").datagrid("endEdit",editIndex);
	}
}

//辅助核算选择
function assSelect(){
	
	var assMapArr = new Array();
	var rows = $("#assMapGrid").datagrid('getRows');
	for(var i=0;i<rows.length;i++){
		var index = $("#assMapGrid").datagrid("getRowIndex",rows[i]);
		$('#assMapGrid').datagrid('endEdit', index);
		var oneAssMap = rows[i].assname+","+rows[i].assid+","+rows[i].asscode;
		//alert(oneAssMap);
		assMapArr.push(oneAssMap);
	}
	
	$.ajax({  
          url:"FiAssMapping!buildAssMapStr.do",  
          data:{"assMaps[]":assMapArr},  
          type:"post",  
          success:function(data){  
             if(data.success){
            	 var assStr = data.assStr;
            	 //alert("ceshi---"+data.names+"--"+data.codes+"--"+data.contents);
            	
            	 var row = $("#dg_voucher_entry").datagrid("getSelected");
    			 //得到当前所选行的索引
    			 var index = $("#assMapGrid").datagrid("getRowIndex",row);
    			 //将选择的会计科目设置到输入框
    	         $(curAssMap).textbox('setText', assStr);
    	         $("#assMapDialog").dialog("close");
 
             } 
          }  
     });  
	
}

/**
 * 保存修改后的凭证
 * 
 */
function saveVoucher(){
	var voucherArr = new Array();
	var rows = $("#dg_voucher_entry").datagrid('getRows');
	for(var i=0;i<rows.length;i++){
		var index = $("#dg_voucher_entry").datagrid("getRowIndex",rows[i]);
		$('#dg_voucher_entry').datagrid('endEdit', index);
		var cashFlow = "";
		if(rows[i].cashFlowCode!="" && rows[i].cashFlowName!="" && typeof(rows[i].cashFlowCode)!="undefined" && typeof(rows[i].cashFlowName)!="undefined"){
			cashFlow = rows[i].cashFlowCode+"-" + rows[i].cashFlowName;
		}
		var oneEntryDate = rows[i].id +","+ rows[i].summary + "," + rows[i].captionName + "," + rows[i].captionCode + ","
				+ rows[i].assCompent + "," + rows[i].drmny + "," + rows[i].crmny
				+ "," + rows[i].remarks + "," + rows[i].voucherDataId + "," + cashFlow;      
		voucherArr.push(oneEntryDate);
	}
	$('body').mask("保存中...");
	$.ajax({  
        url:"FiVoucher!UpdateEntryDate.do",  
        data:{"voucherEntys[]":voucherArr,voucherId:$("#voucherId").val()},  
        type:"post",  
        success:function(data){ 
        	$('body').unmask();
           if(data.success){
              alert("保存成功！");
              $('#dg_voucher_entry').datagrid('reload');
              //initVoucherEntry($("#voucherId").val())
           } 
        }  
   });  
	
}

/**
 * 删除分录
 * @returns
 */
function deleteVhoucherEntry(){
	var row = $("#dg_voucher_entry").datagrid("getSelected");
	if(row == null) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "FiVoucher!deleteEntry.do",
				data : {id:row.id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
					} else {
						alert("删除失败！");
					}
					
					$('#dg_voucher_entry').datagrid('reload');
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("删除失败！");
				}
			});
	 }
}

/**
 * 删除凭证
 */
function  deleteVhoucher(){
	/*var status = $("input[name=sendStatus]:checked").val();
	
	if(status == '1'){
		alert("不能删除已输出的凭证！");
		return false;
	}*/
	var rows = $('#dg').datagrid('getSelections');
	var cpList = [];
	//允许删除已输入的凭证 chc edit 2017.2.6
	/*if(rows != null && rows){
		for (var jj = 0,length = rows.length; jj < length; jj++) {
			if(rows[jj].sendStatus == '1'){
				alert("不能删除已输出的凭证！");
				return false;
			}
		}
	}*/
	
	var id = getGridCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "FiVoucher!delete.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
					} else {
						alert("删除失败！");
					}
					
					$('#dg').datagrid('reload');
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("删除失败！");
				}
			});
	 }
}



function showSelectedRow(ths){
	var bizObjectName = $(ths).text();
	//alert(bizObjectName);
	var bizObjectId=1;
	if(bizObjectName=='项目分期')
		bizObjectId=2;
	if(bizObjectName=='产品类型')
		bizObjectId=3;
	if(bizObjectName=='房间信息')
		bizObjectId=4;
	if(bizObjectName=='银行账户')
		bizObjectId=5;
	if(bizObjectName=='款项名称')
		bizObjectId=6;
	if(bizObjectName=='支付方式')
		bizObjectId=7;
	if(bizObjectName=='付款单位')
		bizObjectId=8;
	if(bizObjectName=='人员档案')
		bizObjectId=9;
	if(bizObjectName=='预算部门')
		bizObjectId=10;
	if(bizObjectName=='供应商辅助核算')
		bizObjectId=11;
	
	//alert(bizObjectId);
	
	showGrid2(bizObjectId);
}

function showGrid2(bizObjectId){
	//var datagrid; // 定义全局变量datagrid
	//var editRow = undefined; // 定义全局变量：当前编辑的行
	$('#grid2').datagrid({
			url : 'FiAssMapping!loadlistDetail.do?fiAssMapping.bizObjectId=' + bizObjectId
					+ '&accountSetId='
					+ document.getElementById("accountSetId").value
					+ "&companyId=" + companyId,
			//toolbar : '#tb1',
			columns : [ [ 
					  {
						  field : 'id',
						  title : 'ID',
						  hidden: true
					  },
			          {
						field : 'assItemCode',
						title : '核算代码',
						width : 150,
						align : 'center'
			          }, {
						field : 'assItemName',
						title : '核算名称',
						width : 150
			          }

			          ] ],
			fit : true,
			border : false,
			singleSelect : true,
			rownumber : true
	});
	    
}

/**
 * 查询凭证
 */
function doSearch() {
	var accountSetId = $("#accountSetId").val();
	//var isFull = $("#isFull").val();
	var isFull = $('#isFull').combobox('getValue');

	var status = $("input[name=status]:checked").val();
	var beginDate = $('#beginDate').datetimebox('getValue');
	var endDate = $('#endDate').datetimebox('getValue');
	/*window.parent.setBeginDate(beginDate);
	window.parent.setEndDate(endDate);*/
	//获取选中的单据类型
	var t = $('#bill_type').combotree('tree');	// 获取树对象
	var n = t.tree('getSelected');

	var type_id;
	if(n != null){
		type_id = n.id;
	}

	var queryParams = {
		status : status,
		beginDate : beginDate,
		endDate : endDate,
		accountSetId : accountSetId,
		typeId : type_id,
		isFull:isFull
	}
	$("#dg").datagrid({
		url : "FiVoucher!searchVoucher.do",
		queryParams : queryParams,
		pageSize:9999,
		pageList: [9999,10000],
		pagination:true
	});
	
}

/**
 * 状态字段格式化
 */
function statusFormatter(value, row, index) {
	if (value == "0") {
		return "未输出";
	} else if (value == "1") {
		return "已输出";
	} else if (value == "2") {
		return "输出失败";
	} else {
		return "";
	}
}

/**
 * 日期格式化
 * 
 * @param value
 * @param row
 * @param index
 * @returns
 */
function dateFormatter(value, row, index) {
	if (!value) {
		return "";
	}
	if (value.length >= 10) {
		return value.substring(0, 10);
	} else {
		return "";
	}
}

/**
 * 单据类型格式化
 * 
 * @param value
 * @param row
 * @param index
 * @returns
 */
function typeFormatter(value, row, index) {
	
	for ( var i = 0; i < typeListJson.length; i++) {
		var type = typeListJson[i];
	    if (type.id == value) {
			return type.name;
		}
	}
}
/**
 * 输出凭证
 */
function outputVoucher() {
	var rows = $("#dg").datagrid("getSelections");
	var pageNumber = $('#dg').datagrid('options').pageNumber;
	//var voucherInitNo = $("#voucherInitNo").val();
	var ids="";
	if(rows.length>0){
		$.messager.alert("提示", "正在输出请稍等。。。", "info");
		$('.panel-tool-close').hide();
		$('.messager-button').hide();
		for(var i=0;i<rows.length;++i){
			ids+=rows[i].id+",";
		}
		
		var url = contextPath + "/FiVoucher!outputVoucher.do?ids="+ids+"&page="+pageNumber + "&syid="+syid;

		$.get(url, {}, function(result) {
			$(".messager-body").window('close');
			$('.panel-tool-close').show();
			if (result.success=="1") {
				$.messager.alert("提示", "凭证输出成功!", "info");
			} else if(result.success=="2") {
				$.messager.alert("提示", "凭证输出失败!", "error");
				alert(result.xmlFile);
			}else{
				$.messager.alert("提示", "凭证未输出!", "error");
			    
			}
			doSearch();
		},'json');
	}else{
		$.messager.alert("提示", "请选择一条数据!", "info");
	}
	
}

//同步供方数据
function syncSupls(){
	
	var url = 'FiVoucher!syncSupls.do?accountSetId='+accountSetId+'&sysId='+syid;

	$.get(url, {}, function(result) {
		if (result.success=="1") {
			$.messager.alert("提示", "供方数据同步成功!", "info");
		}else{
			$.messager.alert("提示", "供方数据同步失败!", "info");
		}
	},'json');
	
}

//以下是修改凭证方法

/**
 * 编辑行
 * @param target
 */
function editVoucher(){
	var row=$('#dg_voucher_entry').datagrid("getSelected");
	var voucherId = $("#voucherId").val();
	
	var url = contextPath + "/FiVoucher!isSend.do?voucherId="+voucherId;

	$.get(url, {}, function(result) {
		if (result.success=="1") {
			$.messager.alert("提示", "此凭证以输出，无法进行修改!", "info");
		}else{
			var index = $("#dg_voucher_entry").datagrid("getRowIndex",row);
			$('#dg_voucher_entry').datagrid('beginEdit', index);
		}
	},'json');
	
}

/**
 * 编辑行
 * @param target
 */
var rowindex = 0;
function editVoucher1(){
	var row=$('#dg').datagrid("getSelected");
	var rows = $("#dg").datagrid("getSelections");
	if(rows.length<=0){
		$.messager.alert("提示", "请选择一条数据!", "info");
	}else if(rows.length>1){
		$.messager.alert("提示", "只能选择一条数据!", "info");
	}else{
		var index = $("#dg").datagrid("getRowIndex",row);
		$('#dg').datagrid('beginEdit', index);
		rowindex = index;
	}
}

function saveVoucher1(){
	$('#dg').datagrid('endEdit', rowindex);
	var row=$('#dg').datagrid("getSelected");
	var index = $("#dg").datagrid("getRowIndex",row);
	//$('#dg').datagrid('endEdit', index);
	
	$.ajax({  
        url:"FiVoucher!UpdateVoucher.do",  
        data:{"voucherNo":row.voucherNo,voucherId:row.id},  
        type:"post",  
        success:function(data){  
           if(data.success){
              alert("保存成功！");
           } 
        }  
   });  
	
}

//===================tips==========================

/**  
 * 扩展两个方法  
 */  
$.extend($.fn.datagrid.methods, {
    /**
     * 开打提示功能
     * @param {} jq
     * @param {} params 提示消息框的样式
     * @return {}
     */
    doCellTip:function (jq, params) {
        function showTip(showParams, td, e, dg) {
            //无文本，不提示。
            if ($(td).text() == "") return;
            params = params || {};
            var options = dg.data('datagrid');
            var styler = 'style="';
            if(showParams.width){
                styler = styler + "width:" + showParams.width + ";";
            }
            if(showParams.maxWidth){
                styler = styler + "max-width:" + showParams.maxWidth + ";";
            }
            if(showParams.minWidth){
                styler = styler + "min-width:" + showParams.minWidth + ";";
            }
            styler = styler + '"';
            showParams.content = '<div class="tipcontent" ' + styler + '>' + showParams.content + '</div>';
            $(td).tooltip({
                content:showParams.content,
                trackMouse:true,
                position:params.position,
                onHide:function () {
                    $(this).tooltip('destroy');
                },
                onShow:function () {
                    var tip = $(this).tooltip('tip');
                    if(showParams.tipStyler){
                        tip.css(showParams.tipStyler);
                    }
                    if(showParams.contentStyler){
                        tip.find('div.tipcontent').css(showParams.contentStyler);
                    }
                }
            }).tooltip('show');
        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover':function (e) {
                            //if($(this).attr('field')===undefined) return;
                            var that = this;
                            var setField = null;
                            if(params.specialShowFields && params.specialShowFields.sort){
                                for(var i=0; i<params.specialShowFields.length; i++){
                                    if(params.specialShowFields[i].field == $(this).attr('field')){
                                        setField = params.specialShowFields[i];
                                    }
                                }
                            }
                            if(setField==null){
                                options.factContent = $(this).find('>div').clone().css({'margin-left':'-5000px', 'width':'auto', 'display':'inline', 'position':'absolute'}).appendTo('body');
                                var factContentWidth = options.factContent.width();
                                params.content = $(this).text();
                                if (params.onlyShowInterrupt) {
                                    if (factContentWidth > $(this).width()) {
                                        showTip(params, this, e, grid);
                                    }
                                } else {
                                    showTip(params, this, e, grid);
                                }
                            }else{
                                panel.find('.datagrid-body').each(function(){
                                    var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');
                                    trs.each(function(){
                                        var td = $(this).find('> td[field="' + setField.showField + '"]');
                                        if(td.length){
                                            params.content = td.text();
                                        }
                                    });
                                });
                                showTip(params, this, e, grid);
                            }
                        },
                        'mouseout':function (e) {
                            if (options.factContent) {
                                options.factContent.remove();
                                options.factContent = null;
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能（基于1.3.3版本）
     * @param {} jq
     * @return {}
     */
    cancelCellTip:function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.factContent) {
                data.factContent.remove();
                data.factContent = null;
            }
            var panel = $(this).datagrid('getPanel').panel('panel');
            panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove')
        });
    }
});



/**
 * 格式化金额
 * @param number
 * @returns
 */
function outputmoney(number) {
	number = number.replace(/\,/g, "");
	if(isNaN(number) || number == "")return "";
	number = Math.round(number * 100) / 100;
	    if (number < 0)
	        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
	    else
	        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
	} 
	//格式化金额
	function outputdollars(number) {
	    if (number.length <= 3)
	        return (number == '' ? '0' : number);
	    else {
	        var mod = number.length % 3;
	        var output = (mod == 0 ? '' : (number.substring(0, mod)));
	        for (i = 0; i < Math.floor(number.length / 3); i++) {
	            if ((mod == 0) && (i == 0))
	                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
	            else
	                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
	        }
	        return (output);
	    }
	}
	function outputcents(amount) {
	    amount = Math.round(((amount) - Math.floor(amount)) * 100);
	    return (amount < 10 ? '.0' + amount : '.' + amount);
	}



	function getGridCheckBoxValues(){

		var rows = $('#dg').datagrid('getSelections');
		 var cpList = [];

		 if(rows != null && rows){
			 for (var jj = 0,length = rows.length; jj < length; jj++) {
			      
			            cpList.push(rows[jj].id);
			      
			    }
		 }

		    var val_string = "";
		    if (cpList.length > 0) val_string = cpList.join(";");
		    return val_string;
	}

    function editVoucherDate() {
    	var url = contextPath + "/FiVoucher!isSend.do?voucherId="+$("#voucherId").val();
    	$.get(url, {}, function(result) {
    		if (result.success=="1") {
    			$.messager.alert("提示", "此凭证以输出，无法进行修改!", "info");
    		}else{
    			var date1 = $('#date1');
    	    	$('#date1').next('span').show();
    	    	$("#dateDiv").css({ "display": "inline-block", "width": "100px" });
    	    	date1.datebox("setValue",$('#_prepareddate').text());
    	    	$('#_prepareddate').hide();
    		}
    	},'json');
    }
    
    function onSelect(data){
		var date1 = $("input[name='date1']").val();
		//var date1 = $('#date1');
    	$('#date1').next('span').hide();
    	$('#_prepareddate').show();
    	var d1 = dateFormatter(date1);
		$("#_prepareddate").html(d1);
		$('body').mask("保存中...");
		$.ajax({  
	        url:"FiVoucher!UpdateVoucherDate.do",  
	        data:{voucherId:$("#voucherId").val(),dateNew:$("input[name='date1']").val()},  
	        type:"post",  
	        success:function(data){ 
	        	$('body').unmask();
	           if(data.success){
	        	   alert("保存成功！");
	           } 
	        }  
	   });  
    	//$('#_prepareddate').html(data);
	};