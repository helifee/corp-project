<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>My JSP 'index.jsp' starting page</title>
    <script language="JavaScript" type="text/javascript" src="upload.js"></script>
 
  </head>
  
  <body> 
  <br>
    <table>
    <tr>
    <s:form enctype ="multipart/form-data"> 
     <s:fielderror><s:param>upFile</s:param></s:fielderror> 
    <td   width="22%" height="30">ファイルのパス:  　
       
        <s:file name ="upFile"  /> &nbsp;  &nbsp;&nbsp;   
        <s:submit align="left" value="アップロード" onclick="upload();"/> 
      </td>
    </s:form > 
    </tr>
      <tr>
		<TD height=30>
			&nbsp;
		</TD>
	</tr>
    <tr>
		<TD colspan="4">
			<p align=left><a href="simpleUser01_init.action">戻る</a></p>
		</TD>
	</tr>
	
	</table>

  </body>
</html>

