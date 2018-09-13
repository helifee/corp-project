<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-31j">
<script language="JavaScript" type="text/javascript" src="Login.js"></script>
<title>Insert title here</title>
</head>
<body background=G:\lhj\vb.jpg>
<p ><font size=2 >前端测试画面</font></p>
<s:form>



<table>
 <tr>
 <td align=left><s:textfield name="muserid_e"/>
 <s:submit name="sub" value="guanlidetail" onclick="se1();"></s:submit> 
 </td>
 </tr>
  <tr>
 </tr>
 <tr>
  <td align=left><s:textfield name="muserid_f"/>
 <s:submit name="sub" value="yibandetail" onclick="search1();"></s:submit> 
 </td>
 </tr>
 <tr>
 <TD align=left   width="450"><s:textfield name="projectid_e"/>
  <s:submit name="sub" value="searchmanageuser02" onclick="sm02();"></s:submit> 
 </TD>
 </tr>
 <tr>
 </tr>
 <tr>
 <TD align=left   width="450"><s:textfield name="projectid_f"/>
  <s:submit name="sub" value="searchmanageuser03" onclick="sm03();"></s:submit> 
  </TD>
 </tr>
 <tr>
 </tr>
 <tr>
 <TD align=left   width="450"><s:textfield name="projectid_g"/>
  <s:submit name="sub" value="searchmanageuser04" onclick="sm04();"></s:submit> 
  </TD>
 </tr>
 </table>
  </s:form>



</body>
</html>