<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>银行本票现金解付</title>
		
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	     <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  	<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
	
				    
		<script language="javascript">
		//收款人账户
		function  PubQueryAccount(paymentGroupNum){
	
	   		if(isNull(trim(paymentGroupNum))){
				 return;
			}
			var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
			PubService.QueryAccount(paymentGroupNum,function(obj){
			 pop.close();
			if(obj==null||obj.acctid==null){
						  return;
			}else{
				 document.getElementById("receAcount").value=obj.acctid;
		         document.getElementById("name").value=obj.mm==null?"": obj.mm;//名称
				 //document.getElementById("receOpenBankNum").value=  obj.issuer==null?"": obj.issuer ;   
				 //document.getElementById("receOpenBankName").value=obj.issuernm==null?"":obj.issuernm ;	
				 //document.getElementById("address").value=obj.addr==null?"": obj.addr;//地址
				 document.getElementById("phone").value=obj.tel==null?"": obj.tel;//联系电话
				 document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//证件类型
				document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//证件类型
				 document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//证件号accttp
				// document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
				 //document.getElementById("receAccountType").value=obj.accttp==null?"": obj.accttp;//付款人账户类型
				  //document.getElementById("receAccountType1").value=obj.accttp==null?"": obj.accttp;//付款人账户类型
			 }
		   	});
				
		}
		

	function OnSave() {
		var userMap = {};
		userMap.accountnumber = document.getElementById("payerAcount").value;
		userMap.accountname = document.getElementById("payName").value;
		//userMap.addr = document.getElementById("payAddress").value;
		userMap.issuer =document.getElementById("payBankNum").value;
		userMap.issuernm =document.getElementById("payBankName").value;
		userMap.mmbid =document.getElementById("fkqshhh").value;
		//userMap.accttp =document.getElementById("payAccountType").value;
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
				   document.getElementById("dbtramtacctid").value=paymentGroupNum;
				   document.getElementById("dbamtnm").value=obj.accountname==null?"": obj.accountname  ;
					document.getElementById("payName").value=obj.accountname==null?"": obj.accountname  ;
					//document.getElementById("payAddress").value=obj.addr==null?"": obj.addr  ;
					document.getElementById("payBankNum").value= obj.issuer==null?"": obj.issuer ;   
				    document.getElementById("payBankName").value=obj.issuernm==null?"":obj.issuernm ;
				    document.getElementById("payOpenBankName").value= obj.issuernm==null?"": obj.issuernm ;   
				    document.getElementById("fkqshhh").value=obj.mmbid==null?"":obj.mmbid ;//付款清算行行号
				    document.getElementById("payOpenBankNum").value=obj.issuer==null?"":obj.issuer ;//付款人开户行行号
			        //document.getElementById("payAccountType").value==obj.accttp==null?"": obj.accttp;;//付款人账户类型
				 }
			});
		}
			//付款行行号查询
			function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var payBankNum= document.getElementById("payBankNum");//付款行号
				var payBankName=document.getElementById("payBankName");//付款行名
				var fkqshhh=document.getElementById("fkqshhh");//清算行行号
				var payOpenBankNum= document.getElementById("payOpenBankNum");//开户行号
				var payOpenBankName=document.getElementById("payOpenBankName");//开户行名
				selectkhhBank(url,payBankNum,payBankName,fkqshhh,payOpenBankNum,payOpenBankName);
			}	
			//收款人开户行行号查询
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("payOpenBankNum");
				var payOpenBankName=document.getElementById("payOpenBankName");
				var fkqshhh=document.getElementById("fkqshhh");
				selectBank(url,payOpenBankNum,payOpenBankName,fkqshhh);
			}
			
			
			
			 function open2(){
			     var pop = createAuthorWin("popid",'授权',"<%=request.getContextPath()%>/page/transfer/realtime/authorization.jsp");
				pop.show();
			   
			 }
			 
			 function zcx(val){
				if(val.value=='Y'){
					
					document.getElementById("handingCharge").value=""; 
				    document.getElementById("postCharge").value="";
				    document.getElementById("otherPlaceCharge").value="";
					document.getElementById("handingCharge").readOnly=true;
					document.getElementById("postCharge").readOnly=true;
					document.getElementById("otherPlaceCharge").readOnly=true;
					jisuan();
				}else{
					document.getElementById("handingCharge").readOnly=false;
					document.getElementById("postCharge").readOnly=false;
					document.getElementById("otherPlaceCharge").readOnly=false;
				}
			}
 
			function jisuan(){
				
				var sxf = document.getElementById("handingCharge").value; 
				var ydf = document.getElementById("postCharge").value;
				var ydjs =document.getElementById("otherPlaceCharge").value;
				var hkje = document.getElementById("moneyNum").value;
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
		
				function commitForm(){
				
			   var msg = "@";
					var receAcount = document.getElementById("receAcount");
					var name = document.getElementById("name");
					var payName = document.getElementById("payName");
                    var payOpenBankNum= document.getElementById("payOpenBankNum");
                    var payBankNum= document.getElementById("payBankNum");
                     var payBankName = document.getElementById("payBankName");
                      var payOpenBankName = document.getElementById("payOpenBankName");
                     var totalMoney = document.getElementById("totalMoney");
                 var phone = document.getElementById("phone");
                  var payerAcount = document.getElementById("payerAcount");
                 
                   var moneyNum = document.getElementById("moneyNum");
                     var paymentGroupNum  = document.getElementById("paymentGroupNum");
                     
                      var fkqshhh  = document.getElementById("fkqshhh");
                      
                      //msg=isMonNull(moneyNum,msg);
                      if(isNull(trim(fkqshhh.value))){
					msg += fkqshhh.title+"不能为空！@";
				    }
                  if(isNull(trim(receAcount.value))){
					msg += receAcount.title+"不能为空！@";
				    }
                  if(isNull(trim(payerAcount.value))){
					msg += payerAcount.title+"不能为空！@";
				    }
 
 					if(isNull(trim(paymentGroupNum.value))){
					msg += paymentGroupNum.title+"不能为空！@";
				    }

					if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"不能为空！@";
				    }
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"不能为空！@";
				    }
		           if(isNull(trim(payBankName.value))){
					msg += payBankName.title+"不能为空！@";
				    }  
					if(isNull(trim(payBankNum.value))){
					msg += payBankNum.title+"不能为空！@";
				    }
					 
					 
					 
					if(isNull(trim(payName.value))){
					msg += payName.title+"不能为空！@";
				    }
					if(isNull(trim(name.value))){
					msg += name.title+"不能为空！@";
				    }
					 
				var boo = msgSplit(msg);
				
			if(boo){
			OnSave();
			  document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//汇款金额
				  document.getElementById("handingCharge").value=rmoney(document.getElementById("handingCharge").value );
				    document.getElementById("postCharge").value=rmoney( document.getElementById("postCharge").value);
				     document.getElementById("otherPlaceCharge").value=rmoney(document.getElementById("otherPlaceCharge").value);
					open2();
				  	}
				  	
				  	
		 }
		</script>
		
		
			<script language="javaScript">
  function sendDate(){
  //	var name=document.form1.Username.value;
  //	var pass=document.form1.Userpass.value;
  	
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
		                  document.form1.paymentGroupNum.value=http_request.responseText;//支付交易组号
	           			  document.form1.dddbsh.value=http_request.responseText;//端到端标识号
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
     
      
      
      
      
  
   

			
      
      
      
      
      </script>
      <script>
        //手续费查询函数--个人通兑--实时借记业务
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	transno:'7131',//实时借记业务 个人通存
				 	pmttp:document.getElementById('businessSizeCode'),
				    sxf : document.getElementById('handingCharge'),
				    ydf : document.getElementById('postCharge'),
				    ydjs : document.getElementById('otherPlaceCharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalMoney'),
				    signtype: '01',
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
				
		
      </script>
      <script>
      function clrAmt(){
				document.getElementById('moneyNum').value="";
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('totalMoney').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
				}
		function clrAmt0(){
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
      </script>
		<script type="text/javascript">
	     
	      
	      
	      function isMonNull(moneyNum,msg){
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"不能为空！@";
		 		return msg;
		 	}
		 		return "@";
		 }
	</script>
	
	<script>
		 function namezcx(val){
		 	if(val.value>99){
		 		alert("背书人数值过大！");
		 		return;
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
		newTd2.innerHTML = "<div align='left'><input type='text' name='endrsrNm' id='gz_cptlcd' style='width: 90px;' maxlength='12'/>";
		newTd3.className="text_tablehead_b";
		newTd3.innerHTML = "<input type='button' value='删除'  class='button' onclick='fundelmxgz(this)'/>";
		
			 }
			
			}
			
			
			function fundelmxgz(obj)
	{
		 
		var rowidx = obj.parentNode.parentNode.rowIndex; // 获取对象所在表格中的行的位置，并删除当前行和下一行
		this.document.getElementById("gkzjgzdfjjhb_mx").deleteRow(rowidx);
	
    var length= this.document.getElementById("gkzjgzdfjjhb_mx").rows.length	;//得到的删除前的值
    		// alert(length);
		 this.document.getElementById("numOfEndrsr").value=length;
	}
	</script>
	</head>
	<body onload="sendDate()">
		<form  name="form1" method="post"
			action="<%=path%>/transferJiefuAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		 	 <input name="po.warrantyId" id="contrperson" type="hidden" >
		  	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="yxj" name="yxj" type="hidden" value='NORM' maxlength="19" />
			
		 	 <input name="po.dbtramtacctid" id="dbtramtacctid" type="hidden"  title="扣款账号" maxlength="32"  /> 
			<input name="po.dbamtnm" id="dbamtnm" type="hidden"	title="扣款户名" maxlength="60" />
			<input type="hidden"  name="po.businessSizeCode" id="businessSizeCode" value="B309"/>
			<input type="hidden"  name="po.businessClassCode" id="businessClassCode" value="03406"/>
			<input type="hidden"  name="po.signMd" id="signMd" value="01"/><!-- 签发模式 现金 -->
			
			
		 	 <table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">银行本票现金解付</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>	 
                                                      <tr>
															<td class="text_tablehead_b"  >
																	支付组号
																</td>
																<td >
																		<input name="po.paymentGroupNum" id="paymentGroupNum" type="text" readonly="readonly"
																		style="width: 180px;" title="支付交易组号" maxlength="22"
																		  /><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																<!--   	端到端标识号-->
																</td>
																<td >
																	<input name="endtoendid" id="dddbsh" type="hidden" value="1234" 
																		maxlength="19" title="端到端标识号"  />
																
																	<!-- 	<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															</table>
                                                 </div>
                                             
                                                 
                                                   
                                                    <div class="table_content">
                                                    <table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息</span></td>
                                                      </tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人账号
																</td>
																<td>
																	<input name="po.payerAcount"  id="payerAcount" type="text" onblur="queryBypaymentGroupNum(this.value);"
																		 title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="po.payName" id="payName" type="text" 
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!-- 	付款人开户行行号-->
																</td>
																<td>
																	<input name="po.payOpenBankNum" id="payOpenBankNum" type="hidden" class="text_tablehead_b_c"
																		 title="付款人开户行行号" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!-- 	<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--  	付款人开户行名称-->
																</td>
																<td>

																	<input name="po.payOpenBankName" id="payOpenBankName" type="hidden" title="付款人开户行名称"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款行行号
																</td>
																<td>
																	<input name="po.payBankNum" id="payBankNum" type="text" class="text_tablehead_b_c"
																		 title="付款行行号"  maxlength="12"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b">
																	  付款行名称
																</td>
																<td>
																	<input name="po.payBankName" id="payBankName" title="付款行名称"  
																		  maxlength="60"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<!--  <span  class="STYLE1">*</span>-->
																</td>
                                                  			</tr>
                                                  			<tr>
																<td class="text_tablehead_b" >
																		付款清算行行号 
																</td>
																<td>
															<input name="po.dbtrMmbId" id="fkqshhh" type="text"  readonly="readonly"
																		 title="付款清算行行号" maxlength="12"
																		onKeyPress="actkeyPress()" />																 
																</td>
                                                  			</tr>
                                                  		</table>
                                                   </div>
                                                   
                                                    <div class="table_content">
                                                    	<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">收款人信息</span></td>
                                                      </tr>
                                                  		    	<tr>
																<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																	<input name="po.receAcount" id="receAcount" type="text" onblur="PubQueryAccount(this.value);"
																		 title="收款人账号" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称
																</td>
																<td>
																	<input name="po.name" id="name" type="text" readonly="readonly"
																		title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
                                                  		    <tr>
																<td class="text_tablehead_b" >
																	<!--收款行行号-->
																</td>
																<td>
																	<input name="po.cdtrBrnchId" id="cdtrBrnchId" type="hidden" class="text_tablehead_b_c"
																		 title="收款行行号" maxlength="12"  readonly="readonly" value="${bankInfo.bankcode}"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	<!--收款行名称  -->
																</td>
																<td>
																	<input name="po.cdtrBrnchNm" id="cdtrBrnchNm" type="hidden" value="${bankInfo.participantname}"
																		style="width: 180px;" title="收款人行名称" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>  
																<tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																<input name="po.certsize" id="certsize1" type="hidden"  readonly="readonly"/>
																		<select title='证件类型'  name="po.certsize" id="certsize" disabled="disabled">
																		<option value="01" selected>
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
																	<input name="po.certnum" id="certnum" type="text" size="19" onblur="checkIdcard(this.value,'certnum')" readonly="readonly"
																	
																		maxlength="32" title="收款人证件号" /> <span  class="STYLE1">*</span>
															 		</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	收款人联系电话
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="收款人联系电话" />
																</td>
															<tr>
																<td class="text_tablehead_b" >
																	<!-- 收款人开户行行号 -->
																</td>
																<td>
																	<input name="po.cdtrIssuer" id="receOpenBankNum" type="hidden"  value="${bankInfo.bankcode}" class="text_tablehead_b_c"
																		 title="收款行开户行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	<!-- 收款人开户行名称 -->
																</td>
																<td>
																	<input name="po.cdtrIssuerNm" id="receOpenBankName" type="hidden" readonly="readonly" value="${bankInfo.participantname}"
																		title="收款人开户行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
																<tr>
																
																
																 <td class="text_tablehead_b" >
																	<!--  收款行清算行行号-->
																</td>
																<td>
																		
																		  <input name="po.cdtrMmbId" id="cdtrMmbId" type="hidden" readonly="readonly"
																		title="收款行清算行行号" maxlength="12" value="${bankInfo.directbankcode }"
																		 onKeyPress="actkeyPress()" />
																		 
																</td>
															</tr>
                                                  		</table>
                                                 </div>
                                                <div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">票据信息</span>
																	</td>
																</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	本票号码
																</td>
																<td >
																		<input name="po.notesnum" id="paymentGrouppo" type="text"
																		style="width: 180px;" title="本票号码" maxlength="35"/>
																		<span  class="STYLE1"> *</span>
																 
																</td>
																
																<td class="text_tablehead_b">
																		本票密押
																	</td>
																	<td>
																		<input name="po.billseal" id="hpmy" type="text"
																			title="本票密押" />
																			<span  class="STYLE1"> *</span>
																	</td>
															</tr>
															<tr>
															  <td class="text_tablehead_b">
																		出票日期
																	</td>
																	<td>
																		<input name="po.issuedt" id="cprq" class="Wdate"
																			type="text" readonly="readonly" title="出票日期"
																			onclick="WdatePicker()" />
																		<span class="STYLE1"> *</span>
															 </td>
															   <td class="text_tablehead_b">
																		提示付款日期
																	</td>
																	<td>
																		<input name="po.paydt" id="cprq" class="Wdate"
																			type="text" readonly="readonly" title="提示付款日期"
																			onclick="WdatePicker()" />
																		<span class="STYLE1"> *</span>
															 </td>
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	本票冠字码
																      </td>
																   <td >
																	<input style="width:180px;" name="po.password" id="honourno" type="text" size="19"
																		maxlength="19" title="本票冠字码" /><span  class="STYLE1"> *</span>
																	
																     </td>
															</tr>
													</table> 
													</div>
                                                    <div class="table_content">
                                                   
                                                  
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		 title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																	<input name="po.totalMoney" id="totalMoney" type="text" readonly="readonly"
																		 title="总额" maxlength="12"
																		 />
																<span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			 title="汇款金额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange(this.value);" />
																	<span  class="STYLE1">*</span>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                   
                                                    <div class="table_content">
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">计费信息</span></td>
                                                      </tr>
                                                    			<tr>
															<!--  	
													   	<td class="text_tablehead_b" >
																	减免
																</td>
																<td >
																
																	<input type="radio" class="text_tablehead_b_rad" name="po.waive" value="N" checked  onclick="zcx(this);">不减免
																	<input type="radio" class="text_tablehead_b_rad" name="po.waive" value="Y" onclick="zcx(this);">减免
																	 
																</td>-->
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
															<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																	<input name="po.handingCharge" id="handingCharge" type="text" 
																		title="手续费" maxlength="12" 
																		 readonly="readonly" />
																
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
																
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="po.postCharge" id="postCharge" type="text"
																		title="邮电费" maxlength="12" 
																		 readonly="readonly"/>
																
																</td>
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text" 
																		title="异地加收" maxlength="12" 
																		 readonly="readonly"/>
																
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="19"  />
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                   	 <div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">背书转让信息</span>
																	</td>
																</tr>
																<tr>
																<td class="text_tablehead_b">
																		是否已经背书转让
																	</td>
																	<td>
																		<select name="po.endrsrr" id="endrsrr">
																			<option value="Y">
																				Y-是
																			</option>
																			<option value="N">
																				N-否
																			</option>
																			</select>
																	</td>
																	<td class="text_tablehead_b">
																		用途
																	</td>
																	<td>
																		<input name="po.purpose" id="yt" type="text"
																			title="用途" />
																	</td>
																</tr>
																<tr>
															
																   
																	<td class="text_tablehead_b">
										                   背书人数
										                </td>
										                <td>
										                 	<input type="text" name="po.numofendrsr" id="numOfEndrsr" maxlength="10" title="背书人数"  onkeyup="fun_number(this);namezcx(this);" /><font color="#FF0000">*</font>
										                </td>
																<td class="text_tablehead_b">
																		原收款人人名称
																	</td>
																	<td>
																		<input name="po.oricrdtrnm" id="name" type="text"
																			title="原收款人人名称" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1"> *</span>
																	</td>
																</tr>
																</table>
																</div>
                                                    <div class="table_content" style="display:none;"><!-- 渠道报文中小额实时借记业务无附言 -->
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	附言
																</td>
																<td colspan="3">
																	<textarea name="po.postscript" id="postscript" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','postscript')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                                                  	
   
                                                     
                                                    <div class="table_content" id="fjxx" style="display: true;">
															<table id="gkzjgzdfjjhb_mx" border="0" cellpadding="0"
																cellspacing="0">
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">附加信息</span>
																	</td>
																</tr>
																<tr>
																</tr>
															</table>
														</div>
														
                                                     <div class="table_content">
                                                    <table>  
                                              <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>说明：红色*标注项为必填项</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
										         <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
										         </td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>      
                                                    	
                                                    	</table>
                                                    </div>
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    </div>
                                           </td>
                                         </tr>
                                      </table>
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	  
		  
		  
		  
		    

		</form>
	</body>
</html>
