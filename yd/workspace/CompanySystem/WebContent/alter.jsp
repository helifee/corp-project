<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-31j">
<title>Iスーパー初期画面(周倩竹)</title>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<script>
function $(id) {return document.getElementById(id);}
function $F(name){return document.getElementsByTagName(name);}
function  turnit(seleDiv)
{ 
  var seleId=document.getElementById(seleDiv);
  if  (seleId.style.display=="none")  
    {seleId.style.display="";
}
  else
    {seleId.style.display="none";   
   }
}
function sele()
{
	var checkboxs =  document.getElementsByName("aa");
		var idArray = new Array();
		for(i=0;i<checkboxs.length;i++)
		{
			if(checkboxs[i].checked){
			idArray.push(checkboxs[i].value);  }
			else 
			checkboxs[i].checked=false; 
		}
		$('bb').value = idArray.join("@");
		
}

</script>

</head>
<body background=imag\vb.jpg>

 <s:form name="popupForm">
 <input name="username" type="text" id="bb" class="ipt01" value="すべて表示" readonly />

	<table align="left">
		<s:iterator value="users" status="st">
			<tr>
			<td align="left"><font size=2><input  type="checkbox" name="aa" id="id"  value="<s:property value="userid_a" />" onclick="sele()"/> <s:property value="username_a" /></font></td>

			</tr>
	  </s:iterator>
		<tr>
			<td width="100" colspan=3 align="left"><input type="button"
				value="閉じる" name="close" onclick="window.close();"></td>
			<td width="100" colspan=1 align="left">
			<input onClick="javascript:do_ok();" type="button" name="ok"
				value="追加"></td>
		</tr>
	</table>

</s:form>	
</body>
</html>