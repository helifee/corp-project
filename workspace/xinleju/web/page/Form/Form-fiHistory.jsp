<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/application.js"></script>
</head>
<body>
	<div class="wdtable_title_sp">
		<div class="wdtable_title_sp_t">历史流程信息</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
		</div>
	</div>
	<div class="sp_wrapper">
	<table width="100%" border="0" cellpadding="0" align="center" cellspacing="1" class="table_fj">
		<tr>
			<th>流程名称</th>
			<th width="150px">发起人</th>
			<th width="130px">提交时间</th>
		</tr>
		<s:if test="null != #request.relationFiList && #request.relationFiList.size() > 0">
			<s:iterator value="#request.relationFiList" var="fi" status="fiStatus">
			<tr>
				<td><a href="#" onclick="openwindow('Form!dealIndex.do?fiId=${fi.fiId}&showType=showFiHistory','showSp_win_new',1270,0);return false;">${fi.flowInsName}</a>&nbsp;</td>
				<td><s:property value="#fi.startUser.userName"/>&nbsp;</td>
				<td align="center">${fi.startDate}&nbsp;</td>
			</tr>
			</s:iterator>
		</s:if>
		<s:else>
			<tr>
				<td colspan="3">&nbsp;</td>
			</tr>
		</s:else>
	</table>
	</div>
</body>
</html>