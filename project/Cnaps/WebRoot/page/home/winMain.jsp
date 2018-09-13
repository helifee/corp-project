<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html  xmlns="http://www.w3.org/1999/xhtml">

<head>
<%
	String path = request.getContextPath();
	
 %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Page-Enter" content="blendTrans(Duration=0.3)" /> 
<meta http-equiv="Page-Exit" content="blendTrans(Duration=0.3)" />

<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script language="JavaScript">
function init(){

	
	var winOpen=null;
	var	winWidth;
	var	winHeight;
	var	winFeatures;
	winWidth=screen.width -10;
	winHeight=screen.height - 80;
	winFeatures="menubar=no,status=yes,toolbar=no,resizable=yes,titlebar=no,scrollbars=no,";
	winFeatures+="top=0,left=0,height=" +winHeight + ",width=" + winWidth ;	
	winOpen = window.open("<%=path%>/page/home/index.jsp?timStamp=" + (new Date()).valueOf(),"WinMain1",winFeatures);
		
	if(winOpen){
		if( winOpen.opener!=null){
			winOpen.opener.close();
		}else{
			window.opener=null;
			window.close();
		}
	 
	}
}
</script>

</head>
<body onload="init()" >


</body>
</html>
