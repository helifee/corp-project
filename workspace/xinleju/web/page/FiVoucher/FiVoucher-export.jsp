<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>输出凭证</title>
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="css/jeasyui_form.css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="page/FiVoucher/FiVoucher-export.js?time=New Date()"></script>
<script type="text/javascript" src="page/FiVoucher/jquery.tips.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<style type="">
	.datagrid-row-selected {
	    background: #fbec88 none repeat scroll 0 0;
	    color: #000;
	}
	.tbft{
		display:inline-block;
		margin-right:20px;
	}
	.tbft input{
		text-align: right;
	}
	.frm_label{
		display:inline-block;
		width:54px;
		text-align:right;
	}
	.std{
		display:inline-block;
		width:130px;
	}
	
	.textbox,.searchbox {
		margin-top: 5px;
		margin-left: 4px;
		width:133px;
	}
</style>
<script>
var contextPath = '${pageContext.request.contextPath}';
if (contextPath.length == 1) {
	contextPath = '';
}
function closes(){
	$("#Loading").fadeOut("normal",function(){
		$(this).remove();
	});
}
var pc_;
$.parser.onComplete = function(){
	if(pc_) clearTimeout(pc);
	pc_ = setTimeout(closes, 500);
}
var typeListJson = ${typeListJson};

var accountSetId = '${param.accountSetId}';

var syid = '${syid}';

var captionList = ${captionList};
var cashFlowList = ${cashFlowList};
var companyId = ${companyId};
companyId = window.parent.companyId;
$(function(){  

	$("#bill_type").combotree({
		url: 'FiVoucherTempType!loadTree.do?accountSetCode=${asCode}&accountSetId=${param.accountSetId}&sysId='+syid+'&companyId='+companyId,
		valueField: 'id',
		textField: 'text',
		panelHeight: 100,
		onLoadSuccess:function(n,d){
			$('#bill_type').combotree('setValue', window.parent.typeId);
		},
		onSelect: function (a) {
			$("#billTypeName").val(a.id);
			window.parent.setStandardRole(a.id);
		}
	});

	  //设置时间  
	var bdate = myformatter(getCurrentMonthFirst(new Date()));
	var edate = myformatter(new Date());
	/*if(window.parent.beginDate!=""){
		bdate = window.parent.beginDate;
	}
	if(window.parent.endDate!=""){
		edate = window.parent.endDate;
	}*/
	$("#beginDate").datebox("setValue",bdate);  
	$("#endDate").datebox("setValue",edate);  
	//window.parent.setBeginDate(bdate);
	//window.parent.setEndDate(edate);
	/* $("#beginDate").datebox("setValue",bdate,{
		onChange:function(datenew,dateold){
			var nextdate01 = $("input[name='beginDate']").val();
			window.parent.setBeginDate(nextdate01);
		}
		
	});
	$("#endDate").datebox("setValue",edate,{
		onChange:function(datenew,dateold){
			var nextdate01 = $("input[name='endDate']").val();
			window.parent.setEndDate(nextdate01);
		}
		
	}); */ 
	 
	 var p = $("#dg").datagrid("getPager");
	 $(p).pagination({
		    pageSize:9999,
			pageList: [9999,10000]
	 });
	 
	 
	 
	 $('#ownerSys2').change(function(){
		    syid=$(this).val();
			$("#bill_type").combotree({
				url: 'FiVoucherTempType!loadTree.do?accountSetCode=${asCode}&accountSetId=${param.accountSetId}&sysId='+syid,
				valueField: 'id',
				textField: 'text',
				panelHeight: 100,
				onChange: function (a,b) {
					$("#billTypeName").val(a);
				}
			});
	
		})
		
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

function commafy(value){
	if(value!=''){
		value= value.toFixed(2);
	}else if(value==0){
		value = 0.00;
	}
	return value;
}
</script>
</head>
<body>
<input type="hidden" id="contextPath"  value="<%=basePath %>"/>
	<input id="accountSetId" name="accountSetId" type="hidden" value="${param['accountSetId']}"/>
	<input id="voucherId" type="hidden" value=""/>
	<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
		<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
	</div>
	
	<!--凭证列表工具栏  -->
	<div id="tb">
	    <!-- <div style="margin-top:10px; margin-bottom:10px;margin-left:10px">
			公司名称：
		</div>    --> 
		 <!-- <div style="margin-top:10px; margin-bottom:10px;margin-left:10px">
			<select id="ownerSys2" name="ownerSys2"
					style="width:120px;">
					<option value="1" selected="selected">销售系统</option>
					<option value="2">成本系统</option>
			</select>
		</div>  -->
		<div style="margin-top:10px; margin-bottom:10px;margin-left:10px">
			<input id="r1" name="status" type="radio" value="0" checked="checked"/> <label for="r1">未输出的凭证</label>
			<input id="r2" name="status" type="radio" value="1"/> <label for="r2">已输出的凭证</label>
			<input id="r3" name="status" type="radio" value="2"/> <label for="r3">输出失败的凭证</label>
			<input id="r4" name="status" type="radio" value="" /> <label for="r4">全部凭证</label>
		</div>
		<div style="margin-bottom:10px;margin-left:10px">
		    <span style="margin-right:10px">
				凭证完整性:
				<select id="isFull" class="easyui-combobox" name="isFull"
				style="width:120px;">
				    <option value="3">全部</option>
					<option value="1">完整凭证</option>
					<option value="2">不完整凭证</option>
			    </select>
			</span>
			<span style="margin-right:10px">
				凭证生成日期:<input id="beginDate" name="beginDate" class="easyui-datebox" />--<input id="endDate" name="endDate" class="easyui-datebox" />
			</span>
			<br/>
			<br/>
			<span>单据类型</span>
			<select id="bill_type" name="billType" class="easyui-combotree"
				style="width:300px;"
				data-options="required:true"></select>
			<a id="btn_search" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-search'" onclick="doSearch()">查询</a>  
			<a id="btn_export" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="outputVoucher()">输出凭证</a>
			<a id="btn_export" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-redo'" onclick="syncSupls()">供方数据同步</a>
			<a id="btn_search" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove'" onclick="deleteVhoucher()">删除凭证</a>
			<a id="btn_search" href="FiVoucher!downLoad.do">下载凭证文件</a>
			<a id="btn_search" href="FiVoucher!downLoadnc.do">下载NC文件</a>
			<!-- <a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="javascript:editVoucher1();" class="t_more">编辑</a>
			<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="javascript:saveVoucher1();" class="t_more">保存</a> -->
			<!-- 凭证号初始值：<input id="voucherInitNo" class="easyui-validatebox" data-options="required:true,validType:'voucherInitNo'"  >  -->
		</div>
		<!-- <div style="margin-bottom:10px;margin-left:10px">
			<a id="btn_export" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-save'" onclick="outputVoucher()">输出凭证</a>  
		</div> -->
	</div><!--凭证列表工具栏 END -->
	<!--凭证列表  -->
	<table id="dg" class="easyui-datagrid" data-options="toolbar:'#tb',fit:true,onDblClickRow:showVoucherInfo,singleSelect:false,pagination:true ">
		<thead>   
	        <tr>   
	            <th data-options="field:'id',checkbox:true"></th> 
	            <!-- <th data-options="field:'reserve3'">单据号</th>   
	            <th data-options="field:'reserve4',width:100">主题</th> -->
	            <th data-options="field:'reserve1'">单据类型</th>   
	            <th data-options="field:'flag',width:100">凭证字</th>   
	            <th data-options="field:'voucherNo',width:100,editor:'text'">凭证号</th>   
	            <th data-options="field:'createDate',width:100,formatter:dateFormatter">凭证日期</th>   
	            <th data-options="field:'debitAmount',width:100, formatter:function(value,row){return commafy(value);}">借方金额合计</th>   
	            <th data-options="field:'creditAmount',width:100, formatter:function(value,row){return commafy(value);}">贷方金额合计</th>   
	            <th data-options="field:'enter',width:100">制单人</th>   
	            <th data-options="field:'sendStatus',width:100,formatter:statusFormatter">状态</th>
	            <th data-options="field:'noFullError'">不完整凭证描述</th>   
	            <th data-options="field:'errorCause'">结果描述</th>   
	        </tr>   
	    </thead>   
	</table><!--凭证列表 END -->
	<!--===========================================================================================================
	 |	查看凭证对话框
	============================================================================================================-->
	<div id="dlg_voucherInfo" class="easyui-dialog" fit="true" title="查看凭证信息" closed="true" buttons="#btn_dlg_voucherInfo">
		<div id="tt" class="easyui-tabs" fit="true">   
		    <!--凭证信息tab  -->
		    <div title="凭证信息" style="padding:5px">   
		    	<div id="grid_tb">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true"
								onclick="javascript:append();" class="t_more">新增</a>
							<a class="easyui-linkbutton" iconCls="icon-edit" plain="true"
								onclick="javascript:editVoucher();" class="t_more">编辑</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
								onclick="javascript:saveVoucher();" class="t_more">保存</a>
							<a id="btn_search" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove'" onclick="deleteVhoucherEntry()">删除</a>
							<a class="easyui-linkbutton" iconCls="icon-edit" plain="true"
								onclick="javascript:editVoucherDate();" class="t_more">修改制单日期</a>
				</div>
				<div class="easyui-layout" fit="true">
				    <!-- 凭证主信息 -->
				    <div data-options="region:'north'" style="height:86px;">
				    	<table>
							<tr>
								<td>
									<label class="frm_label">凭证字:</label>
									<span id="_flag" class="std"></span>
								</td>
								<td>
									<label class="frm_label">凭证号:</label>
									<span id="_voucherNo" class="std"></span>
								</td>
								<td>
									<label class="frm_label">制单人:</label>
									<span id="_enter" class="std"></span>
								</td>
							</tr>
								<td>
									<label class="frm_label">记账日期:</label>
									<span id="_postingDate" class="std"></span>
								</td>
								<td>
									<label class="frm_label">制单日期:</label>
									<input id="date1" name="date1" class="easyui-datebox" data-options="onSelect:onSelect" style="display:none"/>
									<span id="_prepareddate" class="std"></span>
								</td>
								<td>
									<label class="frm_label">输出日期:</label>
									<span id="_exportDate" class="std"></span>
								</td>
							<tr>
							</tr>
								<td colspan="3">
									<label class="frm_label">失败原因:</label>
									<span id="_errorCause"></span>
								</td>
							<tr>
							</tr>
						</table>  
				    </div> <!-- 凭证主信息 END -->
					<!-- 凭证分录列表 -->	
				    <div data-options="region:'center'" border="false">
						<table id="dg_voucher_entry" class="easyui-datagrid" title="凭证分录列表" rownumbers="true" fit="true" singleSelect="true">
				        </table>				    
				    </div><!-- 凭证分录列表 END -->
				    <div data-options="region:'south',split:true" border="false" style="height:60px;">
				    	<span class="tbft">合计金额：<span id="_amount"></span></span> 
				    	<span class="tbft">借方合计：<span id="_debitAmount"></span> </span>
				    	<span class="tbft">贷方合计：<span id="_creditAmount"></span> </span>
		        	</div>  
			    </div> 
		    </div><!--凭证信息tab END  -->
		   <!-- 相关单据tab -->
		   <div title="相关单据" data-options="" style="overflow:auto;padding:5px">   
		        <table id="dg_bill" class="easyui-datagrid" data-options="onDblClickRow:showBillInfo" fit="true" title="财务单据列表" rownumbers="true" singleSelect="true">
		        	<thead>   
				        <tr>   
				            <th data-options="field:'vapplynum',width:200">单据编号</th>   
				            <th data-options="field:'billName',width:200">名称</th>   
				        </tr>   
				    </thead>		        	
		        </table> 
		    </div><!-- 相关单据tab END --> 
		</div>
	</div><!--查看凭证对话框 END  -->
	<div id="btn_dlg_voucherInfo">
		<a class="easyui-linkbutton" plain="true" iconCls="icon-ok" onclick="$('#dlg_voucherInfo').dialog('close')">关闭</a>
	</div>
	
	<!-- 会计科目选择窗口 ==================================================================================-->
	<div style="left: 50px; top: 30px;" id="captionDialog" class="easyui-dialog" data-options="
		title:'选择科目',
		closed:true,
		buttons:'#tb_captionDialog',
		width:700,
		height:400,
		resizable:true,
		onClose:captionDialogClose
	">
	<table id="captionGrid"></table>
	</div>
	<div id="tb_captionDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="captionSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#captionDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 现金流量项目选择窗口 ==================================================================================-->
	<div style="left: 50px; top: 30px;" id="cashflowDialog" class="easyui-dialog" data-options="
		title:'选择现金流量项目',
		closed:true,
		buttons:'#tb_cashflowDialog',
		width:700,
		height:400,
		resizable:true,
		onClose:cashflowDialogClose
	">
	<table id="cashflowGrid"></table>
	</div>
	<div id="tb_cashflowDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="cashflowSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#cashflowDialog').dialog('close')">取消</a>
	</div>
	<!-- 辅助核算选择==================================================================================-->
	<div style="left: 50px; top: 30px;" id="assMapDialog" class="easyui-dialog" data-options="
		title:'选择辅助核算',
		closed:true,
		buttons:'#tb_assMapDialog',
		width:560,
		height:380,
		resizable:true,
		onClose:assDialogClose
	">
	
	<table id="assMapGrid">
    </table>
	</div>
	<div id="tb_assMapDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="assSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#assMapDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 辅助核算详细选择==================================================================================-->
	<div style="left: 50px; top: 30px;" id="assMapDetailDialog" class="easyui-dialog" data-options="
		title:'选择辅助核算内容',
		closed:true,
		buttons:'#tb_assMapDetailDialog',
		width:340,
		height:360,
		resizable:true,
		onClose:assDialogClose
	">
		<div id="tb" class="fy_ldList clearfix">
			<dl>
				<div class="query-box">
					<input id="qckqry" class="easyui-searchbox" style="width:133px;"/>
				</div>
			</dl>
		</div>
		<table id="assMapDetailGrid"></table>
	</div>
	<div id="tb_assMapDetailDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="assDetailSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#assMapDetailDialog').dialog('close')">取消</a>
	</div>
</body>
<script type="text/javascript">
/* var node = $('#bill_type').tree('find', window.parent.typeId);
$('#bill_type').tree('select', node.target);
 */
//$("#_easyui_tree_"+window.parent.typeId).attr("class", "tree-node tree-node-selected")
</script>
</html>
