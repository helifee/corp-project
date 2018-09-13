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
	<li>property:<s:property value="username"/></li>
	<li>property取值为字符串:<s:property value="'username'"/></li>
	<li>property设定默认值:<s:property value="admin" default="管理员"/></li>
	<li>property设定HTML:<s:property value="'<hr />'" escape="true"/></li>
	<hr />
	<li>set设定adminName(默认为request和ActionContext):<s:set var="adminName" value="username" /></li>
	<li>set从request中取值：<s:property value="#request.adminName" /></li>
	<li>set从ActionContext中取值：<s:property value="#adminName" /></li>
	<%-- <li>set设定范围：<s:set name="adminPassword" value="password" scope="page"/></li>
	<br />从相应范围取值：<%=pageContext.getAttribute("adminPassword") %> --%>
	
	<li>set用var 范围为ActionContext:<s:set var="adminPassword" value="password" scope="session"/></li>
	<li>set从相应范围取值：<s:property value="#session.adminPassword" /></li>
	
	<hr />
	bean定义：<s:bean name="cn.helife.bean.Dog" var="mydog"></s:bean>
	<s:property value="#mydog.name"/>
	
	bean定义：<s:bean name="cn.helife.bean.Dog">
					<s:param name="name" value="'xiaohei'"></s:param>
					<s:debug></s:debug>
			标签内访问：<s:property value="name"/>
			 </s:bean>
	
	bean定义：<s:bean name="cn.helife.bean.Dog" var="two">
					<s:param name="name" value="'xiaobai'" ></s:param>
			 </s:bean>
			 标签外访问：<s:property value="#two.name"/>
    <li>包含静态英文文本：
    	<s:include value="/_include1.html"></s:include>
    </li>
    <li>包含静态中文文本：
    	<s:include value="/_include2.html"></s:include>
    </li>
    <li>包含静态英文文本,使用%：
    	<s:set var="page" value="'/_include1.html'"></s:set>
    	<s:debug></s:debug>
    	<s:property value="#page"/>
    	<s:include value="%{#page}"></s:include>
    </li>
    fielferror:
    <s:fielderror fieldName="zero" theme="simple"></s:fielderror>
    
    <hr />
    if elseif else:age=<s:property value="#parameters.age[0]"/>
    <s:if test="#parameters.age[0] < 0">wrong age!</s:if>
    <s:elseif test="#parameters.age[0] < 20">too young!</s:elseif>
    <s:else>yeah!</s:else>
    
    <s:property value="#parameters.aaa"/>
    <s:if test="#parameters.aaa == null">null</s:if>
    <s:debug></s:debug>
    
    <hr />
    <li>遍历集合：<br />
	    <s:iterator value="{1, 2, 3}">
	    	<s:property/> |
	    </s:iterator>
    </li>

    <li>自定义变量：<br />
	    <s:iterator value="{'aaa', 'bbb', 'ccc'}" var="x">
	    	<s:property value="#x.toUpperCase()"/> |
	    </s:iterator>
    </li>
    <li>使用status：<br />
	    <s:iterator value="{'aaa', 'bbb', 'ccc'}" status="s">
	    	<s:property /> |
	    	遍历过的元素总数：<s:property value="#s.count"/>
	    	当前遍历的元素索引：<s:property value="#s.index"/>
	    	当前是第奇数个？<s:property value="#s.odd"/>
	    	当前是第偶数个？<s:property value="#s.even"/>
	    	是第一个吗？<s:property value="#s.first"/>
	    	是最后一个吗？<s:property value="#s.last" />
	    	<br />
	    </s:iterator>
    </li>
    <br />
    <li>输出Map：
    	<br />
    	<s:iterator value="#{1:'aaa', 2:'bbb', 3:'ccc'}">
    		<s:property value="key"/>|<s:property value="value" /><br />
    	</s:iterator>
    	
    	<br />
    	<s:iterator value="#{1:'aaa', 2:'bbb', 3:'ccc'}" var="x">
    		<s:property value="#x.key"/>|<s:property value="#x.value" /><br />
    	</s:iterator>
    </li>
  </body>
</html>
