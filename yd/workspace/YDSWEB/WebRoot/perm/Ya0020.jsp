<%--
 * @(#)Ya0020.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 角色授权画面JSP
 * 
 * @author caoxiaodong
 * @version 1.00 2010/01/25
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
<link href="<%=basePath %>js/tafelTree/css/tree.css" rel="stylesheet" type="text/css"/>

<!-- 共通js -->
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath %>js/perm/Ya0020.js"></script>
<title>角色信息授权</title>
</head>
<body onload="initForm()">
<div class="span-14 last">
	<s:form id="ya0020Form" action="ya0020AddRolePerMgrInfo" method="post" namespace="/perm" validate="true">
		<div id="errorMessage" class="span-13">
			<s:fielderror></s:fielderror>
		</div>
		<br>
		<div class="prepend-1 span-12 last">
			<div class="span-12 last margin_top_8">
				<div class="span-2"><s:label id="roleIdLbl" value = "角色ID"/><span class="color_red">*</span></div>
				<div class="span-2"><s:textfield id ="roleId" cssClass="span-2" name="perRoleInfo.roleId" maxlength="20"/></div>
				<div class="prepend-1 span-2"><s:label id="roleNmLbl" value="角色名"/><span class="color_red">*</span></div>
				<s:textfield id="roleNm" cssClass="span-4" name="perRoleInfo.roleName" maxlength="20"/>
			</div>
			<div class="span-12 last margin_top_4">
				<div class="span-2"><s:label id="roleDescLbl" value="角色描述"/></div>
				<div class="span-10 last">
					<s:textfield id="roleDesc" cssClass="span-9" name="perRoleInfo.roleDescription" maxlength="200"/>
				</div>
			</div>			
			<div class="span-12 box_border margin_top_6 last">
	    		<div class="span-12 box_head_bc last"><h4>角色授权</h4></div>
				<div class="span-12 h_300 overflow_scr_y last">
			    	<div class="span-12 t_auto line_h last" id="myTree" ></div>
			    </div>
			</div>
			<div class="span-12 margin_top_8 padding_bottom_10 margin_bottom_10 last">
				<div class="span-2 last">
					<input type="button" id="delete" name="delete" class="btn span-2" value="删除角色" onclick="deleteRoleInfo()"/>
				</div>
				<div class="prepend-6 span-2">
					<input type="button" id="dosubmit" name="dosubmit" value="保存" class="btn span-2" onclick="submitRoleInfo()"/>
				</div>
				<div class="span-2 last">
					<input type="reset" id="cancel" name="cancel" value="重置" class="btn span-2"onclick="resetInfo()"/>
				</div>
			</div>
		</div>
		<s:hidden id="modeFlg" name="modeFlg"/>
		<s:hidden id="hidRoleNm" name="hidRoleNm"/>
		<s:hidden id="hidRoleDesc" name="hidRoleDesc"/>
	</s:form>
</div>
</body>
</html>