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
	<title><%=Tprjjion.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tprjjion/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tprjjion/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_ID%></td>
		   <td>
				<input  type="text" name="s_prjId" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_EMPID%></td>
		   <td>
				<input  type="text" name="s_prjEmpid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_FLAG%></td>
		   <td>
				<input  type="text" name="s_prjFlag" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_BEGDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_BEGDATE%>'})" type="text" name="s_prjBegdate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjjion.ALIAS_PRJ_ENDDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjjion.FORMAT_PRJ_ENDDATE%>'})" type="text" name="s_prjEnddate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>