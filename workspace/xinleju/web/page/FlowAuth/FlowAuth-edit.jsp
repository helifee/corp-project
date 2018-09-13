<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%@ include file="/validate.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>流程授权编辑</title>
	<link href="css/xy_data.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/xy_data.js"></script>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="page/FlowAuth/FlowAuth-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="FlowAuth!save" id="frm">
	<s:token/>
		<s:hidden name="flowAuth.id"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">流程授权</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave()">保存</a>
						<a href="#" onclick="window.close();">关闭</a>
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
									<a href="#">流程授权</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>授权类型：</th>
							<td width="40%"><input type="radio" value="0" checked="checked" />&nbsp;&nbsp;授权处理</td>
							<th width="160"><span class="alertstar">*</span>授权人：</th>
							<td width="30%">
								<input type="hidden" name="flowAuth.authUserId" value="${flowAuth.authUserId }" id="authUserId" />
								<input type="text" id="authUserName" readonly="true" value="${flowAuth.authUser.realName }" validate="{required:true,maxlength:200}" class="t8 opt" onclick="selectUser('authUserId','authUserName',1);" />
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>授权项：</th>
							<input type="hidden" name="flowAuth.authItems" id="authItems" value="${flowAuth.authItems }" />
							<td id="dispAuthItems" >
							<s:iterator value="#request.jobs" var="job" status="stat">
								<input type="checkbox" name="jobs" value="${job.id }" />&nbsp;<span>${job.namefix }</span></br>
							</s:iterator>
							</td>
							<th width="160"><span class="alertstar">*</span>被授权人：</th>
							<td>
								<input type="hidden" name="flowAuth.auth2UserId" value="${flowAuth.auth2UserId }" id="auth2UserId" />
								<input type="text" id="auth2UserName" readonly="true"  value="${flowAuth.auth2User.realName }" validate="{required:true,maxlength:200}" class="t8 opt" onclick="selectUser('auth2UserId','auth2UserName');" />
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>授权范围：</th>
							<td colspan="3">
								<input type="hidden" name="flowAuth.authScope" id="authScope"  value="${flowAuth.authScope }" />
								<div id="scope">
									<select id="selFlowList" multiple="multiple" style="height: 230px; width: 100%;">
										<s:iterator value="#request.scopes" var="scope" status="stat">
											<option value='${scope.flowCode }'>${scope.flowName }</option>
										</s:iterator>
									</select>
								</div>
								<br/>
								<input type="button" id="selScope" value="选择" onclick="unionFlow();" />&nbsp;<span>(为空则选择所有流程进行授权)</span>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>授权时间：</th>
							<td colspan="3">
								从<s:date name="flowAuth.authBeginDate" format="yyyy-MM-dd HH:mm:ss" id="authBeginDate" />
				                 <s:textfield name="flowAuth.authBeginDate" id="date_into" value="%{authBeginDate}" cssClass="t8 car" style="width:150px"
				                 	onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})"  validate="{required:true,maxlength:200}"></s:textfield>
								 到 <s:date name="flowAuth.authEndDate" format="yyyy-MM-dd HH:mm:ss" id="authEndDate" />
				                 <s:textfield name="flowAuth.authEndDate" id="date_into" value="%{authEndDate}" cssClass="t8 car" style="width:150px"
				                 	onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})"  validate="{required:true,maxlength:200}"></s:textfield>
								<br/>
								<input type="hidden" name="flowAuth.transFlg" id="transFlg" value="${flowAuth.transFlg }" />
								<input type="checkbox" id="isTransfer" onclick="chgTransfer();" />&nbsp;已生成待办立即转移
							</td>
						</tr>
						<tr>
							<th>状态：</th>
							<td colspan="3"><s:radio list="#{'0':'启用','1':'禁用'}" id="status" name="flowAuth.status" ></s:radio></td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>录入人：</th>
							<input type="hidden" name="flowAuth.createUserId" value="${flowAuth.createUserId }" />
							<td>${flowAuth.createUser.realName}</td>
							<th width="160"><span class="alertstar">*</span>录入时间：</th>
							<td>
								<s:date name="flowAuth.createDate" format="yyyy-MM-dd HH:mm:ss" id="createDate" />
								<input type="hidden" name="flowAuth.createDate" value="${createDate}" />
								${createDate }
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
