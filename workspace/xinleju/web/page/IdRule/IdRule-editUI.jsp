<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>编号规则</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="page/IdRule/IdRule_edit.js?t=<%=System.currentTimeMillis() %>"></script>
<%@ include file="/validate.jsp"%>
</head>
<s:set id="year" value="@com.xinleju.erp.frame.models.IdRule@TYPE_YEAR"></s:set>
<s:set id="month" value="@com.xinleju.erp.frame.models.IdRule@TYPE_MONTH"></s:set>
<s:set id="day" value="@com.xinleju.erp.frame.models.IdRule@TYPE_DAY"></s:set>
<s:set id="no" value="@com.xinleju.erp.frame.models.IdRule@TYPE_NO"></s:set>
<s:set id="statusY" value="@com.xinleju.erp.frame.models.IdRule@STATUS_Y"></s:set>
<s:set id="statusN" value="@com.xinleju.erp.frame.models.IdRule@STATUS_N"></s:set>
<body style="margin: 0px;padding: 0px;">
	<s:form action="IdRule!save" id="frm" name="frm">
		<s:hidden name="idRule.id"></s:hidden>
		<input type="hidden" id="oldCode" name="oldCode" value="${idRule.code }"/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">编号规则</div>
					<div class="wdtable_titletool">
						<a href="javascript:void(0);" onclick="edit();">提交</a><a href="#" onclick="window.close();">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
						<tr>
							<td align="right" class="sd" width="20%">编号规则名称:</td>
							<td width="30%">
							     <input type="text" name="idRule.name" id="name" value="${idRule.name }"/>
							</td>
							<td align="right" class="sd" width="20%">编码:</td>
							<td width="30%">
							     <input type="text" name="idRule.code" id="code" value="${idRule.code }" onblur="validateCode(this.value);"/>
							</td>
						</tr>
						<tr>
							<td align="right" class="sd" width="20%">流水号期间:</td>
							<td width="30%">
							     <input type="radio" name="idRule.type" value="1" <s:if test="idRule == null || idRule.type == #year">checked="checked"</s:if> />&nbsp;按年度&nbsp;
							     <input type="radio" name="idRule.type" value="2" <s:if test="idRule.type == #month">checked="checked"</s:if> />&nbsp;按月份&nbsp;
                                 <input type="radio" name="idRule.type" value="3" <s:if test="idRule.type == #day">checked="checked"</s:if> />&nbsp;按天&nbsp;
                                 <input type="radio" name="idRule.type" value="4" <s:if test="idRule.type == #no">checked="checked"</s:if> />&nbsp;无限期&nbsp;							     
							</td>
							<td align="right" class="sd" width="20%">流水号位数:</td>
							<td width="30%">
							     <input type="text" name="idRule.len" id="len" value="${idRule.len }"/>
							</td>
						</tr>
						<tr>
							<td align="right" class="sd" width="20%">状态:</td>
							<td colspan="3">
							     <input type="radio" name="idRule.status" value="1" <s:if test="idRule == null || idRule.status == #statusY">checked="checked"</s:if> />&nbsp;启用&nbsp;<input type="radio" name="idRule.status" value="2" <s:if test="idRule.status == #statusN">checked="checked"</s:if> />&nbsp;禁用
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
