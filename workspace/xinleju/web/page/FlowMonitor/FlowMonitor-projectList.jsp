<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>流程模板选择</title>
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
	<script type="text/javascript" src="page/FlowMonitor/FlowMonitor-projectList.js"></script>
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
</head>
<body>
		<form id="frm" name="frm" action="FlowMonitor!projectList.do" method="post">
		<s:hidden name="start"></s:hidden> 
		<input type="hidden" value="${ctDto.status}" id="isDisabled"/>
		<input type="hidden" value="${selectPath}" id="selectPath"/>
		<s:hidden name="ctDto.ctId" id="ctId" value="%{ctDto.ctId}"></s:hidden>
		<s:hidden name="ctDto.serviceObjectDefineId" id="serviceObjectDefineId" value="%{ctDto.serviceObjectDefineId}"></s:hidden>
		<s:hidden name="ctDto.appId" id="appId" value="%{ctDto.appId}"></s:hidden>
		<s:hidden name="datas" id="datas" value="%{#request.datas}"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="32%" valign="top">
				    <div style='margin-top: 5px'>
				      <div class="hh">流程模板</div>
				    </div> 
					
					<div id="cardarea_new">
						<div id="tree" style="height:450px;width:200px;overflow-y:auto;"></div>
					</div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td width="67%" valign="top" >
					<!-- 标题 -->
					<div class="t_title">
						<div class="hh">流程模板列表</div>
						<div class="t_title_input">
							<input type="text" name="ctDto.keyword" id="keyword" placeholder="流程模板名称、编码" value="${ctDto.keyword }" />
						</div>
						<div class="t_title_input">
							<a href="#" title="查询" onclick="javascript:queryFlow();">
								<img src="images/icon_search.png" width="24" height="24" align="bottom" />
							</a>
						</div>
						<div class="tool">
						</div>
						<div class="clear"></div>
					</div>
					<div>
						<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
							<tr>
								<th width="10">
									<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
								</th>
								<th>名称</th>
								<th>编码</th>
								<th>版本号</th>
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
									<s:set id="isSelected" value="isChecked(#request.datas, #item.id)"></s:set>
									<input name="ids" type="checkbox" id="ids_${item.id}" value="${item.flowCode}" onclick="chooseThisRow('ids_${item.id}')" <s:if test="#isSelected">checked="checked"</s:if>/>
								</td>
								<td align="left" class="flowName">
									<s:property value="#item.flowName" />
								</td>
								<td align="center"><s:property value="#item.flowCode" /></td>
								<td align="center"><s:property value="#item.flowVersion" /></td>
							</tr>
							</s:iterator>
						</table>
						<div class="page">
							<div style="float: left;">
								&nbsp;
							</div>
							<app:PageTag actionName="FlowMonitor!projectList.do" ></app:PageTag>
						</div>						
					</div>
				</td>
			</tr>
		</table>
		</form>
						
</body>
<script type="text/javascript">
	function queryFlow(){
		$('#frm').submit();
	}
</script>
</html>
