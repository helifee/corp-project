<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>逾期设置</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/FlowWarning/FlowWarning-setup.js?t=<%=System.currentTimeMillis()%>"></script>
	<script src="js/App.js"/></script>  
	<%@ include file="/validate.jsp"%>
	<script type="text/javascript">
		$(document).ready(function() {
			initDatas('noNoticeUsers','selectNoNoticeUsers');
			initDatas('noticeUsers','selectUsers');
		});
	</script>
</head>
<body>
	<s:set id="nonWorkDay" value="@com.xinleju.erp.flow.models.FlowWarning@NON_WORK_DAY"></s:set>
	<s:set id="workDay" value="@com.xinleju.erp.flow.models.FlowWarning@WORK_DAY"></s:set>
	<s:set id="noticeTypeNon" value="@com.xinleju.erp.flow.models.FlowWarning@NOTICE_TYPE_NON"></s:set>
	<s:set id="noticeTypeSmg" value="@com.xinleju.erp.flow.models.FlowWarning@NOTICE_TYPE_SMG"></s:set>
	<s:set id="noticeTypeSms" value="@com.xinleju.erp.flow.models.FlowWarning@NOTICE_TYPE_SMS"></s:set>
	<s:set id="noticeTypeEmail" value="@com.xinleju.erp.flow.models.FlowWarning@NOTICE_TYPE_EMAIL"></s:set>
	<s:form id="frm" action="FlowWarning!save.do" method="post">
	<s:token/>
		<s:hidden name="flowWarning.id" id="flowWarningId"></s:hidden>
		<s:hidden name="flowWarning.createTime" id="flowWarning.createTime"></s:hidden>
		<s:hidden name="flowWarning.updateTime" id="flowWarning.updateTime"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						逾期设置
					</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:save();">提交</a>
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
									<a href="#">逾期设置</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="200px" align="right"><span style="color: red;">*</span>标准审批时间</td>
							<td>
								<input type="text" id="standardSpTimeRange" name="flowWarning.standardSpTimeRange" class="input234" value="${flowWarning.standardSpTimeRange }"/>
								&nbsp;(审批人从收到待办开始到提交的时间)
							</td>
						</tr>
						<tr>
							<td width="200px" align="right"><span style="color: red;">*</span>例外<br/>标准角色/岗位/用户</td>
							<td>
 								<input type="hidden" id="noNoticeUsers" name="flowWarning.noNoticeUsers" value="${flowWarning.noNoticeUsers }"/>
							    <textarea id="selectNoNoticeUsers" rows="5" cols="100" readonly="readonly"></textarea>
							    &nbsp;<a href="javascript:var datas = document.getElementById('noNoticeUsers').value;OpenWin('FlowWarning!userSelect.do?opType=1&datas='+encodeURI(encodeURI(datas)));">选择</a>								
							</td>
						</tr>						
						<tr>
							<td align="right"><span style="color: red;">*</span>是否包含非工作日</td>
							<td>
								<input type="radio"  name="flowWarning.isWorkDays" value="${workDay }"
									<s:if test="flowWarning.isWorkDays == #workDay">checked="checked"</s:if>
								/>&nbsp;是
								<input type="radio"  name="flowWarning.isWorkDays" value="${nonWorkDay }"
									<s:if test="flowWarning == null || flowWarning.isWorkDays == #nonWorkDay">checked="checked"</s:if>
								/>&nbsp;否
							</td>
						</tr>
						<tr>
							<td align="right"><span style="color: red;">*</span>逾期通知本人</td>
							<td>
								通知方式：
							    <input type="radio" name="flowWarning.noticeType4Self" value="${noticeTypeNon }"
							    	<s:if test="flowWarning.noticeType4Self == #noticeTypeNon">checked="checked"</s:if>
							    />&nbsp;不通知
							    <input type="radio" name="flowWarning.noticeType4Self" value="${noticeTypeSmg }"
							    	<s:if test="flowWarning.noticeType4Self == #noticeTypeSmg">checked="checked"</s:if>
							    />&nbsp;发送消息催办
							    <input type="radio" name="flowWarning.noticeType4Self" value="${noticeTypeSms }"
							    	<s:if test="flowWarning.noticeType4Self == #noticeTypeSms">checked="checked"</s:if>
							    />&nbsp;发送短信催办
							    <input type="radio" name="flowWarning.noticeType4Self" value="${noticeTypeEmail }"
							    	<s:if test="flowWarning.noticeType4Self == #noticeTypeEmail">checked="checked"</s:if>
							    />&nbsp;发送邮件催办
							    <br/>
							    每隔&nbsp;
							    <input type="text" id="noticeInterval4Self" name="flowWarning.noticeInterval4Self" value="${flowWarning.noticeInterval4Self }"
							    	style="width:50px"
							    />&nbsp;小时再次通知
							</td>
						</tr>
						<tr>
							<td align="right"><span style="color: red;">*</span>逾期通知上级</td>
							<td>
								在逾期&nbsp;<input type="text" id="overdue4Leader" name="flowWarning.overdue4Leader" value="${flowWarning.overdue4Leader }"
							    	style="width:50px"
							    />小时后通知
							    <br/>通知方式：
							    <input type="radio" name="flowWarning.noticeType4Leader" value="${noticeTypeNon }"
							    	<s:if test="flowWarning.noticeType4Leader == #noticeTypeNon">checked="checked"</s:if>
							    />&nbsp;不通知
							    <input type="radio" name="flowWarning.noticeType4Leader" value="${noticeTypeSmg }"
							    	<s:if test="flowWarning.noticeType4Leader == #noticeTypeSmg">checked="checked"</s:if>
							    />&nbsp;发送消息催办
							    <input type="radio" name="flowWarning.noticeType4Leader" value="${noticeTypeSms }"
							    	<s:if test="flowWarning.noticeType4Leader == #noticeTypeSms">checked="checked"</s:if>
							    />&nbsp;发送短信催办
							    <input type="radio" name="flowWarning.noticeType4Leader" value="${noticeTypeEmail }"
							    	<s:if test="flowWarning.noticeType4Leader == #noticeTypeEmail">checked="checked"</s:if>
							    />&nbsp;发送邮件催办
							    <br/>
							    每隔&nbsp;
							    <input type="text" id="noticeInterval4Leader" name="flowWarning.noticeInterval4Leader" value="${flowWarning.noticeInterval4Leader }"
							    	style="width:50px"
							    />&nbsp;小时再次通知
							</td>
						</tr>						
						<tr>
							<td align="right"><span style="color: red;">*</span>逾期通知<br/>标准角色/岗位/用户</td>
							<td>
								在逾期&nbsp;<input type="text" id="overdue4Others" name="flowWarning.overdue4Others" value="${flowWarning.overdue4Others }"
							    	style="width:50px"
							    />小时后通知<br/>
							    <input type="hidden" id="noticeUsers" name="flowWarning.noticeUsers" value="${flowWarning.noticeUsers }"/>
							    <textarea id="selectUsers" rows="5" cols="100" readonly="readonly"></textarea>
							    &nbsp;<a href="javascript:var datas = document.getElementById('noticeUsers').value;OpenWin('FlowWarning!userSelect.do?opType=2&datas='+encodeURI(encodeURI(datas)));">选择</a>
							    <br/>通知方式：
							    <input type="radio" name="flowWarning.noticeType4Others" value="${noticeTypeNon }"
							    	<s:if test="flowWarning.noticeType4Others == #noticeTypeNon">checked="checked"</s:if>
							    />&nbsp;不通知
							    <input type="radio" name="flowWarning.noticeType4Others" value="${noticeTypeSmg }"
							    	<s:if test="flowWarning.noticeType4Others == #noticeTypeSmg">checked="checked"</s:if>
							    />&nbsp;发送消息催办
							    <input type="radio" name="flowWarning.noticeType4Others" value="${noticeTypeSms }"
							    	<s:if test="flowWarning.noticeType4Others == #noticeTypeSms">checked="checked"</s:if>
							    />&nbsp;发送短信催办
							    <input type="radio" name="flowWarning.noticeType4Others" value="${noticeTypeEmail }"
							    	<s:if test="flowWarning.noticeType4Others == #noticeTypeEmail">checked="checked"</s:if>
							    />&nbsp;发送邮件催办
							    <br/>
							    每隔&nbsp;
							    <input type="text" id="noticeInterval4Others" name="flowWarning.noticeInterval4Others" value="${flowWarning.noticeInterval4Others }"
							    	style="width:50px"
							    />&nbsp;小时再次通知
							</td>
						</tr>	
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
