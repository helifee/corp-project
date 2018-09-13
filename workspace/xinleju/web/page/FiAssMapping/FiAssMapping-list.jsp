<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="css/jeasyui_form.css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="page/FiAssMapping/FiAssMapping-list.js"></script>
<style>
.fc_left_list{
	list-style:none; 
	padding:0; 
	margin:0
}
.fc_left_list li{
	text-align:center;
	margin-top:5px;
	cursor:pointer;
}
.fc_left_list li:hover{
	background:#e6e6e6;
}
.panel-header{
	position:relative;
}
</style>
<script>
var contextPath = '${pageContext.request.contextPath}';
//var vtype_ref = '${vtype_ref}'; 
<s:iterator value="#request.refs" var="map">
    var ${map.key} = '${map.value}';
</s:iterator>
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

//var companyId = '${companyId}';
var accountSetsjson = ${accountSetsjson};
accountSetCode = '${accountSetCode}';
companyCode = '${companyCode}';

sysId = '${sysId}';
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
        	initGrid();
	    } ,
        onLoadSuccess: function() { //加载完成后,设置选中第一项
             var val = $(this).combobox("getData");
             $(this).combobox("select", val[0].companyId);
             companyId = val[0].companyId;
        }
	});
	
})

</script>
</head>
<body>
	<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
		<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
	</div>
	<div class="easyui-layout" data-options="fit:true,border:true">
		<div data-options="region:'north',height:300,border:true,title:'科目辅助核算与业务对象对应'">
			<s:form id="frm" action="FiAssMapping!list">
				<s:hidden name="start"></s:hidden>
				<s:hidden id="accountSetId" name="fiAssMapping.accountSetId"></s:hidden>
				<!-- 查询条件 -->
				<div class="s1_searchWrap"></div>
			</s:form>
			<!-- 标题 -->
			<div id="grid1_tb">
				<a class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add'" onclick="javascript:editFiAssMappingDialog()"> 新增</a> 
				<a class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove'" onclick="javascript:del()" class="t_del">删除</a>
				 
 				<input id="compay" name="compay" class="easyui-textbox" />
	            <!-- <a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:exportAssMapping();" class="t_more">导出</a>
				<a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:importAssMapping();" class="t_more">导入</a> -->
			</div>
			<table id="grid1"></table>
		</div>
		<!-- <div data-options="region:'center',border:true,title:'科目辅助核算与业务对象详情对照'">
			<div class="t2">
			</div>
			<table id="grid2"></table>
		</div> -->
		<div id="room" data-options="region:'west',height:260,border:true" style="width:185px; overflow:hidden;display:none">
			<span style="font-weight:bold;">项目：</span>
				<input id="project" name="project" class="easyui-textbox" />
			<div style="width:182px; height:241px; border:1px solid grey; margin-top:3px; overflow-y:auto">
				<ul class="easyui-tree" id="builds">
					
				</ul>
			</div>
		</div>
		<div id="room1" data-options="region:'center',height:260,border:true,title:'辅助核算与业务对象详情对照'">
			<div style="margin-bottom:5px; position:absolute; top:1px; right:25px">
				
			</div>
			<table id="grid2">
				
			</table>
		</div>
	</div>
	
	<!-- ------------------------- -->
	<div id="editDialog" class="easyui-dialog" style="left: 50px; top: 20px;" data-options="
		title:'编辑',
		resizable:true,
		closed:true,
		width:300,
		buttons:[{
				text:'保存',
				iconCls:'icon-save',
				plain:'true',
				handler:saveFiAssMapping
			},{
				text:'关闭',
				iconCls:'icon-cancel',
				plain:'true',
				handler:function(){
					$('#editDialog').dialog('close');
				}
			}]
	">
	<s:form id="frm2" method="post">
		<table width="100%" border="0" cellspacing="1" cellpadding="0"
			class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellpadding="0" cellspacing="1"
						class="wd_tablelist01">

						<tr>
							<td align="right" class="sd" width="116">
								业务对象:
							</td>
							<td width="60%" align="left">
								<s:select list="#request.bizObjectNameMap" listKey="key" listValue="value" name="fiAssMapping.bizObjectId" headerKey="" headerValue="请选择" class="easy-text"></s:select> 
								<s:hidden name="fiAssMapping.accountSetId"></s:hidden>
							    <s:hidden id="sysId" name="fiAssMapping.sysId"></s:hidden>
							    <s:hidden id="companyId" name="fiAssMapping.companyId"></s:hidden>
							</td>
						</tr>
						<tr>

							<td align="right" class="sd" width="116">
								辅助核算名称:
							</td>
							<td>
								<input name="fiAssMapping.assName" value=""/>
							<%-- <s:textfield name="fiAssMapping.assName" cssStyle="width:98%"></s:textfield> --%>
							</td>
						</tr>
						<tr>
						    <td align="right" class="sd" width="116">
									传输类型:
							</td>
							<td width="60%" align="left">
								<select id="isDerect" class="easyui-combobox" name="fiAssMapping.isDirectCode" style="width:120px;">   
								    <option value="1">核算代码</option>   
								    <option value="2">核算名称</option>
								    <option value="3">业务对象代码</option>   
								    <option value="4">业务对象名称</option>
								    <option value="5">默认设置</option>   
								</select> 
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<s:hidden name="fiAssMapping.createDate"></s:hidden>
		<s:hidden name="fiAssMapping.status"></s:hidden>
		<s:hidden name="fiAssMapping.id"></s:hidden>
	</s:form>
	</div>
	
	<%-- <div id="importDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
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
	</div> --%>
	
	<div id="importRoomDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
	<s:form id="importroomfrm" enctype="multipart/form-data" theme="simple"  method="post" >
			
			<table width=100%  >
		        <tr height=30 >
		            <td align=center  >
		                <input type="file" name="uploadRoomFile" id="uploadRoomFile" >
		            </td>
		        </tr>
		        <tr height=30 >
		            <td align=center  >
		                <input type="button" value="保存" onclick="updateloadRoom();" >
		            </td>
		        </tr>
		    </table>
		</s:form>
	</div>
	
	<div id="importDetailDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
	<s:form id="importDetailfrm" enctype="multipart/form-data" theme="simple"  method="post" >
			
			<table width=100%  >
		        <tr height=30 >
		            <td align=center  >
		                <input type="file" name="uploadfile" id="uploadfile" >
		            </td>
		        </tr>
		        <tr height=30 >
		            <td align=center  >
		                <input type="button" value="保存" onclick="updateloadDetail();" >
		            </td>
		        </tr>
		    </table>
		</s:form>
	</div>
</body>
</html>
