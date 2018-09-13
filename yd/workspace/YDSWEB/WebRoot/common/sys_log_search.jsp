<%--
 * @(#)sys_log_search.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
--%>

<%--
 * 系统日志检索画面
 * 
 * @author xupai
 * @version 1.00 2010/02/08
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
<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath %>js/common/sysLogSearch.js"></script>

<title>系统日志检索</title>

</head>
<body>
<jsp:include page="../common/commonPage.jsp"></jsp:include>

<div id="all" class="ydscontainer">
	<s:form id="logSearchInfoForm" action="logSearchInfoAction" namespace="/common" method="post" validate="true" >
		<div id="errorMessage" class="prepend-2 span-22 none">
			<s:fielderror></s:fielderror>
		</div>
		<div class="span-24">
		    <div class="span-7">
		        <div class="span-2 text_right">
		        	<s:label id="levelInfo"	value="日志等级" />
		        </div>
		        <s:select id="levelInfo" name="sysLogInfo.logLevel" cssClass="span-2" list="levelInfo" listValue="diffName" listKey="diffNo" headerKey="0" />
		    </div>
		    <div class="span-9">
			    <div class="span-1 text_right">
			    	<s:label id="subInfo" value="机能" />
			    </div>		    
		    	<s:select id="subInfo"	name="sysLogInfo.subId" cssClass="span-4" list="subInfo" listValue="diffName" listKey="diffNo" headerKey="0" /> 
			</div>
		    <div class="span-7">
		        <div class="span-2 text_right"><s:label value="被操作者ID" /></div>
		        <s:textfield id="userId" name="sysLogInfo.userId" cssClass="span-2" maxlength="6" onchange="getUserId()" />
			</div>
		</div>
		<div class="span-24">
		    <div class="span-6">
				<div class="span-2 text_right"><s:label value="操作人ID" />
				</div>
				<s:textfield id="opId" name="sysLogInfo.opId" cssClass="span-2"
					maxlength="6" onchange="getOpId()" />
			</div>
			<div class="span-14 last">
				<div class="span-2 text_right"><s:label value="操作时间" /></div>
				<s:textfield id="fromTime" name="sysLogInfo.fromTime" cssClass="span-3" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" /> 
				<s:label value="～" /> 
				<s:textfield id="toTime" name="sysLogInfo.toTime" cssClass="span-3" label="～To" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" />
			</div>
		</div>
	
		<div class="span-24 margin_top_4">
			<div class="span-6">
				<div class="span-2 text_right">
					<s:label value="操作人IP" />
				</div>
				<s:textfield id="logIp" name="sysLogInfo.logIp" cssClass="span-3" maxlength="15" />
			</div>
			<div class="span-10">
				<div class="span-2 text_right ">
					<s:label value="日志内容" />
				</div>
				<s:textfield id="logMsg"  name="sysLogInfo.logMsg"  cssClass="span-7" maxlength="30" />	    			
			</div>
			<div class="span-4 margin_bottom_2">		
				<s:checkbox	name="sysLogInfo.checkFlg" /> 
				<s:label value="使用正则（IP和内容）" />
			</div>	
			<div class="span-4 text_right last">
				<input type="button" id="serch" value="查询" class="btn span-2" onclick="search()" />
			</div>
		</div>	
	</s:form>	

	<!-- 分割线  -->
	<div class="span-24 separator"></div>
	<div class="span-24 margin_top_6" id="table_List">
		<s:include value="log_search_table.jsp" />
	</div>
</div>
</body>
</html>
