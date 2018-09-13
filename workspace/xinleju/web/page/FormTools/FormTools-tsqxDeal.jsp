<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>特殊权限操作</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="page/FormTools/FormTools-tsqxDeal.js"></script>
</head>
<body>
	<s:form action="FormTools!tsqxDeal.do" id="frm">
	<s:hidden name="fiId" value="%{#request.CurrentFi.Id}"></s:hidden>
	<div class="wdtable_title_sp">
		<div class="wdtable_title_sp_t">
			<a href="javascript:void(0)" onclick="viewGraph('${currentFi.id}')">${currentFi.fiName}</a>
		</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" value="一键通过审批" onclick="doAllWi('${currentFi.id}');return false;"/>
			<input type="button" class="dfbtn" onclick="window.returnValue ='reFlash';window.close();" value="关闭"/>
		</div>
	</div>
	<div class="spttt">${currentSp.spTitle}</div>
	<div class="sp_wrapper">
		<div class="sp_wrapper_left" style="margin-bottom: 10px;">
			<!-- 审批任务列表 -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
				<tr>
					<td>
						<div class="divh3_title">工作列表</div>
						<div class="divh3_time">
							<s:if test="#request.currentSp != null">
								跳转到后续节点：<select style="width: 300px;" onchange="gotoWp(this.options[this.options.selectedIndex].id,this.options[this.options.selectedIndex].value);">
									<option value="">&nbsp;</option>
									<s:iterator value="#request.wps" var="gotoWp" status="gotoWpStatus">
										<s:if test="#gotoWp.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_CREATED">
											<option value="${gotoWp.displayName}" id="${gotoWp.wpId}">${gotoWp.displayName}<b>【${gotoWp.participantsDisplayName}】</b></option>
										</s:if>
									</s:iterator>
								</select>
							</s:if>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">&nbsp;</th>
					<th width="60px;">WID</th>
					<th width="135px;">参与人</th>
					<th width="100px;">所在环节</th>
					<th width="100px;">状态[编码]</th>
					<th width="120px;">开始时间</th>
					<th width="120px;">处理时间</th>
					<th>处理意见</th>
					<th width="120px;">操作</th>
				</tr>
				<s:iterator value="#request.wis" id="wi" status="stat">
					<tr>
						<td align="center">
							<input name="wiIds" id="wiId_${wi.wiId}" type="checkbox" value="${wi.wiId}" onclick="changeWi('${wi.wiId}');"/>
						</td>
						<td align="center">
							${wi.wiId}
						</td>
						<td align="center">
							<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING">
								${wi.participant.userName }
							</s:if>
							<s:elseif test="#wi.completeUser.userId != #wi.participant.userId">
								${wi.participant.userName }<br/>(${wi.completeUser.userName}[代])
							</s:elseif>
							<s:else>
								${wi.participant.userName }
							</s:else>
						</td>
						<td align="center">
							${wi.wiName}
						</td>
						<td align="center">
							<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_CREATED">创建</s:if>
							<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING">运行</s:if>
							<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">完成</s:if>
							<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_OVERDUE">过期</s:if>[${wi.status}]
						</td>
						<td align="center"><input id="s_t_${wi.wiId}" value="${wi.startTime}" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" readonly="true" /></td>
						<td align="center"><input id="c_t_${wi.wiId}" value="${wi.completeTime}" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" readonly="true" /></td>
						<td align="center"><input type="text" id="wi_note_${wi.wiId}" value="${wi.userNote }"/></td>
						<td align="center">
							<select style="width: 90%" id="opSelectId_${wi.wiId }" onchange="synWork(${wi.wiId},this.value,$('#wi_note_${wi.wiId}').val(),$('#c_t_${wi.wiId}').val(),$('#s_t_${wi.wiId}').val())">
								<option value="">&nbsp;</option>
								<option value="1">工作废除</option>
								<s:if test="#wi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING">
									<option value="2">更换参与人</option>
								</s:if>
								<option value="3">仅物理删除当前工作</option>
								<option value="4">仅更新审批信息</option>
							</select>
						</td>
					</tr>
				</s:iterator>
			</table>
		</div>
		<div class="sp_wrapper_right Noprn" id="sp_wrapper_right">
			<!-- 操作 -->
			<iframe id="tsqxDealOpFrame" src="FormTools!tsqxDealOp.do?wiId=${wiId}" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('tsqxDealOpFrame',30);if(Browser.isIE6() || Browser.isIE7()){$('body').unmask();}else{$('body',window.parent.document).unmask();};"></iframe>
		</div>
	</div>
	</s:form>
</body>
</html>