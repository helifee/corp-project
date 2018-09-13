<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>流程模板列表</title>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script language="javascript" type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript" src="page/FlowAuth/FlowAuth-unionFlow.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript">
	var selRole = "${selRole}";
</script>
</head>
<body>
	<div id="wrapper">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">流程模板列表</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="rtnSelFlow();window.close();">确定</a>
						<a href="#" onclick="window.close();">取消</a>
					</div>
				</td>
			</tr> 
		</table>
		<form id="frm" action="FlowAuth!getUserAuthScope.do" method="post">
		<table width="99.9%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="280" valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				        <div class="hh">业务对象</div>
				    </div>
					<div id="tree" style="height:350px;overflow-y:auto;"></div>
				</td>
				<td width="6" valign="top">&nbsp;</td>
				<td valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				        <div class="hh">流程模板列表(双击选择)</div>
				    </div> 
					<div>
						<select id="scopesItems" multiple="multiple" style="height: 230px; width: 100%;" ondblclick="selFlow();">
						</select>
					</div>
				</td>
				<td>&nbsp;</td>
				<td valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				        <div class="hh">流程模板列表(双击取消选择)</div>
				    </div> 
					<div>
						<select id="selFlowList" multiple="multiple" style="height: 230px; width: 100%;" ondblclick="removeSelFlow();">
							<s:iterator value="#request.authScope" var="scope" status="stat">
								<option value='${scope.flowCode }'>${scope.flowName }</option>
							</s:iterator>
						</select>
					</div>
				</td>
			</tr>
		</table>
		</form>
	</div>
</body>
</html>