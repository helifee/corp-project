<%@page import="freemarker.template.utility.DateUtil"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/PhoneUI.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<s:if test="#request.spStep !=null && #request.spStep.size() > 0">
			<s:set id="statusCreated" value="@com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_CREATED"></s:set>
			<s:set id="statusRunning" value="@com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING"></s:set>
			<s:set id="statusComplete" value="@com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE"></s:set>
			<tr>
				<td align="left">
					<div class="item_box" style="border-top: 0px;border-bottom: 0px;">
					<s:iterator value="#request.spStep" var="wst" status="wstStatus">
					<!-- 已开始运行的wp,且存在任务的 -->
					<s:if test="(#wst.status == #statusRunning || #wst.status == #statusComplete) && #wst.allWiSize > 0">
						<s:if test="(null != #wst.completeWiList && #wst.completeWiList.size() > 0) || #wst.noWisWpSizeComplete > 0">
							<!-- 处理有子wp的wp即流程配置里选择了岗位的 -->
							<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
								<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
									<s:if test="null != #chWp.completeWiList && #chWp.completeWiList.size() > 0">
										<s:iterator value="#chWp.completeWiList" var="cwi" status="cwiStatus">
											
											<s:if test="#cwi.completeUser.userId != #cwi.participant.userId">
												<s:set id="userName" value="#cwi.participant.userName + '(' + #cwi.completeUser.userName + '[代])'"></s:set>
											</s:if>
											<s:else>
												<s:set id="userName" value="#cwi.participant.userName"></s:set>
											</s:else>
											<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #cwi.wiId"></s:set>
											<app:HistoryDivTag displayName="${wst.displayName}" userName="${userName}" userNote="${cwi.userNote}" opName="${cwi.opName}"  endDate="${cwi.completeTime}" uploadList="${spUploadsMap[uploadMapKey]}" status="${cwi.status}"></app:HistoryDivTag>
											
											<!-- 存在协办沟通的情况 -->
											<s:if test="null != #cwi.xbGtWis && #cwi.xbGtWis.size() > 0">
												<s:iterator value="#cwi.xbGtWis" var="xbGtwi" status="xgStatus">
													
													<s:if test="#xbGtwi.status == #statusComplete">
														<s:if test="#xbGtwi.completeUser.userId != #xbGtwi.participant.userId">
															<s:set id="userName" value="#xbGtwi.participant.userName + '(' + #xbGtwi.completeUser.userName + '[代])'"></s:set>
														</s:if>
														<s:else>
															<s:set id="userName" value="#xbGtwi.participant.userName"></s:set>
														</s:else>
													</s:if>
													<s:else>
														<s:set id="userName" value="#xbGtwi.participant.userName"></s:set>
													</s:else>
													<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId"></s:set>
													<app:HistoryDivTag displayName="${wst.displayName}" userName="${userName}" userNote="${xbGtwi.userNote}" opName="${xbGtwi.opName}"  endDate="${xbGtwi.completeTime}" uploadList="${spUploadsMap[uploadMapKey]}" status="${xbGtwi.status}"></app:HistoryDivTag>
												
												</s:iterator>
											</s:if>
										</s:iterator>
									</s:if>
									<s:elseif test="#chWp.status == #statusComplete && (null == #chWp.participantUsers || 1 > #chWp.participantUsers.size())">
										
										<s:set id=""></s:set>
										<app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.definededUsersNames}" userNote="(责任人为空,系统自动通过)" opName="通过"  endDate="${chWp.completeDate}"  status="${statusComplete}"></app:HistoryDivTag>
									
									</s:elseif>
								</s:iterator>
							</s:if>
							<s:else>
								<s:iterator value="#wst.completeWiList" var="cwi" status="cwiStatus">
								
								<s:if test="#cwi.completeUser.userId != #cwi.participant.userId">
									<s:set id="userName" value="#cwi.participant.userName + '(' + #cwi.completeUser.userName + '[代])'"></s:set>
								</s:if>
								<s:else>
									<s:set id="userName" value="#cwi.participant.userName"></s:set>
								</s:else>
								<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #cwi.wiId"></s:set>
								<app:HistoryDivTag displayName="${wst.displayName}" userName="${userName}" userNote="${cwi.userNote}" opName="${cwi.opName}"  endDate="${cwi.completeTime}" uploadList="${spUploadsMap[uploadMapKey]}" status="${cwi.status}"></app:HistoryDivTag>
								
								<!-- 存在协办沟通的情况 -->
								<s:if test="null != #cwi.xbGtWis && #cwi.xbGtWis.size() > 0">
									<s:iterator value="#cwi.xbGtWis" var="xbGtwi" status="xgStatus">
										
										<s:if test="#xbGtwi.status == #statusComplete">
											<s:if test="#xbGtwi.completeUser.userId != #xbGtwi.participant.userId">
												<s:set id="userName" value="#xbGtwi.participant.userName + '(' + #xbGtwi.completeUser.userName + '[代])'"></s:set>
											</s:if>
											<s:else>
												<s:set id="userName" value="#xbGtwi.participant.userName"></s:set>
											</s:else>
										</s:if>
										<s:else>
											<s:set id="userName" value="#xbGtwi.participant.userName"></s:set>
										</s:else>
										<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId"></s:set>
										<app:HistoryDivTag displayName="${wst.displayName}" userName="${userName}" userNote="${xbGtwi.userNote}" opName="${xbGtwi.opName}"  endDate="${xbGtwi.completeTime}" uploadList="${spUploadsMap[uploadMapKey]}" status="${xbGtwi.status}"></app:HistoryDivTag>
									
									</s:iterator>
								</s:if>
								</s:iterator>
							</s:else>
						</s:if>
						<s:if test="#request.fiId == #wst.fiId">
						<s:if test="(null != #wst.runningWiList && #wst.runningWiList.size() > 0) || #wst.noWisWpSizeRunning > 0">
							<!-- 处理有子wp的wp即流程配置里选择了岗位的 -->
							<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
								<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
									<s:if test="null != #chWp.runningWiList && #chWp.runningWiList.size() > 0">
										<s:iterator value="#chWp.runningWiList" var="cwi" status="cwiStatus">
										
										<app:HistoryDivTag displayName="${wst.displayName}" userName="${cwi.participant.userName}" userNote="${cwi.userNote}" opName="${wst.wpTypeName}"  endDate="${cwi.completeTime}"  status="${cwi.status}"></app:HistoryDivTag>
										
										</s:iterator>
									</s:if>
									<s:elseif test="(#chWp.status == #statusCreated
										 || #chWp.status == #statusRunning) 
										 && (null == #chWp.completeWiList || 1 > #chWp.completeWiList.size()) && (null == #chWp.firstCompleteWiDate || '' == #chWp.firstCompleteWiDate)">
										
										<app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.definededUsersNames}" userNote="" opName="${wst.wpTypeName}"    status="${statusCreated}"></app:HistoryDivTag>
									
									</s:elseif>
								</s:iterator>
							</s:if>
							<s:else>
								<s:iterator value="#wst.runningWiList" var="cwi" status="cwiStatus">
								
								<app:HistoryDivTag displayName="${wst.displayName}" userName="${cwi.participant.userName}" userNote="${cwi.userNote}" opName="${wst.wpTypeName}"  endDate="${cwi.completeTime}" uploadList="${spUploadsMap[uploadMapKey]}" status="${cwi.status}"></app:HistoryDivTag>

								</s:iterator>
							</s:else>
						</s:if>
						</s:if>
					</s:if>
					<!-- 尚未运行到的wp没有生成相关的wi做特殊处理 -->
					<s:else>
						<s:if test="#wst.status == #statusComplete">
							<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
							<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
								<s:iterator value="#wst.chWps" var="chWp" status="statChWp">
									<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
										<app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.participantUsersNames}" userNote="(责任人为空,系统自动通过)" opName="通过"  endDate="${chWp.completeDate}"  status="${statusComplete}"></app:HistoryDivTag>
                                    </s:if>
                                    <s:else>
									   <app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.definededUsersNames}" userNote="(责任人为空,系统自动通过)" opName="通过"  endDate="${chWp.completeDate}"  status="${statusComplete}"></app:HistoryDivTag>
                                    </s:else>
									
								</s:iterator>
							</s:if>
							<s:else>
								<s:if test="null != #wst.participantUsersNames && '' != #wst.participantUsersNames">
									<app:HistoryDivTag displayName="${wst.displayName}" userName="${wst.participantUsersNames}" userNote="" opName="${wst.wpTypeName}"  endDate="${wst.completeDate}"  status="${statusComplete}"></app:HistoryDivTag>
                                </s:if>
                                <s:else>
									<app:HistoryDivTag displayName="${wst.displayName}" userName="${wst.definededUsersNames}" userNote="" opName="${wst.wpTypeName}"  endDate="${wst.completeDate}"  status="${statusComplete}"></app:HistoryDivTag>
                                </s:else>
								
							</s:else>
						</s:if>
						<s:elseif test="(#request.fiId == #wst.fiId)">
							<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
							<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
								<s:iterator value="#wst.chWps" var="chWp" status="statChWp">
								<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
									<app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.participantUsersNames}" userNote="" opName="${wst.wpTypeName}"    status="${statusCreated}"></app:HistoryDivTag>
                                </s:if>
                                <s:else>
									<app:HistoryDivTag displayName="${wst.displayName}" userName="${chWp.definededUsersNames}" userNote="" opName="${wst.wpTypeName}"    status="${statusCreated}"></app:HistoryDivTag>
                                </s:else>
								</s:iterator>
							</s:if>
							<s:else>
								<s:if test="null != #wst.participantUsersNames && '' != #wst.participantUsersNames">
                                    <app:HistoryDivTag displayName="${wst.displayName}" userName="${wst.participantUsersNames}" userNote="" opName="${wst.wpTypeName}"    status="${statusCreated}"></app:HistoryDivTag>
                                </s:if>
                                <s:else>
                                    <app:HistoryDivTag displayName="${wst.displayName}" userName="${wst.definededUsersNames}" userNote="" opName="${wst.wpTypeName}"    status="${statusCreated}"></app:HistoryDivTag>
                                </s:else>
							</s:else>
						</s:elseif>
					</s:else>
					<s:if test="#request.curFi.status == #statusComplete && #wstStatus.last == true">
						
						<app:HistoryDivTag displayName="结束" userName="" userNote="" opName=""    status="${statusComplete}"></app:HistoryDivTag>
						
					</s:if>
					</s:iterator>
					</div>
				</td>
			</tr>
		</s:if>
		<s:else>
			<tr>
				<td colspan="1">&nbsp;</td>
			</tr>
		</s:else>
	</table>
</body>
</html>