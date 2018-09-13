<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>组织机构管理</title>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="css/icon.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/PartyEntity/PartyEntity-index.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="js/App.js"></script>
</head>
<body>
	<div id="wrapper">
		<input id="isStruct" name="isStruct" value='${isStruct }' type="hidden"></input>
		<input id="currentNodeId" name="currentNodeId" value='0' type="hidden"></input>
		<input id="currentStructTypeId" name="currentStructTypeId" value='${partyStructTypeId }' type="hidden"></input>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="32%" valign="top">
				   <div class="t_title">
				      <div class="hh">组织机构</div>
				      <div class="tool">
					      <s:iterator value="#request.canAddPartyTypeList" var="item" status="stat">
						  	<a href="javascript:void(0)" onclick="openAddWindow('${item.type}','${item.ifOnlyEntity}');" class="t_new">${item.name}</a>
						  </s:iterator>
						  <a href="javascript:void(0)" id="showProjBranch" class="t_view">项目</a>
						  <a href="javascript:void(0)" id="upcompany"  class="t_edit">修改</a>
						  <a href="javascript:void(0)" id="deleteNode" class="t_del">删除</a>
				      </div>
				    </div> 
					<div id="partyTree" style="height:350px;overflow-y:auto;"></div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td valign="top"  width="67%">
					<div>
						<iframe id="role_frame" onload="iframeChangeSize('role_frame',5)" name="role_frame" frameborder="0" src="PartyStruct!roleList.do?grant=false&partyStructTypeId=${partyStructTypeId}&size=10&parentId=1" width="100%" marginheight="0" marginwidth="0" scrolling="no"></iframe>
					</div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>