<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div id="errorMessage2" class="span-24">
	<s:fielderror cssClass="list_reset color_red"/>
</div>
<table id="posSpecificTableList" class="datagridtt">
	<tr>
		<th class="percent_8">员工ID</th>
		<th class="percent_8">员工姓名</th>	
		<th class="percent_8">考试ID</th>
		<th class="percent_10">考试名称</th>
		<th class="percent_12">考试分类</th>
		<th class="percent_12">考试日期</th>
		<th class="percent_10">通过率（%）</th>
		<th class="percent_10">平均分（分）</th>
		<th class="percent_8">通过与否</th>
		<th class="percent_6">档次</th>
		<th class="percent_10">得分（分）</th>
	</tr>
	<s:if test="examineSpecificList.size > 0">
		<s:iterator value = "examineSpecificList" status="stat">
			<tr>
				<s:if test="rowspanCnt == 1 && rowspanCntFlag != 1">
				</s:if>
				<s:else>
					<td class="text_center vertical_mid" rowspan ="${rowspanCnt}">
						<s:property value="employeesId"/>
					</td>
					<td class="text_center vertical_mid" rowspan ="${rowspanCnt}">
						<s:property value="employeesName"/>
					</td>
				</s:else>			
				<td class="text_center">
					<s:a href="#" onclick="window.open('k070031InitScoreDetails.action?examineId=%{examineId}')"><s:property value="examineId"/></s:a>
				</td>
				<td>
					<s:property value="examineName"/>
				</td>
				<td>
					<s:property value="categoryName"/>
				</td>						
				<td class="text_center">
					<s:property value = "examineStartDate"/>				
				</td>
				<td class="text_right">
					<s:property value="examinePassRate"/>
				</td>
				<td class="text_right">
					<s:property value="averageScore"/>
				</td>
				<td class="text_center">
				<s:if test="passExamineFlag == 1 ">
					O
				</s:if>
				<s:else>
					X
				</s:else>
				</td>
				<td class="text_center">
					<s:property value="resultlevelName"/>
				</td>
				<td class="text_right">
					<s:property value="totalScore"/>
					<s:hidden value = "examineJoinTimes"/>
				</td>																																																												
			</tr>
		</s:iterator>
	</s:if>
</table>
<div class="span-23 margin_top_6 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>