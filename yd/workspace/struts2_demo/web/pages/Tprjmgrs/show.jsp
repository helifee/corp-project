<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>
<html>

<head>
	<%@ include file="/commons/meta.jsp" %>
	<base href="<%=basePath%>">
	<title><%=Tprjmgrs.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tprjmgrs/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tprjmgrs/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="prjId" id="prjId" value="%{model.prjId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_NAME%></td>	
			<td><s:property value="%{model.prjName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DESCRIBE%></td>	
			<td><s:property value="%{model.prjDescribe}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CUSNAME%></td>	
			<td><s:property value="%{model.prjCusname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CUSCONTACT%></td>	
			<td><s:property value="%{model.prjCuscontact}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_ENVIR%></td>	
			<td><s:property value="%{model.prjEnvir}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DPTID%></td>	
			<td><s:property value="%{model.prjDptid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_PBDATE%></td>	
			<td><s:property value="%{model.prjPbdateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_PEDATE%></td>	
			<td><s:property value="%{model.prjPedateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_TBDATE%></td>	
			<td><s:property value="%{model.prjTbdateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_TEDATE%></td>	
			<td><s:property value="%{model.prjTedateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DATE%></td>	
			<td><s:property value="%{model.prjDateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_REF%></td>	
			<td><s:property value="%{model.prjRef}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CNAME%></td>	
			<td><s:property value="%{model.prjCname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_ENAME%></td>	
			<td><s:property value="%{model.prjEname}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>