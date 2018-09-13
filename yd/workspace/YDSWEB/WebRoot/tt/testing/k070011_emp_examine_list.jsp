<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<table id= "empExamineTableList" class="datagridtt ellipsis">
	<tr>
		<th class="span-2">考试ID</th>
		<th class="span-6">考试名称</th>
		<th class="span-6">考试分类</th>
		<th >操作</th>		
	</tr>
	<s:if test="empExamineList.size > 0">
		<s:iterator value ="empExamineList">
		<tr>
			<td class="text_center">
				<s:property value = "parentExamineId"/>
			</td>
			<td>
				<s:label title="%{examineName}" name="examineName"/>
			</td>
			<td>
				<s:label title="%{categoryName}" name="categoryName"/>
			</td>
			<td class="text_center">
				<!--<s:a href ="#" onclick="getEmpExamineInfo('%{parentExamineId}')">详细</s:a>-->
				<s:a href ="#" onclick="getEmpExamineInfo('%{parentExamineId}','1')">查询有效成绩</s:a>
				<s:a href ="#" onclick="getEmpExamineInfo('%{parentExamineId}','2')">查询全部成绩</s:a>
			</td>									
		</tr>
		</s:iterator>
	</s:if>
</table>
<div class="span-23 margin_top_6 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>
<div class="span-23 margin_top_6 none">
	<s:form id="examineRadioValueForm" action="" method ="post" >
		<div class="text_left span-3">
			<s:radio list="#{1:'显示出有效成绩', 2:'显示出全部成绩'}" name="examineRadioValue" value="2"/>
		</div>
	</s:form>
</div>
<div id="divEmpSpecificList" class="span-23 margin_top_6 none">
	<s:include value="k070011_emp_specific_List.jsp" />
</div>