<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="free-div" class="x-hidden">
		<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%"  align="center">
				启用:
			</td>
			<td colspan="3">
				<input id="isFree" type="checkbox">
			</td>
			
		</tr>
		<tr>
			<td width="20%"  align="center">
				自由活动范围:
			</td>
			<td width="30%">
				<select id="freeType" style="width: 100%">
					<option value="0">
						
					</option>
					<option value="1">
						直接后继活动
					</option>
					<option value="2">
						所有后继活动
					</option>
					
				</select>
			</td>
			<td width="20%"  align="center">
				可多活动流转:
			</td>
			<td width="30%">
				<input id="isMultiFlow" type="checkbox">
			</td>	
		</tr>
		<tr>
			<td width="20%"  align="center">
				参与人选择方式:
			</td>
			<td width="30%">
				<select id="paticitpantSelect_disabled" style="width: 100%;">
					<option value="">
						
					</option>
					<option value="1">
						自动
					</option>
					<option value="2">
						让用户从预定义中选择
					</option>
					<option value="3">
						让用户任意选择
					</option>
				
				</select>
			</td>
			<td width="20%"  align="center">
				多参与者流转:
			</td>
			<td width="30%">
				<input id="isMultiPaticitpant" type="checkbox">
			</td>
		</tr>
	</table>
</div>
