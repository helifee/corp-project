<%--
 * @(#)Ya0030.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 角色管理画面
 * 
 * @author lihuajuan
 * @version 1.00 2010/08/13
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
	<script type="text/javascript" src="<%=basePath %>js/perm/Ya0030.js"></script>
	<title>角色管理</title>
</head>
<body onload="init()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_main"  class="ydscontainer">
	<!--角色管理一览画面 -->
	<div class="span-14">
		<div class="span-7 text_left">
			<s:label value="总计：" />
			<s:label id="roleInfosCnt" name="roleInfosCnt" />
			<s:label value="个" />
		</div>
		<div class="span-7 text_right last">
			<input type="button" id="createBtn" name="createBtn" value="新建" onclick="popInnerPageAdd()" class="btn span-2" />
		</div>
	</div>
	<div class="span-14 box_border overflow_hd margin_top_4">
		<div class="span-14">
			<table id="table_peoListHead" class="datagrid2 ellipsis">
				<tr>
					<th class="percent_10">角色ID</th>
					<th class="percent_20">角色名称</th>
					<th class="percent_50">角色描述</th>
					<th class="percent_16">操作 </th>
				</tr>
			</table>
		</div>
		<div id="table_peo" class="span-14 overflow_scr_y">
			<div class="span-14 last">
				<table id="table_peoList" class="datagrid2">	
					<tbody>
					<s:if test="roleInfos.size > 0">
						<s:iterator value="roleInfos">
							<tr>
								<td class="percent_10 text_center"><s:property value="roleId" /></td>
								<td class="percent_20"><s:label name="roleName" title="%{roleName}"/></td>
								<td class="percent_50"><s:label name="roleDescription" title="%{roleDescription}"/></td>
								<td class="text_center percent_16">
									<s:a href="#this" onclick="popInnerPageModify('%{roleId}')">修改</s:a> 
								</td>
							</tr>
						</s:iterator>
					</s:if>
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <!--角色信息授权弹出层-->
    <div id="myPopContent01" class="none">
		<iframe id="myInnerPage" frameBorder="0"></iframe>
    </div>
</div>
</body>
</html>