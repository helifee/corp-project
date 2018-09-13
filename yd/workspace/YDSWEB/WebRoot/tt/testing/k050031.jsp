<%--
 * @(#)k050031.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 试卷编辑画面（主页面JSP）
 * 
 * @author yinfuyan
 * @version 1.00 2010/04/06
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
	<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/ttTesting/k050031.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>
	
	<title>试卷编辑</title>
</head>

<body onload="initPage()" onunload="closeAllSubwin()">
<div class="container">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />
	<div class="container showgrid">
		<!--画面标题-->
		<div class="span-24 padding_top_8 title_tt">
          	<h2>试卷编辑</h2>
		</div>
	<s:form id="paperInfoForm" action="k050031SubmitPaperForApproval" method="post"  validate="true">
	<div class="span-23 prepend-h">
		<div class="span-23 ">
			<!--试卷状态-->
			<div class="span-2 text_right">
				<s:label id="paperStatus" value="状态："/>
			</div>
			<div class="span-10 text_left">
				<s:label id="testPaperInfo.paperStatusName" name="testPaperInfo.paperStatusName"/>
			</div>
		</div>
		<div class="span-23 ">
			<!--试卷ID-->
			<div class="span-2 text_right">
				<s:label id="paperId" value="试卷ID："/>
			</div>
			<div class="span-10 text_left">
				<s:label id="testPaperInfo.paperId" name="testPaperInfo.paperId"/>
			</div>
		</div>

		<div class="span-23 ">
			<!--试卷标题-->
			<div class="span-2 text_right">
				<s:label id="paperTitle" value="试卷标题："/>
			</div>
			<div class="span-10 text_left">
				<s:textfield id="testPaperInfo.paperTitle" name="testPaperInfo.paperTitle" maxlength="50" cssClass="span-9"/>
			</div>
		</div>
		<div class="span-23 ">
			<!--试卷说明-->
			<div class="span-2 text_right">
				<s:label id="paperComment" value="试卷说明："/>
			</div>
			<div class="span-10 text_left">
				<s:textarea cssClass="span-9 " rows="2" maxlength="200" id="testPaperInfo.paperComment" name="testPaperInfo.paperComment"/>
			</div>
		</div>
		<div class="span-23 ">
			<!--试卷概要-->
			<div class="span-2 text_right">
				<s:label id="paperDescription" value="试卷概要："/>
			</div>
			<div class="span-10 text_left">
				<s:textarea cssClass="span-9 " title="输入考试相关的注意事项" rows="2" maxlength="200" id="txtPaperDescription" name="testPaperInfo.paperDescription"/>
			</div>
		</div>
		<div class="span-23 ">
			<!--试卷类型-->
        	<div class="span-2 text_right">
        	<s:label id="paperType" value="试卷类型："/>
        	</div>
            <div class="span-5 text_left">
				<s:label id="testPaperInfo.paperTypeName" name="testPaperInfo.paperTypeName"/>
			</div>
		</div>
		<div class="span-23 ">
			<!--试卷分类-->
			<div class="span-2 text_right">
				<s:label id="paperCategory" value="试卷分类："/>
			</div>
			<div class="span-10 text_left">
				<s:label id="testPaperInfo.categoryName" name="testPaperInfo.categoryName"/>
			</div>
		</div>
		<div class="span-23 ">
            <div class="span-2 text_right">
 				<s:label id="paperTotalScore" value="试卷总分："/>
            </div>
            <div class="span-1 text_left">
				<s:label id="testPaperInfo.paperTotalScore" name="testPaperInfo.paperTotalScore" keep="1"/>
		 	</div>
		 	<div class="span-1 text_left">
				<s:label id="points" value="分"/>
			</div>
		</div>
		<div class="span-23 ">
            <div class="span-2 text_right">
            	<s:label id="paperTime" value="答题时间："/>
            </div>
            <div class="span-2 text_left">
            	<s:textfield id="testPaperInfo.paperTime" name="testPaperInfo.paperTime" maxlength="4" cssClass="span-1"/>
           		<s:label id="minutes" value="分钟"/> 
 			</div>
		</div>
		
		<div class="span-9 margin_top_6">
			<input type="button" class="btn span-2" id="btnAddBigQuestion" name="search" value="添加大题" onclick="addBigquestion();">
			<input type="button" class="btn span-2" id="btnMoveUp" name="search" value="上移" onclick="moveRowUp();">
			<input type="button" class="btn span-2" id="btnMoveDown" name="search" value="下移" onclick="moveRowDown();">
		</div>

		<!-- 画面模式 -->
        <s:hidden id="hidModeKbn" name="modeKbn" />
        <!-- 试卷ID -->
        <s:hidden id="hidPaperId" name="testPaperInfo.paperId" />
        <!-- 试卷版本号 -->
        <s:hidden id="hidPaperVersionNo" name="testPaperInfo.paperVersionNo" />
        <!-- 试卷状态 -->
        <s:hidden id="hidPaperStatus" name="testPaperInfo.paperStatus" />
	</div>
		<div id="divBigquestionList" class="span-23 margin_top_6 prepend-h">
			<s:include value="k050031_list.jsp" />
		</div>
		<s:if test="modeKbn==1&&testPaperInfo.paperStatus==4">
		<div id="divRefuseReason" class="span-23 margin_top_6 prepend-h">
			<!--不批准理由-->
			<div class="span-3 text_right">
				<s:label id="refuseReason" value="不批准理由："/>
			</div>
			<div class="span-18 text_left">
				<s:textarea id="testPaperInfo.refuseReason" cssClass="span-12" rows="3" readonly="true" name="testPaperInfo.refuseReason"/>
			</div>
		</div>
		</s:if>
	</s:form>
	
	<!--弹出div层-->
<div class="bgclr_fff span-12 none" id="divSetBigquestion">
	<s:form id="newBigquestionForm" action="k050031AddBigquestion" method="post"  validate="true">
       	<div class="span-12">
        	<div class="span-3 text_right">
        		<s:label id="bigQuestionType" value="大题类别："/>
        	</div>
            <div class="span-3">
            <!--wanqiuhong 10/10 追加：大题类别与题型联动-->
            	<s:select id="sltBigQuestionType" cssClass="span-2" list="bigQuestionTypeList" name="bigQuestionTypeList" listKey="diffNo" listValue="diffName" onChange="changeQTypeQKind(this.value);"/>
        	</div>
       	</div>
        <div class="span-12">
        	<div class="span-3 text_right">
        		<s:label id="questionKind" value="题型："/>
        	</div>
        	<div class="span-3">
           		<s:select id="sltQuestionKind" cssClass="span-2" list="questionKindList" name="questionKindList" listKey="diffNo" listValue="diffName"/>
           	</div>
       	</div>
       	<div class="span-12">
        	<div class="span-3 text_right">
        		<s:label id="bigQuestionTime" value="大题答题时间："/>
        	</div>
            <div class="span-8">
            	<s:textfield id="txtBigQuestionTime" name="bigquestionTime" maxlength="3" cssClass="span-1"/>
            	<s:label id="paperTitle" value="分钟"/>
            	<s:label id="paperTitle" value="(限定的时间将在考试开始时累计计算)" cssClass="color_red"/>
        	</div>
       	</div>
       	<div class="span-12">
        	<div class="span-3 text_right">
        		<s:label id="bigQuestionTitle" value="大题标题："/>
        	</div>
            <div class="span-3">
            	<s:textfield id="txtBigQuestionTitle" name="bigquestionTitle" maxlength="50" cssClass="span-8"/>
        	</div>
       	</div>
      	<div class="span-12">
        	<div class="span-3 text_right">
        		<s:label id="bigComment" value="大题说明："/>
        	</div>
            <div class="span-8">
            	<s:textarea cssClass="span-8 " rows="4" maxlength="200" id="txtBigQuestionDescription" name="bigquestionDescription"/>
        	</div>
       	</div>

   		<div class="span-12 text_center margin_top_6">
 	        <input type="button" class="btn span-2" id="btnAccept" name="btnAccept" value="确定" onclick="saveBigquestion();" >
			<input type="button" class="btn span-2" id="btnCancel" name="btnCancel" value="取消" onclick="cancel();" >
       	</div>
	</s:form>
</div>

		<div class="span-23 text_center margin_top_6 prepend-h">
			<!--试卷预览按钮-->
			<input type="button" class="btn span-2" id="btnPaperReview" name="btnPaperReview" value="试卷预览" onclick="paperReview();" >
			<s:if test="modeKbn==1&&testPaperInfo.paperStatus!=1">		 	
			<!--再编辑按钮-->
			<input type="button" class="btn span-2" id="btnReedit" name="btnReedit" value="再编辑" onclick="reeditPaper();" >
			</s:if>	
			<!--保存按钮-->
			<input type="button" class="btn span-2" id="btnSave" name="btnSave" value="保存" onclick="savePaperInfo();" >
			
			<s:if test="modeKbn==1&&testPaperInfo.paperStatus==1">		 	
			<!--提交审批按钮-->
			<input type="button" class="btn span-2" id="btnSubmitForApproval" name="btnSubmitForApproval" value="提交审批" onclick="submitForApproval();" >
			</s:if>	
		</div>
		<div class="clear_both"></div>
	</div>
	</div>
  	</div>
	<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>