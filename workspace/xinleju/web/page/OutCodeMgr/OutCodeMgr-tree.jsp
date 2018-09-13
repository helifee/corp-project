<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>工作流条件配置树</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script src="js/ext/adapter/ext/ext-base.js"></script>
<script src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/ext/ux/ux-all.js"></script>
<script type="text/javascript" src="page/OutCodeMgr/OutCodeMgr-tree.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<th>外部编码分类</th>
			<input type="hidden" value="${includedisabled}" id="includedisabled" />
		</tr>
		<tr>
			<td valign="top" id="tree"></td>
		</tr>
	</table>
</body>
</html>