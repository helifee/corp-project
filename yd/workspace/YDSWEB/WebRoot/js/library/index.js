/*
 * @(#)index.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
/**
 * @fileoverview 菜单页面JavaScript.
 *
 * @author zhanghaibo
 * @version 1.0
 */
$('loader_container').className='none';
/**
 * 初期化
 */
function init(){
	var titleuser;
	titleuser=document.getElementById('titleuser').value;
	initHead("大连远东计算机工会图书管理系统",false,true);
	setUserInfo(getMessage('js.ydb.info.0005', titleuser));

}
function changepage(aa){
//	if (document.readyState=="complete"){
//		document.getElementById("commonmessage").innerHTML="处理中，请稍候 ...";
//		$('loader_container').className='';
//		
//	}
	if (aa==1)
	{var url = "booklending.action";
	$("indexgm").action = url;
	$("indexgm").submit();}
	if (aa==2)
	{var url = "bookreturn.action";
	$("indexgm").action = url;
	$("indexgm").submit();}
	if (aa==3)
	{var url = "bookinsert.action";
	$("indexgm").action = url;
	$("indexgm").submit();}
	if (aa==4)
	{var url = "bookmanage.action";
	$("indexgm").action = url;
	$("indexgm").submit();}
}
/**
 * 图片变大缩小
 */
function biger(obj,aa){
	if(aa=='jieshu'|| aa=='tushudenglu')
	{
		document.getElementById(aa).className='color_bule_1 span-11 menu text_center font_weight_b';
	}
	if(aa=='huanshu'|| aa=='tushuguanli')
	{
		document.getElementById(aa).className='color_bule_1 span-6 menu font_weight_b';
	}

	obj.className='icon1';           
}
function smaller(obj,aa){
	if(aa=='jieshu'|| aa=='tushudenglu')
	{
		document.getElementById(aa).className='color_wht span-11 menu text_center';
	}
	if(aa=='huanshu'|| aa=='tushuguanli')
	{
		document.getElementById(aa).className='color_wht span-6 menu';
	}
	obj.className='icon';
}
