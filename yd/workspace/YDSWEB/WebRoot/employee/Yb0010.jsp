<%--
 * @(#)Yb0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工信息管理画面（主页面JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/05/17
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/ydsTree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/sortTable.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb0010.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb0011.js"></script>
	
	<title>员工信息管理</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_main"  class="ydscontainer">
	<!--员工信息管理详细信息画面 -->
	<s:form id="empInfoForm" action="yb0010FindEmpLst" namespace="/employee" method="post" validate="true">
		<div id="div_peo_empInfoView" class=" span-24">
			<div class="span-24">
				<div class="span-2 text_right">
					<span>员工类别</span>
				</div>
				<div class="span-5">
					<s:select id="selStatusId" name="yb0010CondA.empStatusId" list="statusList" listKey="diffNo" listValue="diffName" cssClass="span-3 w_90" />
				</div>
				<div class="span-2 text_right">
					<span>员工状态</span>
				</div>
				<div class="span-5">
				<s:select id="selStateId" name="yb0010CondA.empStateId" list="stateList" listKey="diffNo" listValue="diffName" cssClass="span-3 w_90"/>
				</div>
				<div class="span-2 text_right">
					<span>所属部门</span>
				</div>
				<div class="span-8 last">
					<s:select id="selDeptId" name="yb0010CondA.deptId" list="peoOrgInfoList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3"/>
				</div>
			</div>
			<div class="span-24">
				<div class="span-2 text_right">
					<span>担当职位</span>
				</div>
				<div class="span-5">
					<s:select id="posTypeId" name="yb0010CondA.position" list="positionList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3" />
				</div>
				<div class="span-2 text_right">
					<span>入职年度</span>
				</div>
				<div class="span-5">
					<s:textfield id="startYear" name="yb0010CondA.startYear" maxlength="4" cssClass="span-2" />
					<input style="display:none">
				</div>
				<div class="prepend-6 span-4 last text_right">
					<input type="button" id="search" name="search" value="查询" class="span-2 btn" onclick="searchEmpInfo()" />
					<input type="button" id="advSearch" name="advSearch" value="高级查询" class="span-2 btn" onclick="pop()" />
				</div>
			</div>
		</div>
	</s:form>

	<!-- 分割线  -->
	<div class="span-24 separator"></div>
	
	<!--员工一览列表画面 -->
	<div id="div_peo_empInfoList">
		<s:include value="Yb0012.jsp" />
	</div>
   <!--员工职位设定弹出层-->
        <div class="none" id="myPopContent03">
			<iframe id="myInnerPage" frameBorder="0" style="height:450px;width:710px" ></iframe>
        </div>
	<!-- 高级查询层 -->
	<div id="div_peo_empAdvSearch" class="none"></div>
	<div class="clear_both"></div>
</div>
</body>
</html>