<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="css/jeasyui_form.css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script language="javascript"  type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/FiVoucher/FiVoucher-generate.js"></script>
<script type="text/javascript" src="page/FiVoucher/jquery.tips.js"></script>
<script>
var contextPath = '${pageContext.request.contextPath}';
if (contextPath.length == 1) {
	contextPath = '';
}

accountSetId = '${param.accountSetId}';
accountSetCode = '${accountSetCode}';
var accountSetsjson = ${accountSetsjson};

//var projectBranchjson = ${projectBranchjson};
$(function(){
	
	global.sysId = '${sysId}';
	if(global.sysId==1){
		$("#dayId").html("收款日期");
	}else{
		$("#dayId").html("付款日期");
	}
	/* $('#ownerSys').change(function(){
		global.sysId=$(this).val();
		$("#bill_type").combotree({
			url: 'FiVoucherTempType!loadTree.do?accountSetCode=${accountSetCode}&accountSetId=${param.accountSetId}&sysId='+global.sysId,
			valueField: 'id',
			textField: 'text',
			panelHeight: 100,
			onChange: function (a,b) {
				$("#billTypeName").val(a);
			}
		});
		
		
		$("#compay").combobox({
			url: 'FiVoucher!getCompanysBySysId.do?accountSetId=${param.accountSetId}&sysId='+global.sysId,
			valueField:'companyId',    
		    textField:'companyName',
			panelHeight: 100,
			onSelect: function(record) {
			    	paymentOrganId = record.paymentOrganId;
			    	compName = record.companyName;
			    	compId = record.companyId;
		    },
	        onLoadSuccess: function() { //加载完成后,设置选中第一项
	             var val = $(this).combobox("getData");
	             $(this).combobox("select", val[0].companyId);
	             paymentOrganId = val[0].paymentOrganId;
	 	    	 compName = val[0].companyName;
	 	    	compId = val[0].companyId;
	        }
		});
		
		$("#projectBranch").combobox({
			url: 'FiVoucher!getBranchsBySysId.do?accountSetId=${param.accountSetId}&sysId='+global.sysId,
			valueField:'projectBranchId',    
		    textField:'projectName',
			panelHeight: 100,
			onSelect: function(record) {
		    	//proBranchId = record.projectBranchId;
		    	//proName = record.projectName;
	        },
	        onLoadSuccess: function() { //加载完成后,设置选中第一项
	             var val = $(this).combobox("getData");
	             $(this).combobox("select", val[0].companyId);
	             proBranchId = val[0].projectBranchId;
	             proName = val[0].projectName;
	        }
		});
	}) */
	
	//公司
	$("#compay").combobox({
		valueField:'companyId',    
	    textField:'companyName',
		data:accountSetsjson,
	    onSelect: function(record) {
	    	paymentOrganId = record.paymentOrganId;
	    	compName = record.companyName;
	    	compId = record.companyId;
	    	loadTree();
	    	window.parent.setCompanyId(compId);
        },
        onLoadSuccess: function() { //加载完成后,设置选中第一项
        	var val = $(this).combobox("getData");
        	var flag = false;
        	for(var i=0;i<val.length;i++){
        		if(val[i].companyId==window.parent.companyId){
        			flag = true;
        			break;
        		}
        	}
        	if(window.parent.companyId!="" && flag){
        		$(this).combobox("select", window.parent.companyId);
        	}else{
             
             $(this).combobox("select", val[0].companyId);
             paymentOrganId = val[0].paymentOrganId;
 	    	 compName = val[0].companyName;
 	    	compId = val[0].companyId;
        	}
 	    	loadTree();
 	    	window.parent.setCompanyId(compId);
        }
	});
	/* 
	$("#bill_type").combotree({
		url: 'FiVoucherTempType!loadTree.do?accountSetCode=${accountSetCode}&accountSetId=${param.accountSetId}&sysId=${sysId}',
		valueField: 'id',
		textField: 'text',
		panelHeight: 100,
		onLoadSuccess:function(n,d){
			$('#bill_type').combotree('setValue', window.parent.typeId);
		},
	    onSelect:function (n) {
			$("#billTypeName").val(n.id);
			window.parent.setStandardRole(n.id);
		}
	}); */
	
/* 
	//项目分期
	$("#projectBranch").combobox({
		valueField:'projectBranchId',    
	    textField:'projectName',
		data:projectBranchjson,
	    onSelect: function(record) {
	    	console.log(record);
	   
	    	proBranchId = record.projectBranchId;
	    	proName = record.projectName;
        },
        onLoadSuccess: function() { //加载完成后,设置选中第一项
             var val = $(this).combobox("getData");
             $(this).combobox("select", val[0].companyId);
             proBranchId = val[0].projectBranchId;
             proName = val[0].projectName;
        }
	});
	 */
	
	  //设置时间条件  
	//$("#auditDateBegin").datebox("setValue",myformatter(getCurrentMonthFirst(new Date())));  
	//$("#auditDateEnd").datebox("setValue",myformatter(new Date()));  

	var bdate = myformatter(getCurrentMonthFirst(new Date()));
	var edate = myformatter(new Date());
	if(window.parent.beginDate!=""){
		bdate = window.parent.beginDate;
	}
	if(window.parent.endDate!=""){
		edate = window.parent.endDate;
	}
	$("#auditDateBegin").datebox("setValue",bdate);  
	$("#auditDateEnd").datebox("setValue",edate);  
	window.parent.setBeginDate(bdate);
	window.parent.setEndDate(edate);
	/* $("#auditDateBegin").datebox({
		onSelect:function(datenew,dateold){
			var nextdate01 = $("input[name='auditDateBegin']").val();
			alert(nextdate01);
			window.parent.setBeginDate(nextdate01);
		}
		
	});
	$("#auditDateEnd").datebox({
		onSelect:function(datenew,dateold){
			var nextdate01 = $("input[name='auditDateEnd']").val();
			window.parent.setEndDate(nextdate01);
		}
		
	}); */
})

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

</script>
</head>
<body>
<input type="hidden" id="contextPath"  value="<%=basePath %>"/>
	<div id="tb">
		<form id="sfm">
		<input type="hidden" name="pageNumber" value="1" id="pageNumber"/>
		<input type="hidden" name="pageSize" value="50" id="pageSize"/>
		<input type="hidden" name="accountSetId" value="${param.accountSetId}"/>
		
	    <div style="margin-top:10px; margin-bottom:10px;margin-left:10px">
			<!--<select id="ownerSys" name="ownerSys"
					style="width:120px;">
					<option value="1" selected="selected">销售系统</option>
					<option value="2">成本系统</option>
			</select>-->
			公司名称：<input id="compay" name="compay" class="easyui-textbox" />
			<!--项目分期：<input id="projectBranch" name="projectBranch" class="easyui-textbox" />-->
		</div> 
		
		<div id="rdioType" style="margin-top:10px; margin-bottom:10px;margin-left:10px">
			<input id="r1" name="type" type="radio" value="1" checked="checked"/> <label for="r1">未生成凭证的单据</label>
			<input id="r3" name="type" type="radio" value="4" /> <label for="r3">生成凭证失败的单据</label>
			<input id="r3" name="type" type="radio" value="2" /> <label for="r3">生成凭证成功的单据</label>
			<input id="r4" name="type" type="radio" value="5" /> <label for="r4">不生成凭证的单据</label>
			<input id="r4" name="type" type="radio" value="3" /> <label for="r4">全部的单据</label>
		</div>
		<div style="margin-bottom:10px;margin-left:10px">
			<!-- <span style="margin-right:10px">开票人:<input name=""/></span>
			<span style="margin-right:10px">
				开票日期:<input name="billDateBegin" class="easyui-datebox" />--<input name="billDateEnd" class="easyui-datebox" />
			</span>
			<br/>
			<span style="margin-right:10px">审核人:<input name=""/></span>-->
	     	<span style="margin-right:10px">
				<span id="dayId">付款日期</span>:<input name="auditDateBegin" id="auditDateBegin" class="easyui-datebox" />--<input name="auditDateEnd" id="auditDateEnd" class="easyui-datebox" />
			</span> 
			<br/>
			<br/>
			<!-- <select id="sysId" name="sysId" class="easyui-combobox" style="width:80px;">
				<option value="销售系统">销售系统</option>
				<option value="成本系统">成本系统</option>
				<option value="费用系统">费用系统</option>
			</select> -->
			<input type="hidden" name="system" value="3"/>
			<span>单据类型:</span> 
			<select id="bill_type" name="billType" class="easyui-combotree"
					style="width:300px;"
					></select>
				
				<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-search'" onclick="loadBill()">查询</a>  
				<a id="btn" href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="createVouchar(1);">生成凭证</a>
				<a id="btn" href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="createVouchar(2);">生成合并凭证</a>
				<a id="btn" href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="noCreateVouchar();">不生成凭证</a>  
		</div>
		<!-- <div style="margin-bottom:10px;margin-left:10px">
			<a id="btn" href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="createVouchar();">生成凭证</a>  
		</div> -->
		<input type="hidden" id="billTypeName" name="billTypeName" />
		</form>
		
	</div>
	<table id="dg" class="easyui-datagrid" data-options="toolbar:'#tb',fit:true,pagination:true">
		<!--  <thead>   
	        <tr>   
	            <th data-options="field:'x',checkbox:true"></th>    
	             <th data-options="field:'id'" >ID</th>  
	            <th data-options="field:'mergeNum',editor:'text'" >单据合并号</th>  
	            <th data-options="field:'vapplynum',width:100">票据编号</th>       
	            <th data-options="field:'vapplicant',width:60">申请人</th> 
	            <th data-options="field:'deptname',width:100">部门</th>     
	            <th data-options="field:'vpayunit',width:100">付款单位</th>
	            <th data-options="field:'vbelongproject',width:90">所属项目</th>   
	            <th data-options="field:'vskunit',width:100">收款单位</th>      
	            <th data-options="field:'vpaytype',width:60">支付方式</th>  
	            <th data-options="field:'nexpensemny',width:60">报销金额</th> 
	            <th data-options="field:'nchmny',width:60">冲账金额</th> 
	            <th data-options="field:'npaymny',width:60">应付金额</th>
	            <th data-options="field:'summary',width:240">摘要</th> 
	        </tr>   
	    </thead>  -->  
	</table>
	<!-- <table id="dg" class="easyui-datagrid" data-options="toolbar:'#tb',fit:true,pagination:true">
		<thead>   
	        <tr>   
	            <th data-options="field:'x',checkbox:true"></th>    
	            <th data-options="field:'id'">序号</th> 
	            <th data-options="field:'id'" editor="text">单据合并号</th>  
	            <th data-options="field:'vapplynum',width:100">票据编号</th>       
	            <th data-options="field:'vapplicant',width:60">申请人</th> 
	            <th data-options="field:'deptname',width:100">部门</th>     
	            <th data-options="field:'vpayunit',width:100">付款单位</th>
	            <th data-options="field:'vbelongproject',width:90">所属项目</th>   
	            <th data-options="field:'vskunit',width:100">收款单位</th>      
	            <th data-options="field:'vpaytype',width:60">支付方式</th>  
	            <th data-options="field:'nexpensemny',width:60">报销金额</th> 
	            <th data-options="field:'nchmny',width:60">冲账金额</th> 
	            <th data-options="field:'npaymny',width:60">应付金额</th>
	            <th data-options="field:'summary',width:240">摘要</th> 
	            
	        </tr>   
	    </thead>   
	</table> -->
	
</body>
</html>
