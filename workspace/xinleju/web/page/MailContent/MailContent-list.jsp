<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="MailContent!list.do" method="post">
			<s:hidden name="start"></s:hidden>
	
			 <!-- 查询条件 -->
			<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      	<s:if test="#request.statusMap.get(#request.status) != null">
			        	<li id="statusLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[status]}</a>
			        		<s:hidden name="status" value="%{#request.status}"></s:hidden>
			        	</li>
			      	</s:if> 
			      </ul> 
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq status ? 'current' :''}">
			        	<a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','status')" id="${key}">${value}</a>
			        	</li> 
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> 
		</div>
		
		
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">邮件发送记录</div>
			  <div class="clear"></div>
			</div>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="10%">标题</th>
					<th width="10%">发送状态</th>
					<th width="10%">进入时间</th>
					<th width="10%">首次发送时间</th>
					<th width="10%">末次发送时间</th>
					<th width="10%">累计成功/连续发送失败次数</th>
					
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							${item.title}
						</td>
						<td align="center">
							${statusMap[item.sendState]}
						</td>
						<td align="center">
							<fmt:formatDate value="${item.startTime}" pattern="yyyy-MM-dd HH:mm:ss" />
						</td>
						<td align="center">
							<fmt:formatDate value="${item.firstSendAt}" pattern="yyyy-MM-dd HH:mm:ss" />
						</td>
						<td align="center">
							<fmt:formatDate value="${item.lastSendAt}" pattern="yyyy-MM-dd HH:mm:ss" />
						</td>
						<td align="center">
							${item.successSendTimes}/${item.failureContinueTimes}
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="MailContent!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
