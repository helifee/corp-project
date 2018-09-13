function createWin(winId, winTitle, iframePage){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : '90%',
					height : 500,
					maximizable : true,
					modal : true,
					draggable :true,
					//closable :false,
					closable :true,
					html : "<iframe id='framewind' width='100%' height='100%' frameborder='0' src='"+
					iframePage+"'></iframe>"
				});
			}
			return win;
 }
 function createWinByHeiWid(winId, winTitle, iframePage,hei,wid){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : wid,
					height : hei,
					maximizable : true,
					modal : true,
					draggable :true,
					//closable :false,
					closable :true,
					html : "<iframe id='framewind' width='100%' height='100%' frameborder='0' src='"+
					iframePage+"'></iframe>"
				});
			}
			return win;
 }
function createPopWin(winId, winTitle, iframePage){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : 400,
					height : 150,
					maximizable : false,
					modal : true,
					autoScroll :false,
					resizable :false,
					closable :false,
					html : "<iframe id='framewind' width='100%' height='100%' frameborder='0' src='"+
					iframePage+"'></iframe>"
				});
			}
			return win;
 }
 function createPopWindow(winId, winTitle, iframePage,wid,hei){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : wid,
					height : hei,
					maximizable : false,
					modal : true,
					autoScroll :false,
					resizable :false,
					closable :false,
					html : "<iframe id='framewind' width='100%' height='100%' frameborder='0' src='"+
					iframePage+"'></iframe>"
				});
			}
			return win;
 }
function createAuthorWin(winId, winTitle, iframePage){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : 400,
					height : 250,
					maximizable : false,
					modal : true,
					autoScroll :false,
					resizable :false,
					closable :true,
					html : "<iframe id='framewind' width='100%' height='100%' frameborder='0' src='"+
					iframePage+"'></iframe>"
				});
			}
			return win;
 }

var tmpwin;
function viewDetails(newurl,tit) {
	if(tit != ""){
		var i = createWin("wind",tit,newurl);
	}else{
 		var i = createWin("wind","明细查询",newurl);
 	}
 	/*
 	i.on("beforedestroy",function(){
 		window.location.href= oldurl;
		return true;
 	});
 	*/
 	tmpwin = i;
 	i.show();
}
function viewDetailsByHeightWidth(newurl,tit,heigth,width) {
	if(tit != ""){
		var i = createWinByHeiWid("wind",tit,newurl,heigth,width);
	}else{
 		var i = createWinByHeiWid("wind","明细查询",newurl,heigth,width);
 	}
 	/*
 	i.on("beforedestroy",function(){
 		window.location.href= oldurl;
		return true;
 	});
 	*/
 	tmpwin = i;
 	i.show();
}
function imageshow(winId, winTitle, imgFile){
 	var win = Ext.getCmp(winId);
			if (!win) {
				win = new Ext.Window({
					id : winId,
					title :  winTitle,
					width : '90%',
					height : 400,
					maximizable : true,
					modal : true,
					closable :true,
					html : " <div id='newPreview'></div>"
				});
			}
			win.show();
			var newPreview = document.getElementById("newPreview"); 
			newPreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgFile.value;
			newPreview.style.width ="100%";
			newPreview.style.height = "100%";
			return win;
			
 }


function closeaddwin(newurl,oldurl,title) {
 	var i = createWin("wind",title,newurl); 	
 	i.on("beforedestroy",function(){
 		window.location.href= oldurl;
		return true;
 	}); 	
 	i.show();
}
function viewcheck(newurl,oldurl,title,doc) {
 	var i = createWin("wind",title,newurl); 	
 	i.on("beforedestroy",function(){
 		doc.forms[0].action=oldurl;
 		doc.forms[0].submit();
		return true;
 	}); 	
 	i.show();
}
 
function closetmpwin(){
	tmpwin.close();
}

 
function getCookie (name) { 
	cookie_name = name + "="; 
	cookie_length = document.cookie.length; 
	cookie_begin = 0; 
	while (cookie_begin < cookie_length) 
	{ 
		value_begin = cookie_begin + cookie_name.length; 
		if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) 
		{ 
			var value_end = document.cookie.indexOf ( ";", value_begin); 
			if (value_end == -1) 
			{ 
			 value_end = cookie_length; 
			} 
			return unescape(document.cookie.substring(value_begin, value_end)); 
		} 
		cookie_begin = document.cookie.indexOf ( " ", cookie_begin) + 1; 
		if (cookie_begin == 0) 
		{ 
			break; 
		} 
	} 
	return null; 
} 
  function selectBank(url,recvbkno1,recvbkname1,recvopnbkno1){
  		
	Ext.onReady(function () {
		var i = createWin("wind","行名行号查询",url+"/queryBankInfoAction.do?method=querySendxml");
		
		window.test = function () {
			i.height=400;
			i.close();
			var recvbkno="";
	    	var recvbkname="";
	     	var sabkcode="";
	   		if(getCookie("recvbkno")!=null){
	   			recvbkno=getCookie("recvbkno");
	   		}
	   		if(getCookie("recvbkname")!=null){
	   			recvbkname=getCookie("recvbkname");
	   		}
	   		if(getCookie("sabkcode")!=null){
	   			 sabkcode=getCookie("sabkcode");
	   		}
	      
		      if(recvbkno1!=null){
		       recvbkno1.value=recvbkno;
		      }else{
		        recvbkno1.value="";
		      }
		      if(recvbkname1!=null){
		        recvbkname1.value=recvbkname;
		      }else{
		        recvbkname1.value="";
		      }
		      if(recvopnbkno1!=null){
		        recvopnbkno1.value=sabkcode;
		      }else{
		       recvopnbkno1.value="";
		      }
		     var expireNow = new Date(); 
			 document.cookie = "recvbkno = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
			 document.cookie = "recvbkname = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
		      document.cookie = "sabkcode = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
		};
		i.show();
});
	
}

function selectkhhBank(url,recvbkno1,recvbkname1,recvopnbkno1,recvkhhbankno,recvkhhname){
  		
	Ext.onReady(function () {
		var i = createWin("wind","行名行号查询",url+"/queryBankInfoAction.do?method=querySendxml");
		
		window.test = function () {
			i.height=400;
			i.close();
			var recvbkno="";
	    	var recvbkname="";
	     	var sabkcode="";
	   		if(getCookie("recvbkno")!=null){
	   			recvbkno=getCookie("recvbkno");
	   		}
	   		if(getCookie("recvbkname")!=null){
	   			recvbkname=getCookie("recvbkname");
	   		}
	   		if(getCookie("sabkcode")!=null){
	   			 sabkcode=getCookie("sabkcode");
	   		}
	      
		      if(recvbkno1!=null){
		       recvbkno1.value=recvbkno;
		      }else{
		        recvbkno1.value="";
		      }
		      if(recvbkname1!=null){
		        recvbkname1.value=recvbkname;
		      }else{
		        recvbkname1.value="";
		      }
		      if(recvopnbkno1!=null){
		        recvopnbkno1.value=sabkcode;
		      }else{
		       recvopnbkno1.value="";
		      }
		      
		      
		       if(recvkhhbankno!=null){
		        recvkhhbankno.value=recvbkno;
		      }else{
		       recvkhhbankno.value="";
		      }
		      
		       if(recvkhhname!=null){
		        recvkhhname.value=recvbkname;
		      }else{
		       recvkhhname.value="";
		      }
		      
		      
		      
		     var expireNow = new Date(); 
			 document.cookie = "recvbkno = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
			 document.cookie = "recvbkname = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
		      document.cookie = "sabkcode = " + "; "+expireNow+"=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/"; 
		};
		i.show();
});
	
}

function chargeshowbox(url,chargeobj){
  	
	Ext.onReady(function () {
		var i = createPopWindow("wind","手续费计算",url+"/page/transfer/chargeCons.jsp",400,350);
		
		window.test = function (sxf1,ydf1,ydjs1,gbf1,systemcd) {
			i.height=400;
			i.close();
			
			if(chargeobj.sxf!=null){
		        chargeobj.sxf.value=fmoney(sxf1, 2);
		     }else{
		        chargeobj.sxf.value="";
		    }
			if(chargeobj.ydf!=null){
			    chargeobj.ydf.value=fmoney(ydf1, 2);;
			}else{
			   chargeobj.ydf.value="";
			}
			if(chargeobj.ydjs!=null){
			   chargeobj.ydjs.value=fmoney(ydjs1, 2);
			}else{
			   chargeobj.ydjs.value="";
			}
			if(chargeobj.gbf!=null){
			   chargeobj.gbf.value=fmoney(gbf1, 2);
			}else{
			   chargeobj.gbf.value="";
			}
		      var n=0;
				var aa=document.getElementById('ywlxbmval').value;
				
				if(aa=='A104'){
					var amts = document.getElementsByName("amt");
					
					for(i=0;i<amts.length;i++){
					
					   n+=parseFloat(rmoney(amts[i].value));
					}
					chargeobj.hkje.value=fmoney(n,2);
					document.getElementById("mxhzje104").value=fmoney(n,2);
					chargeobj.ze.value = fmoney(rmoney(sxf1)+rmoney(ydf1)+rmoney(ydjs1)+rmoney(gbf1)+n, 2);
				}else{
					chargeobj.ze.value = fmoney(rmoney(sxf1)+rmoney(ydf1)+rmoney(ydjs1)+rmoney(gbf1)+rmoney(chargeobj.hkje.value)+n, 2);
				}
				document.getElementById("xth").value=systemcd;
				document.getElementById("xth1").value=systemcd;
		};
		 
		i.show();
});
	
}

function calcharge(url,beginamt,endamt,chargeobj){
			
				 var pmttp =chargeobj.pmttp.value;//业务类型
				 var money=chargeobj.hkje.value;//汇款金额
				
				 var yxj="";//优先级
				  var selectpath="";
				  
				  if(chargeobj.transno=="7100"){
					   if(pmttp=="A104"||pmttp=="A307"||pmttp=="A200"||pmttp=="A106"){
					 	 selectpath="7101";//金融机构
					  }else{
					  	selectpath="7100";//个人
					  }
				  }else{
				  	selectpath=chargeobj.transno;
				  }
				
				  if(chargeobj.yxj!=null){//优先级
				 	 yxj=chargeobj.yxj.value;
				  }
				  PubService.chargeQuery(selectpath,rmoney(money),pmttp,beginamt,endamt,yxj,function(obj){
			    	if(obj==null ){
					  alert("手续费信息查询失败，请重试!" );
					  return;
					}else{
						if(obj.length<=0){
							alert("该业务类型的交易金额不符合规定!");
							chargeobj.hkje.value="";
							chargeobj.ze.value="";
							return false;
						}else if(obj.length==1){
						
							if(chargeobj.signtype=="04"){
								chargeobj.sxf.value=0.00;
								chargeobj.ydf.value=0.00;
								chargeobj.ydjs.value=0.00;
								chargeobj.gbf.value=0.00;
							}else{
								if(chargeobj.waiven.checked==true){
									chargeobj.sxf.value="0.00";//手续费
									chargeobj.ydf.value="0.00"; 
									chargeobj.ydjs.value="0.00";
									chargeobj.gbf.value="0.00";
								}
								else{
								
									chargeobj.sxf.value=obj[0].charge==null?"0.00": obj[0].charge;//手续费
									chargeobj.ydf.value=obj[0].youdianfei==null?"0.00": obj[0].youdianfei; 
									chargeobj.ydjs.value=obj[0].yidijiashou==null?"0.00":obj[0].yidijiashou;
									chargeobj.gbf.value=obj[0].gongbenfei==null?"0.00":obj[0].gongbenfei;
								}
							}
							var str = obj[0].msgtpcd.substring(0,4);
							
							if(str=='hvps'){
								chargeobj.xth.value="HVPS";
								chargeobj.xth1.value="HVPS"; 
							}else{
								chargeobj.xth.value="BEPS";
								chargeobj.xth1.value="BEPS"; 
							}
							 var n=0;
							var aa="";
							if(document.getElementById('ywlxbmval')!=null){
								aa ==document.getElementById('ywlxbmval').value
							}
							if(aa=='A104'){
								var amts = document.getElementsByName("amt");
								
								for(i=0;i<amts.length;i++){
								
								   n+=parseFloat(rmoney(amts[i].value));
								}
								chargeobj.hkje.value=fmoney(n,2);
								document.getElementById("mxhzje104").value=fmoney(n,2);
								chargeobj.ze.value = fmoney(rmoney(chargeobj.sxf.value)+rmoney(chargeobj.ydf.value)+rmoney(chargeobj.ydjs.value)+rmoney(chargeobj.gbf.value)+n, 2);
							}else{
								chargeobj.ze.value = fmoney(rmoney(chargeobj.sxf.value)+rmoney(chargeobj.ydf.value)+rmoney(chargeobj.ydjs.value)+rmoney(chargeobj.gbf.value)+rmoney(chargeobj.hkje.value)+n, 2);
							}
						}else{
							for(var i=0;i<obj.length;i++){               
					            var str = obj[i].msgtpcd.substring(0,4);
					            if(str =="beps"){
					            	if(chargeobj.waiven.checked==true){	
					            		chargeobj.bepssxf.value="0.00";//手续费
									    chargeobj.bepsydf.value="0.00"; //邮电费
									    chargeobj.bepsydjs.value="0.00";//异地加收
									    chargeobj.bepsgbf.value="0.00"; //工本费
					            	}else{
					            		chargeobj.bepssxf.value=obj[i].charge==null?"0.00": obj[i].charge;//手续费
									    chargeobj.bepsydf.value=obj[i].youdianfei==null?"0.00": obj[i].youdianfei; //邮电费
									    chargeobj.bepsydjs.value=obj[i].yidijiashou==null?"0.00":obj[i].yidijiashou;//异地加收
									    chargeobj.bepsgbf.value=obj[i].gongbenfei==null?"0.00":obj[i].gongbenfei; //工本费
					            	}
								}else if(str =="hvps"){
									if(chargeobj.waiven.checked=='checked'){
										chargeobj.hvpssxf.value="0.00";//手续费
									    chargeobj.hvpsydf.value="0.00";//邮电费
									    chargeobj.hvpsydjs.value="0.00";//异地加收
									    chargeobj.hvpsgbf.value="0.00"; //工本费
									}else{
										chargeobj.hvpssxf.value=obj[i].charge==null?"0.00": obj[i].charge;//手续费
									    chargeobj.hvpsydf.value=obj[i].youdianfei==null?"0.00": obj[i].youdianfei;//邮电费
									    chargeobj.hvpsydjs.value=obj[i].yidijiashou==null?"0.00":obj[i].yidijiashou;//异地加收
									    chargeobj.hvpsgbf.value=obj[i].gongbenfei==null?"0.00":obj[i].gongbenfei; //工本费
									}
									
								    
								}else{
								   chargeobj.bepssxf.value=0.00;//手续费
								   chargeobj.bepsydf.value=0.00; 
								   chargeobj.bepsydjs.value=0.00; 
								   chargeobj.bepsydjs.value=0.00;
								   chargeobj.bepsgbf.value=0.00;
								   chargeobj.hvpssxf.value=0.00;//手续费
								   chargeobj.hvpsydf.value=0.00; 
								   chargeobj.hvpsydjs.value=0.00;
								   chargeobj.hvpsgbf.value=0.00;
								}
							}
							if(chargeobj.signtype=="04"){
								chargeobj.sxf.value=0.00;
								chargeobj.ydf.value==0.00;
								chargeobj.ydjs.value=0.00;
								chargeobj.gbf.value=0.00;
							}
							chargeshowbox(url,chargeobj);
						}
					}
				});
			}
			
			
		function open2(url){
			    var pop = createAuthorWin("popid",'授权',url+"/page/transfer/realtime/authorization.jsp");
				pop.show();
			 }
			 
		 function open3(url){
		    var pop = createAuthorWin("popid",'手续费授权',url+"/page/transfer/authorization0.jsp");
			pop.show();
		 }
			