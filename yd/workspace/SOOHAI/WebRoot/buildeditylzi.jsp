<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<s:form action="buildedit" theme="simple" method="post">
	<table width="950" border="0" cellspacing="2" cellpadding="2"
		align="center">
		<tr><td align="center" bgColor="#6c95d0"><font color="#FFFFFF"><input type="checkbox" name="allsel"
				id="save_allsel" onclick="allselect()" /> 全选 </font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">楼盘名称</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">楼盘地址</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">剩余套数</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">起价</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">均价</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">更改</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">删除</font></td>
		</tr>
		<s:if test="buildinginfos.size > 0">
			<s:iterator value="buildinginfos" id="yl">
				<tr align="center">
				<td bgcolor="#ffffd9"><input type="checkbox" name="allsel"
						id="<s:property value="#yl.buildId" />"
						value="ckk"
						onclick="checkselect('<s:property value="#yl.buildId" />')" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="#yl.buildName" /></td>
					<td bgcolor="#ffffd9" align="left"><s:property value="#yl.address" /></td>
					<td bgcolor="#ffffd9" align="right"><s:property value="#yl.surplusNumber" /></td>
					<td bgcolor="#ffffd9" align="right"><s:property value="#yl.startingPrice" /></td>
					<td bgcolor="#ffffd9" align="right"><s:property value="#yl.evenPrice" /></td>
					<td bgcolor="#ffffd9"><s:url action="getbuildinginfo"
						id="getbuildinginfoUrl">
						<s:param name="cityId" value="%{#yl.cityId}"></s:param>
						<s:param name="distId" value="%{#yl.distId}"></s:param>
						<s:param name="buildId" value="%{#yl.buildId}"></s:param>
					</s:url> <s:a href="%{getbuildinginfoUrl}">更改</s:a></td>
					<td bgcolor="#ffffd9"><s:a href="#"
						onclick="buildingdel('%{#yl.buildId}'); return false">
					删除	</s:a></td>
				</tr>
			</s:iterator>
		</s:if>
		<tr>
			<td style="display: none"><s:select id="temporaryinfos"
			name="temporaryinfos" label="" listKey="buildId" 
			list="temporaryinfoslist" multiple="true" /></td>
			</tr>
	</table>

</s:form>