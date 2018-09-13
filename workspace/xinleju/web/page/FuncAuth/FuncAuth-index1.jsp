<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>功能授权</title>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/FuncAuth/FuncAuth-index1.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<div id="wrapper">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="32%" valign="top">
				    <div class="t_title">
					  <div class="hh">
					    <ul>
					      <li><a href="FuncAuth!index.do">角色->动作点</a></li>
					      <li class="current"><a href="FuncAuth!index.do?flag=1">动作点->角色</a></li>
					    </ul>
					  </div>
					  <div class="clear"></div>
					  
					</div>
					<div id="cardarea_new">
						<div id="roleTree" style="height:100%;overflow-y:auto;padding-bottom:5px;"></div></td>
					</div>
				<td width="6" valign="top">&nbsp;</td>
				<td valign="top">
					<div>
						<input type="hidden" name="roleId" id="roleId"/>
						<input type="hidden" name="ttt" id="app" value=""/>
						<iframe id="funcOpframe" onload="iframeChangeSize('funcOpframe',5)" name="funcOpframe" frameborder="0" src="FuncAuth!funcRoleList.do" width="100%" marginheight="0" marginwidth="0" scrolling="no"></iframe>
					</div></td>
			</tr>
		</table>
	</div>
</body>

</html>