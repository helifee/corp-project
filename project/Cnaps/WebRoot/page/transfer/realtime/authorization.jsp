<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ page import="com.bancstone.hibernate.systemManage.Systemusersmanage"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
String s=request.getContextPath();
String path = request.getContextPath();

 Systemusersmanage user=(Systemusersmanage)session.getAttribute("userentity");
 String inputName=user.getUsername(); 
 
%>
<head>
<title>授权管理</title>
<script   type="text/javascript" language="javascript">

function checkForm(){
    document.form1.sss.disabled=true;
    var inName=document.form1.inName.value;
    if(document.form1.Username.value==null||document.form1.Username.value==""){
      document.form1.sss.disabled=false;
      alert('用户名不能为空！');
      return false;
    }
    if(document.form1.Userpass.value==null||document.form1.Userpass.value==""){
       document.form1.sss.disabled=false;
       alert('密码不能为空！');
       return false;
    }
   // alert(inName);
   // alert(document.form1.Username.value);
    if(inName==document.form1.Username.value){
       document.form1.sss.disabled=false;
       alert('授权人与录入操作员不能为同一个人！');
       return false;
    }
    sendDate();
}

//var P = window.parent, D = P.loadinndlg();

//window.onload = function()
//{
//   P.crebtn( 'obtn', '授 权', ok );  //创建一个确定按钮
//}


//function ok()  //确定按钮调用的函数
//{
    //D.document.getElementById('getvals').value = document.getElementById('a').value;
//    D.document.form1.submit();
//	  P.cancel();  //调用父窗口的关闭窗口的方法
	  
//}

   function KeyDown(nextName){
	    if (event.keyCode == 13)
	    {
	       document.getElementById(nextName).focus();
	    }
   }
   function KeyDown2(){
	    if (event.keyCode == 13)
	    {
	       checkForm()
	    }
	    
   }
  
</script>
<SCRIPT language="javaScript"><!--
  function sendDate(){
  	var name=document.form1.Username.value;
  	var pass=document.form1.Userpass.value;
  	
  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=authorizationAjax&name="+name+"&pass="+pass);
  	  }
    var http_request = false;
  function send_request(url) {//初始化、指定处理函数、发送请求的函数
   http_request = false;
   if(window.XMLHttpRequest) { 
　　http_request = new XMLHttpRequest();
　　if (http_request.overrideMimeType) {//设置MiME类别
 　　http_request.overrideMimeType('text/xml');
　　}
   }
   else if (window.ActiveXObject) { // IE浏览器
　　try {
 　　http_request = new ActiveXObject("Msxml2.XMLHTTP");
　　} catch (e) {
 　　try {
  　　http_request = new ActiveXObject("Microsoft.XMLHTTP");
 　　} catch (e) {}
　　}
   }
   if (!http_request) { // 异常，创建对象实例失败
　　window.alert("不能创建XMLHttpRequest对象实例.");
　　return false;
   }
   http_request.onreadystatechange = processRequest;
   // 确定发送请求的方式和URL以及是否同步执行下段代码
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // 处理返回信息的函数
 　　function processRequest() {
     　　if (http_request.readyState == 4) { // 判断对象状态
         　　if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
         //默认返回01，也就是错误信息，到时注掉就可以
                   //    if(http_request.responseText=='01'){
	               // alert("***您的 用户名或密码不对，为您调试方便暂时放行**\r\n用户:"+document.form1.Username.value+" 授权成功！");
	              //  window.parent.document.form1.contrperson.value=document.form1.Username.value;
	            // window.parent.document.form1.submit();
	           //   }
                        
                        
	             　　if(http_request.responseText=='0'){
	                alert("用户:"+document.form1.Username.value+" 授权成功！");
	                window.parent.document.form1.contrperson.value=document.form1.Username.value;
	                window.parent.document.form1.submit();
	               }else{
	                 
		                alert("用户名或者密码错或者此用户无权授权,只有本网点的业务主管才可以对此业务进行授权！");
		                document.form1.sss.disabled=false;
		                return false;
	             
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
      --></script>
</head>
<body >
    <form name="form1" mothod=post action="">
    <input type="hidden" name="inName" value="<%=inputName %>">
    <TABLE  cellSpacing=3 cellPadding=0  align=center border=0>
                      <TBODY>
                        <TR>
                          <TD style="PADDING-LEFT: 3px" width=70 
                                height=24><FONT class=font1 
                                color=#000066><STRONG>用户名</STRONG></FONT></TD>
                          <TD width=241><INPUT ype="text" name="Username"  onkeydown="KeyDown('loginpass')" id="Username" style="width:140px;height:20px;"></TD>
                        </TR>
                        <TR>
                          <TD style="PADDING-LEFT: 3px" height=24><FONT 
                                class=font1 
                                color=#000066><STRONG>密码</STRONG></FONT></TD>
                          <TD><INPUT type="password" name="Userpass"  onkeydown="KeyDown2()" id="Userpass" style="width:140px;height:20px;"></TD>
                        </TR>
                        <br>
                        <tr>
                      
                           <td colspan="2" >
                             <div align="center">
                             <input type="button" value="授  权" name="sss" onclick="checkForm()">
                             </div>
                           </td>
                           
                        </tr>
                      
                      </TBODY>
                  </TABLE>         
    </form>
</body>
</html>