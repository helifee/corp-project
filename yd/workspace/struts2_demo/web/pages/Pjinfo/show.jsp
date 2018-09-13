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
	<title><%=Pjinfo.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Pjinfo/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Pjinfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="projectid" id="projectid" value="%{model.projectid}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_ENDDATE%></td>	
			<td><s:property value="%{model.enddateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_STARTDATE%></td>	
			<td><s:property value="%{model.startdateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_PRJMEI%></td>	
			<td><s:property value="%{model.prjmei}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_KYAKUNAME%></td>	
			<td><s:property value="%{model.kyakuname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_CANCELFLAG%></td>	
			<td><s:property value="%{model.cancelflag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_INTIMESTP%></td>	
			<td><s:property value="%{model.intimestp}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_UPTIMESTP%></td>	
			<td><s:property value="%{model.uptimestp}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_PROJECTTYUNAME%></td>	
			<td><s:property value="%{model.projecttyuname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_PROJECTEINAME%></td>	
			<td><s:property value="%{model.projecteiname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_MUSERID%></td>	
			<td><s:property value="%{model.muserid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_YSTARTDATE%></td>	
			<td><s:property value="%{model.ystartdateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_YENDDATE%></td>	
			<td><s:property value="%{model.yenddateString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_USERNUM%></td>	
			<td><s:property value="%{model.usernum}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_PJGAIYOU%></td>	
			<td><s:property value="%{model.pjgaiyou}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_PJEM%></td>	
			<td><s:property value="%{model.pjem}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_STATUSFLG%></td>	
			<td><s:property value="%{model.statusflg}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_SUPUSERID%></td>	
			<td><s:property value="%{model.supuserid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Pjinfo.ALIAS_BIKO%></td>	
			<td><s:property value="%{model.biko}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>