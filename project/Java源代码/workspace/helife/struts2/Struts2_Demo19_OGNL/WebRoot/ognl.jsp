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
    1.����ֵջ��Action����ͨ����:<s:property value="username"/><br />
    2.����ֵջ��Action�Ķ������ԣ�<s:property value="user.age"/><br />
    3.����ֵջ��Action�Ķ������ԣ�<s:property value="jafei.friend.name"/><br />
    4.����ֵջ��Action�������ͨ������<s:property value="password.length()"/><br />
    5.����ֵջ��Action����ͨ������<s:property value="say()"/>
    <hr />
    6.���ʾ�̬������<s:property value="@cn.helife.domainModel.S@s()"/><br />
    7.���ʾ�̬���ԣ�<s:property value="@cn.helife.domainModel.S@str"/><br />
    8.����Math��ľ�̬������<s:property value="@@max(2, 3)"/><br />
    <hr />
    9.������ͨ��Ĺ��췽����<s:property value="new cn.helife.domainModel.User(23)"/><br />
    <hr />
    10.����List:<s:property value="users"/><br />
    11.����List��ĳ��Ԫ�أ�<s:property value="users[1]"/><br />
    12.����List��Ԫ�ص�ĳ�����Լ��ϣ�<s:property value="users.{age}"/><br />
    12.����List��Ԫ�ص�ĳ�����Լ����е�һ����<s:property value="users.{age}[0]"/>|<s:property value="users[0].age"/><br />
    13.����Set:<s:property value="dogs"/><br />
    14.����Set�е�һ��:<s:property value="dogs[2]"/><br />
    15.����Map:<s:property value="dogMap"/><br />
    16.����Map������Key:<s:property value="dogMap.keys"/><br />
    17.����Map������Value:<s:property value="dogMap.values"/><br />
    18.����Map��С:<s:property value="dogMap.size()"/>|<s:property value="dogMap.size"/><br />
    19.����Map��ĳһ��:<s:property value="dogMap.dogA"/>|<s:property value="dogMap['dogA']"/>|<s:property value="dogMap[\"dogA\"]"/><br />
    <hr />
    21.ͶӰ��<s:property value="users.{?#this.age==1}.{age}[0]"/><br />
    22.ͶӰ��<s:property value="users.{^#this.age > 1}.{age}"/><br />
    23.ͶӰ��<s:property value="users.{$#this.age > 1}.{age}"/><br />
    24.ͶӰ��<s:property value="users.{$#this.age > 1}.{age} == null"/>
    <hr />
    []:<s:property value="[0].username"/>
    
    <s:debug></s:debug>
  </body>
</html>
