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
&gt; <strong>楼盘信息</strong></p>
</div>
<!--/#cat-pass end--></div>

<div id="contents-body"><!--main start-->
<div id="main">
<div id="addinfo"><span class="STYLE1"></span>

<h5><a name="pageresearch" id="pageresearch">楼盘信息添加</a></h5>
<s:fielderror cssStyle="color:red"></s:fielderror> <s:form action=""
	theme="simple" method="post" enctype="multipart/form-data">
	<s:token></s:token>
	<fieldset>
	<dl>
		<dt>位置</dt>
		<dd>
		<div id="aaa"><s:select name="buildinginfos.cityId" id="cityId"
			list="citylist" listKey="cityId" listValue="cityName" headerKey="0"
			onchange="getnewmdnm()" />市&nbsp;&nbsp;&nbsp;</div>
		<div id="div_buildedit"><s:include value="buildeditzi.jsp" /></div>
		</dd>
	</dl>
	<dl>
		<dt>楼盘名称</dt>
		<dd><s:textfield name="buildinginfos.buildName" id="buildName"
			size="80" maxlength="200" /></dd>
	</dl>
	<dl>
		<dt>楼盘地址</dt>
		<dd><s:textfield name="buildinginfos.address" id="address"
			size="80" maxlength="200" /></dd>
	</dl>
	<dl>
		<dt>剩余套数</dt>
		<dd><s:textfield name="buildinginfos.surplusNumber"
			id="surplusNumber" size="11" maxlength="11" /></dd>
	</dl>
	<dl>
		<dt>起价</dt>
		<dd><s:textfield name="buildinginfos.startingPrice"
			id="startingPrice" size="11" maxlength="11" /></dd>
	</dl>
	<dl>
		<dt>均价</dt>
		<dd><s:textfield name="buildinginfos.evenPrice" id="evenPrice"
			size="11" maxlength="11" /></dd>
	</dl>
	<dl>
		<dt>信息公开</dt>
		<dd>
		<ul>
			<li><s:checkbox id="flag" name="flag" fieldValue="true"
				theme="simple" value="%{baomiFag}" label="保密">
			</s:checkbox></li>
		</ul>
		</dd>
	</dl>
	<dl>
		<dt>销售公司</dt>
		<dd><s:textarea name="buildinginfos.salesCompany"
			id="salesCompany" cols="50" rows="3" ></s:textarea></dd>
	</dl>
	<dl>
		<dt>详细介绍</dt>
		<dd><s:textarea name="buildinginfos.detailIntro"
			id="detailIntro" cols="50" rows="3"></s:textarea></dd>
	</dl>

	<dl>
		<dt>效果图路径</dt>
		<dd><s:file name="myFile" onchange="CheckExt(this)" /></dd>
	</dl>
	<dl>
		<dt></dt>
		<dd><s:if test="buildinginfos != null">
			<s:if test="buildinginfos.imagePath != null">
				<img width="40px" height="40px"
					src='images/<s:property value ="imageFileName" />' />
			</s:if>
		</s:if></dd>
	</dl>
	<ul class="search">
		<li><input type="image" id="quedingok" name="quedingok"
			value="确认" src="images/submit.gif" onclick="buildSubmit()" /></li>
	</ul>
	</fieldset>
	<span style="display: none"> <s:textfield id="buildId"
		name="buildinginfos.buildId"></s:textfield> </span>
</s:form></div>
<s:hidden id="hiddenqu"></s:hidden> <br />

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
<!-- #main end --></div>
<!-- #contents-body end --></div>
<!-- #contents end --></div>
<!-- #wrapper end --></div>
<script language="JavaScript" type="text/javascript"
	src="js/picturecheck.js"></script>
<script language="JavaScript" type="text/javascript" src="js/builded.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
<script>
//取得画面的信息保存下来

var cityid = document.getElementById("cityId").value;
var distidindex = document.getElementById("distId").selectedIndex;
var url = "getnewmdnm.action?cityId="+ cityid;
new Ajax.Updater('div_buildedit', url, {
	onLoading : function() {
	},
	onSuccess : function(response) {
		checkSession(response);
	},
	onFailure : function(request) {
		alert("程序有错误");
	},
	onComplete : function(request) {
		document.getElementById("distid").selectedIndex = distidindex;
	}
});
</script>

</body>
</html>