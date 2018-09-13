<%@ page language="java" contentType="text/html; charset=GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
	<title>导航控制</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>ext2.2.1/resources/css/ext-all.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/page_color1.css">
	<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
    <script type="text/javascript" src="<%=basePath%>ext2.2.1/ext-base.js"></script>
    <script type="text/javascript" src="<%=basePath%>ext2.2.1/ext-all.js"></script>
	<script type="text/javascript" src="<%=basePath%>dwr/engine.js"></script>
	<script type="text/javascript" src="<%=basePath%>dwr/util.js"></script>
	<script src="<%=path%>/js/common/pathUtil.js" type="text/javascript"></script>
	<script type="text/javascript" src="<%=basePath%>dwr/interface/systemmenusmanageServices.js"></script>
	<script type="text/javascript">
		 var glbRootPath = "<%=basePath%>";
	</script>
    <script type="text/javascript" src="<%=basePath%>js/systemManager/systemMenuManage/console-index.js"></script>
    <style type="text/css">
	#addSystemMenu {
		float: left;
		margin: 20px 0px 0px 200px;
		border: 0px solid #c3daf9;
		width: 400px
	}
</style>
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
 
  <tr valign="top">
    <td ></td>
				 <td ><br/>
				 <br/>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="10">
								&nbsp;
							</td>
							<td>
								<div align="center">
								<table width="95%"  border="0" cellpadding="0"
										cellspacing="0" >
										<tr>
											<td height="10">
												<div class="text_title">
													<span class="text_blue2">系统菜单管理</span>
												</div>
											</td>
										</tr>
									</table>
									<table width="95%" height="30" border="0" cellpadding="0"
										cellspacing="0" class="table_body">
										
										<tr>
											<td height="10">
												<div align="left">
													<div id="addSystemMenu"></div>
												</div>
											</td>
										</tr>
										<tr>
											<td>&nbsp;</td>
										</tr>
									</table>

								</div>
							</td>
						</tr>
					</table>
				</td>
				<td  ></td>
	
  </tr>
</table>
<br/>
<br/>
<br/>
<br/>
</body>
</html>