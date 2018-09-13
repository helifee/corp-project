/*
 * @(#)bookmanage.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */

/**
 * @bookreturn 图书管理JavaScript.
 *
 * @author zhangchi
 * @version 1.0
 */
document.getElementById("commonmessage").innerHTML="检索中 ，请稍候...";

initHead("图书管理",true,true);
fillReserve("图书登录","bookinsert.action",1);

// 权限设定
if ($('userpermit').value == "1"){
	fillReserve("借阅信息","booklendinginfo.action",2);
}

function init() 
	{	
	// 检索书籍信息
	search("1");
	new JsNameFilter("idInput", "nameInput", "../");  
	
	// 权限设定
	if ($('userpermit').value != "1"){
		var searchinput = $('search_t').select('input');
		for (i = 0; i < searchinput.length; i++) { 
			searchinput[i].disable();
		}
		$('bookclass').disabled=true;
		$('bookstate').disabled=true;
		$('searchbtn').disabled=true;
		setUserInfo(getMessage('js.ydb.info.0014'));
	}

	g_hysearchInfo = new PopupBox({
		key: 'dissearch',
		title: $('searchfirmTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('searchfirm'),
		position: 5,
		drag: true,
		beforeclose: function() {
		g_hysearchInfo.Close(0);
				return false;
			}
	});
	
	g_hysmimaInfo = new PopupBox({
		key: 'dismima',
		title: $('distconfirmTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('distconfirm'),
		position: 5,
		drag: true,
		beforeclose: function() {
		g_hysmimaInfo.Close(0);
				return false;
			}
	});
	Element.removeClassName(document.body, 'none');
}

/**
 * 左右箭头翻页
 */
function document.onkeydown(){
    if(event.keyCode==37){
    	changePage('back');         
    } else if (event.keyCode==39) {
    	changePage('next');
    }
} 

/**
 *  检索按钮事件.
 */
function searchclick(){
  	var isCheck = false;
  	for (i = 0; i < $("goodsCount").value; i++) {
		if ($("delflg" + i).value == "1" 
			|| $("updflg" + i).value == "1" ) {
			isCheck = true;
			break;
		}
  	}
  	
  	if (isCheck) {
  		$("searchfirm").removeClassName("none");
  		g_hysearchInfo.Popup();	
  	} else {
  		search('0');
  	}
}
 
/**
*  弹出检索层取消按钮事件.
*/
function cancelsearchHys() {
	g_hysearchInfo.Close(0);
}

/**
*  弹出检索层确认按钮事件.
*/
function oksearchHys() {
	g_hysearchInfo.Close(0);
	search('0');
}

/**
*  检索事件.
*/
function search(index) {

	//设定url以及其余参数
	var url = "searchtable.action";
	var pars = addStamp('isbn=' + $('isbn').value + '&bookname=' + $('bookname').value + '&booksort=' + $('bookclass').value + '&bookstate=' + $('bookstate').value + '&userid=' + $('idInput').value + '&nameInput=' + $('nameInput').value + '&userpermit=' + $('userpermit').value);

	if (document.readyState=="complete" && index == "0"){
		document.getElementById("commonmessage").innerHTML="检索中 ，请稍候...";
		$('loader_container').className='';
	}
	new Ajax.Updater('managetable', url, {
		method: 'get',
        parameters: pars,
        //asynchronous:false,
		onLoading : function() {},
		onSuccess : function(response) {},
		onComplete : function(request) {
			var flg = checkException(request);
			if (!flg) {
				if ($('userpermit').value == "1"){
					var loanNum = $("loanNum").value;
					var allbooksCount = $("allbooksCount").value;
					setUserInfo(getMessage('js.ydb.info.0009',allbooksCount,loanNum,Number(allbooksCount)-Number(loanNum)));
				} else {
					$("tbl_purse").addClassName("none");
					for (var m = 0; m < $('goodsCount').value; m++) {
						$("col_purse" + m).addClassName("none");
						$("isbn" + m).addClassName("none");
						$("isbn_h" + m).removeClassName("none");
					}
				}
				
				// 一页设定
				if (Number($('pageCount').value) > 1) {
					for(i = 0; i < 12; i++) {
						$("row" + String(i)).removeClassName("none");
					}
					$('linebottem').removeClassName("none");
				} else {
					for(i = 0; i < Number($('goodsCount').value); i++) {
						$("row" + String(i)).removeClassName("none");
					}
					$('linebottem').addClassName("none");
				}

				// 翻页设定
				$("ellipsis1").addClassName("none");
				$("page1").addClassName("none");
				$("page2").addClassName("none");
				for(i = 1; i <= 3; i++) {
					$("page" + String(i + 2)).innerHTML = i + "&nbsp;";
				}
				if (Number($('pageCount').value) <= 3) {
					$("ellipsis2").addClassName("none");
					for(i = Number($('pageCount').value); i < 3; i++) {
						$("page" + String(i + 3)).addClassName("none");
					}
				}
				$('loader_container').className='none';
			}
		}
    });	
}

/**
* 捐书人点击事件.
*/
function changeId(index){   
	var purseidNoYd = $("tbl_purseid"+index).value.slice(2,8);
	$("tbl_purseid"+index).value = purseidNoYd;
	$("tbl_pursename"+index).addClassName("none");
	$("tbl_purseid"+index).removeClassName("none");
	$("tbl_purseid"+index).focus();
}   

/**
 * 捐书人焦点移开事件
 */
function changeName(index,textId,labelId){   
	var purseidParam = $("tbl_purseid"+index).value; 
	var url = "changeName.action?purseidParam=" +purseidParam;
	new Ajax.Request(url, {
		onSuccess: function(response) {},
		onComplete:function(request){
			
			var flg = checkException(request);
			if (!flg) {

				if (request.responseText == "nameW") {
					MsgBox.message(getMessage('js.com.warning.0004',"用户"),'',function(){});
					$("tbl_pursename"+index).value = $("tbl_pursename_h"+index).value;
					$("tbl_purseid"+index).value = $("tbl_purseid_h"+index).value;
					$("tbl_pursename"+index).removeClassName("none");
					$("tbl_purseid"+index).addClassName("none");
				} else {
					$("tbl_pursename"+index).value= request.responseText;
					$("tbl_purseid"+index).value = "YD" + purseidParam;
					$("tbl_pursename_h"+index).value = request.responseText;
					$("tbl_purseid_h"+index).value = "YD" + purseidParam;
					$("tbl_pursename"+index).removeClassName("none");
					$("tbl_purseid"+index).addClassName("none");
					changeCheck(index,textId,labelId);
				}
			}
		}
	}
	);
}   

/**
 * 总册数/第几册校验
 */
function volumeCheck(index,textId,labelId){
	 
//	// 总册数/第几册为空的校验
//	if (!bookChangeCheck(index,textId,labelId)) {
//		changeCheck(index,textId,labelId);
//		return;
//	}
	 
	var bookVolume = Number($("bookvolume"+index).value);
	var volumeNum = Number($("volumenum"+index).value);
	
	if (bookVolume > 10) {
		MsgBox.message(getMessage('js.ydb.error.0010',"总册数","10"),'',function(){});
		$("bookvolume"+index).value = $("tbl_bookvolume_h"+index).value;
	} else if (bookVolume == 0) {
		MsgBox.error(getMessage('js.ydb.error.0009', '总册数','0'),'',function(){});
		$("bookvolume"+index).value = $("tbl_bookvolume_h"+index).value;
	} else if (volumeNum == 0) {
		MsgBox.message(getMessage('js.ydb.error.0009', '第几册','0'),'',function(){});
		$("volumenum"+index).value = $("tbl_volumenum_h"+index).value;
	} else if (bookVolume < volumeNum) {
		MsgBox.message(getMessage('js.ydb.error.0009',"总册数","第几册"),'',function(){});
		$("volumenum"+index).value = $("tbl_volumenum_h"+index).value;
		$("bookvolume"+index).value = $("tbl_bookvolume_h"+index).value;
	} else {
		$("tbl_volumenum_h"+index).value = volumeNum;
		$("tbl_bookvolume_h"+index).value = bookVolume;
		$("volumenum"+index).value = volumeNum;
		$("bookvolume"+index).value = bookVolume;
		changeCheck(index,textId,labelId);
	}
}

function isbnClear(index) {
	$("bookname"+index).value = "";
	$("bookauthor"+index).value = "";
	$("bookpublisher"+index).value = "";
	$("bookpublishdate"+index).value = "";
	$("booksummary"+index).value = "";
	$("volumenum"+index).value = "1";
	$("bookvolume"+index).value = "1";
	$("tbl_bookclass"+index).value = "00";
	$("booksortname"+index).value = "";
}

/**
 * isbn号焦点移开检索事件
 */
function isbnSearch(index,textId,labelId){
	
	var isbnParam = $("isbn"+index).value;
	
	// isbn号校验
	if (!bookChangeCheck(index,textId,labelId)){
		isbnClear(index);
		changeCheck(index,textId,labelId);
		return;
	}
	if (!isbnCheck(index)) {
		isbnClear(index);
		changeCheck(index,textId,labelId);
		return;
	}
	
	var isbn_h = $("tbl_isbn_h"+index).value;
	
	if (isbn_h != isbnParam) {

		if (document.readyState=="complete"){
			document.getElementById("commonmessage").innerHTML="检索中 ，请稍候 ...";
			$('loader_container').className='';
		}
		var url = "isbnSearch.action?isbnParam="+isbnParam;
		new Ajax.Request(url, {
			onSuccess: function(response) {},
			onComplete:function(request){
				
				var flg = checkException(request);
				if (!flg) {
					if (request.responseText == "infoNull") {
						$('loader_container').className='none';
						MsgBox.message(getMessage('js.ydb.error.0007'),'',function(){});

						$("tbl_isbn_h"+index).value = isbnParam;
						isbnClear(index);
					} else {
						var jsonBookInfo = request.responseText.evalJSON();
						$("tbl_isbn_h"+index).value = isbnParam;
						
						$("bookname"+index).value = jsonBookInfo.bookname;
						$("bookauthor"+index).value = jsonBookInfo.bookauthor;
						$("bookpublisher"+index).value = jsonBookInfo.bookpublisher;
						$("bookpublishdate"+index).value = jsonBookInfo.bookpublishdate;
						$("booksummary"+index).value = jsonBookInfo.booksummary;
						$("volumenum"+index).value = "1";
						$("bookvolume"+index).value = "1";
						$("tbl_bookclass"+index).value = "00";
						$("booksortname"+index).value = "";
						$('loader_container').className='none';
					}
					changeCheck(index,textId,labelId);
				}
			}
		}
		);
	}
}

/**
 * 翻页
 */
function changePage(index) {
	
	var pagenow = Number($('currentpage').value);
	var pageCon = Number($('pageCount').value);
	var page = pagenow;
	if(index == "first") {
		page = 1;
	} else if (index == "back") {
		page = pagenow - 1;
	} else if (index == "next") {
		page = pagenow + 1;
	} else if (index == "last") {
		page = Number($('pageCount').value);
	} else if (!isNaN(index)) {
		page = index;
	} else {
		page = Number(index.innerText);
	}
	
	if (page <= pageCon && page > 0) {

		if (pagenow == Number($('pageCount').value)) {
			for(i = (pagenow-1)*12; i < Number($('goodsCount').value); i++) {
				$("row" + String(i)).addClassName("none");
			}
			$('linebottem').removeClassName("none");
		} else {
			for(i = (pagenow-1)*12; i < pagenow*12; i++) {
				$("row" + String(i)).addClassName("none");
			}
		}

		if (page == Number($('pageCount').value)) {
			for(i = (page-1)*12; i < Number($('goodsCount').value); i++) {
				$("row" + String(i)).removeClassName("none");
			}
			$('linebottem').addClassName("none");
		} else {
			for(i = (page-1)*12; i < page*12; i++) {
				$("row" + String(i)).removeClassName("none");
			}
		}

		$('currentpage').value = page;
		$('pageNum').innerText = page;
		
		if (page > 3) {
			$("ellipsis1").removeClassName("none");
			for (i = page; i > page - 3; i--) {
				$("page" + String(i + 3 - page)).innerHTML = i + "&nbsp;";
				$("page" + String(i + 3 - page)).removeClassName("none");
			}
		} else {
			$("ellipsis1").addClassName("none");
			for (i = page; i > 0; i--) {
				$("page" + String(i + 3 - page)).innerHTML = i + "&nbsp;";
				$("page" + String(i + 3 - page)).removeClassName("none");
			}
			for (i = 0; i < 3 - page; i++) {
				$("page" + String(i + 1)).addClassName("none");
			}
		}
		
		if (page < pageCon - 2) {
			$("ellipsis2").removeClassName("none");
			for (i = page + 1; i <= page + 2; i++) {
				$("page" + String(i + 3 - page)).innerHTML = i + "&nbsp;";
				$("page" + String(i + 3 - page)).removeClassName("none");
			}
		} else {
			$("ellipsis2").addClassName("none");
			for (i = page + 1; i <= pageCon; i++) {
				$("page" + String(i + 3 - page)).innerHTML = i + "&nbsp;";
				$("page" + String(i + 3 - page)).removeClassName("none");
			}
			for (i = 2; i > pageCon - page; i--) {
				$("page" + String(i + 3)).addClassName("none");
			}
		}
		

	} else {
		$('currentpage').value = pagenow;
	}
}

/**
 * 除去一行中所有cell的某个className
 */
function changeShow(index,className){

	$("col_isbn" + index).removeClassName(className);
	$("col_bookname" + index).removeClassName(className);
	$("col_volume" + index).removeClassName(className);
	$("col_author" + index).removeClassName(className);
	$("col_pub" + index).removeClassName(className);
	$("col_class" + index).removeClassName(className);
	if ($('userpermit').value == "1"){
		$("col_purse" + index).removeClassName(className);
	}
	$("col_publishdate" + index).removeClassName(className);
	$("col_summary" + index).removeClassName(className);
	$("col_loanTF" + index).removeClassName(className);
	$("col_delete" + index).removeClassName(className);
}

/**
 * 添加一行中所有cell的某个className
 */
function changeHide(index,className){

	$("col_isbn" + index).addClassName(className);
	$("col_bookname" + index).addClassName(className);
	$("col_volume" + index).addClassName(className);
	$("col_author" + index).addClassName(className);
	$("col_pub" + index).addClassName(className);
	$("col_class" + index).addClassName(className);
	$("col_purse" + index).addClassName(className);
	$("col_publishdate" + index).addClassName(className);
	$("col_summary" + index).addClassName(className);
	$("col_loanTF" + index).addClassName(className);
	$("col_delete" + index).addClassName(className);
}

/**
 * 删除颜色、名称及FLG控制
 */
function changeDel(index) {
	
	if ($("loanTF" + index).value == "0") {
		MsgBox.message(getMessage('js.ydb.error.0013'),'',function(){});
		return;
	}
	
	if ($("delflg" + index).value == "0") {
		$("delflg" + index).value="1";
		$("del" + index).addClassName("none");
		$("canceldel" + index).removeClassName("none");
		changeShow(index,"updated");
		changeHide(index,"deleted");
		writeDelHide(index);
	} else {
		$("delflg" + index).value="0";
		$("del" + index).removeClassName("none");
		$("canceldel" + index).addClassName("none");
		changeShow(index,"deleted");
		writeDelShow(index);
		if ($("updflg" + index).value == "1") {
			changeHide(index,"updated");
		}
	}
}

/**
 * 更新颜色及FLG控制（2）
 */
function colorCheck(index) {
	if (
			$("isbn"+index).value == $("isbn_h"+index).innerText 
			&& $("bookname"+index).value == $("bookname_h"+index).value
			&& $("volumenum"+index).value == $("volumenum_h"+index).value
			&& $("bookvolume"+index).value == $("bookvolume_h"+index).value
			&& $("bookauthor"+index).value == $("bookauthor_h"+index).value
			&& $("bookpublisher"+index).value == $("bookpublisher_h"+index).value
			&& $("tbl_bookclass"+index).value == $("tbl_bookclass_h"+index).value
			&& $("tbl_purseid"+index).value == $("purseid_h"+index).value
			&& $("bookpublishdate"+index).value == $("bookpublishdate_h"+index).value
			&& $("booksummary"+index).value == $("booksummary_h"+index).value) {
		changeShow(index,"updated");
		$("updflg"+index).value = "0";
	}
}

/**
 * 更新颜色及FLG控制（1）
 */
function changeCheck(index,textId,labelId){
	var labelvalue = $(labelId+index).value;
	var newvalue = $(textId+index).value;
	if (labelvalue == newvalue && $("updflg"+index).value == "1") {
		colorCheck(index);
	} else if (labelvalue != newvalue) {
		changeHide(index,"updated");
		$("updflg"+index).value = "1";
	}
	changeTitle(index,textId);
}

/**
 * textfield更改后，title随之更改
 */
function changeTitle(index,textId) {
	if (textId == "bookauthor") {
		$("col_author" + index).title = $("bookauthor" + index).value;
	} else if (textId == "bookpublisher") {
		$("col_pub" + index).title = $("bookpublisher" + index).value;
	} else if (textId == "tbl_bookclass") {
		$("col_class" + index).title = $("booksortname" + index).value;
	} else if (textId == "booksummary") {
		$("col_summary" + index).title = $("booksummary" + index).value;
	}
}
/**
 * 点击删除之后不可用
 */
function writeDelHide(index){

	$("isbn" + index).disabled=true;
	$("bookname" + index).disabled=true;
	$("volumenum" + index).disabled=true;
	$("bookvolume" + index).disabled=true;
	$("bookauthor" + index).disabled=true;
	$("bookpublisher" + index).disabled=true;
	$("tbl_bookclass" + index).disabled=true;
	$("booksortname" + index).disabled=true;
	$("tbl_pursename" + index).disabled=true;
	$("bookpublishdate" + index).disabled=true;
	$("booksummary" + index).disabled=true;
	
}

 /**
  * 点击取消删除之后可用
  */
function writeDelShow(index){
	if ($('userpermit').value == "1"){
		$("isbn" + index).disabled=false;
	}
	$("bookname" + index).disabled=false;
	$("volumenum" + index).disabled=false;
	$("bookvolume" + index).disabled=false;
	$("bookauthor" + index).disabled=false;
	$("bookpublisher" + index).disabled=false;
	$("tbl_bookclass" + index).disabled=false;
	$("booksortname" + index).disabled=false;
	$("tbl_pursename" + index).disabled=false;
	$("bookpublishdate" + index).disabled=false;
	$("booksummary" + index).disabled=false;
}

/**
 *  提交按钮事件.
 */
function submitclick() {
  	
  	var isCheck = false;
  	for (i = 0; i < $("goodsCount").value; i++) {
		if ($("delflg" + i).value == "1") {
			isCheck = true;
		} else if ($("updflg" + i).value == "1" ) {
			if (!booksupdCheck(i)) {
				changePage(Math.ceil(i/12));
				return;
			}
			isCheck = true;
		}
  	}
  	
  	if (isCheck) {
  		$("distconfirm").removeClassName("none");
  		g_hysmimaInfo.Popup();	
  		var subfocus = document.getElementById("password");
  		subfocus.focus();
  	}
}  

/**
*  弹出密码层取消按钮事件.
*/
function cancelmimaHys() {
	$("password").value="";
	g_hysmimaInfo.Close(0);
}

/**
 * 密码回车键按下事件
 */
function passwordEnter()
{
	if (window.event.keyCode==13)
	{
		updatechange();	
	}
}

/**
 * 密码确认事件,更新取得数据
 */
function updatechange() {
	var manynum=0;
	var param = 'isbn=' + $('isbn').value + '&bookname=' + encodeURIComponent($('bookname').value) + '&booksort=' + $('bookclass').value + '&bookstate=' + $('bookstate').value + '&userid=' + $('idInput').value + '&nameInput=' + $('nameInput').value + '&userpermit=' + $('userpermit').value;
	var updList;
	var nullTF=0;
	var mypassword;
	var deletenum=0;
	
	// 用户还书确认密码取得
	mypassword = $("password").value;
	
	// 密码验证
	if (mypassword == '') {
		MsgBox.message(getMessage('js.com.warning.0001', '密码'),'',
			function() {$("password").focus();}	);
	} else {

		var url = "passwordValidate2.action?passwordParam=" +mypassword;
		new Ajax.Request(url, {
			onSuccess: function(response) {},
			onComplete:function(request){
				var flg = checkException(request);
				if (!flg) {

					// 取得变更数据
					if (request.responseText == 1) {

						g_hysmimaInfo.Close(0);
						if (document.readyState=="complete"){
							document.getElementById("commonmessage").innerHTML="处理中，请稍候 ...";
							$('loader_container').className='';
						}
						
						for (i = 0; i < $("goodsCount").value; i++) {
							if ($("delflg" + i).value == "1") {
								if ($("userhid").value == $("purseid_h" + i).value) {
									deletenum += 1;
								}
								param+="&updlist["+ manynum +"].bookid=" + $("bookid" + i).value;
								param+="&updlist["+ manynum +"].isbn=" + $("isbn_h" + i).innerText;
								param+="&updlist["+ manynum +"].bookname=" + encodeURIComponent($("bookname_h" + i).value);
								param+="&updlist["+ manynum +"].volumenum=" + $("volumenum_h" + i).value;
								param+="&updlist["+ manynum +"].bookvolume=" + $("bookvolume_h" + i).value;
								param+="&updlist["+ manynum +"].bookauthor=" + encodeURIComponent($("bookauthor_h" + i).value);
								param+="&updlist["+ manynum +"].bookpublisher=" + encodeURIComponent($("bookpublisher_h" + i).value);
								param+="&updlist["+ manynum +"].booksort=" + $("tbl_bookclass_h" + i).value;
								param+="&updlist["+ manynum +"].purseid=" + $("purseid_h" + i).value;
								if ($("bookpublishdate_h" + i).value == null
										|| $("bookpublishdate_h" + i).value == "") {
									param+="&updlist["+ manynum +"].bookpublishdate=00000000" 
								} else {
									param+="&updlist["+ manynum +"].bookpublishdate=" + $("bookpublishdate_h" + i).value;
								}
								param+="&updlist["+ manynum +"].booksummary=" + encodeURIComponent($("booksummary_h" + i).value);
								param+="&updlist["+ manynum +"].delFlg=" + $("delflg" + i).value;
								manynum = manynum + 1;
								nullTF = 1;
								
							} else if ($("updflg" + i).value == "1") {
								param+="&updlist["+ manynum +"].bookid=" + $("bookid" + i).value;
								param+="&updlist["+ manynum +"].isbn=" + $("isbn" + i).value.strip();
								param+="&updlist["+ manynum +"].bookname=" + encodeURIComponent($("bookname" + i).value.strip());
								param+="&updlist["+ manynum +"].volumenum=" + $("volumenum" + i).value;
								param+="&updlist["+ manynum +"].bookvolume=" + $("bookvolume" + i).value;
								param+="&updlist["+ manynum +"].bookauthor=" + encodeURIComponent($("bookauthor" + i).value.strip());
								param+="&updlist["+ manynum +"].bookpublisher=" + encodeURIComponent($("bookpublisher" + i).value.strip());
								param+="&updlist["+ manynum +"].booksort=" + $("tbl_bookclass" + i).value;
								param+="&updlist["+ manynum +"].purseid=" + $("tbl_purseid" + i).value;
								if ($("bookpublishdate" + i).value == null
										|| $("bookpublishdate" + i).value == "") {
									param+="&updlist["+ manynum +"].bookpublishdate=00000000" 
								} else {
									param+="&updlist["+ manynum +"].bookpublishdate=" + $("bookpublishdate" + i).value;
								}
								param+="&updlist["+ manynum +"].booksummary=" + encodeURIComponent($("booksummary" + i).value.strip());
								param+="&updlist["+ manynum +"].delFlg=" + $("delflg" + i).value;

								manynum = manynum + 1;
								nullTF = 1;
							}
						}
						param+="&deletenum=" + deletenum;
						param = addStamp(param);
						
						// 将变更的数据提交
						if (nullTF == 1) {
							var url1 = "updbookList.action";
							new Ajax.Updater('managetable',url1, {
								method:'post',
								parameters: param,
								onLoading : function(){},
								onSuccess : function(response) {},
								onComplete : function(request) {
									var flg = checkException(request);
									if (!flg) {

										if (Number($('pageCount').value) > 1) {
											for(i = 0; i < 12; i++) {
												$("row" + String(i)).removeClassName("none");
											}
											$('linebottem').removeClassName("none");
										} else {
											for(i = 0; i < Number($('goodsCount').value); i++) {
												$("row" + String(i)).removeClassName("none");
											}
											$('linebottem').addClassName("none");
										}
										// 权限设定
										if ($('userpermit').value != "1"){
											$("tbl_purse").addClassName("none");
											for (i = 0; i < $('goodsCount').value; i++) {
												$("col_purse" + i).addClassName("none");
												$("isbn" + i).addClassName("none");
												$("isbn_h" + i).removeClassName("none");
											}
										} else {
											var loanNum = $("loanNum").value;
											var allbooksCount = $("allbooksCount").value;
											setUserInfo(getMessage('js.ydb.info.0009',allbooksCount,loanNum,Number(allbooksCount)-Number(loanNum)));
										}
										
										// 翻页设定
										$("ellipsis1").addClassName("none");
										$("page1").addClassName("none");
										$("page2").addClassName("none");
										for(i = 1; i <= 3; i++) {
											$("page" + String(i + 2)).innerHTML = i + "&nbsp;";
										}
										if (Number($('pageCount').value) <= 3) {
											$("ellipsis2").addClassName("none");
											for(i = Number($('pageCount').value); i < 3; i++) {
												$("page" + String(i + 3)).addClassName("none");
											}
										}
										$("password").value="";

										$('loader_container').className='none';
										MsgBox.message(getMessage('js.com.info.0009'),'',function(){});
									}
								}
							}
							);
						} else {
							$('loader_container').className='none';
						}
					} else if (request.responseText == 0){

						$('loader_container').className='none';
						MsgBox.message(getMessage('js.ydb.error.0006'),'',function()
					            {
							$("password").select();
					            });
					}
				}
			}
		}
		);
	}
}

/**
 * 图书类型label点击事件
 */
function sortChange1(index) {
	
	$("booksortname" + index).addClassName("none");
	$("tbl_bookclass" + index).removeClassName("none");
	$("tbl_bookclass" + index).focus();
}

/**
* 图书类型变更事件
*/
function sortChange2(index) {
	
	$("booksortname" + index).removeClassName("none");
	$("tbl_bookclass" + index).addClassName("none");
	$("booksortname" + index).value = $("tbl_bookclass" + index).childElements()[$("tbl_bookclass" + index).selectedIndex].innerHTML
	changeCheck(index,"tbl_bookclass","tbl_bookclass_h");
	if (!booksortCheck(index)) {
		return;
	}
}

/**
 * 出版日期焦点移开事件
 */
function dateChange(index,textId,labelId) {
	WdatePicker();
	$("bookpublishdate" + index).focus();
}

/**
 * 图书isbn、名称、总册数、第几册为空时的校验、变色及更新flg变更
 */
function bookChange(index,textId,labelId){
	changeCheck(index,textId,labelId);
	if (!bookChangeCheck(index,textId,labelId)) {
		return;
	}
	
}

/**
* 图书isbn、名称、总册数、第几册为空时的校验
*/
function bookChangeCheck(index,textId,labelId) {
	if($(textId + index).value.strip() == '' ){
		if (textId == "bookname") {
			MsgBox.error(getMessage('js.com.warning.0001', '图书名称'),'',function(){});
			$("col_bookname"+index).addClassName("warn");
			$("col_bookname"+index).title=$("bookname"+index).value;
		} else if (textId == "volumenum") {
			MsgBox.error(getMessage('js.com.warning.0001', '第几册'),'',function(){});
			$("col_volume"+index).addClassName("warn");
		} else if (textId == "bookvolume") {
			MsgBox.error(getMessage('js.com.warning.0001', '总册数'),'',function(){});
			$("col_volume"+index).addClassName("warn");
		} else if (textId == "isbn") {
			MsgBox.error(getMessage('js.com.warning.0001', '图书ISBN号'),'',function(){});
			$("col_isbn"+index).addClassName("warn");
		} 
		return false;
	} else {
		if (textId == "bookname") {
			$("col_bookname"+index).removeClassName("warn");
			$("col_bookname"+index).title=$("bookname"+index).value;
		} else if (textId == "volumenum") {
			$("col_volume"+index).removeClassName("warn");
		} else if (textId == "bookvolume") {
			$("col_volume"+index).removeClassName("warn");
		} else if (textId == "isbn") {
			$("col_isbn"+index).removeClassName("warn");
		} 
	}
	return true;
}

/**
* 图书isbn数字字母验证
*/
function isbnCheck(index) {

	// isbn号数字字母验证
	var pattern =/^[a-z0-9]*$/i;
	var msg = pattern.test($("isbn"+index).value) ? "t" : "f";
	if(msg=="f"){
	   MsgBox.error('ISBN号只能是数字与字母的组合！','',function(){
		   		$("isbn").select();
	   		});
	   $("col_isbn"+index).addClassName("warn");
	   return false;
	} else {
	   $("col_isbn"+index).removeClassName("warn");
	}
	
	return true;
}

/**
* 图书类型为空时的校验
*/
function booksortCheck(index) {
	
	if($("tbl_bookclass" + index).value == "00" ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书分类'),'',function(){});
		$("col_class" + index).addClassName("warn");
		return false;
	} else {
		$("col_class" + index).removeClassName("warn");
	}
	return true;
}

/**
 * 提交总校验
 */
function booksupdCheck(index) {
		
	//isbn号验证
	if ($("isbn" + index).value.strip() == '') {
		$("col_isbn" + index).addClassName("warn");
	}
	else{
		$("col_isbn" + index).removeClassName("warn");
	}
	if($("isbn" + index).value.strip() == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001','图书ISBN号'),'',function(){});
		return false;
	}
	
	// isbn号数字字母验证
	var pattern =/^[a-z0-9]*$/i;
	var str = $("isbn" + index).value; //我们需要测试的字符串对象
	var msg = pattern.test(str) ? "t" : "f";
	if(msg=="f"){
		$("col_isbn" + index).addClassName("warn");
	} else {
	    $("col_isbn" + index).removeClassName("warn");
	}
	if(msg=="f"){
	  MsgBox.error('ISBN号只能是数字与字母的组合！','',function(){});
	  return false;
	} 
	
	//图书名称验证
	if ($("bookname" + index).value.strip() == '') {
		$("col_bookname" + index).addClassName("warn");
	} else {
		$("col_bookname" + index).removeClassName("warn");
	}
	if($("bookname" + index).value.strip() == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001','图书名称'),'',function(){});
		return false;
	}
	
	//图书名称长度验证
	if ($("bookname" + index).value.length>40) {
		$("col_bookname" + index).addClassName("warn");
	} else {
		$("col_bookname" + index).removeClassName("warn");
	}
	if($("bookname" + index).value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','图书名称','40'),'',function(){});
		return false;
	}
	
	// 图书第几册为空验证
	if ($("volumenum" + index).value == '') {
		$("col_volume" + index).addClassName("warn");
	} else {
		$("col_volume" + index).removeClassName("warn");
	}
	
	if($("volumenum" + index).value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '第几册'),'',function(){});
		return false;
	}
	
	// 图书册数为空验证
	if ($("bookvolume" + index).value == '') {
		$("col_volume" + index).addClassName("warn");
	} else {
		$("col_volume" + index).removeClassName("warn");
	}
	if($("bookvolume" + index).value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书册数'),'',function(){});
		return false;
	}
	
	// 总册数为'0'验证
	if ($("bookvolume" + index).value == '0') {
		MsgBox.error(getMessage('js.ydb.error.0009', '总册数','0'),'',function(){});
		$("col_volume"+index).addClassName("warn");
		return false;
	} else {
		$("col_volume"+index).removeClassName("warn");
	}
	
	// 图书册数为'0'验证
	if ($("volumenum" + index).value == '0' ) {
		MsgBox.error(getMessage('js.ydb.error.0009', '第几册','0'),'',function(){});
		$("col_volume"+index).addClassName("warn");
		return false;
	} else {
		$("col_volume"+index).removeClassName("warn");
	}
	
	//图书分类验证
	if ($("tbl_bookclass" + index).value == '00') {
		$("col_class" + index).addClassName("warn");
		MsgBox.error(getMessage('js.com.warning.0001', '图书分类'),'',function(){});
		return false;
	} else {
		$("col_class" + index).removeClassName("warn");
	}
	
	//图书作者长度验证
	if ($("bookauthor" + index).value.length>40) {
		$("col_author" + index).addClassName("warn");
	} else {
		$("col_author" + index).removeClassName("warn");
	}
	if($("bookauthor" + index).value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','作者','40'),'',function(){});
		return false;
	}
	
	//图书出版社长度验证
	if ($("bookpublisher" + index).value.length>40) {
		$("col_pub" + index).addClassName("warn");
	}
	else{
		$("col_pub" + index).removeClassName("warn");
	}
	if($("bookpublisher" + index).value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','出版社','40'),'',function(){});
		return false;
	}
	
	//图书简介长度验证
	if ($("booksummary" + index).value.length>2000) {
		$("col_summary" + index).addClassName("warn");
	}
	else{
		$("col_summary" + index).removeClassName("warn");
	}
	if($("booksummary" + index).value.length>2000 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','图书简介','2000'),'',function(){});
		return false;
	}
	return true;
}
