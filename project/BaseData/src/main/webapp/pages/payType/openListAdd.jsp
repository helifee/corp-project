<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script src="${pageContext.request.contextPath}/static/javascript/util/dataGrid.js"></script>

<div class="easyui-layout formdiv">
	<form id="form" method="post" action=''>
		<table class="tableForm">
			<tr>
				<th class="name">支付类型</th>
				<td>
				<input name="payType" type="text" class="easyui-validatebox" required="true"/>
				</td>
			</tr>
		</table>
	</form>
</div>