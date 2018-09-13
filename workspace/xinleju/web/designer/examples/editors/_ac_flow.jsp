<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="flow-div" class="x-hidden">


	<table width="100%" border="0" cellpadding="1" cellspacing="1"
		class="wd_tablelist01_2">
		<tr>
			
			<td width="20%" align="center">
				聚合策略:
			</td>
			<td width="30%"  id="scs_html">
				<script type="text/javascript">
					document.all.scs_html.innerHTML = scs;
				</script>
			</td>
			<td width="20%" align="center">
				分支策略:
			</td>
			<td width="30%" id="fks_html">
				<script type="text/javascript">
					document.all.fks_html.innerHTML = fks;
				</script>
			</td>
		</tr>
		
		<tr>
			<td width="20%" align="center">
				允许加签:
			</td>
			<td width="30%">
				<select id="jqStrategy" style="width: 99%">
					<option value="0">默认</option>
					<option value="1">允许加签</option>
					<option value="2">允许前加签</option>
					<option value="3">允许后加签</option>
					<option value="4">不可加签</option>
				</select>
			</td>
			<td width="20%" align="center">
				发起人可撤回：
			</td>
			<td width="30%">
			
				<select id="canWithdraw" style="width: 99%">
					<option value="3">默认</option>
					<option value="1">可撤回</option>
					<option value="0">不可撤回</option>
				</select>
				<div style="display: none;">
				自动跳过:
				<input id="isAuto" type="checkbox"></div>
				<div style="display: none;">	
					<input  id="finishQuantity" type="text" style="width: 99%;display: none;"
						onpropertychange="if(/[^\.\d]/g.test(value))value=value.replace(/[^\.\d]/g,'')">
				</div>
			</td>
			
		</tr>
		
		<tr style="display: none;">
			<td width="20%" align="center">
				开始条件:
			</td>
			<td width="30%">
				<input id="startCondition" type="text" style="width: 100%">
			</td>
			<td width="20%" align="center">
				结束条件:
			</td>
			<td>
				<input id="finishCondition" type="text" style="width: 100%">
			</td>
		</tr>
		<tr style="display: none;">
			<td width="20%" align="center">
				优先级:
			</td>
			<td width="30%">
				<select id="acPriority" style="width: 99%">
					<option value="0"></option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>(数字越高，优先级越高)
			</td>
			<td width="20%" align="center">
			
			</td>
			<td>
				
			</td>
		</tr>
		
	</table>

</div>
