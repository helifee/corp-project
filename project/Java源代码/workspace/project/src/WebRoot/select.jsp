<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>

<h1><font color="blue">��ѡ��ϲ�����˶���Ŀ</font></h1>

<s:form action="viewResult">

<s:checkbox name="interest" label="����" fieldValue="football" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="����" fieldValue="basketball" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="����" fieldValue="volleyball" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="��ë��" fieldValue="badminton" labelposition="left"></s:checkbox>

<!-- 
<s:checkboxlist list="#{'computer' : '�����' , 'math' :  '��ѧ'}" name="interest" label="����" labelposition="top">
</s:checkboxlist>
 --> 
 
 
<s:submit value="�ύ"></s:submit>

</s:form>


</body>
</html>