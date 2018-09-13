<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<meta name="viewport" content="width=device-width" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<style>
.sptj{
	border:none;
	font-size:16px;
}
.wdtable_title_sp_tool{
	
}
.spttt{
	top:36px;
}
.sp_wrapper{
	padding-top:66px;
}
.sp_wrapper_right{
	top:72px;
}
.wd_tablelist04 input{
	vertical-align:middle;
	margin-right:1px;
}
</style>
<script type="text/javascript" src="page/Form/Form_op.js"></script>
<form action="Form!completeWork.do" method="post" name="spFrm" id="spFrm">
<input type="hidden" value="${fiId }" name="fiId"/>
<input type="hidden" value="${spWiId }" name="spWiId"/>
<s:set id="spDealTypeXb" value="@com.xinleju.erp.flow.flowutils.utils.OpType@XB"></s:set>
<s:set id="spDealTypeZb" value="@com.xinleju.erp.flow.flowutils.utils.OpType@ZB"></s:set>
<s:set id="spDealTypeBh" value="@com.xinleju.erp.flow.flowutils.utils.OpType@BH"></s:set>
<input type="hidden" value="${spDealTypeXb}" id="spDealTypeXb"/>
<input type="hidden" value="${spDealTypeZb}" id="spDealTypeZb"/>
<input type="hidden" value="${spDealTypeBh}" id="spDealTypeBh"/>
<input type="hidden" value="" id="maxUserCount"/>
<input type="hidden" name="opName" value="" id="opNameHid"/>
<input type="hidden" name="flowInsName" value="" id="flowInsName"/>

<input type="hidden" value="${isStart}" id="isStart"/>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
	<tr>
		<td>
			<div class="divh3_title">
				<a href="#">审批操作</a>
			</div>
		</td>
	</tr>
</table>
<!-- Fi status=1 运行状态 -->
<s:if test="#request.curFi !=null && #request.curFi.status==1 && #request.isDb==@com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist04">
		<!-- 审批流程区域 -->
		<tr>
			<th style=" width:52px;text-align: right;height:34px;">
				即将流向:
			</th>
			<td align="left" style="margin-left: 10px;">
				<s:if test="#request.nextWp != null">
					${nextWp.displayName}<b><s:if test="null != #request.nextWpParticipantsDisplayName && '' != #request.nextWpParticipantsDisplayName">(<span id="participantsDisplayNameSpan">${nextWpParticipantsDisplayName}</span>)</s:if></b>
				</s:if>
			</td>
		</tr>
		<!-- 第一个节点需要选岗位 -->
		<s:if test="!#request.isStartWp">
		<!-- 审批操作按钮区域 -->
		<tr>
			<th style="text-align: right;height:34px;">操作:</th>
			</td>
			<td align="left" style="margin-left: 10px;">
				<s:if test="#request.spButtons !=null && #request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB].size()>0">
					<s:iterator value="#request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
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
					打回到:&nbsp;<select id="reject_approve" name="backToWpId" title="打回到的节点" style="width: 160px;margin-bottom: 2px;" onchange="afresh();">
						<!-- <option value="">请选择</option> -->
						<s:if test="#request.runningSpStep != null && #request.runningSpStep.size() > 0">
							<s:iterator value="#request.runningSpStep" var="p" status="pIndex">
								<!-- 审批流每一步参与人 -->
								<s:if test="#request.curWp.tp > #p.tp">
									<option value="${p.wpId}">${p.displayName}</option>
								</s:if>
							</s:iterator>
						</s:if>
					</select>
					<br/>
					<label id="lbl_afresh_approve" for="afresh_approve">是否重新审批：</label><input id="afresh_approve" type="checkbox" name="backSkip" value="false" />
				</div>
				
			</td>
		</tr>
		</s:if>
		<s:else>
			<s:iterator value="#request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
				<input type="checkbox" name="opCode" id="opCode" style="width:100px;display: none;" value="${btn.opBean.code}" alt="${btn.name}" note = "${btn.opBean.note}" noteType = "${btn.opBean.noteType}" checked="checked"/>
				<s:if test="#btnS.count%4 == 0">
					<br/>
				</s:if>
			</s:iterator>
		</s:else>
		<tr>
			<th style="text-align: right;">处理意见:<br/></th>
			<td style="padding-top:10px;padding-bottom:10px;">常用意见:&nbsp;<s:select id="spNoteSelectId" style="width: 148px;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.spCyyList" listKey="note" listValue="note" onchange="addNote(this.value);"></s:select>&nbsp;<a href="#" onclick="editSpNote();return false;">自定义</a><br/>
				<textarea id="spUserNote" name="spUserNote" rows="2" style="width: 98%;margin-top:10px;height:70px;max-width: 256px;max-height: 160px;" >${curWi.userNote }</textarea>
			</td>
		</tr>
		<!-- 第一个节点需要选岗位 -->
		<s:if test="#request.isStartWp">
		<!-- 发起岗位-->
		<tr style="" id="spGwTr">
			<th style="text-align: right;">发起岗位:<br/></th>
			<td>
				<s:select name="spGw" title="发起岗位" style="width: 210px;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.userRoles" listKey="id" listValue="namefix" value="%{#request.curFi.startRoleId}" onchange="rebuildFi(this.value,'%{#request.curWi.fiId}', '%{#request.curWi.participant}')"></s:select><br/>
			</td>
		</tr>
		</s:if>
	</table>
		<!-- 第一个节点需要选岗位 -->
		<s:if test="!#request.isStartWp">
		<table width="100%" border="0" cellpadding="0" cellspacing="1" style="margin-top:22px">
		 <tr >
			<td>
<!-- 				<iframe id="fileUploadFrame" src="Upload!fiFileUpload.do?ownerId=fiId_${fiId}_wiId_${spWiId}&category=<s:property value="@com.xinleju.erp.flow.utils.FlowConstant@ATT_CODE_SP"/>" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('fileUploadFrame',-20)"></iframe> -->
				<iframe id="fileUploadFrame" src="File!listptflow.do?ownerId=fiId_${fiId}_wiId_${spWiId}&category=<s:property value="@com.xinleju.erp.flow.utils.FlowConstant@ATT_CODE_SP"/>" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('fileUploadFrame',-20)"></iframe>
			</td>
		 </tr>
		</table>
		</s:if>
		<s:else>
		<!-- 相关流程 -->
		<table width="100%" border="0" cellpadding="0" cellspacing="1" style="margin-top:22px">
		 <tr >
			<td>
<!-- 				<iframe id="fileUploadFrame" src="Upload!fiFileUpload.do?ownerId=fiId_${fiId}_wiId_${spWiId}&category=<s:property value="@com.xinleju.erp.flow.utils.FlowConstant@ATT_CODE_SP"/>" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('fileUploadFrame',-20)"></iframe> -->
				<iframe id="fileUploadFrame" src="File!listptflow.do?ownerId=fiId_${fiId}_wiId_${spWiId}&category=<s:property value="@com.xinleju.erp.flow.utils.FlowConstant@ATT_CODE_SP"/>" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('fileUploadFrame',-20)"></iframe>
			</td>
		 </tr>
		</table>
		<tr>
			<td colspan="2">
				<jsp:include page="Form_relationFi.jsp" flush="true"/>
			</td>
		</tr>
		</s:else>
		<!-- 相关链接 -->
<!-- 		<tr> -->
<!-- 			<td colspan="2"> -->
<!-- 				<jsp:include page="Form_relationHref.jsp" flush="true"/> -->
<!-- 			</td> -->
<!-- 		</tr> -->

	<!-- 发起审批操作按钮区域 -->
	<div id="btsubmit" style="margin:auto;text-align:center;margin-top: 20px;">
		<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
			<input type="button" name="button3" id="button2" onclick="canSubmit('${fiId}','${spWiId}');return false;" value="提交" class="sptj"/>
		</s:if>
	</div>
</s:if>
<s:else>
	&nbsp;
</s:else>
<s:token></s:token>
</form>