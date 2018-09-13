<%--
 * @(#)J030021_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 教育考试系统
--%>
 
 <%--
 * 教材一览画面（主页面JSP）
 * 
 * @author sundefu
 * @version 1.00 2010/03/15
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030021.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<title>教材一览</title>
</head>

<body onload="initForm()" style="overflow-x:hidden;overflow-y:auto;">
<div id="div_dept_main"  class="container showgrid">
<s:if test="mode == 2">
	<s:include value="../manager/head.jsp" />
</s:if>
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
<s:if test="mode == 2">
	<s:include value="../manager/navigator.jsp" />
</s:if>
	<!-- title -->
    <div class="span-24 padding_top_8 title_tt">
   		<h2>教材一览</h2>
    </div>
	<div onclick="resize()">
		<div class="icon font_weight_b">
			<a id="bookInfoIcon" class="img_opt opt_FillDown"></a>
			<span >检索条件</span>
		</div>
	</div>
		<%-- 生成校验js action="j030021GetBookList" method="post" namespace="/tt/training" validate="true" --%>
		<%-- 正式运行用   action="" method="post"  --%>
		<s:form id="searchForm"  action="j030021GetBookList" method="post"  validate="true">
		<s:hidden id="mode" name="mode"/>
		<s:hidden id="oldParam" name="oldParam" value=""/>
			<div class="span-23" id="bookInfo_basic" >
               <div class="span-23">
                   <!-- 教材ID -->
                   <div class="span-2 text_right">教材ID：</div>
                   <div class="span-2"><s:textfield id="bookId" name="j030021Info.bookId" cssClass="span-2 im_disabled" maxlength="8"/></div>
                   <!-- 教材名称 -->
                   <div class="span-2 text_right">教材名称：</div>
                   <div class="span-4"><s:textfield id="bookName" name="j030021Info.bookName" cssClass="span-4" maxlength="100"/></div>
                   <!-- 创建者 -->
				 	<div class="span-6">
						<div class="span-2 text_right"><s:label value="创建者：" /></div>
					    <s:textfield id="createUserId" name="j030021Info.createUserId"
									maxlength="6" cssClass="span-2 im_disabled" />
						<s:textfield id="createUserName" name="j030021Info.createUserName" cssClass="span-2" />
					</div>                  
                   <!-- 创建日期 -->
                   <%--  画面风格统一要求剔除此检索条件sundefu2010/08/17 comment
                   <div class="span-2 text_right">创建日期：</div>
		  		   <div class="span-5 last">
		  				<s:textfield id="createTimeFrom" name="j030021Info.createTimeFrom"
		 					maxlength="10" onclick="WdatePicker()" cssClass="span-2"/> 
						～
						<s:textfield id="createTimeTo" name="j030021Info.createTimeTo"
		 					maxlength="10" onclick="WdatePicker()" cssClass="span-2"/>
				   </div>
				   --%>
					<!-- 更新者 画面风格统一sundefu2010/08/17 add-->
					<div class="span-6">
						<div class="span-2 text_right"><s:label value="更新者：" /></div>
							<s:textfield id="updateUserId" name="j030021Info.updateUserId"
								maxlength="6" cssClass="span-2 im_disabled" />
							<s:textfield id="updateUserName" name="j030021Info.updateUserName" cssClass="span-2" />
						</div>
               		</div>
               <div class="span-23">
               		<div class="span-4">
						<div class="span-2 text_right">教材状态：</div>
						<s:if test="mode==2">
							<s:select id="sltBookStatusList" name="j030021Info.bookStatus" list="bookStatusList" listKey="diffNo" listValue="diffName" cssClass="span-2"/>
						</s:if>
						<s:else>
							<div class="span-2 text_left">已发布</div>
						</s:else>
					</div>
					
                   <!-- 教材分类 -->
                   <div class="span-2 text_right">教材分类：</div>
		 			<div id="select_div" class="span-10">
						<div class="span-3">
							<select id="sltCategory11" type="category1Id" Class="span-3" defaultValue="${sltCategory1}" accesskey="${sltCategory11Enable}" ></select>
						</div>
						<div class="span-3">
							<select id="sltCategory21" type="category2Id" Class="span-3" defaultValue="${sltCategory2}" accesskey="${sltCategory21Enable}" ></select>
						</div>
						<div class="span-3">
							<select id="sltCategory31" type="category3Id" Class="span-3" defaultValue="${sltCategory3}" accesskey="${sltCategory31Enable}" ></select>
						</div>
					</div>

                    <div class="span-5 last">
	                   <div class="span-2 text_right">
	                   		<input type="button" id="doSearch" name="doSearch" value="检索" onclick="getBookList()" class="span-2 btn"/>
	                   </div>
	                   <div class="span-2">
	                   		<input type="button" id="clear" name="clear" value="清空" onclick="clearAll()" class="span-2 btn"/>
	                   </div>
                   </div>
               </div>
			</div>
			</s:form>
		<div id="div_pagerCommonAjax" class="span-23 prepend-h">
			<s:include value="j030021_list.jsp" />
		</div>
   	</div>
	</div>
<s:if test="mode == 2">
	<s:include value="../manager/foot.jsp" />
</s:if>
	</div>
</body>
</html>
