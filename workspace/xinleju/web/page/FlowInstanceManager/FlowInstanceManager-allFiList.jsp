<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible"content="IE=8;IE=10">
		<title>流程中心</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/application.js"></script>
	</head>
	<body style="overflow: hidden;">
		<s:form id="frmNew" action="FlowInstanceManager!allFiList.do">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="ifShowMore" id="ifShowMore"></s:hidden>
			<!-- 查询条件 -->
			<div class="s1_searchWrap">
				<div class="s2">
					<div class="sl-key"><span>已选条件:</span></div>
					<div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
					<div class="s2-value">
						<ul id="selectedCond">
							<s:if test="#request.todoTypeMap.get(todoFiDto.todoType) != null">
								<li id="todoTypeLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">任务类型：${todoTypeMap[todoFiDto.todoType]}</a>
									<s:hidden name="todoFiDto.todoType"></s:hidden>
								</li>
							</s:if>
							<s:if test="#request.companyMap.get(todoFiDto.depIds) != null">
								<li id="depIdsLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">组织机构：${companyMap[todoFiDto.depIds].name}</a>
									<s:hidden name="todoFiDto.depIds"></s:hidden>
								</li>
							</s:if>
							<s:if test="#request.cCtMap.get(todoFiDto.cctId) != null">
								<li id="ctIdLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">流程类别：${pCtMap[todoFiDto.pctId].name}/${ctMap[todoFiDto.ctId].name}/${cCtMap[todoFiDto.cctId].name}</a>
									<s:hidden name="todoFiDto.cctId"></s:hidden>
								</li>
							</s:if>
							<s:elseif test="#request.ctMap.get(todoFiDto.ctId) != null">
								<li id="ctIdLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">流程类别：${pCtMap[todoFiDto.pctId].name}/${ctMap[todoFiDto.ctId].name}</a>
									<s:hidden name="todoFiDto.ctId"></s:hidden>
								</li>
							</s:elseif>
							<s:elseif test="#request.pCtMap.get(todoFiDto.pctId) != null">
								<li id="ctIdLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">流程类别：${pCtMap[todoFiDto.pctId].name}</a>
									<s:hidden name="todoFiDto.pctId"></s:hidden>
								</li>
							</s:elseif>
							<s:if test="#request.fiStatusMap.get(todoFiDto.fiStatus) != null">
								<li id="fiStatusLi">
									<a href="javascript:void(0)" onclick="clearCurrent(this)">流程状态：${fiStatusMap[todoFiDto.fiStatus]}</a>
									<s:hidden name="todoFiDto.fiStatus"></s:hidden>
								</li>
							</s:if>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
				<div class="sl-wrap">
					<div class="sl-key">
						<span>任务类型:</span>
					</div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.todoTypeMap">
								<li class="${key eq todoFiDto.todoType ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('任务类型：${value}',${key},'todoTypeLi','todoFiDto.todoType','frmNew')" id="${key}">${value}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
				<div class="sl-wrap">
					<div class="sl-key">
						<span>组织机构:</span>
					</div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.companyMap">
								<li class="${key eq todoFiDto.depIds ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('组织机构：${value.name}',${key},'depIdsLi','todoFiDto.depIds','frmNew')" id="${key}">${value.name}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
				<div class="sl-wrap" id="box2" style="${ifShowMore eq 1 ? 'display:' : 'display:none' }">
					<div class="sl-key"><span>流程类别:</span></div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.pCtMap">
								<li class="${key eq todoFiDto.pctId ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('流程类别：${value.name}',${key},'ctIdLi','todoFiDto.pctId','frmNew')" id="${key}">${value.name}</a>
								</li>
							</s:iterator>
							<s:iterator value="#request.ctMap">
								<li class="${key eq todoFiDto.ctId ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('流程类别：${value.name}',${key},'ctIdLi','todoFiDto.ctId','frmNew')" id="${key}">${value.name}</a>
								</li>
							</s:iterator>
							<s:iterator value="#request.cCtMap">
								<li class="${key eq todoFiDto.cctId ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('流程类别：${value.name}',${key},'ctIdLi','todoFiDto.cctId','frmNew')" id="${key}">${value.name}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key"><span>申请时间:</span></div>
					<div class="sl-value">
						<ul>
							<li>
								<input name="todoFiDto.startDate" value="${todoFiDto.startDate}" style="width: 120px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
							</li>
							<li>-</li>
							<li>
								<input name="todoFiDto.endDate" value="${todoFiDto.endDate}" style="width: 120px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
							</li>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key"><span>通过时间:</span></div>
					<div class="sl-value">
						<ul>
							<li>
								<input name="todoFiDto.clStartDate" value="${todoFiDto.clStartDate}" style="width: 120px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
							</li>
							<li>-</li>
							<li>
								<input name="todoFiDto.clEndDate" value="${todoFiDto.clEndDate}" style="width: 120px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
							</li>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key"><span>流程状态:</span></div>
					<div class="sl-value">
						<ul>
							<s:iterator value="#request.fiStatusMap">
								<li class="${key eq todoFiDto.fiStatus ? 'current' :''}">
									<a href="javascript:void(0)" onclick="selectCond('流程状态：${value}','${key}','fiStatusLi','todoFiDto.fiStatus','frmNew')" id="${key}">${value}</a>
								</li>
							</s:iterator>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key"><span>申请人:</span></div>
					<div class="sl-value">
						<ul>
							<li>
								<input name="todoFiDto.startUserName" value="${todoFiDto.startUserName}"/>
							</li>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="sl-key"><span>当前处理人:</span></div>
					<div class="sl-value">
						<ul>
							<li>
								<input name="todoFiDto.curUserNames" value="${todoFiDto.curUserNames}"/>
							</li>
						</ul>
					</div>
					<div class="clear"></div>
					<div class="m_searchWrap"><input type="button" value="确定" onclick="queryFrm('frmNew')"/></div>
				</div>
				<s:set id="titleMsg" value="'流程类别、申请时间、通过时间、流程状态、申请人、当前处理人'"></s:set>
				<s:if test="ifShowMore == 1">
					<div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛${titleMsg}｝ ','显示更多筛选条件｛${titleMsg}｝')">隐藏更多筛选条件｛${titleMsg}｝ </a></div>
				</s:if>
				<s:else>
					<div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛${titleMsg}｝ ','显示更多筛选条件｛${titleMsg}｝')">显示更多筛选条件｛${titleMsg}｝ </a></div>
				</s:else>
			</div>
			<!-- 标题 -->
			<div class="t_title">
				<div class="hh">流程列表</div>
				<div class="t_title_input">
					<input type="text" name="todoFiDto.fiNameOrCode" id="title" placeholder="标题、编号"  value="${todoFiDto.fiNameOrCode}"/>
				</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:document.frmNew.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			</div>
			<div class="tool">
			</div>
			<div class="clear"></div>
			</div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="40px;">
						序号
					</th>
					<th width="">
						标题
					</th>
					<th width="120px;">
						流程类别
					</th>
					<th width="80px;">
						编号
					</th>
					<th width="100px;">
						机构
					</th>
					<th width="70px;">
						申请人
					</th>
					<th width="120px;">
						申请时间
					</th>
					<th width="80px;">
						状态
					</th>
					<th width="200px;">
						当前处理人
					</th>
				</tr>
				<s:set id="statusCreate" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_CREATED"></s:set>
				<s:set id="statusRunning" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_RUNNING"></s:set>
				<s:set id="statusComplete" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_COMPLETE"></s:set>
				<s:set id="statusOverdue" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_OVERDUE"></s:set>
				<s:set id="statusback" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_BACK"></s:set>
				<s:set id="statuswithdraw" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_WITHDRAW"></s:set>
				<s:set id="statussuspend" value="@com.xinleju.erp.flowengine.utils.FlowInstanceStatus@STATUS_SUSPEND"></s:set>
				<s:iterator value="page.items" id="item" status="sta">
					<s:set id="ctNamePath" value="@com.xinleju.erp.flow.action.CtAction@getCtNamePath(#item[12])"/>
					<tr>
						<td align="center">
							${sta.count}
						</td>
						<td align="left" title="${item[3]}">
							<a href="#" onclick="openwindow('FlowInstanceApprove!detail.do?fiId=${item[0]}','fi_wi',1270,0)"><app:TruncateTag size="50" src="${item[3]}"></app:TruncateTag></a>
						</td>
						<td align="left" >
						${item[11]}
						</td>
						<td>
							${item[1]}
						</td>
						<td>
							<s:property value="#item[9]"/>
						</td>
						<td align="left">
							<s:property value="#item[5]"/>
						</td>
						<td align="center">
							<s:date name="#item[6]" format="yyyy-MM-dd HH:mm:ss"/>
						</td>
						<td align="center">
							<s:if test="#item[7] == #statusCreate">
								创建
							</s:if>
							<s:elseif test="#item[7] == #statusRunning">
								运行
							</s:elseif>
							<s:elseif test="#item[7] == #statusComplete">
								结束
							</s:elseif>
							<s:elseif test="#item[7] == #statusOverdue">
								作废
							</s:elseif>
							<s:elseif test="#item[7] == #statusback">
								打回
							</s:elseif>
							<s:elseif test="#item[7] == #statuswithdraw">
								撤回
							</s:elseif>
							<s:elseif test="#item[7] == #statussuspend">
								挂起
							</s:elseif>
							<s:else>
								未知状态
							</s:else>
						</td>
						<td align="left">
							<s:property value="#item[8]"/>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
				</div>
				<app:PageTag formName="frmNew" actionName="FlowInstanceManager!allFiList.do"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
