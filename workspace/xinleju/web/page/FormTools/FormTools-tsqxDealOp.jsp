<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>审批信息</title>
	<base target="_self" />
	<script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext/ext-all.js"></script>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="scripts/application.js"></script>
	<meta name="viewport" content="width=device-width" />
	<script src="scripts/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/FormTools/FormTools-tsqxDealOp.js"></script>
	</style>
</head>
<body onload="">
	<form action="Form!completeWork.do" method="post" name="spFrm" id="spFrm">
		<input type="hidden" value="true" name="dealSpCallBack"/>
		<input type="hidden" value="${curSp.id}" name="spId"/>
		<input type="hidden" value="${wiId}" name="spWiId"/>
		<s:set id="spDealTypeXb" value="@com.telehot.flowutils.utils.OpType@XB"></s:set>
		<s:set id="spDealTypeZb" value="@com.telehot.flowutils.utils.OpType@ZB"></s:set>
		<s:set id="spDealTypeBh" value="@com.telehot.flowutils.utils.OpType@BH"></s:set>
		<input type="hidden" value="${spDealTypeXb}" id="spDealTypeXb"/>
		<input type="hidden" value="${spDealTypeZb}" id="spDealTypeZb"/>
		<input type="hidden" value="${spDealTypeBh}" id="spDealTypeBh"/>
		<input type="hidden" value="" id="maxUserCount"/>
		<input type="hidden" name="opName" value="" id="opNameHid"/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">
						<a href="#">审批操作</a>
					</div>
				</td>
			</tr>
		</table>
		<s:if test="#request.spStep !=null && #request.spStep.size() > 0 && #request.isDb==@com.telehot.flow.model.Sp@YES">
			<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist04">
				<!-- 审批流程区域 -->
				<tr>
					<th style=" width:52px;text-align: right;">
						即将流向:
					</th>
					<td align="left" style="margin-left: 10px;">
						<s:if test="#request.nextWp != null">
							${nextWp.displayName}<b><s:if test="null != #request.nextWp.participantsDisplayName && '' != #request.nextWp.participantsDisplayName">(<span id="participantsDisplayNameSpan">${nextWp.participantsDisplayName}</span>)</s:if></b>
						</s:if>
					</td>
				</tr>
				<!-- 第一个节点需要选岗位 -->
				<s:if test="!#request.isStartWp">
				<!-- 审批操作按钮区域 -->
				<tr>
					<th style="text-align: right;">操作:</th>
					</td>
					<td align="left" style="margin-left: 10px;">
						<s:if test="#request.spButtons !=null && #request.spButtons[@com.telehot.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB].size()>0">
							<s:iterator value="#request.spButtons[@com.telehot.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
								<input type="radio" name="opCode" value="${btn.opBean.code}" alt="${btn.name}" note = "${btn.opBean.note}" noteType = "${btn.opBean.noteType}" onclick="changeOpType('${btn.opBean.code}','${btn.name}','${btn.opBean.note}','${btn.opBean.noteType}');"/>${btn.name}</b>
								<s:if test="#btnS.count%4 == 0">
									</br>
								</s:if>
							</s:iterator>
						</s:if>
						<!-- 操作人选择区域 -->
						<div style="margin-top: 10px;" id="selectUserDiv">
							<input type="text" name="dealUsersNames" id="dealUsersNames" class="readonly" value="${dealUserNames }" style="width:60%;" readonly="readonly"/>
							<input type="hidden" name="dealUsersIds" id="dealUsersIds" style="width:100px;" value="${dealUserIds }"/>
							<input type="button" value="选择操作人" onclick="selectParticipantByDomOp('dealUsersIds','dealUsersNames');"/>
						</div>
						<!-- 需要退回到的节点区域 -->
						<div style="margin-top: 10px;" id="backToWpDiv">
							打回到:&nbsp;<select name="backToWpId" title="打回到的节点" style="width: 160px;margin-bottom: 2px;">
								<option value="">请选择</option>
								<s:if test="#request.runningSpStep[#request.curSp] != null && #request.runningSpStep[#request.curSp].size() > 0">
									<s:iterator value="#request.runningSpStep[#request.curSp]" var="p" status="pIndex">
										<!-- 审批流每一步参与人 -->
										<s:if test="#request.curWp.tp > #p.tp">
											<option value="${p.wpId}">${p.displayName}</option>
										</s:if>
									</s:iterator>
								</s:if>
							</select>
							</br>
							是否重新审批:<input type="checkbox" checked="checked" name="backSkip" value="false" />
						</div>
						
					</td>
				</tr>
				</s:if>
				<s:else>
					<s:iterator value="#request.spButtons[@com.telehot.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
						<input type="checkbox" name="opCode" id="opCode" style="width:100px;display: none;" value="${btn.opBean.code}" alt="${btn.name}" note = "${btn.opBean.note}" noteType = "${btn.opBean.noteType}" checked="checked"/>
						<s:if test="#btnS.count%4 == 0">
							</br>
						</s:if>
					</s:iterator>
				</s:else>
				<tr>
					<th style="text-align: right;">处理意见:<br/></th>
					<td>常用意见:&nbsp;<s:select id="spNoteSelectId" style="width: 148px;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.spCyyList" listKey="note" listValue="note" onchange="addNote(this.value);"></s:select>&nbsp;<a href="#" onclick="editSpNote('${curWi.participant.userId}');return false;">自定义</a><BR>
						<textarea id="spUserNote" name="spUserNote" rows="2" style="width: 98%;">${curWi.userNote }</textarea>
					</td>
				</tr>
				<!-- 第一个节点需要选岗位 -->
				<s:if test="#request.isStartWp">
				<!-- 发起角色-->
				<tr style="" id="spGwTr">
					<th style="text-align: right;">发起角色:<br/></th>
					<td>
						<s:select name="spGw" title="发起角色" style="width: 210px;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.userRoles" listKey="id" listValue="name" value="%{#request.curSp.startpPostId}"  onchange="rebuildFi(this.value,'%{#request.curWi.fiId}','%{#request.curSp.id}','%{#request.curWi.participant.userId}')"></s:select></br>
					</td>
				</tr>
				</s:if>
			</table>
			<!-- 发起审批操作按钮区域 -->
			<div style="margin:auto;text-align:center;margin-top: 10px;">
				<s:if test="#request.isDb">
					<input type="button" name="button3" id="button2" onclick="canSubmit('${curSp.spFiId}','${wiId}','${curSp.id}');return false;" value="提交" class="sptj"/>
				</s:if>
			</div>
		</s:if>
		<s:else>
			<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist04">
				<!-- 审批流程区域 -->
				<tr>
					<th style=" width:52px;text-align: right;">
						即将流向:
					</th>
					<td align="left" style="margin-left: 10px;">
						&nbsp;
					</td>
				</tr>
				<!-- 审批操作按钮区域 -->
				<tr>
					<th style="text-align: right;">操作:</th>
					</td>
					<td align="left" style="margin-left: 10px;">
						&nbsp;
					</td>
				</tr>
				<tr>
					<th style="text-align: right;">处理意见:<br/></th>
					<td>
						&nbsp;
					</td>
				</tr>
				<!-- 发起角色-->
				<tr style="" id="spGwTr">
					<th style="text-align: right;">发起角色:<br/></th>
					<td>
						&nbsp;
					</td>
				</tr>
			</table>
			<!-- 发起审批操作按钮区域 -->
			<div style="margin:auto;text-align:center;margin-top: 10px;">
				<input type="button" name="button3" id="button2" onclick="alert('不能操作！');return false;" value="提交" class="sptj"/>
			</div>
		</s:else>
		<s:token></s:token>
	</form>
</body>