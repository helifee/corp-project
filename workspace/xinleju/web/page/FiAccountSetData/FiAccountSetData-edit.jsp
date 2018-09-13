<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>帐套数据</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="page/FiAccountSetData/FiAccountSetData-edit.js?t=<%=System.currentTimeMillis() %>"></script>
		<script>
				var contextPath = '${pageContext.request.contextPath}';
					<s:iterator value="#request.refs" var="map">
					    var ${map.key} = ${map.value};
					</s:iterator>
		</script>
	</head>
	<body style="margin: 0px;padding: 0px;">
		<s:form action="FiAccountSetData!save" id="frm">
		<s:token/>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							帐套数据
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">提交</a>
							<a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>系统:
								</td>
								<td width="29%"   align="left"  >
									<s:radio list="#{1:'销售管理',2:'成本管理',3:'费用管理'}" name="fiAccountSetData.sysId"></s:radio>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>项目分期:
								</td>
								<td width="29%" align="left" >
									<s:textfield name="fiAccountSetData.projectName" cssStyle="width:98%"></s:textfield>									
								</td>
							</tr>			  
							<tr>
								
								<td align="right" class="sd" width="19%">
										<font color=red>*</font>付款单位:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSetData.paymentOrganName" cssStyle="width:98%"></s:textfield>
								</td><td align="right" class="sd" width="19%">
									<font color=red>*</font>
								</td>
								<td width="29%">
								</td>
							</tr>
							
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="fiAccountSetData.createDate"></s:hidden>
			<s:hidden name="fiAccountSetData.status"></s:hidden>
			<s:hidden name="fiAccountSetData.id"></s:hidden>
		</s:form>
	</body>
</html>
