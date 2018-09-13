<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>收藏流程列表</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="page/Form/Form-dealIndex.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<s:form id="frm" name="frm" action="Form!fiStoreList.do" method="post">
		<s:hidden name="start"></s:hidden>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="50px">
						序号
					</th>
					<th>
						审批名称
					</th>
					<th width="130px">
						审批发起时间
					</th>
					<th width="100px">
						审批状态
					</th>
					<th width="130px">
						收藏时间
					</th>
					<th width="80">
						操作
					</th>
				</tr>
			<s:if test="page.items.size>0">
				<s:iterator value="page.items" var="item" status="stat">
					<tr>
						<td align="center">
							${stat.count}
						</td>
						<td align="left">
							<a title="<s:property value="#item.fi.fiName"/>" href="#" onclick="openwindow('Form!dealIndex.do?fiId=${item.fiId}','showSp',1270,0)">
								<s:property value="#item.fi.fiName" />
							</a>
						</td>
						<td>
							<s:property value="#item.fi.startTime" />
						</td>
						<td align="center">
							<s:if test="#item.fi.status == 1">
								进行中
							</s:if>
							<s:elseif test="#item.fi.status == 2">
								已结束
							</s:elseif>
						</td>
						<td>
							<s:property value="#item.createTime" />
						</td>
						<td align="center">
							<a href="#" onclick="fiStoreCancel('${item.id}');">取消收藏</a>
						</td>
					</tr>
				</s:iterator>
			</s:if>
			<s:else>
				<tr>
					<td align="center" colspan="6">&nbsp;</td>
				</tr>
			</s:else>
			
		</table>
		<div class="page">
			<app:PageTag actionName="Form!fiStoreList.do"></app:PageTag>
		</div>
	</s:form>
</body>
</html>
