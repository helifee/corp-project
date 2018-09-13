<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>管理者初期画面（張瑜）</title>

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
		$('bb').value = idArray.join(";");
		
}
function do_ok1(){
	alert("yu");
	<%--
	var dateObj=new Date();
		document.getElementById("adressid").style.display="";
    document.getElementById("adressid").innerHTML= dateObj.toLocaleDateString(); 
    --%>

    document.popupForm.action="setmail.action";
    document.popupForm.submit();

    targetForm=window.opener.document.forms[0];

	targetForm.action="setmail.action"; 
	
    targetForm.submit();
    window.close();
}

</script>

</head>
<body background=imag\vb.jpg>

 <s:form name="popupForm">
 <span>
 <input name="username" type="hidden" id="bb" class="ipt01" value="显示所有" readonly />
 </span>

	<table align="left">
		<s:iterator value="users" status="st">
			<tr>
			<td align="left"><font size=2><input  type="checkbox" name="aa" id="id"  value="<s:property value="raddress_a" />" onclick="sele()"/> <s:property value="raddress_a" /></font></td>

			</tr>
	  </s:iterator>
		<tr>
			<td width="100" colspan=3 align="left"><input type="button"
				value="close" name="close" onclick="window.close();"></td>
			<td width="100" colspan=3 align="left">
			<input onClick="javascript:do_ok1();" type="button" name="ok"
				value="ok "></td>
		</tr>
	</table>

</s:form>	
</body>
</html>