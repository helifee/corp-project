<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<html>
<head>
<title>组管理画面</title>
	<sx:head debug="true"/>
        <meta http-equiv="pragma" content="no-cache">    
        <meta http-equiv="cache-control" content="no-cache">    
        <script language="JavaScript" type="text/javascript" src="js/prototype.js"></script>  
        <script language="JavaScript" type="text/javascript" src="js/application.js"></script>
</head>
<body bgcolor="#ecf6ff" onload="InitHumian()">
    <div id="div_hy_group_manage">    
        <s:include value="hy_group_manage.jsp"/>    
    </div>    
</body>    
</html>