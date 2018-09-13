<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript"
	src="js/common.js"></script>
<script type="text/javascript"
	src="js/prototype.js"></script>
<script type="text/javascript"
	src="js/applicationDeptInfo.js"></script>
<table width="972" border="0" cellpadding="0" cellspacing="0"
	align="center">
	<tr>
		<td width="37" height="72"></td>
		<td width="898">
		<p align="center"><font size="5" color="green"><strong>部门信息</strong></font></p>
		</td>
		<td width="37"></td>
	</tr>
	<tr>
		<td></td>
		<td>
			<div id="div_perm_deptInfoView" align="center"><s:include
				value="dept_info_view.jsp" /></div>
		</td>
		<td></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td></td>
		<td>
			<div id="div_perm_deptInfoList" align="center"><s:include
				value="dept_info_list.jsp" /></div>
		</td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
	</tr>
</table>
<script type="text/javascript">
	dept_info_body.style.display="none";
	$('deptInfoForm').disable();
</script>