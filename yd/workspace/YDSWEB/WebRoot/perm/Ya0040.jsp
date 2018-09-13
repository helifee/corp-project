<%--
 * @(#)Ya0040.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%--
 * 用户角色管理画面（主页面JSP）
 * 
 * @author yuchenglin
 * @version 1.00 2010/08/17
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
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/perm/Ya0040.js"></script>
	
	<title>用户角色管理</title>
</head>
<body onload="initForm()">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div id="div_emp_main"  class="ydscontainer">
		<!--用户角色管理画面 -->
		<s:form id="roleInfoForm" action="ya0040FindUserRoleLst" namespace="/perm" method="post" validate="true">
			<div id="div_peo_empInfoView" class="span-24">
				<div class="span-24 margin_top_4">
					<div class="span-2 text_right">
						<span>员工ID</span>
					</div>
					<div class="span-2">
						<s:textfield id="userId" name="ya0040CondA.userId" maxlength="6" cssClass="span-2" tooltip="请输入员工编号" />					
					</div>
					<div class="span-2 text_right">
						<span>员工姓名</span>
					</div>
					<div class="span-2">
						<s:textfield id="userNm" name="ya0040CondA.userNm" maxlength="30" cssClass="span-2" tooltip="请输入姓名的汉字" />
					</div>
					<div class="span-2">
						<input type="button" id="select" name="select" value="选择员工" class="span-2 btn" onclick="selectUser()" />
					</div>				
					<div class="prepend-20 span-4 last text_right">
						<input type="button" id="searchCompetence" name="searchCompetence" value="查看权限" class="span-2 btn" onclick="popUserPermit()" />
						<input type="button" id="searchRole" name="searchRole" value="查看角色" class="span-2 btn" onclick="roleSearch()" />
					</div>
				</div>
		 		<!-- 人员选择弹出层  -->
				<div id="empSelect" class="none">
					<iframe id="empSelectPage" frameBorder=0 class="overflow_hd"></iframe>  
				</div>
				<!-- 引入弹出层画面（用户权限明细画面） -->
				<div id="permitList" class="none">
					<iframe id="permitSelectPage" frameBorder=0 class="overflow_hd"></iframe> 
				</div>
			</div>
		</s:form>
	
		<!-- 分割线  -->
		<div class="span-24 separator"></div>
				
		<!--角色一览列表画面 -->
		<div id="div_peo_empInfoList">
			<s:include value="Ya0041.jsp" />
		</div>
		
		<!-- 引入弹出层画面（角色选择画面） -->
		<div id="div_role_search" class="none">
			<s:include value="Ya0042.jsp" />
		</div>
			
		<!-- 引入弹出层画面（角色权限修改画面） -->
		<div id="div_emp_adv_update"  class="span-7 last">	
			<div class="span-2 text_right">
				<span>有效时间</span>
			</div>
			<div class="span-5 text_left last">
				<s:textfield id="popStartTime" name="popStartTime" maxlength="30" cssClass="span-2" onclick="WdatePicker()"/>~<s:textfield id="popEndTime" name="popEndTime" maxlength="30" cssClass="span-2" onclick="WdatePicker()"/>
			</div>
			<div class="span-7 text_center last margin_bottom_6 margin_top_6">
				<input type="button" id="commit" name="commit" value="保存" class="span-2 btn" onclick="commitData()"/>
			</div>	
			<s:hidden id="popIndex"></s:hidden>
			<s:hidden id="popUserId" name="popUserId"></s:hidden>
			<s:hidden id="popPosRoleId" name="popPosRoleId"></s:hidden>
			<div class="clear_both"></div>
		</div>
	</div>
</body>
</html>

