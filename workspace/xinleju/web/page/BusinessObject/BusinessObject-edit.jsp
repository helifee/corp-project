<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>业务对象注册</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/BusinessObject/BusinessObject-edit.js?t=<%=System.currentTimeMillis() %>"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>
		<script>
		var sysList = ${sysList};//系统列表
		var flag_ref = ${flag_ref};//字段标记
		var vtype_ref = ${vtype_ref};//字段类型
		var boFieldInfoList = ${fieldInfoList};
		var boList = ${boList};//业务对象列表
		var contextPath = '${pageContext.request.contextPath}';
		 /*			<s:iterator value="#request.refs" var="map">
					    var ${map.key} = ${map.value};
					</s:iterator>
				 */
				</script>
	</head>
	<body style="margin: 0px;padding: 0px;">
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div data-options="region:'north',height:'auto',border:false">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">条件编辑</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:save()">提交</a><a href="#" onclick="parent.closeDialog('newDialog');">关闭</a>
					</div></td>
			</tr>
		</table>
		</div>
		<div data-options="region:'center',border:false">
		
		<s:form action="BusinessObject!save" id="frm">
		<s:token/>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>所属系统:
								</td>
								<td width="29%"   align="left"  >
								<input id="frm_businessObject_vsyscode" name="businessObject.vsyscode"  value="${businessObject.vsyscode}"/>  
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>业务对象:
								</td>
								<td width="29%" align="left" >
									<s:textfield name="businessObject.vobject" cssStyle="width:98%"></s:textfield>									
								</td>
							</tr>			  
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>数据获取接口:
								</td>
								<td width="29%">
									<s:textfield name="businessObject.vfetchdataclass" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>数据回写接口:
								</td>
								<td width="29%">
									<s:textfield name="businessObject.vrewriteclass" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>业务类型:
								</td>
								<%-- <td width="69%"  align="left"  colspan="3">
									<label><s:checkbox  name="businessObject.bdobject" />基本档案</label>
									<label><s:checkbox  name="businessObject.formobject" />业务表单</label>
								</td> --%>
								<td width="19%"  align="left">
									<select id="cc" class="easyui-combobox" name="businessObject.vtype"  value="${businessObject.vtype}" style="width:120px;">   
									    <s:if test="%{businessObject.vtype==1}">
									    	<option value="1" selected="selected">基本档案</option>
									    </s:if>
									    <s:else>
									    	<option value="1">基本档案</option>
									    </s:else>
									    <s:if test="%{businessObject.vtype==2}">
									    	<option value="2" selected="selected">业务表单</option>
									    </s:if>
									    <s:else>
									    	<option value="2">业务表单</option>
									    </s:else>
									</select> 
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>对象类型:
								</td>
								<td width="29%">
									<s:textfield name="businessObject.btype" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									描述:
								</td>
								<td colspan="3">
									<s:textarea cols="70" rows="5" name="businessObject.vdesc"></s:textarea>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="businessObject.createDate"></s:hidden>
			<s:hidden name="businessObject.status"></s:hidden>
			<s:hidden name="businessObject.id"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0"  	class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">注册字段</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:loadFields()">加载</a>
					</div>
				</td>
			</tr>
		</table>
		<input id="boFieldInfoList" name="boFieldInfoList" value="" style="display:none;"/>
		<!-- <input id="fieldInfoList" name="fieldInfoList" value="" style="display:none;"/>
	 -->	
		</s:form>
			<table id="grid"></table>
		</div>
	</div>
	<div id="dd" class="easyui-dialog" title="选择业务对象" style="width:500px;height:400px;" data-options="
		resizable:true,
		modal:true,
		closed: true
	">   
    	<table id="bizObj" class="easyui-datagrid" data-options="
    	    url:'BusinessObject!getBaseDataObject.do',	
    		fitColumns:true,
    		singleSelect:true    		
    	">   
	    	<thead>   
	        	<tr>   
	        	    <th data-options="field:'ck',checkbox:true">系统编码</th>   
		            <th data-options="field:'vsyscode',width:50">系统编码</th>   
		            <th data-options="field:'vobject',width:100">对象名称</th>   
		            <th data-options="field:'vdesc'">备注</th>   
	        	</tr>   
	    	</thead>   
		</table>  
	</div>    		
	</body>
</html>
