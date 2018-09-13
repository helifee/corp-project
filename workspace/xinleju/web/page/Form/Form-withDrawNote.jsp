<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>撤回意见</title>
	<base target="_self" />
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<meta name="viewport" content="width=device-width" />
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="css/icons.css" />
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="page/Form/Form-withDrawNote.js"></script>
</head>
<body>
	<div class="wdtable_title_sp">
		<div class="wdtable_title_sp_t">撤回意见</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<s:if test="null != #request.wiId && '' != #request.wiId">
				<input type="button"  class="dfbtn" onclick="withDraw('${fiId}','${wiId}');" value="撤回"/>
			</s:if>
			<s:else>
				<input type="button" class="dfbtn" onclick="jbrWithDraw('${fiId}');" value="撤回"/>
			</s:else>
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
		</div>
	</div>
	<div class="sp_wrapper">
		<form action="Form!withDrawNote.do" method="post" name="spFrm" id="spFrm">
			<input type="hidden"value="${fiId }" name="fiId" />
			<input type="hidden" value="${wiId}" name=wiId />
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
				<tr>
					<td>
						<div class="divh3_title">撤回意见</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
				<!-- 审批意见区域 -->
				<tr>
					<th width="15%">撤回意见：</th>
					<td>
						<textarea id="spUserNote" name="spUserNote" rows="5" style="width: 80%;" id="spUserNote"></textarea>
					</td>
				</tr>
				<!-- 审批操作按钮区域 -->
<!-- 				<tr> -->
<!-- 					<td colspan="2" align="center"> -->
<!-- 						<s:if test="null != #request.wiId && '' != #request.wiId"> -->
<!-- 							<input type="button" class="dfbtn" value="撤回" onclick="withDraw('${fiId}','${wiId}');" /> -->
<!-- 						</s:if> -->
<!-- 						<s:else> -->
<!-- 							<input type="button" class="dfbtn" value="撤回" onclick="jbrWithDraw('${fiId}');" /> -->
<!-- 						</s:else> -->
<!-- 					</td> -->
<!-- 				</tr> -->
			</table>
		</form>
	</div>
</body>
</html>
