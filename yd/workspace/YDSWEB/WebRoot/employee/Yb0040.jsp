<%--
 * @(#)Yb0040.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工职位设定画面（主页面JSP）
 * 
 * @author jinfang
 * @version 1.00 2010/06/13
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

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb0040.js"></script>
	
	<title>员工职位设定</title>
</head>
<body onload="initForm()">
<div id="div_emp_main"  class="span-18 last h_457">
	<!--员工职位设定详细信息画面 -->
	<s:form id="empPosMgrForm" method="post" validate="true">
		<div id="div_peo_empPosView" class="span-18 last">
			<div class="span-18 last">
				<!--员工编号 -->
				<div class="span-5 margin_bottom_6">
					<div class="span-2 text_right">
						<span>员工编号</span>
					</div>
					<div class="span-2 last">
        				<s:label id="empId" name="empId"/>	
					</div>
				</div>
				<!--员工姓名 -->
				<div class="span-6 margin_bottom_6">
					<div class="span-2 text_right">
						<span>姓名</span>
					</div>
					<div class="span-4 last">
        				<s:label id="empName" name="empName"/>					
					</div>
				</div>
			</div>
			<div class="span-18 last">
				<!--职位类别 -->
				<div class="span-5 margin_bottom_6">
					<div class="span-2 text_right">
						<span id="posTypeLabel">职位类别</span>
					</div>
					<select id="posType" name="posType"></select>
				</div>	
				<!--职位 -->
				<div class="span-7 margin_bottom_6">
					<div class="span-2 text_right">
						<span id="posLabel">职位</span>
					</div>
					<s:hidden id="dispSeqInfo" name="dispSeqInfo"/>
					<s:hidden id="mode" name="mode"/>
					<select id="posId" name="posId" class="span-2"></select>
				</div>
				<!--隐藏该员工职位信息-->
				<s:hidden id="empPosInfo" name="empPosInfo"/>
				<s:hidden id="empPosListJson" name="empPosListJson" />
				<!--添加按钮 -->
				<div class="span-5 margin_bottom_6">
					<input type="button" id="btnAdd" value="添加" class="span-2 btn" onclick="addPosInfo()" />
				</div>
			</div>
		</div>
	</s:form>
	<!--当前职位一览列表画面 -->
	<div id="div_empPosList_now">
		<s:include value="Yb0041.jsp" />
	</div>
	<div class="clear_both"></div>	
	<!--历史职位一览列表画面 -->
	<div id="div_empPosList_all">
		<s:include value="Yb0042.jsp" />
	</div>	
	<div class="clear_both"></div>
	
	<!--确定，关闭按钮 -->
	<div class="span-18 margin_bottom_6 text_center last">
		<input type="button" id="btnCommit" value="保存" class="span-2 btn" onclick="close1()" />
		&nbsp;&nbsp;<input type="button" id="btnClose"value="关闭" class="span-2 btn" onclick="close2()" />
	</div>
	<div class="clear_both"></div>

</div>
</body>
</html>