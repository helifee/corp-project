<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><s:property value="buildinginfo.buildName" /> -  楼盘详细</title>
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta content="<s:property value="buildinginfo.buildName" />" name="description" />
<meta content="<s:property value="buildinginfo.buildName" />" name="keywords" />

<link media="all" href="css/detail.css" type="text/css" rel="stylesheet" />

<meta content="MSHTML 6.00.2800.1627" name="GENERATOR" />
</head>

<body class="yj950-1">

<!--wrapper start-->
<div id="wrapper">

<span class="yj-guid"><a name="pagetop" id="pagetop"></a></span>

<hr class="separation" />

<!--contents start-->
<div id="contents">

	<div class="header_top">
	   <img alt="搜海网" src="images/logo.jpg"/>
	</div>

	<div id="contents-header">
		<div id="new-title">
			<p><img height="22" alt="" src="images/new_title_kanto.gif" width="241" /></p>
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
			<p>
				<span class="yj-guid">现在位置：</span>
				<a href="index.html">搜海</a> &gt; 
				<a href="prosearch.html">普通住宅(辽宁)</a> &gt; 
				<strong><s:property value="buildinginfo.buildName" /></strong>
			</p>
		</div>
		<!--/#cat-pass end-->
	
	</div>
	<!--/#contents-header end-->

	<div id="contents-body">
		<span class="yj-guid">
			<a id="contents-start" name="contents-start"></a>
			<img height="1" src="images/clear.gif" width="1" />
		</span> 
		<noscript>
			<p class="alert">
				<br />
				<a onclick="windowOpen(this);return false;" href="http://help.soohai.com/help/jp/realestate/realestate-51.html" 
				target="new"></a>。
			</p>
		</noscript>
	
		<!--main start-->
		<div id="main">
		<div id="sho-header">
		
		<div id="sh-title">
			<h2>
				<span class="title"><s:property value="buildinginfo.buildName" /></span>
			</h2>
		
			<div id="sh-update">
				<p><span class="date">更新日：</span>2009/08/11</p>
				<ul>
					<li class="no">没有更新</li>
				</ul>
			</div>
			<!--/#sh-update end-->
		
			<ul class="act">
				<li>
					<span id="btn_my_view_1" style="display: none">
						<a href="#"><img height="25" src="images/btn_view_mylist_v1.gif" width="120" /></a>
					</span>
					<span id="btn_my_add_1">
						<a onclick="" href="#"><img height="25" src="images/btn_add_mylist2_v1.gif" width="120" /></a>
					</span>
				</li>
			</ul>
			
		</div>
		<!--/#sh-title end-->
		  
		<div id="sh-summary">
		<div id="shs-left">
		
		<div id="shs-caption"><s:property value="buildinginfo.buildName" />的基本情况一览</div>
		
		<div id="place">
			<span class="title">位置</span>
			<span class="content"><s:property value="buildinginfo.address" /></span>
		</div>
		
		<div id="kotsu">
			<span class="title">交通</span>
			<span class="content">6路；大连-旅顺公交车；202路；轻轨4号线 </span>
		</div>
		
		<div id="price">
			<span class="title">价格</span>
			<span class="content">
				<s:property value="buildinginfo.startingPrice" />元起价 均价
				<s:property value="buildinginfo.evenPrice" />元
			</span>
		</div>
		
		<div id="bld-total">
			<span class="title">剩余套数</span>
			<span class="content"><s:property value="buildinginfo.surplusNumber" />套</span>
		</div>
		
		<div id="cd">
			<dl>
				<dt>楼盘的中意之处</dt>
				<dd>
					<ul><!-- 0 -->
						<li class="cd-1"><img alt="" src="images/showPOIconG.gif" /> </li>
						<li class="cd-2"><img alt="" src="images\showPOIcon(1)G.gif" /> </li>
						<li class="cd-3"><img alt="" src="images\showPOIcon(2).gif" /> </li>
						<li class="cd-4"><img alt="" src="images\showPOIcon(3).gif" /> </li>
						<li class="cd-5"><img alt="" src="images\showPOIcon(4).gif" /> </li>
						<li class="cd-6"><img alt="" src="images\showPOIcon(5)G.gif" /> </li>
						<li class="cd-7"><img alt="" src="images\showPOIcon(6)G.gif" /> </li>
						<li class="cd-8"><img alt="" src="images\showPOIcon(7)G.gif" /> </li>
						<li class="cd-9"><img alt="" src="images\showPOIcon(8).gif" /> </li>
						<li class="cd-10"><img alt="" src="images\showPOIcon(9).gif" /> </li>
						<li class="cd-11"><img alt="" src="images\showPOIcon(10).gif" /> </li>
						<li class="cd-12"><img alt="" src="images\showPOIcon(11)G.gif" /> </li>
					</ul>
				</dd>
			</dl>
		</div>
		
		</div>
		<!--/#shs-left end-->
				  
		<div id="shs-right">
			<p><img height="49" alt="" src="images/icn_term_state_9.gif" width="154" /></p>
			<ul>
			  <li><a onclick="windowOpen(this);return false;" href="video.html" target="sho2">
				  <img height="41" alt="" src="images/btn_add_mr.gif" width="193" /></a></li>
			  <li><a href="shapan.html"><img  src="images/btn_shapan.gif" width="193" height="41" border="0" /></a></li>
			</ul>
		</div>
		<!--/#shs-right end-->
		
		</div>
		<!--/#sh-summary end-->
		</div>
		<!--/#sho-header end-->
		
		<div id="sho-nav">
			<ul>
				<li><img height="36" src="images/nav_dtl_top.gif" width="137" /></li>
				<li><a href="floorplandetail.html"><img class="nav-off" height="36" alt="" 
					src="images/nav_dtl_madori_off.gif" width="136" /></a></li>
				<li><a href="enviroument.html"><img class="nav-off" height="36" alt="" 
					src="images/nav_dtl_env_off.gif" width="137" /></a></li>
			</ul>
		</div>
		<!--/#sho-nav end-->
		
		<div id="sho-content">
		<h3>楼盘详细</h3>
		<p class="lead"><strong>山海之间，温泉涤荡，养生殿堂．．．．．． </strong></p>
		<div id="summary">
		<div id="s-left">
		<div class="property-image-0">
		<div id="image-big">
	<!--<div class="image-big-p">
			<table cellspacing=0 cellpadding=0>
				<tbody>
				<tr>
					<td>
	-->
					<img id="house0" height="350px" width="350px" alt="" src='images/<s:property value ="imagePath" />' />
					
		<!--      </td>
				</tr>
				</tbody>
			</table>
		</div>
		-->
		<!--/.image-big-p end-->
		</div>
		<!--/.image-big end-->
		
		<p id="image-caption">效果图<br /></p>
		<p id="thumbnail-summary"><s:property value="buildinginfo.detailIntro" /><br /></p>
		</div>
		<!--/#property-image-0 end-->
		
		</div>
		<!--/#s-left end-->
		
		<div id="s-right">
		<div id="s-sch">
			<h4><img height="16" alt="" src="images/title_dtl_r_1.gif" width="201" /></h4>
			<h5>开盘公告</h5>
			<p><s:property value="buildinginfo.notice" /></p>
		</div>
		<!--/#s-sch end-->
		
		<div id="s-toi">
		<h4><img height="16" alt="" src="images/title_dtl_r_3.gif" width="201" /></h4>
		<div id="st-content">
		<div id="st-left">
			<p><s:property value="buildinginfo.salesCompany" /></p>
			<p class="tel">全国销售热线：400-600-1510</p>
			<p class="tel">大连地区销售热线：0411-84338333/84339333</p>
			<ul>
				<li>营业时间：周一至周五 8:30--17:00  </li>
			</ul>
		</div>
		<!--/#st-left end-->
		
		<div id="st-right">
		<ul>
		  <li><a href="freedoc1.html"><img height="41" alt="" src="images/btn_docreq.gif" width="193" /></a></li>
		</ul>
		</div>
		<!--/#st-right end-->
		
		</div>
		<!--/#st-content end-->
		</div>
		<!--/#s-toi end--> 
		</div>
		<!--/#s-right end-->
		 
		<div id="s-right">
		<h4><img height="16" alt="" src="images/title_dtl_r_5.gif" width="201" /></h4>
		<h4>&nbsp;</h4>
			<table align="center">
				<tr>
					<td width="84"  class="louxiang">占地面积</td>
					<td width="138" class="lou"> 159813.12平方米</td>
					<td width="80"  class="louxiang">建筑面积</td>
					<td width="198" class="lou">331130.55平方米</td>
				</tr>
				<tr>
					<td class="louxiang">总 套 数</td>
					<td class="lou">3000套</td>
					<td class="louxiang">楼层情况</td>
					<td class="lou">67栋，2-25层</td>
				</tr>
				<tr>
					<td class="louxiang">交房时间</td>
					<td class="lou">2010.06</td>
					<td class="louxiang">结构类型</td>
					<td class="lou">框架剪力墙</td>
				</tr>
				
				<tr>
					<td class="louxiang">主力户型</td>
					<td class="lou">46-192平方米</td>
					<td class="louxiang">朝　　向</td>
					<td class="lou">南北</td>
				</tr>
				<tr>
					<td class="louxiang">绿 化 率</td>
					<td class="lou">40%</td>
					<td class="louxiang">停 车 位</td>
					<td class="lou">1700个</td>
				</tr>
				<tr>
					<td class="louxiang">物业公司</td>
					<td class="lou">第一太平戴维斯</td>
					<td class="louxiang">销售许可</td>
					<td class="lou">大房预许字第20080014号</td>
				</tr>
				<tr>
					<td class="louxiang">付款方式</td>
					<td class="lou">一次性付款、银行按揭</td>
					<td class="louxiang">容积率</td>
					<td class="lou">1.76</td>
				</tr>
				<tr>
					<td class="louxiang">装修状况</td>
					<td class="lou">毛坯</td>
					<td class="louxiang">物业费</td>
					<td class="lou">1.5元/平方米•月</td>
				</tr>
				<tr>
					<td class="louxiang">临海</td>
					<td class="lou">50-150米</td>
					<td class="louxiang">建筑类别</td>
					<td class="lou">别墅、洋房、高层、小高层、多层</td>
				</tr>
			</table>
		 
		</div>
		 
		</div>
		<!--/#summary end-->
		
		<ul class="nav-page">
		  <li>
			<img height="9" alt="↑" src="images/icn_pagetop.gif" width="9" />
			<a href="#pagetop">页首</a>
		  </li>
		</ul>
		
		<div id="summary3">
		<h4><img height="29" alt="" src="images/resize.gif" width="930" /></h4>
		
		<div class="parts1">
		<h5>中拥地产选择与业内品牌公司联手强势打造中拥·蓝天下，以广东华方工程公司的专业规划设计，为客户带来更舒适的居住感受；HZS豪张思的园区景观规划，将山与海的自然风貌融入身边景致；第一太平戴维斯用无微不至的物业服务，更加提升您的尊贵身份。</h5>
		<p class="img"><img alt="" src="images\resize(1).jpg" /></p>
		<p class="caption"></p>
		<p>会馆效果图（合成效果图与实际情况多少有些差别）</p>
		</div>
		<!--/.parts1 end-->
		
		<div class="parts1">
		<h5>中拥·蓝天下扼守旅顺南路要隘，202路快轨沿线开工、大学城设站在此加快了城市前进的步伐。占据老城区的成熟便利、毗邻大医、大外大学城渊远文脉、投资保值空间无限；坐享旅顺南路软件产业带的辐射价值，与高知阶层为邻耳濡目染、受益无穷。</h5>
		<p class="img"><img alt="" src="images\resize11.jpg" /></p>
		<p class="caption"></p>
		<p>东区效果图（合成效果图与实际情况多少有些差别）</p>
		</div>
		<!--/.parts1 end-->
		
		<div class="parts1">
		<h5>国家级自然景观：南子弹库、黄金山海水浴场、黄金山炮台、旅顺港、黄渤海分界线、白玉山、老铁山灯塔、友谊公园、望台炮台、203高地、规划中的旅顺滨海路海之恋公园等。</h5>
		<p class="img"><img alt="" src="images\resize12.jpg" /></p>
		<p class="caption"></p>
		<p>高层效果图（合成效果图与实际情况多少有些差别）</p>
		</div>
		<!--/.parts1 end-->
		 
		</div>
		<!--/#summary3 end-->
		
		<ul class="nav-page">
		  <li><img height="9" alt="↑" src="images/icn_pagetop.gif" width="9" /><a href="#pagetop">页首</a></li>
		</ul>
		
		</div>
		<!--/#sho-content end-->
		
		<div id="sho-toi">
			<h4><img height="32" alt="联系方式" src="images/title_toi.gif" width="930" /></h4>
		<div id="sht-content">
		<div id="sht-left">
		<p><s:property value="buildinginfo.salesCompany" /></p>
		<p class="tel">全国销售热线：400-600-1510</p>
		<p class="tel">大连地区销售热线：0411-84338333/84339333</p>
		<ul>
			<li>营业时间：周一至周五 8:30--17:00</li>
		</ul>
		</div>
		<!--/#sht-left end-->
		
		<div id="st-right">
		<ul></ul>
		</div>
		<!--/#st-right end-->
		
		<div id="sht-right">
			<ul>
				<li></li> 
				<li><a href="freedoc1.html"><img height="41" alt="" src="images/btn_docreq.gif" width="193" /></a></li>
			</ul>
			<ul>
				<li>
					<span id="btn_my_view_2" style="display: none">
						<a href="#"><img height="25" alt="查看我的房产" src="images/btn_view_mylist_v1.gif" width="120" /></a>
					</span>
					<span id="btn_my_add_2">
						<a onclick="" href="#"><img height="25" alt="加入我的欲购房产" src="images/btn_add_mylist2_v1.gif" width="120" /></a>
					</span>
				</li>
			</ul>
		</div>
		<!--/#sht-right end-->
		
		</div>
		<!--/#sht-content end-->
		
		</div>
		<!--/#sho-toi end-->
		
		<ul class="nav-page">
		  <li><img height="9" alt="↑" src="images/icn_pagetop.gif" width="9" /><a href="#pagetop">页首</a></li>
		</ul>
		
		<!--footer start-->
		<div id="footer">
		 
		<address>
		<br />
		<a href="#">关于我们</a> ┊ 广告服务 ┊ <a href="#">法律声明</a> ┊ <a href="#">联系我们</a> ┊ 招聘信息
		</address>
		 
		<p class="summary STYLE1">全国销售热线：400-600-1510<br />
		大连地区销售热线：0411-84338333/84339333<br />
		海景房地产经纪(大连)有限公司 版权所有<br />
		技术支持：大连远东计算机系统有限公司</p>
		<p>
		<img src="images/s2592252157546.gif" name="" alt="" border="0" height="1" width="1" />
		</p>
		</div>
		<!--/#footer end-->
		
		</div>
		<!-- #main end -->
	
	</div>
	<!-- #contents-body end -->

</div>
<!-- #contents end -->

</div>
<!-- #wrapper end -->

</body>

</html>
 
 

