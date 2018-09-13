/*
 * @(#)bookinsert.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
$('loader_container').className='none';
/**
 * 图书本数备份留着弹出信息贡献度用.
 */
var booknumbk;
/**
 * 图书图片地址显示用.
 */
var bookaddressbk;
/**
 * 图书书架已有图书个数.
 */
var bookshelfnum=0;
/**
 * 图书书架多余10个图书宽度flg.
 */
var withflg='0';
/**
 * 书架详细数据备份.
 */
var shelfisbn='';
var shelfbookname='';
var shelfbookcs='';
var shelfbookdijice='';
var shelfbookfl='';
var shelfbookzuozhe='';
var shelfbooknum='';
var shelfbookchubanshe='';
var shelfbookchubanriqi='';
var shelfbookjianjie='';
var shelfbooktpadd='';

/**
 * 页面初始化.
 */
function init() {
	new JsNameFilter("idInput", "nameInput", "../"); 
	initHead("图书登录",true,true);
	setUserInfo(getMessage('js.ydb.info.0011'));
	$('isbn').focus();
}

/**
 * 图书册数与第几册的联动.
 */
function resultlevelControl(levelNum) {
 var levels = $('bookdijice').childElements();
  var levelshidden = $('bookdijicehidden').childElements();
    if (levels.length > levelNum) {
    for (var i = levelNum; i < levels.length; i++) {
     levels[i].remove();
    }
   } else {
    for (var i = levels.length; i < levelNum; i++) {
     var newOption = levelshidden[i].clone(true);
     $('bookdijice').insert(newOption);
    }
   }

}


/**
 * ISBN回车键按下事件.
 */
function sercthkey()
{
  
 if (window.event.keyCode==13)
 {
	//	  输入ISBN验证.
	if (!validatesercth()) return;
	sercthInfo(); 
 }
}

/**
 * 查询按钮查询图书事件.
 */
function  sercthInfo() {
	// 输入ISBN验证.
	if (!validatesercth()) return;
	//初始状态备份
	var isbnvalue=$("isbn").value.strip();
	var booknamevalue=$("bookname").value.strip();
	var bookcsvalue=$("bookcs").value;
	var bookdijicevalue=$("bookdijice").value;
	var bookflnvalue=$("bookfl").value;
	var bookzuozhevalue=$("bookzuozhe").value.strip();
	var bookchubanshevalue=$("bookchubanshe").value.strip();
	var bookchubanriqivalue=$("bookchubanriqi").value;
	var booknumvalue=$("booknum").value;
	var bookjianjievalue=$("bookjianjie").value.strip();
	
	if (document.readyState=="complete"){
		document.getElementById("commonmessage").innerHTML="书籍正在检索中 ...";
		$('loader_container').className='';
		
	}
	//检索ISBN对应的书籍	信息
	var param = "";
	param =$("isbn").value.strip();
	param += "&radom=" + Math.random();
	var url = "bookinfosercth.action?isbn=" + param;
	new Ajax.Updater('bookmxdiv', url , {    
		onLoading : function() {},
		onSuccess : function(response) {},
		onComplete : function(request) {
			
			 var flg = checkException(request);
				if (!flg) {
				
					//没检索到书籍的处理
					if($('exittf').value==0)
					{
						$('loader_container').className='none';
						MsgBox.message(getMessage('js.ydb.error.0007'),'',function()
					            {
							$("isbn").value=isbnvalue;
							$("bookname").value="";
						     $("bookcs").value="1";
						     resultlevelControl(1);
							$("bookfl").value="-1";
							$("bookzuozhe").value="";
							$("bookchubanshe").value="";
							$("bookchubanriqi").value="";
							$("booknum").value="1";
							$("bookjianjie").value="";
							$("bkadd").value="";
							$("bkplusflg").value="";
								$("isbn").select();
					            });
					}
					//检索到书籍的处理			
					else
					{
						$('isbn').focus();
						$('loader_container').className='none';

					}
				}


		}
	});	
}
/**
 * 完成按钮事件.
 */
function sumitinsert() {
		//	  输入验证.
	// 	if (!validate()) return;
	// 	var bkplusflg=$("bkplusflg").value;
	// 	if(bkplusflg=='1'){
	// 		MsgBox.confirm('书籍简介过长，系统已为您自动截取，是否继续？', '确认', function() {
	// 			sumitmxinsertover();
	// 			bkplusflg='0';
	// 		}, nullFunc, '是', '否');
	// 	}
	// 	else{
	// 		sumitmxinsertover();
	// 		bkplusflg='0';
	// 	}
	
	//	  有编辑状态书的校验.
	if (!aditbook()) return;
 	sumitmxinsertover();
}
/**
 * 有编辑状态书的校验.
 */
function aditbook() {
//	var aditflg="0";
	//书架上有书
	if(bookshelfnum>0){
	}
	else
	{
		  MsgBox.error(getMessage('js.ydb.error.0012'),'',function()  
		            {
		   $("isbn").select();
		            });
		  return;
	}

	
//	aditflg="1";
//	MsgBox.confirm('您好像有正在准备录入的图书是否继续录入？', '确认',function()
//        {
//		sumitmxinsertover();
//        },function(){
//        	aditflg="1";
//        },'是','否');
			
//	if(aditflg=="1"){
//		aditflg="0";
//		return;
//	}
//	else{
//		return true;
//	}	
	return true;
}





/**
 * 完成按钮事件.
 */
function sumitmxinsertover() {
// 	//图书信息登录
	var param = "";
//	//图书isbn
//	param = "bookinfo.isbn=" + $("isbn").value.strip();
//	//图书名称
//	param += "&bookinfo.bookname=" + $("bookname").value;
//	//图书册数
//	param += "&bookinfo.bookvolume=" + $("bookcs").value;
//	//图书第几册
//	param += "&bookinfo.volumenum=" + $("bookdijice").value;
//	//图书分类
//	param += "&bookinfo.booksort=" + $("bookfl").value;
//	//图书作者
//	param += "&bookinfo.bookauthor=" + $("bookzuozhe").value;
//	//图书出版社
//	param += "&bookinfo.bookpublisher=" + $("bookchubanshe").value;
//	//图书日期
//	param += "&bookinfo.bookpublishdate=" + $("bookchubanriqi").value;
//	//图书概要
//	param += "&bookinfo.booksummary=" + $("bookjianjie").value;
//	//图书图片向简介字段追加
//	param += "&bookinfo.bookpicadd=" + $("bkadd").value;
	//图书追加者ID
	param = "bookinfo.purseid=" +"YD"+ $("idInput").value;
	//图书追加者姓名
	param += "&bookinfo.pursename=" + $("nameInput").value;
	//图书本数
	param += "&booknumaction=0";
	param += "&radom=" + Math.random();
	//循环图书table明细信息bookshelfnum
	var tbl = document.getElementById('bookShelftable'); 
	var breakdataflg="0";
	var countdataflg=0;
	//书架上有书
	if(bookshelfnum>0){
		for(i=0;i<tbl.rows.length;i++){
			for(j=0;j<tbl.rows(i).cells.length;j++){
					if(j==0){
						var indexa= i * 2;
						param += "&finishinfohm["+indexa+"].isbn=" +document.getElementById('isbnshelfbk' + (indexa+1)).value;
						param += "&finishinfohm["+indexa+"].bookname=" +document.getElementById('booknameshelfbk' + (indexa+1)).value;
						//param += "&finishinfohm["+indexa+"].booknum=" +document.getElementById('booknumshelfbk' + (indexa+1)).value;
						param += "&finishinfohm["+indexa+"].booknum=1";
						countdataflg=countdataflg+1;

					}
					else{
						var indexa= i * 2;
						param += "&finishinfohm["+(indexa+1)+"].isbn=" +document.getElementById('isbnshelfbk' + (indexa+2)).value;
						param += "&finishinfohm["+(indexa+1)+"].bookname=" +document.getElementById('booknameshelfbk' + (indexa+2)).value;
						//param += "&finishinfohm["+(indexa+1)+"].booknum=" +document.getElementById('booknumshelfbk' + (indexa+2)).value;
						param += "&finishinfohm["+(indexa+1)+"].booknum=1";
						countdataflg=countdataflg+1;
					}
					if(countdataflg==bookshelfnum){
						
						breakdataflg="1";
						break;
					}
			}
			if(breakdataflg=="1"){
				breakdataflg="0";
				break;
			}
			
			
		}
		
		var url = "bookinsertfinish.action?" + param;
		if (document.readyState=="complete"){
			document.getElementById("commonmessage").innerHTML="数据处理中，请稍候......";
			$('loader_container').className='';
			
		}
		$("booklogingm").action = url;
		$("booklogingm").submit();	
	}
	else{
		  MsgBox.error(getMessage('js.ydb.error.0012'),'',function()
		            {
		   $("isbn").select();
		            });
	}

}



/**
 * 完成并登录下一条按钮事件.
 */
function sumitinsertnext() {
	//	  输入验证.
 	if (!validate()) return;
 	var bkplusflg=$("bkplusflg").value;
 	if(bkplusflg=='1'){
 		MsgBox.confirm('书籍简介过长，系统已为您自动截取，是否继续？', '确认', function() {
 			sumitmxinsert();
 			bkplusflg='0';
 		}, nullFunc, '是', '否');
 	}
 	else{
 		sumitmxinsert();
 		bkplusflg='0';
 	}
	
}


/**
 * 完成并登录下一条按钮事件.
 */
function sumitmxinsert() {
 	//图书信息保存备份
 	savebooktoshelfbkinfo();
 	//图书信息登录
	var param = "";
	//图书isbn
	param = "bookinfo.isbn=" + $("isbn").value.strip();
	//图书名称
	param += "&bookinfo.bookname=" + encodeURIComponent($("bookname").value.strip());
	//图书册数
	param += "&bookinfo.bookvolume=" + $("bookcs").value;
	//图书第几册
	param += "&bookinfo.volumenum=" + $("bookdijice").value;
	//图书分类
	param += "&bookinfo.booksort=" + $("bookfl").value;
	//图书作者
	param += "&bookinfo.bookauthor=" + encodeURIComponent($("bookzuozhe").value.strip());
	//图书出版社
	param += "&bookinfo.bookpublisher=" + encodeURIComponent($("bookchubanshe").value.strip());
	//图书日期
	param += "&bookinfo.bookpublishdate=" + $("bookchubanriqi").value;
	//图书概要
	param += "&bookinfo.booksummary=" + encodeURIComponent($("bookjianjie").value.strip());
	//图书图片向简介字段追加
	param += "&bookinfo.bookpicadd=" + $("bkadd").value;
	//图书追加者ID
	param += "&bookinfo.purseid="+"YD" + $("idInput").value;
	//图书追加者姓名
	param += "&bookinfo.pursename=" + $("nameInput").value;
	//图书本数
	param += "&booknumaction=" + $("booknum").value;
	//图书本数备份留着弹出信息贡献度用
	booknumbk=$("booknum").value;
	//图书网页图片备份
	bookaddressbk=$("bkadd").value;
	param += "&radom=" + Math.random();
	var url = "bookuserinsert.action";
	//编码转换
//	url = encodeURI(url);
	new Ajax.Updater('bookmxdiv', url , { 
		method : 'post',
		parameters: param,
		onLoading : function() {},
		onSuccess : function(response) {},
		onComplete : function(request) {
			var flg = checkException(request);
			if (!flg) {
				if($("bkuserid").value==$("idInput").value){
					showOpTipinsertbook(getMessage('js.ydb.info.0008',booknumbk));
				}
				else{
					showOpTipinsertbook('操作成功！');
				}

			$("isbn").select();
			}


		}
	});		
	for(k=0;k<Number(shelfbooknum);k++ )
	{
		addImgToTable();
	}
	
	clearbooktoshelfbkinfo();
}
/**
 * 图书信息保存备份.
 */
function savebooktoshelfbkinfo() {
	//图书isbn
	shelfisbn = $("isbn").value.strip();
	//图书名称
	shelfbookname =$("bookname").value.strip();
	//图书册数
	shelfbookcs =  $("bookcs").value;
	//图书第几册
	shelfbookdijice = $("bookdijice").value;
	//图书分类
	shelfbookfl = $("bookfl").value;
	//图书作者
	shelfbookzuozhe = $("bookzuozhe").value.strip();
	//图书出版社
	shelfbookchubanshe =  $("bookchubanshe").value.strip();
	//图书日期
	shelfbookchubanriqi =  $("bookchubanriqi").value;
	//图书概要
	shelfbookjianjie =  $("bookjianjie").value.strip();
	//图书图片向简介字段追加
	shelfbooktpadd =  $("bkadd").value;
	//图书本数
	shelfbooknum =  $("booknum").value;
}
/**
 * 图书信息保存备份的初始化.
 */
function clearbooktoshelfbkinfo() {
	var shelfisbn='';
	var shelfbookname='';
	var shelfbookcs='';
	var shelfbookdijice='';
	var shelfbookfl='';
	var shelfbookzuozhe='';
	var shelfbooknum='';
	var shelfbookchubanshe='';
	var shelfbookchubanriqi='';
	var shelfbookjianjie='';
	var shelfbooktpadd='';
}
/**
 * 向td加入图片以及增加td
 */
function addImgToTable() 
{ 
	var tbl = document.getElementById('bookShelftable'); 
	var lastRow = tbl.rows.length; 
	var iteration = lastRow; 
	var iteration1 = iteration+1; 
	var iterationleft = (Number(iteration) * 2) + 1;
	var iterationright = (Number(iteration) * 2) + 2; 
	var count=0;
	var breakflg='0';
	//图片多于10个并且为奇数列时插入隐藏<td>
	if(bookshelfnum>=10 && (bookshelfnum % 2) == 0 ){
		var row = tbl.insertRow(lastRow); 
		// left cell 
		var cellLeft = row.insertCell(0); 
		cellLeft.className='leftEmpty';
		cellLeft.ondblclick=returndata;
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'isbnshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'booknameshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookcsshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookdijiceshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookflshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookzuozheshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'booknumshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookchubansheshelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookriqishelfbk' + iterationleft; 
		el.className = 'none'; 
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookjianjieshelfbk' + iterationleft; 
		el.className = 'none'; 	
		cellLeft.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bkaddshelfbk' + iterationleft; 
		el.className = 'none'; 	
		cellLeft.appendChild(el);
	
		// right cell 
		var cellRight = row.insertCell(1); 
		cellRight.className='rightEmpty';
		cellRight.ondblclick=returndata;
		cellRight.id='shelftd'+iterationright;
	
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'isbnshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'booknameshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookcsshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookdijiceshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookflshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookzuozheshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'booknumshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookchubansheshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookriqishelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el); 
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bookjianjieshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el);
		var el = document.createElement('input'); 
		el.type = 'text'; 
		el.id = 'bkaddshelfbk' + iterationright; 
		el.className = 'none'; 
		cellRight.appendChild(el);
		
		withflg='1';

	}
	//table的行数5
	for(i=0;i<tbl.rows.length;i++){
		for(j=0;j<tbl.rows(i).cells.length;j++){
			count=count+1;
			if(count>bookshelfnum){
				var el = document.createElement('img'); 
				el.id = 'imgid' + i+j; 
				if(withflg=='1'){
					el.className = 'shelf_img_style margin_left_2 cur_pointer';
				}
				else{
					el.className = 'shelf_img_style margin_left_15 cur_pointer';
				}
				 
				if (bookaddressbk==""){
					el.src="../images/defaultCover_ydb.jpg";
				}
				else{
//					el.src=bookaddressbk;
					el.src="library/getFile.action?fileName="+bookaddressbk;
					
				}
				if(j==0){
					tbl.rows(i).cells(j).className='leftFull';
					tbl.rows(i).cells(j).title='请双击参照';

					//向书架隐藏区域赋值
					var indexa= i * 2;
					document.getElementById('isbnshelfbk' + (indexa+1)).value=shelfisbn;
					document.getElementById('booknameshelfbk' + (indexa+1)).value=shelfbookname;
					document.getElementById('bookcsshelfbk' + (indexa+1)).value=shelfbookcs;
					document.getElementById('bookdijiceshelfbk' + (indexa+1)).value=shelfbookdijice;
					document.getElementById('bookflshelfbk' + (indexa+1)).value=shelfbookfl;
					document.getElementById('bookzuozheshelfbk' + (indexa+1)).value=shelfbookzuozhe;
					document.getElementById('booknumshelfbk' + (indexa+1)).value=shelfbooknum;
					document.getElementById('bookchubansheshelfbk' + (indexa+1)).value=shelfbookchubanshe;
					document.getElementById('bookriqishelfbk' + (indexa+1)).value=shelfbookchubanriqi;
					document.getElementById('bookjianjieshelfbk' + (indexa+1)).value=shelfbookjianjie;
					document.getElementById('bkaddshelfbk' + (indexa+1)).value=shelfbooktpadd;
	
					
				}
				else{
					tbl.rows(i).cells(j).className='rightFull';
					tbl.rows(i).cells(j).title='请双击参照';
					//向书架隐藏区域赋值
					var indexa= i * 2;
					document.getElementById('isbnshelfbk' + (indexa+2)).value=shelfisbn;
					document.getElementById('booknameshelfbk' + (indexa+2)).value=shelfbookname;
					document.getElementById('bookcsshelfbk' + (indexa+2)).value=shelfbookcs;
					document.getElementById('bookdijiceshelfbk' + (indexa+2)).value=shelfbookdijice;
					document.getElementById('bookflshelfbk' + (indexa+2)).value=shelfbookfl;
					document.getElementById('bookzuozheshelfbk' + (indexa+2)).value=shelfbookzuozhe;
					document.getElementById('booknumshelfbk' + (indexa+2)).value=shelfbooknum;
					document.getElementById('bookchubansheshelfbk' + (indexa+2)).value=shelfbookchubanshe;
					document.getElementById('bookriqishelfbk' + (indexa+2)).value=shelfbookchubanriqi;
					document.getElementById('bookjianjieshelfbk' + (indexa+2)).value=shelfbookjianjie;
					document.getElementById('bkaddshelfbk' + (indexa+2)).value=shelfbooktpadd;	

				}
				tbl.rows(i).cells(j).appendChild(el);
				bookshelfnum=bookshelfnum+1;
				breakflg='1';
				break ;
			}
		}
	if(breakflg=='1')
	{
		breakflg='0';
		break ;
	}

  }
	document.getElementById ( "bookdiv").scrollTop=document.getElementById ( "bookdiv").scrollHeight ;
} 
/**
 * 向td加入图片以及增加td
 */
function returndata(obj) {
	var objId; 
	if (obj != null) { 
	objId = obj.id; 
	} else { 
	objId = this.id; 
	} 
	var tbl = document.getElementById('bookShelftable'); 
	for(i=0;i<tbl.rows.length;i++){
		for(j=0;j<tbl.rows(i).cells.length;j++){
			if(tbl.rows(i).cells(j).id==objId){
				if($('imgid'+i+j)!=null){
				if(j==0){
					var indexa= i * 2;
					$("isbn").value=document.getElementById('isbnshelfbk' + (indexa+1)).value;
					$("bookname").value=document.getElementById('booknameshelfbk' + (indexa+1)).value;
					$("bookcs").value=document.getElementById('bookcsshelfbk' + (indexa+1)).value;
					if($("bookcs").value!=""){
						resultlevelControl($("bookcs").value);
					}
					else{
						$("bookcs").value="1";
						resultlevelControl(1);
					}
					$("bookdijice").value=document.getElementById('bookdijiceshelfbk' + (indexa+1)).value;
					if($("bookdijice").value==""){
						$("bookdijice").value="1";
					}
					$("bookfl").value=document.getElementById('bookflshelfbk' + (indexa+1)).value;
					$("bookzuozhe").value=document.getElementById('bookzuozheshelfbk' + (indexa+1)).value;
//					$("booknum").value=document.getElementById('booknumshelfbk' + (indexa+1)).value;
					$("bookchubanshe").value=document.getElementById('bookchubansheshelfbk' + (indexa+1)).value;
					$("bookchubanriqi").value=document.getElementById('bookriqishelfbk' + (indexa+1)).value;
					$("bookjianjie").value=document.getElementById('bookjianjieshelfbk' + (indexa+1)).value;
					$("bkadd").value=document.getElementById('bkaddshelfbk' + (indexa+1)).value;
				}
				else{
					var indexa= i * 2;
					$("isbn").value=document.getElementById('isbnshelfbk' + (indexa+2)).value;
					$("bookname").value=document.getElementById('booknameshelfbk' + (indexa+2)).value;
					$("bookcs").value=document.getElementById('bookcsshelfbk' + (indexa+2)).value;
					if($("bookcs").value!=""){
						resultlevelControl($("bookcs").value);
					}
					else{
						$("bookcs").value="1";
						resultlevelControl(1);
					}
					$("bookdijice").value=document.getElementById('bookdijiceshelfbk' + (indexa+2)).value;
					if($("bookdijice").value==""){
						$("bookdijice").value="1";
					}
					$("bookfl").value=document.getElementById('bookflshelfbk' + (indexa+2)).value;
					$("bookzuozhe").value=document.getElementById('bookzuozheshelfbk' + (indexa+2)).value;
//					$("booknum").value=document.getElementById('booknumshelfbk' + (indexa+2)).value;
					$("bookchubanshe").value=document.getElementById('bookchubansheshelfbk' + (indexa+2)).value;
					$("bookchubanriqi").value=document.getElementById('bookriqishelfbk' + (indexa+2)).value;
					$("bookjianjie").value=document.getElementById('bookjianjieshelfbk' + (indexa+2)).value;
					$("bkadd").value=document.getElementById('bkaddshelfbk' + (indexa+2)).value;
				}
				}
			}
		}
		
	}
	
}

/**
 * 输入ISBN验证检索用.
 */
function validatesercth() {
	//为空验证
	if ($("isbn").value.strip() == '') {
		$("isbn").style.backgroundColor = "#F24024";
	}
	else{
		$("isbn").style.backgroundColor = "";
	}
	  if($("isbn").value.strip()==""){
		  MsgBox.error(getMessage('js.com.warning.0001', '图书ISBN号'),'',function()
		             {
		    $("isbn").select();
		             });
		   return false;
		 }

	// isbn号数字字母验证
	 var pattern =/^[a-z0-9]*$/i;
	 var str = $("isbn").value; //我们需要测试的字符串对象
	 var msg = pattern.test(str) ? "t" : "f";
	 if(msg=="f"){
	 $("isbn").style.backgroundColor = "#F24024";
	 }
	 else{
	  $("isbn").style.backgroundColor = "";
	 }
	 if(msg=="f"){
	  
	  MsgBox.error('ISBN号只能是数字与字母的组合！','',function()
	            {
	   $("isbn").select();
	            });
	  return;
	 } 
	 else{
	  $("isbn").style.backgroundColor = "";
	 }	
		return true;
}


/**
 * 输入验证.
 */
function validate() {
//	员工号验证
	if ($("idInput").value == '') {
		$("idInput").style.backgroundColor = "#F24024";
	}
	else{
		$("idInput").style.backgroundColor = "";
	}
	if($("idInput").value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '员工ID'),'',function()
            {
			$("idInput").focus();
            });
		return;
	}	
	else{
		$("idInput").style.backgroundColor = "";
	}
//	员工姓名验证
	if ($("nameInput").value == '') {
		$("nameInput").style.backgroundColor = "#F24024";
	}
	else{
		$("nameInput").style.backgroundColor = "";
	}
	if($("nameInput").value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '员工姓名'),'',function()
            {
			$("nameInput").focus();
            });
		return;
	}	
	else{
		$("nameInput").style.backgroundColor = "";
	}
//	isbn号验证
	if ($("isbn").value.strip() == '') {
		$("isbn").style.backgroundColor = "#F24024";
	}
	else{
		$("isbn").style.backgroundColor = "";
	}
	if($("isbn").value.strip() == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书ISBN号'),'',function()
            {
			$("isbn").select();
            });
		return;
	}	
	else{
		$("isbn").style.backgroundColor = "";
	}
	// isbn号数字字母验证
	 var pattern =/^[a-z0-9]*$/i;
	 var str = $("isbn").value; //我们需要测试的字符串对象
	 var msg = pattern.test(str) ? "t" : "f";
	 if(msg=="f"){
	 $("isbn").style.backgroundColor = "#F24024";
	 }
	 else{
	  $("isbn").style.backgroundColor = "";
	 }
	 if(msg=="f"){
	  
	  MsgBox.error('ISBN号只能是数字与字母的组合！','',function()
	            {
	   $("isbn").select();
	            });
	  return;
	 } 
	 else{
	  $("isbn").style.backgroundColor = "";
	 }
	
//	图书名称验证
	if ($("bookname").value.strip() == '') {
		$("bookname").style.backgroundColor = "#F24024";
	}
	else{
		$("bookname").style.backgroundColor = "";
	}
	if($("bookname").value.strip() == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书名称'),'',function()
            {
			$("bookname").focus();
            });
		return;
	}	
	else{
		$("bookname").style.backgroundColor = "";
	}
//	图书名称长度验证
	if ($("bookname").value.length>40) {
		$("bookname").style.backgroundColor = "#F24024";
	}
	else{
		$("bookname").style.backgroundColor = "";
	}
	if($("bookname").value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','图书名称','40'),'',function()
            {
			$("bookname").focus();
            });
		return;
	}	
	else{
		$("bookname").style.backgroundColor = "";
	}	
//	图书册数为空验证
	if ($("bookcs").value == '') {
		$("bookcs").style.backgroundColor = "#F24024";
	}
	else{
		$("bookcs").style.backgroundColor = "";
	}
	if($("bookcs").value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书册数'),'',function()
            {
			$("bookcs").focus();
            });
		return;
	}	
	else{
		$("bookcs").style.backgroundColor = "";
	}
//	图书分类验证
	if ($("bookfl").value == '-1') {
		MsgBox.error(getMessage('js.com.warning.0001', '图书分类'),'',function()
            {
			$("bookfl").focus();
            });
		return;
	}	
//	图书数量为空验证
	if ($("booknum").value == '') {
		$("booknum").style.backgroundColor = "#F24024";
	}
	else{
		$("booknum").style.backgroundColor = "";
	}
	if($("booknum").value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书数量'),'',function()
            {
			$("booknum").focus();
            });
		return;
	}	
	else{
		$("booknum").style.backgroundColor = "";
	}
	 // 图书数量数字验证
	 var pattern =/^[0-9]*$/;
	 var str = $("booknum").value; //我们需要测试的字符串对象
	 var msg = pattern.test(str) ? "t" : "f";
	  if(msg=="f"){
	 $("booknum").style.backgroundColor = "#F24024";
	 }
	 else{
	  $("booknum").style.backgroundColor = "";
	 }
	 if(msg=="f"){
	  
	  MsgBox.error('图书数量只能是整数！','',function()
	            {
	   $("booknum").select();
	            });
	  return;
	 } 
	 else{
	  $("booknum").style.backgroundColor = "";
	 }

//	图书数量>0验证
	var numvalidate=$("booknum").value;
	if (Number(numvalidate)<1) {
		$("booknum").style.backgroundColor = "#F24024";
	}
	else{
		$("booknum").style.backgroundColor = "";
	}
	if(Number(numvalidate)<1 ){
		
		MsgBox.error(getMessage('js.ydb.error.0008', '图书数量'),'',function()
            {
			$("booknum").select();
            });
		return;
	}	
	else{
		$("booknum").style.backgroundColor = "";
	}	
	//图书数量<10验证
	var numvalidate=$("booknum").value;
	if (Number(numvalidate)>10) {
		$("booknum").style.backgroundColor = "#F24024";
	}
	else{
		$("booknum").style.backgroundColor = "";
	}
	if(Number(numvalidate)>10 ){
		
		MsgBox.error(getMessage('js.ydb.error.0010','图书数量','等于10'),'',function()
	        {
			$("booknum").select();
	        });
		return;
	}	
	else{
		$("booknum").style.backgroundColor = "";
	}	
//	图书作者长度验证
	if ($("bookzuozhe").value.length>40) {
		$("bookzuozhe").style.backgroundColor = "#F24024";
	}
	else{
		$("bookzuozhe").style.backgroundColor = "";
	}
	if($("bookzuozhe").value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','作者','40'),'',function()
            {
			$("bookzuozhe").focus();
            });
		return;
	}	
	else{
		$("bookzuozhe").style.backgroundColor = "";
	}
//	图书出版社长度验证
	if ($("bookchubanshe").value.length>40) {
		$("bookchubanshe").style.backgroundColor = "#F24024";
	}
	else{
		$("bookchubanshe").style.backgroundColor = "";
	}
	if($("bookchubanshe").value.length>40 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','出版社','40'),'',function()
            {
			$("bookchubanshe").focus();
            });
		return;
	}	
	else{
		$("bookchubanshe").style.backgroundColor = "";
	}	
//	图书简介长度验证
	if ($("bookjianjie").value.length>2000) {
		$("bookjianjie").style.backgroundColor = "#F24024";
	}
	else{
		$("bookjianjie").style.backgroundColor = "";
	}
	if($("bookjianjie").value.length>2000 ){
		
		MsgBox.error(getMessage('js.com.warning.0007','图书简介','2000'),'',function()
            {
			$("bookjianjie").focus();
            });
		return;
	}	
	else{
		$("bookjianjie").style.backgroundColor = "";
	}	
	return true;
}


/**
 * 去掉图书数量输入框数字前面的0.
 * obj为控件名称.
 * objValue为obj的value值.
 */
function ducezero(obj,objValue){
	  var tempKey;
	  if( objValue != ""  )
	  {
		  for(var a=0;a<objValue.length;a++)
		  {
			   tempKey = objValue[0];
		  }
	  }
		  
	if( objValue != "" &&  tempKey!='-' ){
		objValue = (parseInt((objValue=objValue.replace(/\D/g,''))==''?'0':objValue,10));
		obj.value = objValue;
	}
  	 
}
/**  
 * 日期的格式化YYYY-MM-DD
 * @param objId 控件ID
 * @param objTime 控件Value
*/
function dateFormat(objId,objTime){

	if( objTime == "" ){
	
		return false;
		
	}else{
		
		if( objTime.length == 8 ){
			var objYear = objTime.substring(0,4);
			var objMonth = objTime.substring(4,6);
			var objDay = objTime.substring(6,8);
			var Date = objYear + "-" + objMonth + "-" + objDay;
	
			if(objYear>"2100" || objYear< "1900" || objMonth>"12" || objMonth< "01" || objDay>getMaxDay(objYear,objMonth) || objDay< "01") {
				MsgBox.error(getMessage('js.com.warning.0002', '日期'),'',function()
			            {
					$(objId).value = "";
					$(objId).focus();
			            });
			}else{
				$(objId).value = Date;
			}
		}
		if( objTime.length < 8 || objTime.length == 9 ){
			MsgBox.error(getMessage('js.com.warning.0002', '日期'),'',function()
		            {
				$(objId).value = "";
				$(objId).focus();
		            });
		}
	}
}
/**
 *获取当月的最后一天
*/
function getMaxDay(year,month) {

	if(month==4||month==6||month==9||month==11){

		return "30";
	}
	if(month==2){

		if(year%4==0&&year%100!=0 || year%400==0){

			return "29";
		}
		else{

			return "28";
			
		}
	}
	return "31";

}
/**
 *弹出贡献度
*/
function showOpTipinsertbook(msg) {
	if (!$('operateTipinsert') || $('operateTipinsert').value == '' && !Object.isString(msg)) return;
	if (!Object.isString(msg)) {
		$('opTipBoxIn').update($('operateTipinsert').value).show();
		$('operateTipinsert').value = '';
	} else {
		$('opTipBoxIn').update(msg).show();
	}
	$('opTipBox').show();
	Element.hide.delay(3, 'opTipBox');
	
}
/**
 *限制备注文字字数
*/

function   Check(src){   

	var bkplusflg=$("bkplusflg").value;
 	if(bkplusflg=='1'){
 		$("bkplusflg").value='0';
 	}
  var   Temp=src.value.substring(0,src.value.length-1);   
  if(src.value.length>2000)   
        src.value=src.value.substring(0,2000);   
}