<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理者初期画面（張瑜）</title>
</head>
<body background=imag\vb.jpg >
<s:form>

<table border="1" width=60％ height=100% align="center" >
<tr>
		<td　　align="center" colspan="4" height=80　size="4">
			<p style="font:18px;text-indent:4px " >&nbsp;</p>
		</td>
		
	</tr>
	<tr> 
		<td　　align="center" colspan="4" height=40　>
			<p style="font:18px;text-indent:4px " >該当ユーザー所属プロジェクト詳細画面</p>
		</td>
	
		
	</tr>
	<tr>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">プロジェクト番号</p>
		</td>
		<td width=25% height=7%>
			<s:property value="projectid_c"/>
		</td>
		
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">所属部門</p>
		</td>
		<td width=25% height=7%>
			<s:property value="busyoidname_c"/>
		</td>
	</tr>
	<tr>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">プロジェクト主管者</p>
		</td>
		<td width=25% height=7%>
			<s:property value="username_c"/>
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
			<p style="font:18px;text-indent:4px ">予定開始日</p>
		</td>
		<td width=25% height=7%>
			<s:property value="ystartdate_c"/>
		</td>	
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">予定終了日</p>
		</td>
		<td width=25% height=7%>
			<s:property value="yenddate_c"/> 
		</td>
	</tr>
	<tr>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px "> 実際開始日</p>
		</td>
			<td width=25% height=7%>
			<s:property value="startdate_c"/>
		</td>
		<td width=25% height=7%>
			<p style="font:18px;text-indent:4px ">実際終了日</p>
		</td>
		<td width=25% height=7%>
			<s:property value="enddate_c"/>
		</td>
	</tr>
	
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">日本語名称</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="prjmei_c"/>
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">中国語名称</p>
		</td>
		<td width=50% colspan="2" height=7%>
		<s:property value="projecttyuname_c"/>
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">英語名称</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="projecteiname_c"/>
		</td>
	</tr>

	
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">開発環境</p>
		</td>
		<td width=50% colspan="2" height=7%>
			<s:property value="pjem_c"/>
		</td>
	</tr>
	<tr>
		<td width=50% colspan="2" height=7%>
			<p style="font:18px;text-indent:4px ">プロジェクト概要</p>
		</td>
		<td width=50% colspan="2" height=7%>
		<s:property value="pjgaiyou_c"/>
		</td>
	</tr>

</table>

<table border="0" width=89％ height=100% align="center">
	<tr>
	<td>
		&nbsp;
	</td>
	</tr>
	<Tr>

	<TD colspan="4">
		<p align=center><a href="ManageUser01_init.action">戻る</a></p>
	</TD>
	</Tr>
</table>
</s:form>

</body>
</html>