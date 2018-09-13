<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>岗位列表</title>
    <link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
   
	
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-roleList.js?t=<%=System.currentTimeMillis()%>"></script>
   
</head>
<body>
	<form id="frm" name="frm" action="PartyStruct!roleList.do" method="post">
		
		<input type="hidden" name="parentId" id="parentId" value="${parentId }"></input>
		<input type="hidden" name="refId" id="refId" value="${refId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<input type="hidden" name="grant" id="grant" value="${grant }"></input>
		<input type="hidden" name="start" id="start" value="${start }"></input>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">岗位列表<s:if test="null != #request.parentPe"><span style="font-size:12px" title="${parentPe.name}"><app:TruncateTag size="20" src="${parentPe.name}"></app:TruncateTag></span></s:if></div>
			<div class="t_title_input">
				<input type="text" name="name" id="name" placeholder="岗位名称" value="${name}" />
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:doSearch();">
					<img src="images/icon_search.png" width="24" height="24" align="bottom" />
				</a>
			</div>
			<div class="tool">
				<%-- 
					<s:if test="request.grant == 'true'">
						<a href="javascript:void(0)" onclick="alert('TODO');" class="t_edit">功能授权</a>
						<a href="javascript:void(0)" onclick="alert('TODO');" class="t_edit">数据授权</a>
					</s:if>
					<s:else>
						<a href="javascript:void(0)" onclick="unionRole(${parentId},${partyStructTypeId});" class="t_new">引入岗位</a>
						<a href="javascript:void(0)" onclick="editShortName();" class="t_edit">编辑岗位</a>
						<a href="javascript:void(0)" onclick="deleteRole();" class="t_del">删除岗位</a>
					</s:else> 
					<s:if test="null != #request.parentId && #request.parentId > 0">
						<s:iterator value="#request.canAddPartyTypeList" var="item" status="stat">
							<a href="javascript:void(0)" onclick="openAddWindow('${item.type}','${item.ifOnlyEntity}');" class="t_new">${item.name}</a>
						</s:iterator>
						<s:if test="null != #request.parentPe">
							<a href="javascript:void(0)" onclick="openEditWindow('${parentPe.partyType.type}','${item.ifOnlyEntity}');" class="t_edit">修改${parentPe.partyType.name}信息</a>
						</s:if>
					</s:if>
				--%>
				<a href="javascript:void(0)" onclick="unionRole(${parentId},${partyStructTypeId});" class="t_new">引入岗位</a>
				<a href="javascript:void(0)" onclick="editShortName();" class="t_edit">编辑岗位</a>
				<a href="javascript:void(0)" onclick="deleteRole();" class="t_del">删除岗位</a>
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%">&nbsp;</th>
					<th width="5%">序号</th>
					<th width="35%">岗位名称</th>
					<th width="35%">标准角色名称</th>
					<th width="10%">所属级别</th>
				</tr>
				<s:iterator value="page.items" var="item" status="stat">
				
					<s:if test="null != #item.status && #item.status==1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					
					
					<tr class="${disabledTrClass} " onclick="chooseThisRow('ids_${item.id}');"> 
				
						<td align="center">
						  <input name="ids" type="checkbox" id="ids_${item.id}" value="${item.id}" onclick="chooseThisRow('ids_${item.id}');" />
						</td>
						<td align="center">${stat.index + 1}</td>
						<td align="left">${item.name}</td>
						<td align="left">${item.upPath}</td>
						<td align="left">${item.typeCodeName }</td>
					</tr>
				</s:iterator>
			</table>
			
				<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="PartyStruct!roleList.do" ></app:PageTag>
			</div>
		</div>
	</form>
</body>
</html>