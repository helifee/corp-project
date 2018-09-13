<%--
 * @(#)k060101.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 考试阅卷(单题)
 * 
 * @author lijinling
 * @version 1.00 2010/04/26
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060101.js"></script>
	<title>考试阅卷(单题)</title>
</head>
<body onLoad="init()">
<div class="container showgrid">               
<s:include value="../manager/head.jsp" />　　
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />　　
	<div class="showgrid container">
    	<div class=" prepend-1 span-22 append-1">
    	    <!-- 试题区域-->
            <div class="span-22" id="test">
            	<div class="span-22 bd_1s666">
            		<div class="span-22 text_center padding_top_8 title_tt"><h2 id="paperTitle">试卷标题</h2></div>
                 	<div class="span-2 title_3">试卷说明：</div><div id="testInfo" class="span-20 last text_left title_3"></div>
                	<div class="span-22"><label id="bigQuestionTitleInfo1"></label></div>
                 	<div class="span-22">
                 		<div class="span-22 overflow_scr_y bd_1s666 h_122" id="questionContent">
                 		</div>
                 	</div>
                 </div>
            </div>
            <!-- 标准答案区域-->
            <div class="span-22 margin_top_6" id="test">
            	<div class="span-22 bd_1s666">
            		<div class="span-22 text_center padding_top_8 title_tt"><h2 id="AnswerTitle">答案标题</h2><h2>标准答案</h2></div>
                 	<div class="span-22"><label id="bigQuestionTitleInfo2"></label></div>
                 	<div class="span-22">
                 		<div class="span-22 overflow_scr_y bd_1s666 h_122" id="answerContent">
                 		</div>
                 	</div>
                </div>
            </div>
           <!-- 阅卷区域-->
            <div class="span-22 margin_top_6" id="test">
            	 <div class="span-22 bd_1s666">
            	 	<div class="span-22 text_center padding_top_8 title_tt"><h2 id="markAreaTitle">阅卷区域标题</h2><h2>阅卷</h2></div>
                 	 <!--wanqiuhong 10/25 删除
                 	 <div class="span-22">
                 		<div class="span-16"><label id="bigQuestionTitleInfo3"></label></div>
                 		<div class="span-4"><input type="checkbox" id="hidden" onclick="hiddenMarked()"/><label>隐藏已评过的试卷</label></div>
                 	</div>-->
                	<div class="span-22">
                 		<div class="span-22 overflow_scr_y bd_1s666 h_122">
                 			<div class="prepend-h"><label id="questionOrder"></label></div>
                 			<div id="markgingContent" class="prepend-1"></div>
                 		</div>
                 	</div>
                 </div>
				<div class="span-23" id="errorMessage"></div>
            </div>
            <!-- 评分控制案区域-->            
            <div class="span-19 margin_top_10 margin_bottom_10 margin_left_6">
            	<!--wanqiuhong 10/25 删除
            	<div class="span-4 prepend-1"><input type="checkbox" id="skip"/><label>跳过已评完分的试题</label></div>
                <div class="span-2"><input type="button" id="preB" value="上一大题" class="btn span-2" onClick="moveQuestion(1)"/></div>-->
                <div class="span-2"><input type="button" id="pre" value="上一题"  class="btn span-2" onClick="moveQuestion(2)"/></div>
                <div class="span-2"><input type="button" id="next" value="下一题"  class="btn span-2" onClick="moveQuestion(3)"/></div>
                <!--wanqiuhong 10/25 删除
                <div class="span-2"><input type="button" id="nextB" value="下一大题"  class="span-2 btn" onClick="moveQuestion(4)"/></div>-->
            </div>
            <div class="span-2 last margin_top_10"><input type="button" class="span-2 btn" value="结束评分" onClick="endMark()"/></div>
        </div>
        
        <div class="text_center span-24"><label id="currentQuestion"></label><label>/</label><label id="total"></label></div>
		<!-- 结束评分提交Form -->
        <form id="endMarkForm"></form>
        <div class="span-24">
        <div class="none span-15 h_300" id="answerDetail">
       		<div class="margin_top_6">
       			<div class="span-7 "><label>标准答案</label></div>
       			<div><label class="span-7">考生答案</label></div>
       		</div>
        	<div id="standardAnswer" class="span-7 margin_top_6 bd_1s666 margin_left_6 h_92 overflow_scr_y">
        	</div>
       		<div id="employeesAnswer" class="span-7 last margin_top_6 bd_1s666 h_92 overflow_scr_y">
       		</div>
       		<div class="span-13">
       		<label>得分点</label>
       		</div>
        	<div id="points" class=" span-10 margin_top_6 margin_bottom_6 bd_1s666 margin_left_6 h_92 overflow_scr_y"></div>
        	<div class=" prepend-12 span-2 margin_top_10"><input type="button" class="btn span-2" value="关闭" onClick="closeAnswerDetail()"/>
        	</div>
        </div>
        </div>
        </div>　
		</div>
	</div>
	<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>