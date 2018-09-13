<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>公司编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/PartyStruct/PartyStruct-editCompany.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="PartyStruct!editCompany.do" id="frm">
		<s:hidden name="company.id"></s:hidden>
		<input id="partyStructTypeId" type='hidden' name="partyStructTypeId" value="${partyStructTypeId }"></input>
		<input id="parentEntityId" type='hidden' name="parentEntityId" value="${parentEntityId }"></input>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑公司</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave()">保存</a>
						<a href="#" onclick="window.close()">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑公司</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160"><span class="alertstar">*</span>公司代码<br/><span style="color: red;">(集团编码必须为：JTBB)</span>：</th>
							<td>
								<s:textfield name="company.code"  id= "code" cssStyle="width:80%" datatype="*1-50" ajaxurl="PartyStruct!checkCompanyCode.do?id=${company.id}"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">公司简称：</th>
							<td>
								<s:textfield name="company.shortName" cssStyle="width:80%" datatype="*0-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160"><span class="alertstar">*</span>公司全称：</th>
							<td>
								<s:textfield name="company.name" cssStyle="width:80%" datatype="*1-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">公司地址：</th>
							<td>
								<s:textfield name="company.address" cssStyle="width:80%" datatype="*0-200"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">公司区域：</th>
							<td>
								<span id="companyArea"><s:if test="company.areaFix!=null">${company.areaFix}</s:if></span>
								<s:hidden name="company.areaId" id="companyAreaId"></s:hidden>
								<a href="javascript:void(0)" onclick="partyWindow();" style="color:#00c;">选择区域</a>
							</td>
						</tr>
						<tr>
							<th width="160">网址：</th>
							<td>
								<s:textfield name="company.web" cssStyle="width:80%" datatype="url" ignore="ignore"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">传真：</th>
							<td>
								<s:textfield name="company.fax" cssStyle="width:80%" datatype="*0-200"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">营业执照：</th>
							<td>
								<s:textfield name="company.license" cssStyle="width:80%" datatype="*0-200"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">法人代表：</th>
							<td>
								<s:textfield name="company.legal" cssStyle="width:80%" datatype="*0-200"></s:textfield>
							</td>
						</tr>
						<tr>
							<th width="160">是否禁用：</th>
							<td>
								<s:radio list="#{1:'是',0:'否'}" name="company.status"></s:radio><span style="color: red">&nbsp;&nbsp;&nbsp;注：请谨慎操作</span>
							</td>
						</tr>
						<tr>
							<th width="160">说明：</th>
							<td>
								<s:textarea name="company.note" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>