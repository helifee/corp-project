<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>系统参数配置</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Setting/Setting.js"></script>
		<%@ include file="/validate.jsp"%>
	</head>
	<body>
		<s:form action="Setting!save.do" id="frm">
		<s:token/>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">${settingTitle}</div>
				<div class="t_title_input">
					
				</div>
				<div class="t_title_input">
					
				</div>
				<div class="tool">
					<a href="#" onclick="dealSave();" class="t_save">保存</a>
				</div>
				<div class="clear"></div>
			</div>
			<table width="100%" cellpadding="0" cellspacing="1" id="tab" class="wd_tablelist01">
				<s:iterator value="#request.mapList" var="item" status="stat">
				<tr>
					<th width="160px" align="right" style="text-align: right;">
						<span class="alertstar">*</span>${item.name}:
						<input type="hidden" name="settingList[${stat.index}].name" value="${item.name}"/>
						<input type="hidden" name="settingList[${stat.index}].code" value="${item.code}"/>
						<input type="hidden" name="settingList[${stat.index}].position" value="${item.position}"/>
						<input type="hidden" name="settingList[${stat.index}].appCode" value="${item.appCode}"/>
						<input type="hidden" name="settingList[${stat.index}].valueType" value="${item.valueType}"/>
						<input type="hidden" name="settingList[${stat.index}].note" value="${item.note}"/>
					</th>
					<td align="left">
						<input name="settingList[${stat.index}].value" value="${item.value}" style="width:80%;" datatype="*1-200"/>
					</td>
				</tr>
				<tr>
					<th width="160px" align="right" style="text-align: right;">
						说明：
					</th>
					<td align="left">
						${item.note}
					</td>
				</tr>
				</s:iterator>
			</table>
		</s:form>
	</body>
</html>
