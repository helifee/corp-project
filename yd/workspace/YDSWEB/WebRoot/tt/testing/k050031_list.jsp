<%--
 * @(#)k050021_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 试卷一览画面（一览部分JSP）
 * 
 * @author yinfuyan
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 大题一览列表 -->
<div class="span-23 last overflow_hd">
<div class="span-23 last">
	<table class="datagridtt">
		<tr>
			<th class="span-1"></th>
			<th class="span-2"><span>题型</span></th>
	        <th class="span-3"><span>大题标题</span></th>
	        <th class="span-4"><span>大题说明</span></th>
	        <th class="span-2"><span>试题数量</span></th>
	        <th class="span-2"><span>大题总分</span></th>
	        <th class="span-2"><span>答题时间</span></th>
	        <th class="span-3"><span>大题类别</span></th>
	        <th><span>操作</span></th>
	    </tr>
	</table>
</div>
</div>
<div class="span-23 overflow_scr_y last">
<div class="span-23 last">
	<table class="datagridtt ellipsis" id="tableBigQuestionList">
	<tbody>
		<s:if test="paperBigQuestionInfoList.size > 0">
			<s:iterator value="paperBigQuestionInfoList" status="stat">
				<tr>
					<td class="span-1 text_center">
					<input type="radio" name="radio" id="radioSelectRow${stat.index}" value="radio">
					<s:hidden name="bigquestionSerialNo"/>
					<s:hidden name="bigquestionOrder"/>
					</td>
	               	<td class="span-2 text_center"><s:property value="questionKindName"/></td>
	          		<td class="span-3"><s:label title="%{bigquestionTitle}" name="bigquestionTitle"/></td>
	              	<td class="span-4"><s:label title="%{bigquestionDescription}" name="bigquestionDescription"/></td>
	               	<td class="span-2 text_right"><s:property value="questionNum"/></td>
	              	<td class="span-2 text_right" id="bigQuestionTotalScore${stat.index}" ><s:property value="bigquestionTotalScore"/></td>
	               	<td class="span-2 text_right" id="bigQuestionTime${stat.index}" ><s:property value="bigquestionTime"/></td>
	               	<td class="span-3 text_center"><s:property value="bigquestionTypeName"/></td>
	               	<td class="text_center">
	               		<s:if test="testPaperInfo.paperStatus == 1">
	                		<s:a href="#" onclick="editBigQuestion(this)" >试题编辑</s:a>
	                	</s:if>
	                	<s:else>
	                		<label>试题编辑</label>
	                	</s:else>
	                	<s:if test="testPaperInfo.paperStatus == 1">
	                 		<s:a href="#" onclick="removeBigQuestion(this)">删除</s:a>
	                 	</s:if>
	                 	<s:else>
	                 		<label>删除</label>
	                 	</s:else>
					</td>
				</tr>
			</s:iterator>
		</s:if>
		</tbody>
	</table>
</div>
</div>
