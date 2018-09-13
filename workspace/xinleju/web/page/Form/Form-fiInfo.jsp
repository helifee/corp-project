<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>审批信息</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
</head>
<body>
	<s:if test="null != #request.fiInfo">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#">流程模板信息</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<th width="80px">名称</th>
				<td><s:property value="#request.fiInfo.flb.flowName"/></td>
				<th width="80px">编码</th>
				<td><s:property value="#request.fiInfo.flb.flowCode"/></td>
				<th width="80px">版本号</th>
				<td><s:property value="#request.fiInfo.flb.flowVersion"/></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#">流程实例信息</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<th width="80px">名称</th>
				<td><s:property value="#request.fiInfo.fib.flowInsName"/></td>
				<th width="80px">所有者</th>
				<td><s:property value="#request.fiInfo.fib.ownerUser.userName"/></td>
				<th width="80px">发起者</th>
				<td><s:property value="#request.fiInfo.fib.startUser.userName"/></td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#">当前操作</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<th width="80px">当前节点</th>
				<td>
					<s:iterator value="#request.fiInfo.runningWps" var="rw" status="rws">
						<s:if test="#rws.index > 0">;</s:if><s:property value="#rw.displayName"/>
					</s:iterator>
				</td>
			</tr>
			<tr>
				<th width="80px">当前操作人</th>
				<td>
					<s:iterator value="#request.fiInfo.runningWis" var="rw" status="rws">
						<font style="font-weight:bold"><s:property value="#rw.participant.userName"/></font><s:if test="null != #rw.wp && null != #rw.wp.rolePath && '' != #rw.wp.rolePath">(<s:property value="#rw.wp.rolePath"/>)</s:if>;
					</s:iterator>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#">流程配置</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1">
			<tr>
				<td>
					<iframe id="flViewFrameTemp" src="Designer!index.do?act=view&flowId=${flId }" style="width: 100%;min-height: 600px;max-height: 1200px;" scrolling="no" frameborder="0" onload="iframeChangeSize('flViewFrameTemp',10);"></iframe>
				</td>
			</tr>
		</table>
		
	</s:if>
	<s:else>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<td colspan="6">&nbsp;</td>
			</tr>
		</table>
	</s:else>
</body>
</html>