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
	<title><%=Tprjmgrs.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tprjmgrs/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tprjmgrs/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_NAME%></td>
		   <td>
				<input  type="text" name="s_prjName" size="30" maxlength="120" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DESCRIBE%></td>
		   <td>
				<input  type="text" name="s_prjDescribe" size="30" maxlength="65535" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CUSNAME%></td>
		   <td>
				<input  type="text" name="s_prjCusname" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CUSCONTACT%></td>
		   <td>
				<input  type="text" name="s_prjCuscontact" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_ENVIR%></td>
		   <td>
				<input  type="text" name="s_prjEnvir" size="30" maxlength="65535" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DPTID%></td>
		   <td>
				<input  type="text" name="s_prjDptid" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_PBDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PBDATE%>'})" type="text" name="s_prjPbdate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_PEDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_PEDATE%>'})" type="text" name="s_prjPedate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_TBDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TBDATE%>'})" type="text" name="s_prjTbdate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_TEDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_TEDATE%>'})" type="text" name="s_prjTedate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_DATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tprjmgrs.FORMAT_PRJ_DATE%>'})" type="text" name="s_prjDate" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_REF%></td>
		   <td>
				<input  type="text" name="s_prjRef" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_CNAME%></td>
		   <td>
				<input  type="text" name="s_prjCname" size="30" maxlength="120" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tprjmgrs.ALIAS_PRJ_ENAME%></td>
		   <td>
				<input  type="text" name="s_prjEname" size="30" maxlength="120" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>