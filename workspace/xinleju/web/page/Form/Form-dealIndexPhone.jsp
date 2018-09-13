<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>审批信息</title>
	<meta name="viewport" content="width=device-width" />
	<link href="css/Phonee.css" rel="stylesheet" type="text/css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="page/Form/Form-dealIndex.js"></script>
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
</head>
<body onload="">
	<form id="frm" action="Form!dealIndex.do" method="post">
		<input type="hidden" name="spWiId" value="${spWiId}" />
		<input type="hidden" name="fiId" value="${fiId}" />
	</form>
	<input type="hidden" name="app" value="${app}" id="app" />
	<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
		<!-- 审批历史 -->
		<jsp:include page="Form_history${showModule}.jsp" flush="true" />
		<!-- 审批记录 -->
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#" onclick="showOrHide('historyInfoTable','historyInfoTableShowOrHide');">审批记录<img title="点击隐藏" id="historyInfoTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
					</div>
				</td>
			</tr>
		</table>
		<div id="historyInfoTable" style="width:100%;">
			<!-- 审批记录 -->
			<iframe id="historyInfoFrm" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!historyInfo.do?fiId=${fiId}&showModule=${showModule}" onload="try{iframeChangeSize('historyInfoFrm',-20);}catch(e){};"></iframe>
		</div>
		<!-- 审批操作 -->
		<jsp:include page="Form_op${showModule}.jsp" flush="true" />
	</s:if>
	<s:else>
		<!-- 审批历史 -->
		<jsp:include page="Form_history${showModule}.jsp" flush="true" />
		<!-- 审批记录 -->
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#" onclick="showOrHide('historyInfoTable','historyInfoTableShowOrHide');">审批记录<img title="点击隐藏" id="historyInfoTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
					</div>
				</td>
			</tr>
		</table>
		<div id="historyInfoTable" style="width:100%;">
			<!-- 审批记录 -->
			<iframe id="historyInfoFrm" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!historyInfo.do?fiId=${fiId}&showModule=${showModule}" onload="try{iframeChangeSize('historyInfoFrm',-20);}catch(e){};"></iframe>
		</div>
	</s:else>
</body>
</html>

