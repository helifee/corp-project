<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<script src="../../static/javascript/util/dataGrid.js"></script>

<div class="easyui-layout formdiv">
	<form class="openform" id="form" method="post" action=''>
		<table class="tableForm">
			<tr>
				<input name="id" id="id" type="hidden"/>
			</tr>
			<tr>
				<th class="thTitle">结算中心名称</th>
				<td><input name="name" type="text" class="easyui-validatebox" disabled='true'/></td>
			</tr>
			<tr>
				<th class="thTitle">中心企业名称</th>
				<td><input name="centerCorpName" type="text" style="height:25px;" class="easyui-combotree" data-options="valueField:'code',textField:'name',url:'../../data/companyList.json'" disabled='true'/></td>
			</tr>
			<tr>
				<th class="thTitle">成员企业</th>
				<td><input class="easyui-textbox" data-options="multiline:true" style="width:200px;height:50px" name='cyqy' disabled='true'></td>
			</tr>
			<tr>
				<th class="thTitle">摘要说明</th>
				<td><input name="zysm" type="text" disabled='true'/></td>
			</tr>
			<tr>
				<th class="thTitle">审核意见</th>
				<td><input class="easyui-textbox" data-options="multiline:true" style="width:200px;height:50px" name='shyj' id='shyj'></td>
			</tr>
		</table>
	</form>
</div>