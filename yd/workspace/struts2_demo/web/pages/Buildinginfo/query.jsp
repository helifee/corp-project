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
	<title><%=Buildinginfo.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Buildinginfo/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Buildinginfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_CITYID%></td>
		   <td>
				<input  type="text" name="s_cityid" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_DISTID%></td>
		   <td>
				<input  type="text" name="s_distid" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_BUILDNAME%></td>
		   <td>
				<input  type="text" name="s_buildname" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_ADDRESS%></td>
		   <td>
				<input  type="text" name="s_address" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_SURPLUS_NUMBER%></td>
		   <td>
				<input  type="text" name="s_surplusNumber" size="30" maxlength="11" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_STARTING_PRICE%></td>
		   <td>
				<input  type="text" name="s_startingPrice" size="30" maxlength="11" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_EVEN_PRICE%></td>
		   <td>
				<input  type="text" name="s_evenPrice" size="30" maxlength="11" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_NOTICE%></td>
		   <td>
				<input  type="text" name="s_notice" size="30" maxlength="400" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_IMAGE_PATH%></td>
		   <td>
				<input  type="text" name="s_imagePath" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_SALES_COMPANY%></td>
		   <td>
				<input  type="text" name="s_salesCompany" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_DETAIL_INTRODUCTION%></td>
		   <td>
				<input  type="text" name="s_detailIntroduction" size="30" maxlength="10000" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_FLAG%></td>
		   <td>
				<input  type="text" name="s_flag" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Buildinginfo.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Buildinginfo.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>