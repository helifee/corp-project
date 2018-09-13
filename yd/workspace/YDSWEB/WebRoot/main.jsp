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
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

<!-- 共通js -->
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>

<!-- 画面js -->
<script type="text/javascript" src="<%=basePath %>js/common/theme.js"></script>

<title>远东公司内部网--</title>
<style type="text/css">
ul{list-style:square!important;padding-left:20px;}
</style>
</head>

<body>
<div class="container">
	<div class="span-24">
		<div class="span-24">
			<p>[<span class="color_red"><s:property value="#session.userinfo.userId" /></span>]登录成功！ IP地址：<s:property value="#session.ipAddr" /></p>
			<p id="themeList"></p>
			<p>欢迎您：<span class="color_red"><s:property value="#session.userinfo.userName" /></span>! [<a href="common/logout.action" target="_top">注销</a>]</p>
		</div>

		<!-- div 考试系统 start -->
		<div class="span-24 margin_top_6">

			<!-- 教育考试系统-管理 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">教育考试系统-管理</div>
				<div class="module_body">
					<ul>
        				<li>
							<s:url action="tt/manager/g010021InitMaintPermList" id="g010021ActionUrl"></s:url>
        					<s:a href="%{g010021ActionUrl}">权限管理</s:a>
        				</li>
						<li>
							<s:url action="tt/manager/getCategoryAction" id="getSelectListActionUrl"></s:url>
       				 		<s:a href="%{getSelectListActionUrl}">分类联动</s:a>
						</li>
						<li>
							<s:url action="tt/manager/g080011InitSystemMaintain" id="initSystemMaintainActionUrl"></s:url>
       				 		<s:a href="%{initSystemMaintainActionUrl}">系统维护</s:a>
						</li>
						<li>
							<s:url action="employee/yb0050Init" id="yb0050InitUrl"></s:url>
       				 		<s:a href="%{yb0050InitUrl}">组织图</s:a>
						</li>
						<li>
							<s:url action="gps/yd0040Init" id="yd0040InitUrl"></s:url>
       				 		<s:a href="%{yd0040InitUrl}">商品管理</s:a>
						</li>
						<li>
							<s:url action="gps/yd0010Init" id="yd0010InitUrl"></s:url>
       				 		<s:a href="%{yd0010InitUrl}">个人账户管理</s:a>
						</li>
						<li>
							<s:url action="gps/yd0020Init" id="yd0020InitUrl"></s:url>
       				 		<s:a href="%{yd0020InitUrl}">公司账户管理</s:a>
						</li>
						<li>
							<s:url action="gps/yd0060Init?orderId=00000044" id="yd0060InitUrl"></s:url>
       				 		<s:a href="%{yd0060InitUrl}">订单管理</s:a>
						</li>
						<li>
							<s:url action="att/ye0060Init" id="ye0060InitUrl"></s:url>
       				 		<s:a href="%{ye0060InitUrl}">项目加班一览</s:a>
						</li>
						<li>
							<s:url action="att/ye0070Init" id="ye0070initUrl"></s:url>
		        			<s:a href="%{ye0070initUrl}">员工加班一览</s:a>
	        			</li>
						<li>
							<s:url action="att/ye0050Init" id="yd0060InitUrl"></s:url>
       				 		<s:a href="%{yd0060InitUrl}">考勤一览</s:a>
						</li>
						<li>
							<s:url action="att/ye0050Init?fromId=01" id="yd0060InitUrl"></s:url>
       				 		<s:a href="%{yd0060InitUrl}">考勤一览主页入口</s:a>
						</li>
						<li></li>
					</ul>
				</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="tt/manager/g100011InitTopPage" id="g100011InitTopPageUrl"></s:url>
        					<s:a href="%{g100011InitTopPageUrl}" target="_blank">教育考试培训系统主页面</s:a>
						</li>
						<li>
							<s:url action="att/ye0020Init" id="ye0020InitUrl"></s:url>
       				 		<s:a href="%{ye0020InitUrl}">请假申请（申请模式）</s:a>
						</li>
						<li>
							<s:url action="att/ye0020InitViewSelf?paraAppId=XJ201101050002" id="ye0020InitViewUrl"></s:url>
       				 		<s:a href="%{ye0020InitViewUrl}">请假申请察看（个人）</s:a>
						</li>
												<li>
							<s:url action="att/ye0020InitView?paraAppId=XJ201101050002" id="ye0020InitViewUrl"></s:url>
       				 		<s:a href="%{ye0020InitViewUrl}">请假申请察看（审批者）</s:a>
						</li>
						<li>
							<s:url action="att/ye0040Init" id="ye0040Init"></s:url>
       				 		<s:a href="%{ye0040Init}">请假审批一览</s:a>
						</li>
						<li>
							<s:url action="att/ye0090.jsp" id="ye0090"></s:url>
       				 		<s:a href="att/Ye0090.jsp">考勤月报</s:a>
						</li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 教育考试系统-管理 end -->
			<!-- 教育考试系统-考试 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">教育考试系统-考试</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="tt/testing/k040011InitSeleByPracticeMode" id="getDataForK040011ActionUrl"></s:url>
        					<s:a href="%{getDataForK040011ActionUrl}" target="_blank">题库检索一览</s:a>
        				</li>
        				<li>
							<s:url action="tt/testing/k040021InitNewQuestionMode" id="initNewQuestionUrl"></s:url>
        					<s:a href="%{initNewQuestionUrl}">试题新建修改(题库新建)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040021InitNewQuesToPracticeMode?paperId=SJ000001&category1=1&category2=2&category3=0" id="updateQuestionUrl"></s:url>
        					<s:a href="%{updateQuestionUrl}">试题新建修改(练选新建)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040021InitNewQuesToTestMode?paperId=SJ000001&category1=1&category2=2&category3=1" id="updateQuestionUrl"></s:url>
        					<s:a href="%{updateQuestionUrl}">试题新建修改(考选新建)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040021InitUpdateQuesMode?questionId=ST001780&callScreenId=K040011" id="initUpdateQuestion"></s:url>
        					<s:a href="%{initUpdateQuestion}">试题新建修改(题库修改)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040021InitUpdateQuesToPracticeMode?paperId=SJ000001&questionId=ST001780" id="updateQuestionUrl"></s:url>
        					<s:a href="%{updateQuestionUrl}">试题新建修改(练选修改)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040021InitUpdateQuesToTestMode?paperId=SJ000001&questionId=ST001780" id="updateQuestionUrl"></s:url>
        					<s:a href="%{updateQuestionUrl}">试题新建修改(考选修改)</s:a>
						</li>		
						<li>
							<s:url action="tt/testing/k040021InitReferenceQuesMode?questionId=ST001780&questionVersionNo=2" id="updateQuestionUrl"></s:url>
        					<s:a href="%{updateQuestionUrl}">试题新建修改(参照)</s:a>
						</li>				
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">试题批量修改</s:a>
						</li>
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">试题批量录入</s:a>
						</li>
        				<li>
							<s:url action="tt/testing/initNewCreateAction" id="initNewCreateUrl"></s:url>
        					<s:a href="%{initNewCreateUrl}"> 试卷新建及权限分配（新建模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/initReferenceAction" id="initReferenceUrl"></s:url>
        					<s:a href="%{initReferenceUrl}"> 试卷新建及权限分配（参照新建模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/initTestManageAction" id="initTestManageUrl"></s:url>
        					<s:a href="%{initTestManageUrl}"> 试卷新建及权限分配（管理模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k050021InitSelectMode?category1=1&category2=1&category3=1&examineFla=2" id="initPaperListActionUrl"></s:url>
							<s:a href="%{initPaperListActionUrl}" >试卷一览（选择模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k050021InitManageMode" id="initPaperListActionUrl"></s:url>
							<s:a href="%{initPaperListActionUrl}" >试卷一览（管理模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">试卷编辑</s:a>
						</li>
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">试卷试题编辑</s:a>
						</li>
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">试卷查看</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060011InitCreateMode" id="initNewExamineUrl"></s:url>
        					<s:a href="%{initNewExamineUrl}"> 考试新建及权限分配（新建）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060011InitReferenceMode?examineId=ks000001" id="initReferenceExamineUrl"></s:url>
        					<s:a href="%{initReferenceExamineUrl}"> 考试新建及权限分配（参照新建）</s:a>
						</li>			
						<li>
							<s:url action="tt/testing/k060011InitManageMode?examineId=ks000001" id="initManageExamineUrl"></s:url>
        					<s:a href="%{initManageExamineUrl}"> 考试新建及权限分配（管理）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060021InitTestDetails?testId=ks100101" id="K060021ActionUrl"></s:url>
        					<s:a href="%{K060021ActionUrl}">考试详细（用户）</s:a>
        				</li>																			
						<li>
							<s:url action="tt/testing/k060031InitEditViewMode?ifViewChange=0&paperId=SJ000003&paperVersionNo=10000" id="initDoAnswerAction1Url"></s:url>
							<s:a href="%{initDoAnswerAction1Url}" >考生答卷&试卷预览（试卷编辑预览模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060031InitPracticeViewMode?ifViewChange=0&paperId=SJ000002" id="initDoAnswerAction2Url"></s:url>
							<s:a href="%{initDoAnswerAction2Url}" >考生答卷&试卷预览（练习预览模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060031InitPracticeMode?ifViewChange=0&paperId=SJ000002" id="initDoAnswerAction3Url"></s:url>
							<s:a href="%{initDoAnswerAction3Url}" >考生答卷&试卷预览（参加练习模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060031InitTestMode?ifViewChange=0&examineId=KS000001&examineJoinTimes=1&callScreenId=J030031" id="initDoAnswerAction4Url"></s:url>
							<s:a href="%{initDoAnswerAction4Url}" >考生答卷&试卷预览（参加考试模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060091InitMarkMode?markTaskAsignStyle=2&examineId=KS000001&markTaskList=10001&markTaskList=10002" id="initDoAnswerAction5Url"></s:url>
							<s:a href="%{initDoAnswerAction5Url}" >考试阅卷&答案对照（大题分配模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060091InitMarkMode?markTaskAsignStyle=1&examineId=KS000001&markTaskList=YD200701&markTaskList=YD200702&markTaskList=YD200703" id="initDoAnswerAction5Url"></s:url>
							<s:a href="%{initDoAnswerAction5Url}" >考试阅卷&答案对照（整卷分配模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060101InitMarkBySingle?markMode=1&examId=KS000001&markTaskList=YD200911&markTaskList=YD200912" id="initPageK060101ActionMode1Url"></s:url>
							<s:a href="%{initPageK060101ActionMode1Url}" >考试阅卷（单题）（整卷模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060101InitMarkBySingle?markMode=2&examId=KS000001&markTaskList=10001&markTaskList=10001" id="initPageK060101ActionMode2Url"></s:url>
							<s:a href="%{initPageK060101ActionMode2Url}" >考试阅卷（单题）（单题模式）</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040031GetQuestionLibraryList" id="getQuestionLibraryListActionUrl"></s:url>
							<s:a href="%{getQuestionLibraryListActionUrl}" >试题批量修改</s:a>
						</li>						
						<li>
							<s:url action="tt/testing/k060051InitExamineList" id="getk060051ActionUrl"></s:url>
					        <s:a href="%{getk060051ActionUrl}">考试检索一览</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060061InitViewMode?examineId=KS000001" id="getK060061Url"></s:url>
        					<s:a href="%{getK060061Url}"> 考试总体设定及生成(查看模式)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060061InitEditMode?examineId=KS000001" id="getK060061Url"></s:url>
        					<s:a href="%{getK060061Url}"> 考试总体设定及生成(编辑模式)</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060061InitDeleteMode?examineId=KS000001" id="getK060061Url"></s:url>
        					<s:a href="%{getK060061Url}"> 考试总体设定及生成(删除模式)</s:a>
						</li>
						<li>
							<a href="<%=path %>/tt/testing/k060071InitTestDetailsViewMode?paramTestId=KS000101">考试详细(管理)(查看模式)</a>
						</li>
						<li>
							<a href="<%=path %>/tt/testing/k060071InitTestDetailsEditMode?paramTestId=KS000101">考试详细(管理)(编辑模式)</a>
						</li>
						<li>	
							<a href="<%=path %>/tt/testing/k060071InitTestDetailsRepairMode?paramTestId=KS000101">考试详细(管理)(调整模式)</a>
						</li>
						<li>	
							<a href="<%=path %>/tt/testing/k060071InitTestDetailsApproveMode?paramTestId=KS000101">考试详细(管理)(审批模式)</a>
						</li>
						<li>	
							<a href="<%=path %>/tt/testing/k060071InitTestDetailsDeleteMode?paramTestId=KS000101">考试详细(管理)(删除模式)</a>
						</li>
						<li>
							<s:url action="tt/testing/k060081ApproveExamApply?examineId=KS000101" id="enrollApproveActionUrl"></s:url>
        					<s:a href="%{enrollApproveActionUrl}">考试报名批准</s:a>
						</li>											
						<li>
							<s:url action="tt/testing/k060111InitMarkingAssign?examineId=KS000001" id="getK060111Url"></s:url>
        					<s:a href="%{getK060111Url}"> 评分任务分配</s:a>
						</li>
						<li>
							<s:url action="tt/testing/" id=""></s:url>
        					<s:a href="">考试评分详细</s:a>
						</li>							
						<li>
							<s:url action="tt/testing/k060131InitExamineSele?parenetId=KS000101" id="getInitListActionUrl"></s:url>
        					<s:a href="%{getInitListActionUrl}">考试选择</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060141InitCourseSele?parenetId=KS000101&idName=aaa" id="getK060141InitListActionUrl"></s:url>
        					<s:a href="%{getK060141InitListActionUrl}">课程选择</s:a>
						</li>	
						<li>
							<s:url action="tt/testing/k050051InitPaperView?paperId=SJ000002
							&paperVersionNo=1&mode=8" id="getK050051InitActionUrl"></s:url>
        					<s:a href="%{getK050051InitActionUrl}">试卷查看</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k040051InitConfirmMode?mode =6" id="getK040051InitActionUrl"></s:url>
        					<s:a href="%{getK040051InitActionUrl}">试题预览核对删除</s:a>
						</li>
						
						<li>							
							<s:url action="tt/testing/k060151InitTestPaperCreate?examineId=KS000101" id="initTestCreatedUrl"></s:url>
							<s:a href="%{initTestCreatedUrl}" >考试试卷生成一览</s:a>
						</li>
						<li>
					        <s:a href="tt/testing/k070011_main.jsp">成绩查询</s:a>
						</li>							
						<li>
							<s:url action="tt/testing/k070021InitScoreList?examId=ks100100" id="K070021ActionUrl"></s:url>
        					<s:a href="%{K070021ActionUrl}">成绩一览</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k070031InitScoreDetails?examineId=ks000001" id="initScoreDetailsUrl"></s:url>
        					<s:a href="%{initScoreDetailsUrl}">成绩明细</s:a>
						</li>
						<li>
							<s:url action="tt/testing/k060121InitMarkTaskList?examineId=KS000001" id="loadPageK060121Url"></s:url>
        					<s:a href="%{loadPageK060121Url}">考试评分详细</s:a>
						</li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 教育考试系统-考试 end -->
			<!-- 教育考试系统-培训 start -->
			<div class="span-8 last">
			  <div class="module">
				<div class="module_header">教育考试系统-培训</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="tt/training/" id=""></s:url>
        					<s:a href="">课程新建及权限分配</s:a>
						</li>	
						<li>	
							<s:url action="tt/training/j020021InitAction" id="loadPageJ020021ActionUrl"></s:url>
        					<s:a href="%{loadPageJ020021ActionUrl}">课程检索一览</s:a>
						</li>
						<li>
        					<a href="<%=path %>/tt/training/j020031InitEditMode?paramCourseId=C0000001">课程详细(管理)(编辑模式)</a>
						</li>
						<li>
        					<a href="<%=path %>/tt/training/j020031InitApproveMode?paramCourseId=C0000001">课程详细(管理)(审批模式)</a>
						</li>
						<li>
        					<a href="<%=path %>/tt/training/j020031InitParticipateMode?paramCourseId=C0000001">课程详细(管理)(参与模式)</a>
						</li>
						<li>
							<s:url action="tt/training/j020041InitStudyMode?courseId=01" id="getCourseDetailActionUrl"></s:url>
					        <s:a href="%{getCourseDetailActionUrl}">课程详细（用户）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030011InitNewBookToBookMode?" id="initNewBookToBookUrl"></s:url>
        					<s:a href="%{initNewBookToBookUrl}">教材新建及权限分配(新建1)</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030011InitNewBookToCourse?courseId=KC000001&category1=1&category2=0&category3=0" id="initNewBookToBookUrl"></s:url>
        					<s:a href="%{initNewBookToBookUrl}">教材新建及权限分配(新建2)</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030011InitManageBookToBook?bookId=JC000001" id="initNewBookToBookUrl"></s:url>
        					<s:a href="%{initNewBookToBookUrl}">教材新建及权限分配(修改1)</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030011InitManageBookToCourse?courseId=KC000001&bookId=JC000001&category1=1&category2=0&category3=0" id="initNewBookToBookUrl"></s:url>
        					<s:a href="%{initNewBookToBookUrl}">教材新建及权限分配(修改2)</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030021InitAddMode?methodName=doit&courseId=KC000001&sltCategory1=1&sltCategory2=1&sltCategory3=0" id="initBookListAction1Url"></s:url>
							<s:a href="%{initBookListAction1Url}" >教材一览（追加模式）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030021InitShowListMode?callScreenId=J030031" id="initBookListAction2Url"></s:url>
							<s:a href="%{initBookListAction2Url}" >教材一览（一览模式）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030031InitUserBrowseMode?bookId=JC000001&courseId=KC001" id="initBookDetailsMode1ActionUrl"></s:url>
        					<s:a href="%{initBookDetailsMode1ActionUrl}">教材详细一览（用户一览）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030031InitManageMode?bookId=JC000001" id="initBookDetailsMode2ActionUrl"></s:url>
        					<s:a href="%{initBookDetailsMode2ActionUrl}">教材详细一览（管理一览）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030031InitApproveMode?bookId=JC000001" id="initBookDetailsMode3ActionUrl"></s:url>
        					<s:a href="%{initBookDetailsMode3ActionUrl}">教材详细一览（审批模式）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030031InitDeleteMode?bookId=JC000001" id="initBookDetailsMode4ActionUrl"></s:url>
        					<s:a href="%{initBookDetailsMode4ActionUrl}">教材详细一览（删除模式）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030041InitBookDetails?bookInfo.bookId=JC000001" id="initBookDetailsMActionUrl"></s:url>
							<s:a href="%{initBookDetailsMActionUrl}" >教材详细编辑</s:a>
						</li>
						<li>
							<s:url action="tt/training/" id=""></s:url>
        					<s:a href="">教材内容编辑</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030061GetChapterInfos?bookId=10000000&editNo=1" id="initChapterInfosActionUrl"></s:url>
							<s:a href="%{initChapterInfosActionUrl}" >章节编辑</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030071InitByBookmarkerMode?editNo=2&chapterNo=2&bookId=JC000001" id="initBookContent"></s:url>
        					<s:a href="%{initBookContent}">教材内容浏览</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030081InitAddVideo?objectId=JC000001&editNo=1&mode=1" id="initAddVideoActionUrl"></s:url>
        					<s:a href="%{initAddVideoActionUrl}">插入视频（教材）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030081InitAddVideo?objectId=TK000001" id="initAddVideoActionUrl"></s:url>
        					<s:a href="%{initAddVideoActionUrl}">插入视频（题库）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030091InitAddPhoto?objectId=JC000001&editNo=1&mode=1" id="initAddPhotoActionUrl"></s:url>
        					<s:a href="%{initAddPhotoActionUrl}">插入图片（教材）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030091InitAddPhoto?objectId=TK000001&mode=2" id="initAddPhotoActionUrl"></s:url>
        					<s:a href="%{initAddPhotoActionUrl}">插入图片（题库）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030121InitAddPractice?bookId=JC000001&editNo=1" id="initAddPractiseActionUrl"></s:url>
        					<s:a href="%{initAddPractiseActionUrl}">插入练习</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030131InitAddFile?objectId=JC000001&editNo=1&mode=1" id="initAddFileActionUrl"></s:url>
        					<s:a href="%{initAddFileActionUrl}">插入下载文件（教材）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030131InitAddFile?objectId=TK000001&mode=2" id="initAddFileActionUrl"></s:url>
        					<s:a href="%{initAddFileActionUrl}">插入下载文件（题库）</s:a>
						</li>
						<li>
							<s:url action="tt/training/j030141InitModifyHistory" id="initModifyHistoryActionUrl"></s:url>
							<s:a href="%{initModifyHistoryActionUrl}" >教材变更履历</s:a>
						</li>	
					</ul>
				</div>
			  </div>

			</div>
			<!-- 教育考试系统-培训 end -->
			
		</div>
		<div class="span-24 margin_top_6">
			<!-- 教育考试系统-共通 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">教育考试系统-共通</div>
				<div class="module_body">
					<ul>
						<li></li>
						<li></li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 教育考试系统-共通 end -->
			<!-- 共通组件 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">共通组件</div>
				<div class="module_body">
					<ul>
						<li><a href="/YDSWEB/config-browser/index.action">查看Struts2的配置情况 config-browser</a></li>
						<li><a href="file://furama/マイ　プロジェクト/SSICommon/20_规约/开发导航.html">开发导航</a></li>
						<li><a href="./manual/doc.html">共通组件手册</a></li>
						<li><a href="./sample/css_sample.html">CSS框架布局各种组合情况示例(可以参照)</a></li>
						<li><a href="./sample/css_sprite.html">CSS小图标对照一览及使用说明</a></li>
						<li>
							<s:url action="sample/pagerSampleMainAction" id="pagerSampleMainActionUrl"></s:url>
        					<s:a href="%{pagerSampleMainActionUrl}">分页共通</s:a>
						</li>
						<li>
							<s:url action="sample/getSelectListAction" id="getSelectListActionUrl"></s:url>
       				 		<s:a href="%{getSelectListActionUrl}">下拉列表联动</s:a>
						</li>
						<li>
       				 		<a href="sample/workflow.action">工作流测试</a> （请参照代码打开部分注释进行测试）
						</li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 共通组件 end -->
			<!-- 共通sample start -->
			<div class="span-7 last">
			  <div class="module">
				<div class="module_header">共通sample</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="sample/getDeptInfosSampleAction" id="getDeptInfosSampleActionUrl"></s:url>
       				 		<s:a href="%{getDeptInfosSampleActionUrl}">页面按钮显示与否Sample</s:a>
						</li>
						<li>
       				 		<a href="sample/userSelectDialogSample.jsp">人员选择页面Sample(Dialog方式)</a>
						</li>
						<li>
       				 		<a href="sample/userSelectOpenSample.jsp">人员选择页面Sample(window.open方式)</a>
						</li>
						<li>
       				 		<a href="sample/checkboxSample.action">checkbox Sample</a>
						</li>
						<li>
       				 		<a href="sample/useMgrTest.html">用户权限管理(树、拖动)Sample</a>
						</li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 共通sample end -->
		</div>
		<!-- div 考试系统 end -->

		<!-- div 社内网 start -->
		<div class="span-24 margin_top_6">
			<!-- 员工管理 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">员工管理</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="employee/yb0010Init" id="yb0010InitUrl"></s:url>
        					<s:a href="%{yb0010InitUrl}">员工信息管理</s:a>
        				</li>
        				<li>
							<s:url action="employee/yb9010Init" id="yb9010InitUrl"></s:url>
        					<s:a href="%{yb9010InitUrl}">员工选择</s:a>
        				</li>         				
						<li>
							<s:url action="employee/yb0020RegInit?mode=4" id="yb0020RegInitUrl"></s:url>
        					<s:a href="%{yb0020RegInitUrl}">员工信息登记</s:a>
        				</li>
						<li><s:url action="employee/yb0030Init" id="yb0030InitUrl1" >
						<s:param name="modeFlg" value="%{'1'}"></s:param>
						</s:url>
        					<s:a href="%{initEmpStateActionUrl1}">员工状态设定</s:a> 
        				</li>
						<li>
							<s:url action="employee/yb0030Init" id="yb0030InitUrl2" >
							<s:param name="empId" value="%{'200503'}"></s:param>
							<s:param name="empNm" value="%{'孟庆阳'}"></s:param>
							<s:param name="modeFlg" value="%{'2'}"></s:param>
							<s:param name="empInfoUpdTime" value="%{'1274947967000'}"></s:param>
        					</s:url>
        					<s:a href="%{yb0030InitUrl2}">员工状态设定带参数打开</s:a>
						</li>
						<li>
							<s:url action="employee/yb0060Init" id="yb0060InitUrl"></s:url>
        					<s:a href="%{yb0060InitUrl}">职位信息维护</s:a>
        				</li>
						<li>
						<s:url action="employee/yb0051Init" id="yb0051InitUrl"></s:url>
        					<s:a href="%{yb0051InitUrl}">部门信息</s:a>
						</li>
						<li>
							<s:url action="employee/yb0070TeamInfoListInit" id="yb0070TeamInfoListInitUrl"></s:url>
        					<s:a href="%{yb0070TeamInfoListInitUrl}">组管理一览</s:a>
						</li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 人员管理 end -->
			<!-- 权限管理 start -->
			<div class="span-8">
			  <div class="module">
				<div class="module_header">权限管理</div>
				<div class="module_body">
					<ul>
						<li>
							<s:url action="perm/ya0010Init" id="ya0010InitUrl"></s:url>
        					<s:a href="%{ya0010InitUrl}">01 职位角色管理</s:a>
						</li>
						<li>
							<s:url action="perm/ya0030Init" id="ya0030InitUrl"></s:url>
        					<s:a href="%{ya0030InitUrl}">03 角色管理</s:a>
						</li>
						<li>
							<s:url action="perm/ya0050Init" id="ya0050InitUrl"></s:url>
        					<s:a href="%{ya0050InitUrl}">05  权限查询</s:a>
						</li>
						<li>
							<s:url action="common/logSearchAction" id="getLogSearchInfosUrl"></s:url>
        					<s:a href="%{getLogSearchInfosUrl}">07 系统日志检索</s:a>
						</li>
						<li>
							<s:url action="perm/ya0040Init" id="ya0040InitUrl"></s:url>
        					<s:a href="%{ya0040InitUrl}">04 用户角色管理</s:a>
						</li>
					</ul>
				</div>
			  </div>
			</div>
			<!-- 权限管理 end -->
			<!-- 会议室管理 start -->
			<div class="span-7 last">
			  <div class="module">
				<div class="module_header">会议室管理</div>
				<div class="module_body">
					<ul>
						<li>
        					<s:a href="meet/yc0010Init">会议室管理</s:a>
        				</li>
        				<li>
							<s:url action="meet/yc0020SystemTimeinit" id="yc0020SystemTimeinitUrl"></s:url>
        					<s:a href="%{yc0020SystemTimeinitUrl}">会议室预约一览</s:a>
						</li>
						<li>
							<s:url action="meet/yc0030Init?fromId=01&yc0030MetInfo.startDate=2010-12-13&yc0030MetInfo.startHour=13&yc0030MetInfo.startMinute=00&yc0030MetInfo.metId=1&yc0030MetInfo.reserveType=0&viewMode=0" id="getModifyInitUrl"></s:url>
        					<s:a href="%{getModifyInitUrl}">会议室预约详细</s:a>
						</li>        									
						<li>
							<s:url action="meet/yc0040Init" id="yc0040InitActionUrl">
								<s:param name="metId"  value="1"></s:param>
								<s:param name="metDate" >2010-07-28</s:param>
							</s:url>
        					<s:a href="%{yc0040InitActionUrl}">会议室预约情况</s:a>
        				</li>							
					</ul>
				</div>
			  </div>
			</div>
			<!-- 项目管理 end -->
			<!-- 考勤系统 start -->
			<div class="span-7 last">
			  <div class="module">
				<div class="module_header">考勤系统管理</div>
				<div class="module_body">
					<ul>
						<li>
        					<s:a href="att/ye0010Init">个人考勤信息</s:a>
        				</li> 						
					</ul>
				</div>
			  </div>
			</div>
			<!-- 考勤系统end -->
		</div>
		<!-- div 社内网 end -->

		<div class="span-24">
			<p class="color_red"><s:debug></s:debug></p>
		</div>
	</div>
</div>
</body>
</html>
