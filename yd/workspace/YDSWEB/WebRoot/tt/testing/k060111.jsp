<%--
 * @(#)k060111.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 评分任务分配
 * 
 * @author qiliqiang
 * @version 1.00 2010/04/22
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060111.js"></script>
	
	<title>评分任务分配</title>
</head>

<body onload="initForm()">
<div class="container showgrid">
	<s:include value="../manager/head.jsp" />　
		<div class="span-24 margin_top_2">
		<div class="tt_module padding_bottom_4 overflow_hd">
	
	<s:include value="../manager/navigator.jsp" />
	<div class="span-24 title_tt">
		<h2>评分任务分配</h2>
	</div>
	<div class="span-24">
	    <div class="span-4 text_right">
	    	<s:label value="考试名称："/>
	    </div>
	    <div class="last text_left">
	    	<s:property value="examineInfo.examineId" />
	    	<s:hidden id="examineId" name="examineId"/>
	    	<s:property value="examineInfo.examineName" />
	    </div>
	</div>
	<div class="span-24">
	    <div class="span-4 text_right">
	    	<s:label value="考试说明："/>
	    </div>
	    <div class="last text_left">
	    	<s:property value="examineInfo.examineComment" />
	    </div>
	</div>
	<div class="span-24">
	    <div class="span-4 text_right">
	    	<s:label value="考试时间："/>
	    </div>
	    <div class="text_left last">
			<s:date name="examineInfo.examineStartDate" id="examineStartDateFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{examineStartDateFormat}" />
			～
			<s:date name="examineInfo.examineEndDate" id="examineEndDateFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{examineEndDateFormat}" />
	    </div>
	</div>
	<div class="span-24">
	    <div class="span-4 text_right">
	    	<s:label value="考试分类："/>
	    </div>
	    <div class="last text_left">
	    	<s:property value="examineInfo.categoryName" />
	    </div>
	</div>
	<div class="span-24 text_center margin_top_6">
		<s:hidden id="assignModeAbled" name="k060111AssignInfo.assignModeAbled"/>
		<s:hidden id="assignFirst" name="k060111AssignInfo.assignFirst" />
		<div class="span-4 text_right">
			<s:label value="分配方式："/>
		</div>
		<div class="span-4 text_left" >
			<s:select id="selAssignMode"
				name="k060111AssignInfo.assignMode" list="assignModeList"
				listKey="diffNo" listValue="diffName" onclick = "assignCheck()">
			</s:select>
		</div>
	</div>
	<div id="div_paper" class="span-24 margin_top_6">
		<div class="span-24">
	    	<div class="span-4 text_right"><s:label value="任务总量："/></div>
	    	<div class="span-2 text_left"><s:property value="taskSumNum" /></div>
	    	<div class="span-4 text_right"><s:label value="剩余任务总量："/></div>
	    	<div id="remainPaperNumDiv" class="span-1 text_left">
	    	<s:label id="remainPaperNum" value="%{remainTaskNum}"></s:label></div>
		</div>
		<div class="span-24 margin_top_6">
	    	<div class="span-4 text_right">
	    		<s:label value="按评分者任务一览："/>
	    	</div>
		</div>
		<div class="prepend-2 span-12">
			<div class="span-7">
			<table class="datagridtt">
				<tr>
					<th class="span-2">评分者</th>
					<th class="span-3">评分任务量（试卷数）</th>
				</tr>
			</table>
			</div>
		</div>
		<div class="prepend-2 span-12 overflow_scr_y h_100">
			<div class="span-7">
				<table id="tb_PaperNumList" class="datagridtt">
					<tr id="cloneline_PaperTaskList" class="none">
						<td class="span-2 text_center" ></td>
						<td class="span-3 text_right"></td>
					</tr>
				<s:if test="taskInfos.size() > 0">
					<s:iterator value="taskInfos">
					<tr>
						<td class="span-2 text_center"><s:property value="markingEmpName" /></td>
						<td class="span-3 text_right"><s:property value="taskNum" /></td>
					</tr>
					</s:iterator>
				</s:if>
				</table>
			</div>
		</div>
		<div class="span-24 margin_top_6">
	    	<div class="span-4 text_right">
	    		<s:label value="按试卷任务一览："/>
	    	</div>
		</div>
		<div class="span-18 last">

		<s:form id="empPaperListForm" action="" method="post" >
		<div class="prepend-2 span-12">
			<table class="datagridtt">
				<tr>
					<th class="span-1">&nbsp;</th>
					<th class="span-2">序号</th>
					<th class="span-4">试卷名称</th>
					<th class="span-2">评分者</th>
					<th class="span-2">完成状态</th>
				</tr>
			</table>
		</div>
		<div class="prepend-2 span-16 overflow_scr_y h_120">
			<div class="span-12">
			<table id="empPaperListTb" class="datagridtt ellipsis">
			<s:if test="paperMarkInfoList.size() > 0">
				<s:iterator value="paperMarkInfoList" status="sta">
					<tr>
						<td class="span-1 text_center"><s:checkbox name="" fieldValue="" id="" /> </td>
						<td class="span-2 text_center"><s:property value="examineeId" /></td>
						<td class="span-4 text_left"><s:label title="%{paperType}" name="paperType" /></td>
						<td class="span-2 text_center"><s:property value="markingEmpName" /></td>
						<td class="span-2 text_center"><s:property value="completeStatus" /></td>
						<s:hidden id="paperMarkerId%{#sta.index}" name="paperMarkInfoList[%{#sta.index}].markingEmpid"></s:hidden>
						<s:hidden id="examineeId%{#sta.index}" name="paperMarkInfoList[%{#sta.index}].examineeId"></s:hidden>
						<s:hidden id="paperId%{#sta.index}" name="paperMarkInfoList[%{#sta.index}].paperId"></s:hidden>
					</tr>
				</s:iterator>
			</s:if>
			</table>
			</div>
		</div>
		</s:form>
		</div>
	</div>
	<div id="div_question" class="span-24 margin_top_6 none">
		<div class="span-24">
	    	<div class="span-4 text_right">
	    		<s:label value="任务总量："/>
	    	</div>
	    	<div class="span-2 text_left">
	    		<s:property value="questionNum" />
	    	</div>
	    	<div class="span-4 text_right">
	    		<s:label value="剩余任务量："/>
	    	</div>
	    	<div id="remainQuestionNumDiv" class="span-1 text_left">
	    		<s:property value="remainQuestionNum" />
	    	</div>
		</div>
		<div class="span-24 margin_top_6">
	    	<div class="span-4 text_right">
	    		<s:label value="按评分者任务一览："/>
	    	</div>
		</div>
		<div class="prepend-2 span-12">
			<div class="span-7">
			<table class="datagridtt">
				<tr>
					<th class="span-2">评分者</th>
					<th class="span-3">评分任务量（大题数）</th>
				</tr>
			</table>
			</div>
		</div>
		
		<div class="prepend-2 span-12 overflow_scr_y h_100">
			<div class="span-5">
			<table id="tb_QuestionNumList" class="datagridtt">
				<tr id="cloneline_QuestionTaskList" class="none">
					<td class="span-2 text_center"></td>
					<td class="span-3 text_right"></td>
				</tr>
			<s:if test="1 > 0">
			<s:iterator value="questionNumInfoList">
				<tr>
					<td id="questionNum${markingEmpid}" class="span-2 text_center"><s:property value="markingEmpName" /></td>
					<td class="span-3 text_right"><s:property value="questionNum" /></td>
				</tr>
			</s:iterator>
			</s:if>
			</table>
			</div>
		</div>
		<div class="span-24 margin_top_6">
	    	<div class="span-4 text_right">
	    		<s:label value="按大题任务一览："/>
	    	</div>
		</div>
		<div class="prepend-2 span-12">
			<table class="datagridtt">
				<tr>
					<th class="span-1">&nbsp;</th>
					<th class="span-2">序号</th>
					<th class="span-4">大题标题</th>
					<th class="span-2">评分者</th>
					<th class="span-2">完成状态</th>
				</tr>
			</table>
		</div>
		<s:form id="empQuestionListForm" action="" method="post" >
		<div id="empQuestionListDiv" class="prepend-2 span-12 overflow_scr_y h_120">
			<div class="span-12">
			<table id="empQuestionListTb" class="datagridtt">
			<s:if test="empMarkInfoList.size() > 0">		
				<s:iterator value="empMarkInfoList" status="sta">
					<tr>
						<td class="span-1 text_center"><s:checkbox name="" fieldValue="" id="" /> </td>
						<td class="span-2 text_center"><s:property value="bigquestionNo" /></td>
						<td class="span-4 text_left"><s:label title="%{bigquestionTitle}" name="bigquestionTitle" /></td>
						<td class="span-2 text_center"><s:property value="examMarkerNM" /></td>
						<td class="span-2 text_center"><s:property value="completeStatus" /></td>	
						<s:hidden id="questionMarkerId%{#sta.index}" name="empMarkInfoList[%{#sta.index}].examMarkerId"></s:hidden>
						<s:hidden id="bigquestionNo%{#sta.index}" name="empMarkInfoList[%{#sta.index}].bigquestionNo"></s:hidden>
					</tr>
				</s:iterator>
			</s:if> 
			</table>
			</div>
		</div>
		</s:form>
	</div>
	<div class="span-24 margin_top_2">
		<div class="prepend-2 span-10 text_left">
			<s:textfield id="singleMarkerId" name="singleMarkerId"  maxlength="6" cssClass="span-2" />
			<s:textfield id="singleMarkerNm" name="singleMarkerNm" cssClass="span-2" />
			<input type="button" value="设定评分者" class="span-2 btn" onclick="setMarker()"/>
		</div>
	</div>
	<div class="span-24">
		<div class="span-9 text_right margin_top_6">
			<input type="button" id="" name="" value="确定" class="span-2 btn" onclick="return submitForm()"/>
		</div>
	</div>
	<div class="clear_both">
	</div>
	</div>
	<s:include value="../manager/foot.jsp" />　
</div>
</div>
</body>
</html>


