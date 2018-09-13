<%--
 * @(#)k060091_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 考试阅卷(整卷)&答案对照
 * 
 * @author sundefu
 * @version 1.00 2010/04/13
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
	<script type="text/javascript" src="<%=basePath %>/js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<!-- 画面用js -->
		<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060091.js"></script>
	<title>考试阅卷(整卷)&答案对照</title>
</head>
<body onLoad="init()">
<div id="markPaperBody" class="container showgrid">               
	<s:include value="../manager/head.jsp" />　　
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
	<div class="showgrid container">
		<div class="span-24 padding_top_8 title_tt">
			<h2 id="paperTitle">试卷标题</h2>
		</div>	
		<div class="prepend-h span-23">
			<div class="span-22 margin_bottom_10" id="test">
				<div class="span-23 bd_1s666">
					<div class="span-23 text_center padding_top_8 title_tt"><h2>问卷</h2></div>
					<div class="span-2 title_3">试卷说明：</div><div id="testInfo" class="span-20 last text_left title_3"></div>
					<div class="span-23">	               		 
		                 <div class="span-23 overflow_scr_y bd_1s666" style="height:250px;">
		                 	<div class="span-23" id="errorMessage"></div>
		                 	<div id="questionContent"></div>
		                 </div>
	                </div>
				</div>	
			</div>			
		</div>
		<s:hidden id="mode" name="mode"></s:hidden>
		<div class="prepend-h span-23">
			<div class="span-22 margin_bottom_10" id="test">
				<div class="span-23 bd_1s666">
				<!--wanqiuhong 10/25 修改：-->
					<div class="prepend-7 span-8 none"><h2 id="markAreaTitle">阅卷区域标题</h2><h2>答案</h2></div>
					<div class="span-6 last text_left padding_top_8 none" id="hiddenMarked"><input type="checkbox" id="hidden" onClick="hiddenMarked()"/><label>隐藏已评过的试题</label></div>
					<div class="span-23 text_center padding_top_8 title_tt"><h2>答题卡</h2></div>
			            				<div class="span-23">
		               	<div class="span-23  bd_1s666">
			               	<div class="text_center span-10"><label class="font_size_lgr font_weight_b" id="standardAnswerTitle">标准答案</label></div>
			                <div class="span-6 text_center"><label class="font_size_lgr font_weight_b" id="EmployeeAnswerTitle">考生答案</label></div>
			                <div class="span-5 text_center last" ><label class="font_size_lgr font_weight_b" id="EmployeeQuestionPoint">考生得分</label></div>
		               	</div>
		               	<div  id ="markArea" class="span-22 margin_left_4 h_300 overflow_scr_y"></div>      
					</div>
					<div class="prepend-10 span-18 margin_top_10 margin_bottom_6　　last" id="controlDiv">
			        	<!--wanqiuhong 10/25 修改:-->
			        	<div class="span-4 none"><input type="checkbox" id="skip"/><label>跳过已评完分的试卷</label></div>
			            <div class="span-2 none"><input type="button"  id="prePaper" class="btn span-2" value="上一张"  onClick="prePaper()"/></div>
			            <div class="span-2 none"><input type="button" id="nextPaper" class="btn span-2" value="下一张"  onClick="nextPaper()"/></div>
			            <div class="span-2 last"><input type="button" class="btn span-2" value="结束评分" onClick="endMark()"/></div>
			        </div>
		       	 	<!--wanqiuhong 10/25修改 --><div id="paperCountDiv" class="text_center none"><label id="markingPaperNo">3</label><label>/</label><label id="paperAllNum">100</label></div>
		    	 </div>
		     </div>  	 	
		</div>
		<!--wanqiuhong 10/25 修改 --><div id="paperCountDiv" class="text_center none"><label id="markingPaperNo">3</label><label>/</label><label id="paperAllNum">100</label></div>
	    <div class="none span-15 h_300" id="answerDetail">
	    		<div class="margin_top_6 margin_left_4">
	    			<div class="span-7 "><label>标准答案</label></div>
	    			<div><label class="span-7">考生答案</label></div>
	    		</div>
	     	<div id="standardAnswer" class="span-7 margin_top_6 bd_1s666 margin_left_10  h_92 overflow_scr_y">
	     	</div>
	    		<div id="employeesAnswer" class="span-7 last margin_top_6 bd_1s666 h_92 overflow_scr_y">
	    		</div>
	    		<div class="span-13">
	    		<label>得分点</label>
	    		</div>
	     	<div id="points" class="span-10 margin_top_6 margin_bottom_6 bd_1s666 margin_left_6 h_92 overflow_scr_y"></div>
	     	<div class=" prepend-12 span-2 margin_top_10"><input type="button" class="span-2 btn" value="关闭" onClick="closeAnswerDetail()"/></div>
	     </div>
    </div>
</div>
</div>
	<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>