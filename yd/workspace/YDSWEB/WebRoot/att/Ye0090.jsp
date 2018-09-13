<%--
 * @(#)Ye0090.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 考勤月报画面（主页面JSP）
 * 
 * @author zhangdaoqiang
 * @version 1.00 2011/01/07
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/ydsTree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/sortTable.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0090.js"></script>
	
	<title>考勤月报</title>
</head>
<body onload="init()">
<div id="div_emp_main"  class="ydscontainer">

	<!-- 分割线  -->
	<div class="span-24 separator"></div>
	
	<div class="span-24 text_right">
		<div class="span-2 text_right">
			<s:label value="年月"/>
		</div>
        <div class="span-3 text_left">
        	<s:textfield id="yearmonth" name="yearmonth" maxLength="10" cssClass="span-3" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
        	<input style="display:none">
        </div>
        <div class="span-2">
        	<input type="button" id="dosubmit" name="dosubmit" class="btn span-2" value="月报生成" onclick="" />
        </div>
        
		<input type="button" id="kaoqinbu" name="createBtn" value="考勤不完整一览" class="btn span-3" onclick="lostClick()"/>
		<input type="button" id="kaoqin" name="createBtn" value="考勤月报" class="btn span-2" onclick="kaoqinClick()" />
		<input type="button" id="jiaban" name="createBtn" value="加班月报" class="btn span-2" onclick="jiabanClick()" />
	</div>
	
	<!--考勤不完整一览画面 -->
	<div id="div_kaoqinbuwanzheng">
		<s:include value="Ye0091.jsp" />
	</div>
	
	<!--考勤月报画面 -->
	<div id="div_kaoqin">
		<s:include value="Ye0092.jsp" />
	</div>
	
	<!--加班月报 -->
	<div id="div_jiaban">
		<s:include value="Ye0093.jsp" />
	</div>
   
	<div class="clear_both"></div>
</div>
</body>
</html>