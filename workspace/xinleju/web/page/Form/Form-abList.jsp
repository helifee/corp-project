<%@page import="freemarker.template.utility.DateUtil"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="#">流转日志</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<tr>
			<th width="50px">序号</th>
			<th width="100px">节点名称</th>
			<th width="120px">处理人</th>
			<th width="120px">操作</th>
			<th>处理意见</th>
			<th width="120px">处理时间</th>
		</tr>
		<s:if test="null != #request.abList && #request.abList.size() > 0">
		<s:iterator value="#request.abList" var="ab" status="abs">
			<tr>
				<td align="center">
					${abs.count}
				</td>
				<td align="left">
					${ab.nodeName}
				</td>
				<td align="left">
					${ab.userName}
				</td>
				<td align=left>
					${ab.opName}
				</td>
				<td align="left">
					<s:property value="lineFeed(#ab.userNote)" escape="false"/>
				</td>
				<td align="center">
					<s:date name="#ab.logDate" format="yyyy-MM-dd HH:mm:ss"/>
				</td>
			</tr>
		</s:iterator>
		</s:if>
		<s:else>
			<tr>
				<td colspan="6">&nbsp;</td>
			</tr>
		</s:else>
	</table>
<jdt:PageMetaTag />
</body>
</html>