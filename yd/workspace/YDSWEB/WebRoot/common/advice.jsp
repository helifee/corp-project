<%--
 * @(#)advice.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东计算机社内网
 *    SubSystem: 共通
--%>

<%--
 * 意见反馈页面
 * 
 * @author qianguorong
 * @version 1.00 2010/08/05
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
		
		<!-- 画面用js -->
		<script type="text/javascript" src="<%=basePath %>js/common/advice.js"></script>
    
    	<title>意见反馈 - 远东公司内部网</title>
    </head>
    <body>
	<div class="ydscontainer">
		<div class="span-24 padding_top_8 title">
			<h2>意见反馈</h2>
		</div>		
		<s:form id="myForm" validate="true" action="">
		 	<s:hidden id="subSys" name="subSys" />
		 	<s:hidden id="pageId" name="pageId" />
		 	<s:hidden id="comAdvice.pageLink" name="comAdvice.pageLink" /><!--
		    <!-- 当前链接-->
		    <!--
		    <div class="span-24 ">
		        <div class="span-3  text_right">
					<s:label value="当前链接：" />	
		        </div>
		        <div class="span-12 append-8 text_left">
		        <s:textfield id="comAdvice.pageLink" name="comAdvice.pageLink"  cssClass="span-10" readonly="true"/>
		        </div>
		    </div>
			-->
			
			<!-- 类型-->
		    <div class="span-24 ">
		        <div class="span-3 text_right">
					<s:label value="类型：" />
		        </div>
		        <div class="span-12 append-8 text_left">
					<s:select name="comAdvice.advType" list="#{'1':'建议','2':'错误','3':'其他'}" listKey="key" listValue="value"/>
		        </div>
		    </div>
		    
			<!-- 标题-->
		    <div class="span-24 ">
		        <div class="span-3 text_right">
					<s:label value="标题：" />
		        </div>
		        <div class="span-12 append-8 text_left">
		        <s:textfield id="comAdvice.advTitle" name="comAdvice.advTitle" maxlength="50" cssClass="span-10"/>
		        </div>
		    </div>
		    
		    <!-- 内容-->
		    <div class="span-24 ">
		        <div class="span-3 text_right">
					<s:label value="内容：" />	        	        
		        </div>
		        <div class="span-12 append-8 text_left">
		      	<s:textarea id="comAdvice.advContent" name="comAdvice.advContent" rows="4" cols="50" cssClass="span-10"/>
		        </div>
		    </div>
		    
		    <!-- 按钮-->
		    <div class="span-24 margin_top_6">
				<div class="span-3 text_right">&nbsp;</div>
		        <div class="span-12 append-8 text_left">
					<input type="button" id="btnOK" name="refer" value="提交" class="span-2 btn"
						onclick="submitAdvice();"/>	 
		        </div>
			</div>
		</s:form>
    </div>
    </body>
</html>