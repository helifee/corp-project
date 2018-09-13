<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="span-23 margin_top_6">
<!-- 
	<div class="span-23 text_right">
		<input type="button" onclick="resultDetail()" value="成绩明细" class="span-2 btn">
		<input type="button" onclick="answerContrast()" value="答题对照" class="span-2 btn">
	</div>
-->
	<div class="span-23 text_left"><s:label value="具体考试:"/></div>
	<table id="empSpecificTableList" class="datagridtt ellipsis">
		<tr>
			<th class="percent_8">考试ID</th>
			<th class="percent_15">考试名称</th>
			<th class="percent_8 none">考试分类</th>
			<th class="percent_8">考试日期</th>
			<th class="percent_8">参加人数<br>（人）</th>
			<th class="percent_8">合格人数<br>（人）</th>
			<th class="percent_8">通过率<br>（%）</th>
			<th class="percent_8">平均分<br>（分）</th>
			<th class="percent_8">通过与否</th>
			<th class="percent_6">档次</th>
			<th class="percent_8">得分<br>（分）</th>
			<th >操作</th>		
		</tr>
		<s:if test="examineSpecificList.size > 0">
			<s:iterator value = "examineSpecificList" status="stat">
				<tr>
					<td id="empExamineid${stat.index}" class="text_center">
						<s:property value="examineId"/>
					</td>
					<td>
						<s:property value="examineName"/>
					</td>
					<td class="none">
						<s:property value="categoryName"/>
					</td>						
					<td class="text_center">
						<s:property value = "examineStartDate"/>
					</td>
					<td class="text_right">
						<s:property value="joinExamineNum"/>
					</td>
					<td class="text_right">
						<s:property value="passExamineNum"/>
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
						<s:hidden id="examineJoinTimes" name = "examineJoinTimes"/>
					</td>
					<td class="text_center">
						<s:a href ="#" onclick="resultDetail('%{examineId}')">成绩明细</s:a>
						<s:a href ="#" onclick="answerContrast('%{examineId}','%{examineJoinTimes}')">答题对照</s:a>
					</td>																																																											
				</tr>
			</s:iterator>
		</s:if>
	</table>
</div>