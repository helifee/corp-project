<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>选择流程参与者</title>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="js/App.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/TurnOverDeal/TurnOverDeal-parList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<div id="wrapper">
		<input id="currentStructTypeId" name="currentStructTypeId" value='${partyStructTypeId }' type="hidden"></input>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="20%" valign="top">
				    <div class="t_title">
				      <div class="hh">组织机构</div>
				    </div>
					<div id="partyTree" style="height:345px;overflow-y:auto;"></div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td valign="top" width="74%">
					<div>
						<iframe id="user_frame" name="user_frame" frameborder="0"  scrolling="no" onload="setAutoHeight('user_frame',0)" src="TurnOverDeal!structParList.do?limit=10&parentEntityId=0&partyStructTypeId=${partyStructTypeId }" width="100%" marginheight="0" marginwidth="0"  ></iframe>
					</div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>