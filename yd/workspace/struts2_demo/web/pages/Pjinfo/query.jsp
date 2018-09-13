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
	<title><%=Pjinfo.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Pjinfo/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Pjinfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_ENDDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_ENDDATE%>'})" type="text" name="s_enddate" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_STARTDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_STARTDATE%>'})" type="text" name="s_startdate" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_PRJMEI%></td>
		   <td>
				<input  type="text" name="s_prjmei" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_KYAKUNAME%></td>
		   <td>
				<input  type="text" name="s_kyakuname" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_CANCELFLAG%></td>
		   <td>
				<input  type="text" name="s_cancelflag" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_INTIMESTP%></td>
		   <td>
				<input  type="text" name="s_intimestp" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_UPTIMESTP%></td>
		   <td>
				<input  type="text" name="s_uptimestp" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_PROJECTTYUNAME%></td>
		   <td>
				<input  type="text" name="s_projecttyuname" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_PROJECTEINAME%></td>
		   <td>
				<input  type="text" name="s_projecteiname" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_MUSERID%></td>
		   <td>
				<input  type="text" name="s_muserid" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_YSTARTDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YSTARTDATE%>'})" type="text" name="s_ystartdate" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_YENDDATE%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YENDDATE%>'})" type="text" name="s_yenddate" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_USERNUM%></td>
		   <td>
				<input  type="text" name="s_usernum" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_PJGAIYOU%></td>
		   <td>
				<input  type="text" name="s_pjgaiyou" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_PJEM%></td>
		   <td>
				<input  type="text" name="s_pjem" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_STATUSFLG%></td>
		   <td>
				<input  type="text" name="s_statusflg" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_SUPUSERID%></td>
		   <td>
				<input  type="text" name="s_supuserid" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Pjinfo.ALIAS_BIKO%></td>
		   <td>
				<input  type="text" name="s_biko" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>