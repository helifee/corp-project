<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>催办</title>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="page/Form/Form-showCuiBan.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="wdtable_title_sp" style="width: 980px;">
		<div class="wdtable_title_sp_t">催办</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
		</div>
	</div>
	<div class="sp_wrapper" style="width: 980px;">
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<tr>
				<th width="100px">需要催办的节点</th>
				<td>
					<s:iterator value="#request.fiInfo.runningWps" var="rw" status="rws">
						<s:if test="#rws.index > 0">;</s:if><s:property value="#rw.displayName"/>
					</s:iterator>
				</td>
			</tr>
			<tr>
				<th width="100px">需要催办的操作人</th>
				<td>
					<s:iterator value="#request.fiInfo.runningWis" var="rw" status="rws">
						<font style="font-weight:bold"><s:property value="#rw.participant.userName"/></font><s:if test="null != #rw.wp && null != #rw.wp.rolePath && '' != #rw.wp.rolePath">(<s:property value="#rw.wp.rolePath"/>)</s:if>;
					</s:iterator>
				</td>
			</tr>
			<tr>
				<td colspan="2" align="center"><input type="button" class="dfbtn" onclick="dealCuiBan('${fiId}');return false;" value="催办"/></td>
			</tr>
		</table>
	</div>
</body>
</html>