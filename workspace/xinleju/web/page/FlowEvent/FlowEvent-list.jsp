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
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FlowEvent/FlowEvent-list.js"></script>
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="FlowEvent!list">
			<s:hidden name="start"></s:hidden>
			<!-- 查询条件 -->
			<div class="s1_searchWrap">
				<div class="s2">
					<div class="sl-key">
						<span>已选条件:</span>
					</div>
					<div class="s2-clear">
						<a href="javascript:void(0)" onclick="clearAll()">清除条件</a>
					</div>
					<div class="s2-value">
						<ul id="selectedCond">
							<s:if test="#request.statusMap.get(flowEventDto.status) != null">
								<li id="statusLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">处理状态：${statusMap[flowEventDto.status]}</a> <s:hidden name="flowEventDto.status"></s:hidden>
								</li>
							</s:if>
							<s:if test="#request.codeMap.get(flowEventDto.code) != null">
								<li id="statusLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">事件类型：${codeMap[flowEventDto.code]}</a> <s:hidden name="flowEventDto.code"></s:hidden>
								</li>
							</s:if>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
				<div class="sl-wrap">
					<div class="sl-key">
						<span>处理状态:</span>
					</div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.statusMap">
								<li class="${key eq flowEventDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('处理状态：${value}','${key}','statusLi','flowEventDto.status')" id="${key}">${value}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key">
						<span>事件类型:</span>
					</div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.codeMap">
								<li class="${key eq flowEventDto.code ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('事件类型：${value}','${key}','statusLi','flowEventDto.code')" id="${key}">${value}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">事件列表</div>
				<div class="t_title_input">
					<input type="text" name="flowEventDto.keyword" id="keyword" placeholder="事件主体ID" value="${flowEventDto.keyword }" />
				</div>
				<div class="t_title_input">
					<a href="#" title="查询" onclick="javascript:queryFlowEvent();">
						<img src="images/icon_search.png" width="24" height="24" align="bottom" />
					</a>
				</div>
				<div class="tool">
				</div>
				<div class="clear"></div>
			</div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="10px">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th width="40px">
						编码
					</th>
					<th width="80px">
						事件主体ID
					</th>
					<th width="120px">
						创建时间
					</th>
					<th>
						事件主体Json
					</th>
					
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							<s:property value="#item.code" />
						</td>
						<td align="center">
							<s:property value="#item.srcId" />
						</td>
						
						<td>
							<s:date name="#item.createTime" format="yyyy-MM-dd HH:mm:ss"/>
						</td>
						<td>
							<textarea rows="5" style="width: 99%" readonly="readonly" disabled="disabled"><s:property value="#item.json"/></textarea>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					
				</div>
				<app:PageTag actionName="FlowEvent!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
