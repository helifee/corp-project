<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 用户基本信息列表画面 -->
<s:hidden id="insertFlag" name="insertFlag" />
<div class="span-24 padding_top_2 padding_bottom_2">
	<div class="span-12 text_left">
		<s:label id="userInfoCnt" name="userInfoCnt" />
		<s:label value="人:" />
	</div>
	<div class="span-12 text_right last">
		<input type="button" id="createBtn" name="createBtn" value="新建"
			   class="btn" onclick="createUserInfo()"/>
	</div>
</div>
<div class="span-24">
	<table id="table_userList" class="datagrid2">
		<tr>
			<th class="percent_1 text_center">No</th>
			<th class="percent_6 text_center">用户ID</th>
			<th class="percent_8 text_center">姓名(拼音)</th>
			<th class="percent_8 text_center">中文姓名</th>
			<th class="percent_8 text_center">日文罗马字</th>
			<th class="percent_8 text_center">日文片假名</th>
			<th class="percent_8 text_center">日文汉字</th>
			<th class="percent_12 text_center">域用户名</th>
			<th class="percent_8 text_center">入社日期</th>
			<th class="percent_8 text_center">所属部门</th>
			<th class="percent_5 text_center">状态</th>
			<th class="percent_5 text_center">属性</th>
			<th class="percent_13 text_center">操作</th>
		</tr>
		<s:if test="userInfoList.size > 0">
			<s:iterator value="userInfoList">
				<tr align="center">
					<td></td>
					<td class="text_center"><s:property value="userId" /></td>
					<td class="text_center"><s:property value="userCPNm" /></td>
					<td class="text_center"><s:property value="userCnm" /></td>
					<td class="text_center"><s:property value="userJRNm" /></td>
					<td class="text_center"><s:property value="userJKNm" /></td>
					<td class="text_center"><s:property value="userJNm" /></td>
					<td class="text_center"><s:property value="userDMNm" /></td>
					<td class="text_center"><s:property value="startDate" /></td>
					<td class="text_center"><s:property value="deptNm" /></td>
					<td class="text_center"><s:property value="userState" /></td>
					<td class="text_center"><s:property value="empStatus" /></td>
					<td class="text_center">
						<s:a href="#this" onclick="referUserInfo('%{userId}')">参照</s:a>
						<s:a href="#this" onclick="modifyUserInfo('%{userId}')">修改</s:a>
						<s:a href="#this" onclick="deleteUserInfo('%{userId}')">删除</s:a>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
</div>


