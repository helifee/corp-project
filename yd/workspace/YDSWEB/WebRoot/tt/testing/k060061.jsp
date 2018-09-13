<%--
 * @(#)k060061.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试总体设计及生成（主页面）
 * 
 * @author qiliqiang
 * @version 1.00 2010/04/23
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

	<!-- 画面用js -->	
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060061.js"></script>
	
	<title>考试总体设定及生成</title>
</head>

<body onload="initForm()">
<div class="container showgrid">
<input type="hidden" id="basePath" value="<%=basePath%>" />
<s:include value="%{basePath}/tt/manager/head.jsp" />　　
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="%{basePath}/tt/manager/navigator.jsp" />　
<s:form id="examineInfoForm" action="k060061UpdateExamineInfo" method="post" validate="true" >
	<s:hidden id="eventId" name="eventId"/>
	<div class="padding_top_8 title_tt span-24">
		<h2>考试总体设定及生成</h2>
	</div>
	<s:hidden id="operatMode" name="operatMode"/>
	<div class="span-24">
	    <div class="span-3 text_right">
	    	<s:label value="考试ID："/>
	    </div>
	    <div class="span-3">
	    	<s:property value="examineInfo.examineId" />
	    	<s:hidden id="examineId" name="examineInfo.examineId"/>
	    </div>
	</div>
	<div class="span-24">
	    <div class="span-3 text_right">
	    	<s:label value="考试名称："/>
	    </div>
	    <div class="span-5">
	    	<s:textfield maxlength="200" id="examineName" name="examineInfo.examineName" cssClass="span-10"/>
	    </div>
	</div>

	 <div class="span-24">
	 	<div class="span-3 text_right">
	 		<s:label value="考试说明："/>
	 	</div>
	 	<div class="span-10">
	 		<s:textarea id="examineComment" name="examineInfo.examineComment" cssClass="span-10" value="%{examineInfo.examineComment}"/>
	 	</div>
	 </div>
	<div class="span-24">
	    <div class="span-3 text_right">
	    	<s:label value="考试分类："/>
	    	<!-- 一级分类ID -->
            <s:hidden id="category1Id" name="examineInfo.category1Id" />
            <!-- 二级分类ID -->
            <s:hidden id="category2Id" name="examineInfo.category2Id" />
            <!-- 三级分类ID -->
            <s:hidden id="category3Id" name="examineInfo.category3Id" />
	    </div>
	    <div class="span-19 last">
	    	<s:property value="examineInfo.categoryName" />
	    	<s:hidden id="categoryName" name="examineInfo.categoryName"/>
	    </div>
	</div>
	<div class="span-24">
	    <div class="span-3 text_right">
	    	<s:label value="考试时间："/>
	    </div>
	    <div id="examineTimeDiv" class="span-1 text_right">
	    	<s:textfield cssClass="span-1" maxlength="3" id="examineTime" name="examineInfo.examineTime"/>
	    </div>
	    <div class="span-1">
	    	<s:label value="分钟"/>
	    </div>
	 </div>
	 

	 <div class="span-24">
	 	<div class="span-3 text_right">
			<s:checkbox id="checkAnswerFlg" name="ckbCheckAnswerFlg" fieldValue="true"/>
	 	</div>
	 	<div>
	 		<s:label value="允许考生在考试成绩发布后查看标准答案"/>
	 	</div>
	 </div>
	 <div class="span-24">
	 	<div class="span-3 text_right">
			<s:checkbox id="againExamineFlg" name="ckbAgainExamineFlg" fieldValue="true"/>
	 	</div>
	 	<div>
	 		 <s:label value="允许考生在通过考试后继续参加该考试"/>	 		
	 	</div>
	 </div>
	 <div class="span-24">
	 	<div class="span-3 text_right">
			<s:checkbox id="mustExamineFlg" name="ckbMustExamineFlg" fieldValue="true"/>
	 	</div>
	 	<div>
	 		 <s:label value="对象必须参加考试"/>		
	 	</div>
	 </div>
	
	<div class="span-24">
	 	<div class="span-3 text_right">
			<s:checkbox id="ApplyConfirmFlg" name="ckbApplyConfirmFlg" fieldValue="true"/>
	 	</div>
	 	<div>
	 		<s:label value="报名需要批准"/>
	 	</div>
	</div>
	<div class="span-24">
		<div class="span-3 text_right">
			<s:label value="通过考试判定："/>
		</div>
		<div class="span-19">
			<s:radio id="scoreValidFlg" name="examineInfo.scoreValidFlg" list="scoreValidFlgList" listKey="diffNo" listValue="diffName"/>
		</div>
	</div>
	<div class="span-24">
		<div class="span-3 text_right">
			<s:label value="评定等级："/>
		</div>
		<div class="span-2">
	            <s:select id="resultlevelNum" name="examineInfo.resultlevelNum" list="resultlevelNumList" 
						listKey="diffNo" listValue="diffName" cssClass="span-2" value="examineInfo.resultlevelNum" onchange="resultlevelControl()"/>
		</div>		
		<div class="span-3 text_right">
			<s:label value="考试通过档次"/>
		</div>
		<div class="span-2" >
	            <s:select id="passexamineLevel" name="examineInfo.passexamineLevel" list="passexamineLevelList" 
						listKey="diffNo" listValue="diffName" cssClass="span-2" value="examineInfo.passexamineLevel"/>
				<s:select id="passLevelTemplate" name="plt" list="passexamineLevelList" listKey="diffNo" listValue="diffName" cssClass="none"></s:select>
		</div>
	</div>
	<div id="resultlevel1Div" class="span-24 margin_top_6">
		<div class="span-3 text_right">
			<s:label value="档次1："/>
		</div>
		<div class="span-2">
			<s:textfield id="resultlevel1Name" name="examineInfo.resultlevel1Name" cssClass="span-2"   />
		</div>
		<div class="span-1">
			<s:textfield id="resultlevel1Score" maxlength="3" name="examineInfo.resultlevel1Score" cssClass="span-1 text_right padding_right_2" />
		</div>
		<div class="span-2">
			<s:label id="resultlevel1LastLb" value="分以上"/>
		</div>
	</div>
	<div id="resultlevel2Div" class="span-24">
		<div class="span-3 text_right">
			<s:label value="档次2："/>
		</div>
		<div class="span-2">
			<s:textfield id="resultlevel2Name" name="examineInfo.resultlevel2Name" cssClass="span-2"/>
		</div>
		<div class="span-1">
			<s:textfield id="resultlevel2Score" maxlength="3" name="examineInfo.resultlevel2Score" cssClass="span-1 text_right padding_right_2"/>
		</div>
		<div class="span-2">
			<s:label id="resultlevel2LastLb" value="分以上"/>
		</div>
	</div>
	<div id="resultlevel3Div" class="span-24">
		<div class="span-3 text_right">
			<s:label value="档次3："/>
		</div>
		<div class="span-2">
			<s:textfield id="resultlevel3Name" name="examineInfo.resultlevel3Name" cssClass="span-2"/>
		</div>
		<div class="span-1">
			<s:textfield id="resultlevel3Score" maxlength="3" name="examineInfo.resultlevel3Score" cssClass="span-1 text_right padding_right_2"/>
		</div>
		<div class="span-2">
			<s:label id="resultlevel3LastLb" value="分以上"/>
		</div>
	</div>
	<div id="resultlevel4Div" class="span-24">
		<div class="span-3 text_right">
			<s:label value="档次4："/>
		</div>
		<div class="span-2">
			<s:textfield id="resultlevel4Name" name="examineInfo.resultlevel4Name" cssClass="span-2"/>
		</div>
		<div class="span-1">
			<s:textfield id="resultlevel4Score"  maxlength="3" name="examineInfo.resultlevel4Score" cssClass="span-1 text_right padding_right_2"/>
		</div>
		<div class="span-2">
			<s:label id="resultlevel4LastLb" value="分以上"/>
		</div>
	</div>
	<div id="resultlevel5Div" class="span-24">
		<div class="span-3 text_right">
			<s:label value="档次5："/>
		</div>
		<div class="span-2">
			<s:textfield id="resultlevel5Name" name="examineInfo.resultlevel5Name" cssClass="span-2"/>
		</div>
		<div class="span-1">
			<s:textfield id="resultlevel5Score" maxlength="3" name="examineInfo.resultlevel5Score" cssClass="span-1 text_right padding_right_2"/>
		</div>
		<div class="span-2">
			<s:label id="resultlevel5LastLb" value="分以下"/>
		</div>
	</div>
	


		<div class="span-24 margin_top_6">
		<div class="span-9">
			<div class="span-8 prepend-1 font_weight_b last">
				<s:label value="需要通过的考试："/>	
			</div>
			<div id="div_mustexamine_list" class="span-7 prepend-2">
				<s:include value="k060061_mustpassexam_list.jsp"></s:include>
			</div>
		</div>
		<div class="span-2 text_center margin_top_20">
			<div class="span-2 margin_top_20">
				<input id="addExamineBtn" type="button" class="span-2 btn" value="添加考试" onclick="addExamine()"/>
			</div>
			<div class="span-2 margin_top_10">
				<input id="removeExamineBtn" type="button" class="span-2 btn" value="移除考试" onclick="removeExamine()"/>
			</div>
			<div class="span-2 margin_top_10">
				<input id="lookExamineBtn" type="button" class="span-2 btn" value="考试查看" onclick="viewExamine()"/>
			</div>
		</div>
		<div class="span-9">
			<div class="span-8 prepend-1 font_weight_b last">
				<s:label value="需要学习的课程："/>			
			</div>
			<div id="div_mustcourse_list" class="span-7 prepend-2">
				<s:include value="k060061_mustpasscourse_list.jsp"></s:include>
			</div>
		</div>
		<div class="span-2 text_center margin_top_20">
			<div class="span-2 margin_top_20">
				<input id="addCourseBtn" type="button" class="span-2 btn" value="添加课程" onclick="addCourse()"/>
			</div>
			<div class="span-2 margin_top_10">
				<input id="removeCourseBtn" type="button" class="span-2 btn" value="移除课程" onclick="removeCourse()"/>
			</div>
			<div class="span-2 margin_top_10">
				<input id="lookCourseBtn" type="button" class="span-2 btn" value="课程查看" onclick="viewCourse()"/>
			</div>
		</div>
	</div>
	
	 <div class="span-24 margin_top_6">
	 	<div class="span-8 prepend-1 font_weight_b">
	 		所选试卷一览:
	 	</div>
	 </div>
	 <div class="span-24 ">
	 	<div class="span-5 text_left prepend-1">
	 		<input type="button" id="createPaperBtn" value="新建试卷" class="span-2 btn" onClick="createPaper()"/>
	 		<input type="button" id="selectPaperBtn" value="选择试卷" class="span-2 btn" onClick="selectPaper()"/>
	 	</div>	
	 </div>
     <!-- 所选试卷一览 -->
     <div id="div_k060061_list" class="prepend-1">
     	<s:include value="k060061_list.jsp"></s:include>
     </div>
	<div class="span-23 prepend-1">
		<s:label value="(若有多个试卷，则每个考生考试时从这些试卷中随机抽一张试卷进行考试）"/>
	</div>
	</s:form>
	<div class="span-24 margin_top_10 text_center">
		<input id="midifyBtn" type="button" class="span-2 btn" value="修改" onClick="modifyExamine()"/> 
		<input id="saveBtn" type="button" class="span-2 btn" value="保存" onClick="examineInfoSubmit()"/> 
		<input id="createExamineBtn" type="button" title="按上述条件生成考试实例" class="span-2 btn" value="生成考试" onClick="createModelSet()"/> 
		<input id="deleteBtn" type="button" class="span-2 btn" value="删除" onClick="return deleteParentExamine()"/> 
	</div>
	
	
	<s:include value="../testing/k060061_create_model_set.jsp" />
	
	<div id="childExamineDiv" class="span-23 prepend-1 margin_top_6">
		<div id="childExamindListDiv" class="span-23 overflow_scr_y h_60">
			<s:include value="k060061_child_list.jsp" />
		</div>
	</div>
	<s:fielderror></s:fielderror>
	<div class="clear_both">
	</div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>
