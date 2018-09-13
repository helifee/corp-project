<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
</head>
<body>
	<s:form action="TurnOverDeal!flList" id="frm">
		<s:hidden name="start"></s:hidden>
		<!-- 主区域工具栏 start-->
		<div class="top_tool_box">
			<span style="float: left;">
				原流程参与者：
				<s:hidden id="fromPartyIdVar" name="fromPartyIdVar" value="%{#request.fromPartyIdVar}"></s:hidden>
				<s:textfield name="fromPartyVar" id="fromPartyVar" placeholder="请选择" value="%{#request.fromPartyVar}" cssClass="input125" cssStyle="width: 200px; color:gray;" readonly="true"></s:textfield>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="..." onclick="choosePartySonWindow('fromPartyIdVar','fromPartyVar');" style="vertical-align:middle;"/>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="清空" onclick="document.getElementById('fromPartyVar').value='';document.getElementById('fromPartyIdVar').value='';" style="vertical-align:middle;"/>
				<img src="images/icon_search.png" width="24" height="22" align="absmiddle" title="查询" onclick="javascript:queryFl();return false;" border="0" style="cursor: pointer; vertical-align: middle;" />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="images/forward.png" width="40px" height="24px" align="absmiddle" title="将原流程参与者替换为新流程参与者" onclick="return false;" border="0" style="vertical-align:middle;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				新流程参与者：
				<s:hidden id="toPartyIdVar" name="toPartyIdVar" value="%{#request.toPartyIdVar}"></s:hidden>
				<s:textfield name="toPartyVar" id="toPartyVar" placeholder="请选择" cssClass="input125" value="%{#request.toPartyVar}" cssStyle="width: 200px; color:gray;" readonly="true"></s:textfield>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="..." onclick="choosePartySonWindow('toPartyIdVar','toPartyVar');" />
				<input name="button" type="button" class="dfbtn_chs" id="button" value="清空" onclick="document.getElementById('toPartyVar').value='';document.getElementById('toPartyIdVar').value='';" />
			</span>
			<input id="replacePartyButton" name="button" type="button" class="dfbtn_chs" id="button" value="替换参与者" onclick="replaceFlParticipants('fromPartyIdVar','fromPartyVar','toPartyIdVar','toPartyVar');return false;" style="vertical-align:middle;"/>
		</div>
		<div  id="replacePartyPost" class="top_tool_box">

		
		</div>
		
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="5px"><input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" /></th>
				<th width="200px">模板名称</th>
				<th width="300px">模板目录</th>
				<th width="50px">模板编码</th>
				<th width="60px">模板版本</th>
				<th>描述</th>
			</tr>
			<s:iterator value="page.items" id="item">
				<s:set id="ctMap" value="#request.ctMap[#item.ctId]"></s:set>
				<tr>
					<td align="center"><input name="ids" type="checkbox" value="${item.id}" /></td>
					<td><s:property value="#item.flowName" /></td>
					<td><s:property value="#ctMap[#item.ctId]" /></td>
					<td><s:property value="#item.flowCode" /></td>
					<td><s:property value="#item.flowVersion" /></td>
					<td>&nbsp;</td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<div style="float: left;">
				
			</div>
			<app:PageTag actionName="TurnOverDeal!flList"></app:PageTag>
		</div>
	</s:form>
</body>
<script type="text/javascript" src="page/TurnOverDeal/TurnOverDeal-flList.js?t=<%=System.currentTimeMillis()%>"></script>
</html>
