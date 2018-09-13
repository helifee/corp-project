<script src="../../static/javascript/util/dataGrid.js"></script>

<div class="easyui-layout formdiv">
	<form id="form" method="post" action=''>
			<table class="tableForm">
				<tr>
				<input name="id" id="id" type="hidden"/>
			</tr>
			<tr>
				<th class="name">支付类型</th>
				<td>
				<input name="payType" type="text" class="easyui-validatebox"/>
				</td>
			</tr>
			<tr>
				<th class="name">审核意见</th>
				<td>
				<input name="operateSummary" class="easyui-textbox" data-options="multiline:true" style="width:200px;height:50px">
				</td>
			</tr>
		</table>
	</form>
</div>