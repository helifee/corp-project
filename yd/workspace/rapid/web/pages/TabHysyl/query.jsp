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
	<title><%=TabHysyl.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabHysyl/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabHysyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_HYSMC%></td>
		   <td>
				<input  type="text" name="s_hysmc" size="30" maxlength="34" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_RNRS%></td>
		   <td>
				<input  type="text" name="s_rnrs" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_DH%></td>
		   <td>
				<input  type="text" name="s_dh" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_SB%></td>
		   <td>
				<input  type="text" name="s_sb" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_HYBGBZ%></td>
		   <td>
				<input  type="text" name="s_hybgbz" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_WXJK%></td>
		   <td>
				<input  type="text" name="s_wxjk" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_SORTID%></td>
		   <td>
				<input  type="text" name="s_sortid" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_IMAGEFROMX%></td>
		   <td>
				<input  type="text" name="s_imagefromx" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_IMAGEFROMY%></td>
		   <td>
				<input  type="text" name="s_imagefromy" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_IMAGETOX%></td>
		   <td>
				<input  type="text" name="s_imagetox" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_IMAGETOY%></td>
		   <td>
				<input  type="text" name="s_imagetoy" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabHysyl.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabHysyl.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="0" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>