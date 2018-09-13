<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="js/prototype.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="js/menu/menu.js"></script>

	<title>大连远东计算机系统有限公司-内部网</title>
</head>
<body>
<div class="left" id="LeftBox">
	<div class="left01">
		<div class="left01_c">${session.userinfo.userName}，你好！</div>
	</div>
	<div class="left02">
	  <div class="left02down">
			<div class="left02down01"  onclick="show_menuB(10,this)"><a href="javascript:void(0)">
			  <div id="Bf010" class="left02down01_img"></div>公告信息</a></div>
			<div class="left02down01_xia none" id="Bli010">
				<ul>
					<li onClick="show_menu(10)" id="f010"><a href="javascript:void(0)" target="mainFrame">&middot;公告信息</a></li>
					<li onClick="show_menu(11)" id="f011"><a href="javascript:void(0)" target="mainFrame">&middot;简报发布</a></li>
				</ul>
			</div>
			<div class="left02down01"  onclick="show_menuB(30,this)"><a href="javascript:void(0)">
			  <div id="Bf030" class="left02down01_img"></div>用户管理</a></div>
			<div class="left02down01_xia none" id="Bli030">
				<ul>
					<li onClick="show_menu(30)" id="f030"><a href="javascript:void(0)" target="mainFrame">&middot;部门信息</a></li>
					<li onClick="show_menu(31)" id="f031"><a href="javascript:void(0)" target="mainFrame">&middot;用户基本信息</a></li>
					<li onClick="show_menu(32)" id="f032"><a href="javascript:void(0)" target="mainFrame">&middot;用户职位管理</a></li>
				</ul>
			</div>
			<div class="left02down01"  onclick="show_menuB(50,this)">
				<a href="javascript:void(0)">
					<div id="Bf050" class="left02down01_img"></div>
					会议室系统
				</a>
			</div>
			<div class="left02down01_xia none" id="Bli050">
				<ul>
					<!-- <li onClick="show_menu(50)" id="f050"><a href="main.jsp" target="mainFrame">&middot;菜单</a></li> -->
					<li onClick="show_menu(51)" id="f051"><a href="conferenceinit.action" target="mainFrame">&middot;会议室预约一览</a></li>
					<li onClick="show_menu(52)" id="f052"><a href="distributeUpdateAction.action" target="mainFrame">&middot;会议室管理</a></li>
				<li onClick="show_menu(53)" id="f053"><a href="staticsMain.action" target="mainFrame">&middot;会议室预约统计</a></li>
				</ul>
			</div>
		    <div class="left02down01" onClick="show_menuB(60,this)"><a href="javascript:void(0)">
			  <div id="Bf060" class="left02down01_img"></div>UI标准</a></div>
			<div class="left02down01_xia none" id="Bli060">
				<ul>
					<li onClick="show_menu(61)" id="f061"><a href="javascript:void(0)" target="mainFrame">&middot;检索等待</a></li>
					<!--<li onClick="show_menu(62)" id="f062"><a href="javascript:void(0)" target="mainFrame">&middot;弹出/拖动层</a></li>-->
					<li onClick="show_menu(63)" id="f063"><a href="javascript:void(0)" target="mainFrame">&middot;滚动一览</a></li>
					<li onClick="show_menu(64)" id="f064"><a href="javascript:void(0)" target="mainFrame">&middot;翻页一览</a></li>
                    <li onClick="show_menu(68)" id="f068"><a href="javascript:void(0)" target="mainFrame">&middot;翻页加滚动一览</a></li>
					<li onClick="show_menu(65)" id="f065"><a href="javascript:void(0)" target="mainFrame">&middot;独立编辑页面</a></li> 
					<li onClick="show_menu(66)" id="f066"><a href="javascript:void(0)" target="mainFrame">&middot;项目少编辑页面</a></li>         
                    <li onClick="show_menu(67)" id="f067"><a href="javascript:void(0)" target="mainFrame">&middot;选项卡/控件标准演示</a></li>
				</ul>
			</div>
		    <div class="left02down01" onClick="show_menuB(70,this)"><a href="javascript:void(0)">
		      <div id="Bf070" class="left02down01_img"></div>
		      项目管理</a></div>
			<div class="left02down01_xia none" id="Bli070">
				<ul>
                    <li onClick="show_menu(71)" id="f071"><a href="javascript:void(0)" target="mainFrame">&middot;项目调度管理</a></li>
                    <li onClick="show_menu(72)" id="f072"><a href="javascript:void(0)" target="mainFrame">&middot;管理项目一览</a></li>
                    <!--<li onclick="show_menu(73)" id="f073"><a href="javascript:void(0)" target="mainFrame">&middot;成员评价管理</a></li>-->
					<li onClick="show_menu(74)" id="f074"><a href="javascript:void(0)" target="mainFrame">&middot;项目状态</a></li>
					<li onClick="show_menu(75)" id="f075"><a href="javascript:void(0)" target="mainFrame">&middot;人员状态</a></li>
					<li onClick="show_menu(76)" id="f076"><a href="javascript:void(0)" target="mainFrame">&middot;项目履历</a></li>
                    <li onClick="show_menu(77)" id="f077"><a href="javascript:void(0)" target="mainFrame">&middot;客户信息管理</a></li>
				</ul>
			</div>
			<div class="left02down01" onClick="show_menuB(80,this)"><a href="javascript:void(0)">
		      <div id="Bf080" class="left02down01_img"></div>
		      考勤管理</a></div>
			<div class="left02down01_xia none" id="Bli080">
				<ul>
					<li onClick="show_menu(81)" id="f081"><a href="javascript:void(0)" target="mainFrame">&middot;个人年休统计</a></li>
					<li onClick="show_menu(82)" id="f082"><a href="javascript:void(0)" target="mainFrame">&middot;个人换休统计</a></li>
					<li onClick="show_menu(83)" id="f083"><a href="javascript:void(0)" target="mainFrame">&middot;漏考一览</a></li>
					<li onClick="show_menu(84)" id="f084"><a href="javascript:void(0)" target="mainFrame">&middot;请假申请</a></li>
					<li onClick="show_menu(85)" id="f085"><a href="javascript:void(0)" target="mainFrame">&middot;请假一览</a></li>
				</ul>
			</div>
            <div class="left02down01" onClick="show_menuB(82,this)"><a href="javascript:void(0)">
		      <div id="Bf082" class="left02down01_img"></div>
		      教育考试</a></div>
			<div class="left02down01_xia none" id="Bli082">
				<ul>
					<li onClick="show_menu(81)" id="f081"><a href="javascript:void(0)" target="mainFrame">&middot;权限管理</a></li>
					<li onClick="show_menu(82)" id="f082"><a href="javascript:void(0)" target="mainFrame">&middot;课程管理</a></li>
					<li onClick="show_menu(83)" id="f083"><a href="javascript:void(0)" target="mainFrame">&middot;考试管理</a></li>
					<li onClick="show_menu(84)" id="f084"><a href="javascript:void(0)" target="mainFrame">&middot;教材管理</a></li>
					<li onClick="show_menu(85)" id="f085"><a href="javascript:void(0)" target="mainFrame">&middot;试卷管理</a></li>
                    <li onClick="show_menu(86)" id="f086"><a href="javascript:void(0)" target="mainFrame">&middot;题库管理</a></li>
					<li onClick="show_menu(87)" id="f087"><a href="javascript:void(0)" target="mainFrame">&middot;成绩管理</a></li>
					<li onClick="show_menu(88)" id="f088"><a href="javascript:void(0)" target="mainFrame">&middot;系统维护</a></li>
					<li onClick="show_menu(89)" id="f089"><a href="javascript:void(0)" target="mainFrame">&middot;权限申请</a></li>
				</ul>
			</div>
	  		<div class="left02down01"><a onClick="show_menuB(84)" href="javascript:void(0)">
		      <div id="Bf084" class="left02down01_img"></div>
		      设备管理</a></div>
			<div class="left02down01"><a onClick="show_menuB(85)" href="javascript:void(0)">
		      <div id="Bf085" class="left02down01_img"></div>
		      资料管理</a></div>
			<div class="left02down01"><a onClick="show_menuB(86)" href="javascript:void(0)">
		      <div id="Bf086" class="left02down01_img"></div>
		      座位管理</a></div>
			<div class="left02down01"><a onClick="show_menuB(87)" href="javascript:void(0)">
		      <div id="Bf087" class="left02down01_img"></div>
		      门区管理</a></div>
			<div class="left02down01"><a onClick="show_menuB(88)" href="javascript:void(0)">
		      <div id="Bf088" class="left02down01_img"></div>
		      帐号管理</a></div>
			<div class="left02down01"><a onClick="show_menuB(89)" href="javascript:void(0)">
		      <div id="Bf089" class="left02down01_img"></div>
		      维基百科</a></div>
			<div class="left02down01"><a onClick="show_menuB(90)" href="javascript:void(0)">
		      <div id="Bf090" class="left02down01_img"></div>
		      公司规定</a></div>
		</div>
	</div>
	<!--<div class="left01">
		<div class="left01_c">安全退出</div>
	</div>-->
</div>
<div class="rrcc" id="RightBox">
	<div class="center" id="Mobile" onClick="show_menuC()"></div>
	<div class="right" id="li010">
		<div class="right01_yy">
        	<div class=" padding_top_2">
        		<span class="font_weight_br" id="nav01">会议室系统</span>
        		<img src="images/05.gif" />
        		<span class="font_weight_br" id="nav02">会议室预约一览</span></div>
        </div>
        <!--<div class="" style="margin-bottom:-2000px !important; padding-bottom:2000px !important;">-->
		<iframe name="mainFrame" width="100%" height="96%" frameborder="0" src="conferenceinit.action">该浏览器不支持框架！</iframe>
	    
	</div>
</div>
</body>
</html>