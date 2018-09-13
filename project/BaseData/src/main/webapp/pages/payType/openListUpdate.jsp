<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="easyui-layout formdiv">
	<form id="form" method="post" action=''>
		<table class="tableForm">
			
				<input name="id" id="id" type="hidden"/>
			
			<tr>
				<th class="name">支付类型</th>
				<td>
				<input name="payType" type="text" class="easyui-validatebox" required="true"/>
				</td>
			</tr>
		</table>
	</form>
</div>