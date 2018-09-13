<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>流程监控设置</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/FlowMonitor/FlowMonitor-setup.js?t=<%=System.currentTimeMillis()%>"></script>
	<script src="js/App.js"/></script>  
	<%@ include file="/validate.jsp"%>
	<script type="text/javascript">
		$(function($) {
			initDatas('flowTemps','selectFlowTemps');
			initDatas('monitor','selectMonitor');
			initDatas('beMonitored','selectBeMonitored');
			if (${empty flowTempId}) {
				initDatas('suspend','selectSuspend');
				var suppendCheckbox = $(".suppendCheckbox");
				if (suppendCheckbox.attr("checked")) {
					$("#selectSuspend").attr("dataType","*1-2000");
					$(".suppend").show();
				} else {
					$("#selectSuspend").removeAttr("dataType");
					$(".suppend").hide();
				}
			} else {
				$("#selectBeMonitored").removeAttr("dataType");
				$("#selectSuspend").removeAttr("dataType");
			}
		});
	</script>
</head>
<body>
	<s:set id="flowStart" value="@com.xinleju.erp.flow.models.FlowMonitor@MONITOR_POINT_FLOW_START"></s:set>
	<s:set id="acceptSp" value="@com.xinleju.erp.flow.models.FlowMonitor@MONITOR_POINT_ACCEPT_SP"></s:set>
	<s:set id="spFinish" value="@com.xinleju.erp.flow.models.FlowMonitor@MONITOR_POINT_SP_FINISH"></s:set>
	<s:set id="flowFinish" value="@com.xinleju.erp.flow.models.FlowMonitor@MONITOR_POINT_FLOW_FINISH"></s:set>
	<s:set id="suspend" value="@com.xinleju.erp.flow.models.FlowMonitor@MONITOR_POINT_FLOW_SUSPEND"></s:set>
	<s:set id="flag" value="#request.flowTempId"></s:set>
	<s:form id="frm" action="FlowMonitor!save.do" method="post">
	<s:token/>
		<s:hidden name="flowMonitor.id" id="flowMonitorId"></s:hidden>
		<s:hidden name="flowMonitor.createTime"></s:hidden>
		<s:hidden name="flowMonitor.updateTime"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						流程监控设置
					</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:dealSave();">提交</a>
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
									<a href="#">流程监控设置</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="200px" align="right"><span style="color: red;">*</span>监控名称</td>
							<td>
								<input type="text" id="name" name="flowMonitor.name" class="input234" value="${flowMonitor.name }" dataType = "*1-50"/>
							</td>
						</tr>
						<tr>
							<td align="right"><span style="color: red;">*</span>监控点</td>
							<td>
								<s:set id="flowStart_" value="isChecked(flowMonitor.monitorPoint,#flowStart)"></s:set>
 								<input type="checkbox" name="flowMonitor.monitorPoint" value="${flowStart }" <s:if test="#flowStart_">checked="checked"</s:if>  dataType = "*"/>&nbsp;流程发起
 								
 								<s:if test="#flag == null">
 								<s:set id="acceptSp_" value="isChecked(flowMonitor.monitorPoint,#acceptSp)"></s:set>
 								<input type="checkbox" name="flowMonitor.monitorPoint" value="${acceptSp }" <s:if test="#acceptSp_">checked="checked"</s:if>/>&nbsp;收到审批
 								
 								<s:set id="spFinish_" value="isChecked(flowMonitor.monitorPoint,#spFinish)"></s:set>	
 								<input type="checkbox" name="flowMonitor.monitorPoint" value="${spFinish }" <s:if test="#spFinish_">checked="checked"</s:if>/>&nbsp;审批完成
 								</s:if>
 								<s:set id="flowFinish_" value="isChecked(flowMonitor.monitorPoint,#flowFinish)"></s:set>
 								<input type="checkbox" name="flowMonitor.monitorPoint" value="${flowFinish }" <s:if test="#flowFinish_">checked="checked"</s:if>/>&nbsp;流程完成
 								<s:if test="#flag == null">
 								<s:set id="suspend_" value="isChecked(flowMonitor.monitorPoint,#suspend)"></s:set>
 								<input type="checkbox" name="flowMonitor.monitorPoint" value="${suspend }" class="suppendCheckbox" <s:if test="#suspend_">checked="checked"</s:if> onclick="clickMe(this);"/>&nbsp;挂起
 								</s:if>		
							</td>
						</tr>
						<tr>
							<td align="right"><span style="color: red;">*</span>被监控人</td>
							<td>
								<s:if test="#flag == null">
								标准角色/公司部门/岗位/用户/项目<br/>
								<input type="hidden" id="beMonitored" name="flowMonitor.beMonitored" value="${flowMonitor.beMonitored }"/>
							    <textarea id="selectBeMonitored" rows="3" cols="100" readonly="readonly"  dataType = "*0-2000"></textarea>
							    &nbsp;<a href="javascript:var datas = document.getElementById('beMonitored').value;OpenWin('FlowMonitor!userSelect.do?opType=2&datas='+encodeURI(encodeURI(datas)));">选择</a>	<br/>
							    </s:if>
							   	流程模板集合<br/>
							   	<s:set id="flowTempNames" value="selectedFlowTempNames(flowMonitor.flowTemps)"></s:set>
 								<input type="hidden" id="flowTemps" name="flowMonitor.flowTemps" value="${flowMonitor.flowTemps }"/>
							    <textarea id="selectFlowTemps" rows="3" cols="100" readonly="readonly">${flowTempNames }</textarea>
							    <s:if test="#flag == null">
								    &nbsp;<a href="javascript:var datas = document.getElementById('flowTemps').value;OpenWin('FlowMonitor!projectListIndex.do?datas='+encodeURI(encodeURI(datas)));">选择</a>
							    </s:if>
							</td>
						</tr>												
						<tr>
							<td align="right"><span style="color: red;">*</span>监控人<br/>标准角色/岗位/用户</td>
							<td>
 								<input type="hidden" id="monitor" name="flowMonitor.monitor" value="${flowMonitor.monitor }"/>
							    <textarea id="selectMonitor" rows="3" cols="100" readonly="readonly"  dataType = "*1-2000"></textarea>
							    &nbsp;<a href="javascript:var datas = document.getElementById('monitor').value;OpenWin('FlowMonitor!userSelect.do?opType=1&datas='+encodeURI(encodeURI(datas)));">选择</a>								
							</td>
						</tr>
						<tr class="suppend" style="display:none;">
							<td align="right"><span style="color: red;">*</span>挂起监控人<br/>标准角色/岗位/用户</td>
							<td>
 								<input type="hidden" id="suspend" name="flowMonitor.suspend" value="${flowMonitor.suspend }"/>
							    <textarea id="selectSuspend" rows="3" cols="100" readonly="readonly"  dataType = "*1-2000"></textarea>
							    &nbsp;<a href="javascript:var datas = document.getElementById('suspend').value;OpenWin('FlowMonitor!userSelect.do?opType=3&datas='+encodeURI(encodeURI(datas)));">选择</a>								
							</td>
						</tr>						
						<tr>
							<td align="right"><span style="color: red;">*</span>状态</td>
							<td>
								<input type="radio" name="flowMonitor.useStatus" value="2" <s:if test="flowMonitor.useStatus == 2">checked="checked"</s:if>  dataType = "*"/>&nbsp;启用
								<input type="radio" name="flowMonitor.useStatus" value="1" <s:if test="flowMonitor.useStatus == 1">checked="checked"</s:if>/>&nbsp;禁用
							</td>
						</tr>													
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>
