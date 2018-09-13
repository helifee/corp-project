<%--
 * @(#)comAdvice.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东计算机社内网
 *    SubSystem: 共通
--%>

<%--
 * 意见反馈页面(共通)
 * 
 * @author zhangzheng
 * @version 1.00 2010/09/26
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/META-INF/struts-tags.tld"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>意见反馈</title>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">	

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/common/formValidation.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/common/advice.js"></script>

</head>
<body onload="init();">
<div class="span-16 last padding_top_10 padding_bottom_10">
	<form name="adviceForm" id="adviceForm" method="post">
		<s:hidden id="operateTip" value=""></s:hidden>
		<div class="span-16 last margin_top_6">
			<div class="span-2 text_right">标题</div>
			<div class="span-13 last">
				<s:textfield name="comAdvice.advTitle" size="80" maxlength="50" class="span-13 position_abs"/>
			</div>
		</div>
		<div class="span-16 last margin_top_6">
			<div class="span-2 text_right">画面</div>
			<div class="span-13 last">
				<s:radio name="comAdvice.pageLink" list="#{'1':'当前页面','2':'网站'}" listKey="key" listValue="value" value="1"/>
				<s:hidden id="subSys" name="subSys" />
				<s:hidden id="pageId" name="pageId" />
			</div>
		</div>
		<div class="span-16 last margin_top_6">
			<div class="span-2 text_right">类型</div>
			<div class="span-13 last">
				<s:radio name="comAdvice.advType" list="#{'1':'建议','2':'错误','3':'其他'}" listKey="key" listValue="value" value="1"/>
			</div>
		</div>
		<div class="span-16 last margin_top_6">
			<div class="span-2 text_right">内容</div>
			<div class="span-13 last">
				<s:textarea id="comAdvice.advContent" name="comAdvice.advContent" rows="15" cols="150" cssClass="span-13 last"/>
			</div>
		</div>
		<div class="span-16 last margin_top_8">
			<div class="span-6">&nbsp;</div>
			<div class="span-5 last">
				<input type="button" onclick="doSubmit();" value="提交" class="span-2 btn"/>
				<input type="button" onclick="doCancel();" value="取消" class="span-2 btn"/>
			</div>
		</div>
	</form>
</div>
</body>
</html>