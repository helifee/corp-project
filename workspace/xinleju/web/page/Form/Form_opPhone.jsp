<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css"/>
<link href="css/PhoneUI.css" rel="stylesheet" type="text/css"/>
<link href="page/Form/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="page/Form/Form_opPhone.js"></script>
<script type="text/javascript" src="page/Form/openDiv/openDivjquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="page/Form/zTree_v3/css/zTreeStyle/zTreeStyle.css" />
<script type="text/javascript" src="page/Form/zTree_v3/js/jquery.ztree.all-3.5.js"></script>
<form action="Form!completeWorkPhone.do" method="post" name="spFrm" id="spFrm">
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
<input type="hidden" name="flowInsName" value="${curFi.fiName}" id="flowInsName"/>
<div class="theme-buy" id="div-t">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
	<tr>
		<td>
			<div class="divh3_title">
				<a href="#" onclick="showOrHide('opTable','opTableShowOrHide');">审批操作<img title="点击隐藏" id="opTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
			</div>
		</td>
	</tr>
</table>
<div id="opTable" style="width:100%;">
<s:if test="#request.spStep !=null && #request.spStep.size() > 0 && #request.isDb==@com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<!-- 审批流程区域 -->
		<tr>
			<th class="sp_th">
				即将流向
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
			<th class="sp_th">操作</th>
			</td>
			<td align="left" style="margin-left: 10px;">
				<s:if test="#request.spButtons !=null && #request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB].size()>0">
					<s:iterator value="#request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
						<input type="radio" name="opCode" value="${btn.opBean.code}" alt="${btn.name}" note = "${btn.opBean.note}" noteType = "${btn.opBean.noteType}" onclick="changeOpType('${btn.opBean.code}','${btn.name}','${btn.opBean.note}','${btn.opBean.noteType}');"/>${btn.name}</b>
						<%-- <s:if test="#btnS.count%4 == 0">
							</br>
						</s:if> --%>
					</s:iterator>
				</s:if>
				<!-- 操作人选择区域 -->
				<div style="margin-top: 10px;" id="selectUserDiv">
					<input type="text" name="dealUsersNames" id="dealUsersNames" class="readonly" value="${dealUserNames }" style="width:60%;max-width: 160px;" readonly="readonly"/>
					<input type="hidden" name="dealUsersIds" id="dealUsersIds" style="width:100px;" value="${dealUserIds }"/>
					<!-- <input type="button" value="选择操作人" onclick="selectParticipantByDomOp('dealUsersIds','dealUsersNames');"/> -->
					<input type="button" value="选择操作人" onclick="selectUser('todo');"/>
				</div>
				<!-- 需要退回到的节点区域 -->
				<div style="margin-top: 10px;" id="backToWpDiv">
					打回到:&nbsp;<select name="backToWpId" title="打回到的节点" style="width: 160px;margin-bottom: 2px;">
						<option value="">请选择</option>
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
					是否重新审批:<input type="checkbox" checked="checked" name="backSkip" value="false" />
				</div>
				
			</td>
		</tr>
		</s:if>
		<s:else>
			<s:iterator value="#request.spButtons[@com.xinleju.erp.flow.flowutils.bean.OpRelationInsBean@SHOW_TYPE_DB]" var="btn" status="btnS">
				<input type="checkbox" name="opCode" id="opCode" style="width:100px;display: none;" value="${btn.opBean.code}" alt="${btn.name}" note = "${btn.opBean.note}" noteType = "${btn.opBean.noteType}" checked="checked"/>
				<%-- <s:if test="#btnS.count%4 == 0">
					<br/>
				</s:if> --%>
			</s:iterator>
		</s:else>
		<tr>
			<th class="sp_th">处理意见<br/></th>
			<td>常用意见:&nbsp;<s:select id="spNoteSelectId" style="width: 70%;max-width: 200px;;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.spCyyList" listKey="note" listValue="note" onchange="addNote(this.value);"></s:select>&nbsp;<br/>
				<textarea id="spUserNote" name="spUserNote" rows="2" style="width: 98%;height: 40px;max-width: 256px;max-height: 160px;" >${curWi.userNote }</textarea>
			</td>
		</tr>
		<!-- 第一个节点需要选岗位 -->
		<s:if test="#request.isStartWp">
		<!-- 发起岗位-->
		<tr style="" id="spGwTr">
			<th class="sp_th">发起岗位<br/></th>
			<td>
				<s:select name="spGw" title="发起岗位" style="width: 210px;margin-bottom: 2px;" headerKey="" headerValue="请选择" list="#request.userRoles" listKey="id" listValue="namefix" value="%{#request.curFi.startRoleId}" onchange="rebuildFi(this.value,'%{#request.curWi.fiId}', '%{#request.curWi.participant}')"></s:select><br/>
			</td>
		</tr>
		</s:if>
		<s:else>
		<!-- 
		<table width="100%" border="0" cellpadding="0" cellspacing="1" style="margin-top:0px">
		<tr >
			<td>
				<iframe id="fileUploadFrame" src="File!listptflow.do?ownerId=fiId_${fiId}_wiId_${spWiId}&category=<s:property value="@com.xinleju.erp.flow.utils.FlowConstant@ATT_CODE_SP"/>" style="width: 100%;" scrolling="no" frameborder="0" onload="iframeChangeSize('fileUploadFrame',-20)"></iframe>
			</td>
		</tr>
		</table>
		 -->
		</s:else>
		<tr>
			<th colspan="2">
				<!-- 发起审批操作按钮区域 -->
				<div id="btsubmit" style="margin:auto;text-align:center;margin-top: 20px;">
					<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
						<input type="button" name="button3" id="button2" onclick="canSubmit('${fiId}','${spWiId}');return false;" value="提交" class="sptjPhone"/>
					</s:if>
				</div>
			</th>
		</tr>
	</table>
</s:if>
<s:else>
	&nbsp;
</s:else>
</div>
</div>
<!--弹出登录图层-->
<div class="theme-popover" style="display: none;min-height: 500px;">
    <div class="theme-poptit">
        <p style="font-size:16px;">人员选择</p>
    </div>
    <div class="theme-popbod dform">
        <table width="100%" id="tb">
            <tr id="t2">
                <td >
                    <div id="demo" class="demolayout">
                        <ul id="demo-nav" class="demolayout">
                            <li><a class="active" href="#" onclick="javascript:queryDept()" id="one">本部门</a></li>
                            <li><a class="" href="#" onclick="javascript:queryAll()" id="all">全集团</a></li>
                        </ul>
                        <div class="clear"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align: top;">
                    <div id="dept" style="display:block; margin-left:2%; height:380px;vertical-align: top;overflow-x:scroll" class="demoUser">
                        <ul class="demoUser">
                            <s:iterator value="#request.userPage.items" id="item">
                                <li>
                                    <a id="${item.id}" value="${item.id}" calss="" href="#" onclick="javascript:dealSelectUser(${item.id},'${item.realName}');">
                                        <p style="font-size:14px;" id="">${item.realName}</p>
                                    </a>
                                </li>
                            </s:iterator>
                        </ul>
                    </div>
                    <div id="userTree" name="userTree" style="margin-left:2%; height:380px;vertical-align: top;overflow-x:scroll; display:none;" class="ztree"></div>
                </td>
            </tr>
            <tr id="t3">
                <td align="center">
                    <input type="button" value="取消" class="sptjPhone" onclick="javascript:closeSelectUser();" />
                    <input type="button" class="sptjPhone" value="确定 " onclick="javascript:ensureSelected()"/>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="theme-popover-mask"></div>
</form>
