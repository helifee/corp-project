<%@page import="freemarker.template.utility.DateUtil"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script src="js/jquery/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Form/Form-historyInfo.js"></script>
</head>
<body>
	<!-- 审批记录 -->
	<iframe id="frameInfo" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!historyInfo.do?fiId=${fiId}&t=1" onload="iframeChangeSize('frameInfo',10);"></iframe>
</body>
</html>