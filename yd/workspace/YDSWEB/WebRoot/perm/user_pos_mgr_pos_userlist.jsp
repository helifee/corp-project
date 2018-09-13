<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<table border="1px red">
	<tr>
		<td align="center" width="200" bgColor="#6c95d0"><font
			color="#FFFFFF">用户姓名</font></td>
		<td align="center" width="200" bgColor="#6c95d0"><font
			color="#FFFFFF">2212</font></td>
	</tr>
</table>
<s:if test="userPosMgrUserDetailInfos.size > 0">
	<s:iterator value="userPosMgrUserDetailInfos" status="staInfo">
		<s:if test="#staInfo.isOdd()">
			<div class="span-3"><s:checkbox name="userId"
				fieldValue="%{userId}" id="%{userId}" /> <s:property value="userNm" /></div>
		</s:if>
		<s:if test="#staInfo.isEven()">
			<div class="span-3"><s:checkbox name="userId"
				fieldValue="%{userId}" id="%{userId}" /> <s:property value="userNm" /></div>
			<br />
		</s:if>
	</s:iterator>
</s:if>

