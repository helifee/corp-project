<%--
 * @(#)j030011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 教育管理
--%>

<%--
 * 试题新建修改
 * 
 * @author wanqiuhong
 * @version 1.00 2010/04/2
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
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
		
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k040021.js"></script>
		
	<title>试题新建修改</title>
</head>

<body onload="initForm()" style="overflow-x:hidden;overflow-y:auto;">
<div class="container"> 
<s:if test="questionMode == 1||questionMode == 4||questionMode == 7">	   
<s:include value="../manager/head.jsp" />
</s:if>
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:if test="questionMode == 1||questionMode == 4||questionMode == 7">	   
<s:include value="../manager/navigator.jsp" />
</s:if>
<div class="container showgrid">

		<s:form id="questionInfoForm" method="post" validate ="true" enctype="multipart/form-data"  >
			<div class="container showgrid">
	            <div class="span-24">
	       			<!-- title -->
	            	<div class="span-24 padding_top_8 title_tt">
						<h2>试题新建修改</h2>
					</div>	
					<!--画面模式-->
	               	<s:hidden id="questionMode" name="questionMode" />
					<s:hidden id="paperId" name="paperId" />
	               	<!--试题版本号-->
	               	<s:hidden id="questionVersionNo" name="questionInfo.questionVersionNo" />	
	               	<!--核对状态-->
	               	<s:hidden id="checkFlg" name="questionInfo.checkFlg" />

					<!--试题ID-->
					<div class="span-24">
						<div class="span-2 text_right"><s:label value="试题ID：" /></div>
						<div class="span-2 text_left">
							<s:label id="questionInfo.questionId" name="questionInfo.questionId" keep="1"/>
						</div>
						<!--参照试题ID-->
						<s:if test="questionInfo.refQuestionId != '' && questionInfo.refQuestionId != null">
						<div class="span-2 text_right"><s:label value="参照试题ID：" /></div>
						<div class="span-2 text_left">
							<s:label id="questionInfo.refQuestionId" name="questionInfo.refQuestionId" keep="1"/>
						</div>
						</s:if>
					</div>
					<div class="clear_both"></div>
					
					<!--分类-->
					<div class="span-24">
						<div class="span-2 text_right"><s:label value="分类：" /></div>
						<div class="span-21 last">
	                       <div class="span-3"><select id="sltCategory1" name="category1Id" type="category1Id" Class="span-3"  defaultValue="${category1}" accesskey="${category1Flag}"></select></div>
	                       <div class="span-3"><select id="sltCategory2" name="category2Id" type="category2Id" Class="span-3"  defaultValue="${category2}" accesskey="${category2Flag}"></select></div>
	                       <div class="span-3"><select id="sltCategory3" name="category3Id" type="category3Id" Class="span-3"  defaultValue="${category3}" accesskey="${category3Flag}"></select></div>
		                </div>
					</div>
					<div class="clear_both"></div>
					<!--试题类型-->
					<div class="span-24">
						<div class="span-2 text_right"><s:label value="试题类型：" /></div>
						<div class="span-5 text_left">
							<s:if test="questionMode == 2 || questionMode == 3 || questionMode == 5 || questionMode == 6">
								<s:select id="questionTypeList"  list="questionTypeList" name="questionInfo.questionType" cssClass="span-2"
								listKey="diffNo" listValue="diffName" disabled="true"/>
							</s:if>
							<s:else>
								<s:select id="questionTypeList"  list="questionTypeList" name="questionInfo.questionType" cssClass="span-2" disabled="true"
								listKey="diffNo" listValue="diffName"/>
							</s:else>
						</div>

					</div>
					<!--试题题型-->
					<div class="span-24">
						<div class="span-2 text_right"><s:label value="试题题型：" /></div>
						<div class="span-5 text_left">
							<s:if test="questionMode == 2 || questionMode == 3 || questionMode == 5 || questionMode == 6">
								<s:select id="questionKindList"  list="questionKindList" name="questionInfo.questionKind" cssClass="span-2"
								listKey="diffNo" listValue="diffName" disabled="true"/>
							</s:if>
							<s:else>
								<s:select id="questionKindList"  list="questionKindList" name="questionInfo.questionKind" cssClass="span-2"
								listKey="diffNo" listValue="diffName" onchange="deleteAnswerArea()"/>
							</s:else>
						</div>

					</div>
					<div class="clear_both"></div>
					<div class="span-24">					
						<!--难度-->
						<div class="span-2 text_right"><s:label value="难度：" /></div>
						<div class="span-5 text_left">
							<s:select id="questionDifficultyList"  list="questionDifficultyList" name="questionInfo.questionDifficulty" cssClass="span-2"
							listKey="diffNo" listValue="diffName" />
						</div>
						

					</div>
					<div class="clear_both"></div>
					
					<div class="span-24">
						<!--试题来源-->
						<div class="span-2 text_right"><s:label value="试题来源：" /></div>
						<div class="span-5 text_left">
							<s:textfield id="questionSource" name="questionInfo.questionSource" cssClass="span-5" maxlength = "200" />
						</div>
						
						<!--关键字-->
						<div class="span-3 text_right"><s:label value="关键字：" /></div>
						<div class="span-8 text_left">
							<s:textfield id="keyword"  name="questionInfo.keyword" cssClass="span-5" />
							<!-- <input type="button" id="btnChoose" value="选择" onclick="chooseKey()" class="btn span-2"/> -->
						</div>
					</div>
					<div class="clear_both"></div>
					
					<div class="span-24">
						<!--试题内容-->
						<div class="span-2 text_right"><s:label value="试题内容：" /></div>
						<div class="span-21 text_left">
							<s:textarea id="editor" name="questionInfo.questionContent" ></s:textarea>
						</div>
					</div>
					<div class="clear_both"></div>
					 
					<div class="span-24">
						<!--答案编辑-->
						<div class="span-2 text_right"><s:label value="答案编辑：" /></div>						
					</div>
					<div class="clear_both"></div>
					
	                <!-- include:答案内容编辑JSP -->
					<s:include value="../testing/k040021_answerlist.jsp" />
					<!-- include:答案设置模板JSP -->
					<s:include value="../testing/k040021_answermode.jsp" /> 
					<!-- include:答案内容设置JSP -->
					<s:include value="../testing/k040021_answerset.jsp" />     
					<%--
						<div class="span-24 margin_top_4">
						
							<!--备注-->
							<div class="span-2 text_right"><s:label value="备注：" />
							</div>
							<div class="span-21 text_left">
								<s:textarea cssClass="span-21" id="questionComment" name="questionInfo.questionComment" rows="4" />
		                    </div>
						</div> 
					--%>
					<!--立即核对-->
					 <s:if test="reviewShow == true ">
						<div class="span-24 text_center">
							<s:checkbox name="reviewFlag" fieldValue="true" id="reviewFlag" /><s:label value="立即核对试题" />
						</div>
					</s:if>
					<s:if test="reviewShow == false ">
						<div class="span-24 text_center none">
							<s:checkbox name="reviewFlag" fieldValue="true" id="reviewFlag" /><s:label value="立即核对试题" />
						</div>
					</s:if>
					<s:hidden id="reviewShow" name="reviewShow" />
					<!--按钮-->
					<div class="span-24 text_center">
					<%--
						<s:if test="questionMode == 1 ">
							<input type="button" id="btnOk" name="btnOk" value="保存并新建" onclick="submitAndNew()" class="btn span-2"/>
						</s:if>
					--%>					
							<input type="button" id="btnChoose" value="确定" onclick="submitQuestionInfo()" class="btn span-2"/>
					</div>
				</div>
				<div class="clear_both"></div>
			</div>
			<s:hidden id="questionIdList" name="questionIdList"></s:hidden>
			<div id="errorMessage" class="prepend-2">
				<s:fielderror></s:fielderror>
			</div>
		</s:form>

	<div class="clear_both"></div>
</div>
</div>
</div>
<s:if test="questionMode == 1||questionMode == 4||questionMode == 7">	   
<s:include value="../manager/foot.jsp" />
</s:if>
</div>
</body>
</html>
