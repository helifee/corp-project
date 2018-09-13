<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>招标采购首页</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/App.js"></script>
		<link href="css/mask.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/OutCodeMgr/OutCodeMgr-editOc.js?t=<%=System.currentTimeMillis()%>"></script>

	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="OutCodeMgr!saveOc.do" id="frm">
			<s:hidden name="oc.id"></s:hidden>
			<s:hidden name="oc.ocdId"></s:hidden>
			<s:hidden name="oc.isDisabled"></s:hidden>
	
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							外部编码编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">提交</a><a href="#" onclick="window.close();return false;">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">

							<tr>
								<td align="right" class="sd" width="20%">
									名称:
								</td>
								<td width="30%">
									<s:textfield name="oc.name" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									编码:
								</td>
								<td>
									<s:textfield name="oc.val" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									排序:
								</td>
								<td>
									<s:textfield name="oc.position" cssStyle="width:98%" validate="{number:true,min:0,max:9999,digits:true}"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									
								</td>
								<td width="30%">
									
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	
	</body>
</html>
