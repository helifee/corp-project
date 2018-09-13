<%@page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.ResourceBundle"%> 
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<meta http-equiv="X-UA-Compatible" content="IE=8; IE=10" />
<title>鑫乐居ERP</title>
<%ResourceBundle res = ResourceBundle.getBundle("application"); %>
<link rel="stylesheet" type="text/css" href="css/index.css" />
<link rel="stylesheet" type="text/css" href="css/icon.css" />

<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/application.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="page/App/divCenter.js"></script>
<script type="text/javascript">
	var ctx = '${pageContext.request.contextPath}';
</script>
<script type="text/javascript" src="page/App/menu.js"></script>
<script src="js/jquery.cookie.js"></script>
<style type="text/css">
   .box {
		display: table-cell;
		*display: block;*font-size: 175px;  
		*font-family:Arial;  
		width:200px;border: 0px solid #eee; float:right; height:80px;
    }  
    
    .bheight{
        margin-top:25px;
       
    }
    html,body{
    	overflow-y:hidden;
    	border-width:0px !important;
    }
</style>
</head>
<body>
	    <div id="toolbar" class="layout_center f_h">
	        <div id="about" class="f_r f_h"><a href="javascript:void(0)" onclick="aboutAs()">关于</a></div>
	        <div id="logoff" class="f_r f_h"><a href="javascript:void(0);">注销</a></div>
	        <div id="editpassword" class="f_r f_h"><a href="javascript:void(0)" onclick="updatePassword()">修改密码</a></div>
	        <div id="operator" class="f_r f_h">当前操作员：${sessionScope.LOGININFO.userDTO.realName}</div>
	        <div id="messagenumber" class="f_r f_h red">0</div>
	        <div id="message" class="f_r f_h"><img src="images/messages1.png" class="toolbar_icon middle"/></div>
	        <div id="hideLogo" class="f_r f_h"><img src="images/min.png" class="toolbar_icon middle min"/><img src="images/max.png" class="toolbar_icon middle hide max"/></div>
	    </div>
	
	<div class="zero"></div><!--加一个空的元素，否则下面的float:right在firefox中显示出错-->
	
	<!--logo区和搜索区-->
	<div id="logoContainer" class="layout_center clearfix">
	    <div id="company" class="f_l f_h wrap"><img src="images/logo.jpg"></div>

	</div>
	
	<div class="zero"></div><!--加一个空的元素，否则下面的float:right在firefox中显示出错-->
	
	<!--菜单区-->
	<div id="menuContainer" class="f_w">
	    <div id="menubar" class="layout_center f_h">
	        <div id="module" class="f_l wrap">
	            <div class="moduleId hide"></div>
	            <div class="f_l f_h middle moduleName"></div>
	            <img src="./images/moduledown.png" class="moduleDown f_r middle"/>
	        </div>
	        <div id="menuList" class="f_l"></div>
	    </div>
	</div>
	<div class="zero"></div><!--加一个空的元素，否则下面的float:right在firefox中显示出错-->
	<!--导航区-->
	<div id="navContainer"  class="layout_center wrap">
	    <div id="navIconContainer" class="f_l f_h wrap">
	        <img src="./images/position.png" class="navIcon  middle"/>
	    </div>
	    <div class="f_l middle" >当前位置：</div>
	    <div id="nav" class="f_l middle"></div>
	</div>
	<div class="zero"></div><!--加一个空的元素，否则下面的float:right在firefox中显示出错-->
	<div id="erp_body" class="layout_center">
	    <iframe  id="main" frameborder="0" style="overflow-y:hidden;">
	    </iframe>
	</div>
	<div id="moduleList" class="hide"></div>
	<div id="menuItemList" class="hide"></div>
	<script type="text/javascript">
		$(function(){
			
			$("#logoContainer img").on('load',function(){
				$(this).width(($(this).width()*$(this).parent().height())/$(this).height());
				$(this).height($(this).parent().height());
			});
			
			var bro=$.browser;
			if(bro.msie) {
				var version = bro.version;
				if(version <= 7) {
					//window.location = "versionErr.html";
				}
			}
			
			$("#logoff a").click(function(){
				setCookie({"moduleId":0,"menuId":-1,"menuItemId":-1});
			});

			$("#hideLogo").click(function(){
		        var oMin=$(this).find("img.min");
		        var oMax=$(this).find("img.max");
		        var oLogo=$("#logoContainer");
		        var oNav=$("#navContainer");
		        if(oMin.is(":visible")){
		            oMin.hide();
		            oMax.show();
		            oLogo.hide(1000,function(){		            	
		            	//$('#main').height($(window).height() - $('#main').offset().top-2);
		            	var mainHeight = $(window).height() - $('#main').offset().top-2;
						$('#main').height(mainHeight);
						$('#main').css('min-height', mainHeight + 'px');
						$('#erp_body').height($('#main').height());
		            	$('#logoff,#message,#hideLogo').show().children().css('color','#fff');
		            	if($('#main')[0].contentWindow.resizelist){
		            		//异步调用js方法
							var timer = setTimeout(function(){
								$('#main')[0].contentWindow.resizelist();
								clearTimeout(timer);
							},0);
						}
						if(hideLogTimer){
							clearTimeout(hideLogTimer);
						}
		            });
					var timer = setTimeout(function(){
							$('#toolbar').children().hide();
							clearTimeout(timer);
						},500);
		            //oNav.hide();  
		        }else{
		            oMax.hide();
		            oMin.show();
		            oLogo.show(1000,function(){
		            	//$('#main').height($(window).height() - $('#main').offset().top-2);
		            	var mainHeight = $(window).height() - $('#main').offset().top-2;
						$('#main').height(mainHeight);
						$('#main').css('min-height', mainHeight + 'px');
						$('#erp_body').height($('#main').height());
		            	var timer = setTimeout(function(){
							$('#toolbar').children().show();
							clearTimeout(timer);
						},50);
		            	if($('#main')[0].contentWindow.resizelist){
		            		//异步调用js方法
							var timer = setTimeout(function(){
								$('#main')[0].contentWindow.resizelist();
								clearTimeout(timer);
							},0);
						}
		            });
		            $('#toolbar').find('*').not('#messagenumber').css('color','#888');
		            //oNav.show();
		        }
		    });
			
			var logoutUrl = "<%=res.getString("casServerUrl")%>/logout";
			$("#logoff a").attr("href", logoutUrl);
			initMenu('${funcMapJson}');
			//异步读取未读消息
			$.post("App!queryUnReadMsgCount4Jsion.do", {}, function(data){
				var count = eval(data).unReadMsgCount;
				$("#messagenumber").text(count+"");
			});
			
			navFunction();
			
			var hideLogTimer = setTimeout(function(){
				$("#hideLogo").click();
			},500);
			
			$('#main').height($(window).height() - $('#main').offset().top-2);
			$('#erp_body').height($('#main').height());
			
			$(window).resize(function(){
				//$('#main').height($(window).height() - $('#main').offset().top-2);
            	var mainHeight = $(window).height() - $('#main').offset().top-2;
				$('#main').height(mainHeight);
				$('#main').css('min-height', mainHeight + 'px');
				$('#erp_body').height($('#main').height());
				if($('#main')[0].contentWindow.resizelist){
					var timer = setTimeout(function(){
						$('#main')[0].contentWindow.resizelist();
						clearTimeout(timer);
					},0);
				}
			});
		});
		
		$("#main").load(function(){
			$(window).resize();
			if($('#main')[0].contentWindow.resizelist){
				$('#main')[0].contentWindow.resizelist();
			}
		});

		function setCookie(ids){//将模块id存入cookie。
	        $.cookie("moduleId", ids.moduleId);
	        $.cookie("menuId",ids.menuId);
	        $.cookie("menuItemId",ids.menuItemId);
    	}
    	
    	
		//其他页面调用该方法
	    function showNav1(moduleId,menuId,menuItemId){//在导航区显示内容（先清空原有内容）
	        var seprator=" > ";
	        var moduleName=menuData[moduleId].moduleName;
	        var menuName;
	        var menuItemName;
	        oNav.html("");
	        $("<span></span>").html(moduleId).appendTo(oNav).addClass("moduleId").addClass("hide");
	        $("<span></span>").html(moduleName).appendTo(oNav).addClass("moduleName");
	        if( menuId!=-1){
	            menuName=menuData[moduleId].menu[menuId].menuName;
	            $("<span></span>").html(menuId).appendTo(oNav).addClass("menuId").addClass("hide");
	            $("<span></span>").html(seprator+menuName).appendTo(oNav).addClass("menuName");
	        }
	        if(menuItemId!=-1){
	            menuItemName=menuData[moduleId].menu[menuId].menuItems[menuItemId].menuItemName;
	            $("<span></span>").html(menuItemId).appendTo(oNav).addClass("menuItemId").addClass("hide");
	            $("<span></span>").html(seprator+menuItemName).appendTo(oNav).addClass("menuItemName");
	        }
	    }
    
        //点击收藏里的图片或者链接时，当前位置修改正确信息 
	    function getMenuId(menuname)
	    {

	        for(var i = 1 ; i < menuData.length; i++)
	        {
	           for(var j = 0 ; j < menuData[i].menu.length; j++)
	           {
	               for(var n = 0 ; n < menuData[i].menu[j].menuItems.length; n++)
	               {
	                 if(menuData[i].menu[j].menuItems[n].menuItemName == menuname)
	                 {
	                    showNav1(i,j,n);
	                    return;
	                  }
	              
	               }
	           }
	        }
	    }
        
        function navFunction() {
        	
        	var moduleId = "${requestScope.moduleId}";
			
			var moduleIndex = -1;
			
			if(moduleId != "") {
				for(var i = 0 ; i < menuData.length; i++) {
					if(menuData[i].moduleId == moduleId) {
						moduleIndex = i;
					}
				}
				if(moduleIndex != -1) {
					clickModule(moduleIndex);
				}else {
					window.location.href=window.location.protocol + "//" + window.location.hostname +":100/OAAuthorError.html"
				}
			}
			
			navFunc(moduleIndex);
			
        }
        
        function clickModule(moduleIndex) {
        	$("#moduleList").find("td").each(function() {
				if(moduleIndex.toString() == $(this).find(".moduleId").eq(0).text()) {
					$(this).click();
					return;
				}
			});
        }
        
        function navFunc(moduleIndex) {
        	
        	var funcId = "${requestScope.funcId}";
			
        	if(funcId != "" && moduleIndex != -1) {
        		var menuIndex = -1;
    			var menuItemIndex = -1;
        		var module = menuData[moduleIndex];
				 o:for(var i = 0 ; i < module.menu.length; i++) {
					 var menu = module.menu[i];
					 for(var j = 0 ; j < menu.menuItems.length; j++){
		                 if(menu.menuItems[j].funcId == funcId){
		                	 menuIndex = i;
		                	 menuItemIndex = j;
		                	 break o;
		                  }
		             }
				 }
        		 if(menuIndex != -1 && menuItemIndex != -1) {
				 	clickFunc(menuIndex, menuItemIndex);
        		 }
			}
        }
        
        function clickFunc(menuIndex, menuItemIndex) {
        	
        	$("#menuList").find("td.menu").each(function() {
        		if(menuIndex.toString() == $(this).find(".menuId").eq(0).text()) {
        			$(this).mouseover();
        		}
        	});
        	
        	$("#menuItemList").find("td").each(function() {
        		if(menuIndex.toString() == $(this).find(".menuId").eq(0).text()
        			&& menuItemIndex.toString() == $(this).find(".menuItemId").eq(0).text()) {
					$(this).click();
					return;
				}
        	});
        }
        
        function updatePassword() {
        	openwindow('User!editPassword.do');
        }
        
        function aboutAs() {
        	window.open("page/App/aboutAs.jsp","关于我们","height=300, width=500, top=200, left=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
        }
        
	</script>
	<script type="text/javascript" src="page/App/divCenter.js"></script>
</body>
</html>