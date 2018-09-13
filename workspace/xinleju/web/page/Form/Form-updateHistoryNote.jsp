<%@page import="freemarker.template.utility.DateUtil"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script src="js/jquery/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/Form/Form-historyInfo.js"></script>
	
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		var chgNote = {};
		
		function putNote(key) {
			chgNote[key] = $("#note_"+key).val();
		}
		
		function changeNote() {
			var rst = "";
 			for(var key in chgNote) {
 				rst += "," + key + "_" + chgNote[key];
 			}
 			
 			if ( rst == "" ) {
 				alert("没有需要修改的意见！");
 				return;
 			}
 			
 			if(window.confirm("确认是否要修改审批意见?")){

 				//解决乱码
 				//rst = encodeURI(rst);
 				rst = encodeURI(rst); 
 				
				$('body').mask("操作中...");
				$.ajax({
					url : 'Form!updateNote.do',
					data : {msg : rst},
					dataType : "json",
					success :function(data){
						if(data && data.success){
							if ( data.msg ) {
								alert(data.msg);
							} else {
								alert("操作成功!");
								window.opener.refresh();
								window.close();
							}
							
						}else{
							if ( data.msg ) {
								alert( data.msg );
							} else {
								alert("操作失败!");
							}
							$('body').unmask();
						}
					},
					error : function(){
						alert("操作失败！");
						$('body').unmask();
					}
				})
			}
		
		}
	</script>
</head>
<body>
	<div class="popgsfl_title" style="width:900px">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">请选择</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="changeNote();return false;">确定</a>
						<a href="#" onclick="window.close();return false;">关闭</a>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="#">审批记录</a>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<tr>
			<th width="25px">序号</th>
			<th width="60px">节点名称</th>
			<th width="210px">岗位</th>
			<th width="100px">责任人</th>
			<th width="100px">操作</th>
			<th>处理意见</th>
			<th width="130px">处理时间</th>
		</tr>
		<s:set id="rowCount" value="0"></s:set>
		<s:if test="#request.spStep !=null && #request.spStep.size() > 0">
		<s:iterator value="#request.spStep" var="wst" status="wstStatus">
			<!-- 已开始运行的wp,且存在任务的 -->
			<s:if test="(#wst.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING || #wst.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE) && #wst.allWiSize > 0">
				<s:if test="(null != #wst.completeWiList && #wst.completeWiList.size() > 0) || #wst.noWisWpSizeComplete > 0">
					<s:set id="isFirstChwp" value="1"></s:set>
					<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
					<!-- 处理有子wp的wp即流程配置里选择了岗位的 -->
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
							<s:if test="null != #chWp.completeWiList && #chWp.completeWiList.size() > 0">
								<s:iterator value="#chWp.completeWiList" var="cwi" status="cwiStatus">
									<tr class="spHistoryComplete">
										<s:if test="#isFirstChwp == 1">
										<s:set id="isFirstChwp" value="0"></s:set>
										<td align="center" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize + wst.noWisWpSizeComplete}">${rowCount}&nbsp;</td>
										<td align="left" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize + wst.noWisWpSizeComplete}">${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;</td>
										</s:if>
										<s:if test="#cwiStatus.index == 0">
										<td align="left" rowspan="${chWp.completeWiList.size() + chWp.allXbGtWiSize}">${chWp.rolePathWithBr}&nbsp;</td>
										</s:if>
										<td align="left">
											<s:if test="#cwi.completeUser.userId != #cwi.participant.userId">
												${cwi.participant.userName }<br/>(${cwi.completeUser.userName}[代])
											</s:if>
											<s:else>
												${cwi.participant.userName }
											</s:else>&nbsp;
										</td>
										<td>
											${cwi.opName}&nbsp;
										</td>
										<td>
											<textarea id="note_${cwi.wiId}" onchange="putNote('${cwi.wiId}')" name="spUserNote" rows="2" style="width: 98%;height: 40px;max-width: 256px;max-height: 160px;" >${cwi.userNote }</textarea>
										</td>
										<td align="center">${cwi.completeTime}&nbsp;</td>
									</tr>
									<!-- 存在协办沟通的情况 -->
									<s:if test="null != #cwi.xbGtWis && #cwi.xbGtWis.size() > 0">
										<s:iterator value="#cwi.xbGtWis" var="xbGtwi" status="xgStatus">
										<s:if test="#xbGtwi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
										<tr class="spHistoryComplete">
										</s:if>
										<s:else>
										<tr class="spHistoryRunning">
										</s:else>
<!-- 											<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
											<td align="left">
												<s:if test="#xbGtwi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
													<s:if test="#xbGtwi.completeUser.userId != #xbGtwi.participant.userId">
														${xbGtwi.participant.userName }<br/>(${xbGtwi.completeUser.userName}[代])
													</s:if>
													<s:else>
														${xbGtwi.participant.userName }
													</s:else>&nbsp;
												</s:if>
												<s:else>
													${xbGtwi.participant.userName}&nbsp;
												</s:else>
											</td>
											<td>
												${xbGtwi.opName}&nbsp;
											</td>
											<td>
												<s:property value="lineFeed(#xbGtwi.userNote)" escape="false"/>
												<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId"></s:set>
												<app:flowFilesTag uploadList="${spUploadsMap[uploadMapKey]}"></app:flowFilesTag>
												<s:iterator value="#request.relationHrefMap['fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId]" var="upload">
													<br/>
													<a href="${upload.hrefStr}" target="_blank_${cwi.wiId}"><img border="0" align="absmiddle" src="images/icons/goto.png">${upload.hrefName }</img></a>
												</s:iterator>&nbsp;
											</td>
											<td align="center">${xbGtwi.completeTime}&nbsp;</td>
										</tr>
										</s:iterator>
									</s:if>
								</s:iterator>
							</s:if>
							<s:elseif test="#chWp.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE && (null == #chWp.participantUsers || 1 > #chWp.participantUsers.size())">
								<tr class="spHistoryComplete">
<!-- 									<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
									<s:if test="#isFirstChwp == 1">
									<s:set id="isFirstChwp" value="0"></s:set>
									<td align="center" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize + wst.noWisWpSizeComplete}">${rowCount}&nbsp;</td>
									<td align="left" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize + wst.noWisWpSizeComplete}">${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;</td>
									</s:if>
									<td align="left" rowspan="1">${chWp.rolePathWithBr}</td>
									<td align="left">
										<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
											${chWp.definededUsersNames}&nbsp;
										</s:if>
										<s:else>
											${chWp.definededUsersNames}&nbsp;
										</s:else>
									</td>
									<td align="left">
										通过&nbsp;
									</td>
									<td>
										(责任人为空,系统自动通过)&nbsp;
									</td>
									<td align="center">${chWp.completeDate}&nbsp;</td>
								</tr>
							</s:elseif>
						</s:iterator>
					</s:if>
					<s:else>
						<s:iterator value="#wst.completeWiList" var="cwi" status="cwiStatus">
						<tr class="spHistoryComplete">
<!-- 							<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
							<s:if test="#isFirstChwp == 1">
							<s:set id="isFirstChwp" value="0"></s:set>
							<td align="center" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize}">${rowCount}&nbsp;</td>
							<td align="left" rowspan="${wst.completeWiList.size() + wst.allXbGtWiSize}">${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;</td>
							</s:if>
							<td align="left" rowspan="${1 + (null != cwi.xbGtWis ? cwi.xbGtWis.size() : 0)}">${wst.rolePathWithBr}&nbsp;</td>
							<td align="left">
								<s:if test="#cwi.completeUser.userId != #cwi.participant.userId">
									${cwi.participant.userName }<br/>(${cwi.completeUser.userName}[代])
								</s:if>
								<s:else>
									${cwi.participant.userName }
								</s:else>&nbsp;
							</td>
							<td>
								${cwi.opName}&nbsp;
							</td>
							<td>
								<textarea id="note_${cwi.wiId}" onchange="putNote('${cwi.wiId}')" name="spUserNote" rows="2" style="width: 98%;height: 40px;max-width: 256px;max-height: 160px;" >${cwi.userNote }</textarea>
							</td>
							<td align="center">${cwi.completeTime}&nbsp;</td>
						</tr>
						<!-- 存在协办沟通的情况 -->
						<s:if test="null != #cwi.xbGtWis && #cwi.xbGtWis.size() > 0">
							<s:iterator value="#cwi.xbGtWis" var="xbGtwi" status="xgStatus">
							<s:if test="#xbGtwi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
							<tr class="spHistoryComplete">
							</s:if>
							<s:else>
							<tr class="spHistoryRunning">
							</s:else>
<!-- 								<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${chWp.wpId}" name="chWpId_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
								<td align="left">
									<s:if test="#xbGtwi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
										<s:if test="#xbGtwi.completeUser.userId != #xbGtwi.participant.userId">
											${xbGtwi.participant.userName }<br/>(${xbGtwi.completeUser.userName}[代])
										</s:if>
										<s:else>
											${xbGtwi.participant.userName }
										</s:else>&nbsp;
									</s:if>
									<s:else>
										${xbGtwi.participant.userName}
									</s:else>
									&nbsp;
								</td>
								<td>
									${xbGtwi.opName}&nbsp;
								</td>
								<td>
									<s:property value="lineFeed(#xbGtwi.userNote)" escape="false"/>
									<s:set id="uploadMapKey" value="'fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId"></s:set>
									<app:flowFilesTag uploadList="${spUploadsMap[uploadMapKey]}"></app:flowFilesTag>
									<s:iterator value="#request.relationHrefMap['fiId_' + #cwi.fiId + '_wiId_' + #xbGtwi.wiId]" var="upload">
										<br/>
										<a href="${upload.hrefStr}" target="_blank_${cwi.wiId}"><img border="0" align="absmiddle" src="images/icons/goto.png">${upload.hrefName }</img></a>
									</s:iterator>&nbsp;
								</td>
								<td align="center">${xbGtwi.completeTime}&nbsp;</td>
							</tr>
							</s:iterator>
						</s:if>
						</s:iterator>
					</s:else>
				</s:if>
				<s:if test="#request.fiId == #wst.fiId">
				<s:if test="(null != #wst.runningWiList && #wst.runningWiList.size() > 0) || #wst.noWisWpSizeRunning > 0">
					<s:set id="isFirstChwp" value="1"></s:set>
					<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
					<!-- 处理有子wp的wp即流程配置里选择了岗位的 -->
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="chWpStatus">
							<s:if test="null != #chWp.runningWiList && #chWp.runningWiList.size() > 0">
								<s:iterator value="#chWp.runningWiList" var="cwi" status="cwiStatus">
								<tr class="spHistoryRunning">
<!-- 									<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
									<s:if test="#isFirstChwp == 1">
									<s:set id="isFirstChwp" value="0"></s:set>
									<td align="center" rowspan="${wst.runningWiList.size() + wst.noWisWpSizeRunning}">${rowCount}&nbsp;</td>
									<td align="left" rowspan="${wst.runningWiList.size() + wst.noWisWpSizeRunning}">${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;</td>
									</s:if>
									<s:if test="#cwiStatus.index == 0">
									<td align="left" rowspan="${chWp.runningWiList.size()}">${chWp.rolePathWithBr}&nbsp;</td>
									</s:if>
									<td align="left">
										${cwi.participant.userName}&nbsp;
									</td>
									<td>
										${wst.wpTypeName}&nbsp;
									</td>
									<td>
										<s:property value="lineFeed(#cwi.userNote)" escape="false"/>&nbsp;
									</td>
									<td align="center">${cwi.completeTime}&nbsp;</td>
								</tr>
								</s:iterator>
							</s:if>
							<s:elseif test="(#chWp.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_CREATED
								 || #chWp.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING) 
								 && (null == #chWp.completeWiList || 1 > #chWp.completeWiList.size()) && (null == #chWp.firstCompleteWiDate || '' == #chWp.firstCompleteWiDate)">
								<tr class="spHistoryRunning">
<!-- 									<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
									<s:if test="#isFirstChwp == 1">
									<s:set id="isFirstChwp" value="0"></s:set>
									<td align="center" rowspan="${wst.runningWiList.size() + wst.noWisWpSizeRunning}">${rowCount}</td>
									<td align="left" rowspan="${wst.runningWiList.size() + wst.noWisWpSizeRunning}">
										${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;
									</td>
									</s:if>
									<td align="left" rowspan="1">${chWp.rolePathWithBr}</td>
									<td align="left">
										<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
											${chWp.definededUsersNames}&nbsp;
										</s:if>
										<s:else>
											${chWp.definededUsersNames}&nbsp;
										</s:else>
									</td>
									<td>
										${wst.wpTypeName}&nbsp;
									</td>
									<td>
										&nbsp;
									</td>
									<td align="center">&nbsp;</td>
								</tr>
							</s:elseif>
						</s:iterator>
					</s:if>
					<s:else>
						<s:iterator value="#wst.runningWiList" var="cwi" status="cwiStatus">
						<tr class="spHistoryRunning">
<!-- 							<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
							<s:if test="#isFirstChwp == 1">
							<s:set id="isFirstChwp" value="0"></s:set>
							<td align="center" rowspan="${wst.runningWiList.size()}">${rowCount}&nbsp;</td>
							<td align="left" rowspan="${wst.runningWiList.size()}">
								${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;
							</td>
							</s:if>
							<td align="left" rowspan="1">${wst.rolePathWithBr}&nbsp;</td>
							<td align="left">
								${cwi.participant.userName}&nbsp;
							</td>
							<td>
								${wst.wpTypeName}&nbsp;
							</td>
							<td>
								<s:property value="lineFeed(#cwi.userNote)" escape="false"/>&nbsp;
							</td>
							<td align="center">${cwi.completeTime}&nbsp;</td>
						</tr>
						</s:iterator>
					</s:else>
				</s:if>
				</s:if>
			</s:if>
			<!-- 尚未运行到的wp没有生成相关的wi做特殊处理 -->
			<s:else>
				<s:if test="#wst.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
					<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="statChWp">
							<tr class="spHistoryComplete">
<!-- 								<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
								<s:if test="#statChWp.index == 0">
								<td align="center" rowspan="${wst.chWps.size()}">${rowCount}</td>
								<td align="left" rowspan="${wst.chWps.size()}">${wst.displayName}<br/>(${wst.opGroupsName})</td>
								</s:if>
								<td align="left" rowspan="1">${chWp.rolePathWithBr}</td>
								<td align="left">
									<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
										${chWp.definededUsersNames}&nbsp;
									</s:if>
									<s:else>
										${chWp.definededUsersNames}&nbsp;
									</s:else>
								</td>
								<s:if test="null != #chWp.participantUsers && #chWp.participantUsers.size() > 0">
									<td align="left">
										${wst.wpTypeName}&nbsp;
									</td>
									<td>
										&nbsp;
									</td>
								</s:if>
								<s:else>
									<td align="left">
										通过&nbsp;
									</td>
									<td>
										(责任人为空,系统自动通过)&nbsp;
									</td>
								</s:else>
								<td align="center">${chWp.completeDate}&nbsp;</td>
							</tr>
						</s:iterator>
					</s:if>
					<s:else>
						<tr class="spHistoryComplete">
<!-- 							<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
							<td align="center" rowspan="1">${rowCount}</td>
							<td align="left" rowspan="1">
								${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;
							</td>
							<td align="left" rowspan="1">${wst.rolePathWithBr}</td>
							<td align="left">
								<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
									${chWp.definededUsersNames}&nbsp;
								</s:if>
								<s:else>
									${chWp.definededUsersNames}&nbsp;
								</s:else>
							</td>
							<td>
								${wst.wpTypeName}&nbsp;
							</td>
							<td>
								&nbsp;
							</td>
							<td align="center">${wst.completeDate}&nbsp;</td>
						</tr>
					</s:else>
				</s:if>
				<s:elseif test="(#request.fiId == #wst.fiId)">
					<s:set id="rowCount" value="%{#rowCount + 1}"></s:set>
					<s:if test="null != #wst.chWps && #wst.chWps.size() > 0">
						<s:iterator value="#wst.chWps" var="chWp" status="statChWp">
							<tr class="spHistoryCreate">
<!-- 								<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
								<s:if test="#statChWp.index == 0">
								<td align="center" rowspan="${wst.chWps.size()}">${rowCount}</td>
								<td align="left" rowspan="${wst.chWps.size()}">
									${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;
								</td>
								</s:if>
								<td align="left" rowspan="1">${chWp.rolePathWithBr}</td>
								<td align="left">
									<s:if test="null != #chWp.participantUsersNames && '' != #chWp.participantUsersNames">
										${chWp.definededUsersNames}&nbsp;
									</s:if>
									<s:else>
										${chWp.definededUsersNames}&nbsp;
									</s:else>
								</td>
								<td>
									${wst.wpTypeName}&nbsp;
								</td>
								<td>
									&nbsp;
								</td>
								<td align="center">&nbsp;</td>
							</tr>
						</s:iterator>
					</s:if>
					<s:else>
						<tr class="spHistoryCreate">
<!-- 							<s:if test="#request.isAdmin"><td><input type="checkbox" class="chWpId_${wst.wpId}_${chWp.wpId}" name="chWpId_${wst.wpId}_${chWp.wpId}" onclick="wpSel('${wst.wpId}', '${chWp.wpId}')" /></td></s:if> -->
							<td align="center" rowspan="1">${rowCount}</td>
							<td align="left" rowspan="1">
								${wst.displayName}<br/>(${wst.opGroupsName})&nbsp;
							</td>
							<td align="left" rowspan="1">${wst.rolePathWithBr}</td>
							<td align="left">
								<s:if test="null != #wst.participantUsersNames && '' != #wst.participantUsersNames">
									${wst.definededUsersNames}&nbsp;
								</s:if>
								<s:else>
									${wst.definededUsersNames}&nbsp;
								</s:else>
							</td>
							<td>
								${wst.wpTypeName}&nbsp;
							</td>
							<td>
								&nbsp;
							</td>
							<td align="center">&nbsp;</td>
						</tr>
					</s:else>
				</s:elseif>
			</s:else>
			<s:if test="#request.curFi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE && #wstStatus.last == true">
				<tr class="spHistoryComplete">
<!-- 					<td>&nbsp;</td> -->
					<td align="center" rowspan="1">${rowCount + 1}&nbsp;</td>
					<td align="left" rowspan="1">结束&nbsp;</td>
					<td align="left" rowspan="1">&nbsp;</td>
					<td align="left">
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
					<td align="center">&nbsp;</td>
				</tr>
			</s:if>
		</s:iterator>
		</s:if>
		<s:else>
			<tr>
				<td colspan="7">&nbsp;</td>
			</tr>
		</s:else>
	</table>
	<div class="clear" style="width: 100%;height: 5px;"></div>
	<div class="clear" style="width: 100%;height: 5px;"></div>
</body>
</html>