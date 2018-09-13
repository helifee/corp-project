<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>共通提示信息</title>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

</head>
<style type="text/css">

#loader_container {  
    text-align:center;  
    position:absolute;  
    top:40%;  
    width:100%;  
    left: 0;  
}  

#loader {  
    font-family:Tahoma, Helvetica, sans;  
    font-size:11.5px;  
    color:#000000;  
    background-color:#FFFFFF;  
    padding:10px 0 16px 0;  
    margin:0 auto;  
    display:block;  
    width:230px;  
    border:1px solid #5a667b;  
    text-align:left;  
    z-index:2;  
}  

#progress {  
    height:5px;  
    font-size:1px;  
    width:1px;  
    position:relative;  
    top:1px;  
    left:0px;  
    background-color:#8894a8;  
}  

#loader_bg {  
    background-color:#e4e7eb;  
    position:relative;  
    top:8px;  
    left:8px;  
    height:7px;  
    width:213px;  
    font-size:1px;  
}  

</style>  
<body>

<div id="loader_container">  
         <div id="loader">  
             <div align="center" id="commonmessage"></div>  
             <div id="loader_bg"><div id="progress"> </div></div>  
         </div>  
</div> 
<script language="JavaScript" type="text/javascript">  
var t_id = setInterval(animate,20);  
var pos=0;  
var dir=2;  
var len=0;  
function animate()  
{  
     var elem = document.getElementById('progress');  
     if(elem != null) {  
         if (pos==0) len += dir;  
         if (len>32 || pos>179) pos += dir;  
         if (pos>179) len -= dir;  
         if (pos>179 && len==0) pos=0;  
         elem.style.left = pos;  
         elem.style.width = len;  
     }  
 }  
 </script>  
</body>
</html>