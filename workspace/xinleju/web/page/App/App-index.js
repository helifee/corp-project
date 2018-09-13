function initMenu(funcMapJson){
	var menuData = isNotEmpty(funcMapJson) ? eval("(" + funcMapJson + ")") : [];
	alert(funcMapJson);
	var oLogoBar=$("#erp_head_logoBar");//logo栏
	var oLogo=$("img.logo");//logo
	var oTopButton=$("span.topButton");//顶部按钮
	var oMenuBar=$("#erp_head_menuBar");//菜单条
	var oModule=$("#erp_head_menuBar_module");//当前显示的模块，点击模块清单中的某个模块时，将该模块置为当前模块
	var oModuleList=$("#erp_head_ModuleList").hide();//模块清单，在鼠标放在模块上时显示
	var oMenuList=$("#erp_head_menuBar_menuList");//菜单条上的菜单集合，在单击模块清单中的某个模块时，更新菜单集合
	var oMenuItemList=$("#erp_head_MenuItemList").hide();//菜单列表，点击菜单列表中的某个菜单，在“内容”区显示其对应的url
	var oNav=$("#erp_head_nav");//导航区
	var oUp=null;//上箭头，点击后隐藏表头区域
	var oDown=null;//下箭头，点击后显示表头区域
	var oIframe=$("#erp_body_iframe");//显示HTML文件的区域
	oMenuBar.addClass("menuBackground");
	oModule.addClass("moduleBackground");
	var ids=getCookie();
	showModuleAndMenu(ids.moduleId);//显示模块名及其菜单
	showNav(ids.moduleId,ids.menuId,ids.menuItemId);//在导航栏显示模块名称
	createModuleList();//创建模块清单（但不显示）
	if (isNormal(menuData[ids.moduleId].goNewPage)){
		loadHtmlFileToNewPage(menuData[ids.moduleId].url);
	} else {
		loadHtmlFile(menuData[ids.moduleId].url);
	}
	//单击logo返回首页
	oLogo.click(function(){
		var ids={"moduleId":0,"menuId":-1,"menuItemId":-1};
		showModuleAndMenu(ids.moduleId);
		showNav(ids.moduleId);
		loadHtmlFile(menuData[ids.moduleId].url);
		setCookie(ids);
	});

	function showModuleAndMenu(moduleId){//显示模块名及该模块下的菜单
		//显示模块名称
		oModule.html("");
		var oModuleId=$("<span></span>")
		.html(moduleId)
		.addClass("hide")
		.addClass("moduleId")
		.appendTo(oModule);
		var moduleName=menuData[moduleId].moduleName;
		var oModuleName=$("<span></span>")
		.addClass("moduleName")
		.html(moduleName+"&nbsp;∨")
		.appendTo(oModule);

		//显示该模块所属菜单列表
		oMenuList.html("");
		var oTable=$("<table></table>")
		.css("width","100%")
		.css("height","100%")
		.appendTo(oMenuList);
		var oTr=$("<tr></tr>")
		.appendTo(oTable);
		if(menuData[moduleId].menu){
			$.each(menuData[moduleId].menu,function(i,v){
				var oTd=$("<td></td>")
				.css("text-align","center")
				.addClass("menu")
				.appendTo(oTr);
				$("<span></span>")
				.addClass("menuId")
				.addClass("hide")
				.html(i)
				.appendTo(oTd);
				$("<span></span>")
				.addClass("menuName")
				.html(v.menuName)
				.appendTo(oTd);
			});
		}
		var oTdUpDown=$("<td id='erp_head_updown' ></td>")//显示/隐藏logo的按钮（图片）
		.css("text-align","right")
		.css("vertical-align","middle")
		.css("padding-right","5px")
		.appendTo(oTr);
		oUp=$("<img src='" + ctx + "/images/index/up.png'/>")
		.attr("id","erp_head_up")
		.css("cursor","pointer")
		.addClass("icon")
		.appendTo(oTdUpDown);
		oDown=$("<img src='" + ctx + "/images/index/down.png'/>")
		.attr("id","erp_head_down")
		.css("cursor","pointer")
		.addClass("icon")
		.appendTo(oTdUpDown);
		if(oLogoBar.is(":visible")){
			oUp.show();
			oDown.hide();
		}else{
			oUp.hide();
			oDown.show();
		}
	}

	/*               得到模块、菜单、菜单项的id和名称          */

	function getModuleIdNow(){//得到当前显示的模块id
		return parseInt(oNav.find("span.moduleId").html());
	}
	function getModuleNameNow(){//得到当前显示的模块的名称
		return oNav.find("span.moduleName").html();
	}
	function getMenuIdNow(){//得到当前显示的菜单id
		return parseInt(oNav.find("span.menuId").html());
	}
	function getMenuNameNow(){//得到当前显示的菜单的名称
		return oNav.find("span.menuName").html();
	}
	function getMenuItemIdNow(){//得到当前显示的菜单项id
		return parseInt(oNav.find("span.menuItemId").html());
	}
	function getMenuItemNameNow(){//得到当前显示的菜单项的名称
		return oNav.find("span.menuItemName").html();
	}
	function getModuleId(oTd){//模块清单上，根据模块所在的td得到该模块的序号
		return parseInt(oTd.find("span.moduleId").html());
	}
	function getModuleName(oTd){//模块清单上，根据模块所在的td得到该模块的名称
		return oTd.find("span.moduleName").html();
	}
	function getMenuId(oTd){//根据菜单所在的td得到该菜单的序号
		return parseInt(oTd.find("span.menuId").html());
	}
	function getMenuName(oTd){//根据菜单所在的td得到该菜单的名称
		return oTd.find("span.menuName").html();
	}
	function getMenuItemId(oTd){//根据菜单项所在的td得到该菜单项的序号
		return parseInt(oTd.find("span.menuItemId").html());
	}
	function getMenuItemName(oTd){//根据菜单项所在的td得到该菜单项的名称
		return oTd.find("span.menuItemName").html();
	}
	function getMenuIdByItem(oTd){//根据菜单项所在的td得到该菜单项所属菜单的序号
		return parseInt(oTd.find("span.menuId").html());
	}
	function getMenuNameByItem(oTd){//根据菜单项所在的td得到该菜单项所属菜单的名称
		return oTd.find("span.menuName").html();
	}


	/*       模块相关操作：经过/离开模块名称、创建模块列表、经过/离开/点击模块项名称时的操作               */

	oModule.mouseover(function(){//鼠标经过模块名称时
		$(this).removeClass("moduleBackground");
		$(this).addClass("moduleBackground_mousemove");
		createModuleList();
		oModuleList.show();
		//oModuleList.show();
	});

	oModule.mouseout(function(e){//鼠标离开模块名称时
		$(this).removeClass("moduleBackground_mousemove");
		$(this).addClass("moduleBackground");
		var x= e.pageX;
		var y= e.pageY;
		var x1=oModule.offset().left;
		var x2=x1+oModule.width();
		var y1=oModule.offset().top;
		var y2=oModuleList.offset().top+oModuleList.height();
		if(x<x1 || x>x2 || y<y1 || y>y2){
			oModuleList.hide();
		}
	});

	//单击当前模块名称时，返回该模块的首而
	oModule.click(function(){
		if (isNormal(menuData[ids.moduleId].goNewPage)){
			loadHtmlFileToNewPage(menuData[ids.moduleId].url);
		} else {
			var moduleId=getModuleIdNow();//得到当前显示的模块的id
			showNav(moduleId); //显示导航内容
			loadHtmlFile(menuData[moduleId].url);//加载模块对应的HTML文件
			setCookie({"moduleId":moduleId,"menuId":-1,"menuItemId":-1});
			oModuleList.hide();
		}
	});


	oModuleList.mouseout(function(e){//鼠标离开模块下拉列表时
		var x= e.pageX;
		var y= e.pageY;
		var x1=oModule.offset().left;
		var x2=x1+oModule.width();
		var y1=oModule.offset().top;
		var y2=oModuleList.offset().top+oModuleList.height()-2;
		if(x<x1 || x>x2 || y<y1 || y>y2){
			oModuleList.hide();
		}
	});

	oModuleList.delegate("td","mouseover",function(){//鼠标经过模块项名称时
		$(this).addClass("moduleItemBackground_mouseMove");
	});

	oModuleList.delegate("td","mouseout",function(){//鼠标离开模块项名称时
		$(this).removeClass("moduleItemBackground_mouseMove");
	});

	function createModuleList(){//生成模块列表的界面
		oModuleList.html("");
		var moduleLeft=oModule.offset().left;
		var moduleTop=oModule.offset().top+oModule.height()+3;
		var moduleWidth=oModule.width();
		oModuleList.css("position","absolute")
		.css("top",moduleTop)
		.css("left",moduleLeft)
		.css("width",moduleWidth)
		.addClass("moduleList");
		var oTable=$("<table></table>").appendTo(oModuleList);
		$.each(menuData,function(i,v){
			var oTr=$("<tr></tr>").appendTo(oTable);
			var oTd=$("<td></td>").appendTo(oTr)
			.css("vertical-align","middle")
			.css("text-align","left");
			var oNumber=$("<span></span>")
			.html(i)
			.addClass("hide")
			.addClass("moduleId")
			.appendTo(oTd);
			var oModuleName=$("<span></sapn>")
			.html(v.moduleName)
			.addClass("moduleName")
			.appendTo(oTd);
			if(i>0){
				oTd.addClass("dashed");
			}
		});
	};//function createModuleList(){

	oModuleList.delegate("td","click",function(){//鼠标单击模块项名称时，更换模块及其相应的菜单
		oModuleList.hide();
		var moduleIdNow=getModuleIdNow();//得到当前显示的模块的id
		var moduleId=getModuleId($(this));//得到点击的模块的id
		if(moduleId!=moduleIdNow){
			showModuleAndMenu(moduleId);//显示所选择的模块和其所属菜单
			showNav(moduleId); //显示导航内容
			loadHtmlFile(menuData[moduleId].url);//加载模块对应的HTML文件
			setCookie({"moduleId":moduleId,"menuId":-1,"menuItemId":-1});
		}
	});

	/*                        菜单相关操作                                */

	oMenuList.delegate("td.menu","mouseover",function(){//鼠标经过菜单名称时
		$(this).addClass("menuBackground_mouseMove");
		createMenuItemList($(this));
		oMenuItemList.show();
	});
	oMenuList.delegate("td.menu","mouseout",function(e){//鼠标离开菜单名称时
		var oMenu=$(this);
		oMenu.removeClass("menuBackground_mouseMove");
		var x= e.pageX;
		var y= e.pageY;
		var x1=oMenu.offset().left;
		var x2=x1+oMenu.width();
		var y1=oMenu.offset().top;
		var y2=oMenuItemList.offset().top+oMenuItemList.height();
		if(x<x1 || x>x2 || y<y1 || y>y2){
			oMenuItemList.hide();
		}
	});

	function createMenuItemList(oMenu){//当鼠标停留在菜单名称上时，创建该菜单的菜单项清单
		var moduleId=getModuleIdNow();
		var menuId=getMenuId(oMenu);//获得菜单id
		var menuName=getMenuName(oMenu);//获得菜单名称
		var menuLeft=oMenu.offset().left;
		var menuTop=oMenu.offset().top+oMenu.height()+3;
		var menuWidth=oMenu.width();
		oMenuItemList.html("");
		oMenuItemList.css("position","absolute")
		.css("top",menuTop)
		.css("left",menuLeft)
		.css("width",menuWidth)
		.addClass("menuItemList");
		var oTable=$("<table></table>").appendTo(oMenuItemList);
		$.each(menuData[moduleId].menu[menuId].menuItems,function(i,v){
			var oTr=$("<tr></tr>").appendTo(oTable);
			var oTd=$("<td></td>").appendTo(oTr)
			.css("vertical-align","middle")
			.css("text-align","left")
			.addClass("menuItem");
			var oMenuId=$("<span></span>")
			.addClass("menuId")
			.addClass("hide")
			.html(menuId)
			.appendTo(oTd);
			var oMenuName=$("<span></span>")
			.addClass("menuName")
			.addClass("hide")
			.html(menuName)
			.appendTo(oTd);
			var oMenuItemId=$("<span></span>")
			.html(i)
			.addClass("hide")
			.addClass("menuItemId")
			.appendTo(oTd);
			var oMenuItemName=$("<span></sapn>")
			.html(v.menuItemName)
			.addClass("menuItemName")
			.appendTo(oTd);
			var oMenuItemUrl=$("<span></span>")
			.html(v.url)
			.addClass("hide")
			.appendTo(oTd);
			
			var shortCutIcon = $("<div style='float:right;width:16px;height:16px;margin-right:5px'></div>")
           .addClass(v.isShortCut ? "icon-shortcut-light" : "icon-shortcut-dark")
           .appendTo(oTd);
			if(i>0){
				oTd.addClass("dashed");
			}
		});
	}

	oMenuItemList.delegate("td.menuItem","mousemove",function(){//鼠标移动到菜单项清单中的某一个菜单项上时
		$(this).addClass("menuItemBackground_mouseMove");
	});

	oMenuItemList.delegate("td.menuItem","mouseout",function(){//鼠标离开菜单项清单中的某一个菜单项上时
		$(this).removeClass("menuItemBackground_mouseMove");
	});

	oMenuItemList.mouseout(function(e){//鼠标离开菜单项下拉列表时
		var x= e.pageX;
		var y= e.pageY;
		var x1=oMenuItemList.offset().left;
		var x2=x1+oMenuItemList.width();
		var y1=oMenuItemList.offset().top;
		var y2=oMenuItemList.offset().top+oMenuItemList.height()-2;
		if(x<x1 || x>x2 || y<y1 || y>y2){
			oMenuItemList.hide();
		}
	});

	oMenuItemList.delegate("td.menuItem","click",function(){//单击某一菜单项时
		oTd=$(this);
		oMenuItemList.hide();
		var menuIdNow=getMenuIdNow();
		var menuItemIdNow=getMenuItemIdNow();
		var moduleId=getModuleIdNow();
		var menuId=getMenuIdByItem(oTd);
		var menuItemId=getMenuItemId(oTd);
		if((isNormal(menuIdNow) || menuIdNow!=menuId) || (isNormal(menuItemIdNow) || menuItemIdNow!=menuItemId)){
			showNav(moduleId,menuId,menuItemId);
			loadHtmlFile(menuData[moduleId].menu[menuId].menuItems[menuItemId].url);//加载菜单项对应的HTML文件
			setCookie({"moduleId":moduleId,"menuId":menuId,"menuItemId":menuItemId});
		}
	});
	
	//取消快捷
	oMenuItemList.delegate("div.icon-shortcut-light","click",function(event){//单击某一菜单项时
		doShortCut($(this),0);
		event.stopPropagation();
	});
	
	//添加快捷
	oMenuItemList.delegate("div.icon-shortcut-dark","click",function(event){//单击某一菜单项时
		doShortCut($(this),1);
		event.stopPropagation();
	});
	
	/**
	 * 快捷收藏操作
	 */
	function doShortCut(o,flag){
		var msg = "确认要"+ (flag == 0 ?  "取消" : "加入")+"快捷菜单?";
		if(window.confirm(msg)){
			var menuItemDom = o.siblings("span.menuItemId");
			var oTd=$(menuItemDom).parent();
			var moduleId=getModuleIdNow();
			var menuId=getMenuIdByItem(oTd);
			var menuItemId=getMenuItemId(oTd);
			var funcId = menuData[moduleId].menu[menuId].menuItems[menuItemId].funcId;
			$.ajax({
				   type: "POST",
				   url: "App!doShortCut.ajax",
				   data: {funcId : funcId, flag : flag},
				   dataType: "json",
				   success : function(data, textStatus, jqXHR){
					   if(data.success){
						   alert((flag == 0 ?  "取消" : "加入")+"快捷菜单"+"成功!");
						   window.location.href = window.location.href;
					   }else{
						   alert(data.msg);
					   }
				   },
				   error : function (XMLHttpRequest, textStatus, errorThrown){
					   alert("请求失败！");
				   } 
			});
		}
	}

	function showNav(moduleId,menuId,menuItemId){//在导航区显示内容（先清空原有内容）
		//alert(moduleId+","+moduleName+","+menuId+","+menuName+","+menuItemId+","+menuItemName);
		var seprator=" > ";
		var moduleName=menuData[moduleId].moduleName;
		var menuName;
		var menuItemName;
		oNav.html("");
		$("<span></span>").html(moduleId).appendTo(oNav).addClass("moduleId").addClass("hide");
		$("<span></span>").html(moduleName).appendTo(oNav).addClass("moduleName");
		if(isNormal(menuId) && menuId!=-1){
			menuName=menuData[moduleId].menu[menuId].menuName;
			$("<span></span>").html(menuId).appendTo(oNav).addClass("menuId").addClass("hide");
			$("<span></span>").html(seprator+menuName).appendTo(oNav).addClass("menuName");
		}
		if(isNormal(menuItemId) && menuItemId!=-1){
			menuItemName=menuData[moduleId].menu[menuId].menuItems[menuItemId].menuItemName;
			$("<span></span>").html(menuItemId).appendTo(oNav).addClass("menuItemId").addClass("hide");
			$("<span></span>").html(seprator+menuItemName).appendTo(oNav).addClass("menuItemName");
		}
	}

	oMenuList.delegate("#erp_head_up","click",function(){
		oLogoBar.hide(1000);
		//oMenuBar.hide(1000);
		oDown.show();
		oUp.hide();
	});

	oMenuList.delegate("#erp_head_down","click",function(){
		oLogoBar.show(1000);
		//oMenuBar.show(1000);
		oUp.show();
		oDown.hide();
	});


	function loadHtmlFile(url){
		oIframe.attr("src",url);
	}
	function loadHtmlFileToNewPage(url){
//		window.location.href = url;
		oIframe.attr("src",url);
	}
	function setCookie(ids){//将模块id存入cookie。
		$.cookie("moduleId", ids.moduleId);
		$.cookie("menuId",ids.menuId);
		$.cookie("menuItemId",ids.menuItemId);
	}

	function getCookie(){//从cookie中得到模块id、菜单id、菜单项id。
		var moduleId= parseInt($.cookie("moduleId"));
		if(!isNormal(moduleId)){
			moduleId=0;
		}
		var menuId= parseInt($.cookie("menuId"));
		if(!isNormal(menuId)){
			menuId=-1;
		}
		var menuItemId= parseInt($.cookie("menuItemId"));
		if(!isNormal(menuItemId)){
			menuItemId=-1;
		}
		return {"moduleId":moduleId,"menuId":menuId,"menuItemId":menuItemId};
	}//function getCookie()

	function isNormal(tmp){//判断数据是否非NaN、undefined、null
		if (isNaN(tmp) || typeof(tmp) == "undefined" || (!tmp && typeof(tmp)!="undefined" && tmp!=0)){
			return false;
		}else{
			return true;
		}
	}
}
function SetCwinHeight(obj) {
	if (document.getElementById)
	{
		if (cwin && !window.opera)
		{
			if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
				cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS
				else if(cwin.Document && cwin.Document.body.scrollHeight)
					cwin.height = cwin.Document.body.scrollHeight + 10;//IE
		}
		else
		{
			if(cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
				cwin.height = cwin.contentWindow.document.body.scrollHeight;//Opera
		}
	}
}