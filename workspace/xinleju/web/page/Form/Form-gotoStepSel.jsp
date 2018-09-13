<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>跳转工作选择</title>
		<base target="_self"/>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<link href="css/mask.css" rel="stylesheet" type="text/css" />
		<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
		<script src="js/ext/adapter/ext/ext-base.js"></script>
		<script src="js/ext/ext-all.js"></script>
		<script type="text/javascript" src="js/ext/ux/ux-all.js"></script>
		<link rel="stylesheet" href="css/icon.css" type="text/css" />
		<script type="text/javascript">
			function gotoSel(){
				var returnJson = {};
				returnJson.gotoToWpId = $("#gotoToWpId").val();
				window.returnValue = returnJson;
				window.close();
			}
		</script>
	</head>
	<body>
		<div class="popgsfl_title" style="width:900px">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">请选择</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="gotoSel();return false;">确定</a>
							<a href="#" onclick="window.close();return false;">关闭</a>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="margin-top: 10px;" id="backToWpDiv">
			跳转到:&nbsp;<select name="gotoToWpId" id="gotoToWpId" title="打回到的节点" style="width: 160px;margin-bottom: 2px;">
				<option value="">请选择</option>
				<s:if test="#request.wps != null && #request.wps.size() > 0">
					<s:iterator value="#request.wps" var="wp" status="pIndex">
						<option value="${wp.wpId }">${wp.displayName}</option>
					</s:iterator>
				</s:if>
			</select>
		</div>
	</body>
</html>
