<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script src="../../static/javascript/util/dataGrid.js"></script>

<div class="easyui-layout formdiv">
	<form id="form" method="post" action=''>
		<table class="tableForm">
				<input name="id" id="id" type="hidden"/>
			<tr>
				<th class="thTitle">支付类型</th>
				<td><input name="payType" type="text" class="easyui-validatebox" /></td>
			</tr>
			<tr>
				<th class="name">创建人</th>
				<td><input name="creator" type="text" class="easyui-validatebox" /></td>
			</tr>
			<tr>
				<th class="name">创建时间</th>
				<td><input name="createTime" type="text" class="easyui-validatebox" /></td>
			</tr>
			<tr>
				<th class="name">修改人</th>
				<td><input name="modifier" type="text" class="easyui-validatebox" /></td>
			</tr>
			<tr>
				<th class="name">修改时间</th>
				<td>
					<input name="modifyTime" type="text" class="easyui-validatebox"/>
				</td>
			</tr>
			
		</table>
	</form>
</div>