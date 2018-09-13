<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>スーパー初期画面(周倩竹)</title>
</head>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<SCRIPT LANGUAGE=JavaScript>
function file_name() 
{ 

  	document.myForm.action="popuppjAction.action";
  	document.myForm.submit();

  	openAction="adminselectAction.action";
  	var win=window.open(openAction,'popup','height=400,width=400,toolbar=no,scrollbar=yes');    

//var win=window.open("alter.jsp","",'height=500, width=500,resizable=yes,scrollbars=yes') 
//window.returnValue=window.showModalDialog("alter.jsp",[, vArguments],'height=500, width=500,resizable=yes,scrollbars=yes')

} 
</SCRIPT>
<body background=imag\vb.jpg >
<s:form>
<TABLE align=center border=1 CELLSPACING=0 width="560" >

      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>项目详细信息</strong></FONT></P></td></tr>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト番号</font></TD>
      <TD><font size=2><s:textfield name="projectid"  /></font></TD>
      <TD   align=center width="80" ><font size=2 color=97412d>项目主管</font></TD>
      <TD><font size=2><s:select name="selectmusername" list="listmuser" listKey="id" listValue="name" emptyOption="false" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>预计开始</font></TD>
      <TD><font size=2><s:textfield name="ystartdate" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>预计结束</font></TD>
      <TD><font size=2><s:textfield name="Yenddate"  /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>实际开始</font></TD>
      <TD width="200"><font size=2><s:textfield name="startdate"  /></font></TD>
      <TD align=center width="80" ><font size=2 color=97412d>实际结束</font></TD>
      <TD><font size=2><s:textfield name="enddate"  /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>日文名称</font></TD>
      <TD><font size=2><s:textfield name="prjmei"  /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>中文名称</font></TD>
      <TD ><font size=2><s:textfield name="projecttyuname"  /></font></TD>

      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>英文名称</font></TD>
      <TD ><font size=2><s:textfield name="projecteiname"  /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>客户名称</font></TD>
      <TD><font size=2><s:textfield name="kyakuname"  /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>开发环境</font></TD>

      	<TD  colspan=3 width="450"   ><font size=2 face=宋体 >
      	<s:textarea rows="8" cols="50" name="pjem"></s:textarea></font>
      </TD>
      
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>项目概要</font></TD>
 	  <TD  colspan=3 width="450"   ><font size=2><s:textfield name="pjgaiyou"  /></font></TD>
      </TR>
      <TR>
</TABLE>
<table border=0 align=center>
    <tr>
	 	<td width="540" align="right"> 
	 	<s:submit value="基本情報登陆" onclick="save();"></s:submit>
	 	</td>
	</tr>

</table>
</s:form>
<hr width="560" align="center">
<TABLE border=1 align=center CELLSPACING=0 width="560">
     

</TABLE>
<TABLE border=0 CELLSPACING=0  align=center>

<Tr>

<TD>
<p align=center><a href="javascript:history.back(1)">返回</a></p>
</TD>
</Tr>
</TABLE>
	 
</body>
</html>