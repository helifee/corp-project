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
	<title><%=Tempinfo.TABLE_ALIAS%>查询</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<s:form action="/pages/Tempinfo/list.do" method="post">
	<input type="submit" value="提交" onclick="return new Validation(document.forms[0]).validate();"/>
	<input type="button" value="返回列表" onclick="window.location='${ctx}/pages/Tempinfo/list.do'"/>
	<input type="button" value="后退" onclick="history.back();"/>
	
	<table class="formTable">
	
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_NAME%></td>
		   <td>
				<input  type="text" name="s_empName" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PASSWD%></td>
		   <td>
				<input  type="text" name="s_empPasswd" size="30" maxlength="11" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_DPTID%></td>
		   <td>
				<input  type="text" name="s_empDptid" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_JOBID%></td>
		   <td>
				<input  type="text" name="s_empJobid" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_TOTID%></td>
		   <td>
				<input  type="text" name="s_empTotid" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_NIAN%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_EMP_NIAN%>'})" type="text" name="s_empNian" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_MAIL%></td>
		   <td>
				<input  type="text" name="s_empMail" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PHONE%></td>
		   <td>
				<input  type="text" name="s_empPhone" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_HOMEPG%></td>
		   <td>
				<input  type="text" name="s_empHomepg" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PWDASK%></td>
		   <td>
				<input  type="text" name="s_empPwdask" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_PWDASW%></td>
		   <td>
				<input  type="text" name="s_empPwdasw" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_COOKIE%></td>
		   <td>
				<input  type="text" name="s_empCookie" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_WORKID%></td>
		   <td>
				<input  type="text" name="s_empWorkid" size="30" maxlength="5" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_GUPID%></td>
		   <td>
				<input  type="text" name="s_empGupid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_ORNGUPID%></td>
		   <td>
				<input  type="text" name="s_empOrngupid" size="30" maxlength="8" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_SFZH%></td>
		   <td>
				<input  type="text" name="s_sfzh" size="30" maxlength="18" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_XB%></td>
		   <td>
				<input  type="text" name="s_xb" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_NL%></td>
		   <td>
				<input  type="text" name="s_nl" size="30" maxlength="2" class="validate-integer max-value-2147483647"/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_MZFL%></td>
		   <td>
				<input  type="text" name="s_mzfl" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_JIGU%></td>
		   <td>
				<input  type="text" name="s_jigu" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_GKSZ%></td>
		   <td>
				<input  type="text" name="s_gksz" size="30" maxlength="50" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_WHCD%></td>
		   <td>
				<input  type="text" name="s_whcd" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_ZHUZ%></td>
		   <td>
				<input  type="text" name="s_zhuz" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_SHJI%></td>
		   <td>
				<input  type="text" name="s_shji" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_SGAO%></td>
		   <td>
				<input  type="text" name="s_sgao" size="30" maxlength="4" class="validate-number "/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_TIZH%></td>
		   <td>
				<input  type="text" name="s_tizh" size="30" maxlength="5" class="validate-number "/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_ZJXY%></td>
		   <td>
				<input  type="text" name="s_zjxy" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_ZHMM%></td>
		   <td>
				<input  type="text" name="s_zhmm" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_FZYT%></td>
		   <td>
				<input  type="text" name="s_fzyt" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_XIQU%></td>
		   <td>
				<input  type="text" name="s_xiqu" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_BEIZ%></td>
		   <td>
				<input  type="text" name="s_beiz" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_YXPC%></td>
		   <td>
				<input  type="text" name="s_yxpc" size="30" maxlength="6" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_SEAT%></td>
		   <td>
				<input  type="text" name="s_seat" size="30" maxlength="4" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_FLAG%></td>
		   <td>
				<input  type="text" name="s_empFlag" size="30" maxlength="1" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EXPHONE%></td>
		   <td>
				<input  type="text" name="s_exphone" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_LDHT%></td>
		   <td>
				<input  type="text" name="s_ldht" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_LJSR%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_LJSR%>'})" type="text" name="s_ljsr" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_YXHT%></td>
		   <td>
				<input  type="text" name="s_yxht" size="30" maxlength="2" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_YJSR%></td>
		   <td>
				<input onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_YJSR%>'})" type="text" name="s_yjsr" size="30" maxlength="10" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_JNAME%></td>
		   <td>
				<input  type="text" name="s_empJname" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_MIMA%></td>
		   <td>
				<input  type="text" name="s_empMima" size="30" maxlength="5" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_DIRECT%></td>
		   <td>
				<input  type="text" name="s_empDirect" size="30" maxlength="20" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_EMP_STOP%></td>
		   <td>
				<input  type="text" name="s_empStop" size="30" maxlength="30" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_NOTE3%></td>
		   <td>
				<input  type="text" name="s_note3" size="30" maxlength="100" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_NOTE1%></td>
		   <td>
				<input  type="text" name="s_note1" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_NOTE2%></td>
		   <td>
				<input  type="text" name="s_note2" size="30" maxlength="200" class=""/>
		   </td>
		</tr>
		<tr bgcolor="#FFFFFF">
		   <td class="tdLabel"><%=Tempinfo.ALIAS_SFZH1%></td>
		   <td>
				<input  type="text" name="s_sfzh1" size="30" maxlength="19" class=""/>
		   </td>
		</tr>
	
	</table>
</s:form>	
			
</body>

</html>