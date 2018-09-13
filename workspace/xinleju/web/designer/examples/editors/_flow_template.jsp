<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<div id="flow-template-div" class="x-hidden">

	<input type="hidden" name="start" />
	<input type="hidden" name="ctId" id="ctId" value="%{ctDto.ctId}"></input>
	<input type="hidden" name="serviceObjectDefineId" id="serviceObjectDefineId" value="%{ctDto.serviceObjectDefineId}"></input>
	<input type="hidden" name="appId" id="appId" value="%{ctDto.appId}"></input>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
		<tr>
			<td width="220" valign="top">
				<div id="cardarea_new">
					<div id="tree" style="height:392px;overflow-y:auto;"></div>
				</div>
			</td>
			<td width="742" valign="top">
				<div class="t_title_input" style="margin-bottom: 5px;">
					流程模板查询：<input type="text" id="keyword" placeholder="流程模板名称、编码" onchange="queryFl(this)"/> &nbsp; 回车即可搜索
				</div>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td>
							<table width="100%" cellpadding="0" cellspacing="1"
								class="wd_tablelist01" style="font-size:12px; table-layout:fixed;">
								<tr>
									<th width="5%"></th>
									<th width="20%" >名称</th>
									<th width="15%">编码</th>
									<th width="20%">版本号</th>
									<th width="19%">流程类型</th>
									<th width="21%">业务对象</th>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
						<div style="height:340px;overflow:auto;font-size:12px;">
							<table width="100%" cellpadding="0" cellspacing="1" 
								id="flowTableBody" class="wd_tablelist01" style="table-layout:fixed;">
								
							</table>
						</div>
						</td>
					</tr>
					
				</table>
			</td>
		</tr>
	</table>
</div>