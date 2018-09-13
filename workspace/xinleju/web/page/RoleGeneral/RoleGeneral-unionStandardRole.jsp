<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>引入标准角色</title>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/RoleGeneral/RoleGeneral-unionStandardRole.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript">
	var selRole = "${selRole}";
</script>
</head>
<body>
	<div id="wrapper">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">标准角色列表</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="setSelRole();">确定</a>
						<a href="#" onclick="window.close();">取消</a>
					</div>
				</td>
			</tr>
		</table>
		<form id="frm" action="PartyStruct!unionRole.do" method="post">
		<input type="hidden" name="parentEntityId" id="parentEntityId" value="${parentEntityId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<table width="99.9%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="280" valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				        <div class="hh">标准角色(双击选择)</div>
				    </div>
					<div id="roleTree"></div>
				</td>
				<td width="6" valign="top">&nbsp;</td>
				<td valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				        <div class="hh">已选角色(双击取消选择)
				        	<a href="#" onclick="moveUp();">上移</a>
							<a href="#" onclick="moveDown();">下移</a>
						</div>
				    </div> 
					<div>
						<select id="paticipantList" multiple="multiple" style="height: 230px; width: 100%;" ondblclick="removeSelRole();">
						</select>
					</div>
				</td>
			</tr>
		</table>
		</form>
	</div>
</body>
</html>