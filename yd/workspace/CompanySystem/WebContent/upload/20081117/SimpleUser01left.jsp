<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>user</title>
<script language="JavaScript" type="text/javascript" src="simpleUser01left.js"></script>
</head>
<body background=D:\lhj\backblue.jpg>
<p ><font size=４ >該当ユーザー所属プロジェクト一覧</font></p>



<TABLE align=center border="0" width="100%">


      <tr>
      <td align="left" >
      <font  size="2">
  
      <s:select name="startdate" list="{'2001','2002','2003','2004','2005','2006','2007','2008','2009'}" 
       headerKey="0" headerValue="--选择年--" label="年" />
       
       </font>
      </td>
      <td align="center"><s:submit onclick="add1();" name="sub" value=" 查询  "> </s:submit></td>
     
     </tr>
      
      </table>

    <table border="1" width="100%" >
    <tr>
            <td align=CENTER width=80 ><font size="3">项目编号</font></td>
            <td align=CENTER width=100><font size="3">日文名称</font></td>
            <td align=CENTER width=60 ><font size="3">主管</font></td>
            <td align=CENTER width=150><font size="3">客户名称</font></td>
            <td align=CENTER width=40 ><font size="3">开始</font></td>
            <td align=CENTER width=40 ><font size="3">结束</font></td>
            <td align=CENTER width=10 ><font size="3">量</font></td>
            <td align=CENTER width=60 ><font size="3">维护</font></td>
            <td align=CENTER width=100><font size="3">中文名称</font></td>
            <td align=CENTER width=100><font size="3">英文名称</font></td>
      </tr>
    	
		<s:iterator value="pjs" status="st">
        <tr <s:if test="#st.odd== true">style="background-color:gray" </s:if>
        	<s:else >style="background-color:#eeeeee"</s:else>>
           	<td align="center" width="10%"> <s:property value="projectid_a"/> </td>
           	<td align="center" width="10%"> <s:property value="prjmei_a"/> </td>
           	<td align="center" width="10%"> <s:property value="musername_a"/> </td>
           	<td align="center" width="10%"> <s:property value="kyakuname_a"/> </td>
           	<td align="center" width="10%"> <s:property value="startdate_a"/> </td>
           	<td align="center" width="10%"> <s:property value="enddate_a"/> </td>
           	<td align="center" width="10%"> <s:property value="usernum_a"/> </td>
           	<td align="center" width="10%"> <a href="javascript:move1('<s:property value="projectid_a"/>')">详细</a></td>
           	<td align="center" width="10%"> <s:property value="projecttyuname_a"/> </td>
           	<td align="center" width="10%"> <s:property value="projectuiname_a"/> </td>
           	
        </tr>
	</s:iterator>
	</table>
	<s:hidden name="key_hidden" id="hidden1"/>


</body>
</html>