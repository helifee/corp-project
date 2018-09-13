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
<link href="css/jeasyui_form.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="page/FiVoucherTempType/FiVoucherTempType-list.js"></script>
<style>
.datagrid-row-selected {
    background: #fbec88 none repeat scroll 0 0;
    color: #000;
}
</style>
<script type="text/javascript">
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

	
	var contextPath = '${pageContext.request.contextPath}';
	if(contextPath.length==1){
		contextPath = '';
	}
	global.accountSetId='${param.accountSetId}';
	global.accountSetCode='${accountSetCode}';
	global.sysId = '${sysId}';
	companyCode = '${companyCode}';
	var captionList = ${captionList};
	var cashFlowList = ${cashFlowList};
	var billFieldJson;
	var functions = ${functions};
	var operators = ${operators};
	var bizFormObjListJson= ${bizFormObjListJson};
	var accountSetsjson = ${accountSetsjson};

	
	 $(function(){
		//公司
			$("#compay").combobox({
				valueField:'companyId',    
			    textField:'companyName',
				data:accountSetsjson,
			    /* onSelect: function(record) {
			    	companyId = record.companyId;
		        }, */
		        onChange:function(newValue,oldValue){
		        	companyId = newValue;
		        	reloadTree();
			    } ,
		        onLoadSuccess: function() { //加载完成后,设置选中第一项
		             var val = $(this).combobox("getData");
		             $(this).combobox("select", val[0].companyId);
		             companyId = val[0].companyId;
		        }
			});
		
		//根据选择的业务对象加载对应的属性
		$('#boid_name').combobox({
		    onChange:function(newValue,oldValue){
		    	var value = encodeURI(newValue);
			    $.ajax({  
			         url: "FiVoucherTempType!getFiledByboId.do?regClassName="+encodeURI(value)+"&sysId="+global.sysId,  
			         type: "GET",  
			         async: false,  
			         dataType: "json",   
			         success: function (date) {  
			        	 $('#billField').datagrid({data: date})
			        	 billFieldJson = date;
			         }
			     });
             }
		});

	}) 
</script>
</head>
<body>
<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
	<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
</div>

<div style="height:30px;background-color:#f5f5f5;padding-top: 5px;">
	<input id="compay" name="compay" class="easyui-textbox" />
	<a class="easyui-linkbutton"  plain="true" 
		onclick="javascript:exportVoucher();" class="t_more">导出</a>
	<a class="easyui-linkbutton"  plain="true" 
		onclick="javascript:importVoucher();" class="t_more">导入</a>
</div>

<div class="easyui-layout" data-options="border:false,fit:true">
	<div data-options="region:'west',split:true,title:'业务类型'" style="width: 200px; padding: 5px; background: #eee;">
			<div id="tool1">
				<a class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="add()">新增</a>
				<a class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="update()">修改</a>
				<a class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="del();">删除</a>
			</div>
		<ul id="tree1">
		</ul>
	</div>

	<div data-options="region:'center',border:false" style="padding: 5px; background: #eee;">
		 <div class="easyui-layout" data-options="border:false,fit:true">
			<!--业务类型对应的凭证模板 -->
			<div data-options="region:'north',height:'auto',border:false,title:'业务类型对应的凭证模板'">
				<div class="datagrid-toolbar">
					<a id="btn_save" onclick="javascript:saveVoucherTemp()" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>  
				    <a id="btn_save" onclick="javascript:copy()" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">复制</a>
				    <a id="btn_save" onclick="javascript:plaster()" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">粘贴</a>
				    <a onclick="javascript:editrow()" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true">编辑</a>
				    <a onclick="javascript:deleterow()" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true">删除</a>
				</div>
				<form action="FiVoucherTempType!saveOrUpdate.do" id="frm" method="post">
				<s:token/>
				<input id="accountSetId" name="fiVoucherTemplate.accountSetId" value="${param.accountSetId}" type="hidden" />
				<table width="100%" border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01">
								<tr align=center>
									<td align="right"   class="sd"  width="">业务类型:</td>
									<td width="" align="left">
										<input id="bmid" name="fiVoucherTemplate.typeId" style="width: 98%" value="" type="hidden"/>
										<input  id="bmid_name" name="fiVoucherTemplate.bizTypeName" />
										
									</td>
									<td align="right" >状态:</td>
									<td width="" align="left">
										<input type="radio" name="fiVoucherTemplate.status" value="1" checked="checked"/>
										启用
										<input type="radio" name="fiVoucherTemplate.status" value="0"/>
										禁止
									</td>
								</tr>
								<tr align=center>
									<td align="right" class="sd" width="116px">业务类型说明:</td>
									<td colspan="3" align="left">
										<input id="note" name="fiVoucherTemplate.note" style="width: 98%" value=""/>
									</td>
								</tr>
										<tr>
											<td align="right" class="sd" width=""><font color=red>*</font>
												业务对象:</td>
											<td colspan="3"><input id="boid_name"
												name="fiVoucherTemplate.bizObjectId" class="easyui-combobox"
												data-options="data:bizFormObjListJson,valueField:'objectId',textField:'objectName'"
												style="width: 180px" type="text" value="" /></td>
										</tr>
										<tr>
									<td align="right" class="sd"  width="">
										<font color=red>*</font>
										业务对象筛选条件:
									</td>
									<td colspan="3">
									<textarea id="condition" name="fiVoucherTemplate.filter" readonly="true" style="height:30px;width:400px" 
										onclick="openExpression();"></textarea>
									</td>
								</tr>
								<tr>
									<td align="right" class="sd" width="" >
										<font color=red>*</font>
										凭证字:
									</td>
									<td colspan="3">
									<input id="flag" name="fiVoucherTemplate.flag" style="width: 30px" type="text" vlaue=""/>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<input id="boFieldInfoList" name="boFieldInfoList" value="" type="hidden"/>
				<input id="boFieldInfoList_delete" name="boFieldInfoList_delete" value="" type="hidden"/>
				<input id="id" name="fiVoucherTemplate.id" value="" type="hidden"/>
				<!-- 存放分录的数据。json格式 -->
				<textarea id="fenLuJson" name="fenLuJson" style="display:none"></textarea>
				<textarea id="delRowsJson" name="delRowsJson" style="display:none"></textarea>
				</form>
			</div><!--业务类型对应的凭证模板END-->
			<!--凭证模板分录列表  -->
			<div sytle="overflow-x:scroll;" data-options="region:'center',border:false,title:'凭证模板分录',width:'auto'">
				<div id="tb2" class="t_title">
					<a class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">增加分录</a>
				</div>
				<table id="grid" ></table>
			</div><!--凭证模板分录列表END  -->
		</div>
	</div>
</div>

  <!-- 新增/编辑 对话框 =================================================================================-->
     <div id="dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        <div class="ftitle">业务类型编辑</div>
        <form id="fm" method="post" novalidate>
        	<input type="hidden" name="parentId" value="" id="parentId"/>
        	<input type="hidden" name="id" value=""/>
            <div class="fitem">
                <label>上级业务类型:</label>
                <input id="parentName" name="parentName" class="easyui-textbox" data-options="readonly:true">
            </div>
            <div class="fitem">
                <label>业务类型名称:</label>
                <input id="name" name="name" class="easyui-textbox" required="true">
                <input id="accountSetCode" name="accountSetCode" style="display: none"/>
                <input id="sysId" name="sysId" style="display: none"/>
                <input id="companyId" name="companyId" style="display: none"/>
            </div>
        </form>
    </div>
    <div id="dlg-buttons">
	    <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveOrUpdate()" style="width:90px">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
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
	<!-- 摘要对话框================= -->
	<div style="left: 250px; top: 20px;" id="summaryDialog" class="easyui-dialog" data-options="
		title:'编辑摘要',
		closed:true,
		buttons:'#tb_summaryDialog',
		resizable:true,
		width:500,
		height:400,
		onClose:function(){
			$('#summary_').val('');
		}
	">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" data-options="collapsible:true" style="overflow:hidden;">
				<textarea id="summary_" style="width:485px;height:100px"></textarea>
			</div>   
			<div data-options="region:'center'">
    			<table id="gd_xm"></table>
    		</div> 
		</div>
	</div>
	<div id="tb_summaryDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="summarySelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#summaryDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 筛选条件对话框================= -->
	<div style="left: 250px; top: 20px;" id="filterDialog" class="easyui-dialog" data-options="
		title:'编辑筛选条件',
		closed:true,
		buttons:'#tb_filterDialog',
		resizable:true,
		width:500,
		height:400,
		onClose:function(){
			$('#filter_').val('');
		}
	">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" data-options="collapsible:true" style="overflow:hidden;">
				<textarea id="filter_" style="width:485px;height:100px"></textarea>
			</div>   
			<div data-options="region:'center'">
    			<table id="gd_f"></table>
    		</div> 
		</div>
	</div>
	<div id="tb_filterDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="filterSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#filterDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 借方金额对话框================= -->
	<div style="left: 250px; top: 20px;" id="dDialog" class="easyui-dialog" data-options="
		title:'编辑借方金额',
		closed:true,
		buttons:'#tb_dDialog',
		resizable:true,
		width:500,
		height:400,
		onClose:function(){
			$('#d_').val('');
		}
	">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" data-options="collapsible:true" style="overflow:hidden;">
				<textarea id="d_" style="width:485px;height:100px"></textarea>
			</div>   
			<div data-options="region:'center'">
    			<table id="gd_d"></table>
    		</div> 
		</div>
	</div>
	<div id="tb_dDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="dSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#dDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 贷方金额对话框================= -->
	<div style="left: 250px; top: 20px;" id="cDialog" class="easyui-dialog" data-options="
		title:'编辑贷方金额',
		closed:true,
		buttons:'#tb_cDialog',
		resizable:true,
		width:500,
		height:400,
		onClose:function(){
			$('#c_').val('');
		}
	">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" data-options="collapsible:true" style="overflow:hidden;">
				<textarea id="c_" style="width:485px;height:100px"></textarea>
			</div>   
			<div data-options="region:'center'">
    			<table id="gd_c"></table>
    		</div> 
		</div>
	</div>
	<div id="tb_cDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="cSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#cDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 备注对话框================= -->
	<div style="left: 250px; top: 20px;" id="remarksDialog" class="easyui-dialog" data-options="
		title:'编辑备注',
		closed:true,
		buttons:'#tb_remarksDialog',
		resizable:true,
		width:500,
		height:400,
		onClose:function(){
			$('#remarks_').val('');
		}
	">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" data-options="collapsible:true" style="overflow:hidden;">
				<textarea id="remarks_" style="width:485px;height:100px"></textarea>
			</div>   
			<div data-options="region:'center'">
    			<table id="gmr_xm"></table>
    		</div> 
		</div>
	</div>
	<div id="tb_remarksDialog">
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="remarksSelect()">保存</a>
	    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#remarksDialog').dialog('close')">取消</a>
	</div>
	
	<!-- 业务对象筛选条件对话框=================================================== -->
	<div style="left:50px; top:20px;" id="ex_dialog" class="easyui-dialog" data-options="width:607,height:450,title:'公式编辑',closed:true,buttons:'#ex_dialog_tb'">
		<div class="easyui-layout" data-options="fit:true,border:false,resizable:true">
	        <!-- 表达式编辑部分 --> 
	        <div data-options="region:'north'" style="height:100px;padding:5px;">
				<textarea id="expression" style="width:576px;height:300px"></textarea>
	        </div>
	        <div data-options="region:'center'" >
	           <div class="easyui-layout" data-options="fit:true,border:false">
	           	<!-- 公式部分 -->
		           	<div data-options="region:'west',title:'公式',width:200">
		           		<table  id="fun_grid" class="easyui-datagrid" data-options="
		           			data:functions,fit:true,singleSelect:true,
		           			onSelect:function(index,rowData){
		           				$('#expression').insertAtCursor(rowData.format);
		           			}
		           		">
		           			<thead>   
						        <tr>   
						            <th data-options="field:'name',width:190">公式</th>   
						        </tr>   
						    </thead> 
		           		</table>
		           	</div>
		           	<!-- 数据项部分 -->
		           	<div data-options="region:'center',title:'数据项'" >
		           		<table  id="billField" class="easyui-datagrid" data-options="
		           			data:billFieldJson,
		           			fit:true,
		           			fitColumns:true,
		           			singleSelect:true,
		           			onSelect:function(index,rowData){
		           				$('#expression').insertAtCursor('{!'+rowData.code+':'+rowData.name+';}');
		           			}
		           		">
		           			<thead>   
						        <tr>   
						            <th data-options="field:'code',width:40">编码</th>   
						            <th data-options="field:'name',width:40">名称</th>   
						        </tr>   
						    </thead>  
		           		</table>
		           	</div>
		    		<!-- 运算符部分 -->
		           	<!-- <div data-options="region:'east',title:'运算符',width:150">
		           		<table id="opt_grid" class="easyui-datagrid" data-options="
		           			data:operators,
		           			fit:true,
		           			fitColumns:true,
		           			singleSelect:true,
		           			onSelect:function(index,rowData){
		           				$('#expression').insertAtCursor(rowData.code);
		           			}
		           		">
			           		<thead>   
						        <tr>   
						            <th data-options="field:'name',width:100">运算符</th>   
						        </tr>   
						    </thead>
					    </table>
		           	</div> -->
	           </div>
	       </div>
	    </div>
    </div>
    <div id="ex_dialog_tb">
     	<a class="easyui-linkbutton" iconCls="icon-ok" plain="true" onclick="saveExpression()">确定</a>
	    <a class="easyui-linkbutton" iconCls="icon-cancel" plain="true" onclick="$('#ex_dialog').dialog('close')">取消</a>
    </div>
    
    <div id="importDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
	<s:form id="importfrm" enctype="multipart/form-data" theme="simple"  method="post" >
			
			<table width=100%  >
		        <tr height=30 >
		            <td align=center  >
		                <input type="file" name="uploadfile" id="uploadfile" >
		            </td>
		        </tr>
		        <tr height=30 >
		            <td align=center  >
		                <input type="button" value="保存" onclick="updateload();" >
		            </td>
		        </tr>
		    </table>
		</s:form>
	</div>
</body>
</html>
