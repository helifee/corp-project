<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<fieldset style="width: 500px; text-align: center">
<legend style="color: #000000;" align="center"><font
	size="4" color="#6c95d0"><strong></strong></font></legend> 
	<s:form id="form2"
	name="form2" method="post" theme="ysyshy">
	<table width="533" border="0" cellpadding="0"
		align="center" id="gaibianzu" cellspacing="0" rules="none">

		<tr align="center">
			<td width="240" align="left">组名： <s:select name="zuid" id="zuid"
				cssClass="box" list="zmList" listKey="zuid" listValue="zumc"
				headerKey="0" onchange="getattendzuname()" theme="ysyshy">
			</s:select> <br>
			人名： <s:textfield id="renming" name="renming" size="18" maxlength="6"
				onkeyup="getppName(this.value)" theme="ysyshy"
				onkeypress="if (event.keyCode == 13) return false" /></td>
			<td width="312" align="center"><input type="Button"
				style="width: 85px; text-align: middle; height: 25;" id="guanli"
				name="guanli" value="组管理" onclick="zuguanli()"></td>
		</tr>
		<tr>
			<td colspan="2"><s:optiontransferselect id="leftname"
				name="leftname" doubleName="rightname" doubleId="rightname"
				leftTitle="组员列表" rightTitle="参加会议人员列表" addToLeftLabel="< 向左移动"
				addAllToLeftLabel="<< 全部左移" addToRightLabel="向右移动 >"
				addAllToRightLabel="全部右移 >>" selectAllLabel="-全部选择-"
				cssStyle="width:200px;height:250px;"
				doubleCssStyle="width:200px;height:250px;" buttonCssStyle=""
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
			<td colspan="2" width="500px" align="right"><input type="Button"
				style="width: 85px; text-align: middle; height: 25;" id="quren"
				name="quren" value="确认" onclick="affirm()"> <input
				type="Button" style="width: 85px; text-align: middle; height: 25;"
				id="fanhui" name="quren" value="返回" onclick="goback()"></td>
		</tr>
		<tr>
			<td style="display: none"><s:select id="hiddenleft"
				name="hiddenleft" label="" listKey="empid" listValue="empmc"
				list="hiddenleftList" /></td>
			<td style="display: none"><s:select id="pyinfos" name="pyinfos"
				label="" listKey="empid" listValue="mcpinyin" list="hiddenpyinfos" /></td>
		</tr>
	</table>
</s:form></fieldset>
