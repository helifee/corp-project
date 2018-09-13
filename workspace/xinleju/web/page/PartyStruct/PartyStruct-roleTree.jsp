<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>组织机构管理</title>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" /
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/PartyStruct/PartyStruct-roleTree.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body style="height:400px">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
		<tr>
			<td width="300" valign="top" height="380" >
				<input id="currentStructTypeId" name="currentStructTypeId" value='${partyStructTypeId }' type="hidden"></input>
				<div id="partyTree" style="width: 290;height: 360;"></div>
			</td>
		</tr>
	</table>
</body>
</html>