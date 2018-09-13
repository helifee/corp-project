<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>桌面编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/template.js"></script>
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="page/DeskTop/DeskTop-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<style>
		#addButton {margin:10px}
	</style>
	<script type="text/javascript">
		var index=parseInt('<s:property value="desk_Components.size()" />')||7;
		$(function(){
			$("#addButton").click(function(){
				index++;
				$("#desk_Components_table").append(template('trTemplate',{index:index}));
			});
			$("#desk_Components_table").delegate("a._delRow","click",function(){
				$(this).parent().parent().remove();
			});
		});
	</script>
	<script type="text/html" id="trTemplate">
		<tr>
			<td style="text-align: center;">
				<input type="text" readonly="readonly" name="desk_Components[{{index}}].sort" value="{{index}}" style="border: 0;text-align: center"/>
			</td>
			<td style="text-align: left;">
				<s:select list="#request.desktopComponent" value="#item.componentId" listKey="key"  listValue="value.name" name="desk_Components[{{index}}].componentId" headerKey="" headerValue="请选择" id="" cssStyle="width:80%"></s:select>
			</td>
			<input type="hidden" value="${item.deskTopId}" name="desk_Components[{{index}}].deskTopId"/>
			<input type="hidden" value="${item.id}" name="desk_Components[{{index}}].id"/>
			<td>
				<a style="cursor:pointer"  class="_delRow">删除</a>
			</td>
		</tr>
	</script>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="DeskTop!save" id="frm">
	<s:token/>
		<s:hidden name="deskTop.id"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						桌面编辑
					</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:save()">保存</a>
						<a href="#" onclick="window.close();">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑操作定义</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<th width="160">
								名称:
							</th>
							<td>
								<s:textfield name="deskTop.name" cssStyle="width:80%"></s:textfield>
							</c:if>
							</td>
						</tr>
						<tr>
							<th width="160">
								类型:
							</th>
							<td>
								<s:select list="#request.typeMap" listKey="key" listValue="value"  name="deskTop.type" headerKey="" headerValue="请选择"></s:select>
							</td>
						</tr>
						<tr>
							<th width="160">
								说明:
							</th>
							<td>
								<s:textarea cols="70" rows="5" name="deskTop.remark" cssStyle="width:80%"></s:textarea>
							</td>
						</tr>
					</table>
					<input type="button" value="添加组件" id="addButton"/>
					<s:hidden name="deskTop.status"></s:hidden>
					<s:hidden name="deskTop.createDate"></s:hidden>
					<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01" id="desk_Components_table">
						<tr>
							<th width="160">编号</th>
							<th>部件</th>
							<th>操作</th>
						</tr>
						<s:if test="deskTop == null || deskTop.id == null">
							<s:iterator begin="0" end="6" step="1" status="index">
								<tr>
									<td style="text-align: center;">
										<input type="text" readonly="readonly" name="desk_Components[${index.index}].sort" value="${index.count }" style="border: 0;text-align: center"/>
									</td>
									<td style="text-align: left;">
										<s:select list="#request.desktopComponent" listKey="key"  listValue="value.name" name="desk_Components[%{#index.index}].componentId" headerKey="" headerValue="请选择" cssStyle="width:80%"></s:select>
									</td>
									<td>
										<a style="cursor:pointer"  class="_delRow">删除</a> 
									</td>
								</tr>
							</s:iterator>
						</s:if>
						<s:else>
							<s:iterator value="desk_Components" var="item" status="index">
								<tr>
									<td style="text-align: center;">
										<input type="text" readonly="readonly" name="desk_Components[${index.index}].sort" value="${item.sort}" style="border: 0;text-align: center"/>
									</td>
									<td style="text-align: left;">
										<s:select list="#request.desktopComponent" value="#item.componentId" listKey="key"  listValue="value.name" name="desk_Components[%{#index.index}].componentId" headerKey="" headerValue="请选择" cssStyle="width:80%"></s:select>
									</td>
									<input type="hidden" value="${item.deskTopId}" name="desk_Components[${index.index}].deskTopId"/>
									<input type="hidden" value="${item.id}" name="desk_Components[${index.index}].id"/>
									<td>
										<a style="cursor:pointer"  class="_delRow">删除</a>
									</td>
								</tr>
							</s:iterator>
						</s:else>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>