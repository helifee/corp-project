<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
       <%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script language="JavaScript" type="text/javascript" src="Login.js"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理者初期画面（張瑜）</title>
</head>
<SCRIPT LANGUAGE="JavaScript">
function file_name() 

{ 
   targetForm = document.forms[0];
	targetForm.action="Manage_popup";
	targetForm.submit();
  	openAction="Manage_adminselect.action";
  	var win=window.open(openAction,'Manage','height=400,width=500,toolbar=no,scrollbar=yes');   
  	
  	
  	
} 
</SCRIPT>
<body background="imag\vb.jpg" >
<s:form>
    
<TABLE id="tableEXCEL" align="center" border="1" CELLSPACING="0" width="560">

      <tr><td width="500" colspan=4 height="40"><P ><FONT size=4 ><strong>管理者担当プロジェクト詳細画面</strong></FONT></P></td></tr>
     
	<TR>
      <TD  align=center width="80" height="30" ><font size=2 color=97412d>プロジェクトID</font></TD>
      <TD align=center width="200"height="30"> <s:property value="projectid_d"/></TD>
      <TD  align=center width="80" height="20"><font size=2 color=97412d> 所属部門</font></TD>
      <TD  align=center width="200"height="20"><s:property value="busyoidname_d"/></TD>
	</TR>
	 <TR>
      <TD   align=center width="80"height="30" ><font size=2 color=97412d>プロジェクト主管者</font></TD>
      <TD   align=center width="200"height="30"><s:property value="username_d"/></TD>
      <TD   align=center width="80" ><font size=2 color=97412d>&nbsp;</font></TD>
      <TD align=center width="200"><font size=2>&nbsp;</font></TD>
	</TR>
	<TR>
      <TD  align=center width="80"height="30" ><font size=2 color=97412d>予定開始日</font></TD>
      <TD  align=center width="200"height="30"><s:property value="ystartdate_d"/></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>予定終了日</font></TD>
      <TD  align=center width="200"><s:property value="yenddate_d"/></TD>
	</TR>
	 <TR>
      <TD  align=center width="80" height="30"><font size=2 color=97412d>実際開始日</font></TD>
      <TD align=center width="200"height="30"><s:property value="startdate_d"/></TD>
      <TD align=center width="80" ><font size=2 color=97412d>実際終了日</font></TD>
      <TD  align=center width="200"><s:property value="enddate_d"/></TD>
	</TR>
	<TR>
      <TD  width="80" align=center height="30"><font size=2 color=97412d>日本語名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="prjmei_d"/></TD>
	</TR>
      <TR>
      <TD  width="80" align=center height="30"><font size=2 color=97412d>中国語名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="projecttyuname_d"/></TD>
	</TR>
	<TR>
      <TD  width="80" align=center height="30"><font size=2 color=97412d>英語名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="projecteiname_d"/></TD>
	</TR>
	<TR>
      <TD  width="80" align=center height="30"><font size=2 color=97412d>お客さん</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="kyakuname_d"/></TD>
	</TR>
	<TR>
      	<TD  width="80" align=center height="100"><font size=2 color=97412d>開発環境</font></TD>
		<TD  colspan=3 width="450" height="100"  ><s:property value="pjem_d"/></TD>
	</TR>
	<TR>
      <TD  width="80" align=center height="30" ><font size=2 color=97412d>プロジェクト概要</font></TD>

     <TD   colspan=3 width="450"  ><font size=2 face=宋体 >
	     <TABLE align=center border=0 CELLSPACING=0 width=445>
	     <tr><td width=440><s:property value="pjgaiyou_d"/>
	     </td>
	     </tr>
	     </table></font>
     </TD>
	 </TR>
  <tr>
</tr>
<tr>
</tr>
</TABLE>
<table border=0 align=center>
    <tr>
 <td width="540" align="right">  
 <s:submit name="sub" value="Excelに出力" onclick="output();"></s:submit> 

 <s:submit name="sub" value="基本情報更新" onclick="alter();"></s:submit> 
 </td>

	</tr>
</table>


<TABLE border=1 align=center CELLSPACING=0 width="560">
<TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト成員</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="username_d" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>成員職務</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="userkind_d" /></font></TD>
      </TR>
      <s:iterator value="simpleuser" status="st">
	      <TR>
	      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト成員</font></TD>
	      <TD  align=center width="200"><font size=2><s:property value="username_b" /></font></TD>
	      <TD  align=center width="80" ><font size=2 color=97412d>成員職務</font></TD>
	      <TD  align=center width="200"><font size=2><s:property value="userkind_b" /></font></TD>
	      </TR>
      </s:iterator>
　　<s:hidden name="key_hidden" id="hidden1" />
　　</TABLE>
<tr>
</tr>
<tr>
</tr>
<TABLE border=0 CELLSPACING=0  align=center>
<tr>
</tr>
<tr>

	 <td width=540  align="right">
	
	 
	<input type="button" value="メール送信" name="B1" onclick="email() ">
	<input type="button" value="一般ユーザ選択" name="B1" onclick="file_name() ">
	</td>

	 

</tr>
<tr>
</tr>
<tr>
</tr>
<Tr>

<TD>
<p align=center><a href="se01Action">戻る</a></p>
</TD>
</Tr>
</TABLE>
</s:form>
</body>
</html>