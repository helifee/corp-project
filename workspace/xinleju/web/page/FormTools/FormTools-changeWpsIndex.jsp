<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>加签、减签</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="page/FormTools/FormTools-changeWpsIndex.js"></script>
	
</head>
<base target="_self"></base>
<body>
    <a id="reload" href="#" ></a>
	<div class="wdtable_title_sp" style="width: 980px;">
		<div class="wdtable_title_sp_t">修改流程参与人</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
		</div>
	</div>
	<div class="sp_wrapper" style="width: 980px;">
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj" style="margin-bottom: 10px;">
			<tr>
				<th width="25px">序号</th>
				<th width="100px">节点名称</th>
				<th>角色</th>
				<th width="200px">责任人</th>
				<th width="100px">操作</th>
			</tr>
			<s:set id = "splitStr" value="\",\""></s:set>
			<s:set id = "propertyStr" value="\"userId\""></s:set>
			<s:iterator value="#request.wpList" var="wst" status="wstStatus">
				<s:set id="canChangeWpNode" value="0"></s:set>
				<s:set id="mustChangeWpNodeMsg" value=""></s:set>
				<s:if test="#request.canChangeWpNodeIds.indexOf(',' + #wst.nodeId + ',') >= 0">
					<s:set id="canChangeWpNode" value="1"></s:set>
				</s:if>
				<s:if test="#request.mustChangeWpNodeIds.indexOf(',' + #wst.nodeId + ',') >= 0">
                    <s:set id="canChangeWpNode" value="1"></s:set>
					<s:set id="mustChangeWpNodeMsg" value="'当前节点必须选择参与人'"></s:set>
					<s:if test="null != #wst.nodeNote && '' != #wst.nodeNote">
						<s:set id="mustChangeWpNodeMsg" value="%{#wst.nodeNote}"></s:set>
					</s:if>
				</s:if>
				<s:if test="null != #mustChangeWpNodeMsg && '' != #mustChangeWpNodeMsg">
					<tr>
						<td align="center" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize + 1}">${wstStatus.count}</td>
						<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize + 1}">
							${wst.displayName}&nbsp;
						</td>
						<td align="left" colspan="3"">
							<font color="red"><s:property value="lineFeed(#mustChangeWpNodeMsg)"/></font>&nbsp;
						</td>
					</tr>
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
							<s:if test="null != #chWp.wis && #chWp.wis.size() > 0">
								<s:iterator value="#chWp.wis" var="wit" status="witStatus">
								<tr>
									<s:if test="#witStatus.index == 0">
									<td align="left" rowspan="${chWp.wis.size()}">${chWp.rolePath}&nbsp;</td>
									</s:if>
									<td align="left">
										${wit.participant.userName}&nbsp;
									</td>
									<td align="right">
										<s:if test="#canChangeWpNode == 1">
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);"  title="新增" onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','${wit.wiId}','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);"  title="删除" onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','${wit.wiId}','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
								</tr>
								</s:iterator>
							</s:if>
							<s:elseif test="null != #chWp.participantUsers && #chWp.participantUsers.size() > 0">
								<s:iterator value="#chWp.participantUsers" var="wit" status="witStatus">
								<tr>
									<s:if test="#witStatus.index == 0">
										<td align="left" rowspan="${chWp.participantUsers.size()}">${chWp.rolePath}&nbsp;</td>
									</s:if>
									<td align="left">
										${wit.userName}&nbsp;
									</td>
									<s:if test="#witStatus.index == 0">
									<td align="right" rowspan="${chWp.participantUsers.size()}">
										<s:if test="#canChangeWpNode == 1">
											<s:set id = "participantsSelectedIdsStr" value="@com.xinleju.erp.base.utils.CollectionUtils@collectAsString(#chWp.participantUsers, #propertyStr, #splitStr)"></s:set>
											<input type="hidden" value="${participantsSelectedIdsStr}" name="part_input_hidden_${chWp.wpId }" id="part_input_hidden_${chWp.wpId }"/>
											<a href="javascript:void(0);" title="编辑"  onclick="selectParticipantForInput('${chWp.wpId}','${chWp.finishCtrl }',1);return false;"><img src="images/icon_edit.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" title="新增" onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','','${wit.userId}');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" title="删除" onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','','${wit.userId}');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
									</s:if>
								</tr>
								</s:iterator>
							</s:elseif>
							<s:else>
								<tr>
									<td align="left" rowspan="1">${chWp.rolePath}</td>
									<td align="left">
										<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
											${chWp.participantUsersNames}&nbsp;
										</s:if>
										<s:else>
											${chWp.definededUsersNames}&nbsp;
										</s:else>
									</td>
									<td align="right">
										<s:if test="#canChangeWpNode == 1">
											<s:set id = "participantsSelectedIdsStr" value="@com.xinleju.erp.base.utils.CollectionUtils@collectAsString(#chWp.participantUsers, #propertyStr, #splitStr)"></s:set>
											<input type="hidden" value="${participantsSelectedIdsStr}" name="part_input_hidden_${chWp.wpId }" id="part_input_hidden_${chWp.wpId }"/>
											<a href="javascript:void(0);" title="编辑"  onclick="selectParticipantForInput('${chWp.wpId}','${chWp.finishCtrl }',1);return false;"><img src="images/icon_edit.png"  width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','','');return false;"><img src="images/icon_add.png" width="16"  height="16" /></a>&nbsp;
											<a href="javascript:void(0);" title="删除" onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','','');return false;"><img src="images/icon_delete.png"  width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
								</tr>
							</s:else>
						</s:iterator>
					</s:if>
					<s:elseif test="null != #wst.wis && #wst.wis.size() > 0">
						<s:iterator value="#wst.wis" var="wit" status="witStatus">
						<tr>
							<td align="left" rowspan="1">${wst.rolePath}&nbsp;</td>
							<td align="left">
								${wit.participant.userName}&nbsp;
							</td>
							<td align="right">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);"   onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','${wit.wiId}','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" title="删除" onclick="deleteParticipant('${opWiId}','${wst.wpId}','','${wit.wiId}','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
						</tr>
						</s:iterator>
					</s:elseif>
					<s:elseif test="null != #wst.participantUsers && #wst.participantUsers.size() > 0">
						<s:iterator value="#wst.participantUsers" var="wit" status="witStatus">
						<tr>
							<td align="left">
								${wit.userName}&nbsp;
							</td>
							<s:if test="#witStatus.index == 0">
							<td align="right" rowspan="${wst.participantUsers.size()}">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','','${wit.userId}');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" title="删除" onclick="deleteParticipant('${opWiId}','${wst.wpId}','','','${wit.userId}');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
							</s:if>
						</tr>
						</s:iterator>
					</s:elseif>
					<s:else>
						<tr>
							<td align="left" rowspan="1">${wst.rolePath}&nbsp;</td>
							<td align="left">
								<s:if test="null != #wst.participantUsersNames && '' != #wst.participantUsersNames">
									${wst.participantUsersNames}&nbsp;
								</s:if>
								<s:else>
									${wst.definededUsersNames}&nbsp;
								</s:else>
							</td>
							<td align="right">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
						</tr>
					</s:else>
				</s:if>
				<s:else>
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
							<s:if test="null != #chWp.wis && #chWp.wis.size() > 0">
								<s:iterator value="#chWp.wis" var="wit" status="witStatus">
								<tr>
									<s:if test="#chWpStatus.index == 0 && #witStatus.index == 0">
									<td align="center" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">${wstStatus.count}</td>
									<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">
										${wst.displayName}&nbsp;
									</td>
									</s:if>
									<s:if test="#witStatus.index == 0">
									<td align="left" rowspan="${chWp.wis.size()}">${chWp.rolePath}&nbsp;</td>
									</s:if>
									<td align="left">
										${wit.participant.userName}&nbsp;
									</td>
									<td align="right">
										<s:if test="#canChangeWpNode == 1">
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','${wit.wiId}','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','${wit.wiId}','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
								</tr>
								</s:iterator>
							</s:if>
							<s:elseif test="null != #chWp.participantUsers && #chWp.participantUsers.size() > 0">
								<s:iterator value="#chWp.participantUsers" var="wit" status="witStatus">
								<tr>
									<s:if test="#chWpStatus.index == 0 && #witStatus.index == 0">
									<td align="center" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">${wstStatus.count}&nbsp;</td>
									<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">${wst.displayName}&nbsp;</td>
									</s:if>
									<s:if test="#witStatus.index == 0">
										<td align="left" rowspan="${chWp.participantUsers.size()}">${chWp.rolePath}&nbsp;</td>
									</s:if>
									<td align="left">
										${wit.userName}&nbsp;
									</td>
									<s:if test="#witStatus.index == 0">
									<td align="right" rowspan="${chWp.participantUsers.size()}">
										<s:if test="#canChangeWpNode == 1">
                                            <s:set id = "participantsSelectedIdsStr" value="@com.xinleju.erp.base.utils.CollectionUtils@collectAsString(#chWp.participantUsers, #propertyStr, #splitStr)"></s:set>
                                            <input type="hidden" value="${participantsSelectedIdsStr}" name="part_input_hidden_${chWp.wpId }" id="part_input_hidden_${chWp.wpId }"/>
                                            <a href="javascript:void(0);" title="编辑" onclick="selectParticipantForInput('${chWp.wpId}','${chWp.finishCtrl }',1);return false;"><img src="images/icon_edit.png" width="16" height="16" /></a>&nbsp;
                                            <a href="javascript:void(0);" title="新增" onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','','${wit.userId}');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','','${wit.userId}');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
									</s:if>
								</tr>
								</s:iterator>
							</s:elseif>
							<s:else>
								<tr>
									<s:if test="#chWpStatus.index == 0">
									<td align="center" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">${wstStatus.count}</td>
									<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.noWisWpUsersSize}">${wst.displayName}&nbsp;</td>
									</s:if>
									<td align="left" rowspan="1">${chWp.rolePath}</td>
									<td align="left">
										<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
											${chWp.participantUsersNames}&nbsp;
										</s:if>
										<s:else>
											${chWp.definededUsersNames}&nbsp;
										</s:else>
									</td>
									<td align="right">
										<s:if test="#canChangeWpNode == 1">
                                            <s:set id = "participantsSelectedIdsStr" value="@com.xinleju.erp.base.utils.CollectionUtils@collectAsString(#chWp.participantUsers, #propertyStr, #splitStr)"></s:set>
                                            <input type="hidden" value="${participantsSelectedIdsStr}" name="part_input_hidden_${chWp.wpId }" id="part_input_hidden_${chWp.wpId }"/>
                                            <a href="javascript:void(0);"  title="编辑" onclick="selectParticipantForInput('${chWp.wpId}','${chWp.finishCtrl }',1);return false;"><img src="images/icon_edit.png" width="16" height="16" /></a>&nbsp;
                                            <a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','${chWp.wpId}','','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','${chWp.wpId}','','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
										</s:if>
										<s:else>
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
											<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
										    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
										</s:else>
									</td>
								</tr>
							</s:else>
						</s:iterator>
					</s:if>
					<s:elseif test="null != #wst.wis && #wst.wis.size() > 0">
						<s:iterator value="#wst.wis" var="wit" status="witStatus">
						<tr>
							<s:if test="#witStatus.index == 0">
							<td align="center" rowspan="${wst.wis.size()}">${wstStatus.count}</td>
							<td align="left" rowspan="${wst.wis.size()}">${wst.displayName}&nbsp;</td>
							</s:if>
							<td align="left" rowspan="1">${wst.rolePath}&nbsp;</td>
							<td align="left">
								${wit.participant.userName}&nbsp;
							</td>
							<td align="right">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','${wit.wiId}','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','','${wit.wiId}','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
						</tr>
						</s:iterator>
					</s:elseif>
					<s:elseif test="null != #wst.participantUsers && #wst.participantUsers.size() > 0">
						<s:iterator value="#wst.participantUsers" var="wit" status="witStatus">
						<tr>
							<s:if test="#wstStatus.index == 0 && #witStatus.index == 0">
							<td align="center" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.participantUsers.size()}">${wstStatus.count}&nbsp;</td>
							<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.participantUsers.size()}">${wst.displayName}&nbsp;</td>
							<td align="left" rowspan="${wst.allWiSize - wst.allXbGtWiSize + wst.participantUsers.size()}">${wst.rolePath}&nbsp;</td>
							</s:if>
							<td align="left">
								${wit.userName}&nbsp;
							</td>
							<s:if test="#witStatus.index == 0">
							<td align="right" rowspan="${wst.participantUsers.size()}">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','','${wit.userId}');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','','','${wit.userId}');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
							</s:if>
						</tr>
						</s:iterator>
					</s:elseif>
					<s:else>
						<tr>
							<td align="center" rowspan="1">${wstStatus.count}</td>
							<td align="left" rowspan="1">${wst.displayName}&nbsp;</td>
							<td align="left" rowspan="1">${wst.rolePath}&nbsp;</td>
							<td align="left">
								<s:if test="null != #wst.participantUsersNames && '' != #wst.participantUsersNames">
									${wst.participantUsersNames}&nbsp;
								</s:if>
								<s:else>
									${wst.definededUsersNames}&nbsp;
								</s:else>
							</td>
							<td align="right">
								<s:if test="#canChangeWpNode == 1">
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" title="新增"  onclick="addWpUser('${opWiId}','${wst.wpId}','','','');return false;"><img src="images/icon_add.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" title="删除"  onclick="deleteParticipant('${opWiId}','${wst.wpId}','','','');return false;"><img src="images/icon_delete.png" width="16" height="16" /></a>&nbsp;
								</s:if>
								<s:else>
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_edit_disabled.png" width="16" height="16" /></a>&nbsp;
									<a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_add_disabled.png" width="16" height="16" /></a>&nbsp;
								    <a href="javascript:void(0);" onclick="alert('此节点不能进行此操作！');return false;"><img src="images/icon_delete_disabled.png" width="16" height="16" /></a>&nbsp;
								</s:else>
							</td>
						</tr>
					</s:else>
				</s:else>
			</s:iterator>
		</table>
	</div>
</body>
</html>