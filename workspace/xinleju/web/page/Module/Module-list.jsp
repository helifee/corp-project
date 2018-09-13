<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>系统模块管理</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Module/module-list.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	</head>
	<body>
		<s:form id="frm" name="frm" action="Module!list.do">
			<s:hidden name="start"></s:hidden>
			<div class="s1_searchWrap">
				<div class="s2">
					<div class="sl-key">
						<span>已选条件</span>
					</div>
					<div  class="s2-clear">
						<a href="javascript:void(0)" onclick="clearAll()">清除条件</a>
					</div>
					<div class="s2-value">
						<ul id="selectedCond">
							<s:if test="#request.statusMap.get(moduleDto.status) != null">
								<li id="statusLi">
									<a href="javascript:void(0)"  onclick="clearCurrent(this)">状态：${statusMap[moduleDto.status]}</a><s:hidden name="moduleDto.status"></s:hidden>
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
								<li class="${key eq moduleDto.status ? 'current' : '' }">
									<a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','moduleDto.status')" id="${key}">${value }</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			
			<div class="t_title">
				<div class="hh">模块类型列表</div>
				<div class="t_title_input">
					<input type="text" id="keyword" name="moduleDto.keyword" value="${moduleDto.keyword }" placeholder="模块名称"/>
				</div>
				<div class="t_title_input">
					<a href="javascript:void(0)" title="查询" onclick="javascript:query()">
						<img src="images/icon_search.png" alt="查询" width="24" height="24" />
					</a>
				</div>
				<div class="tool">
					<a href="#" onclick="javascript:newModule();" class="t_new">新增</a>
					<a href="#" onclick="javascript:disable();" class="t_del">禁用</a>
					<a href="#" onclick="javascript:enable();" class="t_submit">启用</a>
					<a href="#" onclick="javascript:editModule();" class="t_edit">编辑</a>
				</div>
				<div class="clear"></div>
			</div>
			<!-- app列表 -->
			<table  width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="20px"></th>
					<th>模块名字</th>
					<th>系统路径</th>
					<th>主页链接</th>
					<th>模块编码</th>
					<th width="60px">模块状态</th>
				</tr>
				<s:iterator value="page.items" var="item">
					<s:if test="#item.status == 1">
						<tr class="redTr"  onclick="chooseThisRow('ids_${item.id}');">
					</s:if>
					<s:else>
						<tr  onclick="chooseThisRow('ids_${item.id}');">
					</s:else>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" id="ids_${item.id }" />
						</td>
						<td>${item.name }</td>
						<td>${item.depUrl }</td>
						<td>${item.indexUrl }</td>
						<td>${item.code }</td>
						<td>
							<s:if test="null != #item.status &&#item.status == 1">
								<span style="color: red">禁用</span>
							</s:if>
							<s:else>
								启用
							</s:else>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="Module!list.do"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
