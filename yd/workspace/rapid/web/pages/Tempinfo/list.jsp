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
	<link href="${ctx}/widgets/extremecomponents/extremecomponents.css" type="text/css" rel=stylesheet>
	<title><%=Tempinfo.TABLE_ALIAS%> 维护</title>
</head>

<body>
<%@ include file="/commons/messages.jsp" %>

<div class="queryPanel">
<form action="<c:url value="/pages/Tempinfo/list.do"/>" method="get" style="display: inline;">
<fieldset>
	<legend>搜索</legend>
	<table>
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_NAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empName}"  name="s_empName"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_PASSWD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPasswd}"  name="s_empPasswd"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_DPTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empDptid}"  name="s_empDptid"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_JOBID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empJobid}"  name="s_empJobid"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_TOTID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empTotid}"  name="s_empTotid"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_NIAN%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empNian}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_EMP_NIAN%>'})"  name="s_empNian"   />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_MAIL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empMail}"  name="s_empMail"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_PHONE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPhone}"  name="s_empPhone"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_HOMEPG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empHomepg}"  name="s_empHomepg"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_PWDASK%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPwdask}"  name="s_empPwdask"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_PWDASW%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empPwdasw}"  name="s_empPwdasw"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_COOKIE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empCookie}"  name="s_empCookie"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_WORKID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empWorkid}"  name="s_empWorkid"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_GUPID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empGupid}"  name="s_empGupid"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_ORNGUPID%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empOrngupid}"  name="s_empOrngupid"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_SFZH%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sfzh}"  name="s_sfzh"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_XB%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xb}"  name="s_xb"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_NL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.nl}"  name="s_nl"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_MZFL%>
			</td>		
			<td>
				<input value="${pageRequest.filters.mzfl}"  name="s_mzfl"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_JIGU%>
			</td>		
			<td>
				<input value="${pageRequest.filters.jigu}"  name="s_jigu"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_GKSZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.gksz}"  name="s_gksz"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_WHCD%>
			</td>		
			<td>
				<input value="${pageRequest.filters.whcd}"  name="s_whcd"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_ZHUZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zhuz}"  name="s_zhuz"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_SHJI%>
			</td>		
			<td>
				<input value="${pageRequest.filters.shji}"  name="s_shji"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_SGAO%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sgao}"  name="s_sgao"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_TIZH%>
			</td>		
			<td>
				<input value="${pageRequest.filters.tizh}"  name="s_tizh"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_ZJXY%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zjxy}"  name="s_zjxy"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_ZHMM%>
			</td>		
			<td>
				<input value="${pageRequest.filters.zhmm}"  name="s_zhmm"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_FZYT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.fzyt}"  name="s_fzyt"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_XIQU%>
			</td>		
			<td>
				<input value="${pageRequest.filters.xiqu}"  name="s_xiqu"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_BEIZ%>
			</td>		
			<td>
				<input value="${pageRequest.filters.beiz}"  name="s_beiz"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_YXPC%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yxpc}"  name="s_yxpc"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_SEAT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.seat}"  name="s_seat"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_FLAG%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empFlag}"  name="s_empFlag"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EXPHONE%>
			</td>		
			<td>
				<input value="${pageRequest.filters.exphone}"  name="s_exphone"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_LDHT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.ldht}"  name="s_ldht"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_LJSR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.ljsr}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_LJSR%>'})"  name="s_ljsr"   />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_YXHT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yxht}"  name="s_yxht"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_YJSR%>
			</td>		
			<td>
				<input value="${pageRequest.filters.yjsr}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_YJSR%>'})"  name="s_yjsr"   />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_JNAME%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empJname}"  name="s_empJname"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_MIMA%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empMima}"  name="s_empMima"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_DIRECT%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empDirect}"  name="s_empDirect"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_EMP_STOP%>
			</td>		
			<td>
				<input value="${pageRequest.filters.empStop}"  name="s_empStop"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_NOTE3%>
			</td>		
			<td>
				<input value="${pageRequest.filters.note3}"  name="s_note3"  />
			</td>
		</tr>	
		<tr>	
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_NOTE1%>
			</td>		
			<td>
				<input value="${pageRequest.filters.note1}"  name="s_note1"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_NOTE2%>
			</td>		
			<td>
				<input value="${pageRequest.filters.note2}"  name="s_note2"  />
			</td>
			<td class="tdLabel">
					<%=Tempinfo.ALIAS_SFZH1%>
			</td>		
			<td>
				<input value="${pageRequest.filters.sfzh1}"  name="s_sfzh1"  />
			</td>
		</tr>	
	</table>
</fieldset>
<div class="handleControl">
	<input type="submit" class="stdButton" style="width:80px" value="查询" onclick="getReferenceForm(this).action='${ctx}/pages/Tempinfo/list.do'"/>
	<input type="submit" class="stdButton" style="width:80px" value="新增" onclick="getReferenceForm(this).action='${ctx}/pages/Tempinfo/create.do'"/>
	<input type="button" class="stdButton" style="width:80px" value="删除" onclick="batchDelete('${ctx}/pages/Tempinfo/delete.do','items',document.forms.ec)"/>
<div>
</form>
</div>

<ec:table items='page.result' var="item" method="get"
	retrieveRowsCallback="limit" sortRowsCallback="limit" filterRowsCallback="limit"
	action="${ctx}/pages/Tempinfo/list.do" autoIncludeParameters="true">
	<ec:row>
		<ec:column property="选择" title="<input type='checkbox' onclick=\"setAllCheckboxState('items',this.checked)\" >" sortable="false" width="3%" viewsAllowed="html">
			<input type="checkbox" name="items" value="empId=${item.empId}&"/>
		</ec:column>
		<ec:column property="empName"  title="<%=Tempinfo.ALIAS_EMP_NAME%>"/>
		<ec:column property="empPasswd"  title="<%=Tempinfo.ALIAS_EMP_PASSWD%>"/>
		<ec:column property="empDptid"  title="<%=Tempinfo.ALIAS_EMP_DPTID%>"/>
		<ec:column property="empJobid"  title="<%=Tempinfo.ALIAS_EMP_JOBID%>"/>
		<ec:column property="empTotid"  title="<%=Tempinfo.ALIAS_EMP_TOTID%>"/>
		<ec:column property="empNian" value="${item.empNianString}" title="<%=Tempinfo.ALIAS_EMP_NIAN%>"/>
		<ec:column property="empMail"  title="<%=Tempinfo.ALIAS_EMP_MAIL%>"/>
		<ec:column property="empPhone"  title="<%=Tempinfo.ALIAS_EMP_PHONE%>"/>
		<ec:column property="empHomepg"  title="<%=Tempinfo.ALIAS_EMP_HOMEPG%>"/>
		<ec:column property="empPwdask"  title="<%=Tempinfo.ALIAS_EMP_PWDASK%>"/>
		<ec:column property="empPwdasw"  title="<%=Tempinfo.ALIAS_EMP_PWDASW%>"/>
		<ec:column property="empCookie"  title="<%=Tempinfo.ALIAS_EMP_COOKIE%>"/>
		<ec:column property="empWorkid"  title="<%=Tempinfo.ALIAS_EMP_WORKID%>"/>
		<ec:column property="empGupid"  title="<%=Tempinfo.ALIAS_EMP_GUPID%>"/>
		<ec:column property="empOrngupid"  title="<%=Tempinfo.ALIAS_EMP_ORNGUPID%>"/>
		<ec:column property="sfzh"  title="<%=Tempinfo.ALIAS_SFZH%>"/>
		<ec:column property="xb"  title="<%=Tempinfo.ALIAS_XB%>"/>
		<ec:column property="nl"  title="<%=Tempinfo.ALIAS_NL%>"/>
		<ec:column property="mzfl"  title="<%=Tempinfo.ALIAS_MZFL%>"/>
		<ec:column property="jigu"  title="<%=Tempinfo.ALIAS_JIGU%>"/>
		<ec:column property="gksz"  title="<%=Tempinfo.ALIAS_GKSZ%>"/>
		<ec:column property="whcd"  title="<%=Tempinfo.ALIAS_WHCD%>"/>
		<ec:column property="zhuz"  title="<%=Tempinfo.ALIAS_ZHUZ%>"/>
		<ec:column property="shji"  title="<%=Tempinfo.ALIAS_SHJI%>"/>
		<ec:column property="sgao"  title="<%=Tempinfo.ALIAS_SGAO%>"/>
		<ec:column property="tizh"  title="<%=Tempinfo.ALIAS_TIZH%>"/>
		<ec:column property="zjxy"  title="<%=Tempinfo.ALIAS_ZJXY%>"/>
		<ec:column property="zhmm"  title="<%=Tempinfo.ALIAS_ZHMM%>"/>
		<ec:column property="fzyt"  title="<%=Tempinfo.ALIAS_FZYT%>"/>
		<ec:column property="xiqu"  title="<%=Tempinfo.ALIAS_XIQU%>"/>
		<ec:column property="beiz"  title="<%=Tempinfo.ALIAS_BEIZ%>"/>
		<ec:column property="yxpc"  title="<%=Tempinfo.ALIAS_YXPC%>"/>
		<ec:column property="seat"  title="<%=Tempinfo.ALIAS_SEAT%>"/>
		<ec:column property="empFlag"  title="<%=Tempinfo.ALIAS_EMP_FLAG%>"/>
		<ec:column property="exphone"  title="<%=Tempinfo.ALIAS_EXPHONE%>"/>
		<ec:column property="ldht"  title="<%=Tempinfo.ALIAS_LDHT%>"/>
		<ec:column property="ljsr" value="${item.ljsrString}" title="<%=Tempinfo.ALIAS_LJSR%>"/>
		<ec:column property="yxht"  title="<%=Tempinfo.ALIAS_YXHT%>"/>
		<ec:column property="yjsr" value="${item.yjsrString}" title="<%=Tempinfo.ALIAS_YJSR%>"/>
		<ec:column property="empJname"  title="<%=Tempinfo.ALIAS_EMP_JNAME%>"/>
		<ec:column property="empMima"  title="<%=Tempinfo.ALIAS_EMP_MIMA%>"/>
		<ec:column property="empDirect"  title="<%=Tempinfo.ALIAS_EMP_DIRECT%>"/>
		<ec:column property="empStop"  title="<%=Tempinfo.ALIAS_EMP_STOP%>"/>
		<ec:column property="note3"  title="<%=Tempinfo.ALIAS_NOTE3%>"/>
		<ec:column property="note1"  title="<%=Tempinfo.ALIAS_NOTE1%>"/>
		<ec:column property="note2"  title="<%=Tempinfo.ALIAS_NOTE2%>"/>
		<ec:column property="sfzh1"  title="<%=Tempinfo.ALIAS_SFZH1%>"/>
		<ec:column property="操作" title="操作" sortable="false" viewsAllowed="html">
			<a href="${ctx}/pages/Tempinfo/show.do?empId=${item.empId}&">查看</a>&nbsp;&nbsp;&nbsp;
			<a href="${ctx}/pages/Tempinfo/edit.do?empId=${item.empId}&">修改</a>
		</ec:column>
	</ec:row>
</ec:table>

</body>

</html>

