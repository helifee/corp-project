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
	<li>propertyȡֵΪ�ַ���:<s:property value="'username'"/></li>
	<li>property�趨Ĭ��ֵ:<s:property value="admin" default="����Ա"/></li>
	<li>property�趨HTML:<s:property value="'<hr />'" escape="true"/></li>
	<hr />
	<li>set�趨adminName(Ĭ��Ϊrequest��ActionContext):<s:set var="adminName" value="username" /></li>
	<li>set��request��ȡֵ��<s:property value="#request.adminName" /></li>
	<li>set��ActionContext��ȡֵ��<s:property value="#adminName" /></li>
	<%-- <li>set�趨��Χ��<s:set name="adminPassword" value="password" scope="page"/></li>
	<br />����Ӧ��Χȡֵ��<%=pageContext.getAttribute("adminPassword") %> --%>
	
	<li>set��var ��ΧΪActionContext:<s:set var="adminPassword" value="password" scope="session"/></li>
	<li>set����Ӧ��Χȡֵ��<s:property value="#session.adminPassword" /></li>
	
	<hr />
	bean���壺<s:bean name="cn.helife.bean.Dog" var="mydog"></s:bean>
	<s:property value="#mydog.name"/>
	
	bean���壺<s:bean name="cn.helife.bean.Dog">
					<s:param name="name" value="'xiaohei'"></s:param>
					<s:debug></s:debug>
			��ǩ�ڷ��ʣ�<s:property value="name"/>
			 </s:bean>
	
	bean���壺<s:bean name="cn.helife.bean.Dog" var="two">
					<s:param name="name" value="'xiaobai'" ></s:param>
			 </s:bean>
			 ��ǩ����ʣ�<s:property value="#two.name"/>
    <li>������̬Ӣ���ı���
    	<s:include value="/_include1.html"></s:include>
    </li>
    <li>������̬�����ı���
    	<s:include value="/_include2.html"></s:include>
    </li>
    <li>������̬Ӣ���ı�,ʹ��%��
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
    <li>�������ϣ�<br />
	    <s:iterator value="{1, 2, 3}">
	    	<s:property/> |
	    </s:iterator>
    </li>

    <li>�Զ��������<br />
	    <s:iterator value="{'aaa', 'bbb', 'ccc'}" var="x">
	    	<s:property value="#x.toUpperCase()"/> |
	    </s:iterator>
    </li>
    <li>ʹ��status��<br />
	    <s:iterator value="{'aaa', 'bbb', 'ccc'}" status="s">
	    	<s:property /> |
	    	��������Ԫ��������<s:property value="#s.count"/>
	    	��ǰ������Ԫ��������<s:property value="#s.index"/>
	    	��ǰ�ǵ���������<s:property value="#s.odd"/>
	    	��ǰ�ǵ�ż������<s:property value="#s.even"/>
	    	�ǵ�һ����<s:property value="#s.first"/>
	    	�����һ����<s:property value="#s.last" />
	    	<br />
	    </s:iterator>
    </li>
    <br />
    <li>���Map��
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
