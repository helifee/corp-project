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

<h1><font color="blue">请选择喜欢的运动项目</font></h1>

<s:form action="viewResult">

<s:checkbox name="interest" label="足球" fieldValue="football" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="篮球" fieldValue="basketball" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="排球" fieldValue="volleyball" labelposition="left"></s:checkbox>
<s:checkbox name="interest" label="羽毛球" fieldValue="badminton" labelposition="left"></s:checkbox>

<!-- 
<s:checkboxlist list="#{'computer' : '计算机' , 'math' :  '数学'}" name="interest" label="浪曦" labelposition="top">
</s:checkboxlist>
 --> 
 
 
<s:submit value="提交"></s:submit>

</s:form>


</body>
</html>