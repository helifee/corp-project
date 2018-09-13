/*
 * @(#)booksearch.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */

/**
 * @booksearch 图书管理JavaScript.
 *
 * @author zhangchi
 * @version 1.0
 */

function init() {	// 检索书籍信息
	search();
	new JsNameFilter("idInput", "nameInput", "../");  
	Element.removeClassName(document.body, 'none');
}

/**
 *  检索按钮事件.
 */
function searchclick(){
  	
  	search();
}

/**
*  检索事件.
*/
function search() {

	//设定url以及其余参数
	var url = "searchtable.action";
	var pars = addStamp('isbn=' + $('isbn').value + '&bookname=' + $('bookname').value + '&booksort=' + $('bookclass').value + '&bookstate=' + $('bookstate').value + '&userid=' + $('idInput').value + '&nameInput=' + $('nameInput').value + "&pageNumber=0");

	new Ajax.Updater('managetable', url, {
		method: 'get',
        parameters: pars,
		onLoading : function() {},
		onSuccess : function(response) {},
		onComplete : function(request) {
			var flg = checkException(request);
			if (!flg) {
				listColor("bookreturnmxtbl");
				$('isbn_h').value = $('isbn').value;
				$('bookname_h').value = $('bookname').value;
				$('bookclass_h').value = $('bookclass').value;
				$('bookstate_h').value = $('bookstate').value;
				$('idInput_h').value = $('idInput').value;
			}
		}
    });	
}


// 点击第几页时调用的提交函数。  
function pagerCommonTag(pageUrl , pageNumber){  
	pagerSubmit(pageUrl , pageNumber);  
}  

// 实现分页提交。  
function pagerSubmit(pageUrl , pageNumber){  

    //从隐藏控件中取出上次使用的检索条件  
    var pars = addStamp('&isbn=' + $('isbn_h').value + '&bookname=' + $('bookname_h').value + '&booksort=' + $('bookclass_h').value + '&bookstate=' + $('bookstate_h').value + '&userid=' + $('idInput_h').value + '&nameInput=' + $('nameInput').value +'&pageNumber=' + pageNumber);

    //设定url以及其余参数  
    var url = pageUrl + pars;  
    new Ajax.Updater('managetable', url , {  
          onLoading : function() {},  
          onComplete : function(response) {  
              var flg = checkException(response);  
              if(!flg) {                
                   listColor('bookreturnmxtbl');  
              }  
          }  
    });        
}  

