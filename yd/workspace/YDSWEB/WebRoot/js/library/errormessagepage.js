/*
 * @(#)finish.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
/**
 * @fileoverview 失败页面JavaScript.
 *
 * @author zhangchi
 * @version 1.0
 */
   var s = 30;   
   var intervalid;   
   intervalid = setInterval("fun()", 1000); 

   function fun() {   
       if (s == 0) {   
           window.location.href = "userlogout.action";   
           clearInterval(intervalid);   
       }   
       document.getElementById("second").innerHTML = s;   
       s--;    
   }   

   function init(){
	   initHead("图书馆的橱柜",true,true);
	   setUserInfo(getMessage('js.ydb.info.0013'));
   }
	
