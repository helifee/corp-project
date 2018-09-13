<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<fieldset style="width: 520px; text-align: center"><legend
	style="color: #000000"><font size="4" color="#6c95d0"><strong>组信息</strong></font></legend>
<s:form id="form2" name="form2" method="post" theme="ysyshy">
	<table width="520" border="0" cellpadding="2" id="gaibianzu"
		cellspacing="2" rules="none" align="center">

		<tr align="center">
			<td width="240" align="left">组名： <s:select name="zuid" id="zuid"
				cssClass="box" list="zmList" listKey="zuid" listValue="zumc"
				headerKey="0" onchange="getrenyuanmz()">
			</s:select> <br>
			人名： <s:textfield id="renming" name="userID" size="19" maxlength="6"
				onkeyup="getName(this.value, event)"
				onkeypress="if (event.keyCode == 13) return false" /></td>
			<td width="312" align="center">
			<fieldset style="height: 50px; width: 260px"><legend
				style="color: #000000"> 组属性</legend> <s:radio list="#{0 : '私有'}"
				id="zuattribute" name="zuattribute"></s:radio> <s:radio
				list="#{1 : '组内公开'}" id="zuattribute" name="zuattribute"></s:radio>
			<s:radio list="#{2 : '全员公开'}" id="zuattribute" name="zuattribute"></s:radio></fieldset>
			</td>
		</tr>
		<tr>
			<td colspan="2"><s:optiontransferselect id="leftname"
				name="leftname" doubleName="rightname" doubleId="rightname"
				leftTitle="组员列表" rightTitle="参加会议人员列表" addToLeftLabel="< 向左移动"
				addAllToLeftLabel="<< 全部左移" addToRightLabel="向右移动 >"
				addAllToRightLabel="全部右移 >>" selectAllLabel="-全部选择-"
				cssStyle="width:170px;height:200px;"
				doubleCssStyle="width:170px;height:200px;" buttonCssStyle=""
				list="leftpinfos" listKey="empid" listValue="empmc"
				emptyOption="false" multiple="true" doubleMultiple="true"
				doubleList="rightpinfos" doubleListKey="empid"
				doubleListValue="empmc" doubleEmptyOption="false"
				addToRightOnclick="Moveoneselfoptions(document.getElementById('rightname'))"
				addAllToRightOnclick="Moveoneselfoptions(document.getElementById('rightname'))"
				addToLeftOnclick="Moveoneselfoptions(document.getElementById('leftname'))"
				addAllToLeftOnclick="Moveoneselfoptions(document.getElementById('leftname'))"
				allowUpDownOnLeft="false" allowUpDownOnRight="false"
				allowSelectAll="false" /></td>
		</tr>
		<tr>
			<td><s:hidden id="xinzuname" name="xinzuname"></s:hidden></td>
			<td><s:hidden id="xinzbid" name="xinzbid"></s:hidden></td>
		</tr>
		<tr>
			<td style="display: none"><s:select id="hiddenleft"
				name="hiddenleft" label="" listKey="empid" listValue="empmc"
				list="hiddenleftList" /></td>
			<td style="display: none"><s:select id="pyinfos" name="pyinfos"
				label="" listKey="empid" listValue="mcpinyin" list="hiddenpyinfos" /></td>
		</tr>
		<tr height="2px">
			<td colspan="2" width="500px" align="right"><input type="Button"
				id="queren" name="queren" value="确认"
				style="width: 85px; height: 25px" onclick="check(1)"></td>
		</tr>
	</table>
</s:form></fieldset>

