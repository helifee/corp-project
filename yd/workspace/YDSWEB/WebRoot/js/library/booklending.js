/*
 * @(#)booklending.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
/**
 * jason相关数据.
 */
var g_hysData;
/**
 * jason相关库存数据.
 */
var g_hysDatakc;

/**
 * jason复数书籍验证相关数据.
 */
var g_hysmanyData;

/**
 * jason密码验证相关数据.
 */
var g_mimaTFData;

/**
 * 信息弹出窗.
 */
var g_hysInfo;
/**
 * isbn重复后多书框追加过程用
 */
var isbnmany='0';


$('loader_container').className='none';

/**
 * 页面初始化.
 */

function init() {
	initHead("图书借阅",true,true);
	var title1,	title2,title3;
	title1=document.getElementById('title1').value;
	title2=document.getElementById('title2').value;
	title3=document.getElementById('title3').value;
	setUserInfo(getMessage('js.ydb.info.0006', title1,title2,title3) + getMessage('js.ydb.info.0015'));
	
	$('isbn').focus();
	g_hysInfo = new PopupBox({
		key: 'dis',
		title: $('distInfoTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('distInfo'),
		position: 5,
		drag: true,
		beforeclose: function() {
		//弹出窗口数据清空table
		cleartable();		
				g_hysInfo.Close(0);
				$("isbn").select();
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
				$("isbn").select();
			return false;
		}
	});

	regBtnFunc();
	Element.removeClassName(document.body, 'none');
}
function findObj(theObj, theDoc)
{
	var p, i, foundObj;
	if(!theDoc) theDoc = document;
	if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
	{ 
	   theDoc = parent.frames[theObj.substring(p+1)].document;   
	   theObj = theObj.substring(0,p); 
	} 
	if(!(foundObj = theDoc[theObj]) && theDoc.all) 
	   foundObj = theDoc.all[theObj]; 
	
	for (i=0; !foundObj && i < theDoc.forms.length; i++)    
	   foundObj = theDoc.forms[i][theObj]; 
	
	for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++)    
	   foundObj = findObj(theObj,theDoc.layers[i].document); 
	   
	if(!foundObj && document.getElementById) 
	   foundObj = document.getElementById(theObj);   
	
	return foundObj;
}
/**
 * 添加一行图书明细.
 * para：  obj传输数据，addobj：后台传''，还是弹出框传'1'.
 */
function AddSignRow(obj,addobj){
	//读取最后一行的行号，存放在txtTRLastIndex文本框中
		var txtTRLastIndex = findObj("txtTRLastIndex",document);
		var rowID = parseInt(txtTRLastIndex.value);
		var signFrame = findObj("SignFrame",document);
		//添加行
		var newTR = signFrame.insertRow(signFrame.rows.length);
		newTR.id = "SignItem" + rowID;
		
		//添加列:bookid序号
		var newBookidTD=newTR.insertCell(0);
		//添加列内容
		if(addobj=='1')
		{newBookidTD.innerHTML = obj.bookid;}
		else
		{newBookidTD.innerHTML = obj[0].bookid;}
		
		newBookidTD.className="none";
		//添加列:ISBN
		var newIsbnTD=newTR.insertCell(1);
		//添加列内容
		if(addobj=='1')
		{newIsbnTD.innerHTML = obj.isbn;	}
		else
		{newIsbnTD.innerHTML = obj[0].isbn;	}
		
		
		//添加列:书籍名称
		var newBooknameTD=newTR.insertCell(2);
		//添加列内容
		if(addobj=='1')
		{newBooknameTD.innerHTML = obj.bookname;newBooknameTD.title=obj.bookname;}
		else
		{newBooknameTD.innerHTML = obj[0].bookname;newBooknameTD.title=obj[0].bookname;}
		
		
		//添加列:书籍作者
		var newBookauthorTD=newTR.insertCell(3);
		//添加列内容
		if(addobj=='1')
		{newBookauthorTD.innerHTML = obj.bookauthor;newBookauthorTD.title=obj.bookauthor;}
		else
		{newBookauthorTD.innerHTML = obj[0].bookauthor;newBookauthorTD.title=obj[0].bookauthor;}
		
		
		//添加列:书籍出版社
		var newBookpublisherTD=newTR.insertCell(4);
		//添加列内容
		if(addobj=='1')
		{newBookpublisherTD.innerHTML = obj.bookpublisher;newBookpublisherTD.title=obj.bookpublisher;}
		else
		{newBookpublisherTD.innerHTML = obj[0].bookpublisher;newBookpublisherTD.title=obj[0].bookpublisher;}
		
		
		//添加列:删除按钮
		var newDeleteTD=newTR.insertCell(5);
		//添加列内容
		newDeleteTD.innerHTML = "<div align='center'><a href='javascript:;' onclick=\"DeleteSignRow('SignItem" + rowID + "')\">删除</a></div>";
		
		//添加列:图书第几册
		var newBookvolumenumTD=newTR.insertCell(6);
		//添加列内容
		if(addobj=='1')
		{newBookvolumenumTD.innerHTML = obj.volumenum;}
		else
		{newBookvolumenumTD.innerHTML = obj[0].volumenum;}
		newBookvolumenumTD.className="none";
		
		//将行号推进下一行
		txtTRLastIndex.value = (rowID + 1).toString() ;
		
		$('isbn').focus();
		}

/**
 * 向明细多行书籍popup框赋值.
 * para： obj[j].
 */

function AddManyBookRow(obj){ 
		//读取最后一行的行号，存放在txtTRLastIndex文本框中
		var txtTRLastIndex = findObj("txtpopupTRLastIndex",document);
		var rowID = parseInt(txtTRLastIndex.value);
		var signFrame = findObj("jieshumxtbl",document);
		//添加行
		var newTR = signFrame.insertRow(signFrame.rows.length);
		newTR.id = "SignItem" + rowID;
		//添加列:bookid序号
		var newBookidTD=newTR.insertCell(0);
		//添加列内容
		newBookidTD.innerHTML = obj.bookid;
		newBookidTD.className="none";
		
		//添加列:ISBN
		var newIsbnTD=newTR.insertCell(1);
		//添加列内容
		newIsbnTD.innerHTML = obj.isbn;
		
		//添加列:书籍名称
		var newBooknameTD=newTR.insertCell(2);
		//添加列内容
		newBooknameTD.innerHTML = obj.bookname;
		newBooknameTD.title=obj.bookname;
		
		//添加列:书籍作者
		var newBookauthorTD=newTR.insertCell(3);
		//添加列内容
		newBookauthorTD.innerHTML = obj.bookauthor;
		newBookauthorTD.title=obj.bookauthor;
		
		//添加列:书籍出版社
		var newBookpublisherTD=newTR.insertCell(4);
		//添加列内容
		newBookpublisherTD.innerHTML = obj.bookpublisher;
		newBookpublisherTD.title=obj.bookpublisher;
		
		
		//添加列:删除按钮
		var newDeleteTD=newTR.insertCell(5);
		//添加列内容
		newDeleteTD.innerHTML ="<div align='center'><input name='ckBefor" + rowID + "' id='ckBefor" + rowID +  "' type='checkbox'/> </div>";
		
		//添加列:书籍第几册
		var newBookvolumenumTD=newTR.insertCell(6);
		//添加列内容
		newBookvolumenumTD.innerHTML = obj.volumenum;
		newBookvolumenumTD.className="none";
		
		//将行号推进下一行
		txtTRLastIndex.value = (rowID + 1).toString() ;
		}



/**
 * 删除指定行.
 * para： rowid.
 */
function DeleteSignRow(rowid){
		var signFrame = findObj("SignFrame",document);
		var signItem = findObj(rowid,document);
		
		//获取将要删除的行的Index
		var rowIndex = signItem.rowIndex;	
		//删除指定Index的行
		signFrame.deleteRow(rowIndex);
		}
/**
 * ISBN回车键按下事件.
 */
function addbck(){
		if (window.event.keyCode==13)
		{
			addbuttonclick();	
		}
	}

/**
 * I密码回车键按下事件.
 */

function mimaclick(){
			if (window.event.keyCode==13)
			{
				sumitlending();	
			}
		}
/**
 * I追加按钮事件.
 */

function addbuttonclick(){
			//输入验证.
		 	if (!validate()) return;
		 	//借书上限验证
		 	if (!checkbooknum(1)) return;
		 	//验证此'ISBN'是否已被选入列表
		 	if (!checkisbnexist()) return;
		 	//检索ISBN对应的书籍	
			var param = "";
			param += "booklendingsercthbean.isbn=" + encodeURIComponent($("isbn").value);
			param += "&radom=" + Math.random();
			var url = "booklendingadd.action?" + param;
			new Ajax.Request(url, {
				method: 'get',
			
				onSuccess: function(response) {},
			    onComplete : function(request) {
					
				var flg = checkException(request);
					
				if (!flg) {
					g_hysData = request.responseText.evalJSON();
				//判断后台传回的数组个数 
				//没检索到书籍的时候
					if(g_hysData.length==0)
					{
						//MsgBox.message(getMessage('js.ydb.error.0002'),'',function()
						// {
						//$("isbn").select();
						//  });
						
						var url = "booklendingaddkc.action?" + param;
						new Ajax.Request(url, {
							method: 'get',
							onSuccess: function(response) {},
						    onComplete : function(request) {
								var flg = checkException(request);
								
								if (!flg) {
								g_hysDatakc = request.responseText.evalJSON();
								if(g_hysDatakc.length>0){
									MsgBox.message(getMessage('js.ydb.error.0011'),'',function()
								            {
											$("isbn").select();
								            });
								}
								else{
									MsgBox.message(getMessage('js.ydb.error.0002'),'',function()
								            {
											$("isbn").select();
								            });
								}
								
								}
								
								}
							});
	
						
					}
					//检索到一本书籍时候
					if(g_hysData.length==1)
					{
						AddSignRow(g_hysData,'');	
					}
					//检索到同一个ISBN号多本书的时候
					if(g_hysData.length>1)
					{
						//循环向popup框赋值
						for(var j=0; j<g_hysData.length;j++)
						{
							AddManyBookRow(g_hysData[j]);
						}
						g_hysInfo.Popup();
						$("isbn").blur();
						
					}			
				}
			
				}
			});	
		
		}
/**
 * 输入验证.
 */
function validate() {
	
	if ($("isbn").value == '') {
		$("isbn").style.backgroundColor = "#F24024";
	}
	else{
		$("isbn").style.backgroundColor = "";
	}
	if($("isbn").value == '' ){
		
		MsgBox.error(getMessage('js.com.warning.0001', '图书ISBN号'),'',function()
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
 * 借书数量判定.
 */
function checkbooknum(obj){
		var maxlimitbknum=$('title1').value;
		var bklendednum=$('title2').value;
		var limitbknum=$('title3').value;
		var lendedbknum=0;
		var signFrame = findObj("SignFrame",document);
		for(i=0;i<signFrame.rows.length;i++){
			lendedbknum += 1;
		}
		lendedbknum=lendedbknum-1;
		var readynum=parseInt(lendedbknum)+parseInt(bklendednum);
	
		var plusnum=parseInt(maxlimitbknum)-readynum;
		var xuanzenum;
	
		xuanzenum=parseInt(obj)+parseInt(lendedbknum);
		//1211
	    if(xuanzenum>limitbknum)
	    {
			MsgBox.message(getMessage('js.ydb.error.0001', maxlimitbknum,readynum,plusnum),'',function()
		            {
					$("isbn").select();
		            });
			return;
	    }
	    return true;
	    
	}
/**
 * ISBN号是否已被选入列表验证
 */
function checkisbnexist()
{
	var isbnhao=$('isbn').value;
	var signFrame = findObj("SignFrame",document);
	var manynum=0;
	var equaltf=0;
	var param;
	var parambookid;
	if(signFrame.rows.length>1)
	{
		for(var s=1;s<signFrame.rows.length;s++)
		{
			var mubaioisbn=signFrame.rows[s].cells[1].innerHTML;
			if(mubaioisbn==isbnhao)
				{
				manynum=manynum+1;
				parambookid=signFrame.rows[s].cells[0].innerHTML;
				paramvolumenum=signFrame.rows[s].cells[6].innerHTML;
				if(manynum==1)
				{
					
					
					param = "bookidlist["+(manynum-1)+"]=" + parambookid;
					param += "&bookisbnlist["+(manynum-1)+"]=" + encodeURIComponent($("isbn").value);
					param += "&bookvolumenumlist["+(manynum-1)+"]=" + paramvolumenum;
					
					param += "&radom=" + Math.random();
				}
				else
				{
					param += "&bookidlist["+(manynum-1)+"]=" + parambookid;
					param += "&bookisbnlist["+(manynum-1)+"]=" + encodeURIComponent($("isbn").value);
					param += "&bookvolumenumlist["+(manynum-1)+"]=" + paramvolumenum;
					param += "&radom=" + Math.random();
				}
				equaltf=1;
				
				}
		}
		if(equaltf==1)
		{
			equaltf=0;
			var url1 = "booklendsercthmanybook.action?" + param;
			new Ajax.Request(url1, {
				method: 'get',
			
				onSuccess: function(response) {},
			    onComplete : function(request) {
				var flg = checkException(request);
						
				if (!flg) {
					g_hysmanyData = request.responseText.evalJSON();
					if(g_hysmanyData.length==0)
					{

						MsgBox.message(getMessage('js.ydb.error.0003'),'',function()
					            {
								$("isbn").select();
					            });
						return;
						
					}
					else
					{
						//检索到一本书籍时候
						if(g_hysmanyData.length==1)
						{

							AddSignRow(g_hysmanyData,'');
							return;
						}
							//检索到同一个ISBN号多本书的时候
						if(g_hysmanyData.length>1)
						{

							//循环向popup框赋值
							for(var j=0; j<g_hysmanyData.length;j++)
							{
								AddManyBookRow(g_hysmanyData[j]);
								isbnmany='1';
							}
							g_hysInfo.Popup();	
							return;
						}	
						
					}
				}
				}
			});
			return;
		}
		else
		{
			return true;
		}
	}
    return true;
    
}
/**
 * 提交按钮事件
 */

function submitclick()
	{
	//判断是否追加过书籍
		var signFrame = findObj("SignFrame",document);
		var tablelength=signFrame.rows.length;
		if(tablelength==1)
		{
			MsgBox.message(getMessage('js.ydb.error.0004'),'',function()
		            {
				$("isbn").select();
		            });
		}
		else
		{
			g_hysmimaInfo.Popup();
			$('password').focus();
		}
	
	
	
	}
/**
 * 多种书籍层确认按钮事件
 */
function addbookmx()
	{
	//	选中个数
		var addnum=0;
		var signFrame = findObj("jieshumxtbl",document);
	
		for(i=1;i<signFrame.rows.length;i++)
		{
	
			if($('ckBefor'+i).checked)
				{
					addnum=addnum+1;
				}
		}
	 	if (!checkbooknum(addnum)) return;
		for(i=1;i<signFrame.rows.length;i++)
		{
	
			if($('ckBefor'+i).checked)
				{
				//向明细行添加数据
					if(	isbnmany=='1')
					{
						AddSignRow(g_hysmanyData[i-1],'1');
					}
					else
					{
						AddSignRow(g_hysData[i-1],'1');
					}
	
					
				}
		}	
		if(addnum>0)
		{
			isbnmany='0';
			//数据重置
			addnum=0;
			$('txtpopupTRLastIndex').value='1';
			//弹出窗口数据清空table
			cleartable();
			
			//弹出窗口关闭
			g_hysInfo.Close(0);
			
		}
		else
			{	
			MsgBox.message(getMessage('js.ydb.error.0005'),'',function()
		            {
		            });
			}	
	
	}
/**
 * 弹出窗口数据清空table
 */
function cleartable()
	{
		var signFrame = findObj("jieshumxtbl",document);
		var tablelength=signFrame.rows.length;
		if(tablelength>1)
		{
			for(var s=1;s<tablelength;s++)
				{
					signFrame.deleteRow(1);
					}
	}
		//索引付初值
		$('txtpopupTRLastIndex').value=1;
	}

/**
 * 密码确认按钮事件
 */
function sumitlending()
	{
		//	向后台传值
		var param = "";
		var mimaparam="";
		var bookid;
		var isbn;
		var signFrame = findObj("SignFrame",document);
		var tablelength=signFrame.rows.length;
	
			//验证密码逻辑
			if($("password").value=='')
			{
				MsgBox.message(getMessage('js.com.warning.0001', '密码'),'',function()
			            {
					$("password").focus();
			            });
			}
			else
			{		
				mimaparam=$("password").value;
				var url = "userpwvalidate.action?mimaparam=" +mimaparam ;
				new Ajax.Request(url, {
					method: 'get',
				
					onSuccess: function(response) {},
				    onComplete : function(request) {
						var flg = checkException(request);
						
						if (!flg) {
							
								if(request.responseText==1)
							    {
									g_hysmimaInfo.Close(0);
										//	用户借书信息登录逻辑
										for(i=1;i<signFrame.rows.length;i++)
										{
										
											bookid=signFrame.rows[i].cells[0].innerHTML;
											if(i==1)
											{
												param += "booklendinguserinsert[" +(i-1)+ "].bookid="+bookid;
												param += "&finishinfo[" +(i-1)+ "].bookid="+bookid;
											}
											else
											{
											param += "&booklendinguserinsert[" +(i-1)+ "].bookid="+bookid;
											param += "&finishinfo[" +(i-1)+ "].bookid="+bookid;
											}
										
											isbn=signFrame.rows[i].cells[1].innerHTML;
											
											param += "&booklendinguserinsert[" +(i-1)+ "].isbn=" +isbn;
											param += "&finishinfo[" +(i-1)+ "].isbn="+isbn;
											
											bookname=signFrame.rows[i].cells[2].innerHTML;
											
											param += "&booklendinguserinsert[" +(i-1)+ "].bookname=" +bookname;
											param += "&finishinfo[" +(i-1)+ "].bookname="+bookname;
										}
										var url = "booklendinginsert.action?" + param;
										if (document.readyState=="complete"){
											document.getElementById("commonmessage").innerHTML="数据处理中，请稍候......";
											$('loader_container').className='';
											
										}
										$("bookjiegm").action = url;
										$("bookjiegm").submit();	
							    }
								else
								{
									MsgBox.message(getMessage('js.ydb.error.0006'),'',function()
								            {
										$("password").select();
								            });
								}
						
						
					}
					}
				});	
				
			}
	
	}


/**
 *  弹出多种书籍层取消按钮事件.
 */
function cancelHys() {
	 cleartable();
	g_hysInfo.Close(0);
		$("isbn").select();
}
/**
 *  弹出密码层取消按钮事件.
 */
function cancelmimaHys() {
	$("password").value="";
	g_hysmimaInfo.Close(0);
	$("isbn").select();
}
