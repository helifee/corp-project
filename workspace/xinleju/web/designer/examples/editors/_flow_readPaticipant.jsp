<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="flow-readPaticipant-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%"  align="center">
				可阅人员:
			</td>
			<td style="width: 30%;vertical-align: top;">
				<div>查询条件：<input id="ky_tree_qk" style="width: 120px">
				&nbsp;<input id="btn_q" class="btn_q" type="button" value=" 查 询 " onclick="query_ky_tree()"></div>
				<div id="ky_tree" style="background: red;"></div>
			</td>
			<td style="width: 20%;" align="center">
				<input type="button" value="选择>>"  onclick="selectToKyList()" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
				
				<BR>
				<input type="button" value="<<移除" onclick="jsRemoveSelectedItemFromSelect('kyList')" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
			</td>
			<td>
				<select id="kyList" multiple="multiple" style="height: 290px; width: 100%;" class="select13" onclick="showDetail(this.value,'rDetailInfo')">
				</select>
				
				<textarea rows="3" style="width: 100%;overflow-y:hidden;font-size: 12px;font-family: 'Microsoft Yahei', 微软雅黑, 宋体, Helvetica, Tahoma, Arial,Helvetica, STHeiti;" id="rDetailInfo" disabled="disabled"></textarea>
			</td>
		</tr>
	</table>
</div>
