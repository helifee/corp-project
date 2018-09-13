<%--
 * @(#)k060041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 考生答卷&试卷预览(单题)
 * 
 * @author lijinling
 * @version 1.00 2010/03/29
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
	<link href="<%=basePath%>${session.userTheme}"  rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060041.js"></script>
	<title>考生答卷&试卷预览(单题)</title>
</head>
<body onLoad="init()" style="overflow-x:hidden;overflow-y:auto;">
<div class="container showgrid">               
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
	<div class="showgrid container">
		<div class="span-24 padding_top_8 title_tt">
          	<h2 id="testTitle"></h2>
		</div>
    	<div class=" prepend-h span-23 append-1">
            <div class="span-23" id="test">
            	<div class="span-23 bd_1s666">
                	<div class=" prepend-16 span-6">
                   	 	<div id="lefeTimeLabel" class="span-2 none text_right"><label>剩余时间:</label></div>
                    	<div class="span-3 last"><label id="H"></label><label id="M"></label><label id="S"></label></div>
                 	</div>
                 	<div class="none">
                 		<s:hidden name="mode" id="mode"/>
                 		<s:hidden name="testEmployeeAnswerInfo.bigquestionSerialNo" id="curBigquestionSerialNo"/>
                 		<s:hidden name="testEmployeeAnswerInfo.questionId" id="currentQuestionId"/>
                 	</div>
                 	<div class="span-23 text_center padding_top_8 title_tt"><h2>问卷</h2></div>
                	 	<div class="span-2 title_3">试卷说明：</div><div id="testInfo" class="span-20 last text_left title_3"></div>
                 		<div id="bigquestionTitleQuestion" class="span-22"></div>
                 		<div class="span-23">
                 		<div class="span-23 overflow_scr_y bd_1s666 h_230" id="questionContent">
                		 </div>
                 	</div>
                 </div>
            </div>
            <div class="span-23 margin_top_10 margin_bottom_10">
                <div class="prepend-5 span-2">
                	<input type="button" value="上一大题" id="preB" class="btn span-2" onClick="moveQuestion(1)"/>
                </div>
                <div class="span-2">
                	<input type="button" value="上一题" id="pre"  class="btn span-2" onClick="moveQuestion(2)"/>
                </div>
               	<%--<div class="span-3">
                	<label>第</label>
                	<input id="questionOrder" type="text" maxlength=2 class="span-1 text_center" name="questionOrder"/>
                	<label>题</label>  
                	<input type="button" id="go"  value="Go" class="btn span-1" onClick="jumpQuestion()"/>
                </div> --%>
                <div class="span-2">
                	<input type="button" value="下一题" id="next" class="btn span-2" onClick="moveQuestion(3)"/>
                </div>
                <div class="span-2">
                	<input type="button" value="下一大题" id="nextB"  class="btn span-2" onClick="moveQuestion(4)"/>
                </div>
            </div>
            <div class="span-23 bd_1s666" id="test">
                 <div class="span-23 text_center padding_top_8 title_tt"><h2>答题卡</h2></div>
                 	<!-- <div id="answerSheetInfo" class="span-22"></div> -->
                 	<div id="bigquestionTitleAnswer" class="span-22"></div>
                 	<div class="span-23">
                 	<div class="span-23 overflow_scr_y bd_1s666 h_230">               
                 		<div id="questionShowNumAnswer"></div>             
                 		<div id="answerContent" class="span-22"></div>
                 	</div>
                 </div>      
            </div>
            <div class="span-23 margin_top_10 margin_bottom_10">
                <div class=" prepend-10 span-2">
                	<input id="viewAnswer" type="button"  class="btn span-2" value="查看答案" onclick="viewAnswer()"/>
                </div>
                <div class="span-2">
               		<input id="handIn" type="button" class="btn span-2" value="交 卷" onclick="submitTest()"/>
                </div>
                <div class="span-2">
                	<input id="desert"type="button" class="btn span-2" value="放  弃"/ onclick="desertTest()">
                </div>
                <div class="span-2">
                	<input id="changeMode" type="button" class="btn span-2" value="切换模式" onClick="changeMode()"/>
                </div>
            </div>
            <div id = "tmpl" class="prepend-1 span-20"></div>
            <form action="" id="subTest"></form>
            <div class="clear_both"></div>　　
        </div>             
    </div>
		</div>
		</div>
</div>
</body>
</html>