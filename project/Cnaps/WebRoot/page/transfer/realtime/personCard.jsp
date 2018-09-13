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
		<title></title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>	
	<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
	<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
	<script type="text/javascript" src="<%=path%>/js/common/checkIdcard.js"></script>
	   <script type="text/javascript">
	   		function saveFun(data) {
      if (data) {
   // alert("注册成功！");
      } else {
   // alert("data！");
    }
 }

	function OnSave() {
var userMap = {};
	userMap.accountnumber = document.getElementById("receNum").value;
	userMap.accountname = document.getElementById("receName").value;
	userMap.addr = document.getElementById("receAddress").value;
	userMap.issuer =document.getElementById("receBankNum").value;
	userMap.issuernm =document.getElementById("receBankName").value;
	userMap.mmbid =document.getElementById("cdtrMmbId").value;
	userMap.accttp =document.getElementById("receAccountType").value;
  PubService.saveOthersBankAccountMsg(userMap, saveFun); 
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
				 
				  //alert(" 收款人信息不存在，或已失效，未查到相关数据" );
				  //document.getElementById("cdtracctid").focus();
				       
				   return;
				  }else{ 
			 
			  document.getElementById("receNum").value=obj.accountnumber;
		      document.getElementById("receName").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("receAddress").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("receOpenBankNum").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("receOpenBankName").value=obj.issuernm==null?"":obj.issuernm ;
			   document.getElementById("receBankNum").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("receBankName").value=obj.issuernm==null?"":obj.issuernm ;	
			  document.getElementById("receAccountType").value=obj.accttp==null?"":obj.accttp ;	
			   document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//清算行行号
		 }
	   	});
				
			}
			
		
		
		
			function  PubQueryAccount(paymentGroupNum){
	 
   		if(isNull(trim(paymentGroupNum))){
					 return;
				   }
				var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
				  if(obj==null||obj.acctid==null){
				 
				  alert(" 收款人信息不存在，或已失效，未查到相关数据" );
				 
				       
				   return;
				  }else{
			 
			  //document.getElementById("payerNum").value=obj.acctid;
		      //document.getElementById("dbtrNm").value=obj.acctid==null?"": obj.acctid  ;

    		  document.getElementById("name").value=obj.mm==null?"": obj.mm;//名称
		      document.getElementById("address").value=obj.addr==null?"": obj.addr;//地址
		      document.getElementById("phone").value=obj.tel==null?"": obj.tel;//联系电话
		      document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//证件类型
			  document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//证件类型
		      document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//证件号
		      document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
		      document.getElementById("payAccountType").value=obj.accttp==null?"": obj.accttp;//付款人账户类型
		      document.getElementById("payAccountType1").value=obj.accttp==null?"": obj.accttp;//付款人账户类型
		      
			 
			    
		 }
	   	});
				
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
	                 
		                
		                  document.form1.paymentGroupNum.value=http_request.responseText;
	           
		               
	             
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
      --></script>
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
		<script type="text/javascript">
				//收款行行号查询
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var receBankNum= document.getElementById("receBankNum");//收款行号
				var receBankName=document.getElementById("receBankName");//收款行名
				var cdtrMmbId=document.getElementById("cdtrMmbId");//清算行行号
				var receOpenBankNum= document.getElementById("receOpenBankNum");//开户行号
				var receOpenBankName=document.getElementById("receOpenBankName");//开户行名
				selectkhhBank(url,receBankNum,receBankName,cdtrMmbId,receOpenBankNum,receOpenBankName);
								 
				
				
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//付款人开户行信息查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("dbtrIssuer");
				var fkrkhhmc=document.getElementById("dbtrIssuerNm");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
			function selectLoad(){
			 	transferOfClient(temp,'select_input');
				
			}
			 
			 
			 	function zcx(val){
				if(val.value=='Y'){
					$("#handingCharge").val("");//手续费
					$("#postCharge").val("");//邮电费
					$("#otherPlaceCharge").val("");//异地加收
					$("#handingCharge").attr("readonly",true);
					$("#postCharge").attr("readonly",true);
					$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#handingCharge").attr("readonly",false);
					$("#postCharge").attr("readonly",false);
					$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#handingCharge").val();
				var ydf = $("#postCharge").val();
				var ydjs = $("#otherPlaceCharge").val();
				var hkje = $("#moneyNum").val();//汇款金额
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
			 
			 
			 
	function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			}   
			//还原金额   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
			
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			
				function commitForm(){
				
				
			   var msg = "@";
				var certnum = document.getElementById("certnum");
				var certsize = document.getElementById("certsize");
				var name = document.getElementById("name");
				//var address = document.getElementById("address");
				var phone = document.getElementById("phone");
				 
				var payerNum = document.getElementById("payerNum");
				var receNum = document.getElementById("receNum");
				var receName = document.getElementById("receName");
				var receBankNum = document.getElementById("receBankNum");
				
				
				
				
				var receBankName = document.getElementById("receBankName");
				var receOpenBankNum = document.getElementById("receOpenBankNum");
				var receOpenBankName = document.getElementById("receOpenBankName");
				var moneyClassCode = document.getElementById("moneyClassCode");
				var moneyNum = document.getElementById("moneyNum");
				var totalMoney = document.getElementById("totalMoney");
				var receAccountType = document.getElementById("receAccountType");
				var payAccountType1 = document.getElementById("payAccountType1");
				var fkqshhh  = document.getElementById("fkqshhh");
				var cdtrMmbId  = document.getElementById("cdtrMmbId");
				//msg=isMonNull(moneyNum,msg);
				 if(isNull(trim(cdtrMmbId.value))){
					msg += cdtrMmbId.title+"不能为空！@";
				    }
                      if(isNull(trim(fkqshhh.value))){
					msg += fkqshhh.title+"不能为空！@";
				    }
				if(isNull(trim(receAccountType.value))){
					msg += receAccountType.title+"不能为空！@";
				}
				if(isNull(trim(payAccountType1.value))){
					msg += payAccountType1.title+"不能为空！@";
				}

				if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"不能为空！@";
				}
				if(isNull(trim(receBankName.value))){
					msg += receBankName.title+"不能为空！@";
				}
			 
				if(isNull(trim(moneyClassCode.value))){
					msg += moneyClassCode.title+"不能为空！@";
				}
				
				if(isNull(trim(receBankNum.value))){
					msg += receBankNum.title+"不能为空！@";
				}
				if(isNull(trim(receName.value))){
					msg += receName.title+"不能为空！@";
				}
				if(isNull(trim(receNum.value))){
					msg += receNum.title+"不能为空！@";
				}
				if(isNull(trim(payerNum.value))){
					msg += payerNum.title+"不能为空！@";
				}
				 
				
				 
				if(isNull(trim(name.value))){
					msg += name.title+"不能为空！@";
				}
				if(isNull(trim(certsize.value))){
					msg += certsize.title+"不能为空！@";
				}
			 
			 
				var boo = msgSplit(msg);
				 
			  	 
	
				if(boo){
				OnSave();
				 document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//汇款金额
				  document.getElementById("handingCharge").value=rmoney(document.getElementById("handingCharge").value );
				    document.getElementById("postCharge").value=rmoney( document.getElementById("postCharge").value);
				     document.getElementById("otherPlaceCharge").value=rmoney(document.getElementById("otherPlaceCharge").value);
					document.getElementById("dbtramtacctid").value=document.getElementById("payerNum").value;
				     document.getElementById("dbamtnm").value=document.getElementById("name").value;
					open2("<%=request.getContextPath()%>");
					}
				 
		 }
		 
		 function isMonNull(moneyNum,msg){
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"不能为空！@";
		 		return msg;
		 	}
		 	return "@";
		 }
		 
		 
		 
		 
		 	function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	transno:'7123',//实时贷记业务 个人通存
				 	pmttp:document.getElementById('businesssizenum'),
				    sxf : document.getElementById('handingCharge'),
				    ydf : document.getElementById('postCharge'),
				    ydjs : document.getElementById('otherPlaceCharge'),
				    ze : document.getElementById('totalMoney'),
				    gbf: document.getElementById('counterfoil'),
				    yxj:'',//优先级 
				    signtype: '02',
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
			
			function clrAmt0(){
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
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
			
			
			
		</script>
	</head>
	<body onload="sendDate()">
		<form method="post" name="form1"
			action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
		 <input id="cardcrash" name="cardcrash" type="hidden" value="card">
		 <input id="contrperson" name="contrperson" type="hidden" >
		  
		  <input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
		  
		  <input name="dbtramtacctid" id="dbtramtacctid" type="hidden"  title="扣款账号" maxlength="32"  /> 
		 <input name="dbamtnm" id="dbamtnm" type="hidden"	title="扣款户名" maxlength="60" />
		  
		  
		  
		  
		  
		  
		  
		  
		  
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
						                  	<div  class="text_title"><span class="text_blue2">个人卡折跨行通存</span></div>
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
																	<!--   端到端标识号-->
																</td>
																<td >
																	<input name="endtoendid" id="dddbsh" type="hidden" value="feidiao"
																		maxlength="19" title="端到端标识号"  />
																
																	<!-- <span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td>
																	<select  name="po.businesssizenum" id="businesssizenum" style="width:180px;" title="业务类型编码">
																<option value="C102"  selected="selected">个人储蓄通存业务</option>
																 
																 
																</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	业务种类编码
																</td>
																<td >
																	<select  name="po.businessClassCode" id="businessClassCode" style="width:180px;" title="业务种类编码">
																	<option value="03302"  selected="selected">转账</option>
															
																</select>
																	<span  class="STYLE1">*</span>
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
																	<input name="po.payerNum" id="payerNum" type="text"onblur="PubQueryAccount(this.value);clrAmt();"
																		 title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="po.dbtrNm" id="name" type="text" readonly="readonly"
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                         <tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																<input name="po.certsize" id="certsize1" type="hidden"  readonly="readonly"/>
																		<select   name="po.certsize" disabled="disabled" id="certsize">
																		<option value="01">
																			身份证
																		</option>
																		<option value="02">
																			军官证
																		</option>
																		<option value="03">
																			学生证
																		</option>
																	
																	</select>
																 
																</td>
															
																<td class="text_tablehead_b" >
																	付款人证件号
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19" readonly="readonly"
																		maxlength="32" title="付款人证件号" onblur="checkIdcard(this.value,'certnum')" /> 
															 		</td>
															</tr>
																<tr>
																	
															
																<td class="text_tablehead_b" >
																	付款人联系电话
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="付款人联系电话" />  
																		 <input type="hidden" readonly="readonly" name="po.proposerAcctCcy" title="付款人账户币种" id="proposerAcctCcy" value="CNY">
																		   <input type="hidden"  maxlength="30" name="po.proposerCstmrId" readonly="hidden" title="付款人客户号" id="proposerCstmrId">
																</td>
																
																<td class="text_tablehead_b" >
																	付款人账户类型
																</td>
																<td>
																<input type="hidden"  maxlength="30" name="po.payAccountType" id="payAccountType1" readonly="readonly"/>
																		 <select  name="po.payAccountType" title="付款人账户类型" id="payAccountType" disabled="disabled">
																	 		 <option value="" >请选择</option>	
																		  <option value="AT01">个人贷记卡账户</option>
																		   <option value="AT02">个人借记卡账户</option>
																		 </select>
																		 <span  class="STYLE1">*</span>
																</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!-- 付款行行号 -->
																</td>
																<td>
																	<input name="po.dbtrbrchid" id="fkhhh" type="hidden" readonly="readonly"
																		 title="付款行行号"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																<!-- 	<span  class="STYLE1">*</span> -->
																</td>
																<td class="text_tablehead_b">
																<!-- 	付款行名称 -->
																</td>
																<td>
																	<input name="po.dbtrbrnchnm" id="fkhmc" type="hidden" title="付款行名称" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!-- 	<span  class="STYLE1">*</span>-->
																</td>
                                                  			</tr>
                                                  		<tr>
																<td class="text_tablehead_b" >
																	付款人客户号
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="po.proposerCstmrId" readonly="readonly" title="付款人客户号" id="proposerCstmrId">
																</td>
																</tr>
																<tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人地址
																</td>
																<td colspan="3">
																	<input name="po.address" id="address" class="text_tablehead_b_addr"  readonly="readonly"
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','address')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!--付款人开户行行号-->
																</td>
																<td>
																	<input name="po.dbtrIssuer" id="dbtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="付款人开户行行号" maxlength="12"   readonly="readonly"  
																		 value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																		<!--<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--付款人开户行名称-->
																</td>
																<td>

																	<input name="po.dbtrIssuerNm" id="dbtrIssuerNm" type="hidden" title="付款人开户行名称"
																		  maxlength="60" readonly="readonly" value="${bankInfo.participantname }"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!-- 付款清算行行号-->
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="付款清算行行号" maxlength="12" value="${bankInfo.directbankcode }"
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
																	<input name="po.receNum" id="receNum" type="text" onblur="queryBypaymentGroupNum(this.value)"
																		 title="收款人账号" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称
																</td>
																<td>
																	<input name="po.receName" id="receName" type="text"
																		title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															
															<tr>
																
																<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr"    name="po.receAddress" id="receAddress" 
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'提示：','receAddress')" />
																	
																</td>
															</tr>
															<tr>
																
																
																 <td class="text_tablehead_b" >
																	收款人账户类型
																</td>
																<td>
																		 <select  name="po.receAccountType"  title="收款人账户类型" id="receAccountType">
																		  <option  value="">请选择</option>
																		  <option value="AT01">个人贷记卡账户</option>
																		   <option value="AT02">个人借记卡账户</option>
																		 </select>
																		 <span  class="STYLE1">*</span> 
																</td>
																<td class="text_tablehead_b">
																	收款清算行行号
																</td>
																<td>
																	<input name="po.cdtrMmbId" id="cdtrMmbId" type="text" readonly="readonly"
																		title="收款清算行行号" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input name="po.receBankNum" id="receBankNum" type="text" class="text_tablehead_b_c"
																		 title="收款行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款行名称
																</td>
																<td>
																	<input name="po.receBankName" id="receBankName" type="text"
																		style="width: 180px;" title="收款行名称" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	<!--收款人开户行行号-->
																</td>
																<td>
																	<input name="po.receOpenBankNum" id="receOpenBankNum" type="hidden" class="text_tablehead_b_c"
																		 title="收款行开户行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	<!--收款人开户行名称-->
																</td>
																<td>
																	<input name="po.receOpenBankName" id="receOpenBankName" type="hidden" readonly="readonly"
																		title="收款人开户行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
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
																		 title="总额" maxlength="12"/>
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
																		title="手续费" maxlength="12"  readonly="readonly"/>
																
																</td><td class="text_tablehead_b" >
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
																		title="邮电费" maxlength="12" readonly="readonly" />
																
																</td>
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text" 
																		title="异地加收" maxlength="12"  readonly="readonly" />
																
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
                                                   <!-- 
                                                    <div class="table_content">
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
                                                    	</div>-->
                                                   <!--  
                                                    <div class="table_content">
                                                    
                                                  	
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">备注信息</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	备注
																</td>
																<td colspan="3">
																	<textarea name="po.remark" id="remark" 
																		rows="2" cols="100" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    </div>
                                                    -->
                                                    
                                                    
                                           <div class="table_content">
                                                    <table>  
                                              <tr >
                                         	 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>说明：红色*标注项为必填项</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:40%;">
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
