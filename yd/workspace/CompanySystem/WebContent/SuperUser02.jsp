<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<title>スーパー初期画面(周倩竹)</title>
</head>
<SCRIPT LANGUAGE=JavaScript>
function file_name() 
{ 
  	document.myForm.action="popupchAction.action";
  	document.myForm.submit();

  	openAction="adminselectAction.action";
  	var win=window.open(openAction,'popup','height=400,width=200,toolbar=no,scrollbar=yes');    

} 
function fileo_name() 
{ 
  	document.myForm.action="popupchAction.action";
  	document.myForm.submit();

  	openAction="userselectAction.action";
  	var win=window.open(openAction,'popup','height=400,width=250,toolbar=no,scrollbar=yes');    

} 
</SCRIPT>
<body background=imag\vb.jpg>


<TABLE align=center border=1 CELLSPACING=0 width="560" >
      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>プロジェクト詳細</strong></FONT></P></td></tr>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト番号</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="projectid_a" /></font></TD>
      <TD   align=center width="80" ><font size=2 color=97412d>プロジェクト主管者</font></TD>
      <TD   align=center width="200"><font size=2><s:property value="muserid_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>予定開始日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="ystartdate_a" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>予定終了日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="Yenddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>実際開始日</font></TD>
      <TD align=center width="200"><font size=2><s:property value="startdate_a" /></font></TD>
      <TD align=center width="80" ><font size=2 color=97412d>実際終了日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="enddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>日本語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="prjmei_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>中国語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="projecttyuname_a" /></font></TD>

      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>英語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="projecteiname_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>お客さん</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="kyakuname_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>開発環境</font></TD>

      <TD  colspan=3 width="450"   ><font size=2 face=宋体 >
      	<s:textfield name="pjem_a" style="WIDTH: 200px; HEIGHT: 100PX" disabled="true"/>
     </font>
      </TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>プロジェクト概要</font></TD>
 	  <TD  colspan=3 width="450"   ><font size=2><s:property value="pjgaiyou_a" /></font></TD>
      </TR>
      <TR>
</TABLE>
<TABLE border=1 align=center CELLSPACING=0 width="560">

      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト成員</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="username_a" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>成員職務</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="userkindid_a" /></font></TD>
      </TR>
      <s:iterator value="simpleuser" status="st">
	      <TR>
	      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト成員</font></TD>
	      <TD  align=center width="200"><font size=2><s:property value="username_b" /></font></TD>
	      <TD  align=center width="80" ><font size=2 color=97412d>成員職務</font></TD>
	      <TD  align=center width="200"><font size=2><s:property value="userkindid_b" /></font></TD>
	      </TR>
      </s:iterator>
<s:hidden name="key_hidden" id="hidden1" />
</TABLE>
<table border=0 align=center>
    <tr>
	 	<td width="540" align="right"> 
	 	<s:submit value="基本情報更新" onclick="update();"></s:submit>
	 	</td>
	</tr>

</table>
<s:form name="myForm">
	<TABLE border=0 CELLSPACING=0 align=center>
		<tr>
			<td width="135" colspan=3 align="right">
			<input type="button" value="一般ユーザー選択" name="B1" onclick="file_name() "></td>
			<td width="135" colspan=1 align="right">
			<input type="button" value="   管理者選択  " name="B2" onClick="fileo_name()"></td>
		</tr>
		<Tr>
			<TD>
			<p align=center><a href="searchPageAction.action">戻る</a></p>
			</TD>
		</Tr>
	</TABLE>
</s:form>
</body>
</html>