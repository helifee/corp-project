<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>标准角色管理</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />

<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/Role/Role-index.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<div id="wrapper">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="25%" valign="top">
				    <div class="t_title">
				      <div class="hh">标准角色</div>
				    </div>
					<div id="roleTree" style="height:350px;overflow-y:auto;"></div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td width="72%" valign="top">
					<div>
						<input type="hidden" name="parentId" id="parentId"/>
						<iframe id="roleframe" onload="iframeChangeSize('roleframe',5)" name="roleframe" frameborder="0" src="Role!list.do?parentId=0" width="100%" marginheight="0" marginwidth="0" scrolling="no"></iframe>
					</div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>