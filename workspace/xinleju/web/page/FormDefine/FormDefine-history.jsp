<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FormDefine/FormDefine-history.js"></script>
		<script type="text/javascript" src="page/FormDefine/FormDefine-list.js"></script>
	</head>
	<body>
		<s:form id="frm" action="FormDefine!history">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="formCode" value="%{#request.formCode}"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							历史版本
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>



			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th >
						表单名称
					</th>
					<th>
						表单编码
					</th>
					<th>
						所属类别
					</th>
					<th>
						表单版本
					</th>
					<th width="100">
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							${item.name }
						</td>
						<td align="center">
							${item.code }
						</td>
						<td align="center">
							${item.formCt.name}
						</td>
						<td align="center">
							 ${item.formVersion}
						</td>
						<td align="center">
							<s:if test="#item.isCurrent == 1">
								当前版本
							</s:if>
							<s:else>
								<a href="javascript:void(0)" onclick="setCurrentVersion('${item.id}')">设为当前版本</a>
							</s:else>
							<a href="javascript:void(0)" onclick="javascript:viewFormDefine('${item.id}')">查看</a>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="FormDefine!history.do"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
