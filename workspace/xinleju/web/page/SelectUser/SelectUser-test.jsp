<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>人员选择</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">

	var getuserId=function(userId){
		alert(userId);
	}
	
	var toSelectWindow=function(){

		window.open("SelectUser!index.do");
	}
</script>
</head>
<body>
<input type="button" value="选择" onclick="javascript:toSelectWindow()"/>

</body>
