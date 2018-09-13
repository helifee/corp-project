<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>合同信息</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FiCoContract/FiCoContract-edit.js?t=<%=System.currentTimeMillis() %>"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>
		<script>
	    		var contextPath = '${pageContext.request.contextPath}';
		</script>
	</head>
	<body style="margin: 0px;padding: 0px;">
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div data-options="region:'north',height:'auto',border:false">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">条件编辑</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:save()">提交</a><a href="#" onclick="parent.closeDialog('newDialog');">关闭</a>
					</div></td>
			</tr>
		</table>
		</div>
		<div data-options="region:'center',border:false">
		
		<s:form action="FiCoContract!save" id="frm">
		<s:token/>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>合同编码:
								</td>
								<td width="29%">
									<s:textfield name="fiCoContract.code" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>合同名称:
								</td>
								<td width="29%">
									<s:textfield name="fiCoContract.name" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>NC编码:
								</td>
								<td width="29%">
									<s:textfield name="fiCoContract.ncCode" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
                                </td>
                                <td align="right" class="sd" width="19%">
                                </td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="fiCoContract.sendDate"></s:hidden>
			<s:hidden name="fiCoContract.sendStatus"></s:hidden>
			<s:hidden name="fiCoContract.companyId"></s:hidden>
			<s:hidden name="fiCoContract.coid"></s:hidden>
			<s:hidden name="fiCoContract.id"></s:hidden>
		</s:form>
		</div>
	</div>
	</body>
</html>
