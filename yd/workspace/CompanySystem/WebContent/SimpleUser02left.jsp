<%@ page language="java" contentType="text/html; charset=windows-31j"
    pageEncoding="windows-31j"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-31j">
<title>left</title>
<script language="JavaScript" type="text/javascript" src="simpleUser02.js"></script>
</head>
<body>


<table border="1" width=89�� height=100% align="center"  CELLSPACING=0>
<s:iterator value="pjs2" status="st">
	<tr>
		
		<td�@�@align="center" colspan="4" height=40�@>
			<p style="font:18px;text-indent:4px " >�v���W�F�N�g�ڍ׉��</p>
		</td>
		
	</tr>

	<tr>
	
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">�v���W�F�N�gID</p>
		</td>
		
		<td width=25% height=7%> <s:property value="projectid_a"/> </td>
		
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">���喼</p>
		</td>
		<td width=25% height=7%> <s:property value="busyoname_a"/> </td>
	</tr>
	<tr>
		<td width=25% height=7% >
			<p style="font:18px;text-indent:4px ">�Ǘ���</p>
		</td>
		<td width=25% height=7%>
			<s:property value="musername_a"/> 
		</td>	
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">&nbsp;</p>
		</td>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">&nbsp;</p>
		</td>
	</tr>
	<tr>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">�\��J�n��</p>
		</td>
		<td width=25% height=7%>
			<s:property value="ystartdate_a"/>
		</td>	
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">�\��I����</p>
		</td>
		<td width=25% height=7%>
			<s:property value="yenddate_a"/>
		</td>
	</tr>
	<tr>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px "> ���ۊJ�n��</p>
		</td>
		<td width=25% height=7%>
			<s:property value="startdate_a"/>
		</td>	
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">���ۏI����</p>
		</td>
		<td width=25% height=7%>
			<s:property value="enddate_a"/>
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">���q����</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="kyakuname_a"/>  
			
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">���{�ꖼ��</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="prjmei_a"/> 
			
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">�����ꖼ��</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="projecttyuname_a"/>
			
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">�p�ꖼ��</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="projectuiname_a"/> 
			
		</td>
	</tr>
	
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">�J����</p>
		</td>
		<td width=50% colspan="2" height=21%>
			<s:property value="pjem_a"/> 
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">�v���W�F�N�g�T�v</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="pjgaiyou_a"/> 
			
		</td>
	</tr>
	</s:iterator>
</table>

<table border="0" width=89�� height=100% align="center">
	<tr>
	<td>
		&nbsp;
	</td>
	</tr>
	<Tr>

	<TD colspan="4">
		<p align=center><a href="javascript:history.back(1)">�߂�</a></p>
	</TD>
	</Tr>

</table>


</body>
</html>