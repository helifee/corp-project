<%--
 * @(#)j30041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 教材详细编辑画面
 * 
 * @author zhanghaibo
 * @version 2.00 2010/04/20
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
<title>教材详细编辑</title>
<!--[if IE]>
		<link rel="stylesheet" href="../../css/ie.css" type="text/css" media="screen, projection" />
	<![endif]-->
<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/ttTraining/j030041.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/JsFileUpload.js"></script>
</head>

<body onload="initForm()">
<%-- 生成校验js action="updBookInfoAction" method="post" namespace="/tt/training" validate="true" --%>
<%-- 正式运行用   id="mainForm" method="post"  --%>
<div id="div_ttTraining_bookDetailsMMain" class="container showgrid">
<input type="hidden" id="basePath" value="<%=basePath%>" />
<s:include value="%{basePath}/tt/manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="%{basePath}/tt/manager/navigator.jsp" />
	<s:form id="mainForm" method="post" >
		<div class="span-24"><!-- title -->
			<div class="padding_top_8 title_tt span-24">
				<h2>教材详细编辑</h2>
			</div>
			<!-- 状态 -->
			<div class="span-2 text_right">
				<s:label value="教材状态：" />
			</div>
			<div id="bookInfo" class="span-2 prepend-1">
				<s:property value="bookInfo.statusName"/>
				<s:hidden id="bookStatus" name="bookInfo.bookStatus" />
				<s:hidden name="bookInfo.statusName"/>
				<s:hidden id="bookCover" name="bookInfo.bookCover"/>
				<s:hidden id="bookName" name="bookInfo.bookName"/>
			</div>
			<div id="div_training_refuseReason" class="span-19 last">
				<div class="span-3 text_right">
					<s:label value="不批准理由："/>
				</div>
				<div class="span-16 last">
					<s:property value="bookInfo.refuseReason"/>
					<s:hidden name="bookInfo.refuseReason"/>
				</div>
			</div>
		</div>

		<div class="span-24 ">
			<div class="span-6">
				<div id="div_ttTraining_bookDetailsMCover" class="span-6 text_center last" >
			    	<img id="bookCovImg" class="span-5 ttImg" src="<%=basePath%>tt/manager/getFile.action?flag=BOOK_IMAGE&fileName=${bookInfo.bookCover}"/>
			    </div>
		   		<div >
		   			<input type="file" id="bookCoverImg" name="upload"  class="jsFileInput cur_pointer" />
		   		</div>
		   		<div class="span-6 text_center last">
			        <input id="filetext" name="ff" class="span-3" readonly />
			        <input id="btnUpload" class="span-2 btn" type="button" value="浏览"  />
			        <s:label id="uploadWaitInfo" value="上传中，请等待……" cssClass="span-4" />
		     	</div>
			</div>
			<!-- 教材基本信息 -->
			<div class="span-18 last">
				<div class="span-2 text_right">
					<s:label value="教材ID：" />
				</div>
				<div class="span-15 last">
					<s:property value="bookInfo.bookId"/>
					<s:hidden id="bookId" name="bookInfo.bookId"/>
					<s:hidden id="editNo" name="bookInfo.editNo"/>
				</div>
			</div>
			<div class="span-18 last">
				<div class="span-2 text_right">
					<s:label value="教材名称：" />
				</div>
				<div class="span-6">
					<s:textfield id="beditBookName" name="bookInfo.bookName" 
						maxlength="100" cssClass="span-6" />
				</div>
				<div class="span-2 text_right">
					<s:label value="关键字：" />
				</div>
				<div class="span-7 last">
					<s:textfield id="beditKeyWord" name="bookInfo.keyword"
						 maxlength="100" cssClass="span-7" />
			 	</div>
			</div>
			<div class="span-18  last">
				<div class="span-2 text_right">
					<s:label value="预备知识：" />
				</div>
				<div class="span-6">
					<s:textfield id="beditPreKnowledge" name="bookInfo.preKnowledge" 
						maxlength="200" cssClass="span-6" />
				</div>
				<div class="span-2 text_right">
					<s:label value="来源：" />
				</div>
				<div class="span-7 last">
					<s:textfield id="beditSource" name="bookInfo.source" 
						maxlength="200" cssClass="span-7" />
				</div>
			</div>
			<div class="span-18  last">
				<div class="span-2 text_right">
					<s:label value="适用人群：" />
				</div>
				<div class="span-6">
					<s:textfield id="beditApplyTo" name="bookInfo.applyto" 
						maxlength="200" cssClass="span-6" />
				</div>
				<div class="span-2 text_right">
					<s:label value="教材分类：" />
				</div>
				<div class="span-7 last">
					<s:property value="bookInfo.category"/>
					<s:hidden name="bookInfo.category"/>
				</div>
			</div>
			<div class="span-18  last">
				<div class="span-2 text_right">
					<s:label value="概述：" />
				</div>
				<div class="span-16 last">
					<s:textarea id="beditAbstract" name="bookInfo.bookAbstract" 
						cssClass="span-15" rows="4"/>
				</div>
			</div>
	
		</div>
	
		<!-- 教材内容区域 -->
		<div class="module  span-24" id="module_1">
			<div class="module_header  " onclick="resize()">
				<div class="icon">
					<a id="beditIcon" class="img_opt opt_FillDown"></a> 
					<span id="beditModTitle">
						<s:label value="教材内容" />
					</span>
				</div>
			</div>
			<div class="module_body" id="div_ttTraining_bookDetailsMView">
			<div class="module_div" id="module_1_ul">
				<div class="span-24 margin_top_6">
					<input id="btnChapEdit" class="span-2 btn" type="button" value="章节编辑"
					onclick="window.open('j030061GetChapterInfos.action?bookId=${bookInfo.bookId}&editNo=${bookInfo.editNo}');" />
				</div>
				<div id="div_chapterList" class="span-24 treenav">
					<s:include value="j030041_chapter_list.jsp" />
				</div>
			</div>
			</div>
		</div>
		<div class="span-24 text_right margin_top_6">
			<div class="span-22">
				<input class="span-2 btn" id="btnSave" type="button" 
				 	value="保存" onclick="save()" />
			</div>
			<div class="span-2 last">
				<input class="span-2 btn" id="btnSubmit"type="button"
					value="提交审批" onclick="sendToApproval()" /> 
				<input class="span-2 btn" id="btnReset" type="button" 
					value="再编辑 " onclick="reEdit()" />
			</div>
		</div>
	</s:form>
<div class="prepend-2">
<s:fielderror></s:fielderror>
</div>
<div class="clear_both"></div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>