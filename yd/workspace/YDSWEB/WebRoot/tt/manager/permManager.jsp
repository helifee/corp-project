<%--
 * @(#)permManager.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 超级管理员登录画面
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
	<div id="adminLoginDiv">
        <s:form id="adminLoginForm" action="adminLogin" method="post" >
	        <!-- 超级管理员帐号 -->
	        <div class="span-9 last margin_top_6">
	            <div class="prepend-1 span-3"><s:label id="adminidLbl" value="超级管理员帐号："/></div>
	            <div class="span-4 append-1 last"><s:textfield id="adminId" name="adminInfo.adminId" cssClass="span-4"/></div>
	        </div>
	    	<!-- 超级管理员密码 -->
	        <div class="span-9 last">
	            <div class="prepend-1 span-3"><s:label id="adminpwLbl" value="超级管理员密码："/></div>
	            <div class="span-4 append-1 last"><s:password id="adminPw" name="adminInfo.adminPw" cssClass="span-4"/></div>
	        </div>
	    	<!-- 登录，取消按钮 -->
	        <div class="span-9 last margin_top_6">
	        	<div class="prepend-3 span-2">
	        		<input type="button" id="submitBtn" name="submitBtn" 
	        				class="span-2 btn" value="登录" onclick="submitDiv2()">
	            </div>
	        	<div class="span-2 prepend-1 last">
	            	<input type="button" id="cancelBtn" name="cancelBtn" 
	            			class="span-2 btn" value="取消" onclick="closeDiv2()">
	            </div>
	        </div>
	        <div id="errormsgDiv" class="span-9 text_center color_red last margin_top_4">
	        	<s:property value="errormsg"/>
				<s:fielderror />
       		</div>
        </s:form>
	</div>
