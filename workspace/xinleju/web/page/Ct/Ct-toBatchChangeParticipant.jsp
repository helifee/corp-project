<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>批量替换处理人</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="page/Ct/Ct-toBatchChangeParticipant.js?t=<%=System.currentTimeMillis() %>"></script>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="Ct!changeParticipant.do" id="frm">
		<s:hidden name="ctId" value="%{#request.ctId}"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">替换流程处理人</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:changeParticipant()">确定</a><a href="#" onclick="window.close();">关闭</a>
					</div></td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
			<tr>
				<td align="right" class="sd" width="20%">原处理人:</td>
				<td><s:textfield name="sourceName" id="sourceName" cssStyle="width:50%"></s:textfield>
					<s:hidden name="sourceId" id="sourceId"></s:hidden>
					<a href="#" onclick="javascript:selectParticipant('sourceName','sourceId')">选择</a></td>
			</tr>
			<tr>
				<td align="right" class="sd" width="20%">替换处理人:</td>
				<td><s:textfield id="targetName" name="targetName" cssStyle="width:50%"></s:textfield>
					<s:hidden name="targetId" id="targetId"></s:hidden>
				<a href="#" onclick="javascript:selectParticipant('targetName','targetId')">选择</a></td>
			</tr>
	</table>
	<input id="checker" name="includeChild" type="checkbox" value="1"/><label for="checker">包含子类别流程模板</label>
	</s:form>
</body>
</html>
