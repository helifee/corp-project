<%--
 * @(#)k040041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试子系统
 --%>

<%--
 * 试题批量录入
 * 
 * @author yukunpeng
 * @version 1.00 2010/05/05
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
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k040041.js"></script>

	<title>试题批量录入</title>

</head>
<body onload="initForm()">
	<div class="container showgrid">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
		<s:form id="questionCreateAllForm" method="post" validate="true" >
		    <div class="span-24">
					<div class="padding_top_8 title_tt span-24">
						<h2>试题批量录入</h2>
					</div>
			 		<!-- 分类 -->
	                <div class="span-24 margin_top_6">
						<div class="span-2 text_right"><s:label value="分类：" /></div>
						<!--分类-->
						<div class="span-10 ">
		                       <div class="span-3"><select id="sltCategory1" name="questionInfo.category1Id" type="category1Id" Class="span-3"  defaultValue="${category1}" accesskey="${category1Flag}"></select></div>
		                       <div class="span-3"><select id="sltCategory2" name="questionInfo.category2Id" type="category2Id" Class="span-3"  defaultValue="${category2}" accesskey="${category2Flag}"></select></div>
		                       <div class="span-3"><select id="sltCategory3" name="questionInfo.category3Id" type="category3Id" Class="span-3"  defaultValue="${category3}" accesskey="${category3Flag}"></select></div>
		                </div>
						<div class="span-2 text_right"><s:label value="试题来源：" /></div>
						<!--来源-->
						<div class="span-8 last">
							<s:textfield id="questionSource" name="questionInfo.questionSource" maxlength="200" cssClass="span-5"  />
						</div>
					</div>
					<div class="span-24 margin_top_6">
						<!--关键字-->
						<div class="span-2 text_right">
							<s:label value="关键字：" />
						</div>
						<div class="span-8 text_left">
							<s:textfield id="keyWord"  name="questionInfo.keyword" maxlength="200" cssClass="span-5" />
							<input type="button" id="btnChoose" value="选择" onclick="chooseKey()" class="btn span-2"/>
						</div>
						<!--试题类型-->
						<div class="span-2 text_right"><s:label value="试题类型：" /></div>
						<div class="span-4 text_left">
							<s:select id="questionTypeList"  list="questionTypeList" name="questionInfo.questionType"
							listKey="diffNo" listValue="diffName" />
						</div>
						
						<!--难度-->
						<div class="span-2 text_right"><s:label value="难度：" /></div>
						<div class="span-4 text_left last">
							<s:select id="questionDifficultyList"  list="questionDifficultyList" name="questionInfo.questionDifficulty"
							listKey="diffNo" listValue="diffName" />
						</div>
						
					</div>
					<div class="span-24 margin_top_6">	
					    <div class="span-2 text_right"><s:label value="试题题型：" /></div>
		                <div class="span-3">
		                <select id="questionKindList" name="questionInfo.questionKind" onchange="patterControl(this)" ></select>&nbsp;
		                </div>
	                    <!--选项数 & 选项类型-->
	                    <div id="setDive1" class="span-13">
	                        <div class="span-2 text_right"><s:label value="选项数：" /></div>
	                        <div class="span-2">
	                            <select id="optionNumber" name="answerInfo.optionNumber">
	                                <option id ="optionNumber_0" value="4">4个</option>
	                                <option id ="optionNumber_1" value="5">5个</option>
	                                <option id ="optionNumber_2" value="6">6个</option>
	                                <option id ="optionNumber_3" value="7">7个</option>
	                                <option id ="optionNumber_4" value="8">8个</option>
	                                <option id ="optionNumber_5" value="9">9个</option>
	                                <option id ="optionNumber_6" value="10">10个</option>
	                            </select>&nbsp;
	                        </div>
	                        <div class="span-3 text_right"><s:label value="选项类型：" /></div>
	           	            <div class="span-5">
		                		<select id="optionTypeList" name="answerInfo.optionType"></select>&nbsp;
							</div>   
	                    </div>
						<div class="span-2 text_right"><s:label value="分数："/></div>
						<!--试题分数：-->
						<div class="span-4 last">
							<div class="span-1"><input id="answerScore" name="answerInfo.answerScore" maxlength="2" type="text"  class="span-1"/></div>
							<div class="span-2"><s:label value="分" /></div> 
						</div>
					</div>
					<div class="clear_both"></div>
					
					<div class="span-24 margin_top_6">
						<div class="span-2 text_right"><s:label value="试题内容：" /></div>
						<div class="prepend-2 color_green"><s:label value="不同题之间以空行隔开,同一题内不能有空行" /></div>
					</div>
					<!--试题内容-->
					<div class="prepend-2 span-22">
						<s:textarea id="editor" name="questionInfo.questionContent" ></s:textarea>
					</div>
					<div class="clear_both"></div>
					
					<div class="span-24 margin_top_6">
						<div class="span-2 text_right"><s:label value="试题答案：" /></div>
						<div class="prepend-2 color_green"/>
							<s:label value="不同试题的答案以空行隔开，空行不要带空格。"/> <br/> 
							<s:label value="选择题答案用答案对应的选项数字表示，例如如果正确答案是第三个选项，则在答案内容中输入“3”。多选题答案用逗号隔开。"/><br/>
							<s:label value="判断题用“0”表示正确，“1”表示错误。"/><br/>
						 	<s:label value="同一道填空题题有多个空时，每个空的答案另起一行输入，最多10个空，每个空最多输入10字。"/>
						 	<s:a href="k040041_example.jsp" target="_blank">点击查看详细示例</s:a>
						</div>
					</div>
					<div class="clear_both"></div>
					<div class="prepend-2 span-21">
						<s:textarea id="answers" rows="20" name="answerInfo.answerContent" cssClass="span-21"></s:textarea>
					</div>
					<div class="clear_both"></div>
					
					<div class="span-24 margin_top_6">
						<div class="span-12 text_right">
							<s:checkbox name="reviewFlag" fieldValue="true" id="reviewFlag" />
						</div>
						<div class="span-10 text_left last"><s:label value="立即核对"/></div>
					</div>
					<div class="clear_both"></div>
					<div class="span-24 margin_top_6 text_center">
						<input type="button" class="btn span-2" value="确定" onclick="confirmBtn()"/>
					</div>
					<div class="clear_both"></div>
				</div>
				<div class="clear_both"></div>
				<div class="span-23 prepend-h margin_top_6 margin_bottom_10 err text_left">
					<s:actionerror/>
	            </div>
		</s:form>
	</div>
	</div>
		<s:include value="../manager/foot.jsp" />
	</div>
</body>
</html>