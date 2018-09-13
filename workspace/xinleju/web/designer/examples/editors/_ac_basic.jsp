<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="basic-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%" align="center">
				活动名称:
			</td>
			<td width="30%">
				<input id="nodeName" type="text" style="width: 100%" />
			</td>
			<td width="20%" align="center">
				活动Id:
			</td>
			<td width="30%">
				<input id="nodeId" type="text" style="width: 100%" readonly="readonly"/>
			</td>
		</tr>
		<tr>
			<td width="20%" align="center">
				活动描述:
			</td>
			<td width="80%" colspan="3">
				<input id="nodeNote" type="text" style="width: 100%" />
			</td>
		</tr>
		<tr>
			<td width="20%" align="center">
				活动类型:
			</td>
			<td width="30%">
				<select id="acType"  style="width: 99%" >
					<option value="1">
						人工活动
					</option>
					<option value="2">
						外部活动
					</option>
					<option value="9">
						自动活动
					</option>
				</select>
			</td>
			<td width="20%" align="center">
				审批类型：
			</td>
			<td width="30%" id="opGroup_html">
				
			
			</td>
			<script type="text/javascript">
				document.all.opGroup_html.innerHTML = opGroups;
				
			</script>
		</tr>
		<tr style="display: none;">
			<td align="center">
				启用活动时限
			</td>
			<td>
				<input id="isTimelimit" type="checkbox">
			</td>
			<td align="center">
				活动时限:
			</td>
			<td>
				<input id="timeLimit" type="text" style="width: 60%" onpropertychange="if(/[^\.\d]/g.test(value))value=value.replace(/[^\.\d]/g,'')">
				<select id="timeUnit" style="width: 36%">
					<option value="0">
						(单位)
					</option>
					<option value="1">
						分钟
					</option>
					<option value="2">
						小时
					</option>
					<option value="3">
						工作日
					</option>
					<option value="4">
						自然日
					</option>
					<option value="5">
						周
					</option>
				</select>
			</td>
		
		</tr>

		<tr style="display: none;">
			<td align="center">
				计时开始:
			</td>
			<td>
				<input id="isTimingStart" type="checkbox">
			</td>
			<td align="center">
				计时结束:
			</td>
			<td width="30%">
				<input id="isTimingEnd" type="checkbox">
			</td>
		</tr>
		<tr style="display: none;">
			<td align="center">
				是否风险点:
			</td>
			<td>
				<input id="isRiskPoint" type="checkbox">
			</td>
			<td align="center">
				风险描述:
			</td>
			<td width="30%">
				<input id="riskNote" type="text" style="width: 100%">
			</td>
		</tr>
		<tr>
			<td align="center">
				排序号:
			</td>
			<td>
				<input id="sort" type="text" style="width: 100%">
			</td>
			<td align="center">
				外部状态:
			</td>
			<td width="30%">
				<select id="firstSelect" onchange="javascript:ChangeSelect(this.value,'outCode',ac_win.outCode,outCodeArray,'')" style="width:47%"></select>
				<select id="outCode" onchange="javascript:void(0)" style="width:47%"></select>
			</td>
		</tr>
		<tr>
			<td align="center">
				分支结束标识:
			</td>
			<td id="ets_html">
				<script type="text/javascript">
					document.all.ets_html.innerHTML = ets;
				</script>
			</td>
			<td align="center">
				&nbsp;
			</td>
			<td width="30%">
				&nbsp;
			</td>
		</tr>
	</table>
</div>
