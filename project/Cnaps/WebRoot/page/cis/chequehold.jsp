<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<%-- 
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Expires"   CONTENT="0">  
--%> 
<title>
	
		支票截留
		
	
</title>
<style type="text/css"> 
			#newPreview
			{ 
				filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale); 
			} 
		</style> 

		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
				<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
       <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		
<script language="javascript">
	function OnSave(){
		var userMap = {};
		userMap.accountnumber = document.getElementById("dbtracct").value;
		userMap.accountname = document.getElementById("dbtraddr").value;
		userMap.addr = document.getElementById("cdtraddr").value;
		userMap.issuer =document.getElementById("dbtrissuer").value;
		userMap.issuernm =document.getElementById("dbtrissuernm").value;
		userMap.mmbid =document.getElementById("dbtrmmbid").value;
		PubService.saveOthersBankAccountMsg(userMap, function(){
		  
		}); 
	}
	


function queryBypaymentGroupNum(paymentGroupNum){
   		if(isNull(trim(paymentGroupNum))){
					 return;
		}
		var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
		pop.show();
        PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
		    pop.close();
			if(obj==null||obj.accountnumber==null){
			 return;
			}else{
			  document.getElementById("dbtracct").value=obj.accountnumber;
		      document.getElementById("dbtrnm").value=obj.accountname==null?"": obj.accountname  ;
		      document.getElementById("dbtramtacctid").value=obj.accountnumber;
		      document.getElementById("dbamtnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("dbtraddr").value=obj.addr==null?"": obj.addr  ;
			  document.getElementById("dbtrissuer").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrissuernm").value=obj.issuernm==null?"":obj.issuernm ;
			  document.getElementById("dbtrbrnchid").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrbrnchnm").value=obj.issuernm==null?"":obj.issuernm ;	
			  document.getElementById("dbtrmmbid").value=obj.mmbid==null?"":obj.mmbid ;	
			}
	   	});
}
			

//收款人账户
function  PubQueryAccount(paymentGroupNum){
	 clrAmt();
   		if(isNull(trim(paymentGroupNum))){
			 return;
		}
		var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
		pop.show();
		PubService.QueryAccount(paymentGroupNum,function(obj){
			pop.close();
			if(obj==null||obj.acctid==null){
			  alert(" 收款人信息查询失败，未查到相关数据" );
			  document.getElementById("cdtracct").value="";
			  return;
			}else{
				 document.getElementById("cdtrnm").value=obj.mm==null?"": obj.mm;//名称
				document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;//地址
				document.getElementById("proposertel").value=obj.tel==null?"": obj.tel;//联系电话
				document.getElementById("proposerCertTp1").value=obj.certip==null?"": obj.certip;//证件类型
				document.getElementById("proposerCertTp").value=obj.certip==null?"": obj.certip;//证件类型
				document.getElementById("proposercertid").value=obj.certid==null?"": obj.certid;//证件号
				document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
				document.getElementById("cdtrissuer").value=obj.bankcode==null?"": obj.bankcode;//收款人开户行行号
				document.getElementById("cdtrissuernm").value=obj.acctissr==null?"": obj.acctissr;//收款人开户行名称
				document.getElementById("proposerAcctTp").value=obj.accttp==null?"": obj.accttp;//账户类型
				document.getElementById("proposerAcctTp1").value=obj.accttp==null?"": obj.accttp;//账户类型
				 
		  }
	   	});
}

function fileselect(imgFile){ 
	if(isNull(trim(imgFile.value))){
		alert("请先上传图片,再预览");
			return;
	}
	imageshow('winid','预览',imgFile);
}
function imageScan(){
	var msg = "@";
			
			var rcptLtd = document.getElementById("rcptLtd");
			var proposerCertId = document.getElementById("proposerCertId");
			 
		    var proposerCstmrId = document.getElementById("proposerCstmrId");
			var proposerAcctTp = document.getElementById("proposerAcctTp");
			var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			var dbtracct = document.getElementById("dbtracct");
			var dbtrissuer = document.getElementById("dbtrissuer");
			var dbtrmmbid = document.getElementById("dbtrmmbid");
			
			var cdtrbrnchid = document.getElementById("cdtrbrnchid");
			var cdtrbrnchnm = document.getElementById("cdtrbrnchnm");
			var cdtracct = document.getElementById("cdtracct");
			
			var dbtracct = document.getElementById("dbtracct");
			var dbtrnm = document.getElementById("dbtrnm");
			var currencycd = document.getElementById("currencycd");
			var totalamt = document.getElementById("totalamt");
			var amount = document.getElementById("amount");
			var issueDt = document.getElementById("issueDt");
			var payDt = document.getElementById("payDt");
			var notesNo = document.getElementById("notesNo");
			var numOfEndrsr = document.getElementById("numOfEndrsr");
			
			var imageBackDt = document.getElementById("imageBackDt");
			var name = document.getElementById("name");
			var dbtrbrnchnm = document.getElementById("dbtrbrnchnm");
			var xth = document.getElementById("xth");
			var xth1 = document.getElementById("xth1");
		
			if(isNull(trim(xth.value))){
			msg += "渠道信息不能为空！@";
		    }
			if(isNull(trim(xth1.value))){
			msg += "渠道信息不能为空！@";
		    }


			if(isNull(trim(dbtrbrnchnm.value))){
			msg += "付款行名称不能为空！@";
		    }
			if(isNull(trim(dbtracct.value))){
			msg += "付款人账号不能为空！@";
		    }
		    			if(isNull(trim(dbtrnm.value))){
			msg += "付款人名称不能为空！@";
		    }
		    			if(isNull(trim(currencycd.value))){
			msg += "货币符号不能为空！@";
		    }
		    			if(isNull(trim(totalamt.value))){
			msg += "总额不能为空！@";
		    }
		    			if(isNull(trim(amount.value))){
			msg += "交易金额不能为空！@";
		    }
		    			if(isNull(trim(issueDt.value))){
			msg += "出票日期不能为空！@";
		    }
		    			if(isNull(trim(payDt.value))){
			msg += "提示付款日期不能为空！@";
		    }
		    			if(isNull(trim(notesNo.value))){
			msg += "票据号码不能为空！@";
		    }
		    			if(isNull(trim(numOfEndrsr.value))){
			msg += "背书人数不能为空！@";
		    }
		   
		    	    
			 
		    if(isNull(trim(rcptLtd.value))){
					msg += rcptLtd.title+"不能为空！@";
				    }
			 
				var boo = msgSplit(msg);
		  		if(boo){
					var path ='<%=path%>/page/cis/imagescan.jsp';
					viewDetails(path,"图像扫描");
				}
}

 
	//付款行行号查询
			//付款行行号查询
      function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var dbtrbrnchid= document.getElementById("dbtrbrnchid");
				var dbtrbrnchnm=document.getElementById("dbtrbrnchnm");
				var dbtrmmbid=document.getElementById("dbtrmmbid");
				var dbtrissuer= document.getElementById("dbtrissuer");
				var dbtrissuernm=document.getElementById("dbtrissuernm");
				selectkhhBank(url,dbtrbrnchid,dbtrbrnchnm,dbtrmmbid,dbtrissuer,dbtrissuernm);
								 
				
				
			}

		//付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("dbtrissuer");
				var payOpenBankName=document.getElementById("dbtrissuernm");
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
			//收款人开户行行号查询
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var cdtrissuer= document.getElementById("cdtrissuer");
				var cdtrissuernm=document.getElementById("cdtrissuernm");
				selectBank(url,cdtrissuer,cdtrissuernm,"");
			}
		 
		 //增加手续费查询
			function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7127',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalamt'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	waiven: document.getElementById("waiven")
				  };
				  if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }
				  else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
				 //calcharge(url,beginamt,endamt,obj);
			}
		 	
			function clrAmt(){
				document.getElementById('amount').value="";
				document.getElementById('totalamt').value="";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value=document.getElementById('amount').value;
			}
		 
	 	 function zcx(val){
				if(val.value=='Y'){
					$("#serviceCharge").val("");//手续费
					$("#postage").val("");//邮电费
					$("#outstationcharge").val("");//异地加收
					$("#agncycharge").val("");//代理行手续费
					$("#serviceCharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#outstationcharge").attr("readonly",true);
					$("#agncycharge").attr("readonly",true);
					jisuan();
				}else{
				 
					$("#serviceCharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
					$("#agncycharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#serviceCharge").val();
				var ydf = $("#postage").val();
				var ydjs = $("#outstationcharge").val();
				var hkje = $("#amount").val();//汇款金额
			 var agent = $("#agncycharge").val();//汇款金额
				document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+rmoney(agent), 2);
			}
			 		 
	
			 function namezcx(val){
			  if(val.value>99) {
			  	alert('输入值超出范围！');
			  	return ;
			  }
			 var tb = document.getElementById('gkzjgzdfjjhb_mx');
		     var rowNum=tb.rows.length;
		     for (i=0;i<rowNum;i++)
		     {
		         tb.deleteRow(i);
		         rowNum=rowNum-1;
		         i=i-1;
		     }
			 for(var i=0;i < val.value;i++){
			  
					  var newTr = this.document.getElementById("gkzjgzdfjjhb_mx").insertRow();
					var newTd1 = newTr.insertCell();
				    var newTd2 = newTr.insertCell();
			   var newTd3 = newTr.insertCell();
			   
			   newTd1.className="text_tablehead_b";
				newTd1.innerHTML = "背书人名称";
				
				newTd2.className="text_tablehead_b";
				newTd2.innerHTML = "<div align='left'><input type='text' name='po.endrsrNm' id='gz_cptlcd' style='width: 90px;' maxlength='12'/>";
				newTd3.className="text_tablehead_b";
				newTd3.innerHTML = "<input type='button' value='删除'  class='button' onclick='fundelmxgz(this)'/>";
		
			 }
			
			}
			
			function fundelmxgz(obj){
		 
				var rowidx = obj.parentNode.parentNode.rowIndex; // 获取对象所在表格中的行的位置，并删除当前行和下一行
				this.document.getElementById("gkzjgzdfjjhb_mx").deleteRow(rowidx);
			
		    	var length= this.document.getElementById("gkzjgzdfjjhb_mx").rows.length	;//得到的删除前的值
		    		// alert(length);
				 this.document.getElementById("numOfEndrsr").value=length;
			}
			
			
				function commitForm(){
				  
	
			   var msg = "@";
			
			var rcptLtd = document.getElementById("rcptLtd");
			var proposerCertId = document.getElementById("proposerCertId");
			 
		    var proposerCstmrId = document.getElementById("proposerCstmrId");
			var proposerAcctTp = document.getElementById("proposerAcctTp");
			var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			var dbtracct = document.getElementById("dbtracct");
			var dbtrissuer = document.getElementById("dbtrissuer");
			var dbtrmmbid = document.getElementById("dbtrmmbid");
			
			var cdtrbrnchid = document.getElementById("cdtrbrnchid");
			var cdtrbrnchnm = document.getElementById("cdtrbrnchnm");
			var cdtracct = document.getElementById("cdtracct");
			
			var dbtracct = document.getElementById("dbtracct");
			var dbtrnm = document.getElementById("dbtrnm");
			var currencycd = document.getElementById("currencycd");
			var totalamt = document.getElementById("totalamt");
			var amount = document.getElementById("amount");
			var issueDt = document.getElementById("issueDt");
			var payDt = document.getElementById("payDt");
			var notesNo = document.getElementById("notesNo");
			var numOfEndrsr = document.getElementById("numOfEndrsr");
			
			var imageBackDt = document.getElementById("imageBackDt");
			var name = document.getElementById("name");
			var dbtrbrnchnm = document.getElementById("dbtrbrnchnm");
			var xth = document.getElementById("xth");
			var xth1 = document.getElementById("xth1");
			var imagepath =document.getElementById("imagepath");
			var imagename =document.getElementById("imagename");
			if(isNull(trim(xth.value))){
			msg += "渠道信息不能为空！@";
		    }
			if(isNull(trim(xth1.value))){
			msg += "渠道信息不能为空！@";
		    }

			
			if(isNull(trim(dbtrbrnchnm.value))){
			msg += "付款行名称不能为空！@";
		    }
			if(isNull(trim(dbtracct.value))){
			msg += "付款人账号不能为空！@";
		    }
		    			if(isNull(trim(dbtrnm.value))){
			msg += "付款人名称不能为空！@";
		    }
		    			if(isNull(trim(currencycd.value))){
			msg += "货币符号不能为空！@";
		    }
		    			if(isNull(trim(totalamt.value))){
			msg += "总额不能为空！@";
		    }
		    			if(isNull(trim(amount.value))){
			msg += "交易金额不能为空！@";
		    }
		    			if(isNull(trim(issueDt.value))){
			msg += "出票日期不能为空！@";
		    }
		    			if(isNull(trim(payDt.value))){
			msg += "提示付款日期不能为空！@";
		    }
		    			if(isNull(trim(notesNo.value))){
			msg += "票据号码不能为空！@";
		    }
		    			if(isNull(trim(numOfEndrsr.value))){
			msg += "背书人数不能为空！@";
		    }
		    if(isNull(trim(imagename.value))){
				msg += "图像名称不能为空！@";
		    }
			if(isNull(trim(imagepath.value))){
				msg += "图像路径不能为空！@";
		    }			
		    		

		    	    
			 
		    if(isNull(trim(rcptLtd.value))){
					msg += rcptLtd.title+"不能为空！@";
				    }
			 
				var boo = msgSplit(msg);
		  		if(boo){
		  			OnSave();
				 	document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value) ;
			        document.getElementById("ydf").value=rmoney(document.getElementById("ydf").value) ;
			          document.getElementById("ydjs").value=rmoney(document.getElementById("ydjs").value) ;
			           document.getElementById("counterfoil").value=rmoney(document.getElementById("counterfoil").value) ;
			         
					// document.getElementById("agncycharge").value=rmoney(document.getElementById("agncycharge").value) ;
					 document.getElementById("amount").value=rmoney(document.getElementById("amount").value) ;
					 document.getElementById("totalamt").value=rmoney(document.getElementById("totalamt").value) ;
					 if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
					 //document.forms[0].submit();
	        }
				 
		 }
		 
</script>
	
		<SCRIPT language="javaScript"><!--
  function sendDate(){
  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//初始化、指定处理函数、发送请求的函数
   http_request = false;
   if(window.XMLHttpRequest) { 
　　http_request = new XMLHttpRequest();
　　if (http_request.overrideMimeType) {//设置MiME类别
 　　http_request.overrideMimeType('text/xml');
　　}
   }
   else if (window.ActiveXObject) { // IE浏览器
　　try {
 　　http_request = new ActiveXObject("Msxml2.XMLHTTP");
　　} catch (e) {
 　　try {
  　　http_request = new ActiveXObject("Microsoft.XMLHTTP");
 　　} catch (e) {}
　　}
   }
   if (!http_request) { // 异常，创建对象实例失败
　　window.alert("不能创建XMLHttpRequest对象实例.");
　　return false;
   }
   http_request.onreadystatechange = processRequest;
   // 确定发送请求的方式和URL以及是否同步执行下段代码
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // 处理返回信息的函数
 　　function processRequest() {
     　　if (http_request.readyState == 4) { // 判断对象状态
         　　if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
         //默认返回01，也就是错误信息，到时注掉就可以
                        if(http_request.responseText=='01'){
	                alert("获取支付交易组号失败，请刷新页面重新获取");
	             return false;
	               }
                      else{
                     
		                  document.form1.pmtgrpid.value=http_request.responseText;
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
      -->
     </script>
     
	
</head>
<body onload="sendDate();">
  
<form name="form1" enctype="multipart/form-data" method="post" action="<%=path%>/ChequeholdAction.do?method=chequehold">
	 
	<input id="repeatmark" type="hidden" value="0">
	<input type="hidden" name="token" value="${token }" />
	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<input id="contrperson" name="po.warrantyId" type="hidden" ><!-- 授权柜员(手续费) -->
			<input name="po.dbtramtacctid" id="dbtramtacctid" type="hidden"  title="扣款账号" maxlength="32"  /> 
			<input name="po.dbamtnm" id="dbamtnm" type="hidden"	title="扣款户名" maxlength="60" />
	  <table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
	  	<tr valign="top">
	  		<td></td>
			<td>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="10">&nbsp;</td>
						<td>
							<div align="center">
							<br/>
				      		<table width="689" border="0" cellspacing="0" cellpadding="0" >
				        		<tr>
						        	<td>
						        	 <div class="text_title"><span class="text_blue2">支票截留</span></div> 
									</td>
						        </tr>
						        <tr>
				          			<td><div class="table_body">
						        <div class="table_content">
						          			<table>
				                			    <tr>
								                	<td colspan="4">
				                						<span class="text_tablehead">基本信息</span>
				                						 <input type="hidden" name="po.signmd" value="03"/> 
															 
														<input type="hidden" name="po.systemcd" value="BEPS"/>
				                					</td>
				                				 </tr>
				                				 <tr>
								               
								                   	<td  class="text_tablehead_b">
								                   	支付交易组号
								                   	</td>
								                  	<td colspan="4">
								                   		<input type="text"  name="po.pmtgrpid" id="pmtgrpid"  title="支付交易组号"  readonly="readonly" maxlength="20" value="${transId}"/><font color="#FF0000">*</font>
								                   	</td>
								                 </tr>
				                				 <tr>
				                					<td class="text_tablehead_b"  >
								                  		业务类型编码
								                  	</td>
								                  	<td>
								                   		<select name="po.pmtTp" id="pmttp"  >
								                   			<option value="B308">支票截留</option>
								                   			 
								                   		</select>
								                   		<span  class="STYLE1">*</span>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	业务种类编码
								                  	</td>
								                  	<td >
								                   		<select name="po.pmtKd" id="pmtkd" >
								                   			<option value="03401">支票截留</option>
								                   		</select>
								                   		<span  class="STYLE1">*</span>
								                  	</td>
								                </tr>
								               
								                 <tr>
								                 	<td class="text_tablehead_b" >
								                   	合同协议号
								                   	</td>
								                  	<td >
								                   		<input type="text"  name="po.agrmtNb" id="agrmtNb"  title="合同协议号"  maxlength="60"/>
								                   		 
								                   	</td>
								                   	<td class="text_tablehead_b" >
								                  	回执期限
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.rcptLtd" id="rcptLtd"  style="width: 160px"
								                   		 maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)" title="回执期限"/>天
								                  	<font color="#FF0000">*</font>
								                  	</td>
								                 </tr>
							                 </table>
						                </div>
						        
						        
						        
						        
						        
						        
						                <div class="table_content">
						          			<table>
				                			   	<tr >
								                	<td colspan="4">
				                						<span class="text_tablehead">收款人信息</span>
				                					</td>
				                				</tr>
				                				<tr>
								                  	<td  class="text_tablehead_b">
								                		收款人账号
								                	</td>
								                  	<td >
								                   		<input type="text" name="po.cdtrAcct" id="cdtracct" title="收款人账号"  
								                   		maxlength="32" onblur="PubQueryAccount(this.value);clrAmt();"/><font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		收款人名称
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrNm" id="cdtrnm" title="收款人名称"   maxlength="60" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                 </tr>
				                				 <tr>
				                					<td class="text_tablehead_b"  >
								                  		证件类型
								                  	</td>
								                  	<td>
								                  	<input name="po.proposerCertTp" id="proposerCertTp1" type="hidden"  readonly="readonly"/>
								                   		<select  name="po.proposerCertTp" id="proposerCertTp" disabled="disabled" >
																						<option value="01">
																							身份证
																						</option>
																						<option value="02">
																							军官证
																						</option>
																						<option value="03">
																							学生证
																						</option>
																						<option value="04">
																			营业执照
																		</option>
																		<option value="05">
																			组织机构代码
																		</option>
																					</select>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	收款人证件号
								                  	</td>
								                  	<td >
								                   		<input type="text" name="po.proposerCertId" id="proposerCertId" 
								                   		
								                   		 title="收款人人证件号" readonly="readonly"	maxlength="32" onblur="checkIdcard(this.value)" />
								                  	 
								                  	</td>
								                </tr>
								                  <tr>
								                  	<td  class="text_tablehead_b">
								                  		收款人客户号
								                  	</td>
								                  	<td  >
								                   		<input type="text" name="po.proposerCstmrId"  id="proposerCstmrId" readonly="readonly" title="收款人客户号" maxlength="30"/>
								                   
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                   		收款人联系电话
								                   	</td>
								                  	<td>
								                   		<input type="text" name="po.proposerTel"  title="收款人联系电话" readonly="readonly" id="proposerTel" maxlength="20"/>
								                    </td>
								                  </tr>
								                <tr>
								                  	<td class="text_tablehead_b" >
								                  		收款人账户币种
								                  	</td>
								                  	<td >
								                   		<input type="text" name="po.proposerAcctCcy"  id="proposerAcctCcy" title="收款人账户币种" value="CNY" readonly=readonly maxlength="3"/>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  		收款人账户类型
								                  	</td>
								                  	<td>
								                  		<input name="po.proposerAcctTp" id="proposerAcctTp" type="hidden" >
								                   		<select  id="proposerAcctTp1" title="收款人账户类型" disabled="disabled" >
								                   			<option value="">请选择</option>
								                   			<option value="AT00">对公账户</option>
								                   			<option value="AT01">个人贷记卡账户</option>
								                   			<option value="AT02">个人借记卡</option>
								                   			<option value="AT03">存折</option>
								                   			<option value="AT04">其他</option>
								                   		</select>
								                   		 
								                  	</td>
								                  </tr>
								                 
								                 <tr>
					          						
				                					<td class="text_tablehead_b">
								                  	<!-- 	收款行行号 -->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.cdtrBrnchId" id="cdtrbrnchid" title="收款行行号"    maxlength="14" readonly="readonly" 
								                   		 value="${bankInfo.bankcode }"/>
								                   		                 		
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		<!-- 收款行名称-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.cdtrBrnchNm" id="cdtrbrnchnm"  title="收款行名称"  readonly="readonly"
								                   		maxlength="60"  value="${bankInfo.participantname }"/>
								                   		 
								                    </td>
								                 </tr>
								                  
								                 
								                     
								                     <tr>
								                  	
								                  	<td class="text_tablehead_b">收款人地址</td>
								                  	<td colspan="3">
								                  		<input name="po.cdtrAddr" id="cdtraddr" class="text_tablehead_b_addr"   
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','cdtraddr')"/>
								                  	
								                  	</td>
								                  </tr>
								                     <tr>      	
								                  
								                  	<td class="text_tablehead_b" >
								                  		<!--收款人开户行行号-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.cdtrIssuer" id="cdtrissuer" title="收款人开户行行号" value="${bankInfo.bankcode }"  maxlength="14" readonly="readonly" style="width:100px;"/>
								                   		<!--<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">
								                   		<font color="#FF0000">*</font>  -->
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		<!--收款人开户行名称-->
								                  	</td>
								                  	<td >
								                   		<input type="hidden" name="po.cdtrIssuerNm" id="cdtrissuernm" value="${bankInfo.participantname }" title="收款人开户行名称"   maxlength="60" readonly="readonly"/>
								                   	</td>
								                   </tr>
								                    
								                   <tr>			                  	
								                  
								                  	<td class="text_tablehead_b">
								                  		<!--   收款清算行行号-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.cdtrMmbId" id="cdtrmmbid" value="${bankInfo.directbankcode }"
								                   		maxlength="14"   readonly="readonly"/>	
								                   		            		
								                  	</td>
								                   </tr>
							                       <tr></tr>
							               		</table>
							               	</div>

							             <div class="table_content">
							             <table>
								                 <tr>
								                	<td>
				                						<span class="text_tablehead">付款人信息</span>
				                					</td>
					                			</tr>
								                
								                  	<tr>
									                  	<td  class="text_tablehead_b">
									                  		付款人账号
									                  	</td>
									                  	<td >
									                   		<input type="text" name="po.dbtrAcct"  id="dbtracct"  title="付款人账号" maxlength="32" onblur="queryBypaymentGroupNum(this.value)"/>
									                   		<font color="#FF0000">*</font>
									                  	</td>
									                  	<td class="text_tablehead_b">
								                  		付款人名称
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrNm" id="dbtrnm" title="付款人名称" maxlength="60" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  		<td class="text_tablehead_b">付款人地址</td>
								                  	<td colspan="3">
															<input name="po.dbtrAddr" id="dbtraddr" class="text_tablehead_b_addr"   
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','dbtraddr')"/>
															
								                  	</td>
								                  	</tr>
								                  	 <tr>
					          						<td class="text_tablehead_b">
								                  		付款行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrBrnchId" id="dbtrbrnchid" maxlength="14"  title="付款行行号" readonly="readonly" style="width:100px;"/>
								                   		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()">
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  		<td class="text_tablehead_b">
								                  		付款行名称
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrBrnchNm" id="dbtrbrnchnm"  title="付款行名称" readonly="readonly"
								                   		maxlength="60"  value=""/>
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  			<td class="text_tablehead_b">
								                  	<!--	付款人开户行行号-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.dbtrIssuer" id="dbtrissuer" title="付款人开户行行号" maxlength="14" readonly="readonly" style="width:100px;"/>
								                   <!--	<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfFkk()">-->
								                   		 
								                  	</td>
								                  		<td class="text_tablehead_b">
								                  	<!--	付款人开户行名称-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.dbtrIssuerNm" id="dbtrissuernm" title="付款人开户行名称"  maxlength="60" readonly="readonly"/>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  			<td class="text_tablehead_b">
								                  		<!--  付款清算行行号-->
								                  	</td>
								                  	<td>
								                   		<input type="hidden" name="po.dbtrMmbId" id="dbtrmmbid" title="付款清算行行号" maxlength="14" readonly="readonly"
								                   		 />
								                   		 
								                  	</td>
								                  	</tr>
								           </table>
							             </div>
						        
			          				    <div class="table_content">
							               <table>
						               		<tr>
							                	<td>
			                						<span class="text_tablehead">金额信息</span>
			                					</td>
				                			</tr>
							                 <tr>
							                  	<td class="text_tablehead_b" >
							                  	货币符号
							                  	</td>
							                  	<td>
							                   		<input type="text" name="po.currencyCd" id="currencycd" 
							                   		value="CNY" readonly="readonly"  maxlength="3"/><font color="#FF0000">*</font>
							                  	</td>
							                  		<td class="text_tablehead_b" >
							                  		总额
							                  	</td>
							                  	<td>
							                   		<input type="text" name="po.totalamt" id="totalamt" maxlength="19" title="总额"
							                   		 readonly="readonly"
							                   		  />
							                   		
							                   		<font color="#FF0000">*</font>
							                  	</td>
							                 </tr>
							                 <tr>
							                  	
							                  	<td class="text_tablehead_b"  >
							                  	交易金额
							                  	</td>
							                  	<td colspan="4">
							                   		<input type="text" name="po.amount" id="amount" title="交易金额"
							                   		 maxlength="19" 
							                   		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(this.value);" 
							                   		
							                   		 
							                   		 />
							                   		<font color="#FF0000">*</font>
							                  	</td>
							                  </tr>
							                </table>
							             </div>
							             
				          				 <div class="table_content">
							                <table>
							                	<tr>
								                	<td>
				                						<span class="text_tablehead">手续费/渠道信息</span>
				                					</td>
					                			</tr>
					                			<tr>												  	 
					<td class="text_tablehead_b" >
						收取费用
					</td>
					<td >					
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">收取
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">不收取
					</td>
				</tr>
							                  	<tr>
								                  	<td class="text_tablehead_b">
								                  		手续费
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.serviceCharge" id="sxf" title="手续费"
								                   		 maxlength="19" readonly="readonly"
								                   		  />
								                  	</td>
								                  	<td class="text_tablehead_b" >
																	渠道信息
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="系统号" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="系统号" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			大额
																		</option>
																		<option value="BEPS">
																			小额
																		</option>
																	</select>
																</td>
								                  	
							                  </tr>
							                  <tr>
							                  <td class="text_tablehead_b"  >
								                  		邮电费
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.postage" id="ydf" title="邮电费" readonly="readonly"/>
								                  	</td>
							                  	<td class="text_tablehead_b">
							                  	异地加收
							                  	</td>
							                  	<td>
							                  	<input type="text" name="po.outstationCharge" id="ydjs" title="异地加收" readonly="readonly"
							                   		 maxlength="19"  />
							                   	
							                  	</td>
							                  	
							                  	
							                  </tr>
							                  <tr>
							                  <td class="text_tablehead_b"  colspan="2">
							                  		<!-- 代理行手续费-->
							                  	</td>
							                  	<td><input type="hidden" name="po.agncyCharge" id="agncycharge" title="代理行手续费"
							                   		maxlength="19" />
							                  	</td>
							                  </tr>
							                  	<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td>
																	<input name="po.counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="19"  />
																</td>
															</tr>
							                </table>
							              </div>
						        
						        
						        
						        	  <div class="table_content">
								                <table>
									                <tr>
									                	<td>
					                						<span class="text_tablehead">附言信息</span>
					                					</td>
						                			</tr>
								                  <tr>
								                  	<td class="text_tablehead_b">附言</td>
								                  	<td colspan="4">
								                   		<textarea name="po.addtlInf" id="addtlInf" cols="60"
																			rows="3" onKeyPress="charPress()"
																			onkeyup="limitLength(value,256,'提示：','addtlInf')"></textarea>
								                  	</td>
								                  </tr>
							                    </table>
						                 </div>
						                
						                
						        <div class="table_content">
						                <table>
						               		<tr>
							                	<td>
			                						<span class="text_tablehead">附加信息</span>
			                					</td>
				                			</tr>
										           	 <tr>
										           	 
											           	<td  class="text_tablehead_b">
										                   出票日期
										                </td>
										                <td >

										                 	<input type="text" name="po.issueDt" id="issueDt"  title="出票日期"  readonly="readonly" class="Wdate"  onclick="WdatePicker()"/><font color="#FF0000">*</font>

										                </td>
										                <td  class="text_tablehead_b" >
										                   	提示付款日期
										                </td>
										                <td >

										                 	<input type="text" name="po.payDt" id="payDt"   title="提示付款日期"  class="Wdate"  onclick="WdatePicker()" /><font color="#FF0000">*</font>

										                </td>
										                
										             </tr>
										             <tr>
										             	
										             	 <td class="text_tablehead_b">
										                票据号码
										                </td>
										                <td>
										                 	<input type="text" name="po.notesNo" id="notesNo" title="票据号码" maxlength="32"  onkeypress="amountPress()" /><font color="#FF0000">*</font>
										                </td>	
										                  <td class="text_tablehead_b">
										                  支付密码
										                </td>
										                <td>
										                 	<input type="password" name="po.pymntPswd" id="pymntPswd" maxlength="10" title="支付密码"  /> 
										                </td>		
										             </tr>
										           
									                 <tr>
											           	
										                  <td class="text_tablehead_b">
										                 用途
										                </td>
										                <td>
										                 	<input type="text" name="po.purpose" id="purpose" title="用途" /> 
										                </td>
										                 <td class="text_tablehead_b">
										                 图像信息
										                </td>
										                	<td >
										                
                  								  <input name="photo" type="button" style="cursor: pointer" class="button"
																value="图像扫描" onclick="imageScan()" />
										                </td>
									                 </tr>
									                  <tr>
										           	 	<td class="text_tablehead_b">图片路径</td>
											           	<td >
										                   <input type="text"   id="imagepath" name="po.imagepath" title="图片路径"  readonly="readonly"  /><font color="#FF0000">*</font>
										                </td>
										                <td class="text_tablehead_b">图片名称</td>
										                <td >
										                 	<input type="text"   id="imagename" name="po.imagename"  title="图片名称"  readonly="readonly"  /><font color="#FF0000">*</font>
										                </td>
										               
										             </tr>
									              
									                 
										             <tr>
										             	<td class="text_tablehead_b">
										                   背书人数
										                </td>
										                <td>
										                 	<input type="text" name="po.numOfEndrsr" id="numOfEndrsr" maxlength="10" title="背书人数"  onkeyup="fun_number(this);namezcx(this)" /><font color="#FF0000">*</font>
										                </td>
										             </tr>
										               <tr>
										               	<td colspan="4">
											               	<table id="gkzjgzdfjjhb_mx" border="0" cellpadding="0" cellspacing="0">
													              	 <tr>
													                </tr>
												                </table>
										               	</td>
										               </tr>
									                 
										           </table>
										           
										           
												                
										  	</div>        		    
				         
										          
                                                        <div class="table_content">
                                                    	<table>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    			<span class="STYLE1">说明：红色*标注项为必填项</span>
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
																		<input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>   
				         		       
						        </div></td></tr>
                                 </table>
                                 </div>
                                 </td>
                                 </tr>
                                 </table>
                                 </td>
                                 </tr>
                                 </table>
                                

</form>
		</body>
</html>
