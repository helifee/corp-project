<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>


<html>
<head>
<title>ログイン画面（李化娟） </title>
<script language="JavaScript" type="text/javascript" src="Login.js"></script>
<link rel="stylesheet" href="D:\lhj\style1.css" type="text/css"> 

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<SCRIPT language="JavaScript">   
	var speed = 75
	var pause =  0
	var timerID = null
	var bannerRunning = false
	var ar = new Array()

	ar[0] = "大连远东计算机系统有限公司欢迎您"
	ar[1] = "http://www.ysys.com.cn"
	ar[2] = "Welcome to YuanDong Computer"

	var currentMessage = 0
	var offset = 0  

	function stopBanner() { 
		if (bannerRunning) 
			clearTimeout(timerID) 
		bannerRunning = false
	} 

	function showBanner() { 
		var text = ar[currentMessage] 
		if (offset < text.length) { 
	        if (text.charAt(offset) == " ") 
		        offset++ 
			var partialMessage = text.substring(0, offset + 1) 
		    window.status = partialMessage 
			offset++ 
		    timerID = setTimeout("showBanner()", 100) //
		    bannerRunning = true 
		} else { 
			offset = 0 
			currentMessage++ 
			if (currentMessage == ar.length) 
				currentMessage = 0 
		    timerID = setTimeout("showBanner()" ,2000) //
		    bannerRunning = true 
		 }
	} 

	function startBanner() 
	{ 
		showBanner()
	}

	startBanner()
	{
	}

--></SCRIPT>

<STYLE type="text/css"> 
	a:hover { CURSOR: url('http://5211.91.tc/cur/30.cur')} 
	body { cursor:url('http://5211.91.tc/ani/23.ani')} 
</STYLE>

<STYLE type="text/css">
#demo a {
	width:100%;
	overflow:hidden;
	font:12px/16px tahoma;
	display:block;
	text-decoration:none;
	margin:2px;
	color:#4a551c;
	padding-left:2px;
	text-align:left;
}
#demo a:hover {
	color:#ff6600;
}
</STYLE>

</head>

<body background=imag\18.jpg >
	<table width="748" border="0" cellspacing="0" cellpadding="0" height="24">
	  <tr>
		<td> </td>
	  </tr>
	</table>
	<table width="90%" border="0" cellspacing="0" cellpadding="0" height="84" align="center">
	 	<tr>
			<td align="left" height="74" width="80"><img src="imag\yuandong-mark.jpg" ></td>
			<td height="74" width="20"> &nbsp;</td>
			<td height="74" width="100%">
		    	<p style="font:21px;text-indent:4px ">遠東計算機</p>
				<p style="font:13px;text-indent:4px">YUANDONG COMPUTER</p>
			</td>
			                        
		</tr>
	</table>
	<table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">	
		<tr bgcolor="#5E8CDF" >
			<td width="0"><img src="imag\bluebar.gif" width="0" height="32"></td>
		</tr>
		<tr>
			 <td height="58" colspan="8"></td>
		</tr>
	</table>
	<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center">
	  <tr>
		<td>
		  <table width="80%"  border="0" cellspacing="0" cellpadding="0" align="center">
			<tr>
			  <td align="center">
				<table width="320"  border="0" cellspacing="0" cellpadding="10">
				  <tr>
					<td align="center" class="big"><b>会員はログインします</b></td>
				  </tr>
				</table>
				<table width="320" height="182"  border="0" cellpadding="0" cellspacing="0">
				  <tr>
					<td valign="top" >
					<s:form>
					<table width="90%"  border="0" cellspacing="0" cellpadding="2">
					  <tr>
						<td width="35%" height="20"></td>
						<td ><s:property value="errormsg"/></td>
					  </tr>
					  <tr>
						<s:fielderror><s:param>username</s:param></s:fielderror>
						<td >ユーザ名</td><td><s:textfield name="username" id="username" size="16" maxlength="30" />
						</td>
					  </tr>
					  <tr>
						<s:fielderror><s:param>password</s:param></s:fielderror>
						<td>パスワード</td><td><s:password name="password"  id="password" size="18" maxlength="30" /></td>
					  </tr>
					  <tr>
						<td height="18"></td>
					  </tr>
					  <tr align="center">
						<s:fielderror><s:param>userkindid</s:param></s:fielderror>
						<td>&nbsp;</td><td  ><s:select name="userkindid"  list="#{1:'一般',2:'管理者',3:'スーパー'}" listKey="key"  listValue="value" headerKey="0" headerValue="　ユーザー種別 　"/>   </td>
					  </tr>
					  <tr>
						<td height="8"></td>
						<td ></td>
					  </tr>
					  <tr>
					    <td height="18"></td>
					  </tr>
					  <tr >
						<td>&nbsp;</td><td align="center" ><s:submit onclick="javascript:add();" name="sub" value=" ログイン " > </s:submit></td>
					  </tr>
					</table>
					<s:hidden name="key_hidden2" id="hidden2"/>
					</s:form>
				  </td>
				 </tr>
			   </table>
			</td>			          
		    <td width="0" bgcolor="#CCCCCC"></td> 
    		<td width="400" align="center" valign="top">
			  <table  border="0" cellspacing="0" cellpadding="10" align="center">
			    <tr>
			       <td align="center" class="big"><b>会員は登録します</b></td>
			    </tr>
			  </table>      
			  <table  height="170"  border="0" cellpadding="0" cellspacing="0" align="center">
				 <tr>
				   <td width="200"><img src="imag\reg.jpg" width="160" height="160" border="0"></td>
				   <td>
				       <table width="100%"  border="0" cellspacing="0" cellpadding="3">
					       <tr>
					          <td height="20" class="red"></td>
					       </tr>
					       <tr>
					          <td >登録した後にあなたは</td>
					       </tr>
					        <tr>
					          <td >情報にブラウズすることができて、</td>
					        </tr>
					        <tr>
					           <td >交流の技術</td>
					        </tr>
					        <tr>
					           <td >&nbsp;</td>
					        </tr>
					        <tr>
					           <td height="38" class="big">&nbsp;</td>
					        </tr>
					     </table>
					 </td>   
				   </tr>
				</table>
			</td>
		</tr>
	</table>
	    
	<table width="900"  border="0" cellspacing="0" cellpadding="0">
		  <tr>
		    <td height="66"></td>
		  </tr>
	</table>
	<table width="900" border="0" cellspacing="0" cellpadding="0">
		  <tr>
		    <td height="6"><SCRIPT LANGUAGE="JavaScript" src="/inc/js/stat.js"></SCRIPT></td>
		  </tr>
		  <tr>
		  
	</table>
	<table width="900" border="0" cellspacing="0" cellpadding="3">
	  	 <tr>
		    <td>
		        <hr>                                              
		          <p align="center">
		             <font color="black" size="2">&nbsp;</font> 
		             <font color="black" size="2"><br>Copyright:</font> 
		              <font color="#0066CC" size="2">大連遠東計算機系統有限公司</font>  
		          </p>
		    </td>
		  </tr>
	</table>
	</td>
	</tr>
	</table>
</body>
</html>
