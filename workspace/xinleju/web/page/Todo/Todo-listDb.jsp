<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
		<script src="js/ext/adapter/ext/ext-base.js"></script>
		<script src="js/ext/TreeCheckNodeUI.js"></script>
		<script src="js/ext/ext-all.js"></script>
		<script type="text/javascript" src="js/ext/ux/ux-all.js"></script>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="page/Todo/Todo_query.js?t=<%=System.currentTimeMillis()%>"></script>
	</head>
	<body>
		<s:form id="frm" action="Todo!listDb">
			<s:hidden name="start"></s:hidden>
			<table width="100%" border="0" cellpadding="0" cellspacing="1" class="t_search">
				<tr>
					<td width="120px">
						流程标题：
					</td>
					<td width="25%">
						<s:textfield id="fiName" name="fiName" cssClass="input200" value="%{#request.fiName}"></s:textfield>
					</td>
					<td width="130px">
						申请人：
					</td>
					<td width="15%">
						<s:textfield id="userNames" name="userNames" cssClass="input125" value="%{#request.userNames}"></s:textfield>
					</td>
					<td width="140px">
						机构/部门：
					</td>
					<td width="20%">
						<input type="hidden" id="depIds" name="depIds" value="${depIds}"/>
						<input id="depNames" name="depNames" cssClass="input125" disabled="disabled" value="${depNames}"/>
					</td>
					<td width="100px">
						已/未读：
					</td>
					<td>
						<s:select list="#{2:'全部',0:'未读',1:'已读'}" name="readType"></s:select>
					</td>
				</tr>
				<tr>
					<td>
						申请时间：
					</td>
					<td>
						<input readonly="readonly" id="startDate" name="startDate" value="${startDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>至
						<input readonly="readonly" id="endDate" name="endDate" value="${endDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
					</td>
					<td>
						流程类别：
					</td>
					<td>
						<input type="hidden" id="ctIds" name="ctIds" value="${ctIds}"/>
						<s:textfield id="ctNames" name="ctNames" cssClass="input125" value="%{#request.ctNames}"></s:textfield>
						<input type="button" value="选择" class="btn_q" onclick="chooseCt('Cate_0','Cate_','流程类别','ctIds','ctNames');" style="padding: 1px 3px 1px 3px;">
					</td>
					<td>
						业务对象：
					</td>
					<td>
						<input type="hidden" id="objIds" name="objIds" value="${objIds}"/>
						<s:textfield id="objNames" name="objNames" cssClass="input125" value="%{#request.objNames}"></s:textfield>
						<input type="button" value="选择" class="btn_q" onclick="chooseCt('Object_0','Object_','业务对象','objIds','objNames');" style="padding: 1px 3px 1px 3px;">
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						<a href="#" title="查询" onclick="javascript:$('body').mask('操作中...');$('#frm').submit();"><img src="images/icon_search.png" width="24" height="24" /> </a>
					</td>
				</tr>
				<tr>
					<td>
						接收时间：
					</td>
					<td>
						<input readonly="readonly" id="jsStartDate" name="jsStartDate" value="${jsStartDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>至
						<input readonly="readonly" id="jsEndDate" name="jsEndDate" value="${jsEndDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
					</td>
					<td>
						处理时间：
					</td>
					<td colspan="3">
						<input readonly="readonly" id="clStartDate" name="clStartDate" value="${clStartDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>至
						<input readonly="readonly" id="clEndDate" name="clEndDate" value="${clEndDate}" class="input125" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
					</td>
					<td>
						流程编号：
					</td>
					<td>
						<s:textfield id="flCode" name="flCode" cssClass="input125" value="%{#request.flCode}"></s:textfield>
					</td>
				</tr>
				<tr>
					<td>
						处理人：
					</td>
					<td>
						<s:textfield id="clUserNames" name="clUserNames" cssClass="input125" value="%{#request.clUserNames}"></s:textfield>
					</td>
					<td>
						流程状态：
					</td>
					<td colspan="2">
						<input id="fiStatus_0" type="checkbox" value="0" name="fiStatus" <s:if test="fiStatus.indexOf('0') >= 0">checked="checked"</s:if>/>待审
						<input id="fiStatus_1" type="checkbox" value="1" name="fiStatus" <s:if test="fiStatus.indexOf('1') >= 0">checked="checked"</s:if>/>驳回
						<input id="fiStatus_2" type="checkbox" value="2" name="fiStatus" <s:if test="fiStatus.indexOf('2') >= 0">checked="checked"</s:if>/>结束
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
				<tr>
					<td>
						<div class="divh3_title">
							<a href="#">待办列表<font color="red"></font></a>
						</div>
						<div class="divh3_time">
							<a href="#"></a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="40px;">
						序号
					</th>
					<th width="120px;">
						流程类别
					</th>
					<th width="">
						标题
					</th>
					<th width="80px;">
						编号
					</th>
					<th width="80px;">
						申请人
					</th>
					<th width="120px;">
						申请时间
					</th>
					<th width="120px;">
						接收时间
					</th>
					<th width="80px;">
						状态
					</th>
					<th width="120px;">
						节点
					</th>
					<th width="80px;">
						当前处理人
					</th>
				</tr>
				<s:iterator value="page.items" id="item" status="sta">
					<s:set id="ctNamePath" value="@com.xinleju.erp.flow.action.CtAction@getCtNamePath(#item.fl.ctId)"/>
					<tr>
						<td align="center">
							${sta.count}
						</td>
						<td align="left" title="${ctNamePath}">
							<app:TruncateTag size="50" src="${ctNamePath}"></app:TruncateTag>
						</td>
						<td align="left" title="${item.fi.fiName}">
							<app:TruncateTag size="50" src="${item.fi.fiName}"></app:TruncateTag>
						</td>
						<td>
							${item.id}
						</td>
						<td align="left">
							<s:property value="#item.fi.startUserName"/>
						</td>
						<td align="center">
							<s:date name="#item.fi.startTime" format="yyyy-MM-dd HH:mm:ss"/>
						</td>
						<td align="center">
							<s:date name="#item.createTime" format="yyyy-MM-dd HH:mm:ss"/>
						</td>
						<td align="center">
							<s:if test="#item.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_CREATED">
								创建
							</s:if>
							<s:elseif test="#item.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_RUNNING">
								待审
							</s:elseif>
							<s:elseif test="#item.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
								结束
							</s:elseif>
							<s:elseif test="#item.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_OVERDUE">
								作废
							</s:elseif>
							<s:else>
								未知状态
							</s:else>
						</td>
						<td align="left">
							<s:property value="#item.ac.nodeName"/>
						</td>
						<td align="left">
							<s:property value="#item.participantUserName"/>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
				</div>
				<app:PageTag actionName="Todo!listDb"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
