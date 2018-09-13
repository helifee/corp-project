<%--
 * @(#)k060021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 
 * 
 * @author tengchanglong
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/category.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060021.js"></script>

	<title>考试详细（用户）</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>考试详细</h2>
	</div>
	
<div class="span-24 margin_top_2" >
<!-- left area -->
<div class="span-16">

	<s:form id="k060021Form" action="" method="post" >
	<!--保存传入参数-->
	<s:hidden id="examineId" name="examineId"></s:hidden>
	<!--保存模式信息-->
	<s:hidden id="mode" name="mode"></s:hidden>
	<!--保存传出参数-->
	<s:hidden id="examEmployeeInfo.examineJoinTimes" name="examEmployeeInfo.examineJoinTimes" ></s:hidden>
	<!--报名批准标志-->			
	<s:hidden id="examineInfo.applyConfirmFlg" name="examineInfo.applyConfirmFlg" ></s:hidden>	
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="是否必考：" /></div>
		<div class="span-3 text_left">
			<s:if test="examineInfo.mustExamineFlg == 2">
				<s:label value="必考" />
			</s:if>
			<s:else><s:label value="非必考" /></s:else>
		</div>
		<s:if test="examineInfo.mustExamineFlg ==1 && mode <4">
			<div class="span-8 text_right"><s:label value="对此考试的关注度：" /></div>
			<div class="span-2 last text_left">
				<s:select id="examineInfo.attentionFlag" name="examineInfo.attentionFlag" list="attentionList"
				listKey="%{diffNo}" listValue="%{diffName}" cssClass="span-2" onchange="attentionChange()"/>
			</div>
		</s:if>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试ID：" /></div>
		<div class="span-12 last text_left">
			<s:label value="%{examineId}" />
			<s:hidden id="examineInfo.examineId" name="examineInfo.examineId"></s:hidden>
			<s:hidden id="examineInfo.examineFlg" name="examineInfo.examineFlg"></s:hidden>
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试名称：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.examineName" name="examineInfo.examineName" value="%{examineInfo.examineName}" />
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试分类：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.categoryName" name="examineInfo.categoryName" value="%{examineInfo.categoryName}"/>
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试区分：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.examineFlgName" name="examineInfo.examineFlgName" value="%{examineInfo.examineFlgName}"/>
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试说明：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.examineComment" name="examineInfo.examineComment" value="%{examineInfo.examineComment}"/>
		</div>
	</div>
	
<s:if test="mode <4">
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试开始时间：" /></div>
		<div class="span-12 last text_left">
			<s:date name="examineInfo.examineStartTime" id="startTimeFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{startTimeFormat}" />
			<s:hidden id="examineInfo.examineStartTime" name="examineInfo.examineStartTime" value="%{startTimeFormat}" ></s:hidden>
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试结束时间：" /></div>
		<div class="span-12 last text_left">
			<s:date name="examineInfo.examineEndTime" id="endTimeFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{endTimeFormat}" />
			<s:hidden id="examineInfo.examineEndTime" name="examineInfo.examineEndTime" value="%{endTimeFormat}" ></s:hidden>
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="报名截止时间：" /></div>
		<div class="span-12 last text_left">
			<s:date name="examineInfo.applyClosingTime" id="applyClosingTimeFormat" format="yyyy-MM-dd HH:mm" />
			<s:property value="%{applyClosingTimeFormat}" />
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试时间：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.examineTime" name="examineInfo.examineTime" value="%{examineInfo.examineTime}"/>
			分钟
		</div>
	</div>
	<div class="span-16">
		<div class="span-3 text_right"><s:label value="考试状态：" /></div>
		<div class="span-12 last text_left">
			<s:label id="examineInfo.examineStatusName" name="examineInfo.examineStatusName" value="%{examineInfo.examineStatusName}"/>
		</div>
	</div>
	<div class="span-16">
		<div id="testStatusDiv">
			<div class="span-3 text_right"><s:label value="我的考试状态：" /></div>
			<div class="span-12 last text_left">
				<s:label id="examEmployeeInfo.empExamStatusName" name="examEmployeeInfo.empExamStatusName" keep="1"/>
				<s:hidden id="examEmployeeInfo.empExamStatus" name="examEmployeeInfo.empExamStatus"></s:hidden>
			</div>
		</div>
	</div>
</s:if>

<s:if test="mode == 4">
	<!-- 其他可参加考试-->
		<div class="span-15 prepend-h margin_top_6 text_left"><s:label value="该考试的实施一览" /></div>
		<div class="span-15 prepend-h last">
				<table id="examDate" class="datagridtt text_center">
					<tr>
						<th class="span-3"><span>报名截止时间</span></th>
						<th class="span-7"><span>考试开始时间～考试结束时间</span></th>
						<th class="span-3"><span>考试状态</span></th>
						<th class="span-2"><span>操作</span></th>
					</tr>
					<s:if test="otherExamineInfoList.size > 0">
					<s:iterator value="otherExamineInfoList">
						<tr>
							<s:date name="examineStartTime" id="examineStartTimeFormat" format="yyyy-MM-dd HH:mm" />
							<s:date name="examineEndTime" id="examineEndTimeFormat" format="yyyy-MM-dd HH:mm" />
							<s:date name="applyClosingTime" id="applyClosingTimeFormat" format="yyyy-MM-dd HH:mm" />
							<td class="span-3"><s:property value="%{applyClosingTimeFormat}"/></td>
							<td class="span-7"><s:property value="%{examineStartTimeFormat}"/>
										～<s:property value="%{examineEndTimeFormat}"/>
							</td>
							<td class="span-3"><s:property value="examineStatusName"/></td>
							<td class="span-2">
								<s:a href="k060021InitTestDetails.action?examineId=%{examineId}">查看</s:a>
							</td>
						</tr>
				    </s:iterator>
            	    </s:if>
				</table>
		</div>
</s:if>
	<div class="text_center span-16">
			<s:if test="btnStatusFlg == 1 || examineInfo.examineStatus >= 5 ||examEmployeeInfo.empExamStatus>=3">
				<!-- 报名已经截止-->
				<input type="button" class="span-2 btn disabled" disabled id="applyBtn"  name="applyBtn" value="申请报名" onclick="applySubmit()"/>
				<input type="button" class="span-2 btn disabled" disabled id="applyCancelBtn" name="applyCancelBtn" value="取消报名" onclick="applyCancelSubmit()"/>					
			</s:if><s:else>
				<s:if test="examEmployeeInfo.empExamStatus == 1||(examEmployeeInfo.empExamStatus == 2&&examineInfo.examineStatus<6&&examineInfo.applyConfirmFlg==1)">
					<input type="button" class="span-2 btn disabled" disabled id="applyBtn"  name="applyBtn" value="申请报名" onclick="applySubmit()"/>
					<input type="button" class="span-2 btn" id="applyCancelBtn" name="applyCancelBtn" value="取消报名" onclick="applyCancelSubmit()"/>
				</s:if><s:else>
					<input type="button" class="span-2 btn" id="applyBtn" name="applyBtn" value="申请报名" onclick="applySubmit()"/>
					<input type="button" class="span-2 btn disabled" disabled id="applyCancelBtn" name="applyCancelBtn" value="取消报名" onclick="applyCancelSubmit()"/>					
				</s:else>
			</s:else>
			<s:if test="(examEmployeeInfo.empExamStatus == 2 ||examEmployeeInfo.empExamStatus==4) && btnStatusFlg != 2">
				<!-- 报名已批准或者考试进行中，并且考试未结束-->
				<input type="button" class="span-2 btn" id="examStartBtn" name="examStartBtn" value="进入考试" onclick="examStartSubmit()"/>
			</s:if><s:else>
				<input type="button" class="span-2 btn disabled" disabled id="examStartBtn" name="examStartBtn" value="进入考试" />
			</s:else>
			<!-- 随时考试-->
			<s:if test="examineInfo.examineFlg == 2">
				<s:if test="btnReExamFlg == 1">
					<input type="button" class="span-2 btn" id="examAgainBtn" name="examAgainBtn" value="重新考试" onclick="examAgainSubmit()"/>
				</s:if><s:else>
					<input type="button" class="span-2 btn disabled" disabled id="examAgainBtn" name="examAgainBtn" value="重新考试" onclick="examAgainSubmit()"/>
				</s:else>
			</s:if>
			<!-- 允许考生在考试成绩发布后查看标准答案-->
			<s:if test="examineInfo.examineFlg == 2">
				<s:if test="examEmployeeInfo.empExamStatus == 8 && examineInfo.checkAnswerFlg == 2">
					<input type="button" class="span-2 btn none" id="resultCheckBtn" name="resultCheckBtn" value="查看答卷" onclick="resultCheckSubmit()"/>
				</s:if><s:else>
					<input type="button" class="span-2 btn disabled none" disabled id="resultCheckBtn" name="resultCheckBtn" value="查看答卷" onclick="resultCheckSubmit()"/>						
				</s:else>
			</s:if>
			<s:if test="examEmployeeInfo.empExamStatus == 8">
				<input type="button" class="span-2 btn" id="scoreViewBtn" name="scoreViewBtn" value="查看成绩" 
					onclick="window.open('k070031InitScoreDetails.action?examineId=${examineId}','viewScoreDetailsWin')" />
			</s:if><s:else>
				<input type="button" class="span-2 btn disabled" disabled id="scoreViewBtn" name="scoreViewBtn" value="查看成绩" />
			</s:else>
			
			
	</div>
	<!-- 错误信息 -->
	<div class="prepend-2 span-20">
		<s:fielderror></s:fielderror>
	</div>
	</s:form>
</div>
<!-- right area -->
<div class="span-8 last">
	<!-- 需要学习课程 -->
	<div class="tt_module margin_right_8" >
		<div class="tt_module_header">需要学习课程</div>
		<div id="div_book_mark_list" class="tt_module_body ellipsis" style="height:auto!important;min-height:20px;">
			<s:if test="courseInfoList.size > 0">
			<s:iterator value="courseInfoList">
				<s:url action="../training/j020041InitStudyMode" id="studyUrl">
					<s:param name="courseId" value="%{courseId}"></s:param>
				</s:url> 
				<s:a href="%{studyUrl}" title="%{courseName}"><s:property value="courseName"/></s:a><br>
      		</s:iterator>
			</s:if> 
       	</div>
	</div>
	<!-- 需要通过考试-->
	<div class="tt_module margin_right_8 margin_top_6" >
		<div class="tt_module_header">需要通过考试</div>
		<div id="div_book_mark_list" class="tt_module_body ellipsis" style="height:auto!important;min-height:20px;">
	
			<s:if test="examineInfoList.size > 0">
				<s:iterator value="examineInfoList">
				<s:if test="empPassExamFlag ==1">通过</s:if>
						<s:else>未通过</s:else>-

							<s:url action="../testing/k060021InitTestDetails" id="viewExamUrl">
								<s:param name="examineId" value="%{examineId}"></s:param>
							</s:url> 
							<s:a href="%{viewExamUrl}"><s:property value="examineName"/></s:a>
                </s:iterator>
			</s:if>
           
		</div>
	</div>
</div>
</div>

			<div class="clear_both"></div>
</div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>