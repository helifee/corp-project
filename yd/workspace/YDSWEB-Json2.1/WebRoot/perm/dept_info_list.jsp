<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:form action="" theme="simple" method="post" id="deptInfoListForm">
	<table width="957" border="0" cellpadding="2" cellspacing="1"
		rules="none" align="center">
		<tr>
			<td align="left" width="180"><font size="2">部门总数：</font>
			<s:label theme="simple" id="deptInfosCnt" name="deptInfosCnt"></s:label></td>
			<td align="right"><input type="button" name="newBuild" value="新建"
					id="newBuild" style="WIDTH: 60px; HEIGHT: 24px"
					onclick="newBuildDeptInfo()"/>
			</td>
		</tr>
	</table>
	<table width="950" border="0" cellspacing="2" cellpadding="2"
		align="center">
		<tr>
			<td align="center" width="80" bgColor="#6c95d0"><font color="#FFFFFF">部门ID</font></td>
			<td align="center" width="130" bgColor="#6c95d0"><font color="#FFFFFF">部门名称</font></td>
			<td align="center" width="110" bgColor="#6c95d0"><font color="#FFFFFF">部门略称</font></td>
			<td align="center" width="110" bgColor="#6c95d0"><font color="#FFFFFF">部门主管ID</font></td>
			<td align="center" width="120" bgColor="#6c95d0"><font color="#FFFFFF">部长主管姓名</font></td>
			<td align="center" width="100" bgColor="#6c95d0"><font color="#FFFFFF">上级部门</font></td>
			<td align="center" width="240" bgColor="#6c95d0"><font color="#FFFFFF">部门描述</font></td>
			<td align="center" width="100" bgColor="#6c95d0"><font color="#FFFFFF">操作</font></td>
		</tr>
		<s:if test="departmentInfos.size > 0">
			<s:iterator value="departmentInfos">
				<tr align="center">
					<td bgcolor="#ffffd9" align="center"><s:property value="deptId" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="deptNm" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="deptSnm" /></td>
					<td bgcolor="#ffffd9" align="center"><s:property value="leaderId" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="leaderNm" /></td>
					<td bgcolor="#ffffd9" align="center"><s:property value="parentDeptNm" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="deptDesc" /></td>
					<td align="center"><s:a href="#"
					onclick="modifyDeptInfo('%{deptId}')">
					<font size="2">更改 </font>
					</s:a><s:a href="#"
					onclick="deleteDeptInfo('%{deptId}')"><font size="2"> 删除</font></s:a></td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
</s:form>