<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
 "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>参加会议确认一览</title>
<link rel="stylesheet" type="text/css" href="css/underline.css" />
<script language="JavaScript" type="text/javascript"
	src="js/affirmattend.js"></script>

</head>

<body bgcolor="#ecf6ff">
<s:include value="../common/topmenu.jsp" />
<br>

<p align="center"><font size="4" COLOR="green"><strong>参加会议确认一览</strong></font></p>
<s:form name="ckform" method="post" action="" theme="ysyshy">
	<table width="943" border="0" cellspacing="2" cellpadding="2"
		align="center">
		<tr>
			<td align="center" bgColor="#6c95d0" width="60"><font
				color="#FFFFFF"> <input type="checkbox" name="allsel"
				id="save_allsel" onclick="allselect()" /> 全选 </font></td>
			<td align="center" bgColor="#6c95d0" width="240"><font
				color="#FFFFFF">会议室名</font></td>
			<td align="center" bgColor="#6c95d0" width="85"><font
				color="#FFFFFF">日期</font></td>
			<td align="center" bgColor="#6c95d0" width="120"><font
				color="#FFFFFF">时间</font></td>
			<td align="center" bgColor="#6c95d0" width="71"><font
				color="#FFFFFF">申请人</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">会议主题</font></td>
		</tr>
		<s:if test="affirmattendLists.size > 0">
			<s:iterator value="affirmattendLists">
				<tr align="center">
					<td bgcolor="#ffffd9"><input type="checkbox" name="allsel"
						id="<s:property	value="hysid" />,<s:property
					value="hyrq" />,<s:property
					value="hykssj" />"
						value="ckk"
						onclick="checkselect('<s:property value="hysid" />,<s:property
						value="hyrq" />,<s:property
						value="hykssj" />')" /></td>
					<td bgcolor="#ffffd9"><s:property value="hysname" /></td>
					<td bgcolor="#ffffd9"><s:property value="hyrq" /></td>
					<td bgcolor="#ffffd9" width="120"><s:property value="hykssj" />~<s:property
						value="hyjssj" /></td>
					<td bgcolor="#ffffd9"><s:property value="userName" /></td>
					<td bgcolor="#ffffd9"><s:property value="hyzt" /></td>
				</tr>
			</s:iterator>
		</s:if>
		<tr>
			<td colspan="2"></td>
			<td colspan="2"></td>
			<td colspan="2" align="right"><input type="Button"
				style="width: 85px; text-align: middle; height: 25;" id="quren"
				name="quren" value="确认" onclick="affirmattend()"></td>

		</tr>
		<tr>
			<td style="display: none"><s:select id="hiddeninfos"
				name="hiddeninfos" label="" listKey="empid" listValue="empmc"
				list="hiddeninfoslist" multiple="true" /></td>
			<td style="display: none"><s:select id="temporaryinfos"
				name="temporaryinfos" label="" listKey="empid" listValue="empmc"
				list="temporaryinfoslist" multiple="true" /></td>
		</tr>
	</table>
</s:form>
</body>
</html>

