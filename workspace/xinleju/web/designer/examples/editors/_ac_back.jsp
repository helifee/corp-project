<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="back-div" class="x-hidden">
		<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%"  align="center" >
				设置该环节可退回:
			</td>
			<td align="left" colspan="3">
				<input id="isBack" type="checkbox">
			</td>
		</tr>
		<tr>
			<td  align="center" width="20%" >
				可退回环节:<br>
				(默认值:直接前驱环节)
			</td>
			<td width="30%" class="edit">
				<div id="back_ac_select"></div>
				<div id="back_ac_select_html" class="x-hidden">
					<select id="backActivities" multiple="multiple" style="height: 200px; width: 100%; margin: -1px">
						
					</select>
				</div>
			</td>
			<td  width="20%" align="center" >
				<input type="button" value="<<选择" onclick="moveOption(document.all.backActivitiesForSelect,document.all.backActivities)">
				<br />
				<input type="button" value=">>移除" onclick="moveOption(document.all.backActivities,document.all.backActivitiesForSelect)">
			</td>
			<td width="30%" class="edit">
				<div id="back_ac"></div>
				<div id="back_ac_html" class="x-hidden">
					<select id="backActivitiesForSelect" multiple="multiple" style="height: 200px; width: 100%; margin: -1px">
						
					</select>
				</div>
			</td>
		</tr>
		<tr style="display: none;">
			<td  align="center" >
				退回规则:
			</td>
			<td align="left" colspan="3">
				<input name="backStartType" type="radio" value="1">直接运行
				<input name="backStartType" type="radio" value="2">待激活
				<input name="backStartType" type="radio" value="3">运行时指定
			</td>
		</tr>
		<tr style="display: none;">
			<td  align="center" >
				退回参与人:
			</td>
			<td align="left" colspan="3">
				<input name="backStartPaticipant" type="radio" value="1">目标活动实际执行者
				<input name="backStartPaticipant" type="radio" value="2">目标活动定义参与人
				<input name="backStartPaticipant" type="radio" value="3">运行时指定
			</td>
		</tr>
	</table>
</div>
