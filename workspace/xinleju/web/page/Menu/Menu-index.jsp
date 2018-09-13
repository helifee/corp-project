<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>菜单管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
	<script language="javascript" type="text/javascript" src="page/Menu/menu-index.js?t=<%=System.currentTimeMillis()%>"></script>

  </head>
  
  <body>
  	<!-- 定义一个div -->
  	<div id="wrapper">
  		<table id="myTable" width="100%" border="0" cellpadding="0" cellspacing="0">
  			<tr>
  				<!-- ztree树 -->
  				<td width="280" valign="top">
  					<div id="roleTree" style="height: 450px;overflow-y:auto;"></div>
  				</td>
  				<td width="6" valign="top">&nbsp;</td>
  				<td valign="top">
  					<div>
  						<input type="hidden" name="parentId" id="parentId"/>
  						<input type="hidden" name="ttt" id="app" value=""/>
  						<iframe id="roleframe" name="roleframe" onload = "iframeChangeSize('roleframe',5)" frameborder="0" src="Menu!list.do" width="100%" marginheight="0" marginwidth="0" scrolling="no"/>
  					</div>
  				</td>
  			</tr>
  		</table>
  	</div>
  </body>
</html>
