<%--
 * @(#)ManageGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/scriptaculous/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	<script type="text/javascript">
	var sz;
	
	function resize(size){
		sz = size;
		if (size == 2) {
			$('content').removeClassName('w_300').addClassName('w_600');
			$('Narrow').hide();
			$('Wide').show();
			setHeight(45);
		} else if (size == 1) {
			$('content').removeClassName('w_600').addClassName('w_300');
			$('Wide').hide();
			$('Narrow').show();
			setHeight(100);
		}
	}

	function highlight(){
		if(sz == 1){
			new Effect.Move($('ani'), {
				duration: 2,
				x: 60,
				afterFinish: function(){
					new Effect.Move($('ani'), {
						duration: 2,
						x: -60
					});
				}
			});
		} else {
			new Effect.Move($('bni'), {
				duration: 2,
				x: 65,
				afterFinish:function(){
					new Effect.Move($('bni'), {
						duration: 2,
						x: -65
					});
				}
			});
		}
	}

	function init(){
		$('ani').setStyle({
			textDecoration: 'none',
			color:'#ff0000'
		});
		$('bni').setStyle({
			textDecoration: 'none',
			color:'#ff0000'
		});
		new PeriodicalExecuter(highlight, 5); 
	}
	
	</script>
<base target="main"> 
<title>规章制度</title>
</head>
<body scroll="no" onload="init();">
<div id="content" class="w_300">
	<div id="Narrow" class="span-7 padding_top_10">
		<ul class="prepend-1">
			<li><a href="http://www.yds.yd/rules/RULES_REGUL.jsp">公司基本规定</a></li>
			<li><a href="http://www.yds.yd/rules/RULES_PERSONAL.jsp" class="margin_right_10">个人信息保护</a><a href="http://www.yds.yd/rules/pipa/PMS-GD-01-01-cn.pdf" id="ani">个人信息保护方针</a></li>
			<li><a href="http://www.yds.yd/rules/RULES_OTHERS.jsp">公司其他规定</a></li>
		</ul>
	</div>
	<div id="Wide" class="span-15 padding_top_10">
		<div class="span-1">&nbsp;</div>
		<div class="span-4"><a href="http://www.yds.yd/rules/RULES_REGUL.jsp">☆公司基本规定</a></div>
		<div class="span-7"><a href="http://www.yds.yd/rules/RULES_PERSONAL.jsp" class="margin_right_10">☆个人信息保护</a><a href="http://www.yds.yd/rules/pipa/PMS-GD-01-01-cn.pdf" id="bni">个人信息保护方针</a></div>
		<div class="float_l"><a href="http://www.yds.yd/rules/RULES_OTHERS.jsp">☆公司其他规定</a></div>
	</div>
</div>
</body>
</html>