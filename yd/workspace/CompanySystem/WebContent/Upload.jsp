<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <title>アップロードファイル画面（李化娟）</title>
    <script language="JavaScript" type="text/javascript" src="upload.js"></script>
 
  </head>
  
<body background="imag\vb.jpg">
  <br>
  <table>
  <tr>
	<td height=100>
	&nbsp;
	</td>
	</tr>
    </table>
    <table>
    <tr>
    <s:form enctype ="multipart/form-data"> 
     <s:fielderror><s:param>upFile</s:param></s:fielderror> 
    
    <td   width="22%" height="30">ファイルパス:  　
       
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
			 &nbsp;  &nbsp;&nbsp;  <p align=left><a href="simpleUser01_init.action">戻る</a></p>
		</TD>
	</tr>
	
	</table>

  </body>
</html>

