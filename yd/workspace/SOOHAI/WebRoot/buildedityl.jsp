<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>楼盘信息编辑</title>
<link href="css/edit.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript" src="js/builded.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
</head>
<body class="yj950-1">
<div id="wrapper"><!--header start--> <!--/#header end--> <span
	class="yj-guid"><a name="pagetop" id="pagetop"></a></span> <!--/header end-->

<hr class="separation" />
<!--contents start-->
<div id="contents">

<div class="header_top"><img alt="搜海网" src="images/logo.jpg" /></div>

<div id="contents-header">
<div id="new-title">
<p><img height="22" alt="" src="images/new_title_kanto.gif"
	width="241" /></p>
</div>
<!--/#new-title end-->

<div id="my-list">
<dl>
	<dt>我的欲购房产：</dt>
	<dd>
	<ul>
		<li><a href="#">房屋一览</a></li>
		<li><a href="#">房屋比较表</a></li>
	</ul>
	</dd>
</dl>
</div>
<!--/#my-list end-->

<div id="cat-pass">
<p><span class="yj-guid">现在位置：</span> <a href="index.html">搜海</a>
&gt; <strong>楼盘信息一览</strong></p>
</div>
<!--/#cat-pass end--></div>
<div id="xinjian">
<FONT size="2"> <s:a
href="#" onclick="makedat(); return false">生成静态页面</s:a> </FONT>
<s:url action="buildedinfo" id="buildedinfoUrl">
</s:url> <s:a href="%{buildedinfoUrl}">新建</s:a>
<s:url action="logout" id="logoutUrl">
</s:url> <s:a href="%{logoutUrl}">返回</s:a>

</div>
<div id="div_buildingdel"><s:include value="buildeditylzi.jsp" /></div>
</div>
<br />

<!--#pos-s end-->
<div id="footer">

<address><br />
<a href="http://www.soohai.com/About.asp">关于我们</a> ┊ 广告服务 ┊ <a
	href="http://www.soohai.com/legal.asp">法律声明</a> ┊ <a
	href="http://www.soohai.com/touch.asp">联系我们</a> ┊ 招聘信息</address>

<p class="summary STYLE1">全国销售热线：400-600-1510<br />
大连地区销售热线：0411-84338333/84339333<br />
海景房地产经纪(大连)有限公司 版权所有<br />
技术支持：大连远东计算机系统有限公司</p>
<p><img src="citysearch_files/s2592252157546.gif" name="" alt=""
	border="0" height="1" width="1" /></p>
</div>
<!-- #wrapper end --></div>
</body>
</html>