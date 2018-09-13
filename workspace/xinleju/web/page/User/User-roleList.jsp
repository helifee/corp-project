<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>用户列表</title>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script language="javascript" type="text/javascript" src="js/App.js?t=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" src="page/User/User-roleList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm" action="User!roleList.do" method="post">
		<s:hidden name="start"></s:hidden>
		<input type="hidden" name="parentEntityId" id="parentEntityId" value="${parentEntityId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">
				<input type="radio" name="user2role" onclick="$('body').mask('操作中...');window.parent.userRoleFlag=true;window.location='User!structUserList.do?limit=10&parentEntityId=${parentEntityId}&partyStructTypeId=${partyStructTypeId }';"/>用户-->岗位&nbsp;&nbsp;
				<input type="radio" name="role2user" checked="checked"/>岗位-->用户
			</div>
			<div class="t_title_input">
				<input type="text" name="name" id="name" placeholder="岗位名称" value="${name}" />
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:doSearch();">
					<img src="images/icon_search.png" width="24" height="24" align="bottom" />
				</a>
			</div>
			<div class="tool">
				<a href="javascript:void(0)" onclick="addR(${partyStructTypeId });" class="t_new">添加成员</a>
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="60px"> </th>
					<th width="60px">序号</th>
					<th >岗位名称</th>
					<!-- th>标准角色</th-->
					<th width="60px">状态</th>
				</tr>
				<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status == 1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<s:if test="#stat.index==0 && #firstUserId==null">
						<s:set id="firstRoleId" value="#item.id"></s:set>
					</s:if>
					<tr class="${disabledTrClass}" id="t_${item.id}"  onclick="chooseCheckBox('c_${item.id}')">
						<td align="center">
							<input id="c_${item.id}" name="checkb" type="checkbox" <s:if test="#stat.index==0">checked</s:if> value="${item.id}" />
						</td>
						<td align="center">${stat.index + 1}</td>
						<td align="left" title="${item.namefix}">${item.namefix}</td>
						<!-- td align="left">${item.upPath}</td-->
						<td align="center">
							<s:if test="null != #item.status && #item.status == 1">
								<span style="color:red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="User!roleList.do" ></app:PageTag>
			</div>
			<div>
				<iframe id="userr_frame" name="userr_frame" frameborder="0"  scrolling="no" onload="setAutoHeight('userr_frame',0)" src="User!roleUserList.do?limit=10&roleId=${firstRoleId }" width="100%" marginheight="0" marginwidth="0"  ></iframe>
			</div>
		</div>
	</form>
</body>
</html>