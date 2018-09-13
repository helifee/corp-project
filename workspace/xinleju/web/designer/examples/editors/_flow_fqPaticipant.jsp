<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="flow-fqPaticipant-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="20%"  align="center">
				默认发起人员:
			</td>
			<td style="width: 30%;vertical-align: top;">
				<div>查询条件：<input id="fq_tree_qk" style="width: 120px">
				&nbsp;<input id="btn_q" class="btn_q" type="button" value=" 查 询 " onclick="query_fq_tree()"></div>
				<div id="fq_tree" style="background: red;"></div>
			</td>
			<td style="width: 20%;" align="center">
				<input type="button" value="选择>>"  onclick="selectToFqList()" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
				
				<BR>
				<input type="button" value="<<移除" onclick="jsRemoveSelectedItemFromSelect('fqList')" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
			</td>
			<td>
				<select id="fqList" multiple="multiple" style="height: 290px; width: 100%;" class="select13" onclick="showDetail(this.value,'fDetailInfo')">
				</select>
				<textarea rows="3" style="width: 100%;overflow-y:hidden;font-size: 12px;font-family: 'Microsoft Yahei', 微软雅黑, 宋体, Helvetica, Tahoma, Arial,Helvetica, STHeiti;" id="fDetailInfo" disabled="disabled"></textarea>
			</td>
		</tr>
	</table>
</div>
