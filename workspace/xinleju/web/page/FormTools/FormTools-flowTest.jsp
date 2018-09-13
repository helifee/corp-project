<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>流程仿真</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="page/FormTools/FormTools-flowTest.js"></script>
</head>
<body>
	<form id="frm" action="FormTools!flowTest.do" method="post">
		<s:hidden name="id"></s:hidden>
		<input type="hidden" value="Form!historyInfo.do?fiId=${fiId}&t=123" id="historyInfo_url" />
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						流程仿真
					</div>
					<div class="wdtable_titletool">
						<input type="button" class="dfbtn" onclick="flowTest();" value="仿真"/>
						<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									流程仿真[${fl.flowName}]
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<s:if test="null != condNameList && condNameList.size() > 0">
						<s:iterator value="condNameList" var="item" status="itemStatus">
							<s:hidden name="condNameList[%{#itemStatus.index}]" value="%{#item}"></s:hidden>
							<s:if test="#itemStatus.isOdd()">
								<s:if test="#itemStatus.isLast()">
									<tr>
										<td align="right">${item}</td>
										<td align="left">
											<s:textfield name="%{#item}" value="%{#request.condValueMap[#item]}"></s:textfield>
										</td>
										<td align="right">&nbsp;</td>
										<td align="left">
											&nbsp;
										</td>
									</tr>
								</s:if>
								<s:else>
									<tr>
										<td align="right">${item}</td>
										<td align="left">
											<s:textfield name="%{#item}" value="%{#request.condValueMap[#item]}"></s:textfield>
										</td>
								</s:else>
							</s:if>
							<s:else>
									<td align="right">${item}</td>
									<td align="left">
										<s:textfield name="%{#item}" value="%{#request.condValueMap[#item]}"></s:textfield>
									</td>
								</tr>
							</s:else>
						</s:iterator>
						</s:if>
						<tr>
							<td align="right" colspan="1">发起岗位</td>
							<td align="left" colspan="3">
								<input type="text" name="startPeName" id="startPeName" class="readonly" value="${startPeName}" style="width:60%;" readonly="readonly"/>
								<input type="hidden" name="startPeId" id="startPeId" style="width:100px;" value="${startPeId}"/>
								<input type="button" value="选择发起岗位" onclick="selectStartPeByDomOp('startPeId','startPeName');"/>
							</td>
						</tr>
					</table>
					<jsp:include page="../Form/Form_history.jsp" flush="true" />
				</td>
			</tr>
		</table>
	</form>
</body>
</html>