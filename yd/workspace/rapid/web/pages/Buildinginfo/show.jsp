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
	<title><%=Buildinginfo.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Buildinginfo/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Buildinginfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="buildid" id="buildid" value="%{model.buildid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_CITYID%></td>	
			<td><s:property value="%{model.cityid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_DISTID%></td>	
			<td><s:property value="%{model.distid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_BUILDNAME%></td>	
			<td><s:property value="%{model.buildname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_ADDRESS%></td>	
			<td><s:property value="%{model.address}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_SURPLUS_NUMBER%></td>	
			<td><s:property value="%{model.surplusNumber}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_STARTING_PRICE%></td>	
			<td><s:property value="%{model.startingPrice}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_EVEN_PRICE%></td>	
			<td><s:property value="%{model.evenPrice}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_NOTICE%></td>	
			<td><s:property value="%{model.notice}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_IMAGE_PATH%></td>	
			<td><s:property value="%{model.imagePath}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_SALES_COMPANY%></td>	
			<td><s:property value="%{model.salesCompany}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_DETAIL_INTRODUCTION%></td>	
			<td><s:property value="%{model.detailIntroduction}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_FLAG%></td>	
			<td><s:property value="%{model.flag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Buildinginfo.ALIAS_UPDATETIME%></td>	
			<td><s:property value="%{model.updatetimeString}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>