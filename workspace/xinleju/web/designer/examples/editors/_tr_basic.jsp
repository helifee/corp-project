<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<div id="tr-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="25%" align="center">
				名称:
			</td>
			<td width="25%">
				<input id="trName" type="text" style="width: 100%" />
			</td>
			<td width="25%" align="center">
				活动Id:
			</td>
			<td width="25%">
				<input id="trId" type="text" style="width: 100%" readonly="readonly"/>
			</td>
		</tr>

		<tr style="display: none;">
			<td width="25%" align="center">
				优先级:
			</td>
			<td width="25%">
				<select id="trPriority" style="width: 35%">
					<option value="">
						无
					</option>
					<option value="1">
						1
					</option>
					<option value="2">
						2
					</option>
					<option value="3">
						3
					</option>
					<option value="4">
						4
					</option>
					<option value="5">
						5
					</option>
					<option value="6">
						6
					</option>
				</select>（数字越大，优先级越高）
			</td>
			<td width="25%" align="center">
				默认分支:
			</td>
			<td width="25%">
				<input id="isDefault" type="checkbox">
			</td>
		</tr>
		<tr>
			<td align="center">
				条件表达式:
			</td>
			<td colspan="3">
				<textarea id="cond" rows="2" style="width: 100%;"></textarea>
			</td>
		</tr>
		<tr>
			<td align="center">
				<b>判定条目</b>
			</td>
			<td align="center" colspan="2">
				<b>运算符</b>
			</td>
			<td align="center">
				<b>可用值选择</b>
			</td>
		</tr>
		<tr>
			<td align="left" style="vertical-align: top;" rowspan="3" id="cate_tree">
				
			</td>
			<td align="left" style="vertical-align: top;" rowspan="3" colspan="2">
				
				算术运算符:
				<input name="ys" type="button" value="等于" class="btn_f">&nbsp;
				<input name="ys" type="button" value="小于" class="btn_f">&nbsp;
				<input name="ys" type="button" value="不等于" class="btn_f">&nbsp;
				<input name="ys" type="button" value="大于" class="btn_f"><BR/>
				算术运算符:
				<input name="ys" type="button" value="小于等于" class="btn_f">&nbsp;
				<input name="ys" type="button" value="大于等于" class="btn_f">&nbsp;
				<hr/>
				逻辑连接符:
				<input name="ys" type="button" value="并且" class="btn_f">&nbsp;
				<input name="ys" type="button" value="或者" class="btn_f">&nbsp;
				<input name="ys" type="button" value="(" class="btn_f">&nbsp;
				<input name="ys" type="button" value=")" class="btn_f">&nbsp;
				<hr/>
				
			</td>
			<td align="left" style="vertical-align: top;"  id="cate_val_tree">
				
			</td>
		
		</tr>
		<tr height="30">
			<td align="left">
				输入值:&nbsp;<input id="user_input" type="text" style="width: 70%"/>
			</td>
		</tr>
		<tr height="30">
			<td align="right">
				<input   type="button" value="添加" class="btn_b" onclick="add_exp()">&nbsp;
			</td>
		</tr>
	</table>
</div>
