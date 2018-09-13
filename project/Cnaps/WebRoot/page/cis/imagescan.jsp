<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath(); 
%>

<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title></title>
<link href="<%=request.getContextPath()%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
<script language="javascript" type="text/javascript">

function DoInitializeObj(){
	
	twainobj = document.getElementById("twaintest") ;
	twainobj.InitializeObj(true);
}



function DoUpload(){
	
	twainobj = document.getElementById("twaintest") ;
	PubService.getFtpinfo(function(obj){
	window.parent.document.getElementById("imagepath").value=obj.imagedir;
	window.parent.document.getElementById("imagename").value="1.jpg|2.jpg";
		if(obj==null){
			alert("获取ftp配置信息失败，请重试");
		}else{
			var imageusr=obj.ftpuser;
			var imagepwd=obj.ftppwd;
			var imageip = obj.ftpip;
			var imagedir =obj.imagedir;
			
			//alert(imageusr+"==="+imagepwd+"==="+imageip+"===="+imagedir);
			var ret = twainobj.DoUpload(imageusr,imagepwd,imagedir,imageip,21);
			if (ret.length == 0) {
				alert("fail to upload");
			}else {
				alert(ret);
				//window.parent.document.getElementById("name").value=ret;
				window.parent.document.getElementById("imagename").value=ret;
				window.parent.closetmpwin();
			}
		}
	});
	
		  
}
</script>


<script type="text/javascript" Language=Javascript>
  function dosubmit(astr)
  {
     alert(astr);
  }
</script> 

<SCRIPT type="text/javascript" FOR="twaintest" EVENT="OnSubmit(AStr)" >
   <!-- insert script commands -->
   dosubmit(AStr);
</SCRIPT> 
</head>

<body>
<table>
	<tr>
		<td rowspan="12">
		<object id="twaintest" classid="clsid:E2AF6E89-FFB3-4C4B-AF5C-10CC1035C234" width="800" height="450"></object><br>
		</td>
	</tr>
	<tr>
		<td><input type="button" id="btn3" value="初始化" class="button" onClick="DoInitializeObj()"></td>
	</tr>
	<tr>
		<td><input type="button" id="btn4" value="上 传" class="button" onClick="DoUpload()"></td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	<tr>
		<td >&nbsp;</td>
	</tr>
	
</table>


</body>
</html>
