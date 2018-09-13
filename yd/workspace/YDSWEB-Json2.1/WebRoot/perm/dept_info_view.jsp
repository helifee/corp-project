<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:fielderror></s:fielderror>
<s:form  method="post" id="deptInfoForm">
	<table width="895" border="0" cellpadding="2" cellspacing="2"
		rules="all" align="center">
		<tr>
			<td align="left">
	      	<s:a href="#" onclick="resize()"><font size="3">收放</font></s:a> </td>
		</tr>
	</table>
	<s:div id="dept_info_body">
	<fieldset style="height: 100px; width: 927px">
		<legend style="color: #000000" align="center"><font size="4"
		color="#6c95d0"><strong>新建/修改部门信息</strong></font></legend>
	<table width="910" border="0" id="modifyDeptInfoTable" cellpadding="2"
		cellspacing="2" rules="all">
		<tr>
			<td colspan="6" align="center"></td>
		</tr>
		<tr height="10">
			<td align="left" width="300">部门ID<font style="color: #FF0000"> * </font></td>
			<td width="100">
	          <s:textfield name="departmentInfo.deptId" id="deptId" label="部门ID" cssStyle="WIDTH: 80px; HEIGHT: 20px" maxlength="3" theme="simple"></s:textfield>
			</td> 
			<td align="left" width="110">部门名称<font style="color: #FF0000"> * </font></td>
			<td width="150">
			 <s:textfield name="departmentInfo.deptNm" id="deptNm" label="部门名称" cssStyle="WIDTH: 130px; HEIGHT: 20px" maxlength="30" theme="simple"></s:textfield>
			</td>
			<td align="left" width="110">部门略称<font style="color: #FF0000"> * </font></td>
			<td width="150">
			 <s:textfield name="departmentInfo.deptSnm" id="deptSnm" label="部门略称" cssStyle="WIDTH: 130px; HEIGHT: 20px" maxlength="30" theme="simple"></s:textfield>
			</td>
		</tr>
		<tr>
			<td align="left">上级部门ID</td>
			<td>
			  <s:textfield name="departmentInfo.parentDeptId"  id="parentDeptId" label="上级部门ID" onblur="getName(1)" cssStyle="WIDTH: 80px; HEIGHT: 20px" maxlength="3" theme="simple"></s:textfield>
			</td>
	        <td>
	          <s:label theme="simple" id="parentDeptNm" name="departmentInfo.parentDeptNm"></s:label>
			</td>
			<td align="left">部门主管ID</td>
			<td>
			  <s:textfield name="departmentInfo.leaderId"  id="leaderId" label="部门主管ID" onblur="getName(2)" cssStyle="WIDTH: 80px; HEIGHT: 20px" maxlength="6" theme="simple"></s:textfield>
			</td>
	        <td>
			  <s:label theme="simple" id="leaderNm" name="departmentInfo.leaderNm"></s:label>
			</td>
		</tr>
		<tr>
			<td align="left">部门描述</td>
			<td colspan="5">
			  <s:textfield name="departmentInfo.deptDesc"  id="deptDesc" label="部门描述" cssStyle="WIDTH: 780px; HEIGHT: 20px" maxlength="200" theme="simple"></s:textfield>
			</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td align="right"><input type="button" name="tijiao" value="提交"
				id="tijiao" style="WIDTH: 60px; HEIGHT: 24px"
				onclick="submitDeptInfo()"/>
				<input type="button" name="cancle" value="取消"
				id="cancle" style="WIDTH: 60px; HEIGHT: 24px"
				onclick="clearDeptInfo()"/></td>
		</tr>
	</table>
	</fieldset> 
	</s:div>
</s:form>