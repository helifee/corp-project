<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<script src="${ctx}/static/javascript/util/dataGrid.js"></script>

<div class="easyui-layout formdiv">
	<form class="openform" id="form" method="post" action=''>
		<table class="tableForm">
			<tr>
				<input name="id" id="id" type="hidden" value=""/>
				<input name="parentId" type="hidden" id="parentId"/>
			</tr>
			<tr>
				<th class="thTitle">结算中心名称</th>
				<td><input name="name" type="text" class="easyui-validatebox" data-options="required:true"/></td>
			</tr>
			<tr>
				<th class="thTitle">中心企业名称</th>
				<td><input name="centerCorpNo" type="text" required="true" style="height:25px;" class="easyui-combotree" data-options="valueField:'code',textField:'name',url:'${ctx}/data/companyList.json'"/></td>
			</tr>
		</table>
	</form>
</div>