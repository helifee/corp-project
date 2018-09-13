<%--
 * @(#)k040031.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试子系统
--%>
<%--
 * 试题批量修改
 * 
 * @author chenjunshuai
 * @version 1.00 2010/05/13
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k040031.js"></script>	
	<title>试题批量修改</title>
</head>
<body  onload="initForm()">
<div class="container">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
		<div class="tt_module padding_bottom_4 overflow_hd">
			<s:include value="../manager/navigator.jsp" />
			<div id="msg" class="span-24">
				<div  class="span-24 padding_top_8 title_tt"><h2>试题批量修改</h2></div>
				<s:form id="k040031Form" action="k040031UpdateTestQuestions" method="post" validate="true">
				<div class="span-15 margin_top_6 prepend-6">
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="questionTypeCkb" name="questionTypeCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="试题类型:"/>
						</div>
						<s:textfield id="questionType" cssClass="span-3" value="练习" disabled="true"/>
					</div>
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="categoryIdCkb" name="categoryIdCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="分类:"/>
						</div>
						<select class="span-3" id="sltCategory1" type="category1Id" name="category1Id" onchange ="selectCategory1Id()"></select>
						<select class="span-3" id="sltCategory2" type="category2Id" name="category2Id"></select>
						<select class="span-3" id="sltCategory3" type="category3Id" name="category3Id"></select>
					</div>
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="keywordCkb" name="keywordCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="关键字:"/>
						</div>
						<s:textfield id="keyword1"/>
						<input type="button" value="选择" class="span-2 btn" onclick="refKeyword()"/>
					</div>	
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="questionDifficultyCkb" name="questionDifficultyCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="试题难度:"/>
						</div>
						<s:select id="questionDifficulty" name="questionDifficulty" list="questionDifficultyNameList"
							listKey="%{diffNo}" listValue="%{diffName}" cssClass="span-3"/>
					</div>
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="questionSourceCkb" name="questionSourceCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="试题来源:"/>
						</div>
						<s:textfield id="questionSource" cssClass="span-6" maxlength="200"/>
					</div>
					<div class="span-15 margin_top_6">
						<div class="span-1">
							<s:checkbox id="questionScoreCkb" name="questionScoreCkb"/>
						</div>
						<div class="span-2 text_right">
							<s:label value="试题分数:"/>
						</div>
						<s:textfield id="questionScore" name="questionScore" cssClass="span-3"/>
						<s:label value="分"/>
					</div>																							
				</div>
				
				<div class="span-24 margin_top_6">
					<!-- <div class="span-10 prepend-10">
						<div class="span-1">
							<s:checkbox id="checkTestQuestion" name="checkTestQuestion" value="1"/>
						</div>
						<s:label value="立即核对试题"/>
					</div> -->
					<div class="span-10 prepend-11">
						<input type="button" value="修改" class="span-2 btn" onclick="modifyTestQuestions()">
					</div>
				</div>
				
				<div class="span-23 prepend-h margin_top_6">
				 	<table id="questionLibraryListTable" class="datagridtt span-23 ellipsis">
				 		<tr>
				 			<th class="percent_4"><s:checkbox id="ckAll" name="ckAll" onclick="selectAll()" value="1"  /></th>
				 			<th class="percent_8"> 试题ID</th>
				 			<th class="percent_8">试题类型</th>
				 			<th class="percent_12">分类</th>
				 			<th class="percent_8">关键字</th>
				 			<th class="percent_12">试题题型</th>
				 			<th class="percent_8">试题难度</th>
				 			<th class="percent_8">试题分数</th>
				 			<th class="percent_12">试题来源</th>
				 			<th class="percent_20">试题内容</th>
				 		</tr>
				 		<s:if test="questionLibraryInfoList.size > 0">
							<s:iterator value="questionLibraryInfoList" status="stat">
								<tr>
									<td class="text_center">
										<s:checkbox id="ck%{#stat.index}" name="ck%{#stat.index}" value="1" />
									</td>
									<td id="questionId${stat.index}" class="text_center">
										<s:a href="#" onclick="window.open('k040051InitQuesViewAndCheckMode.action?question=%{questionId}')"><s:property value="questionId"/></s:a>
										
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionId" name="questionLibraryInfoList[%{#stat.index}].questionId"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionTypeName" name="questionLibraryInfoList[%{#stat.index}].questionTypeName"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].categoryName" name="questionLibraryInfoList[%{#stat.index}].categoryName"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].keyword" name="questionLibraryInfoList[%{#stat.index}].keyword"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionDifficultyName" name="questionLibraryInfoList[%{#stat.index}].questionDifficultyName"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionKindName" name="questionLibraryInfoList[%{#stat.index}].questionKindName"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionScore" name="questionLibraryInfoList[%{#stat.index}].questionScore"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].questionSource" name="questionLibraryInfoList[%{#stat.index}].questionSource"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].pictureFlg" name="questionLibraryInfoList[%{#stat.index}].pictureFlg"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].mediaFlg" name="questionLibraryInfoList[%{#stat.index}].mediaFlg"/>
										<s:hidden id="questionLibraryInfoList[%{#stat.index}].attachFlg" name="questionLibraryInfoList[%{#stat.index}].attachFlg"/>
									</td>
									<td class="text_center">
										<s:property value="questionTypeName"/>
										<s:date id="updtTimeFormat%{#stat.index}" name="updateTime" format="yyyy-MM-dd HH:mm:ss"/>
										<s:hidden id="updtTime%{#stat.index}" name="updtTimeFormat%{#stat.index}"/>
									</td>
									<td>
										<s:label name="categoryName" title="%{categoryName}"/>
									</td>
									<td>
										<s:label name="keyword" title="%{keyword}"/>
									</td>																														
									<td class="text_center">
										<s:property value="questionKindName"/>
									</td>
									<td class="text_center">
										<s:property value="questionDifficultyName"/>
									</td>
									<td class="text_right">
										<s:property value="questionScore"/>分
									</td>
									<td>
										<s:label name="questionSource" title="%{questionSource}"/>
									</td>
									<td>
										<div id="rtfContent${stat.index}" class="none">${questionContent}</div>
										<s:label id="content%{#stat.index}" name="questionContent"/>
									</td>
								</tr>
							</s:iterator>
						</s:if>
				 	</table>
				 	<div class="span-23 text_center last ">	 
					 	总计:<s:property value="%{questionLibraryInfoList.size}"/>件&nbsp;
					</div>	
				 	
					
				</div>
				<div class="span-23 prepend-h margin_top_6">
					<s:fielderror></s:fielderror>
				</div>					
				</s:form>	
				<div class="clear_both"></div>
			</div>
		</div>
	</div>
<s:include value="../manager/foot.jsp" />　
</div>
</body>
</html>