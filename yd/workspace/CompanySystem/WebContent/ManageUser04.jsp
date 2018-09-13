<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
       <%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script language="JavaScript" type="text/javascript" src="Login.js"></script>
<script language="JavaScript" type="text/javascript" src="calendar.js"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body background=imag\vb.jpg >
<title >refresh</title>

<s:form  validate="true" theme="xhtml">
 

<TABLE align=center border=1 CELLSPACING=0 width="560">
      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>プロジェクト管理信息</strong></FONT></P></td></tr>
      <TR>
      
      <TD align=center > <font size=2><s:textfield name="projectid_d" label="プロジェクト番号" /> </font>	</TD>
     
      <TD  align=center  ><font size=2> <s:select name="selectbusyoidname" list="listbusy" listKey="id" listValue="name" emptyOption="false" disabled="true" label="所属部門"/></font>
     </TR>
      <TR>
     
      <TD   align=center> <font size=2>
        <s:select name="selectStudent" list="liststu" listKey="id" listValue="name" emptyOption="false" onchange="javascript:Change();" label="プロジェクト主管者"/>
      </font>
      </TD>
      <TD   align=center width="80" ><font size=2 color=97412d>&nbsp;</font></TD>
       <TD align=center width="200"><font size=2>&nbsp;</font></TD>
      </TR>
      <TR>
     
      <TD  align=center width="200"><font size=2 ><s:textfield name="ystartdate_d" label="予定開始日"/> </font></TD>
      
      <TD  align=center width="200"><font size=2><s:textfield name="yenddate_d" onfocus="CalendarWebControl.show(this,false,this.value);" label="予定終了日"/>
      </font></TD>
      </TR>
      <TR>
     
      <TD align=center width="200"><font size=2><s:textfield name="startdate_d" label="実際開始日"/> </font></TD>
     
      <TD  align=center width="200"><font size=2><s:textfield name="enddate_d" label="実際終了日"/> </font></TD>
      </TR>
      <TR>
      
      <TD align=center colspan=3 width="450"><font size=2><s:textfield name="prjmei_d" label="日本語名称"/> </font></TD>
      </TR>
      <TR>

      <TD align=center colspan=3 width="450"><font size=2><s:textfield name="projecttyuname_d" label="中国語名称"/> </font></TD>

      </TR>
      <TR>
      <TD align=center colspan=3 width="450"   ><font size=2 color=97412d><s:textfield name="projecteiname_d" label="英語名称"/></font></TD>
      </TR>
      <TR>
      <TD align=center colspan=3 width="450"   ><font size=2 color=97412d><s:textfield name="kyakuname_d"label="客様"/></font></TD>
      </TR>
      
      <TR>
      

      <TD align=center colspan=3 width="450"   ><font size=2 color=97412d><s:textfield name="pjem_d" 	style="WIDTH: 200px; HEIGHT: 100PX" label="開発環境" /></font></TD>
      </TR>
      <TR>
       <TD align=center colspan=3 width="450"   ><font size=2 color=97412d><s:textfield name="pjgaiyou_d" 	label="プロジェクト概要" /></font></TD>
	
 
    </TR>
  
</TABLE>
<table border=0 align=center>
 <tr>
 <TD width="540" align="right">

 <s:submit name="sub" value="保存" onclick="save();"></s:submit> 

 </tr>
<Tr>
<TD>

<p align=center><a href="ManageUser03_init.action">戻る</a></p>
</TD>
</Tr>
</table>
</s:form>
</body>
</html>