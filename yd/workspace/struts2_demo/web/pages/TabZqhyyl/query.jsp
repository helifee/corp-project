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
	<title><%=TabZqhyyl.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/TabZqhyyl/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/TabZqhyyl/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQHYID%></td>
		   <td>
				<input  type="text" name="s_zqhyid" size="30" maxlength="10" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQNHYTS%></td>
		   <td>
				<input  type="text" name="s_zqnhyts" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQLX%></td>
		   <td>
				<input  type="text" name="s_zqlx" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYBZ%></td>
		   <td>
				<input  type="text" name="s_hybz" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_ZQHYZT%></td>
		   <td>
				<input  type="text" name="s_zqhyzt" size="30" maxlength="255" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_BMBZ%></td>
		   <td>
				<input  type="text" name="s_bmbz" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYSID%></td>
		   <td>
				<input  type="text" name="s_hysid" size="30" maxlength="2" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYKSRQ%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSRQ%>'})" type="text" name="s_hyksrq" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYJSRQ%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSRQ%>'})" type="text" name="s_hyjsrq" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYKSSJ%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYKSSJ%>'})" type="text" name="s_hykssj" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_HYJSSJ%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_HYJSSJ%>'})" type="text" name="s_hyjssj" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_YYRID%></td>
		   <td>
				<input  type="text" name="s_yyrid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_XMZID%></td>
		   <td>
				<input  type="text" name="s_xmzid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_CJZRS%></td>
		   <td>
				<input  type="text" name="s_cjzrs" size="30" maxlength="3" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_GGBZ%></td>
		   <td>
				<input  type="text" name="s_ggbz" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_DELFLG%></td>
		   <td>
				<input  type="text" name="s_delflg" size="30" maxlength="1" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=TabZqhyyl.ALIAS_UPDATETIME%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=TabZqhyyl.FORMAT_UPDATETIME%>'})" type="text" name="s_updatetime" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>