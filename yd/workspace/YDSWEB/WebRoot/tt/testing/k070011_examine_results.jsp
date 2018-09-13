<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<div class="span-23 margin_top_6 prepend-h">
		<div class="span-23 text_left font_weight_b"><s:label value="考试详细:"/></div>
		<div class="span-23">
			<div class="span-23">
				<div class="span-2 text_right"><s:label value="考试名称:"/></div>
					<div class="last text_left">
					<s:property value="examineId"/> <s:property value="examineName"/>
					<input class="span-3 btn" type="button" onclick="window.open('k070021InitScoreList.action?examId=${examineId}','resultListWin');" value="考试成绩一览"/>
				</div>
			</div>
			<div class="span-23">
				<div class="span-2 text_right"><s:label value="考试说明:"/></div>
				<div class="span-15 text_left wordBk"><s:property value="examineAllInfo.examineComment"/></div>
			</div>
			<div class="span-23">
				<div class="span-2 text_right"><s:label value="考试分类:"/></div>
				<div class="span-10 text_left"><s:property value="categoryName"/></div>
			</div>	
			<div class="span-23 none">
			<s:if test="examineCountNum != 0">
				<div class="span-23">
					<div class="span-2 text_right"><s:label value="考试概况:"/></div>
					<div class="span-2 text_right"><s:label cssClass="span-2" value="参加人数:"/></div>
					<div class="span-1 text_center"><s:property value="testResultsInfo.joinExamineNum"/></div>
					<div class="span-1 text_left"><s:label value="人"/></div>
					<div class="span-2 text_right"><s:label cssClass="span-2" value="合格人数:"/></div>
					<div class="span-1 text_center"><s:property value="testResultsInfo.passExamineNum"/></div>
					<div class="span-1 text_left"><s:label value="人"/></div>
					<div class="span-2 text_right"><s:label cssClass="span-2" value="不合格人数:"/></div>
					<div class="span-1 text_center"><s:property value="testResultsInfo.notPassExamineNum"/></div>
					<div class="span-1 text_left"><s:label value="人"/></div>
					<div class="span-2 text_right"><s:label cssClass="span-2" value="通过率:"/></div>
					<div class="span-1 text_center"><s:property value="testResultsInfo.examinePassRate"/></div>
					<div class="span-1 text_left"><s:label value="%"/></div>															
				</div>
				<div class="span-23">
					<s:if test="testResultsInfo.resultlevel1Num != 0 || examineAllInfo.resultlevelNum < 1">
						<div class="span-4 text_right"><s:label cssClass="span-2" value="一档:"/></div>
						<div class="span-1 text_center"><s:property value="testResultsInfo.resultlevel1Num"/></div>
						<div class="span-1 text_left"><s:label value="人"/></div>
					</s:if>
					<s:if test="testResultsInfo.resultlevel2Num != 0 || examineAllInfo.resultlevelNum < 2">					
						<div class="span-2 text_right"><s:label cssClass="span-2" value="二档:"/></div>
						<div class="span-1 text_center"><s:property value="testResultsInfo.resultlevel2Num"/></div>
						<div class="span-1 text_left"><s:label value="人"/></div>
					</s:if>
					<s:if test="testResultsInfo.resultlevel3Num != 0 || examineAllInfo.resultlevelNum < 3">
						<div class="span-2 text_right"><s:label cssClass="span-2" value="三档:"/></div>
						<div class="span-1 text_center"><s:property value="testResultsInfo.resultlevel3Num"/></div>
						<div class="span-1 text_left"><s:label value="人"/></div>
					</s:if>
					<s:if test="testResultsInfo.resultlevel4Num != 0 || examineAllInfo.resultlevelNum < 4">
						<div class="span-2 text_right"><s:label cssClass="span-2" value="四档:"/></div>
						<div class="span-1 text_center"><s:property value="testResultsInfo.resultlevel4Num"/></div>
						<div class="span-1 text_left"><s:label value="人"/></div>
					</s:if>
					<s:if test="testResultsInfo.resultlevel5Num != 0 || examineAllInfo.resultlevelNum < 5">
						<div class="span-2 text_right"><s:label cssClass="span-2" value="五档:"/></div>
						<div class="span-1 text_center"><s:property value="testResultsInfo.resultlevel5Num"/></div>
						<div class="span-1 text_left"><s:label value="人"/></div>
					</s:if>
				</div>
			</s:if>					
			</div>
		</div>
	</div>
	<div class="span-23 margin_top_6 prepend-h">
		<div class="span-23 text_left"><s:label value="具体考试:"/></div>
		<table id="examineResultsList" class="datagridtt ellipsis">
			<tr>
				<th class="percent_8">考试ID</th>
				<th class="percent_18">考试名称</th>
				<th class="percent_12">考试日期</th>
				<th class="percent_12">参加人数（人）</th>
				<th class="percent_12">合格人数（人）</th>
				<th class="none">不合格人数（人）</th>
				<th class="percent_10">通过率（%）</th>
				<th class="percent_10">平均分（分）</th>
				<th>操作</th>
			</tr>
			<s:if test="examineSpecificList.size > 0">
				<s:iterator value = "examineSpecificList">
					<tr>
						<td class="text_center">
							<s:property value="examineId"/>
						</td>
						<td>
							<s:label title="%{examineName}" name="examineName"/>
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
						<td class="text_right none">
							<s:property value="notPassExamineNum"/>
						</td>
						<td class="text_right">
							<s:property value="examinePassRate"/>
						</td>
						<td class="text_right">
							<s:property value="averageScore"/>
						</td>
						<td class="text_center">
							<s:a href="#" onclick="window.open('k070031InitScoreDetails.action?examineId=%{examineId}','resultDetailsWin')">成绩明细</s:a>
						</td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		<div class="span-23 text_center last ">	 
		 	总计:<s:property value="%{examineSpecificList.size}"/>件&nbsp;
		</div>	
	</div>