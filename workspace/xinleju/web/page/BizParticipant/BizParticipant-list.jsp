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
		<script type="text/javascript" src="page/BizParticipant/BizParticipant-list.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="BizParticipant!list">
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
							<s:if test="#request.statusMap.get(bizParticipantDto.status) != null">
								<li id="statusLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[bizParticipantDto.status]}</a> <s:hidden name="bizParticipantDto.status"></s:hidden>
								</li>
							</s:if>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
				<div class="sl-wrap">
					<div class="sl-key">
						<span>状态:</span>
					</div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.statusMap">
								<li class="${key eq bizParticipantDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','bizParticipantDto.status')" id="${key}">${value}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">注册参与人列表 </div>
				<div class="t_title_input">
					<input type="text" name="bizParticipantDto.keyword" id="keyword" placeholder="注册参与人名称，编码" value="${bizParticipantDto.keyword }" />
				</div>
				<div class="t_title_input">
					<a href="#" title="查询" onclick="javascript:query();">
						<img src="images/icon_search.png" width="24" height="24" align="bottom" />
					</a>
				</div>
				<div class="tool">
					<a href="#" onclick="javascript:newBizParticipant();" class="t_new">新增</a>
					<a href="#" onclick="javascript:updateBizParticipant(0);" class="t_submit">启用</a>
					<a href="#" onclick="javascript:updateBizParticipant(1);" class="t_del">禁用</a>
					<a href="#" onclick="javascript:editBizParticipant();" class="t_edit">编辑</a>
				</div>
				<div class="clear"></div>
			</div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="20px">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th>
						名称
					</th>
					<th width="60px">
						编码
					</th>
					<th width="60px">
						状态
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<s:if test="#item.isDisabled == 1">
					<tr class="redTr">
					</s:if>
					<s:else>
					<tr>
					</s:else>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td>
							<s:property value="#item.name" />
						</td>
						<td>
							<s:property value="#item.code" />
						</td>
						<td align="center"><s:if test="#item.isDisabled == 1">禁用</s:if><s:else>启用</s:else></td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="BizParticipant!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
