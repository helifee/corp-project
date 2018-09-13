<%--
 * @(#)k040041.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试子系统
 --%>

<%--
 * 试题批量录入规范示例
 * 
 * @author zhanghaibo
 * @version 1.00 2010/08/19
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
<title>试题批量录入规范示例</title>
</head>

<body>
<div class="container showgrid">

	<div class="padding_top_8 title_tt span-24">
		<h2>试题批量录入规范示例</h2>
	</div>
	<div class="span-24">
	<table class="datagridtt">
	  <tr>
	    <th class="percent_20">题型</th>
	    <th>试题内容</th>
	    <th class="percent_20">答案内容</th>
	  </tr>
	  <tr>
	    <td class="text_center">单选题</td>
	    <td class="text_left"><p>1． 假设类A是类B的父类，下列声明对象x的语句中不正确的是 。  </p>
	    <p>A．A  x=new  A(); B．A  x=new  B();  C．B  x=new  B(); D．B  x=new  A();  </p>
	    <br>
	    <p>2． 下列选项中，用于在定义接口时声明接口名的关键字是 。  </p>
	    <p>A. package  B. interface C. class D. implements  </p>
	    <br>
	    <p>3． 下列选项中，用于在定义包时声明包名的关键字是 。  </p>
	    <p>A. import B. package C. interface D. protected </p></td>
	    <td class="text_left"><p>4</p>
	    <br>
	    <p>2</p>
	    <br>
	    <p>2</p></td>
	  </tr>
	  <tr>
	    <td class="text_center">多选题</td>
	    <td class="text_left"><p>1． 以下哪些是java的保留字？<BR>
	      A． run  B． default  C．implement  D．import</p>
	      <p><BR>
	        2． 下面哪些是float的有效声明？<BR>
	        A． float foo=-1;
	        B． float   foo=2.02f;
	        C． float foo=3.03d;
	      D． float foo=0x0123;</p>
	      <p><BR>
	        3．下面哪些关键字能用来控制对类成员的访问()？ <BR>
	        A. public B. protected C. private D. default</p></td>
	    <td class="text_left"><p>2,4</p>
	    <br>
	    <p>1,2,4</p>
	    <br>
	    <p>1,2,3</p></td>
	  </tr>
	  <tr>
	    <td class="text_center">判断题</td>
	    <td class="text_left"><p>1．Java程序里,创建新的类对象用关键字new，回收无用的类对象使用关键字free。 </p>
	      <p><BR>
	      2．有的类定义时可以不定义构造函数，所以构造函数不是必需的。 </p>
	      <p><BR>
	    3．super是Java中的保留字。 </p></td>
	    <td class="text_left"><p>1</p>
	    <br>
	    <p>1</p>
	    <br>
	    <p>0</p></td>
	  </tr>
	  <tr>
	    <td class="text_center">填空题</td>
	    <td class="text_left"><p>1．Java 2开发工具箱中的（    ）命令用于编译一个.java程序，命令（    ）用于执行.class文件。</p>
	      <br>
	      <p>2．定义类用的关键字是(   )；继承类用的关键子是(   )；实现接口用的关键字是(   )  </p>
	      <br>
	      <p>3．int类型的包装类为(   )类 </p>
	      <br>
	    </td>
	    <td class="text_left"><p>javac</p>
	    <p>java</p>
	    <br>
	    <p>class</p>
	    <p>extends</p>
	    <p>implements</p>
	    <br>
	    <p>Integer</p></td>
	  </tr>
	</table>
	</div>
</div>
</body>
</html>
