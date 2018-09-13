<%--
 * @(#)J020041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程详细（用户）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/03/23
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
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j020041.js"></script>
	
	<title>课程详细（用户）</title>
</head>
<body onload="regBtnFunc()">
	<div class="container">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />
	<div id ="divJ020041" class = "container showgrid">
		<div class="span-24 padding_top_8 title_tt"><h2>课程详细</h2></div>
		<s:form id = "j020041form" action = "" method = "post" >
			<div class ="span-24">
				<div class = "span-23 text_left">
					<div class ="span-3 text_right">是否必修:</div>
					<div class ="span-14"><s:property value = "courseUserInfo.necessaryName"/></div>
					<s:if test="modelId == 8">
					<s:if test= "courseUserInfo.necessaryFlag == 1">
					</s:if><s:else>
						<div class = "span-3 text_left"><s:label value = "对此课程的关注度:"/></div>
						<div class ="span-2 text_left">
						<s:select id="attentionList.diffNo" name="courseAttention.attentionFlag" list="attentionList"
							listKey="%{diffNo}" listValue="%{diffName}" cssClass="span-2" onchange ="changeAttention()"/>
					    </div>					
					</s:else>
				    </s:if>
				</div>
				<div class="span-24 margin_top_6" >
					<div class="span-3 text_right"><s:label value = "课程名称:"/></div>
					<s:property value = "courseUserInfo.courseName"/>
					<s:hidden id = "courseId" value ="%{courseId}"/>
					<s:hidden id = "coursePublishStatus" name = "courseUserInfo.coursePublishStatus"/>
				</div>
				<div class="span-24 margin_top_6" >
					<div class="span-3 text_right"><s:label value = "课程简介:"/></div>
      				<div class="span-21 last"><s:textarea id="courseAbstract" name="courseUserInfo.courseAbstract" cssClass="span-12" rows="4" readonly="true"/></div>
				</div>
				<div class="span-24 margin_top_6" >
					<div class="span-3 text_right"><s:label value = "课程分类:"/></div>
					<s:property value = "courseUserInfo.categoryName"/>
				</div>
				<div class="span-24 margin_top_6" >
					<div class="span-3 text_right"><s:label value = "编辑人员:"/></div>
					<s:property value = "editPer"/>
				</div>
				<div class="span-24 margin_top_6" >
					<div class="span-3 text_right"><s:label value = "发布者:"/></div>
					<s:property value = "courseUserInfo.publishUserName"/>
				</div>															
			</div>
			<div class = "span-23  margin_top_6 prepend-h">
				<div class = "span-23">
					<s:label value = "所选教材一览"/>
				</div>
				<div class = "span-23 margin_top_6">
					<table class="datagridtt span-23">
						<tr>
							<th class="percent_8">教材ID</th>
							<th class="percent_16">教材名</th>
							<th class="percent_16">教材分类</th>
							<th class="percent_20">发布日期</th>
							<th class="percent_12">创建者</th>
							<th class="percent_20">来源</th>
							<th class="percent_8">操作</th>						
						</tr>
					</table>
				</div>
				<div class = "overflow_scr_y span-23 h_300">
					<table class = "span-23 datagridtt ellipsis">
						<s:if test="bookInfoList.size > 0">
							<s:iterator value = "bookInfoList">
								<tr>
									<td class="percent_8 text_center">
										<s:if test="modelId == 8">
											<s:a href = "#" onclick="window.open('j030031InitUserBrowseMode.action?bookId=%{bookId}')"><s:property value = "bookId"/></s:a>
										</s:if>
										<s:else>
											<s:a href = "#" onclick="window.open('j030031InitManageMode.action?bookId=%{bookId}')"><s:property value = "bookId"/></s:a>
										</s:else>
									</td>
									<td class="percent_16 text_left">
										<s:label title="%{bookName}" name="bookName"/>
									</td>									
									<td class="percent_16 text_left">
										<s:label title="%{categoryName}" name="categoryName"/>
									</td>									
									<td class="percent_20 text_center">
										<s:property value = "approverTime"/>
									</td>
									<td class="percent_12 text_center">
										<s:property value = "createUserName"/>
									</td>
									<td class="percent_20 text_left">
										<s:property value = "source"/>
									</td>
									<td class="percent_8 text_center">
										<s:if test="chapterNoFlag == 0">
											<s:label value="阅读"/>
										</s:if>
										<s:else>
											<s:a href="#" onclick="window.open('j030071InitByBookmarkerMode.action?bookId=%{bookId}')">阅读</s:a>
										</s:else>
									</td>																											
								</tr>
							</s:iterator>
						</s:if>
					</table>
				</div>
			</div>
		</s:form>
		<div class="span-23 margin_top_6 text_right prepend-h">
			<s:if test="modelId == 3">
				<input type="button" id="courseDel" name="courseDel" value="删除" class="btn span-2" onclick="courseDel()" /> 
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