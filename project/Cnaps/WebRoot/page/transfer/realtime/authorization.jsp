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
<title>��Ȩ����</title>
<script   type="text/javascript" language="javascript">

function checkForm(){
    document.form1.sss.disabled=true;
    var inName=document.form1.inName.value;
    if(document.form1.Username.value==null||document.form1.Username.value==""){
      document.form1.sss.disabled=false;
      alert('�û�������Ϊ�գ�');
      return false;
    }
    if(document.form1.Userpass.value==null||document.form1.Userpass.value==""){
       document.form1.sss.disabled=false;
       alert('���벻��Ϊ�գ�');
       return false;
    }
   // alert(inName);
   // alert(document.form1.Username.value);
    if(inName==document.form1.Username.value){
       document.form1.sss.disabled=false;
       alert('��Ȩ����¼�����Ա����Ϊͬһ���ˣ�');
       return false;
    }
    sendDate();
}

//var P = window.parent, D = P.loadinndlg();

//window.onload = function()
//{
//   P.crebtn( 'obtn', '�� Ȩ', ok );  //����һ��ȷ����ť
//}


//function ok()  //ȷ����ť���õĺ���
//{
    //D.document.getElementById('getvals').value = document.getElementById('a').value;
//    D.document.form1.submit();
//	  P.cancel();  //���ø����ڵĹرմ��ڵķ���
	  
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
  function send_request(url) {//��ʼ����ָ������������������ĺ���
   http_request = false;
   if(window.XMLHttpRequest) { 
����http_request = new XMLHttpRequest();
����if (http_request.overrideMimeType) {//����MiME���
 ����http_request.overrideMimeType('text/xml');
����}
   }
   else if (window.ActiveXObject) { // IE�����
����try {
 ����http_request = new ActiveXObject("Msxml2.XMLHTTP");
����} catch (e) {
 ����try {
  ����http_request = new ActiveXObject("Microsoft.XMLHTTP");
 ����} catch (e) {}
����}
   }
   if (!http_request) { // �쳣����������ʵ��ʧ��
����window.alert("���ܴ���XMLHttpRequest����ʵ��.");
����return false;
   }
   http_request.onreadystatechange = processRequest;
   // ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // ��������Ϣ�ĺ���
 ����function processRequest() {
     ����if (http_request.readyState == 4) { // �ж϶���״̬
         ����if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
         //Ĭ�Ϸ���01��Ҳ���Ǵ�����Ϣ����ʱע���Ϳ���
                   //    if(http_request.responseText=='01'){
	               // alert("***���� �û��������벻�ԣ�Ϊ�����Է�����ʱ����**\r\n�û�:"+document.form1.Username.value+" ��Ȩ�ɹ���");
	              //  window.parent.document.form1.contrperson.value=document.form1.Username.value;
	            // window.parent.document.form1.submit();
	           //   }
                        
                        
	             ����if(http_request.responseText=='0'){
	                alert("�û�:"+document.form1.Username.value+" ��Ȩ�ɹ���");
	                window.parent.document.form1.contrperson.value=document.form1.Username.value;
	                window.parent.document.form1.submit();
	               }else{
	                 
		                alert("�û��������������ߴ��û���Ȩ��Ȩ,ֻ�б������ҵ�����ܲſ��ԶԴ�ҵ�������Ȩ��");
		                document.form1.sss.disabled=false;
		                return false;
	             
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
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
                                color=#000066><STRONG>�û���</STRONG></FONT></TD>
                          <TD width=241><INPUT ype="text" name="Username"  onkeydown="KeyDown('loginpass')" id="Username" style="width:140px;height:20px;"></TD>
                        </TR>
                        <TR>
                          <TD style="PADDING-LEFT: 3px" height=24><FONT 
                                class=font1 
                                color=#000066><STRONG>����</STRONG></FONT></TD>
                          <TD><INPUT type="password" name="Userpass"  onkeydown="KeyDown2()" id="Userpass" style="width:140px;height:20px;"></TD>
                        </TR>
                        <br>
                        <tr>
                      
                           <td colspan="2" >
                             <div align="center">
                             <input type="button" value="��  Ȩ" name="sss" onclick="checkForm()">
                             </div>
                           </td>
                           
                        </tr>
                      
                      </TBODY>
                  </TABLE>         
    </form>
</body>
</html>