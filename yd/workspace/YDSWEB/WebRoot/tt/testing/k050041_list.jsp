<%--
 * @(#)k050041_fixed_qus_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 试卷一览画面（一览部分JSP）
 * 
 * @author yinfuyan
 * @version 1.00 2010/05/30
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:if test="bigquestionInfo.bigquestionType == 1">
<div class="span-23 last overflow_hd">
<div class="span-23 last">
 	<table class="datagridtt">
		<tr>
			<th class="span-1"></th>
			<th class="span-2"><span>试题ID</span></th>
			<th class="span-3"><span>分类</span></th>
			<th class="span-3"><span>关键字</span></th>
			<th class="span-2"><span>试题难度</span></th>
			<th class="span-2"><span>试题数</span></th>
			<th class="span-2"><span>试题分数</span></th>
			<!-- <th class="percent_8"><span>出题次数</span></th> -->
			<!-- <th class="percent_6"><span>正确率</span></th> -->
			<th class="span-2"><span>更新时间</span></th>
			<th class="span-3"><span>试题内容</span></th>
			<th><span>操作</span></th>
		</tr>
	</table>
</div>
</div>
<div class="span-23 overflow_scr_y last">
<div class="span-23 last">
	<table id="stableQuestionTable" class="datagridtt ellipsis">
	<tbody>
		<s:if test="bigquestionInfo.stableQueInfoList.size > 0">
		<s:iterator status="stat" value="bigquestionInfo.stableQueInfoList">
			<tr>
				<td class="span-1 text_center">
					<s:hidden id="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionOrder" name="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionOrder"/>
					<input type="radio" name="radio" id="radioSelectRow${stat.index}" value="radio">
				</td>
				<td class="span-2 text_center" id="questionId${stat.index}">
					<s:property value="questionId" />
					<s:hidden id="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionId" name="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionId" />
				</td>
				<td class="span-3 text_left">
					<s:label title="%{categoryName}" name="categoryName"/>
				</td>
				<td class="span-3">
					<s:label title="%{keyword}" name="keyword"/>
				</td>
				<td class="span-2 text_center">
					<s:property value="questionDifficultyName"/>
				</td>
				<td class="span-2 text_right">
					<s:property value="questionNumber" />
				</td>
				<td class="span-2 text_right">
					<s:textfield id="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionScore" name="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionScore" maxlength="3" cssClass="span-1" onclick="changeItemScorePop(this)"/>
					<label>分</label>
					<s:hidden id="questionScoreDetails%{#stat.index}" name="bigquestionInfo.stableQueInfoList[%{#stat.index}].questionScoreDetails"/>
					<s:hidden id= "flag" value="1"/>
				</td>
				<!-- <td class="percent_8 text_right"><s:property value="questionTimes" /><label>次</label></td> -->
				<!-- <td class="percent_6 text_right"><s:property value="rightPercent" />%</td> -->
				<td class="span-2 text_center"><s:property value="updateTime" /></td>
				<td class="span-3 text_left">
					<div id="rtfContent${stat.index}" class="none">${questionContent}</div>
					<s:label id="content%{#stat.index}" name="questionContent"/>
				</td>
				<!--
				<s:if test="pictureFlg == 2">
					<td class="percent_2"><img src="../../images/tt/practice.bmp" style="width:15px; height:15px"/></td>
				</s:if>
				<s:else>
					<td class="percent_2"><div style="width:15px; height:15px"></div></td>
				</s:else>
				<s:if test="mediaFlg == 2">
					<td class="percent_2"><img src="../../images/tt/yinpin.gif" style="width:15px; height:15px"/></td>
				</s:if>
				<s:else>
					<td class="percent_2"><div style="width:15px; height:15px"></div></td>
				</s:else>
				<s:if test="attachFlg == 2">
					<td class="percent_2"><img src="../../images/tt/fujian.gif" style="width:15px; height:15px"/></td>
				</s:if>
				<s:else>
					<td class="percent_2"><div style="width:15px; height:15px"></div></td>
				</s:else>
				-->
				<td class="text_center">
					<s:if test="createUserId == logInUser">
					<s:a cssClass="" href="#" onclick="editQuestion('%{questionId}');">编辑</s:a>
					</s:if> 
					<s:a cssClass="" href="#" onclick="deleteStableQuestion(%{questionOrder})">移除</s:a>
				</td>
				</tr>  	
			</s:iterator>
		</s:if>
	</tbody>
	</table>
</div>      
</div>      
</s:if>
<s:if test="bigquestionInfo.bigquestionType == 2">
<div class="span-23 last overflow_hd">
<div class="span-23 last">
 	<table class="datagridtt">
		<tr>
			<!-- wanqiuhong 10/14 修改：去掉增行功能，只留一条 数据
			<th class="percent_4">序号</th> -->
			<th class="percent_30"><span>试题分类</span></th>
			<th class="percent_10"><span>关键字</span></th>
			<th class="percent_10"><span>试题难度</span></th>
			<th class="percent_6"><span>试题数量</span></th>
			<th class="percent_6"><span>出题数量</span></th>
			<th class="percent_6"><span>试题分数</span></th>
			<!-- wanqiuhong 10/14 修改：去掉增行功能，只留一条 数据
			<th class="percent_10" colspan="2"><span>操作</span></th> -->
		</tr>
		<!-- wanqiuhong 10/14 修改：去掉增行功能，只留一条 数据-->
		<s:if test="bigquestionInfo.randomQueInfoList.size > 0">
			<s:iterator status="stat" value="bigquestionInfo.randomQueInfoList">
				<tr>
					<s:hidden id="conditionSerialNo" name="bigquestionInfo.randomQueInfoList[%{#stat.index}].conditionSerialNo"/>
					<td class="percent_30 text_left">
						<select class="span-3" name="bigquestionInfo.randomQueInfoList[${stat.index}].category1Id" id="category1Id" type="category1Id" defaultValue="${category1Id}" accesskey="${sltCategory1Enable}" onchange ="getKeyword(this.value);getQuestionCount(this);">
						</select>
						<select class="span-3" name="bigquestionInfo.randomQueInfoList[${stat.index}].category2Id" id="category2Id" type="category2Id" defaultValue="${category2Id}" accesskey="${sltCategory2Enable}" onchange ="getQuestionCount(this);">
						</select>
						<select class="span-3" name="bigquestionInfo.randomQueInfoList[${stat.index}].category3Id" id="category3Id" type="category3Id" defaultValue="${category3Id}" accesskey="${sltCategory3Enable}" onchange ="getQuestionCount(this);">
						</select>
					</td>
					<td class="percent_10 text_left">
						<div class="span-4">
							<s:textfield id="keyword" name="bigquestionInfo.randomQueInfoList[%{#stat.index}].keyword" cssClass="span-4" onblur ="getQuestionCount(this);"/>
						</div>
					</td>
					<td class="percent_10 text_left">
						<s:select id="questionDifficulty" list="questionDifficultyList" name="bigquestionInfo.randomQueInfoList[%{#stat.index}].questionDifficulty" listKey="diffNo" listValue="diffName" cssClass="span-2" onchange ="getQuestionCount(this);"/>
					</td>
					<td class="percent_6 text_center">
						<s:label id="questionBaseCount" name="bigquestionInfo.randomQueInfoList[0].questionBaseCount"/>
					</td>
					<td class="percent_6 text_center">
						<s:textfield id="questionNum" name="bigquestionInfo.randomQueInfoList[%{#stat.index}].questionNum" onchange="countNumAndScore()" cssClass="span-1"/>
					</td>
					<td class="percent_6 text_center">
						<s:textfield id="questionScore" name="bigquestionInfo.randomQueInfoList[%{#stat.index}].questionScore" onchange="countNumAndScore()" maxlength="3" cssClass="span-1"/>
					</td>
				</tr>
			</s:iterator>
		</s:if>
	</table>
</div>
</div>
</s:if>