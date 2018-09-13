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
			  return;
			}else{
				 document.getElementById("cdtrnm").value=obj.mm==null?"": obj.mm;//名称
				document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;//地址
				document.getElementById("proposertel").value=obj.tel==null?"": obj.tel;//联系电话
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
	var path ='<%=path%>/ImageAction.do?method=imageDeal'
	viewDetails(path,"图像扫描");
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
				    ze : document.getElementById('totalamt'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs")
				  };
				 calcharge(url,beginamt,endamt,obj);
			}
		 	
			function clrAmt(){
				document.getElementById('amount').value="0.00";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('totalamt').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
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
		  			OnSave();
				 	document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value) ;
			        document.getElementById("ydf").value=rmoney(document.getElementById("ydf").value) ;
			          document.getElementById("ydjs").value=rmoney(document.getElementById("ydjs").value) ;
					// document.getElementById("agncycharge").value=rmoney(document.getElementById("agncycharge").value) ;
					 document.getElementById("amount").value=rmoney(document.getElementById("amount").value) ;
					 document.getElementById("totalamt").value=rmoney(document.getElementById("totalamt").value) ;
					 document.forms[0].submit();
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
     <script>
       	function clrAmt(){
				document.getElementById('amount').value="0.00";
				document.getElementById('totalamt').value="0.00";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
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
						        	 <div class="text_title"><span class="text_blue2">通用回执</span></div> 
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
								                  		端到端标识号
								                  	</td>
								                  	<td>
								                   		<input type="text"  name="EndToEndId" id="EndToEndId"  title="端到端标识号"   maxlength="20" value="${transId}"/>
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	业务类型编码
								                  	</td>
								                  	<td >
								                   		<select name="po.pmtKd" id="pmtkd" >
								                   			<option value="">   </option>
								                   		</select>
								                   		<span  class="STYLE1">*</span>
								                  	</td>
								                </tr>
								                <tr>
				                					<td class="text_tablehead_b"  >
								                  		明细标识号
								                  	</td>
								                  	<td>
								                   		<input type="text"  name="txid" id="txid"  title="明细标识号"   maxlength="20" />
								                   		<font color="#FF0000">*</font>
								                  	</td>
								                  	<td class="text_tablehead_b" >
								                  	业务种类编码
								                  	</td>
								                  	<td >
								                   		<select name="po.pmtKd" id="pmtkd" >
								                   			<option value="">   </option>
								                   		</select>
								                   		<span  class="STYLE1">*</span>
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
				                					<td class="text_tablehead_b">
								                  		收款行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrBrnchId" id="cdtrbrnchid" title="收款行行号"    maxlength="14" 
								                   		/>
								                   		                 		
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		收款行名称
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrBrnchNm" id="cdtrbrnchnm"  title="收款行名称" 
								                   		maxlength="60"  />
								                   		 
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
								                  		收款人开户行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrIssuer" id="cdtrissuer" title="收款人开户行行号"  maxlength="14" readonly="readonly" style="width:100px;"/>
								                   		<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">
								                   		<font color="#FF0000">*</font>  
								                  	</td>
								                  	<td class="text_tablehead_b">
								                  		收款人开户行名称
								                  	</td>
								                  	<td >
								                   		<input type="text" name="po.cdtrIssuerNm" id="cdtrissuernm" title="收款人开户行名称"   maxlength="60" readonly="readonly"/>
								                   	</td>
								                   </tr>
								                    
								                   <tr>			                  	
								                  
								                  	<td class="text_tablehead_b">
								                  		收款清算行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.cdtrMmbId" id="cdtrmmbid" 
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
								                  	付款人开户行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrIssuer" id="dbtrissuer" title="付款人开户行行号" maxlength="14" readonly="readonly" style="width:100px;"/>
								                  <input type="button" class="button"  value="搜索" onclick="selectBankInfoOfFkk()">
								                   		 
								                  	</td>
								                  		<td class="text_tablehead_b">
								                  		付款人开户行名称
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrIssuerNm" id="dbtrissuernm" title="付款人开户行名称"  maxlength="60" readonly="readonly"/>
								                  	</td>
								                  	</tr>
								                  	<tr>
								                  			<td class="text_tablehead_b">
								                  		  付款清算行行号
								                  	</td>
								                  	<td>
								                   		<input type="text" name="po.dbtrMmbId" id="dbtrmmbid" title="付款清算行行号" maxlength="14" readonly="readonly"
								                   		 />
								                   		 
								                  	</td>
								                  	</tr>
								           </table>
							             </div>
						        
						        <div class="table_content">
						                <table>
						               		<tr>
							                	<td colspan="4">
			                						<span class="text_tablehead">附加信息</span>
			                					</td>
				                			</tr>
										           	 <tr>
										           	 
											           	<td  class="text_tablehead_b">
										                   原CIS委托日期
										                </td>
										                <td >

										                 	<input type="text" name="po.issueDt" id="issueDt"  title="出票日期"  readonly="readonly" class="Wdate"  onclick="WdatePicker()"/>
										                 	<font color="#FF0000">*</font>

										                </td>
										                <td  class="text_tablehead_b" >
										                   	原CIS交易序号
										                </td>
										                <td >

										                 	<input type="text" name="po.payDt" id="payDt"   title="提示付款日期"  class="Wdate"  onclick="WdatePicker()" />
										                 	<font color="#FF0000">*</font>

										                </td>
										                
										             </tr>
										             <tr>
										             	
										             	 <td class="text_tablehead_b">
										                 原CIS票据号码
										                </td>
										                <td>
										                 	<input type="text" name="po.notesNo" id="notesNo" title="票据号码" maxlength="32"  onkeypress="amountPress()" />
										                 	<font color="#FF0000">*</font>
										                </td>	
										                  <td class="text_tablehead_b">
										                  回执状态
										                </td>
										                <td>
										                <select name="po.pmtKd" id="pmtkd" >
								                   			<option value="PR02">已付款</option>
								                   			<option value="PR09">已拒绝</option>
								                   		</select>
										                </td>		
										             </tr>
										           
									                 <tr>
											           	
										                  <td class="text_tablehead_b">
										                 业务拒绝处理码
										                </td>
										                <td>
										                 	<input type="text" name="po.purpose" id="purpose" title="用途" /> 
										                </td>
										                
									                 </tr>
									              
										             <tr>
										             	 <td class="text_tablehead_b">
										                业务拒绝信息
										                </td>
										                	<td colspan='4'>
										                
                  								 <textarea name="po.addtlInf" id="addtlInf" cols="60"
																			rows="3" onKeyPress="charPress()"
																			onkeyup="limitLength(value,256,'提示：','addtlInf')"></textarea>
										                </td>
										               <tr>
										               	
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
