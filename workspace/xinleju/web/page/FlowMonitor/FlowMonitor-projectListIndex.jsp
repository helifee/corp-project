<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>流程模板选择</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="css/icon.css" type="text/css" />
		<script src="js/App.js"></script>
		<script src="js/jquery.js"></script>
		<script src="js/App.js"></script>
		<script src="page/FlowMonitor/FlowMonitor-projectListIndex.js"></script>
		<script type="text/javascript">
			$(function($){
				initSelect();
			});
		</script>
</head>
<body>
	<input type="hidden" id="datas" value="${datas }"/>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
		<tr>
			<td>
				<div class="wdtable_titleh">
					流程模板选择
				</div>
				<div class="wdtable_titletool">
					<a href="#" onclick="save();">保存</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%"  align="center">
				<iframe id="projectListIframe" width="600" frameborder="0" src="FlowMonitor!projectList.do" onload="iframeChangeSize('projectListIframe')"></iframe>
			</td>
			<td style="width: 20%;" align="center">
				<input type="button" value="选择"  onclick="selectIframeToCsList()" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
				
				<BR>
				<input type="button" value="移除" onclick="jsRemoveSelectedItemFromSelect('ftList')" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
			</td>
			<td style="vertical-align: top;">
				<select id="ftList" multiple="multiple" style="height: 520px; width: 100%;" class="select13"></select>
			</td>
		</tr>
	</table>
</body>
</html>
