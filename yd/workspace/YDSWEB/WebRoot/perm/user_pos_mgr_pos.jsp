<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 共通js -->
<script type="text/javascript" src="../js/common/prototype.js"></script>
<script type="text/javascript" src="../js/common/util.js"></script>
<script type="text/javascript" src="../js/common/commonMessage.js"></script>
<!-- 画面用js -->
<script type="text/javascript" src="../js/perm/user_pos_mgr.js"></script>

<title>用户职位管理</title>
<!-- 共通css -->
<link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>
<a href="#this" onclick="dept();">部门</a>
<a href="#this" onclick="userList();">用户列表</a>
<a href="#this" onclick="posInfo();">职位信息</a>
<a href="#this" onclick="perInfo();">授权表信息</a>


</body>
</html>