<%--
 * @(#)user_pos_mgr.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="../css/style.css">

	<!-- 共通js -->
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script type="text/javascript" src="../js/common/commonMessage.js"></script>
	<script type="text/javascript" src="../js/common/userMgrCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="../js/perm/userPosMgr.js"></script>
	<title>用户职位管理</title>
</head>
<body> 
<div class="container showgrid">
  <div class="nTab">
    <div class="span-24 text_center">
      <h2>用户职位管理</h2>
    </div>
    <div class="TabTitle">
      <ul id="posOrUserTab">
        <li class="active" onclick="nTabs(this,0);">按职位</li>
        <li class="normal bd_r_1sccc" onclick="nTabs(this,1);">按用户</li>
      </ul>
    </div>

    <div class="TabContent">
      <div id="posOrUserTab_Content0" class="prepend-1 span-23 last">        
      </div>

      <div id="posOrUserTab_Content1" class="prepend-1 span-23 none last">             
      </div>
    </div>
  </div>
</div>
</body>
</html>