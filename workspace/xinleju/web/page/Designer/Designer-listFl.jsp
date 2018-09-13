<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>招标采购首页</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="page/Designer/Designer-listFl.js"></script>
	</head>
	<body>
		<s:form id="frm" action="Designer!listFl" method="post">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="ctId" id="ctId" value="%{#request.ctId}"></s:hidden>
			<s:hidden name="serviceObjectDefineId" id="serviceObjectDefineId" value="%{#request.serviceObjectDefineId}"></s:hidden>
			<s:hidden name="flName" id="flName" value="%{#request.flName}"></s:hidden>
			<s:hidden name="isDisabled" id="isDisabled" value="%{#request.isDisabled}"></s:hidden>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5%">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th>
						名称
					</th>
					<th width="10%">
						编码
					</th>
					<th width="15%">
						版本号
					</th>
					<th width="15%">
                                                                        流程目录
                    </th>
					<th width="10%">
						状态
					</th>
					<th width="15%">
					           发布时间
                    </th>
					<th width="8%">
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td>
							<a href="#" onclick="javascript:viewFlow(${item.id})"><s:property value="#item.flowName" /> </a>
						</td>
						<td align="center">
							<s:property value="#item.flowCode" />
						</td>
						<td align="center">
							<s:property value="#item.flowVersion" />
						</td>
                        <td align="center">
                            ${not empty ct ? ct.name : "未分类" }
                        </td>
						<td align="center">
							<s:if test="#item.isCommited==1">
								已提交
							</s:if>
							<s:else>
								编辑中
								
							</s:else>
						</td>
						<td align="center">
						      <app:date dateTime="${item.publishTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<td align="center">
							<s:if test="#item.isCommited==1">
								<a href="#" onclick="javascript:coFlow(${item.id})">检出</a>
								<a href="#" onclick="javascript:startFlow(${item.id})">启动</a>
							</s:if>
							<s:else>
								<a href="#" onclick="javascript:editFlow(${item.id})">编辑</a>
							</s:else>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					<s:if test="#request.isDisabled==1">
						<app:OpTag postUrl="Designer!unDelete" postMessage="启用"></app:OpTag>
					</s:if>
					<s:else>
						<app:OpTag postUrl="Designer!delete" postMessage="禁用"></app:OpTag>
					</s:else>

				</div>
				<app:PageTag actionName="Designer!listFl"></app:PageTag>
			</div>

		</s:form>
	</body>
</html>
