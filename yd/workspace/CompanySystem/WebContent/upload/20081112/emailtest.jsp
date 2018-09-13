<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<script language="javascript"> 
function getinnerHTML() 
{ 
alert(document.getElementById("d").innerHTML) ;
} 
function setinnerHTML() 
{ 
document.getElementById("d").innerHTML="aaaaaaaaaaa" 
} 
</script>
<body>
<div id="d" style="background-color:#ff9966"><input type="text" name="获取innerHTML" name="11" onchange="javascript:getinnerHTML()"> </div> 
<input type="button" value="获取innerHTML" onclick="getinnerHTML()"> 
<input type="button" value="设置innerHTML" onclick="setinnerHTML()"> 
  function addComponent()
  {var uploadHTML = document.createElement( "<input type='file'  name='affixPath'/>");
     document.getElementById("files").appendChild(uploadHTML);
      uploadHTML = document.createElement( "<p/>");
      document.getElementById("files").appendChild(uploadHTML)
      }
	function show(){
	if(document.getElementById("sp1").style.display=="none"){
		document.getElementById("sp1").style.display="";
	}else{
		if(document.getElementById("sp2").style.display=="none"){
			document.getElementById("sp2").style.display="";
		}else{
			if(document.getElementById("sp3").style.display=="none"){
				document.getElementById("sp3").style.display="";
			}else{
				if(document.getElementById("sp4").style.display=="none"){
					document.getElementById("sp4").style.display="";
				}else{
					if(document.getElementById("sp5").style.display=="none"){
						document.getElementById("sp5").style.display="";
					}else{
						alert("no more file can be selected");
					}
				}
			}
		}
	}
	
}
function setNone(filename,divename){
	document.getElementById(filename).value="";
	document.getElementById(divename).style.display="none";
    document.getElementById(divename).outerHTML=document.getElementById(divename).outerHTML ;
<%-- 将file本框内容清空--%>
}
function resetemail_Emailaction(){

	targetForm = document.forms[0];
	targetForm.action="resetemail";
	targetForm.submit();
}
</body>
</html>