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
	<title><%=Tempinfo.TABLE_ALIAS%>信息</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tempinfo/list.do" method="get" theme="simple">
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tempinfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<s:hidden name="empId" id="empId" value="%{model.empId}"/>

	<table class="formTable">
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_NAME%></td>	
			<td><s:property value="%{model.empName}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PASSWD%></td>	
			<td><s:property value="%{model.empPasswd}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_DPTID%></td>	
			<td><s:property value="%{model.empDptid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_JOBID%></td>	
			<td><s:property value="%{model.empJobid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_TOTID%></td>	
			<td><s:property value="%{model.empTotid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_NIAN%></td>	
			<td><s:property value="%{model.empNianString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_MAIL%></td>	
			<td><s:property value="%{model.empMail}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PHONE%></td>	
			<td><s:property value="%{model.empPhone}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_HOMEPG%></td>	
			<td><s:property value="%{model.empHomepg}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PWDASK%></td>	
			<td><s:property value="%{model.empPwdask}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PWDASW%></td>	
			<td><s:property value="%{model.empPwdasw}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_COOKIE%></td>	
			<td><s:property value="%{model.empCookie}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_WORKID%></td>	
			<td><s:property value="%{model.empWorkid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_GUPID%></td>	
			<td><s:property value="%{model.empGupid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_ORNGUPID%></td>	
			<td><s:property value="%{model.empOrngupid}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_SFZH%></td>	
			<td><s:property value="%{model.sfzh}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_XB%></td>	
			<td><s:property value="%{model.xb}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_NL%></td>	
			<td><s:property value="%{model.nl}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_MZFL%></td>	
			<td><s:property value="%{model.mzfl}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_JIGU%></td>	
			<td><s:property value="%{model.jigu}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_GKSZ%></td>	
			<td><s:property value="%{model.gksz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_WHCD%></td>	
			<td><s:property value="%{model.whcd}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_ZHUZ%></td>	
			<td><s:property value="%{model.zhuz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_SHJI%></td>	
			<td><s:property value="%{model.shji}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_SGAO%></td>	
			<td><s:property value="%{model.sgao}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_TIZH%></td>	
			<td><s:property value="%{model.tizh}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_ZJXY%></td>	
			<td><s:property value="%{model.zjxy}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_ZHMM%></td>	
			<td><s:property value="%{model.zhmm}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_FZYT%></td>	
			<td><s:property value="%{model.fzyt}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_XIQU%></td>	
			<td><s:property value="%{model.xiqu}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_BEIZ%></td>	
			<td><s:property value="%{model.beiz}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_YXPC%></td>	
			<td><s:property value="%{model.yxpc}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_SEAT%></td>	
			<td><s:property value="%{model.seat}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_FLAG%></td>	
			<td><s:property value="%{model.empFlag}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EXPHONE%></td>	
			<td><s:property value="%{model.exphone}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_LDHT%></td>	
			<td><s:property value="%{model.ldht}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_LJSR%></td>	
			<td><s:property value="%{model.ljsrString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_YXHT%></td>	
			<td><s:property value="%{model.yxht}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_YJSR%></td>	
			<td><s:property value="%{model.yjsrString}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_JNAME%></td>	
			<td><s:property value="%{model.empJname}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_MIMA%></td>	
			<td><s:property value="%{model.empMima}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_DIRECT%></td>	
			<td><s:property value="%{model.empDirect}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_EMP_STOP%></td>	
			<td><s:property value="%{model.empStop}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_NOTE3%></td>	
			<td><s:property value="%{model.note3}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_NOTE1%></td>	
			<td><s:property value="%{model.note1}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_NOTE2%></td>	
			<td><s:property value="%{model.note2}" /></td>
		</tr>
		<tr>	
			<td class="tdLabel"><%=Tempinfo.ALIAS_SFZH1%></td>	
			<td><s:property value="%{model.sfzh1}" /></td>
		</tr>
	</table>
</s:form>

</body>

</html>