<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="paticipant-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="19%" align="center">
				从列表中选择:
			</td>
			<td style="width: 30%;vertical-align: top;">
				<div >查询条件：
					<input id="users_tree_qk" style="width: 120px">
					<input id="btn_q" type="button" class="btn_q" value=" 查 询 " onclick="query_users_tree()">
				</div>
				<div id="users_tree" style=""></div>
			</td>
			<td style="width: 19%;" align="center">
				
				<input type="button" value="选择" class="btn_q" onclick="selectToPaticipantList()" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;">
				<br />
				<input type="button" value="移除" class="btn_q" onclick="jsRemoveSelectedItemFromSelect('paticipantList')" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;">
				
				<br />
				<input type="button" value="下移" class="btn_q" onclick="downSelectedOption('paticipantList')" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;">
				<br />
				<input type="button" value="上移" class="btn_q" onclick="upSelectedOption('paticipantList')" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;">
				<br />
			</td>
			<td style="text-align: top;">
				<select id="paticipantList" multiple="multiple" style="height: 230px; width: 100%;" onclick="showDetail(this.value,'sDetailInfo')">
				</select>
				<textarea rows="3" style="width: 100%;overflow-y:hidden;font-size: 12px;font-family: 'Microsoft Yahei', 微软雅黑, 宋体, Helvetica, Tahoma, Arial,Helvetica, STHeiti;" id="sDetailInfo" disabled="disabled"></textarea>
			</td>
		</tr>
		<tr>
			<td align="center">
				工作方式
			</td>
			<td  id="fcs_html">
				<select id="nodeType"  style="width: 99%">
					<option value="0">竞争</option>
					<option value="1">串行</option>
					<option value="2">并行</option>
				</select>
			</td>
			
			<td align="center">
				
				<script type="text/javascript">
					//document.all.fcs_html.innerHTML = fcs;
				</script>
				
				
				发起人重复时，不跳过：
			</td>
			<td>
				<input type="checkbox" id="ignoreFiOwner">
				<div style="display: none;">
					会签方式:<BR>（工作方式为“会签”时有效）
					<select id="assignType"  style="width: 99%">
						<option value=""></option>
						<option value="0">并行</option>
						<option value="1">串行</option>
					</select>
				</div>
				
			</td>
		</tr>
			
		<tr>
			<td align="center">
				发起流程时，该环节的参与人：
			</td>
			<td >
				<select id="participantsSelectStrategy" style="width: 99%">
					<option value="1">可修改</option>
					<option value="0">无参与人时可修改</option>
					<option value="3">无参与人时必须修改</option>
					<option value="2">不可修改</option>
				</select>
			</td>
			
			<td align="center">
				 本环节参与人重复时，不跳过：
			</td>
			<td>
				<input type="checkbox" id="ignoreAc">
			</td>
		</tr>
		<tr>
			<td align="center">
				在本环节可修改以下环节的参与人:
			</td>
			<td  id="participantsSelectAt">
				
			</td>
			
			<td align="center">
				<label title="当参与人为空时，必须在本节点由参与人选择！">在本环节必须填写以下环节的参与人:</label>
			</td>
			<td  id="participantsMustSelectAt">
				
			</td>
		</tr>
	
	
				
		
		<tr style="display: none;">
			<td align="center">
				外部参与人:
			</td>
			<td colspan="3" id="cpbs_html">
				<script type="text/javascript">
					document.all.cpbs_html.innerHTML = pcs;
				</script>
			</td>
		</tr>
		<tr style="display: none;">
			<td align="center">
				从环节中选择:
			</td>
			<td >
				<div id="acPaticipantList" style="width: 100%"></div>
			</td>
			<td align="center">
				&nbsp;&nbsp;
				&nbsp;&nbsp;
			</td>
			<td align="center">
				<select id="acPaticipant" style="width: 100%;display: none;"></select>
			</td>
		</tr>

	</table>
</div>
