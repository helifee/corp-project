<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="page/Designer/Designer-listFl.js"></script>
	<script type="text/javascript" src="page/Ct/Ct-index.js"></script>
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
</head>
<body>
	<div id="wrapper">
		<form id="frm" name="frm" action="Ct!index.do" method="post">
		<s:hidden name="start"></s:hidden> 
		<input type="hidden" value="${ctDto.status}" id="isDisabled"/>
		<input type="hidden" value="${selectPath}" id="selectPath"/>
		<s:hidden name="ctDto.ctId" id="ctId" value="%{ctDto.ctId}"></s:hidden>
		<s:hidden name="ctDto.serviceObjectDefineId" id="serviceObjectDefineId" value="%{ctDto.serviceObjectDefineId}"></s:hidden>
		<s:hidden name="ctDto.appId" id="appId" value="%{ctDto.appId}"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="32%" valign="top">
				    <div class="t_title" style='margin-top: 5px'>
				      <div class="hh">流程模板</div>
				    </div> 
					
					<div id="cardarea_new">
						<div id="tree" style="height:450px;overflow-y:auto;"></div>
					</div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td width="67%" valign="top" >
					 <!-- 查询条件 -->
					<div class="s1_searchWrap" style="margin-top:5px;">
						<div class="s2">
							<div class="sl-key">
								<span>已选条件:</span>
							</div>
							<div class="s2-clear">
								<a href="javascript:void(0)" onclick="clearAll()">清除条件</a>
							</div>
							<div class="s2-value">
								<ul id="selectedCond">
									<s:if test="#request.statusMap.get(ctDto.status) != null">
										<li id="statusLi">
											<a href="javascript:void(0)" onclick="clearCurrent(this)">类型状态：${statusMap[ctDto.status]}</a> <s:hidden name="ctDto.status"></s:hidden>
										</li>
									</s:if>
									<s:if test="#request.valStatusMap.get(ctDto.valStatus) != null">
										<li id="valStatusLi">
											<a href="javascript:void(0)" onclick="clearCurrent(this)">是否禁用：${valStatusMap[ctDto.valStatus]}</a> <s:hidden name="ctDto.valStatus"></s:hidden>
										</li>
									</s:if>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="sl-wrap">
							<div class="sl-key">
								<span>类型状态:</span>
							</div>
							<div class="sl-value">
								<ul>
									<s:iterator value="#request.statusMap">
										<li class="${key eq ctDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('类型状态：${value}','${key}','statusLi','ctDto.status')" id="${key}">${value}</a>
										</li>
									</s:iterator>
								</ul>
							</div>
							<div class="clear"></div>
							<div class="sl-key">
								<span>是否禁用:</span>
							</div>
							<div class="sl-value">
								<ul>
									<s:iterator value="#request.valStatusMap">
										<li class="${key eq ctDto.valStatus ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('是否禁用：${value}','${key}','valStatusLi','ctDto.valStatus')" id="${key}">${value}</a>
										</li>
									</s:iterator>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<!-- 标题 -->
					<div class="t_title">
						<div class="hh">模板列表</div>
						<div class="t_title_input">
							<input type="text" name="ctDto.keyword" id="keyword" placeholder="流程模板名称、编码" value="${ctDto.keyword }" />
						</div>
						<div class="t_title_input">
							<a href="#" title="查询" onclick="javascript:queryFlow();">
								<img src="images/icon_search.png" width="24" height="24" align="bottom" />
							</a>
						</div>
						<div class="tool">
							<a href="#" onclick="javascript:void(0);" id="disOrUnDis" style="display:none" title="目录">启用</a>
							<a href="#" onclick="javascript:newCt()" class="t_new" id="addPdTm" style="display:none" title="目录">新建</a>
							<a href="#" onclick="javascript:deleteCt()" class="t_new" id="deletePdTm" style="display:none" title="目录">删除</a>
							<a href="#" onclick="javascript:editCt()" class="t_edit" id="editPdTm" style="display:none" title="目录">编辑</a>
							<a href="#" onclick="javascript:setDefaultFl()" class="t_qxsz" id="defaultPdTm" style="display:none">默认</a>
							<a href="#" onclick="flowMonitorSet()" class="t_qxsz">监控设置</a>
							<a href="#" onclick="javascript:newFlow();" class="t_new" title="流程">新建</a>
							<a href="#" onclick="javascript:moveFlow();" class="t_mbcbjz" title="流程">转移</a>
							<a href="#" onclick="javascript:toBatchChangeParticipant();" id="batchChangeParticipant" class="t_mbcbjz" style="display:none">替换处理人</a>
							<a href="#" onclick="javascript:flowTest();" class="t_start" title="流程">仿真</a>
							<a href="#" onclick="javascript:viHistory();" class="t_ddsfp" title="流程">版本</a>
						</div>
						<div class="clear"></div>
					</div>
					<div>
						<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
							<tr>
								<th width="10px">
									<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
								</th>
								<th>名称</th>
								<th width="60px">编码</th>
								<th width="100px">版本号</th>
								<th width="130px">流程类型</th>
								<th width="130px">业务对象</th>
								<th width="40px">状态</th>
								<th width="30px">默认</th>
								<th width="120px">发布时间</th>
								<th width="30px">操作</th>
							</tr>
							<s:iterator value="page.items" var="item">
							<s:if test="null != #item.isDisabled && #item.isDisabled == 1">
								<s:set id="disabledTrClass" value="'disabledTr'"></s:set>
							</s:if>
							<s:else>
								<s:set id="disabledTrClass" value=""></s:set>
							</s:else>
							<tr class="${disabledTrClass}" onclick="chooseThisRow('ids_${item.id}')">
								<td align="center">
									<input name="ids" type="checkbox" id="ids_${item.id}" value="${item.id}" onclick="chooseThisRow('ids_${item.id}')" />
								</td>
								<td align="left">
									<a href="#" onclick="javascript:viewFlow(${item.id})">
									<s:property value="#item.flowName" /> </a>
								</td>
								<td align="center"><s:property value="#item.flowCode" /></td>
								<td align="center"><s:property value="#item.flowVersion" /></td>
								<s:set id="ctNamePath" value="getCtNamePath(#item.ctId)"></s:set>
								<td align="left" title="${ctNamePath}">
									<app:TruncateTag size="20" src="${not empty ctNamePath ? ctNamePath : '未分类'}"></app:TruncateTag>
								</td>
								<s:if test="null != #item.serviceObjectDefine">
									<s:if test="null != #item.serviceObjectDefine.appName && '' != #item.serviceObjectDefine.appName">
										<s:set id="allPath" value="%{#item.serviceObjectDefine.appName + '/' + #item.serviceObjectDefine.name}"></s:set>
									</s:if>
									<s:else>
										<s:set id="allPath" value="#item.serviceObjectDefine.name"></s:set>
									</s:else>
								</s:if>
								<s:else>
									<s:set id="allPath" value="未分类"></s:set>
								</s:else>
								<td align="left" title="${allPath}">
									<app:TruncateTag size="20" src="${allPath}"></app:TruncateTag>
								</td>
								<td align="center">
									<s:if test="#item.isCommited==1">
										已提交
									</s:if>
									<s:else>
										<!-- 编辑中 --> 已提交
									</s:else>
								</td>
								<td align="center">
									<s:if test="#item.isDefault == 1">
										是
									</s:if>
									<s:else>
										否
									</s:else>
								</td>
								<td align="center">
									<app:date dateTime="${item.publishTime}" style="yyyy-MM-dd HH:mm:ss"></app:date>
								</td>
								<td align="center">
									<s:if test="#item.isCommited==1">
										<a href="#" onclick="javascript:coFlow(${item.id})">检出</a>
										<a href="#" onclick="javascript:startFlow(${item.id})" style="display: none;">启动</a>
										
									</s:if>
									<s:else>
										<a href="#" onclick="javascript:editFlow(${item.id})">编辑</a>
									</s:else>
								</td>
							</tr>
							</s:iterator>
						</table>
						<!-- <div class="page">
							<div style="float: left;">
								&nbsp;
							</div>
							<jdt:pager url="Ct!index.do"></jdt:pager>
						</div> -->
						<div class="page">
							<div style="float: left;">
								&nbsp;
							</div>
							<app:PageTag actionName="Ct!index.do" ></app:PageTag>
						</div>
					</div>
				</td>
			</tr>
		</table>
		</form>
	</div>
</body>
<script type="text/javascript">
	function queryFlow(){
		$('#frm').submit();
	}
</script>
</html>
