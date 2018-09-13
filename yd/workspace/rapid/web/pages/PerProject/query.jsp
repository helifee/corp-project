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
	<title><%=PerProject.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/PerProject/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/PerProject/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME%></td>
		   <td>
				<input  type="text" name="s_proName" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME_CN%></td>
		   <td>
				<input  type="text" name="s_proNameCn" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PRO_NAME_ENG%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PRO_NAME_ENG%>'})" type="text" name="s_proNameEng" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PRO_DESC%></td>
		   <td>
				<input  type="text" name="s_proDesc" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PARENT_PRO%></td>
		   <td>
				<input  type="text" name="s_parentPro" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_CUS_NAME%></td>
		   <td>
				<input  type="text" name="s_cusName" size="30" maxlength="256" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_CUS_CONTACT%></td>
		   <td>
				<input  type="text" name="s_cusContact" size="30" maxlength="256" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_DEVELOP_ENVI%></td>
		   <td>
				<input  type="text" name="s_developEnvi" size="30" maxlength="65535" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_DEPT_ID%></td>
		   <td>
				<input  type="text" name="s_deptId" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PLAN_STA_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_STA_DATE%>'})" type="text" name="s_planStaDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_PLAN_END_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_END_DATE%>'})" type="text" name="s_planEndDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_REAL_STA_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_STA_DATE%>'})" type="text" name="s_realStaDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_REAL_END_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_END_DATE%>'})" type="text" name="s_realEndDate" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=PerProject.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>