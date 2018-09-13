<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>hello</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    success<br>
    1.访问值栈中Action的普通属性:<s:property value="username"/><br />
    2.访问值栈中Action的对象属性：<s:property value="user.age"/><br />
    3.访问值栈中Action的对象串属性：<s:property value="jafei.friend.name"/><br />
    4.访问值栈中Action对象的普通方法：<s:property value="password.length()"/><br />
    5.访问值栈中Action的普通方法：<s:property value="say()"/>
    <hr />
    6.访问静态方法：<s:property value="@cn.helife.domainModel.S@s()"/><br />
    7.访问静态属性：<s:property value="@cn.helife.domainModel.S@str"/><br />
    8.访问Math类的静态方法：<s:property value="@@max(2, 3)"/><br />
    <hr />
    9.访问普通类的构造方法：<s:property value="new cn.helife.domainModel.User(23)"/><br />
    <hr />
    10.访问List:<s:property value="users"/><br />
    11.访问List中某个元素：<s:property value="users[1]"/><br />
    12.访问List中元素的某个属性集合：<s:property value="users.{age}"/><br />
    12.访问List中元素的某个属性集合中的一个：<s:property value="users.{age}[0]"/>|<s:property value="users[0].age"/><br />
    13.访问Set:<s:property value="dogs"/><br />
    14.访问Set中的一个:<s:property value="dogs[2]"/><br />
    15.访问Map:<s:property value="dogMap"/><br />
    16.访问Map的所有Key:<s:property value="dogMap.keys"/><br />
    17.访问Map的所有Value:<s:property value="dogMap.values"/><br />
    18.访问Map大小:<s:property value="dogMap.size()"/>|<s:property value="dogMap.size"/><br />
    19.访问Map中某一个:<s:property value="dogMap.dogA"/>|<s:property value="dogMap['dogA']"/>|<s:property value="dogMap[\"dogA\"]"/><br />
    <hr />
    21.投影：<s:property value="users.{?#this.age==1}.{age}[0]"/><br />
    22.投影：<s:property value="users.{^#this.age > 1}.{age}"/><br />
    23.投影：<s:property value="users.{$#this.age > 1}.{age}"/><br />
    24.投影：<s:property value="users.{$#this.age > 1}.{age} == null"/>
    <hr />
    []:<s:property value="[0].username"/>
    
    <s:debug></s:debug>
  </body>
</html>
