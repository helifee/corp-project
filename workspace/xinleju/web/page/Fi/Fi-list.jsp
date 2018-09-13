<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="page/Fi/Fi-list.js"></script>
		
	</head>
	<body>
		<s:form id="frm" action="Fi!list">
			<s:hidden name="start"></s:hidden>
			<!-- 路径导航
			<div class="path"> 
				我的位置：首页&gt;&gt;
				<a href="#">流程实例列表</a>
			</div> -->
			<!-- 主区域工具栏 start-->
			<div class="top_tool_box" style="display: none;">
				<a href="#" onclick="javascript:newFlow()">创建流程</a>
			</div>
			<table width="100%" border="0" cellpadding="0" cellspacing="1" class="t_search">
				<tr>
					<td width="25%">
						实例名：
						<s:textfield id="fiName" name="fiName" cssClass="input125" value="%{#request.fiName}"></s:textfield>
					</td>
					<td width="25%">
						状态：
						<s:select onchange="queryFi(0)" value="%{#request.isDisabled}" id="isDisabled" name="isDisabled" cssClass="input125" list="#{'0':'未删除','1':'已删除'}" listKey="key" listValue="value"></s:select>
					</td>
					<td width="25%">
					</td>
					<td width="25%">
						<a href="#" title="查询" onclick="javascript:queryFi(0)"><img src="images/icon_search.png" width="24" height="24" /> </a>
					</td>
					<td align="right">
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
				<tr>
					<td>
						<div class="divh3_title">
							<a href="#">流程实例列表</a>
						</div>
						<div class="divh3_time">
							<a href="#"></a>
						</div>
					</td>
				</tr>
			</table>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th>
						名称
					</th>
					<th width="15%">
						启动时间
					</th>
					<th width="10%">
						启动人
					</th>
					<th width="25%">
						历史工作列表
					</th>
					<th width="15%">
						执行退回到上一步
					</th>
					<th width="15%">
						执行完成工作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />${item.id}
						</td>
						<td>
							<a href="javascript:void(0)" onclick="javascript:viewGraph(${item.id})"><s:property value="#item.fiName" />（<s:property value="#item.fl.flowName" />）</a>
						</td>

						<td align="center">
							<app:date dateTime="${item.startTime}" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<td align="center">
							<s:property value="#item.startUserName" />
						</td>
						<td align="center">
							
							<s:iterator value="#item.historys" id="wi">
								<s:property value="#wi.ai.ac.nodeName" />
								【<s:property value="#wi.wiType" />】<s:property value="#wi.opCode" />
								(<s:property value="#wi.completeUserName" />:<app:date dateTime="${wi.completeTime}" style="MM/dd HH:mm:ss"></app:date>)<br>
							</s:iterator>
						</td>
						<td align="center">
							<s:iterator value="#item.runnings" id="wi">
								<a href="javascript:void(0)" onclick="previous1(<s:property value="#wi.id"/>)">
									<s:property value="#wi.ai.ac.nodeName" /> </a>(<s:property value="#wi.participantUserName" />)<br>
									<s:property value="#wi.id"/>-<s:property value="#wi.aiId"/>-<s:property value="#wi.tstamp"/><br/>
							</s:iterator>
						</td>
						<td align="center">
							<s:iterator value="#item.runnings" id="wi">[${wi.id}-uid:${wi.participant}]
								<a href="javascript:void(0)" onclick="completeWi(<s:property value="#wi.id"/>)">
									<s:property value="#wi.ai.ac.nodeName" /> </a>(<s:property value="#wi.participantUserName" />)<br>
									<s:property value="#wi.id"/>-<s:property value="#wi.aiId"/>-<s:property value="#wi.tstamp"/><br/>
							</s:iterator>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					<s:if test="#request.isDisabled==1">
						<app:OpTag postUrl="Fi!unDelete" postMessage="启用"></app:OpTag>
					</s:if>
					<s:else>
						<app:OpTag postUrl="Fi!delete" postMessage="禁用"></app:OpTag>
					</s:else>
				</div>
				<app:PageTag actionName="Fi!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
