<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<s:form action="Form!readLogList.do" method="POST" id="frm" name="frm">
	<s:hidden name="start"></s:hidden>
	<s:hidden name="fiId" value="%{#request.fiId}"></s:hidden>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="#">阅读记录</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<tr>
			<th width="50px">可阅人员</th>
			<td align="left" colspan="3">${fi.readUsersName}</td>
		</tr>
		<tr>
			<th width="50px">已阅人员</th>
			<td align="left" colspan="3">${readerUserNames}</td>
		</tr>
		<tr>
			<th width="50px">序号</th>
			<th>阅读者</th>
			<th width="120px">阅读时间</th>
			<!-- 
			<th width="120px">阅读时审批状态</th>
			 -->
		</tr>
		<s:if test="null != page && null != page.items && page.items.size() > 0">
		<s:iterator value="page.items" var="rl" status="rls">
			<tr>
				<td align="center">
					${rls.count}
				</td>
				<td align="left">
					${rl.readerName}
				</td>
				<td align="center">
					<s:date name="#rl.createDate" format="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<!-- 
				<td align="center">
					<s:if test="@com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING == #rl.fiStatus">
						进行中
					</s:if>
					<s:elseif test="@com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE == #rl.fiStatus">
						已结束
					</s:elseif>
				</td>
				 -->
			</tr>
		</s:iterator>
		</s:if>
		<s:else>
			<tr>
				<td colspan="4">&nbsp;</td>
			</tr>
		</s:else>
	</table>
	<div class="page">
		<div style="float: left;">
		</div>
		<app:PageTag actionName="Form!readLogList.do"></app:PageTag>
	</div>
	<s:token />
</s:form>
</body>
</html>