<%--
 * @(#)k050041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 试卷试题编辑画面
 * 
 * @author yinfuyan
 * @version 1.00 2010/05/31
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
<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/ttTesting/k050041.js"></script>

<title>试卷试题编辑</title>
</head>
<body onload="initForm()" onunload="closeAllSubwin()">
<div class="container">               
	<s:include value="../manager/head.jsp" />　　
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />　　
    <div class="container showgrid ">
    	<div class="span-24 padding_top_8 title_tt">
          	<h2>试卷试题编辑</h2>
		</div>
   		<%-- 生成校验js s:form action="roleUserSearchAction" method="post" validate="true" --%>
    	<%-- 正式运行用   s:form action="roleUserSearchAction" method="post" --%>
        <s:form id="k050041MainForm" action="k050041SaveBigquestion" method="post" validate="true">
            <div class="span-23 prepend-h">
            	<!--画面隐藏项目-->
            	<!--大题编号-->
               	<s:hidden id="hidBigquestionSerialNo" name="bigquestionSerialNo" />
            	<!--画面模式-->
               	<s:hidden id="hidModeKbn" name="modeKbn" />
            	<!--大题类别-->
               	<s:hidden id="hidBigquestionType" name="bigquestionInfo.bigquestionType" />
            	<!--一级分类ID-->
               	<s:hidden id="hidCategory1" name="category1" />
            	<!--二级分类ID-->
               	<s:hidden id="hidCategory2" name="category2" />
            	<!--三级分类ID-->
               	<s:hidden id="hidCategory3" name="category3" />
            	<!--试卷ID-->
               	<s:hidden id="hidPaperId" name="paperId" />
            	<!--试题题型-->
               	<s:hidden id="hidQuestionKind" name="bigquestionInfo.questionKind" />
               	<!--登录用户ID-->
               	<s:hidden id="hidLogInUser" name="logInUser" />
               	<div class="span-23">
	            <!--大题标题-->
	            	<div class="span-2 text_right">
	                    <s:label id="questionTtlLbl" value="大题标题：" />
	                </div>
	                <div class="text_left">
	                	<s:textfield id="bigquestionInfo.bigquestionTitle" name="bigquestionInfo.bigquestionTitle" maxlength="50"  cssClass="span-9" />
	                </div>
                </div>
                <div class="span-23">
                <!--大题说明-->
                   	<div class="span-2 text_right">
                    	<s:label id="questionDescLbl" value="大题说明：" />
                    </div>
                    <div class="text_left">
                        <s:textarea id="bigquestionInfo.bigquestionDescription" name="bigquestionInfo.bigquestionDescription" rows="3" cssClass="span-10" />
                    </div>
                </div>
                <div class="span-23">
                <!--大题答题时间-->
                	<div class="span-2 text_right">
                     	<s:label id="questionTimeLbl" value="答题时间：" />
                    </div>
                    <div class="span-1 text_left">
                   		<s:textfield id="bigquestionInfo.bigquestionTime" name="bigquestionInfo.bigquestionTime" cssClass="span-1" />
                   	</div>
                   	<div class="text_left">
                     	<s:label id="minuteLbl" value="分钟" />
                    </div>
                </div>
				<div class="span-23">
                <!--试题数量-->
					<div class="span-2 text_right">
						<s:label value="试题数量："/>
					</div>
					<div class="text_left">
						<s:label id="bigquestionInfo.questionNum" name="bigquestionInfo.questionNum" keep="1"/>
					</div>
				</div>
				<div class="span-23">
				<!--试题题型 -->
					<div class="span-2 text_right">
						<s:label id="questionKindLbl" value="试题题型："/>
					</div>
					<div class="text_left">
						<s:label id="bigquestionInfo.questionKindName" name="bigquestionInfo.questionKindName"/>
					</div>
				</div>
				<div class="span-23">
				<!--大题类别-->
					<div class="span-2 text_right">
						<s:label id="questionTypeLbl" value="大题类别："/>
					</div>
					<div class="text_left">
						<s:label id="bigquestionInfo.bigquestionTypeName" cssClass="span-6" name="bigquestionInfo.bigquestionTypeName"/>
					</div>
				</div>
				<div class="span-23">
				<!--大题总分：-->
					<div class="span-2 text_right">
						<s:label id="questionSumScoreLBl" value="大题总分："/>
					</div>
					<div class="span-2 text_left">
						<s:label id="bigquestionInfo.bigquestionTotalScore" cssClass="span-5" name="bigquestionInfo.bigquestionTotalScore" keep="1"/>
                        <s:label id="pointsLbl" value="分"/>
					</div>
				</div>
                <div class="span-23">
                    <input type="button" id="btnCreateQuestion" class="btn span-2" value="新建试题" onclick="creatQuestion();" />
                    <input type="button" id="btnChooseQuestion" class="btn span-2" value="选择试题" onclick="chooseQuestion();" />
                    <input type="button" id="btnMoveUp" class="btn span-2" value="上移" onclick="moveRowUp();" >
                    <input type="button" id="btnMoveDown" class="btn span-2" value="下移" onclick="moveRowDown();" />
                    <!-- <input type="button" id="btnEditPoint" class="btn" value="批量修改分数" onclick="changeScoreBatchPop()"/> -->
         		</div>
         	</div>
	        <div class="span-23 margin_top_6 prepend-h" id="divQuestionList">
	        	<s:include value="k050041_list.jsp" />
			</div>
			<div class="span-23 margin_top_6 text_center prepend-h">
				<input type="button" id="btnSave" class="btn span-2" value= "保存" onclick="saveQuestion();" />
			</div>	 
        </s:form>
        <div class="clear_both"></div>
     </div>
<!--弹出div层-->
<div class="bgclr_fff span-6 none" id="changeScore">
	<s:form id="adminForm" action="tt/testing/searchQus" method="post"  >
	<div class="span-5">
		<s:label id="labQuestionScore" value="请输入试题分数：" />
		<s:textfield id="txtScore" cssClass="span-1" maxlength="3" name="" />
		<s:label value="分" />
	</div>
	<div class="span-5">&nbsp;</div>
	<div class="span-5 text_center">
       	<input type="button" value="确定" Class="span-2 btn" name="btnRegister" id="btnRegister" onclick="changeScoreBatch();" >
   		<input type="button" value="取消" Class="span-2 btn" name="btnCancel" id="btnCancel" onclick="divCancel();" >
	</div>
	</s:form>
</div>
<!--弹出div层-->
<div class="bgclr_fff span-7 none" id="changeIetmScore">
	<div class="span-7">
		<div class="span-7 last">
		<table class="datagridtt span-7">
			<tr>
				<th class="span-2">答案编号</th>
				<th class="span-2">原始分数</th>
				<th class="span-3">输入修改分数</th>
			</tr>
		</table>
		</div>
    </div>
	<div class="span-7">
		<div class="span-7 last">
		<table id="answerTable" class="datagridtt span-7">
		</table>
	    </div>
    </div>
    <div class="span-7 text_center">
		<s:label id="labQuestionScore" value="试题总分数：" />
		<s:label id="txtScoreItem" cssClass="span-1"/>
		<s:label value="分" />
	</div>
   	<div class="span-7 text_center">
       	<input type="button" value="确定" Class="span-2 btn" name="btnchangeItemScore" id="btnchangeItemScore" onclick="changeItemScore();" >
   		<input type="button" value="取消" Class="span-2 btn" name="btnDivItemCancel" id="btnDivItemCancel" onclick="divItemCancel();" >
   	</div>
</div>
</div>
</div>
	<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>