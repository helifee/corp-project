<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>标准角色/岗位/用户选择</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="css/icon.css" type="text/css" />
		<link rel="stylesheet" href="js/ext/resources/css/ext-all.css" type="text/css" />
		<script src="js/ext/adapter/ext/ext-base.js"></script>
		<script src="js/ext/ext-all.js"></script>
		<script src="js/ext/TreeCheckNodeUI.js"></script>
		<script src="js/ext/examples/ux/CheckColumn.js"></script>
		<script src="js/jquery.js"></script>
		<script src="js/App.js"></script>
		<script type="text/javascript" src="page/FlowMonitor/FlowMonitor-userSelect.js"></script>
</head>
<body>
	<input type="hidden" id="datas" value="${datas }"/>
	<input type="hidden" id="opType" value="${opType }"/>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
		<tr>
			<td>
				<div class="wdtable_titleh">
					标准角色/<s:if test="#request.opType == 2">公司部门/</s:if>岗位/用户<s:if test="#request.opType == 2">/项目</s:if>选择
				</div>
				<div class="wdtable_titletool">
					<a href="#" onclick="save();">保存</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		
		<tr style="display: none;">
			<td width="20%"  align="center">
				
			</td>
			<td style="width: 30%;vertical-align: top;">
				
			</td>
			<td style="width: 20%;" align="center">
			
			</td>
			<td>
				<input id="isCs" type="checkbox" style="display: none;">
			</td>
		</tr>
		<tr>
			<td width="20%"  align="center">
			</td>
			<td style="width: 30%;vertical-align: top;">
				<div>查询条件：<input id="tz_tree_qk" style="width: 120px">
				&nbsp;<input id="btn_q" class="btn_q" type="button" value=" 查 询 " onclick="queryTree()"></div>
				<div id="tz_tree" style="background: red;"></div>
					
				
			</td>
			<td style="width: 20%;" align="center">
				<input type="button" value="选择"  onclick="selectToCsList()" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
				
				<BR>
				<input type="button" value="移除" onclick="jsRemoveSelectedItemFromSelect('tzList')" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
			</td>
			<td>
				<select id="tzList" multiple="multiple" style="height: 290px; width: 100%;" class="select13">
				</select>
			</td>
		</tr>
	</table>
	
		<script>
			var user_win;
			$(document).ready(function(){
			  user_win = new SelectUserWindow();
			  initSelect();
			});
		</script>
</body>
</html>
