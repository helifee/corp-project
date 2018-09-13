<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div id="errorMessage1" class="span-18">
	<s:fielderror cssClass="list_reset color_red"/>
</div>
<div class="span-18 text_left font_weight_b"><s:label value="考试一览:"/></div>
<table id= "examineTableList" class="datagridtt ellipsis">
	<tr>
		<th class="span-2">考试ID</th>
		<th class="span-6">考试名称</th>
		<th class="span-6">考试分类</th>
		<th>操作</th>		
	</tr>
	<s:if test="examineInfoList.size > 0">
		<s:iterator value ="examineInfoList">
		<tr>
			<td class="text_center">
				<s:property value = "examineId"/>
			</td>
			<td>
				<s:label title="%{examineName}" name="examineName"/>
			</td>
			<td>
				<s:label title="%{categoryName}" name="categoryName"/>
			</td>
			<td class="text_center">
				<s:a href ="#" onclick="getExamineInfo('%{examineId}', '%{examineName}', '%{categoryName}')">详细</s:a>
			</td>									
		</tr>
		</s:iterator>
	</s:if>
</table>
<div class="span-18 margin_top_6 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>


