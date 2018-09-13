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
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<style>
	
	/*
	   table thead tr td{
		  width:70px;
		 
	   }
	  
	  
	</style>
	
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script language="javascript" type="text/javascript" src="js/App.js?t=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" src="page/TurnOverDeal/TurnOverDeal-structParList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<form id="frm" name="frm" action="TurnOverDeal!structParList.do" method="post">
		<s:hidden name="start"></s:hidden>
		<input type="hidden" name="parentEntityId" id="parentEntityId" value="${parentEntityId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<!-- 标题 -->
		<div class="t_title">
			<div class="t_title_input">
				<input type="text" name="nameOrLogName" id="nameOrLogName" placeholder="用户名称、用户代码" value="${nameOrLogName}" />
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:doSearch();">
					<img src="images/icon_search.png" width="24" height="24" align="bottom" />
				</a>
			</div>
				<div class="wdtable_titletool">
					<a href="#" onclick="window.chooseUser();return false;">确定</a>
					<a href="#" onclick="window.close();return false;">关闭</a>
				</div>			
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%"></th>
					<th width="10%">序号</th>
					<th width="10%">用户名称</th>
					<th width="10%">用户登录名称</th>
					<th width="55%">默认岗位</th>
					<th width="10%">状态</th>
				</tr>
				<s:iterator value="page.items" var="item" status="stat">
					<s:if test="null != #item.status && #item.status == 1">
						<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
					</s:if>
					<s:else>
						<s:set id="disabledTrClass" value=""></s:set>
					</s:else>
					<s:if test="#stat.index==0 && #firstUserId==null">
						<s:set id="firstUserId" value="#item.id"></s:set>
					</s:if>
					<tr class="${disabledTrClass}" id="t_${item.id}" onclick="showEnable(${item.id}, ${item.status ==1});chooseCheckBox('c_${item.id}')" >
						<td align="center">
						 	<s:if test="#stat.index==0">
						 	<script language="javascript">
								showEnable(${item.id},${item.status == 1});
							</script>
						 	
						 	</s:if>
							<input type="hidden" name="status_${item.id}" id="status_${item.id}" value="${item.status}"/>
							<input id="c_${item.id}" name="checkb" type="checkbox" value="${item.id},${item.realName}" onclick="showEnable(${item.id}, ${item.status == 1});chooseCheckBox('c_${item.id}')"/>
						</td>
						<td align="center">${stat.index + 1}</td>
						<td align="left">${item.realName}</td>
						<td align="left">${item.loginname}</td>
						<td align="left" title="${item.mainRole.namefix}">${item.mainRole.namefix}</td>
						<td align="center" id="statusCN_${item.id}">
							<s:if test="null != #item.status && #item.status == 1">
								<span style="color:red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td>
					</tr>
				</s:iterator>
				<script language="javascript">
					// showEnable($("#firstRow").val());
					var userId = "${userId}";
					if (userId != "" && $("#c_"+userId) != null) {
						$("#c_"+userId).attr("checked", true);
					}
				</script>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="TurnOverDeal!structParList.do"></app:PageTag>
			</div>
		</div>
	</form>
</body>
</html>