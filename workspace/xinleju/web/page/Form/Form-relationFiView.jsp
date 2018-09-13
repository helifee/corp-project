<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>相关流程信息</title>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<meta name="viewport" content="width=device-width" />
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
</head>
<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="#">相关流程信息</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="1" cellpadding="0" class="wd_tablelist04">
		<s:if test="#request.relationFiList !=null && #request.relationFiList.size() > 0">
			<s:iterator value="#request.relationFiList" var="wst">
				<tr>
					<td align="left">
						<a href='#' onclick="openwindow('Form!dealIndex.do?fiId=${wst.relationFiId}','showSp_${wst.relationFiId}',1270,0);"><app:TruncateTag size="103" src="${wst.relationFi.fiName}"></app:TruncateTag></a>
					</td>
				</tr>
			</s:iterator>
		</s:if>
		<s:else>
			<tr>
				<td>
					&nbsp;
				</td>
			</tr>
		</s:else>
	</table>
</body>