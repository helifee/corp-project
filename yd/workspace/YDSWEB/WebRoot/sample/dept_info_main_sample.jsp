<%--
 * @(#)dept_info_main_sample.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: SAMLPE
--%>

<%--
 * 页面按钮显示与否画面
 * 
 * @author renlong
 * @version 1.00 2010/01/07
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
	
	<!-- 画面js -->
	<script type="text/javascript">
	function addDepart(){
		var url = 'addDeptInfosSampleAction.action';
		var params = '';
		var request = new Ajax.Updater('deptList',url, {
			method: 'get',
			parameters: params,
			onSuccess: function(request){
				showOpTip(getMessage('js.tt.info.JYT02'));
			},
			asynchronous: true
		});
	}
	</script>
	
	<title>页面按钮显示与否</title>
</head>
<body>
	<div id="div_dept_main"  class="ydscontainer showgrid">
		<div class="span-24 title">
			<h2>页面按钮显示与否</h2>
		</div>
		<!-- 用户在该系统下权限信息 -->
		<div class="span-24">用户权限：<s:property value="#session.userPerm.sample" /></div>
		<!-- 部门列表画面 -->
		<s:form action="newDeptInfosSampleAction" namespace="/sample">
		<div class="span-24 padding_top_2 padding_bottom_2">
			<div class="span-12 text_left">
				<s:label value="部门总数" />
				<s:label id="deptInfosCnt" name="deptInfosCnt" />
			</div>
			<div class="span-12 text_right last">
				<!-- 用户拥有该画面的新建权限时，显示新建按钮 -->
				<s:if test="hasPermit('sample','getDeptInfosSampleAction')">
					<input type="submit" id="createBtn" name="createBtn" value="新建"
						class="btn span-2"/>
					<a href="delDeptInfosSampleAction.action" class="btn span-2">删除</a>
				</s:if>
			</div>
		</div>
		</s:form>
		<div class="span-24 box_border" id="deptList">
			<s:include value="dept_info_list_sample.jsp" />
		</div>
		<div class="clear_both"></div>
	</div>
	<s:hidden id="operateTip" value="%{#session.operateTip}"></s:hidden>
	<%session.removeValue("operateTip");%>
</body>
</html>